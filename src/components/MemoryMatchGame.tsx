import { useState } from "react";
import { Card } from "@/components/ui/card";
import Prism from "./ui/Prism";
// Replace these import paths with your actual photo paths from your assets folder
import myPhoto1 from "@/assets/memory-card-1.jpg"
import myPhoto2 from "@/assets/memory-card-2.jpg";     // e.g., a birthday memory photo
import myPhoto3 from "@/assets/memory-card-3.jpg"; // e.g., a rainy day promise photo

interface MemoryCard {
  id: number;
  image: string;
  text: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryMatchGameProps {
  onComplete: () => void;
}

export const MemoryMatchGame = ({ onComplete }: MemoryMatchGameProps) => {
  const initialCards: MemoryCard[] = [
    { id: 1, image: myPhoto1, text: "Our First Glance", isFlipped: false, isMatched: false },
    { id: 2, image: myPhoto1, text: "Our First Glance", isFlipped: false, isMatched: false },
    { id: 3, image: myPhoto2, text: "Oct 11 Sparks", isFlipped: false, isMatched: false },
    { id: 4, image: myPhoto2, text: "Oct 11 Sparks", isFlipped: false, isMatched: false },
    { id: 5, image: myPhoto3, text: "Rainy Day Promise", isFlipped: false, isMatched: false },
    { id: 6, image: myPhoto3, text: "Rainy Day Promise", isFlipped: false, isMatched: false },
  ].sort(() => Math.random() - 0.5);

  const [cards, setCards] = useState<MemoryCard[]>(initialCards);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [canFlip, setCanFlip] = useState(true);
  const [gameComplete, setGameComplete] = useState(false);

  const handleCardClick = (index: number) => {
    if (gameComplete || !canFlip || cards[index].isFlipped || cards[index].isMatched || flippedCards.length >= 2) {
      return;
    }

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setCanFlip(false);
      const [first, second] = newFlipped;
      
      if (cards[first].image === cards[second].image) {
        // Match found
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[first].isMatched = true;
          matchedCards[second].isMatched = true;
          setCards(matchedCards);
          setFlippedCards([]);
          setCanFlip(true);

          // Check if all matched
          if (matchedCards.every(card => card.isMatched)) {
            setGameComplete(true);
            setTimeout(() => {
              onComplete();
            }, 3000); // Auto proceed after 3s
          }
        }, 600);
      } else {
        // No match
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[first].isFlipped = false;
          resetCards[second].isFlipped = false;
          setCards(resetCards);
          setFlippedCards([]);
          setCanFlip(true);
        }, 1000);
      }
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  if (gameComplete) {
  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center space-y-6 p-4">
      {/* Prism background - full screen */}
      <div className="absolute inset-0 z-0">
        <Prism
          animationType="rotate"
          timeScale={0.6}
          height={3.0}
          baseWidth={5.5}
          scale={4.0}
          hueShift={0}
          colorFrequency={1}
          noise={0.3}
          glow={0.8}
        />
      </div>

        {/* Congratulations Overlay */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center space-y-6 bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 drop-shadow-2xl max-w-md w-full">
          <div className="text-6xl animate-bounce">🎉</div>
          <h2 className="text-4xl font-bold text-white drop-shadow-lg">Congratulations!</h2>
          <p className="text-xl text-white/90 drop-shadow-md">You unlocked our cherished memories! 💕</p>
          <p className="text-lg text-rose-300 italic">Our story awaits...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center space-y-6 p-4">
      {/* Prism background - full screen */}
      <div className="absolute inset-0 z-0">
        <Prism
          animationType="rotate"
          timeScale={0.6}
          height={3.0}
          baseWidth={5.5}
          scale={4.0}
          hueShift={0}
          colorFrequency={1}
          noise={0.3}
          glow={0.8}
        />
      </div>

      {/* Header - centered, visible over bg */}
      <div className="text-center z-20 relative bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 drop-shadow-lg">
        <h2 className="text-3xl font-bold text-white drop-shadow-lg">Level 1: Memory Match</h2>
        <p className="text-white/80 drop-shadow-md">Find the matching pairs to unlock our memories</p>
      </div>

      {/* Cards Grid - larger, responsive, full interaction */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-3xl mx-auto z-20 relative">
        {cards.map((card, index) => (
          <div key={index} className="flip-card perspective-1000" style={{ perspective: '1000px' }}>
            <Card
              onClick={() => handleCardClick(index)}
              className={`flip-card-inner aspect-square cursor-pointer relative w-full h-full transition-transform duration-500 ease-out hover:scale-105 hover:z-30 ${
                (card.isFlipped || card.isMatched) ? 'flipped' : ''
              } ${card.isMatched ? 'opacity-50 scale-95' : ''}`}
              style={{
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
              }}
            >
              {/* Front Face */}
              <div className="flip-card-front absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/30 to-secondary/30 rounded-lg backdrop-blur-sm border border-white/20">
                <div className="text-4xl drop-shadow-lg">💕</div>
              </div>

              {/* Back Face */}
              <div className="flip-card-back absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary/30 to-secondary/30 rounded-lg backdrop-blur-sm border border-white/20 transform rotate-y-180">
                <img 
                  src={card.image} 
                  alt={card.text}
                  className="w-4/5 h-4/5 object-cover rounded-lg shadow-lg"
                />
                <p className="text-xs text-white font-semibold text-center bg-white/20 px-2 py-1 rounded drop-shadow-md mt-2">{card.text}</p>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Skip Button - bottom centered */}
      <div className="text-center z-20 relative mt-auto pb-8">
        <button
          onClick={handleSkip}
          className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-full hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 drop-shadow-2xl text-lg"
        >
          Skip 💖
        </button>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }

        .flip-card-inner.flipped {
          transform: rotateY(180deg);
        }

        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};