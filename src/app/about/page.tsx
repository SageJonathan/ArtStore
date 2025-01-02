import Image from "next/image";

export default function AboutPage() {
  return (
    <div
      className="p-6 max-w-7xl mx-auto w-screen"
      style={{ backgroundImage: `url('/grid.png')` }}
    >
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow lg:w-1/2">
          <Image
            src="/Frame2.png"
            alt="Artist"
            className="object-cover h-full w-full shadow-2xl"
            width={500}
            height={700}
            layout="intrinsic"
          />
        </div>

        <div className="flex flex-col lg:w-1/2">
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-2xl font-semibold text-gray-800 mb-3">
              Biography
            </h2>
            <div>
              
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              Hailing from Sainte-Sabine (Bellechasse), Louise grew up in
              Estrie, where her love for nature deeply inspired her art.
              <span className="hidden lg:block">
                <br />
              </span>
              Through her work, she invites you to experience the emotions she
              passionately expresses on canvas.
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl md:text-3xl lg:text-2xl font-semibold text-gray-800 mb-3">About</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Her paintings evoke joy, nostalgia, and a serene sweetness, with
              each brushstroke revealing a romantic, heartfelt style.
              <span className="hidden lg:block">
                <br />
              </span>
              The subjects she captures invite emotion, lightness, and
              imagination, offering a tranquil harmony of light and color that
              delights the senses.
            </p>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="mt-12 flex flex-col space-y-12 lg:ml-12">
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
          <h2 className="text-2xl font-semibold text-gray-800 md:text-3xl lg:text-4xl">
            Mentorship
          </h2>
          <div className="text-gray-700 space-y-3">
            <p>
              <span className="font-semibold">1998 to 2009:</span> Painting
              course, studio workshop, and on-site painting
              <br />
              Professor Michel Duguay, Montreal (Quebec)
            </p>
            <p>
              <span className="font-semibold">1993:</span> Painting course,
              studio workshop
              <br />
              Professor Andree Goyette, Coaticook (Quebec)
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          <h2 className="text-2xl font-semibold text-gray-800 md:mb-0 md:text-3xl lg:text-4xl">
            Membership
          </h2>
          <div className="text-gray-700 space-y-3">
            <p>
              <span className="font-semibold">
                Member of A.P.A.S. (Associated Painters of Sherbrooke):
              </span>{" "}
              1998-2009
            </p>
            <p>
              <span className="font-semibold">
                Member of Coatic&apos;Art (Artist of the Ball of Coaticook):
              </span>{" "}
              2007-2009
            </p>
            <p>
              <span className="font-semibold">
                Member of the House of Arts of the Culture of Brompton:
              </span>{" "}
              2005-2006
            </p>
            <p>
              <span className="font-semibold">
                Member of the C.A.C. (Cultural Action Committee) Inc.
                Magog-Orford:
              </span>{" "}
              2000-2006
            </p>
          </div>
        </div>
      </div>

      {/* Lower section */}
      <div className="flex justify-center items-center md:mt-8">
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center md:text-4xl lg:text-5xl">
            Exhibitions
          </h2>
          <ul className="text-gray-700 list-disc pl-6 space-y-3">
            <li>
              Member of A.P.A.S. (Associated Painters of Sherbrooke) 1998-2009
            </li>
            <li>
              Member of Coatic&apos;Art: (Artist of the Ball of Coaticook)
              2007-2009
            </li>
            <li>
              Member of the House of Arts of the Culture of Brompton 2005-2006
            </li>
            <li>
              Member of the C.A.C. (Cultural Action Committee) Inc. Magog-Orford
              2000-2006
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
