import { useState } from "react";
import { MemoryMatchGame } from "./MemoryMatchGame";
import { ConstellationGame } from "./ConstellationGame";
import { WordUnscrambleGame } from "./WordUnscrambleGame";

interface UnlockGamesProps {
  onComplete: () => void;
}

export const UnlockGames = ({ onComplete }: UnlockGamesProps) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleLevelComplete = () => {
    if (currentLevel < 3) {
      setCurrentLevel(currentLevel + 1);
    } else {
      setShowConfetti(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  const progress = (currentLevel / 3) * 100;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-background/95 backdrop-blur-sm overflow-y-auto py-8">
      <div className="container mx-auto px-4">
        {/* Progress bar as growing vine */}
        <div className="mb-8">
          <div className="relative h-2 bg-muted rounded-full overflow-hidden max-w-md mx-auto">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-2">
            Level {currentLevel} of 3
          </p>
        </div>

        {/* Current game */}
        <div className="animate-fade-in">
          {currentLevel === 1 && <MemoryMatchGame onComplete={handleLevelComplete} />}
          {currentLevel === 2 && <ConstellationGame onComplete={handleLevelComplete} />}
          {currentLevel === 3 && <WordUnscrambleGame onComplete={handleLevelComplete} />}
        </div>

        {/* Confetti burst on completion */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute text-2xl animate-ping"
                style={{
                  left: `${50 + (Math.random() - 0.5) * 50}%`,
                  top: `${50 + (Math.random() - 0.5) * 50}%`,
                  animationDelay: `${i * 0.02}s`,
                  animationDuration: '1s',
                }}
              >
                {i % 3 === 0 ? '🎉' : i % 3 === 1 ? '💖' : '✨'}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
