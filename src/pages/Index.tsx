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
      title: "SAT Test Prep",
      description: "We provide the proven blueprint to help your student achieve a top-tier SAT score with confidence. Our two core programs are meticulously designed to elevate their scores and equip them with the skills to master any exam.",
      icon: <BookOpen size={28} />,
      link: "/sat-test-prep"
    },
    {
      title: "College Admissions Counseling",
      description: "Our holistic, end-to-end partnership simplifies the entire college application process. We offer expert guidance to help your student craft winning essays, find the right college for their unique personality, and earn significant scholarships.",
      icon: <GraduationCap size={28} />,
      link: "/college-admissions-counseling"
    },
    {
      title: "Individual Tutoring",
      description: "Expert guidance, tailored for your student's comprehensive success. We offer personalized, one-on-one tutoring in a range of academic subjects, equipping your student with the skills and confidence to excel in school and beyond.",
      icon: <Book size={28} />,
      link: "/individual-tutoring"
    }
  ];

  const stats = [
    {
      value: "+205",
      label: "Average SAT Score Improvement",
      icon: <TrendingUp size={24} />,
      expandedInfo: "Our proven SAT test strategies lead to higher scores—that means getting into better colleges and opening up scholarship opportunities."
    },
    {
      value: "$286,536",
      label: "Tuition Costs Saved",
      icon: <DollarSign size={24} />,
      expandedInfo: "Our College Application experts help our students get scholarships—scholarships that help make higher education dreams a reality."
    },
    {
      value: "+11%",
      label: "Average Test Score Increase",
      icon: <BarChart3 size={24} />,
      expandedInfo: "Our tutors are equipped with science-backed strategies to help your student learn faster and lead them to mastery in difficult subject areas."
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
        <section id="services" className="py-20 bg-white">
          <div className="container px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
              <p className="text-lg text-brand-dark/70 max-w-3xl mx-auto">
                Our dedicated team is ready to guide your student with an unparalleled level of service and care. Our commitment to their future is our guiding principle, providing the clear path you have been looking for.
              </p>
            </div>

            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {services.map((service) => (
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
              {stats.map((stat) => (
                <StatisticCard key={stat.label} {...stat} />
              ))}
            </div>
          </div>
        </section>

        {/* The College Prep Services Difference Section */}
        <section className="py-20 bg-white">
          <div className="container px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">The College Prep Services Difference</h2>
              <p className="text-lg text-brand-dark/70 max-w-3xl mx-auto">
                We're not here to offer hollow, transactional services; we provide a transformative partnership. Our approach is built on three core pillars that set us apart from every other provider:
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, amount: 0.3 }}
                className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-4 text-[rgb(87,155,142)]">Beyond the Score</h3>
                <p className="text-brand-dark/80 leading-relaxed">
                  While other companies focus on score guarantees alone, we focus on developing lifelong skills. The skills we teach—like managing test anxiety, leveraging data for strategic studying, and effective time management—are transferable and will help your student excel far beyond the test, in college and throughout their life. Our commitment is to their complete success and peace of mind.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-4 text-[rgb(87,155,142)]">Data-Driven, Personalized Practice</h3>
                <p className="text-brand-dark/80 leading-relaxed">
                  We have an unparalleled ability to provide truly personalized practice. Our partnership with the SAT Crash Course platform offers an unmatched level of insight into your student's learning journey. The platform is designed to look exactly like the Bluebook SAT, so your student is comfortable with the format and knows exactly how to navigate the test on exam day. We are committed to guiding you to exceptional outcomes.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                viewport={{ once: true, amount: 0.3 }}
                className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-4 text-[rgb(87,155,142)]">End-to-End College and Career Guidance</h3>
                <p className="text-brand-dark/80 leading-relaxed">
                  Your student's success is our dedicated pursuit. We offer comprehensive support that goes beyond test prep and academic tutoring to address the entire college admissions process. We help students craft winning essays, discern the right colleges for their unique personalities, and build their resume throughout their high school career. This holistic approach is an integrated part of our service, not just an add-on, providing the strategic guidance you've been looking for.
                </p>
              </motion.div>
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
                <Button asChild variant="outline" className="rounded-full px-8 mt-4 border-[rgb(87,155,142)] text-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)] hover:text-white">
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
                  src={`${import.meta.env.BASE_URL}our-philosophy.png`}
                  alt="Our Philosophy" 
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
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80')] bg-cover bg-center opacity-40" />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/40 to-brand-teal/40" />
          
          <div className="container px-6 mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Your Pathway to Success Starts Here</h2>
              <p className="text-lg text-white/90 mb-10 leading-relaxed">
                Whether you're preparing for the SAT, working on college applications, or seeking academic support, we're here to help you achieve your goals. Contact us today to get started on your journey to success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-[rgb(87,155,142)] text-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)] hover:text-white">
                  <Link to="/contact">
                    Schedule a Free Consultation
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-[rgb(87,155,142)] text-[rgb(87,155,142)] hover:text-white hover:bg-[rgb(87,155,142)]">
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
