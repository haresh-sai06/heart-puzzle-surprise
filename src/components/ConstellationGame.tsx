import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import Prism from "./ui/Prism";

interface Star {
  id: number;
  x: number;
  y: number;
  label: string;
  connected: boolean;
}

interface ConstellationGameProps {
  onComplete: () => void;
}

export const ConstellationGame = ({ onComplete }: ConstellationGameProps) => {
  const stars: Star[] = [
    { id: 1, x: 50, y: 20, label: "First Meet", connected: false },
    { id: 2, x: 80, y: 40, label: "Rainy Day", connected: false },
    { id: 3, x: 70, y: 70, label: "College", connected: false },
    { id: 4, x: 30, y: 80, label: "Forever", connected: false },
    { id: 5, x: 20, y: 50, label: "Promise", connected: false },
  ];

  const [starStates, setStarStates] = useState(stars);
  const [connections, setConnections] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const handleStarClick = (starId: number) => {
    if (isComplete) return;

    const newConnections = [...connections, starId];
    setConnections(newConnections);

    const newStars = starStates.map(star =>
      star.id === starId ? { ...star, connected: true } : star
    );
    setStarStates(newStars);

    if (newConnections.length === stars.length) {
      setIsComplete(true);
      // Rain rose petals effect
      setTimeout(() => onComplete(), 3000); // Auto proceed after 3s
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  if (isComplete) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center space-y-4 sm:space-y-6 p-3 sm:p-4">
        {/* Prism background - Mobile optimized */}
        <div className="absolute inset-0 z-0">
          <Prism
            animationType="rotate"
            timeScale={typeof window !== 'undefined' && window.innerWidth < 768 ? 0.8 : 0.6}
            height={3.0}
            baseWidth={5.5}
            scale={typeof window !== 'undefined' && window.innerWidth < 768 ? 3.0 : 4.0}
            hueShift={0}
            colorFrequency={1}
            noise={0.3}
            glow={typeof window !== 'undefined' && window.innerWidth < 768 ? 0.6 : 0.8}
          />
        </div>

        {/* Congratulations Overlay - Mobile responsive */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 bg-white/10 backdrop-blur-md rounded-xl p-6 sm:p-8 border border-white/20 drop-shadow-2xl max-w-sm sm:max-w-md w-full mx-2">
          <div className="text-5xl sm:text-6xl animate-bounce">🎉</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">Congratulations!</h2>
          <p className="text-lg sm:text-xl text-white/90 drop-shadow-md">You connected our stars perfectly! 💫</p>
          <p className="text-base sm:text-lg text-rose-300 italic">One more game to go... Our story awaits!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center space-y-4 sm:space-y-6 p-3 sm:p-4">
      {/* Prism background - Mobile optimized */}
      <div className="absolute inset-0 z-0">
        <Prism
          animationType="rotate"
          timeScale={typeof window !== 'undefined' && window.innerWidth < 768 ? 0.8 : 0.6}
          height={3.0}
          baseWidth={5.5}
          scale={typeof window !== 'undefined' && window.innerWidth < 768 ? 3.0 : 4.0}
          hueShift={0}
          colorFrequency={1}
          noise={0.3}
          glow={typeof window !== 'undefined' && window.innerWidth < 768 ? 0.6 : 0.8}
        />
      </div>

      {/* Header - Mobile responsive */}
      <div className="text-center z-10 relative bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/20 drop-shadow-lg max-w-sm sm:max-w-md mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white drop-shadow-lg">Level 2: Connect Our Stars</h2>
        <p className="text-white/80 drop-shadow-md text-xs sm:text-sm md:text-base">Tap the stars in order to form the constellation of our love</p>
      </div>

      {/* Constellation Card - Mobile optimized with proper sizing */}
      <Card className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto aspect-square bg-gradient-to-br from-background/20 to-card/20 overflow-hidden border border-white/10 backdrop-blur-sm z-10">
        {/* Twinkling background stars - Reduced on mobile for performance */}
        <div className="absolute inset-0">
          {[...Array(typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connections.map((starId, index) => {
            if (index === 0) return null;
            const prevStar = starStates.find(s => s.id === connections[index - 1]);
            const currStar = starStates.find(s => s.id === starId);
            if (!prevStar || !currStar) return null;
            
            return (
              <line
                key={`${prevStar.id}-${currStar.id}`}
                x1={`${prevStar.x}%`}
                y1={`${prevStar.y}%`}
                x2={`${currStar.x}%`}
                y2={`${currStar.y}%`}
                stroke="hsl(var(--accent))"
                strokeWidth="2"
                className="animate-fade-in"
              />
            );
          })}
        </svg>

        {/* Interactive stars - Larger touch targets on mobile */}
        {starStates.map((star) => (
          <button
            key={star.id}
            onClick={() => handleStarClick(star.id)}
            disabled={star.connected}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center ${
              star.connected ? 'scale-125' : 'active:scale-95 sm:hover:scale-110'
            }`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
            }}
          >
            <div className={`relative ${star.connected ? 'animate-pulse' : ''}`}>
              <div className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full ${
                star.connected 
                  ? 'bg-accent shadow-[0_0_15px_hsl(var(--accent))]' 
                  : 'bg-primary/50 shadow-[0_0_8px_hsl(var(--primary))]'
              }`} />
              <span className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 text-[10px] sm:text-xs text-white/90 whitespace-nowrap drop-shadow-md font-medium">
                {star.label}
              </span>
            </div>
          </button>
        ))}

        {/* Rose petals rain effect */}
        {isComplete && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute text-xl animate-slide-up"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10%',
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '2s',
                }}
              >
                🌹
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Skip Button - Mobile optimized */}
      <div className="text-center z-10 relative mt-auto pb-3 sm:pb-4">
        <button
          onClick={handleSkip}
          className="px-6 sm:px-8 py-3 sm:py-4 min-h-[48px] bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-full hover:from-pink-600 hover:to-rose-600 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl transform sm:hover:scale-105 drop-shadow-2xl text-base sm:text-lg"
        >
          Skip 💖
        </button>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; stroke-dashoffset: 100; }
          to { opacity: 1; stroke-dashoffset: 0; }
        }
        @keyframes slide-up {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};