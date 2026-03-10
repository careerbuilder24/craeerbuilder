'use client';
import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import useUploadedImage from '@/hooks/useUploadedImage';
import useStudentEditProfile from '@/hooks/useStudentEditProfile';

export default function Pictures({ student }) {
  // ALL hooks at the top
  const { UploadedImage } = useUploadedImage();
  const [modalImage, setModalImage] = useState(null);
  const [studentEditProfile] = useStudentEditProfile();
     const [loading, setLoading] = useState(true);

  // studentData computation
  const studentData = useMemo(() => {
    if (!studentEditProfile?.data || !student) return null;
    return studentEditProfile.data.find(
      s =>
        s.id === student.id ||
        s.email?.trim()?.toLowerCase() === student.email?.trim()?.toLowerCase()
    );
  }, [studentEditProfile, student]);

  // Filter images by student email (for all students)
  const studentImages = useMemo(() => {
    if (!Array.isArray(UploadedImage?.data)) return [];
    if (!student) return [];
    return UploadedImage.data.filter(
      (img) => img.email?.trim()?.toLowerCase() === student.email?.trim()?.toLowerCase()
    );
  }, [UploadedImage, student]);

       useEffect(() => {
          if (studentData) {
            setLoading(false);
          }
        }, [studentData]);
  
        if (loading) {
      return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="text-center">
            <div className="loader mb-4 border-4 border-blue-500 border-dashed rounded-full w-12 h-12 animate-spin mx-auto"></div>
            <p className="text-gray-600 text-lg">Loading student CV...</p>
          </div>
        </div>
      );
    }

  // Conditional rendering happens **after all hooks are called**
  if (!studentData || studentData.status !== 'accepted') {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-xl p-6 max-w-md text-center">
          <Image
            src="https://i.postimg.cc/NFcfNNkr/logo.jpg"
            alt="Restricted"
            width={300}
            height={300}
            className="mx-auto mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-800">
            Access Restricted
          </h2>
          <p className="text-gray-600 mt-2">
            This student's pictures are only visible after admin approval.
          </p>
          <p className="text-gray-500 mt-1">
            (Status: {studentData?.status || 'pending'})
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setModalImage(null)}
        >
          <img
            src={modalImage}
            alt="Uploaded"
            className="max-h-[90%] max-w-[90%] object-contain rounded"
          />
        </div>
      )}

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
        {studentImages.length > 0 ? (
          studentImages.map((img) => (
            <div
              key={img.id}
              className="relative w-full h-40 cursor-zoom-in overflow-hidden rounded shadow-lg"
              onClick={() => setModalImage(img.image_url)}
            >
              <Image
                src={img.image_url}
                alt={`Student upload ${img.id}`}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))
        ) : (
          <p className="text-center col-span-4 text-gray-500">
            No pictures uploaded for this student.
          </p>
        )}
      </div>
    </>
  );
}
