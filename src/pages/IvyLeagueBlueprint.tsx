import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const IvyLeagueBlueprint = () => {

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
                The Elite Admissions Blueprint
              </h1>
              <p className="text-xl md:text-2xl text-brand-dark/80 max-w-4xl mx-auto leading-relaxed mb-8">
                This comprehensive service is your family's definitive guide to securing your student's acceptance to a top-tier university. We simplify the entire journey, from building a compelling high school narrative to crafting a winning application and preparing them for lasting life success.
              </p>
              <div className="flex justify-center">
                <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-[rgb(87,155,142)] text-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)] hover:text-white">
                  <Link to="/schedule">
                    Schedule a Free Consultation
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Elite Admissions Blueprint Section */}
        <section className="py-20 bg-brand-light">
          <div className="container px-6 mx-auto">

            {/* Phase 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[rgb(87,155,142)] mb-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[rgb(87,155,142)] mb-4">Phase 1: The Foundation & Strategic Blueprint (Grades 9-11)</h3>
                <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  Complimentary
                </div>
                <p className="text-lg text-brand-dark/80 max-w-3xl mx-auto">
                  Our journey begins with a complimentary partnership designed to build a powerful foundation for your student. This phase is our gift to you, ensuring your student starts their high school journey with a clear and deliberate plan.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-brand-dark mb-3">Initial Assessment & Narrative Planning</h4>
                  <p className="text-brand-dark/80 leading-relaxed">
                    We'll conduct a comprehensive one-on-one session to identify your student's unique personality and strengths. From this, we'll develop a strategic blueprint for their high school career, ensuring their academic and extracurricular choices build a compelling and unique narrative that will resonate with admissions officers.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-brand-dark mb-3">Academic & Extracurricular Coaching</h4>
                  <p className="text-brand-dark/80 leading-relaxed">
                    We provide expert guidance on strategic course selection and extracurricular involvement. The goal is to maximize impact and create a compelling story that stands out from the competition.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-[rgb(87,155,142)] text-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)] hover:text-white">
                  <Link to="/schedule">
                    Schedule a Free Consultation
                  </Link>
                </Button>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[rgb(87,155,142)] mb-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[rgb(87,155,142)] mb-4">Phase 2: The Core Application & Essay Mastery (April of 11th Grade - 12th Grade)</h3>
                <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  $4,997
                </div>
                <p className="text-lg text-brand-dark/80 max-w-3xl mx-auto">
                  This is where our partnership intensifies, transforming the overwhelming application process into a seamless, step-by-step journey to success. We take on the role of dedicated project manager for your student's future.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-brand-dark mb-3">Project Management & Accountability System</h4>
                    <p className="text-brand-dark/80 leading-relaxed">
                      We provide a step-by-step blueprint and a strict accountability framework, ensuring every deadline is met and no detail is missed.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-brand-dark mb-3">The "Zero-Draft" Essay System</h4>
                    <p className="text-brand-dark/80 leading-relaxed">
                      We guide your student through our proprietary system for brainstorming, writing, and refining their essays. This system eliminates writer's block and ensures their unique story stands out from the competition.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-brand-dark mb-3">The College Common App "Perfect Activity" Blueprint</h4>
                    <p className="text-brand-dark/80 leading-relaxed">
                      Your student will receive a checklist and guide to meticulously craft their activity list, highlighting their most compelling achievements to maximize impact and impress admissions officers.
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-green-50 border-l-4 border-[rgb(87,155,142)] p-6 rounded-r-lg rounded-l-lg">
                    <h4 className="text-lg font-semibold text-green-800 mb-3">Bonus: The Admissions Interview System</h4>
                    <p className="text-green-700 text-sm mb-2">Valued at $1,498</p>
                    <p className="text-green-700 text-sm">
                      This tactical guide includes mock interview sessions and strategic answer frameworks to build your student's confidence and poise for any conversation with admissions officers.
                    </p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-[rgb(87,155,142)] p-6 rounded-r-lg rounded-l-lg">
                    <h4 className="text-lg font-semibold text-green-800 mb-3">Bonus: The Career Liftoff Seminar</h4>
                    <p className="text-green-700 text-sm mb-2">Valued at $949</p>
                    <p className="text-green-700 text-sm">
                      Our commitment extends beyond college. This seminar equips your student with the skills to win any job, providing long-term value that our competitors simply cannot match.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Unconditional Acceptance Guarantee */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[rgb(87,155,142)]">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[rgb(87,155,142)] mb-2">Our Unconditional Acceptance Guarantee</h3>
                <div className="bg-brand-light/30 rounded-xl p-8 max-w-4xl mx-auto">
                  <p className="text-lg text-brand-dark/80 leading-relaxed">
                    We are so confident in our process that we stand behind our results with a simple, transparent guarantee. If your student follows our entire process—attends all scheduled meetings, completes all assignments on time, and applies to all agreed-upon schools—and is not accepted into at least one of their top 3 colleges of choice, we will refund every single dollar you paid. No questions asked. We believe your complete peace of mind is our honor and duty to deliver.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-white to-brand-light">
          <div className="container px-6 mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Partner for Your Student's Success?</h2>
              <p className="text-xl text-brand-dark/80 max-w-3xl mx-auto leading-relaxed mb-8">
                Contact us today to book a free consultation. We are here to provide the uncompromising service and proven guidance to help your student achieve their academic goals and unlock their full potential.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-[rgb(87,155,142)] text-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)] hover:text-white">
                  <Link to="/schedule">
                    Schedule a Free Consultation
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

export default IvyLeagueBlueprint;
