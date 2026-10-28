import { ClipboardList, Map, CalendarCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { testimonials } from '@/data/testimonials';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { PAGE_META } from '@/data/seo';
import { homeCardLines, OFFERS } from '@/data/offers';

const Index = () => {
  useDocumentMeta(PAGE_META.home.title, PAGE_META.home.description);

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

  const paths = [
    {
      title: OFFERS.pinnacle.name,
      description: homeCardLines.pinnacle,
      icon: <ClipboardList size={28} />,
      link: "/sat-test-prep#pinnacle"
    },
    {
      title: OFFERS.ascension.name,
      description: homeCardLines.ascension,
      icon: <Map size={28} />,
      link: "/sat-test-prep#ascension"
    },
    {
      title: OFFERS.cohort.name,
      description: homeCardLines.cohort,
      icon: <CalendarCheck size={28} />,
      link: "/sat-test-prep#cohort"
    },
    {
      title: OFFERS["ai-tutor"].name,
      description: homeCardLines["ai-tutor"],
      icon: <ClipboardList size={28} />,
      link: "/sat-test-prep#ai-tutor"
    }
  ];

  const steps = [
    {
      title: "Diagnostic",
      description: "We start with a diagnostic so the plan is based on your student's actual score, not a guess."
    },
    {
      title: "Personalized plan",
      description: "Your student gets a Personalized Weakness Blueprint that targets the question types costing the most points."
    },
    {
      title: "Weekly sessions + practice tests",
      description: "1.5-hour weekly sessions and scheduled full-length practice tests keep progress measurable."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />

        <section id="services" className="py-20 bg-white">
          <div className="container px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your SAT Path</h2>
              <p className="text-lg text-brand-dark/70 max-w-3xl mx-auto">
                Four ways to prepare. Every live program uses a diagnostic, a written plan, and full-length practice tests.
              </p>
            </div>

            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {paths.map((path) => (
                <motion.div key={path.title} variants={item}>
                  <ServiceCard {...path} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-brand-light">
          <div className="container px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-brand-dark/70 max-w-2xl mx-auto">
                A clear plan from the first diagnostic through test day.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div key={step.title} className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[rgb(87,155,142)]">
                  <div className="text-brand-teal font-bold mb-3">0{index + 1}</div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-brand-dark/80 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">More Than a Score Jump</h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, amount: 0.3 }}
              className="max-w-3xl mx-auto text-center"
            >
              <p className="text-lg text-brand-dark/80 leading-relaxed">
                Every program starts with a diagnostic and a Personalized Weakness Blueprint, then targets exactly what's costing your student points. Along the way we coach the skills the SAT really tests under pressure: pacing, test-day nerves, and how to study from data instead of guessing. Those skills stay with your student long after test day.
              </p>
            </motion.div>
            
            <div className="text-center mt-12">
              <Button asChild variant="outline" className="rounded-full px-8 border-[rgb(87,155,142)] text-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)] hover:text-white">
                <Link to="/about">
                  Learn More About Our Philosophy
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-brand-light">
          <div className="container px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Partnerships Speak for Themselves</h2>
              <p className="text-lg text-brand-dark/70 max-w-2xl mx-auto">
                Real feedback from SAT students and parents.
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
                    <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
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

        <section className="py-24 relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80')] bg-cover bg-center opacity-40" />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/40 to-brand-teal/40" />
          
          <div className="container px-6 mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Start Your Success Story?</h2>
              <p className="text-lg text-white/90 mb-10 leading-relaxed">
                Book a free strategy session. We'll review your student's current score, target, and test date, and recommend the right program.
              </p>
              <div className="flex justify-center">
                <Button asChild size="lg" className="rounded-full px-8 bg-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)]/90 text-white">
                  <Link to="/contact">
                    Book a Free Strategy Session
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
