import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const AcademicTutoring = () => {
  const [isSubjectsMenuOpen, setIsSubjectsMenuOpen] = useState(false);
  const approachFeatures = [
    {
      title: "Personalized Learning",
      description: "We provide a meticulously tailored blueprint for your student's unique needs, ensuring every session is an efficient and impactful step toward mastering their subject."
    },
    {
      title: "Dedicated Expert Partner",
      description: "Our tutors are more than subject matter experts; they are mentors and partners committed to your student's success. We remove the stress and provide a consistent, supportive relationship."
    },
    {
      title: "Confidence Building",
      description: "We empower your student by equipping them with a deeper understanding of the material and the study skills they need to excel. Our guidance builds a belief in their own ability to succeed, in school and beyond."
    }
  ];

  const packages = [
    {
      name: "The Jumpstart Package",
      hours: "5 Hours",
      price: "$550",
      description: "Designed for a quick boost or to provide support on a specific, targeted topic."
    },
    {
      name: "The Momentum Package",
      hours: "12 Hours",
      price: "$1,285",
      description: "Our most popular package. Perfect for improving grades over a semester and building the skills needed to confidently tackle a challenging subject.",
      popular: true
    },
    {
      name: "The Breakthrough Package",
      hours: "36 Hours",
      price: "$3,750",
      description: "Our most comprehensive package. A partnership for year-round support that ensures your student has the guidance and expertise to excel in any academic challenge."
    }
  ];

  const subjectsData = [
    {
      subject: "Math",
      courses: ["Pre-Algebra", "Algebra I", "Geometry", "Algebra II", "Trigonometry", "Pre-Calculus", "Calculus I", "Calculus II"],
      gradeLevels: "7th - 12th Grade"
    },
    {
      subject: "Science",
      courses: ["Biology", "Chemistry", "Physics"],
      gradeLevels: "7th - 12th Grade"
    },
    {
      subject: "Humanities",
      courses: ["English", "History", "Social Sciences (e.g., Economics)"],
      gradeLevels: "7th - 12th Grade"
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
                Academic Tutoring
              </h1>
              <p className="text-xl md:text-2xl text-brand-dark/80 max-w-4xl mx-auto leading-relaxed mb-8">
              We provide the unwavering guidance and expert support your student needs to not only master any subject but to thrive with newfound confidence.
              </p>
              <div className="flex justify-center">
                <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-[rgb(87,155,142)] text-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)] hover:text-white">
                  <Link to="/schedule">
                    Schedule Your Free Diagnostic Hour
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section className="py-20 bg-white">
          <div className="container px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Approach to Academic Tutoring</h2>
              <p className="text-lg text-brand-dark/70 max-w-3xl mx-auto leading-relaxed">
                Our approach is a proven blueprint that builds confidence, eliminates frustration, and sets your student up for long-term success.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {approachFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-4 text-[rgb(87,155,142)]">{feature.title}</h3>
                  <p className="text-brand-dark/70 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What Drives Us Section */}
        <section className="py-20 bg-brand-light">
          <div className="container px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, amount: 0.3 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8">What Drives Us</h2>
              <p className="text-xl md:text-2xl text-brand-dark/80 leading-relaxed">
                The pandemic left many students with foundational gaps in their academic careers. We are here to provide the unwavering guidance and expert support your student needs to not only master any subject but to thrive with newfound confidence. Our uncompromising service ensures every lesson is a step on their path to excellence.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Academic Tutoring Packages Section */}
        <section className="py-20 bg-brand-light">
          <div className="container px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Academic Tutoring Packages</h2>
              <p className="text-lg text-brand-dark/70 max-w-4xl mx-auto leading-relaxed">
              We believe consistent academic support builds real momentum. Our packages are designed to provide ongoing guidance that leads to lasting results. Each package includes one complimentary diagnostic hour before our first session.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {packages.map((pkg, index) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className={`bg-white rounded-2xl p-8 shadow-lg border-2 transition-all duration-300 hover:shadow-xl flex flex-col ${
                    pkg.popular 
                      ? 'border-[rgb(87,155,142)] scale-105' 
                      : 'border-gray-200 hover:border-[rgb(87,155,142)]'
                  }`}
                >
                  <div className="text-center flex-grow flex flex-col">
                    <div className="h-12 flex items-center justify-center mb-4">
                      {pkg.popular && (
                        <span className="inline-block bg-[rgb(87,155,142)] text-white px-4 py-1 rounded-full text-sm font-semibold">
                          Most Popular
                        </span>
                      )}
                    </div>
                    <div className="h-16 flex items-center justify-center mb-2">
                      <h3 className="text-2xl font-bold text-[rgb(87,155,142)]">{pkg.name}</h3>
                    </div>
                    <div className="h-12 flex items-center justify-center mb-2">
                      <div className="text-3xl font-bold text-brand-dark">{pkg.price}</div>
                    </div>
                    <div className="h-8 flex items-center justify-center mb-6">
                      <div className="text-lg text-brand-dark/70">{pkg.hours}</div>
                    </div>
                    <div className="flex-grow flex flex-col justify-start">
                      <p className="text-brand-dark/80 leading-relaxed mb-6">{pkg.description}</p>
                    </div>
                    <div className="mt-auto pt-4">
                      <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-[rgb(87,155,142)] text-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)] hover:text-white">
                        <Link to="/schedule">
                          Get Started
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Subjects & Grade Levels Section */}
        <section className="py-20 bg-white">
          <div className="container px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Subjects & Grade Levels</h2>
              <p className="text-lg text-brand-dark/70 max-w-3xl mx-auto leading-relaxed">
                We offer expert tutoring in a wide range of academic subjects to support your student throughout their academic career. We cover AP, Honors, and standard level courses. Click on the menu below to see a full list of our available courses and grades.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <motion.button
                onClick={() => setIsSubjectsMenuOpen(!isSubjectsMenuOpen)}
                className="w-full bg-[rgb(87,155,142)] text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-3 hover:bg-[rgb(87,155,142)]/90 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Available Courses & Grade Levels
                {isSubjectsMenuOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </motion.button>

              <motion.div
                initial={false}
                animate={{ 
                  height: isSubjectsMenuOpen ? "auto" : 0,
                  opacity: isSubjectsMenuOpen ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="mt-8 bg-gray-50 rounded-lg p-8">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-[rgb(87,155,142)]">
                          <th className="text-left py-4 px-6 font-bold text-[rgb(87,155,142)] text-lg">Subject</th>
                          <th className="text-left py-4 px-6 font-bold text-[rgb(87,155,142)] text-lg">Courses</th>
                          <th className="text-left py-4 px-6 font-bold text-[rgb(87,155,142)] text-lg">Grade Levels</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subjectsData.map((subject, index) => (
                          <motion.tr
                            key={subject.subject}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="border-b border-gray-200 hover:bg-white/50 transition-colors"
                          >
                            <td className="py-4 px-6 font-bold text-brand-dark text-lg">{subject.subject}</td>
                            <td className="py-4 px-6 text-brand-dark/80">
                              <div className="flex flex-wrap gap-2">
                                {subject.courses.map((course, courseIndex) => (
                                  <span
                                    key={courseIndex}
                                    className="bg-white px-3 py-1 rounded-full text-sm border border-gray-200"
                                  >
                                    {course}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="py-4 px-6 text-brand-dark/80 font-medium">{subject.gradeLevels}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-white">
          <div className="container px-6 mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Partner for Your Student's Academic Success?</h2>
              <p className="text-xl text-brand-dark/80 max-w-3xl mx-auto leading-relaxed mb-8">
                Schedule your free, no-obligation diagnostic hour with one of our expert tutors. We are here to provide the unwavering guidance and proven approach to help your student achieve their academic goals and unlock their full potential.
              </p>
              <div className="flex justify-center">
                <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-[rgb(87,155,142)] text-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)] hover:text-white">
                  <Link to="/schedule">
                    Schedule Your Free Diagnostic Hour
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AcademicTutoring;
