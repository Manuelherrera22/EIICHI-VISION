'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { TabijiPaymentService, PaymentRequest, TabijiProductType } from '@/lib/payments/payment-service';
import { 
  CreditCard, 
  Banknote, 
  Smartphone, 
  Store, 
  Globe, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  ArrowRight,
  Shield,
  Lock,
  MapPin,
  Calendar,
  User,
  Mail,
  Phone,
  Building
} from 'lucide-react';

interface PaymentFormProps {
  productType: TabijiProductType;
  amount: number;
  currency: string;
  region: 'japan' | 'international';
  propertyId?: string;
  projectId?: string;
  onSuccess?: (sessionId: string) => void;
  onCancel?: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  productType,
  amount,
  currency,
  region,
  propertyId,
  projectId,
  onSuccess,
  onCancel
}) => {
  const { t } = useLanguage();
  const [step, setStep] = useState<'form' | 'processing' | 'success' | 'error'>('form');
  const [paymentMethod, setPaymentMethod] = useState<'checkout' | 'direct'>('checkout');
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Validación del formulario
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = t('payment.form.nameRequired');
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = t('payment.form.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = t('payment.form.emailInvalid');
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = t('payment.form.phoneRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Procesar pago
  const handlePayment = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setStep('processing');

    try {
      const paymentRequest: PaymentRequest = {
        amount: amount,
        currency: currency,
        productType: productType,
        customerEmail: formData.customerEmail,
        customerName: formData.customerName,
        metadata: {
          propertyId: propertyId,
          projectId: projectId,
          clientId: `client_${Date.now()}`,
          serviceType: productType,
          region: region,
        },
      };

      let session;
      if (paymentMethod === 'checkout') {
        session = await TabijiPaymentService.createPropertyPaymentSession(paymentRequest);
        // Redirigir a Stripe Checkout
        if (session.url) {
          window.location.href = session.url;
        }
      } else {
        session = await TabijiPaymentService.createPaymentIntent(paymentRequest);
        // Aquí se implementaría el pago directo con Stripe Elements
        console.log('Payment intent created:', session);
      }

      setStep('success');
      if (onSuccess && session.id) {
        onSuccess(session.id);
      }
    } catch (error) {
      console.error('Payment error:', error);
      setStep('error');
    } finally {
      setIsLoading(false);
    }
  };

  // Métodos de pago disponibles según la región
  const getPaymentMethods = () => {
    if (region === 'japan') {
      return [
        { id: 'card', name: t('payment.methods.card'), icon: CreditCard },
        { id: 'konbini', name: t('payment.methods.konbini'), icon: Store },
        { id: 'bank_transfer', name: t('payment.methods.bankTransfer'), icon: Banknote },
        { id: 'pay_easy', name: t('payment.methods.payEasy'), icon: Smartphone },
      ];
    } else {
      return [
        { id: 'card', name: t('payment.methods.card'), icon: CreditCard },
        { id: 'apple_pay', name: t('payment.methods.applePay'), icon: Smartphone },
        { id: 'google_pay', name: t('payment.methods.googlePay'), icon: Smartphone },
        { id: 'klarna', name: t('payment.methods.klarna'), icon: Globe },
      ];
    }
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  if (step === 'processing') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {t('payment.processing.title')}
          </h3>
          <p className="text-gray-600">
            {t('payment.processing.description')}
          </p>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
        <CheckCircle className="w-16 h-16 text-green-600" />
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {t('payment.success.title')}
          </h3>
          <p className="text-gray-600 mb-4">
            {t('payment.success.description')}
          </p>
          <div className="flex space-x-4">
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t('payment.success.goToDashboard')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'error') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
        <AlertCircle className="w-16 h-16 text-red-600" />
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {t('payment.error.title')}
          </h3>
          <p className="text-gray-600 mb-4">
            {t('payment.error.description')}
          </p>
          <button
            onClick={() => setStep('form')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('payment.error.tryAgain')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('payment.title')}
        </h2>
        <p className="text-gray-600">
          {t('payment.subtitle')}
        </p>
      </div>

      {/* Resumen del pago */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700">{t('payment.summary.amount')}</span>
          <span className="text-2xl font-bold text-gray-900">
            {formatAmount(amount, currency)}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>{t('payment.summary.service')}</span>
          <span>{t(`payment.services.${productType}`)}</span>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>{t('payment.summary.region')}</span>
          <span className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {region === 'japan' ? t('payment.regions.japan') : t('payment.regions.international')}
          </span>
        </div>
      </div>

      {/* Información del cliente */}
      <div className="space-y-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <User className="w-5 h-5 mr-2" />
          {t('payment.customerInfo')}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('payment.form.name')} *
            </label>
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.customerName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={t('payment.form.namePlaceholder')}
            />
            {errors.customerName && (
              <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('payment.form.email')} *
            </label>
            <input
              type="email"
              value={formData.customerEmail}
              onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.customerEmail ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={t('payment.form.emailPlaceholder')}
            />
            {errors.customerEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.customerEmail}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('payment.form.phone')} *
            </label>
            <input
              type="tel"
              value={formData.customerPhone}
              onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.customerPhone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={t('payment.form.phonePlaceholder')}
            />
            {errors.customerPhone && (
              <p className="text-red-500 text-sm mt-1">{errors.customerPhone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('payment.form.address')}
            </label>
            <input
              type="text"
              value={formData.customerAddress}
              onChange={(e) => setFormData({ ...formData, customerAddress: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={t('payment.form.addressPlaceholder')}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('payment.form.notes')}
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={t('payment.form.notesPlaceholder')}
          />
        </div>
      </div>

      {/* Métodos de pago */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {t('payment.methods.title')}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {getPaymentMethods().map((method) => {
            const Icon = method.icon;
            return (
              <button
                key={method.id}
                className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <Icon className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">{method.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Seguridad */}
      <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-6">
        <Shield className="w-4 h-4" />
        <Lock className="w-4 h-4" />
        <span>{t('payment.security')}</span>
      </div>

      {/* Botones */}
      <div className="flex space-x-4">
        <button
          onClick={onCancel}
          className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          {t('payment.cancel')}
        </button>
        <button
          onClick={handlePayment}
          disabled={isLoading}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
          ) : (
            <ArrowRight className="w-5 h-5 mr-2" />
          )}
          {t('payment.payNow')}
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;

