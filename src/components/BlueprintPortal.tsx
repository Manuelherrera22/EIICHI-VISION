'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSafeLanguage } from '@/hooks/useSafeLanguage';
import { Building, ArrowRight } from 'lucide-react';

const BlueprintPortal = () => {
  const { t } = useSafeLanguage();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
            <Building className="w-10 h-10 text-gray-600" />
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-3xl font-serif font-bold text-gray-900 mb-4"
        >
          {t('onboarding.welcome')}
        </motion.h1>

        {/* Descriptive Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-gray-600 text-base leading-relaxed mb-8"
        >
          {t('onboarding.description')}
        </motion.p>

        {/* Call-to-Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-4"
        >
          <button
            onClick={() => {
              // Navegar a la siguiente página
              window.location.href = '/kusatsu-project';
            }}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-4 px-6 rounded-xl shadow-sm transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <span>{t('onboarding.startButton')}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Instructional Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-sm text-gray-400"
        >
          {t('onboarding.instruction')}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default BlueprintPortal;