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
      {/* Photo grid wrapper */}
      <div className="flex justify-center py-6">
        <div className="mx-auto max-w-[1600px] columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4">
          {photos.map((photo) => (
            <img
              key={photo.name}
              src={photo.url}
              alt={photo.name}
              onClick={() => setActivePhoto(photo.url)}
              className="mb-4 w-full rounded-md cursor-zoom-in transition-transform duration-300 hover:scale-[1.02]"
              style={{ maxHeight: "300px" }}
            />
          ))}
        </div>
      </div>

       {/* POPUP MODAL */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="bg-white rounded-lg overflow-hidden shadow-xl max-w-lg w-full p-4"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <img
              src={activePhoto.url}
              alt="Expanded"
              className="w-full h-auto rounded-md mb-2"
            />
            <p className="text-gray-700 text-sm">
              Uploaded by: {activePhoto.uploadedBy}
            </p>
            <button
              className="mt-4 w-full py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
              onClick={() => setActivePhoto(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
