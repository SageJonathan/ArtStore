import Link from "next/link";

export default function Nav() {
  return (
    <div className="flex flex-row justify-between items-end bg-slate p-4">
      <div>
        <Link href="/">
          <h1 className="text-black text-3xl font-bold ml-3 font-playfair flex flex-col sm:flex-row">
            Louise
            <span className="sm:ml-2">Guay</span>
          </h1>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-8  sm:mr-3 sm:items-end">
        <div>
          <Link href="/">
            <h3 className="text-black text-2xl font-playfair cursor-pointer hover:underline">
             Works
            </h3>
          </Link>
        </div>
        <div>
          <Link href="/about">
            <h3 className="text-black text-2xl font-playfair cursor-pointer hover:underline">
            About
            </h3>
          </Link>
        </div>
      </div>
    </div>
  );
}
