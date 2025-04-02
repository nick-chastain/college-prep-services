import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

export type Environment = 'development' | 'production';

export class EnvironmentConfig {
  private static instance: EnvironmentConfig;
  private currentEnv: Environment;
  private initialized: boolean = false;

  private constructor() {
    this.loadEnvironmentVariables();
    this.currentEnv = (process.env.NODE_ENV as Environment) || 'development';
    this.validateRequiredVariables();
  }

  private loadEnvironmentVariables() {
    const env = process.env.NODE_ENV || 'development';
    const rootDir = process.cwd();

    // Load order: .env.{environment}.local -> .env.{environment} -> .env.local -> .env
    const envFiles = [
      path.join(rootDir, `.env.${env}.local`),
      path.join(rootDir, `.env.${env}`),
      path.join(rootDir, '.env.local'),
      path.join(rootDir, '.env')
    ];

    for (const file of envFiles) {
      if (fs.existsSync(file)) {
        const envConfig = dotenv.parse(fs.readFileSync(file));
        for (const key in envConfig) {
          // Don't override already set variables
          if (!process.env[key]) {
            process.env[key] = envConfig[key];
          }
        }
      }
    }

    this.initialized = true;
  }

  private validateRequiredVariables() {
    const requiredVars = {
      // Database variables
      'DATABASE_URL': 'Database connection string is required',
      'POSTGRES_PRISMA_URL': 'Prisma database URL is required',
      'POSTGRES_URL_NON_POOLING': 'Non-pooling database URL is required',

      // Google Calendar variables
      'GOOGLE_CALENDAR_ID': 'Google Calendar ID is required',
      'GOOGLE_SERVICE_ACCOUNT_EMAIL': 'Google service account email is required',
      'GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY': 'Google service account private key is required',

      // Email variables
      'EMAIL_USER': 'Email user is required',
      'EMAIL_PASSWORD': 'Email password is required',
    };

    const missingVars = [];
    for (const [varName, errorMessage] of Object.entries(requiredVars)) {
      if (!process.env[varName]) {
        missingVars.push(`${varName}: ${errorMessage}`);
      }
    }

    if (missingVars.length > 0) {
      throw new Error(`Missing required environment variables:\n${missingVars.join('\n')}`);
    }
  }

  public static getInstance(): EnvironmentConfig {
    if (!EnvironmentConfig.instance) {
      EnvironmentConfig.instance = new EnvironmentConfig();
    }
    return EnvironmentConfig.instance;
  }

  public getEnvironment(): Environment {
    return this.currentEnv;
  }

  public isDevelopment(): boolean {
    return this.currentEnv === 'development';
  }

  public isProduction(): boolean {
    return this.currentEnv === 'production';
  }

  public isInitialized(): boolean {
    return this.initialized;
  }

  // Calendar-specific configurations
  public getCalendarConfig() {
    return {
      calendarId: process.env.GOOGLE_CALENDAR_ID!,
      serviceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
      serviceAccountKey: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      eventSuffix: this.isDevelopment() ? ' (DEV)' : '',
    };
  }

  // Email-specific configurations
  public getEmailConfig() {
    return {
      user: process.env.EMAIL_USER!,
      password: process.env.EMAIL_PASSWORD!,
      subjectPrefix: this.isDevelopment() ? '[DEV] ' : '',
      from: this.isDevelopment() ? 
        'College Prep Services (Dev) <test@collegeprepservicesllc.com>' : 
        'College Prep Services <calendar@collegeprepservicesllc.com>',
    };
  }

  // Database-specific configurations
  public getDatabaseConfig() {
    return {
      url: process.env.DATABASE_URL!,
      prismaUrl: process.env.POSTGRES_PRISMA_URL!,
      nonPoolingUrl: process.env.POSTGRES_URL_NON_POOLING!,
    };
  }

  // File upload configurations
  public getFileConfig() {
    const maxSize = process.env.MAX_FILE_SIZE || '10mb';
    const allowedTypes = process.env.ALLOWED_FILE_TYPES?.split(',') || ['.pdf', '.doc', '.docx'];
    const baseUploadPath = process.env.UPLOAD_PATH || './uploads';

    return {
      maxSize,
      allowedTypes,
      uploadPath: this.isDevelopment() ? 
        path.join(baseUploadPath, 'dev') : 
        path.join(baseUploadPath, 'prod'),
      maxFiles: parseInt(process.env.MAX_FILES || '5', 10),
    };
  }

  // Business hours configuration
  public getBusinessHours() {
    return {
      start: parseInt(process.env.BUSINESS_HOURS_START || '16', 10), // 4 PM default
      end: parseInt(process.env.BUSINESS_HOURS_END || '21', 10),     // 9 PM default
    };
  }

  // Service durations (in minutes)
  public getServiceDurations() {
    return {
      SAT_PREP: parseInt(process.env.SAT_PREP_DURATION || '90', 10),
      PRIVATE_TUTORING: parseInt(process.env.PRIVATE_TUTORING_DURATION || '60', 10),
      COLLEGE_APP_HELP: parseInt(process.env.COLLEGE_APP_HELP_DURATION || '60', 10),
    };
  }

  // Logging configuration
  public getLoggingConfig() {
    return {
      level: this.isDevelopment() ? 'debug' : 'info',
      showCalendarLogs: this.isDevelopment(),
      showEmailLogs: this.isDevelopment(),
      showDatabaseLogs: this.isDevelopment(),
      logPath: this.isDevelopment() ? './logs/dev' : './logs/prod',
      logToFile: process.env.LOG_TO_FILE === 'true',
    };
  }
} 