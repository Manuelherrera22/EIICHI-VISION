import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppButton 
        phoneNumber="+57 3222345650"
        message="¡Hola! Me interesa saber más sobre las propiedades en Japón. ¿Podrían ayudarme con información sobre los proyectos disponibles?"
      />
    </div>
  );
};

export default Layout;
