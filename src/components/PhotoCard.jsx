import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogOverlay,   // ← Import this if not already (from "@/components/ui/dialog")
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";  // assuming you have this for class merging

export default function PhotoCard({ photo }) {
  return (
    <Dialog>
      {/* Thumbnail trigger – unchanged */}
      <DialogTrigger asChild>
        <div className="mb-4 rounded-md overflow-hidden relative group cursor-zoom-in border border-gray-300 hover:border-black transition-colors">
          <img
            src={photo.url}
            alt={photo.name}
            className="w-full h-auto max-w-[300px] max-h-[300px] object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </DialogTrigger>

      {/* Modal – we customize via classes on Overlay + Content */}
      <DialogContent 
        className={cn(
          // Remove heavy overrides – let Radix position it
          // But override bg + padding if needed
          "bg-transparent border-none shadow-none p-0 sm:max-w-md", // transparent so overlay bg shows through
          // Keep your max sizes but let inner div handle scroll
        )}
      >
        {/* Overlay: full-screen bg + true centering */}
        <DialogOverlay 
          className={cn(
            "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm", // your dark bg
            "flex items-center justify-center p-4" // centers + padding for edges
          )} 
        />

        {/* Inner centered content wrapper */}
        <div 
          className="
            relative z-50 
            w-[95vw] sm:max-w-md 
            max-h-[90vh] overflow-auto 
            rounded-lg bg-black/80 border border-white/10 shadow-2xl
          "
        >
          {/* Image preview */}
          <img
            src={photo.url}
            alt={photo.name}
            className="w-full max-h-[70vh] object-contain rounded-t-lg border-b border-white/20"
          />

          {/* Metadata */}
          <div className="p-4 text-center">
            {photo.name && (
              <p className="text-white font-semibold tracking-wide">
                sent by: {photo.name}
              </p>
            )}
            {photo.description && (
              <p className="text-white italic text-sm mt-1">
                {photo.description}
              </p>
            )}
          </div>

          {/* Close button */}
          <DialogClose asChild>
            <Button 
              className="
                absolute top-3 right-3 
                bg-white/90 text-black hover:bg-white 
                rounded-full w-8 h-8 
                flex items-center justify-center 
                shadow-md
              "
            >
              ×
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}