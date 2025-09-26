import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    service: 'general-question',
    referral: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('https://n8n-production-0a45.up.railway.app/webhook/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          service: formData.service,
          referral: formData.referral,
          message: formData.message,
          timestamp: new Date().toISOString()
        }),
      });
      
      if (response.ok) {
        toast({
          title: "Message Sent",
          description: "Thank you for contacting us. We'll get back to you soon!",
        });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          service: 'general-question',
          referral: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="py-16 bg-brand-light">
          <div className="container px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
              <p className="text-lg text-brand-dark/80 leading-relaxed mb-8">
                Have questions or ready to get started? Reach out to us today.
              </p>
              <div className="flex justify-center">
                <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-[rgb(87,155,142)] text-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)] hover:text-white">
                  <Link to="/faq">
                    View Frequently Asked Questions
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Form & Email */}
        <section className="py-20 bg-[rgb(87,155,142)]">
          <div className="container px-6 mx-auto">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-white/10 mb-8">
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          name="firstName" 
                          value={formData.firstName} 
                          onChange={handleInputChange} 
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          name="lastName" 
                          value={formData.lastName} 
                          onChange={handleInputChange} 
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="service">Service Interested In</Label>
                      <Select 
                        value={formData.service} 
                        onValueChange={(value) => handleSelectChange('service', value)}
                        defaultValue="general-question"
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general-question">General Question</SelectItem>
                          <SelectItem value="sat-prep">SAT Test Prep</SelectItem>
                          <SelectItem value="college-application">College Admissions Counseling</SelectItem>                          
                          <SelectItem value="tutoring">Academic Tutoring</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="referral">How Did You Hear About Us?</Label>
                      <Select 
                        value={formData.referral} 
                        onValueChange={(value) => handleSelectChange('referral', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="word-of-mouth">Word of Mouth</SelectItem>
                          <SelectItem value="friend-referral">Referral from a Friend</SelectItem>
                          <SelectItem value="social-media">Social Media</SelectItem>
                          <SelectItem value="search-engine">Search Engine</SelectItem>
                          <SelectItem value="online-ad">Online Advertisement</SelectItem>
                          <SelectItem value="print-ad">Print Advertisement</SelectItem>
                          <SelectItem value="review-site">Review Site</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        name="message" 
                        rows={4} 
                        value={formData.message} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full rounded-full bg-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)]/90 text-white"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className="text-center"
              >
                <div className="flex items-center justify-center mb-2">
                  <Mail className="text-white mr-2" />
                  <h3 className="font-medium text-white">Email</h3>
                </div>
                <a 
                  href="mailto:info@collegeprepservicesllc.com" 
                  className="text-white/90 hover:text-white transition-colors"
                >
                  info@collegeprepservicesllc.com
                </a>
              </motion.div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Contact;
