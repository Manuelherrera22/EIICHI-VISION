-- Datos de ejemplo para Tabiji House (CORREGIDO)
-- Ejecutar DESPUÉS del schema principal

-- Insertar propiedades de ejemplo
INSERT INTO properties (title, location, price, area_sqm, year, roi, monthly_income, description, features, images, status) VALUES
('Casa Tradicional Kusatsu', 'Kusatsu, Gunma', 35000000, 120, 1985, 18.5, 120000, 'Encantadora casa tradicional japonesa con vistas a las montañas de Kusatsu. Ideal para inversión en alquiler vacacional o como residencia permanente.', 
 ARRAY['Jardín Zen', 'Onsen privado', 'Vistas a la montaña', 'Cerca de estación de ski'],
 ARRAY['https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', 'https://images.unsplash.com/photo-1503174971373-b0270236b891?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
 'available'),

('Villa Moderna Karuizawa', 'Karuizawa, Nagano', 75000000, 180, 2010, 15.0, 250000, 'Exclusiva villa moderna en el prestigioso resort de Karuizawa. Diseño arquitectónico de vanguardia con amplios espacios y acabados de lujo.',
 ARRAY['Piscina climatizada', 'Gimnasio privado', 'Sistema domótico', 'Cine en casa'],
 ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
 'available'),

('Casa de Campo Takayama', 'Takayama, Gifu', 28000000, 95, 1975, 22.0, 95000, 'Auténtica casa de campo japonesa en el corazón de Takayama. Perfecta para experimentar la vida rural tradicional japonesa.',
 ARRAY['Estructura de madera tradicional', 'Jardín de bambú', 'Cerca de templos históricos', 'Acceso a senderos naturales'],
 ARRAY['https://images.unsplash.com/photo-1580587771525-78b9dba38a72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
 'available');

-- Insertar materiales de diseño de ejemplo
INSERT INTO design_materials (name, category, color_hex, texture_url, price, sustainability_rating, description, features, applications) VALUES
('Madera de Ciprés Hinoki', 'Madera', '#8B7355', 'https://images.unsplash.com/photo-1587493820000-8a1e1e1e1e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', 8500, 'A+', 'Madera de ciprés japonés Hinoki, conocida por su aroma relajante y durabilidad. Ideal para interiores que buscan un toque natural y zen.',
 ARRAY['Aroma natural relajante', 'Durabilidad excepcional', 'Resistente a insectos', 'Color uniforme'],
 ARRAY['Revestimiento interior', 'Muebles', 'Paneles decorativos', 'Pisos']),

('Piedra Natural Basalto', 'Piedra', '#2C2C2C', 'https://images.unsplash.com/photo-1587493820000-8a1e1e1e1e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', 12000, 'A', 'Basalto volcánico extraído de las faldas del Monte Fuji. Ofrece una resistencia excepcional y un acabado oscuro y elegante para exteriores.',
 ARRAY['Resistencia extrema', 'Acabado elegante', 'Baja absorción de agua', 'Mantenimiento mínimo'],
 ARRAY['Revestimiento exterior', 'Jardines', 'Escaleras', 'Fuentes']),

('Papel Shoji Tradicional', 'Textil', '#F5F5DC', 'https://images.unsplash.com/photo-1587493820000-8a1e1e1e1e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', 3000, 'A+', 'Papel tradicional japonés para paneles Shoji. Permite el paso de luz suave y crea ambientes cálidos y privados.',
 ARRAY['Transmisión de luz suave', 'Material biodegradable', 'Fácil mantenimiento', 'Aislamiento térmico'],
 ARRAY['Divisor de ambientes', 'Puertas corredizas', 'Pantallas decorativas', 'Lámparas']),

('Cerámica Raku Artesanal', 'Cerámica', '#8B4513', 'https://images.unsplash.com/photo-1587493820000-8a1e1e1e1e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', 9500, 'B', 'Azulejos de cerámica Raku hechos a mano, cada pieza es única con acabados iridiscentes. Perfectos para detalles decorativos.',
 ARRAY['Cada pieza es única', 'Acabados iridiscentes', 'Hecho a mano', 'Resistente al calor'],
 ARRAY['Azulejos decorativos', 'Elementos de cocina', 'Detalles de baño', 'Arte decorativo']);

-- Mensaje de confirmación
SELECT 'Datos de ejemplo insertados correctamente' as status;

