'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';
import UserMenu from './UserMenu';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { t } = useLanguage();
  const { user } = useAuth();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: isClient ? t('navigation.home') : 'Inicio', href: '/' },
    { name: isClient ? t('navigation.about') : 'Acerca', href: '/about' },
    { name: isClient ? t('navigation.properties') : 'Propiedades', href: '/properties' },
    { name: isClient ? t('navigation.projects') : 'Proyectos', href: '/projects' },
    { name: isClient ? t('navigation.fractional') : 'Fractional', href: '/fractional' },
    { name: isClient ? t('navigation.process') : 'Proceso', href: '/process' },
    { name: isClient ? t('navigation.services') : 'Servicios', href: '/services' },
    { name: isClient ? t('navigation.journal') : 'Diario', href: '/journal' },
    { name: isClient ? t('navigation.qa') : 'Q&A', href: '/#qa' },
    { name: isClient ? t('navigation.contact') : 'Contacto', href: '/contact' },
    ...(user ? [
      { name: 'Dashboard', href: '/dashboard' },
      { name: isClient ? t('navigation.fractional') : 'Fractional', href: '/fractional-dashboard' }
    ] : []),
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/tabijihouse-removebg-preview.png"
                alt="Tabiji House"
                width={120}
                height={45}
                className="h-8 sm:h-10 w-auto"
                priority
              />
              <span className={`text-lg sm:text-xl font-serif font-bold ${
                isScrolled ? 'text-primary' : 'text-white'
              }`}>
                Tabiji House
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  item.highlight 
                    ? 'bg-indigo-600 text-white px-2 py-1 rounded-full font-semibold text-xs' 
                    : isScrolled 
                      ? 'text-gray-900 hover:text-indigo-600' 
                      : 'text-white hover:text-indigo-300'
                } transition-colors duration-200 font-medium text-xs whitespace-nowrap`}
              >
                {item.name}
              </Link>
            ))}
            <LanguageSwitcher isScrolled={isScrolled} />
            {user ? (
              <UserMenu />
            ) : (
              <Link
                href="/auth"
                className="bg-primary text-black px-4 xl:px-6 py-2 rounded-full hover:bg-primary/90 transition-colors duration-200 font-medium text-sm xl:text-base"
              >
                {isClient ? t('navigation.login') : 'Login'}
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <LanguageSwitcher isScrolled={isScrolled} />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${
                isScrolled ? 'text-gray-900' : 'text-white'
              } hover:text-primary transition-colors duration-200 p-2`}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md rounded-lg mt-2 mb-2 shadow-lg border border-gray-200">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-200 rounded-md ${
                    item.highlight
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'text-foreground hover:text-indigo-600 hover:bg-indigo-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <LanguageSwitcher />
              </div>
              {user ? (
                <div className="px-3 py-2">
                  <UserMenu />
                </div>
              ) : (
                <Link
                  href="/auth"
                  className="block mx-3 my-2 bg-primary text-black px-4 py-2 rounded-full hover:bg-primary/90 transition-colors duration-200 font-medium text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {isClient ? t('navigation.login') : 'Login'}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
