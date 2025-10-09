import { useState } from "react";
import Particles from "./ui/Particles";
import { Link } from "react-router-dom";
// Import each photo separately for reliable loading in React
import Picture1 from "@/assets/our-pics/image1.jpeg"; // Year 1
import Picture2 from "@/assets/our-pics/image2.jpeg"; // Year 2
import Picture3 from "@/assets/our-pics/image3.jpeg"; // Year 3
import Picture4 from "@/assets/our-pics/image4.jpeg"; // Year 4
import Picture5 from "@/assets/our-pics/image5.jpeg"; // Year 5
import Picture8 from "@/assets/our-pics/image8.jpeg"; // Extra
import Picture9 from "@/assets/our-pics/image9.jpeg"; // Extra
import Picture10 from "@/assets/our-pics/image10.jpeg"; // Extra
import Picture11 from "@/assets/our-pics/image11.jpeg"; // Extra
import Picture12 from "@/assets/our-pics/image12.jpeg"; // Extra  
import Picture13 from "@/assets/our-pics/image13.jpeg"; // Extra
import Picture14 from "@/assets/our-pics/image14.jpeg"; // Extra
import Picture15 from "@/assets/our-pics/image15.jpeg"; // Extra    
import Picture16 from "@/assets/our-pics/image16.jpeg"; // Extra
import Picture17 from "@/assets/our-pics/image17.jpeg"; // Extra
import Picture18 from "@/assets/our-pics/image18.jpeg"; // Extra
import Picture19 from "@/assets/our-pics/image19.jpeg"; // Extra  
import Picture20 from "@/assets/our-pics/image20.jpeg"; // Extra
import Picture21 from "@/assets/our-pics/image21.jpeg"; // Extra
import Picture22 from "@/assets/our-pics/image22.jpeg"; // Extra
import Picture23 from "@/assets/our-pics/image23.jpeg"; // Extra
import Picture24 from "@/assets/our-pics/image24.png"; // Year 4 Thumbnail for video
import Picture25 from "@/assets/our-pics/image25.png"; // Extra
import Picture26 from "@/assets/our-pics/image26.png"; // Extra
import Picture27 from "@/assets/our-pics/image27.png"; // Extra
import Picture28 from "@/assets/our-pics/image28.png"; // Extra
import Picture29 from "@/assets/our-pics/image29.png"; // Extra
import Picture30 from "@/assets/our-pics/image30.png"; // Extra

// Assuming some video assets; replace paths as needed
import Video1 from "@/assets/our-videos/WhatsApp Video 2025-10-08 at 11.32.27 AM.mp4"; // Example video 1
import Video2 from "@/assets/our-videos/WhatsApp Video 2025-10-08 at 11.33.30 AM.mp4";
import Video3 from "@/assets/our-videos/WhatsApp Video 2025-10-08 at 11.46.23 AM.mp4";
import Video4 from "@/assets/our-videos/WhatsApp Video 2025-10-08 at 11.47.06 AM.mp4";
import Video5 from "@/assets/our-videos/WhatsApp Video 2025-10-08 at 11.48.35 AM.mp4";
import Video6 from "@/assets/our-videos/WhatsApp Video 2025-10-08 at 11.48.43 AM.mp4";
import Video7 from "@/assets/our-videos/WhatsApp Video 2025-10-08 at 11.46.23 AM (1).mp4";

interface GalleryItem {
  id: string;
  type: "image" | "video";
  src: any; // Imported image or video module
  thumbnail?: any; // Optional thumbnail for videos
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
    title: "Our first meet at a marriage ✨",
    description: "After lots and lots of eagerness to meet each other, here we go (OUR FIRST MEET)!!.",
    color: "from-rose-400/20 to-pink-400/20",
  },
  {
    id: "2",
    type: "image",
    src: Picture2,
    year: "Year 2: Our First date ☔",
    title: "First meet at Hotel ☕",
    description: "Although we've become regular customers for this hotel, every visit feels like our first date ☕.",
    color: "from-pink-400/20 to-violet-400/20",
  },
  {
    id: "3",
    type: "image",
    src: Picture3,
    year: "Year 3: College Vows",
    title: "Dreams Shared, Hands Entwined 💍",
    description: "Look at you, smiling like an Angel.",
    color: "from-violet-400/20 to-indigo-400/20",
  },
  {
    id: "4",
    type: "video",
    src: Video1,
    thumbnail: Picture25, // Use a photo as thumbnail or provide actual
    year: "Year 4: Eternal Warmth",
    title: "Every Hug, A Forever Promise 🤍",
    description: "Your eyes still have the same magic they did the first time we met.",
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
    thumbnail: Picture26, // Use a photo as thumbnail
    year: "Now: Our Forever Chapter",
    title: "Bound by Love, Defined by Us 💫",
    description: "No timeline could ever capture how timeless you are to me.",
    color: "from-pink-400/20 to-violet-400/20",
  },
  {
    id: "7",
    type: "image",
    src: Picture8,
    year: "Forever & Always",
    title: "You, Me & Infinite Tomorrows 💖",
    description: "Every memory with you feels like my favorite story coming true.",
    color: "from-pink-400/20 to-violet-400/20",
  },
  {
    id: "8",
    type: "image",
    src: Picture9,
    year: "Special Moments",
    title: "Our Love Highlights 🎥",
    description: "Relive the magic of our vows in this heartfelt montage.",
    color: "from-pink-400/20 to-violet-400/20",
  },
  {
    id: "9",
    type: "image",
    src: Picture10,
    year: "Special Moments",
    title: "Our Love Highlights 🎥",
    description: "Relive the magic of our vows in this heartfelt montage.",
    color: "from-pink-400/20 to-violet-400/20",
  },
  {
    id: "11",
    type: "image",
    src: Picture11,
    year: "Special Moments",
    title: "Our Love Highlights 🎥",
    description: "Relive the magic of our vows in this heartfelt montage.",
    color: "from-pink-400/20 to-violet-400/20",
  },
  {
    id: "12",
    type: "image",
    src: Picture12,
    year: "Special Moments",
    title: "Our Love Highlights 🎥",
    description: "Relive the magic of our vows in this heartfelt montage.",
    color: "from-pink-400/20 to-violet-400/20",
  },
  {
    id: "13",
    type: "image",
    src: Picture13,
    year: "Special Moments",
    title: "Our Love Highlights 🎥",
    description: "Relive the magic of our vows in this heartfelt montage.",
    color: "from-pink-400/20 to-violet-400/20",
  },
  {
    id: "14",
    type: "image",
    src: Picture14,
    year: "Special Moments",
    title: "Our Love Highlights 🎥",
    description: "Relive the magic of our vows in this heartfelt montage.",
    color: "from-pink-400/20 to-violet-400/20",
  },
  {
    id: "15",
    type: "image",
    src: Picture15,
    year: "Special Moments",
    title: "Our Love Highlights 🎥",
    description: "Relive the magic of our vows in this heartfelt montage.",
    color: "from-pink-400/20 to-violet-400/20",
  },
  {
    id: "16",
    type: "image",
    src: Picture16,
    year: "Special Moments",
    title: "Our Love Highlights 🎥",
    description: "Relive the magic of our vows in this heartfelt montage.",
    color: "from-pink-400/20 to-violet-400/20",
  },
  {
    id: "17",
    type: "image",
    src: Picture17,
    year: "Special Moments",
    title: "Our Love Highlights 🎥",
    description: "Relive the magic of our vows in this heartfelt montage.",
    color: "from-pink-400/20 to-violet-400/20",
  },
  {
    id: "18",
    type: "image",
    src: Picture18,
    year: "Special Moments",
    title: "Our Love Highlights 🎥",
    description: "Relive the magic of our vows in this heartfelt montage.",
    color: "from-pink-400/20 to-violet-400/20",
  },
  {
    id: "19",
    type: "image",
    src: Picture19,
    year: "Special Moments",
    title: "Our Love Highlights 🎥",
    description: "Relive the magic of our vows in this heartfelt montage.",
    color: "from-pink-400/20 to-violet-400/20",
  },
  {
    id: "20",
    type: "image",
    src: Picture20,
    year: "Special Moments",
    title: "Our Love Highlights 🎥",
    description: "Relive the magic of our vows in this heartfelt montage.",
    color: "from-pink-400/20 to-violet-400/20",
  },
  {
    id: "21",
    type: "image",
    src: Picture21,
    year: "Special Moments",
    title: "Our Love Highlights 🎥",
    description: "Relive the magic of our vows in this heartfelt montage.",
    color: "from-pink-400/20 to-violet-400/20",
  },
  {
    id: "22",
    type: "image",
    src: Picture22,
    year: "Special Moments",
    title: "Our Love Highlights 🎥",
    description: "Relive the magic of our vows in this heartfelt montage.",
    color: "from-pink-400/20 to-violet-400/20",
  },
  {
    id: "23",
    type: "image",
    src: Picture23,
    year: "Special Moments",
    title: "Our Love Highlights 🎥",
    description: "Relive the magic of our vows in this heartfelt montage.",
    color: "from-pink-400/20 to-violet-400/20",
  },
  {
    id: "24",
    type: "video",
    src: Video3,
    thumbnail: Picture24, // Use a photo as thumbnail or provide actual
    year: "Year 4: Our Love Whispers",
    title: "Look at my cute Sandakaari! 💃",
    description: "Her complete innocence, captured in motion.",
    color: "from-indigo-400/20 to-rose-400/20",
  },
  {
    id: "25",
    type: "video",
    src: Video4,
    thumbnail: Picture28, // Use a photo as thumbnail
    year: "Special Moments",
    title: "Our Love Highlights 🎥",
    description: "Relive the magic of our vows in this heartfelt montage.",
    color: "from-pink-400/20 to-violet-400/20",
  },
  {
    id: "26",
    type: "video",
    src: Video5,
    thumbnail: Picture27, // Use a photo as thumbnail
    year: "Special Moments",
    title: "Our Love Highlights 🎥",
    description: "Relive the magic of our vows in this heartfelt montage.",
    color: "from-pink-400/20 to-violet-400/20",
  },
  {
    id: "27",
    type: "video",
    src: Video6,
    thumbnail: Picture29, // Use a photo as thumbnail
    year: "Special Moments",
    title: "Our Love Highlights 🎥",
    description: "Relive the magic of our vows in this heartfelt montage.",
    color: "from-pink-400/20 to-violet-400/20",
  },
  {
    id: "28",
    type: "video",
    src: Video7,
    thumbnail: Picture30, // Use a photo as thumbnail
    year: "Special Moments",
    title: "Our Love Highlights 🎥",
    description: "Relive the magic of our vows in this heartfelt montage.",
    color: "from-pink-400/20 to-violet-400/20",
  }
];

const Album = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'all' | 'photos' | 'videos'>('all');

  const filteredItems = galleryItems.filter(item => 
    viewMode === 'all' || 
    (viewMode === 'photos' && item.type === 'image') ||
    (viewMode === 'videos' && item.type === 'video')
  );

  const openModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // Helper to get src string for images/videos/thumbnails
  const getSrc = (media: any) => {
    if (typeof media === 'string') return media;
    return media?.src || media?.default || media;
  };

  return (
    <div className="relative min-h-screen py-12 sm:py-16 md:py-20 overflow-hidden bg-black">
      {/* Particles background - Mobile optimized */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Particles
          particleColors={['#ff69b4', '#ff1493']}
          particleCount={typeof window !== 'undefined' && window.innerWidth < 768 ? 200 : 600}
          particleSpread={15}
          speed={typeof window !== 'undefined' && window.innerWidth < 768 ? 0.03 : 0.05}
          particleBaseSize={typeof window !== 'undefined' && window.innerWidth < 768 ? 40 : 60}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>

      <div className="relative z-10 container mx-auto px-3 sm:px-4 md:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16 space-y-2 sm:space-y-3 md:space-y-4 px-2">
          <h2 
<<<<<<< HEAD
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 bg-clip-text text-transparent py-4"
=======
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 bg-clip-text text-transparent"
>>>>>>> 890693857de93646cedae33bede7146fb2c94d00
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Our Precious Memories
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white/80">
            A gallery of photos and videos capturing our journey 💕
          </p>

          {/* Toggle Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setViewMode('all')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                viewMode === 'all'
                  ? 'bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 text-white romantic-glow'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              All Memories
            </button>
            <button
              onClick={() => setViewMode('photos')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                viewMode === 'photos'
                  ? 'bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 text-white romantic-glow'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              Photos 📸
            </button>
            <button
              onClick={() => setViewMode('videos')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                viewMode === 'videos'
                  ? 'bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 text-white romantic-glow'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              Videos 🎥
            </button>
          </div>
        </div>

<<<<<<< HEAD
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {filteredItems.map((item) => (
=======
        {/* Gallery Grid - Mobile responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-7xl mx-auto">
          {galleryItems.map((item) => (
>>>>>>> 890693857de93646cedae33bede7146fb2c94d00
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer romantic-glow active:scale-95 sm:hover:scale-105 transition-all duration-500"
              onClick={() => openModal(item)}
            >
              {item.type === "image" ? (
                <img
                  src={getSrc(item.src)}
                  alt={item.title}
<<<<<<< HEAD
                  className="w-full h-72 md:h-96 object-cover rounded-2xl"
=======
                  className="w-full h-48 sm:h-56 md:h-64 lg:h-80 object-cover rounded-xl sm:rounded-2xl"
                  loading="lazy"
>>>>>>> 890693857de93646cedae33bede7146fb2c94d00
                />
              ) : (
                <video
                  src={getSrc(item.src)}
                  poster={getSrc(item.thumbnail)}
<<<<<<< HEAD
                  className="w-full h-72 md:h-96 object-cover rounded-2xl"
=======
                  className="w-full h-48 sm:h-56 md:h-64 lg:h-80 object-cover rounded-xl sm:rounded-2xl"
>>>>>>> 890693857de93646cedae33bede7146fb2c94d00
                  muted
                  preload="metadata"
                >
                  Your browser does not support the video tag.
                </video>
              )}
              {/* Overlay - Mobile optimized */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-3 sm:p-4 pointer-events-none">
                <div className="w-full">
                  <div className={`inline-block px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-gradient-to-r ${item.color} text-[10px] sm:text-xs font-bold text-white mb-1 sm:mb-2`}>
                    {item.year}
                  </div>
                  <h3 className="text-white font-semibold text-sm sm:text-base md:text-lg drop-shadow-md">{item.title}</h3>
                  <p className="text-white/80 text-xs sm:text-sm">{item.type === "video" ? "▶️ Video" : "📸 Photo"}</p>
                </div>
              </div>
              {/* Play icon - Mobile sized */}
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-white/20 rounded-full p-3 sm:p-4 text-white text-xl sm:text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    ▶️
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

<<<<<<< HEAD
        {/* Back to Home Button */}
        <div className="text-center pb-20 py-12">
          <Link to="/?skipIntro=true">
            <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 text-white font-bold text-lg rounded-full romantic-glow hover:scale-105 transition-all duration-300 cursor-pointer">
              Back to Our Journey 💕
            </div>
          </Link>
        </div>
=======
        {/* Back to Home Button - Mobile optimized */}
<div className="text-center pb-12 sm:pb-16 md:pb-20 mt-8 sm:mt-12 md:mt-16">
  <Link to="/?skipIntro=true">
    <div className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 min-h-[48px] bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 text-white font-bold text-base sm:text-lg rounded-full romantic-glow active:scale-95 sm:hover:scale-105 transition-all duration-300 cursor-pointer">
      Back to Our Journey 💕
    </div>
  </Link>
</div>
>>>>>>> 890693857de93646cedae33bede7146fb2c94d00
      </div>

      {/* Modal for full view - Mobile optimized */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-2 sm:p-4" onClick={closeModal}>
          <div className="relative w-full max-w-4xl max-h-full p-2 sm:p-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 text-white text-3xl sm:text-4xl hover:text-rose-400 transition-colors bg-black/50 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center"
            >
              ×
            </button>
            <div className="flex flex-col items-center space-y-3 sm:space-y-4">
              {selectedItem.type === "image" ? (
                <img
                  src={getSrc(selectedItem.src)}
                  alt={selectedItem.title}
                  className="max-w-full max-h-[70vh] sm:max-h-[80vh] object-contain rounded-xl sm:rounded-2xl romantic-glow"
                />
              ) : (
                <video
                  src={getSrc(selectedItem.src)}
                  poster={getSrc(selectedItem.thumbnail)}
                  controls
                  className="max-w-full max-h-[70vh] sm:max-h-[80vh] object-contain rounded-xl sm:rounded-2xl"
                  autoPlay
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
              )}
              <div className="text-center text-white space-y-1 sm:space-y-2 px-2">
                <div className={`inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r ${selectedItem.color} romantic-glow`}>
                  <span className="font-bold text-sm sm:text-base">{selectedItem.year}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">{selectedItem.title}</h3>
                <p className="text-sm sm:text-base text-white/80 max-w-xs sm:max-w-md md:max-w-2xl leading-relaxed">{selectedItem.description}</p>
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