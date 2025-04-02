import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import { prisma } from '../lib/prisma';
import { EnvironmentConfig } from '../config/environment';

// Get environment configuration
const env = EnvironmentConfig.getInstance();
const calendarConfig = env.getCalendarConfig();

// Initialize Google Calendar client
const auth = new JWT({
  email: calendarConfig.serviceAccountEmail,
  key: calendarConfig.serviceAccountKey,
  scopes: ['https://www.googleapis.com/auth/calendar'],
});

const calendar = google.calendar({ version: 'v3', auth });

export interface TimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
}

export class CalendarService {
  private static instance: CalendarService;
  private calendarId: string;
  private businessHours: { start: number; end: number };
  private serviceDurations: { [key: string]: number };
  private loggingConfig: { showCalendarLogs: boolean };

  private constructor() {
    this.calendarId = calendarConfig.calendarId;
    this.businessHours = env.getBusinessHours();
    this.serviceDurations = env.getServiceDurations();
    this.loggingConfig = env.getLoggingConfig();
    
    // Log configuration in development
    if (this.loggingConfig.showCalendarLogs) {
      console.log(`Calendar Service initialized in ${env.getEnvironment()} mode`);
      console.log(`Using Calendar ID: ${this.calendarId}`);
      console.log(`Using Service Account: ${calendarConfig.serviceAccountEmail}`);
    }
  }

  public static getInstance(): CalendarService {
    if (!CalendarService.instance) {
      CalendarService.instance = new CalendarService();
    }
    return CalendarService.instance;
  }

  private async getExistingEvents(startDate: Date, endDate: Date) {
    try {
      if (this.loggingConfig.showCalendarLogs) {
        console.log(`Fetching events from ${startDate.toISOString()} to ${endDate.toISOString()}`);
      }

      const response = await calendar.events.list({
        calendarId: this.calendarId,
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
      });

      if (this.loggingConfig.showCalendarLogs) {
        console.log(`Found ${response.data.items?.length || 0} events`);
      }

      return response.data.items || [];
    } catch (error) {
      console.error('Error fetching events:', error);
      throw new Error('Failed to fetch calendar events');
    }
  }

  private isWithinBusinessHours(time: Date): boolean {
    const hour = time.getHours();
    return hour >= this.businessHours.start && hour < this.businessHours.end;
  }

  private getDurationByServiceType(serviceType: string): number {
    return this.serviceDurations[serviceType.toUpperCase()] || this.serviceDurations.PRIVATE_TUTORING;
  }

  public async validateAppointment(appointmentData: {
    startTime: Date;
    endTime: Date;
    serviceType: string;
  }): Promise<{ isValid: boolean; errors: string[] }> {
    const errors: string[] = [];

    // Check if within business hours
    if (!this.isWithinBusinessHours(appointmentData.startTime) || 
        !this.isWithinBusinessHours(appointmentData.endTime)) {
      errors.push(`Appointment must be within business hours (${this.businessHours.start} PM - ${this.businessHours.end} PM)`);
    }

    // Check if start time is before end time
    if (appointmentData.startTime >= appointmentData.endTime) {
      errors.push('Start time must be before end time');
    }

    // Check duration
    const expectedDuration = this.getDurationByServiceType(appointmentData.serviceType);
    const actualDuration = (appointmentData.endTime.getTime() - appointmentData.startTime.getTime()) / 60000;
    if (Math.abs(actualDuration - expectedDuration) > 1) { // 1-minute tolerance
      errors.push(`${appointmentData.serviceType} appointments must be ${expectedDuration} minutes long`);
    }

    // Check for conflicts
    const existingEvents = await this.getExistingEvents(appointmentData.startTime, appointmentData.endTime);
    const hasConflict = existingEvents.some(event => {
      const eventStart = new Date(event.start?.dateTime || '');
      const eventEnd = new Date(event.end?.dateTime || '');
      return (
        (appointmentData.startTime >= eventStart && appointmentData.startTime < eventEnd) ||
        (appointmentData.endTime > eventStart && appointmentData.endTime <= eventEnd) ||
        (appointmentData.startTime <= eventStart && appointmentData.endTime >= eventEnd)
      );
    });

    if (hasConflict) {
      errors.push('This time slot conflicts with an existing appointment');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  public async createAppointment(appointmentData: {
    startTime: Date;
    endTime: Date;
    clientId: string;
    serviceType: string;
    course?: string;
  }) {
    try {
      if (this.loggingConfig.showCalendarLogs) {
        console.log('Creating appointment:', {
          ...appointmentData,
          environment: env.getEnvironment(),
          calendarId: this.calendarId
        });
      }

      const client = await prisma.client.findUnique({
        where: { id: appointmentData.clientId },
      });

      if (!client) {
        throw new Error('Client not found');
      }

      // Create Google Calendar event
      const event = await calendar.events.insert({
        calendarId: this.calendarId,
        requestBody: {
          summary: `${appointmentData.serviceType} - ${client.firstName} ${client.lastName}${calendarConfig.eventSuffix}`,
          description: `Service: ${appointmentData.serviceType}\n${
            appointmentData.course ? `Course: ${appointmentData.course}\n` : ''
          }Client: ${client.firstName} ${client.lastName}\nEmail: ${client.email}\nPhone: ${client.phone}`,
          start: {
            dateTime: appointmentData.startTime.toISOString(),
            timeZone: 'America/New_York',
          },
          end: {
            dateTime: appointmentData.endTime.toISOString(),
            timeZone: 'America/New_York',
          },
        },
      });

      if (this.loggingConfig.showCalendarLogs) {
        console.log('Created calendar event:', event.data);
      }

      // Create appointment in database
      const appointment = await prisma.appointment.create({
        data: {
          clientId: appointmentData.clientId,
          serviceType: appointmentData.serviceType,
          startTime: appointmentData.startTime,
          endTime: appointmentData.endTime,
          course: appointmentData.course,
          googleCalendarId: event.data.id,
          environment: env.getEnvironment(),
        },
      });

      return appointment;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw new Error('Failed to create appointment');
    }
  }

  public async getAvailableTimeSlots(date: Date, serviceType: string): Promise<TimeSlot[]> {
    try {
      const startOfDay = new Date(date);
      startOfDay.setHours(this.businessHours.start, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(this.businessHours.end, 0, 0, 0);

      const existingEvents = await this.getExistingEvents(startOfDay, endOfDay);
      const duration = this.getDurationByServiceType(serviceType);
      const timeSlots: TimeSlot[] = [];

      let currentTime = new Date(startOfDay);

      while (currentTime < endOfDay) {
        if (this.isWithinBusinessHours(currentTime)) {
          const slotEnd = new Date(currentTime.getTime() + duration * 60000);
          
          // Check if slot overlaps with any existing events
          const isOverlapping = existingEvents.some(event => {
            const eventStart = new Date(event.start?.dateTime || '');
            const eventEnd = new Date(event.end?.dateTime || '');
            return (
              (currentTime >= eventStart && currentTime < eventEnd) ||
              (slotEnd > eventStart && slotEnd <= eventEnd) ||
              (currentTime <= eventStart && slotEnd >= eventEnd)
            );
          });

          timeSlots.push({
            startTime: currentTime.toISOString(),
            endTime: slotEnd.toISOString(),
            available: !isOverlapping,
          });
        }
        // Move to next slot (30-minute intervals)
        currentTime = new Date(currentTime.getTime() + 30 * 60000);
      }

      return timeSlots;
    } catch (error) {
      console.error('Error getting available time slots:', error);
      throw new Error('Failed to get available time slots');
    }
  }

  public async cancelAppointment(appointmentId: string) {
    try {
      const appointment = await prisma.appointment.findUnique({
        where: { id: appointmentId },
      });

      if (!appointment) {
        throw new Error('Appointment not found');
      }

      if (appointment.googleCalendarId) {
        await calendar.events.delete({
          calendarId: this.calendarId,
          eventId: appointment.googleCalendarId,
        });
      }

      await prisma.appointment.update({
        where: { id: appointmentId },
        data: { status: 'CANCELLED' },
      });

      return true;
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      throw new Error('Failed to cancel appointment');
    }
  }
} 