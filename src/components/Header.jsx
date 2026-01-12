import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="w-full py-6 text-center bg-white shadow-sm">
      {/* Site Name */}
      <h1 className="text-4xl font-cursive text-gray-800 mb-2">
        charmera
      </h1>

      {/* Upload Link */}
      <Link
        to="/upload"
        className="text-blue-500 hover:text-blue-700 font-medium text-lg"
      >
        Upload
      </Link>
    </header>
  )
}
