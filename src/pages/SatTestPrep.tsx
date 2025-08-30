import { motion } from 'framer-motion';
import { BookOpen, Target, TrendingUp, Clock, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SatTestPrep = () => {
  const features = [
    {
      icon: <Target size={32} />,
      title: "Targeted Strategies",
      description: "Learn proven techniques to tackle each section of the SAT with confidence."
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Score Improvement",
      description: "Our students see an average improvement of 205+ points on their SAT scores."
    },
    {
      icon: <Clock size={32} />,
      title: "Time Management",
      description: "Master the art of pacing yourself through each section for optimal performance."
    },
    {
      icon: <Users size={32} />,
      title: "Small Group Classes",
      description: "Personalized attention in intimate group settings for maximum learning."
    },
    {
      icon: <BookOpen size={32} />,
      title: "Comprehensive Content",
      description: "Cover all SAT topics: Math, Evidence-Based Reading, and Writing & Language."
    },
    {
      icon: <Award size={32} />,
      title: "Proven Results",
      description: "Join hundreds of students who have achieved their target scores with our program."
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
                SAT Test Prep
              </h1>
              <p className="text-xl md:text-2xl text-brand-dark/80 max-w-3xl mx-auto leading-relaxed mb-8">
                Transform your SAT performance with our comprehensive, mentorship-driven approach. 
                Our proven strategies have helped students improve their scores by an average of 205+ points.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-[rgb(87,155,142)] text-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)] hover:text-white">
                  <Link to="/schedule">
                    Schedule a Free Consultation
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-[rgb(87,155,142)] text-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)] hover:text-white">
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our SAT Prep?</h2>
              <p className="text-lg text-brand-dark/70 max-w-2xl mx-auto">
                Our comprehensive approach combines proven strategies with personalized attention to maximize your SAT success.
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Boost Your SAT Score?</h2>
              <p className="text-lg text-brand-dark/70 max-w-2xl mx-auto mb-8">
                Join hundreds of students who have achieved their target scores with our proven SAT prep program. 
                Start your journey to college success today.
              </p>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-[rgb(87,155,142)] text-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)] hover:text-white">
                <Link to="/schedule">
                  Schedule Your First Session
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

export default SatTestPrep;
