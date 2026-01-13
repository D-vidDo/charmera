// src/pages/Upload.jsx
import UploadForm from '../components/UploadForm'

export default function Upload() {
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4 text-black">send a charm</h1>
      <UploadForm />
      {/* Footer */}
      <footer className="mt-10 md:mt-12 py-4 text-center text-[10px] leading-tight text-gray-500">
        {"made with love <3"}
      </footer>
    </div>
  )
}
