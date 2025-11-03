'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Layout from '@/components/Layout';
import { Mail, Phone, Send, MessageCircle, User, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSearchParams } from 'next/navigation';
import BookingSystem from '@/components/BookingSystem';

function ContactContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams?.get('tab') || 'contact';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();

  // Cargar información de la propiedad desde sessionStorage si viene desde properties
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const propertyInquiry = sessionStorage.getItem('propertyInquiry');
      if (propertyInquiry) {
        try {
          const property = JSON.parse(propertyInquiry);
          setFormData(prev => ({
            ...prev,
            message: t('contact.propertyInquiryMessage', {
              propertyName: property.propertyName,
              propertyAddress: property.propertyAddress,
              propertyPrice: property.propertyPrice.toLocaleString()
            })
          }));
          // Limpiar sessionStorage después de usarlo
          sessionStorage.removeItem('propertyInquiry');
        } catch (error) {
          console.error('Error parsing property inquiry:', error);
        }
      }
    }
  }, []);

  // Actualizar el título y metadatos de la página
  useEffect(() => {
    // Usar un pequeño delay para asegurar que se ejecute después de DynamicMetadata
    const timer = setTimeout(() => {
      // Actualizar título
        document.title = 'Contacto - Tabiji House | Inversión en Propiedades Japonesas';
      
      // Actualizar meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Contacta con Tabiji House para iniciar tu inversión en propiedades japonesas. Consulta gratuita de 30 minutos. Expertos en akiya y propiedades tradicionales.');
      }
      
      // Actualizar meta keywords
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', 'contacto, inversión Japón, propiedades japonesas, akiya, consulta gratuita, Tabiji House');
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    alert(t('contact.thankYouMessage'));
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };


  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-sm text-accent font-mono tracking-wider uppercase mb-4">
            {t('contact.startYourVision')}
          </div>
          <h1 className="text-5xl lg:text-6xl font-serif font-bold text-primary mb-6 leading-tight">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-foreground max-w-2xl mx-auto leading-relaxed mb-8">
            {t('contact.description')}
          </p>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 justify-center">
            <a
              href="/contact"
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === 'contact' || activeTab === null
                  ? 'bg-primary text-black'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Mail className="w-5 h-5 inline mr-2" />
              {t('contact.title')}
            </a>
            <a
              href="/contact?tab=booking"
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === 'booking'
                  ? 'bg-primary text-black'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Calendar className="w-5 h-5 inline mr-2" />
              {t('booking.title') || 'Programar Visita'}
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form or Booking System */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'booking' ? (
            <BookingSystem />
          ) : (
            <div className="bg-muted rounded-3xl p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-serif font-bold text-primary mb-4">
                  {t('contact.sendMessage')}
                </h2>
                <p className="text-lg text-foreground">
                  Cuéntanos sobre tu proyecto y te contactaremos en 24 horas
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-primary mb-2">
                  {t('contact.fullName')} *
                </label>
                <div className="relative">
                  <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder={t('contact.fullNamePlaceholder')}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-primary mb-2">
                  {t('contact.email')} *
                </label>
                <div className="relative">
                  <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-primary mb-2">
                  {t('contact.message')} *
                </label>
                <div className="relative">
                  <MessageCircle size={20} className="absolute left-3 top-3 text-secondary" />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    placeholder="Describe tu proyecto de inversión en Japón..."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors duration-300 font-semibold text-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{t('contact.sending')}</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>{t('contact.sendMessageButton')}</span>
                  </>
                )}
              </button>
              </form>

              {/* Contact Info */}
              <div className="mt-12 pt-8 border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                  <div>
                    <Mail size={24} className="text-primary mx-auto mb-2" />
                    <p className="text-sm text-secondary mb-1">Email</p>
                    <p className="text-foreground font-semibold">info@tabijihouse.com</p>
                  </div>
                  <div>
                    <Phone size={24} className="text-primary mx-auto mb-2" />
                    <p className="text-sm text-secondary mb-1">Teléfono</p>
                    <p className="text-foreground font-semibold">+81-3-6380-3901</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default function Contact() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactContent />
    </Suspense>
  );
}
