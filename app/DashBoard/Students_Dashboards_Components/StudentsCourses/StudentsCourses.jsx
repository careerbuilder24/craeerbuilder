import React, { useState } from 'react';
import Head from 'next/head';  // Import the Head component for Next.js SEO
import UploadedCourses from '../UploadedCourses/UploadedCourses';
import Swal from 'sweetalert2';

export default function Page() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [details, setDetails] = useState('');
    const [certificate, setCertificate] = useState('');
    const [entries, setEntries] = useState([]); // To hold the submitted data
    const [editIndex, setEditIndex] = useState(null); // To track which entry is being edited
    const [image, setImage] = useState(null);




    const resetForm = () => {
        setStartDate('');
        setEndDate('');
        setTitle('');
        setDuration('');
        setDetails('');
        setCertificate('');
    };

    const buttonStyle = {
        backgroundColor: '#90EE90', // Light green background
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        cursor: 'pointer',
        borderRadius: '5px',
        fontSize: '16px',
        transition: 'background-color 0.3s ease',
        display: 'block', // Makes the button block-level to center it
        margin: '0 auto', // Center the button horizontally
    };

    const inputStyle = {
        padding: '12px',
        margin: '8px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        width: '100%', // Full width on mobile
        maxWidth: '350px', // Limiting max-width for larger screens
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    };

    const tableWrapperStyle = {
        overflowX: 'auto', // Make the table scrollable on small screens
        marginTop: '20px',
        marginLeft: 'auto',
        marginRight: 'auto',
    };

    const tableStyle = {
        width: '100%', // Full width table
        borderCollapse: 'collapse',
        marginTop: '20px',
        textAlign: 'center',
    };

    const tableCellStyle = {
        textAlign: 'center',
        padding: '12px',
        border: '1px solid #ddd', // Add border for column and row dividers
        wordWrap: 'break-word', // Prevent text overflow
    };



    // const handleSubmit = async () => {
    //     const created_time = new Date().toISOString().slice(0, 19).replace('T', ' ');
    //     const newEntry = { startDate, endDate, title, duration, details, certificate, created_time };

    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "Do you want to submit this data?",
    //         icon: 'question',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, submit it!',
    //         cancelButtonText: 'Cancel'
    //     }).then(async (result) => {
    //         if (result.isConfirmed) {
    //             if (editIndex !== null) {
    //                 const updatedEntries = [...entries];
    //                 updatedEntries[editIndex] = newEntry;
    //                 setEntries(updatedEntries);
    //                 setEditIndex(null);

    //                 Swal.fire({
    //                     icon: 'success',
    //                     title: 'Updated!',
    //                     text: 'Data has been updated successfully.',
    //                     timer: 2000,
    //                     showConfirmButton: false,
    //                 });
    //             } else {
    //                 try {
    //                     const response = await fetch('/api/SUbmittedCourses', {
    //                         method: 'POST',
    //                         headers: {
    //                             'Content-Type': 'application/json',
    //                         },
    //                         body: JSON.stringify(newEntry),
    //                     });

    //                     const data = await response.json();

    //                     if (response.ok) {
    //                         setEntries([...entries, newEntry]);
    //                         resetForm();
    //                         setIsSubmitted(true);

    //                         Swal.fire({
    //                             icon: 'success',
    //                             title: 'Submitted!',
    //                             text: 'Your data has been submitted successfully.',
    //                             timer: 2000,
    //                             showConfirmButton: false,
    //                         });
    //                     } else {
    //                         Swal.fire({
    //                             icon: 'error',
    //                             title: 'Submission Failed',
    //                             text: data.message || 'Something went wrong!',
    //                         });
    //                     }
    //                 } catch (error) {
    //                     console.error('Error:', error);
    //                     Swal.fire({
    //                         icon: 'error',
    //                         title: 'Error',
    //                         text: 'Something went wrong while submitting the data.',
    //                     });
    //                 }
    //             }
    //         } else {
    //             Swal.fire({
    //                 icon: 'info',
    //                 title: 'Cancelled',
    //                 text: 'Your submission has been cancelled.',
    //                 timer: 1500,
    //                 showConfirmButton: false,
    //             });
    //         }
    //     });
    // };


    const handleSubmit = async () => {
    const created_time = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // Upload image to ImgBB first
    let imageUrl = '3d64b0e9dee39ca593b9da32467663ee';
    if (image) {
        const formData = new FormData();
        formData.append('image', image);

        try {
            const res = await fetch(`https://api.imgbb.com/1/upload?key=${imageUrl}`, {
                method: 'POST',
                body: formData,
            });

            const imgData = await res.json();
            imageUrl = imgData.data?.url || '';

        } catch (error) {
            console.error('Image upload error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Image Upload Failed',
                text: 'Failed to upload image to ImgBB.',
            });
            return;
        }
    }

    const newEntry = {
        startDate,
        endDate,
        title,
        duration,
        details,
        certificate,
        imageUrl,       // <- add image URL to payload
        created_time,
    };

    // Confirm & Submit
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to submit this data?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, submit it!',
        cancelButtonText: 'Cancel'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await fetch('/api/SUbmittedCourses', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newEntry),
                });

                const data = await response.json();

                if (response.ok) {
                    setEntries([...entries, newEntry]);
                    resetForm();
                    setIsSubmitted(true);

                    Swal.fire({
                        icon: 'success',
                        title: 'Submitted!',
                        text: 'Your data has been submitted successfully.',
                        timer: 2000,
                        showConfirmButton: false,
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Submission Failed',
                        text: data.message || 'Something went wrong!',
                    });
                }
            } catch (error) {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Something went wrong while submitting the data.',
                });
            }
        } else {
            Swal.fire({
                icon: 'info',
                title: 'Cancelled',
                text: 'Your submission has been cancelled.',
                timer: 1500,
                showConfirmButton: false,
            });
        }
    });
};


    return (
        <>
            <Head>
                <title>Form Submission Page</title>
                <meta name="description" content="Submit your personal details, including start date, end date, title, duration, and certificate information." />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Form Submission Page" />
                <meta property="og:description" content="Submit your personal details, including start date, end date, title, duration, and certificate information." />
                <meta property="og:type" content="website" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="UTF-8" />
            </Head>

            <main>
                <section>
                    <h1 className='text-center font-bold text-xl my-5'>Submit Your Details</h1>

                    <form aria-labelledby="form-title" style={{ textAlign: 'center' }} onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                        <label htmlFor="startDate" style={{ display: 'none' }}>Start Date</label>
                        <input
                            id="startDate"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            placeholder="Start Date"
                            style={inputStyle}
                        />
                        <label htmlFor="endDate" style={{ display: 'none' }}>End Date</label>
                        <input
                            id="endDate"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            placeholder="End Date"
                            style={inputStyle}
                        />
                        <label htmlFor="title" style={{ display: 'none' }}>Title</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                            style={inputStyle}
                        />
                        <label htmlFor="duration" style={{ display: 'none' }}>Duration</label>
                        <input
                            id="duration"
                            type="text"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            placeholder="Duration"
                            style={inputStyle}
                        />
                        <label htmlFor="details" style={{ display: 'none' }}>Details</label>
                        <input
                            id="details"
                            type="text"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            placeholder="Details"
                            style={inputStyle}
                        />
                        <label htmlFor="certificate" style={{ display: 'none' }}>Certificate</label>
                        <input
                            id="certificate"
                            type="text"
                            value={certificate}
                            onChange={(e) => setCertificate(e.target.value)}
                            placeholder="Certificate"
                            style={inputStyle}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            style={inputStyle}
                            onChange={(e) => setImage(e.target.files[0])}
                        />

                        <button
                            style={buttonStyle}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#32CD32'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#90EE90'}
                        >
                            {editIndex !== null ? "Update" : "Submit"}
                        </button>
                    </form>

                </section>
            </main>
        </>
    );
}
