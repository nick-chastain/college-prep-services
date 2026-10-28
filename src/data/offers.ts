export type OfferId = "pinnacle" | "ascension" | "cohort" | "ai-tutor";

/** Nick flips this to true when the AI Tutor product is live. */
export const AI_TUTOR_ENABLED = false;

/** TODO NICK: product URL when the AI tutor launches. Empty falls back to the waitlist. */
export const AI_TUTOR_URL = "";

/**
 * Option B gate for a verified average-improvement stat.
 * Stays false so the placeholder never renders. Ship Option A (no numeric stat).
 * TODO NICK: verified average-improvement stat (n, date range) if a number should return.
 */
export const SHOW_VERIFIED_STATS = false;

/** TODO NICK: Pinnacle make-good cap. Default = next 2 official SAT dates. */
export const PINNACLE_MAKEGOOD_TEST_DATES = 2;

/** TODO NICK: Ascension make-good cap. Default = up to 2 additional official SAT test cycles. */
export const ASCENSION_MAKEGOOD_CYCLES = 2;

/** TODO NICK: cohort missed-class allowance. Default = 1. */
export const COHORT_ALLOWED_MISSES = 1;

/** Reschedule notice that still counts as attended. Default from the locked terms. */
export const RESCHEDULE_NOTICE = "24 hours'";

export const COHORT_PRICING = [
  { minStudents: 1, maxStudents: 1, pricePerStudent: 1800, guarantee: false },
  { minStudents: 2, maxStudents: 2, pricePerStudent: 1000, guarantee: false },
  { minStudents: 3, maxStudents: 8, pricePerStudent: 700, guarantee: true },
] as const;

export const COHORT_MAX = 8;

export const formatUSD = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export const OFFERS = {
  pinnacle: {
    id: "pinnacle" as const,
    name: "The 1500+ Pinnacle Program",
    price: 5000,
    priceLabel: "$5,000",
    format: "Private 1-on-1",
    startScore: "1330+",
    weeks: 10,
    hoursPerWeek: 1.5,
    totalHours: 15,
    goal: "1500+",
    classSize: "1",
  },
  ascension: {
    id: "ascension" as const,
    name: "The 160-Point Ascension Program",
    price: 2700,
    priceLabel: "$2,700",
    format: "Private 1-on-1",
    startScore: "1050–1330",
    weeks: 8,
    hoursPerWeek: 1.5,
    totalHours: 12,
    goal: "+160 points",
    classSize: "1",
  },
  cohort: {
    id: "cohort" as const,
    name: "SAT Cohort Class",
    priceLabel: "From $700/student",
    format: "Small-group class (max 8)",
    startScore: "Any",
    weeks: 6,
    hoursPerWeek: 1.5,
    totalHours: 9,
    goal: "+160 points (3+ students)",
    classSize: "Max 8",
  },
  "ai-tutor": {
    id: "ai-tutor" as const,
    name: "AI Tutor & Materials",
    price: 200,
    priceLabel: "$200",
    format: "Self-serve digital access",
    startScore: "Any",
    goal: "Practice and self-study",
  },
} as const;

/** TODO NICK: confirm or delete this range. User-facing copy says "Any" until confirmed. */
export const COHORT_RECOMMENDED_RANGE_NOTE = "roughly 1000–1300";

/** TODO NICK: AI Tutor access period, e.g. "through your next official SAT" / 6 months. */
export const AI_TUTOR_ACCESS_PERIOD_LABEL = "[NICK: access period]";

export const cohortRosterPriceLabel = `${formatUSD(COHORT_PRICING[0].pricePerStudent)} / ${formatUSD(COHORT_PRICING[1].pricePerStudent)} / ${formatUSD(COHORT_PRICING[2].pricePerStudent)} per student (by roster)`;

export const cohortTierLine = `${formatUSD(COHORT_PRICING[0].pricePerStudent)} (1 student) · ${formatUSD(COHORT_PRICING[1].pricePerStudent)} each (2) · ${formatUSD(COHORT_PRICING[2].pricePerStudent)} each (3–8)`;

export const GUARANTEE_SUMMARIES = {
  pinnacle: `1500+ Guarantee: attendance, homework, and practice tests required. Extra support capped at ${PINNACLE_MAKEGOOD_TEST_DATES} test dates.`,
  ascension: `+160 Guarantee: attendance, homework, and practice tests required. Up to ${ASCENSION_MAKEGOOD_CYCLES} additional SAT test cycles of support.`,
  cohort: "+160 Guarantee with 3+ students: attendance, homework, and practice tests required. No guarantee for 1–2 student cohorts.",
  "ai-tutor": "None",
} as const;

export const homeCardLines = {
  pinnacle: `${OFFERS.pinnacle.priceLabel} · ${OFFERS.pinnacle.weeks} weeks · 1-on-1 · For ${OFFERS.pinnacle.startScore} students aiming for ${OFFERS.pinnacle.goal}`,
  ascension: `${OFFERS.ascension.priceLabel} · ${OFFERS.ascension.weeks} weeks · 1-on-1 · For ${OFFERS.ascension.startScore} students targeting +160`,
  cohort: `${OFFERS.cohort.priceLabel} · ${OFFERS.cohort.weeks} weeks · Max ${COHORT_MAX} · +160 guarantee with 3+ students`,
  "ai-tutor": `${OFFERS["ai-tutor"].priceLabel} · Coming soon · Join the waitlist`,
} as const;

export interface GuaranteeBlock {
  id: "pinnacle" | "ascension" | "cohort";
  title: string;
  intro: string[];
  qualifyLead: string;
  requirements: string[];
  makeGood: string;
  notThis: string;
  footnote?: string;
}

export const GUARANTEE_BLOCKS: GuaranteeBlock[] = [
  {
    id: "pinnacle",
    title: "The 1500+ Pinnacle Guarantee",
    intro: [
      "Our goal for every Pinnacle student is a 1500 or higher. If your student does their part and doesn't get there, we keep working until they hit 1500+ or you're satisfied with the result, within clear limits.",
    ],
    qualifyLead: "Your student qualifies when they:",
    requirements: [
      `Attend every scheduled session. A session rescheduled with at least ${RESCHEDULE_NOTICE} notice counts as attended.`,
      "Complete all weekly homework on time.",
      "Take every scheduled full-length practice test, under timed conditions, on the agreed dates.",
      "Take the official SAT on the test date we planned together.",
    ],
    makeGood: `If they qualify and score below 1500, we provide additional 1-on-1 sessions at no cost, on the same weekly schedule, through the next ${PINNACLE_MAKEGOOD_TEST_DATES} official SAT test dates. That support ends when your student scores 1500+, when you tell us you're satisfied, or after those ${PINNACLE_MAKEGOOD_TEST_DATES} test dates, whichever comes first.`,
    notThis:
      "What this guarantee is not: It is not a refund, and it is not unlimited free tutoring. If the requirements above aren't met, the guarantee doesn't apply. The program ends on its scheduled date, or you can continue at our standard rate.",
  },
  {
    id: "ascension",
    title: "The 160-Point Ascension Guarantee",
    intro: [
      "Our goal for every Ascension student is a gain of at least 160 points over their starting score (the diagnostic or most recent official SAT, whichever we agree on at enrollment).",
    ],
    qualifyLead: "Your student qualifies when they:",
    requirements: [
      `Attend every scheduled session. A session rescheduled with at least ${RESCHEDULE_NOTICE} notice counts as attended.`,
      "Complete all weekly homework on time.",
      "Take every scheduled full-length practice test, under timed conditions, on the agreed dates.",
      "Take the official SAT on the test date we planned together.",
    ],
    makeGood: `If they qualify and gain less than 160 points, we provide continued 1-on-1 support at no cost for up to ${ASCENSION_MAKEGOOD_CYCLES} additional official SAT test cycles. Support ends when your student reaches +160 or after those ${ASCENSION_MAKEGOOD_CYCLES} test cycles, whichever comes first.`,
    notThis:
      "What this guarantee is not: It is not a refund, and it is not unlimited free tutoring. If the requirements above aren't met, the guarantee doesn't apply. The program ends on its scheduled date, or you can continue at our standard rate.",
  },
  {
    id: "cohort",
    title: "The Cohort +160 Guarantee",
    intro: [
      "This guarantee applies only when a cohort starts with 3 or more enrolled students. Cohorts that start with 1 or 2 students run on the same curriculum and schedule but don't include a score guarantee.",
      "In a qualifying cohort (3–8 students), our goal is a gain of at least 160 points over each student's starting score (diagnostic or most recent official SAT, agreed at enrollment).",
    ],
    qualifyLead: "Your student qualifies when they:",
    requirements: [
      `Attend every scheduled class. Because cohorts meet at a set time, at most ${COHORT_ALLOWED_MISSES} missed class is allowed, and only if the student completes the make-up work for that class.`,
      "Complete all weekly homework on time.",
      "Take every scheduled full-length practice test, under timed conditions, on the agreed dates.",
      "Take the official SAT on the test date set for the cohort.",
    ],
    makeGood:
      "If they qualify and gain less than 160 points, your student may rejoin the next available cohort once at no cost.",
    footnote:
      "[NICK: confirm cohort make-good; default = one free repeat of the next cohort]",
    notThis:
      "What this guarantee is not: It is not a refund, and it is not unlimited free classes. If the requirements above aren't met, or the cohort started with fewer than 3 students, no score guarantee applies.",
  },
];

export const COHORT_PRICING_INTRO =
  "Cohort pricing depends on how many students are enrolled when the cohort starts. The more students, the lower the price for everyone.";

export const COHORT_PRICING_CAP = `Cohorts are capped at ${COHORT_MAX} students.`;

export const COHORT_PRICING_EARLY =
  "Enroll early, and you never overpay. If you sign up while the roster is small and more students join before the start date, your price drops to the new per-student rate. We credit the difference back to you.";

export const COHORT_PRICING_SMALL_ROSTER =
  "If the cohort starts with 1 or 2 students, it runs on the full six-week curriculum at the price shown above, without a score guarantee. We'll confirm the final roster and your final price before the first class. [NICK: confirm what happens if the roster shrinks before start (e.g., a student withdraws): default = we tell you the new price before the first class, and you can pay the difference or withdraw for a full refund.]";

export const AI_TUTOR_STUB_COPY =
  "Unlimited access to our SAT practice AI, full-length practice tests, and study materials. Practice on your own schedule, between sessions or on its own. Launching soon. Join the waitlist and we'll let you know when it opens.";

export function aiTutorCta() {
  if (AI_TUTOR_ENABLED && AI_TUTOR_URL) {
    return { href: AI_TUTOR_URL, label: "Open AI Tutor & Materials", external: true as const };
  }
  return { href: "/contact?program=ai-tutor-waitlist", label: "Join the Waitlist", external: false as const };
}
