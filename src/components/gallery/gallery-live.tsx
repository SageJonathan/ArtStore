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
                <div className="bg-white shadow-lg p-2 mx-auto w-full max-w-xs sm:max-w-md lg:max-w-lg">
                  <h3 className="text-m font-semibold mb-1 pb-1 pl-1 pr-2 pr-20 font-merriweather">
                    {painting.title}
                  </h3>
                  <div className="flex justify-between">
                    <p className="text-s font-medium text-gray-800 pl-1 font-merriweather">
                      {painting.size}
                    </p>
                    <p
                      className={`text-s font-medium text-red-800 bg-red-100 pr-1 pl-1 font-merriweather 
                ${!painting.inStock ? "inline" : "hidden"}`}
                    >
                      Sold
                    </p>
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
