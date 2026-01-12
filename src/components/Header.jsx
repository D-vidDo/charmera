import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="py-6 bg-white/90 backdrop-blur z-50 w-full">
      <div className="flex flex-col items-center space-y-3">
        <h1 className="text-4xl font-serif text-black mb-2">charmera</h1>

        <div className="flex space-x-4">
          <Link
            to="/"
            className="
              px-4 py-2
              border border-black
              rounded
              text-black
              font-serif
              text-sm uppercase
              tracking-wide
              transition-colors duration-200
              hover:bg-black hover:text-white
            "
          >
            Home
          </Link>

          <Link
            to="/upload"
            className="
              px-4 py-2
              border border-black
              rounded
              text-black
              font-serif
              text-sm uppercase
              tracking-wide
              transition-colors duration-200
              hover:bg-black hover:text-white
            "
          >
            Upload
          </Link>
        </div>
      </div>
    </header>
  );
}
