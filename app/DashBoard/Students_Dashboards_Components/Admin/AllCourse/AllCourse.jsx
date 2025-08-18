import React, { useEffect, useState } from 'react'
import { MdAccessTime, MdPeopleAlt } from 'react-icons/md';
import Image from 'next/image';
import Swal from 'sweetalert2';
import Loader from '@/app/(with-navbar)/componenets/Loader/Loader';
import axios from 'axios';

export default function AllCourse() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/courses');
                const result = await response.json();

                if (result.success && result.course) {
                    setCourses((prevCourses) => {
                        const isDataDifferent = prevCourses.length !== result.course.length ||
                            !prevCourses.every((course, index) => course.id === result.course[index].id);
                        if (isDataDifferent) {
                            return result.course;
                        }
                        return prevCourses;
                    });
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();

    }, []);

    // 👉 handleEditClick function
    const handleEditClick = (course) => {
        setSelectedCourse({ ...course }); // copy course data into state
        setEditModalOpen(true);           // open the modal
    };

    // (placeholder) handle input change inside modal
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedCourse((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // (placeholder) handle update submit
    const handleUpdateCourse = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/courses/${selectedCourse.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(selectedCourse),
            });

            const result = await response.json();
            if (result.success) {
                Swal.fire("Updated!", "Course has been updated successfully.", "success");
                // update local state
                setCourses((prev) =>
                    prev.map((c) => (c.id === selectedCourse.id ? selectedCourse : c))
                );
                setEditModalOpen(false);
            } else {
                Swal.fire("Error", "Failed to update course", "error");
            }
        } catch (error) {
            console.error("Error updating course:", error);
            Swal.fire("Error", "Something went wrong", "error");
        }
    };
    // 👉 Delete handler
    const handleDeleteCourseCard = async (courseId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This course will be deleted permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {

                await axios.delete(`/api/courses?id=${courseId}`);


                setCourses((prev) => prev.filter((course) => course.id !== courseId));

                Swal.fire("Deleted!", "The course has been deleted.", "success");
            } catch (error) {
                console.error("Error deleting course:", error);
                Swal.fire("Error!", "Failed to delete course.", "error");
            }
        }
    };

    return (
        <>
            <div className='container mx-auto w-11/12 xl:w-8/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:mt-10'>
                {
                    courses?.map(course => (
                        <div key={course.id} className="flex flex-col justify-between shadow-md border border-gray-200 hover:border-[#56D3FD] transition-all duration-300 rounded-xl overflow-hidden h-full bg-white">

                            {/* Image */}
                            <div className="relative">
                                <Image
                                    src={course?.instructor_image}
                                    alt="Card Image"
                                    className="object-cover w-full transition-transform duration-300 hover:scale-105"
                                    onDragStart={(e) => e.preventDefault()}
                                    layout="responsive"
                                    width={500}
                                    height={300}
                                />

                                {/* Course Info Badges */}
                                <div className="text-xs">
                                    <h2 className="text-base font-bold mb-2 ml-2 mt-2">{course.course_title}</h2>
                                    <div className="px-2 py-1 text-gray-700">Batch {course.batch_number}</div>
                                    <div className="px-2 py-1 text-gray-700 flex items-center gap-1"><MdPeopleAlt /> {course.seats_left} Seats</div>
                                    <div className="px-2 py-1 text-gray-700 flex items-center gap-1"><MdAccessTime /> {course.time_left}</div>
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="p-4 flex flex-col flex-grow">
                                {/* Action Buttons */}
                                <div className="mt-auto">
                                    <div className='flex justify-between gap-2'>
                                        <button
                                            onClick={() => handleEditClick(course)}
                                            className="flex-1 bg-[#007BFF] hover:bg-blue-700 text-white py-2 rounded transition mt-2"
                                        >
                                            Edit
                                        </button>
                                        {/* <button
                                            onClick={() => handleDeleteCourseCard(course.id)}
                                            className="flex-1 bg-red-500 hover:bg-red-700 text-white py-2 rounded transition mt-2"
                                        >
                                            Delete
                                        </button> */}
                                        <button
                                            onClick={() => handleDeleteCourseCard(course.id)}
                                            className="flex-1 bg-red-500 hover:bg-red-700 text-white py-2 rounded transition mt-2"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }

                {/* modal */}
                {editModalOpen && selectedCourse && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded relative w-full max-w-lg">
                            {/* Cross Button */}
                            <button
                                onClick={() => setEditModalOpen(false)}
                                className="absolute top-2 right-3 text-2xl text-gray-500 hover:text-red-600"
                                aria-label="Close Modal"
                            >
                                &times;
                            </button>

                            <h2 className="text-2xl mb-4">Edit Course</h2>
                            <form onSubmit={handleUpdateCourse} className="space-y-4">
                                <input
                                    type="text"
                                    name="course_title"
                                    value={selectedCourse.course_title}
                                    onChange={handleInputChange}
                                    placeholder="Course Title"
                                    className="w-full border px-3 py-2 rounded"
                                />
                                <input
                                    type="text"
                                    name="batch_number"
                                    value={selectedCourse.batch_number}
                                    onChange={handleInputChange}
                                    placeholder="Batch Number"
                                    className="w-full border px-3 py-2 rounded"
                                />
                                <input
                                    type="text"
                                    name="course_cost"
                                    value={selectedCourse.course_cost}
                                    onChange={handleInputChange}
                                    placeholder="Course Cost"
                                    className="w-full border px-3 py-2 rounded"
                                />

                                {/* Add other fields here as needed */}
                                <div className="flex justify-end space-x-3">
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
        </>
    )
}
