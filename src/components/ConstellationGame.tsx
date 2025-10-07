import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";

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
      setTimeout(() => onComplete(), 1500);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Level 2: Connect Our Stars</h2>
        <p className="text-muted-foreground">Tap the stars in order to form the constellation of our love</p>
      </div>

      <Card className="relative w-full max-w-2xl mx-auto aspect-square bg-gradient-to-br from-background to-card overflow-hidden">
        {/* Twinkling background stars */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-foreground/30 rounded-full animate-pulse"
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

        {/* Interactive stars */}
        {starStates.map((star) => (
          <button
            key={star.id}
            onClick={() => handleStarClick(star.id)}
            disabled={star.connected}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
              star.connected ? 'scale-125' : 'hover:scale-110'
            }`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
            }}
          >
            <div className={`relative ${star.connected ? 'animate-pulse' : ''}`}>
              <div className={`w-8 h-8 rounded-full ${
                star.connected 
                  ? 'bg-accent shadow-[0_0_20px_hsl(var(--accent))]' 
                  : 'bg-primary/50 shadow-[0_0_10px_hsl(var(--primary))]'
              }`} />
              <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-foreground/80 whitespace-nowrap">
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
                className="absolute text-2xl animate-slide-up"
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
    </div>
  );
};
