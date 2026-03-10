
"use client";
import useAllJobsAdmin from "@/hooks/useAllJobsAdmin";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function ALLJobs() {
    const { AllJobsAdmin, refetch, loading } = useAllJobsAdmin();
    const [activeCategory, setActiveCategory] = useState("All");
    const [expandedJobId, setExpandedJobId] = useState(null);
    const [editJobId, setEditJobId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        requirements: "",
        responsibilities: "",
        benefits: "",
    });


    const categories = React.useMemo(() => {
        if (!AllJobsAdmin) return ["All"];
        return ["All", ...Array.from(new Set(AllJobsAdmin.map((job) => job.category)))];
    }, [AllJobsAdmin]);


    const filteredJobs = AllJobsAdmin?.filter((job) => {
        const matchesCategory = activeCategory === "All" || job.category === activeCategory;
        const matchesSearch =
            job.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });




    const toggleJobDetails = (id) => {
        setExpandedJobId((prev) => (prev === id ? null : id));
        setEditJobId(null);
    };

    const handleCancel = () => setEditJobId(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/jobs", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: editJobId, ...formData }),
            });
            const data = await res.json();
            if (data.success) {
                Swal.fire("Updated!", "Job updated successfully.", "success");
                setEditJobId(null);
                setExpandedJobId(null);
                refetch();
            } else {
                Swal.fire("Error", data.message, "error");
            }
        } catch (error) {
            console.error("Error updating job:", error);
        }
    };

    const handleEdit = (job) => {
        setEditJobId(job.id);
        setFormData({
            title: job.title,
            category: job.category || "",
            company: job.company || "",
            email: job.email || "",
            location: job.location || "",
            description: job.description,
            responsibilities: job.responsibilities,
            requirements: job.requirements,
            benefits: job.benefits,
            logo: job.logo || null,
        });
    };



    // Add this function for uploading image to ImgBB
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formDataImg = new FormData();
        formDataImg.append("image", file);

        try {
            const res = await fetch(`https://api.imgbb.com/1/upload?key=3d64b0e9dee39ca593b9da32467663ee`, {
                method: "POST",
                body: formDataImg,
            });
            const data = await res.json();
            if (data.success) {
                setFormData((prev) => ({ ...prev, logo: data.data.url }));
                Swal.fire("Uploaded!", "Image uploaded successfully.", "success");
            } else {
                Swal.fire("Error", "Image upload failed", "error");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            Swal.fire("Error", "Image upload failed", "error");
        }
    };


    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                const res = await fetch(`/api/jobs?id=${id}`, { method: "DELETE" });
                const data = await res.json();
                if (data.success) {
                    Swal.fire("Deleted!", "Job deleted successfully.", "success");
                    setExpandedJobId(null);
                    setEditJobId(null);
                    refetch();
                } else {
                    Swal.fire("Error", data.message, "error");
                }
            } catch (error) {
                console.error("Error deleting job:", error);
            }
        }
    };


           // Loading state
    if (loading || !AllJobsAdmin) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-28 w-28 border-t-4 border-blue-500 border-solid"></div>
            </div>
        );
    }
 
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-6xl mx-auto container">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    All Jobs Post
                </h1>

                {/* Search box */}
                <div className="mb-4 flex justify-center">
                    <input
                        type="text"
                        placeholder="Search by job title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-1/2 border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Job list */}
                    <main className="md:col-span-2">
                        <div className="space-y-4">
                            {filteredJobs?.map((job) => (
                                <div
                                    key={job.id}
                                    className="border bg-white p-4 rounded-lg shadow hover:shadow-lg transition relative"
                                >
                                    {/* Job card header */}
                                    <div
                                        onClick={() => toggleJobDetails(job.id)}
                                        className="flex items-center gap-4 cursor-pointer"
                                    >
                                        <img
                                            src={job.logo}
                                            alt={job.company}
                                            className="w-14 h-14 object-contain rounded"
                                        />
                                        <div>
                                            <h2 className="text-lg font-semibold">{job.title}</h2>
                                            <p className="text-gray-600">{job.company}</p>
                                            <p className="text-sm text-gray-500">{job.location}</p>
                                        </div>
                                    </div>

                                    {/* Delete button top-right */}
                                    <button
                                        onClick={() => handleDelete(job.id)}
                                        className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                                    >
                                        Delete
                                    </button>

                                    {/* Dropdown job details */}
                                    {expandedJobId === job.id && (
                                        <div className="mt-4 border-t pt-4">
                                            {editJobId === job.id ? (
                                                <form onSubmit={handleUpdate} className="space-y-3">

                                                    <div>
                                                        <p className="font-semibold text-gray-700">Company Logo</p>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleImageChange}
                                                            className="w-full border px-3 py-2 rounded"
                                                        />
                                                        {formData.logo && (
                                                            <img
                                                                src={formData.logo}
                                                                alt="Logo Preview"
                                                                className="mt-2 w-20 h-20 object-contain rounded border"
                                                            />
                                                        )}
                                                    </div>

                                                    <div>
                                                        <p className="font-semibold text-gray-700">Job Title</p>
                                                        <input
                                                            type="text"
                                                            name="title"
                                                            value={formData.title}
                                                            onChange={handleChange}
                                                            placeholder="Job Title"
                                                            className="w-full border px-3 py-2 rounded"
                                                        />
                                                    </div>

                                                    <div>
                                                        <p className="font-semibold text-gray-700">Description</p>
                                                        <textarea
                                                            name="description"
                                                            value={formData.description}
                                                            onChange={handleChange}
                                                            placeholder="Description"
                                                            className="w-full border px-3 py-2 rounded"
                                                        />
                                                    </div>

                                                    <div>
                                                        <p className="font-semibold text-gray-700">Responsibilities</p>
                                                        <textarea
                                                            name="responsibilities"
                                                            value={formData.responsibilities}
                                                            onChange={handleChange}
                                                            placeholder="Responsibilities"
                                                            className="w-full border px-3 py-2 rounded"
                                                        />
                                                    </div>

                                                    <div>
                                                        <p className="font-semibold text-gray-700">Requirements</p>
                                                        <textarea
                                                            name="requirements"
                                                            value={formData.requirements}
                                                            onChange={handleChange}
                                                            placeholder="Requirements"
                                                            className="w-full border px-3 py-2 rounded"
                                                        />
                                                    </div>

                                                    <div>
                                                        <p className="font-semibold text-gray-700">Benefits</p>
                                                        <textarea
                                                            name="benefits"
                                                            value={formData.benefits}
                                                            onChange={handleChange}
                                                            placeholder="Benefits"
                                                            className="w-full border px-3 py-2 rounded"
                                                        />
                                                    </div>

                                                    <div className="flex gap-3">
                                                        <button
                                                            type="submit"
                                                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                                        >
                                                            Update
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={handleCancel}
                                                            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </form>
                                            ) : (
                                                <>
                                                    <p className="mb-4">{job.description}</p>

                                                    <div className="mb-4">
                                                        <h3 className="font-semibold text-lg mb-2">Responsibilities</h3>
                                                        <p className="text-gray-700 whitespace-pre-line">
                                                            {job.responsibilities}
                                                        </p>
                                                    </div>

                                                    <div className="mb-4">
                                                        <h3 className="font-semibold text-lg mb-2">Requirements</h3>
                                                        <p className="text-gray-700 whitespace-pre-line">{job.requirements}</p>
                                                    </div>

                                                    <div className="mb-4">
                                                        <h3 className="font-semibold text-lg mb-2">Benefits</h3>
                                                        <p className="text-gray-700 whitespace-pre-line">{job.benefits}</p>
                                                    </div>

                                                    <div className="flex gap-3">
                                                        <button
                                                            onClick={() => handleEdit(job)}
                                                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => setExpandedJobId(null)}
                                                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {filteredJobs?.length === 0 && (
                                <p className="text-center text-gray-500">No jobs found in this category.</p>
                            )}
                        </div>
                    </main>

                    {/* Right side - categories */}
                    <aside className="bg-white p-4 rounded-lg shadow h-fit">
                        <h2 className="text-xl font-semibold mb-4">Categories</h2>
                        <ul className="space-y-2">
                            {categories.map((cat) => (
                                <li
                                    key={cat}
                                    className={`cursor-pointer ${activeCategory === cat
                                        ? "text-blue-800 font-semibold"
                                        : "text-blue-600 hover:underline"
                                        }`}
                                    onClick={() => setActiveCategory(cat)}
                                >
                                    {cat}
                                </li>
                            ))}
                        </ul>
                    </aside>

                </div>
            </div>
        </div>
    );
}
