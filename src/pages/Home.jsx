import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import PhotoCard from "../components/PhotoCard";

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="flex justify-center py-6">
      <div className="w-full max-w-6xl px-2">
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4">
          {photos.map((photo) => (
            <PhotoCard key={photo.name} photo={photo} />
          ))}
        </div>
      </div>
    </div>
  );
}
