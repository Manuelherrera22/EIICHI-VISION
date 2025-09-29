'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { CRMService, NotificationService } from '@/lib/crm';
import { useLanguage } from '@/contexts/LanguageContext';

interface FormData {
  name: string;
  email: string;
  phone: string;
  country: string;
  budget: string;
  interest: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    country: '',
    budget: '',
    interest: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t } = useLanguage();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validación de nombre
    if (!formData.name.trim()) {
      newErrors.name = t('contact.nameRequired');
    } else if (formData.name.trim().length < 2) {
      newErrors.name = t('contact.nameMinLength');
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = t('contact.emailRequired');
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t('contact.emailInvalid');
    }

    // Validación de teléfono
    if (!formData.phone.trim()) {
      newErrors.phone = t('contact.phoneRequired');
    }

    // Validación de país
    if (!formData.country.trim()) {
      newErrors.country = t('contact.countryRequired');
    }

    // Validación de presupuesto
    if (!formData.budget) {
      newErrors.budget = t('contact.budgetRequired');
    }

    // Validación de interés
    if (!formData.interest) {
      newErrors.interest = t('contact.interestRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Crear lead en CRM
      const lead = await CRMService.createLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        budget: formData.budget,
        interest: formData.interest,
        message: formData.message,
        source: 'contact_form',
        status: 'new'
      });

      // Enviar notificaciones
      await NotificationService.sendLeadNotification(lead);
      await NotificationService.sendConfirmationEmail(formData.email, 'lead');
      
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        country: '',
        budget: '',
        interest: '',
        message: ''
      });
    } catch (error) {
      console.error('Error al enviar formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-primary mb-2">
          {t('contact.messageSent')}
        </h3>
        <p className="text-secondary mb-6">
          {t('contact.thankYou')}
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
        >
          {t('contact.sendAnother')}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-serif font-bold text-primary mb-2">
          {t('contact.startJourney')}
        </h3>
        <p className="text-secondary">
          {t('contact.completeForm')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
            {t('contact.fullName')} *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
              errors.name ? 'border-red-300 bg-red-50' : 'border-border'
            }`}
            placeholder={t('contact.namePlaceholder')}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={16} className="mr-1" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Email y Teléfono */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
              {t('contact.email')} *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                errors.email ? 'border-red-300 bg-red-50' : 'border-border'
              }`}
              placeholder={t('contact.emailPlaceholder')}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={16} className="mr-1" />
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-primary mb-2">
              {t('contact.phone')} *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                errors.phone ? 'border-red-300 bg-red-50' : 'border-border'
              }`}
              placeholder={t('contact.phonePlaceholder')}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={16} className="mr-1" />
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* País y Presupuesto */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-primary mb-2">
              {t('contact.country')} *
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                errors.country ? 'border-red-300 bg-red-50' : 'border-border'
              }`}
            >
              <option value="">{t('contact.selectCountry')}</option>
              <option value="US">{t('contact.countries.us')}</option>
              <option value="CA">{t('contact.countries.ca')}</option>
              <option value="MX">{t('contact.countries.mx')}</option>
              <option value="BR">{t('contact.countries.br')}</option>
              <option value="AR">{t('contact.countries.ar')}</option>
              <option value="CL">{t('contact.countries.cl')}</option>
              <option value="CO">{t('contact.countries.co')}</option>
              <option value="PE">{t('contact.countries.pe')}</option>
              <option value="other">{t('contact.countries.other')}</option>
            </select>
            {errors.country && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={16} className="mr-1" />
                {errors.country}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-primary mb-2">
              {t('contact.budget')} *
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                errors.budget ? 'border-red-300 bg-red-50' : 'border-border'
              }`}
            >
              <option value="">{t('contact.selectBudget')}</option>
              <option value="50k-100k">$50,000 - $100,000</option>
              <option value="100k-200k">$100,000 - $200,000</option>
              <option value="200k-500k">$200,000 - $500,000</option>
              <option value="500k-1m">$500,000 - $1,000,000</option>
              <option value="1m+">$1,000,000+</option>
            </select>
            {errors.budget && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={16} className="mr-1" />
                {errors.budget}
              </p>
            )}
          </div>
        </div>

        {/* Área de Interés */}
        <div>
          <label htmlFor="interest" className="block text-sm font-medium text-primary mb-2">
            {t('contact.interest')} *
          </label>
          <select
            id="interest"
            name="interest"
            value={formData.interest}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
              errors.interest ? 'border-red-300 bg-red-50' : 'border-border'
            }`}
          >
            <option value="">{t('contact.selectInterest')}</option>
            <option value="investment">{t('contact.interests.investment')}</option>
            <option value="residence">{t('contact.interests.residence')}</option>
            <option value="vacation">{t('contact.interests.vacation')}</option>
            <option value="business">{t('contact.interests.business')}</option>
            <option value="consultation">{t('contact.interests.consultation')}</option>
          </select>
          {errors.interest && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={16} className="mr-1" />
              {errors.interest}
            </p>
          )}
        </div>

        {/* Mensaje */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
            {t('contact.message')}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
            placeholder={t('contact.messagePlaceholder')}
          />
        </div>

        {/* Botón de Envío */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>{t('contact.sending')}</span>
            </>
          ) : (
            <>
              <Send size={20} />
              <span>{t('contact.sendMessage')}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
