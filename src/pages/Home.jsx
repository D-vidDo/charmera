import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import PhotoCard from "../components/PhotoCard";
import { ZoomIn, ZoomOut } from "lucide-react";

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(3); // Default: close / zoomed in (level 3)

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

  if (loading) return <p className="text-center mt-10 text-gray-400">loading charms...</p>;
  if (!photos.length)
    return <p className="text-center mt-10 text-gray-400">no charms yet. send one!</p>;

  const getGridClasses = () => {
    switch (zoomLevel) {
      case 1: // far out - most columns
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3";
      case 2: // medium
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4";
      case 3: // close / default - fewer columns, larger cards
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6";
      default:
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4";
    }
  };

  const getCardMaxSize = () => {
    switch (zoomLevel) {
      case 1: return "max-w-[160px] max-h-[160px]";
      case 2: return "max-w-[240px] max-h-[240px]";
      case 3: return "max-w-[360px] max-h-[360px]";
      default: return "max-w-[260px] max-h-[260px]";
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-black text-white">
      {/* Zoom Controls – transparent buttons + indicators */}
      <div className="flex flex-col items-center gap-3 mb-10">
        <div className="flex items-center gap-8">
          <button
            onClick={() => setZoomLevel((prev) => Math.max(1, prev - 1))}
            disabled={zoomLevel === 1}
            className={`
              p-3 rounded-full 
              text-gray-400 hover:text-white 
              transition-all duration-200 
              disabled:opacity-30 disabled:cursor-not-allowed
              focus:outline-none focus:ring-1 focus:ring-gray-600
              hover:scale-110 active:scale-95
            `}
            aria-label="Zoom out"
          >
            <ZoomOut className="h-7 w-7" strokeWidth={1.5} />
          </button>

          <button
            onClick={() => setZoomLevel((prev) => Math.min(3, prev + 1))}
            disabled={zoomLevel === 3}
            className={`
              p-3 rounded-full 
              text-gray-400 hover:text-white 
              transition-all duration-200 
              disabled:opacity-30 disabled:cursor-not-allowed
              focus:outline-none focus:ring-1 focus:ring-gray-600
              hover:scale-110 active:scale-95
            `}
            aria-label="Zoom in"
          >
            <ZoomIn className="h-7 w-7" strokeWidth={1.5} />
          </button>
        </div>

        {/* Zoom level indicators (three dots) */}
        <div className="flex gap-2.5">
          {[1, 2, 3].map((lvl) => (
            <div
              key={lvl}
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${zoomLevel === lvl ? "bg-white scale-125" : "bg-gray-600"}
              `}
            />
          ))}
        </div>
      </div>

      {/* Photo Grid */}
      <div className={`grid ${getGridClasses()} justify-items-center`}>
        {photos.map((photo) => (
          <div
            key={photo.id}
            className={`${getCardMaxSize()} transition-all duration-300 ease-out`}
          >
            <PhotoCard photo={photo} />
          </div>
        ))}
      </div>
    </div>
  );
}