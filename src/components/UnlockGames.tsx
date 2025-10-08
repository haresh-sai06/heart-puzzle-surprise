import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface UnlockGamesProps {
  onComplete: () => void;
}

const shuffleWord = (word: string) => {
  const arr = word.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
};

export const UnlockGames = ({ onComplete }: UnlockGamesProps) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Level 2: Unscramble STARS
  const [shuffledWord, setShuffledWord] = useState(() => shuffleWord("STARS"));
  const [unscrambleInput, setUnscrambleInput] = useState("");
  const [unscrambleAttempts, setUnscrambleAttempts] = useState(0);
  const [showUnscrambleHint, setShowUnscrambleHint] = useState(false);
  
  // Level 3: Secret Code
  const [codeInput, setCodeInput] = useState("");
  const [codeAttempts, setCodeAttempts] = useState(0);
  const [showCodeHint, setShowCodeHint] = useState(false);

  useEffect(() => {
    // Ensure shuffled word is different from original
    let shuffled = shuffleWord("STARS");
    while (shuffled === "STARS") {
      shuffled = shuffleWord("STARS");
    }
    setShuffledWord(shuffled);
  }, [currentLevel]);

  const handleNext = () => {
    if (currentLevel < 3) {
      setCurrentLevel(currentLevel + 1);
      // Reset states for next level
      setUnscrambleInput("");
      setUnscrambleAttempts(0);
      setShowUnscrambleHint(false);
      setCodeInput("");
      setCodeAttempts(0);
      setShowCodeHint(false);
    } else {
      setShowConfetti(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  const handleUnscrambleSubmit = () => {
    if (unscrambleInput.toUpperCase() === "STARS") {
      handleNext();
    } else {
      const newAttempts = unscrambleAttempts + 1;
      setUnscrambleAttempts(newAttempts);
      if (newAttempts >= 1) {
        setShowUnscrambleHint(true);
      }
      if (newAttempts >= 3) {
        // Reshuffle word
        let shuffled = shuffleWord("STARS");
        while (shuffled === "STARS") {
          shuffled = shuffleWord("STARS");
        }
        setShuffledWord(shuffled);
        setUnscrambleAttempts(0);
        setShowUnscrambleHint(false);
        setUnscrambleInput("");
      }
    }
  };

  const handleCodeSubmit = () => {
    if (codeInput === "1106") {
      handleNext();
    } else {
      const newAttempts = codeAttempts + 1;
      setCodeAttempts(newAttempts);
      if (newAttempts >= 2) {
        setShowCodeHint(true);
      }
      if (newAttempts >= 3) {
        setCodeAttempts(0);
        setShowCodeHint(false);
        setCodeInput("");
      }
    }
  };

  const progress = (currentLevel / 3) * 100;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-background/95 backdrop-blur-sm overflow-y-auto py-8">
      <div className="container mx-auto px-4 relative">
        {/* Skip button */}
        <button
          onClick={onComplete}
          className="absolute top-0 right-4 px-4 py-2 text-white/60 hover:text-white/90 text-sm transition-colors duration-300 underline decoration-dotted"
        >
          Skip for now →
        </button>

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
        <div className="animate-fade-in max-w-2xl mx-auto">
          {/* Level 1: Button for October */}
          {currentLevel === 1 && (
            <div className="bg-gradient-to-br from-rose-400/20 via-pink-400/20 to-violet-400/20 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 romantic-glow text-center space-y-6">
              <h2 
                className="text-3xl md:text-4xl font-bold text-white mb-4"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                When Did Our Sparks Fly? ✨
              </h2>
              <p className="text-white/80 text-lg mb-6">
                Click the month when our hearts first connected
              </p>
              <Button
                onClick={handleNext}
                className="px-12 py-6 text-2xl font-bold bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 hover:scale-110 transition-all duration-300 romantic-glow"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                October 🍂
              </Button>
            </div>
          )}

          {/* Level 2: Unscramble STARS */}
          {currentLevel === 2 && (
            <div className="bg-gradient-to-br from-indigo-400/20 via-purple-400/20 to-pink-400/20 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 romantic-glow text-center space-y-6">
              <h2 
                className="text-3xl md:text-4xl font-bold text-white mb-4"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                Unscramble Our Memory 💫
              </h2>
              <p className="text-white/80 text-lg mb-4">
                Our first dance was under the...
              </p>
              <div className="text-4xl font-bold text-white/90 tracking-widest mb-6 animate-pulse">
                {shuffledWord}
              </div>
              <Input
                type="text"
                value={unscrambleInput}
                onChange={(e) => setUnscrambleInput(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === 'Enter' && handleUnscrambleSubmit()}
                placeholder="Type the word..."
                maxLength={5}
                className="text-center text-2xl font-bold bg-white/10 border-white/30 text-white placeholder:text-white/40"
              />
              {showUnscrambleHint && (
                <p className="text-rose-300 text-sm animate-fade-in">
                  Hint: Twinkling night sky 💫
                </p>
              )}
              <Button
                onClick={handleUnscrambleSubmit}
                disabled={unscrambleInput.length !== 5}
                className="px-8 py-4 text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 hover:scale-105 transition-all duration-300 romantic-glow disabled:opacity-50"
              >
                Submit
              </Button>
              <p className="text-white/60 text-sm">
                Attempts: {unscrambleAttempts}/3 (Resets after 3 tries)
              </p>
            </div>
          )}

          {/* Level 3: Secret Code */}
          {currentLevel === 3 && (
            <div className="bg-gradient-to-br from-amber-400/20 via-rose-400/20 to-pink-400/20 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 romantic-glow text-center space-y-6">
              <h2 
                className="text-3xl md:text-4xl font-bold text-white mb-4"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                Our Secret Code 🔐
              </h2>
              <p className="text-white/80 text-lg mb-6">
                Enter the 4-digit code only we know...
              </p>
              <Input
                type="text"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value.replace(/\D/g, '').slice(0, 4))}
                onKeyDown={(e) => e.key === 'Enter' && handleCodeSubmit()}
                placeholder="****"
                maxLength={4}
                className="text-center text-3xl font-bold tracking-widest bg-white/10 border-white/30 text-white placeholder:text-white/40"
              />
              {showCodeHint && (
                <p className="text-rose-300 text-sm animate-fade-in">
                  Hint: Only you and me use this passcode everywhere ❤️
                </p>
              )}
              <Button
                onClick={handleCodeSubmit}
                disabled={codeInput.length !== 4}
                className="px-8 py-4 text-xl font-bold bg-gradient-to-r from-amber-400 via-rose-400 to-pink-400 hover:scale-105 transition-all duration-300 romantic-glow disabled:opacity-50"
              >
                Unlock Our Story
              </Button>
              <p className="text-white/60 text-sm">
                Attempts: {codeAttempts}/3 (Resets after 3 tries)
              </p>
            </div>
          )}
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
