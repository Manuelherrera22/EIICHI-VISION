-- Esquema de Base de Datos para Tabiji House
-- Gestor de Documentos y Sistema de Migración

-- Tabla de perfiles de usuario extendida
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  primary_goal TEXT CHECK (primary_goal IN ('invertir', 'migrar', 'vivir')),
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Información adicional del onboarding
  budget_range TEXT,
  timeline TEXT,
  family_size INTEGER,
  preferred_locations TEXT[],
  interests TEXT[],
  
  -- Metadatos de actividad
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  inactivity_days INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE
);

-- Tabla de documentos de visa
CREATE TABLE IF NOT EXISTS visa_documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL,
  document_name TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending', 'uploaded', 'validating', 'approved', 'rejected')) DEFAULT 'pending',
  file_url TEXT,
  file_size INTEGER,
  mime_type TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE,
  validated_at TIMESTAMP WITH TIME ZONE,
  validation_notes TEXT,
  rejection_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de etapas de visa
CREATE TABLE IF NOT EXISTS visa_stages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  stage_name TEXT NOT NULL,
  stage_order INTEGER NOT NULL,
  status TEXT CHECK (status IN ('pending', 'in_progress', 'completed', 'blocked')) DEFAULT 'pending',
  progress_percentage INTEGER DEFAULT 0,
  due_date DATE,
  completed_date DATE,
  description TEXT,
  required_documents TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de propiedades (para inversores)
CREATE TABLE IF NOT EXISTS properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  price INTEGER NOT NULL,
  area INTEGER NOT NULL,
  year INTEGER,
  roi DECIMAL(5,2),
  monthly_income INTEGER,
  description TEXT,
  features TEXT[],
  images TEXT[],
  status TEXT CHECK (status IN ('available', 'under_analysis', 'sold', 'exclusive')) DEFAULT 'available',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de propiedades guardadas por usuario
CREATE TABLE IF NOT EXISTS user_saved_properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT,
  UNIQUE(user_id, property_id)
);

-- Tabla de materiales de diseño
CREATE TABLE IF NOT EXISTS design_materials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  color_hex TEXT,
  texture_url TEXT,
  price INTEGER NOT NULL,
  sustainability_rating TEXT CHECK (sustainability_rating IN ('A+', 'A', 'B', 'C')) DEFAULT 'A',
  description TEXT,
  features TEXT[],
  applications TEXT[],
  is_new BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de materiales favoritos
CREATE TABLE IF NOT EXISTS user_favorite_materials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  material_id UUID REFERENCES design_materials(id) ON DELETE CASCADE,
  favorited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, material_id)
);

-- Tabla de notificaciones inteligentes
CREATE TABLE IF NOT EXISTS intelligent_notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('match', 'inspiration', 'progress', 'milestone', 'exclusive')) NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  action_label TEXT,
  action_href TEXT,
  priority TEXT CHECK (priority IN ('high', 'medium', 'low')) DEFAULT 'medium',
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_at TIMESTAMP WITH TIME ZONE
);

-- Tabla de contenido del pulso semanal
CREATE TABLE IF NOT EXISTS weekly_pulse_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  week_start DATE NOT NULL,
  content_type TEXT CHECK (content_type IN ('opportunity', 'wisdom', 'story', 'step_by_step', 'calm', 'inspiration')) NOT NULL,
  title TEXT NOT NULL,
  content JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de actividad del usuario
CREATE TABLE IF NOT EXISTS user_activity_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL,
  activity_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para optimización
CREATE INDEX IF NOT EXISTS idx_user_profiles_primary_goal ON user_profiles(primary_goal);
CREATE INDEX IF NOT EXISTS idx_visa_documents_user_id ON visa_documents(user_id);
CREATE INDEX IF NOT EXISTS idx_visa_documents_status ON visa_documents(status);
CREATE INDEX IF NOT EXISTS idx_visa_stages_user_id ON visa_stages(user_id);
CREATE INDEX IF NOT EXISTS idx_visa_stages_status ON visa_stages(status);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON intelligent_notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON intelligent_notifications(read);
CREATE INDEX IF NOT EXISTS idx_activity_log_user_id ON user_activity_log(user_id);

-- Funciones de actualización automática
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar updated_at
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_visa_documents_updated_at BEFORE UPDATE ON visa_documents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_visa_stages_updated_at BEFORE UPDATE ON visa_stages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_design_materials_updated_at BEFORE UPDATE ON design_materials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Función para actualizar actividad del usuario
CREATE OR REPLACE FUNCTION update_user_activity(user_uuid UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE user_profiles 
    SET last_activity = NOW(), inactivity_days = 0, is_active = TRUE
    WHERE id = user_uuid;
    
    INSERT INTO user_activity_log (user_id, activity_type, activity_data)
    VALUES (user_uuid, 'dashboard_access', '{"timestamp": "' || NOW() || '"}');
END;
$$ language 'plpgsql';

-- Función para calcular días de inactividad
CREATE OR REPLACE FUNCTION calculate_inactivity_days()
RETURNS VOID AS $$
BEGIN
    UPDATE user_profiles 
    SET inactivity_days = EXTRACT(DAY FROM NOW() - last_activity),
        is_active = CASE 
            WHEN EXTRACT(DAY FROM NOW() - last_activity) < 7 THEN TRUE 
            ELSE FALSE 
        END;
END;
$$ language 'plpgsql';

-- Políticas de seguridad RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE visa_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE visa_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_saved_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorite_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE intelligent_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_pulse_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity_log ENABLE ROW LEVEL SECURITY;

-- Políticas para user_profiles
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas para visa_documents
CREATE POLICY "Users can view own documents" ON visa_documents FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own documents" ON visa_documents FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own documents" ON visa_documents FOR UPDATE USING (auth.uid() = user_id);

-- Políticas para visa_stages
CREATE POLICY "Users can view own stages" ON visa_stages FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own stages" ON visa_stages FOR UPDATE USING (auth.uid() = user_id);

-- Políticas para propiedades (lectura pública)
CREATE POLICY "Anyone can view properties" ON properties FOR SELECT USING (true);

-- Políticas para user_saved_properties
CREATE POLICY "Users can manage own saved properties" ON user_saved_properties FOR ALL USING (auth.uid() = user_id);

-- Políticas para materiales (lectura pública)
CREATE POLICY "Anyone can view materials" ON design_materials FOR SELECT USING (true);

-- Políticas para user_favorite_materials
CREATE POLICY "Users can manage own favorite materials" ON user_favorite_materials FOR ALL USING (auth.uid() = user_id);

-- Políticas para notificaciones
CREATE POLICY "Users can view own notifications" ON intelligent_notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON intelligent_notifications FOR UPDATE USING (auth.uid() = user_id);

-- Políticas para contenido del pulso semanal
CREATE POLICY "Users can view own weekly content" ON weekly_pulse_content FOR SELECT USING (auth.uid() = user_id);

-- Políticas para actividad del usuario
CREATE POLICY "Users can view own activity" ON user_activity_log FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own activity" ON user_activity_log FOR INSERT WITH CHECK (auth.uid() = user_id);
