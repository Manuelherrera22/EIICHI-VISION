'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  PieChart, 
  ArrowRight,
  Shield,
  Target,
  Zap,
  Building2,
  MapPin,
  Calendar,
  Star
} from 'lucide-react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import FractionalPropertyCard from '@/components/fractional/FractionalPropertyCard';
import FractionalInvestmentCalculator from '@/components/fractional/FractionalInvestmentCalculator';
import FractionalMetrics from '@/components/fractional/FractionalMetrics';
import { FractionalProperty, FractionalMetrics as FractionalMetricsType } from '@/types/fractional';

export default function FractionalPage() {
  const { t } = useLanguage();
  const [selectedProperty, setSelectedProperty] = useState<FractionalProperty | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [properties, setProperties] = useState<FractionalProperty[]>([]);
  const [metrics, setMetrics] = useState<FractionalMetricsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar propiedades y métricas desde la API
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        // Cargar propiedades
        const propertiesResponse = await fetch('/api/fractional/properties');
        if (!propertiesResponse.ok) {
          throw new Error('Failed to fetch properties');
        }
        const propertiesData = await propertiesResponse.json();
        setProperties(propertiesData.data || []);

        // Cargar métricas
        const metricsResponse = await fetch('/api/fractional/metrics');
        if (!metricsResponse.ok) {
          throw new Error('Failed to fetch metrics');
        }
        const metricsData = await metricsResponse.json();
        setMetrics(metricsData.data || null);
      } catch (err: any) {
        console.error('Error loading fractional data:', err);
        setError(err.message || 'Failed to load data');
        // Fallback a datos vacíos
        setProperties([]);
        setMetrics(null);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8 text-primary" />,
      title: t('fractional.benefits.accessibility.title'),
      description: t('fractional.benefits.accessibility.description')
    },
    {
      icon: <PieChart className="w-8 h-8 text-primary" />,
      title: t('fractional.benefits.diversification.title'),
      description: t('fractional.benefits.diversification.description')
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: t('fractional.benefits.roi.title'),
      description: t('fractional.benefits.roi.description')
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: t('fractional.benefits.management.title'),
      description: t('fractional.benefits.management.description')
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-white to-muted">
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              {t('fractional.hero.badge')}
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
              {t('fractional.title')} <span className="text-secondary">{t('navigation.fractional')}</span>
            </h1>
            
            <p className="text-xl text-secondary mb-8 leading-relaxed">
              {t('fractional.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Si hay propiedades, seleccionar la primera por defecto
                  if (properties.length > 0 && !selectedProperty) {
                    setSelectedProperty(properties[0]);
                  }
                  setShowCalculator(true);
                }}
                className="px-8 py-4 bg-primary text-black rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg"
              >
                {t('fractional.cta.calculate')}
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 border-2 border-primary text-primary rounded-xl font-semibold text-lg hover:bg-primary/10 transition-colors"
              >
                {t('fractional.cta.viewProperties')}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">
              {t('fractional.benefits.title')}
            </h2>
            <p className="text-xl text-secondary max-w-3xl mx-auto">
              {t('fractional.benefits.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-muted hover:bg-primary/10 transition-colors"
              >
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">
                  {benefit.title}
                </h3>
                <p className="text-secondary">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          {metrics && <FractionalMetrics metrics={metrics} />}
        </div>
      </section>

      {/* Properties Section */}
      <section id="properties" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">
              {t('fractional.properties.title')}
            </h2>
            <p className="text-xl text-secondary max-w-3xl mx-auto">
              {t('fractional.properties.subtitle')}
            </p>
          </motion.div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90"
              >
                Reintentar
              </button>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600">No hay propiedades disponibles en este momento.</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <FractionalPropertyCard
                  property={property}
                  onSelect={() => setSelectedProperty(property)}
                  onInvest={() => {
                    setSelectedProperty(property);
                    setShowCalculator(true);
                  }}
                />
              </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">
              {t('fractional.howItWorks.title')}
            </h2>
            <p className="text-xl text-secondary max-w-3xl mx-auto">
              {t('fractional.howItWorks.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: t('fractional.howItWorks.step1.title'),
                description: t('fractional.howItWorks.step1.description'),
                icon: <Target className="w-8 h-8" />
              },
              {
                step: "02", 
                title: t('fractional.howItWorks.step2.title'),
                description: t('fractional.howItWorks.step2.description'),
                icon: <DollarSign className="w-8 h-8" />
              },
              {
                step: "03",
                title: t('fractional.howItWorks.step3.title'),
                description: t('fractional.howItWorks.step3.description'),
                icon: <Building2 className="w-8 h-8" />
              },
              {
                step: "04",
                title: t('fractional.howItWorks.step4.title'),
                description: t('fractional.howItWorks.step4.description'),
                icon: <TrendingUp className="w-8 h-8" />
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-primary text-black rounded-full flex items-center justify-center mx-auto mb-4">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-secondary">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-black mb-6">
              {t('fractional.cta.readyTitle')}
            </h2>
            <p className="text-xl text-secondary mb-8 max-w-3xl mx-auto">
              {t('fractional.cta.readyDescription')}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                // Si hay propiedades, seleccionar la primera por defecto
                if (properties.length > 0 && !selectedProperty) {
                  setSelectedProperty(properties[0]);
                }
                setShowCalculator(true);
              }}
              className="px-8 py-4 bg-black text-white rounded-xl font-semibold text-lg hover:bg-secondary transition-colors shadow-lg"
            >
              {t('fractional.cta.startInvestment')}
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Investment Calculator Modal */}
      {showCalculator && (
        <FractionalInvestmentCalculator
          property={selectedProperty || (properties.length > 0 ? properties[0] : null)}
          onClose={() => {
            setShowCalculator(false);
            // No resetear selectedProperty si fue seleccionada desde una tarjeta
            if (!selectedProperty) {
              setSelectedProperty(null);
            }
          }}
        />
      )}
    </Layout>
  );
}
