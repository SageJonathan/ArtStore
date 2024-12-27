export default function GalleryGrid() {
  return (
    <div
      className="relative w-full h-[calc(100vh-68px)] bg-cover bg-center"
      style={{ backgroundImage: `url('/grid.jpg')` }}
    >
      {/* Overlay content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-3xl font-bold">Welcome to the Grid</h1>
      </div>
    </div>
  );
}
