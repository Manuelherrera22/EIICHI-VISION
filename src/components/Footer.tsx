'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const footerLinks = {
    company: [
      { name: isClient ? t('footer.ourLegacy') : 'Our Legacy', href: '/about' },
      { name: isClient ? t('footer.thePath') : 'The Path', href: '/process' },
      { name: isClient ? t('footer.services') : 'Services', href: '/services' },
      { name: isClient ? t('footer.journal') : 'Journal', href: '/journal' },
      { name: isClient ? t('footer.contact') : 'Contact', href: '/contact' },
    ],
    projects: [
      { name: isClient ? t('footer.featuredProjects') : 'Featured Projects', href: '/projects' },
      { name: isClient ? t('footer.availableProperties') : 'Available Properties', href: '/projects?available=true' },
      { name: isClient ? t('footer.successStories') : 'Success Stories', href: '/projects?success=true' },
      { name: isClient ? t('footer.investmentGuide') : 'Investment Guide', href: '/guide' },
    ],
    resources: [
      { name: isClient ? t('footer.blog') : 'Blog', href: '/journal' },
      { name: isClient ? t('footer.designGuides') : 'Design Guides', href: '/journal/category/design' },
      { name: isClient ? t('footer.japaneseCulture') : 'Japanese Culture', href: '/journal/category/culture' },
      { name: isClient ? t('footer.lifeInGunma') : 'Life in Gunma', href: '/journal/category/lifestyle' },
    ],
  };

  const socialLinks = [
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
  ];

  return (
    <footer className="bg-muted border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                <Image
                  src="/tabijihouse-removebg-preview.png"
                  alt="Tabiji House"
                  width={180}
                  height={70}
                  className="h-12 sm:h-16 lg:h-20 w-auto"
                  priority
                />
                <div className="text-lg sm:text-xl lg:text-2xl font-serif font-bold text-primary">
                  Tabiji House
                </div>
              </div>
              <div className="text-xs sm:text-sm text-secondary font-mono mb-3 sm:mb-4">
                こもれび・ハウス
              </div>
              <p className="text-foreground text-xs sm:text-sm leading-relaxed">
                {isClient ? t('footer.companyDescription') : "Discover Japan's unique heritage through traditional properties where sunlight filters through leaves, creating a magical atmosphere of peace and tranquility."}
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-foreground">
                <Mail size={14} className="w-4 h-4 text-primary flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="break-all">susumumuguruma@gmail.com</span>
                  <span className="break-all">info@tabijihouse.com</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-foreground">
                <Phone size={14} className="w-4 h-4 text-primary flex-shrink-0" />
                <span>+81 90-1234-5678</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-foreground">
                <MapPin size={14} className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Kusatsu, Gunma, Japan</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-serif text-sm sm:text-base lg:text-lg font-semibold text-primary mb-3 sm:mb-4">
              {isClient ? t('footer.company') : 'Company'}
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-foreground hover:text-primary transition-colors duration-200 text-xs sm:text-sm block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects Links */}
          <div>
            <h3 className="font-serif text-sm sm:text-base lg:text-lg font-semibold text-primary mb-3 sm:mb-4">
              {isClient ? t('footer.projects') : 'Projects'}
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.projects.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-foreground hover:text-primary transition-colors duration-200 text-xs sm:text-sm block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-serif text-sm sm:text-base lg:text-lg font-semibold text-primary mb-3 sm:mb-4">
              {isClient ? t('footer.resources') : 'Resources'}
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-foreground hover:text-primary transition-colors duration-200 text-xs sm:text-sm block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border">
          <div className="max-w-md">
            <h3 className="font-serif text-base sm:text-lg font-semibold text-primary mb-3 sm:mb-4">
              {isClient ? t('footer.joinVision') : 'Join Our Vision'}
            </h3>
            <p className="text-foreground text-xs sm:text-sm mb-4">
              {isClient ? t('footer.newsletterDescription') : 'Stay updated with our latest properties and cultural insights.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
              <input
                type="email"
                placeholder={isClient ? t('footer.emailPlaceholder') : 'Enter your email'}
                className="flex-1 px-3 sm:px-4 py-2 border-2 border-gray-300 rounded-full text-xs sm:text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder-gray-500"
              />
              <button className="bg-primary text-black px-4 sm:px-6 py-2 rounded-full hover:bg-primary/90 transition-colors duration-200 text-xs sm:text-sm font-medium whitespace-nowrap shadow-lg border border-primary/30 ring-1 ring-primary/20">
                {isClient ? t('footer.subscribe') : 'Subscribe'}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border">
          <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
            <div className="text-xs sm:text-sm text-secondary text-center lg:text-left">
              © {currentYear} Komorebi House. {isClient ? t('footer.copyright') : 'All rights reserved.'}
            </div>
            
            {/* Social Links */}
            <div className="flex justify-center lg:justify-start space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-secondary hover:text-primary transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon size={18} className="sm:w-5 sm:h-5" />
                </a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex justify-center lg:justify-end space-x-4 sm:space-x-6 text-xs sm:text-sm">
              <Link
                href="/privacy"
                className="text-secondary hover:text-primary transition-colors duration-200"
              >
                {isClient ? t('footer.privacy') : 'Privacy'}
              </Link>
              <Link
                href="/terms"
                className="text-secondary hover:text-primary transition-colors duration-200"
              >
                {isClient ? t('footer.terms') : 'Terms'}
              </Link>
            </div>
          </div>

          {/* Legal Information Section */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="text-center">
              <h4 className="font-serif text-sm font-semibold text-primary mb-4">
                Información Legal - JNI Properties Co., Ltd.
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-secondary">
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold text-primary">Real Estate Transaction License:</span><br />
                    Minister of Land, Infrastructure, Transport and Tourism (2) No. 9062
                  </div>
                  <div>
                    <span className="font-semibold text-primary">Trade Name:</span><br />
                    JNI Properties Co., Ltd.
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold text-primary">Principal Office Address:</span><br />
                    6th Floor, Shinjuku Eastside Square, 6-27-30 Shinjuku, Shinjuku-ku, Tokyo
                  </div>
                  <div>
                    <span className="font-semibold text-primary">Telephone:</span><br />
                    +81-3-6380-3901
                  </div>
                  <div>
                    <span className="font-semibold text-primary">Representative:</span><br />
                    Toshinori Shibusawa
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
