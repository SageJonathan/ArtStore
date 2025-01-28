"use client";
import { useState } from "react";
import Image from "next/image";
import ArtDetails from "@/components/modal/modal";
import type { ArtPiece } from '@prisma/client';
import Tag from "@/components/gallery/gallery-tag";


interface Painting extends ArtPiece {
}

interface GalleryGridProps {
  paintings: Painting[];
}

export default function GalleryGrid({ paintings }: GalleryGridProps) {
  const [modalOpen, setmodalOpen] = useState(false);
  const [selectedPainting, setSelectedPainting] = useState<Painting | null>(
    null
  );

  // Modal logic
  const openModal = (painting: Painting) => {
    if (!modalOpen && painting.inStock) {
      setSelectedPainting(painting);
      setmodalOpen(true);
    }
  };

  const onRequestClose = () => setmodalOpen(false);

  if (!paintings) {
    return <div>Loading gallery...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-center bg-gray-200">
      <Tag />
      <div className="relative min-h-screen flex flex-col justify-start gap-0 px-4 py-0 mt-10">
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0 w-full">
          {paintings.map((painting, index) => (
            <div
              key={index}
              className="w-full h-full overflow-hidden flex flex-col justify-center items-center"
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
              <div className="mt-5 text-left pb-20 md:pb-40">
                <div className="bg-white shadow-lg p-2 mx-auto w-full max-w-xs sm:max-w-md lg:max-w-lg">
                  <h3 className="text-sm font-semibold mb-1 pb-1 pl-1 pr-2 pr-20 font-merriweather">
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
