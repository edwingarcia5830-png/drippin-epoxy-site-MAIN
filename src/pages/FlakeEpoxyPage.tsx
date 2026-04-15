import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check, Shield, Grip, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  'Slip-resistant textured surface',
  'Hides concrete imperfections',
  'Wide variety of color combinations',
  'Extremely durable and long-lasting',
  'Ideal for high-traffic areas',
  'Low maintenance requirements',
];

const flakeSizes = [
  { name: '1/4" Flakes', description: 'Large decorative chips for bold patterns' },
  { name: '1/8" Flakes', description: 'Medium chips for balanced texture' },
  { name: '1/16" Flakes', description: 'Small chips for subtle, refined look' },
];

const colorBlends = [
  { name: 'Gray Blend', colors: ['#4a5568', '#718096', '#a0aec0', '#cbd5e0'] },
  { name: 'Tan Blend', colors: ['#744210', '#975a16', '#b7791f', '#d69e2e'] },
  { name: 'Black Blend', colors: ['#1a202c', '#2d3748', '#4a5568', '#718096'] },
  { name: 'Red Blend', colors: ['#742a2a', '#9b2c2c', '#c53030', '#e53e3e'] },
];

export function FlakeEpoxyPage() {
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
                Decorative & Functional
              </span>
              <h1 className="hero-reveal text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Flake Epoxy <br />
                <span className="metallic-text">Systems</span>
              </h1>
              <p className="hero-reveal text-lg text-white/60 mb-8 leading-relaxed">
                Our decorative flake epoxy systems combine beauty with functionality. 
                Multi-colored vinyl chips create a textured, slip-resistant surface 
                perfect for garages, basements, and commercial spaces.
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
                  src="/images/flake-epoxy.jpg"
                  alt="Flake epoxy flooring"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                Beauty Meets <span className="metallic-text">Function</span>
              </h2>
              <p className="text-white/60 mb-8 leading-relaxed">
                Flake epoxy flooring offers the perfect combination of aesthetic appeal 
                and practical performance. The decorative chips not only create a beautiful 
                speckled pattern but also provide texture for slip resistance.
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
            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-xl p-6 text-center">
                <Grip className="w-8 h-8 mx-auto mb-3 text-white/50" />
                <p className="text-lg font-semibold mb-1">Slip Resistant</p>
                <p className="text-sm text-white/50">Textured surface</p>
              </div>
              <div className="glass rounded-xl p-6 text-center">
                <Shield className="w-8 h-8 mx-auto mb-3 text-white/50" />
                <p className="text-lg font-semibold mb-1">Durable</p>
                <p className="text-sm text-white/50">15+ year lifespan</p>
              </div>
              <div className="glass rounded-xl p-6 text-center col-span-2">
                <p className="text-3xl font-bold metallic-text mb-2">400+</p>
                <p className="text-white/50">Flake epoxy projects completed in Yakima</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flake Sizes */}
      <section className="section-reveal py-16 lg:py-24">
        <div className="w-full px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-white/50 uppercase tracking-wider mb-4 block">
              Options
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Flake <span className="metallic-text">Sizes</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Choose the perfect flake size to achieve your desired look and texture
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {flakeSizes.map((size, index) => (
              <div key={index} className="glass rounded-2xl p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold metallic-text">{size.name.split(' ')[0]}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{size.name}</h3>
                <p className="text-white/50">{size.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Color Blends */}
      <section className="section-reveal py-16 lg:py-24 bg-[#111]">
        <div className="w-full px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-white/50 uppercase tracking-wider mb-4 block">
              Color Options
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Popular <span className="metallic-text">Blends</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {colorBlends.map((blend, index) => (
              <div key={index} className="glass rounded-2xl p-6">
                <div className="flex gap-2 mb-4">
                  {blend.colors.map((color, cIndex) => (
                    <div
                      key={cIndex}
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <h3 className="font-semibold">{blend.name}</h3>
              </div>
            ))}
          </div>
          <p className="text-center text-white/50 text-sm mt-8">
            Custom color blends available - contact us to create your perfect combination
          </p>
        </div>
      </section>

      {/* Before/After */}
      <section className="section-reveal py-16 lg:py-24">
        <div className="w-full px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Flake Epoxy <span className="metallic-text">Transformations</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="relative">
              <div className="aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src="/images/before-floor.jpg"
                  alt="Before flake epoxy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-4 left-4 px-3 py-1 bg-black/70 rounded-full text-xs font-medium">
                Before
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src="/images/after-floor.jpg"
                  alt="After flake epoxy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                After
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-reveal py-16 lg:py-24 bg-[#111]">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Get Your <span className="metallic-text">Flake Floor</span>
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
              Ready to upgrade your space with a beautiful, durable flake epoxy floor? 
              Contact us today for a free consultation and quote.
            </p>
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-lg font-semibold"
            >
              Get Your Free Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
