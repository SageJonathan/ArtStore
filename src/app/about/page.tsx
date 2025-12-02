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
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full min-h-screen bg-gradient-to-b from-rose-50/30 via-white to-rose-50/20">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        <div className="flex-grow lg:w-1/2">
          <div className="rounded-xl overflow-hidden shadow-2xl border border-rose-200/30">
            <Image
              src="/painter1.png"
              alt="Artist"
              className="object-cover h-full w-full"
              width={500}
              height={700}
              layout="intrinsic"
            />
          </div>
        </div>

        <div className="flex flex-col lg:w-1/2 gap-8">
          <div className="bg-gradient-to-br from-white to-rose-50/30 rounded-lg p-6 shadow-lg border border-rose-200/50">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-rose-900 mb-4 pb-3 border-b border-rose-200/50">
              Biography
            </h2>
            <p className="text-gray-800 text-lg leading-relaxed font-merriweather">
              Hailing from Sainte-Sabine (Bellechasse, QC), Louise grew up in
              Estrie, where her love for nature deeply inspired her art.
              <span className="hidden lg:block">
                <br />
              </span>
              Through her work, she invites you to experience the emotions she
              passionately expresses on canvas.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white to-rose-50/30 rounded-lg p-6 shadow-lg border border-rose-200/50">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-rose-900 mb-4 pb-3 border-b border-rose-200/50">
              About
            </h2>
            <p className="text-gray-800 text-lg leading-relaxed font-merriweather">
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
      <div className="mt-12 flex flex-col lg:flex-row gap-8 mb-12">
        <div className="flex flex-col lg:w-1/2 space-y-8">
          <div className="bg-gradient-to-br from-white to-rose-50/30 rounded-lg p-6 shadow-lg border border-rose-200/50">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-rose-900 mb-4 pb-3 border-b border-rose-200/50">
              Tutelage
            </h2>
            <div className="text-gray-800 space-y-4 mt-4">
              <div className="bg-white/50 rounded-lg p-4 border border-rose-100">
                <p className="font-merriweather">
                  <span className="font-semibold text-rose-800">1998 to 2009:</span> Painting
                  course, studio workshop, and on-site painting
                  <br />
                  <span className="text-gray-600 italic">Professor Michel Duguay, Montreal (Quebec)</span>
                </p>
              </div>
              <div className="bg-white/50 rounded-lg p-4 border border-rose-100">
                <p className="font-merriweather">
                  <span className="font-semibold text-rose-800">1993:</span> Painting course,
                  studio workshop
                  <br />
                  <span className="text-gray-600 italic">Professor Andree Goyette, Coaticook (Quebec)</span>
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-white to-rose-50/30 rounded-lg p-6 shadow-lg border border-rose-200/50">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-rose-900 mb-4 pb-3 border-b border-rose-200/50">
              Membership
            </h2>
            <div className="text-gray-800 space-y-3 mt-4 font-merriweather">
              <div className="bg-white/50 rounded-lg p-3 border border-rose-100">
                <p>
                  <span className="font-semibold text-rose-800">
                    Member of A.P.A.S. (Associated Painters of Sherbrooke):
                  </span>{" "}
                  <span className="text-gray-600">1998-2009</span>
                </p>
              </div>
              <div className="bg-white/50 rounded-lg p-3 border border-rose-100">
                <p>
                  <span className="font-semibold text-rose-800">
                    Member of Coatic&apos;Art (Artist of the Ball of Coaticook):
                  </span>{" "}
                  <span className="text-gray-600">2007-2009</span>
                </p>
              </div>
              <div className="bg-white/50 rounded-lg p-3 border border-rose-100">
                <p>
                  <span className="font-semibold text-rose-800">
                    Member of the House of Arts of the Culture of Brompton:
                  </span>{" "}
                  <span className="text-gray-600">2005-2006</span>
                </p>
              </div>
              <div className="bg-white/50 rounded-lg p-3 border border-rose-100">
                <p>
                  <span className="font-semibold text-rose-800">
                    Member of the C.A.C. (Cultural Action Committee) Inc.
                    Magog-Orford:
                  </span>{" "}
                  <span className="text-gray-600">2000-2006</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="rounded-xl overflow-hidden shadow-2xl border border-rose-200/30">
            <Image
              src="/painter2.png"
              alt="Biography Artwork"
              className="object-cover w-full h-auto"
              width={500}
              height={700}
              layout="intrinsic"
            />
          </div>
        </div>
      </div>

      {/* Lower section */}
      <div className="flex justify-center items-center md:mt-8 mb-12">
        <div className="w-full max-w-4xl bg-gradient-to-br from-white to-rose-50/30 rounded-lg p-8 shadow-lg border border-rose-200/50">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-rose-900 mb-6 text-center pb-4 border-b border-rose-200/50">
            Exhibitions & Symposiums
          </h2>
          <ul className="text-gray-800 space-y-3 font-merriweather list-none">
            {exhibitionsWithDates.map((exhibition, index) => (
              <li key={index} className="bg-white/50 rounded-lg p-3 border border-rose-100 hover:bg-white/70 transition-colors">
                <span className="text-rose-600 font-semibold mr-2">•</span>
                {exhibition}
              </li>
            ))}
            {showMore &&
              exhibitionsWithoutDates.map((exhibition, index) => (
                <li key={index} className="bg-white/50 rounded-lg p-3 border border-rose-100 hover:bg-white/70 transition-colors">
                  <span className="text-rose-600 font-semibold mr-2">•</span>
                  {exhibition}
                </li>
              ))}
          </ul>
          <div className="flex justify-center mt-6">
            <button 
              className="text-rose-700 hover:text-rose-900 font-merriweather text-sm underline decoration-rose-300 hover:decoration-rose-500 transition-colors"
              onClick={handleToggle}
            >
              {showMore ? "Show Less" : "Show More"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
