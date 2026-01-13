// src/components/Header.jsx
import { Link } from "react-router-dom";
import { Button } from "./ui/button"; // make sure the path matches your project
import { useMemo } from "react";

const heartPaths = [
  // messy left-leaningd
  `M14.5 19
   C11.2 16.2, 6.5 13.8, 6.3 10.4
   C6.1 8.1, 8.1 6.8, 9.7 7.6
   C11 8.3, 11.6 9.7, 12.3 11.1
   C13.4 9.2, 15.6 7.1, 17.8 8.3
   C19.6 9.3, 19.2 12, 17.6 14.1
   C16.3 15.9, 15.3 17.3, 14.5 19`,

  // more collapsed + round
  `M13.8 18.6
   C10.2 15.9, 7.1 13.6, 7.4 10.8
   C7.6 8.7, 9.4 7.5, 10.8 8.2
   C12 8.9, 12.4 10.4, 12.8 11.6
   C13.7 10, 15.2 8.6, 16.9 9.1
   C18.6 9.6, 18.5 11.9, 17.1 13.7
   C15.9 15.3, 14.7 16.8, 13.8 18.6`,

  // taller, slanted
  `M15 19.2
   C12.6 17, 8.4 14.4, 8.6 11.5
   C8.7 9.3, 10.5 8.3, 11.8 9.1
   C13.1 10, 13.5 11.2, 13.9 12.5
   C14.8 10.6, 16.4 9.5, 18 10.2
   C19.7 11, 19.4 13.3, 18.1 15
   C17 16.5, 16 17.8, 15 19.2`,
];



export default function Header() {


  const heartPath = useMemo(() => {
  return heartPaths[Math.floor(Math.random() * heartPaths.length)];
}, []);

  return (
    <header className="py-6 bg-white/80 backdrop-blur z-50 w-full">
      <div className="flex flex-col items-center space-y-3">
        <h1 className="text-4xl font-serif text-black">
          <span className="inline-flex items-start gap-1">
            <span>charmera</span>

            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="-rotate-18 scale-x-[-1] translate-y-[-4px]"
            >
              <path d={heartPath} />
            </svg>
          </span>
        </h1>

        <div className="flex space-x-4">
          <Link to="/">
            <Button
              variant="ghost"
              className="font-serif border-black text-black hover:bg-black hover:text-white"
            >
              home
            </Button>
          </Link>

          <Link to="/upload">
            <Button
              variant="ghost"
              className="font-serif border-black text-black hover:bg-black hover:text-white"
            >
              upload
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
