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
      {/* Thumbnail trigger */}
      <DialogTrigger asChild>
        <div className="mb-4 rounded-md overflow-hidden relative group cursor-zoom-in border border-gray-300 hover:border-black transition-colors">
          <img
            src={photo.url}
            alt={photo.name}
            className="w-full h-auto max-w-[300px] max-h-[300px] object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </DialogTrigger>

      {/* Modal content */}
      <DialogContent className="bg-black/95 p-4 flex flex-col items-center justify-center rounded-lg w-full sm:max-w-md max-h-[90vh] mx-auto overflow-auto relative">
        {/* Slightly larger preview */}
        <img
          src={photo.url}
          alt={photo.name}
          className="w-full max-h-[70vh] object-contain rounded-md mb-4 border border-white/20"
        />

        {/* Metadata */}
        {photo.name && (
          <p className="text-white text-center font-semibold tracking-wide">
            sent by: {photo.name}
          </p>
        )}
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
