import Link from "next/link";

export default function Nav() {
  return (
    <div className="flex flex-row justify-between items-end bg-slate p-4">
      <div>
        <h1 className="text-black text-3xl font-bold ml-3 font-playfair">
          Louise Guay
        </h1>
      </div>

      {/* Navigation Section */}
      <div className="flex flex-row space-x-8 mr-3 items-end">
        <div>
          <Link href="/about">
            <h3 className="text-black text-2xl font-playfair cursor-pointer hover:underline">
              About
            </h3>
          </Link>
        </div>
        <div>
          <Link href="/">
            <h3 className="text-black text-2xl font-playfair cursor-pointer hover:underline">
              Works
            </h3>
          </Link>
        </div>
        <div>
          <Link href="/cart">
            <h3 className="text-black text-2xl font-playfair cursor-pointer hover:underline">
              Cart
            </h3>
          </Link>
        </div>
      </div>
    </div>
  );
}
