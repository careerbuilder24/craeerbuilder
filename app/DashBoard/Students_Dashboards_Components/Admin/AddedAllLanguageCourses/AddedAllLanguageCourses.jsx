'use client';
import useAddedAllLanguageCourses from '@/hooks/useAddedAllLanguageCourses';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function AddedAllLanguageCourses() {
    const { AllLanguageCourses, loading, error, refetch } = useAddedAllLanguageCourses();
    const [selectedCourse, setSelectedCourse] = useState(null);

    const handleView = (course) => {
        setSelectedCourse(course);
    };

    const handleClose = () => setSelectedCourse(null);

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'This will delete the course permanently!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirm.isConfirmed) {
            try {
                const res = await fetch(`/api/abroadCourses?id=${id}`, { method: 'DELETE' });
                const data = await res.json();

                if (data.success) {
                    Swal.fire('Deleted!', 'Course has been deleted.', 'success');
                    refetch(); // ✅ Refetch courses instead of reloading
                } else {
                    Swal.fire('Error', data.error || 'Failed to delete', 'error');
                }
            } catch (err) {
                console.error(err);
                Swal.fire('Error', 'Something went wrong', 'error');
            }
        }
    };


    if (loading) return <p className="text-center mt-6">Loading courses...</p>;
    if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">All Language Courses</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">Title</th>
                            <th className="p-2 border">Language</th>
                            <th className="p-2 border">Instructor</th>
                            <th className="p-2 border">Country</th>
                            <th className="p-2 border">Seats</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {AllLanguageCourses.map((course) => (
                            <tr key={course.id} className="text-center border-b">
                                <td className="p-2 border">{course.title}</td>
                                <td className="p-2 border">{course.language}</td>
                                <td className="p-2 border">{course.instructor}</td>
                                <td className="p-2 border">{course.country}</td>
                                <td className="p-2 border">{course.seats}</td>
                                <td className="p-2 border space-x-2">
                                    <button
                                        onClick={() => handleView(course)}
                                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => handleDelete(course.id)}
                                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for viewing full course info */}
            {selectedCourse && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
                    <div className="bg-white p-6 rounded-lg max-w-3xl w-full relative">
                        <button
                            onClick={handleClose}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold"
                        >
                            X
                        </button>
                        <h2 className="text-xl font-bold mb-2">{selectedCourse.title}</h2>
                        <p className="mb-1">
                            <strong>Language:</strong> {selectedCourse.language} | <strong>Level:</strong> {selectedCourse.level}
                        </p>
                        <p className="mb-1">
                            <strong>Instructor:</strong> {selectedCourse.instructor} | <strong>Country:</strong> {selectedCourse.country}
                        </p>
                        <p className="mb-2"><strong>Seats:</strong> {selectedCourse.seats} | <strong>Duration:</strong> {selectedCourse.duration}</p>
                        <img src={selectedCourse.image} alt={selectedCourse.title} className="w-full h-64 object-cover mb-4 rounded" />
                        <p className="mb-2"><strong>Description:</strong> {selectedCourse.description}</p>

                        {selectedCourse.syllabus?.length > 0 && (
                            <div className="mb-2">
                                <strong>Syllabus:</strong>
                                <ul className="list-disc list-inside">{selectedCourse.syllabus.map((s, i) => <li key={i}>{s}</li>)}</ul>
                            </div>
                        )}
                        {selectedCourse.objectives?.length > 0 && (
                            <div className="mb-2">
                                <strong>Objectives:</strong>
                                <ul className="list-disc list-inside">{selectedCourse.objectives.map((o, i) => <li key={i}>{o}</li>)}</ul>
                            </div>
                        )}
                        {selectedCourse.benefits?.length > 0 && (
                            <div className="mb-2">
                                <strong>Benefits:</strong>
                                <ul className="list-disc list-inside">{selectedCourse.benefits.map((b, i) => <li key={i}>{b}</li>)}</ul>
                            </div>
                        )}
                        {selectedCourse.schedule?.length > 0 && (
                            <div className="mb-2">
                                <strong>Schedule:</strong>
                                <ul className="list-disc list-inside">{selectedCourse.schedule.map((s, i) => <li key={i}>{s}</li>)}</ul>
                            </div>
                        )}
                        {selectedCourse.career?.length > 0 && (
                            <div className="mb-2">
                                <strong>Career Opportunities:</strong>
                                <ul className="list-disc list-inside">{selectedCourse.career.map((c, i) => <li key={i}>{c}</li>)}</ul>
                            </div>
                        )}
                        {selectedCourse.reviews?.length > 0 && (
                            <div className="mb-2">
                                <strong>Reviews:</strong>
                                {selectedCourse.reviews.map((r, i) => (
                                    <p key={i}><strong>{r.name}:</strong> {r.text}</p>
                                ))}
                            </div>
                        )}
                        <p className="mb-2"><strong>Certification:</strong> {selectedCourse.certification}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
