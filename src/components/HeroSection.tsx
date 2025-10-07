import { useState, useEffect } from "react";
import goldenHeart from "@/assets/golden-heart-locket.png";

interface HeroSectionProps {
  onScrollPrompt: () => void;
}

export const HeroSection = ({ onScrollPrompt }: HeroSectionProps) => {
  const [heartClicked, setHeartClicked] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2025-10-11T00:00:00').getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleHeartClick = () => {
    setHeartClicked(true);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient background with parallax */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#191970] via-[#FF69B4] to-[#FFC0CB]"
        style={{
          backgroundSize: '100% 200%',
          animation: 'gradient-shift 15s ease infinite',
        }}
      />

      {/* Floating lanterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-6xl animate-float opacity-80"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${6 + i}s`,
            }}
          >
            🏮
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center space-y-12 px-4">
        {/* Golden heart emblem */}
        <div className="flex justify-center">
          <button
            onClick={handleHeartClick}
            className="relative group cursor-pointer transition-transform hover:scale-110"
          >
            <img 
              src={goldenHeart} 
              alt="Golden Heart"
              className={`w-64 h-64 object-contain ${
                heartClicked ? 'animate-ping' : 'animate-pulse'
              }`}
              style={{
                filter: 'drop-shadow(0 0 40px rgba(255, 215, 0, 0.8))',
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`transition-all duration-1000 ${
                heartClicked ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}>
                <div className="text-2xl font-bold text-foreground animate-bounce">
                  💖
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Main title with sparkle trail */}
        <div className="space-y-4">
          <h1 
            className="text-6xl md:text-8xl font-bold text-foreground"
            style={{
              fontFamily: "'Great Vibes', cursive",
              textShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
            }}
          >
            <span className="inline-block hover:scale-110 transition-transform cursor-pointer">
              HAPPY
            </span>{' '}
            <span className="inline-block hover:scale-110 transition-transform cursor-pointer">
              BIRTHDAY!
            </span>
          </h1>
          
          {heartClicked && (
            <div className="animate-fade-in">
              <p className="text-3xl text-accent font-semibold">
                And Our 4th Anniversary Awaits on Oct 14! 🎊
              </p>
            </div>
          )}
        </div>

        {/* Countdown timer as ornate hourglass */}
        <div className="max-w-2xl mx-auto">
          <p className="text-xl text-muted-foreground mb-4">Counting down to your special day...</p>
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Days', value: countdown.days },
              { label: 'Hours', value: countdown.hours },
              { label: 'Minutes', value: countdown.minutes },
              { label: 'Seconds', value: countdown.seconds },
            ].map((item) => (
              <div 
                key={item.label}
                className="relative bg-card/50 backdrop-blur-sm rounded-2xl p-6 romantic-glow"
              >
                <div className="text-5xl font-bold text-accent mb-2 animate-pulse">
                  {item.value.toString().padStart(2, '0')}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                  {item.label}
                </div>
                {/* Rose petal falling effect */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-xl animate-slide-up opacity-50">
                  🌹
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll prompt */}
        <div className="animate-bounce cursor-pointer" onClick={onScrollPrompt}>
          <p className="text-lg text-foreground mb-2">Scroll to Our Story</p>
          <div className="text-4xl">⬇️</div>
        </div>
      </div>

      {/* Confetti fireworks on heart click */}
      {heartClicked && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute text-3xl animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.05}s`,
                animationDuration: '1.5s',
              }}
            >
              {i % 4 === 0 ? '🎆' : i % 4 === 1 ? '🎇' : i % 4 === 2 ? '✨' : '💫'}
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 0% 100%; }
        }
      `}</style>
    </div>
  );
};
