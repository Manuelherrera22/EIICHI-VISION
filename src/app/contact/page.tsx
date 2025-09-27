'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import BookingSystem from '@/components/BookingSystem';
import { Mail, Phone, MapPin, Clock, Send, Calendar, MessageCircle, User, Building } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    interest: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: '',
      interest: 'general'
    });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Correo Electrónico",
      value: "info@komorebihouse.com",
      description: "Respuesta en 24 horas",
      color: "primary"
    },
    {
      icon: Phone,
      title: "Teléfono / WhatsApp",
      value: "+81 90-1234-5678",
      description: "Disponible 9AM - 6PM JST",
      color: "accent"
    },
    {
      icon: MapPin,
      title: "Oficina Principal",
      value: "Kusatsu, Gunma, Japan",
      description: "Visitas con cita previa",
      color: "primary"
    }
  ];

  const interests = [
    { value: 'general', label: 'Consulta General' },
    { value: 'property', label: 'Ver Propiedades' },
    { value: 'investment', label: 'Oportunidades de Inversión' },
    { value: 'renovation', label: 'Servicios de Renovación' },
    { value: 'legal', label: 'Asesoría Legal' },
    { value: 'other', label: 'Otro' }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-sm text-accent font-mono tracking-wider uppercase mb-4">
              Inicia tu Visión
            </div>
            <h1 className="text-5xl lg:text-6xl font-serif font-bold text-primary mb-6 leading-tight">
              Contacto
            </h1>
            <p className="text-xl text-foreground max-w-3xl mx-auto leading-relaxed">
              Estamos aquí para ayudarte a hacer realidad tu visión de invertir en Japón. 
              Agenda una consulta gratuita de 30 minutos para discutir tu proyecto.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-primary mb-6">
              Formas de Contacto
            </h2>
            <p className="text-xl text-foreground max-w-3xl mx-auto leading-relaxed">
              Elige la forma que más te convenga para iniciar la conversación.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <div key={index} className="text-center p-8 bg-muted rounded-2xl hover:shadow-lg transition-shadow duration-300">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
                  method.color === 'primary' ? 'bg-primary/10' : 'bg-accent/10'
                }`}>
                  <method.icon size={32} className={method.color === 'primary' ? 'text-primary' : 'text-accent'} />
                </div>
                <h3 className="text-xl font-serif font-bold text-primary mb-2">
                  {method.title}
                </h3>
                <p className="text-lg font-semibold text-foreground mb-2">
                  {method.value}
                </p>
                <p className="text-sm text-secondary">
                  {method.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Form */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-4xl font-serif font-bold text-primary mb-4">
                  Envíanos un Mensaje
                </h2>
                <p className="text-lg text-foreground leading-relaxed">
                  Completa el formulario y nos pondremos en contacto contigo 
                  para discutir tu proyecto y responder todas tus preguntas.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-primary mb-2">
                      Nombre Completo *
                    </label>
                    <div className="relative">
                      <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="Tu nombre completo"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-primary mb-2">
                      Correo Electrónico *
                    </label>
                    <div className="relative">
                      <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-primary mb-2">
                      Teléfono
                    </label>
                    <div className="relative">
                      <Phone size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-primary mb-2">
                      Empresa
                    </label>
                    <div className="relative">
                      <Building size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="Nombre de tu empresa"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="interest" className="block text-sm font-semibold text-primary mb-2">
                    Área de Interés
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                  >
                    {interests.map((interest) => (
                      <option key={interest.value} value={interest.value}>
                        {interest.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-primary mb-2">
                    Mensaje *
                  </label>
                  <div className="relative">
                    <MessageCircle size={20} className="absolute left-3 top-3 text-secondary" />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                      placeholder="Cuéntanos sobre tu proyecto, presupuesto, timeline y cualquier pregunta específica que tengas..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors duration-300 font-semibold text-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
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

            {/* Info Panel */}
            <div className="space-y-8">
              {/* Booking System */}
              <BookingSystem />

              {/* Office Hours */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-border">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock size={24} className="text-primary" />
                  <h3 className="text-xl font-serif font-bold text-primary">
                    Horarios de Atención
                  </h3>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-secondary">Lunes - Viernes</span>
                    <span className="text-foreground font-semibold">9:00 AM - 6:00 PM JST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Sábados</span>
                    <span className="text-foreground font-semibold">10:00 AM - 2:00 PM JST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Domingos</span>
                    <span className="text-foreground font-semibold">Cerrado</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-foreground">
                    <strong>Nota:</strong> Respondemos a todos los mensajes dentro de 24 horas, 
                    incluso los fines de semana.
                  </p>
                </div>
              </div>

              {/* Quick Response */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-border">
                <h3 className="text-xl font-serif font-bold text-primary mb-4">
                  Respuesta Rápida
                </h3>
                <p className="text-sm text-foreground mb-4">
                  Para consultas urgentes, puedes contactarnos directamente por WhatsApp:
                </p>
                <a
                  href="https://wa.me/819012345678"
                  className="inline-flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
                >
                  <span>💬</span>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
