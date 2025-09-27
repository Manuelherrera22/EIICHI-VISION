import Layout from '@/components/Layout';
import { ArrowRight, Users, Target, Heart } from 'lucide-react';

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-sm text-accent font-mono tracking-wider uppercase mb-4">
              De la Industria a la Revitalización
            </div>
            <h1 className="text-5xl lg:text-6xl font-serif font-bold text-primary mb-6 leading-tight">
              La Historia de
              <br />
              <span className="text-accent">Komorebi House</span>
            </h1>
            <p className="text-xl text-foreground max-w-3xl mx-auto leading-relaxed">
              Una nueva generación continúa el legado de la arquitectura tradicional japonesa, 
              conectando el patrimonio cultural con ciudadanos globales visionarios.
            </p>
          </div>
        </div>
      </section>

      {/* The Visionary Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <div className="text-sm text-accent font-mono tracking-wider uppercase mb-4">
                  Parte 1: El Visionario
                </div>
                <h2 className="text-4xl font-serif font-bold text-primary mb-6">
                  Shibusawa Eiichi
                </h2>
                <div className="text-lg text-accent font-mono mb-6">
                  渋沢栄一 - El Arquitecto del Japón Moderno
                </div>
              </div>

              <div className="space-y-6 text-foreground leading-relaxed">
                <p className="text-lg">
                  Nacido en 1840 en la provincia de Musashi (actual Saitama), 
                  Shibusawa Eiichi fue un visionario que transformó Japón de una 
                  sociedad feudal a una potencia económica moderna.
                </p>
                
                <p>
                  Su filosofía única, <strong>Gapponshugi</strong>, combinaba 
                  principios confucianos con eficiencia empresarial, estableciendo 
                  que el éxito comercial debe estar fundamentado en valores éticos sólidos.
                </p>

                <div className="bg-muted p-6 rounded-xl">
                  <h3 className="font-serif text-lg font-semibold text-primary mb-3">
                    Su Impacto Transformador
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>Fundó más de 500 empresas modernas</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>Estableció el sistema bancario japonés</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>Promovió la educación y filantropía</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>Creó el modelo de responsabilidad social empresarial</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center bg-no-repeat opacity-80"></div>
              </div>
              
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-xl shadow-lg border border-border max-w-xs">
                <div className="text-primary font-serif text-lg leading-relaxed">
                  "La moralidad y la economía deben ir de la mano"
                </div>
                <div className="text-secondary text-sm mt-2 font-mono">
                  - Shibusawa Eiichi, 1910
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The New Generation Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-sm text-accent font-mono tracking-wider uppercase mb-4">
              Parte 2: La Nueva Generación
            </div>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-primary mb-6">
              Presentación de los Socios
            </h2>
            <p className="text-xl text-foreground max-w-3xl mx-auto leading-relaxed">
              Una conexión familiar única y una misión compartida que honra el legado 
              mientras construye el futuro.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users size={40} className="text-primary" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-2">
                  Conexión Familiar
                </h3>
                <div className="text-accent font-mono text-sm">
                  Descendientes Directos
                </div>
              </div>
              <p className="text-foreground leading-relaxed mb-6">
                Los socios fundadores de Komorebi House son descendientes directos de 
                Shibusawa Eiichi, heredando no solo el nombre sino también la visión 
                transformadora y los valores éticos que definieron su legado.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-sm text-foreground">Herencia de valores éticos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-sm text-foreground">Compromiso con la comunidad</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-sm text-foreground">Visión de largo plazo</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target size={40} className="text-accent" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-2">
                  Misión Compartida
                </h3>
                <div className="text-accent font-mono text-sm">
                  Propósito Común
                </div>
              </div>
              <p className="text-foreground leading-relaxed mb-6">
                Nuestra misión es continuar el trabajo de revitalización comunitaria 
                iniciado por Shibusawa Eiichi, adaptándolo a las necesidades del siglo XXI 
                y conectando culturas a través del patrimonio inmobiliario.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm text-foreground">Revitalización sostenible</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm text-foreground">Conexión cultural global</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm text-foreground">Desarrollo comunitario</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Promise Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-sm text-accent font-mono tracking-wider uppercase mb-4">
              Parte 3: Nuestra Promesa
            </div>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-primary mb-6">
              Valores del Pasado,
              <br />
              <span className="text-accent">Servicio del Presente</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-serif font-bold text-primary mb-4">
                Transparencia Absoluta
              </h3>
              <p className="text-foreground leading-relaxed">
                Operamos con completa transparencia en cada transacción, proceso legal 
                y comunicación, manteniendo los más altos estándares éticos.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={32} className="text-accent" />
              </div>
              <h3 className="text-xl font-serif font-bold text-primary mb-4">
                Apoyo Integral
              </h3>
              <p className="text-foreground leading-relaxed">
                Proporcionamos soporte completo desde la adquisición hasta la renovación, 
                asegurando que cada cliente tenga éxito en su proyecto.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-serif font-bold text-primary mb-4">
                Servicio Ético
              </h3>
              <p className="text-foreground leading-relaxed">
                Cada decisión está guiada por principios éticos sólidos, beneficiando 
                tanto a nuestros clientes como a la comunidad local.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center bg-muted p-12 rounded-2xl">
            <h3 className="text-3xl font-serif font-bold text-primary mb-4">
              ¿Listo para Ser Parte de la Historia?
            </h3>
            <p className="text-lg text-foreground mb-8 max-w-2xl mx-auto">
              Únete a nosotros en esta misión de revitalización y conviértete en parte 
              del legado continuo de Shibusawa Eiichi.
            </p>
            <button className="bg-primary text-white px-8 py-4 rounded-full hover:bg-primary/90 transition-colors duration-300 font-semibold text-lg flex items-center space-x-2 mx-auto">
              <span>Inicia tu Visión</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
