'use client';

import React, { useState, useEffect } from 'react';
import { motion, MotionProps } from 'framer-motion';

interface HydrationSafeMotionProps extends MotionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

const HydrationSafeMotion: React.FC<HydrationSafeMotionProps> = ({ 
  children, 
  fallback = null,
  className = '',
  ...motionProps 
}) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Si no está hidratado, renderizar sin animación
  if (!isHydrated) {
    return (
      <div className={className}>
        {fallback || children}
      </div>
    );
  }

  // Después de la hidratación, usar motion con valores seguros
  const safeMotionProps = {
    ...motionProps,
    // Asegurar valores consistentes
    initial: motionProps.initial || { opacity: 0 },
    animate: motionProps.animate || { opacity: 1 },
    // Usar transiciones más simples
    transition: {
      duration: 0.3,
      ease: "easeOut",
      ...motionProps.transition
    }
  };

  return (
    <motion.div className={className} {...safeMotionProps}>
      {children}
    </motion.div>
  );
};

export default HydrationSafeMotion;
