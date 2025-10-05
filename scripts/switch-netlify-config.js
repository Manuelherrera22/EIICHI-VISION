/**
 * Script para alternar entre configuraciones de Netlify
 * Permite cambiar entre build con ofuscación y build simple
 */

const fs = require('fs');
const path = require('path');

const configs = {
  simple: 'netlify-simple.toml',
  obfuscated: 'netlify.toml'
};

const currentConfig = process.argv[2];

if (!currentConfig || !configs[currentConfig]) {
  console.log('🔧 Script para alternar configuraciones de Netlify\n');
  console.log('Uso: node scripts/switch-netlify-config.js [simple|obfuscated]\n');
  console.log('Configuraciones disponibles:');
  console.log('  simple     - Build estándar sin ofuscación (recomendado para deploy)');
  console.log('  obfuscated - Build con ofuscación (puede causar problemas)\n');
  console.log('Ejemplo: node scripts/switch-netlify-config.js simple');
  process.exit(1);
}

const sourceFile = configs[currentConfig];
const targetFile = 'netlify.toml';

try {
  // Leer archivo de configuración
  const configContent = fs.readFileSync(sourceFile, 'utf8');
  
  // Escribir como netlify.toml principal
  fs.writeFileSync(targetFile, configContent);
  
  console.log(`✅ Configuración cambiada a: ${currentConfig}`);
  console.log(`📁 Archivo activo: ${targetFile}`);
  console.log(`📄 Fuente: ${sourceFile}`);
  
  if (currentConfig === 'simple') {
    console.log('\n🚀 Configuración simple activada:');
    console.log('   - Build estándar sin ofuscación');
    console.log('   - Más estable para deploy');
    console.log('   - Recomendado para producción');
  } else if (currentConfig === 'obfuscated') {
    console.log('\n🔒 Configuración con ofuscación activada:');
    console.log('   - Build con ofuscación de código');
    console.log('   - Puede causar problemas en deploy');
    console.log('   - Solo para testing local');
  }
  
  console.log('\n📋 Próximos pasos:');
  console.log('1. Hacer commit de los cambios');
  console.log('2. Push a GitHub');
  console.log('3. Netlify se redeplegará automáticamente');
  
} catch (error) {
  console.error('❌ Error al cambiar configuración:', error.message);
  process.exit(1);
}
