const fs = require('fs');

// Traducciones faltantes organizadas por idioma
const missingTranslations = {
  es: {
    // Claves simples
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
    
    // Common
    'common.continue': 'Continuar',
    'common.of': 'de',
    
    // Mensajes específicos
    'Enlace copiado al portapapeles': 'Enlace copiado al portapapeles',
    'Error al subir el documento. Por favor, inténtalo de nuevo.': 'Error al subir el documento. Por favor, inténtalo de nuevo.',
    'Mensaje enviado. Te contactaremos en las próximas 24 horas.': 'Mensaje enviado. Te contactaremos en las próximas 24 horas.',
    'Proceso de compra iniciado. Te contactaremos pronto.': 'Proceso de compra iniciado. Te contactaremos pronto.',
    'URL copiada al portapapeles': 'URL copiada al portapapeles',
    'Visita virtual agendada. Te enviaremos los detalles por email.': 'Visita virtual agendada. Te enviaremos los detalles por email.',
    '¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.': '¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.',
    
    // Dashboard Investor
    'dashboard.investor.nextSteps.sessionWithMaría': 'Sesión con María',
    
    // Featured Properties
    'featuredProperties.age': 'Edad',
    'featuredProperties.vehicle': 'Vehículo',
    'featuredProperties.vehicles': 'Vehículos',
    'featuredProperties.viewAllPhotos': 'Ver Todas las Fotos',
    'featuredProperties.years': 'Años',
    
    // Investor
    'investor.budgetDescription': 'Define tu presupuesto para inversión en Japón',
    'investor.budgetTitle': 'Presupuesto de Inversión',
    'investor.experienceDescription': 'Cuéntanos sobre tu experiencia en inversiones',
    'investor.experienceTitle': 'Experiencia de Inversión',
    'investor.goalsDescription': '¿Cuáles son tus objetivos de inversión?',
    'investor.goalsTitle': 'Objetivos de Inversión',
    'investor.preferencesDescription': 'Preferencias de ubicación y tipo de propiedad',
    'investor.preferencesTitle': 'Preferencias de Inversión',
    
    // JNI
    'jni.strategicAlliance': 'Alianza Estratégica',
    
    // Onboarding
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
    
    // Projects
    'projects.viewAllPhotos': 'Ver Todas las Fotos',
    
    // User
    'user.dropdown.dashboard': 'Panel de Control',
    'user.dropdown.logout': 'Cerrar Sesión',
    'user.dropdown.myProfile': 'Mi Perfil'
  },
  
  en: {
    // Claves simples
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
    
    // Common
    'common.continue': 'Continue',
    'common.of': 'of',
    
    // Mensajes específicos
    'Enlace copiado al portapapeles': 'Link copied to clipboard',
    'Error al subir el documento. Por favor, inténtalo de nuevo.': 'Error uploading document. Please try again.',
    'Mensaje enviado. Te contactaremos en las próximas 24 horas.': 'Message sent. We will contact you within 24 hours.',
    'Proceso de compra iniciado. Te contactaremos pronto.': 'Purchase process started. We will contact you soon.',
    'URL copiada al portapapeles': 'URL copied to clipboard',
    'Visita virtual agendada. Te enviaremos los detalles por email.': 'Virtual visit scheduled. We will send you the details by email.',
    '¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.': 'Thank you for your message! We will contact you soon.',
    
    // Dashboard Investor
    'dashboard.investor.nextSteps.sessionWithMaría': 'Session with María',
    
    // Featured Properties
    'featuredProperties.age': 'Age',
    'featuredProperties.vehicle': 'Vehicle',
    'featuredProperties.vehicles': 'Vehicles',
    'featuredProperties.viewAllPhotos': 'View All Photos',
    'featuredProperties.years': 'Years',
    
    // Investor
    'investor.budgetDescription': 'Define your investment budget for Japan',
    'investor.budgetTitle': 'Investment Budget',
    'investor.experienceDescription': 'Tell us about your investment experience',
    'investor.experienceTitle': 'Investment Experience',
    'investor.goalsDescription': 'What are your investment goals?',
    'investor.goalsTitle': 'Investment Goals',
    'investor.preferencesDescription': 'Location and property type preferences',
    'investor.preferencesTitle': 'Investment Preferences',
    
    // JNI
    'jni.strategicAlliance': 'Strategic Alliance',
    
    // Onboarding
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
    
    // Projects
    'projects.viewAllPhotos': 'View All Photos',
    
    // User
    'user.dropdown.dashboard': 'Dashboard',
    'user.dropdown.logout': 'Logout',
    'user.dropdown.myProfile': 'My Profile'
  },
  
  ja: {
    // Claves simples
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
    
    // Common
    'common.continue': '続行',
    'common.of': 'の',
    
    // Mensajes específicos
    'Enlace copiado al portapapeles': 'リンクをクリップボードにコピーしました',
    'Error al subir el documento. Por favor, inténtalo de nuevo.': '文書のアップロードに失敗しました。もう一度お試しください。',
    'Mensaje enviado. Te contactaremos en las próximas 24 horas.': 'メッセージを送信しました。24時間以内にご連絡いたします。',
    'Proceso de compra iniciado. Te contactaremos pronto.': '購入プロセスを開始しました。すぐにご連絡いたします。',
    'URL copiada al portapapeles': 'URLをクリップボードにコピーしました',
    'Visita virtual agendada. Te enviaremos los detalles por email.': 'バーチャル訪問を予約しました。詳細をメールでお送りします。',
    '¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.': 'メッセージありがとうございます！すぐにご連絡いたします。',
    
    // Dashboard Investor
    'dashboard.investor.nextSteps.sessionWithMaría': 'マリアとのセッション',
    
    // Featured Properties
    'featuredProperties.age': '年齢',
    'featuredProperties.vehicle': '車両',
    'featuredProperties.vehicles': '車両',
    'featuredProperties.viewAllPhotos': 'すべての写真を見る',
    'featuredProperties.years': '年',
    
    // Investor
    'investor.budgetDescription': '日本の投資予算を定義してください',
    'investor.budgetTitle': '投資予算',
    'investor.experienceDescription': '投資経験について教えてください',
    'investor.experienceTitle': '投資経験',
    'investor.goalsDescription': '投資目標は何ですか？',
    'investor.goalsTitle': '投資目標',
    'investor.preferencesDescription': '場所と物件タイプの好み',
    'investor.preferencesTitle': '投資の好み',
    
    // JNI
    'jni.strategicAlliance': '戦略的同盟',
    
    // Onboarding
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
    
    // Projects
    'projects.viewAllPhotos': 'すべての写真を見る',
    
    // User
    'user.dropdown.dashboard': 'ダッシュボード',
    'user.dropdown.logout': 'ログアウト',
    'user.dropdown.myProfile': 'マイプロフィール'
  },
  
  ar: {
    // Claves simples
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
    
    // Common
    'common.continue': 'متابعة',
    'common.of': 'من',
    
    // Mensajes específicos
    'Enlace copiado al portapapeles': 'تم نسخ الرابط إلى الحافظة',
    'Error al subir el documento. Por favor, inténtalo de nuevo.': 'خطأ في رفع المستند. يرجى المحاولة مرة أخرى.',
    'Mensaje enviado. Te contactaremos en las próximas 24 horas.': 'تم إرسال الرسالة. سنتواصل معك خلال 24 ساعة.',
    'Proceso de compra iniciado. Te contactaremos pronto.': 'تم بدء عملية الشراء. سنتواصل معك قريباً.',
    'URL copiada al portapapeles': 'تم نسخ الرابط إلى الحافظة',
    'Visita virtual agendada. Te enviaremos los detalles por email.': 'تم جدولة زيارة افتراضية. سنرسل لك التفاصيل بالبريد الإلكتروني.',
    '¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.': 'شكراً لرسالتك! سنتواصل معك قريباً.',
    
    // Dashboard Investor
    'dashboard.investor.nextSteps.sessionWithMaría': 'جلسة مع ماريا',
    
    // Featured Properties
    'featuredProperties.age': 'العمر',
    'featuredProperties.vehicle': 'مركبة',
    'featuredProperties.vehicles': 'مركبات',
    'featuredProperties.viewAllPhotos': 'عرض جميع الصور',
    'featuredProperties.years': 'سنوات',
    
    // Investor
    'investor.budgetDescription': 'حدد ميزانية الاستثمار في اليابان',
    'investor.budgetTitle': 'ميزانية الاستثمار',
    'investor.experienceDescription': 'أخبرنا عن خبرتك في الاستثمار',
    'investor.experienceTitle': 'خبرة الاستثمار',
    'investor.goalsDescription': 'ما هي أهدافك الاستثمارية؟',
    'investor.goalsTitle': 'أهداف الاستثمار',
    'investor.preferencesDescription': 'تفضيلات الموقع ونوع العقار',
    'investor.preferencesTitle': 'تفضيلات الاستثمار',
    
    // JNI
    'jni.strategicAlliance': 'تحالف استراتيجي',
    
    // Onboarding
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
    
    // Projects
    'projects.viewAllPhotos': 'عرض جميع الصور',
    
    // User
    'user.dropdown.dashboard': 'لوحة التحكم',
    'user.dropdown.logout': 'تسجيل الخروج',
    'user.dropdown.myProfile': 'ملفي الشخصي'
  }
};

// Función para agregar traducciones al archivo
function addMissingTranslations() {
  console.log('🔧 Agregando traducciones faltantes...');
  
  // Leer el archivo actual
  const filePath = 'src/contexts/LanguageContext.tsx';
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Crear backup
  fs.writeFileSync(`${filePath}.backup-${Date.now()}`, content);
  console.log('💾 Backup creado');
  
  // Agregar traducciones para cada idioma
  Object.entries(missingTranslations).forEach(([lang, translations]) => {
    console.log(`🌐 Procesando idioma: ${lang}`);
    
    // Encontrar la sección del idioma
    const langSectionRegex = new RegExp(`(${lang}:\\s*\\{[^}]*)(\\s*\\})`, 's');
    const match = content.match(langSectionRegex);
    
    if (match) {
      const beforeSection = match[1];
      const afterSection = match[2];
      
      // Agregar las traducciones faltantes
      let newTranslations = '';
      Object.entries(translations).forEach(([key, value]) => {
        newTranslations += `    '${key}': '${value}',\n`;
      });
      
      // Reconstruir la sección
      const newSection = beforeSection + ',\n' + newTranslations + '  ' + afterSection;
      content = content.replace(langSectionRegex, newSection);
      
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
    addMissingTranslations();
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

module.exports = { addMissingTranslations, missingTranslations };
