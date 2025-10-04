// src/components/IntelligentOnboardingV2.tsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSafeLanguage } from '@/hooks/useSafeLanguage';
import { 
  User, 
  DollarSign, 
  Home, 
  Plane, 
  Brain, 
  Target, 
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Star,
  TrendingUp,
  Users,
  MapPin,
  Calendar,
  Heart
} from 'lucide-react';

// Tipos de datos para el onboarding inteligente
interface BasicInfo {
  fullName: string;
  email: string;
  phone: string;
  nationality: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  currentCountry: string;
  currentCity: string;
  preferredLanguage: 'es' | 'en' | 'ja' | 'ar';
}

interface PrimaryIntent {
  mainGoal: 'invest' | 'migrate' | 'live' | 'explore';
  urgency: 'immediate' | 'within_6_months' | 'within_1_year' | 'exploring';
  motivation: string;
  previousExperience: 'none' | 'limited' | 'moderate' | 'extensive';
}

interface FinancialSituation {
  investmentBudget: {
    min: number;
    max: number;
    currency: string;
    liquidity: 'high' | 'medium' | 'low';
  };
  annualIncome: {
    amount: number;
    currency: string;
    stability: 'stable' | 'variable' | 'seasonal';
  };
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
}

interface FamilySituation {
  familySize: number;
  children: {
    count: number;
    ages: number[];
  };
  spouse: {
    hasSpouse: boolean;
    workStatus: string;
  };
}

interface CulturalAffinity {
  japanKnowledge: 'none' | 'basic' | 'intermediate' | 'advanced';
  languageLevel: 'none' | 'beginner' | 'intermediate' | 'advanced';
  values: {
    harmony: number;
    respect: number;
    discipline: number;
  };
  interests: string[];
}

interface CalculatedIndices {
  IVI: number; // Índice de Viabilidad de Inversión
  IVM: number; // Índice de Viabilidad de Migración
  ISE: number; // Índice de Satisfacción Esperada
  overallScore: number;
  recommendation: 'excellent' | 'good' | 'moderate' | 'risky';
}

const IntelligentOnboardingV2: React.FC = () => {
  const { t } = useSafeLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({
    basicInfo: {} as BasicInfo,
    primaryIntent: {} as PrimaryIntent,
    financialSituation: {} as FinancialSituation,
    familySituation: {} as FamilySituation,
    culturalAffinity: {} as CulturalAffinity,
  });
  const [calculatedIndices, setCalculatedIndices] = useState<CalculatedIndices | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    { id: 'basic', title: t('onboarding.steps.basicInfo'), icon: User },
    { id: 'intent', title: t('onboarding.steps.primaryGoal'), icon: Target },
    { id: 'financial', title: t('onboarding.steps.financialSituation'), icon: DollarSign },
    { id: 'family', title: t('onboarding.steps.familySituation'), icon: Users },
    { id: 'cultural', title: t('onboarding.steps.culturalAffinity'), icon: Heart },
    { id: 'results', title: t('onboarding.steps.intelligentAnalysis'), icon: Brain },
  ];

  const calculateIndices = (data: any): CalculatedIndices => {
    let IVI = 0, IVM = 0, ISE = 0;

    // Cálculo IVI (Índice de Viabilidad de Inversión)
    if (data.primaryIntent?.mainGoal === 'invest') {
      const budget = data.financialSituation?.investmentBudget;
      const experience = data.primaryIntent?.previousExperience;
      
      // Factor presupuesto (0-30 puntos)
      if (budget?.max > 1000000) IVI += 30;
      else if (budget?.max > 500000) IVI += 25;
      else if (budget?.max > 200000) IVI += 20;
      else if (budget?.max > 100000) IVI += 15;
      else IVI += 10;

      // Factor experiencia (0-25 puntos)
      if (experience === 'extensive') IVI += 25;
      else if (experience === 'moderate') IVI += 20;
      else if (experience === 'limited') IVI += 15;
      else IVI += 10;

      // Factor liquidez (0-20 puntos)
      if (budget?.liquidity === 'high') IVI += 20;
      else if (budget?.liquidity === 'medium') IVI += 15;
      else IVI += 10;

      // Factor tolerancia al riesgo (0-25 puntos)
      const risk = data.financialSituation?.riskTolerance;
      if (risk === 'aggressive') IVI += 25;
      else if (risk === 'moderate') IVI += 20;
      else IVI += 15;
    }

    // Cálculo IVM (Índice de Viabilidad de Migración)
    if (data.primaryIntent?.mainGoal === 'migrate') {
      const family = data.familySituation;
      const cultural = data.culturalAffinity;

      // Factor situación familiar (0-30 puntos)
      if (family?.familySize <= 2) IVM += 30;
      else if (family?.familySize <= 4) IVM += 25;
      else IVM += 20;

      // Factor conocimiento cultural (0-25 puntos)
      if (cultural?.japanKnowledge === 'advanced') IVM += 25;
      else if (cultural?.japanKnowledge === 'intermediate') IVM += 20;
      else if (cultural?.japanKnowledge === 'basic') IVM += 15;
      else IVM += 10;

      // Factor idioma (0-25 puntos)
      if (cultural?.languageLevel === 'advanced') IVM += 25;
      else if (cultural?.languageLevel === 'intermediate') IVM += 20;
      else if (cultural?.languageLevel === 'beginner') IVM += 15;
      else IVM += 5;

      // Factor valores culturales (0-20 puntos)
      const values = cultural?.values;
      if (values) {
        const avgValues = (values.harmony + values.respect + values.discipline) / 3;
        IVM += Math.round(avgValues * 2);
      }
    }

    // Cálculo ISE (Índice de Satisfacción Esperada)
    const cultural = data.culturalAffinity;
    if (cultural) {
      // Factor afinidad cultural (0-40 puntos)
      if (cultural.japanKnowledge === 'advanced') ISE += 40;
      else if (cultural.japanKnowledge === 'intermediate') ISE += 30;
      else if (cultural.japanKnowledge === 'basic') ISE += 20;
      else ISE += 10;

      // Factor valores (0-30 puntos)
      const values = cultural.values;
      if (values) {
        const avgValues = (values.harmony + values.respect + values.discipline) / 3;
        ISE += Math.round(avgValues * 3);
      }

      // Factor intereses (0-30 puntos)
      const interests = cultural.interests?.length || 0;
      ISE += Math.min(interests * 5, 30);
    }

    const overallScore = Math.round((IVI + IVM + ISE) / 3);
    
    let recommendation: 'excellent' | 'good' | 'moderate' | 'risky';
    if (overallScore >= 80) recommendation = 'excellent';
    else if (overallScore >= 65) recommendation = 'good';
    else if (overallScore >= 50) recommendation = 'moderate';
    else recommendation = 'risky';

    return { IVI, IVM, ISE, overallScore, recommendation };
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const indices = calculateIndices(userData);
      setCalculatedIndices(indices);
      setIsComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateUserData = (section: string, data: any) => {
    setUserData(prev => ({
      ...prev,
      [section]: { ...prev[section as keyof typeof prev], ...data }
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <BasicInfoStep 
            data={userData.basicInfo} 
            onUpdate={(data) => updateUserData('basicInfo', data)} 
          />
        );
      case 1:
        return (
          <PrimaryIntentStep 
            data={userData.primaryIntent} 
            onUpdate={(data) => updateUserData('primaryIntent', data)} 
          />
        );
      case 2:
        return (
          <FinancialSituationStep 
            data={userData.financialSituation} 
            onUpdate={(data) => updateUserData('financialSituation', data)} 
          />
        );
      case 3:
        return (
          <FamilySituationStep 
            data={userData.familySituation} 
            onUpdate={(data) => updateUserData('familySituation', data)} 
          />
        );
      case 4:
        return (
          <CulturalAffinityStep 
            data={userData.culturalAffinity} 
            onUpdate={(data) => updateUserData('culturalAffinity', data)} 
          />
        );
      case 5:
        return (
          <ResultsStep 
            indices={calculatedIndices} 
            userData={userData} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🧠 Onboarding Inteligente
          </h1>
          <p className="text-lg text-gray-600">
            Te ayudamos a encontrar tu camino perfecto en Japón
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  index <= currentStep ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  <step.icon size={20} />
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 ${
                    index < currentStep ? 'bg-primary' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <span className="text-sm text-gray-600">
              Paso {currentStep + 1} de {steps.length}: {steps[currentStep].title}
            </span>
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        {!isComplete && (
          <div className="flex justify-between mt-8 max-w-4xl mx-auto">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Anterior
            </button>
            
            <button
              onClick={handleNext}
              className="flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              {currentStep === steps.length - 1 ? t('onboarding.viewAnalysis') : t('onboarding.next')}
              <ArrowRight size={20} className="ml-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Componentes para cada paso del onboarding
const BasicInfoStep: React.FC<{ data: BasicInfo; onUpdate: (data: Partial<BasicInfo>) => void }> = ({ data, onUpdate }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Información Básica</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
          <input
            type="text"
            value={data.fullName || ''}
            onChange={(e) => onUpdate({ fullName: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Tu nombre completo"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={data.email || ''}
            onChange={(e) => onUpdate({ email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="tu@email.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nacionalidad</label>
          <select
            value={data.nationality || ''}
            onChange={(e) => onUpdate({ nationality: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Selecciona tu nacionalidad</option>
            <option value="mexican">Mexicana</option>
            <option value="colombian">Colombiana</option>
            <option value="argentinian">Argentina</option>
            <option value="chilean">Chilena</option>
            <option value="peruvian">Peruana</option>
            <option value="american">Americana</option>
            <option value="canadian">Canadiense</option>
            <option value="european">Europea</option>
            <option value="other">Otra</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">País Actual</label>
          <input
            type="text"
            value={data.currentCountry || ''}
            onChange={(e) => onUpdate({ currentCountry: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder={t('onboarding.placeholders.currentCountry')}
          />
        </div>
      </div>
    </div>
  );
};

const PrimaryIntentStep: React.FC<{ data: PrimaryIntent; onUpdate: (data: Partial<PrimaryIntent>) => void }> = ({ data, onUpdate }) => {
  const { t } = useSafeLanguage();
  const goals = [
    { id: 'invest', title: t('onboarding.goals.invest'), description: t('onboarding.goals.investDescription'), icon: DollarSign },
    { id: 'migrate', title: t('onboarding.goals.migrate'), description: t('onboarding.goals.migrateDescription'), icon: Plane },
    { id: 'live', title: t('onboarding.goals.live'), description: t('onboarding.goals.liveDescription'), icon: Home },
    { id: 'explore', title: t('onboarding.goals.explore'), description: t('onboarding.goals.exploreDescription'), icon: Target },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">¿Cuál es tu objetivo principal?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {goals.map((goal) => (
          <button
            key={goal.id}
            onClick={() => onUpdate({ mainGoal: goal.id as any })}
            className={`p-6 rounded-xl border-2 transition-all ${
              data.mainGoal === goal.id
                ? 'border-primary bg-primary/10'
                : 'border-gray-200 hover:border-primary/50'
            }`}
          >
            <div className="flex items-center mb-3">
              <goal.icon size={24} className="mr-3 text-primary" />
              <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
            </div>
            <p className="text-sm text-gray-600">{goal.description}</p>
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Timeline</label>
          <select
            value={data.urgency || ''}
            onChange={(e) => onUpdate({ urgency: e.target.value as any })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Selecciona tu timeline</option>
            <option value="immediate">Inmediato (0-3 meses)</option>
            <option value="within_6_months">Corto plazo (3-6 meses)</option>
            <option value="within_1_year">Mediano plazo (6-12 meses)</option>
            <option value="exploring">Explorando opciones</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Experiencia Previa</label>
          <select
            value={data.previousExperience || ''}
            onChange={(e) => onUpdate({ previousExperience: e.target.value as any })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Selecciona tu experiencia</option>
            <option value="none">Ninguna</option>
            <option value="limited">Limitada</option>
            <option value="moderate">Moderada</option>
            <option value="extensive">Extensa</option>
          </select>
        </div>
      </div>
    </div>
  );
};

const FinancialSituationStep: React.FC<{ data: FinancialSituation; onUpdate: (data: Partial<FinancialSituation>) => void }> = ({ data, onUpdate }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Situación Financiera</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Presupuesto de Inversión (USD)</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={data.investmentBudget?.min || ''}
              onChange={(e) => onUpdate({ 
                investmentBudget: { 
                  ...data.investmentBudget, 
                  min: parseInt(e.target.value) || 0 
                } 
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder={t('onboarding.placeholders.minimum')}
            />
            <input
              type="number"
              value={data.investmentBudget?.max || ''}
              onChange={(e) => onUpdate({ 
                investmentBudget: { 
                  ...data.investmentBudget, 
                  max: parseInt(e.target.value) || 0 
                } 
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder={t('onboarding.placeholders.maximum')}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Liquidez</label>
          <select
            value={data.investmentBudget?.liquidity || ''}
            onChange={(e) => onUpdate({ 
              investmentBudget: { 
                ...data.investmentBudget, 
                liquidity: e.target.value as any 
              } 
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Selecciona liquidez</option>
            <option value="high">Alta</option>
            <option value="medium">Media</option>
            <option value="low">Baja</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Ingresos Anuales (USD)</label>
          <input
            type="number"
            value={data.annualIncome?.amount || ''}
            onChange={(e) => onUpdate({ 
              annualIncome: { 
                ...data.annualIncome, 
                amount: parseInt(e.target.value) || 0 
              } 
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Ingresos anuales"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tolerancia al Riesgo</label>
          <select
            value={data.riskTolerance || ''}
            onChange={(e) => onUpdate({ riskTolerance: e.target.value as any })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Selecciona tolerancia</option>
            <option value="conservative">Conservadora</option>
            <option value="moderate">Moderada</option>
            <option value="aggressive">Agresiva</option>
          </select>
        </div>
      </div>
    </div>
  );
};

const FamilySituationStep: React.FC<{ data: FamilySituation; onUpdate: (data: Partial<FamilySituation>) => void }> = ({ data, onUpdate }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Situación Familiar</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tamaño de Familia</label>
          <input
            type="number"
            value={data.familySize || ''}
            onChange={(e) => onUpdate({ familySize: parseInt(e.target.value) || 0 })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder={t('onboarding.placeholders.numberOfPeople')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Número de Hijos</label>
          <input
            type="number"
            value={data.children?.count || ''}
            onChange={(e) => onUpdate({ 
              children: { 
                ...data.children, 
                count: parseInt(e.target.value) || 0 
              } 
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder={t('onboarding.placeholders.numberOfChildren')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">¿Tienes Cónyuge?</label>
          <select
            value={data.spouse?.hasSpouse ? 'yes' : 'no'}
            onChange={(e) => onUpdate({ 
              spouse: { 
                ...data.spouse, 
                hasSpouse: e.target.value === 'yes' 
              } 
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Selecciona</option>
            <option value="yes">Sí</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Estado Laboral del Cónyuge</label>
          <select
            value={data.spouse?.workStatus || ''}
            onChange={(e) => onUpdate({ 
              spouse: { 
                ...data.spouse, 
                workStatus: e.target.value 
              } 
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Selecciona estado</option>
            <option value="employed">Empleado</option>
            <option value="unemployed">Desempleado</option>
            <option value="student">Estudiante</option>
            <option value="retired">Jubilado</option>
          </select>
        </div>
      </div>
    </div>
  );
};

const CulturalAffinityStep: React.FC<{ data: CulturalAffinity; onUpdate: (data: Partial<CulturalAffinity>) => void }> = ({ data, onUpdate }) => {
  const { t } = useSafeLanguage();
  const interests = [
    t('onboarding.interests.artCulture'), t('onboarding.interests.sports'), t('onboarding.interests.gastronomy'), t('onboarding.interests.nature'), t('onboarding.interests.technology'),
    t('onboarding.interests.music'), t('onboarding.interests.literature'), t('onboarding.interests.cinema'), t('onboarding.interests.history'), t('onboarding.interests.philosophy')
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Afinidad Cultural</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Conocimiento de Japón</label>
          <select
            value={data.japanKnowledge || ''}
            onChange={(e) => onUpdate({ japanKnowledge: e.target.value as any })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Selecciona nivel</option>
            <option value="none">Ninguno</option>
            <option value="basic">Básico</option>
            <option value="intermediate">Intermedio</option>
            <option value="advanced">Avanzado</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nivel de Japonés</label>
          <select
            value={data.languageLevel || ''}
            onChange={(e) => onUpdate({ languageLevel: e.target.value as any })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Selecciona nivel</option>
            <option value="none">Ninguno</option>
            <option value="beginner">Principiante</option>
            <option value="intermediate">Intermedio</option>
            <option value="advanced">Avanzado</option>
          </select>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Valores Importantes (1-10)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Armonía</label>
            <input
              type="range"
              min="1"
              max="10"
              value={data.values?.harmony || 5}
              onChange={(e) => onUpdate({ 
                values: { 
                  ...data.values, 
                  harmony: parseInt(e.target.value) 
                } 
              })}
              className="w-full"
            />
            <span className="text-sm text-gray-600">{data.values?.harmony || 5}</span>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Respeto</label>
            <input
              type="range"
              min="1"
              max="10"
              value={data.values?.respect || 5}
              onChange={(e) => onUpdate({ 
                values: { 
                  ...data.values, 
                  respect: parseInt(e.target.value) 
                } 
              })}
              className="w-full"
            />
            <span className="text-sm text-gray-600">{data.values?.respect || 5}</span>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Disciplina</label>
            <input
              type="range"
              min="1"
              max="10"
              value={data.values?.discipline || 5}
              onChange={(e) => onUpdate({ 
                values: { 
                  ...data.values, 
                  discipline: parseInt(e.target.value) 
                } 
              })}
              className="w-full"
            />
            <span className="text-sm text-gray-600">{data.values?.discipline || 5}</span>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Intereses Culturales</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {interests.map((interest) => (
            <button
              key={interest}
              onClick={() => {
                const currentInterests = data.interests || [];
                const newInterests = currentInterests.includes(interest)
                  ? currentInterests.filter(i => i !== interest)
                  : [...currentInterests, interest];
                onUpdate({ interests: newInterests });
              }}
              className={`p-3 rounded-lg border transition-all ${
                data.interests?.includes(interest)
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-200 hover:border-primary/50'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const ResultsStep: React.FC<{ indices: CalculatedIndices | null; userData: any }> = ({ indices, userData }) => {
  if (!indices) return null;

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'risky': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRecommendationText = (recommendation: string) => {
    switch (recommendation) {
      case 'excellent': return 'Excelente Oportunidad';
      case 'good': return 'Buena Oportunidad';
      case 'moderate': return 'Oportunidad Moderada';
      case 'risky': return 'Requiere Cuidado';
      default: return 'Evaluando';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Análisis Inteligente Completo</h2>
      
      {/* Overall Score */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white mb-4">
          <div className="text-center">
            <div className="text-3xl font-bold">{indices.overallScore}</div>
            <div className="text-sm">Puntos</div>
          </div>
        </div>
        <div className={`inline-block px-6 py-3 rounded-full font-semibold ${getRecommendationColor(indices.recommendation)}`}>
          {getRecommendationText(indices.recommendation)}
        </div>
      </div>

      {/* Individual Scores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl">
          <div className="flex items-center mb-3">
            <TrendingUp className="w-6 h-6 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-green-800">IVI</h3>
          </div>
          <div className="text-2xl font-bold text-green-600 mb-2">{indices.IVI}</div>
          <p className="text-sm text-green-700">Índice de Viabilidad de Inversión</p>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl">
          <div className="flex items-center mb-3">
            <Plane className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-blue-800">IVM</h3>
          </div>
          <div className="text-2xl font-bold text-blue-600 mb-2">{indices.IVM}</div>
          <p className="text-sm text-blue-700">Índice de Viabilidad de Migración</p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl">
          <div className="flex items-center mb-3">
            <Heart className="w-6 h-6 text-purple-600 mr-2" />
            <h3 className="text-lg font-semibold text-purple-800">ISE</h3>
          </div>
          <div className="text-2xl font-bold text-purple-600 mb-2">{indices.ISE}</div>
          <p className="text-sm text-purple-700">Índice de Satisfacción Esperada</p>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recomendaciones Personalizadas</h3>
        <div className="space-y-3">
          {indices.recommendation === 'excellent' && (
            <>
              <div className="flex items-center text-green-700">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Tu perfil es ideal para Japón. Te recomendamos proceder con confianza.</span>
              </div>
              <div className="flex items-center text-green-700">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Considera comenzar con propiedades de alto valor en ubicaciones premium.</span>
              </div>
            </>
          )}
          {indices.recommendation === 'good' && (
            <>
              <div className="flex items-center text-blue-700">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Tu perfil tiene buen potencial. Te sugerimos preparación adicional.</span>
              </div>
              <div className="flex items-center text-blue-700">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Considera mejorar tu nivel de japonés antes de proceder.</span>
              </div>
            </>
          )}
          {indices.recommendation === 'moderate' && (
            <>
              <div className="flex items-center text-yellow-700">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Tu perfil requiere más preparación. Te recomendamos un plan de desarrollo.</span>
              </div>
              <div className="flex items-center text-yellow-700">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Considera comenzar con inversiones más conservadoras.</span>
              </div>
            </>
          )}
          {indices.recommendation === 'risky' && (
            <>
              <div className="flex items-center text-red-700">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Tu perfil actual presenta desafíos significativos.</span>
              </div>
              <div className="flex items-center text-red-700">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Te recomendamos trabajar en áreas específicas antes de proceder.</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntelligentOnboardingV2;

