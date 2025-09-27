'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { CRMService, NotificationService } from '@/lib/crm';

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

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validación de nombre
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Ingresa un email válido';
    }

    // Validación de teléfono
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    }

    // Validación de país
    if (!formData.country.trim()) {
      newErrors.country = 'El país es requerido';
    }

    // Validación de presupuesto
    if (!formData.budget) {
      newErrors.budget = 'Selecciona un rango de presupuesto';
    }

    // Validación de interés
    if (!formData.interest) {
      newErrors.interest = 'Selecciona tu área de interés';
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
          ¡Mensaje Enviado!
        </h3>
        <p className="text-secondary mb-6">
          Gracias por tu interés en Komorebi House. Nos pondremos en contacto contigo en las próximas 24 horas.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
        >
          Enviar Otro Mensaje
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-serif font-bold text-primary mb-2">
          Inicia tu Viaje
        </h3>
        <p className="text-secondary">
          Completa el formulario y nos pondremos en contacto contigo
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
            Nombre Completo *
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
            placeholder="Tu nombre completo"
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
              Email *
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
              placeholder="tu@email.com"
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
              Teléfono *
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
              placeholder="+1 (555) 123-4567"
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
              País *
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
              <option value="">Selecciona tu país</option>
              <option value="US">Estados Unidos</option>
              <option value="CA">Canadá</option>
              <option value="MX">México</option>
              <option value="BR">Brasil</option>
              <option value="AR">Argentina</option>
              <option value="CL">Chile</option>
              <option value="CO">Colombia</option>
              <option value="PE">Perú</option>
              <option value="other">Otro</option>
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
              Presupuesto *
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
              <option value="">Selecciona tu presupuesto</option>
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
            Área de Interés *
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
            <option value="">Selecciona tu interés</option>
            <option value="investment">Inversión Inmobiliaria</option>
            <option value="residence">Residencia Personal</option>
            <option value="vacation">Casa de Vacaciones</option>
            <option value="business">Negocio/Turismo</option>
            <option value="consultation">Consulta General</option>
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
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
            placeholder="Cuéntanos más sobre tu proyecto o intereses..."
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
              <span>Enviando...</span>
            </>
          ) : (
            <>
              <Send size={20} />
              <span>Enviar Mensaje</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
