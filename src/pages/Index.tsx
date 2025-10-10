import { useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { LandingPage } from "@/components/LandingPage";
import { UnlockGames } from "@/components/UnlockGames";
import { HeroSection } from "@/components/HeroSection";
import { ParallaxTimeline } from "@/components/ParallaxTimeline";

const Index = () => {
  const [searchParams] = useSearchParams();
  const skipIntro = searchParams.get('skipIntro') === 'true';
  
  const [showLanding, setShowLanding] = useState(skipIntro ? false : true);
  const [showGames, setShowGames] = useState(false);
  const [showHero, setShowHero] = useState(skipIntro ? true : false);
  const [showTimeline, setShowTimeline] = useState(skipIntro ? true : false);
  const timelineRef = useRef<HTMLDivElement>(null);

  const handleLandingReady = () => {
    setShowLanding(false);
    setShowGames(true);
  };

  const handleGamesComplete = () => {
    setShowGames(false);
    setShowHero(true);
    setShowTimeline(true);
  };

  const handleScrollPrompt = () => {
    timelineRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {showLanding && <LandingPage onReady={handleLandingReady} />}
      {showGames && <UnlockGames onComplete={handleGamesComplete} />}
      {showHero && (
        <div className="animate-fade-in">
          <HeroSection onScrollPrompt={handleScrollPrompt} />
        </div>
      )}
      {showTimeline && (
        <div ref={timelineRef} className="animate-fade-in">
          <ParallaxTimeline />
        </div>
      )}
    </div>
  );
};

export default Index;