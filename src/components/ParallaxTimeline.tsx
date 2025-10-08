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
    year: "Year 1: 10th Std Sparks",
    title: "Butterflies in the Hallways ✨",
    description: "It began with a glance across the classroom, hearts fluttering like autumn leaves in October wind. Your smile lit up my world on that fateful October 11, 2016—the spark that ignited our eternal flame.",
    color: "from-rose-400/20 to-pink-400/20",
    photoPath: Picture1, // Assigned imported image
  },
  {
    year: "Year 2: Whispers & Promises",
    title: "Rainy Confessions Under Stars 💭",
    description: "Secret notes folded in palms, promises sealed in rainy Octobers. From birthday whispers on the 11th to anniversary vows on the 14th, every moment wove our souls closer, deeper into love's gentle embrace.",
    color: "from-pink-400/20 to-violet-400/20",
    photoPath: Picture2, // Assigned imported image
  },
  {
    year: "Year 3: College Vows",
    title: "Dreams Shared, Hands Entwined 💍",
    description: "Campus paths trodden together, futures painted in shared dreams. Laughter echoing through libraries, love blooming like spring cherry blossoms—our bond, unbreakable, timeless.",
    color: "from-violet-400/20 to-indigo-400/20",
    photoPath: Picture3, // Assigned imported image
  },
  {
    year: "Year 4: Wedding Whispers",
    title: "Vows Beneath the Stars 💒",
    description: "In a cascade of petals and promises, we became one. That sacred October day, under twinkling heavens, we whispered 'forever'—a vow etched in the stars, our hearts forever intertwined.",
    color: "from-indigo-400/20 to-rose-400/20",
    photoPath: Picture4, // Assigned imported image
  },
  {
    year: "Now: Four Eternal Years",
    title: "Our Infinite October Love 💕",
    description: "Four years of sunrises shared, storms weathered hand in hand. From schoolyard glances to marital bliss, our love story unfolds like a cherished novel—each chapter more beautiful than the last.",
    color: "from-rose-400/20 to-pink-400/20",
    photoPath: Picture5, // Assigned imported image
  },
];

// Love note phrases from timeline
const loveNotePhrases = [
  "hearts fluttering like autumn leaves in October wind",
  "Your smile lit up my world on that fateful October 11, 2016",
  "Secret notes folded in palms, promises sealed in rainy Octobers",
  "From birthday whispers on the 11th to anniversary vows on the 14th",
  "every moment wove our souls closer, deeper into love's gentle embrace",
  "Campus paths trodden together, futures painted in shared dreams",
  "Laughter echoing through libraries, love blooming like spring cherry blossoms",
  "our bond, unbreakable, timeless",
  "In a cascade of petals and promises, we became one",
  "we whispered 'forever'—a vow etched in the stars",
  "Four years of sunrises shared, storms weathered hand in hand",
  "our love story unfolds like a cherished novel",
  "each chapter more beautiful than the last",
];

const generateLoveNote = (index: number) => {
  const hour = new Date().getHours();
  let timeLabel = "";
  let prefix = "";
  
  if (hour < 12) {
    timeLabel = "Good Morning, My Love ☀️";
    prefix = "As dawn breaks, I think of how ";
  } else if (hour < 17) {
    timeLabel = "Afternoon Reverie 🌸";
    prefix = "In this quiet moment, I remember ";
  } else if (hour < 20) {
    timeLabel = "Evening Glow 🌅";
    prefix = "As twilight descends, my heart whispers of ";
  } else {
    timeLabel = "Good Night, My Forever 🌙";
    prefix = "Under starlight, I dream of ";
  }
  
  const phrase = loveNotePhrases[index % loveNotePhrases.length];
  return {
    timeLabel,
    text: `${prefix}${phrase}...`,
  };
};

export const ParallaxTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [loveNotes, setLoveNotes] = useState(() => 
    Array.from({ length: 10 }, (_, i) => generateLoveNote(i))
  );
  const [isLoading, setIsLoading] = useState(false);

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

  const loadMoreNotes = useCallback(() => {
    if (isLoading || loveNotes.length >= 50) return;
    
    setIsLoading(true);
    setTimeout(() => {
      const newNotes = Array.from({ length: 5 }, (_, i) => 
        generateLoveNote(loveNotes.length + i)
      );
      setLoveNotes(prev => [...prev, ...newNotes]);
      setIsLoading(false);
    }, 500);
  }, [isLoading, loveNotes.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreNotes();
        }
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, [loadMoreNotes]);

  return (
    <div ref={containerRef} className="relative min-h-screen py-20 overflow-hidden">
      {/* Particles background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Particles
          particleColors={['#ff69b4', '#ff0000ff']}
          particleCount={900}
          particleSpread={10}
          speed={0.08}
          particleBaseSize={80}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 bg-clip-text text-transparent animate-fade-in-up"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Our Eternal Journey
          </h2>
          <p className="text-2xl text-white/80 backdrop-blur-sm">
            Scroll through the pages of our love story
          </p>
          <p className="text-lg text-rose-300/80">
            From First Sparks to Forever 💕
          </p>
        </div>

        <div className="relative space-y-32">
          {/* Timeline line with gradient glow */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-400 via-pink-400 to-violet-400 opacity-40 hidden md:block romantic-glow" />

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
                } flex-col gap-8`}
                style={{
                  opacity,
                  transform: `translateY(${translateY}px) scale(${scale})`,
                  transition: "opacity 0.3s ease-out",
                }}
              >
                {/* Content card with frosted glass */}
                <div className="w-full md:w-4/12">
                  <Card className="p-6 md:p-8 romantic-glow hover:scale-105 transition-all duration-500 bg-white/10 backdrop-blur-md border border-white/20">
                    <div className="space-y-4">
                      <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${section.color} romantic-glow`}>
                        <span className="text-sm font-bold text-white">
                          {section.year}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white animate-fade-in">
                        {section.title}
                      </h3>
                      <p className="text-white/90 leading-relaxed backdrop-blur-sm">
                        {section.description}
                      </p>
                    </div>
                  </Card>
                </div>

                {/* Timeline dot with pulse */}
                <div className="hidden md:flex w-2/12 justify-center">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 romantic-glow animate-pulse-slow" />
                </div>

                {/* Memory photo with peel effect - Wider */}
                <div className="w-full md:w-6/12">
                  <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden romantic-glow group cursor-pointer">
                    {/* Photo background with subtle overlay */}
                    <img 
                      src={section.photoPath} 
                      alt={`${section.year} Memory`} 
                      className="w-full h-full object-cover rounded-3xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-3xl" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 backdrop-blur-none group-hover:bg-white/10 transition-all duration-500">
                      <div className="space-y-2 text-white">
                        <div className="text-4xl animate-float-slow">
                          {index % 3 === 0 ? '💑' : index % 3 === 1 ? '💕' : '💖'}
                        </div>
                        <p className="text-lg font-semibold drop-shadow-md">
                          {section.year}
                        </p>
                      </div>
                    </div>
                    {/* Peeling corner with subtle animation */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/20 to-transparent transform rotate-45 translate-x-8 -translate-y-8 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform duration-500 animate-peel" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Final romantic message */}
        <div className="mt-32 text-center space-y-8 animate-fade-in pb-20">
          <h3 
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 bg-clip-text text-transparent animate-fade-in-up"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            To Infinite Octobers Together
          </h3>
          <p className="text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed backdrop-blur-sm">
            On this special October, celebrating four years of woven destinies and one extraordinary birthday. 
            From that innocent spark in 10th standard to the symphony of our shared life, 
            you are my forever October—warm, vibrant, eternal.
          </p>
          <p className="text-xl text-rose-300/80 max-w-2xl mx-auto italic">
            Happy Birthday, My Eternal Love. Here's to countless more chapters in our story. 💕
          </p>
          <div className="flex justify-center gap-8 text-6xl">
            <div className="animate-float-slow">💑</div>
            <div className="animate-float-slow" style={{ animationDelay: '1s' }}>💖</div>
            <div className="animate-float-slow" style={{ animationDelay: '2s' }}>✨</div>
          </div>
        </div>

        {/* Infinite Scroll Love Letters */}
        <div className="mt-20 max-w-4xl mx-auto space-y-8 pb-20">
          <h3 
            className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 bg-clip-text text-transparent animate-fade-in-up"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Whispers from Our Novel 💌
          </h3>
          <div 
            ref={scrollContainerRef}
            className="max-h-96 overflow-y-auto space-y-4 px-4"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#f472b6 transparent'
            }}
          >
            {loveNotes.map((note, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-6 romantic-glow animate-fade-in"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="text-xs text-rose-300 mb-2 font-semibold">{note.timeLabel}</div>
                <p 
                  className="text-white/90 italic leading-relaxed typing-animation"
                  style={{
                    fontFamily: "'Great Vibes', cursive",
                    fontSize: '1.1rem'
                  }}
                >
                  {note.text}
                </p>
              </div>
            ))}
            <div ref={sentinelRef} className="h-4" />
            {isLoading && (
              <div className="text-center text-rose-300 py-4">
                Loading more whispers... 💕
              </div>
            )}
          </div>
        </div>

        {/* View Album Button */}
        <div className="text-center pb-20 z-50">
          <Link to="/album">
            <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 text-white font-bold text-lg rounded-full romantic-glow hover:scale-105 transition-all duration-300 cursor-pointer relative z-50">
              View Album 💕
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
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes blink {
          50% { border-color: transparent; }
        }
        .typing-animation {
          overflow: hidden;
          white-space: nowrap;
          animation: typing 2s steps(40, end), blink 0.75s step-end infinite;
        }
      `}</style>
    </div>
  );
};

export default ParallaxTimeline;