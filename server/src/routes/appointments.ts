import express, { Request, Response, RequestHandler } from 'express';
import { CalendarService } from '../services/calendarService';
import { EmailService } from '../services/emailService';
import { FileService } from '../services/fileService';
import multer from 'multer';
import { prisma } from '../lib/prisma';
import type { Appointment } from '@prisma/client';

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

interface AppointmentRequest {
  clientName: string;
  clientEmail: string;
  date: string;
  serviceType: string;
  notes?: string;
}

// Get available time slots
const getAvailableSlots: RequestHandler = (req, res, next) => {
  const { date, serviceType } = req.query;
  
  if (!date || typeof date !== 'string') {
    res.status(400).json({ error: 'Date is required' });
    return;
  }

  calendarService.getAvailableTimeSlots(
    new Date(date),
    serviceType as string || 'private-tutoring'
  )
    .then(slots => {
      res.json(slots);
    })
    .catch(error => {
      console.error('Error getting available slots:', error);
      res.status(500).json({ error: 'Failed to get available slots' });
    });
};

// Create a new appointment
const createAppointment: RequestHandler<{}, any, AppointmentRequest> = (req, res, next) => {
  const {
    clientName,
    clientEmail,
    date,
    serviceType,
    notes,
  } = req.body;

  // Validate required fields
  if (!clientName || !clientEmail || !date || !serviceType) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  // Create appointment in Google Calendar and database
  calendarService.createAppointment({
    startTime: new Date(date),
    endTime: new Date(new Date(date).getTime() + 60 * 60 * 1000), // 1 hour default
    clientId: clientEmail,
    serviceType,
  })
    .then(appointment => {
      // Send confirmation emails
      return emailService.sendAppointmentConfirmation(
        clientEmail,
        {
          clientName,
          startTime: new Date(date),
          endTime: new Date(new Date(date).getTime() + 60 * 60 * 1000), // 1 hour default
          serviceType,
          course: serviceType,
        }
      )
        .then(() => {
          res.status(201).json(appointment);
        });
    })
    .catch(error => {
      console.error('Error creating appointment:', error);
      res.status(500).json({ error: 'Failed to create appointment' });
    });
};

// Upload files for an appointment
const uploadFiles: RequestHandler<{ appointmentId: string }> = (req, res, next) => {
  const { appointmentId } = req.params;
  const files = req.files as Express.Multer.File[];

  if (!files || files.length === 0) {
    res.status(400).json({ error: 'No files uploaded' });
    return;
  }

  Promise.all(
    files.map(file => fileService.saveFile(file, appointmentId))
  )
    .then(savedFiles => {
      res.status(201).json(savedFiles);
    })
    .catch(error => {
      console.error('Error uploading files:', error);
      res.status(500).json({ error: 'Failed to upload files' });
    });
};

// Get files for an appointment
const getFiles: RequestHandler<{ appointmentId: string }> = async (req, res) => {
  const { appointmentId } = req.params;
  
  try {
    const files = await prisma.applicationMaterial.findMany({
      where: { appointmentId },
      select: {
        id: true,
        fileName: true,
        fileSize: true,
        fileType: true,
        uploadedAt: true
      }
    });
    res.json(files);
  } catch (error: unknown) {
    console.error('Error getting files:', error);
    res.status(500).json({ error: 'Failed to get files' });
  }
};

// Download a specific file
const downloadFile: RequestHandler<{ appointmentId: string; fileName: string }> = async (req, res) => {
  const { appointmentId, fileName } = req.params;
  
  try {
    const filePath = await fileService.getFile(appointmentId, fileName);
    res.download(filePath, fileName);
  } catch (error: unknown) {
    console.error('Error downloading file:', error);
    res.status(500).json({ error: 'Failed to download file' });
  }
};

// Cancel an appointment
const cancelAppointment: RequestHandler<{ appointmentId: string }> = (req, res, next) => {
  const { appointmentId } = req.params;

  prisma.appointment.findUnique({
    where: { id: appointmentId },
    include: { client: true },
  })
    .then((appointment: Appointment & { client: { email: string; firstName: string; lastName: string } } | null) => {
      if (!appointment) {
        res.status(404).json({ error: 'Appointment not found' });
        return;
      }

      return calendarService.cancelAppointment(appointmentId)
        .then(() => {
          // Send cancellation email
          return emailService.sendAppointmentCancellation(
            appointment.client.email,
            {
              clientName: `${appointment.client.firstName} ${appointment.client.lastName}`,
              startTime: appointment.startTime,
              serviceType: appointment.serviceType,
              course: appointment.serviceType,
            }
          );
        })
        .then(() => {
          res.json({ message: 'Appointment cancelled successfully' });
        });
    })
    .catch((error: unknown) => {
      console.error('Error cancelling appointment:', error);
      res.status(500).json({ error: 'Failed to cancel appointment' });
    });
};

// Route handlers
router.get('/available-slots', getAvailableSlots);
router.post('/', createAppointment);
router.post('/:appointmentId/files', upload.array('files', 5), uploadFiles);
router.get('/:appointmentId/files', getFiles);
router.get('/:appointmentId/files/:fileName', downloadFile);
router.delete('/:appointmentId', cancelAppointment);

export default router; 