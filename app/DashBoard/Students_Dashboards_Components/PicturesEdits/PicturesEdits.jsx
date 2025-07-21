import React, { useState } from 'react';
import Image from 'next/image';
import useUserMatching from '@/hooks/useUserMatching';
import Swal from 'sweetalert2';

export default function Page() {
    const [images, setImages] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const apiKey = '3d64b0e9dee39ca593b9da32467663ee'; // Replace with your actual ImgBB API key
    const { matchedStudent } = useUserMatching()

    console.log(matchedStudent?.email)

    // Handle image upload to ImgBB
    const handleImageUpload = async (e) => {
        const files = e.target.files;

        for (let file of files) {
            const formData = new FormData();
            formData.append('image', file);

            try {
                const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                    method: 'POST',
                    body: formData,
                });

                const data = await res.json();
                if (data.success) {
                    const hostedImageUrl = data.data.url;
                    const newImage = {
                        src: hostedImageUrl,
                        id: Math.random().toString(36).substring(7),
                    };
                    setImages((prevImages) => [...prevImages, newImage]);
                } else {
                    console.error('ImgBB Upload Failed', data);
                }
            } catch (error) {
                console.error('Upload Error:', error);
            }
        }
    };

    const openModal = (imageSrc) => {
        setSelectedImage(imageSrc);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    const triggerFileInput = () => {
        document.getElementById('image-upload').click();
    };

    // Submit hosted URLs to backend
    const handleSubmit = async () => {
        if (!matchedStudent?.email) {
            Swal.fire({
                title: 'Warning!',
                text: 'Please fill up your profile before submitting.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return;
        }

        if (images.length === 0) {
            Swal.fire({
                title: 'Warning!',
                text: 'Please upload at least one image before submitting.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return;
        }

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to submit these images?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, submit!',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            try {
                const imageEntries = images.map(img => ({
                    email: matchedStudent?.email || 'unknown',
                    imageUrl: img.src
                }));

                const res = await fetch('/api/StudentImage', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ images: imageEntries }),
                });

                if (res.ok) {
                    Swal.fire('Success!', 'Images saved successfully to database!', 'success');
                    setImages([]);
                } else {
                    Swal.fire('Failed!', 'Failed to save images.', 'error');
                }

            } catch (error) {
                console.error('Error saving images:', error);
                Swal.fire('Error!', 'An error occurred while saving images.', 'error');
            }

        } else {
            Swal.fire('Cancelled', 'Image submission cancelled.', 'info');
        }
    };

    const handleModalClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <>
            <div className="p-6 max-w-4xl mx-auto">
                <h1 className='text-center my-10 font-bold text-3xl'>Upload Your Picture For Gallery</h1>

                <button
                    onClick={triggerFileInput}
                    className="w-full text-4xl border-4 border-red-300 rounded-lg h-40 bg-gray-300 flex items-center justify-center text-white font-semibold mb-4"
                >
                    Upload Picture
                </button>

                <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                    {images.map((image) => (
                        <div key={image.id} className="relative">
                            <div className="w-full h-48 relative cursor-pointer">
                                <Image
                                    width={200}
                                    height={200}
                                    src={image.src}
                                    alt="Uploaded"
                                    objectFit="cover"
                                    className="rounded-lg shadow-lg"
                                    onClick={() => openModal(image.src)}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleSubmit}
                        className="w-full px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                    >
                        Submit
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center"
                    onClick={handleModalClick}
                >
                    <div className="relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-0 right-0 bg-white text-black rounded-full p-2 m-4"
                        >
                            X
                        </button>
                        <div className="w-full max-w-lg">
                            <img src={selectedImage} alt="Selected" className="w-full h-auto rounded-lg" />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
