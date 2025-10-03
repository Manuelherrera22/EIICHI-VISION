const fs = require('fs');

// Función para agregar traducciones de manera segura
function addTranslationsSafely() {
  console.log('🔧 Agregando traducciones de manera segura...');
  
  const filePath = 'src/contexts/LanguageContext.tsx';
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Crear backup
  const backupPath = `${filePath}.backup-safe-${Date.now()}`;
  fs.writeFileSync(backupPath, content);
  console.log(`💾 Backup creado: ${backupPath}`);
  
  // Traducciones faltantes organizadas por idioma
  const missingTranslations = {
    es: {
      '2d': '2D',
      'city': 'Ciudad',
      'code': 'Código',
      'error': 'Error',
      'id': 'ID',
      'limit': 'Límite',
      'maxPrice': 'Precio Máximo',
      'minPrice': 'Precio Mínimo',
      'offset': 'Desplazamiento',
      'prefecture': 'Prefectura',
      'priority': 'Prioridad',
      'propertyType': 'Tipo de Propiedad',
      'region': 'Región',
      'sortBy': 'Ordenar por',
      'sortOrder': 'Orden',
      'timeframe': 'Marco Temporal',
      'type': 'Tipo',
      'userId': 'ID de Usuario',
      'common.continue': 'Continuar',
      'common.of': 'de',
      'dashboard.investor.nextSteps.sessionWithMaría': 'Sesión con María',
      'featuredProperties.age': 'Edad',
      'featuredProperties.vehicle': 'Vehículo',
      'featuredProperties.vehicles': 'Vehículos',
      'featuredProperties.viewAllPhotos': 'Ver Todas las Fotos',
      'featuredProperties.years': 'Años',
      'investor.budgetDescription': 'Define tu presupuesto para inversión en Japón',
      'investor.budgetTitle': 'Presupuesto de Inversión',
      'investor.experienceDescription': 'Cuéntanos sobre tu experiencia en inversiones',
      'investor.experienceTitle': 'Experiencia de Inversión',
      'investor.goalsDescription': '¿Cuáles son tus objetivos de inversión?',
      'investor.goalsTitle': 'Objetivos de Inversión',
      'investor.preferencesDescription': 'Preferencias de ubicación y tipo de propiedad',
      'investor.preferencesTitle': 'Preferencias de Inversión',
      'jni.strategicAlliance': 'Alianza Estratégica',
      'onboarding.complete': 'Completado',
      'onboarding.completeDescription': 'Tu perfil está completo y listo para usar',
      'onboarding.detectedIntent': 'Intención Detectada',
      'onboarding.intent': 'Intención',
      'onboarding.intentDescription': 'Hemos detectado tu intención principal',
      'onboarding.investDescription': 'Invierte en propiedades japonesas tradicionales',
      'onboarding.investTitle': 'Invertir',
      'onboarding.liveDescription': 'Vive la experiencia japonesa auténtica',
      'onboarding.liveTitle': 'Vivir',
      'onboarding.migrateDescription': 'Migra a Japón con nuestra ayuda',
      'onboarding.migrateTitle': 'Migrar',
      'onboarding.preferences': 'Preferencias',
      'onboarding.preferencesDescription': 'Personaliza tu experiencia',
      'onboarding.profile': 'Perfil',
      'onboarding.profileDescription': 'Completa tu información personal',
      'onboarding.selectYourIntent': 'Selecciona tu Intención',
      'onboarding.step': 'Paso',
      'onboarding.welcome': 'Bienvenido',
      'onboarding.welcomeDescription': 'Te ayudamos a cumplir tus objetivos en Japón',
      'onboarding.whatIsYourGoal': '¿Cuál es tu objetivo principal?',
      'projects.viewAllPhotos': 'Ver Todas las Fotos',
      'user.dropdown.dashboard': 'Panel de Control',
      'user.dropdown.logout': 'Cerrar Sesión',
      'user.dropdown.myProfile': 'Mi Perfil'
    },
    
    en: {
      '2d': '2D',
      'city': 'City',
      'code': 'Code',
      'error': 'Error',
      'id': 'ID',
      'limit': 'Limit',
      'maxPrice': 'Max Price',
      'minPrice': 'Min Price',
      'offset': 'Offset',
      'prefecture': 'Prefecture',
      'priority': 'Priority',
      'propertyType': 'Property Type',
      'region': 'Region',
      'sortBy': 'Sort By',
      'sortOrder': 'Sort Order',
      'timeframe': 'Timeframe',
      'type': 'Type',
      'userId': 'User ID',
      'common.continue': 'Continue',
      'common.of': 'of',
      'dashboard.investor.nextSteps.sessionWithMaría': 'Session with María',
      'featuredProperties.age': 'Age',
      'featuredProperties.vehicle': 'Vehicle',
      'featuredProperties.vehicles': 'Vehicles',
      'featuredProperties.viewAllPhotos': 'View All Photos',
      'featuredProperties.years': 'Years',
      'investor.budgetDescription': 'Define your investment budget for Japan',
      'investor.budgetTitle': 'Investment Budget',
      'investor.experienceDescription': 'Tell us about your investment experience',
      'investor.experienceTitle': 'Investment Experience',
      'investor.goalsDescription': 'What are your investment goals?',
      'investor.goalsTitle': 'Investment Goals',
      'investor.preferencesDescription': 'Location and property type preferences',
      'investor.preferencesTitle': 'Investment Preferences',
      'jni.strategicAlliance': 'Strategic Alliance',
      'onboarding.complete': 'Complete',
      'onboarding.completeDescription': 'Your profile is complete and ready to use',
      'onboarding.detectedIntent': 'Detected Intent',
      'onboarding.intent': 'Intent',
      'onboarding.intentDescription': 'We have detected your main intent',
      'onboarding.investDescription': 'Invest in traditional Japanese properties',
      'onboarding.investTitle': 'Invest',
      'onboarding.liveDescription': 'Live the authentic Japanese experience',
      'onboarding.liveTitle': 'Live',
      'onboarding.migrateDescription': 'Migrate to Japan with our help',
      'onboarding.migrateTitle': 'Migrate',
      'onboarding.preferences': 'Preferences',
      'onboarding.preferencesDescription': 'Customize your experience',
      'onboarding.profile': 'Profile',
      'onboarding.profileDescription': 'Complete your personal information',
      'onboarding.selectYourIntent': 'Select Your Intent',
      'onboarding.step': 'Step',
      'onboarding.welcome': 'Welcome',
      'onboarding.welcomeDescription': 'We help you achieve your goals in Japan',
      'onboarding.whatIsYourGoal': 'What is your main goal?',
      'projects.viewAllPhotos': 'View All Photos',
      'user.dropdown.dashboard': 'Dashboard',
      'user.dropdown.logout': 'Logout',
      'user.dropdown.myProfile': 'My Profile'
    },
    
    ja: {
      '2d': '2D',
      'city': '都市',
      'code': 'コード',
      'error': 'エラー',
      'id': 'ID',
      'limit': '制限',
      'maxPrice': '最大価格',
      'minPrice': '最小価格',
      'offset': 'オフセット',
      'prefecture': '都道府県',
      'priority': '優先度',
      'propertyType': '物件タイプ',
      'region': '地域',
      'sortBy': '並び順',
      'sortOrder': 'ソート順',
      'timeframe': '期間',
      'type': 'タイプ',
      'userId': 'ユーザーID',
      'common.continue': '続行',
      'common.of': 'の',
      'dashboard.investor.nextSteps.sessionWithMaría': 'マリアとのセッション',
      'featuredProperties.age': '年齢',
      'featuredProperties.vehicle': '車両',
      'featuredProperties.vehicles': '車両',
      'featuredProperties.viewAllPhotos': 'すべての写真を見る',
      'featuredProperties.years': '年',
      'investor.budgetDescription': '日本の投資予算を定義してください',
      'investor.budgetTitle': '投資予算',
      'investor.experienceDescription': '投資経験について教えてください',
      'investor.experienceTitle': '投資経験',
      'investor.goalsDescription': '投資目標は何ですか？',
      'investor.goalsTitle': '投資目標',
      'investor.preferencesDescription': '場所と物件タイプの好み',
      'investor.preferencesTitle': '投資の好み',
      'jni.strategicAlliance': '戦略的同盟',
      'onboarding.complete': '完了',
      'onboarding.completeDescription': 'プロフィールが完了し、使用準備が整いました',
      'onboarding.detectedIntent': '検出された意図',
      'onboarding.intent': '意図',
      'onboarding.intentDescription': 'あなたの主な意図を検出しました',
      'onboarding.investDescription': '伝統的な日本の物件に投資',
      'onboarding.investTitle': '投資',
      'onboarding.liveDescription': '本格的な日本体験を生きる',
      'onboarding.liveTitle': '住む',
      'onboarding.migrateDescription': '私たちの助けを借りて日本に移住',
      'onboarding.migrateTitle': '移住',
      'onboarding.preferences': '設定',
      'onboarding.preferencesDescription': '体験をカスタマイズ',
      'onboarding.profile': 'プロフィール',
      'onboarding.profileDescription': '個人情報を完成させてください',
      'onboarding.selectYourIntent': '意図を選択',
      'onboarding.step': 'ステップ',
      'onboarding.welcome': 'ようこそ',
      'onboarding.welcomeDescription': '日本の目標達成をお手伝いします',
      'onboarding.whatIsYourGoal': '主な目標は何ですか？',
      'projects.viewAllPhotos': 'すべての写真を見る',
      'user.dropdown.dashboard': 'ダッシュボード',
      'user.dropdown.logout': 'ログアウト',
      'user.dropdown.myProfile': 'マイプロフィール'
    },
    
    ar: {
      '2d': '2D',
      'city': 'مدينة',
      'code': 'كود',
      'error': 'خطأ',
      'id': 'معرف',
      'limit': 'حد',
      'maxPrice': 'السعر الأقصى',
      'minPrice': 'السعر الأدنى',
      'offset': 'إزاحة',
      'prefecture': 'محافظة',
      'priority': 'أولوية',
      'propertyType': 'نوع العقار',
      'region': 'منطقة',
      'sortBy': 'ترتيب حسب',
      'sortOrder': 'ترتيب',
      'timeframe': 'إطار زمني',
      'type': 'نوع',
      'userId': 'معرف المستخدم',
      'common.continue': 'متابعة',
      'common.of': 'من',
      'dashboard.investor.nextSteps.sessionWithMaría': 'جلسة مع ماريا',
      'featuredProperties.age': 'العمر',
      'featuredProperties.vehicle': 'مركبة',
      'featuredProperties.vehicles': 'مركبات',
      'featuredProperties.viewAllPhotos': 'عرض جميع الصور',
      'featuredProperties.years': 'سنوات',
      'investor.budgetDescription': 'حدد ميزانية الاستثمار في اليابان',
      'investor.budgetTitle': 'ميزانية الاستثمار',
      'investor.experienceDescription': 'أخبرنا عن خبرتك في الاستثمار',
      'investor.experienceTitle': 'خبرة الاستثمار',
      'investor.goalsDescription': 'ما هي أهدافك الاستثمارية؟',
      'investor.goalsTitle': 'أهداف الاستثمار',
      'investor.preferencesDescription': 'تفضيلات الموقع ونوع العقار',
      'investor.preferencesTitle': 'تفضيلات الاستثمار',
      'jni.strategicAlliance': 'تحالف استراتيجي',
      'onboarding.complete': 'مكتمل',
      'onboarding.completeDescription': 'ملفك الشخصي مكتمل وجاهز للاستخدام',
      'onboarding.detectedIntent': 'النية المكتشفة',
      'onboarding.intent': 'نية',
      'onboarding.intentDescription': 'لقد اكتشفنا نيتك الرئيسية',
      'onboarding.investDescription': 'استثمر في العقارات اليابانية التقليدية',
      'onboarding.investTitle': 'استثمر',
      'onboarding.liveDescription': 'عش التجربة اليابانية الأصيلة',
      'onboarding.liveTitle': 'عش',
      'onboarding.migrateDescription': 'هاجر إلى اليابان بمساعدتنا',
      'onboarding.migrateTitle': 'هاجر',
      'onboarding.preferences': 'التفضيلات',
      'onboarding.preferencesDescription': 'خصص تجربتك',
      'onboarding.profile': 'الملف الشخصي',
      'onboarding.profileDescription': 'أكمل معلوماتك الشخصية',
      'onboarding.selectYourIntent': 'اختر نيتك',
      'onboarding.step': 'خطوة',
      'onboarding.welcome': 'أهلاً وسهلاً',
      'onboarding.welcomeDescription': 'نساعدك في تحقيق أهدافك في اليابان',
      'onboarding.whatIsYourGoal': 'ما هو هدفك الرئيسي؟',
      'projects.viewAllPhotos': 'عرض جميع الصور',
      'user.dropdown.dashboard': 'لوحة التحكم',
      'user.dropdown.logout': 'تسجيل الخروج',
      'user.dropdown.myProfile': 'ملفي الشخصي'
    }
  };
  
  // Agregar traducciones para cada idioma de manera cuidadosa
  Object.entries(missingTranslations).forEach(([lang, translations]) => {
    console.log(`🌐 Procesando idioma: ${lang}`);
    
    // Encontrar la sección del idioma y agregar las traducciones al final
    const langPattern = new RegExp(`(${lang}:\\s*\\{)([^}]*)(\\s*\\})`, 's');
    const match = content.match(langPattern);
    
    if (match) {
      const beforeSection = match[1];
      const existingContent = match[2];
      const afterSection = match[3];
      
      // Crear las nuevas traducciones
      let newTranslations = '';
      Object.entries(translations).forEach(([key, value]) => {
        newTranslations += `    '${key}': '${value}',\n`;
      });
      
      // Agregar las nuevas traducciones al final del contenido existente
      const updatedContent = beforeSection + existingContent + ',\n' + newTranslations + '  ' + afterSection;
      content = content.replace(langPattern, updatedContent);
      
      console.log(`  ✅ Agregadas ${Object.keys(translations).length} traducciones para ${lang}`);
    } else {
      console.log(`  ❌ No se encontró la sección para ${lang}`);
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
    addTranslationsSafely();
    console.log('\n✅ Traducciones agregadas exitosamente!');
    console.log('🧪 Ejecuta "npm run build" para verificar que todo funciona correctamente.');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { addTranslationsSafely };
