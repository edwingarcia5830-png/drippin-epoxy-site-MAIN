import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check, Sparkles, Palette, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  'Unique 3D visual effects and depth',
  'Unlimited color combinations',
  'Mirror-like high gloss finish',
  'Seamless, continuous surface',
  'Perfect for showrooms and luxury homes',
  'Completely customizable designs',
];

const colorOptions = [
  { name: 'Silver Storm', color: 'from-gray-300 to-gray-500' },
  { name: 'Ocean Blue', color: 'from-blue-400 to-blue-700' },
  { name: 'Copper Fire', color: 'from-orange-400 to-red-600' },
  { name: 'Emerald Dream', color: 'from-emerald-400 to-emerald-700' },
  { name: 'Royal Purple', color: 'from-purple-400 to-purple-700' },
  { name: 'Golden Sands', color: 'from-yellow-400 to-amber-600' },
];

const applications = [
  { title: 'Residential', description: 'Basements, garages, and living spaces' },
  { title: 'Commercial', description: 'Retail stores, showrooms, and offices' },
  { title: 'Automotive', description: 'Car showrooms and collector garages' },
  { title: 'Hospitality', description: 'Restaurants, hotels, and entertainment venues' },
];

export function MetallicEpoxyPage() {
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
                Decorative Flooring
              </span>
              <h1 className="hero-reveal text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Metallic Epoxy <br />
                <span className="metallic-text">Floors</span>
              </h1>
              <p className="hero-reveal text-lg text-white/60 mb-8 leading-relaxed">
                Create stunning, one-of-a-kind floors with mesmerizing 3D effects, 
                swirls, and depth. Our metallic epoxy systems transform any space 
                into a work of art with mirror-like finishes.
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
                  src="/images/metallic-navy.jpg"
                  alt="Metallic epoxy flooring"
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
                  src="/images/gallery-5.jpg"
                  alt="Metallic epoxy detail"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                Artistry Meets <span className="metallic-text">Durability</span>
              </h2>
              <p className="text-white/60 mb-8 leading-relaxed">
                Metallic epoxy flooring combines stunning visual appeal with exceptional 
                performance. Each floor is a unique masterpiece, created through specialized 
                techniques that produce flowing, three-dimensional effects.
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

      {/* Color Options */}
      <section className="section-reveal py-16 lg:py-24">
        <div className="w-full px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-white/50 uppercase tracking-wider mb-4 block">
              Color Options
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Popular <span className="metallic-text">Colorways</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Choose from our most popular metallic epoxy colors, or work with us 
              to create a completely custom design for your space.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
            {colorOptions.map((color, index) => (
              <div key={index} className="group">
                <div className={`aspect-square rounded-2xl bg-gradient-to-br ${color.color} mb-4 transition-transform duration-300 group-hover:scale-[1.02]`} />
                <p className="font-medium text-center">{color.name}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-white/50 text-sm mt-8">
            <Palette className="w-4 h-4 inline mr-2" />
            Custom colors available - contact us to discuss your vision
          </p>
        </div>
      </section>

      {/* Applications */}
      <section className="section-reveal py-16 lg:py-24 bg-[#111]">
        <div className="w-full px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-white/50 uppercase tracking-wider mb-4 block">
              Applications
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Perfect For <span className="metallic-text">Any Space</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {applications.map((app, index) => (
              <div key={index} className="glass rounded-2xl p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-white/50" />
                </div>
                <h3 className="font-semibold mb-2">{app.title}</h3>
                <p className="text-white/50 text-sm">{app.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="section-reveal py-16 lg:py-24">
        <div className="w-full px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Metallic Epoxy <span className="metallic-text">Gallery</span>
            </h2>
            <p className="text-white/60">Browse our collection of stunning metallic epoxy projects</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="aspect-square rounded-xl overflow-hidden">
              <img src="/images/gallery-1.jpg" alt="Metallic epoxy project" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden md:row-span-2">
              <img src="/images/garage-metallic.jpg" alt="Metallic epoxy project" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden">
              <img src="/images/gallery-5.jpg" alt="Metallic epoxy project" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden">
              <img src="/images/process-1.jpg" alt="Metallic epoxy project" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden">
              <img src="/images/gallery-4.jpg" alt="Metallic epoxy project" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="text-center mt-8">
            <Link
              to="/gallery"
              className="btn-glossy inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold"
            >
              View Full Gallery
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-reveal py-16 lg:py-24 bg-[#111]">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Create Your <span className="metallic-text">Masterpiece</span>
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
              Ready to transform your space with a stunning metallic epoxy floor? 
              Contact us today to discuss your vision and get a free quote.
            </p>
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-lg font-semibold"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
