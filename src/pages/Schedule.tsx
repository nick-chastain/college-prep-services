import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CalendarScheduler from '@/components/CalendarScheduler';
import { motion } from 'framer-motion';
import { Calendar, Clock, Check, Mail } from 'lucide-react';

const Schedule = () => {
  const steps = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Select a Date",
      description: "Choose from our available appointment dates"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Pick a Time",
      description: "Select a convenient time slot"
    },
    {
      icon: <Check className="w-6 h-6" />,
      title: "Confirm Details",
      description: "Fill in your information"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Receive Confirmation",
      description: "Get email confirmation and reminders"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <section className="py-12 bg-[rgb(87,155,142)]">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Schedule Your Session</h1>
              <p className="text-lg text-white/90">
                Take the first step towards your academic success by scheduling a personalized session with our expert tutors and college advisors.
              </p>
            </div>

            {/* Calendar scheduler comes first now */}
            <CalendarScheduler />

            {/* Step cards moved below the calendar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mt-16 mb-16">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-5 md:p-6 text-center shadow-sm border border-gray-100"
                >
                  <div className="rounded-full w-12 h-12 md:w-14 md:h-14 bg-accent flex items-center justify-center mb-4 mx-auto text-brand-teal">
                    {step.icon}
                  </div>
                  <h3 className="text-base md:text-lg font-medium mb-2">{step.title}</h3>
                  <p className="text-brand-dark/70 text-xs md:text-sm">{step.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 bg-white rounded-xl p-6 md:p-8 border border-gray-100 shadow-sm max-w-2xl mx-auto">
              <h3 className="text-xl font-medium mb-4">Scheduling Policies</h3>
              <ul className="space-y-3 text-brand-dark/80 text-sm md:text-base">
                <li className="flex items-start">
                  <span className="text-brand-teal mr-2">•</span>
                  <span>Sessions can be scheduled up to 4 weeks in advance.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-teal mr-2">•</span>
                  <span>Cancellations must be made at least 24 hours before your scheduled session.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-teal mr-2">•</span>
                  <span>Late cancellations or no-shows may be subject to a fee.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-teal mr-2">•</span>
                  <span>Initial consultations are approximately 60 minutes.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-teal mr-2">•</span>
                  <span>For technical issues with scheduling, please contact our support team.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Schedule;
