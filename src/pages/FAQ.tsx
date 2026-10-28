import { motion } from 'framer-motion';
import { useState, type ReactNode } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { PAGE_META } from '@/data/seo';
import {
  AI_TUTOR_ACCESS_PERIOD_LABEL,
  AI_TUTOR_ENABLED,
  AI_TUTOR_PRACTICE_TESTS,
  COHORT_PRICING,
  COHORT_SIGNUP_AMOUNT,
  GROUP_HOURLY_RATE,
  OFFERS,
  PRIVATE_HOURLY_RATE,
  formatUSD,
} from '@/data/offers';

const FAQ = () => {
  useDocumentMeta(PAGE_META.faq.title, PAGE_META.faq.description);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const cohortPriceAnswer = `Every student pays ${formatUSD(COHORT_SIGNUP_AMOUNT)} when they sign up. If only your one student is in the class at the first session, you stay at ${formatUSD(COHORT_PRICING[0].pricePerStudent)}. If a second student joins, each pays ${formatUSD(COHORT_PRICING[1].pricePerStudent)}; at three to eight students, each pays ${formatUSD(COHORT_PRICING[2].pricePerStudent)} — and we credit back the difference right after the first class ends. You can cancel for a full refund anytime before the first class; once it starts, the price locks and there are no refunds. The Cohort does not include a score guarantee.`;

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
      answer: `Pinnacle is only open to students already scoring ${OFFERS.pinnacle.startScore.replace("+", "")} or higher who are aiming for 1500+. A student starting below that cannot enroll in Pinnacle. If they're in the ${OFFERS.ascension.startScore} range and want a 160-point guarantee, choose Ascension. If you want a structured six-week class, choose a Cohort. The Cohort does not include a score guarantee. Not sure? Book a free strategy session and we'll recommend one.`
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
          Pinnacle and Ascension include score guarantees. The Cohort Class and AI Tutor & Materials do not. Each guarantee requires full participation: attending every session, including sessions rescheduled with at least 24 hours' notice, completing weekly homework by the start of the session where it is reviewed, and taking the scheduled practice tests. If your student meets those requirements and doesn't reach the goal, we provide the additional support described in that program's terms. Guarantees aren't refunds, and they aren't unlimited free tutoring.{" "}
          <Link to="/sat-test-prep#guarantees" className="underline text-brand-teal">
            Read the plain-English terms.
          </Link>
        </>
      )
    },
    {
      question: "What happens if requirements aren't met?",
      answer: `The guarantee no longer applies. The program ends on its scheduled end date, or you can keep working with us at our standard rate of ${formatUSD(PRIVATE_HOURLY_RATE)}/hour for private sessions or ${formatUSD(GROUP_HOURLY_RATE)}/hour for group sessions.`
    },
    {
      question: "What are the options for meeting times?",
      answer: "Private programs keep the same weekly time for that student. For example, a student might have Tuesdays at 6pm every week for all 10 weeks of Pinnacle. Cohorts meet once a week at one set time for the class."
    },
    {
      question: "How is instruction delivered?",
      answer: "Our commitment to attentive service is delivered primarily through secure video calls to ensure maximum convenience and flexibility. In-person instruction is currently a limited offering and is only available in South Denver."
    },
    {
      question: "What are the payment terms?",
      answer: `Payment is due at signup for every program. For a Cohort, each student pays ${formatUSD(COHORT_SIGNUP_AMOUNT)} at signup. If the roster at the first class has a lower per-student price, we credit the difference right after that class. You can cancel a Cohort seat for a full refund anytime before the first class; once it starts, the price locks and there are no refunds. We accept card, Zelle, check, and Venmo.`
    },
    {
      question: "Do you offer a sibling discount?",
      answer: "Yes. We offer a 10% discount on all SAT programs for every subsequent child after the first. The discount stacks with cohort pricing."
    },
    {
      question: "How does scheduling work around holidays?",
      answer: "We prioritize your family's time. Sessions are not scheduled on major holidays (e.g., Easter, Thanksgiving, Christmas Eve through New Year's Day). Any session that falls on a holiday will be proactively rescheduled for a convenient alternative day."
    },
    {
      question: "What's the AI Tutor & Materials?",
      answer: AI_TUTOR_ENABLED
        ? `${OFFERS["ai-tutor"].name} is a standalone prep option, and it is also included with the existing programs. It is ${OFFERS["ai-tutor"].priceLabel} for ${AI_TUTOR_ACCESS_PERIOD_LABEL} of access to our practice AI, ${AI_TUTOR_PRACTICE_TESTS} practice tests on our platform, study materials, and the Test Day Psychology Blueprint. It does not include a Weakness Blueprint.`
        : `A standalone prep option. Once it rolls out, it will also be included in the existing programs. It is ${OFFERS["ai-tutor"].priceLabel} for ${AI_TUTOR_ACCESS_PERIOD_LABEL} of access to our practice AI, ${AI_TUTOR_PRACTICE_TESTS} practice tests on our platform, study materials, and the Test Day Psychology Blueprint. It does not include a Weakness Blueprint. It's launching soon; join the waitlist on our SAT page.`
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
