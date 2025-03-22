import { Book, BookOpen, GraduationCap, DollarSign, TrendingUp, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import StatisticCard from '@/components/StatisticCard';
import TestimonialCard from '@/components/TestimonialCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const services = [
    {
      title: "College Application Help",
      description: "Comprehensive guidance through the college application process, from selecting schools to crafting compelling essays.",
      icon: <GraduationCap size={28} />,
      link: "/services"
    },
    {
      title: "SAT Prep Classes",
      description: "Targeted instruction and practice to maximize your SAT scores with proven strategies and techniques.",
      icon: <BookOpen size={28} />,
      link: "/services"
    },
    {
      title: "Individual Tutoring",
      description: "Personalized one-on-one academic support across various high school subjects to improve grades and understanding.",
      icon: <Book size={28} />,
      link: "/services"
    }
  ];

  const stats = [
    {
      value: "$286,536",
      label: "Tuition Costs Saved",
      icon: <DollarSign size={24} />
    },
    {
      value: "+205",
      label: "Average SAT Score Improvement",
      icon: <TrendingUp size={24} />
    },
    {
      value: "+11%",
      label: "Average Test Score Increase",
      icon: <BarChart3 size={24} />
    }
  ];

  const testimonials = [
    {
      quote: "College Prep Services transformed my daughter's college application experience. Their personalized approach helped her gain admission to her dream school with a substantial scholarship.",
      author: "Tara D.",
      role: "Parent"
    },
    {
      quote: "The SAT prep course was exactly what I needed. My score improved by 220 points, which opened up many more college options for me. I couldn't be happier with the results.",
      author: "Michael Smith",
      role: "Student"
    },
    {
      quote: "The individual tutoring helped me understand calculus when I was really struggling. My grades improved dramatically, and I actually started enjoying math!",
      author: "Sophia Lee",
      role: "Student"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />

        {/* Services Section */}
        <section className="py-20 bg-white">
          <div className="container px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
              <p className="text-lg text-brand-dark/70 max-w-2xl mx-auto">
                We offer comprehensive college preparation services tailored to your individual needs and goals.
              </p>
            </div>

            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {services.map((service, index) => (
                <motion.div key={service.title} variants={item}>
                  <ServiceCard {...service} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-20 bg-brand-light">
          <div className="container px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Results</h2>
              <p className="text-lg text-brand-dark/70 max-w-2xl mx-auto">
                We deliver measurable results that help students achieve their academic and college admission goals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <StatisticCard key={stat.label} {...stat} />
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-20 bg-white">
          <div className="container px-6 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, amount: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-3xl md:text-4xl font-bold">Our Philosophy</h2>
                <p className="text-lg text-brand-dark/80 leading-relaxed">
                  At the heart of our philosophy is a commitment to delivering personalized, face-to-face learning experiences that genuinely make a difference in students' lives. Whether through small-group classes, one-on-one tutoring, or expert essay and application counseling, we maximize every moment to provide meaningful, results-driven instruction.
                </p>
                <p className="text-lg text-brand-dark/80 leading-relaxed">
                  In a world of pre-programmed online courses, we make sure your student is dealing with a real person who cares about their success and keeps them committed as they advance towards their goals. We understand that your family is investing both time and money into your student's education, so we ensure every session offers exceptional value by tailoring our approach to meet each student's unique needs and goals.
                </p>
                <p className="text-lg text-brand-dark/80 leading-relaxed">
                  Our goal is to make learning both efficient and impactful, empowering students to achieve their academic and college aspirations with confidence.
                </p>
                <Button asChild className="rounded-full px-8 mt-4">
                  <Link to="/about">
                    Learn More About Us
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-2xl overflow-hidden shadow-lg"
              >
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                  alt="Students studying together" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-brand-light">
          <div className="container px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
              <p className="text-lg text-brand-dark/70 max-w-2xl mx-auto">
                Don't just take our word for it - hear from students and parents who have experienced our services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-brand-teal/90 to-brand-teal relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80')] bg-cover bg-center opacity-10" />
          
          <div className="container px-6 mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Your Pathway to Success Starts Here</h2>
              <p className="text-lg text-white/90 mb-10 leading-relaxed">
                Whether you're preparing for the SAT, working on college applications, or seeking academic support, we're here to help you achieve your goals. Contact us today to get started on your journey to success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="rounded-full px-8">
                  <Link to="/contact">
                    Contact Us Today
                  </Link>
                </Button>
                <Button asChild size="lg" className="rounded-full px-8 bg-brand-teal text-white hover:bg-brand-teal/90 border border-white">
                  <Link to="/schedule">
                    Schedule a Session
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
