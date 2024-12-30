// TODO: Mobile scroll bug/ Mobile styles/ DB fetching/ Add Modlal / Add white banner/ map data in banner

"use client"

import { useState, useEffect, useRef } from "react";
import { useHorizontalScroll } from "@/utils/infinte-x-scroll";

export default function GalleryLive() {
  const [paintings, setPaintings] = useState<string[]>([]);
  const galleryRef = useRef<HTMLDivElement>(null);

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

  useHorizontalScroll(galleryRef, paintings.length,0.5);

  //Logic to apply custom CSS to vertical paintings
  useEffect(() => {
    const applyCloningStyles = () => {
      const currentGallery = galleryRef.current;

      if (currentGallery) {
        const items = currentGallery.children;
        Array.from(items).forEach((item) => {
          const element = item as HTMLElement;
          const img = element.querySelector("img");
          if (img) {
            if (img && (img.src.includes("/art1.png") || img.src.includes("/art14.png"))) {
              img.classList.add("w-[80%]", "h-[80%]", "object-contain");
            } else {
              img.classList.add("object-cover");
            }
          }
        });
      }
    };
    applyCloningStyles();

  }, [paintings]); 

  return (
    <div
      className="relative w-full h-[calc(100vh-68px)] bg-cover bg-center"
      style={{ backgroundImage: `url('/gallery.png')` }}
    >
      {/* Painting Gallery */}
      <div
        ref={galleryRef}
        className="flex overflow-x-scroll snap-x snap-mandatory scrollbar-hidden w-full"
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // Internet Explorer 10+
        }}
      >
        {paintings.map((painting, index) => (
          <div
            key={index}
            className="min-w-[100%] md:min-w-[50%] lg:min-w-[33.33%] h-full flex-shrink-0 snap-center p-2 flex justify-center"
          >
            <div
              className={`w-full ${
                //Update logic for db
                painting === "/art1.png" || painting === "/art14.png"
                  ? "h-96" 
                  : "h-80"
              } overflow-hidden flex justify-center items-center`}
            >
              <img
                src={painting}
                alt={`Painting ${index + 1}`}
                className={`w-full h-full object-contain ${
                  painting === "/art1.png" || painting === "/art14.png"
                    ? "w-[80%] h-[80%]" 
                    : "object-cover"
                }`}
              />
            </div>
          </div>
        ))}
      </div>
      {/* Need to add a map for picture label elements */}
    </div>
  );
}
