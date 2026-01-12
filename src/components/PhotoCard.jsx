// src/components/PhotoCard.jsx
export default function PhotoCard({ photo }) {
  return (
    <div className="mb-4 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200">
      <img 
        src={photo.url} 
        alt="user upload" 
        className="w-full object-cover"
      />
    </div>
  )
}
