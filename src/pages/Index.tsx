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
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { testimonials } from '@/data/testimonials';

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
      expandedInfo: "Our College Admissions experts help our students get scholarships—scholarships that help make higher education dreams a reality."
    },
    {
      value: "+11%",
      label: "Average Test Score Increase",
      icon: <BarChart3 size={24} />,
      expandedInfo: "Our tutors are equipped with science-backed strategies to help your student learn faster and lead them to mastery in difficult subject areas."
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
                We don't offer hollow, transactional services; we provide a transformative partnership that serves as a launchpad for lifelong success. Our approach is built on three core pillars that set us apart from every other provider:
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
                <h3 className="text-xl font-semibold mb-4 text-[rgb(87,155,142)]">Attentive, Dedicated Service</h3>
                <p className="text-brand-dark/80 leading-relaxed">
                  We approach every family with a sincere commitment to service excellence, acting as a dedicated mentor for your student's success. We remove the stress from your household by providing a meticulously crafted and highly attentive experience, ensuring every detail is handled and every schedule is met. Our respectful, proactive guidance keeps your student accountable and focused on their goals, allowing you to relax and trust the process.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                viewport={{ once: true, amount: 0.3 }}
                className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-4 text-[rgb(87,155,142)]">Tangible, Lasting Results</h3>
                <p className="text-brand-dark/80 leading-relaxed">
                  The entire reason we do what we do is to deliver on our promise of results. Our expertise is committed to guiding you to exceptional outcomes. We take a methodical, data-driven approach to systematically eliminate weak points, providing your student with an undeniable competitive advantage. We are deeply committed to your student's measurable success, considering it our distinct privilege to guide them to significant score improvements, top-tier college acceptances, and valuable scholarships.                </p>
              </motion.div>
            </div>
            
            <div className="text-center mt-12">
              <Button asChild variant="outline" className="rounded-full px-8 border-[rgb(87,155,142)] text-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)] hover:text-white">
                <Link to="/about">
                  Learn More About Our Philosophy
                </Link>
              </Button>
            </div>
          </div>
        </section>


        {/* Testimonials Section */}
        <section className="py-20 bg-brand-light">
          <div className="container px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Partnerships Speak for Themselves</h2>
              <p className="text-lg text-brand-dark/70 max-w-2xl mx-auto">
                We consider guiding your student to success our distinct privilege. Here are the outcomes our partnerships have made possible.
              </p>
            </div>

            <div className="relative max-w-6xl mx-auto">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {testimonials.map((testimonial, index) => (
                    <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/3">
                      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[rgb(87,155,142)] h-full">
                        <h3 className="text-lg font-bold text-black mb-4">{testimonial.title}</h3>
                        <p className="text-brand-dark/80 leading-relaxed mb-6 italic">
                          "{testimonial.quote}"
                        </p>
                        <div className="text-sm">
                          <div className="font-semibold text-brand-teal">{testimonial.author}</div>
                          <div className="text-brand-dark/60">{testimonial.role}</div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>

            <div className="text-center mt-12">
              <Button asChild variant="outline" className="rounded-full px-8 border-[rgb(87,155,142)] text-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)] hover:text-white">
                <Link to="/client-stories">
                  Read More Success Stories
                </Link>
              </Button>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Partner for Your Student's Success?</h2>
              <p className="text-lg text-white/90 mb-10 leading-relaxed">
                Take the first step toward a transformative partnership with our dedicated experts. We're here to provide the uncompromising service and proven guidance to help your student achieve their academic goals and unlock their full potential.
              </p>
              <div className="flex justify-center">
                <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-[rgb(87,155,142)] text-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)] hover:text-white">
                  <Link to="/contact">
                    Schedule a Free Consultation
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
