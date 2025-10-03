'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Users,
  DollarSign,
  Target,
  Clock,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Download,
  Filter,
  Calendar,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon
} from 'lucide-react';

interface MetricData {
  timestamp: string;
  value: number;
  category: string;
}

interface RealtimeMetricsProps {
  userId: string;
  analysis: any;
}

const RealtimeMetrics: React.FC<RealtimeMetricsProps> = ({ userId, analysis }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('24h');
  const [isLive, setIsLive] = useState(true);
  const [metrics, setMetrics] = useState({
    investmentReadiness: [] as MetricData[],
    migrationReadiness: [] as MetricData[],
    lifestyleAlignment: [] as MetricData[],
    marketTrends: [] as MetricData[],
    userEngagement: [] as MetricData[]
  });

  // Colores para los gráficos
  const colors = {
    primary: '#3B82F6',
    secondary: '#10B981',
    accent: '#F59E0B',
    danger: '#EF4444',
    purple: '#8B5CF6',
    pink: '#EC4899'
  };

  // Generar datos simulados en tiempo real
  useEffect(() => {
    if (!isLive) return;

    const generateData = () => {
      const now = new Date();
      const data: MetricData[] = [];
      
      for (let i = 23; i >= 0; i--) {
        const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
        data.push({
          timestamp: timestamp.toISOString(),
          value: Math.random() * 100,
          category: 'investment'
        });
      }
      
      return data;
    };

    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        investmentReadiness: generateData(),
        migrationReadiness: generateData().map(d => ({ ...d, value: d.value * 0.9 })),
        lifestyleAlignment: generateData().map(d => ({ ...d, value: d.value * 1.1 })),
        marketTrends: generateData().map(d => ({ ...d, value: d.value * 0.8 })),
        userEngagement: generateData().map(d => ({ ...d, value: d.value * 1.2 }))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [isLive]);

  // Datos para gráfico de pie
  const pieData = [
    { name: t('metrics.realtime.investment'), value: analysis.investmentReadiness.score, color: colors.primary },
    { name: t('metrics.realtime.migration'), value: analysis.migrationReadiness.score, color: colors.secondary },
    { name: t('metrics.realtime.lifestyle'), value: analysis.lifestyleAlignment.score, color: colors.accent }
  ];

  const tabs = [
    { id: 'overview', label: t('metrics.realtime.summary'), icon: BarChart3 },
    { id: 'trends', label: t('metrics.realtime.trends'), icon: LineChartIcon },
    { id: 'comparison', label: t('metrics.realtime.comparison'), icon: PieChartIcon },
    { id: 'predictions', label: t('metrics.realtime.predictions'), icon: Target }
  ];

  const timeRanges = [
    { id: '1h', label: t('metrics.timePeriod.1h') },
    { id: '24h', label: t('metrics.timePeriod.24h') },
    { id: '7d', label: t('metrics.timePeriod.7d') },
    { id: '30d', label: t('metrics.timePeriod.30d') }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{t('metrics.realtime.title')}</h3>
            <p className="text-sm text-gray-500">{t('metrics.realtime.subtitle')}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Live Toggle */}
          <button
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isLive 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-gray-100 text-gray-700 border border-gray-200'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
            <span className="text-sm font-medium">{isLive ? t('metrics.realtime.live') : t('metrics.realtime.paused')}</span>
          </button>
          
          {/* Refresh Button */}
          <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
            <RefreshCw className="w-5 h-5" />
          </button>
          
          {/* Export Button */}
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm">{t('metrics.realtime.export')}</span>
          </button>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex items-center space-x-2 mb-6">
        <Calendar className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-600">{t('metrics.timePeriod.period')}:</span>
        <div className="flex space-x-1">
          {timeRanges.map((range) => (
            <button
              key={range.id}
              onClick={() => setTimeRange(range.id)}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                timeRange === range.id
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600 font-medium">{t('metrics.realtime.iviAverage')}</p>
                    <p className="text-2xl font-bold text-blue-900">{analysis.investmentReadiness.score}%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <div className="mt-2 text-xs text-blue-700">
                  +2.3% {t('metrics.realtime.vsYesterday')}
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600 font-medium">{t('metrics.realtime.ivmAverage')}</p>
                    <p className="text-2xl font-bold text-green-900">{analysis.migrationReadiness.score}%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <div className="mt-2 text-xs text-green-700">
                  +1.8% {t('metrics.realtime.vsYesterday')}
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-600 font-medium">{t('metrics.realtime.iseAverage')}</p>
                    <p className="text-2xl font-bold text-purple-900">{analysis.lifestyleAlignment.score}%</p>
                  </div>
                  <TrendingDown className="w-8 h-8 text-purple-600" />
                </div>
                <div className="mt-2 text-xs text-purple-700">
                  -0.5% {t('metrics.realtime.vsYesterday')}
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-orange-600 font-medium">{t('metrics.realtime.engagement')}</p>
                    <p className="text-2xl font-bold text-orange-900">{analysis.engagementLevel}</p>
                  </div>
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
                <div className="mt-2 text-xs text-orange-700">
                  {t('metrics.realtime.stable')}
                </div>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Line Chart */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">{t('metrics.realtime.performanceTrend')}</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={metrics.investmentReadiness}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis 
                      dataKey="timestamp" 
                      tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                      stroke="#6B7280"
                    />
                    <YAxis stroke="#6B7280" />
                    <Tooltip 
                      labelFormatter={(value) => new Date(value).toLocaleString()}
                      formatter={(value) => [`${value}%`, 'Rendimiento']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke={colors.primary} 
                      strokeWidth={3}
                      dot={{ fill: colors.primary, strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">{t('metrics.realtime.metricsDistribution')}</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Valor']} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center space-x-4 mt-4">
                  {pieData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'trends' && (
          <motion.div
            key="trends"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Area Chart */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">{t('aiPredictions.temporalEvolution')}</h4>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={metrics.investmentReadiness}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="timestamp" 
                    tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                    stroke="#6B7280"
                  />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleString()}
                    formatter={(value) => [`${value}%`, 'Valor']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke={colors.primary} 
                    fill={colors.primary}
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {activeTab === 'comparison' && (
          <motion.div
            key="comparison"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Bar Chart */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">{t('metrics.realtime.metricsComparison')}</h4>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={pieData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip formatter={(value) => [`${value}%`, 'Valor']} />
                  <Bar dataKey="value" fill={colors.primary} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {activeTab === 'predictions' && (
          <motion.div
            key="predictions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* AI Predictions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center space-x-3 mb-4">
                  <Target className="w-6 h-6 text-blue-600" />
                  <h4 className="text-lg font-semibold text-gray-900">{t('aiPredictions.title')}</h4>
                </div>
                <p className="text-gray-700 mb-4">
                  {t('aiPredictions.description')}
                </p>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-green-600 font-medium">{t('aiPredictions.confidence', { confidence: String(87) })}</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                  <h4 className="text-lg font-semibold text-gray-900">{t('recommendations.title')}</h4>
                </div>
                <p className="text-gray-700 mb-4">
                  {t('recommendations.description')}
                </p>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-sm text-blue-600 font-medium">{t('recommendations.priority', { priority: t('recommendations.priorityHigh') })}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RealtimeMetrics;
