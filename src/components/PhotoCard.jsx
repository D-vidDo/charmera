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

      <DialogContent className="bg-black/90 p-4 flex flex-col items-center justify-center max-w-full max-h-full relative">
        {/* Full-size photo */}
        <img
          src={photo.url}
          alt={photo.name}
          className="max-w-full max-h-[80vh] object-contain rounded-md"
        />

        {/* Uploader name */}
        {photo.name && (
          <p className="text-white mt-3 text-sm tracking-wide">
            sent by: {photo.name}
          </p>
        )}
        {photo.description && (
          <p className="text-white mt-1 text-sm italic">{photo.description}</p>
        )}

        {/* Close button */}
        <DialogClose asChild>
          <Button className="absolute top-4 right-4 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200">
            &times;
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
