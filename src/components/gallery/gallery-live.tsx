"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useHorizontalScroll } from "@/utils/infinte-x-scroll";

interface Painting {
  src: string;
  title: string;
  dimensions: string;
  price: string;
}


export default function GalleryLive() {
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Dummy data -- later needs to come from DB
  useEffect(() => {
    const paintingData = [
      {
        src: "/art2.png",
        title: "Mountain Retreat",
        dimensions: "50 x 70cm",
        price: "$700",
      },
      {
        src: "/art3.png",
        title: "Sunny Beach",
        dimensions: "40 x 50cm",
        price: "$400",
      },
      {
        src: "/art4.png",
        title: "Forest View",
        dimensions: "60 x 80cm",
        price: "$900",
      },
      {
        src: "/art5.png",
        title: "Cityscape",
        dimensions: "30 x 30cm",
        price: "$300",
      },
      {
        src: "/art6.png",
        title: "Night Sky",
        dimensions: "80 x 100cm",
        price: "$1200",
      },
      {
        src: "/art7.png",
        title: "Abstract Colors",
        dimensions: "40 x 40cm",
        price: "$350",
      },
      {
        src: "/art8.png",
        title: "Golden Horizon",
        dimensions: "60 x 90cm",
        price: "$850",
      },
      {
        src: "/art9.png",
        title: "Ocean Breeze",
        dimensions: "50 x 60cm",
        price: "$750",
      },
      {
        src: "/art10.png",
        title: "Silent River",
        dimensions: "45 x 55cm",
        price: "$600",
      },
      {
        src: "/art11.png",
        title: "Waves of Time",
        dimensions: "70 x 80cm",
        price: "$950",
      },
      {
        src: "/art12.png",
        title: "Autumn Path",
        dimensions: "40 x 60cm",
        price: "$650",
      },
      {
        src: "/art13.png",
        title: "Mountain Peaks",
        dimensions: "30 x 40cm",
        price: "$500",
      },
      {
        src: "/art14.png",
        title: "The Quiet Lake",
        dimensions: "50 x 70cm",
        price: "$700",
      },
      {
        src: "/art1.png",
        title: "House With River",
        dimensions: "30 x 40cm",
        price: "$500",
      },
    ];
    setPaintings(paintingData);
  }, []);

  useHorizontalScroll(galleryRef, paintings.length, 0.5);
return (
<div
      className="w-full h-[calc(100vh-70px)] bg-cover bg-center flex pb-20 overflow-hidden"
      style={{ backgroundImage: `url('/gallery.png')` }}
    >
      {/* Painting Gallery */}
      <div
        ref={galleryRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hidden w-full touch-pan-x"
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // Internet Explorer 10+
        }}
      >
        {paintings.map((painting, index) => (
          <div
            key={index}
            className="w-full sm:w-auto md:min-w-[50%] lg:min-w-[33.33%] xl:min-w-[25%] h-full flex-shrink-0 snap-center p-2 flex justify-center flex-col items-center"
          >
            <div
            // Update to boolean db check
              className={`w-full p-1 overflow-hidden h-96 flex flex relative ${painting.src === 'art1.png' || painting.src === 'art14.png' ? 'mr-2 ml-2' : ''}`}
            >
              <Image
                src={painting.src}
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
                  {painting.dimensions}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
);
};




