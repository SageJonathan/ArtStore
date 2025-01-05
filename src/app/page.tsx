
import { cookies } from "next/headers"; 
import { GalleryToggle } from "@/components/gallery/gallery-toggle"; 
import GalleryLive from '@/components/gallery/gallery-live';
import GalleryGrid from '@/components/gallery/gallery-grid';

export default async function HomePage() {
  const cookieStore = cookies();
  const displayMode = (await cookieStore).get("displayMode")?.value || "gallery"; 

  const isGrid = displayMode === "grid"; 
  
  return (
    <div>
      <GalleryToggle isGrid={isGrid} />
      {isGrid ? (
          <div>
            <GalleryGrid/>
          </div>
        ) : (
          <div>
            <GalleryLive/>
          </div>
        )}
      </div>
  
  );
}
