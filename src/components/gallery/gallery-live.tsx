"use client";

import { useRef, useState } from "react";
import type { ArtPiece } from '@prisma/client';
import Image from "next/image";
import { useHorizontalScroll } from "@/utils/x-scroll";
import ArtDetails from "@/components/modal/modal";
import Tag from "@/components/gallery/gallery-tag";

interface GalleryGridProps {
  paintings: ArtPiece[];
}

export default function GalleryLive({ paintings }: GalleryGridProps) {
  const [modalOpen, setmodalOpen] = useState(false);
  const [selectedPainting, setSelectedPainting] = useState<ArtPiece | null>(
    null
  );

  // Modal logic
  const openModal = (painting: ArtPiece) => {
    if (!modalOpen && painting.inStock) {
      setSelectedPainting(painting);
      setmodalOpen(true);
    }
  };

  const onRequestClose = () => setmodalOpen(false);

  // Scroll logic
  const galleryRef = useRef<HTMLDivElement>(null);
  useHorizontalScroll(galleryRef);

  if (!paintings) {
    return;
    <div>Loading galery...</div>;
  } 
  const sortedPaintings = paintings.sort((a, b) => a.id - b.id);
    return (
      <div
        className="w-full h-[calc(100vh-70px)] bg-cover bg-center flex overflow-hidden"
        style={{ backgroundImage: `url('/gallery.png')` }}
      >
        <div
          ref={galleryRef}
          className="flex overflow-x-auto scrollbar-hidden w-full touch-pan-x snap-x lg:snap-none"
          style={{
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // Internet Explorer 10+
            WebkitOverflowScrolling: "touch", // iOS momentum scrolling
            scrollBehavior: "auto", // Use auto for immediate response, browser handles smoothness
            willChange: "scroll-position", // Optimize for scrolling performance
          }}
        >
          <div className="w-full h-full flex-shrink-0">
            <Tag />
          </div>
          {sortedPaintings.map((painting, index) => (
            <div
              key={index}
              className="painting-item w-full sm:w-auto md:min-w-[50%] lg:min-w-[33.33%] xl:min-w-[25%] h-full flex-shrink-0 snap-center p-2 flex justify-center flex-col items-center"
              onClick={() => openModal(painting)}
            >
              <div
                className={`w-full p-1 overflow-hidden h-96 flex relative 
                ${painting.isVertical ? "mr-2 ml-2" : ""}`}
              >
                <Image
                  src={painting.imageUrlFront}
                  alt={`Painting ${index + 1}`}
                  className={` w-full h-full mt-1 object-contain`}
                  width={800}
                  height={600}
                />
              </div>
              <div className="mt-5 text-left pb-40">
                <div className="bg-gradient-to-br from-white to-rose-50/30 shadow-lg border border-rose-200/50 rounded-lg p-4 mx-auto w-full max-w-xs sm:max-w-md lg:max-w-lg hover:shadow-xl transition-all hover:border-rose-300/50">
                  <h3 className="text-base font-semibold mb-2 text-rose-900 font-playfair leading-tight">
                    {painting.title}
                  </h3>
                  <div className="flex justify-between items-center gap-4">
                    <p className="text-sm font-medium text-gray-700 font-merriweather">
                      {painting.size}
                    </p>
                    {!painting.inStock && (
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold text-rose-800 bg-rose-100 border border-rose-200 ml-auto">
                        Sold
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Modal */}
        {modalOpen && selectedPainting &&(
          <ArtDetails
            key={selectedPainting?.title}
            isOpen={modalOpen}
            onRequestClose={onRequestClose}
            painting={selectedPainting}
          />
        )}
      </div>
    );
}
