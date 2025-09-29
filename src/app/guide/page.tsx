'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  FileText, 
  Home,
  MapPin,
  Phone,
  User,
  Calendar
} from 'lucide-react';

const GuidePage = () => {
  const steps = [
    {
      id: 1,
      title: 'Descubrimiento',
      description: 'Explora propiedades disponibles y encuentra tu casa ideal',
      duration: '1-2 semanas',
      icon: Home,
      details: [
        'Búsqueda personalizada según tus criterios',
        'Tours virtuales y visitas en persona',
        'Evaluación de potencial de renovación',
        'Análisis de ubicación y servicios cercanos'
      ]
    },
    {
      id: 2,
      title: 'Evaluación',
      description: 'Análisis detallado de la propiedad y costos estimados',
      duration: '2-3 semanas',
      icon: FileText,
      details: [
        'Inspección técnica completa',
        'Estimación de costos de renovación',
        'Análisis legal y documentación',
        'Evaluación de ROI potencial'
      ]
    },
    {
      id: 3,
      title: 'Negociación',
      description: 'Proceso de compra con soporte legal completo',
      duration: '3-4 semanas',
      icon: DollarSign,
      details: [
        'Negociación de precio y términos',
        'Procesamiento legal de la compra',
        'Gestión de documentación oficial',
        'Transferencia de propiedad'
      ]
    },
    {
      id: 4,
      title: 'Renovación',
      description: 'Transformación de tu casa con artesanos locales',
      duration: '3-6 meses',
      icon: CheckCircle,
      details: [
        'Diseño personalizado del proyecto',
        'Selección de materiales y acabados',
        'Coordinación con artesanos especializados',
        'Supervisión y control de calidad'
      ]
    },
    {
      id: 5,
      title: 'Entrega',
      description: 'Tu nueva casa lista para vivir',
      duration: '1 semana',
      icon: Home,
      details: [
        'Inspección final y entrega',
        'Documentación completa',
        'Orientación sobre mantenimiento',
        'Soporte post-entrega'
      ]
    }
  ];

  const faqs = [
    {
      question: '¿Cuánto tiempo toma todo el proceso?',
      answer: 'El proceso completo puede tomar entre 6 meses y 1 año, dependiendo de la complejidad de la renovación. La compra en sí toma aproximadamente 2-3 meses.'
    },
    {
      question: '¿Puedo financiar la compra?',
      answer: 'Sí, trabajamos con bancos japoneses y internacionales para facilitar opciones de financiamiento. Te ayudamos a encontrar la mejor opción según tu perfil.'
    },
    {
      question: '¿Qué incluye el servicio de renovación?',
      answer: 'Nuestro servicio incluye diseño, permisos, coordinación con artesanos, supervisión de obra y gestión completa del proyecto hasta la entrega.'
    },
    {
      question: '¿Puedo vivir en la casa durante la renovación?',
      answer: 'Depende del alcance de las obras. Para renovaciones menores, es posible. Para renovaciones mayores, te ayudamos a encontrar alojamiento temporal.'
    },
    {
      question: '¿Ofrecen garantías?',
      answer: 'Sí, ofrecemos garantías en materiales y mano de obra según los estándares japoneses, además de soporte post-entrega.'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary to-primary/80 text-white">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Guía Completa para Comprar tu Casa en Japón
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Desde el descubrimiento hasta la entrega, te acompañamos en cada paso de tu viaje hacia tu hogar japonés
              </p>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">
              Nuestro Proceso
            </h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Un proceso estructurado y transparente que te guía desde la búsqueda hasta la entrega de tu casa
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8`}
              >
                <div className="lg:w-1/2">
                  <div className="bg-white rounded-2xl p-8 border border-border shadow-lg">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="bg-accent/10 p-3 rounded-full">
                        <step.icon className="w-8 h-8 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-primary">
                          {step.title}
                        </h3>
                        <div className="flex items-center space-x-2 text-secondary">
                          <Clock className="w-4 h-4" />
                          <span>{step.duration}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-lg text-secondary mb-6">
                      {step.description}
                    </p>
                    
                    <ul className="space-y-3">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                          <span className="text-secondary">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="lg:w-1/2 text-center">
                  <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-8">
                    <div className="text-6xl font-bold text-accent mb-4">
                      {String(step.id).padStart(2, '0')}
                    </div>
                    <div className="text-lg text-secondary">
                      Paso {step.id} de {steps.length}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-muted">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-primary mb-4">
                Preguntas Frecuentes
              </h2>
              <p className="text-lg text-secondary">
                Respuestas a las dudas más comunes sobre nuestro proceso
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 border border-border"
                >
                  <h3 className="text-lg font-semibold text-primary mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary text-white">
          <div className="max-w-4xl mx-auto px-4 py-16 text-center">
            <h2 className="text-3xl font-serif font-bold mb-6">
              ¿Listo para Comenzar tu Viaje?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Agenda una consulta gratuita y descubre cómo podemos ayudarte a encontrar tu casa ideal en Japón
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-accent text-white px-8 py-4 rounded-lg hover:bg-accent/90 transition-colors font-medium flex items-center justify-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Agendar Consulta</span>
              </button>
              <button className="border border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors font-medium flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>Llamar Ahora</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GuidePage;
