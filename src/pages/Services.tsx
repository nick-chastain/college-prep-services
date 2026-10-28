import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { PAGE_META } from '@/data/seo';
import { COHORT_MAX, GUARANTEE_SUMMARIES, OFFERS } from '@/data/offers';

const areasServed = [
  "Arapahoe County", "Centennial", "Cherry Creek", "Douglas County",
  "Englewood", "Greenwood Village", "Highlands Ranch", "Littleton",
  "Lone Tree", "Parker", "Roxborough Park"
];

const cards = [
  {
    id: OFFERS.pinnacle.id,
    name: OFFERS.pinnacle.name,
    price: OFFERS.pinnacle.priceLabel,
    format: OFFERS.pinnacle.format,
    length: `${OFFERS.pinnacle.weeks} weeks`,
    start: OFFERS.pinnacle.startScore,
    goal: OFFERS.pinnacle.goal,
    guarantee: GUARANTEE_SUMMARIES.pinnacle,
  },
  {
    id: OFFERS.ascension.id,
    name: OFFERS.ascension.name,
    price: OFFERS.ascension.priceLabel,
    format: OFFERS.ascension.format,
    length: `${OFFERS.ascension.weeks} weeks`,
    start: OFFERS.ascension.startScore,
    goal: OFFERS.ascension.goal,
    guarantee: GUARANTEE_SUMMARIES.ascension,
  },
  {
    id: OFFERS.cohort.id,
    name: OFFERS.cohort.name,
    price: OFFERS.cohort.priceLabel,
    format: `Group class, max ${COHORT_MAX}`,
    length: `${OFFERS.cohort.weeks} weeks`,
    start: OFFERS.cohort.startScore,
    goal: "+160 points",
    guarantee: GUARANTEE_SUMMARIES.cohort,
  },
  {
    id: OFFERS["ai-tutor"].id,
    name: OFFERS["ai-tutor"].name,
    price: OFFERS["ai-tutor"].priceLabel,
    format: OFFERS["ai-tutor"].format,
    length: "Coming soon",
    start: OFFERS["ai-tutor"].startScore,
    goal: OFFERS["ai-tutor"].goal,
    guarantee: "No score guarantee",
  },
];

const Services = () => {
  useDocumentMeta(PAGE_META.services.title, PAGE_META.services.description);

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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">SAT Programs & Pricing</h1>
              <p className="text-lg text-brand-dark/80 leading-relaxed">
                Four ways to prepare, from private coaching to small-group classes to self-study tools. Every live program uses 1.5-hour weekly sessions, a diagnostic-driven plan, and full-length practice tests.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container px-6 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cards.map((card, index) => (
                <motion.article
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[rgb(87,155,142)] flex flex-col"
                >
                  <h2 className="text-2xl font-bold text-[rgb(87,155,142)] mb-2">{card.name}</h2>
                  <p className="text-2xl font-bold mb-4">{card.price}</p>
                  <ul className="space-y-2 text-brand-dark/80 mb-4">
                    <li>{card.format}</li>
                    <li>{card.length}</li>
                    <li>Starting score: {card.start}</li>
                    <li>Goal: {card.goal}</li>
                  </ul>
                  <p className="text-brand-dark/80 leading-relaxed mb-6">{card.guarantee}</p>
                  <Button asChild variant="outline" className="mt-auto rounded-full border-[rgb(87,155,142)] text-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)] hover:text-white">
                    <Link to={`/sat-test-prep#${card.id}`}>Learn more</Link>
                  </Button>
                </motion.article>
              ))}
            </div>

            <div className="text-center mt-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Not sure which fits?</h2>
              <Button asChild size="lg" className="rounded-full px-8 bg-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)]/90 text-white">
                <Link to="/contact">Book a Free Strategy Session</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-brand-light">
          <div className="container px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Areas We Serve</h2>
              <p className="text-lg text-brand-dark/70 max-w-2xl mx-auto">
                Private and online SAT prep for families across the greater Denver area, including:
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center max-w-4xl mx-auto">
              {areasServed.map((area) => (
                <div key={area} className="bg-white rounded-xl p-4 shadow-sm">
                  <span className="font-medium text-brand-dark">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
