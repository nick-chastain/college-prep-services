import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  const values = [
    {
      title: "Dedication to Exceptional Results",
      description: "We are deeply committed to the measurable success of our students, focusing our expertise and efforts on delivering impactful academic and personal growth."
    },
    {
      title: "Uncompromising Service",
      description: "We are devoted to providing a superior level of service that is both highly professional and profoundly attentive, anticipating needs and ensuring a seamless, truly valued client experience."
    },
    {
      title: "Empowering, Trusting Partnerships",
      description: "We approach every client as a valued individual, providing straightforward guidance with genuine warmth and humility, ensuring they feel cared for, understood, and never a burden, throughout their entire journey with us."
    }
  ];

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

        {/* Our Philosophy Section */}
        <section className="py-20 bg-white">
          <div className="container px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, amount: 0.3 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Philosophy</h2>
              <p className="text-xl md:text-2xl text-brand-dark/80 leading-relaxed">
                At our core, we believe that academic and life success are earned. Our uncompromising service excellence and genuine guidance are a direct source of strength for your student, empowering them to achieve their full potential.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 bg-brand-light">
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
                <h2 className="text-3xl md:text-4xl font-bold">Our Story: The Passion Behind the Partnership</h2>
                <p className="text-lg text-brand-dark/80 leading-relaxed">
                  There aren't many things more overwhelming for a family than those last couple of years of high school. 
                  Suddenly, you and your student are consumed by decisions that will shape their future. Frustration sets in 
                  when there's no clear path forward and no one to turn to for guidance.
                </p>
                <p className="text-lg text-brand-dark/80 leading-relaxed">
                  College Prep Services was founded to lift that stress from your shoulders and guide your family through 
                  the process with unwavering care. Our team's sole purpose is to make test prep and college applications 
                  feel manageable, enabling your home to be more peaceful and your student more successful.
                </p>
                <p className="text-lg text-brand-dark/80 leading-relaxed">
                The challenges of the COVID-19 pandemic severely impacted the academic foundations of many students. 
                Seeing this problem firsthand with his cousin—who was struggling with core subjects vital for success—drove our founder, Nick, to create 
                a better solution. His passion is to instill or restore the confidence in each student that they can succeed and achieve their goals.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-20 bg-white">
          <div className="container px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values: The Guiding Principles</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="bg-white rounded-2xl p-8 shadow-lg shadow-brand-teal/10 hover:shadow-2xl hover:shadow-brand-teal/30 transition-all duration-300 border-2 border-[rgb(87,155,142)]"
                >
                  <h3 className="text-2xl font-bold text-[rgb(87,155,142)] mb-4">{value.title}</h3>
                  <p className="text-brand-dark/80 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet the Expert Section */}
        <section className="py-20 bg-brand-light">
          <div className="container px-6 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, amount: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-3xl md:text-4xl font-bold">Meet the Expert: The Founder's Profile</h2>
                <h3 className="text-2xl md:text-3xl font-semibold text-[rgb(87,155,142)]">Nick Chastain</h3>
                <p className="text-lg text-brand-dark/80 leading-relaxed">
                  Nick graduated with a Chemical and Biological Engineering degree from Colorado State University with minors in Entrepreneurship and Innovation, Mathematics, and Chemistry.
                  As a senior, he earned the Silver Medal Award, the highest award a graduating engineer can achieve in the state of Colorado.
                  As a Process Engineer for Merrick & Company, his professional life is centered on solving complex, high-stakes 
                  problems in the nuclear industry with meticulous attention to detail.
                </p>
                <p className="text-lg text-brand-dark/80 leading-relaxed">
                  This passion for solving problems, combined with a desire to help others reach their potential, is what drove him to 
                  start College Prep Services. What began as helping his cousin with a test prep problem quickly 
                  grew into a mission to help high school students get into their dream schools and confidently pursue their future. 
                  As an avid reader and outdoor enthusiast, Nick believes in the power of a great story and the 
                  importance of a well-rounded life.
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

        {/* Our Proven Approach Section */}
        <section className="py-20 bg-white">
          <div className="container px-6 mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Proven Approach: Your Path to Success</h2>
              <p className="text-xl text-brand-dark/80 mb-8">
                Don't just take our word for it. See the results of our philosophy in action.
              </p>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-[rgb(87,155,142)] text-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)] hover:text-white">
                <Link to="/client-stories">
                  See Our Success Stories
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