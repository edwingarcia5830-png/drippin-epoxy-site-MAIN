import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calculator, Check, Info } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Pricing data
const baseRates: Record<string, number> = {
  garage: 4.5,
  shop: 5,
  patio: 5.5,
  commercial: 6,
  other: 5,
};

const coatingMultipliers: Record<string, number> = {
  standard: 1,
  flake: 1.3,
  metallic: 1.8,
  custom: 2.2,
};

const conditionMultipliers: Record<string, number> = {
  good: 1,
  minor: 1.2,
  heavy: 1.5,
};

const addonPrices: Record<string, number> = {
  crackRepair: 2,
  moistureBarrier: 3,
  customColor: 1.5,
  stemWalls: 2,
  antiSlip: 1,
};

export function PricingPage() {
  const heroRef = useRef<HTMLElement>(null);
  const calculatorRef = useRef<HTMLElement>(null);

  // Form state
  const [projectType, setProjectType] = useState('garage');
  const [squareFootage, setSquareFootage] = useState('');
  const [coatingType, setCoatingType] = useState('standard');
  const [floorCondition, setFloorCondition] = useState('good');
  const [addons, setAddons] = useState<string[]>([]);
  const [estimate, setEstimate] = useState<{ min: number; max: number } | null>(null);

  const calculateEstimate = () => {
    const sqft = parseInt(squareFootage) || 0;
    if (sqft === 0) return;

    const basePrice = baseRates[projectType] * sqft;
    const coatingPrice = basePrice * coatingMultipliers[coatingType];
    const conditionPrice = coatingPrice * conditionMultipliers[floorCondition];
    
    const addonTotal = addons.reduce((sum, addon) => sum + (addonPrices[addon] * sqft), 0);
    
    const total = conditionPrice + addonTotal;
    const min = Math.round(total * 0.9);
    const max = Math.round(total * 1.1);
    
    setEstimate({ min, max });
  };

  const toggleAddon = (addon: string) => {
    setAddons(prev => 
      prev.includes(addon) 
        ? prev.filter(a => a !== addon)
        : [...prev, addon]
    );
  };

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

      if (calculatorRef.current) {
        gsap.fromTo(
          calculatorRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: calculatorRef.current,
              start: 'top 70%',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    calculateEstimate();
  }, [projectType, squareFootage, coatingType, floorCondition, addons]);

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="w-full px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="hero-reveal inline-block text-sm font-medium text-white/50 uppercase tracking-wider mb-4">
              Pricing
            </span>
            <h1 className="hero-reveal text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Get Your <span className="metallic-text">Estimate</span>
            </h1>
            <p className="hero-reveal text-lg text-white/60 leading-relaxed">
              Use our interactive pricing calculator to get an instant estimate 
              for your epoxy flooring project. For an exact quote, contact us directly.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section ref={calculatorRef} className="py-8 pb-24 lg:pb-32">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="calculator-card rounded-3xl p-6 lg:p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-white/70" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Pricing Calculator</h2>
                  <p className="text-sm text-white/50">Get an instant estimate</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Project Type */}
                <div>
                  <label className="block text-sm font-medium mb-3">Project Type</label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="form-input w-full px-4 py-3 rounded-xl text-white"
                  >
                    <option value="garage">Garage</option>
                    <option value="shop">Shop / Workshop</option>
                    <option value="patio">Patio / Outdoor</option>
                    <option value="commercial">Commercial</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Square Footage */}
                <div>
                  <label className="block text-sm font-medium mb-3">Square Footage</label>
                  <input
                    type="number"
                    value={squareFootage}
                    onChange={(e) => setSquareFootage(e.target.value)}
                    placeholder="e.g., 500"
                    className="form-input w-full px-4 py-3 rounded-xl text-white"
                  />
                </div>

                {/* Coating Type */}
                <div>
                  <label className="block text-sm font-medium mb-3">Coating Type</label>
                  <select
                    value={coatingType}
                    onChange={(e) => setCoatingType(e.target.value)}
                    className="form-input w-full px-4 py-3 rounded-xl text-white"
                  >
                    <option value="standard">Standard Epoxy</option>
                    <option value="flake">Flake Epoxy</option>
                    <option value="metallic">Metallic Epoxy</option>
                    <option value="custom">Custom Finish</option>
                  </select>
                </div>

                {/* Floor Condition */}
                <div>
                  <label className="block text-sm font-medium mb-3">Floor Condition</label>
                  <select
                    value={floorCondition}
                    onChange={(e) => setFloorCondition(e.target.value)}
                    className="form-input w-full px-4 py-3 rounded-xl text-white"
                  >
                    <option value="good">Good - Minor prep needed</option>
                    <option value="minor">Fair - Some repairs needed</option>
                    <option value="heavy">Poor - Extensive prep needed</option>
                  </select>
                </div>
              </div>

              {/* Add-ons */}
              <div className="mb-8">
                <label className="block text-sm font-medium mb-3">Optional Add-ons</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { id: 'crackRepair', label: 'Crack Repair' },
                    { id: 'moistureBarrier', label: 'Moisture Barrier' },
                    { id: 'customColor', label: 'Custom Color Upgrade' },
                    { id: 'stemWalls', label: 'Stem Walls / Edges' },
                    { id: 'antiSlip', label: 'Anti-Slip Finish' },
                  ].map((addon) => (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                        addons.includes(addon.id)
                          ? 'border-white/30 bg-white/10'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        addons.includes(addon.id)
                          ? 'bg-white border-white'
                          : 'border-white/30'
                      }`}>
                        {addons.includes(addon.id) && <Check className="w-3 h-3 text-black" />}
                      </div>
                      <span className="text-sm">{addon.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimate Result */}
              {estimate && squareFootage && (
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-8">
                  <div className="flex items-start gap-3 mb-4">
                    <Info className="w-5 h-5 text-white/50 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-white/50">
                      This is a rough estimate. Final pricing depends on site conditions 
                      and project scope. Contact us for an exact quote.
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-white/50 mb-2">Estimated Price Range</p>
                    <p className="text-4xl lg:text-5xl font-bold metallic-text">
                      ${estimate.min.toLocaleString()} - ${estimate.max.toLocaleString()}
                    </p>
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="btn-primary flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold"
                >
                  Get Exact Quote
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="tel:+15095551234"
                  className="btn-glossy flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold"
                >
                  Call for Pricing
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Info Section */}
      <section className="py-24 lg:py-32 bg-[#111]">
        <div className="w-full px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              What Affects <span className="metallic-text">Pricing</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Several factors influence the final cost of your epoxy flooring project
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Square Footage',
                description: 'Larger areas typically have a lower cost per square foot due to economies of scale.',
              },
              {
                title: 'Floor Condition',
                description: 'Cracks, stains, and damage require additional prep work, affecting the total cost.',
              },
              {
                title: 'Coating Type',
                description: 'Metallic and custom finishes require more materials and labor than standard epoxy.',
              },
              {
                title: 'Add-ons',
                description: 'Optional features like moisture barriers, anti-slip, and custom colors add to the cost.',
              },
              {
                title: 'Accessibility',
                description: 'Hard-to-reach areas or special equipment needs may affect pricing.',
              },
              {
                title: 'Timeline',
                description: 'Rush projects or specific scheduling requirements may incur additional fees.',
              },
            ].map((item, index) => (
              <div key={index} className="glass rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warranty Section */}
      <section className="py-24 lg:py-32">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Our <span className="metallic-text">Warranty</span>
            </h2>
            <p className="text-white/60 text-lg mb-10">
              We stand behind our work with comprehensive warranties. All our epoxy 
              flooring installations come with coverage ranging from 5 to 20 years, 
              depending on the system type and application.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass rounded-2xl p-6">
                <p className="text-4xl font-bold metallic-text mb-2">5-10</p>
                <p className="text-white/50">Years Standard</p>
              </div>
              <div className="glass rounded-2xl p-6">
                <p className="text-4xl font-bold metallic-text mb-2">15</p>
                <p className="text-white/50">Years Premium</p>
              </div>
              <div className="glass rounded-2xl p-6">
                <p className="text-4xl font-bold metallic-text mb-2">20</p>
                <p className="text-white/50">Years Commercial</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
