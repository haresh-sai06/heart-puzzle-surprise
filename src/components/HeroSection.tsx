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
  const [celebrating, setCelebrating] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const texts = ["Happy", "Birthday", "Pondati🤌🏻💗🦋🧿!"];
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
        setCelebrating(false);
      } else {
        setCelebrating(true);
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        if (!revealed) {
          setRevealed(true);
        }
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [revealed]);

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
    
    // Elegant ripple effect
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      transform: scale(0);
      animation: elegant-ripple 0.8s ease-out;
      pointer-events: none;
    `;
    
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 800);
  };

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-8">
      {/* Elegant background with subtle gradient animation */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-rose-900/15">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/10 to-black/30"></div>
        {/* Subtle floating particles */}
        {revealed && [...Array(15)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Prismatic Burst - more subtle */}
      <div className="absolute inset-0 z-0 opacity-60">
        <PrismaticBurst
          intensity={3}
          speed={0.3}
          distort={0.3}
          paused={false}
          offset={{ x: 0.5, y: 0.5 }}
          hoverDampness={0.1}
          rayCount={12}
          mixBlendMode="soft-light"
          colors={['#ff6b9d', '#4d3dff', '#ffffff']}
        />
      </div>

      {/* Elegant floating elements */}
      {revealed && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          {[...Array(8)].map((_, i) => (
            <div
              key={`float-${i}`}
              className="absolute text-2xl opacity-20 animate-gentle-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${20 + Math.random() * 10}s`,
              }}
            >
              {['✨', '💫', '⭐', '🌙'][i % 4]}
            </div>
          ))}
        </div>
      )}

      <div className="relative z-50 text-center space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16 px-4 sm:px-6 md:px-8 w-full max-w-4xl">
        {/* Main title with elegant reveal */}
        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold cursor-pointer transition-all duration-500"
            style={{
              fontFamily: "'Great Vibes', cursive",
              color: revealed ? '#ffd700' : '#ffffff',
              textShadow: revealed 
                ? '0 0 30px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 215, 0, 0.3)'
                : '0 0 20px rgba(255, 255, 255, 0.4)',
              transform: revealed ? 'scale(1.02)' : 'scale(1)',
            }}
            onClick={handleReveal}
          >
            {displayedText}
            {showCursor && (
              <span className="animate-pulse text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold">|</span>
            )}
          </h1>
          
          {revealed && (
            <div className="animate-slide-up-fade">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gold/90 font-light tracking-wide">
                And Our 4th Anniversary Awaits on Oct 14! 🎊
              </p>
            </div>
          )}
        </div>

        {/* Countdown/Gift Section */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto relative px-4 sm:px-6">
          {!celebrating ? (
            <>
              <p className="text-sm sm:text-base md:text-lg text-white/70 mb-4 sm:mb-6 text-center font-light">
                Counting down to your special day...
              </p>
              
              {/* Elegant countdown cards */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                {[
                  { value: countdown.days, label: 'Days' },
                  { value: countdown.hours, label: 'Hours' },
                  { value: countdown.minutes, label: 'Minutes' },
                  { value: countdown.seconds, label: 'Seconds' }
                ].map((item, index) => (
                  <div key={item.label} className="text-center">
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-2 sm:p-3 md:p-4 border border-white/20 shadow-lg animate-soft-pulse"
                         style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-mono font-bold text-white mb-1">
                        {formatTime(item.value)}
                      </div>
                    </div>
                    <div className="text-xs sm:text-sm md:text-base text-white/60 mt-2 font-medium uppercase tracking-wider">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="animate-scale-in">
              <p className="text-sm sm:text-base md:text-lg text-white/70 mb-4 sm:mb-6 text-center font-light">
                The celebration begins! 🎉
              </p>
              
              <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20 shadow-2xl">
                {/* Elegant gift reveal */}
                <div className="relative mb-4 sm:mb-6">
                  <div className="text-5xl sm:text-6xl md:text-7xl animate-soft-bounce">🎁</div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-2xl sm:text-3xl md:text-4xl animate-gentle-spin">💫</div>
                  </div>
                </div>
                
                <div className="text-center space-y-3 sm:space-y-4">
                  <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
                    Your Gift Awaits! 💝
                  </div>
                  <div className="flex justify-center space-x-2 sm:space-x-3 text-lg sm:text-xl md:text-2xl">
                    {['🎂', '🌹', '✨', '🥂'].map((emoji, i) => (
                      <span key={i} className="animate-float" style={{ animationDelay: `${i * 0.3}s` }}>
                        {emoji}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Elegant scroll prompt */}
        <div className="animate-soft-bounce cursor-pointer mt-6 sm:mt-8 md:mt-10" onClick={onScrollPrompt}>
          <div className="text-white/60 text-xs sm:text-sm md:text-base font-light mb-2 tracking-wider">
            Discover Our Story
          </div>
          <div className="text-white/40 text-xl sm:text-2xl md:text-3xl animate-gentle-pulse">↓</div>
        </div>
      </div>

      {/* Subtle celebration effects */}
      {celebrating && (
        <div className="fixed inset-0 pointer-events-none z-60">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-lg sm:text-xl animate-gentle-drift"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              {['✨', '💫', '⭐'][i % 3]}
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes elegant-ripple {
          to {
            transform: scale(2.5);
            opacity: 0;
          }
        }
        
        @keyframes gentle-float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-20px) rotate(5deg); 
          }
        }
        
        @keyframes float-particle {
          0%, 100% { 
            transform: translateY(0px) translateX(0px); 
            opacity: 0.3;
          }
          25% { 
            transform: translateY(-40px) translateX(10px); 
            opacity: 0.6;
          }
          50% { 
            transform: translateY(-80px) translateX(-5px); 
            opacity: 0.3;
          }
          75% { 
            transform: translateY(-40px) translateX(-10px); 
            opacity: 0.6;
          }
        }
        
        @keyframes soft-pulse {
          0%, 100% { 
            transform: scale(1); 
            box-shadow: 0 4px 20px rgba(255,255,255,0.1);
          }
          50% { 
            transform: scale(1.02); 
            box-shadow: 0 6px 25px rgba(255,255,255,0.15);
          }
        }
        
        @keyframes gentle-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        
        @keyframes soft-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes gentle-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes scale-in {
          from { 
            transform: scale(0.9); 
            opacity: 0; 
          }
          to { 
            transform: scale(1); 
            opacity: 1; 
          }
        }
        
        @keyframes slide-up-fade {
          from { 
            transform: translateY(20px); 
            opacity: 0; 
          }
          to { 
            transform: translateY(0); 
            opacity: 1; 
          }
        }
        
        @keyframes gentle-drift {
          0% { 
            transform: translateY(100vh) rotate(0deg); 
            opacity: 0; 
          }
          10% { 
            opacity: 0.7; 
          }
          90% { 
            opacity: 0.7; 
          }
          100% { 
            transform: translateY(-100px) rotate(180deg); 
            opacity: 0; 
          }
        }
        
        .animate-soft-pulse { animation: soft-pulse 2s ease-in-out infinite; }
        .animate-gentle-pulse { animation: gentle-pulse 2s ease-in-out infinite; }
        .animate-soft-bounce { animation: soft-bounce 2s ease-in-out infinite; }
        .animate-gentle-spin { animation: gentle-spin 8s linear infinite; }
        .animate-scale-in { animation: scale-in 0.6s ease-out; }
        .animate-slide-up-fade { animation: slide-up-fade 0.8s ease-out; }
        .animate-gentle-float { animation: gentle-float 6s ease-in-out infinite; }
        .animate-float-particle { animation: float-particle linear infinite; }
        .animate-gentle-drift { animation: gentle-drift linear; }
        .animate-float { animation: gentle-float 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default HeroSection;