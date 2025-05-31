
'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Swal from 'sweetalert2';
import useRegistered from '@/hooks/useRegistered';
import useStudentEditProfile from '@/hooks/useStudentEditProfile';
import useUserMatching from '@/hooks/useUserMatching';

export default function Achievements() {
    const [images, setImages] = useState([]);
    const [imageDetails, setImageDetails] = useState([]);
    const [submittedImages, setSubmittedImages] = useState([]);
    const {  matchedStudent } = useUserMatching();


    // email
    // const emails = matchedAchievements?.map(item => item.email);
    // console.log("All emails:", emails);


    // console.log(Achievement); 
    console.log(matchedStudent?.email, '..........matchedStudent'); 

    const handleImageUpload = (e) => {



        const files = e.target.files;
        const newImages = Array.from(files).map((file) => {
            const id = Math.random().toString(36).substring(7);
            return {
                id,
                src: URL.createObjectURL(file),
                file,
                text: '',
                date: '',
                time: ''
            };
        });

        setImages((prev) => [...prev, ...newImages]);

        setImageDetails((prevDetails) => [
            ...prevDetails,
            ...newImages.map((img) => ({
                id: img.id,
                text: '',
                date: '',
                time: ''
            }))
        ]);
    };


    const handleInputChange = (e, id, type) => {
        const value = e.target.value;
        setImageDetails((prev) =>
            prev.map((d) => (d.id === id ? { ...d, [type]: value } : d))
        );
    };



    const handleSubmit = async () => {
        if (!matchedStudent?.email) {
            Swal.fire({
                title: 'Warning!',
                text: 'Please Fill Up your profile Edit.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return;
        }

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to submit all the data?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, submit it!',
            cancelButtonText: 'Cancel'
        });

        if (!result.isConfirmed) {
            return;
        }

        const imgbbApiKey = '3d64b0e9dee39ca593b9da32467663ee';

        try {
            for (const img of images) {
                const detail = imageDetails.find((d) => d.id === img.id);
                const formData = new FormData();
                formData.append('image', img.file);

                const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
                    method: 'POST',
                    body: formData
                });

                const imgbbData = await imgbbRes.json();
                const image_url = imgbbData?.data?.url;

                await axios.post('/api/achievements', {
                    image_url,
                    text: detail.text,
                    date: detail.date,
                    time: detail.time,
                    email: matchedStudent?.email
                });
            }

            setSubmittedImages(images.map(img => ({
                ...img,
                ...imageDetails.find((d) => d.id === img.id)
            })));
            setImages([]);
            setImageDetails([]);

            Swal.fire({
                title: 'Success!',
                text: 'All images submitted successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            });

        } catch (err) {
            console.error('Upload failed:', err);
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong during upload.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };


    useEffect(() => {
        document.title = images.length > 0 ? `Upload Images - ${images.length}` : "Upload Your Achievements";
    }, [images.length]);








    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-center my-10 font-bold text-3xl">Upload Your Achievements</h1>

            {/* Upload Box */}
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

            {/* Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {images.map((img) => {
                    const detail = imageDetails.find((d) => d.id === img.id);
                    return (
                        <div key={img.id} className="relative flex flex-col justify-between">
                            <div className="w-full h-48 relative">
                                <Image
                                    src={img.src}
                                    alt="Uploaded"
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg shadow-lg"
                                />
                            </div>
                            <div className="absolute bottom-2 left-2 bg-white px-4 py-2 rounded-lg w-11/12">
                                <input
                                    type="text"
                                    placeholder="Add achievement note"
                                    value={detail?.text || ''}
                                    onChange={(e) => handleInputChange(e, img.id, 'text')}
                                    className="mb-2 w-full px-2 py-1 border rounded"
                                />
                                <div className="flex space-x-2">
                                    <input
                                        type="date"
                                        value={detail?.date || ''}
                                        onChange={(e) => handleInputChange(e, img.id, 'date')}
                                        className="px-2 py-1 border rounded"
                                    />
                                    <input
                                        type="time"
                                        value={detail?.time || ''}
                                        onChange={(e) => handleInputChange(e, img.id, 'time')}
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

            {/* Display Submitted */}
            {submittedImages.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Uploaded Achievements</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {submittedImages.map((img, index) => (
                            <div key={index} className="border rounded p-3">
                                <img src={img.src} alt={`Achievement ${index + 1}`} className="w-full h-40 object-cover rounded mb-2" />
                                <p><strong>Note:</strong> {img.text}</p>
                                <p><strong>Date:</strong> {img.date}</p>
                                <p><strong>Time:</strong> {img.time}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

