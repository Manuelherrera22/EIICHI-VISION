'use client';

import React from 'react';
import { useArquitecto } from '@/contexts/ArquitectoContext';
import IntelligentCommandCenter from './dso/IntelligentCommandCenter';
import { EnhancedOnboardingData } from '@/utils/intelligentScoring';

export default function IntelligentDashboardBridge() {
  const { userProfile } = useArquitecto();

  // Convertir datos del ArquitectoContext a EnhancedOnboardingData
  const enhancedData: EnhancedOnboardingData = {
    // Datos básicos del onboarding
    investmentGoals: userProfile.investmentObjective ? [userProfile.investmentObjective] : [],
    lifestyle: userProfile.propertyQuality ? [userProfile.propertyQuality] : [],
    architecturalStyle: [], // Se puede agregar más tarde
    location: [], // Se puede agregar más tarde
    budget: userProfile.investmentRange || '50k-100k',
    timeline: '6-12-months', // Default
    
    // Datos adicionales para análisis inteligente
    profession: userProfile.professionalField || 'otros',
    educationLevel: 'bachelors', // Default
    familySize: userProfile.familySize === 'solo' ? 1 : userProfile.familySize === 'pareja' ? 2 : 3,
    interests: [],
    experienceInJapan: false, // Default
    languageLevel: 'beginner', // Default
    age: 35, // Default
    nationality: 'colombian', // Default
    workExperience: 5, // Default
    currentIncome: 'medium', // Default
    riskProfile: userProfile.investmentLevel === 'alto' ? 'aggressive' : 
                userProfile.investmentLevel === 'medio' ? 'moderate' : 'conservative',
    investmentExperience: userProfile.investmentLevel === 'alto' ? 'extensive' : 
                         userProfile.investmentLevel === 'medio' ? 'moderate' : 'beginner',
    
    // Datos de actividad y comportamiento
    lastLogin: new Date(),
    pagesVisited: [],
    timeSpentOnSite: 0,
    propertiesViewed: [],
    documentsUploaded: [],
    questionsAnswered: 0,
    
    // Preferencias específicas
    preferredPropertyTypes: userProfile.businessType ? [userProfile.businessType] : [],
    maxBudget: userProfile.investmentRange === '1m+' ? 1000000 : 
               userProfile.investmentRange === '500k-1m' ? 500000 :
               userProfile.investmentRange === '100k-500k' ? 100000 : 50000,
    minROI: 5, // Default
    preferredLocations: [],
    renovationBudget: '20k-50k', // Default
    rentalGoals: userProfile.investmentObjective === 'flujo-caja',
    vacationUse: userProfile.propertyUse === 'tiempo-parcial',
    familyRelocation: userProfile.familySize !== 'solo'
  };

  return (
    <IntelligentCommandCenter 
      onboardingData={enhancedData}
      userName={userProfile.name}
      userEmail={userProfile.email}
    />
  );
}
