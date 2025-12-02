import Link from "next/link";

export default function Nav() {
  return (
    <div className="flex flex-row justify-between items-end p-4 relative bg-gradient-to-r from-rose-50 via-pink-50/80 to-rose-50 border-b-2 border-rose-200/30 shadow-sm">
      {/* Floral accent - positioned on the right side */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-64 opacity-20 pointer-events-none bg-no-repeat bg-contain bg-right"
        style={{ backgroundImage: `url('/flowers.webp')` }}
      ></div>
      
      <div className="relative z-10">
        <Link href="/">
          <h1 className="text-rose-900 text-3xl font-bold ml-3 font-playfair flex flex-col sm:flex-row hover:text-rose-700 transition-colors drop-shadow-sm">
            Louise
            <span className="sm:ml-2">Guay</span>
          </h1>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-8 sm:mr-3 sm:items-end relative z-10">
        <div>
          <Link href="/">
            <h3 className="text-rose-800 text-2xl font-playfair cursor-pointer hover:text-rose-600 hover:underline transition-colors drop-shadow-sm">
              Works
            </h3>
          </Link>
        </div>
        <div>
          <Link href="/about">
            <h3 className="text-rose-800 text-2xl font-playfair cursor-pointer hover:text-rose-600 hover:underline transition-colors drop-shadow-sm">
              About
            </h3>
          </Link>
        </div>
      </div>
    </div>
  );
}
