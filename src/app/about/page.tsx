import Image from "next/image";

export default function AboutPage() {
    return (
      <div className="p-4">
        {/* Artist's Info Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          {/* Artist Image */}
          <div className="flex-shrink-0">
            <Image
              src="/dummy.jpg" 
              alt="Artist"
              className="object-cover rounded-full md:rounded-lg shadow-lg" 
            width={192} 
            height={192} 
            layout="contain" 
            />
          </div>
  
          {/* Artist About Section */}
          <div className="flex-1 md:pl-8">
            <h2 className="text-xl font-semibold text-black mb-2">About the Art</h2>
            <p className="text-gray-700">
              A brief description of the artist’s work and style. This section gives insight into the artist's unique artistic approach, their medium of choice, and themes explored in their art. The goal is to provide context and an invitation to explore their creations.
            </p>
          </div>
        </div>
  
        {/* Biography Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-black mb-4">Biography</h2>
          <p className="text-gray-700">
            This section contains a more detailed biography of the artist. It should include their background, artistic journey, key influences, achievements, and any notable exhibitions or projects they’ve worked on. The bio can touch on the artist's evolution, challenges faced, and how their life experiences are reflected in their art.
          </p>
        </div>
  
        {/* Credentials & Education Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-black mb-4">Credentials & Education</h2>
          <p className="text-gray-700">
            This section provides details about the artist's formal education, any credentials they hold, and the notable institutions or mentors that have shaped their artistic journey. It may also highlight awards or recognitions received throughout their career.
          </p>
        </div>
      </div>
    );
  }
  