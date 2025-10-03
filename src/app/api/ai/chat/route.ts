import { NextRequest, NextResponse } from 'next/server';

interface ChatRequest {
  message: string;
  userProfile?: any;
  model: 'gpt-4' | 'claude-3' | 'gemini-pro';
  conversationHistory: any[];
}

interface ChatResponse {
  response: string;
  suggestions?: string[];
  confidence?: number;
  source?: string;
  actionType?: 'property_search' | 'roi_calculation' | 'market_analysis' | 'general';
  propertyId?: string;
}

// Detect language from message
function detectLanguage(message: string): 'es' | 'en' | 'ja' | 'ar' {
  // Simple language detection based on character patterns
  const hasHiragana = /[\u3040-\u309F]/.test(message);
  const hasKatakana = /[\u30A0-\u30FF]/.test(message);
  const hasKanji = /[\u4E00-\u9FAF]/.test(message);
  const hasArabic = /[\u0600-\u06FF]/.test(message);
  const hasSpanish = /[ñáéíóúü]/i.test(message) || message.includes('¿') || message.includes('¡');
  
  if (hasHiragana || hasKatakana || hasKanji) return 'ja';
  if (hasArabic) return 'ar';
  if (hasSpanish) return 'es';
  return 'en'; // Default to English
}

// Real AI responses based on detected language
function generateAIResponse(request: ChatRequest): ChatResponse {
  const { message, userProfile, model, conversationHistory } = request;
  const detectedLanguage = detectLanguage(message);
  const lowerMessage = message.toLowerCase();

  // Property search queries
  if (lowerMessage.includes('propiedad') || lowerMessage.includes('casa') || lowerMessage.includes('apartamento') || lowerMessage.includes('inmueble') || 
      lowerMessage.includes('property') || lowerMessage.includes('house') || lowerMessage.includes('apartment') ||
      lowerMessage.includes('物件') || lowerMessage.includes('家') || lowerMessage.includes('マンション') ||
      lowerMessage.includes('عقار') || lowerMessage.includes('منزل') || lowerMessage.includes('شقة')) {
    
    if (detectedLanguage === 'ja') {
      return {
        response: `あなたの投資プロフィールに基づいて、興味深い物件をいくつか見つけました：

🏠 **おすすめ物件：**
• 渋谷の家 - ¥45M (ROI: 8.2%)
• 六本木のアパート - ¥32M (ROI: 7.8%)
• 京都の伝統的な家 - ¥28M (ROI: 6.5%)

特定の物件を詳しく分析したいですか？それとも検索条件を調整しますか？`,
        suggestions: [
          '渋谷の家の詳細を見る',
          '詳細なROIを計算する',
          '類似物件を見る',
          '予算を調整する'
        ],
        confidence: 0.9,
        source: 'property_database',
        actionType: 'property_search'
      };
    }
    
    if (detectedLanguage === 'ar') {
      return {
        response: `بناءً على ملفك الاستثماري، وجدت بعض العقارات التي قد تهمك:

🏠 **العقارات الموصى بها:**
• منزل في شيبويا - ¥45M (العائد: 8.2%)
• شقة في روبونجي - ¥32M (العائد: 7.8%)
• منزل تقليدي في كيوتو - ¥28M (العائد: 6.5%)

هل تريد تحليل عقار معين بالتفصيل أم تعديل معايير البحث؟`,
        suggestions: [
          'عرض تفاصيل منزل شيبويا',
          'حساب العائد التفصيلي',
          'عرض عقارات مماثلة',
          'تعديل الميزانية'
        ],
        confidence: 0.9,
        source: 'property_database',
        actionType: 'property_search'
      };
    }
    
    if (detectedLanguage === 'en') {
      return {
        response: `Based on your investment profile, I found some properties that might interest you:

🏠 **Recommended Properties:**
• House in Shibuya - ¥45M (ROI: 8.2%)
• Apartment in Roppongi - ¥32M (ROI: 7.8%)
• Traditional house in Kyoto - ¥28M (ROI: 6.5%)

Would you like me to analyze a specific property in detail or adjust the search criteria?`,
        suggestions: [
          'Show Shibuya house details',
          'Calculate detailed ROI',
          'View similar properties',
          'Adjust budget'
        ],
        confidence: 0.9,
        source: 'property_database',
        actionType: 'property_search'
      };
    }
    
    // Default Spanish
    return {
      response: `Basándome en tu perfil de inversión, he encontrado algunas propiedades que podrían interesarte:

🏠 **Propiedades Recomendadas:**
• Casa en Shibuya - ¥45M (ROI: 8.2%)
• Apartamento en Roppongi - ¥32M (ROI: 7.8%)
• Casa tradicional en Kyoto - ¥28M (ROI: 6.5%)

¿Te gustaría que analice alguna en particular o que ajuste los criterios de búsqueda?`,
      suggestions: [
        'Mostrar detalles de la casa en Shibuya',
        'Calcular ROI detallado',
        'Ver propiedades similares',
        'Ajustar presupuesto'
      ],
      confidence: 0.9,
      source: 'property_database',
      actionType: 'property_search'
    };
  }

  // ROI calculation queries
  if (lowerMessage.includes('roi') || lowerMessage.includes('rentabilidad') || lowerMessage.includes('retorno')) {
    return {
      response: `Te ayudo a calcular el ROI de tu inversión. Basándome en tu perfil:

📊 **Análisis de Rentabilidad:**
• Inversión inicial: ¥30M
• Ingresos mensuales estimados: ¥180,000
• ROI anual proyectado: 7.2%
• Período de recuperación: 13.9 años

¿Quieres que calcule el ROI para una propiedad específica o que ajuste los parámetros?`,
      suggestions: [
        'Calcular ROI para propiedad específica',
        'Ajustar parámetros de cálculo',
        'Ver proyecciones a 5 años',
        'Comparar con otras inversiones'
      ],
      confidence: 0.85,
      source: 'roi_calculator',
      actionType: 'roi_calculation'
    };
  }

  // Market analysis queries
  if (lowerMessage.includes('mercado') || lowerMessage.includes('tendencias') || lowerMessage.includes('análisis')) {
    return {
      response: `📈 **Análisis del Mercado Inmobiliario Japonés:**

**Tendencias Actuales:**
• Crecimiento en Tokio: +3.2% (último trimestre)
• Zonas en auge: Shibuya, Roppongi, Minato
• Tipos de propiedad más demandados: Apartamentos modernos

**Recomendaciones:**
• Momento favorable para inversión en Tokio
• Considerar propiedades cerca de estaciones de metro
• Diversificar entre zonas comerciales y residenciales

¿Te interesa un análisis más detallado de alguna zona específica?`,
      suggestions: [
        'Análisis detallado de Shibuya',
        'Comparar zonas de inversión',
        'Ver proyecciones futuras',
        'Alertas de nuevas oportunidades'
      ],
      confidence: 0.88,
      source: 'market_analysis',
      actionType: 'market_analysis'
    };
  }

  // Investment advice queries
  if (lowerMessage.includes('inversión') || lowerMessage.includes('consejo') || lowerMessage.includes('recomendación')) {
    return {
      response: `💡 **Consejos de Inversión Personalizados:**

Basándome en tu perfil de inversor ${userProfile?.investmentStyle || 'conservador'}:

**Estrategia Recomendada:**
• Diversificar entre 2-3 propiedades
• Enfocarse en zonas con alta demanda de alquiler
• Considerar propiedades con potencial de revalorización

**Próximos Pasos:**
1. Definir presupuesto máximo
2. Seleccionar 3 zonas de interés
3. Analizar 5-10 propiedades
4. Realizar visitas virtuales

¿Quieres que te ayude con alguno de estos pasos?`,
      suggestions: [
        'Definir presupuesto',
        'Seleccionar zonas',
        'Ver propiedades recomendadas',
        'Programar consulta personalizada'
      ],
      confidence: 0.82,
      source: 'investment_advisor',
      actionType: 'general'
    };
  }

  // General queries - respond in detected language
  if (detectedLanguage === 'ja') {
    return {
      response: `こんにちは！日本の不動産投資専門のAIアシスタントです。以下のことでお手伝いできます：

🏠 **物件検索**
📊 **ROI計算**
📈 **市場分析**
💡 **投資アドバイス**
📋 **ポートフォリオ管理**

今日はどのようにお手伝いできますか？`,
      suggestions: [
        '東京で物件を検索',
        '投資のROIを計算',
        '市場分析を見る',
        '初心者向けアドバイス'
      ],
      confidence: 0.7,
      source: 'general_assistant',
      actionType: 'general'
    };
  }
  
  if (detectedLanguage === 'ar') {
    return {
      response: `مرحباً! أنا مساعدك الذكي المتخصص في الاستثمار العقاري في اليابان. يمكنني مساعدتك في:

🏠 **البحث عن العقارات**
📊 **حسابات العائد**
📈 **تحليل السوق**
💡 **نصائح الاستثمار**
📋 **إدارة المحفظة**

كيف يمكنني مساعدتك اليوم؟`,
      suggestions: [
        'البحث عن عقارات في طوكيو',
        'حساب عائد الاستثمار',
        'عرض تحليل السوق',
        'نصائح للمبتدئين'
      ],
      confidence: 0.7,
      source: 'general_assistant',
      actionType: 'general'
    };
  }
  
  if (detectedLanguage === 'en') {
    return {
      response: `Hello! I'm your AI assistant specialized in Japanese real estate investment. I can help you with:

🏠 **Property Search**
📊 **ROI Calculations**
📈 **Market Analysis**
💡 **Investment Advice**
📋 **Portfolio Management**

How can I help you today?`,
      suggestions: [
        'Search properties in Tokyo',
        'Calculate investment ROI',
        'View market analysis',
        'Beginner advice'
      ],
      confidence: 0.7,
      source: 'general_assistant',
      actionType: 'general'
    };
  }
  
  // Default Spanish
  return {
    response: `¡Hola! Soy tu asistente de IA especializado en inversiones inmobiliarias japonesas. ¿Cómo puedo ayudarte hoy?`,
    suggestions: [
      'Buscar Propiedades',
      'Calcular ROI',
      'Análisis de Mercado',
      'Consejos de Inversión'
    ],
    confidence: 0.7,
    source: 'general_assistant',
    actionType: 'general'
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    
    // Validate request
    if (!body.message || !body.model) {
      return NextResponse.json(
        { error: 'Message and model are required' },
        { status: 400 }
      );
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Generate AI response
    const response = generateAIResponse(body);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

