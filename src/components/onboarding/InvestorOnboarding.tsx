// src/components/onboarding/InvestorOnboarding.tsx

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { InvestorProfile } from '@/types/userProfiles';

interface InvestorOnboardingProps {
  onComplete: (profile: InvestorProfile) => void;
}

const InvestorOnboarding: React.FC<InvestorOnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState<Partial<InvestorProfile>>({});
  const { t } = useLanguage();

  const steps = [
    {
      id: 'budget',
      title: t('investor.budgetTitle'),
      description: t('investor.budgetDescription')
    },
    {
      id: 'experience',
      title: t('investor.experienceTitle'),
      description: t('investor.experienceDescription')
    },
    {
      id: 'goals',
      title: t('investor.goalsTitle'),
      description: t('investor.goalsDescription')
    },
    {
      id: 'preferences',
      title: t('investor.preferencesTitle'),
      description: t('investor.preferencesDescription')
    }
  ];

  const handleStepComplete = (stepData: any) => {
    setProfile(prev => ({ ...prev, ...stepData }));
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Completar perfil
      const completeProfile: InvestorProfile = {
        investmentBudget: profile.investmentBudget || {
          min: 100000,
          max: 1000000,
          currency: 'USD',
          liquidity: 'medium'
        },
        investmentExperience: profile.investmentExperience || {
          realEstate: 'beginner',
          international: false,
          japanSpecific: false,
          previousInvestments: []
        },
        financialGoals: profile.financialGoals || {
          targetROI: 8,
          timeline: 'medium',
          riskTolerance: 'moderate',
          incomeType: 'both'
        },
        investmentPreferences: profile.investmentPreferences || {
          propertyTypes: ['house', 'apartment'],
          locations: ['tokyo', 'osaka'],
          propertySize: { min: 50, max: 200 },
          renovationLevel: 'minor'
        }
      };
      
      onComplete(completeProfile);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <BudgetStep onComplete={handleStepComplete} />;
      case 1:
        return <ExperienceStep onComplete={handleStepComplete} />;
      case 2:
        return <GoalsStep onComplete={handleStepComplete} />;
      case 3:
        return <PreferencesStep onComplete={handleStepComplete} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {steps[currentStep].title}
        </h3>
        <p className="text-gray-600 text-sm">
          {steps[currentStep].description}
        </p>
      </div>
      
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderCurrentStep()}
      </motion.div>
    </div>
  );
};

// Componente para presupuesto
const BudgetStep: React.FC<{ onComplete: (data: any) => void }> = ({ onComplete }) => {
  const [budget, setBudget] = useState({
    min: 100000,
    max: 1000000,
    currency: 'USD',
    liquidity: 'medium' as 'high' | 'medium' | 'low'
  });

  const handleSubmit = () => {
    onComplete({ investmentBudget: budget });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Presupuesto mínimo (USD)
        </label>
        <input
          type="number"
          value={budget.min}
          onChange={(e) => setBudget(prev => ({ ...prev, min: parseInt(e.target.value) }))}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Presupuesto máximo (USD)
        </label>
        <input
          type="number"
          value={budget.max}
          onChange={(e) => setBudget(prev => ({ ...prev, max: parseInt(e.target.value) }))}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Liquidez disponible
        </label>
        <select
          value={budget.liquidity}
          onChange={(e) => setBudget(prev => ({ ...prev, liquidity: e.target.value as 'high' | 'medium' | 'low' }))}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        >
          <option value="high">Alta - Puedo invertir inmediatamente</option>
          <option value="medium">Media - Necesito 3-6 meses</option>
          <option value="low">Baja - Necesito más de 6 meses</option>
        </select>
      </div>
      
      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
      >
        Continuar
      </button>
    </div>
  );
};

// Componente para experiencia
const ExperienceStep: React.FC<{ onComplete: (data: any) => void }> = ({ onComplete }) => {
  const [experience, setExperience] = useState({
    realEstate: 'beginner' as 'beginner' | 'intermediate' | 'expert',
    international: false,
    japanSpecific: false,
    previousInvestments: [] as any[]
  });

  const handleSubmit = () => {
    onComplete({ investmentExperience: experience });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Experiencia en bienes raíces
        </label>
        <select
          value={experience.realEstate}
          onChange={(e) => setExperience(prev => ({ ...prev, realEstate: e.target.value as any }))}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        >
          <option value="beginner">Principiante - Primera inversión</option>
          <option value="intermediate">Intermedio - 2-5 propiedades</option>
          <option value="expert">Experto - Más de 5 propiedades</option>
        </select>
      </div>
      
      <div className="space-y-3">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={experience.international}
            onChange={(e) => setExperience(prev => ({ ...prev, international: e.target.checked }))}
            className="mr-3"
          />
          <span className="text-sm text-gray-700">He invertido internacionalmente antes</span>
        </label>
        
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={experience.japanSpecific}
            onChange={(e) => setExperience(prev => ({ ...prev, japanSpecific: e.target.checked }))}
            className="mr-3"
          />
          <span className="text-sm text-gray-700">Conozco el mercado inmobiliario japonés</span>
        </label>
      </div>
      
      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
      >
        Continuar
      </button>
    </div>
  );
};

// Componente para objetivos
const GoalsStep: React.FC<{ onComplete: (data: any) => void }> = ({ onComplete }) => {
  const [goals, setGoals] = useState({
    targetROI: 8,
    timeline: 'medium' as 'short' | 'medium' | 'long',
    riskTolerance: 'moderate' as 'conservative' | 'moderate' | 'aggressive',
    incomeType: 'both' as 'rental' | 'appreciation' | 'both'
  });

  const handleSubmit = () => {
    onComplete({ financialGoals: goals });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ROI objetivo (% anual)
        </label>
        <input
          type="number"
          value={goals.targetROI}
          onChange={(e) => setGoals(prev => ({ ...prev, targetROI: parseInt(e.target.value) }))}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Horizonte temporal
        </label>
        <select
          value={goals.timeline}
          onChange={(e) => setGoals(prev => ({ ...prev, timeline: e.target.value as any }))}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        >
          <option value="short">Corto plazo (1-3 años)</option>
          <option value="medium">Mediano plazo (3-7 años)</option>
          <option value="long">Largo plazo (7+ años)</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tolerancia al riesgo
        </label>
        <select
          value={goals.riskTolerance}
          onChange={(e) => setGoals(prev => ({ ...prev, riskTolerance: e.target.value as any }))}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        >
          <option value="conservative">Conservador - Bajo riesgo</option>
          <option value="moderate">Moderado - Riesgo balanceado</option>
          <option value="aggressive">Agresivo - Alto riesgo</option>
        </select>
      </div>
      
      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
      >
        Continuar
      </button>
    </div>
  );
};

// Componente para preferencias
const PreferencesStep: React.FC<{ onComplete: (data: any) => void }> = ({ onComplete }) => {
  const [preferences, setPreferences] = useState({
    propertyTypes: ['house'],
    locations: ['tokyo'],
    propertySize: { min: 50, max: 200 },
    renovationLevel: 'minor' as 'none' | 'minor' | 'major' | 'luxury'
  });

  const handleSubmit = () => {
    onComplete({ investmentPreferences: preferences });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tipos de propiedad preferidos
        </label>
        <div className="space-y-2">
          {['house', 'apartment', 'commercial', 'land'].map(type => (
            <label key={type} className="flex items-center">
              <input
                type="checkbox"
                checked={preferences.propertyTypes.includes(type)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setPreferences(prev => ({
                      ...prev,
                      propertyTypes: [...prev.propertyTypes, type]
                    }));
                  } else {
                    setPreferences(prev => ({
                      ...prev,
                      propertyTypes: prev.propertyTypes.filter(t => t !== type)
                    }));
                  }
                }}
                className="mr-3"
              />
              <span className="text-sm text-gray-700 capitalize">{type}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nivel de renovación
        </label>
        <select
          value={preferences.renovationLevel}
          onChange={(e) => setPreferences(prev => ({ ...prev, renovationLevel: e.target.value as any }))}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        >
          <option value="none">Sin renovación</option>
          <option value="minor">Renovación menor</option>
          <option value="major">Renovación mayor</option>
          <option value="luxury">Renovación de lujo</option>
        </select>
      </div>
      
      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
      >
        Completar Perfil
      </button>
    </div>
  );
};

export default InvestorOnboarding;
