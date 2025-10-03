'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  TrendingUp, 
  Home, 
  DollarSign, 
  PieChart, 
  BarChart3,
  Calendar,
  MapPin,
  Building,
  Users,
  Zap,
  AlertTriangle,
  CheckCircle,
  Info,
  Download,
  Share2
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ROIInputs {
  purchasePrice: number;
  renovationCost: number;
  monthlyRentalIncome: number;
  annualAppreciationRate: number;
  investmentPeriod: number;
  propertyTaxRate: number;
  insuranceRate: number;
  managementFeeRate: number;
  maintenanceRate: number;
  vacancyRate: number;
  financingRate: number;
  downPayment: number;
  loanTerm: number;
}

interface ROICalculations {
  totalInvestment: number;
  annualRentalYield: number;
  netOperatingIncome: number;
  cashFlow: number;
  totalReturn: number;
  roiPercentage: number;
  irr: number;
  paybackPeriod: number;
  propertyValue: number;
  equity: number;
  loanBalance: number;
  monthlyPayment: number;
  totalRentalIncome: number;
  totalExpenses: number;
  netCashFlow: number;
  capRate: number;
  grossRentMultiplier: number;
}

const AdvancedROICalculator = () => {
  const { t } = useLanguage();
  const [inputs, setInputs] = useState<ROIInputs>({
    purchasePrice: 8500000,
    renovationCost: 2500000,
    monthlyRentalIncome: 150000,
    annualAppreciationRate: 3,
    investmentPeriod: 5,
    propertyTaxRate: 1.4,
    insuranceRate: 0.5,
    managementFeeRate: 8,
    maintenanceRate: 1,
    vacancyRate: 5,
    financingRate: 3.5,
    downPayment: 30,
    loanTerm: 30
  });

  const [calculations, setCalculations] = useState<ROICalculations | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'scenarios'>('overview');

  // Advanced ROI calculations
  useEffect(() => {
    const calculateROI = (): ROICalculations => {
      const {
        purchasePrice,
        renovationCost,
        monthlyRentalIncome,
        annualAppreciationRate,
        investmentPeriod,
        propertyTaxRate,
        insuranceRate,
        managementFeeRate,
        maintenanceRate,
        vacancyRate,
        financingRate,
        downPayment,
        loanTerm
      } = inputs;

      // Basic calculations
      const totalInvestment = purchasePrice + renovationCost;
      const loanAmount = totalInvestment * (1 - downPayment / 100);
      const downPaymentAmount = totalInvestment * (downPayment / 100);

      // Monthly loan payment calculation
      const monthlyRate = financingRate / 100 / 12;
      const numPayments = loanTerm * 12;
      const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                            (Math.pow(1 + monthlyRate, numPayments) - 1);

      // Annual calculations
      const annualRentalIncome = monthlyRentalIncome * 12;
      const annualVacancyLoss = annualRentalIncome * (vacancyRate / 100);
      const effectiveRentalIncome = annualRentalIncome - annualVacancyLoss;

      // Operating expenses
      const annualPropertyTax = totalInvestment * (propertyTaxRate / 100);
      const annualInsurance = totalInvestment * (insuranceRate / 100);
      const annualManagementFee = effectiveRentalIncome * (managementFeeRate / 100);
      const annualMaintenance = totalInvestment * (maintenanceRate / 100);
      const totalAnnualExpenses = annualPropertyTax + annualInsurance + annualManagementFee + annualMaintenance;

      // Net operating income
      const netOperatingIncome = effectiveRentalIncome - totalAnnualExpenses;

      // Cash flow
      const annualLoanPayments = monthlyPayment * 12;
      const annualCashFlow = netOperatingIncome - annualLoanPayments;

      // Property value appreciation
      const propertyValue = totalInvestment * Math.pow(1 + annualAppreciationRate / 100, investmentPeriod);

      // Loan balance after investment period
      const remainingPayments = Math.max(0, numPayments - (investmentPeriod * 12));
      const loanBalance = remainingPayments > 0 ? 
        monthlyPayment * (1 - Math.pow(1 + monthlyRate, -remainingPayments)) / monthlyRate : 0;

      // Equity calculation
      const equity = propertyValue - loanBalance;

      // Total return calculation
      const totalRentalIncome = effectiveRentalIncome * investmentPeriod;
      const totalExpenses = totalAnnualExpenses * investmentPeriod;
      const totalLoanPayments = annualLoanPayments * investmentPeriod;
      const netCashFlow = (annualCashFlow * investmentPeriod);
      const appreciationGain = propertyValue - totalInvestment;
      const totalReturn = netCashFlow + appreciationGain;

      // ROI and other metrics
      const roiPercentage = (totalReturn / downPaymentAmount) * 100;
      const annualRentalYield = (effectiveRentalIncome / totalInvestment) * 100;
      const capRate = (netOperatingIncome / totalInvestment) * 100;
      const grossRentMultiplier = totalInvestment / annualRentalIncome;

      // IRR approximation (simplified)
      const irr = Math.pow((totalReturn + downPaymentAmount) / downPaymentAmount, 1 / investmentPeriod) - 1;
      const irrPercentage = irr * 100;

      // Payback period
      const paybackPeriod = annualCashFlow > 0 ? downPaymentAmount / annualCashFlow : Infinity;

      return {
        totalInvestment,
        annualRentalYield,
        netOperatingIncome,
        cashFlow: annualCashFlow,
        totalReturn,
        roiPercentage,
        irr: irrPercentage,
        paybackPeriod,
        propertyValue,
        equity,
        loanBalance,
        monthlyPayment,
        totalRentalIncome,
        totalExpenses,
        netCashFlow,
        capRate,
        grossRentMultiplier
      };
    };

    setCalculations(calculateROI());
  }, [inputs]);

  const handleInputChange = (field: keyof ROIInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const getROIColor = (roi: number) => {
    if (roi >= 15) return 'text-green-600';
    if (roi >= 10) return 'text-yellow-600';
    if (roi >= 5) return 'text-orange-600';
    return 'text-red-600';
  };

  const getROIBadge = (roi: number) => {
    if (roi >= 15) return { text: 'Excelente', color: 'bg-green-100 text-green-800' };
    if (roi >= 10) return { text: 'Bueno', color: 'bg-yellow-100 text-yellow-800' };
    if (roi >= 5) return { text: 'Moderado', color: 'bg-orange-100 text-orange-800' };
    return { text: 'Bajo', color: 'bg-red-100 text-red-800' };
  };

  if (!calculations) return null;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Calculator size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold text-primary dark:text-white">
              {t('roi.advancedTitle')}
            </h3>
            <p className="text-secondary dark:text-gray-400">
              {t('roi.advancedSubtitle')}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <BarChart3 size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
          <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <Download size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
          <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <Share2 size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-8 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {[
          { id: 'overview', label: t('roi.overview'), icon: PieChart },
          { id: 'detailed', label: t('roi.detailed'), icon: BarChart3 },
          { id: 'scenarios', label: t('roi.scenarios'), icon: TrendingUp }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-700 text-primary dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <tab.icon size={16} />
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-primary dark:text-white mb-4">
            {t('roi.inputs')}
          </h4>

          {/* Basic Information */}
          <div className="space-y-4">
            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">
              {t('roi.basicInfo')}
            </h5>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-semibold text-primary dark:text-white mb-2">
                  {t('roi.purchasePrice')}
                </label>
                <input
                  type="number"
                  value={inputs.purchasePrice}
                  onChange={(e) => handleInputChange('purchasePrice', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary dark:text-white mb-2">
                  {t('roi.renovationCost')}
                </label>
                <input
                  type="number"
                  value={inputs.renovationCost}
                  onChange={(e) => handleInputChange('renovationCost', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary dark:text-white mb-2">
                  {t('roi.monthlyRental')}
                </label>
                <input
                  type="number"
                  value={inputs.monthlyRentalIncome}
                  onChange={(e) => handleInputChange('monthlyRentalIncome', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Financial Parameters */}
          <div className="space-y-4">
            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">
              {t('roi.financialParams')}
            </h5>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-primary dark:text-white mb-2">
                  {t('roi.appreciationRate')} (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.annualAppreciationRate}
                  onChange={(e) => handleInputChange('annualAppreciationRate', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary dark:text-white mb-2">
                  {t('roi.investmentPeriod')} ({t('roi.years')})
                </label>
                <input
                  type="number"
                  value={inputs.investmentPeriod}
                  onChange={(e) => handleInputChange('investmentPeriod', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary dark:text-white mb-2">
                  {t('roi.downPayment')} (%)
                </label>
                <input
                  type="number"
                  value={inputs.downPayment}
                  onChange={(e) => handleInputChange('downPayment', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary dark:text-white mb-2">
                  {t('roi.financingRate')} (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.financingRate}
                  onChange={(e) => handleInputChange('financingRate', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Expenses */}
          <div className="space-y-4">
            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">
              {t('roi.expenses')}
            </h5>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-primary dark:text-white mb-2">
                  {t('roi.propertyTax')} (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.propertyTaxRate}
                  onChange={(e) => handleInputChange('propertyTaxRate', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary dark:text-white mb-2">
                  {t('roi.insurance')} (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.insuranceRate}
                  onChange={(e) => handleInputChange('insuranceRate', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary dark:text-white mb-2">
                  {t('roi.managementFee')} (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.managementFeeRate}
                  onChange={(e) => handleInputChange('managementFeeRate', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary dark:text-white mb-2">
                  {t('roi.vacancyRate')} (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.vacancyRate}
                  onChange={(e) => handleInputChange('vacancyRate', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-primary dark:text-white mb-4">
            {t('roi.results')}
          </h4>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 rounded-xl p-6 border border-primary/20 dark:border-primary/30"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <TrendingUp size={20} className="text-primary" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-primary dark:text-white">
                      {t('roi.totalROI')}
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t('roi.roiDescription')}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getROIBadge(calculations.roiPercentage).color}`}>
                  {getROIBadge(calculations.roiPercentage).text}
                </span>
              </div>
              <div className="text-3xl font-bold text-primary dark:text-white">
                {formatPercentage(calculations.roiPercentage)}
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign size={16} className="text-green-600" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {t('roi.totalReturn')}
                  </span>
                </div>
                <div className="text-xl font-bold text-green-600">
                  {formatCurrency(calculations.totalReturn)}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2 mb-2">
                  <Home size={16} className="text-blue-600" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {t('roi.propertyValue')}
                  </span>
                </div>
                <div className="text-xl font-bold text-blue-600">
                  {formatCurrency(calculations.propertyValue)}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2 mb-2">
                  <PieChart size={16} className="text-purple-600" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {t('roi.capRate')}
                  </span>
                </div>
                <div className="text-xl font-bold text-purple-600">
                  {formatPercentage(calculations.capRate)}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar size={16} className="text-orange-600" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {t('roi.paybackPeriod')}
                  </span>
                </div>
                <div className="text-xl font-bold text-orange-600">
                  {calculations.paybackPeriod === Infinity ? '∞' : `${calculations.paybackPeriod.toFixed(1)} ${t('roi.years')}`}
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                <h5 className="text-lg font-semibold text-primary dark:text-white">
                  {t('roi.detailedBreakdown')}
                </h5>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">{t('roi.totalInvestment')}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(calculations.totalInvestment)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">{t('roi.totalRentalIncome')}</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(calculations.totalRentalIncome)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">{t('roi.totalExpenses')}</span>
                    <span className="font-semibold text-red-600">
                      -{formatCurrency(calculations.totalExpenses)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">{t('roi.appreciationGain')}</span>
                    <span className="font-semibold text-blue-600">
                      {formatCurrency(calculations.propertyValue - calculations.totalInvestment)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 bg-gray-50 dark:bg-gray-800 rounded-lg px-4">
                    <span className="font-semibold text-primary dark:text-white">{t('roi.netCashFlow')}</span>
                    <span className="font-bold text-primary dark:text-white">
                      {formatCurrency(calculations.netCashFlow)}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdvancedROICalculator;

