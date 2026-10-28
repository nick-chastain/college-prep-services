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

/** Notice required to move a session. Attending the new time counts as attending. */
export const RESCHEDULE_NOTICE = "24 hours'";

export const PRIVATE_HOURLY_RATE = 225;
export const GROUP_HOURLY_RATE = 175;

export const COHORT_PRICING = [
  { minStudents: 1, maxStudents: 1, pricePerStudent: 1800 },
  { minStudents: 2, maxStudents: 2, pricePerStudent: 1000 },
  { minStudents: 3, maxStudents: 8, pricePerStudent: 700 },
] as const;

/** Every cohort student pays this at signup. Credits are issued from this amount. */
export const COHORT_SIGNUP_AMOUNT = COHORT_PRICING[0].pricePerStudent;

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
    goal: "Shared curriculum",
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

export const AI_TUTOR_ACCESS_PERIOD_LABEL = "1 year";

/** Official full-length practice tests for live programs. AI Tutor tests are platform tests, not this set. */
export const OFFICIAL_PRACTICE_TESTS = {
  pinnacle: 4,
  ascension: 3,
  cohort: 2,
} as const;

export const AI_TUTOR_PRACTICE_TESTS = 5;

export const cohortRosterPriceLabel = `${formatUSD(COHORT_PRICING[0].pricePerStudent)} / ${formatUSD(COHORT_PRICING[1].pricePerStudent)} / ${formatUSD(COHORT_PRICING[2].pricePerStudent)} per student (by roster)`;

export const cohortTierLine = `${formatUSD(COHORT_PRICING[0].pricePerStudent)} (1 student) · ${formatUSD(COHORT_PRICING[1].pricePerStudent)} each (2) · ${formatUSD(COHORT_PRICING[2].pricePerStudent)} each (3–8)`;

export const GUARANTEE_SUMMARIES = {
  pinnacle: `1500+ Guarantee: attendance, homework, and practice tests required. Extra support capped at ${PINNACLE_MAKEGOOD_TEST_DATES} test dates.`,
  ascension: `+160 Guarantee: attendance, homework, and practice tests required. Up to ${ASCENSION_MAKEGOOD_CYCLES} additional SAT test cycles of support.`,
  cohort: "No score guarantee.",
  "ai-tutor": "None",
} as const;

export const homeCards = {
  pinnacle: {
    lines: [
      `1500+ guarantee, a written weakness plan, and ${OFFICIAL_PRACTICE_TESTS.pinnacle} official practice tests`,
      "Starting score of 1330+ required",
      OFFERS.pinnacle.format,
      `${OFFERS.pinnacle.weeks} weeks`,
    ],
    price: OFFERS.pinnacle.priceLabel,
  },
  ascension: {
    lines: [
      `+160 guarantee, a written weakness plan, and ${OFFICIAL_PRACTICE_TESTS.ascension} official practice tests`,
      `For students scoring ${OFFERS.ascension.startScore}`,
      OFFERS.ascension.format,
      `${OFFERS.ascension.weeks} weeks`,
    ],
    price: OFFERS.ascension.priceLabel,
  },
  cohort: {
    lines: [
      `Shared class, a diagnostic, and ${OFFICIAL_PRACTICE_TESTS.cohort} official practice tests. No score guarantee.`,
      "Any starting score",
      `Small group, up to ${COHORT_MAX}`,
      `${OFFERS.cohort.weeks} weeks`,
    ],
    price: `${formatUSD(COHORT_SIGNUP_AMOUNT)} at signup`,
  },
  "ai-tutor": {
    lines: [
      `${AI_TUTOR_ACCESS_PERIOD_LABEL} of practice AI, ${AI_TUTOR_PRACTICE_TESTS} platform practice tests, and the Test Day Psychology Blueprint`,
      "Any starting score",
      "Self-serve",
      `${AI_TUTOR_ACCESS_PERIOD_LABEL} of access`,
    ],
    price: `${OFFERS["ai-tutor"].priceLabel} · coming soon`,
  },
} as const;

const attendanceRequirement = `Attend every scheduled session. Sessions may be rescheduled with at least ${RESCHEDULE_NOTICE} notice. Attending rescheduled sessions counts the same as attending at the original time.`;
const homeworkRequirement = "Complete all weekly homework by the start of the session in which we review it.";
const practiceTestRequirement = "Take every scheduled full-length practice test, under timed conditions, on the agreed dates.";
const privateRateClause = `or you can continue at our standard rate of ${formatUSD(PRIVATE_HOURLY_RATE)}/hour.`;

export interface GuaranteeBlock {
  id: "pinnacle" | "ascension";
  title: string;
  intro: string[];
  qualifyLead: string;
  requirements: string[];
  makeGood: string;
  notThis: string;
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
      attendanceRequirement,
      homeworkRequirement,
      practiceTestRequirement,
      "Take the official SAT on the test date we planned together.",
    ],
    makeGood: `If they qualify and score below 1500, we provide additional 1-on-1 sessions at no cost, on the same weekly schedule, through the next ${PINNACLE_MAKEGOOD_TEST_DATES} official SAT test dates. That support ends when your student scores 1500+, when you tell us you're satisfied, or after those ${PINNACLE_MAKEGOOD_TEST_DATES} test dates, whichever comes first.`,
    notThis: `What this guarantee is not: It is not a refund, and it is not unlimited free tutoring. If the requirements above aren't met, the guarantee doesn't apply. The program ends on its scheduled date, ${privateRateClause}`,
  },
  {
    id: "ascension",
    title: "The 160-Point Ascension Guarantee",
    intro: [
      "Our goal for every Ascension student is a gain of at least 160 points over their starting score (the diagnostic or most recent official SAT, whichever we agree on at enrollment).",
    ],
    qualifyLead: "Your student qualifies when they:",
    requirements: [
      attendanceRequirement,
      homeworkRequirement,
      practiceTestRequirement,
      "Take the official SAT on the test date we planned together.",
    ],
    makeGood: `If they qualify and gain less than 160 points, we provide continued 1-on-1 support at no cost for up to ${ASCENSION_MAKEGOOD_CYCLES} additional official SAT test cycles. Support ends when your student reaches +160 or after those ${ASCENSION_MAKEGOOD_CYCLES} test cycles, whichever comes first.`,
    notThis: `What this guarantee is not: It is not a refund, and it is not unlimited free tutoring. If the requirements above aren't met, the guarantee doesn't apply. The program ends on its scheduled date, ${privateRateClause}`,
  },
];

export const COHORT_PRICING_INTRO =
  `Every student pays ${formatUSD(COHORT_SIGNUP_AMOUNT)} when they sign up. That holds the seat at the highest per-student price, including if other students later withdraw.`;

export const COHORT_PRICING_CREDIT =
  "When the first class starts, we count who is still enrolled. If that headcount has a lower price, we credit the difference back.";

export const COHORT_PRICING_EXAMPLE =
  `Example: Sign up as the fourth student and you still put down ${formatUSD(COHORT_SIGNUP_AMOUNT)}. If four people are still in when class starts, each person's final price is ${formatUSD(COHORT_PRICING[2].pricePerStudent)} — so you get ${formatUSD(COHORT_SIGNUP_AMOUNT - COHORT_PRICING[2].pricePerStudent)} credited back.`;

export const COHORT_PRICING_CAP = `Cohorts stay small: ${COHORT_MAX} students max.`;

export const COHORT_PRICING_REFUND =
  "Need to cancel? Full refund anytime before the first class. Once that class starts, the roster price locks and refunds stop.";

export const cohortSignupLine = `Everyone pays ${formatUSD(COHORT_SIGNUP_AMOUNT)} at signup. The final price is determined off the number of students signed up at the start of class, and we credit the difference.`;

export const AI_TUTOR_STUB_COPY =
  `A standalone prep option: a full year of access to our SAT practice AI, ${AI_TUTOR_PRACTICE_TESTS} practice tests on our platform, study materials, and the Test Day Psychology Blueprint. It does not include a Personalized Weakness Blueprint. Once it rolls out, it will also be included in the existing programs. Launching soon. Join the waitlist and we'll let you know when it opens.`;

export function aiTutorCta() {
  if (AI_TUTOR_ENABLED && AI_TUTOR_URL) {
    return { href: AI_TUTOR_URL, label: "Open AI Tutor & Materials", external: true as const };
  }
  return { href: "/contact?program=ai-tutor-waitlist", label: "Join the Waitlist", external: false as const };
}
