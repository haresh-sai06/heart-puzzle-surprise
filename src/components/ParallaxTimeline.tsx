import { useEffect, useRef, useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import Particles from "./ui/Particles";
import { Link } from "react-router-dom";
// Import each photo separately for reliable loading in React
import Picture1 from "@/assets/our-pics/image1.jpeg"; // Year 1
import Picture2 from "@/assets/our-pics/image2.jpeg"; // Year 2
import Picture3 from "@/assets/our-pics/image3.jpeg"; // Year 3
import Picture4 from "@/assets/our-pics/image4.jpeg"; // Year 4
import Picture5 from "@/assets/our-pics/image5.jpeg"; // Year 5

interface TimelineSection {
  year: string;
  title: string;
  description: string;
  color: string;
  // Now using imported image modules instead of string paths
  photoPath: any; // Type 'any' for imported images; could be StaticImageData if using Next.js
}

const timelineSections: TimelineSection[] = [
  {
    year: "Year 1: October Beginnings 🌸",
    title: "The Day My Heart Spoke ❤️",
    description:
      "It all began on October 14, back in 10th standard — the day I gathered the courage to confess my love. But fate had its own path; she wasn’t ready yet. Behind her smile lived pain — a trauma she feared would push me away. Yet, little did she know, my love wasn’t fragile. It was patient, and it was real.",
    color: "from-rose-400/20 to-pink-400/20",
    photoPath: Picture1,
  },
  {
    year: "Year 2: Through Storms & Shadows ☔",
    title: "I Chose to Stay 💫",
    description:
      "That year wasn’t easy. The truth behind her silence surfaced, and my heart broke with hers. There were tears, misunderstandings, and endless fights — but I never let go. Through every scar and every storm, I stood by her side. Together, we made it through 12th standard, not as perfect lovers, but as two souls who refused to give up on each other.",
    color: "from-pink-400/20 to-violet-400/20",
    photoPath: Picture2,
  },
  {
    year: "Year 3: Healing Hearts 🌿",
    title: "She Began to Smile Again 🌼",
    description:
      "Time began to heal what pain once ruled. She started finding herself again — her laughter returning like sunlight after a storm. We built memories, shared dreams, and finally started living without fear. Yet, the shadows of her home still lingered. But even when life tried to pull her down, I became her calm — her constant peace amidst the chaos.",
    color: "from-violet-400/20 to-indigo-400/20",
    photoPath: Picture3,
  },
  {
    year: "Year 4: Our October Forever 💕",
    title: "Four Years of Us ✨",
    description:
      "Now, in our 2nd year of college, our love has grown through everything life could test us with. From the scared girl who couldn’t trust love, to the strong woman who found comfort in it — we’ve come a long way. This October marks not just four years together, but four years of healing, strength, and a bond that no distance or darkness can break.",
    color: "from-indigo-400/20 to-rose-400/20",
    photoPath: Picture4,
  },
  {
    year: "Now: Our Endless Chapter 🌙",
    title: "Still Choosing Each Other 💖",
    description:
      "Even after all this time, I still fall for her in new ways every day. We’ve walked through pain, faced storms, and found light together. She is my strength, my softness, my October — the one I’ll keep loving, no matter how many lifetimes come and go. Here’s to forever starting from 10th standard... and never ending.",
    color: "from-rose-400/20 to-pink-400/20",
    photoPath: Picture5,
  },
];

export const ParallaxTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollPercentage = Math.max(0, -rect.top) / (rect.height - window.innerHeight);
        setScrollY(scrollPercentage);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen py-12 sm:py-16 md:py-20 overflow-hidden">
      {/* Particles background - Mobile optimized count */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Particles
          particleColors={['#ff69b4', '#ff0000ff']}
          particleCount={typeof window !== 'undefined' && window.innerWidth < 768 ? 300 : 900}
          particleSpread={10}
          speed={typeof window !== 'undefined' && window.innerWidth < 768 ? 0.05 : 0.08}
          particleBaseSize={typeof window !== 'undefined' && window.innerWidth < 768 ? 60 : 80}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>

      <div className="relative z-10 container mx-auto px-3 sm:px-4 md:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16 space-y-2 sm:space-y-3 md:space-y-4 px-2">
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 bg-clip-text text-transparent animate-fade-in-up py-4"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Our Eternal Journey
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white/80 backdrop-blur-sm">
            Scroll through the pages of our love story
          </p>
          <p className="text-sm sm:text-base md:text-lg text-rose-300/80">
            From First Sparks to Forever 💕
          </p>
        </div>

        <div className="relative space-y-16 sm:space-y-20 md:space-y-28 lg:space-y-32">
          {/* Timeline line with gradient glow - Hidden on mobile */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 sm:w-1 bg-gradient-to-b from-rose-400 via-pink-400 to-violet-400 opacity-40 hidden md:block romantic-glow" />

          {timelineSections.map((section, index) => {
            const isEven = index % 2 === 0;
            const sectionProgress = (scrollY * 8) - index;
            const opacity = Math.min(Math.max(sectionProgress, 0), 1);
            const translateY = Math.max((1 - sectionProgress) * 30, 0);
            const scale = 0.9 + (Math.min(sectionProgress, 1) * 0.1);

            return (
              <div
                key={index}
                className={`relative flex items-center ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                } flex-col gap-4 sm:gap-6 md:gap-8`}
                style={{
                  opacity,
                  transform: `translateY(${translateY}px) scale(${scale})`,
                  transition: "opacity 0.3s ease-out",
                }}
              >
                {/* Content card - Mobile optimized */}
                <div className="w-full md:w-4/12">
                  <Card className="p-4 sm:p-6 md:p-8 romantic-glow active:scale-95 sm:hover:scale-105 transition-all duration-500 bg-white/10 backdrop-blur-md border border-white/20">
                    <div className="space-y-2 sm:space-y-3 md:space-y-4">
                      <div className={`inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r ${section.color} romantic-glow`}>
                        <span className="text-xs sm:text-sm font-bold text-white">
                          {section.year}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white animate-fade-in">
                        {section.title}
                      </h3>
                      <p className="text-sm sm:text-base text-white/90 leading-relaxed backdrop-blur-sm">
                        {section.description}
                      </p>
                    </div>
                  </Card>
                </div>

                {/* Timeline dot - Hidden on mobile */}
                <div className="hidden md:flex w-2/12 justify-center">
                  <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 romantic-glow animate-pulse-slow" />
                </div>

                {/* Memory photo - Mobile responsive */}
                <div className="w-full md:w-6/12">
                  <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden romantic-glow group cursor-pointer">
                    {/* Photo background - Mobile optimized */}
                    <img 
                      src={section.photoPath} 
                      alt={`${section.year} Memory`} 
                      className="w-full h-full object-cover rounded-2xl sm:rounded-3xl"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl sm:rounded-3xl" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3 sm:p-4 backdrop-blur-none group-hover:bg-white/10 transition-all duration-500">
                      <div className="space-y-1 sm:space-y-2 text-white">
                        <div className="text-3xl sm:text-4xl animate-float-slow">
                          {index % 3 === 0 ? '💑' : index % 3 === 1 ? '💕' : '💖'}
                        </div>
                        <p className="text-sm sm:text-base md:text-lg font-semibold drop-shadow-md">
                          {section.year}
                        </p>
                      </div>
                    </div>
                    {/* Peeling corner - Hidden on mobile */}
                    <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-white/20 to-transparent transform rotate-45 translate-x-6 -translate-y-6 sm:translate-x-8 sm:-translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 sm:group-hover:translate-x-6 sm:group-hover:-translate-y-6 transition-transform duration-500 animate-peel hidden sm:block" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Final romantic message - Mobile responsive */}
        <div className="mt-16 sm:mt-24 md:mt-32 text-center space-y-4 sm:space-y-6 md:space-y-8 animate-fade-in pb-12 sm:pb-16 md:pb-20 px-2">
          <h3 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 bg-clip-text text-transparent animate-fade-in-up py-4"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            To Infinite Octobers Together
          </h3>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed backdrop-blur-sm px-4">
            On this special October, celebrating four years of woven destinies and one extraordinary birthday. 
            From that innocent spark in 10th standard to the symphony of our shared life, 
            you are my forever soulmate. Here's to us, to love that conquers all, and to countless more Octobers hand in hand. 
            I love you, now and always.
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-rose-300/80 max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto italic px-4">
            Happy Birthday Wifeey!👉👈. Here's to countless more chapters in our story. 💕
          </p>
          <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 text-4xl sm:text-5xl md:text-6xl">
            <div className="animate-float-slow">💑</div>
            <div className="animate-float-slow" style={{ animationDelay: '1s' }}>💖</div>
            <div className="animate-float-slow" style={{ animationDelay: '2s' }}>✨</div>
          </div>
        </div>

        {/* View Album Button - Mobile optimized */}
        <div className="text-center pb-12 sm:pb-16 md:pb-20 z-50 px-2">
          <Link to="/album">
            <div className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 min-h-[48px] bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 text-white font-bold text-base sm:text-lg rounded-full romantic-glow active:scale-95 sm:hover:scale-105 transition-all duration-300 cursor-pointer relative z-50">
              View Album 💕
            </div>
            <div className="mt-2 text-sm sm:text-base text-white/80">
              Click to view all our cherished memories in the album
            </div>
          </Link>
        </div>
      </div>

      <style>{`
        .romantic-glow {
          box-shadow: 0 0 20px rgba(255, 105, 180, 0.3);
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes peel {
          0%, 100% { transform: rotate(45deg) translateX(8px) translateY(-8px); }
          50% { transform: rotate(45deg) translateX(6px) translateY(-6px); }
        }
      `}</style>
    </div>
  );
};