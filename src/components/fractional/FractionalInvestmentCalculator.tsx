'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  PieChart,
  Calendar,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Info
} from 'lucide-react';
import { FractionalProperty, InvestmentCalculation } from '@/types/fractional';
import FractionalPaymentFlow from './FractionalPaymentFlow';
import { useLanguage } from '@/contexts/LanguageContext';

interface FractionalInvestmentCalculatorProps {
  property: FractionalProperty | null;
  onClose: () => void;
}

export default function FractionalInvestmentCalculator({ 
  property, 
  onClose 
}: FractionalInvestmentCalculatorProps) {
  const { t } = useLanguage();
  const [shares, setShares] = useState(1);
  const [calculation, setCalculation] = useState<InvestmentCalculation | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    if (property) {
      calculateInvestment();
    }
  }, [shares, property]);

  const calculateInvestment = () => {
    if (!property) return;

    const totalCost = shares * property.pricePerShare;
    const managementFee = totalCost * (property.fees.managementFee / 100);
    const totalFees = managementFee;
    const netInvestment = totalCost - totalFees;
    
    const estimatedMonthlyIncome = (shares / property.totalShares) * property.monthlyRentalIncome;
    const estimatedAnnualIncome = estimatedMonthlyIncome * 12;
    const estimatedROI = (estimatedAnnualIncome / totalCost) * 100;

    setCalculation({
      sharesToPurchase: shares,
      totalCost,
      estimatedMonthlyIncome,
      estimatedAnnualIncome,
      estimatedROI,
      fees: {
        managementFee,
        totalFees
      },
      netInvestment
    });
  };

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

  const handleSharesChange = (value: number) => {
    if (!property) return;
    
    const maxShares = Math.min(
      property.availableShares,
      Math.floor(property.maximumInvestment / property.pricePerShare)
    );
    
    const minShares = Math.ceil(property.minimumInvestment / property.pricePerShare);
    
    const newShares = Math.max(minShares, Math.min(maxShares, value));
    setShares(newShares);
  };

  if (!property || !calculation) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Calculator className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {t('fractional.calculator.title')}
                </h2>
                  <p className="text-gray-600">{property.name}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Investment Controls */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('fractional.calculator.subtitle')}
                  </h3>
                  
                  {/* Shares Input */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('fractional.calculator.sharesLabel')}
                      </label>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleSharesChange(shares - 1)}
                          disabled={shares <= Math.ceil(property.minimumInvestment / property.pricePerShare)}
                          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={shares}
                          onChange={(e) => handleSharesChange(parseInt(e.target.value) || 1)}
                          min={Math.ceil(property.minimumInvestment / property.pricePerShare)}
                          max={Math.min(
                            property.availableShares,
                            Math.floor(property.maximumInvestment / property.pricePerShare)
                          )}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-center font-semibold"
                        />
                        <button
                          onClick={() => handleSharesChange(shares + 1)}
                          disabled={shares >= Math.min(
                            property.availableShares,
                            Math.floor(property.maximumInvestment / property.pricePerShare)
                          )}
                          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          +
                        </button>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        {t('fractional.calculator.minimum')}: {Math.ceil(property.minimumInvestment / property.pricePerShare)} | 
                        {t('fractional.calculator.maximum')}: {Math.min(
                          property.availableShares,
                          Math.floor(property.maximumInvestment / property.pricePerShare)
                        )}
                      </div>
                    </div>

                    {/* Investment Amount */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">
                          {t('fractional.calculator.totalInvestment')}
                        </span>
                        <span className="text-2xl font-bold text-gray-900">
                          {formatCurrency(calculation.totalCost)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {t('fractional.calculator.sharesCost', {
                          shares: shares.toString(),
                          plural: shares !== 1 ? 'es' : '',
                          price: formatCurrency(property.pricePerShare)
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Investment Limits */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">
                        {t('fractional.calculator.investmentLimits')}
                      </h4>
                      <div className="text-sm text-blue-700 space-y-1">
                        <div>• {t('fractional.calculator.minimumInvestment', { amount: formatCurrency(property.minimumInvestment) })}</div>
                        <div>• {t('fractional.calculator.maximumInvestment', { amount: formatCurrency(property.maximumInvestment) })}</div>
                        <div>• {t('fractional.calculator.availableShares', { shares: property.availableShares.toString() })}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calculation Results */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t('fractional.calculator.projectionTitle')}
                </h3>

                <div className="space-y-4">
                  {/* Monthly Income */}
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Calendar className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium text-green-900">
                            {t('fractional.calculator.monthlyIncome')}
                          </div>
                          <div className="text-sm text-green-700">
                            {t('fractional.calculator.monthlyIncomeSubtitle')}
                          </div>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                        {formatCurrency(calculation.estimatedMonthlyIncome)}
                      </div>
                    </div>
                  </div>

                  {/* Annual Income */}
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <DollarSign className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-blue-900">
                            {t('fractional.calculator.annualIncome')}
                          </div>
                          <div className="text-sm text-blue-700">
                            {t('fractional.calculator.annualIncomeSubtitle')}
                          </div>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">
                        {formatCurrency(calculation.estimatedAnnualIncome)}
                      </div>
                    </div>
                  </div>

                  {/* ROI */}
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <TrendingUp className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="font-medium text-purple-900">
                            {t('fractional.calculator.roi')}
                          </div>
                          <div className="text-sm text-purple-700">
                            {t('fractional.calculator.roiSubtitle')}
                          </div>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-purple-600">
                        {formatPercentage(calculation.estimatedROI)}
                      </div>
                    </div>
                  </div>

                  {/* Fees */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{t('fractional.calculator.managementFee')}</span>
                        <span className="font-medium">{formatCurrency(calculation.fees.managementFee)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{t('fractional.calculator.netInvestment')}</span>
                        <span className="font-bold text-gray-900">{formatCurrency(calculation.netInvestment)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowPayment(true)}
                  className="w-full py-4 bg-indigo-600 text-white rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
                >
                  {t('fractional.calculator.proceedInvestment')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.button>

                {/* Disclaimer */}
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div className="text-sm text-yellow-800">
                      <strong>Importante:</strong> {t('fractional.calculator.disclaimer')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Payment Flow Modal */}
      {showPayment && property && calculation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <FractionalPaymentFlow
            property={property}
            calculation={calculation}
            onSuccess={(paymentId) => {
              setShowPayment(false);
              onClose();
              // Aquí podrías mostrar una notificación de éxito o redirigir
            }}
            onCancel={() => setShowPayment(false)}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
