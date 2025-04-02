// Service to interact with our Calendar API

import { format } from 'date-fns';

/**
 * Fetch available time slots for a specific date
 */
export const getAvailableTimeSlots = async (date: Date, serviceType: string = 'private-tutoring'): Promise<string[]> => {
  try {
    // Format the date for logging purposes
    console.log(`Fetching slots for ${format(date, 'yyyy-MM-dd')}, service: ${serviceType}`);

    // For now, return mock time slots
    // TODO: Replace with actual API call once backend is ready
    const mockTimeSlots = [
      '9:00 AM', '10:00 AM', '11:00 AM',
      '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
    ];

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return mockTimeSlots;
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
 * @param appointmentData The appointment data
 * @returns Promise that resolves to the created appointment response
 */
export const createAppointment = async (appointmentData: AppointmentData): Promise<{ eventId: string }> => {
  try {
    // Log the appointment request
    console.log(`Creating appointment for ${appointmentData.studentName} on ${format(appointmentData.date, 'yyyy-MM-dd')} at ${appointmentData.timeSlot}`);

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

    const responseData = await response.json();
    return { eventId: responseData.eventId };
    */
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
}; 