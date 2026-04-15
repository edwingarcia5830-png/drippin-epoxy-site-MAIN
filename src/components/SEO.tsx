import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

const defaultSEO = {
  title: 'Drippin Epoxy | Premium Epoxy Flooring in Yakima, WA',
  description: 'Luxury epoxy flooring solutions in Yakima, Washington. Custom metallic, flake & high-gloss epoxy floors for residential and commercial spaces. Get your free quote today!',
  keywords: 'epoxy flooring Yakima WA, garage epoxy floors, metallic epoxy, flake epoxy, commercial epoxy, concrete coatings, Drippin Epoxy',
  ogImage: '/images/garage-metallic.jpg',
};

const pageSEO: Record<string, SEOProps> = {
  '/': defaultSEO,
  '/services': {
    title: 'Our Services | Drippin Epoxy - Yakima, WA',
    description: 'Explore our premium epoxy flooring services: garage epoxy, metallic finishes, flake systems, and commercial coatings. Professional installation in Yakima, WA.',
    keywords: 'epoxy flooring services, garage floor coating, metallic epoxy, flake epoxy systems, commercial epoxy Yakima',
  },
  '/garage-epoxy-yakima-wa': {
    title: 'Garage Epoxy Flooring | Drippin Epoxy - Yakima, WA',
    description: 'Transform your garage with premium epoxy flooring. Durable, chemical-resistant, and stunning finishes. Serving Yakima and surrounding areas.',
    keywords: 'garage epoxy flooring Yakima, garage floor coating, epoxy garage floors, residential epoxy Yakima WA',
  },
  '/metallic-epoxy-yakima-wa': {
    title: 'Metallic Epoxy Floors | Drippin Epoxy - Yakima, WA',
    description: 'Luxury metallic epoxy floors with stunning 3D effects and mirror-like finishes. Custom designs for homes and businesses in Yakima, WA.',
    keywords: 'metallic epoxy Yakima, 3D epoxy floors, decorative epoxy, luxury floor coatings, metallic floor finish',
  },
  '/flake-epoxy-yakima-wa': {
    title: 'Flake Epoxy Systems | Drippin Epoxy - Yakima, WA',
    description: 'Decorative flake epoxy flooring with slip-resistant properties. Perfect for garages, basements, and commercial spaces in Yakima, WA.',
    keywords: 'flake epoxy Yakima, decorative flake flooring, chip epoxy floors, garage flake coating',
  },
  '/commercial-epoxy-yakima-wa': {
    title: 'Commercial Epoxy Flooring | Drippin Epoxy - Yakima, WA',
    description: 'Heavy-duty commercial epoxy flooring for warehouses, retail, and industrial spaces. Durable, easy to maintain, and professionally installed.',
    keywords: 'commercial epoxy flooring Yakima, industrial floor coating, warehouse epoxy, retail flooring',
  },
  '/gallery': {
    title: 'Our Work | Drippin Epoxy Gallery - Yakima, WA',
    description: 'View our portfolio of stunning epoxy floor transformations. Before & after photos of garage, metallic, flake, and commercial epoxy projects.',
    keywords: 'epoxy flooring gallery, before after epoxy floors, epoxy floor photos, Yakima epoxy projects',
  },
  '/pricing': {
    title: 'Pricing & Calculator | Drippin Epoxy - Yakima, WA',
    description: 'Get an instant estimate for your epoxy flooring project. Use our pricing calculator or contact us for a free quote in Yakima, WA.',
    keywords: 'epoxy flooring cost Yakima, epoxy floor pricing, garage floor coating price, epoxy calculator',
  },
  '/about': {
    title: 'About Us | Drippin Epoxy - Yakima, WA',
    description: 'Learn about Drippin Epoxy, Yakima\'s premier epoxy flooring company. Quality craftsmanship, premium materials, and exceptional service.',
    keywords: 'about Drippin Epoxy, epoxy flooring company Yakima, floor coating contractors, epoxy experts',
  },
  '/service-areas': {
    title: 'Service Areas | Drippin Epoxy - Yakima, WA',
    description: 'We serve Yakima and surrounding areas with premium epoxy flooring services. Find out if we cover your location.',
    keywords: 'epoxy flooring Yakima WA, epoxy services Selah, floor coating Union Gap, epoxy contractors Toppenish',
  },
  '/contact': {
    title: 'Contact Us | Drippin Epoxy - Yakima, WA',
    description: 'Get in touch with Drippin Epoxy for a free quote. Call, email, or fill out our contact form. Serving Yakima and surrounding areas.',
    keywords: 'contact Drippin Epoxy, epoxy flooring quote Yakima, free estimate epoxy floors, epoxy contractors contact',
  },
};

export function SEO({ title, description, keywords, ogImage }: SEOProps = {}) {
  const location = useLocation();
  const currentPageSEO = pageSEO[location.pathname] || defaultSEO;

  const finalTitle = title || currentPageSEO.title || defaultSEO.title;
  const finalDescription = description || currentPageSEO.description || defaultSEO.description;
  const finalKeywords = keywords || currentPageSEO.keywords || defaultSEO.keywords;
  const finalOgImage = ogImage || currentPageSEO.ogImage || defaultSEO.ogImage;

  useEffect(() => {
    // Update document title
    document.title = finalTitle;

    // Update meta tags
    const metaTags = {
      'description': finalDescription,
      'keywords': finalKeywords,
      'og:title': finalTitle,
      'og:description': finalDescription,
      'og:image': finalOgImage,
      'og:url': `https://drippinepoxy.com${location.pathname}`,
      'og:type': 'website',
      'twitter:card': 'summary_large_image',
      'twitter:title': finalTitle,
      'twitter:description': finalDescription,
      'twitter:image': finalOgImage,
    };

    Object.entries(metaTags).forEach(([name, content]) => {
      let meta = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        if (name.startsWith('og:') || name.startsWith('twitter:')) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://drippinepoxy.com${location.pathname}`);
  }, [finalTitle, finalDescription, finalKeywords, finalOgImage, location.pathname]);

  return null;
}

// LocalBusiness Schema Component
export function LocalBusinessSchema() {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Drippin Epoxy',
      description: 'Premium epoxy flooring solutions in Yakima, Washington. Custom metallic, flake & high-gloss epoxy floors.',
      url: 'https://drippinepoxy.com',
      telephone: '+1-509-555-1234',
      email: 'info@drippinepoxy.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Yakima',
        addressRegion: 'WA',
        postalCode: '98901',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 46.6021,
        longitude: -120.5059,
      },
      areaServed: {
        '@type': 'City',
        name: 'Yakima',
      },
      serviceType: [
        'Garage Epoxy Flooring',
        'Metallic Epoxy Flooring',
        'Flake Epoxy Systems',
        'Commercial Epoxy Flooring',
      ],
      priceRange: '$$$',
      openingHours: 'Mo-Fr 08:00-18:00',
      image: 'https://drippinepoxy.com/images/logo.png',
    };

    let script = document.getElementById('local-business-schema');
    if (!script) {
      script = document.createElement('script');
      script.id = 'local-business-schema';
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);

    return () => {
      const existingScript = document.getElementById('local-business-schema');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null;
}
