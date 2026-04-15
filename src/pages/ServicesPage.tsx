import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check, Shield, Clock, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 'garage',
    title: 'Garage Epoxy Flooring',
    description: 'Transform your garage into a showroom-quality space with our premium epoxy flooring solutions. Our garage epoxy systems are designed to withstand heavy vehicles, chemical spills, and daily wear while maintaining a stunning appearance.',
    features: [
      'Chemical and oil resistant',
      'Hot tire pickup resistant',
      'Easy to clean and maintain',
      'UV stable options available',
      'Multiple finish options',
      '5-15 year warranty',
    ],
    image: '/images/garage-metallic.jpg',
    href: '/garage-epoxy-yakima-wa',
    stats: { projects: '500+', rating: '4.9' },
  },
  {
    id: 'metallic',
    title: 'Metallic Epoxy Floors',
    description: 'Create stunning, one-of-a-kind floors with our metallic epoxy systems. These decorative finishes produce mesmerizing 3D effects, swirls, and depth that transform any space into a work of art.',
    features: [
      'Unique 3D visual effects',
      'Unlimited color combinations',
      'Mirror-like high gloss finish',
      'Seamless application',
      'Perfect for showrooms and homes',
      'Custom design options',
    ],
    image: '/images/metallic-navy.jpg',
    href: '/metallic-epoxy-yakima-wa',
    stats: { projects: '300+', rating: '5.0' },
  },
  {
    id: 'flake',
    title: 'Flake Epoxy Systems',
    description: 'Our decorative flake epoxy systems combine beauty with functionality. The multi-colored vinyl chips create a textured, slip-resistant surface that is perfect for high-traffic areas.',
    features: [
      'Slip-resistant texture',
      'Hides imperfections',
      'Wide color selection',
      'Durable and long-lasting',
      'Ideal for garages and basements',
      'Easy maintenance',
    ],
    image: '/images/flake-epoxy.jpg',
    href: '/flake-epoxy-yakima-wa',
    stats: { projects: '400+', rating: '4.8' },
  },
  {
    id: 'commercial',
    title: 'Commercial Epoxy Flooring',
    description: 'Heavy-duty epoxy solutions for warehouses, retail spaces, restaurants, and industrial facilities. Our commercial systems are engineered for maximum durability and performance.',
    features: [
      'Heavy traffic rated',
      'Chemical and abrasion resistant',
      'FDA/USDA compliant options',
      'Fast cure times available',
      'Anti-static options',
      '10-20 year warranty',
    ],
    image: '/images/commercial-epoxy.jpg',
    href: '/commercial-epoxy-yakima-wa',
    stats: { projects: '200+', rating: '4.9' },
  },
];

const benefits = [
  {
    icon: Shield,
    title: 'Durability',
    description: 'Epoxy floors are incredibly resistant to wear, chemicals, and impact, lasting 10-20 years with proper care.',
  },
  {
    icon: Award,
    title: 'Aesthetics',
    description: 'Choose from endless colors, patterns, and finishes to create a floor that perfectly matches your style.',
  },
  {
    icon: Clock,
    title: 'Low Maintenance',
    description: 'Simple cleaning routines keep your epoxy floor looking new for years without waxing or polishing.',
  },
];

export function ServicesPage() {
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const benefitsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
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

      // Services animation
      const serviceCards = servicesRef.current?.querySelectorAll('.service-block');
      if (serviceCards && serviceCards.length > 0) {
        gsap.fromTo(
          serviceCards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: servicesRef.current,
              start: 'top 70%',
            },
          }
        );
      }

      // Benefits animation
      const benefitCards = benefitsRef.current?.querySelectorAll('.benefit-card');
      if (benefitCards && benefitCards.length > 0) {
        gsap.fromTo(
          benefitCards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: benefitsRef.current,
              start: 'top 70%',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-20 lg:pt-40 lg:pb-28"
      >
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-4xl">
            <span className="hero-reveal inline-block text-sm font-medium text-white/50 uppercase tracking-wider mb-4">
              Our Services
            </span>
            <h1 className="hero-reveal text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
              Premium Epoxy <br />
              <span className="metallic-text">Flooring Solutions</span>
            </h1>
            <p className="hero-reveal text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed">
              From residential garages to commercial warehouses, we deliver exceptional 
              epoxy flooring tailored to your specific needs, style preferences, and budget.
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail Section */}
      <section ref={servicesRef} className="py-12 lg:py-20">
        <div className="w-full px-6 lg:px-12">
          <div className="space-y-20 lg:space-y-32">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`service-block grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image */}
                <div className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 lg:bottom-6 lg:right-6 glass rounded-xl p-4">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold metallic-text">{service.stats.projects}</p>
                        <p className="text-xs text-white/50">Projects</p>
                      </div>
                      <div className="w-px h-10 bg-white/10" />
                      <div className="text-center">
                        <p className="text-2xl font-bold metallic-text">{service.stats.rating}</p>
                        <p className="text-xs text-white/50">Rating</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                    {service.title}
                  </h2>
                  <p className="text-white/60 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-white/70" />
                        </div>
                        <span className="text-white/70 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={service.href}
                    className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="py-24 lg:py-32 bg-[#111]">
        <div className="w-full px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-white/50 uppercase tracking-wider mb-4 block">
              Why Epoxy?
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Benefits of <span className="metallic-text">Epoxy Flooring</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="benefit-card p-8 rounded-2xl glass text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-white/70" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Not Sure Which <span className="metallic-text">Service</span> You Need?
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
              Contact us for a free consultation. We will assess your space, 
              discuss your goals, and recommend the perfect epoxy solution for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-lg font-semibold"
              >
                Get a Free Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/pricing"
                className="btn-glossy inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-lg font-semibold"
              >
                Pricing Calculator
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
