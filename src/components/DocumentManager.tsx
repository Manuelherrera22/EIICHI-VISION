'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { VisaDocumentService, VisaStageService, FallbackDataService } from '@/services/supabase-fallback'
import { VisaDocument, VisaStage } from '@/types/supabase'
import { 
  Upload, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  FileText, 
  Eye, 
  Download,
  X,
  Plus,
  Calendar,
  User
} from 'lucide-react'

interface DocumentManagerProps {
  userId: string
}

const DocumentManager: React.FC<DocumentManagerProps> = ({ userId }) => {
  const { user } = useAuth()
  const [documents, setDocuments] = useState<VisaDocument[]>([])
  const [stages, setStages] = useState<VisaStage[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<VisaDocument | null>(null)

  useEffect(() => {
    if (userId) {
      loadData()
    } else {
      // Si no hay userId, usar datos de fallback
      console.warn('No user ID provided, using fallback data')
      setDocuments(FallbackDataService.getMockDocuments('mock-user'))
      setStages(FallbackDataService.getMockStages('mock-user'))
      setLoading(false)
    }
  }, [userId])

  const loadData = async () => {
    if (!userId) {
      console.warn('No user ID provided, using fallback data')
      setDocuments(FallbackDataService.getMockDocuments('mock-user'))
      setStages(FallbackDataService.getMockStages('mock-user'))
      setLoading(false)
      return
    }

    setLoading(true)
    try {
      const [documentsData, stagesData] = await Promise.all([
        VisaDocumentService.getDocuments(userId),
        VisaStageService.getStages(userId)
      ])
      
      setDocuments(documentsData)
      setStages(stagesData)
      
      // Si no hay etapas, inicializar las por defecto
      if (stagesData.length === 0) {
        const defaultStages = await VisaStageService.initializeDefaultStages(userId)
        setStages(defaultStages)
      }
    } catch (error) {
      console.error('Error loading data:', error)
      // En caso de error, usar datos de fallback
      setDocuments(FallbackDataService.getMockDocuments(userId))
      setStages(FallbackDataService.getMockStages(userId))
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (file: File, documentType: string) => {
    if (!file) return

    setUploading(documentType)
    setUploadProgress(0)

    try {
      // Crear documento en la base de datos
      const newDocument = await VisaDocumentService.createDocument({
        user_id: userId,
        document_type: documentType,
        document_name: file.name,
        status: 'pending'
      })

      if (!newDocument) {
        throw new Error('Error creating document record')
      }

      // Subir archivo
      const fileUrl = await VisaDocumentService.uploadDocument(
        newDocument.id,
        file,
        (progress) => setUploadProgress(progress)
      )

      if (fileUrl) {
        // Recargar documentos
        await loadData()
        setShowUploadModal(false)
      } else {
        throw new Error('Error uploading file')
      }
    } catch (error) {
      console.error('Error uploading document:', error)
      alert('Error al subir el documento. Por favor, inténtalo de nuevo.')
    } finally {
      setUploading(null)
      setUploadProgress(0)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'uploaded':
      case 'validating':
        return <Clock className="w-5 h-5 text-yellow-600" />
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-600" />
      default:
        return <FileText className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'border-green-500 bg-green-50'
      case 'uploaded':
      case 'validating':
        return 'border-yellow-500 bg-yellow-50'
      case 'rejected':
        return 'border-red-500 bg-red-50'
      default:
        return 'border-gray-300 bg-gray-50'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Aprobado'
      case 'uploaded':
        return 'Subido'
      case 'validating':
        return 'Validando'
      case 'rejected':
        return 'Rechazado'
      default:
        return 'Pendiente'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-gray-600">Cargando documentos...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Gestor de Documentos</h3>
          <p className="text-sm text-gray-600">Sube y gestiona tus documentos de visa</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Subir Documento</span>
        </button>
      </div>

      {/* Progreso General */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-800">Progreso de Documentos</h4>
          <span className="text-sm text-gray-600">
            {documents.filter(d => d.status === 'approved').length} de {documents.length} aprobados
          </span>
        </div>
        
        <div className="space-y-3">
          {stages.map((stage) => (
            <div key={stage.id} className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-600">{stage.stage_order}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-800">{stage.stage_name}</span>
                  <span className="text-xs text-gray-600">{stage.progress_percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${stage.progress_percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lista de Documentos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h4 className="text-lg font-semibold text-gray-800">Documentos Subidos</h4>
        </div>
        
        <div className="divide-y divide-gray-200">
          {documents.length === 0 ? (
            <div className="p-8 text-center">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h5 className="text-lg font-medium text-gray-900 mb-2">No hay documentos subidos</h5>
              <p className="text-gray-600 mb-4">Sube tu primer documento para comenzar el proceso de visa</p>
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Subir Primer Documento
              </button>
            </div>
          ) : (
            documents.map((document) => (
              <div key={document.id} className={`p-6 border-l-4 ${getStatusColor(document.status)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      {getStatusIcon(document.status)}
                    </div>
                    <div className="flex-1">
                      <h5 className="text-lg font-medium text-gray-900">{document.document_name}</h5>
                      <p className="text-sm text-gray-600 mb-2">{document.document_type}</p>
                      
                      {document.validation_notes && (
                        <p className="text-sm text-gray-700 mb-2">
                          <strong>Notas:</strong> {document.validation_notes}
                        </p>
                      )}
                      
                      {document.rejection_reason && (
                        <p className="text-sm text-red-700 mb-2">
                          <strong>Motivo de rechazo:</strong> {document.rejection_reason}
                        </p>
                      )}
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Estado: {getStatusText(document.status)}</span>
                        {document.uploaded_at && (
                          <span>Subido: {new Date(document.uploaded_at).toLocaleDateString()}</span>
                        )}
                        {document.file_size && (
                          <span>Tamaño: {(document.file_size / 1024 / 1024).toFixed(2)} MB</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {document.file_url && (
                      <>
                        <button
                          onClick={() => document.file_url && window.open(document.file_url, '_blank')}
                          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Ver documento"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            const link = window.document.createElement('a')
                            link.href = document.file_url!
                            link.download = document.document_name
                            link.click()
                          }}
                          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Descargar documento"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal de Subida */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Subir Documento</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Documento
                </label>
                <select
                  id="documentType"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="pasaporte">Pasaporte Válido</option>
                  <option value="antecedentes">Certificado de Antecedentes Penales</option>
                  <option value="titulo">Título Universitario Apostillado</option>
                  <option value="contrato">Contrato de Trabajo</option>
                  <option value="medico">Certificado Médico</option>
                  <option value="fotos">Fotografías Tamaño Pasaporte</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Archivo
                </label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    const documentType = (document.getElementById('documentType') as HTMLSelectElement)?.value
                    if (file && documentType) {
                      handleFileUpload(file, documentType)
                    }
                  }}
                />
              </div>

              {uploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Subiendo {uploading}...</span>
                    <span>{Math.round(uploadProgress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DocumentManager
