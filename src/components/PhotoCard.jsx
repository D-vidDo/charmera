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
        <div className="mb-4 break-inside-avoid rounded-md overflow-hidden relative group cursor-zoom-in">
          <img
            src={photo.url}
            alt={photo.name}
            className="block rounded-md transition-transform duration-300 group-hover:scale-105"
            style={{
              width: "100%", // fill column width
              height: "auto", // keep aspect ratio
              maxHeight: "300px", // optional: limit extreme tall images
              objectFit: "contain", // <-- prevents cropping
            }}
          />
        </div>
      </DialogTrigger>

      <DialogContent className="bg-black/90 p-4 flex flex-col items-center justify-center max-w-full max-h-full relative">
        <img
          src={photo.url}
          alt={photo.name}
          className="max-w-full max-h-[80vh] object-contain rounded-md"
        />
        {photo.uploadedBy && (
          <p className="text-white mt-2">{photo.uploadedBy}</p>
        )}
        <DialogClose asChild>
          <Button className="absolute top-4 right-4 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200">
            &times;
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
