# 📊 SISTEMA COMPLETO DE DATOS PARA ONBOARDING INTELIGENTE

## 🎯 **OBJETIVO: DATOS PARA ANÁLISIS INTELIGENTE**

El onboarding debe recopilar datos específicos para calcular:
- **IVI (Índice de Viabilidad de Inversión)**
- **IVM (Índice de Viabilidad de Migración)**
- **ISE (Índice de Satisfacción Esperada)**
- **Probabilidades de éxito**
- **Afinidades culturales**
- **Recomendaciones personalizadas**

---

## 🔍 **DATOS FUNDAMENTALES (OBLIGATORIOS)**

### **1. 👤 IDENTIFICACIÓN BÁSICA**
```typescript
interface BasicInfo {
  // Datos personales
  fullName: string;
  email: string;
  phone: string;
  nationality: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  
  // Ubicación actual
  currentCountry: string;
  currentCity: string;
  timezone: string;
  
  // Preferencias de idioma
  preferredLanguage: 'es' | 'en' | 'ja' | 'ar';
  communicationStyle: 'formal' | 'casual' | 'mixed';
}
```

### **2. 🎯 INTENCIÓN PRINCIPAL**
```typescript
interface PrimaryIntent {
  mainGoal: 'invest' | 'migrate' | 'live' | 'explore';
  urgency: 'immediate' | 'within_6_months' | 'within_1_year' | 'exploring';
  motivation: string; // Texto libre sobre motivación
  previousExperience: 'none' | 'limited' | 'moderate' | 'extensive';
}
```

---

## 💰 **DATOS PARA INVERSORES**

### **3. 💵 SITUACIÓN FINANCIERA**
```typescript
interface FinancialSituation {
  // Presupuesto de inversión
  investmentBudget: {
    min: number;
    max: number;
    currency: string;
    liquidity: 'high' | 'medium' | 'low';
    source: 'savings' | 'loan' | 'investment' | 'business' | 'inheritance';
  };
  
  // Ingresos y patrimonio
  annualIncome: {
    amount: number;
    currency: string;
    stability: 'stable' | 'variable' | 'seasonal';
    source: 'salary' | 'business' | 'investments' | 'pension' | 'other';
  };
  
  // Experiencia financiera
  financialExperience: {
    realEstate: 'none' | 'beginner' | 'intermediate' | 'expert';
    international: boolean;
    japanSpecific: boolean;
    previousInvestments: Investment[];
    riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  };
}
```

### **4. 🏠 OBJETIVOS DE INVERSIÓN**
```typescript
interface InvestmentGoals {
  // Objetivos financieros
  targetROI: number; // Porcentaje anual esperado
  timeline: 'short' | 'medium' | 'long'; // 1-2 años, 3-5 años, 5+ años
  incomeType: 'rental' | 'appreciation' | 'both';
  exitStrategy: 'long_term' | 'flip' | 'development' | 'portfolio';
  
  // Preferencias de propiedad
  propertyTypes: string[]; // ['apartment', 'house', 'commercial', 'land']
  locations: string[]; // Prefecturas o ciudades específicas
  propertySize: { min: number; max: number }; // m²
  renovationLevel: 'none' | 'minor' | 'major' | 'luxury';
  
  // Factores de decisión
  priorityFactors: {
    location: number; // 1-10
    price: number;
    roi: number;
    growth: number;
    lifestyle: number;
  };
}
```

---

## 🌍 **DATOS PARA MIGRANTES**

### **5. 👨‍👩‍👧‍👦 SITUACIÓN FAMILIAR**
```typescript
interface FamilySituation {
  // Composición familiar
  familySize: number;
  children: {
    count: number;
    ages: number[];
    educationLevel: string[];
    specialNeeds: string[];
  };
  
  // Situación marital
  spouse: {
    hasSpouse: boolean;
    workStatus: 'employed' | 'unemployed' | 'student' | 'retired';
    profession: string;
    education: string;
    languageSkills: LanguageSkills;
  };
  
  // Dependientes
  dependents: {
    elderly: number;
    disabled: number;
    other: number;
  };
  
  // Necesidades especiales
  specialNeeds: {
    medical: string[];
    educational: string[];
    accessibility: string[];
  };
}
```

### **6. 💼 SITUACIÓN PROFESIONAL**
```typescript
interface ProfessionalSituation {
  // Trabajo actual
  currentJob: {
    title: string;
    industry: string;
    company: string;
    experience: number; // años
    salary: number;
    currency: string;
  };
  
  // Educación
  education: {
    level: 'high_school' | 'bachelor' | 'master' | 'phd' | 'other';
    field: string;
    institution: string;
    country: string;
  };
  
  // Habilidades
  skills: {
    technical: string[];
    language: LanguageSkills;
    soft: string[];
    certifications: string[];
  };
  
  // Objetivos profesionales
  careerGoals: {
    industry: string;
    position: string;
    timeline: string;
    workType: 'full_time' | 'part_time' | 'freelance' | 'entrepreneur';
  };
}
```

### **7. 🎯 OBJETIVOS DE MIGRACIÓN**
```typescript
interface MigrationGoals {
  // Timeline y visa
  timeline: {
    preferred: 'immediate' | '6_months' | '1_year' | '2_years' | 'flexible';
    deadline: string; // fecha específica si aplica
    urgency: 'high' | 'medium' | 'low';
  };
  
  // Tipo de visa
  visaType: {
    preferred: string;
    eligible: string[];
    current: string;
    previous: string[];
  };
  
  // Intenciones
  intentions: {
    work: boolean;
    study: boolean;
    permanent: boolean;
    citizenship: boolean;
    family: boolean;
  };
  
  // Factores de decisión
  decisionFactors: {
    career: number; // 1-10
    family: number;
    lifestyle: number;
    education: number;
    culture: number;
  };
}
```

---

## 🏠 **DATOS PARA RESIDENTES**

### **8. 📍 SITUACIÓN ACTUAL**
```typescript
interface CurrentSituation {
  // Estado migratorio
  visaStatus: {
    type: string;
    expiration: string;
    renewal: boolean;
    restrictions: string[];
  };
  
  // Situación laboral
  workStatus: {
    employed: boolean;
    company: string;
    position: string;
    contract: 'permanent' | 'temporary' | 'freelance';
    salary: number;
  };
  
  // Ubicación actual
  currentLocation: {
    prefecture: string;
    city: string;
    neighborhood: string;
    duration: number; // meses
  };
  
  // Experiencia en Japón
  japanExperience: {
    duration: number; // años
    previousLocations: string[];
    languageLevel: string;
    culturalIntegration: 'low' | 'medium' | 'high';
  };
}
```

### **9. 🏡 NECESIDADES DE VIVIENDA**
```typescript
interface HousingNeeds {
  // Duración y tipo
  duration: 'short' | 'medium' | 'long'; // <1 año, 1-3 años, 3+ años
  type: 'apartment' | 'house' | 'shared' | 'temporary';
  
  // Presupuesto
  budget: {
    min: number;
    max: number;
    currency: string;
    includes: string[]; // ['rent', 'utilities', 'furniture', 'deposit']
  };
  
  // Ubicación preferida
  location: {
    prefectures: string[];
    cities: string[];
    neighborhoods: string[];
    proximity: {
      work: number; // km máximo
      school: number;
      transport: number;
    };
  };
  
  // Amenidades requeridas
  amenities: {
    essential: string[]; // ['parking', 'elevator', 'balcony']
    preferred: string[];
    nice_to_have: string[];
  };
}
```

---

## 🧠 **DATOS PSICOLÓGICOS Y CULTURALES**

### **10. 🌸 AFINIDAD CULTURAL**
```typescript
interface CulturalAffinity {
  // Conocimiento de Japón
  japanKnowledge: {
    culture: 'none' | 'basic' | 'intermediate' | 'advanced';
    history: 'none' | 'basic' | 'intermediate' | 'advanced';
    language: LanguageSkills;
    traditions: string[];
  };
  
  // Valores personales
  values: {
    harmony: number; // 1-10
    respect: number;
    discipline: number;
    innovation: number;
    tradition: number;
    community: number;
  };
  
  // Estilo de vida
  lifestyle: {
    workLifeBalance: 'work_focused' | 'balanced' | 'life_focused';
    socialStyle: 'introverted' | 'extroverted' | 'ambivert';
    adaptability: 'low' | 'medium' | 'high';
    patience: 'low' | 'medium' | 'high';
  };
  
  // Intereses culturales
  interests: {
    arts: string[];
    sports: string[];
    food: string[];
    entertainment: string[];
    nature: string[];
  };
}
```

### **11. 🎯 MOTIVACIÓN Y EXPECTATIVAS**
```typescript
interface MotivationExpectations {
  // Motivaciones principales
  motivations: {
    career: number; // 1-10
    family: number;
    lifestyle: number;
    culture: number;
    education: number;
    adventure: number;
    financial: number;
  };
  
  // Expectativas
  expectations: {
    realistic: boolean;
    timeline: string;
    challenges: string[];
    benefits: string[];
    concerns: string[];
  };
  
  // Factores de éxito
  successFactors: {
    language: number;
    network: number;
    skills: number;
    adaptability: number;
    support: number;
  };
}
```

---

## 📊 **DATOS PARA ANÁLISIS INTELIGENTE**

### **12. 🔍 COMPORTAMIENTO Y PREFERENCIAS**
```typescript
interface BehaviorPreferences {
  // Comportamiento en la plataforma
  platformBehavior: {
    pagesVisited: string[];
    timeSpent: { [key: string]: number };
    searchTerms: string[];
    interactions: string[];
    formsCompleted: string[];
  };
  
  // Preferencias de comunicación
  communication: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'as_needed';
    method: 'email' | 'phone' | 'chat' | 'video' | 'mixed';
    language: string;
    timezone: string;
  };
  
  // Preferencias de contenido
  contentPreferences: {
    detailLevel: 'basic' | 'detailed' | 'comprehensive';
    visualStyle: 'minimal' | 'detailed' | 'interactive';
    informationType: 'text' | 'visual' | 'interactive' | 'mixed';
  };
}
```

---

## 🧮 **CÁLCULOS INTELIGENTES**

### **13. 📈 ÍNDICES CALCULADOS**
```typescript
interface CalculatedIndices {
  // IVI - Índice de Viabilidad de Inversión
  IVI: {
    score: number; // 0-100
    factors: {
      budget: number;
      experience: number;
      risk: number;
      timeline: number;
      market: number;
    };
    recommendation: 'excellent' | 'good' | 'moderate' | 'risky';
  };
  
  // IVM - Índice de Viabilidad de Migración
  IVM: {
    score: number; // 0-100
    factors: {
      visa: number;
      skills: number;
      language: number;
      family: number;
      timeline: number;
    };
    recommendation: 'excellent' | 'good' | 'moderate' | 'challenging';
  };
  
  // ISE - Índice de Satisfacción Esperada
  ISE: {
    score: number; // 0-100
    factors: {
      cultural: number;
      lifestyle: number;
      career: number;
      family: number;
      community: number;
    };
    recommendation: 'excellent' | 'good' | 'moderate' | 'risky';
  };
}
```

### **14. 🎯 PROBABILIDADES Y RECOMENDACIONES**
```typescript
interface ProbabilitiesRecommendations {
  // Probabilidades de éxito
  successProbability: {
    overall: number; // 0-100%
    timeline: { [key: string]: number };
    factors: { [key: string]: number };
  };
  
  // Recomendaciones personalizadas
  recommendations: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
    risks: string[];
    opportunities: string[];
  };
  
  // Plan de acción
  actionPlan: {
    phase1: string[]; // 0-3 meses
    phase2: string[]; // 3-6 meses
    phase3: string[]; // 6-12 meses
    milestones: { [key: string]: string };
  };
}
```

---

## 🚀 **IMPLEMENTACIÓN DEL ONBOARDING**

### **15. 📝 FLUJO DE ONBOARDING INTELIGENTE**

#### **FASE 1: DETECCIÓN DE INTENCIÓN (2-3 preguntas)**
1. **¿Cuál es tu objetivo principal?**
   - Invertir en propiedades japonesas
   - Migrar a Japón con mi familia
   - Vivir temporalmente en Japón
   - Explorar opciones

2. **¿Cuál es tu timeline?**
   - Inmediato (0-3 meses)
   - Corto plazo (3-6 meses)
   - Mediano plazo (6-12 meses)
   - Largo plazo (1+ años)

3. **¿Cuál es tu situación actual?**
   - Tengo experiencia previa
   - Soy principiante
   - Necesito orientación completa

#### **FASE 2: DATOS ESPECÍFICOS POR INTENCIÓN**

**Para INVERSORES:**
- Presupuesto de inversión
- Experiencia financiera
- Objetivos de ROI
- Preferencias de propiedad
- Tolerancia al riesgo

**Para MIGRANTES:**
- Situación familiar
- Situación profesional
- Objetivos de visa
- Necesidades específicas
- Timeline de migración

**Para RESIDENTES:**
- Situación actual en Japón
- Necesidades de vivienda
- Preferencias de ubicación
- Presupuesto
- Duración esperada

#### **FASE 3: ANÁLISIS CULTURAL Y PERSONAL**
- Conocimiento de Japón
- Valores personales
- Estilo de vida
- Motivaciones
- Expectativas

#### **FASE 4: GENERACIÓN DE PERFIL INTELIGENTE**
- Cálculo de índices (IVI, IVM, ISE)
- Probabilidades de éxito
- Recomendaciones personalizadas
- Plan de acción específico

---

## 🎯 **RESULTADO FINAL**

Con estos datos, el sistema puede generar:

1. **📊 Análisis completo** de viabilidad
2. **🎯 Recomendaciones personalizadas** específicas
3. **📈 Probabilidades de éxito** calculadas
4. **🗺️ Plan de acción** detallado
5. **⚡ Experiencia personalizada** en toda la plataforma

**¡El onboarding se convierte en un sistema de inteligencia artificial que realmente entiende y ayuda a cada usuario!** 🚀

