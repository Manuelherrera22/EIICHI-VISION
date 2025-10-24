'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  Calendar,
  Building2,
  Download,
  Eye,
  ArrowRight,
  Star,
  Target,
  Users,
  BarChart3,
  FileText,
  Bell,
  Settings
} from 'lucide-react';
import { FractionalDashboard, FractionalInvestment, FractionalProperty } from '@/types/fractional';
import { useLanguage } from '@/contexts/LanguageContext';

interface FractionalInvestorDashboardProps {
  investorId: string;
}

export default function FractionalInvestorDashboard({ investorId }: FractionalInvestorDashboardProps) {
  const { t } = useLanguage();
  const [dashboard, setDashboard] = useState<FractionalDashboard | null>(null);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'portfolio' | 'transactions' | 'documents'>('overview');
  const [loading, setLoading] = useState(true);

  // Datos de ejemplo
  useEffect(() => {
    const mockDashboard: FractionalDashboard = {
      totalInvestments: 3,
      totalValue: 25600,
      totalShares: 4,
      averageROI: 12.3,
      monthlyIncome: 320,
      properties: [
        {
          id: 'fractional-1',
          name: 'Casa del Calígrafo',
          description: 'Propiedad tradicional en Kusatsu',
          location: 'Kusatsu, Gunma',
          prefecture: 'Gunma',
          totalValue: 128500,
          totalShares: 20,
          pricePerShare: 6425,
          availableShares: 15,
          soldShares: 5,
          images: ['/images/properties/caligrafo-1.jpg'],
          features: ['Onsen cercano', 'Arquitectura tradicional'],
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
        }
      ],
      recentInvestments: [
        {
          id: 'inv-1',
          propertyId: 'fractional-1',
          investorId: investorId,
          sharesPurchased: 2,
          totalAmount: 12850,
          purchaseDate: '2025-01-10',
          status: 'completed',
          paymentMethod: 'stripe',
          transactionId: 'tx_123456789',
          documents: {
            investmentAgreement: '/documents/inv-1-agreement.pdf',
            shareCertificate: '/documents/inv-1-certificate.pdf'
          }
        }
      ],
      performanceMetrics: {
        totalReturn: 15.2,
        annualizedReturn: 12.3,
        dividendYield: 8.5,
        capitalGains: 6.8
      }
    };

    setTimeout(() => {
      setDashboard(mockDashboard);
      setLoading(false);
    }, 1000);
  }, [investorId]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Error al cargar el dashboard</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', name: 'Resumen', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'portfolio', name: 'Portafolio', icon: <PieChart className="w-4 h-4" /> },
    { id: 'transactions', name: 'Transacciones', icon: <Calendar className="w-4 h-4" /> },
    { id: 'documents', name: 'Documentos', icon: <FileText className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {t('fractional.dashboard.title')}
                </h1>
                <p className="text-gray-600 mt-1">
                  {t('fractional.dashboard.subtitle')}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Bell className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{t('fractional.dashboard.totalValue')}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(dashboard.totalValue)}
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{t('fractional.dashboard.averageROI')}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatPercentage(dashboard.averageROI)}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{t('fractional.dashboard.monthlyIncome')}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(dashboard.monthlyIncome)}
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{t('fractional.dashboard.totalShares')}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {dashboard.totalShares}
                    </p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <PieChart className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t('fractional.dashboard.portfolioPerformance')}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">{t('fractional.dashboard.totalReturn')}</span>
                    <span className="text-xl font-bold text-green-600">
                      {formatPercentage(dashboard.performanceMetrics.totalReturn)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">{t('fractional.dashboard.annualizedReturn')}</span>
                    <span className="text-xl font-bold text-blue-600">
                      {formatPercentage(dashboard.performanceMetrics.annualizedReturn)}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">{t('fractional.dashboard.dividendYield')}</span>
                    <span className="text-xl font-bold text-purple-600">
                      {formatPercentage(dashboard.performanceMetrics.dividendYield)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">{t('fractional.dashboard.capitalGains')}</span>
                    <span className="text-xl font-bold text-orange-600">
                      {formatPercentage(dashboard.performanceMetrics.capitalGains)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Investments */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t('fractional.dashboard.recentInvestments')}
              </h3>
              <div className="space-y-4">
                {dashboard.recentInvestments.map((investment) => (
                  <div key={investment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <Building2 className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {dashboard.properties.find(p => p.id === investment.propertyId)?.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {investment.sharesPurchased} fracción{investment.sharesPurchased !== 1 ? 'es' : ''} • {formatDate(investment.purchaseDate)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatCurrency(investment.totalAmount)}
                      </p>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Completado
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Portfolio Tab */}
        {selectedTab === 'portfolio' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Mis Propiedades
              </h3>
              <div className="grid gap-6">
                {dashboard.properties.map((property) => (
                  <div key={property.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">
                          {property.name}
                        </h4>
                        <p className="text-gray-600 mb-4">{property.location}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Valor Total</p>
                            <p className="font-semibold">{formatCurrency(property.totalValue)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">ROI Esperado</p>
                            <p className="font-semibold">{formatPercentage(property.estimatedROI)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Estado</p>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              {property.status}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Completado</p>
                            <p className="font-semibold">
                              {property.expectedCompletionDate ? 
                                formatDate(property.expectedCompletionDate) : 'TBD'
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Transactions Tab */}
        {selectedTab === 'transactions' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Historial de Transacciones
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Propiedad
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fracciones
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Monto
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dashboard.recentInvestments.map((investment) => (
                      <tr key={investment.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {dashboard.properties.find(p => p.id === investment.propertyId)?.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {investment.sharesPurchased}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(investment.totalAmount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(investment.purchaseDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {investment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Documents Tab */}
        {selectedTab === 'documents' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Documentos de Inversión
              </h3>
              <div className="space-y-4">
                {dashboard.recentInvestments.map((investment) => (
                  <div key={investment.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {dashboard.properties.find(p => p.id === investment.propertyId)?.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {investment.sharesPurchased} fracción{investment.sharesPurchased !== 1 ? 'es' : ''} • {formatDate(investment.purchaseDate)}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center">
                          <Download className="w-4 h-4 mr-2" />
                          Descargar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
