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
    year: "Year 1",
    title: "10th Standard Sparks ✨",
    description: "Where it all began... Two hearts discovering something special in the hallways of our school. The shy glances, the nervous smiles, and the beginning of our beautiful story.",
    color: "from-primary/30 to-secondary/30",
  },
  {
    year: "Year 2",
    title: "11th-12th Whispers 💭",
    description: "From October 11th birthdays to October 14th anniversaries, every moment became a treasure. Love letters passed in class, promises whispered under the stars.",
    color: "from-secondary/30 to-accent/30",
  },
  {
    year: "Year 3",
    title: "College Vows 💍",
    description: "Growing together, dreaming together. From study sessions to life plans, from campus grounds to forever promises. Our love matured like fine wine.",
    color: "from-accent/30 to-primary/30",
  },
  {
    year: "Year 4",
    title: "Wedding Bells 💒",
    description: "The day we became one. Surrounded by love, we promised forever. From that magical day forward, every sunrise brings new reasons to fall in love again.",
    color: "from-primary/30 to-destructive/30",
  },
  {
    year: "Now",
    title: "Forever Together 💕",
    description: "Four years of marriage, countless memories, and infinite love. From school sweethearts to life partners, our journey continues to be the greatest adventure.",
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
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Our Journey Unfolds
          </h2>
          <p className="text-xl text-muted-foreground">
            Scroll to relive every magical moment
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

                {/* Photo placeholder */}
                <div className="w-full md:w-5/12">
                  <div className="relative aspect-square rounded-3xl overflow-hidden romantic-glow group">
                    <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-40`} />
                    <div className="absolute inset-0 flex items-center justify-center text-center p-8 bg-background/40 backdrop-blur-sm group-hover:bg-background/20 transition-all duration-500">
                      <div className="space-y-4">
                        <div className="text-6xl animate-float">📸</div>
                        <p className="text-lg font-semibold text-foreground">
                          Add Your Photo Here
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Upload a memory from {section.year}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Final message */}
        <div className="mt-32 text-center space-y-6 animate-fade-in">
          <h3 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            To Many More Years of Love
          </h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Happy 4th Anniversary and Happy Birthday to the most amazing person in my life. 
            Here's to infinity and beyond together! 💕
          </p>
          <div className="text-6xl animate-float">💑</div>
        </div>
      </div>
    </div>
  );
};
