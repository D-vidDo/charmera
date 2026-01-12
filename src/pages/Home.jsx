import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePhoto, setActivePhoto] = useState(null);

  // Fetch photos from the bucket
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const { data, error } = await supabase.storage
          .from("photos")
          .list("", { sortBy: { column: "created_at", order: "desc" } });
        if (error) throw error;

        // Fetch uploader info from your "photos" table if you have it
        const photoUrls = data.map((file) => ({
          name: file.name,
          url: supabase.storage.from("photos").getPublicUrl(file.name).data
            .publicUrl,
          uploadedBy: file.metadata?.uploadedBy || "Anonymous", // adjust based on how you store uploader info
        }));

        setPhotos(photoUrls);
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
      {/* PHOTO GRID */}
      <div className="flex justify-center py-6">
        <div className="mx-auto max-w-[1600px] columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4">
          {photos.map((photo) => (
            <div key={photo.name} className="mb-4 break-inside-avoid relative group">
              <img
                src={photo.url}
                alt={photo.name}
                onClick={() => setActivePhoto(photo)}
                className="
                  w-full
                  rounded-md
                  object-cover
                  cursor-zoom-in
                  transition-transform
                  duration-300
                  group-hover:scale-105
                "
                style={{ maxHeight: "300px" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* FULLSCREEN MODAL */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4 overflow-auto"
          onClick={() => setActivePhoto(null)}
        >
          <img
            src={activePhoto.url}
            alt="Expanded"
            className="max-w-full max-h-[80vh] object-contain mb-4"
          />
          <p className="text-white text-sm">
            Uploaded by: {activePhoto.uploadedBy}
          </p>
        </div>
      )}
    </>
  );
}
