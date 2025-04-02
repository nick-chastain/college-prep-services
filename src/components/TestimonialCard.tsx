import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { QuoteIcon } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  className?: string;
}

const TestimonialCard = ({ quote, author, role, className }: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.3 }}
      className={cn(
        "bg-white rounded-2xl p-8 md:p-10 shadow-lg shadow-brand-teal/10 border-2 border-[rgb(87,155,142)]",
        "flex flex-col h-full relative",
        className
      )}
    >
      <QuoteIcon className="text-brand-teal/20 w-12 h-12 absolute top-6 right-6 md:top-8 md:right-8" />
      
      <div className="text-lg leading-relaxed text-brand-dark/90 mb-6 relative z-10 pr-8 md:pr-12">
        "{quote}"
      </div>
      
      <div className="mt-auto">
        <div className="font-semibold text-brand-dark">{author}</div>
        {role && (
          <div className="text-sm text-brand-dark/60">{role}</div>
        )}
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
