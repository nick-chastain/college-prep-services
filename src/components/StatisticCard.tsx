
import { cn } from '@/lib/utils';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface StatisticCardProps {
  value: string;
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

const StatisticCard = ({ value, label, icon, className }: StatisticCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        "bg-white rounded-2xl p-8 shadow-sm border border-gray-100",
        "flex flex-col items-center text-center transition-all",
        className
      )}
    >
      {icon && <div className="text-brand-teal mb-4">{icon}</div>}
      <div className="text-3xl md:text-4xl font-bold text-brand-teal mb-2 font-heading">
        {value}
      </div>
      <div className="text-sm text-brand-dark/70 uppercase tracking-wider font-medium">
        {label}
      </div>
    </motion.div>
  );
};

export default StatisticCard;
