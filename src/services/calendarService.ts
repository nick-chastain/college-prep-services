// Service to interact with our Calendar API

import { format } from 'date-fns';

// Set the base URL for the calendar API
// In production, this should be the deployed Firebase Function URL
const API_BASE_URL = import.meta.env.VITE_CALENDAR_API_URL || 'https://us-central1-nick-website-test.cloudfunctions.net/calendarApi';

/**
 * Fetch available time slots for a specific date
 */
export const getAvailableTimeSlots = async (date: Date, serviceType: string = 'private-tutoring'): Promise<string[]> => {
  try {
    // For now, return mock time slots
    // TODO: Replace with actual API call once backend is ready
    const mockTimeSlots = [
      '9:00 AM', '10:00 AM', '11:00 AM',
      '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
    ];

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return mockTimeSlots;

    // Uncomment below and remove mock data when API is ready
    /*
    const formattedDate = format(date, 'yyyy-MM-dd');
    const response = await fetch(`${API_BASE_URL}/api/available-slots?date=${formattedDate}&serviceType=${serviceType}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch time slots: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.timeSlots || [];
    */
  } catch (error) {
    console.error('Error fetching time slots:', error);
    throw error;
  }
};

/**
 * Create a new appointment
 */
export interface AppointmentData {
  date: Date;
  timeSlot: string;
  studentName: string;
  parentName?: string;
  email: string;
  phone: string;
  serviceType: string;
  course?: string;
  notes?: string;
  applicationMaterials?: FileList;
}

/**
 * Creates a new appointment
 * @param data The appointment data
 * @returns Promise that resolves to the created appointment response
 */
export const createAppointment = async (data: AppointmentData): Promise<{ eventId: string }> => {
  try {
    // For now, return mock response
    // TODO: Replace with actual API call once backend is ready
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { eventId: 'mock-event-' + Date.now() };

    // Uncomment below and remove mock response when API is ready
    /*
    const formData = new FormData();
    
    // Add application materials if present
    if (data.applicationMaterials && data.applicationMaterials.length > 0) {
      for (let i = 0; i < data.applicationMaterials.length; i++) {
        formData.append('applicationMaterials', data.applicationMaterials[i]);
      }
    }
    
    // Add other appointment data
    formData.append('appointmentData', JSON.stringify({
      ...data,
      date: format(data.date, 'yyyy-MM-dd'),
      applicationMaterials: undefined // Remove the files from JSON
    }));

    const response = await fetch(`${API_BASE_URL}/api/appointments`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Failed to create appointment: ${response.statusText}`);
    }

    const data = await response.json();
    return { eventId: data.eventId };
    */
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
}; 