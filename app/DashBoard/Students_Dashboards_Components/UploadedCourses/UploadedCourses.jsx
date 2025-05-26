
import useUploadedCourse from '@/hooks/useUploadedCourse';
import useMatchingUploadedCourses from '@/hooks/useMatchingUploadedCourses';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function UploadedCourses() {
    const { UploadedCourse } = useUploadedCourse();
    const {matchedCourses} = useMatchingUploadedCourses();
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

    const tableWrapperStyle = {
        overflowX: 'auto',
        marginTop: '20px',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '100%',
    };

    const tableStyle = {
        width: '100%',
        tableLayout: 'fixed',
        borderCollapse: 'collapse',
        textAlign: 'center',
    };

    const tableCellStyle = {
        textAlign: 'center',
        padding: '10px',
        border: '1px solid #ddd',
        wordWrap: 'break-word',
        whiteSpace: 'normal',
        overflowWrap: 'break-word',
    };

    const imageStyle = {
        width: '100px',
        height: 'auto',
        objectFit: 'cover',
        borderRadius: '6px',
    };

    const buttonStyle = {
        backgroundColor: '#32CD32',
        color: '#fff',
        padding: '6px 12px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    };

    const deleteButtonStyle = {
        backgroundColor: '#dc2626',
        color: '#fff',
        padding: '6px 12px',
        marginLeft: '8px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
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
console.log(matchedCourses)
    return (
        <div className='p-6 max-w-7xl mx-auto overflow-x-auto mt-5'>
            <section aria-labelledby="submitted-data">
                <h2 id="submitted-data" className='text-2xl font-bold mb-4'>Uploaded Courses</h2>
                <div style={tableWrapperStyle}>
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th style={tableCellStyle}>Image</th>
                                <th style={tableCellStyle}>Start Date</th>
                                <th style={tableCellStyle}>End Date</th>
                                <th style={tableCellStyle}>Title</th>
                                <th style={tableCellStyle}>Duration</th>
                                <th style={tableCellStyle}>Details</th>
                                <th style={tableCellStyle}>Certificate</th>
                                <th style={tableCellStyle}>Function</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matchedCourses?.length > 0 ? (
                                matchedCourses?.map((course, index) => (
                                    <tr key={course.id || index}>
                                        <td style={tableCellStyle}>
                                            <img src={course.imageUrl} alt="Course" style={imageStyle} />
                                        </td>
                                        <td style={tableCellStyle}>{new Date(course.startDate).toLocaleDateString()}</td>
                                        <td style={tableCellStyle}>{new Date(course.endDate).toLocaleDateString()}</td>
                                        <td style={tableCellStyle}>{course.title}</td>
                                        <td style={tableCellStyle}>{course.duration}</td>
                                        <td style={tableCellStyle}>
                                            {expandedRows[course.id]
                                                ? course.details
                                                : truncateText(course.details, 100)}
                                            {course.details && course.details.length > 100 && (
                                                <button
                                                    onClick={() => toggleReadMore(course.id)}
                                                    style={{
                                                        color: '#2563eb',
                                                        marginLeft: '5px',
                                                        cursor: 'pointer',
                                                        background: 'none',
                                                        border: 'none'
                                                    }}
                                                >
                                                    {expandedRows[course.id] ? 'Read Less' : 'Read More'}
                                                </button>
                                            )}
                                        </td>
                                        <td style={tableCellStyle}>
                                            {course.certificate ? (
                                                <a
                                                    href={course.certificate}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{ color: '#2563eb', textDecoration: 'underline' }}
                                                >
                                                    View Certificate
                                                </a>
                                            ) : 'N/A'}
                                        </td>

                                        <td style={tableCellStyle}>
                                            <button
                                                style={deleteButtonStyle}
                                                onMouseEnter={(e) => e.target.style.backgroundColor = '#f87171'}
                                                onMouseLeave={(e) => e.target.style.backgroundColor = '#dc2626'}
                                                onClick={() => handleDelete(course.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" style={tableCellStyle}>No courses uploaded yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
