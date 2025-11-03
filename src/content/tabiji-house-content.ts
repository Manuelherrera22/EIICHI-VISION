/**
 * CONTENIDO PARA TABIJI HOUSE PLATFORM
 * 
 * Este archivo contiene todo el contenido generado para la plataforma Tabiji House:
 * - Propiedades fraccionadas con descripciones detalladas
 * - Contenido de marketing
 * - FAQs y contenido educativo
 * - Descripciones de servicios
 */

import { FractionalProperty } from '@/types/fractional';

// ============================================
// PROPIEDADES FRACCIONADAS - DESCRIPCIONES DETALLADAS
// ============================================

export const fractionalPropertiesContent: Omit<FractionalProperty, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'Villa Tradicional del Calígrafo',
    description: `Una excepcional villa tradicional japonesa ubicada en el corazón de Kusatsu, Gunma. Esta propiedad única combina la elegancia arquitectónica japonesa clásica con comodidades modernas. Construida en 1985, la casa ha sido cuidadosamente preservada manteniendo sus características originales como vigas de madera expuestas, tatami auténtico y un jardín zen privado.

La propiedad está estratégicamente ubicada a solo 5 minutos a pie de los famosos onsen de Kusatsu, uno de los tres mejores onsen de Japón. El área ofrece una combinación perfecta de cultura tradicional, naturaleza pristina y potencial de inversión en turismo.

**Características destacadas:**
- Arquitectura tradicional japonesa auténtica
- Jardín zen privado con estanque koi
- Proximidad a onsen de clase mundial
- Potencial de alquiler turístico premium (Minpaku)
- Estructura legal SPV para protección de inversores

**Oportunidad de inversión:**
Esta propiedad está estructurada para inversión fraccionada, permitiendo a múltiples inversionistas participar en la propiedad mientras se mantiene la estructura legal necesaria para cumplir con las regulaciones japonesas. El ROI estimado del 12.5% se basa en el potencial de alquiler turístico y la apreciación del valor en una región en crecimiento.`,
    location: 'Kusatsu, Gunma',
    prefecture: 'Gunma',
    totalValue: 12850000,
    totalShares: 20,
    pricePerShare: 642500,
    availableShares: 15,
    soldShares: 5,
    images: [
      '/images/properties/caligrafo-exterior.jpg',
      '/images/properties/caligrafo-interior.jpg',
      '/images/properties/caligrafo-garden.jpg',
      '/images/properties/caligrafo-onsen.jpg'
    ],
    features: [
      'Onsen cercano (5 min caminando)',
      'Arquitectura tradicional japonesa',
      'Jardín zen privado',
      'Tatami auténtico',
      'Vigas de madera expuestas',
      'Potencial Minpaku',
      'Estación de esquí cercana'
    ],
    renovationStatus: 'original',
    estimatedROI: 12.5,
    monthlyRentalIncome: 120000,
    propertyType: 'akiya',
    yearBuilt: 1985,
    landSize: 200,
    buildingSize: 85,
    status: 'funding',
    fundingGoal: 12850000,
    currentFunding: 3212500,
    fundingProgress: 25,
    expectedCompletionDate: '2025-06-15',
    legalStructure: 'spv',
    minimumInvestment: 642500,
    maximumInvestment: 2570000,
    fees: {
      managementFee: 1.5,
      performanceFee: 10,
      exitFee: 2
    },
    documents: {
      prospectus: '/documents/caligrafo-prospectus.pdf',
      legalAgreement: '/documents/caligrafo-agreement.pdf',
      financialProjections: '/documents/caligrafo-projections.pdf'
    }
  },
  {
    name: 'Residencia del Artesano con Vista al Monte',
    description: `Una hermosa residencia tradicional renovada que ofrece vistas panorámicas al Monte Kusatsu-Shirane. Esta propiedad de 2LDK combina el encanto rústico de la arquitectura japonesa tradicional con renovaciones modernas que respetan el carácter original del edificio.

Ubicada en una zona tranquila pero accesible, la propiedad está perfectamente posicionada para aprovechar el crecimiento del turismo en la región de Gunma. La proximidad a estaciones de esquí, rutas de senderismo y onsen locales la convierte en una inversión ideal para alquiler turístico.

**Características destacadas:**
- Vistas panorámicas al Monte Kusatsu-Shirane
- Arquitectura renovada manteniendo estilo tradicional
- 2LDK (2 habitaciones, sala-comedor-cocina)
- Proximidad a estaciones de esquí
- Potencial de alquiler todo el año

**Oportunidad de inversión:**
Con un ROI estimado del 11.2%, esta propiedad ofrece un equilibrio excelente entre inversión inicial y retorno potencial. La estructura fraccionada permite participar con una inversión mínima de ¥850,000, haciendo esta oportunidad accesible para inversores de diversos niveles.`,
    location: 'Tsumagoi, Gunma',
    prefecture: 'Gunma',
    totalValue: 15000000,
    totalShares: 15,
    pricePerShare: 1000000,
    availableShares: 10,
    soldShares: 5,
    images: [
      '/images/properties/artesano-exterior.jpg',
      '/images/properties/artesano-vista.jpg',
      '/images/properties/artesano-interior.jpg'
    ],
    features: [
      'Vista al Monte Kusatsu-Shirane',
      'Arquitectura renovada',
      '2LDK',
      'Estación de esquí cercana',
      'Rutas de senderismo',
      'Onsen local',
      'Renovación premium 2024'
    ],
    renovationStatus: 'renovated',
    estimatedROI: 11.2,
    monthlyRentalIncome: 140000,
    propertyType: 'traditional',
    yearBuilt: 1978,
    landSize: 250,
    buildingSize: 95,
    status: 'funding',
    fundingGoal: 15000000,
    currentFunding: 5000000,
    fundingProgress: 33,
    expectedCompletionDate: '2025-07-30',
    legalStructure: 'spv',
    minimumInvestment: 1000000,
    maximumInvestment: 4500000,
    fees: {
      managementFee: 1.5,
      performanceFee: 10,
      exitFee: 2
    },
    documents: {
      prospectus: '/documents/artesano-prospectus.pdf',
      legalAgreement: '/documents/artesano-agreement.pdf',
      financialProjections: '/documents/artesano-projections.pdf'
    }
  },
  {
    name: 'Casa Moderna con Jardín de Cerezos',
    description: `Una propiedad contemporánea que combina diseño moderno con elementos tradicionales japoneses. La casa cuenta con un hermoso jardín de cerezos que florece espectacularmente cada primavera, creando una experiencia visual única para residentes y huéspedes.

Construida en 1992, esta propiedad ha sido completamente renovada en 2024 con estándares de lujo, incluyendo sistemas de eficiencia energética, calefacción por suelo radiante y acabados premium. El diseño abierto y luminoso maximiza las vistas al jardín y las montañas circundantes.

**Características destacadas:**
- Jardín de cerezos (sakura) de 150m²
- Diseño moderno con elementos tradicionales
- Renovación de lujo 2024
- Eficiencia energética avanzada
- Calefacción por suelo radiante
- Proximidad a transporte público

**Oportunidad de inversión:**
Con un ROI estimado del 10.8%, esta propiedad atrae tanto a inversores como a residentes que buscan una experiencia japonesa auténtica. La ubicación estratégica y las renovaciones premium aseguran una alta demanda para alquiler turístico y residencial.`,
    location: 'Kusatsu, Gunma',
    prefecture: 'Gunma',
    totalValue: 18000000,
    totalShares: 18,
    pricePerShare: 1000000,
    availableShares: 12,
    soldShares: 6,
    images: [
      '/images/properties/cerezos-jardin.jpg',
      '/images/properties/cerezos-exterior.jpg',
      '/images/properties/cerezos-interior.jpg',
      '/images/properties/cerezos-floracion.jpg'
    ],
    features: [
      'Jardín de cerezos (sakura)',
      'Renovación de lujo 2024',
      'Diseño moderno-tradicional',
      'Eficiencia energética',
      'Calefacción por suelo radiante',
      'Proximidad a transporte',
      '3LDK'
    ],
    renovationStatus: 'luxury',
    estimatedROI: 10.8,
    monthlyRentalIncome: 162000,
    propertyType: 'modern',
    yearBuilt: 1992,
    landSize: 300,
    buildingSize: 120,
    status: 'funding',
    fundingGoal: 18000000,
    currentFunding: 6000000,
    fundingProgress: 33,
    expectedCompletionDate: '2025-08-15',
    legalStructure: 'spv',
    minimumInvestment: 1000000,
    maximumInvestment: 5400000,
    fees: {
      managementFee: 1.5,
      performanceFee: 10,
      exitFee: 2
    },
    documents: {
      prospectus: '/documents/cerezos-prospectus.pdf',
      legalAgreement: '/documents/cerezos-agreement.pdf',
      financialProjections: '/documents/cerezos-projections.pdf'
    }
  },
  {
    name: 'Retiro Tradicional en el Bosque',
    description: `Una casa tradicional japonesa completamente restaurada, ubicada en un entorno boscoso tranquilo. Esta propiedad ofrece una experiencia auténtica de vida japonesa rural, perfecta para aquellos que buscan escapar del ritmo acelerado de la vida urbana.

La casa ha sido meticulosamente restaurada manteniendo todos sus elementos originales: vigas de ciprés japonés, tatami artesanal, y un irori (hogar tradicional) funcional. El entorno natural circundante ofrece privacidad total mientras se mantiene accesible a las amenidades de Kusatsu.

**Características destacadas:**
- Ubicación en bosque privado
- Restauración completa manteniendo originales
- Irori (hogar tradicional) funcional
- Vigas de ciprés japonés auténtico
- Tatami artesanal
- Privacidad total
- Conexión con naturaleza

**Oportunidad de inversión:**
Esta propiedad única atrae a un nicho específico de viajeros que buscan autenticidad y tranquilidad. Con un ROI estimado del 9.5%, ofrece retornos sólidos mientras preserva el patrimonio cultural japonés. Ideal para inversores que valoran tanto el retorno financiero como el impacto cultural positivo.`,
    location: 'Agatsuma, Gunma',
    prefecture: 'Gunma',
    totalValue: 9500000,
    totalShares: 12,
    pricePerShare: 791667,
    availableShares: 8,
    soldShares: 4,
    images: [
      '/images/properties/bosque-exterior.jpg',
      '/images/properties/bosque-interior.jpg',
      '/images/properties/bosque-irori.jpg',
      '/images/properties/bosque-naturaleza.jpg'
    ],
    features: [
      'Ubicación en bosque',
      'Restauración completa',
      'Irori funcional',
      'Vigas de ciprés japonés',
      'Tatami artesanal',
      'Privacidad total',
      'Conexión con naturaleza'
    ],
    renovationStatus: 'renovated',
    estimatedROI: 9.5,
    monthlyRentalIncome: 75158,
    propertyType: 'traditional',
    yearBuilt: 1965,
    landSize: 400,
    buildingSize: 75,
    status: 'funding',
    fundingGoal: 9500000,
    currentFunding: 3166668,
    fundingProgress: 33,
    expectedCompletionDate: '2025-09-30',
    legalStructure: 'spv',
    minimumInvestment: 791667,
    maximumInvestment: 2375000,
    fees: {
      managementFee: 1.5,
      performanceFee: 10,
      exitFee: 2
    },
    documents: {
      prospectus: '/documents/bosque-prospectus.pdf',
      legalAgreement: '/documents/bosque-agreement.pdf',
      financialProjections: '/documents/bosque-projections.pdf'
    }
  }
];

// ============================================
// CONTENIDO DE MARKETING
// ============================================

export const marketingContent = {
  hero: {
    title: 'Invierte en Propiedades Tradicionales Japonesas',
    subtitle: 'Accede al mercado inmobiliario japonés con inversión fraccionada. Desde $6,000 USD puedes ser parte de propiedades únicas con ROI estimado del 10-12.5%.',
    cta: 'Explorar Propiedades',
    ctaSecondary: 'Calcular ROI'
  },
  valueProposition: {
    title: '¿Por qué elegir inversión fraccionada en Japón?',
    points: [
      {
        icon: '💰',
        title: 'Inversión Accesible',
        description: 'Participa en propiedades premium desde $6,000 USD. No necesitas millones para invertir en bienes raíces japoneses.'
      },
      {
        icon: '📈',
        title: 'ROI Comprobado',
        description: 'ROI estimado del 10-12.5% anual basado en alquiler turístico y apreciación del valor. Transparencia total en proyecciones.'
      },
      {
        icon: '🏛️',
        title: 'Estructura Legal Sólida',
        description: 'Cada propiedad está estructurada como SPV (Special Purpose Vehicle) cumpliendo todas las regulaciones japonesas e internacionales.'
      },
      {
        icon: '🛡️',
        title: 'Protección del Inversor',
        description: 'Documentación legal completa, certificados de participación, y gestión profesional de cada inversión.'
      },
      {
        icon: '🗾',
        title: 'Acceso a Mercado Exclusivo',
        description: 'Propiedades tradicionales japonesas en regiones de alto crecimiento turístico, normalmente inaccesibles para inversores individuales.'
      },
      {
        icon: '🌱',
        title: 'Impacto Cultural Positivo',
        description: 'Tu inversión ayuda a preservar el patrimonio arquitectónico japonés mientras generas retornos.'
      }
    ]
  },
  howItWorks: {
    title: 'Cómo Funciona la Inversión Fraccionada',
    steps: [
      {
        number: 1,
        title: 'Explora Propiedades',
        description: 'Navega por nuestro catálogo de propiedades tradicionales japonesas disponibles para inversión fraccionada. Cada propiedad incluye análisis detallado, ROI estimado y documentación completa.'
      },
      {
        number: 2,
        title: 'Calcula Tu Inversión',
        description: 'Usa nuestra calculadora interactiva para determinar cuántas fracciones quieres comprar, el costo total, y tus ingresos mensuales estimados.'
      },
      {
        number: 3,
        title: 'Revisa Documentación',
        description: 'Accede a prospecto legal, proyecciones financieras, y acuerdo de inversión. Todo está disponible antes de comprometerte.'
      },
      {
        number: 4,
        title: 'Invierte de Forma Segura',
        description: 'Realiza tu inversión mediante nuestro sistema de pago seguro. Recibirás certificados de participación y acceso a tu dashboard personalizado.'
      },
      {
        number: 5,
        title: 'Gestiona Tu Inversión',
        description: 'Monitorea el rendimiento de tu inversión, recibe pagos de dividendos, y accede a reportes trimestrales desde tu dashboard.'
      }
    ]
  },
  benefits: {
    title: 'Beneficios de Invertir con Tabiji House',
    list: [
      'Diversificación geográfica: Acceso al mercado inmobiliario japonés sin necesidad de residir en Japón',
      'Inversión mínima baja: Desde $6,000 USD vs. $200,000+ para propiedad completa',
      'Liquidez potencial: Estructura que permite venta de fracciones en el mercado secundario (próximamente)',
      'Gestión profesional: Equipo local experto maneja todo, desde mantenimiento hasta relaciones con inquilinos',
      'Transparencia total: Dashboard en tiempo real con métricas de rendimiento y reportes financieros',
      'Impacto cultural: Contribuyes a preservar arquitectura tradicional japonesa',
      'Potencial de apreciación: Regiones en crecimiento turístico con infraestructura mejorada',
      'Protección legal: Estructura SPV con cumplimiento total de regulaciones'
    ]
  }
};

// ============================================
// FAQs - PREGUNTAS FRECUENTES
// ============================================

export const faqContent = {
  general: [
    {
      question: '¿Qué es la inversión fraccionada en bienes raíces?',
      answer: `La inversión fraccionada permite que múltiples inversores posean una fracción de una propiedad inmobiliaria. Cada inversor recibe certificados de participación proporcionales a su inversión, y comparte los beneficios (ingresos por alquiler, apreciación del valor) según su porcentaje de propiedad.

En Tabiji House, dividimos propiedades tradicionales japonesas en fracciones (shares), permitiendo inversiones desde $6,000 USD. Cada propiedad está estructurada como un SPV (Special Purpose Vehicle) que cumple con todas las regulaciones japonesas e internacionales.`
    },
    {
      question: '¿Es legal para extranjeros invertir en propiedades japonesas?',
      answer: `Sí, es completamente legal. Japón no tiene restricciones para que extranjeros compren propiedades inmobiliarias. Sin embargo, el proceso puede ser complejo debido a regulaciones, documentación y barreras del idioma.

Tabiji House simplifica este proceso mediante la estructura SPV, manejando toda la documentación legal y cumplimiento regulatorio. Como inversor fraccionado, no necesitas preocuparte por estos detalles técnicos.`
    },
    {
      question: '¿Cuál es el ROI esperado de estas inversiones?',
      answer: `Nuestras propiedades tienen ROI estimado entre 9.5% y 12.5% anual. Este retorno proviene de dos fuentes principales:

1. **Ingresos por alquiler**: Alquiler turístico (Minpaku) y residencial, distribuidos mensualmente entre los inversores según su participación.

2. **Apreciación del valor**: Las propiedades en regiones turísticas de crecimiento como Gunma tienden a apreciarse con el tiempo, especialmente con mejoras en infraestructura y aumento del turismo.

Importante: Estas son estimaciones basadas en proyecciones financieras detalladas. El rendimiento real puede variar. Todas las proyecciones están disponibles en el prospecto de cada propiedad.`
    },
    {
      question: '¿Cuánto tiempo debo mantener mi inversión?',
      answer: `Nuestras inversiones están diseñadas como inversiones a medio-largo plazo (3-7 años) para maximizar el retorno. Sin embargo, entendemos que las circunstancias cambian.

Actualmente estamos desarrollando un mercado secundario donde podrás vender tus fracciones a otros inversores. Esto estará disponible a partir del Q2 2025. Hasta entonces, las inversiones son relativamente ilíquidas, por lo que recomendamos solo invertir capital que no necesites en el corto plazo.`
    }
  ],
  financial: [
    {
      question: '¿Qué comisiones y tarifas se cobran?',
      answer: `Nuestras tarifas son transparentes y se detallan en cada prospecto de propiedad:

- **Tarifa de gestión**: 1.5% anual del valor de la inversión (cubre mantenimiento, gestión de alquiler, administración)
- **Tarifa de rendimiento**: 10% de los ingresos por alquiler (solo se cobra si hay ingresos positivos)
- **Tarifa de salida**: 2% del valor de venta si decides vender tus fracciones (solo aplica en mercado secundario)

Todas las tarifas se deducen automáticamente antes de distribuir dividendos a los inversores. No hay tarifas ocultas.`
    },
    {
      question: '¿Cómo recibo mis pagos de dividendos?',
      answer: `Los ingresos por alquiler se distribuyen mensualmente entre todos los inversores proporcionalmente a su participación. Por ejemplo, si posees 2 de 20 fracciones (10%), recibirás el 10% de los ingresos mensuales.

Los pagos se realizan mediante transferencia bancaria internacional o a través de Stripe, según tu preferencia. Puedes configurar tu método de pago preferido en tu dashboard.

Los pagos se procesan el día 15 de cada mes para los ingresos del mes anterior.`
    },
    {
      question: '¿Qué pasa si la propiedad no se alquila?',
      answer: `Si una propiedad no tiene inquilinos, no hay ingresos por alquiler para distribuir. Sin embargo, esto no afecta tu participación en la propiedad ni tu derecho a las ganancias futuras.

Nuestro equipo de gestión activa trabaja para maximizar la ocupación mediante:
- Estrategias de marketing y listado en plataformas turísticas
- Gestión de reservas y relaciones con huéspedes
- Mantenimiento proactivo para mantener alta calificación
- Optimización de precios según demanda estacional

La mayoría de nuestras propiedades tienen ocupación estimada del 60-75% anual, lo que genera ingresos consistentes.`
    }
  ],
  legal: [
    {
      question: '¿Cómo está protegida mi inversión legalmente?',
      answer: `Cada propiedad está estructurada como un SPV (Special Purpose Vehicle) separado, lo que significa:

1. **Separación de activos**: Si una propiedad tiene problemas legales o financieros, no afecta a otras propiedades ni a Tabiji House.

2. **Documentación completa**: Cada inversor recibe:
   - Certificado de participación legalmente vinculante
   - Acuerdo de inversión detallado
   - Prospecto con toda la información financiera y legal

3. **Cumplimiento regulatorio**: Cumplimos con todas las regulaciones japonesas de bienes raíces y estructuras de inversión.

4. **Transparencia**: Acceso completo a reportes financieros trimestrales y auditorías anuales.`
    },
    {
      question: '¿Necesito ser residente de Japón para invertir?',
      answer: `No, no necesitas ser residente de Japón. La inversión fraccionada está diseñada específicamente para inversores extranjeros que quieren acceder al mercado inmobiliario japonés sin necesidad de residir en el país.

Sin embargo, necesitarás:
- Identificación válida (pasaporte)
- Verificación KYC (Know Your Customer) estándar
- Capacidad de realizar transferencias internacionales

Todo el proceso se puede completar desde tu país de residencia.`
    },
    {
      question: '¿Qué sucede con la propiedad si Tabiji House cierra?',
      answer: `Esta es una pregunta importante de protección al inversor. Nuestras estructuras SPV están diseñadas para ser independientes:

1. **Propiedad independiente**: Cada SPV es una entidad legal separada que posee la propiedad. Si Tabiji House cerrara, la propiedad seguiría siendo propiedad de los inversores.

2. **Fideicomiso de respaldo**: Estamos estableciendo un fideicomiso independiente que tomaría la gestión en caso de que Tabiji House no pueda continuar operando.

3. **Documentación permanente**: Todos los certificados y documentos legales permanecen válidos independientemente del estado de Tabiji House.

Estamos comprometidos con la transparencia y la protección de nuestros inversores.`
    }
  ],
  process: [
    {
      question: '¿Cuánto tiempo toma completar una inversión?',
      answer: `El proceso completo desde que seleccionas una propiedad hasta que eres propietario de fracciones toma aproximadamente 5-7 días hábiles:

- **Día 1-2**: Revisión de documentación y cálculo de inversión
- **Día 3**: Proceso de pago y verificación KYC
- **Día 4-5**: Procesamiento legal y emisión de certificados
- **Día 6-7**: Entrega de certificados y activación de dashboard

Una vez completado, recibirás acceso inmediato a tu dashboard personalizado donde puedes monitorear tu inversión.`
    },
    {
      question: '¿Puedo visitar la propiedad antes de invertir?',
      answer: `Sí, ofrecemos visitas virtuales en 3D de todas las propiedades, y estamos organizando tours presenciales para inversores calificados.

Para inversiones importantes (más de $50,000 USD), podemos coordinar una visita presencial a la propiedad con nuestro equipo local. Esto incluye:
- Tour de la propiedad
- Reunión con nuestro equipo de gestión
- Visita a la zona y atracciones cercanas

Las visitas se pueden programar con anticipación y están sujetas a disponibilidad de la propiedad.`
    },
    {
      question: '¿Qué información recibo sobre mi inversión?',
      answer: `Recibirás acceso completo a información detallada:

**Antes de invertir:**
- Prospecto completo con análisis financiero
- Proyecciones de ROI detalladas
- Documentación legal completa
- Fotos, videos y tours virtuales 3D

**Después de invertir:**
- Dashboard personalizado con métricas en tiempo real
- Reportes mensuales de ingresos
- Reportes trimestrales financieros detallados
- Actualizaciones sobre el estado de la propiedad
- Notificaciones sobre eventos importantes

Estamos comprometidos con la transparencia total en todas las comunicaciones.`
    }
  ]
};

// ============================================
// CONTENIDO EDUCATIVO
// ============================================

export const educationalContent = {
  whyJapan: {
    title: '¿Por qué invertir en bienes raíces japoneses?',
    sections: [
      {
        title: 'Estabilidad del Mercado',
        content: `El mercado inmobiliario japonés es conocido por su estabilidad. A diferencia de muchos mercados occidentales que experimentan volatilidad extrema, Japón ha mantenido tendencias más predecibles, especialmente en propiedades residenciales y turísticas.

Las políticas monetarias del Banco de Japón y la estructura económica única del país proporcionan un entorno de inversión estable para inversores internacionales.`
      },
      {
        title: 'Crecimiento del Turismo',
        content: `Japón ha experimentado un crecimiento explosivo en turismo internacional. Desde 2012, el número de visitantes extranjeros ha crecido de 8.4 millones a más de 31 millones en 2019 (pre-COVID), y se espera que supere los 40 millones en 2025.

Esta tendencia crea una demanda constante de alojamiento, especialmente en regiones como Gunma que ofrecen experiencias auténticas japonesas (onsen, cultura tradicional, naturaleza).`
      },
      {
        title: 'Oportunidad de Akiya',
        content: `Japón tiene más de 8 millones de casas vacías (akiya), muchas en excelentes ubicaciones pero subutilizadas. Estas propiedades representan oportunidades únicas de inversión con potencial de renovación y valorización.

Las propiedades tradicionales en particular están experimentando un renovado interés tanto de turistas como de residentes que buscan autenticidad cultural.`
      },
      {
        title: 'Accesibilidad para Extranjeros',
        content: `A diferencia de muchos países, Japón no tiene restricciones legales para que extranjeros compren propiedades. Sin embargo, el proceso tradicional puede ser complejo debido a barreras de idioma, documentación y conocimiento local.

La inversión fraccionada a través de Tabiji House elimina estas barreras, permitiendo a inversores internacionales acceder al mercado con facilidad y protección legal completa.`
      }
    ]
  },
  fractionalInvestment: {
    title: 'Todo sobre Inversión Fraccionada',
    sections: [
      {
        title: '¿Qué es la inversión fraccionada?',
        content: `La inversión fraccionada divide una propiedad en múltiples "fracciones" o "shares" que pueden ser compradas individualmente. En lugar de necesitar $200,000 para comprar una casa completa, puedes comprar 1 fracción por $10,000 y ser propietario del 5% de la propiedad.

Cada fracción te da derecho a:
- Una participación proporcional en los ingresos por alquiler
- Una participación proporcional en la apreciación del valor
- Voto en decisiones importantes sobre la propiedad
- Certificado legal de propiedad

Esta estructura democratiza el acceso a inversiones inmobiliarias premium que tradicionalmente requerían capital significativo.`
      },
      {
        title: 'Ventajas de la inversión fraccionada',
        content: `**Accesibilidad**: Invierte desde $6,000 USD en lugar de necesitar $200,000+ para una propiedad completa.

**Diversificación**: Puedes distribuir tu inversión entre múltiples propiedades y ubicaciones, reduciendo riesgo.

**Liquidez potencial**: (Próximamente) Podrás vender tus fracciones en un mercado secundario sin necesidad de vender la propiedad completa.

**Gestión profesional**: No necesitas preocuparte por mantenimiento, gestión de inquilinos, o cumplimiento legal - todo está manejado profesionalmente.

**Transparencia**: Dashboard en tiempo real con todas las métricas de rendimiento y reportes financieros detallados.`
      },
      {
        title: 'Riesgos a considerar',
        content: `Como cualquier inversión, la inversión fraccionada tiene riesgos:

**Riesgo de mercado**: El valor de la propiedad puede disminuir debido a condiciones económicas o cambios en el mercado inmobiliario local.

**Riesgo de liquidez**: Actualmente no hay mercado secundario establecido (en desarrollo para 2025). Las inversiones son relativamente ilíquidas.

**Riesgo de ocupación**: Si la propiedad no se alquila, no hay ingresos por distribuir. Sin embargo, esto no afecta tu participación en la propiedad.

**Riesgo regulatorio**: Cambios en regulaciones japonesas o internacionales podrían afectar la estructura de inversión.

Todos estos riesgos se detallan completamente en el prospecto de cada propiedad. Recomendamos solo invertir capital que no necesites en el corto plazo.`
      }
    ]
  },
  gunmaRegion: {
    title: 'La Región de Gunma: Tu Oportunidad de Inversión',
    sections: [
      {
        title: 'Ubicación Estratégica',
        content: `Gunma está ubicada en el centro de Japón, a solo 1.5 horas en tren de Tokio. Esta proximidad a la capital, combinada con naturaleza pristina y cultura tradicional, la convierte en un destino turístico ideal.

La región es especialmente conocida por:
- Kusatsu Onsen: Uno de los tres mejores onsen de Japón
- Estaciones de esquí de clase mundial
- Montañas y naturaleza para senderismo
- Cultura tradicional japonesa preservada`
      },
      {
        title: 'Crecimiento del Turismo',
        content: `Gunma ha experimentado un crecimiento sostenido en turismo, especialmente después de mejoras en infraestructura de transporte. El nuevo tren de alta velocidad conectará la región directamente con Tokio en 2026, aumentando significativamente la accesibilidad.

Proyecciones indican un aumento del 30-40% en visitantes en los próximos 5 años, creando demanda adicional para alojamiento turístico.`
      },
      {
        title: 'Potencial de Valorización',
        content: `Las mejoras en infraestructura, combinadas con el creciente interés en experiencias auténticas japonesas, están impulsando la valorización de propiedades en Gunma.

Propiedades tradicionales en particular están siendo valoradas por su:
- Autenticidad cultural
- Ubicación en zonas turísticas
- Potencial de renovación
- Acceso a onsen y naturaleza

Esto crea oportunidades tanto para ingresos por alquiler como para apreciación del capital.`
      }
    ]
  }
};

// ============================================
// TESTIMONIOS Y CASOS DE ÉXITO
// ============================================

export const testimonials = [
  {
    name: 'María González',
    location: 'Ciudad de México, México',
    investment: '$12,850 USD',
    property: 'Villa Tradicional del Calígrafo',
    quote: 'Invertir en Tabiji House fue una de las mejores decisiones financieras que he tomado. No solo estoy obteniendo un ROI sólido, sino que también estoy contribuyendo a preservar la cultura japonesa. El proceso fue transparente y el dashboard me mantiene informada en todo momento.',
    roi: '12.5%',
    date: '2024-09-15'
  },
  {
    name: 'James Chen',
    location: 'San Francisco, USA',
    investment: '$25,700 USD',
    property: 'Villa Tradicional del Calígrafo',
    quote: 'Como inversor experimentado, valoré la estructura legal sólida y la transparencia total. La inversión fraccionada me permitió diversificar mi portafolio inmobiliario internacional sin la complejidad de gestionar una propiedad completa en el extranjero.',
    roi: '12.5%',
    date: '2024-08-20'
  },
  {
    name: 'Ana Silva',
    location: 'São Paulo, Brasil',
    investment: '$15,000 USD',
    property: 'Residencia del Artesano con Vista al Monte',
    quote: 'Siempre quise invertir en Japón pero pensé que era imposible sin vivir ahí. Tabiji House hizo el proceso increíblemente fácil. Los reportes mensuales son claros y los ingresos son consistentes. Definitivamente invertiré en más propiedades.',
    roi: '11.2%',
    date: '2024-10-05'
  }
];

// ============================================
// CONTENIDO PARA EMAIL MARKETING
// ============================================

export const emailTemplates = {
  welcome: {
    subject: 'Bienvenido a Tabiji House - Tu Inversión en Japón Comienza Aquí',
    body: `Hola {{name}},

¡Bienvenido a Tabiji House! Estamos emocionados de tenerte como parte de nuestra comunidad de inversores internacionales.

Con Tabiji House, puedes acceder al mercado inmobiliario japonés desde {{country}} con inversiones desde $6,000 USD. Nuestras propiedades tradicionales japonesas ofrecen ROI estimado del 10-12.5% anual.

**Próximos pasos:**
1. Explora nuestras propiedades disponibles
2. Usa nuestra calculadora de ROI para ver tu potencial de retorno
3. Agenda una consulta gratuita con nuestro equipo

¿Tienes preguntas? Estamos aquí para ayudarte.

Saludos,
El Equipo de Tabiji House`
  },
  propertyLaunch: {
    subject: 'Nueva Oportunidad: {{propertyName}} - ROI Estimado {{roi}}%',
    body: `Hola {{name}},

Tenemos una nueva oportunidad de inversión que podría interesarte:

**{{propertyName}}**
- Ubicación: {{location}}
- ROI Estimado: {{roi}}%
- Inversión Mínima: {{minInvestment}}
- Disponibilidad: {{availableShares}} fracciones disponibles

{{description}}

**Acción rápida:**
→ Ver detalles completos
→ Calcular tu inversión
→ Descargar prospecto

Esta propiedad tiene alta demanda, así que te recomendamos revisarla pronto.

¿Preguntas? Responde a este email y te ayudaremos.

Saludos,
El Equipo de Tabiji House`
  },
  monthlyReport: {
    subject: 'Reporte Mensual - Tu Inversión en {{propertyName}}',
    body: `Hola {{name}},

Aquí está tu reporte mensual para {{propertyName}}:

**Ingresos del Mes:**
- Total de ingresos por alquiler: {{totalIncome}}
- Tu participación ({{shares}} fracciones): {{yourIncome}}
- Estado de pago: {{paymentStatus}}

**Métricas de Rendimiento:**
- Ocupación del mes: {{occupancy}}%
- ROI actual: {{currentROI}}%
- Valor estimado de tu inversión: {{currentValue}}

**Próximos Eventos:**
{{upcomingEvents}}

Accede a tu dashboard para ver el reporte completo y análisis detallado.

Saludos,
El Equipo de Tabiji House`
  }
};

// ============================================
// CONTENIDO PARA REDES SOCIALES
// ============================================

export const socialMediaContent = {
  posts: [
    {
      platform: 'linkedin',
      content: `🏯 ¿Sabías que puedes invertir en propiedades tradicionales japonesas desde $6,000 USD?

La inversión fraccionada está democratizando el acceso al mercado inmobiliario japonés. Con ROI estimado del 10-12.5% anual, estas propiedades ofrecen una oportunidad única de diversificación geográfica.

👉 Descubre cómo funciona: [link]

#InversiónInmobiliaria #Japón #RealEstate #InversiónFraccionada #Diversificación`,
      hashtags: ['#InversiónInmobiliaria', '#Japón', '#RealEstate', '#InversiónFraccionada']
    },
    {
      platform: 'twitter',
      content: `💰 Inversión fraccionada en propiedades japonesas tradicionales

✅ Desde $6,000 USD
✅ ROI estimado 10-12.5%
✅ Gestión profesional
✅ Transparencia total

¿Listo para diversificar tu portafolio? 🚀

#InversiónFraccionada #Japón #RealEstate`,
      hashtags: ['#InversiónFraccionada', '#Japón', '#RealEstate']
    },
    {
      platform: 'instagram',
      content: `🌸 Nueva propiedad disponible: Residencia del Artesano

Ubicada en Tsumagoi, Gunma, esta villa tradicional renovada ofrece:
✨ Vistas al Monte Kusatsu-Shirane
✨ ROI estimado: 11.2%
✨ Inversión desde $10,000 USD

Explora esta oportunidad única en nuestro perfil 👆

#Japón #InversiónInmobiliaria #PropiedadTradicional #Gunma`,
      hashtags: ['#Japón', '#InversiónInmobiliaria', '#PropiedadTradicional']
    }
  ],
  stories: [
    {
      type: 'tip',
      content: '💡 Tip del día: La inversión fraccionada te permite acceder a propiedades premium con capital mínimo. En lugar de necesitar $200K para una propiedad completa, invierte $10K en una fracción y recibe retornos proporcionales.'
    },
    {
      type: 'fact',
      content: '📊 Datos: Japón recibió más de 31 millones de turistas en 2019, creando demanda constante de alojamiento. Las propiedades tradicionales en regiones turísticas como Gunma están experimentando valorización sostenida.'
    },
    {
      type: 'testimonial',
      content: '💬 "Invertir en Tabiji House fue transparente y profesional. El ROI está cumpliendo las expectativas y el dashboard me mantiene informado en todo momento." - María G., Inversora'
    }
  ]
};

// ============================================
// EXPORTACIONES
// ============================================

export default {
  fractionalPropertiesContent,
  marketingContent,
  faqContent,
  educationalContent,
  testimonials,
  emailTemplates,
  socialMediaContent
};

