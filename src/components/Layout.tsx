import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import AdvancedChatbot from './AdvancedChatbot';
import CookieBanner from './CookieBanner';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [showChatButton, setShowChatButton] = useState(true);

  useEffect(() => {
    // Ocultar botón de chat después de 10 segundos solo en móvil
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    if (isMobile) {
      const timer = setTimeout(() => {
        setShowChatButton(false);
      }, 10000); // 10 segundos

      return () => clearTimeout(timer);
    }
  }, []);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppButton 
        phoneNumber="+81-3-6380-3901"
      />
      {showChatButton && (
        <AdvancedChatbot 
          isOpen={isChatbotOpen}
          onToggle={toggleChatbot}
        />
      )}
      <CookieBanner />
    </div>
  );
};

export default Layout;
