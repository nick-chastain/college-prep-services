import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getAvailableTimeSlots, createAppointment, AppointmentData } from '@/services/calendarService';
import SatPrepScheduler from './SatPrepScheduler';

type Step = 'date-time' | 'form' | 'confirmation';

interface FormData {
  studentName: string;
  parentName: string;
  email: string;
  phone: string;
  serviceType: string;
  course?: string;  // For Private Tutoring
  applicationMaterials?: FileList | null;  // For College App Help
  notes: string;
}

const CalendarScheduler = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<Step>('form');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    serviceType: 'private-tutoring',
    notes: '',
    applicationMaterials: null
  });
  const [bookingConfirmation, setBookingConfirmation] = useState<{
    date: string;
    time: string;
    serviceType: string;
    eventId: string;
  } | null>(null);

  const today = new Date();
  const bufferDate = new Date();
  bufferDate.setDate(today.getDate() + 3);

  const disabledDays = [
    { before: bufferDate },
    { dayOfWeek: [0, 6] }  // 0 is Sunday, 6 is Saturday
  ];

  useEffect(() => {
    if (date) {
      setLoading(true);
      setSelectedTime(null);
      
      // Format date as YYYY-MM-DD
      const formattedDate = date.toISOString().split('T')[0];
      
      getAvailableTimeSlots(date, formData.serviceType)
        .then(slots => {
          if (Array.isArray(slots)) {
            setTimeSlots(slots);
          } else {
            console.error('Invalid time slots format:', slots);
            setTimeSlots([]);
            toast({
              title: "Error",
              description: "Failed to load time slots. Please try again.",
              variant: "destructive"
            });
          }
        })
        .catch(error => {
          console.error('Error fetching time slots:', error);
          setTimeSlots([]);
          toast({
            title: "Error",
            description: "Failed to fetch available time slots. Please try again.",
            variant: "destructive"
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setTimeSlots([]);
    }
  }, [date, formData.serviceType, toast]);

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

    setLoading(true);
    const appointmentData: AppointmentData = {
      date: date,
      timeSlot: selectedTime,
      studentName: formData.studentName,
      parentName: formData.parentName || undefined,
      email: formData.email,
      phone: formData.phone,
      serviceType: formData.serviceType,
      course: formData.course,
      notes: formData.notes || undefined,
      applicationMaterials: formData.applicationMaterials || undefined
    };
    
    createAppointment(appointmentData)
      .then(response => {
        setBookingConfirmation({
          date: new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
          time: selectedTime,
          serviceType: formData.serviceType === 'private-tutoring' 
            ? 'Private Tutoring' 
            : 'College Application Help',
          eventId: response.eventId
        });
        setStep('confirmation');
        toast({
          title: "Appointment Scheduled",
          description: "Your appointment has been successfully scheduled!",
          variant: "default"
        });
      })
      .catch(error => {
        console.error('Error creating appointment:', error);
        toast({
          title: "Booking Failed",
          description: "Failed to book your appointment. Please try again.",
          variant: "destructive"
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleBackToForm = () => {
    setStep('form');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleServiceChange = (value: string) => {
    setFormData(prev => ({ ...prev, serviceType: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.studentName || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Course validation for Private Tutoring
    if (formData.serviceType === 'private-tutoring' && !formData.course) {
      toast({
        title: "Missing Information",
        description: "Please select a course for private tutoring",
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

    // Route to appropriate calendar based on service type
    if (formData.serviceType === 'sat-prep') {
      setStep('date-time');
    } else {
      setStep('date-time');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({ ...prev, applicationMaterials: e.target.files }));
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
      serviceType: 'private-tutoring',
      notes: '',
      applicationMaterials: null
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
            Fill out your information to proceed to scheduling
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit} className="space-y-4">
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
                  <SelectItem value="private-tutoring">Private Tutoring</SelectItem>
                  <SelectItem value="college-app-help">College Application Help</SelectItem>
                  <SelectItem value="sat-prep">SAT Preparation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.serviceType === 'private-tutoring' && (
              <div className="space-y-2">
                <Label htmlFor="course">Course *</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, course: value }))} value={formData.course}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="algebra-1">Algebra I</SelectItem>
                    <SelectItem value="algebra-2">Algebra II</SelectItem>
                    <SelectItem value="geometry">Geometry</SelectItem>
                    <SelectItem value="trigonometry">Trigonometry</SelectItem>
                    <SelectItem value="precalculus">Precalculus</SelectItem>
                    <SelectItem value="ap-calc-ab">AP Calculus AB (I)</SelectItem>
                    <SelectItem value="ap-calc-bc">AP Calculus BC (II)</SelectItem>
                    <SelectItem value="physics">Physics (Honors or Standard)</SelectItem>
                    <SelectItem value="ap-physics-1-2">AP Physics 1 and 2 (Algebra Based)</SelectItem>
                    <SelectItem value="ap-physics-c">AP Physics C (Calculus Based)</SelectItem>
                    <SelectItem value="chemistry">Chemistry (Honors or Standard)</SelectItem>
                    <SelectItem value="ap-chemistry">AP Chemistry</SelectItem>
                    <SelectItem value="organic-chemistry">Organic Chemistry</SelectItem>
                    <SelectItem value="biology">Biology (Honors or Standard)</SelectItem>
                    <SelectItem value="ap-biology">AP Biology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {formData.serviceType === 'college-app-help' && (
              <div className="space-y-2">
                <Label htmlFor="applicationMaterials">Current Application Materials (Optional)</Label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-brand-teal transition-colors">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="applicationMaterials" className="relative cursor-pointer rounded-md font-medium text-brand-teal hover:text-brand-teal/90">
                        <span>Upload files</span>
                        <Input 
                          id="applicationMaterials" 
                          type="file"
                          onChange={handleFileChange}
                          multiple
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB each</p>
                  </div>
                </div>
              </div>
            )}
            
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
        <CardFooter className="flex justify-end">
          <Button onClick={handleFormSubmit}>
            Continue to Scheduling
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (step === 'date-time') {
    if (formData.serviceType === 'sat-prep') {
      return (
        <SatPrepScheduler 
          onBack={handleBackToForm}
          onComplete={(selectedDate, selectedTime) => {
            setLoading(true);
            const appointmentData: AppointmentData = {
              date: selectedDate,
              timeSlot: selectedTime,
              studentName: formData.studentName,
              parentName: formData.parentName || undefined,
              email: formData.email,
              phone: formData.phone,
              serviceType: 'sat-prep',
              notes: formData.notes || undefined
            };
            
            createAppointment(appointmentData)
              .then(response => {
                setBookingConfirmation({
                  date: new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
                  time: selectedTime,
                  serviceType: 'SAT Preparation',
                  eventId: response.eventId
                });
                setStep('confirmation');
                toast({
                  title: "SAT Prep Session Scheduled",
                  description: "Your SAT preparation session has been successfully scheduled!",
                  variant: "default"
                });
              })
              .catch(error => {
                console.error('Error creating appointment:', error);
                toast({
                  title: "Booking Failed",
                  description: "Failed to book your session. Please try again.",
                  variant: "destructive"
                });
              })
              .finally(() => {
                setLoading(false);
              });
          }}
        />
      );
    }

    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">Select Your Appointment Time</CardTitle>
          <CardDescription>Choose a date and time that works for you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-4">Select a Date & Time</h3>
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                disabled={disabledDays}
                className="rounded-md border shadow"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium mb-3">Available Time Slots</h3>
              {renderTimeSlots()}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBackToForm}>Back</Button>
          <Button 
            onClick={handleNextStep} 
            disabled={!date || !selectedTime}
          >
            Continue
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
            <h3 className="text-lg font-semibold mb-4">Select a Date & Time</h3>
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              disabled={disabledDays}
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
