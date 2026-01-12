// src/components/UploadForm.jsx
import { useState } from 'react'
import { supabase } from '../supabase'

export default function UploadForm({ onUpload }) {
  const [file, setFile] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  async function handleUpload() {
    if (!file) return
    setUploading(true)
    setSuccessMessage('')

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`

      // Upload file
      const { error: uploadError } = await supabase.storage
        .from('photos')
        .upload(fileName, file)
      if (uploadError) throw uploadError

      // Get public URL correctly
      const { data: urlData, error: urlError } = supabase.storage
        .from('photos')
        .getPublicUrl(fileName)
      if (urlError) throw urlError

      const publicUrl = urlData.publicUrl
      if (!publicUrl) throw new Error('Failed to get public URL')

      // Insert metadata
      const { data, error: insertError } = await supabase
        .from('photos_metadata')
        .insert({
          url: publicUrl,
          name: name.trim() || 'Anonymous',
          description: description.trim() || null
        })
        .select()
        .single()
      if (insertError) throw insertError

      if (onUpload) onUpload(data)

      setSuccessMessage('charm sent~')
      setFile(null)
      setName('')
      setDescription('')
    } catch (err) {
      console.error('Upload error:', err.message)
      setSuccessMessage('Upload failed. Try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm p-6 rounded-lg border border-black">
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="border-b border-black focus:outline-none px-2 py-2 placeholder-black/50 text-black"
      />
      <textarea
        placeholder="write a story"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="border-b border-black focus:outline-none px-2 py-2 placeholder-black/50 text-black resize-none"
        rows={3}
      />
      <input
        type="file"
        onChange={e => setFile(e.target.files[0])}
        className="text-black py-1"
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="border border-black text-black px-4 py-2 rounded hover:bg-black hover:text-white transition-colors"
      >
        {uploading ? 'sending...' : 'send'}
      </button>
      {successMessage && (
        <p className="text-black/80 text-sm mt-2">{successMessage}</p>
      )}
    </div>
  )
}
