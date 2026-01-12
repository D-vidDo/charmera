import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import PhotoCard from "../components/PhotoCard";

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        // Fetch all metadata, newest first
        const { data, error } = await supabase
          .from("photos_metadata")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        setPhotos(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (loading) return <p className="text-center mt-10">loading charms...</p>;
  if (!photos.length)
    return <p className="text-center mt-10">no charms yet. send one!</p>;

  return (
    <div className="flex flex-wrap justify-center gap-4 py-6">
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
    </div>
  );
}
