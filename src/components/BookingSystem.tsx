'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Mail, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { CRMService, NotificationService } from '@/lib/crm';

interface BookingData {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  timezone: string;
  interest: string;
  message: string;
}

interface BookingErrors {
  [key: string]: string;
}

const BookingSystem = () => {
  const [bookingData, setBookingData] = useState<BookingData>({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    timezone: '',
    interest: '',
    message: ''
  });

  const [errors, setErrors] = useState<BookingErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const { t } = useLanguage();

  // Cargar información de la propiedad desde sessionStorage si viene desde properties
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const visitProperty = sessionStorage.getItem('visitProperty');
      if (visitProperty) {
        try {
          const property = JSON.parse(visitProperty);
          setBookingData(prev => ({
            ...prev,
            interest: t('booking.propertyVisit') || 'Visita a Propiedad',
            message: t('booking.propertyVisitMessage', {
              propertyName: property.propertyName,
              propertyAddress: property.propertyAddress,
              propertyPrice: property.propertyPrice.toLocaleString()
            })
          }));
          // Limpiar sessionStorage después de usarlo
          sessionStorage.removeItem('visitProperty');
        } catch (error) {
          console.error('Error parsing visit property:', error);
        }
      }
    }
  }, [t]);

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const timezones = [
    { value: 'JST', label: `JST (${t('booking.japan')})` },
    { value: 'EST', label: `EST (${t('booking.newYork')})` },
    { value: 'PST', label: `PST (${t('booking.losAngeles')})` },
    { value: 'CST', label: `CST (${t('booking.chicago')})` },
    { value: 'GMT', label: `GMT (${t('booking.london')})` },
    { value: 'CET', label: `CET (${t('booking.madrid')})` },
    { value: 'BRT', label: `BRT (${t('booking.saoPaulo')})` },
    { value: 'ART', label: `ART (${t('booking.buenosAires')})` }
  ];

  const interests = [
    t('booking.generalConsultation'),
    t('booking.realEstateInvestment'),
    t('booking.personalResidence'),
    t('booking.vacationHome'),
    t('booking.businessTourism'),
    t('booking.legalAdvice'),
    t('booking.propertyRenovation')
  ];

  const validateBooking = (): boolean => {
    const newErrors: BookingErrors = {};

    if (!bookingData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!bookingData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!emailRegex.test(bookingData.email)) {
      newErrors.email = 'Ingresa un email válido';
    }

    if (!bookingData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    }

    if (!bookingData.preferredDate) {
      newErrors.preferredDate = 'Selecciona una fecha';
    }

    if (!bookingData.preferredTime) {
      newErrors.preferredTime = 'Selecciona una hora';
    }

    if (!bookingData.timezone) {
      newErrors.timezone = 'Selecciona tu zona horaria';
    }

    if (!bookingData.interest) {
      newErrors.interest = 'Selecciona tu área de interés';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateBooking()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Crear booking lead en CRM
      const bookingLead = await CRMService.createBookingLead({
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone,
        preferredDate: bookingData.preferredDate,
        preferredTime: bookingData.preferredTime,
        timezone: bookingData.timezone,
        interest: bookingData.interest,
        message: bookingData.message,
        source: 'booking',
        status: 'new',
        bookingStatus: 'pending'
      });

      // Enviar notificaciones
      await NotificationService.sendBookingNotification(bookingLead);
      await NotificationService.sendConfirmationEmail(bookingData.email, 'booking');
      
      setIsBooked(true);
      setBookingData({
        name: '',
        email: '',
        phone: '',
        preferredDate: '',
        preferredTime: '',
        timezone: '',
        interest: '',
        message: ''
      });
    } catch (error) {
      console.error('Error al realizar reserva:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (isBooked) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-primary mb-2">
          ¡Consulta Agendada!
        </h3>
        <p className="text-secondary mb-6">
          Tu consulta de descubrimiento ha sido agendada exitosamente. 
          Recibirás un email de confirmación con los detalles en los próximos minutos.
        </p>
        <div className="bg-muted p-4 rounded-xl mb-6">
          <h4 className="font-semibold text-primary mb-2">Detalles de tu consulta:</h4>
          <p className="text-sm text-secondary">
            📅 Fecha: {bookingData.preferredDate}<br />
            🕐 Hora: {bookingData.preferredTime}<br />
            🌍 Zona horaria: {bookingData.timezone}<br />
            📧 Email de confirmación enviado a: {bookingData.email}
          </p>
        </div>
        <button
          onClick={() => setIsBooked(false)}
          className="bg-primary text-black px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
        >
          Agendar Otra Consulta
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar size={32} className="text-accent" />
        </div>
        <h3 className="text-3xl font-serif font-bold text-primary mb-2">
          {t('booking.title')}
        </h3>
        <p className="text-secondary">
          {t('booking.subtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información Personal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
              {t('booking.fullName')} *
            </label>
            <div className="relative">
              <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
              <input
                type="text"
                id="name"
                name="name"
                value={bookingData.name}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl text-gray-900 bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                  errors.name ? 'border-red-300 bg-red-50' : 'border-border'
                }`}
                placeholder={t('booking.fullNamePlaceholder')}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={16} className="mr-1" />
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
              {t('booking.email')} *
            </label>
            <div className="relative">
              <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
              <input
                type="email"
                id="email"
                name="email"
                value={bookingData.email}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl text-gray-900 bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                  errors.email ? 'border-red-300 bg-red-50' : 'border-border'
                }`}
                placeholder="tu@email.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={16} className="mr-1" />
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-primary mb-2">
              {t('booking.phone')} *
            </label>
            <div className="relative">
              <Phone size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={bookingData.phone}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl text-gray-900 bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                  errors.phone ? 'border-red-300 bg-red-50' : 'border-border'
                }`}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={16} className="mr-1" />
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="timezone" className="block text-sm font-medium text-primary mb-2">
              {t('booking.timezone')} *
            </label>
            <select
              id="timezone"
              name="timezone"
              value={bookingData.timezone}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl text-gray-900 bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                errors.timezone ? 'border-red-300 bg-red-50' : 'border-border'
              }`}
            >
              <option value="">{t('booking.timezonePlaceholder')}</option>
              {timezones.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
            {errors.timezone && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={16} className="mr-1" />
                {errors.timezone}
              </p>
            )}
          </div>
        </div>

        {/* Fecha y Hora */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="preferredDate" className="block text-sm font-medium text-primary mb-2">
              {t('booking.preferredDate')} *
            </label>
            <input
              type="date"
              id="preferredDate"
              name="preferredDate"
              value={bookingData.preferredDate}
              onChange={handleInputChange}
              min={getMinDate()}
              className={`w-full px-4 py-3 border rounded-xl text-gray-900 bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                errors.preferredDate ? 'border-red-300 bg-red-50' : 'border-border'
              }`}
            />
            {errors.preferredDate && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={16} className="mr-1" />
                {errors.preferredDate}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="preferredTime" className="block text-sm font-medium text-primary mb-2">
              {t('booking.preferredTime')} *
            </label>
            <select
              id="preferredTime"
              name="preferredTime"
              value={bookingData.preferredTime}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl text-gray-900 bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                errors.preferredTime ? 'border-red-300 bg-red-50' : 'border-border'
              }`}
            >
              <option value="">{t('booking.preferredTimePlaceholder')}</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            {errors.preferredTime && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={16} className="mr-1" />
                {errors.preferredTime}
              </p>
            )}
          </div>
        </div>

        {/* Área de Interés */}
        <div>
          <label htmlFor="interest" className="block text-sm font-medium text-primary mb-2">
            {t('booking.interests')} *
          </label>
          <select
            id="interest"
            name="interest"
            value={bookingData.interest}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-xl text-gray-900 bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
              errors.interest ? 'border-red-300 bg-red-50' : 'border-border'
            }`}
          >
            <option value="">{t('booking.selectInterest')}</option>
            {interests.map((interest) => (
              <option key={interest} value={interest}>
                {interest}
              </option>
            ))}
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
            {t('booking.additionalMessage')}
          </label>
          <textarea
            id="message"
            name="message"
            value={bookingData.message}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 border border-border rounded-xl text-gray-900 bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
            placeholder={t('booking.additionalMessagePlaceholder')}
          />
        </div>

        {/* Botón de Envío */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-accent text-black py-4 px-6 rounded-xl font-semibold text-lg hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Agendando...</span>
            </>
          ) : (
            <>
              <Calendar size={20} />
              <span>{t('booking.scheduleButton')}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default BookingSystem;
