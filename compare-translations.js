const fs = require('fs');

// Función para extraer claves existentes del archivo de traducciones
function extractExistingKeys(content) {
  const regex = /['"`]([a-zA-Z0-9._-]+)['"`]\s*:/g;
  const keys = new Set();
  let match;
  
  while ((match = regex.exec(content)) !== null) {
    keys.add(match[1]);
  }
  
  return Array.from(keys);
}

// Función para leer las claves usadas
function readUsedKeys() {
  const content = fs.readFileSync('translation-keys-used.txt', 'utf8');
  return content.trim().split('\n').filter(key => key.trim());
}

// Función principal
function main() {
  console.log('🔍 Comparando traducciones existentes vs usadas...');
  
  // Leer archivo de traducciones
  const translationContent = fs.readFileSync('src/contexts/LanguageContext.tsx', 'utf8');
  const existingKeys = extractExistingKeys(translationContent);
  
  // Leer claves usadas
  const usedKeys = readUsedKeys();
  
  console.log(`📊 Claves existentes: ${existingKeys.length}`);
  console.log(`📊 Claves usadas: ${usedKeys.length}`);
  
  // Encontrar claves faltantes
  const missingKeys = usedKeys.filter(key => !existingKeys.includes(key));
  const unusedKeys = existingKeys.filter(key => !usedKeys.includes(key));
  
  console.log(`❌ Claves faltantes: ${missingKeys.length}`);
  console.log(`⚠️  Claves no usadas: ${unusedKeys.length}`);
  
  // Guardar claves faltantes
  fs.writeFileSync('missing-translation-keys.txt', missingKeys.sort().join('\n'));
  console.log('💾 Claves faltantes guardadas en missing-translation-keys.txt');
  
  // Guardar claves no usadas
  fs.writeFileSync('unused-translation-keys.txt', unusedKeys.sort().join('\n'));
  console.log('💾 Claves no usadas guardadas en unused-translation-keys.txt');
  
  // Mostrar algunas claves faltantes como ejemplo
  console.log('\n📋 Ejemplos de claves faltantes:');
  missingKeys.slice(0, 10).forEach((key, index) => {
    console.log(`  ${index + 1}. ${key}`);
  });
  
  if (missingKeys.length > 10) {
    console.log(`  ... y ${missingKeys.length - 10} más`);
  }
  
  return {
    existing: existingKeys,
    used: usedKeys,
    missing: missingKeys,
    unused: unusedKeys
  };
}

if (require.main === module) {
  main();
}

module.exports = { extractExistingKeys, readUsedKeys, main };
