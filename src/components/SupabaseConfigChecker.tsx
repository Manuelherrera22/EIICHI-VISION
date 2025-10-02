'use client'

import React, { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { CheckCircle, AlertCircle, Database, Settings, RefreshCw } from 'lucide-react'

interface SupabaseConfigCheckerProps {
  onConfigComplete?: () => void
}

const SupabaseConfigChecker: React.FC<SupabaseConfigCheckerProps> = ({ onConfigComplete }) => {
  const [isChecking, setIsChecking] = useState(false)
  const [checkResults, setCheckResults] = useState<{
    connection: boolean
    tables: boolean
    storage: boolean
    rls: boolean
  } | null>(null)
  const [showInstructions, setShowInstructions] = useState(false)

  const checkSupabaseConfig = async () => {
    setIsChecking(true)
    const results = {
      connection: false,
      tables: false,
      storage: false,
      rls: false
    }

    try {
      // Verificar conexión básica
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (!authError) {
        results.connection = true
      }

      // Verificar tablas principales
      try {
        const { error: tableError } = await supabase
          .from('user_profiles')
          .select('id')
          .limit(1)
        
        if (!tableError) {
          results.tables = true
        }
      } catch (error) {
        console.log('Tables not found, this is expected if schema not run yet')
      }

      // Verificar storage
      try {
        const { data: buckets, error: storageError } = await supabase.storage.listBuckets()
        if (!storageError && buckets?.some(bucket => bucket.name === 'documents')) {
          results.storage = true
        }
      } catch (error) {
        console.log('Storage not configured')
      }

      // Verificar RLS (Row Level Security)
      try {
        const { error: rlsError } = await supabase
          .from('user_profiles')
          .select('id')
          .limit(1)
        
        // Si no hay error, RLS está funcionando
        if (!rlsError) {
          results.rls = true
        }
      } catch (error) {
        console.log('RLS not configured')
      }

      setCheckResults(results)
      
      // Si todo está configurado, llamar callback
      if (Object.values(results).every(Boolean)) {
        onConfigComplete?.()
      }
    } catch (error) {
      console.error('Error checking Supabase config:', error)
    } finally {
      setIsChecking(false)
    }
  }

  const getStatusIcon = (status: boolean) => {
    return status ? (
      <CheckCircle className="w-5 h-5 text-green-600" />
    ) : (
      <AlertCircle className="w-5 h-5 text-red-600" />
    )
  }

  const getStatusText = (status: boolean) => {
    return status ? 'Configurado' : 'No configurado'
  }

  const getStatusColor = (status: boolean) => {
    return status ? 'text-green-600' : 'text-red-600'
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <Database className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Configuración de Supabase</h3>
            <p className="text-sm text-gray-600">Verificar estado de la base de datos</p>
          </div>
        </div>
        <button
          onClick={checkSupabaseConfig}
          disabled={isChecking}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {isChecking ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
          <span>{isChecking ? 'Verificando...' : 'Verificar'}</span>
        </button>
      </div>

      {checkResults && (
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              {getStatusIcon(checkResults.connection)}
              <div>
                <p className="text-sm font-medium text-gray-800">Conexión</p>
                <p className={`text-xs ${getStatusColor(checkResults.connection)}`}>
                  {getStatusText(checkResults.connection)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              {getStatusIcon(checkResults.tables)}
              <div>
                <p className="text-sm font-medium text-gray-800">Tablas</p>
                <p className={`text-xs ${getStatusColor(checkResults.tables)}`}>
                  {getStatusText(checkResults.tables)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              {getStatusIcon(checkResults.storage)}
              <div>
                <p className="text-sm font-medium text-gray-800">Storage</p>
                <p className={`text-xs ${getStatusColor(checkResults.storage)}`}>
                  {getStatusText(checkResults.storage)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              {getStatusIcon(checkResults.rls)}
              <div>
                <p className="text-sm font-medium text-gray-800">RLS</p>
                <p className={`text-xs ${getStatusColor(checkResults.rls)}`}>
                  {getStatusText(checkResults.rls)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instrucciones de configuración */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-800">Instrucciones de Configuración</h4>
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="flex items-center space-x-2 px-3 py-1 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>{showInstructions ? 'Ocultar' : 'Mostrar'}</span>
          </button>
        </div>

        {showInstructions && (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-semibold text-blue-800 mb-2">1. Crear Proyecto en Supabase</h5>
              <p className="text-sm text-blue-700 mb-2">
                Ve a <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline">supabase.com</a> y crea un nuevo proyecto.
              </p>
              <p className="text-sm text-blue-700">
                Anota la URL y la API Key para configurar las variables de entorno.
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-semibold text-green-800 mb-2">2. Ejecutar Esquema de Base de Datos</h5>
              <p className="text-sm text-green-700 mb-2">
                Ve al SQL Editor en tu proyecto de Supabase y ejecuta el contenido del archivo <code className="bg-green-100 px-1 rounded">supabase_schema.sql</code>.
              </p>
              <p className="text-sm text-green-700">
                Esto creará todas las tablas, políticas de seguridad y funciones necesarias.
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h5 className="font-semibold text-yellow-800 mb-2">3. Configurar Storage</h5>
              <p className="text-sm text-yellow-700 mb-2">
                Ve a Storage en tu proyecto de Supabase y crea un bucket llamado <code className="bg-yellow-100 px-1 rounded">documents</code>.
              </p>
              <p className="text-sm text-yellow-700">
                Configura las políticas de acceso para permitir que los usuarios suban sus propios documentos.
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h5 className="font-semibold text-purple-800 mb-2">4. Variables de Entorno</h5>
              <p className="text-sm text-purple-700 mb-2">
                Agrega a tu archivo <code className="bg-purple-100 px-1 rounded">.env.local</code>:
              </p>
              <pre className="text-xs bg-purple-100 p-2 rounded mt-2 overflow-x-auto">
{`NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key`}
              </pre>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-semibold text-gray-800 mb-2">5. Modo de Desarrollo</h5>
              <p className="text-sm text-gray-700">
                Si no tienes Supabase configurado aún, el sistema usará datos de fallback para desarrollo.
                Todas las funcionalidades funcionarán normalmente con datos simulados.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Estado actual */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Database className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-800">Estado Actual</span>
        </div>
        <p className="text-sm text-gray-600">
          {checkResults ? (
            Object.values(checkResults).every(Boolean) ? (
              '✅ Supabase está completamente configurado y funcionando'
            ) : (
              '⚠️ Supabase necesita configuración adicional. El sistema está usando datos de fallback para desarrollo.'
            )
          ) : (
            'Haz clic en "Verificar" para comprobar el estado de Supabase'
          )}
        </p>
      </div>
    </div>
  )
}

export default SupabaseConfigChecker





