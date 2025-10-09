import { useState, useEffect } from "react";
import PrismaticBurst from "./ui/PrismaticBlast";

interface HeroSectionProps {
  onScrollPrompt: () => void;
}

export const HeroSection = ({ onScrollPrompt }: HeroSectionProps) => {
  const [revealed, setRevealed] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const texts = ["Happy", "Birthday", "My Love!"];
  const fullText = texts.join(' ');
  const typingSpeed = 75;
  const pauseDuration = 1500;

  // Add your wife's photos here (replace with actual paths)
  const memoryPhotos = [
    "/assets/memories/photo1.jpg",
    "/assets/memories/photo2.jpg",
    "/assets/memories/photo3.jpg",
    "/assets/memories/photo4.jpg",
    "/assets/memories/photo5.jpg",
    "/assets/memories/photo6.jpg",
  ];

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

  useEffect(() => {
    if (charIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else if (charIndex === fullText.length) {
      const pauseTimeout = setTimeout(() => {
        setShowCursor(false);
      }, pauseDuration);
      return () => clearTimeout(pauseTimeout);
    }
  }, [charIndex, fullText, typingSpeed, pauseDuration]);

  const handleReveal = (e: React.MouseEvent) => {
    e.preventDefault();
    setRevealed(true);
    // Simulate ripple effect on click
    const ripple = document.createElement('span');
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255,215,0,0.6) 0%, transparent 70%);
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;
    e.currentTarget.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-3 sm:px-4">
      {/* Prismatic Burst background effect - Mobile optimized */}
      <div className="absolute inset-0 z-0">
        <PrismaticBurst
          animationType="rotate3d"
          intensity={typeof window !== 'undefined' && window.innerWidth < 768 ? 2.5 : 3.5}
          speed={typeof window !== 'undefined' && window.innerWidth < 768 ? 0.5 : 0.7}
          distort={typeof window !== 'undefined' && window.innerWidth < 768 ? 0.7 : 1.0}
          paused={false}
          offset={{ x: 0.5, y: 0.5 }}
          hoverDampness={0.25}
          rayCount={typeof window !== 'undefined' && window.innerWidth < 768 ? 16 : 24}
          mixBlendMode="lighten"
          colors={['#ff007a', '#4d3dff', '#ffffff']}
        />
      </div>

      {/* Floating lanterns - Reduced count on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {[...Array(revealed ? (typeof window !== 'undefined' && window.innerWidth < 768 ? 6 : 12) : 0)].map((_, i) => (
          <div
            key={`lantern-${i}`}
            className="absolute text-2xl sm:text-3xl md:text-4xl animate-lantern-float opacity-90"
            style={{
              left: `${Math.random() * 100}%`,
              top: '100%',
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            <div className="flex flex-col items-center space-y-0.5 sm:space-y-1">
              <span>🏮</span>
              <span className="text-[8px] sm:text-xs font-bold text-gold -mt-1 sm:-mt-2 transform rotate-[-15deg]">{['H', 'A', 'P', 'P', 'Y', ' ', 'B', 'I', 'R', 'T', 'H', 'D', 'A', 'Y', '!'][i % 15] || ''}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-50 text-center space-y-6 sm:space-y-8 md:space-y-12 px-2 sm:px-4 w-full max-w-4xl">
        {/* Main title with typing effect - Mobile responsive */}
        <div className="space-y-2 sm:space-y-3 md:space-y-4 heartbeat-text">
          <h1 
            className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-foreground leading-tight"
            style={{
              fontFamily: "'Great Vibes', cursive",
              color: revealed ? 'gold' : 'white',
              textShadow: revealed ? '0 0 20px rgba(255, 215, 0, 0.8)' : '0 0 10px rgba(255, 255, 255, 0.5)',
            }}
          >
            {displayedText}
            {showCursor && <span className="animate-pulse text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold">|</span>}
          </h1>
          
          {revealed && (
            <div className="animate-fade-in-up px-2">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-accent font-semibold">
                And Our 4th Anniversary Awaits on Oct 14! 🎊
              </p>
            </div>
          )}
        </div>

        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto relative px-2">
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-4 sm:mb-6 text-center">Counting down to your special day...</p>
          <div className="relative hourglass-container">
            {/* Hourglass frame - Mobile responsive */}
            <div className="relative bg-gradient-to-b from-rose-50 via-pink-50 to-rose-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-rose-200/50 backdrop-blur-sm">
              {/* Subtle ornate pattern overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,182,193,0.1)_0%,transparent_70%)] rounded-2xl sm:rounded-3xl" />
              
              {/* Upper bulb - Scaled for mobile */}
              <div className="absolute top-2 sm:top-4 left-1/2 transform -translate-x-1/2 w-16 h-14 sm:w-24 sm:h-20 bg-rose-200/30 rounded-t-full border-t-2 sm:border-t-4 border-rose-300/50 flex items-end justify-center pb-1 sm:pb-2">
                <div className="w-12 h-8 sm:w-16 sm:h-12 bg-gradient-to-b from-rose-100 to-transparent rounded-t-lg" />
              </div>
              
              {/* Narrow neck - Scaled */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-3 h-6 sm:w-4 sm:h-8 bg-gradient-to-b from-rose-300/20 to-pink-300/20 rounded-full shadow-inner" />
              
              {/* Lower bulb - Scaled */}
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-14 sm:w-24 sm:h-20 bg-rose-200/30 rounded-b-full border-b-2 sm:border-b-4 border-rose-300/50 flex items-start justify-center pt-1 sm:pt-2">
                <div className="w-12 h-8 sm:w-16 sm:h-12 bg-gradient-to-t from-rose-100 to-transparent rounded-b-lg" />
              </div>
              
              {/* Time display - Mobile responsive */}
              <div className="text-center space-y-3 sm:space-y-5 z-10 relative">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 bg-clip-text text-transparent mb-3 sm:mb-5 animate-pulse-slow">
                  {`${formatTime(countdown.days)}:${formatTime(countdown.hours)}:${formatTime(countdown.minutes)}:${formatTime(countdown.seconds)}`}
                </div>
                <div className="flex justify-center space-x-3 sm:space-x-4 md:space-x-6 text-[10px] sm:text-xs text-rose-600 font-medium uppercase tracking-wide sm:tracking-widest">
                  <span>Days</span>
                  <span>Hours</span>
                  <span>Minutes</span>
                  <span>Seconds</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wiggling scroll prompt - Mobile responsive */}
        <div className="wiggle-arrow cursor-pointer mt-4 sm:mt-6" onClick={onScrollPrompt}>
          <p className="text-sm sm:text-base md:text-lg text-foreground mb-1 sm:mb-2">Scroll to Our Story</p>
          <div className="text-3xl sm:text-4xl animate-wiggle">⬇️</div>
        </div>
      </div>

      {/* Enhanced confetti fireworks - Reduced on mobile */}
      {revealed && (
        <div className="fixed inset-0 pointer-events-none z-60">
          {[...Array(typeof window !== 'undefined' && window.innerWidth < 768 ? 25 : 50)].map((_, i) => (
            <div
              key={i}
              className="absolute text-lg sm:text-xl md:text-2xl animate-confetti-blast"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50 - 25}%`,
                animationDelay: `${i * 0.03}s`,
                animationDuration: `${1.5 + Math.random()}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            >
              {['🎆', '🎇', '✨', '💫', '🌹'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <style>{`
      @keyframes pulse-slow {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
      }
        @keyframes confetti-blast {
          0% { 
            transform: scale(0) rotate(0deg); 
            opacity: 1; 
          }
          100% { 
            transform: scale(1.2) rotate(1080deg) translateY(-50px); 
            opacity: 0; 
          }
        }
        @keyframes lantern-float {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.9; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ripple {
          to { transform: scale(4); opacity: 0; }
        }
        .parallax-layer { will-change: transform; }
        .heartbeat-text { animation: heartbeat-glow 2s infinite; }
        .wiggle-arrow .animate-wiggle { animation: wiggle 1s ease-in-out infinite; }
        .romantic-glow { box-shadow: 0 0 20px rgba(255, 215, 0, 0.3); }
        @keyframes heartbeat-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(255, 215, 0, 0.5); }
          50% { text-shadow: 0 0 40px rgba(255, 215, 0, 0.8); }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;