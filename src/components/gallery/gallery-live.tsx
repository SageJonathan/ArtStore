
import Image from "next/image";
import background from "../../../public/gallery.png";

export default function GalleryLive () {
    // mobile = 1 picture/ tablet=2/desktop=3
    return (
        <div className="w-full h-[calc(100vh-68px)]">
            <Image src={background} alt="gallery background" className="w-full h-full object-cover" />
        </div>
    );
}