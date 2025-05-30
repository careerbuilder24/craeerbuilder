'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import UpdatedProfile from '../updatedProfile/UpdatedProfile';
import useRegistered from '@/hooks/useRegistered';
import useStudentEditProfile from '@/hooks/useStudentEditProfile';
import axios from 'axios';
import Loader from '@/app/(with-navbar)/componenets/Loader/Loader';
import { UserAuth } from '@/app/context/AuthContext';

export default function Page() {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    maritalStatus: '',
    email: '',
    phone: '',
    address: '',
    permanentAddress: '',
    facebook: '',
    linkedin: '',
    aboutMyself: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [register] = useRegistered();
  const [studentEditProfile] = useStudentEditProfile();
  const [newlySubmittedStudent, setNewlySubmittedStudent] = useState(null);
   const {  ManualUser } = UserAuth();

  const fields = [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter Name' },
    { name: 'maritalStatus', label: 'Marital Status', type: 'text', placeholder: 'Enter Marital Status' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter Email' },
    { name: 'phone', label: 'Phone', type: 'text', placeholder: 'Enter Phone Number' },
    { name: 'address', label: 'Address', type: 'text', placeholder: 'Enter Address' },
    { name: 'permanentAddress', label: 'Permanent Address', type: 'text', placeholder: 'Enter Permanent Address' },
    { name: 'facebook', label: 'Facebook', type: 'text', placeholder: 'Enter Facebook URL' },
    { name: 'linkedin', label: 'LinkedIn', type: 'text', placeholder: 'Enter LinkedIn URL' },
  ];

  const textAreas = [
    { name: 'aboutMyself', label: 'About Myself', placeholder: 'Type Here' }
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const uploadImageToImgBB = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(
        'https://api.imgbb.com/1/upload?key=3d64b0e9dee39ca593b9da32467663ee',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (response.data.success) {
        return response.data.data.url;
      } else {
        throw new Error('Image upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error.response?.data || error.message);
      throw new Error('Image upload failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    for (let key in formData) {
      if (!formData[key].trim()) {
        alert(`Field ${key} is required`);
        setLoading(false);
        return;
      }
    }

    try {
      let imageUrl = '';
      if (fileInputRef.current?.files?.[0]) {
        imageUrl = await uploadImageToImgBB(fileInputRef.current.files[0]);
      } else {
        alert('Please upload an image');
        setLoading(false);
        return;
      }

      const payload = { ...formData, uploadedImage: imageUrl };

      const response = await fetch('/api/students_Edit_Profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
        setNewlySubmittedStudent(payload);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Form submission failed');
    } finally {
      setLoading(false);
    }
  };

  // Get latest registered user email
  useEffect(() => {
    if (register?.data?.length > 0) {
      const latestEmail = register.data[register.data.length - 1].email;
      setFormData((prev) => ({ ...prev, email: latestEmail }));
    }
  }, [register]);

  // profile matched section for show specific data
  // const latestRegisteredUser = register?.data?.[register?.data?.length - 1];
const matchedStudent = studentEditProfile?.data?.find(
  (profile) => profile.email === ManualUser?.email
);


  const finalStudentData =  matchedStudent  || newlySubmittedStudent;
  console.log(ManualUser)
  console.log(matchedStudent)

  return (
    <>
      <Head>
        <meta name="description" content="Edit and update your profile." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main className="p-6">
        <section className="max-w-4xl mx-auto">
          <header className="flex justify-between items-center mb-6 flex-col sm:flex-row">
            <h2 className="text-2xl font-semibold mb-4 sm:mb-0">Profile Edit</h2>
            <label htmlFor="image-upload" className="cursor-pointer mb-4">
              {image ? (
                <Image
                  src={image}
                  alt="Uploaded Profile"
                  width={200}
                  height={200}
                  className="w-24 h-24 object-cover rounded-full"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-300 flex items-center justify-center text-white rounded-full">
                  <img
                    src={matchedStudent?.uploadedImage?.trim() || '/default-avatar.png'}
                    alt="user image"
                    width={200}
                    height={200}
                    className="rounded-full object-cover"
                  />
                </div>
              )}
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </header>

          {loading || (submitted && !finalStudentData) ? (
            <Loader />
          ) : finalStudentData ? (
            <UpdatedProfile
              image={image}
              formData={formData}
              matchedStudent={finalStudentData}
            />
          ) : (
            <form onSubmit={handleSubmit}>
              <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {fields.map((field, idx) => (
                  <label key={idx} className="flex flex-col">
                    {field.label}
                    <input
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      className="mt-2 p-2 border rounded"
                      value={formData[field.name]}
                      onChange={handleChange}
                      readOnly={field.name === 'email'}
                    />
                  </label>
                ))}
                {textAreas.map((field, idx) => (
                  <label key={idx} className="flex flex-col sm:col-span-2">
                    {field.label}
                    <textarea
                      name={field.name}
                      placeholder={field.placeholder}
                      className="mt-2 p-2 border rounded"
                      value={formData[field.name]}
                      onChange={handleChange}
                    />
                  </label>
                ))}
              </section>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          )}
        </section>
      </main>
    </>
  );
}

