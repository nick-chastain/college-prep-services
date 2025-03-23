import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import express from 'express';
import cors from 'cors';
import { google, calendar_v3 } from 'googleapis';
import { JWT } from 'google-auth-library';
import { Request, Response } from 'express';
import * as nodemailer from 'nodemailer';

// Initialize Firebase Admin
admin.initializeApp();

// Constants
const CALENDAR_ID = functions.config().calendar?.calendar_id || '';
const TIMEZONE = 'America/Denver'; // Mountain Time
const ADMIN_EMAIL = functions.config().email?.user || 'malcolm.kobe@gmail.com'; // Use your email instead of service account

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
app.use(cors({ 
  origin: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Email transport configuration - using SMTP instead of OAuth2 for simplicity
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().email?.user || ADMIN_EMAIL,
    pass: functions.config().email?.password || ''
  }
});

// Function to set up and get an authorized Google Calendar API client
async function getCalendarClient(): Promise<calendar_v3.Calendar> {
  const clientEmail = functions.config().calendar?.client_email;
  const privateKey = functions.config().calendar?.private_key;
  
  if (!clientEmail || !privateKey) {
    throw new Error('Missing required credentials for Google Calendar API');
  }

  // Fix private key format - handle both \n escape sequences and actual newlines
  const formattedKey = privateKey
    .replace(/\\n/g, '\n')
    .replace(/"-----BEGIN/g, '-----BEGIN')
    .replace(/KEY-----"/g, 'KEY-----')
    .trim();

  console.log('Calendar auth configured with:', { 
    clientEmail,
    privateKeyLength: formattedKey.length,
    privateKeyStart: formattedKey.substring(0, 40),
    privateKeyEnd: formattedKey.substring(formattedKey.length - 40)
  });

  const jwtClient = new JWT({
    email: clientEmail,
    key: formattedKey,
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
 * Sends email notifications about the appointment
 */
async function sendAppointmentEmails(appointmentData: {
  date: Date,
  timeSlot: string,
  studentName: string,
  parentName?: string,
  email: string,
  phone: string,
  serviceType: string,
  notes?: string,
  eventId: string
}) {
  const { date, timeSlot, studentName, parentName, email, serviceType, eventId } = appointmentData;
  
  const formattedDate = date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
  
  const calendarLink = `https://calendar.google.com/calendar/event?eid=${Buffer.from(eventId || '').toString('base64')}`;
  
  // Send confirmation email to student
  const studentMailOptions = {
    from: `"College Prep Services" <${ADMIN_EMAIL}>`,
    to: email,
    subject: `Appointment Confirmation - ${formattedDate} at ${timeSlot}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Your Appointment is Confirmed!</h2>
        <p>Dear ${studentName},</p>
        <p>Thank you for scheduling an appointment with College Prep Services. Your appointment details are:</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Date:</strong> ${formattedDate}</p>
          <p><strong>Time:</strong> ${timeSlot}</p>
          <p><strong>Service:</strong> ${serviceType}</p>
        </div>
        <p>If you need to cancel or reschedule, please contact us as soon as possible.</p>
        <p>We look forward to meeting with you!</p>
        <p>Best regards,<br/>College Prep Services Team</p>
      </div>
    `
  };
  
  // Send notification email to admin
  const adminMailOptions = {
    from: `"Appointment System" <${ADMIN_EMAIL}>`,
    to: ADMIN_EMAIL,
    subject: `New Appointment: ${studentName} - ${formattedDate} at ${timeSlot}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Appointment Booked</h2>
        <p>A new appointment has been scheduled:</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Student:</strong> ${studentName}</p>
          ${parentName ? `<p><strong>Parent/Guardian:</strong> ${parentName}</p>` : ''}
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${appointmentData.phone}</p>
          <p><strong>Service:</strong> ${serviceType}</p>
          <p><strong>Date:</strong> ${formattedDate}</p>
          <p><strong>Time:</strong> ${timeSlot}</p>
          ${appointmentData.notes ? `<p><strong>Notes:</strong> ${appointmentData.notes}</p>` : ''}
        </div>
        <p><a href="${calendarLink}" style="color: #0066cc;">View in Calendar</a></p>
      </div>
    `
  };
  
  try {
    // Send emails
    await transporter.sendMail(studentMailOptions);
    console.log(`Confirmation email sent to student: ${email}`);
    
    await transporter.sendMail(adminMailOptions);
    console.log(`Notification email sent to admin: ${ADMIN_EMAIL}`);
    
    return true;
  } catch (error) {
    console.error('Error sending emails:', error);
    return false;
  }
}

/**
 * API endpoint to create an appointment.
 */
app.post('/api/create-appointment', async (req: Request, res: Response) => {
  try {
    console.log('Create appointment request body:', JSON.stringify(req.body));
    const { date, timeSlot, studentName, parentName, email, phone, serviceType, notes } = req.body;
    
    // Validate required fields
    if (!date || !timeSlot || !studentName || !email || !phone || !serviceType) {
      console.log('Missing required fields:', { date, timeSlot, studentName, email, phone, serviceType });
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    if (!SERVICE_DURATION_MINUTES[serviceType as keyof typeof SERVICE_DURATION_MINUTES]) {
      console.log('Invalid service type:', serviceType);
      return res.status(400).json({ error: 'Invalid service type' });
    }
    
    // Parse the selected time slot
    const [hourMinute, period] = timeSlot.split(' ');
    const [hourStr, minuteStr] = hourMinute.split(':');
    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    
    console.log('Parsed time components:', { hourMinute, period, hour, minute });
    
    // Convert to 24-hour format
    if (period === 'PM' && hour !== 12) {
      hour += 12;
    } else if (period === 'AM' && hour === 12) {
      hour = 0;
    }
    
    // Parse the date in Mountain Time zone
    const dateObj = new Date(date);
    const yearMonthDay = dateObj.toISOString().split('T')[0]; // YYYY-MM-DD
    
    // Create the full date-time string in the format "YYYY-MM-DDThh:mm:ss"
    const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`;
    const dateTimeString = `${yearMonthDay}T${timeString}`;
    
    console.log('Created datetime string:', dateTimeString, 'with period:', period);
    
    // Explicitly create a date object with the parsed hours and minutes to avoid timezone issues
    const appointmentDate = new Date(dateObj);
    appointmentDate.setHours(hour, minute, 0, 0);
    
    console.log('Direct appointment date:', appointmentDate.toISOString());
    console.log('Hour value used:', hour, 'Period:', period);
    
    // Use the explicit date object instead of string parsing with toZonedTime
    const startDateTime = appointmentDate;
    
    // Calculate end time
    const duration = SERVICE_DURATION_MINUTES[serviceType as keyof typeof SERVICE_DURATION_MINUTES];
    const endDateTime = new Date(startDateTime.getTime() + duration * 60000);
    
    console.log('Appointment time details:', { 
      originalTimeSlot: timeSlot,
      parsedHour: hour,
      parsedPeriod: period,
      startDateTime: startDateTime.toISOString(),
      startDateTimeLocal: startDateTime.toString(),
      endDateTime: endDateTime.toISOString(),
      timezone: TIMEZONE
    });
    
    // Log calendar config
    console.log('Calendar config:', { 
      calendarId: CALENDAR_ID || 'Not set',
      hasClientEmail: !!functions.config().calendar?.client_email, 
      hasPrivateKey: !!functions.config().calendar?.private_key 
    });
    
    // Get calendar client
    const calendar = await getCalendarClient();
    
    // Create event with explicit timezone setting
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
        dateTime: startDateTime.toISOString(),
        timeZone: TIMEZONE,
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: TIMEZONE,
      },
      // Conditionally add attendees if enabled in config
      ...(functions.config().calendar?.enable_attendees === 'true' ? {
        attendees: [
          { email: email }
        ]
      } : {})
    };
    
    console.log('Creating calendar event with payload:', JSON.stringify({
      calendarId: CALENDAR_ID,
      summary: event.summary,
      start: event.start,
      end: event.end,
      hasAttendees: !!functions.config().calendar?.enable_attendees
    }));
    
    const createdEvent = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      requestBody: event,
      // Conditionally send updates if attendees are enabled
      ...(functions.config().calendar?.enable_attendees === 'true' ? {
        sendUpdates: 'all'
      } : {})
    });
    
    console.log('Event created successfully:', createdEvent.data.id);
    
    // Log detailed appointment information for manual follow-up
    console.log('======= NEW APPOINTMENT DETAILS =======');
    console.log(`Date: ${new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}`);
    console.log(`Time: ${timeSlot}`);
    console.log(`Service: ${serviceType}`);
    console.log(`Student: ${studentName}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
    if (parentName) console.log(`Parent/Guardian: ${parentName}`);
    if (notes) console.log(`Notes: ${notes}`);
    console.log(`Calendar Event ID: ${createdEvent.data.id}`);
    console.log(`Calendar Link: https://calendar.google.com/calendar/event?eid=${Buffer.from(createdEvent.data.id || '').toString('base64')}`);
    console.log('========================================');
    
    // Send email notifications
    const emailSent = await sendAppointmentEmails({
      date: new Date(date),
      timeSlot,
      studentName,
      parentName,
      email,
      phone,
      serviceType,
      notes,
      eventId: createdEvent.data.id || ''
    });
    
    res.status(201).json({ 
      message: 'Appointment created successfully',
      eventId: createdEvent.data.id,
      emailSent
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      
      // If it's a GaxiosError from the Google API
      if ('response' in error && error.response) {
        const errorResponse = error.response as any;
        console.error('Google API error response:', {
          status: errorResponse.status,
          statusText: errorResponse.statusText,
          data: errorResponse.data
        });
      }
    }
    
    res.status(500).json({ error: 'Failed to create appointment' });
  }
});

// Export the Express API as a Firebase Function
export const calendarApi = functions.https.onRequest(app); 