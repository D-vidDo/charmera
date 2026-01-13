import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import PhotoCard from "../components/PhotoCard";

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(2); // 1 = small/many, 2 = medium, 3 = large/few

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

  // Define grid columns and card sizes based on zoom level
  const getGridClasses = () => {
    switch (zoomLevel) {
      case 1: // Zoomed out: many small cards
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3";
      case 2: // Default: balanced
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4";
      case 3: // Zoomed in: fewer larger cards
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6";
      default:
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4";
    }
  };

  const getCardMaxSize = () => {
    switch (zoomLevel) {
      case 1: return "max-w-[180px] max-h-[180px]";
      case 2: return "max-w-[260px] max-h-[260px]";
      case 3: return "max-w-[380px] max-h-[380px]";
      default: return "max-w-[260px] max-h-[260px]";
    }
  };

  return (
    <div className="min-h-screen py-6 px-4">
      {/* Zoom Controls */}
      <div className="flex justify-center items-center gap-4 mb-6">
        <button
          onClick={() => setZoomLevel((prev) => Math.max(1, prev - 1))}
          disabled={zoomLevel === 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 transition"
        >
          Zoom Out (−)
        </button>

        <span className="text-lg font-medium">
          Zoom: {zoomLevel === 1 ? "Far" : zoomLevel === 3 ? "Close" : "Normal"}
        </span>

        <button
          onClick={() => setZoomLevel((prev) => Math.min(3, prev + 1))}
          disabled={zoomLevel === 3}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 transition"
        >
          Zoom In (+)
        </button>
      </div>

      {/* Photo Grid */}
      <div className={`grid ${getGridClasses()} justify-items-center`}>
        {photos.map((photo) => (
          <div key={photo.id} className={`${getCardMaxSize()} transition-all duration-300`}>
            <PhotoCard photo={photo} />
          </div>
        ))}
      </div>
    </div>
  );
}