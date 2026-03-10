'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import UpdatedProfile from '../updatedProfile/UpdatedProfile';
import useRegistered from '@/hooks/useRegistered';
import useStudentEditProfile from '@/hooks/useStudentEditProfile';
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
    category: '',
    studentType: '',
  });
  const [loading, setLoading] = useState(false); // for form submit
  const [initialLoading, setInitialLoading] = useState(true); // for first-time data load
  const fileInputRef = useRef(null);
  const [newlySubmittedStudent, setNewlySubmittedStudent] = useState(null);
  const { ManualUser } = UserAuth();
  const [register] = useRegistered();
  const [studentEditProfile] = useStudentEditProfile();

  const [matchedStudent, setMatchedStudent] = useState(null);

// console.log(studentEditProfile)

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
    if (file) setImage(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const uploadImage = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        try {
          const base64 = reader.result.split(',')[1];
          const res = await fetch('/api/uploadImage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageBase64: base64 }),
          });
          const data = await res.json();
          resolve(data.url);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject('Failed to read file');
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    for (let key in formData) {
      if (!formData[key]?.trim()) {
        alert(`Field ${key} is required`);
        setLoading(false);
        return;
      }
    }

    try {
      let imageUrl = '';
      if (fileInputRef.current?.files?.[0]) {
        imageUrl = await uploadImage(fileInputRef.current.files[0]);
      } else if (matchedStudent?.uploadedImage) {
        imageUrl = matchedStudent.uploadedImage;
      } else {
        alert('Please upload an image');
        setLoading(false);
        return;
      }

      const payload = {
        ...formData,
        uploadedImage: imageUrl,
        id: matchedStudent?.id,
      };

      const response = await fetch('/api/students_Edit_Profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setNewlySubmittedStudent(payload);
        setMatchedStudent(payload);
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

  // Autofill email on new register
  useEffect(() => {
    if (register?.data?.length > 0 && ManualUser?.email) {
      setFormData((prev) => ({ ...prev, email: ManualUser.email }));
    }
  }, [register, ManualUser]);

  // Match student for edit mode
  useEffect(() => {
    if (!ManualUser?.email) return;

    const editedStudent = studentEditProfile?.data?.find(
      (profile) => profile.email?.toLowerCase() === ManualUser.email.toLowerCase()
    );

    if (editedStudent) {
      setMatchedStudent(editedStudent);
    } else if (newlySubmittedStudent) {
      setMatchedStudent(newlySubmittedStudent);
    } else {
      setMatchedStudent(null);
    }

    // finish initial loading once we check
    setInitialLoading(false);
  }, [ManualUser, studentEditProfile, newlySubmittedStudent]);

  // Prefill formData when matchedStudent is found
  useEffect(() => {
    if (matchedStudent) {
      setFormData({
        name: matchedStudent.name || "",
        maritalStatus: matchedStudent.maritalStatus || "",
        email: matchedStudent.email || "",
        phone: matchedStudent.phone || "",
        address: matchedStudent.address || "",
        permanentAddress: matchedStudent.permanentAddress || "",
        facebook: matchedStudent.facebook || "",
        linkedin: matchedStudent.linkedin || "",
        aboutMyself: matchedStudent.aboutMyself || "",
        category: matchedStudent.category || "",
        studentType: matchedStudent.studentType || "",
      });
    }
  }, [matchedStudent]);

  return (
    <>
      <Head>
        <meta name="description" content="Edit and update your profile." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main className="p-6">
        <section className="max-w-4xl mx-auto">
          {initialLoading ? (
            <Loader />
          ) : (
            <>
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

              {loading ? (
                <Loader />
              ) : matchedStudent ? (
                <UpdatedProfile
                  image={image}
                  formData={formData}
                  matchedStudent={matchedStudent}
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

                    {/* Student Type dropdown */}
                    <div className="mb-4 sm:col-span-2">
                      <label className="block font-medium mb-1">Student Type:</label>
                      <select
                        name="studentType"
                        value={formData.studentType}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                      >
                        <option value="">--Select--</option>
                        <option value="Student">Student</option>
                        <option value="Running_Student">Running Students</option>
                        <option value="Running_Interns">Running Interns</option>
                        <option value="Running_Employee">Running Employees</option>
                      </select>
                    </div>

                    {/* Student Category dropdown */}
                    <div className="mb-4">
                      <label className="block font-medium mb-1">Select Student Category:</label>
                      <select
                        name="category"
                        value={formData.category || ""}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                      >
                        <option value="">--Select--</option>
                        <option value="Students_Graphics">Students_Graphics</option>
                        <option value="Students_Motions">Students_Motions</option>
                        <option value="Students_Affiliating">Students_Affiliating</option>
                        <option value="Students_Video">Students_Video</option>
                        <option value="Students_Business_Development">Students_Business_Development</option>
                        <option value="Students_Frontend_Developmet">Students_Frontend_Development</option>
                        <option value="Students_Backend_Development">Students_Backend_Development</option>
                        <option value="Students_DigitalMarketing">Students_DigitalMarketing</option>
                      </select>
                    </div>

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
            </>
          )}
        </section>
      </main>
    </>
  );
}
