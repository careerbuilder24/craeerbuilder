
'use client';

import Link from 'next/link';
import React, { useState } from 'react';

export default function UpdatedProfile({ image, formData, matchedStudent }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedData, setEditedData] = useState({ ...matchedStudent });
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const uploadImageToImgBB = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=3d64b0e9dee39ca593b9da32467663ee`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    return data.data.url;
  };

  const handleSave = async () => {
    try {
      setIsUploading(true);

      let imageUrl = editedData.uploadedImage;

      // If a new image was selected, upload to ImgBB
      if (imageFile) {
        imageUrl = await uploadImageToImgBB(imageFile);
      }

      const updatedPayload = {
        ...editedData,
        uploadedImage: imageUrl,
      };

      const response = await fetch('/api/students_Edit_Profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPayload),
      });

      const result = await response.json();

      if (result.success) {
        alert("Profile updated successfully!");
        setIsModalOpen(false);
        window.location.reload(); // or refetch updated data
      } else {
        alert(`Update failed: ${result.message}`);
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong while updating the profile.");
    } finally {
      setIsUploading(false);
    }
  };


  

  return (
    <div className="bg-gray-200 p-6 rounded shadow-md">
      <img src={matchedStudent.uploadedImage} alt='user image' width={200} height={200} />

      {matchedStudent ? (
        <>
          <h4 className="text-lg font-semibold">Matched Student Details:</h4>
          <div className="mt-4"></div>
          <p><strong>Name:</strong> {matchedStudent.name}</p>
          <p>
            <strong>Email:</strong>
            <a href={`mailto:${matchedStudent.email}`} className='text-blue-500'>
              {matchedStudent.email}
            </a>
          </p>
          <p><strong>Phone:</strong> {matchedStudent.phone}</p>
          <p><strong>Address:</strong> {matchedStudent.address}</p>
          <p><strong>Facebook:</strong> <Link className='text-blue-500' href={matchedStudent.facebook}>{matchedStudent.facebook}</Link></p>
          <p><strong>LinkedIn:</strong> <Link className='text-blue-500' href={matchedStudent.linkedin}>{matchedStudent.linkedin}</Link></p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Edit
          </button>

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

                <input
                  type="text"
                  name="name"
                  value={editedData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border mb-2 rounded"
                  placeholder="Name"
                />
                <input
                  type="email"
                  name="email"
                  value={editedData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border mb-2 rounded"
                  placeholder="Email"
                />
                <input
                  type="text"
                  name="phone"
                  value={editedData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border mb-2 rounded"
                  placeholder="Phone"
                />
                <input
                  type="text"
                  name="address"
                  value={editedData.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border mb-2 rounded"
                  placeholder="Address"
                />
                <input
                  type="text"
                  name="facebook"
                  value={editedData.facebook}
                  onChange={handleInputChange}
                  className="w-full p-2 border mb-2 rounded"
                  placeholder="Facebook URL"
                />
                <input
                  type="text"
                  name="linkedin"
                  value={editedData.linkedin}
                  onChange={handleInputChange}
                  className="w-full p-2 border mb-2 rounded"
                  placeholder="LinkedIn URL"
                />

                <label className="block font-medium mt-2 mb-1">Change Profile Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mb-4"
                />

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-400 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isUploading}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    {isUploading ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : <p>No matched student found.</p>}
    </div>
  );
}
