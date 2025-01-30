import * as actions from '@/actions';
import { GalleryToggle } from "@/components/gallery/gallery-toggle"; 
import GalleryLive from '@/components/gallery/gallery-live';
import GalleryGrid from '@/components/gallery/gallery-grid';

export default async function HomePage() {
  const paintings = await actions.paintingsData();
  const displayMode = await actions.displayHomeWithCookies(); 
  const isGrid = displayMode === "grid";

  return (
    <div>
      <GalleryToggle isGrid={isGrid} />
      {isGrid ? <GalleryGrid paintings={paintings} /> : <GalleryLive paintings={paintings} />}
    </div>
  );
}
