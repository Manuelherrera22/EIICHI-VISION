'use client';

import React from 'react';
import Layout from '@/components/Layout';
import { Shield, Eye, Lock, Database, Users, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const PrivacyPage = () => {
  const { t } = useLanguage();
  const sections = [
    {
      icon: Eye,
      title: t('privacy.infoWeCollect'),
      content: [
        t('privacy.contactInfo'),
        t('privacy.propertyInfo'),
        'Preferencias de comunicación',
        'Datos de navegación y uso del sitio web',
        t('privacy.financialInfo')
      ]
    },
    {
      icon: Database,
      title: t('privacy.howWeUse'),
      content: [
        'Proporcionar servicios de consultoría inmobiliaria',
        'Comunicarnos contigo sobre propiedades y servicios',
        'Procesar transacciones y gestionar contratos',
        'Mejorar nuestros servicios y experiencia del usuario',
        'Cumplir con obligaciones legales y regulatorias'
      ]
    },
    {
      icon: Lock,
      title: 'Protección de Datos',
      content: [
        'Encriptación SSL/TLS para todas las transmisiones',
        'Almacenamiento seguro en servidores protegidos',
        'Acceso restringido solo a personal autorizado',
        'Auditorías regulares de seguridad',
        'Protocolos de respaldo y recuperación de datos'
      ]
    },
    {
      icon: Users,
      title: t('privacy.shareInfo'),
      content: [
        'Solo compartimos información con tu consentimiento explícito',
        'Colaboradores necesarios para completar transacciones',
        'Autoridades legales cuando sea requerido por ley',
        'Nunca vendemos información personal a terceros',
        'Transparencia total sobre cualquier uso compartido'
      ]
    },
    {
      icon: Globe,
      title: 'Tus Derechos',
      content: [
        'Acceso a tu información personal',
        'Corrección de datos inexactos',
        'Eliminación de información personal',
        'Portabilidad de datos',
        'Objeción al procesamiento de datos'
      ]
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-white border-b border-border">
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <h1 className="text-4xl font-serif font-bold text-primary mb-4">
                Política de Privacidad
              </h1>
              <p className="text-lg text-secondary max-w-2xl mx-auto">
                Tu privacidad es fundamental para nosotros. Esta política explica cómo recopilamos, 
                utilizamos y protegemos tu información personal.
              </p>
              <p className="text-sm text-secondary mt-4">
                Última actualización: {new Date().toLocaleDateString('es-ES')}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-border">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="bg-accent/10 p-3 rounded-lg flex-shrink-0">
                    <section.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary">
                    {section.title}
                  </h2>
                </div>
                
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact Section */}
            <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-4">
                ¿Tienes Preguntas sobre tu Privacidad?
              </h2>
              <p className="text-white/90 mb-6">
                Si tienes alguna pregunta sobre esta política de privacidad o sobre cómo manejamos 
                tu información personal, no dudes en contactarnos.
              </p>
              <div className="space-y-2 text-white/90">
                <p><strong>Email:</strong> info@tabijihouse.com</p>
                <p><strong>Teléfono:</strong> +81-3-6380-3901 / +81-3-6380-3902</p>
                <p><strong>{t('privacy.address')}</strong></p>
              </div>
            </div>

            {/* Legal Notice */}
            <div className="bg-muted rounded-xl p-6">
              <h3 className="text-lg font-semibold text-primary mb-3">
                Aviso Legal
              </h3>
              <p className="text-secondary text-sm leading-relaxed">
                Esta política de privacidad está sujeta a las leyes japonesas de protección de datos. 
                Nos reservamos el derecho de actualizar esta política en cualquier momento. Los cambios 
                significativos serán notificados a través de nuestro sitio web o por correo electrónico.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPage;
