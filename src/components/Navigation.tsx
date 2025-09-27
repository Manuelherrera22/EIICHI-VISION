'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Inicio', href: '/' },
    { name: 'Nuestro Legado', href: '/about' },
    { name: 'Proyectos', href: '/projects' },
    { name: 'El Camino', href: '/process' },
    { name: 'Journal', href: '/journal' },
    { name: 'Contacto', href: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-12 sm:h-14 md:h-16 lg:h-20">
          {/* Logo removido - solo navegación centrada */}

          {/* Desktop Navigation */}
          <div className="flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium text-sm"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors duration-200 font-medium text-sm"
            >
              Descubre los Proyectos
            </Link>
          </div>

          {/* Mobile menu button removido - navegación simplificada */}
        </div>

        {/* Mobile Navigation removida - navegación simplificada */}
      </div>
    </nav>
  );
};

export default Navigation;
