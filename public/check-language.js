// Script para verificar el estado del idioma
console.log('=== DEBUG LANGUAGE STATE ===');

// Verificar localStorage
const storedLanguage = localStorage.getItem('language');
const storedTabijiLanguage = localStorage.getItem('tabiji-language');

console.log('LocalStorage:');
console.log('  language:', storedLanguage);
console.log('  tabiji-language:', storedTabijiLanguage);

// Verificar sessionStorage
const sessionLanguage = sessionStorage.getItem('language');
const sessionTabijiLanguage = sessionStorage.getItem('tabiji-language');

console.log('SessionStorage:');
console.log('  language:', sessionLanguage);
console.log('  tabiji-language:', sessionTabijiLanguage);

// Verificar cookies
console.log('Cookies:', document.cookie);

// Función para limpiar todo
window.clearAllStorage = function() {
    localStorage.clear();
    sessionStorage.clear();
    document.cookie = 'language=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'tabiji-language=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    console.log('All storage cleared!');
    location.reload();
};

// Función para establecer inglés
window.setEnglish = function() {
    localStorage.setItem('language', 'en');
    localStorage.setItem('tabiji-language', 'en');
    console.log('Language set to English!');
    location.reload();
};

console.log('=== FUNCTIONS AVAILABLE ===');
console.log('clearAllStorage() - Clear all storage');
console.log('setEnglish() - Set language to English');
