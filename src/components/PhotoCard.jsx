// src/components/PhotoCard.jsx
import React from "react";

export default function PhotoCard({ photo, onClick }) {
  return (
    <div
      className="mb-4 break-inside-avoid relative group"
      onClick={() => onClick(photo)}
    >
      <img
        src={photo.url}
        alt={photo.name}
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
  );
}
