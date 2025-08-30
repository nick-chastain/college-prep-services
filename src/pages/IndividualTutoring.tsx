import { motion } from 'framer-motion';
import { Book, Target, Users, Clock, Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const IndividualTutoring = () => {
  const features = [
    {
      icon: <Book size={32} />,
      title: "Subject Mastery",
      description: "Comprehensive support across all high school subjects including Math, Science, English, and History."
    },
    {
      icon: <Target size={32} />,
      title: "Personalized Learning",
      description: "Customized instruction tailored to your learning style, pace, and specific academic goals."
    },
    {
      icon: <Users size={32} />,
      title: "One-on-One Attention",
      description: "Undivided focus from experienced tutors who understand your unique challenges and strengths."
    },
    {
      icon: <Clock size={32} />,
      title: "Flexible Scheduling",
      description: "Convenient session times that fit your busy schedule and academic calendar."
    },
    {
      icon: <Award size={32} />,
      title: "Proven Results",
      description: "Students see an average 11% improvement in test scores and overall academic performance."
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Confidence Building",
      description: "Develop the skills and mindset needed to excel academically and beyond."
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
                Individual Tutoring
              </h1>
              <p className="text-xl md:text-2xl text-brand-dark/80 max-w-3xl mx-auto leading-relaxed mb-8">
                Transform your academic performance with personalized, one-on-one tutoring that addresses your 
                specific needs and learning style. Our proven approach leads to an average 11% improvement in test scores.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-[rgb(87,155,142)] text-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)] hover:text-white">
                  <Link to="/schedule">
                    Schedule a Free Consultation
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)] hover:text-white">
                  <Link to="/contact">
                    Learn More
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Individual Tutoring?</h2>
              <p className="text-lg text-brand-dark/70 max-w-2xl mx-auto">
                Our personalized approach ensures that every session is tailored to your specific needs and learning objectives.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
                >
                  <div className="text-brand-teal mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-brand-dark/70 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-brand-light">
          <div className="container px-6 mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Excel Academically?</h2>
              <p className="text-lg text-brand-dark/70 max-w-2xl mx-auto mb-8">
                Our individual tutoring program has helped hundreds of students improve their grades, 
                build confidence, and achieve their academic goals. Start your journey to success today.
              </p>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-[rgb(87,155,142)] text-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)] hover:text-white">
                <Link to="/schedule">
                  Begin Your Tutoring Journey
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

export default IndividualTutoring;
