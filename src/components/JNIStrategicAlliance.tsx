'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
  CheckCircle,
  Building,
  Home,
  BarChart3,
  Globe
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import JNILogo from './JNILogo';

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
    { number: '1000+', label: t('jni.stats.propertiesAvailable') },
    { number: '15+', label: t('jni.stats.yearsExperience') },
    { number: '98.3%', label: t('jni.stats.clientSatisfaction') },
    { number: '¥100B+', label: t('jni.stats.totalTransactions') }
  ];

  const achievements = [
    {
      title: '宅地建物取引業',
      subtitle: '国土交通大臣(2)第9062号',
      description: 'Licensed Real Estate Brokerage'
    },
    {
      title: '建設業許可',
      subtitle: '東京都知事許可(般-2)第155783号',
      description: 'Licensed Construction Business'
    },
    {
      title: '従業員数',
      subtitle: '100人以上',
      description: 'More than 100 employees'
    },
    {
      title: '年間取扱物件',
      subtitle: '1000件以上',
      description: '1,000+ properties annually'
    }
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
            {/* JNI Logo */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <div className="flex items-center justify-center mb-6">
                <JNILogo size="lg" showTagline={true} />
              </div>
              
              <div className="text-center">
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

            {/* Achievements */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Achievements & Trust</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-4 bg-gray-50 rounded-lg"
                  >
                    <h5 className="font-semibold text-gray-900 text-sm mb-1">{achievement.title}</h5>
                    <p className="text-xs text-gray-600 mb-1">{achievement.subtitle}</p>
                    <p className="text-xs text-gray-500 italic">{achievement.description}</p>
                  </motion.div>
                ))}
              </div>
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
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-gray-900">{t('jni.assetMaximization.title')}</h5>
                    <p className="text-sm text-gray-600">{t('jni.assetMaximization.description')}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Leadership Section - Toshinori Shibusawa */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Photo */}
              <div className="flex-shrink-0">
                <div className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/澁澤写真.jpg"
                    alt="Toshinori Shibusawa - Representative, JNI Properties Co., Ltd."
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="mb-4">
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                    {t('jni.leadership.name')}
                  </h3>
                  <p className="text-lg text-gray-600 font-medium">
                    {t('jni.leadership.title')}
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 mb-6">
                  <blockquote className="text-gray-700 italic text-base lg:text-lg leading-relaxed">
                    "{t('jni.leadership.message')}"
                  </blockquote>
                </div>
                
                <div className="text-sm text-gray-500">
                  <p className="mb-2">
                    <strong>Licensed Real Estate Brokerage:</strong> Minister of Land, Infrastructure, Transport and Tourism (2) No. 9062
                  </p>
                  <p>
                    <strong>Licensed Construction Business:</strong> Tokyo Governor Permit (般-2) No. 155783
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

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
              <Link 
                href="/projects" 
                className="px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
              >
                {t('jni.cta.viewProperties')}
              </Link>
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
