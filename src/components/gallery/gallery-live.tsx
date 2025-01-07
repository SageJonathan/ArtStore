"use client";

// Endsure pictures load on initial load
import {useRef } from "react";
import Image from "next/image";
import { useHorizontalScroll } from "@/utils/x-scroll";
import Tag from "@/components/gallery/gallery-tag";

interface Painting {
  imageUrlFront: string
   title: string 
   size: string
  isVertical: boolean
  inStock: boolean
}
interface GalleryGridProps {
  paintings: Painting[]; 
}

export default function GalleryLive({ paintings }: GalleryGridProps) {
  const galleryRef = useRef<HTMLDivElement>(null);
  useHorizontalScroll(galleryRef);
  
  if (!paintings){
    return
    <div>Loading galery...</div>
  }
 else 
  return (
    <div
      className="w-full h-[calc(100vh-70px)] bg-cover bg-center flex pb-20 overflow-hidden"
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
        <div className="w-full h-full flex-shrink-0 mt-10 md:mt-20">
          <Tag /> 
      </div>
        {paintings.map((painting, index) => (
          <div
            key={index}
            className="painting-item w-full sm:w-auto md:min-w-[50%] lg:min-w-[33.33%] xl:min-w-[25%] h-full flex-shrink-0 snap-center p-2 flex justify-center flex-col items-center"
          >
            <div
              className={`w-full p-1 overflow-hidden h-96 flex relative ${
                painting.isVertical ? "mr-2 ml-2" : ""
              }`}
            >
              <Image
                src={painting.imageUrlFront}
                alt={`Painting ${index + 1}`}
                className={`w-full h-full mt-1 object-contain `}
                width={800}
                height={600}
              />
            </div>
            <div className="mt-5 text-left pb-40">
              <div className="bg-white shadow-lg p-2 mx-auto w-full max-w-xs sm:max-w-md lg:max-w-lg">
                <h3 className="text-sm font-semibold mb-1 pb-1 pl-1 pr-2 pr-20 font-merriweather">
                  {painting.title}
                </h3>
                <p className="text-xs font-medium text-gray-800 pl-1 font-merriweather">
                  {painting.size}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
