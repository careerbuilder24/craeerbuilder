"use client";
import React, { useState } from "react";
import Navbar from "../componenets/Navbar/Navbar";
import Footer from "../componenets/Footer/Footer";
import useAllJobsAdmin from "@/hooks/useAllJobsAdmin";
import Link from "next/link";
import Swal from "sweetalert2";

export default function Page() {
    const { AllJobsAdmin } = useAllJobsAdmin();
    const [selectedJob, setSelectedJob] = useState(null);
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchText, setSearchText] = useState("");

    // Categories extracted from jobs
    const categories = ["All", ...new Set(AllJobsAdmin?.map((job) => job.category))] || [];

    // Helper: convert string to array for display
    const toArray = (text) => text ? [text] : [];

    // Filter jobs based on selected category and search text
    const filteredJobs = AllJobsAdmin?.filter((job) => {
        const matchesCategory = activeCategory === "All" || job.category === activeCategory;
        const matchesSearch = job.title.toLowerCase().includes(searchText.toLowerCase());
        return matchesCategory && matchesSearch;
    });
    const handleSubmit = async (e) => {
        e.preventDefault();

        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to submit this application?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Submit",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        }).then(async (result) => {
            if (!result.isConfirmed) return;

            const formData = new FormData(e.target);
            formData.append("jobId", selectedJob?.id);

            try {
                // 1️⃣ Send to your backend
                const res = await fetch("/api/applyApplicant", {
                    method: "POST",
                    body: formData,
                });
                const data = await res.json();

                if (!data.success) {
                    Swal.fire("Error", data.message || "Something went wrong saving to database", "error");
                    return;
                }

                // 2️⃣ Also send to FormSubmit (for email)
                await fetch("https://formsubmit.co/abuyeahia24@gmail.com", {
                    method: "POST",
                    body: formData,
                });

                // 3️⃣ Success alert
                Swal.fire("Submitted!", "Your application has been sent.", "success");
                setSelectedJob(null);
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Something went wrong, please try again.", "error");
            }
        });
    };
    return (
        <>
            <Navbar />
            <div className="p-4 bg-gray-100 min-h-screen mt-28">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">

                    {/* Left - Category Section */}
                    <aside className="md:col-span-1 order-2 md:order-1 bg-white p-4 rounded shadow">
                        <h2 className="text-xl font-semibold mb-4">Categories</h2>
                        <ul className="space-y-2 overflow-hidden">
                            {categories.map((cat, idx) => (
                                <li
                                    key={idx}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`cursor-pointer px-2 py-1 rounded ${activeCategory === cat
                                        ? "bg-blue-600 text-white"
                                        : "text-blue-600 hover:underline"
                                        }`}
                                >
                                    {cat}
                                </li>
                            ))}
                        </ul>
                    </aside>

                    {/* Center - Job Listings & Details */}
                    <main className="md:col-span-2 order-1 md:order-2">
                        {!selectedJob ? (
                            <>
                                {/* Search Box */}
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        placeholder="Search job by title..."
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)}
                                        className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Job List */}
                                <div className="space-y-4">
                                    {filteredJobs?.map((job) => (
                                        <div
                                            key={job.id}
                                            onClick={() => setSelectedJob(job)}
                                            className="border cursor-pointer bg-white p-4 rounded hover:shadow transition flex items-center gap-4 justify-between"
                                        >
                                            <div className="flex items-center gap-4">
                                                <img src={job.logo} alt={job.company} className="w-12 h-12 object-contain" />
                                                <div>
                                                    <h2 className="text-lg font-semibold">{job.title}</h2>
                                                    <p className="text-gray-600">{job.company}</p>
                                                    <p className="text-sm text-gray-500">{job.location}</p>
                                                </div>
                                            </div>

                                            {/* Apply Button */}
                                            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                                Apply
                                            </button>
                                        </div>
                                    ))}

                                    {filteredJobs?.length === 0 && (
                                        <p className="text-center text-gray-500">No jobs found.</p>
                                    )}
                                </div>
                            </>
                        ) : (
                            // Job Details
                            <div className="relative bg-white p-6 rounded shadow">
                                <button
                                    onClick={() => setSelectedJob(null)}
                                    className="absolute top-4 right-4 text-red-600 text-2xl font-bold hover:text-red-800"
                                    title="Close"
                                >
                                    ×
                                </button>

                                <div className="flex items-center gap-4 mb-4">
                                    <img src={selectedJob.logo} alt={selectedJob.company} className="w-16 h-16 object-contain" />
                                    <div>
                                        <h2 className="text-2xl font-bold">{selectedJob.title}</h2>
                                        <p className="text-gray-700 font-medium">{selectedJob.company}</p>
                                        <p className="text-gray-500">{selectedJob.location}</p>
                                    </div>
                                </div>

                                <p className="mb-6">{selectedJob.description}</p>

                                <div className="mb-6">
                                    <h3 className="font-semibold text-lg mb-2">Responsibilities</h3>
                                    <ul className="list-disc pl-6 space-y-1">
                                        {toArray(selectedJob.responsibilities).map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mb-6">
                                    <h3 className="font-semibold text-lg mb-2">Requirements</h3>
                                    <ul className="list-disc pl-6 space-y-1">
                                        {toArray(selectedJob.requirements).map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mb-6">
                                    <h3 className="font-semibold text-lg mb-2">Benefits</h3>
                                    <ul className="list-disc pl-6 space-y-1">
                                        {toArray(selectedJob.benefits).map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>

                                <h3 className="text-lg font-semibold mb-3">Apply Now</h3>
                                <form
                                    action="https://formsubmit.co/abuyeahia24@gmail.com"
                                    method="POST"
                                    encType="multipart/form-data"
                                    onSubmit={handleSubmit}
                                    className="grid grid-cols-1 gap-4"
                                >
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        required
                                        className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        required
                                        className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                    <input
                                        type="text"
                                        name="experience"
                                        placeholder="Experience"
                                        className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                    <textarea
                                        name="coverLetter"
                                        placeholder="Cover Letter"
                                        rows={4}
                                        className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden"
                                        onInput={(e) => {
                                            const target = e.target;
                                            target.style.height = "auto";
                                            target.style.height = target.scrollHeight + "px";
                                        }}
                                    ></textarea>

                                    <label className="block font-medium">Upload CV</label>
                                    <input
                                        type="file"
                                        name="cv"
                                        accept=".pdf,.doc,.docx"
                                        required
                                        className="border p-2 rounded-md"
                                    />

                                    <div className="flex gap-3">
                                        <button
                                            type="submit"
                                            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                                        >
                                            Submit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                Swal.fire({
                                                    title: "Cancel application?",
                                                    text: "Your form will be cleared!",
                                                    icon: "warning",
                                                    showCancelButton: true,
                                                    confirmButtonText: "Yes, Cancel",
                                                    cancelButtonText: "Back",
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        setSelectedJob(null);
                                                    }
                                                });
                                            }}
                                            className="flex-1 bg-red-500 px-4 py-2 rounded-md hover:bg-red-700 transition text-white"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>


 



                            </div>
                        )}
                    </main>

                    {/* Right - Advertisement Section */}
                    <aside className="md:col-span-1 order-3 bg-white p-4 rounded shadow text-center h-fit md:sticky md:top-28 overflow-y-hidden space-y-6">
                        <Link href="https://coursya.com/product/coursera/launch-your-online-business/"
                            className="group bg-gray-200 rounded p-4 shadow flex flex-col items-center hover:bg-gray-400 cursor-pointer ease-in-out duration-300">
                            <img src="https://i.postimg.cc/T1YHBvM9/sfgoj.png" alt="Ad 1" className="mb-3 rounded w-full object-cover" />
                            <p className="text-gray-700 mb-2 group-hover:text-white">
                                Boost your career with <strong>SkillUp Academy</strong>! Join our coding Boot camp today.
                            </p>
                            <div className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                                Learn More
                            </div>
                        </Link>

                        <Link href="https://www.datacamp.com/" className="group bg-gray-200 rounded p-4 shadow flex flex-col items-center hover:bg-gray-400 cursor-pointer ease-in-out duration-300">
                            <img src="https://i.postimg.cc/pr5McPh7/ewrj.png" alt="Ad 2" className="mb-3 rounded w-full object-cover" />
                            <p className="text-gray-700 mb-2 group-hover:text-white">
                                Join <strong>DataCamp</strong> and become a data science pro in 3 months.
                            </p>
                            <div className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
                                Try Free
                            </div>
                        </Link>

                        <Link href="https://www.fiverr.com/" className="group bg-gray-200 rounded p-4 shadow flex flex-col items-center hover:bg-gray-400 cursor-pointer ease-in-out duration-300">
                            <img src="https://i.postimg.cc/kGGgJrVF/sergoj.png" alt="Ad 3" className="mb-3 rounded w-full object-cover" />
                            <p className="text-gray-700 mb-2 group-hover:text-white">
                                Kickstart your freelancing career with <strong>Fiverr Pro</strong>.
                            </p>
                            <div className="inline-block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm">
                                Get Started
                            </div>
                        </Link>
                    </aside>
                </div>
            </div>

            <Footer />
        </>
    );
}
