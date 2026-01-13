import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function PhotoCard({ photo }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="mb-4 rounded-md overflow-hidden relative group cursor-zoom-in">
          <img
            src={photo.url}
            alt={photo.name}
            className="transition-transform duration-300 group-hover:scale-105 rounded-md"
            style={{
              maxWidth: "300px",
              maxHeight: "300px",
              width: "auto",
              height: "auto",
            }}
          />
        </div>
      </DialogTrigger>

      <DialogContent className="bg-black/95 p-4 flex flex-col items-center justify-center rounded-lg w-[95vw] max-w-[500px] max-h-[90vh] mx-auto overflow-auto relative">
        {/* Image */}
        <img
          src={photo.url}
          alt={photo.name}
          className="w-full max-w-full max-h-[70vh] object-contain rounded-md mb-4"
        />

        {/* Uploader */}
        {photo.name && (
          <p className="text-white text-center font-semibold tracking-wide">
            sent by: {photo.name}
          </p>
        )}

        {/* Description */}
        {photo.description && (
          <p className="text-white text-center italic text-sm mt-1">
            {photo.description}
          </p>
        )}

        {/* Close button */}
        <DialogClose asChild>
          <Button className="absolute top-3 right-3 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200">
            &times;
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
