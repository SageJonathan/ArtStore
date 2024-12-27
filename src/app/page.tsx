
import { cookies } from "next/headers"; 
import { GalleryToggle } from "@/components/gallery/gallery-toggle"; 

export default async function HomePage() {
  const cookieStore = cookies();
  const displayMode = (await cookieStore).get("displayMode")?.value || "gallery"; 

  const isGrid = displayMode === "grid"; 

  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      <GalleryToggle isGrid={isGrid} />
      {isGrid ? (
          <div>
            <h1>I AM GRID</h1>
          </div>
        ) : (
          <div>
            <h1>I AM GALLERY</h1>
          </div>
        )}
      </div>
  
  );
}
