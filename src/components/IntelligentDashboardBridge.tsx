'use client';

import React from 'react';
import { useArquitecto } from '@/contexts/ArquitectoContext';
import IntelligentCommandCenter from './dso/IntelligentCommandCenter';
import { EnhancedOnboardingData } from '@/utils/intelligentScoring';

export default function IntelligentDashboardBridge() {
  const { userProfile } = useArquitecto();

  // Debug: Log de los datos del perfil
  console.log('🔍 UserProfile completo:', userProfile);
  console.log('🔍 Datos fundamentales:', {
    fullName: userProfile.fullName,
    age: userProfile.age,
    nationality: userProfile.nationality,
    timeline: userProfile.timeline,
    motivation: userProfile.motivation,
    budgetMin: userProfile.budgetMin,
    budgetMax: userProfile.budgetMax,
    intelligentScores: userProfile.intelligentScores
  });

  // Convertir datos del ArquitectoContext a EnhancedOnboardingData
  const enhancedData: EnhancedOnboardingData = {
    // Datos básicos del onboarding
    investmentGoals: userProfile.investmentObjective ? [userProfile.investmentObjective] : [],
    lifestyle: userProfile.propertyQuality ? [userProfile.propertyQuality] : [],
    architecturalStyle: [], // Se puede agregar más tarde
    location: [], // Se puede agregar más tarde
    budget: userProfile.investmentRange || '50k-100k',
    timeline: userProfile.timeline === 'inmediato' ? '0-3-months' :
              userProfile.timeline === '6-meses' ? '6-months' :
              userProfile.timeline === '1-ano' ? '12-months' : '6-12-months',
    
    // Datos adicionales para análisis inteligente
    profession: userProfile.professionalField || 'otros',
    educationLevel: userProfile.professionalSituation?.education === 'postgrado' ? 'masters' :
                   userProfile.professionalSituation?.education === 'universitaria' ? 'bachelors' :
                   userProfile.professionalSituation?.education === 'media' ? 'high-school' : 'bachelors',
    familySize: userProfile.familySituation?.size === 'solo' ? 1 :
                userProfile.familySituation?.size === 'pareja' ? 2 :
                userProfile.familySituation?.size === 'familia-pequena' ? 3 : 4,
    interests: userProfile.culturalAffinity?.culturalInterests || [],
    experienceInJapan: userProfile.previousExperience === 'extensa' || userProfile.previousExperience === 'moderada',
    languageLevel: userProfile.culturalAffinity?.japaneseLevel === 'avanzado' ? 'advanced' :
                  userProfile.culturalAffinity?.japaneseLevel === 'intermedio' ? 'intermediate' :
                  userProfile.culturalAffinity?.japaneseLevel === 'principiante' ? 'beginner' : 'beginner',
    age: userProfile.age || 35,
    nationality: userProfile.nationality || 'colombian',
    workExperience: 5, // Default
    currentIncome: userProfile.annualIncome && userProfile.annualIncome > 100000 ? 'high' :
                   userProfile.annualIncome && userProfile.annualIncome > 50000 ? 'medium' : 'low',
    riskProfile: userProfile.riskTolerance === 'agresivo' ? 'aggressive' :
                userProfile.riskTolerance === 'moderado' ? 'moderate' : 'conservative',
    investmentExperience: userProfile.financialExperience === 'avanzada' ? 'extensive' :
                         userProfile.financialExperience === 'intermedia' ? 'moderate' :
                         userProfile.financialExperience === 'basica' ? 'beginner' : 'beginner',
    
    // Datos de actividad y comportamiento
    lastLogin: new Date(),
    pagesVisited: [],
    timeSpentOnSite: 0,
    propertiesViewed: [],
    documentsUploaded: [],
    questionsAnswered: 0,
    
    // Preferencias específicas
    preferredPropertyTypes: userProfile.businessType ? [userProfile.businessType] : [],
    maxBudget: userProfile.budgetMax || (userProfile.investmentRange === '1m+' ? 1000000 : 
               userProfile.investmentRange === '500k-1m' ? 500000 :
               userProfile.investmentRange === '100k-500k' ? 100000 : 50000),
    minROI: userProfile.expectedROI || 5,
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
