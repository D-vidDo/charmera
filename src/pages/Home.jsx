import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import PhotoCard from "../components/PhotoCard";
import { ZoomIn, ZoomOut } from "lucide-react";

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(3); // Default remains level 3 (close)

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

    // Realtime subscription for new photos
    const subscription = supabase
      .channel("photos-updates")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "photos_metadata" },
        (payload) => {
          // Prepend the new photo to the list
          setPhotos((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    // Cleanup on unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-600">loading charms...</p>;
  if (!photos.length)
    return (
      <p className="text-center mt-10 text-gray-600">
        no charms yet. send one!
      </p>
    );

  const getGridClasses = () => {
    switch (zoomLevel) {
      case 1: // very far out
        return "grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-9 gap-2";
      case 2: // far out
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3";
      case 3: // default close
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6";
      case 4: // closer
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8";
      case 5: // very close / max zoom
        return "grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10";
      default:
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4";
    }
  };

  const getCardMaxSize = () => {
    switch (zoomLevel) {
      case 1:
        return "max-w-[140px] max-h-[140px]";
      case 2:
        return "max-w-[180px] max-h-[180px]";
      case 3:
        return "max-w-[360px] max-h-[360px]"; // your original default close
      case 4:
        return "max-w-[480px] max-h-[480px]";
      case 5:
        return "max-w-[640px] max-h-[640px]";
      default:
        return "max-w-[260px] max-h-[260px]";
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 text-black">
      {" "}
      {/* text-black for white bg visibility */}
      {/* Zoom Controls – transparent buttons + indicators */}
      <div className="flex flex-col items-center gap-3 mb-10">
        <div className="flex items-center gap-8">
          <button
            onClick={() => setZoomLevel((prev) => Math.max(1, prev - 1))}
            disabled={zoomLevel === 1}
            className={`
              p-3 rounded-full 
              text-gray-500 hover:text-black 
              transition-all duration-200 
              disabled:opacity-30 disabled:cursor-not-allowed
              focus:outline-none focus:ring-1 focus:ring-gray-400
              hover:scale-110 active:scale-95
            `}
            aria-label="Zoom out"
          >
            <ZoomOut className="h-7 w-7" strokeWidth={1.5} />
          </button>

          <button
            onClick={() => setZoomLevel((prev) => Math.min(5, prev + 1))}
            disabled={zoomLevel === 5}
            className={`
              p-3 rounded-full 
              text-gray-500 hover:text-black 
              transition-all duration-200 
              disabled:opacity-30 disabled:cursor-not-allowed
              focus:outline-none focus:ring-1 focus:ring-gray-400
              hover:scale-110 active:scale-95
            `}
            aria-label="Zoom in"
          >
            <ZoomIn className="h-7 w-7" strokeWidth={1.5} />
          </button>
        </div>

        {/* Zoom level indicators – now dark for white/light bg */}
        <div className="flex gap-2.5">
          {[1, 2, 3, 4, 5].map((lvl) => (
            <div
              key={lvl}
              className={`
                w-2.5 h-2.5 rounded-full transition-all duration-300
                ${zoomLevel === lvl ? "bg-black scale-125" : "bg-gray-400"}
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
      {/* Footer */}
      <footer className="mt-10 md:mt-12 py-4 text-center text-[10px] leading-tight text-gray-500">
        {"made with love <3"}
      </footer>
    </div>
  );
}
