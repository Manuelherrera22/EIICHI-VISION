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

// Función para leer las claves usadas válidas
function readValidUsedKeys() {
  const content = fs.readFileSync('valid-translation-keys-used.txt', 'utf8');
  return content.trim().split('\n').filter(key => key.trim());
}

// Función principal
function main() {
  console.log('🔍 Comparando traducciones existentes vs usadas válidas...');
  
  // Leer archivo de traducciones
  const translationContent = fs.readFileSync('src/contexts/LanguageContext.tsx', 'utf8');
  const existingKeys = extractExistingKeys(translationContent);
  
  // Leer claves usadas válidas
  const usedKeys = readValidUsedKeys();
  
  console.log(`📊 Claves existentes: ${existingKeys.length}`);
  console.log(`📊 Claves usadas válidas: ${usedKeys.length}`);
  
  // Encontrar claves faltantes
  const missingKeys = usedKeys.filter(key => !existingKeys.includes(key));
  const unusedKeys = existingKeys.filter(key => !usedKeys.includes(key));
  
  console.log(`❌ Claves faltantes: ${missingKeys.length}`);
  console.log(`⚠️  Claves no usadas: ${unusedKeys.length}`);
  
  // Guardar claves faltantes
  fs.writeFileSync('valid-missing-translation-keys.txt', missingKeys.sort().join('\n'));
  console.log('💾 Claves faltantes válidas guardadas en valid-missing-translation-keys.txt');
  
  // Guardar claves no usadas
  fs.writeFileSync('valid-unused-translation-keys.txt', unusedKeys.sort().join('\n'));
  console.log('💾 Claves no usadas guardadas en valid-unused-translation-keys.txt');
  
  // Mostrar algunas claves faltantes como ejemplo
  console.log('\n📋 Ejemplos de claves faltantes:');
  missingKeys.slice(0, 15).forEach((key, index) => {
    console.log(`  ${index + 1}. ${key}`);
  });
  
  if (missingKeys.length > 15) {
    console.log(`  ... y ${missingKeys.length - 15} más`);
  }
  
  // Mostrar estadísticas por categoría
  const categories = {};
  missingKeys.forEach(key => {
    const category = key.split('.')[0];
    categories[category] = (categories[category] || 0) + 1;
  });
  
  console.log('\n📊 Claves faltantes por categoría:');
  Object.entries(categories)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .forEach(([category, count]) => {
      console.log(`  ${category}: ${count} claves`);
    });
  
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

module.exports = { extractExistingKeys, readValidUsedKeys, main };
