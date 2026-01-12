import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="py-6 bg-white/80 backdrop-blur z-50 w-full">
      <div className="flex flex-col items-center">
        {/* Site Title */}
        <h1 className="text-4xl font-serif text-black mb-4">charmera</h1>

        {/* Buttons */}
        <div className="flex space-x-4">
          <Link
            to="/"
            className="px-4 py-2 border border-black text-black rounded-md hover:bg-black hover:text-white transition font-serif"
          >
            Home
          </Link>

          <Link
            to="/upload"
            className="px-4 py-2 border border-black text-black rounded-md hover:bg-black hover:text-white transition font-serif"
          >
            Upload
          </Link>
        </div>
      </div>
    </header>
  );
}
