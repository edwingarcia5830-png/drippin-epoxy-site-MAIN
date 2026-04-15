import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Award, Clock, Phone, Star, Zap, CreditCard, ChevronRight, MapPin, MoveHorizontal } from 'lucide-react';

// ============================================
// HERO SECTION - SCROLL-CONTROLLED VIDEO
// ============================================
function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Fade in on load
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Preload video metadata
    video.load();

    const handleScroll = () => {
      if (!heroRef.current || !video || !video.duration) return;
      
      const rect = heroRef.current.getBoundingClientRect();
      const heroHeight = heroRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate progress: 0 at top, 1 at bottom of hero scroll
      const scrolled = Math.max(0, -rect.top);
      const maxScroll = heroHeight - viewportHeight;
      const progress = Math.min(1, Math.max(0, scrolled / maxScroll));
      
      // Set video time based on scroll progress
      video.currentTime = progress * video.duration;
    };

    // Use RAF for smooth updates
    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        handleScroll();
        rafRef.current = null;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Initial call once video is ready
    video.addEventListener('loadedmetadata', handleScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      video.removeEventListener('loadedmetadata', handleScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={heroRef} className="relative h-[200vh]">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Video Background Layer */}
        <div 
          className={`absolute inset-0 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            poster="/images/after-floor.jpg"
          >
            <source src="/images/epoxy-transformation.mov" type="video/quicktime" />
          </video>
        </div>
        
        {/* Dark Overlay Layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/60" />

        {/* Content Layer */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className={`w-full px-6 lg:px-12 text-center transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="inline-block px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-widest uppercase mb-10">
              Premium Epoxy Flooring in Yakima, WA
            </span>
            <h1 
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-8 max-w-[650px] mx-auto leading-[0.95] tracking-tight"
              style={{ textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}
            >
              <span className="metallic-text">Luxury Epoxy</span>
              <br />
              <span className="text-white">Floors</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-lg mx-auto mb-14 leading-relaxed font-light">
              Custom metallic, flake, and high-performance epoxy systems built to last.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#calculator"
                className="group bg-white text-black px-10 py-5 rounded-full text-base font-bold flex items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_50px_rgba(255,255,255,0.25)] hover:brightness-110"
              >
                Get Instant Quote
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                to="/gallery"
                className="group px-10 py-5 rounded-full text-base font-bold flex items-center justify-center gap-2 border-2 border-white/40 text-white transition-all duration-300 hover:-translate-y-1 hover:border-white/80 hover:bg-white/10"
              >
                View Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// COUNT-UP ANIMATION HOOK
// ============================================
function useCountUp(target: number, duration: number = 600) {
  const [value, setValue] = useState(target);
  const prevTargetRef = useRef(target);

  useEffect(() => {
    const start = prevTargetRef.current;
    const end = target;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * easeOut);
      
      setValue(current);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
    prevTargetRef.current = target;
  }, [target, duration]);

  return value;
}

// ============================================
// PREMIUM CALCULATOR - SOFTWARE EXPERIENCE
// ============================================
function PremiumCalculatorSection() {
  const [squareFootage, setSquareFootage] = useState(500);
  const [projectType, setProjectType] = useState('garage');
  const [finishType, setFinishType] = useState('solid');
  const [addons, setAddons] = useState<string[]>([]);
  const [animatingCard, setAnimatingCard] = useState<string | null>(null);

  // Base rates per sq ft by finish type
  const finishRates: Record<string, number> = {
    solid: 4.5,
    flake: 5.5,
    metallic: 7.5,
    premium: 9.5,
  };

  // Project type multipliers
  const projectMultipliers: Record<string, number> = {
    garage: 1,
    patio: 1.1,
    commercial: 1.2,
    interior: 1.05,
  };

  // Addon costs per sq ft
  const addonCosts: Record<string, number> = {
    crackRepair: 1.5,
    moistureBarrier: 2,
    topcoat: 1,
    customDesign: 2.5,
  };

  const calculatePrice = () => {
    const basePrice = finishRates[finishType] * squareFootage * projectMultipliers[projectType];
    const addonTotal = addons.reduce((sum, addon) => sum + (addonCosts[addon] * squareFootage), 0);
    const total = basePrice + addonTotal;
    const min = Math.round(total * 0.9);
    const max = Math.round(total * 1.1);
    return { min, max };
  };

  const { min, max } = calculatePrice();
  const animatedMin = useCountUp(min);
  const animatedMax = useCountUp(max);

  const toggleAddon = (addon: string) => {
    setAddons(prev => prev.includes(addon) ? prev.filter(a => a !== addon) : [...prev, addon]);
  };

  const handleProjectTypeChange = (typeId: string) => {
    setAnimatingCard(typeId);
    setProjectType(typeId);
    setTimeout(() => setAnimatingCard(null), 200);
  };

  const handleFinishTypeChange = (finishId: string) => {
    setAnimatingCard(finishId);
    setFinishType(finishId);
    setTimeout(() => setAnimatingCard(null), 200);
  };

  const finishOptions = [
    { id: 'solid', name: 'Solid Epoxy', desc: 'Classic, durable finish', price: '$4.50/sq ft' },
    { id: 'flake', name: 'Flake Epoxy', desc: 'Decorative chip system', price: '$5.50/sq ft' },
    { id: 'metallic', name: 'Metallic Epoxy', desc: '3D artistic effects', price: '$7.50/sq ft' },
    { id: 'premium', name: 'Custom Premium', desc: 'Bespoke luxury finish', price: '$9.50/sq ft' },
  ];

  const projectTypes = [
    { id: 'garage', label: 'Garage' },
    { id: 'patio', label: 'Patio' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'interior', label: 'Interior' },
  ];

  const addonOptions = [
    { id: 'crackRepair', label: 'Crack Repair', cost: '+$1.50/sq ft' },
    { id: 'moistureBarrier', label: 'Moisture Barrier', cost: '+$2.00/sq ft' },
    { id: 'topcoat', label: 'Topcoat Upgrade', cost: '+$1.00/sq ft' },
    { id: 'customDesign', label: 'Custom Design', cost: '+$2.50/sq ft' },
  ];

  // Calculate slider progress for background gradient
  const sliderProgress = ((squareFootage - 100) / (3000 - 100)) * 100;

  return (
    <section id="calculator" className="py-16 lg:py-20 bg-[#0a0a0a]">
      <div className="w-full px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
              Get Your <span className="metallic-text">Instant Quote</span>
            </h2>
            <p className="text-white/50 text-sm max-w-lg mx-auto">
              Customize your project and see your estimated price in real-time.
            </p>
          </div>

          {/* Calculator Card - Compact */}
          <div className="relative rounded-2xl overflow-hidden">
            {/* Glass background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-white/[0.06] backdrop-blur-xl" />
            <div className="absolute inset-0 border border-white/10 rounded-2xl" />
            <div className="absolute inset-0 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]" />
            
            <div className="relative p-6 lg:p-8">
              
              {/* PRICE DISPLAY */}
              <div className="text-center mb-8 pb-6 border-b border-white/10">
                <p className="text-xs font-semibold text-white/40 uppercase tracking-[0.15em] mb-2">Estimated Price</p>
                <p className="text-4xl sm:text-5xl lg:text-6xl font-black metallic-text tracking-tight">
                  ${animatedMin.toLocaleString()} - ${animatedMax.toLocaleString()}
                </p>
                <p className="text-xs text-white/40 mt-3 max-w-sm mx-auto">
                  Final price depends on surface condition.
                </p>
              </div>
              
              {/* Square Footage Slider */}
              <div className="mb-8">
                <div className="text-center mb-4">
                  <span className="text-3xl lg:text-4xl font-black text-white tracking-tight">{squareFootage}</span>
                  <span className="text-base text-white/50 ml-2 font-medium">sq ft</span>
                </div>
                <div className="relative px-2">
                  <input
                    type="range"
                    min="100"
                    max="3000"
                    step="50"
                    value={squareFootage}
                    onChange={(e) => setSquareFootage(Number(e.target.value))}
                    className="relative w-full h-3 rounded-full cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.5) ${sliderProgress}%, rgba(255,255,255,0.08) ${sliderProgress}%, rgba(255,255,255,0.08) 100%)`
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-white/40 mt-2 px-2">
                  <span>100 sq ft</span>
                  <span>3,000 sq ft</span>
                </div>
              </div>

              {/* Project Type - Compact */}
              <div className="mb-6">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3 block">Project Type</label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                  {projectTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleProjectTypeChange(type.id)}
                      className={`group relative px-4 py-3 rounded-lg text-xs font-bold transition-all duration-200 ${
                        projectType === type.id
                          ? 'bg-white text-black shadow-[0_6px_20px_rgba(255,255,255,0.15)]'
                          : 'bg-white/[0.04] text-white/70 border border-white/10 hover:bg-white/[0.08]'
                      } ${animatingCard === type.id ? 'scale-[0.98]' : ''}`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Finish Type - Compact */}
              <div className="mb-6">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3 block">Finish Type</label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                  {finishOptions.map((finish) => (
                    <button
                      key={finish.id}
                      onClick={() => handleFinishTypeChange(finish.id)}
                      className={`group relative p-3 rounded-lg text-left transition-all duration-200 ${
                        finishType === finish.id
                          ? 'bg-white/10 border border-white/40 shadow-[0_6px_20px_rgba(255,255,255,0.1)]'
                          : 'bg-white/[0.03] border border-white/10 hover:bg-white/[0.06]'
                      } ${animatingCard === finish.id ? 'scale-[0.98]' : ''}`}
                    >
                      <p className={`font-bold text-xs mb-0.5 ${finishType === finish.id ? 'text-white' : 'text-white/80'}`}>
                        {finish.name}
                      </p>
                      <p className="text-[10px] text-white/40">{finish.price}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Add-ons - Compact */}
              <div className="mb-6">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3 block">Add-ons</label>
                <div className="grid grid-cols-2 gap-2">
                  {addonOptions.map((addon) => {
                    const isActive = addons.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`group flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-white/10 border border-white/30'
                            : 'bg-white/[0.03] border border-white/10 hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {/* Compact Toggle */}
                          <div className={`relative w-10 h-5 rounded-full transition-all duration-200 ${
                            isActive ? 'bg-white' : 'bg-white/20'
                          }`}>
                            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-black transition-all duration-200 ${
                              isActive ? 'left-5' : 'left-0.5'
                            }`} />
                          </div>
                          <span className={`text-xs font-medium ${isActive ? 'text-white' : 'text-white/60'}`}>
                            {addon.label}
                          </span>
                        </div>
                        <span className={`text-[10px] ${isActive ? 'text-white/50' : 'text-white/30'}`}>
                          {addon.cost}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-6 border-t border-white/10 text-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(255,255,255,0.2)]"
                >
                  Get My Exact Quote
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// BEFORE / AFTER COMPARISON SLIDER COMPONENT
// ============================================
function ComparisonSlider({ before, after, title }: { before: string; after: string; title: string }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <div className="group">
      <div 
        ref={containerRef}
        className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {/* After Image (Full) */}
        <div className="absolute inset-0">
          <img 
            src={after} 
            alt="After" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-black">
            After
          </div>
        </div>

        {/* Before Image (Clipped) */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img 
            src={before} 
            alt="Before" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/80 backdrop-blur-sm rounded-full text-xs font-bold text-white">
            Before
          </div>
        </div>

        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          {/* Handle Circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-transform duration-200 hover:scale-110">
            <MoveHorizontal className="w-5 h-5 text-black" />
          </div>
        </div>
      </div>
      <p className="text-base text-white/70 text-center mt-5 font-medium">{title}</p>
    </div>
  );
}

// ============================================
// BEFORE / AFTER SECTION - SHOWSTOPPER
// ============================================
function BeforeAfterSection() {
  const transformations = [
    { before: '/images/before-floor.jpg', after: '/images/after-floor.jpg', title: 'Garage Transformation' },
    { before: '/images/gallery-3.jpg', after: '/images/gallery-1.jpg', title: 'Residential Floor' },
    { before: '/images/gallery-5.jpg', after: '/images/gallery-4.jpg', title: 'Commercial Space' },
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#0a0a0a]">
      <div className="w-full px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-white/40 uppercase tracking-[0.2em] mb-4 block">
            Transformations
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5">
            See the <span className="metallic-text">Difference</span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto text-lg">
            Drag to compare before and after. Real results from real projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {transformations.map((item, index) => (
            <ComparisonSlider 
              key={index}
              before={item.before}
              after={item.after}
              title={item.title}
            />
          ))}
        </div>

        <div className="text-center mt-16">
          <Link 
            to="/gallery" 
            className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_50px_rgba(255,255,255,0.2)]"
          >
            View Full Gallery
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================
// SERVICES SECTION
// ============================================
function ServicesSection() {
  const services = [
    { title: 'Garage Epoxy', desc: 'Durable, chemical-resistant flooring for your garage.', image: '/images/garage-metallic.jpg', href: '/garage-epoxy-yakima-wa' },
    { title: 'Metallic Epoxy', desc: 'Stunning 3D effects and mirror-like finishes.', image: '/images/metallic-navy.jpg', href: '/metallic-epoxy-yakima-wa' },
    { title: 'Flake Systems', desc: 'Decorative chip system with slip resistance.', image: '/images/flake-epoxy.jpg', href: '/flake-epoxy-yakima-wa' },
    { title: 'Commercial Coatings', desc: 'Heavy-duty solutions for business spaces.', image: '/images/commercial-epoxy.jpg', href: '/commercial-epoxy-yakima-wa' },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#0a0a0a]">
      <div className="w-full px-6 lg:px-12">
        <div className="text-center mb-14">
          <span className="text-sm font-medium text-white/50 uppercase tracking-wider mb-4 block">Our Services</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Premium Epoxy <span className="metallic-text">Solutions</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <Link key={index} to={service.href} className="group relative overflow-hidden rounded-xl bg-[#141414] border border-white/5 hover:border-white/10 transition-all">
              <div className="aspect-[16/9] overflow-hidden">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-lg font-semibold mb-1">{service.title}</h3>
                <p className="text-white/60 text-sm mb-2">{service.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                  Learn More <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// WHY CHOOSE US SECTION
// ============================================
function WhyChooseSection() {
  const features = [
    { icon: Shield, title: 'Professional Surface Prep', desc: 'Thorough preparation ensures flawless adhesion and lasting results.' },
    { icon: Award, title: 'Long-Lasting Systems', desc: 'Industrial-grade materials built to withstand years of use.' },
    { icon: Star, title: 'Custom Finishes', desc: 'Unlimited color options and decorative styles to match your vision.' },
    { icon: Clock, title: 'Local Yakima Expertise', desc: 'Serving the Yakima Valley with fast response times.' },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#0f0f0f]">
      <div className="w-full px-6 lg:px-12">
        <div className="text-center mb-14">
          <span className="text-sm font-medium text-white/50 uppercase tracking-wider mb-4 block">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            The Drippin <span className="metallic-text">Difference</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-xl bg-[#141414] border border-white/5">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5 text-white/60" />
              </div>
              <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
              <p className="text-white/50 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// PROCESS SECTION
// ============================================
function ProcessSection() {
  const steps = [
    { step: '01', title: 'Prep', desc: 'Clean, repair, and prep your floor for optimal adhesion.' },
    { step: '02', title: 'Install', desc: 'Expert application of your chosen epoxy finish.' },
    { step: '03', title: 'Finish', desc: 'Your new floor is ready to use and enjoy for years.' },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#0a0a0a]">
      <div className="w-full px-6 lg:px-12">
        <div className="text-center mb-14">
          <span className="text-sm font-medium text-white/50 uppercase tracking-wider mb-4 block">Our Process</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Simple <span className="metallic-text">3-Step</span> Process
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {steps.map((item, index) => (
            <div key={index} className="text-center p-6 rounded-xl bg-[#141414] border border-white/5">
              <span className="text-4xl font-bold text-white/10 mb-4 block">{item.step}</span>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-white/50 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// TESTIMONIALS SECTION
// ============================================
function TestimonialsSection() {
  const testimonials = [
    { name: 'Michael R.', location: 'Yakima, WA', quote: 'Drippin Epoxy transformed our garage into something incredible. The metallic finish looks amazing!', rating: 5 },
    { name: 'Sarah T.', location: 'Selah, WA', quote: 'Professional from start to finish. The team was punctual, clean, and the results exceeded expectations.', rating: 5 },
    { name: 'David K.', location: 'Union Gap, WA', quote: 'We used them for our auto shop and could not be happier. The floor handles heavy traffic perfectly.', rating: 5 },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#0f0f0f]">
      <div className="w-full px-6 lg:px-12">
        <div className="text-center mb-14">
          <span className="text-sm font-medium text-white/50 uppercase tracking-wider mb-4 block">Testimonials</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            What Our <span className="metallic-text">Clients Say</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {testimonials.map((t, index) => (
            <div key={index} className="p-6 rounded-xl bg-[#141414] border border-white/5">
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-white/70 text-white/70" />)}
              </div>
              <p className="text-white/70 mb-5 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="font-medium text-sm">{t.name}</p>
                <p className="text-xs text-white/40">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// SERVICE AREAS SECTION
// ============================================
function ServiceAreasSection() {
  const serviceAreas = [
    'Yakima',
    'Selah',
    'Union Gap',
    'West Valley',
    'East Valley',
    'Terrace Heights',
    'Moxee',
    'Wapato',
    'Toppenish',
    'Zillah',
    'Sunnyside',
    'Grandview',
    'Prosser',
    'Ellensburg',
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#0a0a0a]">
      <div className="w-full px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div>
              <span className="text-sm font-medium text-white/50 uppercase tracking-wider mb-4 block">
                Service Areas
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5">
                Serving <span className="metallic-text">Yakima Valley</span>
              </h2>
              <p className="text-white/60 mb-8 leading-relaxed">
                Drippin Epoxy proudly serves residential and commercial clients 
                throughout the Yakima Valley and surrounding communities. 
                We bring premium epoxy flooring solutions to your doorstep.
              </p>
              
              {/* Areas Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                {serviceAreas.map((area, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-2 text-sm text-white/60"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                    {area}
                  </div>
                ))}
              </div>

              <Link 
                to="/service-areas" 
                className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                View All Service Areas
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Map */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-[#141414]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d172406.44584937238!2d-120.706655!3d46.602071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5499a9b3b1b8e6f1%3A0x2a9c4c6e8e5d5f5a!2sYakima%2C%20WA!5e0!3m2!1sen!2sus!4v1609459200000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Drippin Epoxy Service Area - Yakima Valley"
                />
              </div>
              {/* Map Overlay Card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0a0a0a]/90 backdrop-blur-md border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white/60" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Drippin Epoxy</p>
                    <p className="text-xs text-white/50">Yakima, WA 98901</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// FINANCING SECTION
// ============================================
function FinancingSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#0a0a0a]">
      <div className="w-full px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <CreditCard className="w-4 h-4 text-white/60" />
            <span className="text-sm text-white/60">Financing Available</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Flexible <span className="metallic-text">Payment Options</span>
          </h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto">
            Financing available for qualifying services. Ask about flexible payment options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold">
              <Zap className="w-4 h-4" />
              Get Pre-Qualified
            </Link>
            <a href="tel:+15095551234" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all">
              <Phone className="w-4 h-4" />
              Call to Discuss
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// FINAL CTA SECTION
// ============================================
function FinalCTASection() {
  return (
    <section className="py-24 lg:py-32 bg-[#0f0f0f]">
      <div className="w-full px-6 lg:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5">
            Get Your Epoxy Project <br />
            <span className="metallic-text">Started Today</span>
          </h2>
          <p className="text-white/60 text-lg mb-8">
            Transform your space with premium epoxy flooring. Get your free quote now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#calculator" className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-lg font-semibold">
              Get Instant Quote
              <ArrowRight className="w-5 h-5" />
            </a>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// MAIN HOMEPAGE
// ============================================
export function HomePage() {
  return (
    <>
      <HeroSection />
      <PremiumCalculatorSection />
      <BeforeAfterSection />
      <ServicesSection />
      <WhyChooseSection />
      <ProcessSection />
      <TestimonialsSection />
      <ServiceAreasSection />
      <FinancingSection />
      <FinalCTASection />
    </>
  );
}
