'use client';

import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  design: 'creative' | 'professional' | 'simple';
}

export default function LoadingSpinner({ design }: LoadingSpinnerProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        className={`w-12 h-12 border-4 rounded-full
          ${design === 'creative' ? 'border-creative-primary border-t-transparent' : ''}
          ${design === 'professional' ? 'border-professional-primary border-t-transparent' : ''}
          ${design === 'simple' ? 'border-simple-primary border-t-transparent' : ''}
        `}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
