import React from 'react';
import { ArrowRight } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

const LegacySection = () => {
  return (
    <section id="legacy-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Shibusawa Eiichi portrait"
                fill
                className="object-cover opacity-80"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-sm font-mono opacity-80">Portrait, 1910</div>
              </div>
            </div>
            
            {/* Floating Quote */}
            <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-xl shadow-lg border border-border max-w-xs">
              <div className="text-primary font-serif text-lg leading-relaxed">
                "Where tradition meets tomorrow"
              </div>
              <div className="text-secondary text-sm mt-2 font-mono">
                伝統と未来の出会い
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <div className="text-sm text-accent font-mono tracking-wider uppercase mb-4">
                Descubre el Patrimonio de Gunma
              </div>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-primary mb-6 leading-tight">
                Tradición Japonesa
                <br />
                <span className="text-accent">en el Corazón de Gunma</span>
              </h2>
            </div>

            <div className="space-y-6 text-foreground leading-relaxed">
              <p className="text-lg">
                Gunma es una prefectura única en Japón, donde la tradición milenaria se encuentra 
                con la modernidad. Sus <strong>onsen naturales</strong>, montañas majestuosas y 
                arquitectura tradicional crean un ambiente incomparable para vivir e invertir.
              </p>
              
              <p>
                Cada propiedad en Gunma cuenta una historia única. Desde casas tradicionales 
                <em>minka</em> hasta templos centenarios, estas propiedades representan 
                la esencia auténtica del Japón que muchos buscan experimentar.
              </p>

              <div className="bg-muted p-6 rounded-xl border-l-4 border-accent">
                <div className="text-primary font-serif text-lg mb-2">
                  "Donde cada piedra cuenta una historia"
                </div>
                <div className="text-secondary text-sm font-mono">
                  - Gunma Heritage
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">1000+</div>
                <div className="text-sm text-secondary">Onsen Naturales</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">2000+</div>
                <div className="text-sm text-secondary">Años de Historia</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">∞</div>
                <div className="text-sm text-secondary">Belleza Natural</div>
              </div>
            </div>

            <div className="pt-4">
              <button className="text-primary hover:text-accent transition-colors duration-200 font-semibold flex items-center space-x-2">
                <span>Descubre Más Sobre Gunma</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegacySection;
