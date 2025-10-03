'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useArquitecto } from '@/contexts/ArquitectoContext'
import { CheckCircle, User, Target, Brain, TrendingUp } from 'lucide-react'

const OnboardingStatus: React.FC = () => {
  const { userProfile, isProfileComplete } = useArquitecto()
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    // Mostrar mensaje de bienvenida si el perfil está completo
    if (isProfileComplete()) {
      setShowWelcome(true)
      // Ocultar después de 3 segundos
      const timer = setTimeout(() => {
        setShowWelcome(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isProfileComplete])

  if (!showWelcome || !isProfileComplete()) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm"
      >
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <CheckCircle className="w-6 h-6 text-green-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              ¡Bienvenido de vuelta!
            </h3>
            <p className="text-xs text-gray-600 mb-2">
              Tu perfil está completo y guardado. Continuamos desde donde lo dejaste.
            </p>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <User className="w-3 h-3" />
              <span>{userProfile.name || 'Usuario'}</span>
              {userProfile.primaryGoal && (
                <>
                  <span>•</span>
                  <Target className="w-3 h-3" />
                  <span className="capitalize">{userProfile.primaryGoal}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default OnboardingStatus
