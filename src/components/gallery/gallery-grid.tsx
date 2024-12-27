
import Image from "next/image";
import background from "../../../public/grid.jpg";

export default function GalleryGrid () {
    return (
        <div className="w-full h-[calc(100vh-68px)]">
        <Image src={background} alt="gallery background" className="w-full h-full object-cover" />
    </div>
    );
}
