import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    { scrambled: ['A', 'N', 'I', 'V', 'E', 'R', 'S', 'A', 'R', 'Y'], answer: 'ANNIVERSARY', hint: 'October 14' },
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [availableLetters, setAvailableLetters] = useState<string[]>(
    [...words[0].scrambled].sort(() => Math.random() - 0.5)
  );

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
        setTimeout(() => onComplete(), 1000);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Level 3: Unscramble Our Words</h2>
        <p className="text-muted-foreground">Arrange the letters to unlock the final key</p>
        <p className="text-sm text-accent">Hint: {currentWord.hint}</p>
      </div>

      <Card className="max-w-2xl mx-auto p-8 space-y-6 bg-card/80 backdrop-blur">
        {/* Answer area */}
        <div className="flex justify-center gap-2 min-h-[80px] items-center flex-wrap">
          {selectedLetters.length === 0 ? (
            <p className="text-muted-foreground">Tap letters below to spell the word</p>
          ) : (
            selectedLetters.map((letter, index) => (
              <Button
                key={index}
                onClick={() => handleSelectedClick(index)}
                variant="outline"
                className={`w-14 h-14 text-2xl font-bold transition-all ${
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
              className="w-14 h-14 text-2xl font-bold hover:scale-110 transition-transform"
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
    </div>
  );
};
