import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { PAGE_META } from "@/data/seo";
import { testimonials } from "@/data/testimonials";
import {
  AI_TUTOR_ACCESS_PERIOD_LABEL,
  AI_TUTOR_ENABLED,
  AI_TUTOR_STUB_COPY,
  COHORT_MAX,
  COHORT_PRICING,
  COHORT_PRICING_CAP,
  COHORT_PRICING_EARLY,
  COHORT_PRICING_INTRO,
  COHORT_PRICING_SMALL_ROSTER,
  GUARANTEE_BLOCKS,
  GUARANTEE_SUMMARIES,
  OFFERS,
  aiTutorCta,
  cohortRosterPriceLabel,
  cohortTierLine,
  formatUSD,
} from "@/data/offers";
import { ClipboardList, Brain, LineChart, ShieldCheck } from "lucide-react";

const ctaClass =
  "rounded-full px-8 bg-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)]/90 text-white";
const secondaryClass =
  "rounded-full px-8 border-[rgb(87,155,142)] text-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)] hover:text-white";

const whyPillars = [
  {
    icon: <ClipboardList size={32} />,
    title: "Personalized Weakness Blueprint",
    description:
      "After the diagnostic, your student gets a written plan that targets the question types costing them the most points.",
  },
  {
    icon: <LineChart size={32} />,
    title: "Practice That Mirrors Test Day",
    // TODO NICK: confirm problem count ("Over 6000 problems") before displaying it.
    description:
      "Our practice platform mirrors the official Bluebook Digital SAT, so test day feels familiar.",
  },
  {
    icon: <Brain size={32} />,
    title: "Test-Day Psychology",
    description:
      "Pacing, anxiety management, and strategy, including our Test Day Psychology Blueprint.",
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Accountability Built In",
    description:
      "Weekly homework and scheduled practice tests keep progress measurable, and they're the basis of our score guarantees.",
  },
];

const SatTestPrep = () => {
  useDocumentMeta(PAGE_META.sat.title, PAGE_META.sat.description);
  const aiCta = aiTutorCta();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32">
        <section id="top" className="scroll-mt-28 bg-gradient-to-b from-brand-light to-white py-20">
          <div className="container px-6 mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                SAT Test Prep: Find the Right Program for Your Student
              </h1>
              <p className="text-xl md:text-2xl text-brand-dark/80 max-w-4xl mx-auto leading-relaxed mb-8">
                Private 1-on-1 coaching for students chasing 1500+ or a 160-point jump, and small-group cohorts for families who want structure at a lower price. Every program is built on a diagnostic, a personalized plan, and real full-length practice tests.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className={ctaClass}>
                  <Link to="/contact">Book a Free Strategy Session</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className={secondaryClass}>
                  <Link to="/sat-test-prep#compare">Compare Programs</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="why" className="scroll-mt-28 py-20 bg-white">
          <div className="container px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our SAT Prep?</h2>
              <p className="text-lg text-brand-dark/70 max-w-3xl mx-auto">
                More than a score jump. Every program starts with a diagnostic and a Personalized Weakness Blueprint, then targets exactly what's costing your student points.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <img
                  src="/Girl Using SAT Crash Course.png"
                  alt="Student studying for the SAT on a laptop"
                  className="rounded-lg shadow-xl max-w-full h-auto"
                />
              </motion.div>
              <p className="text-lg text-brand-dark/80 leading-relaxed">
                Along the way we coach the skills the SAT really tests under pressure: pacing, test-day nerves, and how to study from data instead of guessing. Those skills stay with your student long after test day.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {whyPillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow bg-brand-light"
                >
                  <div className="text-brand-teal mb-4 flex justify-center">{pillar.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{pillar.title}</h3>
                  <p className="text-brand-dark/70 leading-relaxed">{pillar.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="programs" className="scroll-mt-28 py-20 bg-brand-light">
          <div className="container px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our SAT Programs</h2>
            </div>

            <div className="space-y-16">
              <article id="pinnacle" className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[rgb(87,155,142)] lg:col-span-2">
                  <span className="inline-block bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium mb-4">
                    For {OFFERS.pinnacle.startScore} students
                  </span>
                  <h3 className="text-2xl font-bold text-[rgb(87,155,142)] mb-2">{OFFERS.pinnacle.name}</h3>
                  <p className="font-bold text-2xl text-[rgb(87,155,142)] mb-6">{OFFERS.pinnacle.priceLabel}</p>
                  <ul className="space-y-2 text-brand-dark/80 mb-6">
                    <li>Private 1-on-1</li>
                    <li>{OFFERS.pinnacle.weeks} weeks</li>
                    <li>1.5 hours/week ({OFFERS.pinnacle.totalHours} hours total)</li>
                    <li>Starting score {OFFERS.pinnacle.startScore}</li>
                    <li>Goal: {OFFERS.pinnacle.goal}</li>
                    <li>Diagnostic + Personalized Weakness Blueprint in week 1</li>
                    <li>Scheduled full-length practice tests</li>
                  </ul>
                  <p className="text-brand-dark/80 leading-relaxed mb-6">
                    For strong students who are close and want the last stretch to 1500+. Ten weeks of private coaching built around your student's exact error patterns, with advanced strategy for the hardest Reading & Writing and Math questions and the pacing it takes to finish strong.
                  </p>
                  <p className="text-brand-dark/80 mb-6">
                    <Link to="/sat-test-prep#guarantees" className="underline hover:text-brand-teal">
                      1500+ Guarantee: requirements apply. See terms
                    </Link>
                  </p>
                  <Button asChild className={ctaClass}>
                    <Link to="/contact?program=pinnacle">Book a Free Strategy Session</Link>
                  </Button>
                </div>
                <img
                  src="/Pinnacle Tutoring.png"
                  alt="Private 1-on-1 SAT tutoring session"
                  className="rounded-lg shadow-xl w-full h-auto object-cover"
                />
              </article>

              <article id="ascension" className="scroll-mt-28 bg-white rounded-2xl p-8 shadow-lg border-2 border-[rgb(87,155,142)]">
                {/* TODO NICK: keep "Most Popular" badge on Ascension? It is not on this program today, so it is omitted. */}
                <span className="inline-block bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium mb-4">
                  For {OFFERS.ascension.startScore} students
                </span>
                <h3 className="text-2xl font-bold text-[rgb(87,155,142)] mb-2">{OFFERS.ascension.name}</h3>
                <p className="font-bold text-2xl text-[rgb(87,155,142)] mb-6">{OFFERS.ascension.priceLabel}</p>
                <ul className="space-y-2 text-brand-dark/80 mb-6">
                  <li>Private 1-on-1</li>
                  <li>{OFFERS.ascension.weeks} weeks</li>
                  <li>1.5 hours/week ({OFFERS.ascension.totalHours} hours total)</li>
                  <li>Recommended starting score {OFFERS.ascension.startScore}</li>
                  <li>Goal: {OFFERS.ascension.goal}</li>
                  <li>Diagnostic + Personalized Weakness Blueprint in week 1</li>
                  <li>Scheduled full-length practice tests</li>
                </ul>
                <p className="text-brand-dark/80 leading-relaxed mb-6">
                  Built for students ready for a major jump. Eight weeks of private coaching that locks in core Math and Reading & Writing skills, fixes recurring mistakes, and builds the timing and confidence to show it on test day. A 160-point gain can change which schools and merit scholarships are realistic.
                </p>
                <p className="text-brand-dark/80 mb-6">
                  <Link to="/sat-test-prep#guarantees" className="underline hover:text-brand-teal">
                    +160 Guarantee: requirements apply; up to 2 additional SAT test cycles of support. See terms
                  </Link>
                </p>
                <Button asChild className={ctaClass}>
                  <Link to="/contact?program=ascension">Book a Free Strategy Session</Link>
                </Button>
              </article>

              <article id="cohort" className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <img
                  src="/Small Group Class.png"
                  alt="SAT cohort class"
                  className="rounded-lg shadow-xl w-full h-auto object-cover order-2 lg:order-1"
                />
                <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[rgb(87,155,142)] lg:col-span-2 order-1 lg:order-2">
                  {/* TODO NICK: if you want to keep any 1-on-1 check-in for cohorts, specify it; otherwise none. */}
                  <h3 className="text-2xl font-bold text-[rgb(87,155,142)] mb-2">{OFFERS.cohort.name}</h3>
                  <p className="font-bold text-2xl text-[rgb(87,155,142)]">{OFFERS.cohort.priceLabel}</p>
                  <p className="text-brand-dark/70 mb-2">{cohortTierLine}</p>
                  <p className="mb-6">
                    <Link to="/sat-test-prep#cohort-pricing" className="underline text-brand-teal">
                      How cohort pricing works
                    </Link>
                  </p>
                  <ul className="space-y-2 text-brand-dark/80 mb-6">
                    <li>Group class, shared curriculum</li>
                    <li>{OFFERS.cohort.weeks} weeks</li>
                    <li>1.5 hours/week ({OFFERS.cohort.totalHours} hours total)</li>
                    <li>Max {COHORT_MAX} students</li>
                    <li>Goal: +160 points</li>
                    <li>+160 Guarantee when the cohort starts with 3+ students</li>
                  </ul>
                  <p className="text-brand-dark/80 leading-relaxed mb-6">
                    A structured six-week class that works through the SAT content and strategies together on a shared curriculum. It isn't a set of mini private lessons; it's a focused class with the same diagnostic tools and practice tests as our private programs, at a lower per-student price.
                  </p>
                  {/* TODO NICK: next cohort start date. Shown as announced-soon until a date is provided. */}
                  <p className="text-brand-dark/70 mb-6">Next cohort dates announced soon.</p>
                  <Button asChild className={ctaClass}>
                    <Link to="/contact?program=cohort">Reserve a Seat / Ask About Next Cohort</Link>
                  </Button>
                </div>
              </article>

              <article id="ai-tutor" className="scroll-mt-28 bg-white rounded-2xl p-8 shadow-lg border-2 border-[rgb(87,155,142)]">
                <Badge className="mb-4 bg-[rgb(87,155,142)] text-white hover:bg-[rgb(87,155,142)]">
                  {AI_TUTOR_ENABLED ? "Available" : "Coming Soon"}
                </Badge>
                <h3 className="text-2xl font-bold text-[rgb(87,155,142)] mb-2">{OFFERS["ai-tutor"].name}</h3>
                <p className="font-bold text-2xl text-[rgb(87,155,142)] mb-6">{OFFERS["ai-tutor"].priceLabel}</p>
                <p className="text-brand-dark/80 leading-relaxed mb-6">{AI_TUTOR_STUB_COPY}</p>
                {aiCta.external ? (
                  <Button asChild className={ctaClass}>
                    <a href={aiCta.href}>{aiCta.label}</a>
                  </Button>
                ) : (
                  <Button asChild className={ctaClass}>
                    <Link to={aiCta.href}>{aiCta.label}</Link>
                  </Button>
                )}
              </article>
            </div>
          </div>
        </section>

        <section id="compare" className="scroll-mt-28 py-20 bg-white">
          <div className="container px-6 mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Compare Programs</h2>
            <div className="rounded-2xl border-2 border-[rgb(87,155,142)] bg-white shadow-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="sticky left-0 z-10 bg-white min-w-[160px]">Feature</TableHead>
                    <TableHead className="min-w-[140px] text-center">{OFFERS.pinnacle.name}</TableHead>
                    <TableHead className="min-w-[140px] text-center">{OFFERS.ascension.name}</TableHead>
                    <TableHead className="min-w-[160px] text-center">{OFFERS.cohort.name}</TableHead>
                    <TableHead className="min-w-[160px] text-center">
                      <span className="block">{OFFERS["ai-tutor"].name}</span>
                      {!AI_TUTOR_ENABLED && (
                        <Badge className="mt-2 bg-[rgb(87,155,142)] text-white hover:bg-[rgb(87,155,142)]">
                          Coming soon
                        </Badge>
                      )}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="sticky left-0 z-10 bg-white font-semibold">Price</TableCell>
                    <TableCell className="text-center">{OFFERS.pinnacle.priceLabel}</TableCell>
                    <TableCell className="text-center">{OFFERS.ascension.priceLabel}</TableCell>
                    <TableCell className="text-center">{cohortRosterPriceLabel}</TableCell>
                    <TableCell className="text-center">{OFFERS["ai-tutor"].priceLabel}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="sticky left-0 z-10 bg-white font-semibold">Format</TableCell>
                    <TableCell className="text-center">Private 1-on-1</TableCell>
                    <TableCell className="text-center">Private 1-on-1</TableCell>
                    <TableCell className="text-center">Group class (max {COHORT_MAX})</TableCell>
                    <TableCell className="text-center">Self-serve</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="sticky left-0 z-10 bg-white font-semibold">Recommended start</TableCell>
                    <TableCell className="text-center">{OFFERS.pinnacle.startScore}</TableCell>
                    <TableCell className="text-center">{OFFERS.ascension.startScore}</TableCell>
                    <TableCell className="text-center">{OFFERS.cohort.startScore}</TableCell>
                    <TableCell className="text-center">{OFFERS["ai-tutor"].startScore}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="sticky left-0 z-10 bg-white font-semibold">Length</TableCell>
                    <TableCell className="text-center">{OFFERS.pinnacle.weeks} weeks</TableCell>
                    <TableCell className="text-center">{OFFERS.ascension.weeks} weeks</TableCell>
                    <TableCell className="text-center">{OFFERS.cohort.weeks} weeks</TableCell>
                    <TableCell className="text-center">{AI_TUTOR_ACCESS_PERIOD_LABEL}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="sticky left-0 z-10 bg-white font-semibold">Sessions</TableCell>
                    <TableCell className="text-center">1.5 hr/week</TableCell>
                    <TableCell className="text-center">1.5 hr/week</TableCell>
                    <TableCell className="text-center">1.5 hr/week</TableCell>
                    <TableCell className="text-center">—</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="sticky left-0 z-10 bg-white font-semibold">Total live instruction</TableCell>
                    <TableCell className="text-center">{OFFERS.pinnacle.totalHours} hrs</TableCell>
                    <TableCell className="text-center">{OFFERS.ascension.totalHours} hrs</TableCell>
                    <TableCell className="text-center">{OFFERS.cohort.totalHours} hrs</TableCell>
                    <TableCell className="text-center">—</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="sticky left-0 z-10 bg-white font-semibold">Diagnostic + Weakness Blueprint</TableCell>
                    <TableCell className="text-center">✓</TableCell>
                    <TableCell className="text-center">✓</TableCell>
                    <TableCell className="text-center">✓</TableCell>
                    <TableCell className="text-center">— [NICK: confirm]</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="sticky left-0 z-10 bg-white font-semibold">Full-length practice tests</TableCell>
                    <TableCell className="text-center">✓ scheduled [NICK: #]</TableCell>
                    <TableCell className="text-center">✓ scheduled [NICK: #]</TableCell>
                    <TableCell className="text-center">✓ scheduled [NICK: #]</TableCell>
                    <TableCell className="text-center">✓ included</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="sticky left-0 z-10 bg-white font-semibold">Practice platform + materials</TableCell>
                    <TableCell className="text-center">✓</TableCell>
                    <TableCell className="text-center">✓</TableCell>
                    <TableCell className="text-center">✓</TableCell>
                    <TableCell className="text-center">✓ unlimited</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="sticky left-0 z-10 bg-white font-semibold">Test Day Psychology Blueprint</TableCell>
                    <TableCell className="text-center">✓</TableCell>
                    <TableCell className="text-center">✓</TableCell>
                    <TableCell className="text-center">✓</TableCell>
                    <TableCell className="text-center">✓ [NICK: confirm]</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="sticky left-0 z-10 bg-white font-semibold">Score goal</TableCell>
                    <TableCell className="text-center">{OFFERS.pinnacle.goal}</TableCell>
                    <TableCell className="text-center">+160</TableCell>
                    <TableCell className="text-center">+160</TableCell>
                    <TableCell className="text-center">—</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="sticky left-0 z-10 bg-white font-semibold">Guarantee</TableCell>
                    <TableCell className="text-center">1500+ (requirements apply)</TableCell>
                    <TableCell className="text-center">+160 (requirements apply, capped)</TableCell>
                    <TableCell className="text-center">+160 with 3+ students only</TableCell>
                    <TableCell className="text-center">None</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="text-center mt-10">
              <p className="text-brand-dark/80 mb-6">
                Not sure which fits? We'll recommend one after looking at your student's current score and test date.
              </p>
              <Button asChild className={ctaClass}>
                <Link to="/contact">Book a Free Strategy Session</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="cohort-pricing" className="scroll-mt-28 py-20 bg-brand-light">
          <div className="container px-6 mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How Cohort Pricing Works</h2>
            <p className="text-lg text-brand-dark/80 leading-relaxed mb-8">{COHORT_PRICING_INTRO}</p>
            <div className="rounded-2xl border-2 border-[rgb(87,155,142)] bg-white overflow-hidden mb-8">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Students enrolled at start</TableHead>
                    <TableHead>Price per student</TableHead>
                    <TableHead>Score guarantee</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {COHORT_PRICING.map((tier) => (
                    <TableRow key={tier.minStudents}>
                      <TableCell>
                        {tier.minStudents === tier.maxStudents
                          ? tier.minStudents
                          : `${tier.minStudents}–${tier.maxStudents}`}
                      </TableCell>
                      <TableCell>
                        {tier.minStudents === 1
                          ? formatUSD(tier.pricePerStudent)
                          : `${formatUSD(tier.pricePerStudent)} each`}
                      </TableCell>
                      <TableCell>
                        {tier.guarantee ? "Yes: +160 (terms apply)" : "No"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="space-y-4 text-lg text-brand-dark/80 leading-relaxed">
              <p className="font-semibold">{COHORT_PRICING_CAP}</p>
              <p>{COHORT_PRICING_EARLY}</p>
              <p>{COHORT_PRICING_SMALL_ROSTER}</p>
            </div>
          </div>
        </section>

        <section id="guarantees" className="scroll-mt-28 py-20 bg-white">
          <div className="container px-6 mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              Our Score Guarantees: Plain-English Terms
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
              {GUARANTEE_BLOCKS.map((block) => (
                <article key={block.id} className="bg-brand-light rounded-2xl p-6 shadow-sm border border-[rgb(87,155,142)]/30">
                  <h3 className="text-xl font-bold text-[rgb(87,155,142)] mb-4">{block.title}</h3>
                  {block.intro.map((paragraph) => (
                    <p key={paragraph} className="text-brand-dark/80 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                  <p className="font-semibold text-brand-dark mb-2">{block.qualifyLead}</p>
                  <ol className="list-decimal pl-5 space-y-2 text-brand-dark/80 mb-4">
                    {block.requirements.map((requirement) => (
                      <li key={requirement}>{requirement}</li>
                    ))}
                  </ol>
                  <p className="text-brand-dark/80 leading-relaxed mb-4">{block.makeGood}</p>
                  {block.footnote && (
                    <p className="text-sm text-brand-dark/70 mb-4">{block.footnote}</p>
                  )}
                  <p className="text-brand-dark/80 leading-relaxed">{block.notThis}</p>
                </article>
              ))}
            </div>
            <ul className="max-w-3xl mx-auto mt-10 space-y-2 text-brand-dark/80">
              <li>Pinnacle: {GUARANTEE_SUMMARIES.pinnacle}</li>
              <li>Ascension: {GUARANTEE_SUMMARIES.ascension}</li>
              <li>Cohort: {GUARANTEE_SUMMARIES.cohort}</li>
            </ul>
          </div>
        </section>

        <section className="py-20 bg-brand-light">
          <div className="container px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">SAT Success Stories</h2>
              <p className="text-lg text-brand-dark/70">Real feedback from SAT students and parents.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {testimonials.map((testimonial) => (
                <article key={testimonial.author} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[rgb(87,155,142)]">
                  <h3 className="text-lg font-bold mb-4">{testimonial.title}</h3>
                  <p className="text-brand-dark/80 leading-relaxed mb-6 italic">"{testimonial.quote}"</p>
                  <div className="font-semibold text-brand-teal">{testimonial.author}</div>
                  <div className="text-brand-dark/60 text-sm">{testimonial.role}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container px-6 mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Pick a Program?</h2>
            <p className="text-lg text-brand-dark/70 max-w-2xl mx-auto mb-8">
              Book a free strategy session. We'll review your student's current score, goal, and test timeline, and recommend Pinnacle, Ascension, or a Cohort. No pressure, no obligation.
            </p>
            <Button asChild size="lg" className={ctaClass}>
              <Link to="/contact">Book a Free Strategy Session</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SatTestPrep;
