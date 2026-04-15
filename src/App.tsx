import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { GarageEpoxyPage } from './pages/GarageEpoxyPage';
import { MetallicEpoxyPage } from './pages/MetallicEpoxyPage';
import { FlakeEpoxyPage } from './pages/FlakeEpoxyPage';
import { CommercialEpoxyPage } from './pages/CommercialEpoxyPage';
import { GalleryPage } from './pages/GalleryPage';
import { PricingPage } from './pages/PricingPage';
import { AboutPage } from './pages/AboutPage';
import { ServiceAreasPage } from './pages/ServiceAreasPage';
import { ContactPage } from './pages/ContactPage';

// SEO Component
import { SEO } from './components/SEO';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
    
    // Refresh ScrollTrigger after route change
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* SEO */}
      <SEO />

      {/* Header */}
      <Header />

      {/* Main content */}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/garage-epoxy-yakima-wa" element={<GarageEpoxyPage />} />
          <Route path="/metallic-epoxy-yakima-wa" element={<MetallicEpoxyPage />} />
          <Route path="/flake-epoxy-yakima-wa" element={<FlakeEpoxyPage />} />
          <Route path="/commercial-epoxy-yakima-wa" element={<CommercialEpoxyPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/service-areas" element={<ServiceAreasPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
