// src/components/Header.jsx
import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header className="py-6 text-center sticky top-0 bg-white/80 backdrop-blur z-50">
      <h1 className="text-4xl font-cursive text-gray-900 mb-3">charmera</h1>
      <Link
        to="/upload"
        className="text-sm uppercase tracking-wide text-gray-500 hover:text-gray-900 transition"
      >
        upload
      </Link>
    </header>
  )
}
