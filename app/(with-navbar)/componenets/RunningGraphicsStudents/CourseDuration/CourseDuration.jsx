'use client';
import Link from "next/link";
import Image from "next/image";
import useStudentEditProfile from "@/hooks/useStudentEditProfile";
import { useEffect, useState } from "react";

export default function CourseDuration({ student, matchedStudentProfiles: courses }) {
    const [studentEditProfile] = useStudentEditProfile();
    const [loading, setLoading] = useState(true);

    // Hooks always run
    useEffect(() => {
        if (studentEditProfile?.data) {
            setLoading(false);
        }
    }, [studentEditProfile]);

    // Determine current student data
    const studentData = studentEditProfile?.data?.find(
        s =>
            s.id === student.id ||
            s.email?.trim()?.toLowerCase() === student.email?.trim()?.toLowerCase()
    );

    const isRestricted = !studentData || studentData.status !== 'accepted';

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="text-center">
                    <div className="loader mb-4 border-4 border-blue-500 border-dashed rounded-full w-12 h-12 animate-spin mx-auto"></div>
                    <p className="text-gray-600 text-lg">Loading student CV...</p>
                </div>
            </div>
        );
    }

    if (isRestricted) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white shadow-md rounded-xl p-6 max-w-md text-center">
                    <Image
                        src="https://i.postimg.cc/NFcfNNkr/logo.jpg"
                        alt="Restricted"
                        width={300}
                        height={300}
                        className="mx-auto mb-4"
                    />
                    <h2 className="text-2xl font-semibold text-gray-800">Access Restricted</h2>
                    <p className="text-gray-600 mt-2">
                        This student's courses are only visible after admin approval.
                    </p>
                    <p className="text-gray-500 mt-1">
                        (Status: {studentData?.status || 'pending'})
                    </p>
                </div>
            </div>
        );
    }

    // --- Main Table ---
    if (!courses || courses.length === 0) {
        return <p className="text-center text-gray-500">No courses found for this student.</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border text-sm border-gray-200">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="border border-gray-200 p-2 text-center">Image</th>
                        <th className="border border-gray-200 p-2 text-center">Title</th>
                        <th className="border border-gray-200 p-2 text-center">Start Date</th>
                        <th className="border border-gray-200 p-2 text-center">End Date</th>
                        <th className="border border-gray-200 p-2 text-center">Duration</th>
                        <th className="border border-gray-200 p-2 text-center">Details</th>
                        <th className="border border-gray-200 p-2 text-center">Certificate</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course.id}>
                            <td className="border bg-[#79b0ee] text-white border-gray-200 p-2 text-center">
                                {course.imageUrl ? (
                                    <Image
                                        src={course.imageUrl}
                                        alt={course.title}
                                        width={60}
                                        height={40}
                                        className="object-cover mx-auto rounded"
                                    />
                                ) : 'No Image'}
                            </td>
                            <td className="border bg-[#3082df] text-white border-gray-200 p-2 text-center">{course.title}</td>
                            <td className="border bg-[#3082df] text-white border-gray-200 p-2 text-center">{course.startDate ? new Date(course.startDate).toLocaleDateString() : 'N/A'}</td>
                            <td className="border bg-[#3082df] text-white border-gray-200 p-2 text-center">{course.endDate ? new Date(course.endDate).toLocaleDateString() : 'N/A'}</td>
                            <td className="border bg-[#3082df] text-white border-gray-200 p-2 text-center">{course.duration || 'N/A'}</td>
                            <td className="border bg-[#79b0ee] text-white border-gray-200 p-2 text-center">{course.details || 'N/A'}</td>
                            <td className="border bg-[#79b0ee] text-white border-gray-200 p-2 text-center">
                                {course.certificate ? (
                                    <Link href={course.certificate} target="_blank" className="hover:underline">Link</Link>
                                ) : 'No Certificate'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
