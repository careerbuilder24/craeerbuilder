import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import useUserMatching from '@/hooks/useUserMatching';

export default function Page() {
  const [images, setImages] = useState([]);
  const [imageDetails, setImageDetails] = useState([]);
  const [submittedImages, setSubmittedImages] = useState([]);
  const [modalImage, setModalImage] = useState(null);
  const {matchedStudent} = useUserMatching()
    // const {matchedStudentProfilesEmail} = useMatchingUploadedCourses()

    
    console.log(matchedStudent?.email)
  // Handle image upload
  const handleImageUpload = (e) => {
    const files = e.target.files;
    const newImages = Array.from(files).map((file) => ({
      src: URL.createObjectURL(file),
      file,  // Keep original file for upload
      id: Math.random().toString(36).substring(7),
      text: '',
      date: '',
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
    setImageDetails((prevDetails) => [
      ...prevDetails,
      ...newImages.map((image) => ({
        id: image.id,
        text: '',
        date: '',
      })),
    ]);
  };

  // Handle text and date changes
  const handleInputChange = (e, id, type) => {
    const value = e.target.value;
    setImageDetails((prevDetails) =>
      prevDetails.map((detail) =>
        detail.id === id ? { ...detail, [type]: value } : detail
      )
    );
  };

  // Submit and upload to ImgBB + MySQL
  const handleSubmit = async (e) => {
    e.preventDefault();

    const imgbbApiKey = '3d64b0e9dee39ca593b9da32467663ee';  // Replace with your real API key
    const uploadedImages = [];

    for (const image of images) {
      const detail = imageDetails.find((detail) => detail.id === image.id);
      if (!detail) continue;

      const formData = new FormData();
      formData.append('image', image.file);

      let imageUrl = '';

      try {
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (data.success) {
          imageUrl = data.data.url;
        } else {
          console.error('ImgBB Upload Failed:', data);
          continue;
        }
      } catch (err) {
        console.error('ImgBB Upload Error:', err);
        continue;
      }

      uploadedImages.push({
        text: detail.text,
        date: detail.date,
         email: matchedStudent?.email,
        imageUrl,
      });
    }

    console.log('Uploaded Images:', uploadedImages);

    if (uploadedImages.length === 0) {
      alert('No images uploaded successfully.');
      return;
    }

    // Save to MySQL via API
    try {
      const res = await fetch('/api/certificates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ images: uploadedImages }),
      });

      const data = await res.json();
      if (data.success) {
        alert('Certificates uploaded and saved to database!');
        setSubmittedImages(uploadedImages);
        setImages([]);
        setImageDetails([]);
      } else {
        alert('Database save failed!');
      }
    } catch (err) {
      console.error('API Error:', err);
      alert('Server error saving certificates.');
    }
  };

  // Modal functions
  const handleImageClick = (imageSrc) => setModalImage(imageSrc);
  const handleModalClose = (e) => {
    if (e.target === e.currentTarget) setModalImage(null);
  };

  useEffect(() => {
    const closeModalOnClickOutside = (e) => {
      if (modalImage && e.target === e.currentTarget) setModalImage(null);
    };
    document.addEventListener('click', closeModalOnClickOutside);
    return () => {
      document.removeEventListener('click', closeModalOnClickOutside);
    };
  }, [modalImage]);

  return (
    <>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-center my-10 font-bold text-3xl">Upload Your Certificates</h1>

        {/* Upload Input */}
        <label htmlFor="image-upload" className="cursor-pointer mb-4 block">
          <div className="w-full text-4xl border-4 border-red-300 rounded-lg h-48 bg-gray-300 flex items-center justify-center text-white font-semibold">
            Upload Certificates
          </div>
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
        />

        {/* Display Uploaded Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {images.map((image) => {
            const detail = imageDetails.find((detail) => detail.id === image.id);
            return (
              <div key={image.id} className="relative flex flex-col justify-between">
                <div
                  className="w-full h-64 relative cursor-pointer"
                  onClick={() => handleImageClick(image.src)}
                >
                  <Image
                    src={image.src}
                    alt="Uploaded Certificate"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg shadow-lg"
                  />
                </div>

                {/* Image Details Inputs */}
                <div className="absolute bottom-2 left-2 bg-white px-4 py-2 rounded-lg w-11/12">
                  <input
                    type="text"
                    placeholder="Certificate Title"
                    value={detail ? detail.text : ''}
                    onChange={(e) => handleInputChange(e, image.id, 'text')}
                    className="mb-2 w-full px-2 py-1 border rounded"
                  />
                  <input
                    type="date"
                    value={detail ? detail.date : ''}
                    onChange={(e) => handleInputChange(e, image.id, 'date')}
                    className="w-full px-2 py-1 border rounded"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>

        {/* Display Submitted Images */}
        {submittedImages.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Submitted Certificates</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {submittedImages.map((image) => (
                <div key={image.imageUrl} className="relative flex flex-col justify-between">
                  <div
                    className="w-full h-64 relative cursor-pointer"
                    onClick={() => handleImageClick(image.imageUrl)}
                  >
                    <img
                      src={image.imageUrl}
                      alt="Uploaded Certificate"
                      className="w-full h-64 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="absolute bottom-2 left-2 bg-white px-4 py-2 rounded-lg w-11/12">
                    <p>{image.text}</p>
                    <p>{image.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleModalClose}
        >
          <div className="relative w-3/4 max-w-3xl bg-white p-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={handleModalClose}
              className="absolute top-2 right-2 text-white bg-red-600 rounded-full p-2"
            >
              X
            </button>
            <img src={modalImage} alt="Modal Image" className="w-full h-auto" />
          </div>
        </div>
      )}
    </>
  );
}
