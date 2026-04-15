import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check, Building2, Clock, Shield, Phone, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  'Heavy traffic rated performance',
  'Chemical and abrasion resistant',
  'FDA/USDA compliant options',
  'Fast cure times available',
  'Anti-static and ESD options',
  '10-20 year warranty coverage',
];

const industries = [
  { name: 'Warehouses', icon: Building2, description: 'High-traffic storage and distribution facilities' },
  { name: 'Manufacturing', icon: Shield, description: 'Industrial production and assembly floors' },
  { name: 'Retail', icon: Award, description: 'Showrooms, stores, and customer areas' },
  { name: 'Healthcare', icon: Check, description: 'Hospitals, clinics, and medical facilities' },
  { name: 'Food Service', icon: Check, description: 'Restaurants, kitchens, and food processing' },
  { name: 'Automotive', icon: Check, description: 'Service centers, showrooms, and garages' },
];

const systemTypes = [
  {
    name: 'Standard Epoxy',
    description: 'Cost-effective solution for light to medium traffic areas',
    thickness: '2-3 mils',
    bestFor: 'Offices, retail, light industrial',
  },
  {
    name: 'High Build Epoxy',
    description: 'Thicker coating for improved durability and chemical resistance',
    thickness: '8-15 mils',
    bestFor: 'Warehouses, manufacturing, workshops',
  },
  {
    name: 'Mortar Systems',
    description: 'Heavy-duty system for extreme conditions and repair',
    thickness: '1/4" +',
    bestFor: 'Heavy industrial, repair work, extreme conditions',
  },
];

export function CommercialEpoxyPage() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroElements = heroRef.current?.querySelectorAll('.hero-reveal');
      if (heroElements && heroElements.length > 0) {
        gsap.fromTo(
          heroElements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
          }
        );
      }

      const sections = document.querySelectorAll('.section-reveal');
      if (sections.length > 0) {
        sections.forEach((section) => {
          gsap.fromTo(
            section,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 75%',
              },
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="w-full px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="hero-reveal inline-block text-sm font-medium text-white/50 uppercase tracking-wider mb-4">
                Commercial Solutions
              </span>
              <h1 className="hero-reveal text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Commercial Epoxy <br />
                <span className="metallic-text">Flooring</span>
              </h1>
              <p className="hero-reveal text-lg text-white/60 mb-8 leading-relaxed">
                Heavy-duty epoxy solutions engineered for warehouses, retail spaces, 
                restaurants, and industrial facilities. Maximum durability meets 
                professional aesthetics.
              </p>
              <div className="hero-reveal flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold"
                >
                  Get a Free Quote
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="tel:+15095551234"
                  className="btn-glossy inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </div>
            </div>
            <div className="hero-reveal">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="/images/commercial-epoxy.jpg"
                  alt="Commercial epoxy flooring"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-reveal py-16 lg:py-24 bg-[#111]">
        <div className="w-full px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="/images/gallery-2.jpg"
                  alt="Commercial epoxy installation"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                Built for <span className="metallic-text">Business</span>
              </h2>
              <p className="text-white/60 mb-8 leading-relaxed">
                Our commercial epoxy systems are engineered to withstand the demands 
                of high-traffic business environments. From heavy machinery to constant 
                foot traffic, our floors deliver lasting performance.
              </p>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white/70" />
                    </div>
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section-reveal py-16 lg:py-24">
        <div className="w-full px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-white/50 uppercase tracking-wider mb-4 block">
              Industries Served
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Solutions for Every <span className="metallic-text">Industry</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <div key={index} className="glass rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                  <industry.icon className="w-6 h-6 text-white/50" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{industry.name}</h3>
                <p className="text-white/50 text-sm">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Types */}
      <section className="section-reveal py-16 lg:py-24 bg-[#111]">
        <div className="w-full px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-white/50 uppercase tracking-wider mb-4 block">
              System Options
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Choose Your <span className="metallic-text">System</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {systemTypes.map((system, index) => (
              <div key={index} className="glass rounded-2xl p-6 lg:p-8">
                <h3 className="text-xl font-semibold mb-4">{system.name}</h3>
                <p className="text-white/60 mb-6 text-sm leading-relaxed">{system.description}</p>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Thickness:</span>
                    <span className="font-medium">{system.thickness}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Best for:</span>
                    <span className="font-medium text-right">{system.bestFor}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-reveal py-16 lg:py-24">
        <div className="w-full px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass rounded-2xl p-6 text-center">
              <Building2 className="w-8 h-8 mx-auto mb-3 text-white/50" />
              <p className="text-3xl font-bold metallic-text mb-1">200+</p>
              <p className="text-sm text-white/50">Commercial Projects</p>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <Clock className="w-8 h-8 mx-auto mb-3 text-white/50" />
              <p className="text-3xl font-bold metallic-text mb-1">20+</p>
              <p className="text-sm text-white/50">Years Warranty</p>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <Shield className="w-8 h-8 mx-auto mb-3 text-white/50" />
              <p className="text-3xl font-bold metallic-text mb-1">100%</p>
              <p className="text-sm text-white/50">Compliance Ready</p>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <Award className="w-8 h-8 mx-auto mb-3 text-white/50" />
              <p className="text-3xl font-bold metallic-text mb-1">4.9</p>
              <p className="text-sm text-white/50">Client Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-reveal py-16 lg:py-24 bg-[#111]">
        <div className="w-full px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Commercial <span className="metallic-text">Projects</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="aspect-square rounded-xl overflow-hidden">
              <img src="/images/commercial-epoxy.jpg" alt="Commercial project" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden">
              <img src="/images/gallery-2.jpg" alt="Commercial project" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden">
              <img src="/images/gallery-4.jpg" alt="Commercial project" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-reveal py-16 lg:py-24">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Upgrade Your <span className="metallic-text">Facility</span>
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
              Ready to invest in a flooring solution that meets the demands of your business? 
              Contact us for a comprehensive consultation and quote.
            </p>
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-lg font-semibold"
            >
              Schedule a Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
