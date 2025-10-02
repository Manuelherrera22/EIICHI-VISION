// src/components/IntelligentOnboarding.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { detectUserIntent } from '@/utils/intentDetection';
import { UserIntent, UserProfile } from '@/types/userProfiles';
import InvestorOnboarding from './onboarding/InvestorOnboarding';
import MigrantOnboarding from './onboarding/MigrantOnboarding';
import ResidentOnboarding from './onboarding/ResidentOnboarding';

interface IntelligentOnboardingProps {
  onComplete: (profile: UserProfile, intent: UserIntent) => void;
}

const IntelligentOnboarding: React.FC<IntelligentOnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [detectedIntent, setDetectedIntent] = useState<UserIntent | null>(null);
  const [userBehavior, setUserBehavior] = useState({
    pagesVisited: [],
    timeSpent: {},
    searchTerms: [],
    interactions: [],
    formsCompleted: [],
    aiChatQuestions: []
  });
  const { t } = useLanguage();

  useEffect(() => {
    // Detectar intención basada en comportamiento
    const intent = detectUserIntent(userBehavior);
    setDetectedIntent(intent.primary);
  }, [userBehavior]);

  const steps = [
    {
      id: 'welcome',
      title: t('onboarding.welcome'),
      description: t('onboarding.welcomeDescription')
    },
    {
      id: 'intent',
      title: t('onboarding.intent'),
      description: t('onboarding.intentDescription')
    },
    {
      id: 'profile',
      title: t('onboarding.profile'),
      description: t('onboarding.profileDescription')
    },
    {
      id: 'preferences',
      title: t('onboarding.preferences'),
      description: t('onboarding.preferencesDescription')
    },
    {
      id: 'complete',
      title: t('onboarding.complete'),
      description: t('onboarding.completeDescription')
    }
  ];

  const handleIntentSelection = (intent: UserIntent) => {
    setDetectedIntent(intent);
    setCurrentStep(2);
  };

  const handleProfileComplete = (profile: UserProfile) => {
    if (detectedIntent) {
      onComplete(profile, detectedIntent);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {steps[0].title}
            </h2>
            <p className="text-gray-600 mb-8">
              {steps[0].description}
            </p>
            <button
              onClick={() => setCurrentStep(1)}
              className="px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
            >
              {t('common.continue')}
            </button>
          </motion.div>
        );

      case 1:
        return (
          <IntentSelectionStep
            detectedIntent={detectedIntent}
            onIntentSelect={handleIntentSelection}
          />
        );

      case 2:
        return (
          <ProfileStep
            intent={detectedIntent!}
            onComplete={handleProfileComplete}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8"
      >
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>{t('onboarding.step')} {currentStep + 1} {t('common.of')} {steps.length}</span>
            <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-primary h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderCurrentStep()}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// Componente para selección de intención
const IntentSelectionStep: React.FC<{
  detectedIntent: UserIntent | null;
  onIntentSelect: (intent: UserIntent) => void;
}> = ({ detectedIntent, onIntentSelect }) => {
  const { t } = useLanguage();

  const intents = [
    {
      id: 'invest' as UserIntent,
      title: t('onboarding.investTitle'),
      description: t('onboarding.investDescription'),
      icon: '💰',
      color: 'bg-green-500'
    },
    {
      id: 'migrate' as UserIntent,
      title: t('onboarding.migrateTitle'),
      description: t('onboarding.migrateDescription'),
      icon: '🌏',
      color: 'bg-blue-500'
    },
    {
      id: 'live' as UserIntent,
      title: t('onboarding.liveTitle'),
      description: t('onboarding.liveDescription'),
      icon: '🏠',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
        {t('onboarding.whatIsYourGoal')}
      </h2>
      <p className="text-gray-600 mb-8 text-center">
        {t('onboarding.selectYourIntent')}
      </p>
      
      {detectedIntent && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 text-sm">
            {t('onboarding.detectedIntent')}: <strong>{t(`onboarding.${detectedIntent}Title`)}</strong>
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {intents.map((intent) => (
          <motion.button
            key={intent.id}
            onClick={() => onIntentSelect(intent.id)}
            className={`p-6 rounded-xl border-2 transition-all hover:shadow-lg ${
              detectedIntent === intent.id 
                ? 'border-primary bg-primary/5' 
                : 'border-gray-200 hover:border-primary/50'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">{intent.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {intent.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {intent.description}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// Componente para completar perfil
const ProfileStep: React.FC<{
  intent: UserIntent;
  onComplete: (profile: UserProfile) => void;
}> = ({ intent, onComplete }) => {
  switch (intent) {
    case 'invest':
      return <InvestorOnboarding onComplete={onComplete} />;
    case 'migrate':
      return <MigrantOnboarding onComplete={onComplete} />;
    case 'live':
      return <ResidentOnboarding onComplete={onComplete} />;
    default:
      return null;
  }
};

export default IntelligentOnboarding;
