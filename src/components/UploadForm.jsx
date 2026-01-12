// src/components/UploadForm.jsx
import { useState } from 'react'
import { supabase } from '../supabase'

export default function UploadForm({ onUpload }) {
  const [file, setFile] = useState(null)
  const [name, setName] = useState('')
  const [uploading, setUploading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  async function handleUpload() {
    if (!file) return
    setUploading(true)
    setSuccessMessage('')

    try {
      // Create unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`

      // Upload file to storage bucket
      const { error: uploadError } = await supabase.storage
        .from('photos')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      // Get public URL
      const { publicUrl } = supabase.storage.from('photos').getPublicUrl(fileName)

      // Save metadata in table
      const { data, error: insertError } = await supabase
        .from('photos_metadata')
        .insert({
          url: publicUrl,
          name: name.trim() || 'Anonymous'
        })
        .select()
        .single()

      if (insertError) throw insertError

      // Notify parent
      if (onUpload) onUpload(data)

      // Show success message
      setSuccessMessage('charm sent~')
      setFile(null)
      setName('')
    } catch (err) {
      console.error('Upload error:', err.message)
      setSuccessMessage('Upload failed. Try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm p-6 rounded-lg border border-black">
      
      {/* Name Input */}
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="border-b border-black focus:outline-none px-2 py-2 placeholder-black/50 text-black"
      />

      {/* File Input */}
      <input
        type="file"
        onChange={e => setFile(e.target.files[0])}
        className="text-black py-1"
      />

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="border border-black text-black px-4 py-2 rounded hover:bg-black hover:text-white transition-colors"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>

      {/* Success Message */}
      {successMessage && (
        <p className="text-black/80 text-sm mt-2">{successMessage}</p>
      )}
    </div>
  )
}
