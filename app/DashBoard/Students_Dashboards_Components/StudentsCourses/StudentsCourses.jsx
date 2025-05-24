import React, { useState } from 'react';
import Head from 'next/head';  // Import the Head component for Next.js SEO
import UploadedCourses from '../UploadedCourses/UploadedCourses';

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

    const handleSubmit = () => {
        const newEntry = { startDate, endDate, title, duration, details, certificate };
        if (editIndex !== null) {
            // Edit the existing entry
            const updatedEntries = [...entries];
            updatedEntries[editIndex] = newEntry;
            setEntries(updatedEntries);
            setEditIndex(null); // Clear edit state
        } else {
            // Add a new entry
            setEntries([...entries, newEntry]);
        }
        // Reset form and hide after submission
        resetForm();
        setIsSubmitted(true);
        alert("Form submitted");
    };

    const handleEdit = (index) => {
        const entry = entries[index];
        setStartDate(entry.startDate);
        setEndDate(entry.endDate);
        setTitle(entry.title);
        setDuration(entry.duration);
        setDetails(entry.details);
        setCertificate(entry.certificate);
        setEditIndex(index); // Set the index of the entry being edited
        setIsSubmitted(false); // Show the form again for editing
    };

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
                    <h1>Submit Your Details</h1>
                    {!isSubmitted ? (
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
                            <button
                                style={buttonStyle}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#32CD32'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#90EE90'}
                            >
                                {editIndex !== null ? "Update" : "Submit"}
                            </button>
                        </form>
                    ) : (
                        <UploadedCourses />
                    )}
                </section>
            </main>
        </>
    );
}
