// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePhoto, setActivePhoto] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const { data, error } = await supabase.storage
          .from("photos")
          .list("", { sortBy: { column: "created_at", order: "desc" } });
        if (error) throw error;

        const urls = data.map((file) => ({
          name: file.name,
          url: supabase.storage.from("photos").getPublicUrl(file.name).data
            .publicUrl,
        }));

        setPhotos(urls);
      } catch (err) {
        console.error("Error fetching photos:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading photos...</p>;
  if (!photos.length)
    return <p className="text-center mt-10">No photos yet. Upload one!</p>;

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 justify-center">
          {photos.map((photo) => (
            <img
              key={photo.name}
              src={photo.url}
              alt={photo.name}
              onClick={() => setActivePhoto(photo.url)}
              className="w-full rounded-md object-cover cursor-zoom-in transition-transform duration-300 hover:scale-[1.02]"
              style={{ maxHeight: "300px" }}
            />
          ))}
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
