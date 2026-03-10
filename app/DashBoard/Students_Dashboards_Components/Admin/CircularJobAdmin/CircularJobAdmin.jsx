'use client';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function CircularJobAdmin() {
    const [jobData, setJobData] = useState({
        title: '',
        category: '', // <-- new field
        company: '',
        email: '',
        location: '',
        description: '',
        responsibilities: '',
        requirements: '',
        benefits: '',
        logo: null
    });

    // Handle text input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobData({ ...jobData, [name]: value });
    };

    // Handle file input for logo
    const handleFileChange = (e) => {
        setJobData({ ...jobData, logo: e.target.files[0] });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ask user before posting
        const result = await Swal.fire({
            title: 'Do you want to post this job?',
            text: "You can cancel if you don't want to post.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Post',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            try {
                let logoUrl = null;

                // Upload logo to ImgBB if a file is selected
                if (jobData.logo) {
                    const imgbbForm = new FormData();
                    imgbbForm.append('image', jobData.logo);

                    const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=3d64b0e9dee39ca593b9da32467663ee`, {
                        method: 'POST',
                        body: imgbbForm,
                    });

                    const imgbbData = await imgbbRes.json();
                    if (imgbbData.success) {
                        logoUrl = imgbbData.data.url;
                    } else {
                        throw new Error('Image upload failed');
                    }
                }

                // Prepare job data to send to your API
                const jobPayload = {
                    ...jobData,
                    logo: logoUrl, // send the uploaded image URL
                };

                // Send job data to your Next.js API
                const response = await fetch('/api/jobs', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(jobPayload),
                });

                const data = await response.json();

                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Job Posted!',
                        text: 'Your job circular has been successfully posted.',
                        confirmButtonColor: '#17549A',
                    });

                    setJobData({
                        title: '',
                        company: '',
                        email: '',
                        location: '',
                        description: '',
                        responsibilities: '',
                        requirements: '',
                        benefits: '',
                        logo: null,
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: data.message || 'Error posting job!',
                    });
                }

            } catch (err) {
                console.error(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to post job: ' + err.message,
                });
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
                icon: 'info',
                title: 'Cancelled',
                text: 'Job posting was cancelled.',
                confirmButtonColor: '#3085d6',
            });
        }
    };
    // Cancel/Reset button with SweetAlert confirmation
    const handleReset = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "All your entered data will be cleared!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, reset it!',
        }).then((result) => {
            if (result.isConfirmed) {
                setJobData({
                    title: '',
                    company: '',
                    email: '',
                    location: '',
                    description: '',
                    responsibilities: '',
                    requirements: '',
                    benefits: '',
                    logo: null,
                });
                Swal.fire('Reset!', 'Form has been cleared.', 'success');
            }
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-10">
            <h2 className="text-2xl font-bold mb-6">Post a New Job Circular</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Job Title */}
                <div>
                    <label className="block font-medium mb-1">Job Title</label>
                    <input
                        type="text"
                        name="title"
                        value={jobData.title}
                        onChange={handleChange}
                        placeholder='Title'
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                {/* Company Name */}
                <div>
                    <label className="block font-medium mb-1">Company</label>
                    <input
                        type="text"
                        name="company"
                        value={jobData.company}
                        onChange={handleChange}
                        placeholder='Company Name'
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block font-medium mb-1">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={jobData.category}
                        onChange={handleChange}
                        placeholder="Enter job category, e.g., IT, Marketing"
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                {/* Company / HR Email */}
                <div>
                    <label className="block font-medium mb-1">Company / HR Email</label>
                    <input
                        type="email"
                        name="email"
                        value={jobData.email}
                        onChange={handleChange}
                        placeholder="Enter HR or company email"
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                {/* Location */}
                <div>
                    <label className="block font-medium mb-1">Location</label>
                    <textarea
                        name="location"
                        value={jobData.location}
                        onChange={handleChange}
                        rows={2}
                        placeholder="Enter the location(s) for this job"
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block font-medium mb-1">Description</label>
                    <textarea
                        name="description"
                        value={jobData.description}
                        onChange={handleChange}
                        rows={4}
                        placeholder='Tye Here...'
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                {/* Responsibilities */}
                <div>
                    <label className="block font-medium mb-1">Responsibilities</label>
                    <textarea
                        name="responsibilities"
                        value={jobData.responsibilities}
                        onChange={handleChange}
                        rows={4}
                        placeholder="List responsibilities separated by line breaks"
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                {/* Requirements */}
                <div>
                    <label className="block font-medium mb-1">Requirements</label>
                    <textarea
                        name="requirements"
                        value={jobData.requirements}
                        onChange={handleChange}
                        rows={4}
                        placeholder="List requirements separated by line breaks"
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                {/* Benefits */}
                <div>
                    <label className="block font-medium mb-1">Benefits</label>
                    <textarea
                        name="benefits"
                        value={jobData.benefits}
                        onChange={handleChange}
                        rows={4}
                        placeholder="List benefits separated by line breaks"
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                {/* Logo */}
                <div>
                    <label className="block font-medium mb-1">Company Logo</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                    {jobData.logo && (
                        <p className="mt-2 text-sm text-gray-600">Selected file: {jobData.logo.name}</p>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-4">
                    <button type="submit" className="px-4 py-2 bg-[#17549A] text-white rounded hover:bg-[#0370ec]">
                        Post Job
                    </button>
                    <button
                        type="reset"
                        onClick={() =>
                            setJobData({
                                title: '',
                                company: '',
                                email: '',
                                location: '',
                                description: '',
                                responsibilities: '',
                                requirements: '',
                                benefits: '',
                                logo: null
                            })
                        }
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
}
