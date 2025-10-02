-- Usuario Demo para Tabiji House
-- Ejecutar en Supabase SQL Editor

-- Crear usuario demo
INSERT INTO auth.users (
  id,
  instance_id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated',
  'demo@tabijihouse.com',
  crypt('demo123456', gen_salt('bf')),
  NOW(),
  NULL,
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Usuario Demo", "avatar_url": null}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Crear perfil de usuario demo
INSERT INTO user_profiles (
  id,
  email,
  name,
  primary_goal,
  onboarding_completed,
  budget_range,
  timeline,
  family_size,
  created_at,
  updated_at
) VALUES (
  (SELECT id FROM auth.users WHERE email = 'demo@tabijihouse.com'),
  'demo@tabijihouse.com',
  'Usuario Demo',
  'invertir',
  true,
  '100k-500k',
  '6-12-months',
  2,
  NOW(),
  NOW()
);

-- Verificar que el usuario fue creado correctamente
SELECT 
  u.email,
  u.email_confirmed_at,
  p.name,
  p.primary_goal,
  p.budget_range,
  p.timeline,
  p.family_size,
  p.onboarding_completed
FROM auth.users u
LEFT JOIN user_profiles p ON u.id = p.id
WHERE u.email = 'demo@tabijihouse.com';
