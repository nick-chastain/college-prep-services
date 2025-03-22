
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CalendarClock, Clock, ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const AVAILABLE_TIMES = [
  '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
];

const SERVICE_TYPES = [
  'SAT Prep', 'College Application Help', 'Individual Tutoring'
];

const CalendarScheduler = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
  const [currentStep, setCurrentStep] = useState(1);
  const isMobile = useIsMobile();

  const handleDateSelect = (date: Date | undefined) => {
    setDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle form submission 
    alert('Appointment scheduled successfully!');
    setCurrentStep(1);
    setDate(undefined);
    setSelectedTime(undefined);
  };

  // Get a user-friendly display of what step we're on for mobile
  const getStepLabel = () => {
    switch (currentStep) {
      case 1: return "Select Date & Time";
      case 2: return "Your Information";
      case 3: return "Confirmation";
      default: return "Select Date & Time";
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg border border-gray-100">
      <CardHeader className="text-center px-4 sm:px-6">
        <CardTitle className="text-xl sm:text-2xl font-bold">Schedule a Session</CardTitle>
        <CardDescription>
          Select a date and time for your appointment
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        {isMobile ? (
          // Mobile-friendly tabs alternative - shows current step label
          <div className="mb-6 text-center">
            <div className="inline-block bg-muted px-4 py-2 rounded-md text-sm font-medium">
              {getStepLabel()} (Step {currentStep} of 3)
            </div>
          </div>
        ) : (
          // Regular tabs for larger screens
          <Tabs defaultValue="step1" value={`step${currentStep}`}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="step1" disabled={currentStep !== 1} className="text-xs sm:text-sm">
                Select Date & Time
              </TabsTrigger>
              <TabsTrigger value="step2" disabled={currentStep !== 2} className="text-xs sm:text-sm">
                Your Information
              </TabsTrigger>
              <TabsTrigger value="step3" disabled={currentStep !== 3} className="text-xs sm:text-sm">
                Confirmation
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}

        <div className="mt-6">
          {currentStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-base md:text-lg font-medium mb-4 flex items-center">
                  <CalendarClock className="mr-2 h-4 w-4 md:h-5 md:w-5 text-brand-teal" />
                  Select a Date
                </h3>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  className="rounded-md border shadow-sm pointer-events-auto"
                  disabled={(date) => {
                    // Disable past days and weekends
                    const now = new Date();
                    now.setHours(0, 0, 0, 0);
                    const day = date.getDay();
                    return date < now || day === 0 || day === 6;
                  }}
                />
              </div>

              <div className={date ? "opacity-100" : "opacity-50 pointer-events-none"}>
                <h3 className="text-base md:text-lg font-medium mb-4 flex items-center">
                  <Clock className="mr-2 h-4 w-4 md:h-5 md:w-5 text-brand-teal" />
                  Select a Time
                </h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {AVAILABLE_TIMES.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      className={`text-xs sm:text-sm py-4 sm:py-6 ${
                        selectedTime === time ? "bg-brand-teal text-white" : "text-brand-dark"
                      }`}
                      onClick={() => handleTimeSelect(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end mt-8 md:col-span-2">
                <Button 
                  onClick={nextStep} 
                  disabled={!date || !selectedTime}
                  className="flex items-center gap-2"
                >
                  Next Step <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <form>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2 md:space-y-3">
                    <Label htmlFor="studentName">Student Name</Label>
                    <Input id="studentName" placeholder="Full name" required />
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <Label htmlFor="parentName">Parent/Guardian Name (if applicable)</Label>
                    <Input id="parentName" placeholder="Full name" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2 md:space-y-3">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="yourname@example.com" required />
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="(123) 456-7890" required />
                  </div>
                </div>

                <div className="space-y-2 md:space-y-3">
                  <Label htmlFor="serviceType">Service Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICE_TYPES.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:space-y-3">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Tell us about your specific needs or any questions you have"
                    className="min-h-[100px] sm:min-h-[120px]"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={prevStep}>
                  Back
                </Button>
                <Button onClick={nextStep}>
                  Review & Confirm
                </Button>
              </div>
            </form>
          )}

          {currentStep === 3 && (
            <>
              <div className="bg-accent rounded-lg p-4 md:p-6 mb-6">
                <h3 className="text-base md:text-lg font-medium mb-4">Appointment Details</h3>
                <div className="space-y-3 text-sm md:text-base">
                  <div className="flex justify-between">
                    <span className="text-brand-dark/70">Date:</span>
                    <span className="font-medium">{date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-dark/70">Time:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-dark/70">Service:</span>
                    <span className="font-medium">SAT Prep</span>
                  </div>
                </div>
              </div>

              <p className="text-brand-dark/80 text-xs md:text-sm mb-6">
                By confirming this appointment, you agree to our cancellation policy. We'll send a confirmation email with details and instructions.
              </p>

              <div className="flex justify-between mt-6 md:mt-8">
                <Button variant="outline" onClick={prevStep}>
                  Back
                </Button>
                <Button onClick={handleSubmit}>
                  Confirm Appointment
                </Button>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarScheduler;
