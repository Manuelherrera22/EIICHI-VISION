-- Esquema de Base de Datos para Propiedades Fraccionadas - Tabiji House
-- Sistema completo de inversión fraccionada

-- ==============================================
-- TABLA DE PROPIEDADES FRACCIONADAS
-- ==============================================
CREATE TABLE IF NOT EXISTS fractional_properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL, -- Identificador legible único para las propiedades
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  prefecture TEXT NOT NULL,
  total_value INTEGER NOT NULL,
  total_shares INTEGER NOT NULL,
  price_per_share INTEGER NOT NULL,
  available_shares INTEGER NOT NULL,
  sold_shares INTEGER DEFAULT 0,
  images TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  renovation_status TEXT CHECK (renovation_status IN ('original', 'renovated', 'luxury')) DEFAULT 'original',
  estimated_roi DECIMAL(5,2) NOT NULL,
  monthly_rental_income INTEGER NOT NULL,
  property_type TEXT CHECK (property_type IN ('akiya', 'modern', 'traditional')) DEFAULT 'traditional',
  year_built INTEGER,
  land_size DECIMAL(10,2) NOT NULL,
  building_size DECIMAL(10,2) NOT NULL,
  status TEXT CHECK (status IN ('available', 'funding', 'funded', 'renovating', 'completed')) DEFAULT 'funding',
  funding_goal INTEGER NOT NULL,
  current_funding INTEGER DEFAULT 0,
  funding_progress DECIMAL(5,2) DEFAULT 0,
  expected_completion_date DATE,
  legal_structure TEXT CHECK (legal_structure IN ('spv', 'trust', 'llc')) DEFAULT 'spv',
  minimum_investment INTEGER NOT NULL,
  maximum_investment INTEGER NOT NULL,
  management_fee DECIMAL(5,2) DEFAULT 1.5,
  performance_fee DECIMAL(5,2) DEFAULT 10,
  exit_fee DECIMAL(5,2) DEFAULT 2,
  prospectus_url TEXT,
  legal_agreement_url TEXT,
  financial_projections_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================
-- TABLA DE INVERSIONES FRACCIONADAS
-- ==============================================
CREATE TABLE IF NOT EXISTS fractional_investments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES fractional_properties(id) ON DELETE CASCADE,
  investor_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  shares_purchased INTEGER NOT NULL,
  total_amount INTEGER NOT NULL,
  purchase_date DATE DEFAULT CURRENT_DATE,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')) DEFAULT 'pending',
  payment_method TEXT CHECK (payment_method IN ('stripe', 'bank_transfer', 'crypto')) DEFAULT 'stripe',
  transaction_id TEXT,
  investment_agreement_url TEXT,
  share_certificate_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================
-- TABLA DE PAGOS FRACCIONADOS
-- ==============================================
CREATE TABLE IF NOT EXISTS fractional_payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  investment_id UUID REFERENCES fractional_investments(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'USD',
  status TEXT CHECK (status IN ('pending', 'processing', 'completed', 'failed')) DEFAULT 'pending',
  payment_method TEXT NOT NULL,
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- ==============================================
-- ÍNDICES PARA OPTIMIZACIÓN
-- ==============================================
CREATE INDEX IF NOT EXISTS idx_fractional_properties_status ON fractional_properties(status);
CREATE INDEX IF NOT EXISTS idx_fractional_properties_prefecture ON fractional_properties(prefecture);
CREATE INDEX IF NOT EXISTS idx_fractional_properties_property_type ON fractional_properties(property_type);
CREATE INDEX IF NOT EXISTS idx_fractional_properties_slug ON fractional_properties(slug);
CREATE INDEX IF NOT EXISTS idx_fractional_investments_property_id ON fractional_investments(property_id);
CREATE INDEX IF NOT EXISTS idx_fractional_investments_investor_id ON fractional_investments(investor_id);
CREATE INDEX IF NOT EXISTS idx_fractional_investments_status ON fractional_investments(status);
CREATE INDEX IF NOT EXISTS idx_fractional_payments_investment_id ON fractional_payments(investment_id);
CREATE INDEX IF NOT EXISTS idx_fractional_payments_status ON fractional_payments(status);

-- ==============================================
-- TRIGGERS PARA ACTUALIZAR updated_at
-- ==============================================
CREATE TRIGGER update_fractional_properties_updated_at 
  BEFORE UPDATE ON fractional_properties 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_fractional_investments_updated_at 
  BEFORE UPDATE ON fractional_investments 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================
-- FUNCIÓN PARA ACTUALIZAR PROGRESO DE FINANCIAMIENTO
-- ==============================================
CREATE OR REPLACE FUNCTION update_funding_progress()
RETURNS TRIGGER AS $$
BEGIN
  -- Actualizar current_funding y funding_progress cuando se crea una inversión
  IF TG_OP = 'INSERT' AND NEW.status = 'completed' THEN
    UPDATE fractional_properties
    SET 
      current_funding = current_funding + NEW.total_amount,
      sold_shares = sold_shares + NEW.shares_purchased,
      available_shares = available_shares - NEW.shares_purchased,
      funding_progress = ROUND((current_funding + NEW.total_amount)::DECIMAL / funding_goal * 100, 2),
      status = CASE 
        WHEN (current_funding + NEW.total_amount) >= funding_goal THEN 'funded'
        ELSE 'funding'
      END
    WHERE id = NEW.property_id;
  END IF;
  
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_funding_on_investment
  AFTER INSERT OR UPDATE ON fractional_investments
  FOR EACH ROW
  WHEN (NEW.status = 'completed')
  EXECUTE FUNCTION update_funding_progress();

-- ==============================================
-- POLÍTICAS DE SEGURIDAD RLS
-- ==============================================
ALTER TABLE fractional_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE fractional_investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE fractional_payments ENABLE ROW LEVEL SECURITY;

-- Propiedades fraccionadas: lectura pública, escritura solo para administradores
CREATE POLICY "Anyone can view fractional properties" 
  ON fractional_properties FOR SELECT 
  USING (true);

CREATE POLICY "Only authenticated users can view their investments" 
  ON fractional_investments FOR SELECT 
  USING (auth.uid() = investor_id);

CREATE POLICY "Only authenticated users can create investments" 
  ON fractional_investments FOR INSERT 
  WITH CHECK (auth.uid() = investor_id);

CREATE POLICY "Only authenticated users can view their payments" 
  ON fractional_payments FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM fractional_investments 
      WHERE id = fractional_payments.investment_id 
      AND investor_id = auth.uid()
    )
  );

CREATE POLICY "Only authenticated users can create payments" 
  ON fractional_payments FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM fractional_investments 
      WHERE id = fractional_payments.investment_id 
      AND investor_id = auth.uid()
    )
  );

-- ==============================================
-- DATOS INICIALES - PROPIEDADES REALES
-- ==============================================
-- Insertar propiedades con ON CONFLICT para evitar duplicados
INSERT INTO fractional_properties (
  slug,
  name,
  description,
  location,
  prefecture,
  total_value,
  total_shares,
  price_per_share,
  available_shares,
  sold_shares,
  images,
  features,
  renovation_status,
  estimated_roi,
  monthly_rental_income,
  property_type,
  year_built,
  land_size,
  building_size,
  status,
  funding_goal,
  current_funding,
  funding_progress,
  expected_completion_date,
  legal_structure,
  minimum_investment,
  maximum_investment,
  management_fee,
  performance_fee,
  exit_fee
 ) VALUES 
 (
   'property-a-traditional-villa', -- slug
   'Villa Japonesa Tradicional', -- name
   'Villa japonesa tradicional con arquitectura clásica, vistas a la montaña y jardín privado, ubicada en Tsumagoi Village. Recientemente renovada en 2025, ofrece un retiro sereno en el corazón de Gunma.', -- description
   'Kambara, Tsumagoi Village', -- location
   'Gunma', -- prefecture
   15000000, -- total_value
   10, -- total_shares
   1500000, -- price_per_share
   10, -- available_shares (todas disponibles, no se ha vendido nada)
   0, -- sold_shares (cero ventas hasta el momento)
   ARRAY['/property-a/33239_1.jpg', '/property-a/33239_3.jpg', '/property-a/33239_4.jpg', '/property-a/33239_5.jpg', '/property-a/33239_6.jpg'], -- images
   ARRAY['Arquitectura Tradicional', 'Vistas a la Montaña', 'Jardín Privado', 'Renovado 2025', '2LDK', 'Terreno 471m²', 'Piso 74.14m²', 'Estacionamiento 1 espacio'], -- features
   'renovated', -- renovation_status
   8.5, -- estimated_roi
   120000, -- monthly_rental_income
   'traditional', -- property_type
   1989, -- year_built
   471.00, -- land_size
   74.14, -- building_size
   'funding', -- status
   15000000, -- funding_goal
   0, -- current_funding (cero recaudado, aún no han salido al mercado)
   0.00, -- funding_progress (0% financiado)
   '2025-08-15', -- expected_completion_date
   'spv', -- legal_structure
   1500000, -- minimum_investment
   6000000, -- maximum_investment
   1.5, -- management_fee
   10.0, -- performance_fee
   2.0 -- exit_fee
 ),
 (
   'property-b-modern-retreat', -- slug
   'Retiro Montañoso Moderno', -- name
   'Retiro montañoso moderno con diseño contemporáneo, ventanas grandes y características de eficiencia energética, ubicado en Tsumagoi Village. Perfecto para una escapada elegante con vistas a la montaña.', -- description
   'Kambara, Tsumagoi Village', -- location
   'Gunma', -- prefecture
   10000000, -- total_value
   10, -- total_shares
   1000000, -- price_per_share
   10, -- available_shares (todas disponibles, no se ha vendido nada)
   0, -- sold_shares (cero ventas hasta el momento)
   ARRAY['/property-b/33250_1.jpg', '/property-b/33250_3.jpg', '/property-b/33250_4.jpg', '/property-b/33250_5.jpg', '/property-b/33250_6.jpg'], -- images
   ARRAY['Diseño Moderno', 'Vistas a la Montaña', 'Ventanas Grandes', 'Eficiente en Energía', '2LDK', 'Terreno 307m²', 'Piso 55.48m²', 'Estacionamiento 2 espacios'], -- features
   'original', -- renovation_status
   7.2, -- estimated_roi
   80000, -- monthly_rental_income
   'modern', -- property_type
   1989, -- year_built
   307.00, -- land_size
   55.48, -- building_size
   'funding', -- status
   10000000, -- funding_goal
   0, -- current_funding (cero recaudado, aún no han salido al mercado)
   0.00, -- funding_progress (0% financiado)
   '2025-07-30', -- expected_completion_date
   'spv', -- legal_structure
   1000000, -- minimum_investment
   4000000, -- maximum_investment
   1.5, -- management_fee
   10.0, -- performance_fee
   2.0 -- exit_fee
 )
 ON CONFLICT (slug) DO UPDATE SET
   name = EXCLUDED.name,
   description = EXCLUDED.description,
   current_funding = EXCLUDED.current_funding,
   available_shares = EXCLUDED.available_shares,
   sold_shares = EXCLUDED.sold_shares,
   funding_progress = EXCLUDED.funding_progress,
   updated_at = NOW();

