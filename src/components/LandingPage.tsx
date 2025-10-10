import { useEffect, useState } from "react";
import lakesideSunset from "@/assets/our-pics/image8.jpeg";

interface LandingPageProps {
  onReady: () => void;
}

export const LandingPage = ({ onReady }: LandingPageProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    // Auto-transition after zoom animation
    const timer = setTimeout(() => {
      onReady();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onReady]);

  return (
    <div className="fixed inset-0 z-50">
      {/* Background image with zoom animation - Mobile optimized */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-transform duration-[3000ms] ease-out ${
          loaded ? 'scale-110' : 'scale-100'
        }`}
        style={{ 
          backgroundImage: `url(${lakesideSunset})`,
        }}
      />
      
      {/* Gradient overlay - Mobile optimized */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(255, 218, 185, 0.7) 0%, rgba(221, 160, 221, 0.7) 100%)'
        }}
      />

      {/* Firefly sparkles - Reduced count on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(typeof window !== 'undefined' && window.innerWidth < 768 ? 8 : 15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 bg-accent rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>
    </div>
  );
};
