// src/components/UploadForm.jsx
import { useState } from 'react'
import { supabase } from '../supabase'

export default function UploadForm({ onUpload }) {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  async function handleUpload() {
    if (!file) return
    setUploading(true)
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    
    const { error } = await supabase.storage
      .from('photos')
      .upload(fileName, file)
    
    if (error) {
      console.error(error)
      setUploading(false)
      return
    }

    const { publicUrl } = supabase
      .storage
      .from('photos')
      .getPublicUrl(fileName)

    // Insert into database
    const { data, error: insertError } = await supabase
      .from('photos')
      .insert({ url: publicUrl })
      .select()
      .single()

    if (insertError) console.error(insertError)
    else if (onUpload) onUpload(data) // <-- pass the new photo to parent

    setUploading(false)
    setFile(null)
  }

  return (
    <div className="flex flex-col gap-2">
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button 
        onClick={handleUpload} 
        disabled={uploading} 
        className="bg-black text-white px-4 py-2 rounded"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  )
}
