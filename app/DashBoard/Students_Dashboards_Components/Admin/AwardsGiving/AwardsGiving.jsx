'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function AwardsGiving() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [title, setTitle] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [images, setImages] = useState([])

  // Modal state for viewing images
  const [modalData, setModalData] = useState(null)

  // Upload image to ImgBB (replace key if needed)
  const uploadToImgBB = async (file) => {
    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await axios.post(
        'https://api.imgbb.com/1/upload?key=3d64b0e9dee39ca593b9da32467663ee',
        formData
      )
      if (response.data.success) {
        return response.data.data.url
      }
      return null
    } catch (error) {
      console.error('Error uploading image to ImgBB:', error)
      return null
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setSelectedFile(file)
    if (file) {
      setPreviewUrl(URL.createObjectURL(file))
    } else {
      setPreviewUrl('')
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Please select an image first.')
      return
    }
    if (!title.trim()) {
      setMessage('Please enter a title for the image.')
      return
    }

    setUploading(true)
    setMessage('Uploading...')

    try {
      const uploadedUrl = await uploadToImgBB(selectedFile)
      if (!uploadedUrl) {
        setMessage('Failed to upload image.')
        setUploading(false)
        return
      }

      // Save image info to your backend API
      await axios.post('/api/awards-giving', { imageUrl: uploadedUrl, title: title.trim() })

      setMessage('Image uploaded and saved successfully!')
      setSelectedFile(null)
      setTitle('')
      setPreviewUrl('')
      fetchImages()
    } catch (error) {
      console.error(error)
      setMessage('Upload failed.')
    } finally {
      setUploading(false)
    }
  }

  const fetchImages = async () => {
    try {
      const res = await axios.get('/api/awards-giving')
      if (res.data.success) {
        setImages(res.data.data)
      }
    } catch (error) {
      console.error('Error fetching images:', error)
    }
  }

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This image will be deleted permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    })

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/awards-giving?id=${id}`)
        setImages((prev) => prev.filter((img) => img.id !== id))
        Swal.fire('Deleted!', 'The image has been deleted.', 'success')
      } catch (error) {
        console.error('Error deleting image:', error)
        Swal.fire('Error!', 'Failed to delete image.', 'error')
      }
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  // Close modal when clicking outside modal content
  const handleModalOverlayClick = (e) => {
    if (e.target.id === 'modalOverlay') {
      setModalData(null)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="font-bold mb-6 text-center text-2xl">Upload Awards Giving Image</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Upload Form */}
        <div className="border rounded p-4 w-full md:w-1/3 order-1 md:order-2">
          <input
            type="text"
            placeholder="Enter image title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-3 w-full border px-2 py-1 rounded"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-3 block w-full"
          />

          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="mb-3 w-full h-auto border rounded"
            />
          )}

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Upload Image'}
          </button>

          {message && <p className="mt-3 text-sm text-center">{message}</p>}
        </div>

        {/* Uploaded Images */}
        <div className="rounded p-4 overflow-y-auto max-h-[600px] flex-1 order-2 md:order-1">
          <h3 className="font-semibold mb-4 text-center">Uploaded Images</h3>
          {images.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="border rounded p-2 flex flex-col items-center w-full sm:w-[calc(50%-0.5rem)] cursor-pointer hover:shadow-md"
                  onClick={() =>
                    setModalData({
                      image_url: img.image_url,
                      title: img.title,
                    })
                  }
                >
                  <img
                    src={img.image_url}
                    alt={img.title || 'Award'}
                    className="h-32 w-auto object-cover mb-2"
                  />
                  <p className="text-center text-sm font-medium mb-2">{img.title}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(img.id)
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No images uploaded yet.</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalData && (
        <div
          id="modalOverlay"
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={handleModalOverlayClick}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-lg w-full p-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalData(null)}
              className="absolute top-2 right-2 text-gray-700 hover:text-red-600 text-2xl font-bold"
              aria-label="Close modal"
            >
              &times;
            </button>
            <img
              src={modalData.image_url}
              alt={modalData.title}
              className="w-full max-h-[400px] object-contain rounded mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{modalData.title}</h3>
          </div>
        </div>
      )}
    </div>
  )
}
