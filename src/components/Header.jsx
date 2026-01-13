// src/components/Header.jsx
import { Link } from "react-router-dom";
import { Button } from "./ui/button"; // make sure the path matches your project

export default function Header() {
  return (
    <header className="py-6 bg-white/80 backdrop-blur z-50 w-full">
      <div className="flex flex-col items-center space-y-3">
        <h1 className="text-4xl font-serif text-black">charmera<span className="absolute -top-2 -right-4">
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="black"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="-rotate-700 scale-x-[-1]"
    
  >
    <path d="
      M14.5 19
      C11.2 16.2, 6.5 13.8, 6.3 10.4
      C6.1 8.1, 8.1 6.8, 9.7 7.6
      C11 8.3, 11.6 9.7, 12.3 11.1
      C13.4 9.2, 15.6 7.1, 17.8 8.3
      C19.6 9.3, 19.2 12, 17.6 14.1
      C16.3 15.9, 15.3 17.3, 14.5 19
    " />
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
