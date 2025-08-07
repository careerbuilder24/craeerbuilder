'use client'
import React, { useState } from 'react'

export default function Add_Students() {
    const [image, setImage] = useState(null)
    const [educationRows, setEducationRows] = useState([{ degree: '', subject: '', year: '' }])
    const [extraCourses, setExtraCourses] = useState([{ degree: '', subject: '', year: '' }])

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(URL.createObjectURL(file))
        }
    }

    const handleEduChange = (index, field, value, type = 'education') => {
        const rows = type === 'education' ? [...educationRows] : [...extraCourses]
        rows[index][field] = value
        type === 'education' ? setEducationRows(rows) : setExtraCourses(rows)
    }

    const addRow = (type = 'education') => {
        const newRow = { degree: '', subject: '', year: '' }
        if (type === 'education') setEducationRows([...educationRows, newRow])
        else setExtraCourses([...extraCourses, newRow])
    }

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-md space-y-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-700">ADMISSION FORM</h1>


            {/* PHOTO */}
            {/* HEADER + PHOTO (Top Right) */}
            <div className="flex justify-between items-start flex-col sm:flex-row">
           <div className='p-5 w-5 h-5'>

           </div>

                {/* PHOTO */}
                <div className="mt-4 sm:mt-0">
                    <div className="w-32 h-32 border border-gray-400 overflow-hidden">
                        {image ? (
                            <img
                                src={image}
                                alt="Uploaded"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="w-full h-full"
                            />
                        )}
                    </div>
                </div>
            </div>




            {/* TOP INFO */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <input placeholder="Form No." className="border border-gray-400 rounded px-2 py-1 w-full" />
                <input placeholder="Branch" className="border border-gray-400 rounded px-2 py-1 w-full" />
                <input placeholder="Batch" className="border border-gray-400 rounded px-2 py-1 w-full" />
                <input placeholder="Date" type="date" className="border border-gray-400 rounded px-2 py-1 w-full" />
            </div>



            {/* PERSONAL INFORMATION */}
            <div>
                <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-3 text-blue-800">PERSONAL INFORMATION</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <input placeholder="Student's Name" className="border border-gray-400 rounded px-2 py-1 w-full" />
                    <input placeholder="Father's Name" className="border border-gray-400 rounded px-2 py-1 w-full" />
                    <input placeholder="Mother's Name" className="border border-gray-400 rounded px-2 py-1 w-full" />
                    <input placeholder="Present Address" className="border border-gray-400 rounded px-2 py-1 w-full" />
                    <input placeholder="Permanent Address" className="border border-gray-400 rounded px-2 py-1 w-full" />
                    <input placeholder="Contact Number (1)" className="border border-gray-400 rounded px-2 py-1 w-full" />
                    <input placeholder="Contact Number (2)" className="border border-gray-400 rounded px-2 py-1 w-full" />
                    <input placeholder="Date of Birth" type="date" className="border border-gray-400 rounded px-2 py-1 w-full" />
                    <input placeholder="NID" className="border border-gray-400 rounded px-2 py-1 w-full" />
                    <input placeholder="Email" type="email" className="border border-gray-400 rounded px-2 py-1 w-full" />
                </div>
            </div>

            {/* COURSE DETAILS + PURPOSE side-by-side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Course Details */}
                <div>
                    <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-3 text-blue-800">COURSE DETAILS</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input placeholder="Subject" className="border border-gray-400 rounded px-2 py-1 w-full" />
                        <input placeholder="Session" className="border border-gray-400 rounded px-2 py-1 w-full" />
                        <input placeholder="Time" className="border border-gray-400 rounded px-2 py-1 w-full" />
                        <input placeholder="Program*" className="border border-gray-400 rounded px-2 py-1 w-full" />
                    </div>
                </div>

                {/* Purpose */}
                <div>
                    <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-3 text-blue-800">PURPOSE</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" /> Freelancing
                        </label>
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" /> Full-time Job
                        </label>
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" /> Business Development
                        </label>
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" /> Other
                        </label>
                    </div>
                </div>
            </div>

            {/* EDUCATIONAL BACKGROUND */}
            <div>
                <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-3 text-blue-800">EDUCATIONAL BACKGROUND</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Fundamental Education Table */}
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-2">Fundamental Education</h3>
                        <table className="w-full table-auto border text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border p-2">Degree</th>
                                    <th className="border p-2">Subject</th>
                                    <th className="border p-2">Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {educationRows.map((row, idx) => (
                                    <tr key={idx}>
                                        <td className="border p-1">
                                            <input className="w-full border border-gray-400 rounded px-1 py-1" value={row.degree} onChange={(e) => handleEduChange(idx, 'degree', e.target.value, 'education')} />
                                        </td>
                                        <td className="border p-1">
                                            <input className="w-full border border-gray-400 rounded px-1 py-1" value={row.subject} onChange={(e) => handleEduChange(idx, 'subject', e.target.value, 'education')} />
                                        </td>
                                        <td className="border p-1">
                                            <input className="w-full border border-gray-400 rounded px-1 py-1" value={row.year} onChange={(e) => handleEduChange(idx, 'year', e.target.value, 'education')} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button type="button" onClick={() => addRow('education')} className="text-blue-600 mt-2 text-sm">+ Add Row</button>
                    </div>

                    {/* Extra Courses Table */}
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-2">Extra Courses</h3>
                        <table className="w-full table-auto border text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border p-2">Degree</th>
                                    <th className="border p-2">Subject</th>
                                    <th className="border p-2">Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {extraCourses.map((row, idx) => (
                                    <tr key={idx}>
                                        <td className="border p-1">
                                            <input className="w-full border border-gray-400 rounded px-1 py-1" value={row.degree} onChange={(e) => handleEduChange(idx, 'degree', e.target.value, 'extra')} />
                                        </td>
                                        <td className="border p-1">
                                            <input className="w-full border border-gray-400 rounded px-1 py-1" value={row.subject} onChange={(e) => handleEduChange(idx, 'subject', e.target.value, 'extra')} />
                                        </td>
                                        <td className="border p-1">
                                            <input className="w-full border border-gray-400 rounded px-1 py-1" value={row.year} onChange={(e) => handleEduChange(idx, 'year', e.target.value, 'extra')} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button type="button" onClick={() => addRow('extra')} className="text-blue-600 mt-2 text-sm">+ Add Row</button>
                    </div>
                </div>
            </div>

            {/* DECLARATION */}
            <div className="mt-6">
                <label className="inline-flex items-center">
                    <input type="checkbox" className="mr-2" /> I hereby declare that the information provided above is correct.
                </label>
            </div>

            {/* SIGNATURE + SUBMIT */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-6 border-t">
                <p className="font-semibold mb-2 sm:mb-0">Student Signature: ____________________________</p>
                <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">Submit</button>
            </div>
        </div>
    )
}
