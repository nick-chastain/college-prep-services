import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-brand-light to-white pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(87,155,142,0.1),transparent_60%)]" />
      
      <div className="container px-6 mx-auto relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-8"
          >
            <span className="inline-block bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              Premier College Preparation
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
              Unlock Your <span className="text-brand-teal">Potential</span>
            </h1>
            <p className="text-xl md:text-2xl text-brand-dark/80 max-w-2xl mx-auto leading-relaxed">
              Personalized SAT Tutoring And College Application Help
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 mt-4"
          >
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 shadow-lg bg-[rgb(87,155,142)] text-white hover:bg-[rgb(87,155,142)]/90"
            >
              <Link to="/contact">
                Contact Us Today
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-8 shadow-lg border-2 border-brand-teal text-brand-teal hover:bg-brand-teal/10"
            >
              <Link to="/services" className="flex items-center gap-2">
                Our Services <ChevronRight size={16} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -bottom-48 left-0 right-0 h-64 bg-gradient-to-b from-transparent to-white z-0" />
      <div className="absolute top-32 -left-32 w-72 h-72 bg-brand-teal/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-32 w-80 h-80 bg-brand-teal/5 rounded-full blur-3xl" />
    </section>
  );
};

export default Hero;
