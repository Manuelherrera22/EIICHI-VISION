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

// Servicio de Perfiles de Usuario
export class UserProfileService {
  static async getProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error fetching user profile:', error)
      return null
    }

    return data
  }

  static async createProfile(profile: UserProfileInsert): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert(profile)
      .select()
      .single()

    if (error) {
      console.error('Error creating user profile:', error)
      return null
    }

    return data
  }

  static async updateProfile(userId: string, updates: UserProfileUpdate): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (error) {
      console.error('Error updating user profile:', error)
      return null
    }

    return data
  }

  static async updateActivity(userId: string): Promise<void> {
    const { error } = await supabase.rpc('update_user_activity', {
      user_uuid: userId
    })

    if (error) {
      console.error('Error updating user activity:', error)
    }
  }
}

// Servicio de Documentos de Visa
export class VisaDocumentService {
  static async getDocuments(userId: string): Promise<VisaDocument[]> {
    const { data, error } = await supabase
      .from('visa_documents')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching visa documents:', error)
      return []
    }

    return data
  }

  static async createDocument(document: VisaDocumentInsert): Promise<VisaDocument | null> {
    const { data, error } = await supabase
      .from('visa_documents')
      .insert(document)
      .select()
      .single()

    if (error) {
      console.error('Error creating visa document:', error)
      return null
    }

    return data
  }

  static async updateDocument(documentId: string, updates: VisaDocumentUpdate): Promise<VisaDocument | null> {
    const { data, error } = await supabase
      .from('visa_documents')
      .update(updates)
      .eq('id', documentId)
      .select()
      .single()

    if (error) {
      console.error('Error updating visa document:', error)
      return null
    }

    return data
  }

  static async uploadDocument(
    documentId: string, 
    file: File, 
    onProgress?: (progress: number) => void
  ): Promise<string | null> {
    try {
      // Subir archivo a Supabase Storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${documentId}.${fileExt}`
      const filePath = `visa-documents/${fileName}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        })

      if (uploadError) {
        console.error('Error uploading file:', uploadError)
        return null
      }

      // Obtener URL pública
      const { data: urlData } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath)

      // Actualizar documento con URL y metadatos
      await this.updateDocument(documentId, {
        file_url: urlData.publicUrl,
        file_size: file.size,
        mime_type: file.type,
        uploaded_at: new Date().toISOString(),
        status: 'uploaded'
      })

      return urlData.publicUrl
    } catch (error) {
      console.error('Error in upload process:', error)
      return null
    }
  }

  static async validateDocument(documentId: string, validationNotes: string): Promise<boolean> {
    const { error } = await supabase
      .from('visa_documents')
      .update({
        status: 'validating',
        validation_notes: validationNotes,
        validated_at: new Date().toISOString()
      })
      .eq('id', documentId)

    if (error) {
      console.error('Error validating document:', error)
      return false
    }

    return true
  }

  static async approveDocument(documentId: string): Promise<boolean> {
    const { error } = await supabase
      .from('visa_documents')
      .update({
        status: 'approved',
        validated_at: new Date().toISOString()
      })
      .eq('id', documentId)

    if (error) {
      console.error('Error approving document:', error)
      return false
    }

    return true
  }

  static async rejectDocument(documentId: string, rejectionReason: string): Promise<boolean> {
    const { error } = await supabase
      .from('visa_documents')
      .update({
        status: 'rejected',
        rejection_reason: rejectionReason,
        validated_at: new Date().toISOString()
      })
      .eq('id', documentId)

    if (error) {
      console.error('Error rejecting document:', error)
      return false
    }

    return true
  }
}

// Servicio de Etapas de Visa
export class VisaStageService {
  static async getStages(userId: string): Promise<VisaStage[]> {
    const { data, error } = await supabase
      .from('visa_stages')
      .select('*')
      .eq('user_id', userId)
      .order('stage_order', { ascending: true })

    if (error) {
      console.error('Error fetching visa stages:', error)
      return []
    }

    return data
  }

  static async createStages(userId: string, stages: VisaStageInsert[]): Promise<VisaStage[]> {
    const stagesWithUserId = stages.map(stage => ({ ...stage, user_id: userId }))
    
    const { data, error } = await supabase
      .from('visa_stages')
      .insert(stagesWithUserId)
      .select()

    if (error) {
      console.error('Error creating visa stages:', error)
      return []
    }

    return data
  }

  static async updateStage(stageId: string, updates: VisaStageUpdate): Promise<VisaStage | null> {
    const { data, error } = await supabase
      .from('visa_stages')
      .update(updates)
      .eq('id', stageId)
      .select()
      .single()

    if (error) {
      console.error('Error updating visa stage:', error)
      return null
    }

    return data
  }

  static async initializeDefaultStages(userId: string): Promise<VisaStage[]> {
    const defaultStages: VisaStageInsert[] = [
      {
        user_id: userId,
        stage_name: 'Recolección de Documentos',
        stage_order: 1,
        status: 'in_progress',
        progress_percentage: 0,
        due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 días
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
        due_date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 45 días
        description: 'Revisión y validación de documentos por nuestro equipo legal'
      },
      {
        user_id: userId,
        stage_name: 'Envío a Inmigración',
        stage_order: 3,
        status: 'pending',
        progress_percentage: 0,
        due_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 60 días
        description: 'Presentación oficial de la solicitud de visa'
      },
      {
        user_id: userId,
        stage_name: 'Procesamiento',
        stage_order: 4,
        status: 'pending',
        progress_percentage: 0,
        due_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 90 días
        description: 'Revisión por parte de las autoridades de inmigración japonesas'
      },
      {
        user_id: userId,
        stage_name: 'Aprobación',
        stage_order: 5,
        status: 'pending',
        progress_percentage: 0,
        due_date: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 120 días
        description: 'Aprobación final y emisión de la visa'
      }
    ]

    return this.createStages(userId, defaultStages)
  }
}

// Servicio de Propiedades
export class PropertyService {
  static async getProperties(): Promise<Property[]> {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('status', 'available')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching properties:', error)
      return []
    }

    return data
  }

  static async getProperty(propertyId: string): Promise<Property | null> {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', propertyId)
      .single()

    if (error) {
      console.error('Error fetching property:', error)
      return null
    }

    return data
  }

  static async saveProperty(userId: string, propertyId: string, notes?: string): Promise<boolean> {
    const { error } = await supabase
      .from('user_saved_properties')
      .insert({
        user_id: userId,
        property_id: propertyId,
        notes
      })

    if (error) {
      console.error('Error saving property:', error)
      return false
    }

    return true
  }

  static async getSavedProperties(userId: string): Promise<Property[]> {
    const { data, error } = await supabase
      .from('user_saved_properties')
      .select(`
        *,
        properties (*)
      `)
      .eq('user_id', userId)
      .order('saved_at', { ascending: false })

    if (error) {
      console.error('Error fetching saved properties:', error)
      return []
    }

    return data.map(item => item.properties).filter(Boolean) as Property[]
  }
}

// Servicio de Materiales de Diseño
export class DesignMaterialService {
  static async getMaterials(category?: string): Promise<DesignMaterial[]> {
    let query = supabase
      .from('design_materials')
      .select('*')
      .order('created_at', { ascending: false })

    if (category && category !== 'all') {
      query = query.eq('category', category)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching materials:', error)
      return []
    }

    return data
  }

  static async getMaterial(materialId: string): Promise<DesignMaterial | null> {
    const { data, error } = await supabase
      .from('design_materials')
      .select('*')
      .eq('id', materialId)
      .single()

    if (error) {
      console.error('Error fetching material:', error)
      return null
    }

    return data
  }

  static async favoriteMaterial(userId: string, materialId: string): Promise<boolean> {
    const { error } = await supabase
      .from('user_favorite_materials')
      .insert({
        user_id: userId,
        material_id: materialId
      })

    if (error) {
      console.error('Error favoriting material:', error)
      return false
    }

    return true
  }

  static async unfavoriteMaterial(userId: string, materialId: string): Promise<boolean> {
    const { error } = await supabase
      .from('user_favorite_materials')
      .delete()
      .eq('user_id', userId)
      .eq('material_id', materialId)

    if (error) {
      console.error('Error unfavoriting material:', error)
      return false
    }

    return true
  }

  static async getFavoriteMaterials(userId: string): Promise<DesignMaterial[]> {
    const { data, error } = await supabase
      .from('user_favorite_materials')
      .select(`
        *,
        design_materials (*)
      `)
      .eq('user_id', userId)
      .order('favorited_at', { ascending: false })

    if (error) {
      console.error('Error fetching favorite materials:', error)
      return []
    }

    return data.map(item => item.design_materials).filter(Boolean) as DesignMaterial[]
  }
}

// Servicio de Notificaciones Inteligentes
export class NotificationService {
  static async getNotifications(userId: string): Promise<IntelligentNotification[]> {
    const { data, error } = await supabase
      .from('intelligent_notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) {
      console.error('Error fetching notifications:', error)
      return []
    }

    return data
  }

  static async createNotification(notification: IntelligentNotificationInsert): Promise<IntelligentNotification | null> {
    const { data, error } = await supabase
      .from('intelligent_notifications')
      .insert(notification)
      .select()
      .single()

    if (error) {
      console.error('Error creating notification:', error)
      return null
    }

    return data
  }

  static async markAsRead(notificationId: string): Promise<boolean> {
    const { error } = await supabase
      .from('intelligent_notifications')
      .update({
        read: true,
        read_at: new Date().toISOString()
      })
      .eq('id', notificationId)

    if (error) {
      console.error('Error marking notification as read:', error)
      return false
    }

    return true
  }

  static async getUnreadCount(userId: string): Promise<number> {
    const { count, error } = await supabase
      .from('intelligent_notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('read', false)

    if (error) {
      console.error('Error getting unread count:', error)
      return 0
    }

    return count || 0
  }
}







