'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Handshake, 
  Star, 
  Shield, 
  Award, 
  TrendingUp, 
  Users,
  MapPin,
  Building2,
  CheckCircle
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const JNIStrategicAlliance: React.FC = () => {
  const { t } = useLanguage();
  
  const benefits = [
    {
      icon: Shield,
      title: t('jni.verifiedProperties.title'),
      description: t('jni.verifiedProperties.description')
    },
    {
      icon: Award,
      title: t('jni.premiumQuality.title'),
      description: t('jni.premiumQuality.description')
    },
    {
      icon: Users,
      title: t('jni.expertSupport.title'),
      description: t('jni.expertSupport.description')
    },
    {
      icon: TrendingUp,
      title: t('jni.marketInsights.title'),
      description: t('jni.marketInsights.description')
    }
  ];

  const stats = [
    { number: '500+', label: t('jni.stats.propertiesAvailable') },
    { number: '15+', label: t('jni.stats.yearsExperience') },
    { number: '98%', label: t('jni.stats.clientSatisfaction') },
    { number: '¥50B+', label: t('jni.stats.totalTransactions') }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gray-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gray-200 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl flex items-center justify-center">
              <Handshake className="w-6 h-6 text-white" />
            </div>
                <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  {t('jni.strategicAlliance')}
                </span>
              </div>
              
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {t('jni.partnershipTitle')}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {t('jni.partnershipDescription')}
              </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Side - JNI Branding */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* JNI Logo Placeholder */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <div className="flex items-center justify-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">JNI</span>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('jni.companyName')}</h3>
                <p className="text-gray-600 mb-4">{t('jni.companyTagline')}</p>
                
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>{t('jni.locations')}</span>
                </div>
              </div>
            </div>

            {/* Partnership Benefits */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">{t('jni.partnershipBenefits')}</h4>
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 p-4 bg-white/50 rounded-xl"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">{benefit.title}</h5>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Stats & Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-lg text-center border border-gray-100"
                >
                  <div className="text-3xl font-bold text-gray-700 mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Key Features */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Star className="w-5 h-5 text-gray-600" />
                {t('jni.whyChoose.title')}
              </h4>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-gray-900">{t('jni.localExpertise.title')}</h5>
                    <p className="text-sm text-gray-600">{t('jni.localExpertise.description')}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-gray-900">{t('jni.exclusiveAccess.title')}</h5>
                    <p className="text-sm text-gray-600">{t('jni.exclusiveAccess.description')}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-gray-900">{t('jni.endToEndSupport.title')}</h5>
                    <p className="text-sm text-gray-600">{t('jni.endToEndSupport.description')}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl flex items-center justify-center">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold text-gray-900">{t('jni.cta.title')}</h3>
                <p className="text-gray-600">{t('jni.cta.description')}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/projects" 
                className="px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
              >
                {t('jni.cta.viewProperties')}
              </a>
              <button className="px-8 py-4 bg-white border-2 border-gray-600 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300">
                {t('jni.cta.learnMore')}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JNIStrategicAlliance;
