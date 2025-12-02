"use client";
import { useState } from "react";
import Image from "next/image";
import ArtDetails from "@/components/modal/modal";
import type { ArtPiece } from '@prisma/client';
import Tag from "@/components/gallery/gallery-tag";


   
interface GalleryGridProps {
  paintings: ArtPiece[];
}

export default function GalleryGrid({ paintings }: GalleryGridProps) {
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

  if (!paintings) {
    return <div>Loading gallery...</div>;
  }
  const sortedPaintings = paintings.sort((a, b) => a.id - b.id);
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-rose-50/40 via-white to-rose-50/30">
      <Tag />
      <div className="relative min-h-screen flex flex-col justify-start gap-0 px-4 py-0 mt-10">
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0 w-full">
          {sortedPaintings.map((painting, index) => (
            <div
              key={index}
              className="w-full h-full overflow-hidden flex flex-col justify-center items-center cursor-pointer group transition-transform hover:scale-[1.02]"
              onClick={() => openModal(painting)}
            >
              <Image
                src={painting.imageUrlFront}
                alt={`Painting ${index + 1}`}
                width={painting.isVertical ? 240 : 500}
                height={320}
                className={`object-contain ${
                  painting.isVertical ? "sm:w-60 md:w-40" : "w-full"
                }`}
                priority
              />
              <div className="mt-5 text-left pb-40">
                <div className="bg-gradient-to-br from-gray-50 via-white to-rose-50/50 shadow-lg border border-rose-300/60 rounded-lg p-4 mx-auto w-full max-w-xs sm:max-w-md lg:max-w-lg hover:shadow-xl transition-all hover:border-rose-400/70">
                  <h3 className="text-base font-semibold mb-2 text-rose-900 font-playfair leading-tight">
                    {painting.title}
                  </h3>
                  <div className="flex justify-between items-center gap-4">
                    <p className="text-sm font-medium text-gray-800 font-merriweather">
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
