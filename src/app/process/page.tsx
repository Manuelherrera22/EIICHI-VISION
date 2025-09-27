import Layout from '@/components/Layout';
import { Search, FileText, Hammer, Users, ArrowRight, CheckCircle, Clock, MapPin } from 'lucide-react';

export default function Process() {
  const steps = [
    {
      number: 1,
      title: "Descubrimiento",
      japanese: "発見 - Hakken",
      icon: Search,
      description: "Consulta inicial y selección de proyectos",
      details: [
        "Evaluación de necesidades y presupuesto",
        "Presentación de propiedades disponibles",
        "Análisis de potencial de inversión",
        "Visita virtual o presencial"
      ],
      duration: "1-2 semanas",
      color: "primary"
    },
    {
      number: 2,
      title: "Adquisición",
      japanese: "取得 - Shutoku",
      icon: FileText,
      description: "Proceso legal para extranjeros",
      details: [
        "Asesoría legal especializada",
        "Documentación requerida",
        "Proceso de compra simplificado",
        "Transferencia de propiedad"
      ],
      duration: "4-6 semanas",
      color: "accent"
    },
    {
      number: 3,
      title: "Creación",
      japanese: "創造 - Sozo",
      icon: Hammer,
      description: "Diseño y renovación con artesanos locales",
      details: [
        "Diseño personalizado",
        "Selección de artesanos locales",
        "Supervisión de construcción",
        "Control de calidad"
      ],
      duration: "3-6 meses",
      color: "primary"
    },
    {
      number: 4,
      title: "Comunidad",
      japanese: "共同体 - Kyodotai",
      icon: Users,
      description: "Integración en la vida de Gunma",
      details: [
        "Conexión con la comunidad local",
        "Acceso a servicios y amenidades",
        "Eventos culturales y sociales",
        "Soporte continuo"
      ],
      duration: "Ongoing",
      color: "accent"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-sm text-accent font-mono tracking-wider uppercase mb-4">
              Tu Camino para Echar Raíces en Japón
            </div>
            <h1 className="text-5xl lg:text-6xl font-serif font-bold text-primary mb-6 leading-tight">
              El Camino
              <br />
              <span className="text-accent">道 - Michi</span>
            </h1>
            <p className="text-xl text-foreground max-w-3xl mx-auto leading-relaxed">
              Un proceso transparente y guiado que te lleva desde el sueño inicial 
              hasta convertirte en parte de la comunidad japonesa.
            </p>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-primary mb-6">
              Infografía Visual Paso a Paso
            </h2>
            <p className="text-xl text-foreground max-w-3xl mx-auto leading-relaxed">
              Cada paso está diseñado para ser transparente, eficiente y centrado en tus necesidades.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-16 w-0.5 h-16 bg-border z-0"></div>
                )}

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Content */}
                  <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        step.color === 'primary' ? 'bg-primary/10' : 'bg-accent/10'
                      }`}>
                        <step.icon size={32} className={step.color === 'primary' ? 'text-primary' : 'text-accent'} />
                      </div>
                      <div>
                        <div className="text-sm text-accent font-mono tracking-wider uppercase">
                          Paso {step.number}
                        </div>
                        <h3 className="text-3xl font-serif font-bold text-primary">
                          {step.title}
                        </h3>
                        <div className="text-lg text-accent font-mono">
                          {step.japanese}
                        </div>
                      </div>
                    </div>

                    <p className="text-lg text-foreground mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    <div className="space-y-4 mb-6">
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-start space-x-3">
                          <CheckCircle size={20} className={`mt-0.5 ${
                            step.color === 'primary' ? 'text-primary' : 'text-accent'
                          }`} />
                          <span className="text-foreground">{detail}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-2 text-secondary">
                        <Clock size={16} />
                        <span>{step.duration}</span>
                      </div>
                      {step.number === 1 && (
                        <div className="flex items-center space-x-2 text-secondary">
                          <MapPin size={16} />
                          <span>Virtual o Presencial</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Visual */}
                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
                      <div className={`absolute inset-0 ${
                        step.color === 'primary' 
                          ? 'bg-gradient-to-br from-primary/20 to-primary/10' 
                          : 'bg-gradient-to-br from-accent/20 to-accent/10'
                      }`}></div>
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center bg-no-repeat opacity-60"></div>
                      
                      {/* Step Number Overlay */}
                      <div className="absolute top-6 left-6">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl ${
                          step.color === 'primary' ? 'bg-primary' : 'bg-accent'
                        }`}>
                          {step.number}
                        </div>
                      </div>

                      {/* Content Overlay */}
                      <div className="absolute bottom-6 left-6 right-6 text-white">
                        <div className="text-sm opacity-80 mb-2">
                          {step.japanese}
                        </div>
                        <div className="text-lg font-semibold">
                          {step.title}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-primary mb-6">
              Cronograma del Proceso
            </h2>
            <p className="text-xl text-foreground max-w-3xl mx-auto leading-relaxed">
              Un timeline claro que te permite planificar tu inversión con confianza.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border"></div>

            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={step.number} className={`flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-border">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                          step.color === 'primary' ? 'bg-primary' : 'bg-accent'
                        }`}>
                          {step.number}
                        </div>
                        <h3 className="text-xl font-serif font-bold text-primary">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-foreground mb-3">
                        {step.description}
                      </p>
                      <div className="text-sm text-secondary">
                        Duración: {step.duration}
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-8 h-8 bg-white border-4 border-border rounded-full flex items-center justify-center z-10">
                    <div className={`w-4 h-4 rounded-full ${
                      step.color === 'primary' ? 'bg-primary' : 'bg-accent'
                    }`}></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold text-primary mb-6">
                Soporte Integral en Cada Paso
              </h2>
              <p className="text-lg text-foreground mb-8 leading-relaxed">
                No estás solo en este proceso. Nuestro equipo de expertos te acompaña 
                en cada etapa, desde la consulta inicial hasta tu integración completa 
                en la comunidad japonesa.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-primary mb-2">
                      Equipo Multidisciplinario
                    </h3>
                    <p className="text-foreground text-sm leading-relaxed">
                      Abogados, arquitectos, artesanos locales y especialistas en 
                      integración cultural trabajando juntos por tu éxito.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-primary mb-2">
                      Proceso Simplificado
                    </h3>
                    <p className="text-foreground text-sm leading-relaxed">
                      Hemos simplificado los procesos legales complejos para que 
                      puedas enfocarte en tu visión, no en la burocracia.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-primary mb-2">
                      Conexión Local
                    </h3>
                    <p className="text-foreground text-sm leading-relaxed">
                      Te conectamos con la comunidad local, facilitando tu integración 
                      y acceso a servicios y eventos culturales.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center bg-no-repeat opacity-80"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold text-primary mb-6">
            ¿Listo para Comenzar tu Camino?
          </h2>
          <p className="text-xl text-foreground mb-8 max-w-2xl mx-auto">
            Agenda una consulta inicial gratuita de 30 minutos para discutir tu visión 
            y cómo podemos ayudarte a hacerla realidad.
          </p>
          <button className="bg-primary text-white px-8 py-4 rounded-full hover:bg-primary/90 transition-colors duration-300 font-semibold text-lg flex items-center space-x-2 mx-auto">
            <span>Agendar Consulta Gratuita</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </Layout>
  );
}
