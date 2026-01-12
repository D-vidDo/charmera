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

      // FILTER OUT THE PLACEHOLDER
      const realFiles = data.filter(file => file.name !== '.emptyFolderPlaceholder');

      const urls = realFiles.map((file) => ({
        name: file.name,
        url: supabase.storage.from("photos").getPublicUrl(file.name).data.publicUrl,
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
    return <p className="text-center mt-10">no charms yet. send one!</p>;

  return (
    <div className="flex flex-wrap justify-center gap-4 py-6">
      {photos.map((photo) => (
        <PhotoCard key={photo.name} photo={photo} />
      ))}
    </div>
  );
}
