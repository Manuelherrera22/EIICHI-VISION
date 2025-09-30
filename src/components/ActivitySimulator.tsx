'use client'

import React, { useState } from 'react'
import { useUserActivity } from '@/hooks/useUserActivity'
import { Clock, Play, Pause, RotateCcw, Calendar, Activity } from 'lucide-react'

interface ActivitySimulatorProps {
  userProfile: any
}

const ActivitySimulator: React.FC<ActivitySimulatorProps> = ({ userProfile }) => {
  const { activityState, updateActivity, resetActivity } = useUserActivity()
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulatedDays, setSimulatedDays] = useState(0)

  const simulateInactivity = () => {
    setIsSimulating(true)
    
    // Simular 30 días de inactividad para activar re-engagement
    const targetDays = 30
    const interval = setInterval(() => {
      setSimulatedDays(prev => {
        if (prev >= targetDays) {
          clearInterval(interval)
          setIsSimulating(false)
          return targetDays
        }
        return prev + 1
      })
    }, 100) // Cada 100ms = 1 día simulado
  }

  const resetSimulation = () => {
    setSimulatedDays(0)
    setIsSimulating(false)
    resetActivity()
  }

  const getActivityStatus = () => {
    if (simulatedDays >= 30) return 'Re-engagement activado'
    if (simulatedDays >= 7) return 'Usuario inactivo'
    return 'Usuario activo'
  }

  const getStatusColor = () => {
    if (simulatedDays >= 30) return 'text-red-600'
    if (simulatedDays >= 7) return 'text-yellow-600'
    return 'text-green-600'
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <Activity className="w-5 h-5 text-gray-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Simulador de Actividad</h3>
          <p className="text-sm text-gray-600">Prueba el sistema de re-engagement</p>
        </div>
      </div>

      {/* Estado Actual */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Estado Real:</p>
            <p className={`font-semibold ${getStatusColor()}`}>
              {getActivityStatus()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Días Simulados:</p>
            <p className="font-semibold text-gray-800">{simulatedDays} días</p>
          </div>
        </div>
        
        {activityState.lastActivity && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Última actividad real: {activityState.lastActivity.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">
              Días de inactividad real: {activityState.inactivityDays}
            </p>
          </div>
        )}
      </div>

      {/* Controles */}
      <div className="space-y-3">
        <button
          onClick={simulateInactivity}
          disabled={isSimulating}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSimulating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Simulando inactividad...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>Simular 30 días de inactividad</span>
            </>
          )}
        </button>

        <button
          onClick={updateActivity}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <Clock className="w-4 h-4" />
          <span>Marcar como Activo</span>
        </button>

        <button
          onClick={resetSimulation}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Resetear Simulación</span>
        </button>
      </div>

      {/* Información del Perfil */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">Perfil del Usuario:</h4>
        <div className="text-xs text-gray-600 space-y-1">
          <p><strong>Objetivo:</strong> {userProfile.primaryGoal || 'No definido'}</p>
          <p><strong>Nombre:</strong> {userProfile.name || 'No definido'}</p>
          <p><strong>Email:</strong> {userProfile.email || 'No definido'}</p>
        </div>
      </div>

      {/* Instrucciones */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <h4 className="text-sm font-semibold text-blue-800 mb-2">💡 Instrucciones:</h4>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• Usa "Simular inactividad" para probar el modal de re-engagement</li>
          <li>• "Marcar como Activo" resetea el contador de inactividad</li>
          <li>• El sistema detecta automáticamente la actividad real del usuario</li>
          <li>• Después de 30 días de inactividad se activa el re-engagement</li>
        </ul>
      </div>
    </div>
  )
}

export default ActivitySimulator

