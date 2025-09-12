import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Target, TrendingUp, Clock, Heart, Shield, Compass } from 'lucide-react';

const SatTestPrep = () => {
  const features = [
    {
      icon: <Target size={32} />,
      title: "Targeted Strategies",
      description: "We deliver a precise, data-driven blueprint that equips your student with the skills to conquer every section of the exam."
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Score Improvement",
      description: "We turn your student's efforts into tangible outcomes, securing the score they need for their academic aspirations."
    },
    {
      icon: <Clock size={32} />,
      title: "Time Management",
      description: "We build your student's confidence by teaching them to master test-day timing, a vital skill they will use in college and beyond."
    },
    {
      icon: <Heart size={32} />,
      title: "Attentive, Dedicated Service",
      description: "We offer a meticulous, detail-oriented partnership that handles every step of your student's journey to remove stress and ensure confidence."
    },
    {
      icon: <Shield size={32} />,
      title: "Transparent Integrity",
      description: "We earn your peace of mind with a clear, honest process, including transparent pricing and an unwavering commitment to your satisfaction."
    },
    {
      icon: <Compass size={32} />,
      title: "Holistic, End-to-End Guidance",
      description: "Our guidance is a comprehensive journey, supporting your student from test preparation to college acceptance and beyond."
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
              <p className="text-xl md:text-2xl text-brand-dark/80 max-w-4xl mx-auto leading-relaxed mb-8">
                The SAT is more than just a test; it's a launchpad for your student's future. Our commitment is to provide the precise path you have been looking for—one that not only elevates their score but also equips them with lifelong skills to master any challenge.
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

        {/* CPS Approach Section */}
        <section className="py-20 bg-white">
          <div className="container px-6 mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">The CPS Approach</h2>
              <p className="text-xl md:text-2xl text-brand-dark/80 max-w-3xl mx-auto leading-relaxed">
                Expert Guidance, Tailored for Your Student's Success
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, amount: 0.3 }}
                className="space-y-6"
              >
                <p className="text-lg text-brand-dark/80 leading-relaxed">
                  We have an unparalleled ability to provide truly personalized practice. Our partnership with the SAT Crash Course software platform offers an unmatched level of insight into your student's learning journey. This ensures they know exactly how to navigate the test on exam day and have unmatched support from their tutor. The platform is designed to look exactly like the Bluebook SAT, so your student is comfortable with the format and knows exactly how to navigate the test on exam day. Our expertise is committed to guiding you to exceptional outcomes, with every detail handled to perfection.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, amount: 0.3 }}
                className="flex justify-center"
              >
                <img 
                  src="/Girl Using SAT Crash Course.png" 
                  alt="Student studying for SAT on computer" 
                  className="rounded-lg shadow-xl max-w-full h-auto" 
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Our SAT Prep Section */}
        <section className="py-20 bg-brand-light">
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
                  className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow bg-white"
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

        {/* Programs Section */}
        <section className="py-20 bg-white">
          <div className="container px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Signature SAT Test Prep Programs: Find the Perfect Fit</h2>
            </div>

            {/* Program Descriptions */}
            <div className="space-y-16 mb-16">
              {/* 1500+ Pinnacle Program */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[rgb(87,155,142)] lg:col-span-2"
                >
                  <h3 className="text-2xl font-bold text-[rgb(87,155,142)] mb-6">The 1500+ Pinnacle Program</h3>
                  <p className="text-brand-dark/80 mb-6 leading-relaxed">
                    Our most exclusive program is designed for the high-achiever aiming for a top-tier score (1500+) worthy of the world's most selective universities. This is more than tutoring; it's a mentorship for truly exceptional students.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-bold text-brand-dark mb-2">Our 1500+ Score Guarantee:</p>
                      <p className="text-brand-dark/80">We are so confident in our process that if your student completes all assignments but doesn't achieve a 1500+ score, we will continue to work with them for free until they do.</p>
                    </div>
                    
                    <div>
                      <p className="font-bold text-brand-dark mb-2">For the Elite Aspirant:</p>
                      <p className="text-brand-dark/80">This program is for students who have already established a strong foundation with a prior score of 1350 or higher on an official or practice SAT, and are now ready for the final push to the top.</p>
                    </div>
                    
                    <div>
                      <p className="font-bold text-brand-dark mb-2">Unrivaled Mentorship:</p>
                      <p className="text-brand-dark/80">We provide 28 total hours of personalized, one-on-one instruction to cover test content and master the psychological side of test-taking, addressing test anxiety and building unwavering confidence.</p>
                    </div>
                    
                    <div>
                      <p className="font-bold text-brand-dark mb-2">Data-Driven, Personalized Practice:</p>
                      <p className="text-brand-dark/80">Your student's journey begins with a Personalized Weakness Blueprint and Study Plan. Our software, which mirrors the official Bluebook SAT, provides data-driven insights that allow us to systematically target and eliminate weak points, ensuring your student practices exactly what they need to succeed.</p>
                    </div>
                    
                    <div>
                      <p className="font-bold text-brand-dark mb-2">Unmatched Resources:</p>
                      <p className="text-brand-dark/80">Your student gets day-one access to our exclusive Test Day Psychology Blueprint, as well as the Math and Reading & Writing Playbooks. These digital guides, combined with access to over 6,000 practice problems, provide all the tools needed for comprehensive preparation.</p>
                    </div>
                    
                    <div>
                      <p className="font-bold text-brand-dark mb-2">Holistic, End-to-End Guidance:</p>
                      <p className="text-brand-dark/80">Our commitment extends beyond the test. We include our complimentary 2-Hour College Admissions Fast Track seminar between our last class and the SAT score release to give your family a headstart on how to navigate the admissions process and win more acceptances. Parents are invited to this to get a glimpse of our comprehensive College Admissions Counseling services.</p>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <p className="font-bold text-2xl text-[rgb(87,155,142)]">Investment: $2,499</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="flex justify-center"
                >
                  <img 
                    src="/Pinnacle Tutoring.png" 
                    alt="Pinnacle Tutoring Program" 
                    className="rounded-lg shadow-xl max-w-full h-auto" 
                  />
                </motion.div>
              </div>

              {/* 160-Point Ascension Program */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="flex justify-center order-2 lg:order-1"
                >
                  <img 
                    src="/Small Group Class.png" 
                    alt="Small Group Class Program" 
                    className="rounded-lg shadow-xl max-w-full h-auto" 
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[rgb(87,155,142)] lg:col-span-2 order-1 lg:order-2"
                >
                  <h3 className="text-2xl font-bold text-[rgb(87,155,142)] mb-6">The 160-Point Ascension Program</h3>
                  <p className="text-brand-dark/80 mb-6 leading-relaxed">
                    This is our small group program designed to launch your student to a 90th-percentile score and unlock significant scholarship opportunities. We blend the cost-effectiveness of a group setting with the personalization of private tutoring.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-bold text-brand-dark mb-2">Our 160-Point Score Guarantee:</p>
                      <p className="text-brand-dark/80">We offer a straightforward 160-point improvement guarantee. If your student attends at least 80% of our sessions and completes all practice tests but doesn't achieve a 160-point jump, we'll work with your student at no additional cost for up to two more full courses until they reach that mark.</p>
                    </div>
                    
                    <div>
                      <p className="font-bold text-brand-dark mb-2">For the Score Skyrocketer:</p>
                      <p className="text-brand-dark/80">This program is for students in the 1000-1200 score range aiming to make a significant jump to 1250-1400. This score jump puts students in the top tier of applicants, unlocking opportunities for significant merit scholarships and acceptances to top programs.</p>
                    </div>
                    
                    <div>
                      <p className="font-bold text-brand-dark mb-2">The Best of Both Worlds:</p>
                      <p className="text-brand-dark/80">Limited to a maximum of 6 students, this program provides a focused learning environment with the genuine human connection that other online platforms lack. We include two 1-hour one-on-one check-ins with your student, plus additional 30-minute check-ins as needed, to ensure they get the personal attention they deserve.</p>
                    </div>
                    
                    <div>
                      <p className="font-bold text-brand-dark mb-2">Comprehensive, Data-Driven Approach:</p>
                      <p className="text-brand-dark/80">With 16 total hours of instruction, your student receives a Personalized Weakness Blueprint and Study Plan after the first week. We use our proprietary software, designed to look exactly like the Digital SAT, to ensure they are comfortable on test day.</p>
                    </div>
                    
                    <div>
                      <p className="font-bold text-brand-dark mb-2">Skills for Life:</p>
                      <p className="text-brand-dark/80">Our program includes our exclusive Test Day Psychology Blueprint and other digital booklets to help your student develop lifelong skills like managing test anxiety and effective time management.</p>
                    </div>
                    
                    <div>
                      <p className="font-bold text-brand-dark mb-2">Holistic, End-to-End Guidance:</p>
                      <p className="text-brand-dark/80">Our commitment extends beyond the test. We include our complimentary 2-Hour College Admissions Fast Track seminar between our last class and the SAT score release to give your family a headstart on how to navigate the admissions process and win more acceptances. Parents are invited to this to get a glimpse of our comprehensive College Admissions Counseling services.</p>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <p className="font-bold text-2xl text-[rgb(87,155,142)]">Investment: $889 per student</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Comparison Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[rgb(87,155,142)] overflow-x-auto"
            >
              <h3 className="text-2xl font-bold text-[rgb(87,155,142)] mb-8 text-center">Program Comparison</h3>
              <div className="min-w-full">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-[rgb(87,155,142)]">
                      <th className="text-left py-4 px-4 font-bold text-brand-dark">Feature</th>
                      <th className="text-center py-4 px-4 font-bold text-[rgb(87,155,142)]">The 1500+ Pinnacle Program</th>
                      <th className="text-center py-4 px-4 font-bold text-[rgb(87,155,142)]">The 160-Point Ascension Program</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-4 font-semibold text-brand-dark">Score Guarantee & Commitment</td>
                      <td className="py-4 px-4 text-brand-dark/80 text-center">1500+ score guarantee. We'll work with your student for free until they achieve it.</td>
                      <td className="py-4 px-4 text-brand-dark/80 text-center">160-point score increase guarantee. We'll work with your student for up to two more full courses for free until they reach it.</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-4 font-semibold text-brand-dark">Format</td>
                      <td className="py-4 px-4 text-brand-dark/80 text-center">One-on-one private mentorship</td>
                      <td className="py-4 px-4 text-brand-dark/80 text-center">Small group, max of 5 students</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-4 font-semibold text-brand-dark">Instruction Hours</td>
                      <td className="py-4 px-4 text-brand-dark/80 text-center">28 total hours</td>
                      <td className="py-4 px-4 text-brand-dark/80 text-center">16 total hours</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-4 font-semibold text-brand-dark">Course Length</td>
                      <td className="py-4 px-4 text-brand-dark/80 text-center">13 weeks (3 months)</td>
                      <td className="py-4 px-4 text-brand-dark/80 text-center">9 weeks (2 months)</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-4 font-semibold text-brand-dark">Number of Official Practice Tests</td>
                      <td className="py-4 px-4 text-brand-dark/80 text-center">4</td>
                      <td className="py-4 px-4 text-brand-dark/80 text-center">3</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-4 font-semibold text-brand-dark">Personalized Weakness Blueprint</td>
                      <td className="py-4 px-4 text-brand-dark/80 text-center">Yes, provided Week 1</td>
                      <td className="py-4 px-4 text-brand-dark/80 text-center">Yes, provided Week 1</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-4 font-semibold text-brand-dark">Digital Resources</td>
                      <td className="py-4 px-4 text-brand-dark/80 text-center">Test Day Psychology Blueprint, Math Playbook, Reading & Writing Playbook</td>
                      <td className="py-4 px-4 text-brand-dark/80 text-center">Test Day Psychology Blueprint, Math Cheatsheet, Reading & Writing Cheatsheet</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-4 font-semibold text-brand-dark">Personalized 1:1 Support</td>
                      <td className="py-4 px-4 text-brand-dark/80 text-center">Yes, built into every session</td>
                      <td className="py-4 px-4 text-brand-dark/80 text-center">Yes, two 1-hour check-ins plus additional as needed</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-4 font-semibold text-brand-dark">Practice Problem Access</td>
                      <td className="py-4 px-4 text-brand-dark/80 text-center">Over 6000 problems</td>
                      <td className="py-4 px-4 text-brand-dark/80 text-center">Over 6000 problems</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-4 font-semibold text-brand-dark">BONUS: 2-Hour College Admissions Fast-Track Seminar</td>
                      <td className="py-4 px-4 text-brand-dark/80 text-center">Yes, given between the SAT Test and the SAT score release</td>
                      <td className="py-4 px-4 text-brand-dark/80 text-center">Yes, given between the SAT Test and the SAT score release</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 font-semibold text-brand-dark">Price</td>
                      <td className="py-4 px-4 text-center">
                        <span className="font-bold text-2xl text-[rgb(87,155,142)]">$2,499</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="font-bold text-2xl text-[rgb(87,155,142)]">$889/student</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Partner for Your Student's Success?</h2>
              <p className="text-lg text-brand-dark/70 max-w-2xl mx-auto mb-8">
                Contact us today to book a free consultation. We are here to provide the uncompromising service and proven guidance to help your student achieve their academic goals and unlock their full potential.
              </p>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-[rgb(87,155,142)] text-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)] hover:text-white">
                <Link to="/contact">
                  Book a Free Consultation
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
