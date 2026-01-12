import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import PhotoCard from "../components/PhotoCard";

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
          uploadedBy: file.metadata?.uploadedBy || "Anonymous",
        }));

        setPhotos(urls);
      } catch (err) {
        console.error(err.message);
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
      <div className="flex justify-center py-6">
        <div className="w-full max-w-6xl px-2">
          {/* GRID CONTAINER */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.name}
                className="overflow-hidden rounded-md cursor-zoom-in"
                onClick={() => setActivePhoto(photo)}
              >
                {/* IMAGE */}
                <img
                  src={photo.url}
                  alt={photo.name}
                  className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                  style={{ maxHeight: "300px" }}
                />

                {/* UPLOADER NAME */}
                {photo.uploadedBy && (
                  <p className="text-sm text-gray-500 mt-1">
                    {photo.uploadedBy}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FULLSCREEN MODAL */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center cursor-zoom-out p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div className="relative max-w-full max-h-full">
            <img
              src={activePhoto.url}
              alt={activePhoto.name}
              className="max-w-full max-h-full object-contain rounded"
            />
            {activePhoto.uploadedBy && (
              <p className="text-white text-center mt-2">
                {activePhoto.uploadedBy}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
