import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch photos from storage bucket
  const fetchPhotos = async () => {
    try {
      // List all files in the 'photos' bucket
      const { data, error } = await supabase.storage
        .from("photos")
        .list("", { sortBy: { column: "created_at", order: "desc" } });

      if (error) throw error;

      // Generate public URLs
      const urls = data.map((file) => {
        return {
          name: file.name,
          url: supabase.storage.from("photos").getPublicUrl(file.name).data
            .publicUrl,
        };
      });

      setPhotos(urls);
    } catch (err) {
      console.error("Error fetching photos:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading photos...</p>;
  if (!photos.length)
    return <p className="text-center mt-10">No photos yet. Upload one!</p>;

  return (
    <>
      {/* PHOTO GRID */}
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
                hover:scale-[1.02]
              "
                style={{ maxHeight: "300px" }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* FULLSCREEN MODAL */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center cursor-zoom-out"
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
  );
}
