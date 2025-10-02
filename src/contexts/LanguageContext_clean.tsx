'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Tipos para el contexto de idioma
type Language = 'en' | 'ja' | 'ar' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Crear el contexto
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Traducciones
const translations = {
  en: {
    // About Page - Visionary Section (Updated to remove direct mentions)
    'about.visionaryPart': 'Part 1: The Visionary',
    'about.visionaryTitle': 'The Modern Japan Architect',
    'about.visionarySubtitle': 'A Legacy of Ethical Business',
    'about.visionaryDescription1': 'Born in 1840 in Musashi Province (now Saitama), this visionary transformed Japan from a feudal society into a modern economic power.',
    'about.visionaryDescription2': 'The unique philosophy of Gapponshugi combined Confucian principles with business efficiency, establishing that commercial success must be grounded in solid ethical values.',
    'about.transformativeImpact': 'The Transformative Impact',
    'about.impact1': 'Founded over 500 modern companies',
    'about.impact2': 'Established the Japanese banking system',
    'about.impact3': 'Promoted education and philanthropy',
    'about.impact4': 'Created the corporate social responsibility model',
    'about.moralityEconomy': 'Morality and economy must go hand in hand',
  },
  
  ja: {
    // About Page - Visionary Section (Updated to remove direct mentions)
    'about.visionaryPart': '第1部：ビジョナリー',
    'about.visionaryTitle': '近代日本の建築家',
    'about.visionarySubtitle': '倫理的ビジネスの遺産',
    'about.visionaryDescription1': '1840年に武蔵国（現在の埼玉県）で生まれたこのビジョナリーは、日本を封建社会から近代経済大国に変革しました。',
    'about.visionaryDescription2': 'ユニークな哲学である「合本主義」は、儒教の原則とビジネス効率を組み合わせ、商業的成功は確固たる倫理価値に基づくべきであることを確立しました。',
    'about.transformativeImpact': '変革的影響',
    'about.impact1': '500以上の近代企業を設立',
    'about.impact2': '日本の銀行システムを確立',
    'about.impact3': '教育と慈善活動を推進',
    'about.impact4': '企業の社会的責任モデルを創設',
    'about.moralityEconomy': '道徳と経済は手を取り合って進まなければならない',
  },
  
  ar: {
    // About Page - Visionary Section (Updated to remove direct mentions)
    'about.visionaryPart': 'الجزء الأول: الرؤيوي',
    'about.visionaryTitle': 'مهندس اليابان الحديثة',
    'about.visionarySubtitle': 'إرث الأعمال الأخلاقية',
    'about.visionaryDescription1': 'وُلد في عام 1840 في مقاطعة موساشي (سايتاما الحالية)، كان هذا الرؤيوي قد حوّل اليابان من مجتمع إقطاعي إلى قوة اقتصادية حديثة.',
    'about.visionaryDescription2': 'الفلسفة الفريدة "غابونشوجي" جمعت بين المبادئ الكونفوشيوسية وكفاءة الأعمال، مؤكدة أن النجاح التجاري يجب أن يكون مبنياً على قيم أخلاقية صلبة.',
    'about.transformativeImpact': 'التأثير التحويلي',
    'about.impact1': 'أسس أكثر من 500 شركة حديثة',
    'about.impact2': 'أنشأ النظام المصرفي الياباني',
    'about.impact3': 'شجع التعليم والعمل الخيري',
    'about.impact4': 'أنشأ نموذج المسؤولية الاجتماعية للشركات',
    'about.moralityEconomy': 'الأخلاق والاقتصاد يجب أن يسيرا جنباً إلى جنب',
  },
  
  es: {
    // About Page - Visionary Section (Updated to remove direct mentions)
    'about.visionaryPart': 'Parte 1: El Visionario',
    'about.visionaryTitle': 'El Arquitecto del Japón Moderno',
    'about.visionarySubtitle': 'Un Legado de Negocios Éticos',
    'about.visionaryDescription1': 'Nacido en 1840 en la provincia de Musashi (actual Saitama), este visionario transformó Japón de una sociedad feudal a una potencia económica moderna.',
    'about.visionaryDescription2': 'La filosofía única de Gapponshugi combinaba principios confucianos con eficiencia empresarial, estableciendo que el éxito comercial debe estar fundamentado en valores éticos sólidos.',
    'about.transformativeImpact': 'El Impacto Transformador',
    'about.impact1': 'Fundó más de 500 empresas modernas',
    'about.impact2': 'Estableció el sistema bancario japonés',
    'about.impact3': 'Promovió la educación y filantropía',
    'about.impact4': 'Creó el modelo de responsabilidad social empresarial',
    'about.moralityEconomy': 'La moralidad y la economía deben ir de la mano',
  }
};

// Hook personalizado para usar el contexto
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Provider del contexto de idioma
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  // Función de traducción
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Efecto para cargar el idioma guardado
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'ja', 'ar', 'es'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Efecto para guardar el idioma
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageContext;
