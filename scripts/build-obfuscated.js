/**
 * Script para build con ofuscación
 * Establece las variables de entorno correctamente antes del build
 */

// Establecer variables de entorno para el build
process.env.NODE_ENV = 'production';
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://kbqxdsqklqdsvfrwawjj.supabase.co';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImticXhkc3FrbHFkc3Zmcndhd2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMTYyNTUsImV4cCI6MjA3NDY5MjI1NX0.XheHxxVayJukawFGR6iUoCh2W_03kguWU973rZT--Ao';
process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID = 'kbqxdsqklqdsvfrwawjj';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImticXhkc3FrbHFkc3Zmcndhd2pqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTExNjI1NSwiZXhwIjoyMDc0NjkyMjU1fQ.2GzBXC_7u4yCwTVzMl7W4bbLXkH6r-JlkZ--EkYc1Bg';

console.log('🔒 Iniciando build con ofuscación...');
console.log('📦 Variables de entorno configuradas:');
console.log(`   NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`   NEXT_PUBLIC_SUPABASE_URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Configurado' : '❌ No configurado'}`);
console.log(`   NEXT_PUBLIC_SUPABASE_ANON_KEY: ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Configurado' : '❌ No configurado'}`);
console.log(`   NEXT_PUBLIC_SUPABASE_PROJECT_ID: ${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID ? '✅ Configurado' : '❌ No configurado'}`);

// Ejecutar el build de Next.js
const { execSync } = require('child_process');

try {
  console.log('\n🚀 Ejecutando build de Next.js...');
  execSync('npx next build', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'production'
    }
  });
  
  console.log('\n✅ Build completado exitosamente!');
  console.log('🔒 El código ha sido ofuscado para producción');
  console.log('📁 Archivos generados en .next/');
  console.log('\n📋 Próximos pasos:');
  console.log('1. Verificar archivos en .next/static/chunks/');
  console.log('2. Abrir F12 en el navegador para confirmar ofuscación');
  console.log('3. Los archivos JS deben estar ofuscados e ilegibles');
  
} catch (error) {
  console.error('\n❌ Error durante el build:');
  console.error(error.message);
  process.exit(1);
}
