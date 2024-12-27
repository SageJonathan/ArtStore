export default function GalleryLive() {
  return (
    // mobile = 1 picture/ tablet=2/desktop=3
    <div
      className="relative w-full h-[calc(100vh-68px)] bg-cover bg-center"
      style={{ backgroundImage: `url('/gallery.png')` }}
    >
      {/* Overlay content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-3xl font-bold">
          Welcome to the Gallery
        </h1>
      </div>
    </div>
  );
}
