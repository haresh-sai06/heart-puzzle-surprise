import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";

interface TimelineSection {
  year: string;
  title: string;
  description: string;
  color: string;
}

const timelineSections: TimelineSection[] = [
  {
    year: "Year 1: 10th Std",
    title: "10th Standard Butterflies ✨",
    description: "Where it all began... Two hearts discovering something special in the hallways of our school. The shy glances, the nervous smiles, and the beginning of our beautiful story. October 11, 2016 - the day that changed everything.",
    color: "from-primary/30 to-secondary/30",
  },
  {
    year: "Year 2: 11th-12th",
    title: "Our Eternal Octobers 💭",
    description: "From October 11th birthdays to October 14th anniversaries, every moment became a treasure. Love letters passed in class, promises whispered under the stars. That rainy Oct 11 confession that made my heart skip a beat.",
    color: "from-secondary/30 to-accent/30",
  },
  {
    year: "Year 3: College",
    title: "College Dreams & Vows 💍",
    description: "Growing together, dreaming together. From study sessions to life plans, from campus grounds to forever promises. Our love matured like fine wine, deeper with every shared moment.",
    color: "from-accent/30 to-primary/30",
  },
  {
    year: "Year 4: Wedding",
    title: "Wedding Bells & Forever 💒",
    description: "The day we became one. Surrounded by love, we promised forever under the stars. From that magical day forward, every sunrise brings new reasons to fall in love again.",
    color: "from-primary/30 to-destructive/30",
  },
  {
    year: "Now: 4 Years",
    title: "Four Years of Forever 💕",
    description: "Four years of marriage, countless memories, and infinite love. From school sweethearts to life partners, our journey continues to be the greatest adventure. Here's to many more Octobers together!",
    color: "from-destructive/30 to-secondary/30",
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
    <div ref={containerRef} className="relative py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Our Eternal Octobers
          </h2>
          <p className="text-2xl text-muted-foreground">
            Scroll to relive every magical moment of our journey
          </p>
          <p className="text-lg text-accent">
            From 10th Standard to Forever 💕
          </p>
        </div>

        <div className="relative space-y-32">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent opacity-30 hidden md:block" />

          {timelineSections.map((section, index) => {
            const isEven = index % 2 === 0;
            const sectionProgress = (scrollY * 5) - index;
            const opacity = Math.min(Math.max(sectionProgress, 0), 1);
            const translateY = Math.max((1 - sectionProgress) * 50, 0);
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
                {/* Content card */}
                <div className="w-full md:w-5/12">
                  <Card className="p-6 md:p-8 romantic-glow hover:scale-105 transition-all duration-500 bg-card/50 backdrop-blur-sm">
                    <div className="space-y-4">
                      <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${section.color}`}>
                        <span className="text-sm font-bold text-foreground">
                          {section.year}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold">
                        {section.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {section.description}
                      </p>
                    </div>
                  </Card>
                </div>

                {/* Timeline dot */}
                <div className="hidden md:flex w-2/12 justify-center">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-secondary romantic-glow pulse-slow" />
                </div>

                {/* Photo placeholder with peeling page effect */}
                <div className="w-full md:w-5/12">
                  <div className="relative aspect-square rounded-3xl overflow-hidden romantic-glow group cursor-pointer">
                    <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-40 transition-all duration-500 group-hover:opacity-60`} />
                    <div className="absolute inset-0 flex items-center justify-center text-center p-8 bg-background/40 backdrop-blur-sm group-hover:bg-background/20 transition-all duration-500 group-hover:transform group-hover:rotate-3">
                      <div className="space-y-4">
                        <div className="text-7xl animate-float">📸</div>
                        <p className="text-xl font-semibold text-foreground">
                          Our Memory
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {section.year}
                        </p>
                        <div className="flex gap-2 justify-center text-2xl">
                          {index % 3 === 0 ? '💑' : index % 3 === 1 ? '💕' : '💖'}
                        </div>
                      </div>
                    </div>
                    {/* Peeling corner effect */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-foreground/10 to-transparent transform rotate-45 translate-x-8 -translate-y-8 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform duration-500" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Final message */}
        <div className="mt-32 text-center space-y-8 animate-fade-in pb-20">
          <h3 
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            To Many More Years of Love
          </h3>
          <p className="text-2xl text-foreground max-w-3xl mx-auto leading-relaxed">
            Happy 4th Anniversary and Happy Birthday to the most amazing person in my life. 
            From that first glance in 10th standard to four beautiful years of marriage,
            every moment with you has been magical. 
          </p>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Here's to infinity and beyond together! 💕
          </p>
          <div className="flex justify-center gap-8 text-6xl">
            <div className="animate-float">💑</div>
            <div className="animate-float" style={{ animationDelay: '1s' }}>💖</div>
            <div className="animate-float" style={{ animationDelay: '2s' }}>✨</div>
          </div>
        </div>
      </div>
    </div>
  );
};
