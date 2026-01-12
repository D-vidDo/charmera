// src/pages/Home.jsx
import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import PhotoCard from '../components/PhotoCard'
import UploadForm from '../components/UploadForm'

export default function Home() {
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    fetchPhotos()

    // Realtime listener
    const subscription = supabase
      .from('photos')
      .on('INSERT', payload => {
        setPhotos(prev => [payload.new, ...prev])
      })
      .subscribe()

    return () => supabase.removeSubscription(subscription)
  }, [])

  async function fetchPhotos() {
    const { data } = await supabase
      .from('photos')
      .select('*')
      .order('created_at', { ascending: false })
    setPhotos(data)
  }

  function handleNewPhoto(photo) {
    setPhotos(prev => [photo, ...prev])
  }

  return (
    <div className="p-4">
      <UploadForm onUpload={handleNewPhoto} />

      {/* Masonry grid */}
      <div
        className="
          mt-4
          columns-1 
          sm:columns-2 
          md:columns-3 
          gap-4
          [&>div]:break-inside-avoid
        "
      >
        {photos.map(photo => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  )
}
