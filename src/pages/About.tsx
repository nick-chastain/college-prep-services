
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
              <p className="text-lg text-brand-dark/80 leading-relaxed mb-8">
                At College Prep Services, we're passionate about helping students navigate the complex journey 
                to college admission success.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why We Do It Section */}
        <section className="py-20 bg-white">
          <div className="container px-6 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, amount: 0.3 }}
                className="order-2 lg:order-1"
              >
                <img 
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                  alt="Students studying" 
                  className="rounded-2xl shadow-lg w-full h-full object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, amount: 0.3 }}
                className="space-y-6 order-1 lg:order-2"
              >
                <h2 className="text-3xl md:text-4xl font-bold">Why We Do It</h2>
                <p className="text-lg text-brand-dark/80 leading-relaxed">
                  We understand the challenges that students and families face in preparing for college. 
                  The college admissions process has become increasingly competitive and complex, 
                  and standardized tests like the SAT play a significant role in college acceptance decisions.
                </p>
                <p className="text-lg text-brand-dark/80 leading-relaxed">
                  Many students struggle to navigate this process on their own, leading to stress, anxiety, 
                  and potentially missed opportunities. We founded College Prep Services to provide the guidance, 
                  support, and expertise that students need to achieve their college admission goals.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-20 bg-brand-light">
          <div className="container px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-lg text-brand-dark/70 max-w-2xl mx-auto">
                These core principles guide everything we do at College Prep Services.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-2xl font-bold text-brand-teal mb-4">Relationships</h3>
                <p className="text-brand-dark/80">
                  We believe in building strong, trusting relationships with our students and families. 
                  We take the time to understand each student's unique background, goals, strengths, and challenges.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-2xl font-bold text-brand-teal mb-4">Service</h3>
                <p className="text-brand-dark/80">
                  Our goal is to serve our students and families by providing exceptional guidance, 
                  support, and resources. We're committed to being responsive, accessible, and adaptable to meet their needs.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-2xl font-bold text-brand-teal mb-4">Excellence</h3>
                <p className="text-brand-dark/80">
                  We strive for excellence in everything we do. Our tutors are highly qualified experts who stay 
                  current with the latest developments in standardized testing and college admissions.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Meet Our Founder Section */}
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
                <h2 className="text-3xl md:text-4xl font-bold">Meet Our Founder</h2>
                <p className="text-lg text-brand-dark/80 leading-relaxed">
                  Nick Chastain founded College Prep Services with a vision to transform the college preparation 
                  experience for students and families. With over a decade of experience in education and standardized 
                  test preparation, Nick recognized the need for a more personalized, holistic approach to college admissions guidance.
                </p>
                <p className="text-lg text-brand-dark/80 leading-relaxed">
                  Nick holds a degree in Education from the University of Colorado and has helped hundreds of students 
                  achieve significant improvements in their SAT scores and gain admission to their dream colleges.
                </p>
                <p className="text-lg text-brand-dark/80 leading-relaxed">
                  His philosophy is centered on building confidence, developing personalized strategies, and empowering 
                  students to take ownership of their educational journey.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                  alt="Nick Chastain, Founder" 
                  className="rounded-2xl shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-brand-teal text-white">
          <div className="container px-6 mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Get Started?</h2>
              <p className="text-xl text-white/90 mb-8">
                Schedule a consultation to discuss how we can help you achieve your college admission goals.
              </p>
              <Button asChild size="lg" variant="secondary" className="rounded-full px-8">
                <Link to="/schedule">
                  Schedule a Session
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

export default About;
