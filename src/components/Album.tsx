import { useState } from "react";
import Particles from "./ui/Particles";
// Import each photo separately for reliable loading in React
import Picture1 from "@/assets/our-pics/image1.jpeg"; // Year 1
import Picture2 from "@/assets/our-pics/image2.jpeg"; // Year 2
import Picture3 from "@/assets/our-pics/image3.jpeg"; // Year 3
import Picture4 from "@/assets/our-pics/image4.jpeg"; // Year 4
import Picture5 from "@/assets/our-pics/image5.jpeg"; // Year 5

// Assuming some video assets; replace paths as needed
import Video1 from "@/assets/our-videos/SIH.pptx.mp4"; // Example video 1
import Video2 from "@/assets/our-videos/lv_0_20250927142737 (1).mp4"; // Example video 2

interface GalleryItem {
  id: string;
  type: "image" | "video";
  src: any; // Imported image or video module
  thumbnail?: string; // Optional thumbnail for videos
  year: string;
  title: string;
  description: string;
  color: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: "1",
    type: "image",
    src: Picture1,
    year: "Year 1: 10th Std Sparks",
    title: "Butterflies in the Hallways ✨",
    description: "It began with a glance across the classroom, hearts fluttering like autumn leaves in October wind.",
    color: "from-rose-400/20 to-pink-400/20",
  },
  {
    id: "2",
    type: "image",
    src: Picture2,
    year: "Year 2: Whispers & Promises",
    title: "Rainy Confessions Under Stars 💭",
    description: "Secret notes folded in palms, promises sealed in rainy Octobers.",
    color: "from-pink-400/20 to-violet-400/20",
  },
  {
    id: "3",
    type: "image",
    src: Picture3,
    year: "Year 3: College Vows",
    title: "Dreams Shared, Hands Entwined 💍",
    description: "Campus paths trodden together, futures painted in shared dreams.",
    color: "from-violet-400/20 to-indigo-400/20",
  },
  {
    id: "4",
    type: "video",
    src: Video1,
    thumbnail: Picture4, // Use a photo as thumbnail or provide actual
    year: "Year 4: Wedding Whispers",
    title: "Anniversary Dance 💃",
    description: "Our first dance under the stars, captured in motion.",
    color: "from-indigo-400/20 to-rose-400/20",
  },
  {
    id: "5",
    type: "image",
    src: Picture5,
    year: "Now: Four Eternal Years",
    title: "Our Infinite October Love 💕",
    description: "Four years of sunrises shared, storms weathered hand in hand.",
    color: "from-rose-400/20 to-pink-400/20",
  },
  {
    id: "6",
    type: "video",
    src: Video2,
    thumbnail: Picture3, // Use a photo as thumbnail
    year: "Special Moments",
    title: "Wedding Highlights 🎥",
    description: "Relive the magic of our vows in this heartfelt montage.",
    color: "from-pink-400/20 to-violet-400/20",
  },
];

const Album = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="relative min-h-screen py-20 overflow-hidden bg-black">
      {/* Particles background */}
      <div className="fixed inset-0 z-0">
        <Particles
          particleColors={['#ff69b4', '#ff1493']}
          particleCount={600}
          particleSpread={15}
          speed={0.05}
          particleBaseSize={60}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 bg-clip-text text-transparent"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Our Precious Memories
          </h2>
          <p className="text-2xl text-white/80">
            A gallery of photos and videos capturing our journey 💕
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl cursor-pointer romantic-glow hover:scale-105 transition-all duration-500"
              onClick={() => openModal(item)}
            >
              {item.type === "image" ? (
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-64 md:h-80 object-cover rounded-2xl"
                />
              ) : (
                <video
                  src={item.src}
                  poster={item.thumbnail}
                  className="w-full h-64 md:h-80 object-cover rounded-2xl"
                  muted
                >
                  Your browser does not support the video tag.
                </video>
              )}
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-4">
                <div className="w-full">
                  <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${item.color} text-xs font-bold text-white mb-2`}>
                    {item.year}
                  </div>
                  <h3 className="text-white font-semibold text-lg drop-shadow-md">{item.title}</h3>
                  <p className="text-white/80 text-sm">{item.type === "video" ? "▶️ Video" : "📸 Photo"}</p>
                </div>
              </div>
              {/* Play icon for videos */}
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/20 rounded-full p-4 text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    ▶️
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal for full view */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90" onClick={closeModal}>
          <div className="relative max-w-4xl max-h-full p-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-3xl hover:text-rose-400 transition-colors"
            >
              ×
            </button>
            <div className="flex flex-col items-center space-y-4">
              {selectedItem.type === "image" ? (
                <img
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  className="max-w-full max-h-[80vh] object-contain rounded-2xl romantic-glow"
                />
              ) : (
                <video
                  src={selectedItem.src}
                  poster={selectedItem.thumbnail}
                  controls
                  className="max-w-full max-h-[80vh] object-contain rounded-2xl"
                  autoPlay
                >
                  Your browser does not support the video tag.
                </video>
              )}
              <div className="text-center text-white space-y-2">
                <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${selectedItem.color} romantic-glow`}>
                  <span className="font-bold">{selectedItem.year}</span>
                </div>
                <h3 className="text-2xl font-bold">{selectedItem.title}</h3>
                <p className="text-white/80 max-w-2xl leading-relaxed">{selectedItem.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .romantic-glow {
          box-shadow: 0 0 20px rgba(255, 105, 180, 0.3);
        }
      `}</style>
    </div>
  );
};

export default Album;