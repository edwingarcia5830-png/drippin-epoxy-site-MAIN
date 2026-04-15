import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ZoomIn } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { src: '/images/garage-metallic.jpg', title: 'Luxury Garage', category: 'Metallic', location: 'Yakima, WA' },
  { src: '/images/flake-epoxy.jpg', title: 'Modern Garage', category: 'Flake', location: 'Selah, WA' },
  { src: '/images/metallic-navy.jpg', title: 'Showroom Floor', category: 'Metallic', location: 'Union Gap, WA' },
  { src: '/images/commercial-epoxy.jpg', title: 'Warehouse', category: 'Commercial', location: 'Yakima, WA' },
  { src: '/images/gallery-1.jpg', title: 'Luxury Auto Garage', category: 'Metallic', location: 'Yakima, WA' },
  { src: '/images/gallery-2.jpg', title: 'Retail Showroom', category: 'Commercial', location: 'Sunnyside, WA' },
  { src: '/images/gallery-3.jpg', title: 'Home Basement', category: 'Flake', location: 'Grandview, WA' },
  { src: '/images/gallery-4.jpg', title: 'Auto Workshop', category: 'Metallic', location: 'Toppenish, WA' },
  { src: '/images/gallery-5.jpg', title: 'Floor Detail', category: 'Metallic', location: 'Yakima, WA' },
  { src: '/images/gallery-6.jpg', title: 'Outdoor Patio', category: 'Flake', location: 'Zillah, WA' },
  { src: '/images/after-floor.jpg', title: 'Residential Garage', category: 'Flake', location: 'Yakima, WA' },
  { src: '/images/process-1.jpg', title: 'Installation', category: 'Process', location: 'Yakima, WA' },
];

const categories = ['All', 'Metallic', 'Flake', 'Commercial', 'Process'];

export function GalleryPage() {
  const heroRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filteredImages = selectedCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

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

      const items = galleryRef.current?.querySelectorAll('.gallery-item');
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: galleryRef.current,
              start: 'top 70%',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [selectedCategory]);

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="w-full px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="hero-reveal inline-block text-sm font-medium text-white/50 uppercase tracking-wider mb-4">
              Portfolio
            </span>
            <h1 className="hero-reveal text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our <span className="metallic-text">Work</span>
            </h1>
            <p className="hero-reveal text-lg text-white/60 leading-relaxed">
              Browse our collection of stunning epoxy floor transformations. 
              Each project showcases our commitment to quality and craftsmanship.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="pb-8">
        <div className="w-full px-6 lg:px-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-white text-black'
                    : 'glass text-white/70 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section ref={galleryRef} className="py-8 pb-24 lg:pb-32">
        <div className="w-full px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                className="gallery-item group relative overflow-hidden rounded-xl cursor-pointer"
                onClick={() => setLightboxImage(image.src)}
              >
                <div className={`aspect-[4/3] overflow-hidden`}>
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-xs text-white/60 uppercase tracking-wider">{image.category}</span>
                  <h3 className="text-lg font-semibold">{image.title}</h3>
                  <p className="text-sm text-white/50">{image.location}</p>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-24 lg:py-32 bg-[#111]">
        <div className="w-full px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Before & <span className="metallic-text">After</span>
            </h2>
            <p className="text-white/60">See the dramatic transformation epoxy flooring can make</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="relative group">
              <div className="aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src="/images/before-floor.jpg"
                  alt="Before epoxy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-4 left-4 px-4 py-2 bg-black/70 rounded-full text-sm font-medium">
                Before
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src="/images/after-floor.jpg"
                  alt="After epoxy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-4 left-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                After
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={lightboxImage}
            alt="Gallery preview"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
