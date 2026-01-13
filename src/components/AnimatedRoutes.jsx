// src/components/AnimatedRoutes.tsx (or add to App.tsx)
import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const pageTransition = {
  duration: 0.4,
  ease: 'easeOut',
};

export default function AnimatedRoutes() {
  const location = useLocation();
  const outlet = useOutlet(); // gets the current route's element

  return (
    <AnimatePresence mode="wait">
      {outlet && (
        <motion.div
          key={location.pathname}          // ← crucial: unique key per route
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
        >
          {React.cloneElement(outlet)}    
        </motion.div>
      )}
    </AnimatePresence>
  );
}