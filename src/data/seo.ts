import { OFFERS } from "@/data/offers";

export const SITE_URL = "https://collegeprepservicesllc.com";

export const PAGE_META = {
  home: {
    title: "SAT Prep in Denver & Online | College Prep Services",
    description:
      "Private 1-on-1 SAT tutoring and small-group SAT cohorts with clear pricing and score guarantees. Book a free strategy session.",
  },
  sat: {
    title: "SAT Prep Programs & Score Guarantees | College Prep Services",
    description:
      "Compare Pinnacle (1500+), Ascension (+160), and SAT Cohort classes. 1.5-hour weekly sessions, practice tests, and plain-English guarantees.",
  },
  services: {
    title: "SAT Programs & Pricing | College Prep Services",
    description: `Pinnacle ${OFFERS.pinnacle.priceLabel}, Ascension ${OFFERS.ascension.priceLabel}, Cohorts from ${OFFERS.cohort.priceLabel.replace("From ", "")}, AI Tutor & Materials ${OFFERS["ai-tutor"].priceLabel}. Find the right SAT program for your student.`,
  },
  about: {
    title: "About Nick Chastain | College Prep Services SAT Prep",
    description:
      "Meet the founder of College Prep Services and learn how our diagnostic-driven SAT coaching works.",
  },
  stories: {
    title: "SAT Success Stories | College Prep Services",
    description: "Real feedback from SAT students and parents who prepared with College Prep Services.",
  },
  faq: {
    title: "SAT Prep FAQ: Pricing, Guarantees, Scheduling | College Prep Services",
    description:
      "Answers about SAT program length, cohort pricing, score guarantee requirements, payment, and scheduling.",
  },
  contact: {
    title: "Book a Free SAT Strategy Session | College Prep Services",
    description:
      "Tell us your student's score and test date, and we'll recommend the right SAT program.",
  },
} as const;
