import { useState } from "react";
import { StarryBackground } from "@/components/StarryBackground";
import { PuzzleLock } from "@/components/PuzzleLock";
import { ParallaxTimeline } from "@/components/ParallaxTimeline";

const Index = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <div className="relative min-h-screen">
      <StarryBackground />
      
      {!isUnlocked ? (
        <PuzzleLock onUnlock={() => setIsUnlocked(true)} />
      ) : (
        <div className="animate-fade-in">
          <ParallaxTimeline />
        </div>
      )}
    </div>
  );
};

export default Index;
