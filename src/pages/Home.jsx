import { useState } from "react"

export default function Home({ photos }) {
  const [activePhoto, setActivePhoto] = useState(null)

  return (
    <>
      {/* Photo Grid */}
      <div className="flex justify-center">
        <div className="w-full max-w-6xl">
          <div className="p-2 columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-3">
            {photos.map((photo) => (
              <img
                key={photo.name}
                src={photo.url}
                alt={photo.name}
                onClick={() => setActivePhoto(photo.url)}
                className="
                  mb-3
                  w-full
                  rounded-md
                  object-cover
                  break-inside-avoid
                  cursor-zoom-in
                  transition-transform
                  duration-300
                  ease-out
                  hover:scale-[1.02]
                "
                style={{ maxHeight: "300px" }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center cursor-zoom-out animate-fade-in"

          onClick={() => setActivePhoto(null)}
        >
          <img
            src={activePhoto}
            alt="Expanded"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </>
  )
}
