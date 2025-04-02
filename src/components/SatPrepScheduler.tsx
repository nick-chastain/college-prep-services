import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getAvailableTimeSlots, createAppointment, AppointmentData } from '@/services/calendarService';

interface SatPrepSchedulerProps {
  formData?: {
    studentName: string;
    parentName: string;
    email: string;
    phone: string;
    serviceType: string;
    notes: string;
  };
  onBack: () => void;
  onComplete: (date: Date, time: string) => void;
}

const SatPrepScheduler: React.FC<SatPrepSchedulerProps> = ({ formData, onBack, onComplete }) => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);

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
      
      getAvailableTimeSlots(date, 'sat-prep')
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

  const handleSubmit = () => {    
    if (!date || !selectedTime) {
      toast({
        title: "Error",
        description: "Please select a date and time",
        variant: "destructive"
      });
      return;
    }
    
    onComplete(date, selectedTime);
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

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Schedule Your SAT Prep Session</CardTitle>
        <CardDescription>Choose a date and time for your SAT preparation session</CardDescription>
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
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button 
          onClick={handleSubmit} 
          disabled={!date || !selectedTime}
        >
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SatPrepScheduler; 