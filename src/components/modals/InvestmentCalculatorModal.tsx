'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calculator, DollarSign, TrendingUp, Home } from 'lucide-react';

interface InvestmentCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    propertyValue?: number;
    downPayment?: number;
    monthlyRent?: number;
    expenses?: number;
  };
}

export default function InvestmentCalculatorModal({ isOpen, onClose, initialData }: InvestmentCalculatorModalProps) {
  const [propertyValue, setPropertyValue] = useState(initialData?.propertyValue || 0);
  const [downPayment, setDownPayment] = useState(initialData?.downPayment || 0);
  const [monthlyRent, setMonthlyRent] = useState(initialData?.monthlyRent || 0);
  const [expenses, setExpenses] = useState(initialData?.expenses || 0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(2.5);
  const [loanTerm, setLoanTerm] = useState(30);

  // Cálculos automáticos
  const loanAmountCalculated = propertyValue - downPayment;
  const monthlyPayment = loanAmountCalculated > 0 ? 
    (loanAmountCalculated * (interestRate / 100 / 12) * Math.pow(1 + (interestRate / 100 / 12), loanTerm * 12)) / 
    (Math.pow(1 + (interestRate / 100 / 12), loanTerm * 12) - 1) : 0;
  
  const netMonthlyIncome = monthlyRent - monthlyPayment - expenses;
  const annualROI = downPayment > 0 ? ((netMonthlyIncome * 12) / downPayment) * 100 : 0;
  const capRate = propertyValue > 0 ? ((monthlyRent - expenses) * 12 / propertyValue) * 100 : 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Calculator className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Calculadora de Inversión</h2>
                <p className="text-sm text-gray-600">Análisis detallado de ROI y flujo de caja</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Parámetros de la Inversión</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valor de la Propiedad (¥)
                  </label>
                  <input
                    type="number"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Ej: 50,000,000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enganche (¥)
                  </label>
                  <input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Ej: 10,000,000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Renta Mensual (¥)
                  </label>
                  <input
                    type="number"
                    value={monthlyRent}
                    onChange={(e) => setMonthlyRent(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Ej: 200,000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gastos Mensuales (¥)
                  </label>
                  <input
                    type="number"
                    value={expenses}
                    onChange={(e) => setExpenses(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Ej: 30,000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tasa de Interés (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Ej: 2.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Plazo del Préstamo (años)
                  </label>
                  <input
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Ej: 30"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resultados del Análisis</h3>
              
              <div className="grid grid-cols-1 gap-4">
                {/* ROI Anual */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-green-800">ROI Anual</p>
                        <p className="text-xs text-green-600">Retorno sobre inversión</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-700">
                        {annualROI.toFixed(1)}%
                      </p>
                      <p className="text-xs text-green-600">
                        ¥{(netMonthlyIncome * 12).toLocaleString()}/año
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cap Rate */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Home className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-800">Cap Rate</p>
                        <p className="text-xs text-blue-600">Tasa de capitalización</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-700">
                        {capRate.toFixed(1)}%
                      </p>
                      <p className="text-xs text-blue-600">
                        Sin considerar financiamiento
                      </p>
                    </div>
                  </div>
                </div>

                {/* Flujo de Caja Mensual */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-purple-800">Flujo de Caja</p>
                        <p className="text-xs text-purple-600">Ingreso mensual neto</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${netMonthlyIncome >= 0 ? 'text-purple-700' : 'text-red-600'}`}>
                        ¥{netMonthlyIncome.toLocaleString()}
                      </p>
                      <p className="text-xs text-purple-600">
                        {netMonthlyIncome >= 0 ? 'Positivo' : 'Negativo'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Préstamo Requerido */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Calculator className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">Préstamo Requerido</p>
                        <p className="text-xs text-gray-600">Monto a financiar</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-700">
                        ¥{loanAmountCalculated.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-600">
                        Pago mensual: ¥{monthlyPayment.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recomendaciones */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">Recomendaciones</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  {annualROI < 5 && (
                    <li>• Considera negociar un precio más bajo o buscar propiedades con mayor rentabilidad</li>
                  )}
                  {netMonthlyIncome < 0 && (
                    <li>• El flujo de caja negativo indica que necesitas revisar los números</li>
                  )}
                  {capRate > 8 && (
                    <li>• Excelente oportunidad de inversión con buen cap rate</li>
                  )}
                  {annualROI > 10 && (
                    <li>• Inversión muy atractiva con alto retorno</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}






