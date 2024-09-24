import React,{useState} from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { assert } from 'console'
import Swal from 'sweetalert2'

function VideoUpload() {

  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  const router = useRouter()

  // max file size 70mb

  const MAX_FILE_SIZE = 70 * 1024 * 1024

  const handleFileChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    if (!file) return
    if (file.size > MAX_FILE_SIZE) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "File size is to large!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
      return
    }
    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('title', title)
    formData.append('description', description)
    formData.append("originalSize", file.size.toString())

  try {
    const response = await axios.post('/api/video-upload', formData)

    if (!response.data) throw new Error("Upload Failed");

    const result = await response.data
    if (result.public_id) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Video uploaded successfully',
        showConfirmButton: false,
        timer: 1500
      })
      return
    }
 
    
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong when uploading the file!",
      footer: '<a href="#">Why do I have this issue?</a>'
    });
  }finally{
    setIsUploading(false)
  }
 
  }
  return (
    <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Upload Video</h1>
          <form onSubmit={handleFileChange} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea textarea-bordered w-full"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Video File</span>
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="file-input file-input-bordered w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Upload Video"}
            </button>
          </form>
        </div>
  )
}

export default VideoUpload