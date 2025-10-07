import { useState } from "react";
import { Card } from "@/components/ui/card";
import memoryCard1 from "@/assets/memory-card-1.jpg";
import memoryCard2 from "@/assets/memory-card-2.jpg";
import memoryCard3 from "@/assets/memory-card-3.jpg";

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
    { id: 1, image: memoryCard1, text: "Our First Glance", isFlipped: false, isMatched: false },
    { id: 2, image: memoryCard1, text: "Our First Glance", isFlipped: false, isMatched: false },
    { id: 3, image: memoryCard2, text: "Oct 11 Sparks", isFlipped: false, isMatched: false },
    { id: 4, image: memoryCard2, text: "Oct 11 Sparks", isFlipped: false, isMatched: false },
    { id: 5, image: memoryCard3, text: "Rainy Day Promise", isFlipped: false, isMatched: false },
    { id: 6, image: memoryCard3, text: "Rainy Day Promise", isFlipped: false, isMatched: false },
  ].sort(() => Math.random() - 0.5);

  const [cards, setCards] = useState<MemoryCard[]>(initialCards);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [canFlip, setCanFlip] = useState(true);

  const handleCardClick = (index: number) => {
    if (!canFlip || cards[index].isFlipped || cards[index].isMatched || flippedCards.length >= 2) {
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
            setTimeout(() => onComplete(), 800);
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

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Level 1: Memory Match</h2>
        <p className="text-muted-foreground">Find the matching pairs to unlock our memories</p>
      </div>

      <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
        {cards.map((card, index) => (
          <Card
            key={index}
            onClick={() => handleCardClick(index)}
            className={`aspect-square cursor-pointer transition-all duration-500 transform ${
              card.isFlipped || card.isMatched ? 'rotate-y-180' : ''
            } ${card.isMatched ? 'opacity-50 scale-95' : 'hover:scale-105'}`}
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg">
              {card.isFlipped || card.isMatched ? (
                <div className="flex flex-col items-center justify-center space-y-2 p-4">
                  <img 
                    src={card.image} 
                    alt={card.text}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <p className="text-xs text-foreground font-semibold text-center">{card.text}</p>
                </div>
              ) : (
                <div className="text-4xl">💕</div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
