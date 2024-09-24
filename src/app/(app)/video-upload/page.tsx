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
    
  } catch (error) {
    
  }


    
  }
  return (
    <div>VideoUpload</div>
  )
}

export default VideoUpload