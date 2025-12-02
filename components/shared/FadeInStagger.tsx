'use client';

import { motion, Variants } from 'framer-motion';
import React from 'react';

interface FadeInStaggerProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number; // Optional stagger duration
}

export function FadeInStagger({ children, className, stagger }: FadeInStaggerProps) {
  // Create variants dynamically based on the 'stagger' prop
  const currentVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger !== undefined ? stagger : 0.1, // Use provided stagger or default
      },
    },
  };

  return (
    <motion.div
      variants={currentVariants} // Use the dynamically created variants
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
