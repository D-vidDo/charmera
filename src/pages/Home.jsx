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
    <div className="p-2 columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-2">
  {photos.map((photo) => (
    <img
      key={photo.name}
      src={photo.url}
      alt={photo.name}
      className="mb-2 w-full rounded-md object-cover break-inside"
      style={{ maxHeight: '300px' }} // scale down high-res photos
    />
  ))}
</div>


  );
}
