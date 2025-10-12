import React, { useState } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import AdvancedChatbot from './AdvancedChatbot';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

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
      <AdvancedChatbot 
        isOpen={isChatbotOpen}
        onToggle={toggleChatbot}
      />
    </div>
  );
};

export default Layout;
