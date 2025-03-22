
import { useState } from 'react';
import { motion } from 'framer-motion';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
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
    }, 1500);
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
            </motion.div>
          </div>
        </section>

        {/* Contact Form & Email */}
        <section className="py-20 bg-white">
          <div className="container px-6 mx-auto">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
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
                          <SelectItem value="college-application">College Application Help</SelectItem>
                          <SelectItem value="sat-prep">SAT Prep Classes</SelectItem>
                          <SelectItem value="tutoring">Individual Tutoring</SelectItem>
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
                      className="w-full rounded-full bg-brand-teal hover:bg-brand-teal/90 text-white"
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
                  <Mail className="text-brand-teal mr-2" />
                  <h3 className="font-medium">Email</h3>
                </div>
                <p className="text-brand-dark/70">info@collegeprepservicesllc.com</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-brand-light">
          <div className="container px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-brand-dark/70 max-w-2xl mx-auto">
                Find answers to our most commonly asked questions below.
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <h3 className="text-xl font-medium mb-2">How early should we start SAT preparation?</h3>
                <p className="text-brand-dark/80">
                  We recommend starting SAT preparation at least 3-6 months before your planned test date. 
                  This gives adequate time to learn strategies, practice, and improve your scores.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <h3 className="text-xl font-medium mb-2">When should we begin the college application process?</h3>
                <p className="text-brand-dark/80">
                  Ideally, students should begin thinking about college applications in their junior year of high school. 
                  The summer before senior year is when applications should start being completed.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <h3 className="text-xl font-medium mb-2">Do you offer virtual tutoring sessions?</h3>
                <p className="text-brand-dark/80">
                  Yes, we offer both in-person and virtual tutoring sessions. Our online platform provides 
                  the same quality instruction with added convenience for busy families.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <h3 className="text-xl font-medium mb-2">How much do your services cost?</h3>
                <p className="text-brand-dark/80">
                  Our service costs vary depending on the specific program and duration. We offer package options 
                  as well as hourly rates. Please contact us for a personalized quote based on your needs.
                </p>
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
