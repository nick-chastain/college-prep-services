import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CollegeAdmissionsCounseling = () => {

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
                The College Application Journey: Simplified
              </h1>
              <p className="text-xl md:text-2xl text-brand-dark/80 max-w-3xl mx-auto leading-relaxed mb-8">
                The path to college can be overwhelming. We're here to provide the proven framework and unwavering guidance to help your student navigate the process with confidence. We offer two distinct paths to ensure you find the support that's right for you.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA Section - Two Column Layout */}
        <section className="py-20 bg-white">
          <div className="container px-6 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Column 1: Comprehensive Support */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[rgb(87,155,142)] hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-[rgb(87,155,142)] mb-4">The Premier Partnership for Unmatched Outcomes</h3>
                  <p className="text-lg text-brand-dark/80 leading-relaxed mb-8">
                    For families seeking an end-to-end guide. Our comprehensive blueprint provides meticulous, step-by-step guidance from strategic positioning to securing admission to top-tier universities.
                  </p>
                  <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-[rgb(87,155,142)] text-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)] hover:text-white">
                    <Link to="/college-admissions-counseling/elite-admissions-blueprint">
                      Discover Our Elite Admissions Blueprint
                    </Link>
                  </Button>
                </div>
              </motion.div>

              {/* Column 2: Targeted Services */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[rgb(87,155,142)] hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-[rgb(87,155,142)] mb-4">Expert Guidance to Meet Your Specific Needs</h3>
                  <p className="text-lg text-brand-dark/80 leading-relaxed mb-8">
                    For students who need targeted, on-demand support. Our toolkit provides expert assistance with key application components, ensuring every detail is polished to perfection.
                  </p>
                  <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-[rgb(87,155,142)] text-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)] hover:text-white">
                    <Link to="/college-admissions-counseling/college-prep-toolkit">
                      Explore Our Targeted Services
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CollegeAdmissionsCounseling;