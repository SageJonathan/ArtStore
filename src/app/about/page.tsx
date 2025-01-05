"use client";

import { useState } from "react";
import Image from "next/image";
import exhibitionData from "@/data/exhibitions.json";

export default function AboutPage() {
  const [showMore, setShowMore] = useState(false);

  const handleToggle = () => setShowMore(!showMore);

  const exhibitionsWithDates = exhibitionData.filter((item) =>
    /(\d{4})/.test(item)
  );
  const exhibitionsWithoutDates = exhibitionData.filter(
    (item) => !/(\d{4})/.test(item)
  );

  return (
    <div
      className="p-6 max-w-7xl mx-auto w-screen"
    >
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow lg:w-1/2">
          <Image
            src="/painter1.png"
            alt="Artist"
            className="object-cover h-full w-full shadow-2xl"
            width={500}
            height={700}
            layout="intrinsic"
          />
        </div>

        <div className="flex flex-col lg:w-1/2">
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-2xl  font-playfair font-semibold text-gray-800 mb-3">
              Biography
            </h2>
            <div></div>
            <p className="text-gray-700 text-lg leading-relaxed font-merriweather">
              Hailing from Sainte-Sabine (Bellechasse, QC), Louise grew up in
              Estrie, where her love for nature deeply inspired her art.
              <span className="hidden lg:block">
                <br />
              </span>
              Through her work, she invites you to experience the emotions she
              passionately expresses on canvas.
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl md:text-3xl lg:text-2xl font-playfair  font-semibold text-gray-800 mb-3">
              About
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed font-merriweather">
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
      <div className="mt-12 flex flex-col lg:flex-row gap-8">
        <div className="flex flex-col lg:w-1/2 space-y-12">
          <div>
            <h2 className="text-2xl font-playfair font-semibold text-gray-800 md:text-3xl lg:text-2xl  ">
              Tutelage
            </h2>
            <div className="text-gray-700 space-y-3 mt-4">
              <p className="font-merriweather">
                <span className="font-semibold">1998 to 2009:</span> Painting
                course, studio workshop, and on-site painting
                <br />
                Professor Michel Duguay, Montreal (Quebec)
              </p>
              <p className="font-merriweather">
                <span className="font-semibold">1993:</span> Painting course,
                studio workshop
                <br />
                Professor Andree Goyette, Coaticook (Quebec)
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 md:text-3xl lg:text-2xl font-playfair ">
              Membership
            </h2>
            <div className="text-gray-700 space-y-3 mt-4 font-merriweather">
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
        <div className="lg:w-1/2">
          <Image
            src="/painter2.png"
            alt="Biography Artwork"
            className="object-cover w-full h-auto shadow-2xl"
            width={500}
            height={700}
            layout="intrinsic"
          />
        </div>
      </div>

      {/* Lower section */}
      <div className="flex justify-center items-center md:mt-8 bg-gray-100">
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center md:text-4xl lg:text-4xl font-playfair">
            Exhibitions & Symposiums
          </h2>
          <ul className="text-gray-700 list-disc pl-6 space-y-3 font-merriweather">
            {exhibitionsWithDates.map((exhibition, index) => (
              <li key={index}>{exhibition}</li>
            ))}
            {showMore &&
              exhibitionsWithoutDates.map((exhibition, index) => (
                <li key={index}>{exhibition}</li>
              ))}
          </ul>
          <button className="text-blue-500 mt-4" onClick={handleToggle}>
            {showMore ? "Show Less" : "Show More"}
          </button>
        </div>
      </div>
    </div>
  );
}
