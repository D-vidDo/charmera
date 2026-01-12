import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function Home() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch photos from storage bucket
  const fetchPhotos = async () => {
    try {
      // List all files in the 'photos' bucket
      const { data, error } = await supabase.storage
        .from('photos')
        .list('', { sortBy: { column: 'created_at', order: 'desc' } })

      if (error) throw error

      // Generate public URLs
      const urls = data.map(file => {
        return {
          name: file.name,
          url: supabase.storage.from('photos').getPublicUrl(file.name).data.publicUrl
        }
      })

      setPhotos(urls)
    } catch (err) {
      console.error('Error fetching photos:', err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPhotos()
  }, [])

  if (loading) return <p className="text-center mt-10">Loading photos...</p>
  if (!photos.length)
    return <p className="text-center mt-10">No photos yet. Upload one!</p>

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {photos.map((photo) => (
        <div
          key={photo.name}
          className="w-full h-64 overflow-hidden rounded-lg shadow-md"
        >
          <img
            src={photo.url}
            alt={photo.name}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  )
}
