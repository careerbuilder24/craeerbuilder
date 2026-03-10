'use client';
import React, { useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import useAllAbroadUniversityApplicant from '@/hooks/useAllAbroadUniversityApplicant';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default function PendingApplicationAbroadUniversity() {
    const { applications, loading, setApplications } = useAllAbroadUniversityApplicant();
    const [openActionId, setOpenActionId] = useState(null);

    // Filter only Pending applications
    const pendingApplications = applications.filter(app => app.status === 'Pending');

    const handleStatusChange = async (id, newStatus) => {
        const result = await Swal.fire({
            title: `Are you sure?`,
            text: `You are about to ${newStatus.toLowerCase()} this application.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: newStatus,
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            try {
                const res = await fetch('/api/university-apply', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id, status: newStatus }),
                });
                const data = await res.json();

                if (data.success) {
                    setApplications(prev =>
                        prev.map(app =>
                            app.id === id ? { ...app, status: newStatus } : app
                        )
                    );
                    setOpenActionId(null);

                    Swal.fire({
                        title: `${newStatus}!`,
                        text: `Application status updated to ${newStatus}.`,
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false,
                    });
                } else {
                    Swal.fire('Error', 'Status update failed', 'error');
                }
            } catch (err) {
                console.error('Error updating status:', err);
                Swal.fire('Error', 'Something went wrong', 'error');
            }
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This will permanently delete the application.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            try {
                const res = await fetch('/api/university-apply', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id }),
                });
                const data = await res.json();

                if (data.success) {
                    setApplications(prev => prev.filter(app => app.id !== id));
                    setOpenActionId(null);

                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Application has been deleted.',
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false,
                    });
                } else {
                    Swal.fire('Error', 'Delete failed', 'error');
                }
            } catch (err) {
                console.error('Error deleting application:', err);
                Swal.fire('Error', 'Something went wrong', 'error');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500 border-solid"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 sm:px-6 lg:px-20">
            <h1 className="text-2xl font-bold mb-4 text-left">Pending University Applications</h1>

            {/* Table for large screens */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full border border-gray-300 text-center">
                    <thead>
                        <tr className="bg-[#17549A] text-white text-sm sm:text-base">
                            <th className="py-2 px-4 border">Name</th>
                            <th className="py-2 px-4 border">Email</th>
                            <th className="py-2 px-4 border">Phone</th>
                            <th className="py-2 px-4 border">Education</th>
                            <th className="py-2 px-4 border">CGPA</th>
                            <th className="py-2 px-4 border">University</th>
                            <th className="py-2 px-4 border">Country</th>
                            <th className="py-2 px-4 border">Applied At</th>
                            <th className="py-2 px-4 border">Status</th>
                            <th className="py-2 px-4 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingApplications.map((app, index) => (
                            <tr key={app.id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                <td className="py-2 px-4 border">{app.user_name}</td>
                                <td className="py-2 px-4 border">{app.user_email}</td>
                                <td className="py-2 px-4 border">{app.phone}</td>
                                <td className="py-2 px-4 border">{app.education}</td>
                                <td className="py-2 px-4 border">{app.cgpa}</td>
                                <td className="py-2 px-4 border">{app.university_name}</td>
                                <td className="py-2 px-4 border">{app.country}</td>
                                <td className="py-2 px-4 border">{new Date(app.created_at).toLocaleString()}</td>
                                <td className="py-2 px-4 border">
                                    <span className="px-2 py-1 rounded text-white bg-yellow-500">
                                        {app.status}
                                    </span>
                                </td>
                                <td className="px-4 border relative py-10">
                                    <div className="inline-block relative">
                                        <button
                                            onClick={() =>
                                                setOpenActionId(prev => (prev === app.id ? null : app.id))
                                            }
                                            className="p-1 sm:p-2 rounded-full hover:bg-gray-100 transition-colors"
                                        >
                                            <FiMoreVertical size={18} className="text-gray-600" />
                                        </button>
                                        {openActionId === app.id && (
                                            <div className="absolute right-0 bottom-[110%] bg-white border border-gray-200 shadow-md rounded-lg w-32 py-1 z-50">
                                                <button
                                                    onClick={() => handleStatusChange(app.id, 'Accepted')}
                                                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-md transition"
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => handleStatusChange(app.id, 'Denied')}
                                                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition"
                                                >
                                                    Deny
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(app.id)}
                                                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-800 hover:bg-red-50 rounded-md transition"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile layout */}
            <div className="md:hidden space-y-4">
                {pendingApplications.map(app => (
                    <div key={app.id} className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="font-semibold text-lg">{app.user_name}</h2>
                                <p className="text-sm text-gray-600">{app.user_email}</p>
                                <p className="text-sm text-gray-600">{app.phone}</p>
                                <p className="text-sm text-gray-600">{app.education} | CGPA: {app.cgpa}</p>
                                <p className="text-sm text-gray-600">{app.university_name}, {app.country}</p>
                                <p className="text-sm text-gray-500">{new Date(app.created_at).toLocaleString()}</p>
                                <span className="inline-block mt-1 px-2 py-1 rounded text-white bg-yellow-500">
                                    {app.status}
                                </span>
                            </div>
                            <div className="relative">
                                <button
                                    onClick={() =>
                                        setOpenActionId(prev => (prev === app.id ? null : app.id))
                                    }
                                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <FiMoreVertical size={18} className="text-gray-600" />
                                </button>
                                {openActionId === app.id && (
                                    <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 shadow-md rounded-lg w-32 py-1 z-50">
                                        <button
                                            onClick={() => handleStatusChange(app.id, 'Accepted')}
                                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-md transition"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleStatusChange(app.id, 'Denied')}
                                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition"
                                        >
                                            Deny
                                        </button>
                                        <button
                                            onClick={() => handleDelete(app.id)}
                                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-800 hover:bg-red-50 rounded-md transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
