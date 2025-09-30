'use client'

import { useState, useEffect, useCallback } from 'react'

interface UserActivityState {
  lastActivity: Date | null
  inactivityDays: number
  isActive: boolean
  showReengagement: boolean
}

interface UseUserActivityReturn {
  activityState: UserActivityState
  updateActivity: () => void
  dismissReengagement: () => void
  resetActivity: () => void
}

export const useUserActivity = (): UseUserActivityReturn => {
  const [activityState, setActivityState] = useState<UserActivityState>({
    lastActivity: null,
    inactivityDays: 0,
    isActive: true,
    showReengagement: false
  })

  // Cargar estado inicial desde localStorage
  useEffect(() => {
    const savedActivity = localStorage.getItem('userActivity')
    if (savedActivity) {
      try {
        const parsed = JSON.parse(savedActivity)
        const lastActivity = new Date(parsed.lastActivity)
        const now = new Date()
        const daysSinceActivity = Math.floor((now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24))
        
        setActivityState({
          lastActivity,
          inactivityDays: daysSinceActivity,
          isActive: daysSinceActivity < 7, // Considerar activo si ha usado la app en los últimos 7 días
          showReengagement: daysSinceActivity >= 30 // Mostrar re-engagement después de 30 días
        })
      } catch (error) {
        console.error('Error parsing saved activity:', error)
        // Si hay error, inicializar con estado por defecto
        setActivityState({
          lastActivity: new Date(),
          inactivityDays: 0,
          isActive: true,
          showReengagement: false
        })
      }
    } else {
      // Primera vez usando la app
      setActivityState({
        lastActivity: new Date(),
        inactivityDays: 0,
        isActive: true,
        showReengagement: false
      })
    }
  }, [])

  // Guardar estado en localStorage cuando cambie
  useEffect(() => {
    if (activityState.lastActivity) {
      localStorage.setItem('userActivity', JSON.stringify({
        lastActivity: activityState.lastActivity.toISOString(),
        inactivityDays: activityState.inactivityDays,
        isActive: activityState.isActive,
        showReengagement: activityState.showReengagement
      }))
    }
  }, [activityState])

  // Actualizar actividad del usuario
  const updateActivity = useCallback(() => {
    const now = new Date()
    setActivityState(prev => ({
      ...prev,
      lastActivity: now,
      inactivityDays: 0,
      isActive: true,
      showReengagement: false
    }))
  }, [])

  // Descartar notificación de re-engagement
  const dismissReengagement = useCallback(() => {
    setActivityState(prev => ({
      ...prev,
      showReengagement: false
    }))
  }, [])

  // Resetear actividad (útil para testing)
  const resetActivity = useCallback(() => {
    setActivityState({
      lastActivity: null,
      inactivityDays: 0,
      isActive: true,
      showReengagement: false
    })
    localStorage.removeItem('userActivity')
  }, [])

  // Detectar actividad del usuario
  useEffect(() => {
    const handleUserActivity = () => {
      updateActivity()
    }

    // Eventos que indican actividad del usuario
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
    
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity, { passive: true })
    })

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity)
      })
    }
  }, [updateActivity])

  // Actualizar días de inactividad cada minuto
  useEffect(() => {
    const interval = setInterval(() => {
      if (activityState.lastActivity) {
        const now = new Date()
        const daysSinceActivity = Math.floor((now.getTime() - activityState.lastActivity.getTime()) / (1000 * 60 * 60 * 24))
        
        setActivityState(prev => ({
          ...prev,
          inactivityDays: daysSinceActivity,
          isActive: daysSinceActivity < 7,
          showReengagement: daysSinceActivity >= 30 && !prev.showReengagement
        }))
      }
    }, 60000) // Cada minuto

    return () => clearInterval(interval)
  }, [activityState.lastActivity])

  return {
    activityState,
    updateActivity,
    dismissReengagement,
    resetActivity
  }
}


