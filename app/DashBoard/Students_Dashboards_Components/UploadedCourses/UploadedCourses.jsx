import React from 'react'

export default function UploadedCourses() {


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
            <div className='p-6 max-w-4xl mx-auto'>
                <section aria-labelledby="submitted-data">
                    <h2 id="submitted-data" className='text-2xl font-bold mb-4'>Uploaded Courses</h2>
                    <div style={tableWrapperStyle}>
                        <table style={tableStyle}>
                            <thead>
                                <tr>
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

                                {/* <tr key={index}>
                                        <td style={tableCellStyle}>Date</td>
                                        <td style={tableCellStyle}>{entry.endDate}</td>
                                        <td style={tableCellStyle}>{entry.title}</td>
                                        <td style={tableCellStyle}>{entry.duration}</td>
                                        <td style={tableCellStyle} >{entry.details}</td>
                                        <td style={tableCellStyle}>{entry.certificate}</td>
                                        <td style={tableCellStyle}>
                                            <button
                                                style={buttonStyle}
                                                onMouseEnter={(e) => e.target.style.backgroundColor = '#90EE90'}
                                                onMouseLeave={(e) => e.target.style.backgroundColor = ' #32CD32'}
                                                onClick={() => handleEdit(index)}
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr> */}

                            </tbody>
                        </table>
                    </div>

                </section>
            </div>
        </>
    )
}
