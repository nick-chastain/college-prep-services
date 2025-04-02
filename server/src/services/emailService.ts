import nodemailer from 'nodemailer';
import type { Attachment } from 'nodemailer/lib/mailer';
import dotenv from 'dotenv';
import { prisma } from '../lib/prisma';

dotenv.config();

// Add admin email constant
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'nick.chastain@collegeprepservicesllc.com';

export class EmailService {
  private static instance: EmailService;
  private transporter!: nodemailer.Transporter;

  private constructor() {
    this.initializeTransporter();
  }

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  private initializeTransporter() {
    try {
      // In test environment, we still use the main email account to send,
      // but admin notifications go to the test admin email
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER || 'calendar@collegeprepservicesllc.com',
          pass: process.env.EMAIL_PASSWORD
        }
      });
    } catch (error) {
      console.error('Failed to initialize email transporter:', error);
      throw error;
    }
  }

  private async logEmailSent(to: string, subject: string, type: string, error?: string) {
    try {
      await prisma.emailLog.create({
        data: {
          to,
          subject,
          type,
          status: error ? 'FAILED' : 'SENT',
          error
        }
      });
    } catch (logError) {
      console.error('Failed to log email:', logError);
    }
  }

  async sendEmail(to: string, subject: string, html: string, attachments?: Attachment[]) {
    try {
      const mailOptions = {
        from: `"College Prep Services" <${process.env.EMAIL_USER || 'calendar@collegeprepservicesllc.com'}>`,
        to,
        subject: process.env.NODE_ENV === 'test' ? `[TEST] ${subject}` : subject,
        html,
        attachments
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', result);
      return result;
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  }

  async sendAppointmentConfirmation(
    to: string,
    appointmentData: {
      clientName: string,
      serviceType: string,
      startTime: Date,
      endTime: Date,
      course?: string,
    }
  ) {
    // Send client confirmation
    const clientSubject = `${appointmentData.serviceType} Appointment Confirmation`;
    const clientHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Your Appointment is Confirmed!</h2>
        <p>Dear ${appointmentData.clientName},</p>
        <p>Thank you for scheduling an appointment with College Prep Services. Your appointment details are:</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Service:</strong> ${appointmentData.serviceType}</p>
          ${appointmentData.course ? `<p><strong>Course:</strong> ${appointmentData.course}</p>` : ''}
          <p><strong>Date:</strong> ${appointmentData.startTime.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
          })}</p>
          <p><strong>Time:</strong> ${appointmentData.startTime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })} - ${appointmentData.endTime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })}</p>
        </div>
        <p>If you need to cancel or reschedule, please contact us as soon as possible.</p>
        <p>Best regards,<br>College Prep Services Team</p>
      </div>
    `;

    // Send admin notification
    const adminSubject = `New ${appointmentData.serviceType} Appointment Booked`;
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Appointment Booked</h2>
        <p>A new appointment has been scheduled:</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Client:</strong> ${appointmentData.clientName}</p>
          <p><strong>Service:</strong> ${appointmentData.serviceType}</p>
          ${appointmentData.course ? `<p><strong>Course:</strong> ${appointmentData.course}</p>` : ''}
          <p><strong>Date:</strong> ${appointmentData.startTime.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
          })}</p>
          <p><strong>Time:</strong> ${appointmentData.startTime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })} - ${appointmentData.endTime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })}</p>
        </div>
      </div>
    `;

    try {
      // Send client confirmation
      await this.sendEmail(to, clientSubject, clientHtml);
      await this.logEmailSent(to, clientSubject, 'CLIENT_CONFIRMATION');

      // Send admin notification
      await this.sendEmail(ADMIN_EMAIL, adminSubject, adminHtml);
      await this.logEmailSent(ADMIN_EMAIL, adminSubject, 'ADMIN_NOTIFICATION');
    } catch (error) {
      await this.logEmailSent(to, clientSubject, 'CONFIRMATION', error instanceof Error ? error.message : 'Unknown error');
      throw error;
    }
  }

  async sendAppointmentReminder(
    to: string,
    appointmentData: {
      clientName: string,
      serviceType: string,
      startTime: Date,
      endTime: Date,
      course?: string,
    }
  ) {
    const subject = `Reminder: ${appointmentData.serviceType} Appointment`;
    const duration = Math.round((appointmentData.endTime.getTime() - appointmentData.startTime.getTime()) / (1000 * 60));
    
    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Appointment Reminder</h2>
        <p>Dear ${appointmentData.clientName},</p>
        <p>This is a reminder about your upcoming appointment:</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Service:</strong> ${appointmentData.serviceType}</p>
          ${appointmentData.course ? `<p><strong>Course:</strong> ${appointmentData.course}</p>` : ''}
          <p><strong>Date:</strong> ${appointmentData.startTime.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
          })}</p>
          <p><strong>Time:</strong> ${appointmentData.startTime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })} - ${appointmentData.endTime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })} (${duration} minutes)</p>
        </div>
        <p>If you need to reschedule or cancel, please contact us as soon as possible.</p>
        <p>Best regards,<br>College Prep Services Team</p>
      </div>
    `;

    try {
      await this.sendEmail(to, subject, html);
      await this.logEmailSent(to, subject, 'REMINDER');
    } catch (error) {
      await this.logEmailSent(to, subject, 'REMINDER', error instanceof Error ? error.message : 'Unknown error');
      throw error;
    }
  }

  async sendAppointmentCancellation(
    to: string,
    appointmentData: {
      clientName: string,
      serviceType: string,
      startTime: Date,
      course?: string,
    }
  ) {
    // Send client cancellation
    const clientSubject = `${appointmentData.serviceType} Appointment Cancellation`;
    const clientHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Appointment Cancellation</h2>
        <p>Dear ${appointmentData.clientName},</p>
        <p>Your appointment has been cancelled:</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Service:</strong> ${appointmentData.serviceType}</p>
          ${appointmentData.course ? `<p><strong>Course:</strong> ${appointmentData.course}</p>` : ''}
          <p><strong>Date:</strong> ${appointmentData.startTime.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
          })}</p>
          <p><strong>Time:</strong> ${appointmentData.startTime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })}</p>
        </div>
        <p>If you would like to reschedule, please visit our website to book a new appointment.</p>
        <p>Best regards,<br>College Prep Services Team</p>
      </div>
    `;

    // Send admin notification
    const adminSubject = `Appointment Cancelled: ${appointmentData.serviceType}`;
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Appointment Cancelled</h2>
        <p>An appointment has been cancelled:</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Client:</strong> ${appointmentData.clientName}</p>
          <p><strong>Service:</strong> ${appointmentData.serviceType}</p>
          ${appointmentData.course ? `<p><strong>Course:</strong> ${appointmentData.course}</p>` : ''}
          <p><strong>Original Date:</strong> ${appointmentData.startTime.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
          })}</p>
          <p><strong>Original Time:</strong> ${appointmentData.startTime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })}</p>
        </div>
      </div>
    `;

    try {
      // Send client cancellation
      await this.sendEmail(to, clientSubject, clientHtml);
      await this.logEmailSent(to, clientSubject, 'CLIENT_CANCELLATION');

      // Send admin notification
      await this.sendEmail(ADMIN_EMAIL, adminSubject, adminHtml);
      await this.logEmailSent(ADMIN_EMAIL, adminSubject, 'ADMIN_CANCELLATION');
    } catch (error) {
      await this.logEmailSent(to, clientSubject, 'CANCELLATION', error instanceof Error ? error.message : 'Unknown error');
      throw error;
    }
  }
} 