import AdminFooter from '@/app/(with-navbar)/componenets/Admin Footer/AdminFooter';
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAdminGalleryAdded from '@/hooks/useAdminGalleryAdded';
import Image from 'next/image';
import { element } from 'prop-types';



const GalleryAdded = () => {
    const sections = [
        'Orientation Purpose',
        'Certification Purpose',
        'Awards Giving Purpose',
        'Pohela Boishakh',
        'Eid al-Fitr',
        'Eid al-Adha',
        'Charity Programme Purpose'
    ];

    const [gallery, setGallery] = useState({});
    const [captions, setCaptions] = useState({});
    const [loading, setLoading] = useState(false);

    const [userAdminGalleryAdded] = useAdminGalleryAdded();

    // console.log(userAdminGalleryAdded)

    const [selectedImage, setSelectedImage] = useState(null);





    const handleUpload = (section, event) => {
        const files = Array.from(event.target.files);
        setGallery((prevGallery) => ({
            ...prevGallery,
            [section]: [...(prevGallery[section] || []), ...files]
        }));
    };

    const handleCaptionChange = (section, index, caption) => {
        setCaptions((prevCaptions) => ({
            ...prevCaptions,
            [section]: {
                ...(prevCaptions[section] || {}),
                [index]: caption
            }
        }));
    };


    const uploadToImgBB = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post(
                'https://api.imgbb.com/1/upload?key=3d64b0e9dee39ca593b9da32467663ee',
                formData
            );

            if (response.data.success) {
                const imageUrl = response.data.data.url; // URL of the uploaded image
                console.log('Image uploaded successfully:', imageUrl); // Log the URL
                return imageUrl;
            } else {
                console.error('Error uploading image:', response.data.error);
                return null;
            }
        } catch (error) {
            console.error('Error uploading image to ImgBB:', error);
            return null;
        }
    };







    const handleSubmit = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to upload all images and captions?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Upload',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        });

        // Only proceed if user confirmed
        if (result.isConfirmed) {
            setLoading(true);

            try {
                for (let section of Object.keys(gallery)) {
                    const images = gallery[section];

                    for (let i = 0; i < images.length; i++) {
                        const file = images[i];
                        const caption = captions[section]?.[i] || '';

                        const imageUrl = await uploadToImgBB(file);

                        if (imageUrl) {
                            const payload = {
                                galleryImage: imageUrl,
                                eventText: caption,
                                CreatedTime: new Date().toISOString()
                            };

                            console.log("Payload to send:", payload);
                            await axios.post('/api/Admin_Gallery', payload);
                        }
                    }
                }

                Swal.fire({
                    icon: 'success',
                    title: 'Uploaded!',
                    text: 'All images and captions were successfully uploaded.',
                });

            } catch (error) {
                console.error('Error during upload or DB insert:', error);

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong during upload!',
                });
            }

            setLoading(false);
        } else {
            // User canceled the upload
            Swal.fire({
                icon: 'info',
                title: 'Cancelled',
                text: 'Upload has been cancelled.',
            });
        }
    };


    // handle delete function

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are You Sure!",
            text: 'This image will be deleted permanently deleted',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'yes, delete it!',
            cancelButtonText: 'Cancel',
        });


        if (result.isConfirmed) {
            try {
                const response = await axios.delete('/api/Admin_Gallery', {
                    data: { id },
                });
                if (response.data.success) {
                    Swal.fire('Deleted', 'Image has been deleted', 'success');
                    window.location.reload();
                } else {
                    Swal.fire('Error', 'Failed to deleted image.', 'error');
                }
            } catch (error) {
                console.error(error);
                Swal.fire('Error', 'Something went wrong!', 'error');
            }
        }
    }


    // handle edit function

    const handleEdit = async (item) => {
        const { value: newCaption } = await Swal.fire({
            title: 'Edit Caption',
            input: 'textarea',
            inputLabel: 'new caption',
            inputValue: item.event_text,
            showCancelButton: true,
            confirmButtonText: 'save',
        });


        if (newCaption !== undefined) {
            try {
                const response = await axios.put('/api/Admin_Gallery', {
                    id: item.id,
                    eventText: newCaption,
                });

                if (response.data.success) {
                    Swal.fire('updated!', 'caption updated successfully', 'success');
                    // window.location.reload();
                } else {
                    Swal.fire('Error', 'update failed', 'error');

                }
            } catch (error) {
                console.error(error);
                Swal.fire('Error', 'Something went wrong', 'error');
            }
        }

    }

    return (
        <div className="p-6 space-y-6 ">
            <header className="text-center py-6">
                <h1 className="text-2xl font-bold">Gallery Upload Page</h1>
                <p className="text-sm text-gray-600">Organize and upload images for different purposes</p>
            </header>
            {sections.map((section) => (
                <div key={section} className="border rounded-lg p-4 max-w-3xl container mx-auto bg-gray-50 shadow-md">
                    <h3 className="text-lg font-semibold mb-4">{section}</h3>
                    <div className="mb-4">
                        <label
                            htmlFor={section}
                            className="inline-block bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
                        >
                            Upload Images
                        </label>
                        <input
                            id={section}
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleUpload(section, e)}
                        />

                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {(gallery[section] || []).map((file, index) => (
                            <div key={index} className="border rounded-lg overflow-hidden shadow-sm p-2">
                                <Image
                                    width={800}
                                    height={800}
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    className="w-full h-32 object-cover"
                                />
                                <p className="text-center text-sm py-2 bg-gray-100">{file.name}</p>
                                <textarea
                                    className="w-full border rounded p-1 mt-2"
                                    placeholder="Write a caption..."
                                    value={captions[section]?.[index] || ''}
                                    onChange={(e) => handleCaptionChange(section, index, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <div className="text-center">
                <button
                    onClick={handleSubmit}
                    className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                    disabled={loading}
                >
                    {loading ? 'Uploading...' : 'Submit Data'}
                </button>
            </div>

            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
                    onClick={() => setSelectedImage(null)} // clicking outside
                >
                    <div
                        className="bg-white rounded-lg overflow-hidden shadow-lg max-w-md w-full relative"
                        onClick={(e) => e.stopPropagation()} // prevent modal close when clicking inside
                    >
                        {/* Close Icon */}
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-2 right-2 text-gray-700 hover:text-red-600 text-xl font-bold z-10"
                        >
                            &times;
                        </button>

                        {/* Image */}
                        <Image
                            width={800}
                            height={800}
                            src={selectedImage.gallery_image}
                            alt="Selected"
                            className="w-full object-cover h-full rounded-t-lg"
                        />

                        {/* Caption + Date */}
                        <div className="bg-black  text-white p-1 rounded-b-lg">

                            <p className="mb-3">{selectedImage.event_text}</p>
                            <p className="text-sm text-gray-300">Uploaded at: {selectedImage.created_at}</p>
                        </div>

                    </div>
                </div>
            )}


            <div className="mt-10">
                <h2 className="text-xl font-bold mb-4">Previously Uploaded Images</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                    {userAdminGalleryAdded?.map((item, index) => (
                        <div key={index} className="border rounded-lg shadow-sm overflow-hidden relative group">
                            <Image
                                width={800}
                                height={800}
                                src={item.gallery_image}
                                alt={`Gallery ${index}`}
                                className="w-full h-40 object-cover cursor-pointer"
                                onClick={() => setSelectedImage(item)}
                            />
                            <p className="p-2 text-sm bg-gray-100">{item.event_text}</p>
                            <p className="p-2 text-sm bg-gray-100">{item.created_at}</p>

                            {/* Edit/Delete buttons */}
                            <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="bg-yellow-400 text-white px-2 py-1 rounded text-xs hover:bg-yellow-500"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}


                </div>
            </div>

            <AdminFooter text="Gallery Upload. All Rights Reserved." />
        </div>
    );
};

export default GalleryAdded;
