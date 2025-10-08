import { useEffect, useState } from "react";
import starryNightBg from "@/assets/starry-night-bg.jpg";

export const StarryBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 15 - 7.5,
        y: (e.clientY / window.innerHeight) * 15 - 7.5,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTime((prev) => prev + 1), 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Layered starry background with subtle parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-2000 ease-out"
        style={{
          backgroundImage: `url(${starryNightBg})`,
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) scale(1.05)`,
          filter: `brightness(1.1) contrast(1.05) saturate(1.2)`,
        }}
      />

      {/* Dynamic aurora gradient overlay with wave animation */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(255, 105, 180, 0.6) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(138, 43, 226, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255, 215, 0, 0.3) 0%, transparent 50%)
          `,
          animation: `aurora-wave ${20 + Math.sin(time / 10) * 5}s linear infinite`,
        }}
      />

      {/* Enhanced floating fireflies with trails and twinkle */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-accent to-secondary rounded-full firefly-glow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              boxShadow: `0 0 ${10 + Math.random() * 10}px rgba(255, 215, 0, 0.6)`,
            }}
          >
            {/* Trail effect */}
            <div className="absolute inset-0 w-full h-full bg-accent/30 rounded-full animate-twinkle-trail opacity-0" />
          </div>
        ))}
      </div>

      {/* Subtle shooting stars */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full shooting-star"
            style={{
              left: `${100 + Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              animationDelay: `${Math.random() * 10 + i * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            {/* Star trail */}
            <div className="absolute top-0 left-0 w-0 h-1 bg-white opacity-70 transform rotate-[-45deg]" style={{ width: '100px' }} />
          </div>
        ))}
      </div>

      {/* Enhanced vignette with soft fade */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/40" />
    </div>
  );
};<style>{`
  @keyframes aurora-wave {
    0% { 
      background-position: 0% 50%; 
      transform: scale(1); 
    }
    50% { 
      background-position: 100% 50%; 
      transform: scale(1.05); 
    }
    100% { 
      background-position: 0% 50%; 
      transform: scale(1); 
    }
  }
  @keyframes firefly-glow {
    0%, 100% { 
      opacity: 0.4; 
      transform: scale(1) translateY(0); 
      box-shadow: 0 0 5px rgba(255, 215, 0, 0.3); 
    }
    50% { 
      opacity: 1; 
      transform: scale(1.2) translateY(-2px); 
      box-shadow: 0 0 20px rgba(255, 215, 0, 0.8); 
    }
  }
  @keyframes twinkle-trail {
    0% { 
      opacity: 0; 
      transform: scale(0.5) translateY(0); 
    }
    50% { 
      opacity: 0.5; 
      transform: scale(1) translateY(-1px); 
    }
    100% { 
      opacity: 0; 
      transform: scale(0.5) translateY(-2px); 
    }
  }
  @keyframes shooting-star {
    0% { 
      opacity: 1; 
      transform: translateX(0) translateY(0); 
    }
    100% { 
      opacity: 0; 
      transform: translateX(-200px) translateY(50px); 
    }
  }
`}</style>