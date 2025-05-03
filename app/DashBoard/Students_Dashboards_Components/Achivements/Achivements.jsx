import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Page() {
    const [images, setImages] = useState([]);
    const [imageDetails, setImageDetails] = useState([]);
    const [submittedImages, setSubmittedImages] = useState([]);

    // Handle image upload
    const handleImageUpload = (e) => {
        const files = e.target.files;
        const newImages = Array.from(files).map((file) => ({
            src: URL.createObjectURL(file),
            id: Math.random().toString(36).substring(7),
            text: '',
            date: '',
            time: ''
        }));
        setImages((prevImages) => [...prevImages, ...newImages]);
        setImageDetails((prevDetails) => [
            ...prevDetails,
            ...newImages.map((image) => ({
                id: image.id,
                text: '',
                date: '',
                time: ''
            }))
        ]);
    };

    // Handle text, date, and time changes for image details
    const handleInputChange = (e, id, type) => {
        const value = e.target.value;
        setImageDetails((prevDetails) =>
            prevDetails.map((detail) =>
                detail.id === id ? { ...detail, [type]: value } : detail
            )
        );
    };

    // Handle submit: Move images and their details to submitted images state
    const handleSubmit = () => {
        const submitted = images.map((image) => {
            const detail = imageDetails.find((detail) => detail.id === image.id);
            return { ...image, text: detail.text, date: detail.date, time: detail.time };
        });
        setSubmittedImages(submitted);
        setImages([]); // Clear the current images after submission
        setImageDetails([]); // Clear the details after submission
        alert('Form Submitted!');
    };

    // Use useEffect to update document title dynamically based on uploaded images
    useEffect(() => {
        document.title = images.length > 0 ? `Upload Images - ${images.length} Images` : "Upload Your Achievements";
    }, [images.length]); // Update title whenever the number of images changes

    return (
        <>
            <div className="p-6 max-w-4xl mx-auto">
                <h1 className='text-center my-10 font-bold text-3xl'>Upload Your Achievements with Great Memory</h1>
                {/* Image Upload Section */}
                <label htmlFor="image-upload" className="cursor-pointer mb-4 block">
                    <div className="w-full text-4xl border-4 border-red-300 rounded-lg h-40 bg-gray-300 flex items-center justify-center text-white font-semibold">
                        Upload Images
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
                                <div className="w-full h-48 relative">
                                    <Image
                                        src={image.src}
                                        alt="Uploaded"
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-lg shadow-lg"
                                    />
                                </div>
                                {/* Image Details Inputs */}
                                <div className="absolute bottom-2 left-2 bg-white px-4 py-2 rounded-lg w-11/12">
                                    <input
                                        type="text"
                                        placeholder="Add details (e.g., achievements)"
                                        value={detail ? detail.text : ''}
                                        onChange={(e) => handleInputChange(e, image.id, 'text')}
                                        className="mb-2 w-full px-2 py-1 border rounded"
                                    />
                                    <div className="flex space-x-2">
                                        <input
                                            type="date"
                                            value={detail ? detail.date : ''}
                                            onChange={(e) => handleInputChange(e, image.id, 'date')}
                                            className="px-2 py-1 border rounded"
                                        />
                                        <input
                                            type="time"
                                            value={detail ? detail.time : ''}
                                            onChange={(e) => handleInputChange(e, image.id, 'time')}
                                            className="px-2 py-1 border rounded"
                                        />
                                    </div>
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
                        <h2 className="text-xl font-semibold mb-4">Submitted Images</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {submittedImages.map((image) => (
                                <div key={image.id} className="relative flex flex-col justify-between">
                                    <div className="w-full h-48 relative">
                                        <Image
                                            src={image.src}
                                            alt="Uploaded"
                                            layout="fill"
                                            objectFit="cover"
                                            className="rounded-lg shadow-lg"
                                        />
                                    </div>
                                    {/* Display Details */}
                                    <div className="absolute bottom-2 left-2 bg-white px-4 py-2 rounded-lg w-11/12">
                                        <p>{image.text}</p>
                                        <p>{image.date}</p>
                                        <p>{image.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
