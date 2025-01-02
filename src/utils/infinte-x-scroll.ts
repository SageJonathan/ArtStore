import { RefObject, useEffect } from "react";

export const useHorizontalScroll = (
  galleryRef: RefObject<HTMLDivElement | null>
) => {
  const handleScroll = (direction: "left" | "right") => {
    if (galleryRef.current) {
      const { scrollLeft, clientWidth } = galleryRef.current;

      const firstItem = galleryRef.current.querySelector(".painting-item");
      const itemWidth = firstItem ? firstItem.clientWidth : 0;
      const scrollAmount = itemWidth > 0 ? itemWidth : clientWidth / 3;

      galleryRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
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
      currentGallery.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (currentGallery) {
        currentGallery.removeEventListener("wheel", handleWheel);
      }
    };
  }, [galleryRef]);

  return { handleScroll };
};
