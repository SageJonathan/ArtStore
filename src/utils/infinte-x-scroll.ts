// TODO: Mobile scroll bug

import { RefObject, useEffect } from "react";

export const useHorizontalScroll = (
  galleryRef: RefObject<HTMLDivElement | null>,
  itemCount: number,
  scrollSpeed: number = 0.5
) => {
  const handleScroll = (direction: "left" | "right") => {
    if (galleryRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = galleryRef.current;
      const scrollAmount = clientWidth * scrollSpeed

      if (direction === "right") {
        galleryRef.current.scrollTo({
          left: scrollLeft + scrollAmount,
          behavior: "smooth",
        });

        if (scrollLeft + clientWidth >= scrollWidth - clientWidth) {
          setTimeout(() => {
            galleryRef.current?.scrollTo({
              left: 0,
              behavior: "auto",
            });
          }, 300);
        }
      } else {
        galleryRef.current.scrollTo({
          left: scrollLeft - scrollAmount,
          behavior: "smooth",
        });

        if (scrollLeft <= 0) {
          setTimeout(() => {
            galleryRef.current?.scrollTo({
              left: scrollWidth - clientWidth,
              behavior: "auto",
            });
          }, 300);
        }
      }
    }
  };

  const handleWheel = (event: WheelEvent) => {
    if (galleryRef.current) {
      const direction = event.deltaY > 0 ? "left" : "right";
      handleScroll(direction);
      event.preventDefault();
    }
  };

  useEffect(() => {
    const currentGallery = galleryRef.current;

    if (currentGallery) {
      const items = currentGallery.children;
      for (let i = 0; i < itemCount; i++) {
        const clone = items[i].cloneNode(true) as HTMLElement;
        currentGallery.appendChild(clone);
      }
    }

    if (currentGallery) {
      currentGallery.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (currentGallery) {
        currentGallery.removeEventListener("wheel", handleWheel);
      }
    };
  }, [galleryRef, itemCount]);

  return { handleScroll };
};
