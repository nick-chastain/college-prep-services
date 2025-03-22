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
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
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
                  There aren't many times more overwhelming for a family than those last couple years of high school. 
                  Suddenly, you and your student are consumed by a mountain of decisions that will shape their future 
                  and by the pressure that they perform well on all their exams–and all the while your student is expected 
                  to keep up with school, extracurriculars, and sleep.
                </p>
                <p className="text-lg text-brand-dark/80 leading-relaxed">
                  Emotions can run thin during this time. Fights explode because an application didn't get submitted on time. 
                  Tears fall because a test score wasn't quite high enough for a dream school. Frustration sets in after 
                  three hours sitting in front of a computer looking at a list of essay prompts and, frozen by indecision, 
                  there's not a single word on the page.
                </p>
                <p className="text-lg text-brand-dark/80 leading-relaxed">
                  At College Prep Services, we're dedicated to lifting that stress from your shoulders by navigating you 
                  and your student through the college prep process. Our team's motive is making SAT test prep and college 
                  applications feel a lot more manageable, enabling your home to be more peaceful and your student to be 
                  more successful.
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
                  Relationships are the cornerstone of what we do. By building strong relationships, 
                  we create an environment where students are encouraged to excel and stay committed to their goals.
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
                  Service is what motivates us. We are dedicated to exceeding your expectations by providing 
                  high-quality, personalized support that meets each student's unique needs.
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
                  Excellence is our North Star. We strive to provide excellent guidance and tutoring 
                  so that your student may achieve exceptional results.
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
                <h3 className="text-2xl md:text-3xl font-semibold text-brand-teal">Nick Chastain</h3>
                <p className="text-lg text-brand-dark/80 leading-relaxed">
                  Nick graduated with a Chemical and Biological Engineering degree from Colorado State University 
                  where he was the 2023 Colorado Engineering Council Silver Medal Award Winner, the highest award 
                  a graduating engineer can achieve in the state of Colorado. He is now living in Denver working 
                  for Merrick & Company as a Process Engineer for their Nuclear Services and Technology team.
                </p>
                <p className="text-lg text-brand-dark/80 leading-relaxed">
                  College Prep Services was a fledgling idea when Nick began to help friends and family with their 
                  college application essays. As an avid reader his whole life, Nick loves a good story. He now 
                  loves helping others tell their own story and seeing their excitement when those stories lead 
                  to acceptances at dream schools and programs.
                </p>
                <p className="text-lg text-brand-dark/80 leading-relaxed">
                  Tutoring was a similar story: Nick started by tutoring his cousin in school and for the SAT. 
                  He saw her confidence grow as she began to understand the material; she was adamant that Nick 
                  should tutor more people. From that little nudge, College Prep Services was born–Nick is so 
                  excited to help more students reach their potential and get into their dream schools!
                </p>
                <p className="text-lg text-brand-dark/80 leading-relaxed">
                  In his free time, Nick has kept up playing lacrosse, loves to dive into all sorts of books, 
                  and enjoys Colorado's beautiful outdoors by hiking, mountain biking, and skiing.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <img 
                  src={`${import.meta.env.BASE_URL}Professional-Headshot-1024x1024.png`} 
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Get In Touch</h2>
              <p className="text-xl text-white/90 mb-8">
                Have questions? Weʼre here to help! Reach out and start your journey to success today.
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
