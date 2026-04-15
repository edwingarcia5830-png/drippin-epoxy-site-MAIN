import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check, Shield, Clock, Phone, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  'Chemical and oil resistant coating',
  'Hot tire pickup resistant',
  'Easy to clean and maintain surface',
  'UV stable finish options',
  'Slip-resistant textures available',
  '5-15 year warranty coverage',
];

const process = [
  {
    step: '01',
    title: 'Consultation',
    description: 'We discuss your vision, assess your garage, and provide a detailed quote.',
  },
  {
    step: '02',
    title: 'Preparation',
    description: 'Thorough cleaning, crack repair, and surface grinding for optimal adhesion.',
  },
  {
    step: '03',
    title: 'Application',
    description: 'Professional epoxy application with precision and attention to detail.',
  },
  {
    step: '04',
    title: 'Curing',
    description: 'Proper curing time ensures a durable, long-lasting finish.',
  },
];

const faqs = [
  {
    question: 'How long does garage epoxy installation take?',
    answer: 'Most residential garage epoxy projects are completed in 2-3 days, including preparation, application, and curing time. Larger garages or complex designs may take an additional day.',
  },
  {
    question: 'How long before I can use my garage?',
    answer: 'Light foot traffic is typically possible after 24 hours. Vehicles can usually be parked after 72 hours, though full cure (maximum hardness) takes about 7 days.',
  },
  {
    question: 'Will hot tires damage the epoxy?',
    answer: 'Our premium epoxy systems are specifically formulated to resist hot tire pickup. We use high-quality materials that can withstand the heat from tires without peeling or lifting.',
  },
  {
    question: 'How do I maintain my epoxy garage floor?',
    answer: 'Epoxy floors are very low maintenance. Regular sweeping and occasional mopping with mild detergent is all that is needed. Avoid harsh chemicals and abrasive cleaners.',
  },
];

export function GarageEpoxyPage() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);

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

      const sections = contentRef.current?.querySelectorAll('.section-reveal');
      if (sections && sections.length > 0) {
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
                Residential Service
              </span>
              <h1 className="hero-reveal text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Garage Epoxy <br />
                <span className="metallic-text">Flooring</span>
              </h1>
              <p className="hero-reveal text-lg text-white/60 mb-8 leading-relaxed">
                Transform your garage into a showroom-quality space with our premium 
                epoxy flooring. Durable, chemical-resistant, and stunningly beautiful 
                finishes that stand up to daily use.
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
                  src="/images/garage-metallic.jpg"
                  alt="Garage epoxy flooring"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section ref={contentRef}>
        {/* Features Section */}
        <div className="section-reveal py-16 lg:py-24 bg-[#111]">
          <div className="w-full px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                  Why Choose Garage <span className="metallic-text">Epoxy?</span>
                </h2>
                <p className="text-white/60 mb-8 leading-relaxed">
                  Our garage epoxy flooring systems are engineered to withstand the toughest 
                  conditions while maintaining a stunning appearance. From hot tires to chemical 
                  spills, your floor will look great for years to come.
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
                  <Shield className="w-8 h-8 mx-auto mb-3 text-white/50" />
                  <p className="text-3xl font-bold metallic-text mb-1">15+</p>
                  <p className="text-sm text-white/50">Years Warranty</p>
                </div>
                <div className="glass rounded-xl p-6 text-center">
                  <Clock className="w-8 h-8 mx-auto mb-3 text-white/50" />
                  <p className="text-3xl font-bold metallic-text mb-1">2-3</p>
                  <p className="text-sm text-white/50">Days Install</p>
                </div>
                <div className="glass rounded-xl p-6 text-center">
                  <Star className="w-8 h-8 mx-auto mb-3 text-white/50" />
                  <p className="text-3xl font-bold metallic-text mb-1">500+</p>
                  <p className="text-sm text-white/50">Projects Done</p>
                </div>
                <div className="glass rounded-xl p-6 text-center">
                  <Check className="w-8 h-8 mx-auto mb-3 text-white/50" />
                  <p className="text-3xl font-bold metallic-text mb-1">4.9</p>
                  <p className="text-sm text-white/50">Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="section-reveal py-16 lg:py-24">
          <div className="w-full px-6 lg:px-12">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-white/50 uppercase tracking-wider mb-4 block">
                Our Process
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                How It <span className="metallic-text">Works</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {process.map((step, index) => (
                <div key={index} className="relative">
                  <div className="glass rounded-2xl p-6 lg:p-8 h-full">
                    <span className="text-4xl font-bold text-white/10 mb-4 block">
                      {step.step}
                    </span>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-white/10" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Before/After Section */}
        <div className="section-reveal py-16 lg:py-24 bg-[#111]">
          <div className="w-full px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                Real <span className="metallic-text">Transformations</span>
              </h2>
              <p className="text-white/60">See the difference our garage epoxy makes</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="relative">
                <div className="aspect-[4/3] rounded-xl overflow-hidden">
                  <img
                    src="/images/before-floor.jpg"
                    alt="Before garage epoxy"
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
                    alt="After garage epoxy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                  After
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="section-reveal py-16 lg:py-24">
          <div className="w-full px-6 lg:px-12">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-sm font-medium text-white/50 uppercase tracking-wider mb-4 block">
                  FAQ
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                  Common <span className="metallic-text">Questions</span>
                </h2>
              </div>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="glass rounded-xl p-6">
                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="section-reveal py-16 lg:py-24 bg-[#111]">
          <div className="w-full px-6 lg:px-12">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Ready for Your <span className="metallic-text">Dream Garage?</span>
              </h2>
              <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
                Contact us today for a free consultation and quote. Transform your 
                garage into a space you will be proud to show off.
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
        </div>
      </section>
    </>
  );
}
