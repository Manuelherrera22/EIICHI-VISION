'use client'

import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useArquitecto } from '@/contexts/ArquitectoContext'
import { User, Database, AlertCircle, CheckCircle } from 'lucide-react'

const UserDebugInfo: React.FC = () => {
  const { user } = useAuth()
  const { userProfile } = useArquitecto()

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <div className="flex items-center space-x-2 mb-3">
        <AlertCircle className="w-5 h-5 text-yellow-600" />
        <h4 className="text-sm font-semibold text-yellow-800">Debug Info (Solo Desarrollo)</h4>
      </div>
      
      <div className="space-y-2 text-xs">
        <div className="flex items-center space-x-2">
          <User className="w-3 h-3 text-gray-500" />
          <span className="text-gray-600">Auth User ID:</span>
          <span className="font-mono bg-gray-100 px-1 rounded">
            {user?.id || 'No disponible'}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Database className="w-3 h-3 text-gray-500" />
          <span className="text-gray-600">Profile ID:</span>
          <span className="font-mono bg-gray-100 px-1 rounded">
            {'N/A'}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Email:</span>
          <span className="font-mono bg-gray-100 px-1 rounded">
            {user?.email || userProfile?.email || 'No disponible'}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Primary Goal:</span>
          <span className="font-mono bg-gray-100 px-1 rounded">
            {userProfile?.primaryGoal || 'No definido'}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">User ID para Supabase:</span>
          <span className="font-mono bg-gray-100 px-1 rounded">
            {user?.id || 'demo-user'}
          </span>
        </div>
      </div>
      
      <div className="mt-3 pt-2 border-t border-yellow-200">
        <div className="flex items-center space-x-2">
          {user?.id ? (
            <CheckCircle className="w-3 h-3 text-green-600" />
          ) : (
            <AlertCircle className="w-3 h-3 text-red-600" />
          )}
          <span className="text-xs text-gray-600">
            {user?.id ?
              'Usuario autenticado - Supabase funcionará' : 
              'Usuario demo - Usando datos de fallback'     
            }
          </span>
        </div>
      </div>
    </div>
  )
}

export default UserDebugInfo





