//TODO: Update ternary to use db logic property
// Update props to server servce and db

"use client";

import { useEffect, useState } from "react";
import Image from 'next/image';


interface Painting {
  src: string;
  title: string;
  dimensions: string;
  price: string;
}

export default function GalleryGrid() {
 const [paintings, setPaintings] = useState<Painting[]>([]);

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

  return (
<div
  className="w-full min-h-screen bg-center pt-10"
  style={{ backgroundImage: `url('/grid.jpg')` }}
>
  {/* Gallery Container */}
  <div className="relative min-h-screen flex flex-col justify-start gap-0 px-4 py-0">
    {/* Gallery Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0 w-full">
      {paintings.map((painting, index) => (
        <div
          key={index}
          className="w-full h-full overflow-hidden flex flex-col justify-center items-center"
        >
          <Image
            src={painting.src}
            alt={`Painting ${index + 1}`}
            width={painting.src === "/art1.png" || painting.src === "/art14.png" ? 240 : 500}
            height={320} 
            className={`object-contain ${
              painting.src === "/art1.png" || painting.src === "/art14.png"
                ? "sm:w-60 md:w-40"
                : "w-full"
            }`}
          />
             <div className="mt-5 text-left pb-20 md:pb-40">
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
</div>
  );
}