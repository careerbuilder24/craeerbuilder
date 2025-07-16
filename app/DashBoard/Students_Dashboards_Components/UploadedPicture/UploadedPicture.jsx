import useUploadedImage from '@/hooks/useUploadedImage';
import React, { useState } from 'react';
import Image from 'next/image';
import useMatchingUploadedImage from '@/hooks/useMatchingUploadedImage';

export default function UploadedPicture() {
    const { UploadedImage, loading, error } = useUploadedImage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const {matchedStudentImageUploaded} = useMatchingUploadedImage();

    console.log(matchedStudentImageUploaded)

    const openModal = (imageUrl) => {
        setSelectedImage(imageUrl);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    if (loading) return <p className='text-center'>Loading images...</p>;
    if (error) return <p className='text-center text-red-500'>Failed to load images.</p>;

    return (
        <div className='p-6 max-w-7xl mx-auto'>
            <h1 className='text-3xl font-bold text-center mb-10 text-blue-700'>Uploaded Image Gallery</h1>

            {matchedStudentImageUploaded?.length === 0 ? (
                <p className='text-center'>No images uploaded yet.</p>
            ) : (
                <div className='flex flex-wrap justify-center gap-4'>
                    {matchedStudentImageUploaded?.map((image, index) => (
                        <div
                            key={index}
                            className='bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer'
                            style={{ width: '160px' }}
                            onClick={() => openModal(image.image_url)}
                        >
                            <div className='relative w-full aspect-[1/1] bg-gray-100'>
                                <Image
                                    src={image.image_url}
                                    alt={`Uploaded ${index + 1}`}
                                    fill
                                    className='object-cover'
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div
                    onClick={closeModal}
                    className='fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50'
                >
                    <div className='relative max-w-3xl w-full mx-4'>
                        <button
                            onClick={closeModal}
                            className='absolute top-2 right-2 text-white bg-gray-700 rounded-full p-2 text-xl z-50'
                        >
                            ✕
                        </button>
                        <img
                            src={selectedImage}
                            alt='Selected'
                            className='w-full h-auto rounded-lg shadow-xl'
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
