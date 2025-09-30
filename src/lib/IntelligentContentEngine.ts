'use client'

import React from 'react'

interface WeeklyPulseContent {
  opportunityOfTheWeek?: {
    title: string
    location: string
    roi: number
    description: string
    analysisLink: string
  }
  wisdomPill?: {
    quote: string
    explanation: string
    articleLink: string
  }
  storyOfTheWeek?: {
    title: string
    protagonist: string
    description: string
    videoLink: string
  }
  stepByStep?: {
    title: string
    description: string
    actionLink: string
  }
  momentOfCalm?: {
    image: string
    haiku: string
    description: string
  }
  inspirationForSanctuary?: {
    title: string
    description: string
    materialsLink: string
  }
}

interface ContentPersonalizationEngine {
  generateWeeklyPulse(userProfile: any, dashboardType: string): WeeklyPulseContent
  generateDashboardNotifications(userProfile: any, dashboardType: string): any[]
  generateReengagementContent(userProfile: any, inactivityDays: number): any
}

class IntelligentContentEngine implements ContentPersonalizationEngine {
  
  generateWeeklyPulse(userProfile: any, dashboardType: string): WeeklyPulseContent {
    const content: WeeklyPulseContent = {}

    switch (dashboardType) {
      case 'invertir':
        content.opportunityOfTheWeek = {
          title: 'Casa Tradicional Renovada en Tsumagoi',
          location: 'Tsumagoi, Gunma',
          roi: 12,
          description: 'Esta semana analizamos una propiedad con potencial de ROI del 12% gracias a la nueva línea de transporte que conectará la región con Tokio en 2026.',
          analysisLink: '/dashboard/properties/tsumagoi-analysis'
        }
        
        content.wisdomPill = {
          quote: 'La diversificación no es solo entre activos, sino entre geografías.',
          explanation: 'Japón ofrece una estabilidad única en el panorama global actual. Mientras otros mercados fluctúan, el mercado inmobiliario japonés mantiene una tendencia constante de crecimiento.',
          articleLink: '/journal/diversification-strategies'
        }
        break

      case 'migrar':
        content.storyOfTheWeek = {
          title: 'Un Día en la Vida de la Familia Rodríguez',
          protagonist: 'Familia Rodríguez',
          description: 'Conoce a la familia Rodríguez, que se mudó desde México hace un año. Descubre cómo es un día típico en su nueva vida en Kusatsu, desde el desayuno tradicional hasta las actividades de los niños.',
          videoLink: '/stories/family-rodriguez-daily-life'
        }
        
        content.stepByStep = {
          title: 'Un Paso a la Vez',
          description: 'Sabemos que el papeleo puede ser abrumador. Esta semana, enfócate solo en un documento: el certificado de antecedentes penales. Un pequeño paso te acerca a tu nueva vida.',
          actionLink: '/dashboard/documents/criminal-record'
        }
        break

      case 'vivir':
        content.momentOfCalm = {
          image: '/images/zen-garden-snow.jpg',
          haiku: 'Nieve silenciosa\ncubre el jardín zen\npaz en cada copo',
          description: 'Un momento de calma desde Japón. Respira profundamente y deja que la serenidad de este jardín zen cubierto de nieve te inspire.'
        }
        
        content.inspirationForSanctuary = {
          title: 'Nueva Paleta Sostenible',
          description: 'Hemos añadido una nueva paleta de materiales sostenibles a tu Mesa de Diseño, inspirada en los bosques de Gunma. Madera de cedro local, piedra volcánica y papel washi tradicional.',
          materialsLink: '/dashboard/materials/sustainable-collection'
        }
        break
    }

    return content
  }

  generateDashboardNotifications(userProfile: any, dashboardType: string): any[] {
    const notifications = []

    // Notificaciones basadas en actividad reciente
    const lastLogin = new Date(userProfile.lastLogin || Date.now() - 7 * 24 * 60 * 60 * 1000)
    const daysSinceLogin = Math.floor((Date.now() - lastLogin.getTime()) / (1000 * 60 * 60 * 24))

    if (daysSinceLogin > 3) {
      notifications.push({
        type: 'welcome_back',
        title: `¡Bienvenido de vuelta, ${userProfile.name || 'Usuario'}!`,
        message: 'Mientras no estabas, hemos actualizado tu dashboard con nuevas oportunidades y contenido personalizado.',
        priority: 'high'
      })
    }

    // Notificaciones específicas por tipo
    switch (dashboardType) {
      case 'invertir':
        notifications.push({
          type: 'new_property',
          title: 'Nueva Oportunidad Detectada',
          message: 'Una propiedad que coincide con tu perfil de inversión ha sido añadida al sistema. Potencial ROI: 18.5%.',
          priority: 'high'
        })
        break

      case 'migrar':
        notifications.push({
          type: 'document_update',
          title: 'Progreso en tu Visa',
          message: 'Tu documento de contrato de trabajo ha sido aprobado. Solo faltan 2 documentos para completar la fase de recolección.',
          priority: 'high'
        })
        break

      case 'vivir':
        notifications.push({
          type: 'design_update',
          title: 'Render Personalizado Listo',
          message: 'Nuestro equipo creó un render personalizado de la propiedad que guardaste en favoritos, aplicando tu estilo minimalista preferido.',
          priority: 'high'
        })
        break
    }

    return notifications
  }

  generateReengagementContent(userProfile: any, inactivityDays: number): any {
    if (inactivityDays < 30) return null

    const content = {
      type: 'proactive_reengagement',
      title: 'Tu Render Inesperado',
      message: `Hola ${userProfile.name || 'Usuario'}, nuestro equipo de arquitectos vio que guardaste la 'Kawaakari House' en tus favoritos. Jugaron un poco con ella, aplicando el estilo minimalista que te gusta. Pensamos que este render podría inspirarte.`,
      cta: {
        label: 'Ver tu Render Personalizado',
        link: '/dashboard/3d-viewer/personalized-render'
      },
      psychology: 'Este es el "WOW" definitivo. Le estás dando un valor inmenso sin pedir nada a cambio.',
      followUp: {
        type: 'exclusive_webinar',
        title: 'Webinar Exclusivo: Estrategias 2026',
        description: 'Sabemos que estás ocupado, por eso te invitamos a un webinar exclusivo y privado para nuestros clientes más valorados.',
        date: 'Próximo viernes 3:00 PM JST',
        link: '/webinar/exclusive-2026-strategies'
      }
    }

    return content
  }

  // Generar contenido basado en el estado emocional del usuario
  generateEmotionalContent(userProfile: any, dashboardType: string): any {
    const emotionalState = this.analyzeEmotionalState(userProfile)
    
    switch (emotionalState) {
      case 'anxious':
        return this.generateCalmingContent(dashboardType)
      case 'excited':
        return this.generateMotivationalContent(dashboardType)
      case 'hesitant':
        return this.generateEducationalContent(dashboardType)
      default:
        return this.generateNeutralContent(dashboardType)
    }
  }

  private analyzeEmotionalState(userProfile: any): string {
    // Análisis basado en patrones de comportamiento
    const lastActivity = userProfile.lastActivity
    const completedSteps = userProfile.completedSteps || 0
    const totalSteps = userProfile.totalSteps || 10
    
    if (completedSteps / totalSteps < 0.3) return 'anxious'
    if (completedSteps / totalSteps > 0.7) return 'excited'
    if (userProfile.hesitationIndicators) return 'hesitant'
    
    return 'neutral'
  }

  private generateCalmingContent(dashboardType: string): any {
    return {
      tone: 'sereno',
      message: 'Respira profundamente. Cada paso que das te acerca a tu objetivo. No hay prisa, solo progreso constante.',
      visual: 'zen-garden.jpg',
      action: 'meditation-moment'
    }
  }

  private generateMotivationalContent(dashboardType: string): any {
    return {
      tone: 'energético',
      message: '¡Excelente progreso! Tu determinación está dando frutos. El siguiente paso te llevará aún más cerca de tu meta.',
      visual: 'sunrise-mountain.jpg',
      action: 'next-milestone'
    }
  }

  private generateEducationalContent(dashboardType: string): any {
    return {
      tone: 'informativo',
      message: 'El conocimiento es poder. Aquí tienes información valiosa que te ayudará a tomar la mejor decisión.',
      visual: 'books-study.jpg',
      action: 'learn-more'
    }
  }

  private generateNeutralContent(dashboardType: string): any {
    return {
      tone: 'equilibrado',
      message: 'Mantén el ritmo constante. Cada día es una oportunidad para avanzar hacia tu objetivo.',
      visual: 'balanced-scales.jpg',
      action: 'continue-journey'
    }
  }
}

// Instancia global del motor de contenido
export const contentEngine = new IntelligentContentEngine()

// Hook para usar el motor de contenido en componentes React
export const useIntelligentContent = (userProfile: any, dashboardType: string) => {
  const [content, setContent] = React.useState<WeeklyPulseContent>({})
  const [notifications, setNotifications] = React.useState<any[]>([])
  const [reengagementContent, setReengagementContent] = React.useState<any>(null)

  React.useEffect(() => {
    const weeklyPulse = contentEngine.generateWeeklyPulse(userProfile, dashboardType)
    const dashboardNotifications = contentEngine.generateDashboardNotifications(userProfile, dashboardType)
    
    // Calcular días de inactividad
    const lastActivity = userProfile.lastActivity ? new Date(userProfile.lastActivity) : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const inactivityDays = Math.floor((Date.now() - lastActivity.getTime()) / (1000 * 60 * 60 * 24))
    
    const reengagement = contentEngine.generateReengagementContent(userProfile, inactivityDays)

    setContent(weeklyPulse)
    setNotifications(dashboardNotifications)
    setReengagementContent(reengagement)
  }, [userProfile, dashboardType])

  return {
    weeklyPulse: content,
    notifications,
    reengagementContent,
    generateEmotionalContent: () => contentEngine.generateEmotionalContent(userProfile, dashboardType)
  }
}

export default IntelligentContentEngine

