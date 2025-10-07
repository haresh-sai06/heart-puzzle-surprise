import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import schoolNotebook from "@/assets/school-notebook.jpg";
import umbrellaRain from "@/assets/umbrella-rain.jpg";
import promiseRing from "@/assets/promise-ring.jpg";
import weddingBands from "@/assets/wedding-bands.jpg";
import roseDecoration from "@/assets/rose-decoration.png";

interface PuzzlePiece {
  id: number;
  image: string;
  title: string;
  rotation: number;
  correctPosition: number;
  currentPosition: number;
}

interface PuzzleLockProps {
  onUnlock: () => void;
}

export const PuzzleLock = ({ onUnlock }: PuzzleLockProps) => {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([
    { id: 1, image: schoolNotebook, title: "10th Standard", rotation: 45, correctPosition: 0, currentPosition: 0 },
    { id: 2, image: umbrellaRain, title: "First Kiss", rotation: -30, correctPosition: 1, currentPosition: 1 },
    { id: 3, image: promiseRing, title: "Promise", rotation: 60, correctPosition: 2, currentPosition: 2 },
    { id: 4, image: weddingBands, title: "Forever", rotation: -45, correctPosition: 3, currentPosition: 3 },
  ]);
  
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [showParticles, setShowParticles] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handlePieceClick = (pieceId: number) => {
    if (isUnlocked) return;
    
    setPieces(prev => prev.map(piece => {
      if (piece.id === pieceId) {
        const newRotation = piece.rotation + 45;
        const isCorrect = newRotation % 360 === 0;
        return { ...piece, rotation: newRotation };
      }
      return piece;
    }));
  };

  const checkIfSolved = () => {
    const allCorrect = pieces.every(piece => piece.rotation % 360 === 0);
    if (allCorrect && !isUnlocked) {
      setShowParticles(true);
      setIsUnlocked(true);
      setTimeout(() => {
        onUnlock();
      }, 2000);
    }
  };

  useEffect(() => {
    checkIfSolved();
  }, [pieces]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-accent rounded-full sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Rose decorations */}
      <img 
        src={roseDecoration} 
        alt="" 
        className="absolute top-10 left-10 w-20 h-20 floating opacity-60"
      />
      <img 
        src={roseDecoration} 
        alt="" 
        className="absolute bottom-10 right-10 w-24 h-24 floating opacity-60"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 text-center space-y-12 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Unlock Our Story
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Happy Birthday & 4th Anniversary, My Love
          </p>
          <p className="text-lg text-muted-foreground">
            Click the puzzle pieces to rotate them until they form our heart
          </p>
        </div>

        {/* Heart-shaped puzzle container */}
        <div className="relative w-80 h-80 mx-auto">
          <div 
            className={`absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl transition-all duration-1000 ${
              isUnlocked ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
            }`}
          />
          
          <div className={`relative w-full h-full transition-all duration-1000 ${
            isUnlocked ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
          }`}>
            {/* Heart shape composed of puzzle pieces */}
            <div className="absolute inset-0 grid grid-cols-2 gap-4 p-8">
              {pieces.map((piece, index) => (
                <button
                  key={piece.id}
                  onClick={() => handlePieceClick(piece.id)}
                  className={`relative group cursor-pointer rounded-2xl overflow-hidden romantic-glow transition-all duration-500 ${
                    piece.rotation % 360 === 0 ? 'ring-4 ring-accent' : ''
                  }`}
                  style={{
                    transform: `rotate(${piece.rotation}deg)`,
                  }}
                >
                  <img 
                    src={piece.image} 
                    alt={piece.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end justify-center p-4">
                    <span className="text-sm font-semibold text-foreground">
                      {piece.title}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Particle explosion effect */}
          {showParticles && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 rounded-full animate-ping"
                  style={{
                    left: "50%",
                    top: "50%",
                    background: i % 2 === 0 ? "var(--gradient-rose)" : "var(--gradient-gold)",
                    animationDelay: `${i * 0.05}s`,
                    animationDuration: "1s",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {isUnlocked && (
          <div className="animate-slide-up">
            <p className="text-2xl text-primary font-bold mb-4">
              🎉 Love Unlocked! 🎉
            </p>
            <p className="text-muted-foreground">
              Revealing our beautiful journey together...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
