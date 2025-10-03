'use client'

import { supabase } from '@/lib/supabase'
import { 
  UserProfile, 
  UserProfileInsert, 
  UserProfileUpdate,
  VisaDocument,
  VisaDocumentInsert,
  VisaDocumentUpdate,
  VisaStage,
  VisaStageInsert,
  VisaStageUpdate,
  Property,
  DesignMaterial,
  IntelligentNotification,
  IntelligentNotificationInsert
} from '@/types/supabase'

// Servicio de Fallback para Desarrollo
export class FallbackDataService {
  static getMockDocuments(userId: string): VisaDocument[] {
    return [
      {
        id: 'mock-1',
        user_id: userId,
        document_type: 'pasaporte',
        document_name: 'Pasaporte Válido',
        status: 'pending',
        file_url: null,
        file_size: null,
        mime_type: null,
        uploaded_at: null,
        validated_at: null,
        validation_notes: null,
        rejection_reason: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'mock-2',
        user_id: userId,
        document_type: 'antecedentes',
        document_name: 'Certificado de Antecedentes Penales',
        status: 'uploaded',
        file_url: '/mock-documents/antecedentes.pdf',
        file_size: 1024000,
        mime_type: 'application/pdf',
        uploaded_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        validated_at: null,
        validation_notes: null,
        rejection_reason: null,
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  }

  static getMockStages(userId: string): VisaStage[] {
    return [
      {
        id: 'stage-1',
        user_id: userId,
        stage_name: 'Recolección de Documentos',
        stage_order: 1,
        status: 'in_progress',
        progress_percentage: 25,
        due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        completed_date: null,
        description: 'Recopilación de documentos necesarios para la visa de trabajo',
        required_documents: ['Pasaporte válido', 'Certificado de antecedentes penales', 'Título universitario apostillado'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'stage-2',
        user_id: userId,
        stage_name: 'Validación Legal',
        stage_order: 2,
        status: 'pending',
        progress_percentage: 0,
        due_date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        completed_date: null,
        description: 'Revisión y validación de documentos por nuestro equipo legal',
        required_documents: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  }

  static getMockProperties(): Property[] {
    return [
      {
        id: 'prop-1',
        title: 'Casa Tradicional Kusatsu',
        location: 'Kusatsu, Gunma',
        price: 45000000,
        area: 120,
        year: 1985,
        roi: 12.5,
        monthly_income: 450000,
        description: 'Casa tradicional japonesa completamente renovada con baños termales privados.',
        features: ['Baños termales privados', 'Jardín zen tradicional', 'Cocina moderna integrada'],
        images: ['/images/kusatsu-house-1.jpg', '/images/kusatsu-house-2.jpg'],
        status: 'available',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  }

  static getMockMaterials(): DesignMaterial[] {
    return [
      {
        id: 'mat-1',
        name: 'Madera de Ciprés Japonés',
        category: 'natural',
        color_hex: '#8B4513',
        texture_url: '/textures/cypress.jpg',
        price: 15000,
        sustainability_rating: 'A+',
        description: 'Madera tradicional japonesa con propiedades naturales antibacterianas.',
        features: ['Antibacteriano', 'Aromático', 'Duradero'],
        applications: ['Pisos', 'Paredes', 'Muebles'],
        is_new: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  }
}

// Servicio de Perfiles de Usuario con Fallback
export class UserProfileService {
  static async getProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.warn('Supabase table not found, using fallback data:', error)
        return null
      }

      return data
    } catch (error) {
      console.warn('Error fetching user profile, using fallback:', error)
      return null
    }
  }

  static async createProfile(profile: UserProfileInsert): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .insert(profile)
        .select()
        .single()

      if (error) {
        console.warn('Supabase table not found, profile not created:', error)
        return null
      }

      return data
    } catch (error) {
      console.warn('Error creating user profile:', error)
      return null
    }
  }

  static async updateProfile(userId: string, updates: UserProfileUpdate): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()

      if (error) {
        console.warn('Supabase table not found, profile not updated:', error)
        return null
      }

      return data
    } catch (error) {
      console.warn('Error updating user profile:', error)
      return null
    }
  }

  static async updateActivity(userId: string): Promise<void> {
    try {
      const { error } = await supabase.rpc('update_user_activity', {
        user_uuid: userId
      })

      if (error) {
        console.warn('Supabase function not found, activity not updated:', error)
      }
    } catch (error) {
      console.warn('Error updating user activity:', error)
    }
  }
}

// Servicio de Documentos de Visa con Fallback
export class VisaDocumentService {
  static async getDocuments(userId: string): Promise<VisaDocument[]> {
    // Si no hay userId válido, usar datos de fallback directamente
    if (!userId || userId === 'demo-user' || userId === 'mock-user') {
      console.warn('No valid user ID, using fallback data')
      return FallbackDataService.getMockDocuments(userId || 'demo-user')
    }

    try {
      const { data, error } = await supabase
        .from('visa_documents')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: true })

      if (error) {
        console.warn('Supabase table not found, using fallback data:', error)
        return FallbackDataService.getMockDocuments(userId)
      }

      return data || []
    } catch (error) {
      console.warn('Error fetching visa documents, using fallback:', error)
      return FallbackDataService.getMockDocuments(userId)
    }
  }

  static async createDocument(document: VisaDocumentInsert): Promise<VisaDocument | null> {
    try {
      const { data, error } = await supabase
        .from('visa_documents')
        .insert(document)
        .select()
        .single()

      if (error) {
        console.warn('Supabase table not found, document not created:', error)
        return null
      }

      return data
    } catch (error) {
      console.warn('Error creating visa document:', error)
      return null
    }
  }

  static async updateDocument(documentId: string, updates: VisaDocumentUpdate): Promise<VisaDocument | null> {
    try {
      const { data, error } = await supabase
        .from('visa_documents')
        .update(updates)
        .eq('id', documentId)
        .select()
        .single()

      if (error) {
        console.warn('Supabase table not found, document not updated:', error)
        return null
      }

      return data
    } catch (error) {
      console.warn('Error updating visa document:', error)
      return null
    }
  }

  static async uploadDocument(
    documentId: string, 
    file: File, 
    onProgress?: (progress: number) => void
  ): Promise<string | null> {
    try {
      // Simular subida para desarrollo
      if (onProgress) {
        for (let i = 0; i <= 100; i += 10) {
          setTimeout(() => onProgress(i), i * 50)
        }
      }

      // Simular URL de archivo
      const mockUrl = `https://mock-storage.supabase.co/documents/${documentId}.${file.name.split('.').pop()}`
      
      // Actualizar documento con URL simulada
      await this.updateDocument(documentId, {
        file_url: mockUrl,
        file_size: file.size,
        mime_type: file.type,
        uploaded_at: new Date().toISOString(),
        status: 'uploaded'
      })

      return mockUrl
    } catch (error) {
      console.error('Error in upload process:', error)
      return null
    }
  }

  static async validateDocument(documentId: string, validationNotes: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('visa_documents')
        .update({
          status: 'validating',
          validation_notes: validationNotes,
          validated_at: new Date().toISOString()
        })
        .eq('id', documentId)

      if (error) {
        console.warn('Supabase table not found, validation not updated:', error)
        return false
      }

      return true
    } catch (error) {
      console.warn('Error validating document:', error)
      return false
    }
  }

  static async approveDocument(documentId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('visa_documents')
        .update({
          status: 'approved',
          validated_at: new Date().toISOString()
        })
        .eq('id', documentId)

      if (error) {
        console.warn('Supabase table not found, approval not updated:', error)
        return false
      }

      return true
    } catch (error) {
      console.warn('Error approving document:', error)
      return false
    }
  }

  static async rejectDocument(documentId: string, rejectionReason: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('visa_documents')
        .update({
          status: 'rejected',
          rejection_reason: rejectionReason,
          validated_at: new Date().toISOString()
        })
        .eq('id', documentId)

      if (error) {
        console.warn('Supabase table not found, rejection not updated:', error)
        return false
      }

      return true
    } catch (error) {
      console.warn('Error rejecting document:', error)
      return false
    }
  }
}

// Servicio de Etapas de Visa con Fallback
export class VisaStageService {
  static async getStages(userId: string): Promise<VisaStage[]> {
    // Si no hay userId válido, usar datos de fallback directamente
    if (!userId || userId === 'demo-user' || userId === 'mock-user') {
      console.warn('No valid user ID, using fallback data')
      return FallbackDataService.getMockStages(userId || 'demo-user')
    }

    try {
      const { data, error } = await supabase
        .from('visa_stages')
        .select('*')
        .eq('user_id', userId)
        .order('stage_order', { ascending: true })

      if (error) {
        console.warn('Supabase table not found, using fallback data:', error)
        return FallbackDataService.getMockStages(userId)
      }

      return data || []
    } catch (error) {
      console.warn('Error fetching visa stages, using fallback:', error)
      return FallbackDataService.getMockStages(userId)
    }
  }

  static async createStages(userId: string, stages: VisaStageInsert[]): Promise<VisaStage[]> {
    try {
      const stagesWithUserId = stages.map(stage => ({ ...stage, user_id: userId }))
      
      const { data, error } = await supabase
        .from('visa_stages')
        .insert(stagesWithUserId)
        .select()

      if (error) {
        console.warn('Supabase table not found, stages not created:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.warn('Error creating visa stages:', error)
      return []
    }
  }

  static async updateStage(stageId: string, updates: VisaStageUpdate): Promise<VisaStage | null> {
    try {
      const { data, error } = await supabase
        .from('visa_stages')
        .update(updates)
        .eq('id', stageId)
        .select()
        .single()

      if (error) {
        console.warn('Supabase table not found, stage not updated:', error)
        return null
      }

      return data
    } catch (error) {
      console.warn('Error updating visa stage:', error)
      return null
    }
  }

  static async initializeDefaultStages(userId: string): Promise<VisaStage[]> {
    const defaultStages: VisaStageInsert[] = [
      {
        user_id: userId,
        stage_name: 'Recolección de Documentos',
        stage_order: 1,
        status: 'in_progress',
        progress_percentage: 0,
        due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        description: 'Recopilación de documentos necesarios para la visa de trabajo',
        required_documents: [
          'Pasaporte válido',
          'Certificado de antecedentes penales',
          'Título universitario apostillado',
          'Contrato de trabajo',
          'Certificado médico',
          'Fotografías tamaño pasaporte'
        ]
      },
      {
        user_id: userId,
        stage_name: 'Validación Legal',
        stage_order: 2,
        status: 'pending',
        progress_percentage: 0,
        due_date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        description: 'Revisión y validación de documentos por nuestro equipo legal'
      },
      {
        user_id: userId,
        stage_name: 'Envío a Inmigración',
        stage_order: 3,
        status: 'pending',
        progress_percentage: 0,
        due_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        description: 'Presentación oficial de la solicitud de visa'
      },
      {
        user_id: userId,
        stage_name: 'Procesamiento',
        stage_order: 4,
        status: 'pending',
        progress_percentage: 0,
        due_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        description: 'Revisión por parte de las autoridades de inmigración japonesas'
      },
      {
        user_id: userId,
        stage_name: 'Aprobación',
        stage_order: 5,
        status: 'pending',
        progress_percentage: 0,
        due_date: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        description: 'Aprobación final y emisión de la visa'
      }
    ]

    return this.createStages(userId, defaultStages)
  }
}

// Servicio de Propiedades con Fallback
export class PropertyService {
  static async getProperties(): Promise<Property[]> {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('status', 'available')
        .order('created_at', { ascending: false })

      if (error) {
        console.warn('Supabase table not found, using fallback data:', error)
        return FallbackDataService.getMockProperties()
      }

      return data || []
    } catch (error) {
      console.warn('Error fetching properties, using fallback:', error)
      return FallbackDataService.getMockProperties()
    }
  }

  static async getProperty(propertyId: string): Promise<Property | null> {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', propertyId)
        .single()

      if (error) {
        console.warn('Supabase table not found, property not found:', error)
        return null
      }

      return data
    } catch (error) {
      console.warn('Error fetching property:', error)
      return null
    }
  }

  static async saveProperty(userId: string, propertyId: string, notes?: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_saved_properties')
        .insert({
          user_id: userId,
          property_id: propertyId,
          notes
        })

      if (error) {
        console.warn('Supabase table not found, property not saved:', error)
        return false
      }

      return true
    } catch (error) {
      console.warn('Error saving property:', error)
      return false
    }
  }

  static async getSavedProperties(userId: string): Promise<Property[]> {
    try {
      const { data, error } = await supabase
        .from('user_saved_properties')
        .select(`
          *,
          properties (*)
        `)
        .eq('user_id', userId)
        .order('saved_at', { ascending: false })

      if (error) {
        console.warn('Supabase table not found, no saved properties:', error)
        return []
      }

      return data?.map(item => item.properties).filter(Boolean) as Property[] || []
    } catch (error) {
      console.warn('Error fetching saved properties:', error)
      return []
    }
  }
}

// Servicio de Materiales de Diseño con Fallback
export class DesignMaterialService {
  static async getMaterials(category?: string): Promise<DesignMaterial[]> {
    try {
      let query = supabase
        .from('design_materials')
        .select('*')
        .order('created_at', { ascending: false })

      if (category && category !== 'all') {
        query = query.eq('category', category)
      }

      const { data, error } = await query

      if (error) {
        console.warn('Supabase table not found, using fallback data:', error)
        return FallbackDataService.getMockMaterials()
      }

      return data || []
    } catch (error) {
      console.warn('Error fetching materials, using fallback:', error)
      return FallbackDataService.getMockMaterials()
    }
  }

  static async getMaterial(materialId: string): Promise<DesignMaterial | null> {
    try {
      const { data, error } = await supabase
        .from('design_materials')
        .select('*')
        .eq('id', materialId)
        .single()

      if (error) {
        console.warn('Supabase table not found, material not found:', error)
        return null
      }

      return data
    } catch (error) {
      console.warn('Error fetching material:', error)
      return null
    }
  }

  static async favoriteMaterial(userId: string, materialId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_favorite_materials')
        .insert({
          user_id: userId,
          material_id: materialId
        })

      if (error) {
        console.warn('Supabase table not found, material not favorited:', error)
        return false
      }

      return true
    } catch (error) {
      console.warn('Error favoriting material:', error)
      return false
    }
  }

  static async unfavoriteMaterial(userId: string, materialId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_favorite_materials')
        .delete()
        .eq('user_id', userId)
        .eq('material_id', materialId)

      if (error) {
        console.warn('Supabase table not found, material not unfavorited:', error)
        return false
      }

      return true
    } catch (error) {
      console.warn('Error unfavoriting material:', error)
      return false
    }
  }

  static async getFavoriteMaterials(userId: string): Promise<DesignMaterial[]> {
    try {
      const { data, error } = await supabase
        .from('user_favorite_materials')
        .select(`
          *,
          design_materials (*)
        `)
        .eq('user_id', userId)
        .order('favorited_at', { ascending: false })

      if (error) {
        console.warn('Supabase table not found, no favorite materials:', error)
        return []
      }

      return data?.map(item => item.design_materials).filter(Boolean) as DesignMaterial[] || []
    } catch (error) {
      console.warn('Error fetching favorite materials:', error)
      return []
    }
  }
}

// Servicio de Notificaciones Inteligentes con Fallback
export class NotificationService {
  static async getNotifications(userId: string): Promise<IntelligentNotification[]> {
    try {
      const { data, error } = await supabase
        .from('intelligent_notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) {
        console.warn('Supabase table not found, no notifications:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.warn('Error fetching notifications:', error)
      return []
    }
  }

  static async createNotification(notification: IntelligentNotificationInsert): Promise<IntelligentNotification | null> {
    try {
      const { data, error } = await supabase
        .from('intelligent_notifications')
        .insert(notification)
        .select()
        .single()

      if (error) {
        console.warn('Supabase table not found, notification not created:', error)
        return null
      }

      return data
    } catch (error) {
      console.warn('Error creating notification:', error)
      return null
    }
  }

  static async markAsRead(notificationId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('intelligent_notifications')
        .update({
          read: true,
          read_at: new Date().toISOString()
        })
        .eq('id', notificationId)

      if (error) {
        console.warn('Supabase table not found, notification not marked as read:', error)
        return false
      }

      return true
    } catch (error) {
      console.warn('Error marking notification as read:', error)
      return false
    }
  }

  static async getUnreadCount(userId: string): Promise<number> {
    try {
      const { count, error } = await supabase
        .from('intelligent_notifications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('read', false)

      if (error) {
        console.warn('Supabase table not found, unread count not available:', error)
        return 0
      }

      return count || 0
    } catch (error) {
      console.warn('Error getting unread count:', error)
      return 0
    }
  }
}
