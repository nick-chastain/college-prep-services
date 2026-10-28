import { motion } from 'framer-motion';
import { useState, type ReactNode } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { PAGE_META } from '@/data/seo';
import {
  AI_TUTOR_ENABLED,
  COHORT_MAX,
  COHORT_PRICING,
  OFFERS,
  formatUSD,
} from '@/data/offers';

const FAQ = () => {
  useDocumentMeta(PAGE_META.faq.title, PAGE_META.faq.description);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const cohortPriceAnswer = `Cohort pricing depends on how many students are enrolled when the cohort starts. One student is ${formatUSD(COHORT_PRICING[0].pricePerStudent)} with no score guarantee. Two students are ${formatUSD(COHORT_PRICING[1].pricePerStudent)} each with no score guarantee. Three to eight students are ${formatUSD(COHORT_PRICING[2].pricePerStudent)} each, and the +160 guarantee applies. Cohorts are capped at ${COHORT_MAX}. If you enroll early and more students join before the start date, your price drops and we credit the difference.`;

  const faqs: { question: string; answer: ReactNode }[] = [
    {
      question: "At what point in high school should my student start SAT prep?",
      answer: "Algebra II is essential for success on the SAT. We recommend enrolling either while your student is taking Algebra II or immediately after, to ensure they have the foundational knowledge needed for our program to be most effective."
    },
    {
      question: "How early should we start before the test date?",
      answer: `We recommend starting 2–3 months before your planned test date. Pinnacle runs ${OFFERS.pinnacle.weeks} weeks, Ascension ${OFFERS.ascension.weeks} weeks, and Cohorts ${OFFERS.cohort.weeks} weeks, so count back from your test date and leave a little buffer.`
    },
    {
      question: "Is taking the SAT early ever detrimental?",
      answer: "There is no downside to taking the SAT early. It provides a low-stakes way to build familiarity and, if your student performs well, removes a burden from their busy junior and senior years. Our programs are designed to address any missing concepts."
    },
    {
      question: "How long is each session?",
      answer: "Every live session is 1.5 hours, once per week."
    },
    {
      question: "How long is each program?",
      answer: `Pinnacle: ${OFFERS.pinnacle.weeks} weeks (${OFFERS.pinnacle.totalHours} hours). Ascension: ${OFFERS.ascension.weeks} weeks (${OFFERS.ascension.totalHours} hours). Cohort: ${OFFERS.cohort.weeks} weeks (${OFFERS.cohort.totalHours} hours).`
    },
    {
      question: "Which program is right for my student?",
      answer: `If your student is already scoring ${OFFERS.pinnacle.startScore.replace("+", "")} or higher and is aiming for 1500+, choose Pinnacle. If they're in the ${OFFERS.ascension.startScore} range and want a big jump, choose Ascension. If you want a structured class at a lower price, choose a Cohort. Not sure? Book a free strategy session and we'll recommend one.`
    },
    {
      question: "How does cohort pricing work?",
      answer: (
        <>
          {cohortPriceAnswer}{" "}
          <Link to="/sat-test-prep#cohort-pricing" className="underline text-brand-teal">
            See the full cohort pricing explanation.
          </Link>
        </>
      )
    },
    {
      question: "How do your score guarantees work?",
      answer: (
        <>
          Each guarantee requires full participation: attending sessions, completing weekly homework, and taking the scheduled practice tests. If your student meets those requirements and doesn't reach the goal, we provide the additional support described in that program's terms. Guarantees aren't refunds, and they aren't unlimited free tutoring. Cohorts carry the +160 guarantee only when the class starts with 3 or more students.{" "}
          <Link to="/sat-test-prep#guarantees" className="underline text-brand-teal">
            Read the plain-English terms.
          </Link>
        </>
      )
    },
    {
      question: "What happens if requirements aren't met?",
      // TODO NICK: hourly rate or "per-session rate"
      answer: "The guarantee no longer applies. The program ends on its scheduled end date, or you can keep working with us at our standard rate [NICK: hourly rate or \"per-session rate\"]."
    },
    {
      question: "What are the options for meeting times?",
      answer: "Private programs (Pinnacle, Ascension) are scheduled flexibly around your student. Cohorts meet once a week at a set time."
    },
    {
      question: "How is instruction delivered?",
      answer: "Our commitment to attentive service is delivered primarily through secure video calls to ensure maximum convenience and flexibility. In-person instruction is currently a limited offering and is only available in South Denver."
    },
    {
      question: "What are the payment terms?",
      // TODO NICK: confirm; for Cohorts, is payment due at enrollment or at start?
      answer: "Payment is due after the first week of the program, following the initial diagnostic meeting. [NICK: confirm; for Cohorts, is payment due at enrollment or at start?] We accept card, Zelle, check, and Venmo."
    },
    {
      question: "Do you offer a sibling discount?",
      // TODO NICK: confirm sibling discount still applies, and whether it stacks with Cohort pricing.
      answer: "Yes, as a partner committed to your family's success, we're happy to offer a 10% discount on all SAT programs for every subsequent child after the first."
    },
    {
      question: "How does scheduling work around holidays?",
      answer: "We prioritize your family's time. Sessions are not scheduled on major holidays (e.g., Easter, Thanksgiving, Christmas Eve through New Year's Day). Any session that falls on a holiday will be proactively rescheduled for a convenient alternative day."
    },
    {
      question: "What's the AI Tutor & Materials?",
      answer: AI_TUTOR_ENABLED
        ? `${OFFERS["ai-tutor"].name} is a ${OFFERS["ai-tutor"].priceLabel} add-on with unlimited access to our practice AI, practice tests, and study materials.`
        : `An upcoming ${OFFERS["ai-tutor"].priceLabel} add-on with unlimited access to our practice AI, practice tests, and materials. It's launching soon; join the waitlist on our SAT page.`
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
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
                Answers to common questions about our SAT programs, pricing, and guarantees.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container px-6 mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={faq.question}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full bg-white px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-300"
                    >
                      <span className="text-lg font-semibold text-brand-dark pr-4">
                        {faq.question}
                      </span>
                      {openFAQ === index ? (
                        <ChevronUp size={24} className="text-[rgb(87,155,142)] flex-shrink-0" />
                      ) : (
                        <ChevronDown size={24} className="text-[rgb(87,155,142)] flex-shrink-0" />
                      )}
                    </button>

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
                        <div className="text-brand-dark/80 leading-relaxed">
                          {faq.answer}
                        </div>
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
