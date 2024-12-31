import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto w-screen"
    style={{ backgroundImage: `url('/grid.png')`,
        
    }}>
      {/* Artist's Info Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
        {/* Artist Image */}
        <div className="flex-shrink-0">
          <Image
            src="/Frame2.png"
            alt="Artist"
            className="object-contain rounded-full md:rounded-lg shadow-xl"
            width={192}
            height={192}
            layout="intrinsic"
          />
        </div>

        {/* Biography Section */}
        <div className="flex-1 md:pl-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Biography</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Native of Sainte-Sabine (Bellechasse), Louise established herself in
            Estrie from her childhood.
            <br />
            <br />
            Sensitive to the beauty of nature, this artist has a deep desire to
            share with you the emotions she feels through her art.
          </p>
        </div>
      </div>

      {/* About Art Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">About the Art</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Joy, nostalgia, and sweetness emerge when contemplating her
          paintings. Her unique brushstroke reveals a romantic style that
          touches the heart.
          <br />
          <br />
          The subjects she paints gently capture our emotions, inviting
          lightness and allowing room for dreams and imagination. Her works
          exude a joyful tranquility where the subtle harmony of light and
          color delights the senses.
        </p>
      </div>

      {/* Artistic Education Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Artistic Education</h2>
        <ul className="text-gray-700 list-disc pl-6 space-y-3">
          <li>
            <span className="font-semibold">1998 to 2009:</span> Painting course, studio workshop, and on-site painting
            <br />
            Professor Michel Duguay, Montreal (Quebec)
          </li>
          <li>
            <span className="font-semibold">1993:</span> Painting course, studio workshop
            <br />
            Professor Andree Goyette, Coaticook (Quebec)
          </li>
        </ul>
      </div>

      {/* Membership Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Membership</h2>
        <ul className="text-gray-700 list-disc pl-6 space-y-3">
          <li>- Member of A.P.A.S. (Associated Painters of Sherbrooke) 1998-2009</li>
          <li>- Member of Coatic'Art: (Artist of the Ball of Coaticook) 2007-2009</li>
          <li>- Member of the House of Arts of the Culture of Brompton 2005-2006</li>
          <li>- Member of the C.A.C. (Cultural Action Committee) Inc. Magog-Orford 2000-2006</li>
        </ul>
      </div>
    </div>
  );
}
