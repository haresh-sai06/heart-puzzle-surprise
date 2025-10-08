import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Prism from "./ui/Prism";

interface Word {
  scrambled: string[];
  answer: string;
  hint: string;
}

interface WordUnscrambleGameProps {
  onComplete: () => void;
}

export const WordUnscrambleGame = ({ onComplete }: WordUnscrambleGameProps) => {
  const words: Word[] = [
    { scrambled: ['E', 'V', 'O', 'L'], answer: 'LOVE', hint: 'What we share' },
    { scrambled: ['A', 'N','N','I', 'V', 'E', 'R', 'S', 'A', 'R', 'Y'], answer: 'ANNIVERSARY', hint: 'October 14' },
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [availableLetters, setAvailableLetters] = useState<string[]>(
    [...words[0].scrambled].sort(() => Math.random() - 0.5)
  );
  const [gameComplete, setGameComplete] = useState(false);

  const currentWord = words[currentWordIndex];
  const isCorrect = selectedLetters.join('') === currentWord.answer;

  const handleLetterClick = (letter: string, index: number) => {
    setSelectedLetters([...selectedLetters, letter]);
    setAvailableLetters(availableLetters.filter((_, i) => i !== index));
  };

  const handleSelectedClick = (index: number) => {
    const letter = selectedLetters[index];
    setAvailableLetters([...availableLetters, letter]);
    setSelectedLetters(selectedLetters.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (isCorrect) {
      if (currentWordIndex < words.length - 1) {
        // Move to next word
        setTimeout(() => {
          const nextIndex = currentWordIndex + 1;
          setCurrentWordIndex(nextIndex);
          setSelectedLetters([]);
          setAvailableLetters([...words[nextIndex].scrambled].sort(() => Math.random() - 0.5));
        }, 800);
      } else {
        // Game complete
        setGameComplete(true);
        setTimeout(() => onComplete(), 3000); // Auto proceed after 3s
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
          <p className="text-xl text-white/90 drop-shadow-md">You unscrambled our love perfectly! 💕</p>
          <p className="text-lg text-rose-300 italic">Our story is unlocked... Forever yours.</p>
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
      <div className="text-center z-10 relative bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 drop-shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">Level 3: Unscramble Our Words</h2>
        <p className="text-white/80 drop-shadow-md text-sm md:text-base">Arrange the letters to unlock the final key</p>
        <p className="text-sm text-rose-300 italic">Hint: {currentWord.hint}</p>
      </div>

      {/* Game Card - responsive, fits viewport */}
      <Card className="max-w-lg mx-auto p-6 space-y-6 bg-white/10 backdrop-blur-md border border-white/20 drop-shadow-lg z-10">
        {/* Answer area */}
        <div className="flex justify-center gap-2 min-h-[60px] items-center flex-wrap">
          {selectedLetters.length === 0 ? (
            <p className="text-white/80 italic text-center">Tap letters below to spell the word</p>
          ) : (
            selectedLetters.map((letter, index) => (
              <Button
                key={index}
                onClick={() => handleSelectedClick(index)}
                variant="outline"
                className={`w-12 h-12 text-xl font-bold transition-all ${
                  isCorrect ? 'bg-accent text-accent-foreground animate-pulse' : ''
                }`}
              >
                {letter}
              </Button>
            ))
          )}
        </div>

        {/* Available letters */}
        <div className="flex justify-center gap-2 flex-wrap">
          {availableLetters.map((letter, index) => (
            <Button
              key={index}
              onClick={() => handleLetterClick(letter, index)}
              variant="secondary"
              className="w-12 h-12 text-xl font-bold hover:scale-110 transition-transform"
            >
              {letter}
            </Button>
          ))}
        </div>

        {/* Submit button */}
        {selectedLetters.length === currentWord.answer.length && (
          <div className="flex justify-center animate-fade-in">
            <Button
              onClick={handleSubmit}
              size="lg"
              className={`romantic-glow ${
                isCorrect ? 'bg-accent text-accent-foreground' : ''
              }`}
            >
              {isCorrect ? '✓ Correct! Next →' : 'Check Answer'}
            </Button>
          </div>
        )}

        {/* Progress indicator */}
        <div className="flex justify-center gap-2">
          {words.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentWordIndex
                  ? 'bg-accent scale-125'
                  : index < currentWordIndex
                  ? 'bg-accent/50'
                  : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </Card>

      {/* Skip Button - bottom centered */}
      <div className="text-center z-10 relative mt-auto pb-4">
        <button
          onClick={handleSkip}
          className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-full hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 drop-shadow-2xl"
        >
          Skip 💖
        </button>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .romantic-glow {
          box-shadow: 0 0 20px rgba(255, 105, 180, 0.5);
        }
      `}</style>
    </div>
  );
};