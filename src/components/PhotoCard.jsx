// src/components/PhotoCard.jsx
import React from "react";

export default function PhotoCard({ photo, onClick }) {
  return (
    <div
      className="mb-4 break-inside-avoid rounded-md overflow-hidden relative group"
      onClick={() => onClick(photo)}
    >
      <img
        src={photo.url}
        alt={photo.name}
        className="
          w-full
          object-cover
          cursor-zoom-in
          transition-transform
          duration-300
          group-hover:scale-105
          rounded-md
        "
        style={{ maxHeight: "300px" }}
      />
    </div>
  );
}
