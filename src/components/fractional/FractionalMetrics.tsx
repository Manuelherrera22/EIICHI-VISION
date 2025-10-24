'use client';

import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Building2,
  Target,
  PieChart
} from 'lucide-react';
import { FractionalMetrics as FractionalMetricsType } from '@/types/fractional';
import { useLanguage } from '@/contexts/LanguageContext';

interface FractionalMetricsProps {
  metrics: FractionalMetricsType;
}

export default function FractionalMetrics({ metrics }: FractionalMetricsProps) {
  const { t } = useLanguage();
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatPercentage = (value: number) => {
    return `${value}%`;
  };

  const metricCards = [
    {
      icon: <Building2 className="w-8 h-8 text-indigo-600" />,
      title: t('fractional.metrics.properties.title'),
      value: formatNumber(metrics.totalProperties),
      subtitle: t('fractional.metrics.properties.subtitle'),
      color: "bg-indigo-50 border-indigo-200"
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: t('fractional.metrics.investors.title'),
      value: formatNumber(metrics.totalInvestors),
      subtitle: t('fractional.metrics.investors.subtitle'),
      color: "bg-green-50 border-green-200"
    },
    {
      icon: <DollarSign className="w-8 h-8 text-blue-600" />,
      title: t('fractional.metrics.capital.title'),
      value: formatCurrency(metrics.totalCapitalRaised),
      subtitle: t('fractional.metrics.capital.subtitle'),
      color: "bg-blue-50 border-blue-200"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
      title: t('fractional.metrics.roi.title'),
      value: formatPercentage(metrics.averageROI),
      subtitle: t('fractional.metrics.roi.subtitle'),
      color: "bg-purple-50 border-purple-200"
    },
    {
      icon: <PieChart className="w-8 h-8 text-orange-600" />,
      title: t('fractional.metrics.averageInvestment.title'),
      value: formatCurrency(metrics.averageInvestmentSize),
      subtitle: t('fractional.metrics.averageInvestment.subtitle'),
      color: "bg-orange-50 border-orange-200"
    },
    {
      icon: <Target className="w-8 h-8 text-red-600" />,
      title: t('fractional.metrics.successRate.title'),
      value: formatPercentage(metrics.fundingSuccessRate),
      subtitle: t('fractional.metrics.successRate.subtitle'),
      color: "bg-red-50 border-red-200"
    }
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          {t('fractional.metrics.title')}
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {t('fractional.metrics.subtitle')}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metricCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`p-6 rounded-2xl border-2 ${card.color} hover:shadow-lg transition-all duration-300`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                {card.icon}
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">
                  {card.value}
                </div>
                <div className="text-sm text-gray-600">
                  {card.subtitle}
                </div>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              {card.title}
            </h3>
          </motion.div>
        ))}
      </div>

      {/* Performance Summary */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-16 bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {t('fractional.metrics.performance.title')}
          </h3>
          <p className="text-gray-600">
            {t('fractional.metrics.performance.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">{t('fractional.metrics.retentionRate')}</span>
              <span className="text-2xl font-bold text-green-600">
                {formatPercentage(metrics.investorRetentionRate)}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">{t('fractional.metrics.capitalPerProperty')}</span>
              <span className="text-2xl font-bold text-blue-600">
                {formatCurrency(metrics.totalCapitalRaised / metrics.totalProperties)}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">{t('fractional.metrics.investorsPerProperty')}</span>
              <span className="text-2xl font-bold text-purple-600">
                {Math.round(metrics.totalInvestors / metrics.totalProperties)}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">{t('fractional.metrics.vsTraditional')}</span>
              <span className="text-2xl font-bold text-indigo-600">
                +{formatPercentage(metrics.averageROI - 8)}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
