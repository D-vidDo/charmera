import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import PhotoCard from "../components/PhotoCard";

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(3); // Default: 3 = close/zoomed in (larger cards, fewer per row)

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
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

  // Grid columns and card sizes based on zoom level
  const getGridClasses = () => {
    switch (zoomLevel) {
      case 1: // Zoomed out: many small cards
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3";
      case 2: // Medium
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4";
      case 3: // Zoomed in (default): fewer larger cards
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6";
      default:
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4";
    }
  };

  const getCardMaxSize = () => {
    switch (zoomLevel) {
      case 1: return "max-w-[160px] max-h-[160px]";
      case 2: return "max-w-[240px] max-h-[240px]";
      case 3: return "max-w-[360px] max-h-[360px]"; // larger for close zoom
      default: return "max-w-[260px] max-h-[260px]";
    }
  };

  return (
    <div className="min-h-screen py-6 px-4">
      {/* Zoom Controls – icon buttons only */}
      <div className="flex justify-center items-center gap-3 mb-8">
        <button
          onClick={() => setZoomLevel((prev) => Math.max(1, prev - 1))}
          disabled={zoomLevel === 1}
          className="p-3 bg-gray-800/50 hover:bg-gray-700 text-white rounded-full transition-all disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white/30"
          aria-label="Zoom out"
        >
          <span className="text-xl font-bold">−</span> {/* Minus sign */}
        </button>

        <button
          onClick={() => setZoomLevel((prev) => Math.min(3, prev + 1))}
          disabled={zoomLevel === 3}
          className="p-3 bg-gray-800/50 hover:bg-gray-700 text-white rounded-full transition-all disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white/30"
          aria-label="Zoom in"
        >
          <span className="text-xl font-bold">+</span> {/* Plus sign */}
        </button>
      </div>

      {/* Photo Grid */}
      <div className={`grid ${getGridClasses()} justify-items-center`}>
        {photos.map((photo) => (
          <div
            key={photo.id}
            className={`${getCardMaxSize()} transition-all duration-300 ease-in-out`}
          >
            <PhotoCard photo={photo} />
          </div>
        ))}
      </div>
    </div>
  );
}