// import useUploadedCourse from '@/hooks/useUploadedCourse';
// import useMatchingUploadedCourses from '@/hooks/useMatchingUploadedCourses';
// import React, { useState } from 'react';
// import Swal from 'sweetalert2';


// export default function UploadedCourses() {
//     const { UploadedCourse } = useUploadedCourse();
//     const { matchedStudentProfiles } = useMatchingUploadedCourses();
//     // const courses = UploadedCourse?.data || [];

//     const [expandedRows, setExpandedRows] = useState({});

//     const toggleReadMore = (id) => {
//         setExpandedRows(prev => ({
//             ...prev,
//             [id]: !prev[id]
//         }));
//     };

//     const truncateText = (text, length = 100) => {
//         if (!text) return 'N/A';
//         return text.length > length ? text.slice(0, length) + '...' : text;
//     };

//     const handleDelete = async (id) => {
//         const confirmResult = await Swal.fire({
//             title: 'Are you sure?',
//             text: "Do you really want to delete this course?",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#d33',
//             cancelButtonColor: '#3085d6',
//             confirmButtonText: 'Yes, delete it!',
//             cancelButtonText: 'Cancel'
//         });

//         if (!confirmResult.isConfirmed) return;

//         try {
//             const res = await fetch('/api/SUbmittedCourses', {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ id })
//             });

//             const result = await res.json();

//             if (result.success) {
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Deleted!',
//                     text: 'Course deleted successfully!',
//                     timer: 2000,
//                     showConfirmButton: false,
//                 }).then(() => {
//                     window.location.reload();
//                 });
//             } else {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Failed!',
//                     text: result.message || 'Failed to delete the course.',
//                 });
//             }
//         } catch (error) {
//             console.error("Delete error:", error);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Server Error',
//                 text: 'An error occurred while deleting.',
//             });
//         }
//     };

//     return (
//         <div className="p-4 sm:p-6 max-w-7xl mx-auto mt-5">
//             <section aria-labelledby="submitted-data">
//                 <h2 id="submitted-data" className="text-2xl font-bold mb-4">Uploaded Courses</h2>
//                 <div className="overflow-x-auto rounded-lg shadow">
//                     <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
//                         <thead className="bg-[#17549A] text-white text-center">
//                             <tr>
//                                 <th className="text-center px-4 py-2  font-semibold border-r-2 border-white">Image</th>
//                                 <th className="text-center px-4 py-2  font-semibold border-r-2 border-white">Start Date</th>
//                                 <th className="text-center px-4 py-2  font-semibold border-r-2 border-white">End Date</th>
//                                 <th className=" text-center px-4 py-2 font-semibold border-r-2 border-white">Title</th>
//                                 <th className=" text-center px-4 py-2  font-semibold border-r-2 border-white">Duration</th>
//                                 <th className=" text-center px-4 py-2  font-semibold border-r-2 border-white">Details</th>
//                                 <th className="text-center  px-4 py-2 font-semibold border-r-2 border-white">Certificate</th>
//                                 <th className=" text-center px-4 py-2  font-semibold border-r-2 border-white">Function</th>
//                             </tr> 
//                         </thead>
//                         <tbody className="divide-y divide-gray-200">
//                             {matchedStudentProfiles?.length > 0 ? (
//                                 matchedStudentProfiles.map((course, index) => (
//                                     <tr key={course.id || index} className="hover:bg-gray-50">
//                                         <td className="p-2 sm:p-4">
//                                             <img src={course.imageUrl} alt="Course" className="w-20 h-auto rounded-md object-cover" />
//                                         </td>
//                                         <td className="p-2 sm:p-4">{new Date(course.startDate).toLocaleDateString()}</td>
//                                         <td className="p-2 sm:p-4">{new Date(course.endDate).toLocaleDateString()}</td>
//                                         <td className="p-2 sm:p-4">{course.title}</td>
//                                         <td className="p-2 sm:p-4">{course.duration}</td>
//                                         <td className="p-2 sm:p-4 max-w-sm break-words">
//                                             {expandedRows[course.id]
//                                                 ? course.details
//                                                 : truncateText(course.details, 100)}
//                                             {course.details && course.details.length > 100 && (
//                                                 <button
//                                                     onClick={() => toggleReadMore(course.id)}
//                                                     className="text-blue-600 ml-2 underline"
//                                                 >
//                                                     {expandedRows[course.id] ? 'Read Less' : 'Read More'}
//                                                 </button>
//                                             )}
//                                         </td>
//                                         <td className="p-2 sm:p-4">
//                                             {course.certificate ? (
//                                                 <a
//                                                     href={course.certificate}
//                                                     target="_blank"
//                                                     rel="noopener noreferrer"
//                                                     className="text-blue-600 underline"
//                                                 >
//                                                     View
//                                                 </a>
//                                             ) : 'N/A'}
//                                         </td>
//                                         <td className="p-2 sm:p-4">
//                                             <button
//                                                 className="bg-red-600 hover:bg-red-400 text-white px-3 py-1 rounded"
//                                                 onClick={() => handleDelete(course.id)}
//                                             >
//                                                 Delete
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="8" className="text-center p-4">No courses uploaded yet.</td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </section>
//         </div>
//     );
// }
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { FaTrashAlt, FaEye } from 'react-icons/fa'; // Added icons
import useUploadedCourse from '@/hooks/useUploadedCourse'; // Assuming this provides data or loading state
import useMatchingUploadedCourses from '@/hooks/useMatchingUploadedCourses'; // Assuming this provides the array of courses
import Image from 'next/image'; // Assuming you use Image component for images

export default function UploadedCourses() {
    const { UploadedCourse, loading: courseLoading, error: courseError } = useUploadedCourse();
    const { matchedStudentProfiles, loading: profilesLoading, error: profilesError } = useMatchingUploadedCourses();
    
    // Determine the data array and overall loading/error state
    const courses = matchedStudentProfiles || []; 
    const loading = courseLoading || profilesLoading;
    const error = courseError || profilesError;

    const [expandedRows, setExpandedRows] = useState({});

    const toggleReadMore = (id) => {
        setExpandedRows(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    // Keep truncation short for table cells
    const truncateText = (text, length = 60) => {
        if (!text) return 'N/A';
        // Remove potential HTML tags before truncation for clean display
        const plainText = text.replace(/<[^>]+>/g, "");
        return plainText.length > length ? plainText.slice(0, length) + '...' : plainText;
    };

    const handleDelete = async (id) => {
        const confirmResult = await Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626', // Red-600
            cancelButtonColor: '#3b82f6', // Blue-500
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });

        if (!confirmResult.isConfirmed) return;

        try {
            // Note: Updated the fetch path based on your original code's DELETE call
            const res = await fetch('/api/SUbmittedCourses', { 
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            });

            const result = await res.json();

            if (res.ok && result.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'Course deleted successfully!',
                    timer: 2000,
                    showConfirmButton: false,
                }).then(() => {
                    // Consider re-fetching data instead of reloading the page for better UX
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

    if (loading) return <div className="flex justify-center items-center h-48"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div><p className="ml-4 text-lg text-gray-600">Loading Courses...</p></div>;
    if (error) return <p className="text-center p-6 text-xl font-medium text-red-600">❌ Error: Failed to load courses.</p>;


    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="w-full max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-lg">
                
                {/* Header */}
                <div className="mb-6 border-b pb-4">
                    <h1 className="text-3xl font-extrabold text-gray-800"> Uploaded Courses</h1>
                </div>

                {/* Table Container */}
                <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Image</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Start Date</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">End Date</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[180px]">Title</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Duration</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[200px]">Details</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Certificate</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr> 
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {courses.length > 0 ? (
                                courses.map((course, index) => (
                                    <tr key={course.id || index} className="hover:bg-blue-50 transition duration-150">
                                        
                                        {/* Image */}
                                        <td className="p-3">
                                            <Image 
                                                width={60} 
                                                height={60} 
                                                src={course.imageUrl || '/placeholder-course.png'} 
                                                alt="Course" 
                                                className="w-16 h-16 rounded-md object-cover shadow-sm border" 
                                            />
                                        </td>
                                        
                                        {/* Start Date */}
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{course.startDate ? new Date(course.startDate).toLocaleDateString() : 'N/A'}</td>
                                        
                                        {/* End Date */}
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{course.endDate ? new Date(course.endDate).toLocaleDateString() : 'N/A'}</td>
                                        
                                        {/* Title */}
                                        <td className="p-3 font-medium text-gray-800">{course.title || 'Untitled Course'}</td>
                                        
                                        {/* Duration */}
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{course.duration || 'N/A'}</td>
                                        
                                        {/* Details */}
                                        <td className="p-3 text-sm text-gray-600 max-w-sm">
                                            <p className="line-clamp-2">
                                                {expandedRows[course.id] ? course.details : truncateText(course.details, 60)}
                                            </p>
                                            {course.details && course.details.replace(/<[^>]+>/g, "").length > 60 && (
                                                <button
                                                    onClick={() => toggleReadMore(course.id)}
                                                    className="text-blue-600 hover:text-blue-800 text-xs font-medium mt-1"
                                                >
                                                    {expandedRows[course.id] ? 'Read Less' : 'Read More'}
                                                </button>
                                            )}
                                        </td>
                                        
                                        {/* Certificate */}
                                        <td className="p-3 text-center">
                                            {course.certificate ? (
                                                <a
                                                    href={course.certificate}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 inline-flex items-center text-sm font-medium"
                                                >
                                                    <FaEye className="w-4 h-4 mr-1" /> View
                                                </a>
                                            ) : (
                                                <span className="text-gray-400 text-sm">N/A</span>
                                            )}
                                        </td>
                                        
                                        {/* Function (Actions) */}
                                        <td className="p-3 text-center">
                                            <button
                                                className="bg-red-600 hover:bg-red-700 text-white font-medium px-3 py-2 rounded-lg transition duration-200 shadow-md flex items-center justify-center mx-auto"
                                                onClick={() => handleDelete(course.id)}
                                                title="Delete Course"
                                            >
                                                <FaTrashAlt className="w-4 h-4 mr-1" />
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center p-8 text-lg text-gray-500">
                                        No courses uploaded yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}