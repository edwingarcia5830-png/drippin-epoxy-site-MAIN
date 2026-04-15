import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Award, Users, Target, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Target,
    title: 'Craftsmanship',
    description: 'Every project receives meticulous attention to detail, ensuring flawless results that exceed expectations.',
  },
  {
    icon: Shield,
    title: 'Quality Materials',
    description: 'We use only industrial-grade epoxy systems from trusted manufacturers for lasting durability.',
  },
  {
    icon: Users,
    title: 'Customer Focus',
    description: 'Your satisfaction is our priority. We work closely with you to bring your vision to life.',
  },
  {
    icon: Award,
    title: 'Integrity',
    description: 'Honest pricing, clear communication, and standing behind our work with solid warranties.',
  },
];

const stats = [
  { value: '500+', label: 'Projects Completed' },
  { value: '5+', label: 'Years Experience' },
  { value: '4.9', label: 'Average Rating' },
  { value: '100%', label: 'Satisfaction Goal' },
];

const faqs = [
  {
    question: 'How long have you been in business?',
    answer: 'Drippin Epoxy has been serving the Yakima Valley for over 5 years, completing hundreds of residential and commercial epoxy flooring projects.',
  },
  {
    question: 'What areas do you serve?',
    answer: 'We primarily serve Yakima and surrounding areas including Selah, Union Gap, Toppenish, Sunnyside, Grandview, and Zillah.',
  },
  {
    question: 'Are you licensed and insured?',
    answer: 'Yes, we are fully licensed and insured for your protection and peace of mind.',
  },
  {
    question: 'What warranty do you offer?',
    answer: 'We offer warranties ranging from 5 to 20 years depending on the epoxy system and application type.',
  },
  {
    question: 'How do I get started?',
    answer: 'Simply contact us through our website, call, or email to schedule a free consultation and quote.',
  },
];

export function AboutPage() {
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
      if (sections.length === 0) return;
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
                About Us
              </span>
              <h1 className="hero-reveal text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Yakima&apos;s Premier <br />
                <span className="metallic-text">Epoxy Experts</span>
              </h1>
              <p className="hero-reveal text-lg text-white/60 mb-8 leading-relaxed">
                At Drippin Epoxy, we transform ordinary concrete into extraordinary 
                surfaces. Our passion for quality craftsmanship and premium materials 
                has made us the trusted choice for epoxy flooring in the Yakima Valley.
              </p>
              <div className="hero-reveal flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold"
                >
                  Get a Free Quote
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/gallery"
                  className="btn-glossy inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold"
                >
                  View Our Work
                </Link>
              </div>
            </div>
            <div className="hero-reveal">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="/images/about-team.jpg"
                  alt="Drippin Epoxy team"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-reveal py-16 lg:py-24 bg-[#111]">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
              Our <span className="metallic-text">Story</span>
            </h2>
            <p className="text-white/60 leading-relaxed mb-6">
              Drippin Epoxy was founded with a simple mission: to bring premium epoxy 
              flooring solutions to homes and businesses in the Yakima Valley. What 
              started as a passion for transforming spaces has grown into a trusted 
              local business known for quality, reliability, and stunning results.
            </p>
            <p className="text-white/60 leading-relaxed">
              We believe that every floor has potential. Whether it is a cracked garage 
              floor or a worn warehouse surface, we see the opportunity to create something 
              beautiful and durable. Our team combines technical expertise with artistic 
              vision to deliver floors that not only look incredible but stand the test of time.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-reveal py-16 lg:py-24">
        <div className="w-full px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="glass rounded-2xl p-6 text-center">
                <p className="text-3xl lg:text-4xl font-bold metallic-text mb-2">{stat.value}</p>
                <p className="text-sm text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-reveal py-16 lg:py-24 bg-[#111]">
        <div className="w-full px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-white/50 uppercase tracking-wider mb-4 block">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              What We <span className="metallic-text">Stand For</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div key={index} className="glass rounded-2xl p-6 lg:p-8">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-5">
                  <value.icon className="w-6 h-6 text-white/70" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-white/50 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-reveal py-16 lg:py-24">
        <div className="w-full px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-white/50 uppercase tracking-wider mb-4 block">
              Our Process
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              How We <span className="metallic-text">Work</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Consultation', description: 'We discuss your vision and assess your space' },
              { step: '02', title: 'Quote', description: 'Detailed proposal with transparent pricing' },
              { step: '03', title: 'Preparation', description: 'Thorough surface prep for optimal results' },
              { step: '04', title: 'Installation', description: 'Professional application with precision' },
            ].map((item, index) => (
              <div key={index} className="relative text-center">
                <span className="text-5xl font-bold text-white/5 mb-4 block">{item.step}</span>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section-reveal py-16 lg:py-24 bg-[#111]">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-sm font-medium text-white/50 uppercase tracking-wider mb-4 block">
                FAQ
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
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
      </section>

      {/* CTA Section */}
      <section className="section-reveal py-16 lg:py-24">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Work <span className="metallic-text">Together?</span>
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
              Let us bring your vision to life with premium epoxy flooring. 
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
