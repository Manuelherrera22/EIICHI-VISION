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

// Datos de ejemplo para propiedades fraccionadas
const sampleProperties: FractionalProperty[] = [
  {
    id: 'fractional-1',
    name: 'Casa del Calígrafo',
    description: 'Una hermosa casa tradicional japonesa en Kusatsu, perfecta para fraccionamiento. Ubicada cerca de aguas termales y con potencial de alquiler turístico.',
    location: 'Kusatsu, Gunma',
    prefecture: 'Gunma',
    totalValue: 128500,
    totalShares: 20,
    pricePerShare: 6425,
    availableShares: 15,
    soldShares: 5,
    images: ['/images/properties/caligrafo-1.jpg', '/images/properties/caligrafo-2.jpg'],
    features: ['Onsen cercano', 'Arquitectura tradicional', 'Jardín privado', 'Cerca de estación'],
    renovationStatus: 'original',
    estimatedROI: 12.5,
    monthlyRentalIncome: 1200,
    propertyType: 'akiya',
    yearBuilt: 1985,
    landSize: 200,
    buildingSize: 85,
    status: 'funding',
    fundingGoal: 128500,
    currentFunding: 32125,
    fundingProgress: 25,
    expectedCompletionDate: '2025-06-15',
    legalStructure: 'spv',
    minimumInvestment: 6425,
    maximumInvestment: 25700,
    fees: {
      managementFee: 1.5,
      performanceFee: 10,
      exitFee: 2
    },
    documents: {
      prospectus: '/documents/caligrafo-prospectus.pdf',
      legalAgreement: '/documents/caligrafo-agreement.pdf',
      financialProjections: '/documents/caligrafo-projections.pdf'
    },
    createdAt: '2025-01-15',
    updatedAt: '2025-01-15'
  },
  {
    id: 'fractional-2',
    name: 'Retiro del Artesano',
    description: 'Casa renovada con técnicas tradicionales japonesas, ideal para inversión fraccionada. Excelente ubicación para turismo cultural.',
    location: 'Takasaki, Gunma',
    prefecture: 'Gunma',
    totalValue: 95000,
    totalShares: 15,
    pricePerShare: 6333,
    availableShares: 8,
    soldShares: 7,
    images: ['/images/properties/artesano-1.jpg', '/images/properties/artesano-2.jpg'],
    features: ['Renovación completa', 'Cocina moderna', 'Baño tradicional', 'Estacionamiento'],
    renovationStatus: 'renovated',
    estimatedROI: 11.8,
    monthlyRentalIncome: 950,
    propertyType: 'traditional',
    yearBuilt: 1975,
    landSize: 150,
    buildingSize: 75,
    status: 'funding',
    fundingGoal: 95000,
    currentFunding: 44331,
    fundingProgress: 47,
    expectedCompletionDate: '2025-05-30',
    legalStructure: 'spv',
    minimumInvestment: 6333,
    maximumInvestment: 19000,
    fees: {
      managementFee: 1.5,
      performanceFee: 10,
      exitFee: 2
    },
    documents: {
      prospectus: '/documents/artesano-prospectus.pdf',
      legalAgreement: '/documents/artesano-agreement.pdf',
      financialProjections: '/documents/artesano-projections.pdf'
    },
    createdAt: '2025-01-10',
    updatedAt: '2025-01-15'
  }
];

const sampleMetrics: FractionalMetricsType = {
  totalProperties: 2,
  totalInvestors: 12,
  totalCapitalRaised: 76456,
  averageInvestmentSize: 6371,
  averageROI: 12.15,
  fundingSuccessRate: 85,
  investorRetentionRate: 92
};

export default function FractionalPage() {
  const { t } = useLanguage();
  const [selectedProperty, setSelectedProperty] = useState<FractionalProperty | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);

  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8 text-indigo-600" />,
      title: t('fractional.benefits.accessibility.title'),
      description: t('fractional.benefits.accessibility.description')
    },
    {
      icon: <PieChart className="w-8 h-8 text-indigo-600" />,
      title: t('fractional.benefits.diversification.title'),
      description: t('fractional.benefits.diversification.description')
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-indigo-600" />,
      title: t('fractional.benefits.roi.title'),
      description: t('fractional.benefits.roi.description')
    },
    {
      icon: <Shield className="w-8 h-8 text-indigo-600" />,
      title: t('fractional.benefits.management.title'),
      description: t('fractional.benefits.management.description')
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              {t('fractional.hero.badge')}
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('fractional.title')} <span className="text-indigo-600">{t('navigation.fractional')}</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {t('fractional.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCalculator(true)}
                className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-colors"
              >
                {t('fractional.cta.calculate')}
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 rounded-xl font-semibold text-lg hover:bg-indigo-50 transition-colors"
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('fractional.benefits.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-indigo-50 transition-colors"
              >
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-20 bg-indigo-50">
        <div className="container mx-auto px-4">
          <FractionalMetrics metrics={sampleMetrics} />
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('fractional.properties.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('fractional.properties.subtitle')}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {sampleProperties.map((property, index) => (
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('fractional.howItWorks.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                  <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              {t('fractional.cta.readyTitle')}
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              {t('fractional.cta.readyDescription')}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCalculator(true)}
              className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors"
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
          property={selectedProperty}
          onClose={() => {
            setShowCalculator(false);
            setSelectedProperty(null);
          }}
        />
      )}
    </Layout>
  );
}
