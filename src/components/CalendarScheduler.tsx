import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CalendarClock, Clock, ArrowRight, Loader2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import { getAvailableTimeSlots, createAppointment, AppointmentData } from '@/services/calendarService';

const SERVICE_TYPES = [
  'SAT Prep', 'College Application Help', 'Individual Tutoring'
];

type Step = 'date-time' | 'form' | 'confirmation';

interface FormData {
  studentName: string;
  parentName: string;
  email: string;
  phone: string;
  serviceType: string;
  notes: string;
}

const CalendarScheduler = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<Step>('date-time');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    serviceType: 'consultation',
    notes: ''
  });
  const [bookingConfirmation, setBookingConfirmation] = useState<{
    date: string;
    time: string;
    serviceType: string;
    eventId: string;
  } | null>(null);

  const isMobile = useIsMobile();

  useEffect(() => {
    if (date) {
      setLoading(true);
      setSelectedTime(null);
      
      getAvailableTimeSlots(date)
        .then(slots => {
          setTimeSlots(slots);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching time slots:', error);
          toast({
            title: "Error",
            description: "Failed to fetch available time slots. Please try again.",
            variant: "destructive"
          });
          setTimeSlots([]);
          setLoading(false);
        });
    } else {
      setTimeSlots([]);
    }
  }, [date, toast]);

  const handleDateSelect = (date: Date | undefined) => {
    setDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleNextStep = () => {
    if (!date || !selectedTime) {
      toast({
        title: "Selection Required",
        description: "Please select both a date and time",
        variant: "destructive"
      });
      return;
    }
    setStep('form');
  };

  const handleBackToDateTime = () => {
    setStep('date-time');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleServiceChange = (value: string) => {
    setFormData(prev => ({ ...prev, serviceType: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !selectedTime) {
      toast({
        title: "Error",
        description: "Please select a date and time",
        variant: "destructive"
      });
      return;
    }
    
    // Simple validation
    if (!formData.studentName || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const appointmentData: AppointmentData = {
        date: date,
        timeSlot: selectedTime,
        studentName: formData.studentName,
        parentName: formData.parentName || undefined,
        email: formData.email,
        phone: formData.phone,
        serviceType: formData.serviceType,
        notes: formData.notes || undefined
      };
      
      const response = await createAppointment(appointmentData);
      
      setBookingConfirmation({
        date: new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
        time: selectedTime,
        serviceType: formData.serviceType === 'consultation' 
          ? 'Initial Consultation' 
          : formData.serviceType === 'sat-prep' 
            ? 'SAT Preparation' 
            : 'College Application Help',
        eventId: response.eventId
      });
      
      setStep('confirmation');
      
      toast({
        title: "Appointment Scheduled",
        description: "Your appointment has been successfully scheduled!",
        variant: "default"
      });
    } catch (error) {
      console.error('Error creating appointment:', error);
      toast({
        title: "Booking Failed",
        description: "Failed to book your appointment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStartNewBooking = () => {
    setStep('date-time');
    setDate(undefined);
    setSelectedTime(null);
    setFormData({
      studentName: '',
      parentName: '',
      email: '',
      phone: '',
      serviceType: 'consultation',
      notes: ''
    });
    setBookingConfirmation(null);
  };

  const renderTimeSlots = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    if (!date) {
      return <p className="text-center text-muted-foreground">Please select a date</p>;
    }

    if (timeSlots.length === 0) {
      return <p className="text-center text-muted-foreground">No available time slots</p>;
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {timeSlots.map((time, index) => (
          <Button
            key={index}
            variant={selectedTime === time ? "default" : "outline"}
            className="w-full"
            onClick={() => handleTimeSelect(time)}
          >
            {time}
          </Button>
        ))}
      </div>
    );
  };

  if (step === 'confirmation' && bookingConfirmation) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Appointment Confirmed!</CardTitle>
          <CardDescription className="text-center">We look forward to meeting with you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-primary/10 p-6 rounded-lg space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">Date:</span>
              <span>{bookingConfirmation.date}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Time:</span>
              <span>{bookingConfirmation.time}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Service:</span>
              <span>{bookingConfirmation.serviceType}</span>
            </div>
          </div>
          
          <div className="space-y-3 text-center">
            <p>A confirmation email has been sent to your email address.</p>
            <p>If you need to make any changes to your appointment, please contact us directly.</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleStartNewBooking}>Book Another Appointment</Button>
        </CardFooter>
      </Card>
    );
  }

  if (step === 'form') {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">Book Your Appointment</CardTitle>
          <CardDescription>
            {date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {selectedTime}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="studentName">Full Name *</Label>
              <Input 
                id="studentName" 
                value={formData.studentName} 
                onChange={handleInputChange} 
                required 
                placeholder="Enter your full name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="parentName">Parent/Guardian Name (if applicable)</Label>
              <Input 
                id="parentName" 
                value={formData.parentName} 
                onChange={handleInputChange} 
                placeholder="Enter parent/guardian's full name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input 
                id="email" 
                type="email" 
                value={formData.email} 
                onChange={handleInputChange} 
                required 
                placeholder="Enter your email address"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input 
                id="phone" 
                value={formData.phone} 
                onChange={handleInputChange} 
                required 
                placeholder="Enter your phone number"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="serviceType">Service Type *</Label>
              <Select onValueChange={handleServiceChange} value={formData.serviceType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">Initial Consultation (30 min)</SelectItem>
                  <SelectItem value="sat-prep">SAT Preparation (60 min)</SelectItem>
                  <SelectItem value="college-app-help">College Application Help (60 min)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea 
                id="notes" 
                value={formData.notes} 
                onChange={handleInputChange} 
                placeholder="Any specific questions or topics you'd like to discuss"
                rows={3}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBackToDateTime}>Back</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Schedule Appointment"
            )}
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Schedule an Appointment</CardTitle>
        <CardDescription>Select a date and time that works for you</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              disabled={(date) => {
                // Disable dates in the past and weekends
                const now = new Date();
                now.setHours(0, 0, 0, 0);
                const day = date.getDay();
                return date < now || day === 0 || day === 6;
              }}
              className="rounded-md border shadow"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-medium mb-3">Available Time Slots</h3>
            {renderTimeSlots()}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleNextStep} 
          disabled={!date || !selectedTime} 
          className="ml-auto"
        >
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CalendarScheduler;
