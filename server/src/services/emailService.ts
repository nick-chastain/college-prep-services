import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

class EmailService {
  private transporter!: nodemailer.Transporter;

  constructor() {
    this.initializeTransporter();
  }

  private initializeTransporter() {
    try {
      // Using direct SMTP configuration instead of OAuth2
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER || 'calendar@collegeprepservicesllc.com',
          pass: process.env.EMAIL_PASSWORD // App password for Gmail
        }
      });
    } catch (error) {
      console.error('Failed to initialize email transporter:', error);
      throw error;
    }
  }

  async sendEmail(to: string, subject: string, html: string) {
    try {
      const mailOptions = {
        from: `"College Prep Services" <${process.env.EMAIL_USER || 'calendar@collegeprepservicesllc.com'}>`,
        to,
        subject,
        html
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', result);
      return result;
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  }

  // Template for sending consultation confirmation
  async sendConsultationConfirmation(
    to: string,
    name: string,
    date: Date,
    meetingLink?: string
  ) {
    const subject = 'Consultation Confirmation';
    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Your Appointment is Confirmed!</h2>
        <p>Dear ${name},</p>
        <p>Thank you for scheduling an appointment with College Prep Services. Your appointment details are:</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Date:</strong> ${date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
          })}</p>
          <p><strong>Time:</strong> ${date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })}</p>
          ${meetingLink ? `<p>Join the meeting at: <a href="${meetingLink}">${meetingLink}</a></p>` : ''}
        </div>
        <p>If you need to cancel or reschedule, please contact us as soon as possible.</p>
        <p>Best regards,<br>College Prep Services Team</p>
      </div>
    `;

    return this.sendEmail(to, subject, html);
  }

  // Template for sending reminders
  async sendConsultationReminder(
    to: string,
    name: string,
    date: Date,
    meetingLink?: string
  ) {
    const subject = 'Consultation Reminder';
    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Consultation Reminder</h2>
        <p>Dear ${name},</p>
        <p>This is a reminder that your consultation is scheduled for:</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Date:</strong> ${date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
          })}</p>
          <p><strong>Time:</strong> ${date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })}</p>
          ${meetingLink ? `<p>Join the meeting at: <a href="${meetingLink}">${meetingLink}</a></p>` : ''}
        </div>
        <p>If you need to reschedule or cancel, please contact us as soon as possible.</p>
        <p>Best regards,<br>College Prep Services Team</p>
      </div>
    `;

    return this.sendEmail(to, subject, html);
  }
}

export const emailService = new EmailService(); 