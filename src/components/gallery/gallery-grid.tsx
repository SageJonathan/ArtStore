//TODO: Update ternary to use db logic property

"use client";

import { useEffect, useState } from "react";

export default function GalleryGrid() {
  const [paintings, setPaintings] = useState<string[]>([]);

  // Dummy data -- later needs to come from DB
  useEffect(() => {
    const paintingImages = [
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

  return (
    <div
      className="w-full min-h-screen bg-center"
      style={{ backgroundImage: `url('/grid.jpg')` }}
    >
      {/* Gallery Container */}
      <div className="relative min-h-screen flex flex-col justify-start gap-0 px-4 py-0">
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0 w-full">
          {paintings.map((painting, index) => (
            <div
              key={index}
              className="w-full h-80 overflow-hidden flex justify-center items-center"
            >
              <img
                src={painting}
                alt={`Painting ${index + 1}`}
                className={`object-contain h-full ${
                  //Update logic for db 
                  painting === "/art1.png" || painting === "/art14.png"
                    ? " sm:w-60 md:w-40"
                    : "w-full"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
