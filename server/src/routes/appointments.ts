import express from 'express';
import { CalendarService } from '../services/calendarService';
import { EmailService } from '../services/emailService';
import { FileService } from '../services/fileService';
import multer from 'multer';
import { prisma } from '../lib/prisma';

const router = express.Router();
const calendarService = CalendarService.getInstance();
const emailService = EmailService.getInstance();
const fileService = FileService.getInstance();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760'), // 10MB default
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = (process.env.ALLOWED_FILE_TYPES || '.pdf,.doc,.docx').split(',');
    const ext = '.' + file.originalname.split('.').pop()?.toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('File type not allowed'));
    }
  },
});

// Get available time slots
router.get('/available-slots', async (req, res) => {
  try {
    const { date, serviceType } = req.query;
    
    if (!date || typeof date !== 'string') {
      return res.status(400).json({ error: 'Date is required' });
    }

    const slots = await calendarService.getAvailableTimeSlots(
      new Date(date),
      serviceType as string
    );

    res.json(slots);
  } catch (error) {
    console.error('Error getting available slots:', error);
    res.status(500).json({ error: 'Failed to get available slots' });
  }
});

// Create a new appointment
router.post('/', async (req, res) => {
  try {
    const {
      clientName,
      clientEmail,
      date,
      serviceType,
      notes,
    } = req.body;

    // Validate required fields
    if (!clientName || !clientEmail || !date || !serviceType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create appointment in Google Calendar and database
    const appointment = await calendarService.createAppointment({
      clientName,
      clientEmail,
      date: new Date(date),
      serviceType,
      notes,
    });

    // Send confirmation emails
    await emailService.sendAppointmentConfirmation({
      to: clientEmail,
      appointmentDetails: {
        clientName,
        date: new Date(date),
        serviceType,
      },
    });

    res.status(201).json(appointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
});

// Upload files for an appointment
router.post('/:appointmentId/files', upload.array('files', 5), async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const savedFiles = await Promise.all(
      files.map(file => fileService.saveFile(file, appointmentId))
    );

    res.status(201).json(savedFiles);
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).json({ error: 'Failed to upload files' });
  }
});

// Get files for an appointment
router.get('/:appointmentId/files', async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const files = await fileService.getFilesByAppointment(appointmentId);
    res.json(files);
  } catch (error) {
    console.error('Error getting files:', error);
    res.status(500).json({ error: 'Failed to get files' });
  }
});

// Download a specific file
router.get('/files/:fileId', async (req, res) => {
  try {
    const { fileId } = req.params;
    const file = await fileService.getFileData(fileId);

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.setHeader('Content-Type', file.fileType);
    res.setHeader('Content-Disposition', `attachment; filename="${file.fileName}"`);
    res.send(file.data);
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).json({ error: 'Failed to download file' });
  }
});

// Cancel an appointment
router.delete('/:appointmentId', async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { client: true },
    });

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    await calendarService.cancelAppointment(appointmentId);
    
    // Send cancellation email
    await emailService.sendAppointmentCancellation({
      to: appointment.client.email,
      appointmentDetails: {
        clientName: appointment.client.name,
        date: appointment.startTime,
        serviceType: appointment.serviceType,
      },
    });

    res.json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    res.status(500).json({ error: 'Failed to cancel appointment' });
  }
});

export default router; 