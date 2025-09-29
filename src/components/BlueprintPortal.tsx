'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  User, 
  Target, 
  Home, 
  Palette, 
  Sparkles, 
  ArrowRight, 
  CheckCircle,
  Heart,
  Mountain,
  Waves,
  TreePine,
  Building,
  Camera,
  MapPin,
  Star,
  TrendingUp,
  Clock,
  Users,
  Award,
  Zap
} from 'lucide-react';

interface InvestorProfile {
  investmentGoals: string[];
  lifestyle: string[];
  architecturalStyle: string[];
  location: string[];
  budget: string;
  timeline: string;
}

interface PropertyMatch {
  id: string;
  title: string;
  location: string;
  price: number;
  matchScore: number;
  images: string[];
  features: string[];
  potential: string;
  render: string;
}

const BlueprintPortal = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState<InvestorProfile>({
    investmentGoals: [],
    lifestyle: [],
    architecturalStyle: [],
    location: [],
    budget: '',
    timeline: ''
  });
  const [matches, setMatches] = useState<PropertyMatch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();

  const steps = [
    {
      id: 'goals',
      title: t('blueprint.investmentGoals'),
      subtitle: t('blueprint.whatDoYouSeek'),
      icon: Target,
      options: [
        { id: 'roi', label: t('blueprint.shortTermROI'), icon: TrendingUp, description: t('blueprint.maximizeReturn') },
        { id: 'vacation', label: t('blueprint.vacationHome'), icon: Heart, description: t('blueprint.placeToEscape') },
        { id: 'residence', label: t('blueprint.primaryResidence'), icon: Home, description: t('blueprint.moveToJapan') },
        { id: 'rental', label: t('blueprint.rentalProperty'), icon: Building, description: t('blueprint.generatePassiveIncome') },
        { id: 'heritage', label: t('blueprint.preserveHeritage'), icon: Award, description: t('blueprint.restoreAndPreserve') }
      ]
    },
    {
      id: 'lifestyle',
      title: t('blueprint.lifestyle'),
      subtitle: t('blueprint.lifestyleQuestion'),
      icon: User,
      options: [
        { id: 'tranquil', label: t('blueprint.tranquilitySilence'), icon: TreePine, description: t('blueprint.ruralPeaceful') },
        { id: 'active', label: t('blueprint.nearSkiResorts'), icon: Mountain, description: t('blueprint.winterSportsAccess') },
        { id: 'cultural', label: t('blueprint.culturalLife'), icon: Users, description: t('blueprint.eventsFestivals') },
        { id: 'onsen', label: t('blueprint.onsenExperience'), icon: Waves, description: t('blueprint.thermalWatersRelaxation') },
        { id: 'modern', label: t('blueprint.modernConvenience'), icon: Zap, description: t('blueprint.currentServicesTechnology') }
      ]
    },
    {
      id: 'architecture',
      title: t('blueprint.architecturalDesign'),
      subtitle: t('blueprint.selectStylesInspire'),
      icon: Palette,
      options: [
        { id: 'minimalist', label: t('blueprint.minimalist'), icon: Home, description: t('blueprint.cleanLinesOpenSpaces') },
        { id: 'wabi-sabi', label: t('blueprint.wabiSabi'), icon: TreePine, description: t('blueprint.beautyInImperfection') },
        { id: 'traditional', label: t('blueprint.traditionalJapanese'), icon: Building, description: t('blueprint.authenticClassicElements') },
        { id: 'modern-japanese', label: t('blueprint.modernJapanese'), icon: Star, description: t('blueprint.fusionTraditionModernity') },
        { id: 'contemporary', label: t('blueprint.contemporary'), icon: Zap, description: t('blueprint.avantGardeDesign') }
      ]
    },
    {
      id: 'location',
      title: t('blueprint.preferredLocation'),
      subtitle: t('blueprint.whereWouldYouLike'),
      icon: MapPin,
      options: [
        { id: 'gunma-mountains', label: t('blueprint.gunmaMountains'), icon: Mountain, description: t('blueprint.panoramicViewsNature') },
        { id: 'hot-springs', label: t('blueprint.hotSpringsZone'), icon: Waves, description: t('blueprint.accessTraditionalOnsens') },
        { id: 'cultural-heritage', label: t('blueprint.culturalHeritage'), icon: Award, description: t('blueprint.nearTemplesHistoricSites') },
        { id: 'ski-resorts', label: t('blueprint.nearSkiStations'), icon: Mountain, description: t('blueprint.winterSportsAccess') },
        { id: 'rural-village', label: t('blueprint.authenticRuralVillage'), icon: TreePine, description: t('blueprint.traditionalJapaneseLife') }
      ]
    },
    {
      id: 'budget',
      title: t('blueprint.budget'),
      subtitle: t('blueprint.whatInvestmentRange'),
      icon: TrendingUp,
      options: [
        { id: '50k-100k', label: '$50K - $100K USD', description: t('blueprint.basicRenovationProject') },
        { id: '100k-200k', label: '$100K - $200K USD', description: t('blueprint.completeRenovationPremium') },
        { id: '200k-300k', label: '$200K - $300K USD', description: t('blueprint.totalTransformationCustom') },
        { id: '300k-plus', label: '$300K+ USD', description: t('blueprint.luxuryProjectAllAmenities') }
      ]
    },
    {
      id: 'timeline',
      title: t('blueprint.schedule'),
      subtitle: t('blueprint.whenCompleteProject'),
      icon: Clock,
      options: [
        { id: '6-months', label: t('blueprint.timeline6Months'), description: t('blueprint.acceleratedProject') },
        { id: '12-months', label: t('blueprint.timeline12Months'), description: t('blueprint.standardSchedule') },
        { id: '18-months', label: t('blueprint.timeline18Months'), description: t('blueprint.detailedProject') },
        { id: 'flexible', label: t('blueprint.flexible'), description: t('blueprint.noRushQualityFirst') }
      ]
    }
  ];

  const handleOptionSelect = (stepId: string, optionId: string) => {
    setProfile(prev => ({
      ...prev,
      [stepId]: prev[stepId as keyof InvestorProfile].includes(optionId) 
        ? (prev[stepId as keyof InvestorProfile] as string[]).filter(id => id !== optionId)
        : [...(prev[stepId as keyof InvestorProfile] as string[]), optionId]
    }));
  };

  const handleSingleSelect = (stepId: string, optionId: string) => {
    setProfile(prev => ({
      ...prev,
      [stepId]: optionId
    }));
  };

  const generateMatches = async () => {
    setIsLoading(true);
    
    // Simular procesamiento con IA
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockMatches: PropertyMatch[] = [
      {
        id: '1',
        title: t('blueprint.property1.title'),
        location: t('blueprint.property1.location'),
        price: 85000,
        matchScore: 95,
        images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'],
        features: [t('blueprint.property1.feature1'), t('blueprint.property1.feature2'), t('blueprint.property1.feature3')],
        potential: t('blueprint.property1.potential'),
        render: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      },
      {
        id: '2',
        title: t('blueprint.property2.title'),
        location: t('blueprint.property2.location'),
        price: 65000,
        matchScore: 88,
        images: ['https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'],
        features: [t('blueprint.property2.feature1'), t('blueprint.property2.feature2'), t('blueprint.property2.feature3')],
        potential: t('blueprint.property2.potential'),
        render: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      },
      {
        id: '3',
        title: t('blueprint.property3.title'),
        location: t('blueprint.property3.location'),
        price: 120000,
        matchScore: 92,
        images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'],
        features: [t('blueprint.property3.feature1'), t('blueprint.property3.feature2'), t('blueprint.property3.feature3')],
        potential: t('blueprint.property3.potential'),
        render: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      }
    ];
    
    setMatches(mockMatches);
    setIsLoading(false);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateMatches();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepComplete = (stepId: string) => {
    const value = profile[stepId as keyof InvestorProfile];
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value !== '';
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative z-10 pt-8 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="inline-flex items-center space-x-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
                <Sparkles className="w-5 h-5 text-accent" />
                <span className="text-primary font-medium">{t('blueprint.title')}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-4">
                {t('blueprint.visionPortal')}
              </h1>
              <p className="text-xl text-secondary max-w-3xl mx-auto">
                {t('blueprint.coCreatePersonalVision')}
              </p>
            </motion.div>

            {/* Progress Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-secondary">{t('blueprint.step1Of6').replace('1', (currentStep + 1).toString()).replace('6', steps.length.toString())}</span>
                <span className="text-sm text-secondary">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-accent to-accent/80 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {!isLoading && matches.length === 0 && (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl p-8 border border-border shadow-sm"
              >
                {/* Step Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-accent to-accent/80 rounded-full mb-4">
                    {currentStepData.icon && <currentStepData.icon className="w-8 h-8 text-white" />}
                  </div>
                  <h2 className="text-3xl font-serif font-bold text-primary mb-2">
                    {currentStepData.title}
                  </h2>
                  <p className="text-lg text-secondary">
                    {currentStepData.subtitle}
                  </p>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {currentStepData.options.map((option) => {
                    const isSelected = Array.isArray(profile[currentStepData.id as keyof InvestorProfile])
                      ? (profile[currentStepData.id as keyof InvestorProfile] as string[]).includes(option.id)
                      : profile[currentStepData.id as keyof InvestorProfile] === option.id;

                    return (
                      <motion.button
                        key={option.id}
                        onClick={() => {
                          if (Array.isArray(profile[currentStepData.id as keyof InvestorProfile])) {
                            handleOptionSelect(currentStepData.id, option.id);
                          } else {
                            handleSingleSelect(currentStepData.id, option.id);
                          }
                        }}
                        className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left group ${
                          isSelected
                            ? 'border-accent bg-accent/10 shadow-lg shadow-accent/25'
                            : 'border-border bg-muted hover:border-accent hover:bg-accent/5'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-xl ${
                            isSelected ? 'bg-accent text-white' : 'bg-primary/10 text-primary/60'
                          }`}>
                            {option.icon && <option.icon className="w-6 h-6" />}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-primary mb-1">
                              {option.label}
                            </h3>
                            <p className="text-sm text-secondary">
                              {option.description}
                            </p>
                          </div>
                          {isSelected && (
                            <CheckCircle className="w-6 h-6 text-accent" />
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="px-6 py-3 rounded-full border border-border text-primary hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {t('blueprint.previous')}
                  </button>

                  <button
                    onClick={nextStep}
                    disabled={!isStepComplete(currentStepData.id)}
                    className="px-8 py-3 bg-gradient-to-r from-accent to-accent/80 text-white rounded-full hover:shadow-lg hover:shadow-accent/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center space-x-2"
                  >
                    <span>
                      {currentStep === steps.length - 1 ? t('blueprint.generateMatches') : t('blueprint.next')}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Loading State */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-3xl p-12 border border-border shadow-sm text-center"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-accent to-accent/80 rounded-full mb-6">
                  <Sparkles className="w-10 h-10 text-white animate-pulse" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                  {t('blueprint.processingProfile')}
                </h3>
                <p className="text-lg text-secondary mb-6">
                  {t('blueprint.aiAnalyzingPreferences')}
                </p>
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                </div>
              </motion.div>
            )}

            {/* Results */}
            {!isLoading && matches.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-serif font-bold text-primary mb-4">
                    {t('blueprint.preliminaryPortfolio')}
                  </h2>
                  <p className="text-lg text-secondary">
                    {t('blueprint.propertiesSelectedForYou')}
                  </p>
                </div>

                {matches.map((match, index) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-3xl p-8 border border-border shadow-sm"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Images */}
                      <div className="space-y-4">
                        <div className="aspect-video bg-muted rounded-2xl overflow-hidden">
                          <img
                            src={match.render}
                            alt={match.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex space-x-2">
                          {match.images.map((image, i) => (
                            <div key={i} className="w-20 h-20 bg-muted rounded-xl overflow-hidden">
                              <img
                                src={image}
                                alt={`${match.title} ${i + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-2xl font-serif font-bold text-primary">
                              {match.title}
                            </h3>
                            <div className="flex items-center space-x-1 bg-accent/20 px-3 py-1 rounded-full">
                              <Star className="w-4 h-4 text-accent" />
                              <span className="text-accent font-semibold">
                                {match.matchScore}% {t('blueprint.matchScore')}
                              </span>
                            </div>
                          </div>
                          <p className="text-secondary flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <span>{match.location}</span>
                          </p>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-primary mb-3">{t('blueprint.characteristics')}</h4>
                          <div className="flex flex-wrap gap-2">
                            {match.features.map((feature, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-muted text-secondary rounded-full text-sm"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-primary mb-3">{t('blueprint.potential')}</h4>
                          <p className="text-secondary">{match.potential}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-bold text-accent">
                              ${match.price.toLocaleString()} USD
                            </p>
                            <p className="text-secondary text-sm">{t('blueprint.basePriceRenovation')}</p>
                          </div>
                          <a
                            href={`/property/${match.id}`}
                            className="px-6 py-3 bg-gradient-to-r from-accent to-accent/80 text-white rounded-full hover:shadow-lg hover:shadow-accent/25 transition-all duration-300 inline-block"
                          >
                            {t('blueprint.viewDetails')}
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                <div className="text-center">
                  <a
                    href="/kusatsu-project"
                    className="px-8 py-4 bg-gradient-to-r from-accent to-accent/80 text-white rounded-full hover:shadow-lg hover:shadow-accent/25 transition-all duration-300 text-lg font-semibold inline-block"
                  >
                    {t('blueprint.continueToKusatsuProject')}
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default BlueprintPortal;
