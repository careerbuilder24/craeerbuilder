'use client'
import AdminFooter from '@/app/(with-navbar)/componenets/Admin Footer/AdminFooter'
import React, { useState } from 'react'
// import logo from '../../../../assets/logo.jpg';
// import Image from 'next/image';

export default function Add_Students() {
    const [image, setImage] = useState(null) // Student photo
    const [signature, setSignature] = useState(null) // Signature
    const [educationRows, setEducationRows] = useState([{ degree: '', subject: '', year: '' }])
    const [extraCourses, setExtraCourses] = useState([{ degree: '', subject: '', year: '' }])
    const [jobExperience, setJobExperience] = useState([{ company: '', position: '', year: '' }])
    const [businessInfo, setBusinessInfo] = useState([{ name: '', service: '', year: '' }])
    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) setImage(URL.createObjectURL(file))
    }

    const handleSignatureUpload = (e) => {
        const file = e.target.files[0]
        if (file) setSignature(URL.createObjectURL(file))
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

    const handleTableChange = (index, field, value, type) => {
        const mapping = {
            education: [educationRows, setEducationRows],
            extra: [extraCourses, setExtraCourses],
            job: [jobExperience, setJobExperience],
            business: [businessInfo, setBusinessInfo]
        }
        const [rows, setRows] = mapping[type]
        const updated = [...rows]
        updated[index][field] = value
        setRows(updated)
    }

    const addRows = (type) => {
        const mapping = {
            education: { degree: '', subject: '', year: '' },
            extra: { degree: '', subject: '', year: '' },
            job: { company: '', position: '', year: '' },
            business: { name: '', service: '', year: '' }
        }
        const newRow = mapping[type]
        const mappingState = {
            education: [educationRows, setEducationRows],
            extra: [extraCourses, setExtraCourses],
            job: [jobExperience, setJobExperience],
            business: [businessInfo, setBusinessInfo]
        }
        const [rows, setRows] = mappingState[type]
        setRows([...rows, newRow])
    }

    return (
        <>
            <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-md space-y-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-700">ADMISSION FORM</h1>


                {/* PHOTO UPLOAD */}
                <div className="flex justify-between  items-center gap-6 flex-row">
                    {/* Left Logo */}
                    <div>
                        <img
                            src="https://i.postimg.cc/SsD9pWZ2/logo.jpg"
                            alt="Logo"
                            className="w-56 h-auto rounded-lg flex-shrink-0"
                        />
                    </div>

                    {/* Student Photo */}
                    <div>
                        <div className="w-32 h-32 border border-gray-400 overflow-hidden">
                            <img
                                src={image}
                                alt="Student"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="mt-2 w-full text-sm"
                        />
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

                {/* COURSE DETAILS + PURPOSE */}
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
                            <label className="flex items-center"><input type="checkbox" className="mr-2" /> Freelancing</label>
                            <label className="flex items-center"><input type="checkbox" className="mr-2" /> Full-time Job</label>
                            <label className="flex items-center"><input type="checkbox" className="mr-2" /> Business Development</label>
                            <label className="flex items-center"><input type="checkbox" className="mr-2" /> Other</label>
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


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {/* Job Experience */}
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-2">Job Experience</h3>
                        <table className="w-full table-auto border text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border p-2">Company Name</th>
                                    <th className="border p-2">Position</th>
                                    <th className="border p-2">Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobExperience.map((row, idx) => (
                                    <tr key={idx}>
                                        <td className="border p-1">
                                            <input value={row.company} onChange={(e) => handleTableChange(idx, 'company', e.target.value, 'job')} className="w-full border border-gray-400 rounded px-1 py-1" />
                                        </td>
                                        <td className="border p-1">
                                            <input value={row.position} onChange={(e) => handleTableChange(idx, 'position', e.target.value, 'job')} className="w-full border border-gray-400 rounded px-1 py-1" />
                                        </td>
                                        <td className="border p-1">
                                            <input value={row.year} onChange={(e) => handleTableChange(idx, 'year', e.target.value, 'job')} className="w-full border border-gray-400 rounded px-1 py-1" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button onClick={() => addRows('job')} className="text-blue-600 mt-2 text-sm">+ Add Row</button>
                    </div>

                    {/* Business Information */}
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-2">Business Information</h3>
                        <table className="w-full table-auto border text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border p-2">Business Name</th>
                                    <th className="border p-2">Product/Service</th>
                                    <th className="border p-2">Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {businessInfo.map((row, idx) => (
                                    <tr key={idx}>
                                        <td className="border p-1">
                                            <input value={row.name} onChange={(e) => handleTableChange(idx, 'name', e.target.value, 'business')} className="w-full  border border-gray-400 rounded px-1 py-1" />
                                        </td>
                                        <td className="border p-1">
                                            <input value={row.service} onChange={(e) => handleTableChange(idx, 'service', e.target.value, 'business')} className="w-full border border-gray-400 rounded px-1 py-1" />
                                        </td>
                                        <td className="border p-1">
                                            <input value={row.year} onChange={(e) => handleTableChange(idx, 'year', e.target.value, 'business')} className="w-full border border-gray-400 rounded px-1 py-1" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button onClick={() => addRows('business')} className="text-blue-600 mt-2 text-sm">+ Add Row</button>
                    </div>
                </div>

                {/* DECLARATION */}
                <div className="mt-6">
                    <label className="inline-flex items-center">
                        <input type="checkbox" className="mr-2" /> I hereby declare that the information provided above is correct.
                    </label>
                </div>

                {/* SIGNATURE + SUBMIT */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-6 border-t gap-4">
                    <div>
                        <p className="font-semibold mb-2">Student Signature:</p>
                        <div className="w-40 h-20 border border-gray-400 overflow-hidden">
                            {signature ? (
                                <img src={signature} alt="Signature" className="w-full h-full object-contain" />
                            ) : (
                                <input type="file" accept="image/*" onChange={handleSignatureUpload} className="w-full h-full" />
                            )}
                        </div>
                    </div>
                    <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">Submit</button>
                </div>
            </div>
            <AdminFooter />
        </>
    )
}
