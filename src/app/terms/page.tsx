'use client';

import React from 'react';
import Layout from '@/components/Layout';
import { FileText, Scale, Gavel, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const TermsPage = () => {
  const { t } = useLanguage();
  const sections = [
    {
      icon: FileText,
      title: 'Aceptación de Términos',
      content: [
        'Al acceder y utilizar este sitio web, aceptas estos términos y condiciones',
        'Si no estás de acuerdo con algún término, no debes usar nuestros servicios',
        'Estos términos pueden actualizarse periódicamente',
        'Es tu responsabilidad revisar regularmente estos términos',
        'El uso continuado constituye aceptación de los términos modificados'
      ]
    },
    {
      icon: Scale,
      title: 'Servicios Ofrecidos',
      content: [
        'Consultoría inmobiliaria especializada en propiedades japonesas',
        'Asistencia en compra de casas akiya y propiedades tradicionales',
        'Servicios de renovación y restauración',
        'Gestión legal y administrativa de transacciones',
        'Soporte post-compra y mantenimiento'
      ]
    },
    {
      icon: Gavel,
      title: 'Responsabilidades del Cliente',
      content: [
        'Proporcionar información veraz y actualizada',
        'Cumplir con los requisitos legales japoneses',
        'Realizar pagos según los términos acordados',
        'Comunicar cambios relevantes en su situación',
        'Respetar las leyes locales y regulaciones'
      ]
    },
    {
      icon: AlertCircle,
      title: 'Limitaciones de Responsabilidad',
      content: [
        'Nuestros servicios están sujetos a la disponibilidad de propiedades',
        'No garantizamos resultados específicos de inversión',
        'Los costos pueden variar según condiciones del mercado',
        'No somos responsables por decisiones de terceros',
        'Las estimaciones son aproximadas y pueden cambiar'
      ]
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-white border-b border-border">
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6">
                <FileText className="w-8 h-8 text-accent" />
              </div>
              <h1 className="text-4xl font-serif font-bold text-primary mb-4">
                Términos y Condiciones
              </h1>
              <p className="text-lg text-secondary max-w-2xl mx-auto">
                Estos términos rigen el uso de nuestros servicios y la relación entre 
                Komorebi House y nuestros clientes.
              </p>
              <p className="text-sm text-secondary mt-4">
                Última actualización: {new Date().toLocaleDateString('es-ES')}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-border">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="bg-accent/10 p-3 rounded-lg flex-shrink-0">
                    <section.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary">
                    {section.title}
                  </h2>
                </div>
                
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Payment Terms */}
            <div className="bg-white rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold text-primary mb-6">
                Términos de Pago
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-primary mb-3">Consultoría Inicial</h3>
                  <ul className="space-y-2 text-secondary">
                    <li>• Consulta inicial gratuita</li>
                    <li>• Evaluación de propiedad: ¥50,000</li>
                    <li>• Plan de renovación: ¥100,000</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-primary mb-3">Transacciones</h3>
                  <ul className="space-y-2 text-secondary">
                    <li>• Comisión de compra: 3% del valor</li>
                    <li>• Gestión legal: ¥200,000</li>
                    <li>• Supervisión de obra: 5% del costo</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Dispute Resolution */}
            <div className="bg-white rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold text-primary mb-6">
                Resolución de Disputas
              </h2>
              <div className="space-y-4 text-secondary">
                <p>
                  Cualquier disputa será resuelta preferiblemente mediante negociación directa. 
                  Si no es posible llegar a un acuerdo, las disputas se resolverán mediante 
                  arbitraje según las leyes japonesas.
                </p>
                <p>
                  Las disputas se resolverán en los tribunales competentes de Gunma, Japan, 
                  y se regirán por las leyes japonesas.
                </p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-4">
                ¿Tienes Preguntas sobre estos Términos?
              </h2>
              <p className="text-white/90 mb-6">
                Si necesitas aclaraciones sobre cualquier aspecto de estos términos y condiciones, 
                nuestro equipo legal está disponible para ayudarte.
              </p>
              <div className="space-y-2 text-white/90">
                <p><strong>Email Legal:</strong> info@tabijihouse.com</p>
                <p><strong>Teléfono:</strong> +81-3-6380-3901 / +81-3-6380-3902</p>
                <p><strong>{t('terms.address')}</strong></p>
              </div>
            </div>

            {/* Legal Notice */}
            <div className="bg-muted rounded-xl p-6">
              <h3 className="text-lg font-semibold text-primary mb-3">
                Aviso Legal
              </h3>
              <p className="text-secondary text-sm leading-relaxed">
                Estos términos y condiciones están sujetos a las leyes japonesas. 
                Komorebi House se reserva el derecho de modificar estos términos en cualquier momento. 
                Los cambios serán efectivos inmediatamente después de su publicación en este sitio web.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsPage;
