'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  Lock,
  DollarSign,
  Calendar,
  FileText
} from 'lucide-react';
import { FractionalProperty, InvestmentCalculation } from '@/types/fractional';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

interface FractionalPaymentFlowProps {
  property: FractionalProperty;
  calculation: InvestmentCalculation;
  onSuccess: (paymentId: string) => void;
  onCancel: () => void;
}

export default function FractionalPaymentFlow({ 
  property, 
  calculation, 
  onSuccess, 
  onCancel 
}: FractionalPaymentFlowProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [step, setStep] = useState<'review' | 'payment' | 'processing' | 'success'>('review');
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'bank_transfer'>('stripe');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handlePayment = async () => {
    setStep('processing');
    setProcessing(true);

    try {
      setError(null);

      // Verificar que el usuario esté autenticado
      if (!user?.id) {
        throw new Error('Debes iniciar sesión para realizar una inversión');
      }

      // Crear inversión en la base de datos
      const investmentResponse = await fetch('/api/fractional/investments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propertyId: property.id,
          investorId: user.id,
          sharesPurchased: calculation.sharesToPurchase,
          totalAmount: calculation.totalCost,
          paymentMethod: paymentMethod
        }),
      });

      if (!investmentResponse.ok) {
        const errorData = await investmentResponse.json();
        throw new Error(errorData.error || 'Failed to create investment');
      }

      const investmentData = await investmentResponse.json();
      const investmentId = investmentData.data.id;

      // Simular procesamiento de pago (aquí se integraría con Stripe, etc.)
      // En producción, esto sería una llamada real a Stripe
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simular transaction ID (en producción vendría de Stripe)
      const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Confirmar inversión después del pago exitoso
      const confirmResponse = await fetch('/api/fractional/investments/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          investmentId: investmentId,
          transactionId: transactionId
        }),
      });

      if (!confirmResponse.ok) {
        throw new Error('Failed to confirm investment');
      }

      setProcessing(false);
      setStep('success');
      
      // Notificar éxito después de mostrar mensaje
      setTimeout(() => {
        onSuccess(investmentId);
      }, 2000);
    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message || 'Error al procesar el pago');
      setProcessing(false);
      setStep('payment'); // Volver al paso de pago
    }
  };

  const steps = [
    { id: 'review', name: 'Revisar', icon: <FileText className="w-4 h-4" /> },
    { id: 'payment', name: 'Pagar', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'processing', name: 'Procesando', icon: <Lock className="w-4 h-4" /> },
    { id: 'success', name: 'Completado', icon: <CheckCircle className="w-4 h-4" /> }
  ];

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Progress Steps */}
      <div className="bg-gray-50 px-6 py-4">
        <div className="flex items-center justify-between">
          {steps.map((stepItem, index) => (
            <div key={stepItem.id} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step === stepItem.id 
                  ? 'bg-primary text-black' 
                  : steps.indexOf(steps.find(s => s.id === step)!) > index
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 text-gray-600'
              }`}>
                {stepItem.icon}
              </div>
              <span className={`ml-2 text-sm font-medium ${
                step === stepItem.id ? 'text-primary' : 'text-gray-600'
              }`}>
                {stepItem.name}
              </span>
              {index < steps.length - 1 && (
                <div className="w-8 h-px bg-gray-300 mx-4" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* Review Step */}
        {step === 'review' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t('fractional.payment.title')}
              </h2>
              <p className="text-gray-600">
                {t('fractional.payment.subtitle')}
              </p>
            </div>

            {/* Property Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{property.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{property.location}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">{t('fractional.dashboard.shares')}:</span>
                  <span className="font-medium ml-2">{calculation.sharesToPurchase}</span>
                </div>
                <div>
                  <span className="text-gray-600">{t('fractional.property.pricePerShare')}:</span>
                  <span className="font-medium ml-2">{formatCurrency(property.pricePerShare)}</span>
                </div>
                <div>
                  <span className="text-gray-600">{t('fractional.property.expectedROI')}:</span>
                  <span className="font-medium ml-2">{property.estimatedROI.toFixed(1)}%</span>
                </div>
                <div>
                  <span className="text-gray-600">{t('fractional.property.completed')}:</span>
                  <span className="font-medium ml-2">
                    {property.expectedCompletionDate ? 
                      new Date(property.expectedCompletionDate).toLocaleDateString('es-ES') : 'TBD'
                    }
                  </span>
                </div>
              </div>
            </div>

            {/* Investment Summary */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Resumen de Inversión</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatCurrency(calculation.totalCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('fractional.calculator.managementFee')}</span>
                  <span className="font-medium">{formatCurrency(calculation.fees.managementFee)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>{t('fractional.payment.totalToPay')}</span>
                    <span className="text-primary">{formatCurrency(calculation.totalCost)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  Acepto los{' '}
                  <a href="#" className="text-primary hover:text-primary/80 underline">
                    términos y condiciones
                  </a>{' '}
                  y el{' '}
                  <a href="#" className="text-primary hover:text-primary/80 underline">
                    acuerdo de inversión
                  </a>
                </label>
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="risk"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1"
                />
                <label htmlFor="risk" className="text-sm text-gray-600">
                  Entiendo los riesgos asociados con la inversión inmobiliaria fraccionada
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={onCancel}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {t('fractional.payment.back')}
              </button>
              <button
                onClick={() => setStep('payment')}
                disabled={!agreedToTerms}
                className="flex-1 px-6 py-3 bg-primary text-black rounded-lg hover:bg-primary/90 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-lg"
              >
                Proceder al Pago
              </button>
            </div>
          </motion.div>
        )}

        {/* Payment Step */}
        {step === 'payment' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t('fractional.payment.methodTitle')}
              </h2>
              <p className="text-gray-600">
                {t('fractional.payment.methodSubtitle')}
              </p>
            </div>

            {/* Payment Methods */}
            <div className="space-y-4">
              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  paymentMethod === 'stripe' 
                    ? 'border-primary bg-primary/10' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setPaymentMethod('stripe')}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    checked={paymentMethod === 'stripe'}
                    onChange={() => setPaymentMethod('stripe')}
                  />
                  <CreditCard className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="font-medium text-gray-900">{t('fractional.payment.creditCard')}</div>
                    <div className="text-sm text-gray-600">{t('fractional.payment.creditCardSubtitle')}</div>
                  </div>
                </div>
              </div>

              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  paymentMethod === 'bank_transfer' 
                    ? 'border-primary bg-primary/10' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setPaymentMethod('bank_transfer')}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    checked={paymentMethod === 'bank_transfer'}
                    onChange={() => setPaymentMethod('bank_transfer')}
                  />
                  <Shield className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="font-medium text-gray-900">{t('fractional.payment.bankTransfer')}</div>
                    <div className="text-sm text-gray-600">{t('fractional.payment.bankTransferSubtitle')}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Amount */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-900">Total a pagar</span>
                <span className="text-2xl font-bold text-primary">
                  {formatCurrency(calculation.totalCost)}
                </span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-800">Error</p>
                    <p className="text-sm text-red-600 mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Security Notice */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                <div className="text-sm text-green-800">
                  <strong>Pago Seguro:</strong> Todas las transacciones están protegidas con encriptación SSL 
                  y procesadas por Stripe, líder mundial en pagos seguros.
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={() => setStep('review')}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Volver
              </button>
              <button
                onClick={handlePayment}
                className="flex-1 px-6 py-3 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center shadow-lg"
              >
                <Lock className="w-4 h-4 mr-2" />
                {t('fractional.payment.pay', { amount: formatCurrency(calculation.totalCost) })}
              </button>
            </div>
          </motion.div>
        )}

        {/* Processing Step */}
        {step === 'processing' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-6"></div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t('fractional.payment.processing')}
              </h2>
              <p className="text-gray-600">
                {t('fractional.payment.processingSubtitle')}
              </p>
          </motion.div>
        )}

        {/* Success Step */}
        {step === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {t('fractional.payment.success')}
            </h2>
            <p className="text-gray-600 mb-6">
              {t('fractional.payment.successSubtitle', { property: property.name })}
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="text-sm text-gray-600 space-y-1">
                <div>{t('fractional.payment.sharesAcquired', { shares: calculation.sharesToPurchase.toString() })}</div>
                <div>{t('fractional.payment.amountInvested', { amount: formatCurrency(calculation.totalCost) })}</div>
                <div>{t('fractional.payment.date', { date: new Date().toLocaleDateString('es-ES') })}</div>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {t('fractional.payment.confirmationEmail')}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
