// Tipos de Base de Datos para Supabase
export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          email: string
          name: string | null
          primary_goal: 'invertir' | 'migrar' | 'vivir' | null
          onboarding_completed: boolean
          created_at: string
          updated_at: string
          budget_range: string | null
          timeline: string | null
          family_size: number | null
          preferred_locations: string[] | null
          interests: string[] | null
          last_activity: string
          inactivity_days: number
          is_active: boolean
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          primary_goal?: 'invertir' | 'migrar' | 'vivir' | null
          onboarding_completed?: boolean
          budget_range?: string | null
          timeline?: string | null
          family_size?: number | null
          preferred_locations?: string[] | null
          interests?: string[] | null
          last_activity?: string
          inactivity_days?: number
          is_active?: boolean
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          primary_goal?: 'invertir' | 'migrar' | 'vivir' | null
          onboarding_completed?: boolean
          budget_range?: string | null
          timeline?: string | null
          family_size?: number | null
          preferred_locations?: string[] | null
          interests?: string[] | null
          last_activity?: string
          inactivity_days?: number
          is_active?: boolean
        }
      }
      visa_documents: {
        Row: {
          id: string
          user_id: string
          document_type: string
          document_name: string
          status: 'pending' | 'uploaded' | 'validating' | 'approved' | 'rejected'
          file_url: string | null
          file_size: number | null
          mime_type: string | null
          uploaded_at: string | null
          validated_at: string | null
          validation_notes: string | null
          rejection_reason: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          document_type: string
          document_name: string
          status?: 'pending' | 'uploaded' | 'validating' | 'approved' | 'rejected'
          file_url?: string | null
          file_size?: number | null
          mime_type?: string | null
          uploaded_at?: string | null
          validated_at?: string | null
          validation_notes?: string | null
          rejection_reason?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          document_type?: string
          document_name?: string
          status?: 'pending' | 'uploaded' | 'validating' | 'approved' | 'rejected'
          file_url?: string | null
          file_size?: number | null
          mime_type?: string | null
          uploaded_at?: string | null
          validated_at?: string | null
          validation_notes?: string | null
          rejection_reason?: string | null
        }
      }
      visa_stages: {
        Row: {
          id: string
          user_id: string
          stage_name: string
          stage_order: number
          status: 'pending' | 'in_progress' | 'completed' | 'blocked'
          progress_percentage: number
          due_date: string | null
          completed_date: string | null
          description: string | null
          required_documents: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          stage_name: string
          stage_order: number
          status?: 'pending' | 'in_progress' | 'completed' | 'blocked'
          progress_percentage?: number
          due_date?: string | null
          completed_date?: string | null
          description?: string | null
          required_documents?: string[] | null
        }
        Update: {
          id?: string
          user_id?: string
          stage_name?: string
          stage_order?: number
          status?: 'pending' | 'in_progress' | 'completed' | 'blocked'
          progress_percentage?: number
          due_date?: string | null
          completed_date?: string | null
          description?: string | null
          required_documents?: string[] | null
        }
      }
      properties: {
        Row: {
          id: string
          title: string
          location: string
          price: number
          area: number
          year: number | null
          roi: number | null
          monthly_income: number | null
          description: string | null
          features: string[] | null
          images: string[] | null
          status: 'available' | 'under_analysis' | 'sold' | 'exclusive'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          location: string
          price: number
          area: number
          year?: number | null
          roi?: number | null
          monthly_income?: number | null
          description?: string | null
          features?: string[] | null
          images?: string[] | null
          status?: 'available' | 'under_analysis' | 'sold' | 'exclusive'
        }
        Update: {
          id?: string
          title?: string
          location?: string
          price?: number
          area?: number
          year?: number | null
          roi?: number | null
          monthly_income?: number | null
          description?: string | null
          features?: string[] | null
          images?: string[] | null
          status?: 'available' | 'under_analysis' | 'sold' | 'exclusive'
        }
      }
      design_materials: {
        Row: {
          id: string
          name: string
          category: string
          color_hex: string | null
          texture_url: string | null
          price: number
          sustainability_rating: 'A+' | 'A' | 'B' | 'C'
          description: string | null
          features: string[] | null
          applications: string[] | null
          is_new: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category: string
          color_hex?: string | null
          texture_url?: string | null
          price: number
          sustainability_rating?: 'A+' | 'A' | 'B' | 'C'
          description?: string | null
          features?: string[] | null
          applications?: string[] | null
          is_new?: boolean
        }
        Update: {
          id?: string
          name?: string
          category?: string
          color_hex?: string | null
          texture_url?: string | null
          price?: number
          sustainability_rating?: 'A+' | 'A' | 'B' | 'C'
          description?: string | null
          features?: string[] | null
          applications?: string[] | null
          is_new?: boolean
        }
      }
      intelligent_notifications: {
        Row: {
          id: string
          user_id: string
          type: 'match' | 'inspiration' | 'progress' | 'milestone' | 'exclusive'
          title: string
          message: string
          action_label: string | null
          action_href: string | null
          priority: 'high' | 'medium' | 'low'
          read: boolean
          created_at: string
          read_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          type: 'match' | 'inspiration' | 'progress' | 'milestone' | 'exclusive'
          title: string
          message: string
          action_label?: string | null
          action_href?: string | null
          priority?: 'high' | 'medium' | 'low'
          read?: boolean
          read_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'match' | 'inspiration' | 'progress' | 'milestone' | 'exclusive'
          title?: string
          message?: string
          action_label?: string | null
          action_href?: string | null
          priority?: 'high' | 'medium' | 'low'
          read?: boolean
          read_at?: string | null
        }
      }
    }
  }
}

// Tipos de utilidad
export type UserProfile = Database['public']['Tables']['user_profiles']['Row']
export type VisaDocument = Database['public']['Tables']['visa_documents']['Row']
export type VisaStage = Database['public']['Tables']['visa_stages']['Row']
export type Property = Database['public']['Tables']['properties']['Row']
export type DesignMaterial = Database['public']['Tables']['design_materials']['Row']
export type IntelligentNotification = Database['public']['Tables']['intelligent_notifications']['Row']

// Tipos para inserción
export type UserProfileInsert = Database['public']['Tables']['user_profiles']['Insert']
export type VisaDocumentInsert = Database['public']['Tables']['visa_documents']['Insert']
export type VisaStageInsert = Database['public']['Tables']['visa_stages']['Insert']
export type PropertyInsert = Database['public']['Tables']['properties']['Insert']
export type DesignMaterialInsert = Database['public']['Tables']['design_materials']['Insert']
export type IntelligentNotificationInsert = Database['public']['Tables']['intelligent_notifications']['Insert']

// Tipos para actualización
export type UserProfileUpdate = Database['public']['Tables']['user_profiles']['Update']
export type VisaDocumentUpdate = Database['public']['Tables']['visa_documents']['Update']
export type VisaStageUpdate = Database['public']['Tables']['visa_stages']['Update']
export type PropertyUpdate = Database['public']['Tables']['properties']['Update']
export type DesignMaterialUpdate = Database['public']['Tables']['design_materials']['Update']
export type IntelligentNotificationUpdate = Database['public']['Tables']['intelligent_notifications']['Update']

