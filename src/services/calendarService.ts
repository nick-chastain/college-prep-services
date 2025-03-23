// Service to interact with our Calendar API

import axios from 'axios';

// Set the base URL for the calendar API
// In production, this should be the deployed Firebase Function URL
const API_BASE_URL = import.meta.env.VITE_CALENDAR_API_URL || 'http://localhost:5001/college-prep-services/us-central1/calendarApi';

/**
 * Fetch available time slots for a specific date
 */
export async function getAvailableTimeSlots(date: Date): Promise<string[]> {
  try {
    // Format date as YYYY-MM-DD
    const formattedDate = date.toISOString().split('T')[0];
    
    const response = await axios.get(`${API_BASE_URL}/api/available-slots`, {
      params: { date: formattedDate }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching available time slots:', error);
    throw new Error('Failed to fetch available time slots');
  }
}

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
  notes?: string;
}

/**
 * Creates a new appointment
 * @param appointmentData The appointment data
 * @returns Promise that resolves to the created appointment response
 */
export async function createAppointment(appointmentData: AppointmentData): Promise<{ eventId: string }> {
  try {
    // Format date as YYYY-MM-DD for API call
    const formattedData = {
      ...appointmentData,
      date: appointmentData.date.toISOString().split('T')[0]
    };
    
    const response = await axios.post(`${API_BASE_URL}/api/create-appointment`, formattedData);
    
    return {
      eventId: response.data.eventId
    };
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw new Error('Failed to create appointment');
  }
} 