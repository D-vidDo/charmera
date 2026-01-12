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
        <div className="mx-auto max-w-[1600px] p-2 columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.name}
              className="mb-4 break-inside-avoid cursor-zoom-in"
              onClick={() => setActivePhoto(photo)}
            >
              <img
                src={photo.url}
                alt={photo.name}
                className="w-full object-cover rounded-md transition-transform duration-300 hover:scale-105"
                style={{ maxHeight: "300px" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative bg-white rounded-lg shadow-lg max-w-lg w-[90%] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-900"
              onClick={() => setActivePhoto(null)}
            >
              ✕
            </button>

            <img
              src={activePhoto.url}
              alt="Expanded"
              className="w-full h-auto rounded-md mb-2"
            />
            <p className="text-gray-700 text-sm">
              Uploaded by: {activePhoto.uploadedBy}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
