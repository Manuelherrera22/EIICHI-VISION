'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Building2,
  MapPin,
  Shield,
  Crown,
  Users,
  TrendingUp,
  CheckCircle,
  Star,
  Award,
  Globe,
  Briefcase,
  Target,
  Heart,
  BarChart3,
  Building,
  Home,
  Key,
  Handshake
} from 'lucide-react';

const JNIPartnership: React.FC = () => {
  const { t } = useLanguage();

  const achievements = [
    {
      icon: Building2,
      title: '宅地建物取引業',
      subtitle: '国土交通大臣(2)第9062号',
      description: 'Licensed Real Estate Brokerage'
    },
    {
      icon: Award,
      title: '建設業許可',
      subtitle: '東京都知事許可(般-2)第155783号',
      description: 'Licensed Construction Business'
    },
    {
      icon: Users,
      title: '従業員数',
      subtitle: '100人以上',
      description: 'More than 100 employees'
    },
    {
      icon: Home,
      title: '年間取扱物件',
      subtitle: '1000件以上',
      description: '1,000+ properties annually'
    },
    {
      icon: TrendingUp,
      title: '業界経験',
      subtitle: '15年以上',
      description: '15+ years of experience'
    },
    {
      icon: Star,
      title: '顧客満足度',
      subtitle: '98.3%',
      description: '98.3% client satisfaction'
    },
    {
      icon: BarChart3,
      title: '累計取引実績',
      subtitle: '1000億円以上',
      description: 'Over JPY 100 billion'
    }
  ];

  const partnershipBenefits = [
    {
      icon: Shield,
      title: '厳選された物件',
      description: '徹底した検証と基準をクリアした安心の不動産',
      english: 'Only properties that pass strict verification and quality standards'
    },
    {
      icon: Crown,
      title: 'プレミアム品質',
      description: '最高基準を満たすハイグレード物件',
      english: 'High-grade assets that meet the highest market benchmarks'
    },
    {
      icon: Heart,
      title: '心を込めたサポート',
      description: '日本人ならではのホスピタリティで一貫対応',
      english: 'Distinctive Japanese hospitality with seamless assistance'
    },
    {
      icon: BarChart3,
      title: '市場インサイト',
      description: '詳細な分析とリアルタイムレポート',
      english: 'In-depth analysis and real-time reporting'
    }
  ];

  const whyChooseUs = [
    {
      icon: Globe,
      title: '国内市場に精通',
      description: '日本特有の商慣習や規制に精通したプロフェッショナル',
      english: 'Professionals well-versed in Japan\'s unique business practices'
    },
    {
      icon: Key,
      title: '希少な投資機会',
      description: '市場に出回りにくいプレミアム不動産をご紹介',
      english: 'Premium properties rarely available on the open market'
    },
    {
      icon: Handshake,
      title: 'トータルサポート',
      description: '物件探しから所有まで一貫した支援',
      english: 'End-to-end guidance from property search to ownership'
    },
    {
      icon: Target,
      title: '資産価値の最大化',
      description: '購入から運用・管理まで一貫して支援',
      english: 'Ongoing support from purchase through operation'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">JNI</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                JNI.STRATEGICALLIANCE
              </h1>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              Strategic Partnership with JNI Properties
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
              Trusted Expertise and Proven Track Record in Japan's Real Estate Market
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Company Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 sm:mb-12"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
              {/* Company Logo and Info */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Globe className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                    JNI Properties Co., Ltd.
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-2">
                    Your Reliable Real Estate Partner in Japan
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>Headquartered in Tokyo, with offices in Saitama, Chiba, and Osaka</span>
                  </div>
                </div>
              </div>

              {/* Key Statistics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full lg:w-auto">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-900 mb-1">500+</div>
                  <div className="text-xs sm:text-sm text-blue-700">Properties Available</div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-green-900 mb-1">15+</div>
                  <div className="text-xs sm:text-sm text-green-700">Years Experience</div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-900 mb-1">98%</div>
                  <div className="text-xs sm:text-sm text-purple-700">Client Satisfaction</div>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-4 text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-orange-900 mb-1">¥50B+</div>
                  <div className="text-xs sm:text-sm text-orange-700">Total Transactions</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 sm:mb-12"
        >
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Achievements & Trust
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Licensed and certified with comprehensive real estate services
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                        {achievement.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {achievement.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 italic">
                    {achievement.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Partnership Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 sm:mb-12"
        >
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Partnership Benefits
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Why our strategic partnership delivers exceptional value
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {partnershipBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white rounded-xl p-6 sm:p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-sm sm:text-base text-gray-600 mb-3">
                        {benefit.description}
                      </p>
                      <p className="text-xs text-gray-500 italic">
                        {benefit.english}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 sm:mb-12"
        >
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Star className="w-6 h-6 text-yellow-500" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Why Choose Us
              </h3>
            </div>
            <p className="text-sm sm:text-base text-gray-600">
              Our competitive advantages in the Japanese real estate market
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {whyChooseUs.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white rounded-xl p-6 sm:p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                        {reason.title}
                      </h4>
                      <p className="text-sm sm:text-base text-gray-600 mb-3">
                        {reason.description}
                      </p>
                      <p className="text-xs text-gray-500 italic">
                        {reason.english}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">
              Ready to Partner with JNI Properties?
            </h3>
            <p className="text-sm sm:text-base text-blue-100 mb-6 max-w-2xl mx-auto">
              Join our network of successful investors and benefit from our proven track record in Japan's real estate market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Learn More About Partnership
              </button>
              <button className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Contact Our Team
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default JNIPartnership;
