import useUploadedCourse from '@/hooks/useUploadedCourse';
import useMatchingUploadedCourses from '@/hooks/useMatchingUploadedCourses';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function UploadedCourses() {
    const { UploadedCourse } = useUploadedCourse();
    const { matchedStudentProfiles } = useMatchingUploadedCourses();
    const courses = UploadedCourse?.data || [];

    const [expandedRows, setExpandedRows] = useState({});

    const toggleReadMore = (id) => {
        setExpandedRows(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const truncateText = (text, length = 100) => {
        if (!text) return 'N/A';
        return text.length > length ? text.slice(0, length) + '...' : text;
    };

    const handleDelete = async (id) => {
        const confirmResult = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you really want to delete this course?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });

        if (!confirmResult.isConfirmed) return;

        try {
            const res = await fetch('/api/SUbmittedCourses', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            });

            const result = await res.json();

            if (result.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'Course deleted successfully!',
                    timer: 2000,
                    showConfirmButton: false,
                }).then(() => {
                    window.location.reload();
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed!',
                    text: result.message || 'Failed to delete the course.',
                });
            }
        } catch (error) {
            console.error("Delete error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Server Error',
                text: 'An error occurred while deleting.',
            });
        }
    };

    return (
        <div className="p-4 sm:p-6 max-w-7xl mx-auto mt-5">
            <section aria-labelledby="submitted-data">
                <h2 id="submitted-data" className="text-2xl font-bold mb-4">Uploaded Courses</h2>
                <div className="overflow-x-auto rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left font-semibold">Image</th>
                                <th className="px-4 py-2 text-left font-semibold">Start Date</th>
                                <th className="px-4 py-2 text-left font-semibold">End Date</th>
                                <th className="px-4 py-2 text-left font-semibold">Title</th>
                                <th className="px-4 py-2 text-left font-semibold">Duration</th>
                                <th className="px-4 py-2 text-left font-semibold">Details</th>
                                <th className="px-4 py-2 text-left font-semibold">Certificate</th>
                                <th className="px-4 py-2 text-left font-semibold">Function</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {matchedStudentProfiles?.length > 0 ? (
                                matchedStudentProfiles.map((course, index) => (
                                    <tr key={course.id || index} className="hover:bg-gray-50">
                                        <td className="p-2 sm:p-4">
                                            <img src={course.imageUrl} alt="Course" className="w-20 h-auto rounded-md object-cover" />
                                        </td>
                                        <td className="p-2 sm:p-4">{new Date(course.startDate).toLocaleDateString()}</td>
                                        <td className="p-2 sm:p-4">{new Date(course.endDate).toLocaleDateString()}</td>
                                        <td className="p-2 sm:p-4">{course.title}</td>
                                        <td className="p-2 sm:p-4">{course.duration}</td>
                                        <td className="p-2 sm:p-4 max-w-sm break-words">
                                            {expandedRows[course.id]
                                                ? course.details
                                                : truncateText(course.details, 100)}
                                            {course.details && course.details.length > 100 && (
                                                <button
                                                    onClick={() => toggleReadMore(course.id)}
                                                    className="text-blue-600 ml-2 underline"
                                                >
                                                    {expandedRows[course.id] ? 'Read Less' : 'Read More'}
                                                </button>
                                            )}
                                        </td>
                                        <td className="p-2 sm:p-4">
                                            {course.certificate ? (
                                                <a
                                                    href={course.certificate}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 underline"
                                                >
                                                    View
                                                </a>
                                            ) : 'N/A'}
                                        </td>
                                        <td className="p-2 sm:p-4">
                                            <button
                                                className="bg-red-600 hover:bg-red-400 text-white px-3 py-1 rounded"
                                                onClick={() => handleDelete(course.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center p-4">No courses uploaded yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
