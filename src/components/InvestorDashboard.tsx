'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardFramework from './DashboardFramework'
import WeeklyPulseWidget from './WeeklyPulseWidget'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  TrendingUp, 
  Building, 
  DollarSign, 
  BarChart, 
  MessageSquare,
  Eye,
  Calculator,
  Star,
  Plus,
  Filter,
  Search,
  ArrowRight,
  Users,
  Briefcase,
  Target
} from 'lucide-react'

interface Property {
  id: string
  name: string
  location: string
  price: number
  potentialIndex: number
  status: 'explorando' | 'analisis' | 'simulacion' | 'oferta'
  analyst: string
  image: string
}

interface BusinessOpportunity {
  id: string
  title: string
  type: string
  investment: number
  roi: number
  description: string
  saved: boolean
}

const InvestorDashboard: React.FC<{ userProfile: any }> = ({ userProfile }) => {
  const router = useRouter()
  const { t } = useLanguage()
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [showSimulator, setShowSimulator] = useState(false)

  // Datos de ejemplo
  const properties: Property[] = [
    {
      id: '1',
      name: 'Casa Tradicional Kusatsu',
      location: 'Kusatsu, Gunma',
      price: 45000000,
      potentialIndex: 85,
      status: 'analisis',
      analyst: 'María Tanaka',
      image: '/api/placeholder/300/200'
    },
    {
      id: '2',
      name: 'Apartamento Moderno',
      location: 'Takasaki, Gunma',
      price: 32000000,
      potentialIndex: 72,
      status: 'simulacion',
      analyst: 'Carlos Sato',
      image: '/api/placeholder/300/200'
    }
  ]

  const businessOpportunities: BusinessOpportunity[] = [
    {
      id: '1',
      title: t('dashboard.investor.opportunities.artisanCafe.title'),
      type: t('dashboard.investor.opportunities.artisanCafe.type'),
      investment: 15000000,
      roi: 18,
      description: t('dashboard.investor.opportunities.artisanCafe.description'),
      saved: false
    },
    {
      id: '2',
      title: t('dashboard.investor.opportunities.localCrafts.title'),
      type: t('dashboard.investor.opportunities.localCrafts.type'),
      investment: 8000000,
      roi: 22,
      description: t('dashboard.investor.opportunities.localCrafts.description'),
      saved: true
    }
  ]

  const nextSteps = [
    {
      id: '1',
      title: t('dashboard.investor.nextSteps.review3DAnalysis'),
      description: t('dashboard.investor.nextSteps.traditionalHouseAnalysis'),
      status: 'in_progress' as const,
      priority: 'high' as const,
      dueDate: t('common.today')
    },
    {
      id: '2',
      title: t('dashboard.investor.nextSteps.calculateROI'),
      description: t('dashboard.investor.nextSteps.simulateSynergy'),
      status: 'pending' as const,
      priority: 'medium' as const,
      dueDate: t('common.tomorrow')
    },
    {
      id: '3',
      title: t('dashboard.investor.nextSteps.meetingWithAnalyst'),
      description: t('dashboard.investor.nextSteps.sessionWithMaría'),
      status: 'pending' as const,
      priority: 'low' as const,
      dueDate: t('common.friday')
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'explorando':
        return 'bg-blue-100 text-blue-800'
      case 'analisis':
        return 'bg-yellow-100 text-yellow-800'
      case 'simulacion':
        return 'bg-purple-100 text-purple-800'
      case 'oferta':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'explorando':
        return t('dashboard.investor.status.exploring')
      case 'analisis':
        return t('dashboard.investor.status.inAnalysis')
      case 'simulacion':
        return t('dashboard.investor.status.roiSimulation')
      case 'oferta':
        return t('dashboard.investor.status.readyForOffer')
      default:
        return status
    }
  }

  return (
    <DashboardFramework
      userProfile={userProfile}
      nextSteps={nextSteps}
      dashboardType="invertir"
    >
      <div className="space-y-8">
        {/* Tu Pulso Semanal */}
        <WeeklyPulseWidget 
          userProfile={userProfile} 
          dashboardType="invertir" 
        />

        {/* Módulo Principal: Mi Portafolio de Oportunidades */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <Building className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{t('dashboard.investor.portfolio.title')}</h3>
                <p className="text-sm text-gray-600">{t('dashboard.investor.portfolio.description')}</p>
              </div>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <Plus className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">{t('dashboard.investor.portfolio.addProperty')}</span>
            </button>
          </div>

          {/* Pipeline Visual */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {['explorando', 'analisis', 'simulacion', 'oferta'].map((status) => (
              <div key={status} className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  {getStatusLabel(status)}
                </h4>
                <div className="space-y-3">
                  {properties
                    .filter(prop => prop.status === status)
                    .map((property) => (
                      <div
                        key={property.id}
                        className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedProperty(property)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-sm font-medium text-gray-800 truncate">
                            {property.name}
                          </h5>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-500" />
                            <span className="text-xs text-gray-600">{property.potentialIndex}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{property.location}</p>
                        <p className="text-sm font-semibold text-gray-800">
                          ¥{(property.price / 1000000).toFixed(1)}M
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{property.analyst}</span>
                          </div>
                          <button className="text-xs text-blue-600 hover:text-blue-800">
                            Chat
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Marketplace de Negocios */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{t('dashboard.investor.marketplace.title')}</h3>
                <p className="text-sm text-gray-600">{t('dashboard.investor.marketplace.description')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Search className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {businessOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{opportunity.title}</h4>
                    <p className="text-sm text-gray-600">{opportunity.type}</p>
                  </div>
                  <button className={`p-2 rounded-full ${opportunity.saved ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}>
                    <Star className={`w-4 h-4 ${opportunity.saved ? 'fill-current' : ''}`} />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-3">{opportunity.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{t('dashboard.investor.investment')}</p>
                    <p className="text-lg font-semibold text-gray-800">
                      ¥{(opportunity.investment / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t('dashboard.investor.projectedROI')}</p>
                    <p className="text-lg font-semibold text-green-600">{opportunity.roi}%</p>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <button 
                    className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
                    onClick={() => router.push(`/dashboard/properties/${property.id}`)}
                  >
                    {t('common.viewDetails')}
                  </button>
                  <button 
                    className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors text-sm font-medium"
                    onClick={() => setShowSimulator(true)}
                  >
                    Simular Sinergia
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Centro Financiero */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{t('dashboard.investor.financialCenter.title')}</h3>
              <p className="text-sm text-gray-600">{t('dashboard.investor.financialCenter.description')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">{t('dashboard.investor.financialCenter.totalBudget')}</h4>
              <p className="text-2xl font-bold text-gray-800">¥150M</p>
              <p className="text-xs text-gray-600 mt-1">{t('dashboard.investor.financialCenter.availableForInvestment')}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">{t('dashboard.investor.financialCenter.averageROI')}</h4>
              <p className="text-2xl font-bold text-green-600">18.5%</p>
              <p className="text-xs text-gray-600 mt-1">{t('dashboard.investor.financialCenter.projectedAnnualReturn')}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">{t('dashboard.investor.financialCenter.monthlyFlow')}</h4>
              <p className="text-2xl font-bold text-blue-600">¥2.3M</p>
              <p className="text-xs text-gray-600 mt-1">{t('dashboard.investor.financialCenter.rentalIncome')}</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardFramework>
  )
}

export default InvestorDashboard
