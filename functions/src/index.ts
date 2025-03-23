import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import express from 'express';
import cors from 'cors';
import { google, calendar_v3 } from 'googleapis';
import { JWT } from 'google-auth-library';
import { Request, Response } from 'express';

// Initialize Firebase Admin
admin.initializeApp();

// Constants
const CALENDAR_ID = functions.config().calendar?.calendar_id || '';
const TIMEZONE = 'America/New_York';

// Service duration in minutes
const SERVICE_DURATION_MINUTES = {
  'consultation': 30,
  'sat-prep': 60,
  'college-app-help': 60
};

// Business hours (9 AM to 5 PM)
const BUSINESS_HOURS = {
  start: 9, // 9 AM
  end: 17   // 5 PM
};

// Create Express app
const app = express();
app.use(cors({ origin: true }));

// Function to set up and get an authorized Google Calendar API client
async function getCalendarClient(): Promise<calendar_v3.Calendar> {
  const clientEmail = functions.config().calendar?.client_email;
  const privateKey = functions.config().calendar?.private_key?.replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey) {
    throw new Error('Missing required credentials for Google Calendar API');
  }

  const jwtClient = new JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  await jwtClient.authorize();
  return google.calendar({ version: 'v3', auth: jwtClient });
}

// Get available time slots for a specific date
app.get('/api/available-slots', async (req: Request, res: Response) => {
  try {
    const { date } = req.query;

    if (!date || typeof date !== 'string') {
      return res.status(400).json({ error: 'Date parameter is required' });
    }

    // Create a Date object for the requested date
    const requestedDate = new Date(date);
    if (isNaN(requestedDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    // Validate date is not in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (requestedDate < today) {
      return res.status(400).json({ error: 'Cannot schedule appointments in the past' });
    }

    // Check if requested date is a weekend
    const dayOfWeek = requestedDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return res.status(400).json({ error: 'Appointments are not available on weekends' });
    }

    // Set up time boundaries for the day
    const startTime = new Date(requestedDate);
    startTime.setHours(BUSINESS_HOURS.start, 0, 0, 0);
    
    const endTime = new Date(requestedDate);
    endTime.setHours(BUSINESS_HOURS.end, 0, 0, 0);

    // Get calendar client
    const calendar = await getCalendarClient();

    // Query Google Calendar for busy periods
    const busyPeriods = await calendar.freebusy.query({
      requestBody: {
        timeMin: startTime.toISOString(),
        timeMax: endTime.toISOString(),
        timeZone: TIMEZONE,
        items: [{ id: CALENDAR_ID }]
      }
    });

    const busySlots = busyPeriods.data.calendars?.[CALENDAR_ID]?.busy || [];

    // Generate all possible 30-minute slots
    const availableSlots = [];
    const slotDuration = 30; // minutes
    const slotInterval = slotDuration * 60 * 1000; // convert to milliseconds

    for (let time = startTime.getTime(); time < endTime.getTime(); time += slotInterval) {
      const slotStart = new Date(time);
      const slotEnd = new Date(time + slotInterval);

      // Check if slot overlaps with any busy period
      const isSlotAvailable = !busySlots.some(busySlot => {
        const busyStart = new Date(busySlot.start || '');
        const busyEnd = new Date(busySlot.end || '');
        return (slotStart < busyEnd && slotEnd > busyStart);
      });

      if (isSlotAvailable) {
        // Format time as "1:30 PM"
        const hours = slotStart.getHours();
        const minutes = slotStart.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

        availableSlots.push(formattedTime);
      }
    }

    res.json(availableSlots);
  } catch (error) {
    console.error('Error getting available slots:', error);
    res.status(500).json({ error: 'Failed to retrieve available slots' });
  }
});

/**
 * API endpoint to create an appointment.
 */
app.post('/api/create-appointment', async (req: Request, res: Response) => {
  try {
    const { date, timeSlot, studentName, parentName, email, phone, serviceType, notes } = req.body;
    
    // Validate required fields
    if (!date || !timeSlot || !studentName || !email || !phone || !serviceType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    if (!SERVICE_DURATION_MINUTES[serviceType as keyof typeof SERVICE_DURATION_MINUTES]) {
      return res.status(400).json({ error: 'Invalid service type' });
    }
    
    // Parse the selected time slot
    const [hourMinute, period] = timeSlot.split(' ');
    const [hourStr, minuteStr] = hourMinute.split(':');
    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    
    // Convert to 24-hour format
    if (period === 'PM' && hour !== 12) {
      hour += 12;
    } else if (period === 'AM' && hour === 12) {
      hour = 0;
    }
    
    // Create start and end times
    const startTime = new Date(date);
    startTime.setHours(hour, minute, 0, 0);
    
    const endTime = new Date(startTime);
    const duration = SERVICE_DURATION_MINUTES[serviceType as keyof typeof SERVICE_DURATION_MINUTES];
    endTime.setMinutes(endTime.getMinutes() + duration);
    
    // Get calendar client
    const calendar = await getCalendarClient();
    
    // Create event
    const event = {
      summary: `${serviceType} - ${studentName}`,
      description: `
        Student: ${studentName}
        ${parentName ? `Parent/Guardian: ${parentName}` : ''}
        Email: ${email}
        Phone: ${phone}
        ${notes ? `Notes: ${notes}` : ''}
      `,
      start: {
        dateTime: startTime.toISOString(),
        timeZone: TIMEZONE,
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: TIMEZONE,
      },
      attendees: [
        { email: email }
      ]
    };
    
    const createdEvent = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      requestBody: event,
      sendUpdates: 'all'
    });
    
    res.status(201).json({ 
      message: 'Appointment created successfully',
      eventId: createdEvent.data.id
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
});

// Export the Express API as a Firebase Function
export const calendarApi = functions.https.onRequest(app); 