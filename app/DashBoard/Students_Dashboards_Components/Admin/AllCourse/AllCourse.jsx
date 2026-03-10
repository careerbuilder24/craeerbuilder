'use client';
import React, { useEffect, useState } from 'react';
import { MdAccessTime, MdPeopleAlt } from 'react-icons/md';
import Image from 'next/image';
import Swal from 'sweetalert2';
import axios from 'axios';
import useDetailsCourses from '@/hooks/useDetailsCourses';

export default function AllCourse() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const { DetailsCourses } = useDetailsCourses()

    // Fetch all courses
    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/courses');
                const result = await response.json();

                if (result.success && result.course) {
                    setCourses(result.course);
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    // Open edit modal
    const handleEditClick = (course) => {
        setSelectedCourse({ ...course });
        setEditModalOpen(true);
    };

    // Update input fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedCourse((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Update API call
    const handleUpdateCourse = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/courses?id=${selectedCourse.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selectedCourse),
            });

            const result = await response.json();
            if (result.success) {
                Swal.fire('Updated!', 'Course has been updated successfully.', 'success');
                setCourses((prev) =>
                    prev.map((c) => (c.id === selectedCourse.id ? selectedCourse : c))
                );
                setEditModalOpen(false);
            } else {
                Swal.fire('Error', 'Failed to update course', 'error');
            }
        } catch (error) {
            console.error('Error updating course:', error);
            Swal.fire('Error', 'Something went wrong', 'error');
        }
    };

    // Delete Course
    const handleDeleteCourseCard = async (courseId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This course will be deleted permanently!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`/api/courses?id=${courseId}`);
                setCourses((prev) => prev.filter((course) => course.id !== courseId));
                Swal.fire('Deleted!', 'The course has been deleted.', 'success');
            } catch (error) {
                console.error('Error deleting course:', error);
                Swal.fire('Error!', 'Failed to delete course.', 'error');
            }
        }
    };
    console.log(DetailsCourses)
    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-28 w-28 border-t-4 border-blue-500 border-solid"></div>
                </div>
            ) : (
                <div className="container mx-auto w-11/12 xl:w-8/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:mt-10">
                    {courses?.map((course) => (
                        <div
                            key={course.id}
                            className="flex flex-col justify-between shadow-md border border-gray-200 hover:border-[#56D3FD] transition-all duration-300 rounded-xl overflow-hidden h-full bg-white"
                        >
                            {/* Banner Image */}
                            <div className="relative w-full h-48">
                                <Image
                                    src={course?.banner_image || '/placeholder-banner.jpg'}
                                    alt="Course Banner"
                                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                                    onDragStart={(e) => e.preventDefault()}
                                    layout="fill"
                                />
                            </div>

                            {/* Course Info */}
                            <div className="p-3 text-xs">
                                <h2 className="text-base font-bold mb-2">{course.course_title}</h2>
                                <div className="px-2 py-1 text-gray-700">Batch {course.batch_number}</div>
                                <div className="px-2 py-1 text-gray-700 flex items-center gap-1">
                                    <MdPeopleAlt /> {course.seats_left} Seats
                                </div>
                                <div className="px-2 py-1 text-gray-700 flex items-center gap-1">
                                    <MdAccessTime /> {course.time_left}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="p-4 flex flex-col flex-grow mt-auto">
                                <div className="flex justify-between gap-2">
                                    <button
                                        onClick={() => handleEditClick(course)}
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition mt-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteCourseCard(course.id)}
                                        className="flex-1 bg-red-500 hover:bg-red-700 text-white py-2 rounded transition mt-2"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Edit Modal */}
                    {/* {editModalOpen && selectedCourse && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white p-6 rounded-lg relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                                <button
                                    onClick={() => setEditModalOpen(false)}
                                    className="absolute top-2 right-3 text-2xl text-gray-500 hover:text-red-600"
                                    aria-label="Close Modal"
                                >
                                    &times;
                                </button>

                                <h2 className="text-2xl mb-4 font-semibold">Edit Course</h2>
                                <form onSubmit={handleUpdateCourse} className="space-y-4">

                                    <input
                                        type="text"
                                        name="course_title"
                                        value={selectedCourse.course_title || ''}
                                        onChange={handleInputChange}
                                        placeholder="Course Title"
                                        className="w-full border px-3 py-2 rounded"
                                    />

                                    <input
                                        type="text"
                                        name="batch_number"
                                        value={selectedCourse.batch_number || ''}
                                        onChange={handleInputChange}
                                        placeholder="Batch Number"
                                        className="w-full border px-3 py-2 rounded"
                                    />

                                    <input
                                        type="text"
                                        name="course_cost"
                                        value={selectedCourse.course_cost || ''}
                                        onChange={handleInputChange}
                                        placeholder="Course Cost"
                                        className="w-full border px-3 py-2 rounded"
                                    />

                                    <input
                                        type="text"
                                        name="seats_left"
                                        value={selectedCourse.seats_left || ''}
                                        onChange={handleInputChange}
                                        placeholder="Seats Left"
                                        className="w-full border px-3 py-2 rounded"
                                    />

                                    <input
                                        type="datetime-local"
                                        name="time_left"
                                        value={selectedCourse.time_left?.slice(0, 16) || ''}
                                        onChange={handleInputChange}
                                        className="w-full border px-3 py-2 rounded"
                                    />


                                    <input
                                        type="text"
                                        name="course_outline_title"
                                        value={selectedCourse.course_outline_title || ''}
                                        onChange={handleInputChange}
                                        placeholder="Outline Title"
                                        className="w-full border px-3 py-2 rounded"
                                    />

                                    <textarea
                                        name="course_outline_description"
                                        value={selectedCourse.course_outline_description || ''}
                                        onChange={handleInputChange}
                                        placeholder="Outline Description"
                                        className="w-full border px-3 py-2 rounded h-24"
                                    />


                                    <textarea
                                        name="Course_Benifits"
                                        value={selectedCourse.Course_Benifits || ''}
                                        onChange={handleInputChange}
                                        placeholder="Course Benefits"
                                        className="w-full border px-3 py-2 rounded h-24"
                                    />


                                    <textarea
                                        name="Course_Projects"
                                        value={selectedCourse.Course_Projects || ''}
                                        onChange={handleInputChange}
                                        placeholder="Course Projects"
                                        className="w-full border px-3 py-2 rounded h-24"
                                    />


                                    <div className="flex flex-col items-center">
                                        <img
                                            src={selectedCourse.instructor_image}
                                            alt="Instructor"
                                            className="w-32 h-32 object-cover rounded mb-2"
                                        />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={async (e) => {
                                                const file = e.target.files[0];
                                                if (!file) return;
                                                const formData = new FormData();
                                                formData.append('image', file);

                                                try {
                                                    const apiKey = '3d64b0e9dee39ca593b9da32467663ee';
                                                    const res = await fetch(
                                                        `https://api.imgbb.com/1/upload?key=${apiKey}`,
                                                        {
                                                            method: 'POST',
                                                            body: formData,
                                                        }
                                                    );
                                                    const data = await res.json();
                                                    if (data.success) {
                                                        setSelectedCourse((prev) => ({
                                                            ...prev,
                                                            instructor_image: data.data.url,
                                                        }));
                                                        Swal.fire(
                                                            'Uploaded!',
                                                            'Image uploaded successfully.',
                                                            'success'
                                                        );
                                                    } else {
                                                        Swal.fire('Error', 'Failed to upload image.', 'error');
                                                    }
                                                } catch (err) {
                                                    console.error('Image upload error:', err);
                                                    Swal.fire(
                                                        'Error',
                                                        'Something went wrong uploading image.',
                                                        'error'
                                                    );
                                                }
                                            }}
                                        />
                                    </div>


                                    <div className="flex justify-end space-x-3 pt-3">
                                        <button
                                            type="submit"
                                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                        >
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setEditModalOpen(false)}
                                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )} */}

                    {/*  Edit Modal */}
                    {editModalOpen && selectedCourse && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white p-6 rounded-lg relative w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                                <button
                                    onClick={() => setEditModalOpen(false)}
                                    className="absolute top-2 right-3 text-2xl text-gray-500 hover:text-red-600"
                                >
                                    &times;
                                </button>

                                <h2 className="text-2xl mb-4 font-semibold">Edit Course</h2>

                                <form onSubmit={handleUpdateCourse} className="space-y-4">
                                  
                                    <input
                                        type="text"
                                        name="course_title"
                                        value={selectedCourse.course_title || ""}
                                        onChange={handleInputChange}
                                        placeholder="Course Title"
                                        className="w-full border px-3 py-2 rounded"
                                    />

                                    <div className="grid grid-cols-2 gap-3">
                                        <input
                                            type="text"
                                            name="batch_number"
                                            value={selectedCourse.batch_number || ""}
                                            onChange={handleInputChange}
                                            placeholder="Batch Number"
                                            className="border px-3 py-2 rounded"
                                        />
                                        <input
                                            type="text"
                                            name="course_cost"
                                            value={selectedCourse.course_cost || ""}
                                            onChange={handleInputChange}
                                            placeholder="Course Cost"
                                            className="border px-3 py-2 rounded"
                                        />
                                        <input
                                            type="text"
                                            name="seats_left"
                                            value={selectedCourse.seats_left || ""}
                                            onChange={handleInputChange}
                                            placeholder="Seats Left"
                                            className="border px-3 py-2 rounded"
                                        />
                                        <input
                                            type="datetime-local"
                                            name="time_left"
                                            value={selectedCourse.time_left?.slice(0, 16) || ""}
                                            onChange={handleInputChange}
                                            className="border px-3 py-2 rounded"
                                        />
                                    </div>

                                  
                                    <div>
                                        <h3 className="font-semibold mb-2">Course Outlines</h3>
                                        {selectedCourse.Course_Outlines?.map((outline, i) => (
                                            <div key={i} className="border p-3 rounded mb-2">
                                                <input
                                                    type="text"
                                                    value={outline.title || ""}
                                                    onChange={(e) => {
                                                        const updated = [...selectedCourse.Course_Outlines];
                                                        updated[i].title = e.target.value;
                                                        setSelectedCourse((p) => ({
                                                            ...p,
                                                            Course_Outlines: updated,
                                                        }));
                                                    }}
                                                    placeholder="Title"
                                                    className="border w-full px-2 py-1 rounded mb-1"
                                                />
                                                <textarea
                                                    value={outline.desc || ""}
                                                    onChange={(e) => {
                                                        const updated = [...selectedCourse.Course_Outlines];
                                                        updated[i].desc = e.target.value;
                                                        setSelectedCourse((p) => ({
                                                            ...p,
                                                            Course_Outlines: updated,
                                                        }));
                                                    }}
                                                    placeholder="Description"
                                                    className="border w-full px-2 py-1 rounded"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const updated = selectedCourse.Course_Outlines.filter(
                                                            (_, idx) => idx !== i
                                                        );
                                                        setSelectedCourse((p) => ({
                                                            ...p,
                                                            Course_Outlines: updated,
                                                        }));
                                                    }}
                                                    className="text-red-600 mt-1 text-sm"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setSelectedCourse((p) => ({
                                                    ...p,
                                                    Course_Outlines: [...(p.Course_Outlines || []), { title: "", desc: "" }],
                                                }))
                                            }
                                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                        >
                                            + Add Outline
                                        </button>
                                    </div>

                              
                                    <div>
                                        <h3 className="font-semibold mb-2">Class Schedule</h3>
                                        {selectedCourse.classSchedule?.map((schedule, i) => (
                                            <div key={i} className="border p-3 rounded mb-2 grid grid-cols-3 gap-2">
                                                <input
                                                    type="text"
                                                    value={schedule.day || ""}
                                                    onChange={(e) => {
                                                        const updated = [...selectedCourse.classSchedule];
                                                        updated[i].day = e.target.value;
                                                        setSelectedCourse((p) => ({
                                                            ...p,
                                                            classSchedule: updated,
                                                        }));
                                                    }}
                                                    placeholder="Day"
                                                    className="border px-2 py-1 rounded"
                                                />
                                                <input
                                                    type="time"
                                                    value={schedule.startTime || ""}
                                                    onChange={(e) => {
                                                        const updated = [...selectedCourse.classSchedule];
                                                        updated[i].startTime = e.target.value;
                                                        setSelectedCourse((p) => ({
                                                            ...p,
                                                            classSchedule: updated,
                                                        }));
                                                    }}
                                                    className="border px-2 py-1 rounded"
                                                />
                                                <input
                                                    type="time"
                                                    value={schedule.endTime || ""}
                                                    onChange={(e) => {
                                                        const updated = [...selectedCourse.classSchedule];
                                                        updated[i].endTime = e.target.value;
                                                        setSelectedCourse((p) => ({
                                                            ...p,
                                                            classSchedule: updated,
                                                        }));
                                                    }}
                                                    className="border px-2 py-1 rounded"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const updated = selectedCourse.classSchedule.filter(
                                                            (_, idx) => idx !== i
                                                        );
                                                        setSelectedCourse((p) => ({
                                                            ...p,
                                                            classSchedule: updated,
                                                        }));
                                                    }}
                                                    className="col-span-3 text-red-600 text-sm mt-1"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setSelectedCourse((p) => ({
                                                    ...p,
                                                    classSchedule: [...(p.classSchedule || []), { day: "", startTime: "", endTime: "" }],
                                                }))
                                            }
                                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                        >
                                            + Add Schedule
                                        </button>
                                    </div>

                                
                                    <div>
                                        <h3 className="font-semibold mb-2">Course Benefits</h3>
                                        <textarea
                                            value={selectedCourse.Course_Benifits?.join(", ") || ""}
                                            onChange={(e) =>
                                                setSelectedCourse((p) => ({
                                                    ...p,
                                                    Course_Benifits: e.target.value.split(",").map((s) => s.trim()),
                                                }))
                                            }
                                            className="border w-full px-2 py-2 rounded"
                                        />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold mb-2">Course Projects</h3>
                                        <textarea
                                            value={selectedCourse.Course_Projects?.join(", ") || ""}
                                            onChange={(e) =>
                                                setSelectedCourse((p) => ({
                                                    ...p,
                                                    Course_Projects: e.target.value.split(",").map((s) => s.trim()),
                                                }))
                                            }
                                            className="border w-full px-2 py-2 rounded"
                                        />
                                    </div>

                                 
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={selectedCourse.instructor_image}
                                            alt="Instructor"
                                            className="w-32 h-32 object-cover rounded mb-2"
                                        />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={async (e) => {
                                                const file = e.target.files[0];
                                                if (!file) return;
                                                const formData = new FormData();
                                                formData.append("image", file);
                                                try {
                                                    const apiKey = "3d64b0e9dee39ca593b9da32467663ee";
                                                    const res = await fetch(
                                                        `https://api.imgbb.com/1/upload?key=${apiKey}`,
                                                        { method: "POST", body: formData }
                                                    );
                                                    const data = await res.json();
                                                    if (data.success) {
                                                        setSelectedCourse((p) => ({
                                                            ...p,
                                                            instructor_image: data.data.url,
                                                        }));
                                                        Swal.fire("Uploaded!", "Image uploaded successfully.", "success");
                                                    } else {
                                                        Swal.fire("Error", "Failed to upload image.", "error");
                                                    }
                                                } catch (err) {
                                                    Swal.fire("Error", "Something went wrong uploading image.", "error");
                                                }
                                            }}
                                        />
                                    </div>

                                
                                    <div className="flex justify-end gap-3 pt-4">
                                        <button
                                            type="submit"
                                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                        >
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setEditModalOpen(false)}
                                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                </div>
            )}
        </>
    );
}
