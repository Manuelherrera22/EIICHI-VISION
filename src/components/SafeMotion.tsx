'use client';

import React, { useState, useEffect } from 'react';
import { motion, MotionProps } from 'framer-motion';

interface SafeMotionProps extends MotionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  disableAnimation?: boolean;
}

const SafeMotion: React.FC<SafeMotionProps> = ({ 
  children, 
  fallback = null, 
  disableAnimation = false,
  ...motionProps 
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Si no está hidratado o las animaciones están deshabilitadas, renderizar sin animación
  if (!isClient || disableAnimation) {
    return <>{fallback || children}</>;
  }

  // Usar motion con props seguras
  const safeMotionProps = {
    ...motionProps,
    // Asegurar que los valores iniciales sean consistentes
    initial: motionProps.initial || { opacity: 0 },
    animate: motionProps.animate || { opacity: 1 },
    // Usar transiciones más simples para evitar diferencias de hidratación
    transition: {
      duration: 0.3,
      ease: "easeOut" as const,
      ...motionProps.transition
    }
  };

  return (
    <motion.div {...safeMotionProps}>
      {children}
    </motion.div>
  );
};

export default SafeMotion;
