-- 🗄️ TABLAS DE BASE DE DATOS PARA SISTEMA TABIJI HOUSE
-- Script SQL para crear todas las tablas necesarias en Supabase

-- ==============================================
-- 1. TABLA DE PERFILES DE USUARIO (Ya existe)
-- ==============================================
-- Esta tabla ya existe en tu sistema actual

-- ==============================================
-- 2. TABLA DE RESULTADOS DE ANÁLISIS
-- ==============================================
CREATE TABLE IF NOT EXISTS analysis_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  analysis_type VARCHAR(50) NOT NULL,
  scores JSONB NOT NULL,
  insights TEXT[] NOT NULL,
  recommendations TEXT[] NOT NULL,
  confidence INTEGER NOT NULL CHECK (confidence >= 0 AND confidence <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para analysis_results
CREATE INDEX IF NOT EXISTS idx_analysis_results_user_id ON analysis_results(user_id);
CREATE INDEX IF NOT EXISTS idx_analysis_results_type ON analysis_results(analysis_type);
CREATE INDEX IF NOT EXISTS idx_analysis_results_created_at ON analysis_results(created_at);

-- ==============================================
-- 3. TABLA DE PREDICCIONES IA
-- ==============================================
CREATE TABLE IF NOT EXISTS ai_predictions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  prediction_type VARCHAR(50) NOT NULL,
  timeframe VARCHAR(20) NOT NULL,
  prediction JSONB NOT NULL,
  recommendations TEXT[] NOT NULL,
  risks TEXT[] NOT NULL,
  opportunities TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para ai_predictions
CREATE INDEX IF NOT EXISTS idx_ai_predictions_user_id ON ai_predictions(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_predictions_type ON ai_predictions(prediction_type);
CREATE INDEX IF NOT EXISTS idx_ai_predictions_timeframe ON ai_predictions(timeframe);

-- ==============================================
-- 4. TABLA DE PROPIEDADES
-- ==============================================
CREATE TABLE IF NOT EXISTS properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(15,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'JPY',
  location JSONB NOT NULL,
  property_type VARCHAR(50) NOT NULL,
  size JSONB NOT NULL,
  features TEXT[],
  images TEXT[],
  status VARCHAR(20) DEFAULT 'available',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para properties
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_location ON properties USING GIN(location);

-- ==============================================
-- 5. TABLA DE DATOS DE MERCADO
-- ==============================================
CREATE TABLE IF NOT EXISTS market_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  region VARCHAR(100) NOT NULL,
  prefecture VARCHAR(100) NOT NULL,
  city VARCHAR(100),
  property_type VARCHAR(50) NOT NULL,
  average_price DECIMAL(15,2) NOT NULL,
  price_per_sqm DECIMAL(10,2),
  price_change DECIMAL(10,2),
  price_change_percent DECIMAL(5,2),
  volume INTEGER,
  volume_change INTEGER,
  days_on_market INTEGER,
  market_trend VARCHAR(20),
  confidence INTEGER CHECK (confidence >= 0 AND confidence <= 100),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para market_data
CREATE INDEX IF NOT EXISTS idx_market_data_region ON market_data(region);
CREATE INDEX IF NOT EXISTS idx_market_data_prefecture ON market_data(prefecture);
CREATE INDEX IF NOT EXISTS idx_market_data_type ON market_data(property_type);
CREATE INDEX IF NOT EXISTS idx_market_data_updated ON market_data(last_updated);

-- ==============================================
-- 6. TABLA DE RESPUESTAS IA
-- ==============================================
CREATE TABLE IF NOT EXISTS ai_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  analysis_type VARCHAR(50) NOT NULL,
  response JSONB NOT NULL,
  model VARCHAR(100) NOT NULL,
  tokens_used INTEGER,
  processing_time INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para ai_responses
CREATE INDEX IF NOT EXISTS idx_ai_responses_user_id ON ai_responses(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_responses_type ON ai_responses(analysis_type);
CREATE INDEX IF NOT EXISTS idx_ai_responses_model ON ai_responses(model);

-- ==============================================
-- 7. TABLA DE HISTORIAL DE CHAT IA
-- ==============================================
CREATE TABLE IF NOT EXISTS ai_chat_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  response TEXT NOT NULL,
  context JSONB,
  processing_time INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para ai_chat_history
CREATE INDEX IF NOT EXISTS idx_ai_chat_user_id ON ai_chat_history(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_chat_created_at ON ai_chat_history(created_at);

-- ==============================================
-- 8. TABLA DE RECOMENDACIONES
-- ==============================================
CREATE TABLE IF NOT EXISTS recommendations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  priority VARCHAR(20) NOT NULL,
  confidence INTEGER NOT NULL CHECK (confidence >= 0 AND confidence <= 100),
  impact VARCHAR(20) NOT NULL,
  timeframe VARCHAR(50) NOT NULL,
  cost DECIMAL(15,2),
  effort VARCHAR(20) NOT NULL,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para recommendations
CREATE INDEX IF NOT EXISTS idx_recommendations_user_id ON recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_type ON recommendations(type);
CREATE INDEX IF NOT EXISTS idx_recommendations_priority ON recommendations(priority);
CREATE INDEX IF NOT EXISTS idx_recommendations_category ON recommendations(category);

-- ==============================================
-- 9. TABLA DE FEEDBACK DE RECOMENDACIONES
-- ==============================================
CREATE TABLE IF NOT EXISTS recommendation_feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  recommendation_id UUID REFERENCES recommendations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  feedback TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para recommendation_feedback
CREATE INDEX IF NOT EXISTS idx_feedback_recommendation_id ON recommendation_feedback(recommendation_id);
CREATE INDEX IF NOT EXISTS idx_feedback_user_id ON recommendation_feedback(user_id);

-- ==============================================
-- 10. TABLA DE RECOMENDACIONES DE PROPIEDADES
-- ==============================================
CREATE TABLE IF NOT EXISTS property_recommendations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  recommendations UUID[] NOT NULL,
  preferences JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para property_recommendations
CREATE INDEX IF NOT EXISTS idx_prop_rec_user_id ON property_recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_prop_rec_created_at ON property_recommendations(created_at);

-- ==============================================
-- 11. TABLA DE ANÁLISIS DE MERCADO
-- ==============================================
CREATE TABLE IF NOT EXISTS market_analyses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  region VARCHAR(100) NOT NULL,
  prefecture VARCHAR(100) NOT NULL,
  property_type VARCHAR(50) NOT NULL,
  timeframe VARCHAR(20) NOT NULL,
  analysis JSONB NOT NULL,
  insights TEXT[] NOT NULL,
  predictions JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para market_analyses
CREATE INDEX IF NOT EXISTS idx_market_analyses_user_id ON market_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_market_analyses_region ON market_analyses(region);
CREATE INDEX IF NOT EXISTS idx_market_analyses_type ON market_analyses(property_type);

-- ==============================================
-- 12. TABLA DE INSIGHTS DE MERCADO
-- ==============================================
CREATE TABLE IF NOT EXISTS market_insights (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  region VARCHAR(100) NOT NULL,
  insight TEXT NOT NULL,
  confidence INTEGER NOT NULL CHECK (confidence >= 0 AND confidence <= 100),
  impact VARCHAR(20) NOT NULL,
  timeframe VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para market_insights
CREATE INDEX IF NOT EXISTS idx_market_insights_region ON market_insights(region);
CREATE INDEX IF NOT EXISTS idx_market_insights_created_at ON market_insights(created_at);

-- ==============================================
-- 13. TABLA DE INTERACCIONES DE USUARIO
-- ==============================================
CREATE TABLE IF NOT EXISTS user_interactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  interaction_type VARCHAR(50) NOT NULL,
  target_id UUID,
  target_type VARCHAR(50),
  data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para user_interactions
CREATE INDEX IF NOT EXISTS idx_interactions_user_id ON user_interactions(user_id);
CREATE INDEX IF NOT EXISTS idx_interactions_type ON user_interactions(interaction_type);
CREATE INDEX IF NOT EXISTS idx_interactions_target ON user_interactions(target_id, target_type);

-- ==============================================
-- 14. TABLA DE SCORING HISTORY
-- ==============================================
CREATE TABLE IF NOT EXISTS scoring_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  score_type VARCHAR(20) NOT NULL, -- 'IVI', 'IVM', 'ISE'
  score_value DECIMAL(5,2) NOT NULL,
  factors JSONB NOT NULL,
  calculation_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para scoring_history
CREATE INDEX IF NOT EXISTS idx_scoring_user_id ON scoring_history(user_id);
CREATE INDEX IF NOT EXISTS idx_scoring_type ON scoring_history(score_type);
CREATE INDEX IF NOT EXISTS idx_scoring_created_at ON scoring_history(created_at);

-- ==============================================
-- 15. TABLA DE CONFIGURACIÓN DEL SISTEMA
-- ==============================================
CREATE TABLE IF NOT EXISTS system_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  config_key VARCHAR(100) UNIQUE NOT NULL,
  config_value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para system_config
CREATE INDEX IF NOT EXISTS idx_system_config_key ON system_config(config_key);

-- ==============================================
-- 16. INSERTAR CONFIGURACIONES INICIALES
-- ==============================================
INSERT INTO system_config (config_key, config_value, description) VALUES
('ai_models', '{"claude": "claude-3.5-sonnet", "gpt": "gpt-4o", "gemini": "gemini-pro"}', 'Configuración de modelos de IA'),
('scoring_weights', '{"IVI": {"budget": 0.3, "experience": 0.25, "liquidity": 0.2, "risk": 0.25}, "IVM": {"family": 0.3, "cultural": 0.3, "language": 0.2, "values": 0.2}, "ISE": {"cultural_affinity": 0.4, "values": 0.3, "interests": 0.3}}', 'Pesos para cálculo de scores'),
('market_regions', '["Tokyo", "Osaka", "Kyoto", "Yokohama", "Nagoya", "Fukuoka", "Sapporo", "Sendai"]', 'Regiones de mercado disponibles'),
('property_types', '["apartment", "house", "commercial", "land", "condo", "mansion"]', 'Tipos de propiedades disponibles'),
('analysis_confidence_thresholds', '{"low": 60, "medium": 75, "high": 85}', 'Umbrales de confianza para análisis')
ON CONFLICT (config_key) DO NOTHING;

-- ==============================================
-- 17. INSERTAR DATOS DE MERCADO DE EJEMPLO
-- ==============================================
INSERT INTO market_data (region, prefecture, city, property_type, average_price, price_per_sqm, price_change, price_change_percent, volume, market_trend, confidence) VALUES
('Kanto', 'Tokyo', 'Shibuya', 'apartment', 85000000, 1200000, 2500000, 3.0, 45, 'rising', 85),
('Kanto', 'Tokyo', 'Shinjuku', 'apartment', 78000000, 1150000, 1800000, 2.4, 38, 'rising', 82),
('Kansai', 'Osaka', 'Namba', 'apartment', 45000000, 800000, 1200000, 2.7, 28, 'rising', 78),
('Kansai', 'Osaka', 'Umeda', 'apartment', 52000000, 900000, 1500000, 3.0, 32, 'rising', 80),
('Kanto', 'Tokyo', 'Roppongi', 'apartment', 95000000, 1300000, 3000000, 3.2, 25, 'rising', 88),
('Kansai', 'Kyoto', 'Gion', 'house', 65000000, 1100000, 2000000, 3.2, 15, 'rising', 75),
('Kanto', 'Yokohama', 'Minato Mirai', 'apartment', 68000000, 950000, 1800000, 2.7, 22, 'rising', 80),
('Chubu', 'Nagoya', 'Sakae', 'apartment', 38000000, 700000, 1000000, 2.7, 18, 'rising', 75)
ON CONFLICT DO NOTHING;

-- ==============================================
-- 18. INSERTAR PROPIEDADES DE EJEMPLO
-- ==============================================
INSERT INTO properties (title, description, price, location, property_type, size, features, images) VALUES
('Modern Apartment in Shibuya', 'Beautiful modern apartment in the heart of Shibuya with excellent connectivity', 85000000, '{"address": "1-2-3 Shibuya, Shibuya-ku, Tokyo", "city": "Tokyo", "prefecture": "Tokyo", "coordinates": {"lat": 35.6580, "lng": 139.7016}}', 'apartment', '{"area": 65, "rooms": 2, "bathrooms": 1}', '["near_station", "modern", "balcony", "elevator"]', '["https://example.com/image1.jpg", "https://example.com/image2.jpg"]'),
('Traditional House in Kyoto', 'Authentic Japanese house in historic Gion district', 65000000, '{"address": "2-3-4 Gion, Higashiyama-ku, Kyoto", "city": "Kyoto", "prefecture": "Kyoto", "coordinates": {"lat": 35.0038, "lng": 135.7745}}', 'house', '{"area": 120, "rooms": 4, "bathrooms": 2}', '["traditional", "garden", "tatami", "near_temple"]', '["https://example.com/image3.jpg", "https://example.com/image4.jpg"]'),
('Commercial Space in Osaka', 'Prime commercial space in Namba district', 45000000, '{"address": "3-4-5 Namba, Chuo-ku, Osaka", "city": "Osaka", "prefecture": "Osaka", "coordinates": {"lat": 34.6684, "lng": 135.5006}}', 'commercial', '{"area": 80, "rooms": 1, "bathrooms": 1}', '["commercial", "high_traffic", "near_station", "parking"]', '["https://example.com/image5.jpg"]')
ON CONFLICT DO NOTHING;

-- ==============================================
-- 19. CREAR TRIGGERS PARA ACTUALIZACIÓN AUTOMÁTICA
-- ==============================================

-- Trigger para actualizar updated_at en analysis_results
CREATE OR REPLACE FUNCTION update_analysis_results_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_analysis_results_updated_at
  BEFORE UPDATE ON analysis_results
  FOR EACH ROW
  EXECUTE FUNCTION update_analysis_results_updated_at();

-- Trigger para actualizar updated_at en properties
CREATE OR REPLACE FUNCTION update_properties_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_properties_updated_at();

-- ==============================================
-- 20. CREAR VISTAS ÚTILES
-- ==============================================

-- Vista para análisis de usuario completo
CREATE OR REPLACE VIEW user_analysis_summary AS
SELECT 
  u.id as user_id,
  u.email,
  p.full_name,
  p.primary_goal,
  p.intelligent_scores,
  ar.analysis_type,
  ar.confidence,
  ar.created_at as last_analysis
FROM auth.users u
LEFT JOIN user_profiles p ON u.id = p.id
LEFT JOIN LATERAL (
  SELECT analysis_type, confidence, created_at
  FROM analysis_results
  WHERE user_id = u.id
  ORDER BY created_at DESC
  LIMIT 1
) ar ON true;

-- Vista para estadísticas de mercado
CREATE OR REPLACE VIEW market_statistics AS
SELECT 
  region,
  prefecture,
  property_type,
  AVG(average_price) as avg_price,
  AVG(price_change_percent) as avg_price_change,
  SUM(volume) as total_volume,
  COUNT(*) as data_points,
  MAX(last_updated) as last_updated
FROM market_data
GROUP BY region, prefecture, property_type;

-- ==============================================
-- 21. CREAR FUNCIONES DE UTILIDAD
-- ==============================================

-- Función para calcular score promedio de usuario
CREATE OR REPLACE FUNCTION get_user_average_score(user_uuid UUID)
RETURNS DECIMAL(5,2) AS $$
DECLARE
  avg_score DECIMAL(5,2);
BEGIN
  SELECT AVG(score_value) INTO avg_score
  FROM scoring_history
  WHERE user_id = user_uuid;
  
  RETURN COALESCE(avg_score, 0);
END;
$$ LANGUAGE plpgsql;

-- Función para obtener recomendaciones activas
CREATE OR REPLACE FUNCTION get_active_recommendations(user_uuid UUID)
RETURNS TABLE (
  id UUID,
  title VARCHAR(255),
  description TEXT,
  priority VARCHAR(20),
  confidence INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT r.id, r.title, r.description, r.priority, r.confidence
  FROM recommendations r
  WHERE r.user_id = user_uuid
  ORDER BY 
    CASE r.priority 
      WHEN 'high' THEN 1 
      WHEN 'medium' THEN 2 
      WHEN 'low' THEN 3 
    END,
    r.confidence DESC;
END;
$$ LANGUAGE plpgsql;

-- ==============================================
-- 22. COMENTARIOS Y DOCUMENTACIÓN
-- ==============================================

COMMENT ON TABLE analysis_results IS 'Almacena resultados de análisis inteligente de usuarios';
COMMENT ON TABLE ai_predictions IS 'Predicciones generadas por IA para usuarios';
COMMENT ON TABLE properties IS 'Catálogo de propiedades inmobiliarias';
COMMENT ON TABLE market_data IS 'Datos de mercado inmobiliario por región';
COMMENT ON TABLE recommendations IS 'Recomendaciones personalizadas para usuarios';
COMMENT ON TABLE user_interactions IS 'Registro de interacciones de usuarios con el sistema';

-- ==============================================
-- SCRIPT COMPLETADO
-- ==============================================

-- Este script crea toda la estructura de base de datos necesaria
-- para el sistema Tabiji House con análisis inteligente, IA y recomendaciones.

-- Para ejecutar:
-- 1. Conecta a tu proyecto Supabase
-- 2. Ve a SQL Editor
-- 3. Ejecuta este script completo
-- 4. Verifica que todas las tablas se crearon correctamente
