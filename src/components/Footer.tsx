import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  services: [
    { label: 'Garage Epoxy', href: '/garage-epoxy-yakima-wa' },
    { label: 'Metallic Epoxy', href: '/metallic-epoxy-yakima-wa' },
    { label: 'Flake Epoxy', href: '/flake-epoxy-yakima-wa' },
    { label: 'Commercial Epoxy', href: '/commercial-epoxy-yakima-wa' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Work', href: '/gallery' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Service Areas', href: '/service-areas' },
  ],
  support: [
    { label: 'Contact', href: '/contact' },
    { label: 'Get a Quote', href: '/contact' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5">
      {/* Main Footer */}
      <div className="w-full px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12">
                <img
                  src="/images/logo.png"
                  alt="Drippin Epoxy"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-semibold metallic-text">
                Drippin Epoxy
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm mb-6">
              Premium epoxy flooring solutions in Yakima, Washington. 
              Transform your space with luxury metallic, flake, and high-gloss 
              epoxy finishes.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="mailto:info@drippinepoxy.com"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+15095551234"
                  className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  (509) 555-1234
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@drippinepoxy.com"
                  className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  info@drippinepoxy.com
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2 text-sm text-white/50">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Yakima, WA 98901
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="w-full px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40 text-center md:text-left">
              &copy; {new Date().getFullYear()} Drippin Epoxy. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/privacy"
                className="text-xs text-white/40 hover:text-white/60 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-xs text-white/40 hover:text-white/60 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
