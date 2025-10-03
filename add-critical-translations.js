const fs = require('fs');

// Solo las traducciones más críticas
const criticalTranslations = {
  // Español
  'common.continue': 'Continuar',
  'common.of': 'de',
  'dashboard.investor.nextSteps.sessionWithMaría': 'Sesión con María',
  'onboarding.complete': 'Completado',
  'onboarding.welcome': 'Bienvenido',
  
  // Inglés
  'common.continue': 'Continue',
  'common.of': 'of',
  'dashboard.investor.nextSteps.sessionWithMaría': 'Session with María',
  'onboarding.complete': 'Complete',
  'onboarding.welcome': 'Welcome',
  
  // Japonés
  'common.continue': '続行',
  'common.of': 'の',
  'dashboard.investor.nextSteps.sessionWithMaría': 'マリアとのセッション',
  'onboarding.complete': '完了',
  'onboarding.welcome': 'ようこそ',
  
  // Árabe
  'common.continue': 'متابعة',
  'common.of': 'من',
  'dashboard.investor.nextSteps.sessionWithMaría': 'جلسة مع ماريا',
  'onboarding.complete': 'مكتمل',
  'onboarding.welcome': 'أهلاً وسهلاً'
};

function addCriticalTranslations() {
  console.log('🔧 Agregando traducciones críticas...');
  
  const filePath = 'src/contexts/LanguageContext.tsx';
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Crear backup
  const backupPath = `${filePath}.backup-critical-${Date.now()}`;
  fs.writeFileSync(backupPath, content);
  console.log(`💾 Backup creado: ${backupPath}`);
  
  // Agregar solo las traducciones más críticas al final de cada sección de idioma
  const languages = ['en', 'es', 'ja', 'ar'];
  
  languages.forEach(lang => {
    console.log(`🌐 Procesando idioma: ${lang}`);
    
    // Buscar el final de la sección del idioma
    const langEndRegex = new RegExp(`(\\s*// Projects Page\\s*)(\\s*}\\s*)(?=\\s*[a-z]+: \\{|\\s*};)`, 's');
    const match = content.match(langEndRegex);
    
    if (match) {
      const beforeEnd = match[1];
      const closingBrace = match[2];
      
      // Agregar las traducciones críticas
      let newTranslations = '';
      newTranslations += `    // Critical missing translations\n`;
      newTranslations += `    'common.continue': '${lang === 'es' ? 'Continuar' : lang === 'ja' ? '続行' : lang === 'ar' ? 'متابعة' : 'Continue'}',\n`;
      newTranslations += `    'common.of': '${lang === 'es' ? 'de' : lang === 'ja' ? 'の' : lang === 'ar' ? 'من' : 'of'}',\n`;
      newTranslations += `    'onboarding.complete': '${lang === 'es' ? 'Completado' : lang === 'ja' ? '完了' : lang === 'ar' ? 'مكتمل' : 'Complete'}',\n`;
      newTranslations += `    'onboarding.welcome': '${lang === 'es' ? 'Bienvenido' : lang === 'ja' ? 'ようこそ' : lang === 'ar' ? 'أهلاً وسهلاً' : 'Welcome'}',\n`;
      
      // Reemplazar solo la primera ocurrencia para cada idioma
      const updatedContent = beforeEnd + newTranslations + '  ' + closingBrace;
      content = content.replace(langEndRegex, updatedContent);
      
      console.log(`  ✅ Agregadas 4 traducciones críticas para ${lang}`);
    }
  });
  
  // Guardar el archivo modificado
  fs.writeFileSync(filePath, content);
  console.log('💾 Archivo actualizado');
  
  return true;
}

// Función principal
function main() {
  try {
    addCriticalTranslations();
    console.log('\n✅ Traducciones críticas agregadas exitosamente!');
    console.log('🧪 Ejecuta "npm run build" para verificar que todo funciona correctamente.');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { addCriticalTranslations };
