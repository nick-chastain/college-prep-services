import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "How early should we start SAT preparation?",
      answer: "We recommend starting SAT preparation at least 2-3 months before your planned test date. This gives adequate time to learn strategies, practice, and improve your scores."
    },
    {
      question: "When should we begin the college application process?",
      answer: "Ideally, students should begin thinking about college applications in their junior year of high school. The summer before senior year is when applications should start being completed."
    },
    {
      question: "How is instruction/counseling delivered (i.e. video call, at our home, another location, etc.)?",
      answer: "Our commitment to attentive service is delivered primarily through secure video calls to ensure maximum convenience and flexibility. In-person instruction is currently a limited offering and is only available in South Denver."
    },
    {
      question: "What is the typical length of a session?",
      answer: "Each SAT Test Prep session is typically 2 hours long. College Admissions Counseling and Academic Tutoring sessions generally last 1 hour."
    },
    {
      question: "How does scheduling work around holidays?",
      answer: "We prioritize your family's time. Sessions are not scheduled on major holidays (e.g., Easter, Thanksgiving, Christmas Eve through New Year's Day). Any session that falls on a holiday will be proactively rescheduled for a convenient alternative day."
    },
    {
      question: "What are the options for meeting times?",
      answer: "Group courses follow a pre-scheduled, once-per-week evening cadence. 1-on-1 programs (like The Elite Admissions Blueprint and The 1500+ Pinnacle Program) are scheduled flexibly to meet your student's needs."
    },
    {
      question: "How do you ensure the best instructor match for academic tutoring?",
      answer: "We carefully match your student with a dedicated expert who possesses proven skills in the specific subject areas where your student needs the most growth."
    },
    {
      question: "What is the total duration of The 1500+ Pinnacle Program?",
      answer: "The course is structured to be completed over 13 weeks (approximately 3 months), providing consistent, results-driven mentorship."
    },
    {
      question: "What is the total duration of The 160-point Ascension Program?",
      answer: "The course is structured to be completed over 9 weeks (approximately 2 months), providing consistent, results-driven mentorship."
    },
    {
      question: "What are the payment terms?",
      answer: "For our SAT Test Prep programs, payment is due after the first week of class, following the initial diagnostic meeting. For College Admissions Counseling, payment is due at the start of Phase 2. For all other services, payment is due before any tutoring or counseling begins. We offer flexible payment options (card, Zelle, check, Venmo)."
    },
    {
      question: "Do you offer a discount for multiple students from the same family?",
      answer: "Yes, as a partner committed to your family's success, we're happy to offer a 10% discount on all services for every subsequent child after the first."
    },
    {
      question: "How does the Score Guarantee work if the goal isn't met initially?",
      answer: "We stand behind our results. If the goal isn't met, we continue working with your student free of charge until they achieve it. Furthermore, if your student has not achieved the goal and opts not to retake the test, and you are not completely satisfied with the service, a full refund option is available, no questions asked."
    },
    {
      question: "At what point in high school should my student enroll in SAT prep?",
      answer: "Algebra II is essential for success on the SAT. We recommend enrolling either while your student is taking Algebra II or immediately after, to ensure they have the foundational knowledge needed for our program to be most effective."
    },
    {
      question: "Is taking the SAT early ever detrimental?",
      answer: "There is no downside to taking the SAT early. It provides a low-stakes way to build familiarity and, if your student performs well, removes a burden from their busy junior and senior years. Our programs are designed to address any missing concepts."
    },
    {
      question: "What makes your score guarantees trustworthy compared to competitors?",
      answer: "We believe in transparent integrity. Our guarantee is simple—it is not tied to endless loopholes or stringent requirements. We stand behind our process and our commitment to your peace of mind."
    },
    {
      question: "How does the tutoring benefit my student beyond the SAT score?",
      answer: "Our instruction is a launchpad for lifelong success. We integrate critical skills like managing test anxiety and data-driven studying, preparing your student to master any future academic or professional challenge. Additionally, better SAT scores improve the chances of earning merit-based scholarships and getting into better schools. This means less burden on your family, lower student loan payments for your child after they graduate, and better income opportunities out of school."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
              <p className="text-xl text-brand-dark/80">
                Find answers to common questions about our services, programs, and policies.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container px-6 mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <motion.button
                      onClick={() => toggleFAQ(index)}
                      className="w-full bg-white px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-300"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <span className="text-lg font-semibold text-brand-dark pr-4">
                        {faq.question}
                      </span>
                      {openFAQ === index ? (
                        <ChevronUp size={24} className="text-[rgb(87,155,142)] flex-shrink-0" />
                      ) : (
                        <ChevronDown size={24} className="text-[rgb(87,155,142)] flex-shrink-0" />
                      )}
                    </motion.button>

                    <motion.div
                      initial={false}
                      animate={{ 
                        height: openFAQ === index ? "auto" : 0,
                        opacity: openFAQ === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 bg-gray-50">
                        <p className="text-brand-dark/80 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
