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
    { name: isClient ? t('navigation.home') : 'Home', href: '/' },
    { name: isClient ? t('navigation.about') : 'About', href: '/about' },
    { name: isClient ? t('navigation.properties') : 'Properties', href: '/properties' },
    { name: isClient ? t('navigation.projects') : 'Projects', href: '/projects' },
    { name: isClient ? t('navigation.process') : 'Process', href: '/process' },
    { name: isClient ? t('navigation.services') : 'Services', href: '/services' },
    { name: isClient ? t('navigation.journal') : 'Journal', href: '/journal' },
    { name: isClient ? t('navigation.contact') : 'Contact', href: '/contact' },
    ...(user ? [{ name: isClient ? t('navigation.dashboard') : 'Dashboard', href: '/dashboard' }] : []),
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
              <Image
                src="/tabijihouse-removebg-preview.png"
                alt="Tabiji House"
                width={160}
                height={60}
                className="h-10 sm:h-12 w-auto"
                priority
              />
              <span className="text-xl sm:text-2xl font-serif font-bold text-primary">
                Tabiji House
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium text-sm xl:text-base"
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
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground hover:text-primary transition-colors duration-200 p-2"
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
                  className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors duration-200"
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
