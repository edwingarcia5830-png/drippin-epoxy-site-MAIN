import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MapPin, Phone, Clock, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const primaryAreas = [
  { name: 'Yakima', description: 'Primary service area' },
  { name: 'Selah', description: '15 minutes from Yakima' },
  { name: 'Union Gap', description: '10 minutes from Yakima' },
  { name: 'Toppenish', description: '25 minutes from Yakima' },
];

const secondaryAreas = [
  'Sunnyside',
  'Grandview',
  'Zillah',
  'Wapato',
  'Moxee',
  'Tieton',
  'Naches',
  'White Swan',
  'Harrah',
  'Mabton',
];

export function ServiceAreasPage() {
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
          <div className="text-center max-w-3xl mx-auto">
            <span className="hero-reveal inline-block text-sm font-medium text-white/50 uppercase tracking-wider mb-4">
              Service Areas
            </span>
            <h1 className="hero-reveal text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Serving <span className="metallic-text">Yakima</span> & Beyond
            </h1>
            <p className="hero-reveal text-lg text-white/60 leading-relaxed">
              We proudly serve Yakima and surrounding communities with premium epoxy 
              flooring solutions. Wherever you are in the Yakima Valley, we bring 
              luxury flooring to your doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-reveal py-8 pb-16">
        <div className="w-full px-6 lg:px-12">
          <div className="aspect-[21/9] rounded-2xl overflow-hidden glass relative">
            <img
              src="/images/process-1.jpg"
              alt="Yakima Valley service area"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 mx-auto mb-4 text-white/50" />
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Yakima Valley</h2>
                <p className="text-white/60">Washington State</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Areas */}
      <section className="section-reveal py-16 lg:py-24 bg-[#111]">
        <div className="w-full px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-white/50 uppercase tracking-wider mb-4 block">
              Primary Areas
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Main <span className="metallic-text">Service Locations</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {primaryAreas.map((area, index) => (
              <div key={index} className="glass rounded-2xl p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-white/50" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{area.name}</h3>
                <p className="text-white/50 text-sm">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secondary Areas */}
      <section className="section-reveal py-16 lg:py-24">
        <div className="w-full px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
              Additional <span className="metallic-text">Service Areas</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              We also serve these surrounding communities. Contact us to confirm 
              service availability for your location.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {secondaryAreas.map((area, index) => (
              <span
                key={index}
                className="px-6 py-3 rounded-full glass text-white/70"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why Local Section */}
      <section className="section-reveal py-16 lg:py-24 bg-[#111]">
        <div className="w-full px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                Why Choose a <span className="metallic-text">Local Company</span>
              </h2>
              <p className="text-white/60 mb-8 leading-relaxed">
                As a locally owned and operated business, we understand the unique 
                needs of Yakima Valley residents and businesses. We are committed 
                to providing personalized service and building lasting relationships 
                with our community.
              </p>
              <ul className="space-y-4">
                {[
                  'Fast response times',
                  'Local knowledge and expertise',
                  'Personalized service',
                  'Support for the local economy',
                  'Community-focused approach',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white/70" />
                    </div>
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-xl p-6 text-center">
                <Clock className="w-8 h-8 mx-auto mb-3 text-white/50" />
                <p className="text-lg font-semibold mb-1">Fast Response</p>
                <p className="text-sm text-white/50">Quick quotes & scheduling</p>
              </div>
              <div className="glass rounded-xl p-6 text-center">
                <MapPin className="w-8 h-8 mx-auto mb-3 text-white/50" />
                <p className="text-lg font-semibold mb-1">Local Knowledge</p>
                <p className="text-sm text-white/50">We know the area</p>
              </div>
              <div className="glass rounded-xl p-6 text-center col-span-2">
                <Phone className="w-8 h-8 mx-auto mb-3 text-white/50" />
                <p className="text-lg font-semibold mb-1">Always Available</p>
                <p className="text-sm text-white/50">Call us anytime for questions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-reveal py-16 lg:py-24">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Service in Your <span className="metallic-text">Area?</span>
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
              Not sure if we serve your location? Contact us to confirm availability 
              and get a free quote for your epoxy flooring project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-lg font-semibold"
              >
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+15095551234"
                className="btn-glossy inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-lg font-semibold"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
