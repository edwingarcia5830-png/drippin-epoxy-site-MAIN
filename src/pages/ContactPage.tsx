import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, Clock, Send, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    value: '(509) 555-1234',
    href: 'tel:+15095551234',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'info@drippinepoxy.com',
    href: 'mailto:info@drippinepoxy.com',
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'Yakima, WA 98901',
    href: '#',
  },
  {
    icon: Clock,
    title: 'Hours',
    value: 'Mon-Fri: 8AM - 6PM',
    href: '#',
  },
];

const projectTypes = [
  'Garage Epoxy',
  'Metallic Epoxy',
  'Flake Epoxy',
  'Commercial Epoxy',
  'Other',
];

export function ContactPage() {
  const heroRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="w-full px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="hero-reveal inline-block text-sm font-medium text-white/50 uppercase tracking-wider mb-4">
              Contact Us
            </span>
            <h1 className="hero-reveal text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Get Your <span className="metallic-text">Free Quote</span>
            </h1>
            <p className="hero-reveal text-lg text-white/60 leading-relaxed">
              Ready to transform your space? Contact us today for a free consultation 
              and quote. We will get back to you within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="section-reveal py-8 pb-16">
        <div className="w-full px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {contactInfo.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="glass rounded-2xl p-4 lg:p-6 text-center hover:bg-white/[0.06] transition-colors"
              >
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white/50" />
                </div>
                <p className="text-xs text-white/50 uppercase tracking-wider mb-1">{item.title}</p>
                <p className="text-sm lg:text-base font-medium">{item.value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-reveal py-8 pb-24 lg:pb-32">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="calculator-card rounded-3xl p-6 lg:p-10">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold mb-4">Thank You!</h2>
                  <p className="text-white/60 mb-8">
                    We have received your message and will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn-glossy px-8 py-3 rounded-full font-semibold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">Request a Quote</h2>
                    <p className="text-white/50">Fill out the form below and we will get back to you shortly.</p>
                  </div>

                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    data-netlify="true"
                    name="contact"
                    method="POST"
                  >
                    {/* Hidden field for Netlify */}
                    <input type="hidden" name="form-name" value="contact" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Name <span className="text-white/50">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          className="form-input w-full px-4 py-3 rounded-xl text-white"
                          placeholder="Your name"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                          Phone <span className="text-white/50">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          className="form-input w-full px-4 py-3 rounded-xl text-white"
                          placeholder="(509) 555-1234"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email <span className="text-white/50">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className="form-input w-full px-4 py-3 rounded-xl text-white"
                          placeholder="your@email.com"
                        />
                      </div>

                      {/* City */}
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium mb-2">
                          City <span className="text-white/50">*</span>
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          required
                          className="form-input w-full px-4 py-3 rounded-xl text-white"
                          placeholder="Yakima"
                        />
                      </div>
                    </div>

                    {/* Project Type */}
                    <div>
                      <label htmlFor="projectType" className="block text-sm font-medium mb-2">
                        Project Type
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        className="form-input w-full px-4 py-3 rounded-xl text-white"
                      >
                        <option value="">Select project type</option>
                        {projectTypes.map((type, index) => (
                          <option key={index} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    {/* Square Footage */}
                    <div>
                      <label htmlFor="squareFootage" className="block text-sm font-medium mb-2">
                        Approximate Square Footage
                      </label>
                      <input
                        type="text"
                        id="squareFootage"
                        name="squareFootage"
                        className="form-input w-full px-4 py-3 rounded-xl text-white"
                        placeholder="e.g., 500"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="form-input w-full px-4 py-3 rounded-xl text-white resize-none"
                        placeholder="Tell us about your project..."
                      />
                    </div>

                    {/* Preferred Contact */}
                    <div>
                      <label className="block text-sm font-medium mb-3">Preferred Contact Method</label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="contactMethod"
                            value="phone"
                            defaultChecked
                            className="w-4 h-4 accent-white"
                          />
                          <span className="text-sm">Phone</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="contactMethod"
                            value="email"
                            className="w-4 h-4 accent-white"
                          />
                          <span className="text-sm">Email</span>
                        </label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-sm text-white/40">
                      By submitting this form, you agree to be contacted about your epoxy flooring project.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-reveal py-16 lg:py-24 bg-[#111]">
        <div className="w-full px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Find Us in <span className="metallic-text">Yakima</span>
            </h2>
            <p className="text-white/60">
              We are based in Yakima and serve the entire Yakima Valley
            </p>
          </div>
          <div className="aspect-[21/9] rounded-2xl overflow-hidden glass">
            <img
              src="/images/gallery-6.jpg"
              alt="Yakima Valley"
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto mb-3 text-white/50" />
                <p className="text-lg font-semibold">Drippin Epoxy</p>
                <p className="text-white/50">Yakima, WA</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
