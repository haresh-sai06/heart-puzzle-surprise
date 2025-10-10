import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Prism from "./ui/Prism";

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
  const [showCongrats, setShowCongrats] = useState(false);
  const [congratsMessage, setCongratsMessage] = useState("");
  
  // Level 2: Name of girl child
  const [childNameInput, setChildNameInput] = useState("");
  const [childNameAttempts, setChildNameAttempts] = useState(0);
  const [showChildNameHint, setShowChildNameHint] = useState(false);
  
  // Level 3: Secret Code
  const [codeInput, setCodeInput] = useState("");
  const [codeAttempts, setCodeAttempts] = useState(0);
  const [showCodeHint, setShowCodeHint] = useState(false);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleNext = () => {
    if (currentLevel < 3) {
      setCurrentLevel(currentLevel + 1);
      // Reset states for next level
      setChildNameInput("");
      setChildNameAttempts(0);
      setShowChildNameHint(false);
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

  const showLevelCongrats = (message: string) => {
    setCongratsMessage(message);
    setShowCongrats(true);
    setTimeout(() => {
      setShowCongrats(false);
      if (currentLevel === 3) {
        setTimeout(() => {
          onComplete();
        }, 500);
      } else {
        handleNext();
      }
    }, 2000);
  };

  const handleMonthSelect = (month: string) => {
    if (month === "October") {
      showLevelCongrats("Perfect! Our sparks flew in the heart of October!. Onward to the next memory! ✨");
    } else {
      // Optional: Gentle feedback for wrong month
    }
  };

  const handleChildNameSubmit = () => {
    if (childNameInput.toUpperCase() === "VAISHNAVI") {
      showLevelCongrats("Last one more level to go! Our little miracle unlocks the final door. 💕");
    } else {
      const newAttempts = childNameAttempts + 1;
      setChildNameAttempts(newAttempts);
      if (newAttempts >= 1) {
        setShowChildNameHint(true);
      }
      if (newAttempts >= 3) {
        setChildNameAttempts(0);
        setShowChildNameHint(false);
        setChildNameInput("");
      }
    }
  };

  const handleCodeSubmit = () => {
    if (codeInput === "1106") {
      showLevelCongrats("Get ready to be surprised! Our story awaits... 🎁");
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

  const handleKeyDown = (e: React.KeyboardEvent, handler: () => void) => {
    if (e.key === 'Enter') handler();
  };

  const progress = (currentLevel / 3) * 100;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto py-8">
      {/* Prism background */}
      <div className="absolute inset-0 z-0">
        <Prism
          animationType="3drotate"
          glow={1.5}
          noise={0.3}
          transparent={false}
          scale={3.5}
          hueShift={5.5}
          colorFrequency={1.2}
          bloom={1.3}
          timeScale={0.3}
        />
      </div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 z-10 bg-black/30 backdrop-blur-sm" />

      <div className="container mx-auto px-4 relative z-20">
        {/* Skip button */}
        {/* <button
          onClick={onComplete}
          className="absolute top-0 right-4 px-4 py-2 text-white/60 hover:text-white/90 text-sm transition-colors duration-300 underline decoration-dotted"
        >
          Skip for now →
        </button> */}

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
          {/* Level 1: Month Buttons */}
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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-md mx-auto">
                {months.map((month) => (
                  <Button
                    key={month}
                    onClick={() => handleMonthSelect(month)}
                    variant={ "default" }
                    className={`py-3 text-sm font-semibold transition-all duration-300 `}
                  >
                    {month}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Level 2: Child Name */}
          {currentLevel === 2 && (
            <div className="bg-gradient-to-br from-indigo-400/20 via-purple-400/20 to-pink-400/20 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 romantic-glow text-center space-y-6">
              <h2 
                className="text-3xl md:text-4xl font-bold text-white mb-4"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                Our Little Miracle 👶
              </h2>
              <p className="text-white/80 text-lg mb-4">
                What is the name of our girl child?(That we had secretly wished for)
              </p>
              <Input
                type="text"
                value={childNameInput}
                onChange={(e) => setChildNameInput(e.target.value.toUpperCase())}
                onKeyDown={(e) => handleKeyDown(e, handleChildNameSubmit)}
                placeholder="Her name..."
                className="text-center text-2xl font-bold bg-white/10 border-white/30 text-white placeholder:text-white/40"
              />
              {showChildNameHint && (
                <p className="text-rose-300 text-sm animate-fade-in">
                  Hint: Our little princess's name 💕
                </p>
              )}
              <Button
                onClick={handleChildNameSubmit}
                disabled={childNameInput.length < 3}
                className="px-8 py-4 text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 hover:scale-105 transition-all duration-300 romantic-glow disabled:opacity-50"
              >
                Submit
              </Button>
              <p className="text-white/60 text-sm">
                Attempts: {childNameAttempts}/3 (Resets after 3 tries)
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
                onKeyDown={(e) => handleKeyDown(e, handleCodeSubmit)}
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

        {/* Congratulations Modal */}
        {showCongrats && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
            <div className="bg-gradient-to-br from-rose-400/30 via-pink-400/30 to-violet-400/30 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 text-center max-w-md mx-4 romantic-glow animate-fade-in-up space-y-4">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "'Great Vibes', cursive" }}>
                Congratulations!
              </h3>
              <p className="text-white/90 text-lg leading-relaxed">
                {congratsMessage}
              </p>
            </div>
          </div>
        )}

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