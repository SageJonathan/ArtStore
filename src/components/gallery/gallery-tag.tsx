export default function GalleryTag() {
  return (
    <div
      className="flex flex-col items-center p-5 text-gray-600 bg-cover bg-center"
      style={{ backgroundImage: `url('/flowers.webp')`, height: '80vh' }}
    >
       <div className="absolute top-[106px] md:top-[70px] inset-0 bg-white opacity-65"></div>


      <div className="relative z-10">
        <h2 className="font-playfair font-semibold text-5xl text-center mb-6 text-black">
          Louise Guay
        </h2>
      </div>

      <div className="relative z-10 mt-8 max-w-4xl text-center">
        <p className="font-merriweather text-lg md:text-2xl font-bold leading-relaxed md:leading-loose mx-auto text-black ">
          Welcome to my gallery,
          <br />
          where the essence of country romance, the beauty of nature, and the
          warmth
          <br />
          of human connection come alive through every brushstroke and creation.
          <br />
          Each piece invites you to pause, reflect, and immerse yourself in the
          timeless
          <br />
          harmony between life, love, and the landscapes that inspire us.
          <br />
          Thank you for sharing in this celebration of art and connection.
        </p>
      </div>
    </div>
  );
}

