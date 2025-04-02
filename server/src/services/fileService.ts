import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { Multer } from 'multer';
import { prisma } from '../lib/prisma';
import { randomBytes } from 'crypto';
import { ApplicationMaterial, Prisma } from '@prisma/client';

const writeFileAsync = promisify(fs.writeFile);
const unlinkAsync = promisify(fs.unlink);
const mkdirAsync = promisify(fs.mkdir);

export class FileService {
  private static instance: FileService;
  private uploadDir: string;

  private constructor() {
    this.uploadDir = path.join(process.cwd(), 'uploads');
    this.ensureUploadDirExists();
  }

  public static getInstance(): FileService {
    if (!FileService.instance) {
      FileService.instance = new FileService();
    }
    return FileService.instance;
  }

  private async ensureUploadDirExists(): Promise<void> {
    try {
      await mkdirAsync(this.uploadDir, { recursive: true });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') {
        throw error;
      }
    }
  }

  private generateUniqueFileName(originalName: string): string {
    const timestamp = Date.now();
    const randomString = randomBytes(8).toString('hex');
    const extension = path.extname(originalName);
    const sanitizedName = path.basename(originalName, extension)
      .replace(/[^a-zA-Z0-9]/g, '_')
      .toLowerCase();
    return `${sanitizedName}_${timestamp}_${randomString}${extension}`;
  }

  public async saveFile(file: Express.Multer.File, appointmentId: string): Promise<void> {
    const uniqueFileName = this.generateUniqueFileName(file.originalname);
    const filePath = path.join(this.uploadDir, uniqueFileName);

    try {
      await writeFileAsync(filePath, file.buffer);
      const data: Prisma.ApplicationMaterialUncheckedCreateInput = {
        appointmentId,
        fileName: file.originalname,
        fileSize: file.size,
        fileType: file.mimetype,
        filePath
      };
      await prisma.applicationMaterial.create({ data });
    } catch (error) {
      throw new Error(`Failed to save file: ${error}`);
    }
  }

  public async getFile(appointmentId: string, fileName: string): Promise<string> {
    const material = await prisma.applicationMaterial.findFirst({
      where: {
        appointmentId,
        fileName
      }
    });

    if (!material) {
      throw new Error('File not found');
    }

    return material.filePath;
  }

  public async deleteFile(appointmentId: string, fileName: string): Promise<void> {
    const material = await prisma.applicationMaterial.findFirst({
      where: {
        appointmentId,
        fileName
      }
    });

    if (!material) {
      throw new Error('File not found');
    }

    try {
      await unlinkAsync(material.filePath);
      await prisma.applicationMaterial.delete({
        where: {
          id: material.id
        }
      });
    } catch (error) {
      throw new Error(`Failed to delete file: ${error}`);
    }
  }
} 