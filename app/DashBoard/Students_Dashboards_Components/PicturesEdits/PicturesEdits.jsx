import React, { useState } from 'react';
import Image from 'next/image';

export default function Page() {
    const [images, setImages] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // Handle image upload
    const handleImageUpload = (e) => {
        const files = e.target.files;
        const newImages = Array.from(files).map((file) => ({
            src: URL.createObjectURL(file),
            id: Math.random().toString(36).substring(7),
        }));
        setImages((prevImages) => [...prevImages, ...newImages]);
    };

    // Open the modal with the selected image
    const openModal = (imageSrc) => {
        setSelectedImage(imageSrc);
        setIsModalOpen(true);
    };

    // Close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    // Trigger the file input click event
    const triggerFileInput = () => {
        document.getElementById('image-upload').click();
    };

    // Handle the submit action
    const handleSubmit = () => {
        if (images.length === 0) {
            alert('Please upload at least one image before submitting.');
        } else {
            alert('Images submitted successfully!');
            setImages([]); // Clear the images after submitting
        }
    };

    // Close modal if clicked outside of the modal content
    const handleModalClick = (e) => {
        // If the clicked target is the background overlay, close the modal
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <>
            <div className="p-6 max-w-4xl mx-auto">
                <h1 className='text-center my-10 font-bold text-3xl'>Upload Your Picture For Gallery</h1>

                {/* Upload Picture Button */}
                <button
                    onClick={triggerFileInput}
                    className="w-full text-4xl border-4 border-red-300 rounded-lg h-40 bg-gray-300 flex items-center justify-center text-white font-semibold mb-4"
                >
                    Upload Picture
                </button>

                {/* Image Upload Section (hidden file input) */}
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
                    {images.map((image) => (
                        <div key={image.id} className="relative">
                            <div className="w-full h-48 relative cursor-pointer">
                                <Image
                                    src={image.src}
                                    alt="Uploaded"
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg shadow-lg"
                                    onClick={() => openModal(image.src)} // Open modal on image click
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleSubmit}
                        className="w-full px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                    >
                        Submit
                    </button>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div 
                    className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center"
                    onClick={handleModalClick} // Add click event listener to close on background click
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
