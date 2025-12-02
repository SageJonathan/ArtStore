import { RefObject, useEffect } from "react";

export const useHorizontalScroll = (
  galleryRef: RefObject<HTMLDivElement | null>
) => {
  useEffect(() => {
    const currentGallery = galleryRef.current;
    if (!currentGallery) return;

    const handleWheel = (event: WheelEvent) => {
      if (!currentGallery) return;

      // Convert vertical scroll delta directly to horizontal scroll
      // This makes scrolling proportional and responsive to user input
      const scrollDelta = event.deltaY;

      // Apply scroll immediately for smooth, proportional scrolling
      // Modern browsers handle this efficiently
      currentGallery.scrollLeft += scrollDelta;

      // Prevent default vertical scrolling
      event.preventDefault();
    };

    // Add wheel event listener with passive: false to allow preventDefault
    currentGallery.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      if (currentGallery) {
        currentGallery.removeEventListener("wheel", handleWheel);
      }
    };
  }, [galleryRef]);

  return {};
};
