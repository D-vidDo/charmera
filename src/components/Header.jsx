// src/components/Header.jsx
import { Link } from "react-router-dom";
import { Button } from "./ui/button"; // make sure the path matches your project

export default function Header() {
  return (
    <header className="py-6 bg-white/80 backdrop-blur z-50 w-full">
      <div className="flex flex-col items-center space-y-3">
        <h1 className="text-4xl font-serif text-black">charmera</h1>

        <div className="flex space-x-4">
          <Link to="/">
            <Button
              variant="ghost"
              className="font-serif border-black text-black hover:bg-black hover:text-white"
            >
              Home
            </Button>
          </Link>

          <Link to="/upload">
            <Button
              variant="ghost"
              className="font-serif border-black text-black hover:bg-black hover:text-white"
            >
              Upload
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
