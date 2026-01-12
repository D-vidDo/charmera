export default function Header() {
  return (
    <header className="py-10 text-center">
      <h1 className="text-4xl font-cursive mb-3">
        charmera
      </h1>

      <Link
        to="/upload"
        className="text-sm uppercase tracking-wide text-gray-500 hover:text-gray-900"
      >
        upload
      </Link>
    </header>
  )
}
