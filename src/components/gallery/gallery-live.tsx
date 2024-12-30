"use client";

import { useState, useEffect, useRef } from "react";
import { useHorizontalScroll } from "@/utils/infinte-x-scroll";

export default function GalleryLive() {
  const [paintings, setPaintings] = useState<string[]>([]);
  const galleryRef = useRef<HTMLDivElement>(null);

// Dummy data-- later needs to come from db
  useEffect(() => {
    const paintingImages = [
        //1 & 14 formatting erros cause axis 
      "/art1.png",
      "/art2.png",
      "/art3.png",
      "/art4.png",
      "/art5.png",
      "/art6.png",
      "/art7.png",
      "/art8.png",
      "/art9.png",
      "/art10.png",
      "/art11.png",
      "/art12.png",
      "/art13.png",
      "/art14.png",
    ];
    setPaintings(paintingImages);
  }, []);

  const { handleScroll } = useHorizontalScroll(galleryRef,paintings.length, 0.3);

  return (
  <div
      className="relative w-full h-[calc(100vh-68px)] bg-cover bg-center"
      style={{ backgroundImage: `url('/gallery.png')` }}
    >
      {/* Scroll Buttons */}
      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white rounded-full p-2 z-10 hover:bg-gray-700"
        onClick={() => handleScroll("left")}
        aria-label="Scroll Left"
      >
        {"<"}
      </button>
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white rounded-full p-2 z-10 hover:bg-gray-700"
        onClick={() => handleScroll("right")}
        aria-label="Scroll Right"
      >
        {">"}
      </button>

      {/* Painting Gallery */}
      <div
        ref={galleryRef}
        className="flex overflow-x-scroll snap-x snap-mandatory scrollbar-none w-full"
      >
        {paintings.map((painting, index) => (
          <div
            key={index}
            className="min-w-[100%] md:min-w-[50%] lg:min-w-[33.33%] h-full flex-shrink-0 snap-center p-2"
          >
            <div className="w-full h-80 overflow-hidden">
              <img
                src={painting}
                alt={`Painting ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      {/* Need to add a map for picture label elements */}
    </div>
  );
}


