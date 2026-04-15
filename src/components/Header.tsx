import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 group py-2">
            <div className="relative w-14 h-14 lg:w-16 lg:h-16">
              <img
                src="/images/logo.png"
                alt="Drippin Epoxy"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="hidden sm:block text-xl lg:text-2xl font-semibold tracking-tight metallic-text">
              Drippin Epoxy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`relative text-sm font-medium transition-colors duration-200 ${
                  isActive(link.href)
                    ? 'text-white'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+15095551234"
              className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>(509) 555-1234</span>
            </a>
            <Link
              to="/contact"
              className="btn-primary px-5 py-2.5 rounded-full text-sm font-semibold"
            >
              Get a Free Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-16 bg-[#0a0a0a]/98 backdrop-blur-lg transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-6">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-2xl font-medium transition-all duration-300 ${
                isActive(link.href)
                  ? 'text-white'
                  : 'text-white/50 hover:text-white'
              }`}
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isMobileMenuOpen ? 1 : 0,
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="btn-primary px-8 py-3 rounded-full text-lg font-semibold mt-4"
            style={{
              transitionDelay: isMobileMenuOpen ? `${navLinks.length * 50}ms` : '0ms',
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: isMobileMenuOpen ? 1 : 0,
            }}
          >
            Get a Free Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
