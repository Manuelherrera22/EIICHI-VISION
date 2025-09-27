import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'Nuestro Legado', href: '/about' },
      { name: 'El Camino', href: '/process' },
      { name: 'Journal', href: '/journal' },
      { name: 'Contacto', href: '/contact' },
    ],
    projects: [
      { name: 'Proyectos Destacados', href: '/projects' },
      { name: 'Propiedades Disponibles', href: '/projects?available=true' },
      { name: 'Casos de Éxito', href: '/projects?success=true' },
      { name: 'Guía de Inversión', href: '/guide' },
    ],
    resources: [
      { name: 'Blog', href: '/journal' },
      { name: 'Guías de Diseño', href: '/journal/category/design' },
      { name: 'Cultura Japonesa', href: '/journal/category/culture' },
      { name: 'Vida en Gunma', href: '/journal/category/lifestyle' },
    ],
  };

  const socialLinks = [
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
  ];

  return (
    <footer className="bg-muted border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-6 sm:mb-8">
              <div className="text-lg sm:text-xl lg:text-2xl font-serif font-bold text-primary mb-2">
                Komorebi House
              </div>
              <div className="text-xs sm:text-sm text-secondary font-mono mb-3 sm:mb-4">
                こもれび・ハウス
              </div>
              <p className="text-foreground text-xs sm:text-sm leading-relaxed">
                Descubre el patrimonio único de Japón a través de propiedades tradicionales 
                donde la luz del sol se filtra entre las hojas, creando espacios de armonía y belleza.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-foreground">
                <Mail size={14} className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="break-all">info@komorebihouse.com</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-foreground">
                <Phone size={14} className="w-4 h-4 text-primary flex-shrink-0" />
                <span>+81 90-1234-5678</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-foreground">
                <MapPin size={14} className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Kusatsu, Gunma, Japan</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-serif text-sm sm:text-base lg:text-lg font-semibold text-primary mb-3 sm:mb-4">
              Compañía
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-foreground hover:text-primary transition-colors duration-200 text-xs sm:text-sm block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects Links */}
          <div>
            <h3 className="font-serif text-sm sm:text-base lg:text-lg font-semibold text-primary mb-3 sm:mb-4">
              Proyectos
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.projects.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-foreground hover:text-primary transition-colors duration-200 text-xs sm:text-sm block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-serif text-sm sm:text-base lg:text-lg font-semibold text-primary mb-3 sm:mb-4">
              Recursos
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-foreground hover:text-primary transition-colors duration-200 text-xs sm:text-sm block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border">
          <div className="max-w-md">
            <h3 className="font-serif text-base sm:text-lg font-semibold text-primary mb-3 sm:mb-4">
              Únete a la Visión
            </h3>
            <p className="text-foreground text-xs sm:text-sm mb-4">
              Recibe historias inspiradoras y nuevas propiedades directamente en tu correo.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 px-3 sm:px-4 py-2 border border-border rounded-full text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <button className="bg-primary text-white px-4 sm:px-6 py-2 rounded-full hover:bg-primary/90 transition-colors duration-200 text-xs sm:text-sm font-medium whitespace-nowrap">
                Suscribirse
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border">
          <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
            <div className="text-xs sm:text-sm text-secondary text-center lg:text-left">
              © {currentYear} Komorebi House. Todos los derechos reservados.
            </div>
            
            {/* Social Links */}
            <div className="flex justify-center lg:justify-start space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-secondary hover:text-primary transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon size={18} className="sm:w-5 sm:h-5" />
                </a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex justify-center lg:justify-end space-x-4 sm:space-x-6 text-xs sm:text-sm">
              <Link
                href="/privacy"
                className="text-secondary hover:text-primary transition-colors duration-200"
              >
                Privacidad
              </Link>
              <Link
                href="/terms"
                className="text-secondary hover:text-primary transition-colors duration-200"
              >
                Términos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
