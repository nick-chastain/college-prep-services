import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { testimonials } from '@/data/testimonials';

const ClientStories = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-brand-light to-white">
          <div className="container px-6 mx-auto">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Client <span className="text-brand-teal">Success Stories</span>
                </h1>
                <p className="text-xl text-brand-dark/80 leading-relaxed">
                  Discover how our partnerships have transformed students' academic journeys and opened doors to their dream colleges.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Carousel */}
        <section className="py-20 bg-white">
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
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-brand-light">
          <div className="container px-6 mx-auto">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Success Story?</h2>
              <p className="text-lg text-brand-dark/80 mb-8 leading-relaxed">
                Join the students and families who have achieved their academic goals with our expert guidance and personalized approach.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-[rgb(87,155,142)] text-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)] hover:text-white">
                  <Link to="/contact">
                    Schedule a Free Consultation
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-[rgb(87,155,142)] text-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)] hover:text-white">
                  <Link to="/about">
                    Learn More About Us
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

export default ClientStories;
