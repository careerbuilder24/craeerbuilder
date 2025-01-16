import AdminFooter from '@/app/(with-navbar)/componenets/Admin Footer/AdminFooter';
import React, { useState } from 'react';

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

    const handleSubmit = () => {
        const dataToSubmit = Object.keys(gallery).map((section) => {
            return {
                section,
                images: (gallery[section] || []).map((file, index) => ({
                    file,
                    caption: captions[section]?.[index] || ''
                }))
            };
        });
        console.log('Data to submit:', dataToSubmit);
        // Add your backend submission logic here
    };

    return (
        <div className="p-6 space-y-6">
            <header className="text-center py-6 bg-gray-100 shadow-md">
                <h1 className="text-2xl font-bold">Gallery Upload Page</h1>
                <p className="text-sm text-gray-600">Organize and upload images for different purposes</p>
            </header>
            {sections.map((section) => (
                <div key={section} className="border rounded-lg p-4 bg-gray-50 shadow-md">
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
                                <img
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
                >
                    Submit Data
                </button>
            </div>
            <AdminFooter text="Gallery Upload. All Rights Reserved." />

        </div>
    );
};

export default GalleryAdded;
