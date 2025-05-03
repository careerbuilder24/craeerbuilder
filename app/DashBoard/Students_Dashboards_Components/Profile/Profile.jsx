import Image from 'next/image';
import React, { useState } from 'react';
import Head from 'next/head';

export default function Page() {
  const [image, setImage] = useState(null);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  return (
    <>
      <Head>
        <title>Profile Edit Page - Customize Your Profile</title>
        <meta
          name="description"
          content="Edit and update your profile details, including name, contact information, skills, work experience, and more. Upload a profile picture and keep your profile up to date. Manage personal and professional details with ease."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Your Website Name" />
        <meta property="og:title" content="Profile Edit Page - Customize Your Profile" />
        <meta
          property="og:description"
          content="Manage your student profile, update CV, track achievements, edit portfolio, and more on the Career Builder dashboard. Stay organized and enhance your career prospects with easy access to your courses, certificates, and personal settings."
        />
        <meta property="og:image" content={image || '/default-profile.png'} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/profile-edit" />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="profile, edit, student profile, career builder, CV update, portfolio" />
      </Head>
      <main className="p-6">
        <section className="max-w-4xl mx-auto" role="main" aria-labelledby="profile-edit-title">
          {/* Profile Edit Header */}
          <header className="flex justify-between items-center mb-6 flex-col sm:flex-row">
            <h2 id="profile-edit-title" className="text-2xl font-semibold mb-4 sm:mb-0">Profile Edit</h2>

            {/* Image upload clickable area */}
            <label htmlFor="image-upload" className="cursor-pointer mb-4" aria-label="Upload Profile Picture">
              {image ? (
                <Image
                  src={image}
                  alt="Uploaded Profile Picture"
                  width={200}
                  height={200}
                  className="w-24 h-24 object-cover mx-auto rounded-full"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-300 flex items-center justify-center text-white rounded-full">
                  Upload
                </div>
              )}
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </header>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} aria-label="Profile Form">
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Form Fields */}
              {[ 
                { label: "Name", type: "text", placeholder: "Enter Name" },
                { label: "Marital Status", type: "text", placeholder: "Enter Marital Status" },
                { label: "Email", type: "email", placeholder: "Enter Email" },
                { label: "Phone", type: "text", placeholder: "Enter Phone Number" },
                { label: "Address", type: "text", placeholder: "Enter Address" },
                { label: "Permanent Address", type: "text", placeholder: "Enter Permanent Address" },
                { label: "Facebook", type: "text", placeholder: "Enter Facebook URL" },
                { label: "LinkedIn", type: "text", placeholder: "Enter LinkedIn URL" }
              ].map((field, index) => (
                <label key={index} className="flex flex-col">
                  {field.label}
                  <input 
                    type={field.type} 
                    placeholder={field.placeholder} 
                    className="mt-2 p-2 border rounded" 
                    aria-label={field.label}
                  />
                </label>
              ))}

              {/* Textarea Fields */}
              {[ 
                { label: "Objective", placeholder: "Enter Objective" },
                { label: "Education", placeholder: "Enter Education Details" },
                { label: "Work Experience", placeholder: "Enter Work Experience" },
                { label: "Core Skills", placeholder: "Enter Core Skills" },
                { label: "Extra Curriculum", placeholder: "Enter Extra Curriculum Activities" },
                { label: "Career Summary", placeholder: "Enter Career Summary" }
              ].map((field, index) => (
                <label key={index} className="flex flex-col">
                  {field.label}
                  <textarea 
                    placeholder={field.placeholder} 
                    className="mt-2 p-2 border rounded" 
                    aria-label={field.label}
                  />
                </label>
              ))}
            </section>

            {/* Submit Button */}
            <div className="mt-6">
              <button 
                type="submit" 
                className="w-full px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
