import { motion } from 'framer-motion';
import { GraduationCap, FileText, Target, Users, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CollegeAdmissionsCounseling = () => {
  const features = [
    {
      icon: <FileText size={32} />,
      title: "Essay Development",
      description: "Craft compelling personal statements and supplemental essays that showcase your unique story."
    },
    {
      icon: <Target size={32} />,
      title: "School Selection",
      description: "Strategic guidance to find the perfect fit colleges that align with your goals and values."
    },
    {
      icon: <Users size={32} />,
      title: "Application Strategy",
      description: "Navigate the complex application process with expert guidance every step of the way."
    },
    {
      icon: <Clock size={32} />,
      title: "Timeline Management",
      description: "Stay organized and meet all deadlines with our comprehensive planning approach."
    },
    {
      icon: <Award size={32} />,
      title: "Scholarship Guidance",
      description: "Maximize your financial aid opportunities and scholarship potential."
    },
    {
      icon: <GraduationCap size={32} />,
      title: "Interview Prep",
      description: "Build confidence for college interviews with our proven preparation techniques."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-brand-light to-white py-20">
          <div className="container px-6 mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                College Admissions Counseling
              </h1>
              <p className="text-xl md:text-2xl text-brand-dark/80 max-w-3xl mx-auto leading-relaxed mb-8">
                Navigate the college admissions process with confidence. Our expert counselors have helped students 
                gain admission to their dream schools and secure over $286,000 in scholarships.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-[rgb(87,155,142)] text-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)] hover:text-white">
                  <Link to="/schedule">
                    Schedule a Free Consultation
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-[rgb(87,155,142)] text-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)] hover:text-white">
                  <Link to="/contact">
                    Learn More
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Admissions Support</h2>
              <p className="text-lg text-brand-dark/70 max-w-2xl mx-auto">
                From initial planning to final acceptance, we provide expert guidance through every phase of your college journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
                >
                  <div className="text-brand-teal mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-brand-dark/70 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-brand-light">
          <div className="container px-6 mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Into Your Dream School?</h2>
              <p className="text-lg text-brand-dark/70 max-w-2xl mx-auto mb-8">
                Our proven approach has helped hundreds of students gain admission to top colleges and universities. 
                Let us guide you to your academic future.
              </p>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-[rgb(87,155,142)] text-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)] hover:text-white">
                <Link to="/schedule">
                  Start Your Application Journey
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CollegeAdmissionsCounseling;
