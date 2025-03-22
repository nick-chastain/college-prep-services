
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, GraduationCap, Book, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Services = () => {
  const serviceFeatures = [
    {
      title: "College Application Help",
      description: "Comprehensive guidance through every aspect of the college application process.",
      icon: <GraduationCap size={32} />,
      features: [
        "Personalized college selection strategy",
        "Application timeline management",
        "Essay coaching and review",
        "Interview preparation",
        "Scholarship application assistance",
        "Financial aid guidance"
      ]
    },
    {
      title: "SAT Prep Classes",
      description: "Targeted instruction and practice to maximize your SAT scores with proven strategies.",
      icon: <BookOpen size={32} />,
      features: [
        "Comprehensive content review",
        "Test-taking strategies",
        "Practice with real SAT questions",
        "Personalized study plans",
        "Regular progress assessments",
        "Small group and individual sessions"
      ]
    },
    {
      title: "Individual Tutoring",
      description: "One-on-one academic support across various high school subjects to improve grades.",
      icon: <Book size={32} />,
      features: [
        "Customized learning plans",
        "Subject-specific expertise",
        "Homework help and review",
        "Exam preparation",
        "Study skills development",
        "Regular progress reports"
      ]
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
              <p className="text-lg text-brand-dark/80 leading-relaxed mb-8">
                We offer comprehensive college preparation services tailored to your individual needs and goals.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Detail Section */}
        <section className="py-20 bg-white">
          <div className="container px-6 mx-auto">
            <div className="space-y-24">
              {serviceFeatures.map((service, index) => (
                <div 
                  key={service.title}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
                  >
                    <div className="text-brand-teal mb-2">{service.icon}</div>
                    <h2 className="text-3xl md:text-4xl font-bold">{service.title}</h2>
                    <p className="text-lg text-brand-dark/80 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle2 size={20} className="text-brand-teal mt-1 mr-3 flex-shrink-0" />
                          <span className="text-brand-dark/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4">
                      <Button asChild className="rounded-full px-6 bg-brand-teal hover:bg-brand-teal/90 text-white">
                        <Link to="/schedule">
                          Schedule a Session
                        </Link>
                      </Button>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className={index % 2 === 1 ? 'lg:col-start-1' : ''}
                  >
                    <img 
                      src={`https://images.unsplash.com/photo-${index === 0 
                        ? '1523240795612-9a054b0db644'
                        : index === 1 
                          ? '1455894127589-22f75500213a'
                          : '1517245386807-bb43f82c33c4'
                      }?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80`} 
                      alt={service.title} 
                      className="rounded-2xl shadow-lg w-full h-full object-cover"
                    />
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Areas We Serve Section */}
        <section className="py-20 bg-brand-light">
          <div className="container px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Areas We Serve</h2>
              <p className="text-lg text-brand-dark/70 max-w-2xl mx-auto">
                We offer our services throughout the greater Denver metropolitan area, including:
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center max-w-4xl mx-auto"
            >
              {["Denver", "Aurora", "Lakewood", "Centennial", "Highlands Ranch", "Littleton", "Englewood", "Cherry Creek"].map((area) => (
                <div key={area} className="bg-white rounded-xl p-4 shadow-sm">
                  <span className="font-medium text-brand-dark">{area}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Courses We Tutor Section */}
        <section className="py-20 bg-white">
          <div className="container px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Courses We Tutor</h2>
              <p className="text-lg text-brand-dark/70 max-w-2xl mx-auto">
                Our experienced tutors provide support across a wide range of high school subjects, including:
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-bold text-brand-teal text-center mb-4">Mathematics</h3>
                <ul className="space-y-2">
                  {["Algebra I & II", "Geometry", "Trigonometry", "Pre-Calculus", "Calculus", "Statistics"].map((subject) => (
                    <li key={subject} className="flex items-center">
                      <CheckCircle2 size={16} className="text-brand-teal mr-2 flex-shrink-0" />
                      <span>{subject}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-bold text-brand-teal text-center mb-4">Science</h3>
                <ul className="space-y-2">
                  {["Biology", "Chemistry", "Physics", "Earth Science", "Environmental Science", "Anatomy"].map((subject) => (
                    <li key={subject} className="flex items-center">
                      <CheckCircle2 size={16} className="text-brand-teal mr-2 flex-shrink-0" />
                      <span>{subject}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true, amount: 0.3 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-bold text-brand-teal text-center mb-4">Humanities</h3>
                <ul className="space-y-2">
                  {["English Literature", "Writing & Composition", "US History", "World History", "Government", "Economics"].map((subject) => (
                    <li key={subject} className="flex items-center">
                      <CheckCircle2 size={16} className="text-brand-teal mr-2 flex-shrink-0" />
                      <span>{subject}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-brand-teal/90 to-brand-teal relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80')] bg-cover bg-center opacity-10" />
          
          <div className="container px-6 mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Achieve Your Academic Goals?</h2>
              <p className="text-lg text-white/90 mb-10 leading-relaxed">
                Contact us today to learn more about our services or to schedule your first session.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="rounded-full px-8">
                  <Link to="/contact">
                    Contact Us
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

export default Services;
