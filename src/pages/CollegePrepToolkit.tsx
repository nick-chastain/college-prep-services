import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CollegePrepToolkit = () => {

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
                Expert Help for Your College Application: Targeted Services
              </h1>
              <p className="text-xl md:text-2xl text-brand-dark/80 max-w-3xl mx-auto leading-relaxed">
                Get the precise, high-impact support you need without the full-service commitment. Our expert-led services provide targeted guidance to elevate your student's application.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Service Offerings Section */}
        <section className="py-20 bg-white">
          <div className="container px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Expert On-Demand Services</h2>
            </div>

            <div className="max-w-4xl mx-auto space-y-12">
              {/* Service 1: Most Expensive */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[rgb(87,155,142)]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-[rgb(87,155,142)] mb-4">Unlimited Essay Editing & Strategy</h3>
                    <div className="text-3xl font-bold text-brand-dark mb-4">$2,890</div>
                    <p className="text-lg text-brand-dark/80 leading-relaxed mb-6">
                      We provide professional editing and strategic guidance for all of your student's college application essays. Our meticulous approach ensures their voice and story stand out from the competition.
                    </p>
                    <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-[rgb(87,155,142)] text-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)] hover:text-white">
                      <Link to="/contact">
                        Contact Us to Get Started
                      </Link>
                    </Button>
                  </div>
                  <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                    <span className="text-gray-400 text-lg">Image placeholder</span>
                  </div>
                </div>
              </motion.div>

              {/* Service 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[rgb(87,155,142)]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center order-2 lg:order-1">
                    <span className="text-gray-400 text-lg">Image placeholder</span>
                  </div>
                  <div className="order-1 lg:order-2">
                    <h3 className="text-2xl font-bold text-[rgb(87,155,142)] mb-4">Common App + 3 Essays</h3>
                    <div className="text-3xl font-bold text-brand-dark mb-4">$1,998</div>
                    <p className="text-lg text-brand-dark/80 leading-relaxed mb-6">
                      Get expert-level support for your student's main Common App essay and up to three additional supplemental essays. We will work side-by-side with them to brainstorm topics and refine their writing, ensuring every word is perfect.
                    </p>
                    <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-[rgb(87,155,142)] text-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)] hover:text-white">
                      <Link to="/contact">
                        Contact Us to Get Started
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Service 3: Least Expensive */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[rgb(87,155,142)]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-[rgb(87,155,142)] mb-4">Hourly College Admissions Counseling</h3>
                    <div className="text-3xl font-bold text-brand-dark mb-4">$250/hour</div>
                    <p className="text-lg text-brand-dark/80 leading-relaxed mb-6">
                      For clients who need targeted support on specific aspects of the college application process, our hourly counseling provides expert guidance on a flexible basis.
                    </p>
                    <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-[rgb(87,155,142)] text-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)] hover:text-white">
                      <Link to="/schedule">
                        Schedule a Session
                      </Link>
                    </Button>
                  </div>
                  <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                    <span className="text-gray-400 text-lg">Image placeholder</span>
                  </div>
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

export default CollegePrepToolkit;
