import { displayArt} from '@/app/db/queries/art';
import Image from 'next/image';
import Tag from "@/components/gallery/gallery-tag";

interface Painting {
  imageUrlFront: string
   title: string 
   size: string
  isVertical: boolean
  inStock: boolean
}

export default async function GalleryGrid({imageUrlFront,title,size,isVertical,inStock}:Painting) {


  const paintings= await displayArt ();
  
  if (!paintings){
    return
    <div>Loading galery...</div>
  }
 else 
  return (
<div
  className="w-full min-h-screen bg-center pt-10 bg-gray-100"
>
  <div className="">
    <Tag/>
  </div>
  {/* Gallery Container */}
  <div className="relative min-h-screen flex flex-col justify-start gap-0 px-4 py-0 mt-10">
    {/* Gallery Grid */}

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0 w-full">
      {paintings.map((painting, index) => (
        <div
          key={index}
          className="w-full h-full overflow-hidden flex flex-col justify-center items-center"
        >
          <Image
            src={painting.imageUrlFront}
            alt={`Painting ${index + 1}`}
            width={painting.isVertical? 240 : 500}
            height={320} 
            className={`object-contain ${
              painting.imageUrlFront === "/art1.png" || painting.imageUrlFront === "/art14.png"
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
                  {painting.size}
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



