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

    const { data, error: insertError } = await supabase
      .from('photos')
      .insert({ url: publicUrl, name: name || 'Anonymous' })
      .select()
      .single()

    if (insertError) {
      console.error(insertError)
    } else {
      if (onUpload) onUpload(data)
      setSuccessMessage('charm sent~')
    }

    setUploading(false)
    setFile(null)
    setName('')
  }

  return (
    <div className="flex flex-col gap-3 w-full max-w-sm p-4 rounded-lg border border-gray-200">
      {/* Name Input */}
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="border-b border-black focus:outline-none px-2 py-1 placeholder-black/50 text-black"
      />

      {/* File Input */}
      <input
        type="file"
        onChange={e => setFile(e.target.files[0])}
        className="text-black"
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
        <p className="text-black/80 text-sm">{successMessage}</p>
      )}
    </div>
  )
}
