'use client'
import AdminFooter from '@/app/(with-navbar)/componenets/Admin Footer/AdminFooter'
import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'


import './Add_Student.css'

export default function Add_Students() {
    const [image, setImage] = useState(null)
    const [signature, setSignature] = useState(null)
    const [uploadingImage, setUploadingImage] = useState(false)
    const [uploadingSignature, setUploadingSignature] = useState(false)

    const [educationRows, setEducationRows] = useState([{ degree: '', subject: '', year: '' }])
    const [extraCourses, setExtraCourses] = useState([{ degree: '', subject: '', year: '' }])
    const [jobExperience, setJobExperience] = useState([{ company: '', position: '', year: '' }])
    const [businessInfo, setBusinessInfo] = useState([{ name: '', service: '', year: '' }])
    const [studentId, setStudentId] = useState(null)
    const [topInfo, setTopInfo] = useState({ formNo: '', branch: '', batch: '', date: '' })
    const [personalInfo, setPersonalInfo] = useState({
        studentName: '',
        fatherName: '',
        motherName: '',
        presentAddress: '',
        permanentAddress: '',
        contact1: '',
        contact2: '',
        dob: '',
        nid: '',
        email: '',
        studentType: 'Running_Student' // Default
    })

    const [courseDetails, setCourseDetails] = useState({ subject: '', session: '', time: '', program: '' })
    const [purpose, setPurpose] = useState({ freelancing: false, fullTimeJob: false, businessDevelopment: false, other: false })
    const [declaration, setDeclaration] = useState(false)

    const IMGBB_API_KEY = '3d64b0e9dee39ca593b9da32467663ee'

    const uploadToImgBB = async (file) => {
        const formData = new FormData()
        formData.append('image', file)
        try {
            const res = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, formData)
            console.log("ImgBB response:", res.data) // for debugging
            return res.data.data.display_url // <-- use display_url
        } catch (error) {
            console.error('ImgBB upload error:', error)
            return null
        }
    }

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        setUploadingImage(true)
        const url = await uploadToImgBB(file)
        if (url) setImage(url)
        setUploadingImage(false)
    }

    const handleSignatureUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        setUploadingSignature(true)
        const url = await uploadToImgBB(file)
        if (url) setSignature(url)
        setUploadingSignature(false)
    }

    const handleEduChange = (index, field, value, type = 'education') => {
        const rows = type === 'education' ? [...educationRows] : [...extraCourses]
        rows[index][field] = value
        type === 'education' ? setEducationRows(rows) : setExtraCourses(rows)
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

    const addRow = (type = 'education') => {
        const newRow = { degree: '', subject: '', year: '' }
        type === 'education' ? setEducationRows([...educationRows, newRow]) : setExtraCourses([...extraCourses, newRow])
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

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!image || !signature) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Please upload both photo and signature!',
            })
            return
        }

        const confirmResult = await Swal.fire({
            title: 'Are you sure?',
            text: studentId ? "You are updating this student's data." : "You are adding a new student.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: studentId ? 'Update' : 'Submit',
            cancelButtonText: 'Cancel',
        })

        if (!confirmResult.isConfirmed) return

        const formData = {
            topInfo,
            personalInfo,
            courseDetails,
            purpose,
            educationRows,
            extraCourses,
            jobExperience,
            businessInfo,
            declaration,
            image,
            signature
        }

        try {
            if (studentId) {
                await axios.put('/api/StudentAddedDataAdmin', { ...formData, studentId })
                Swal.fire({ icon: 'success', title: 'Updated!', text: "Student data updated successfully!" })
            } else {
                const res = await axios.post('/api/StudentAddedDataAdmin', formData)
                if (res.data.success) {
                    setStudentId(res.data.studentId)
                    Swal.fire({ icon: 'success', title: 'Added!', text: "Student data added successfully!" })
                }
            }
        } catch (error) {
            console.error('Error saving student data:', error)
            Swal.fire({ icon: 'error', title: 'Error!', text: 'Something went wrong while saving data.' })
        }
    }

    // 👉 Print & Download handlers
    const handlePrint = () => {
        window.print()
    }

    const handleDownload = () => {
        const element = formRef.current
        const opt = {
            margin: 0.5,
            filename: `${personalInfo.studentName || 'student'}_form.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        }
        html2pdf().set(opt).from(element).save()
    }


    return (
        <>
            <form onSubmit={handleSubmit} className="max-w-6xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-md space-y-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-700">ADMISSION FORM</h1>

                {/* PHOTO UPLOAD */}
                <div className="flex justify-between items-center gap-6 flex-row">
                    <div>
                        <img src="https://i.postimg.cc/SsD9pWZ2/logo.jpg" alt="Logo" className="w-56 h-auto rounded-lg flex-shrink-0" />
                    </div>
                    <div>
                        <div className="w-32 h-32 border border-gray-400 overflow-hidden">
                            {uploadingImage ? <p className="text-center mt-12 text-sm text-gray-500">Uploading...</p> :
                                image ? <img src={image} alt="Student" className="w-full h-full object-cover" /> : null}
                        </div>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-2 w-full text-sm no-print" />
                    </div>
                </div>


                {/* TOP INFO */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="flex flex-col">
                        <p className="text-sm font-medium text-gray-600 mb-1">Form No.</p>
                        <input
                            // placeholder="Form No."
                            value={topInfo.formNo}
                            onChange={e => setTopInfo({ ...topInfo, formNo: e.target.value })}
                            className="border border-gray-400 rounded px-2 py-1 w-full"
                        />
                    </div>

                    <div className="flex flex-col">
                        <p className="text-sm font-medium text-gray-600 mb-1">Branch</p>
                        <input
                            // placeholder="Branch"
                            value={topInfo.branch}
                            onChange={e => setTopInfo({ ...topInfo, branch: e.target.value })}
                            className="border border-gray-400 rounded px-2 py-1 w-full"
                        />
                    </div>

                    <div className="flex flex-col">
                        <p className="text-sm font-medium text-gray-600 mb-1">Batch</p>
                        <input
                            // placeholder="Batch"
                            value={topInfo.batch}
                            onChange={e => setTopInfo({ ...topInfo, batch: e.target.value })}
                            className="border border-gray-400 rounded px-2 py-1 w-full"
                        />
                    </div>

                    <div className="flex flex-col">
                        <p className="text-sm font-medium text-gray-600 mb-1">Today Date</p>
                        <input
                            // placeholder="Date"
                            type="date"
                            value={topInfo.date}
                            onChange={e => setTopInfo({ ...topInfo, date: e.target.value })}
                            className="border border-gray-400 rounded px-2 py-1 w-full"
                        />
                    </div>
                </div>


                {/* PERSONAL INFORMATION */}
                <div>
                    <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-3 text-blue-800">PERSONAL INFORMATION</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">


                        <div className="flex flex-col">
                            <p className="text-sm font-medium text-gray-600 mb-1">Student's Name</p>
                            <input value={personalInfo.studentName} onChange={e => setPersonalInfo({ ...personalInfo, studentName: e.target.value })} className="border border-gray-400 rounded px-2 py-1 w-full" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-sm font-medium text-gray-600 mb-1">Father's Name</p>
                            <input value={personalInfo.fatherName} onChange={e => setPersonalInfo({ ...personalInfo, fatherName: e.target.value })} className="border border-gray-400 rounded px-2 py-1 w-full" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-sm font-medium text-gray-600 mb-1">Mother's Name</p>
                            <input value={personalInfo.motherName} onChange={e => setPersonalInfo({ ...personalInfo, motherName: e.target.value })} className="border border-gray-400 rounded px-2 py-1 w-full" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-sm font-medium text-gray-600 mb-1">Present Address</p>
                            <input value={personalInfo.presentAddress} onChange={e => setPersonalInfo({ ...personalInfo, presentAddress: e.target.value })} className="border border-gray-400 rounded px-2 py-1 w-full" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-sm font-medium text-gray-600 mb-1">Permanent Address</p>
                            <input value={personalInfo.permanentAddress} onChange={e => setPersonalInfo({ ...personalInfo, permanentAddress: e.target.value })} className="border border-gray-400 rounded px-2 py-1 w-full" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-sm font-medium text-gray-600 mb-1">Contact Number (1)</p>
                            <input value={personalInfo.contact1} onChange={e => setPersonalInfo({ ...personalInfo, contact1: e.target.value })} className="border border-gray-400 rounded px-2 py-1 w-full" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-sm font-medium text-gray-600 mb-1">Contact Number (2)</p>
                            <input value={personalInfo.contact2} onChange={e => setPersonalInfo({ ...personalInfo, contact2: e.target.value })} className="border border-gray-400 rounded px-2 py-1 w-full" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-sm font-medium text-gray-600 mb-1">Date of Birth</p>
                            <input type="date" value={personalInfo.dob} onChange={e => setPersonalInfo({ ...personalInfo, dob: e.target.value })} className="border border-gray-400 rounded px-2 py-1 w-full"
                            />
                        </div>
                        {/* <p className="print-only border border-gray-400 rounded px-2 py-1 w-full">
                            {personalInfo.dob}
                        </p> */}
                        <div className="flex flex-col">
                            <p className="text-sm font-medium text-gray-600 mb-1">NID</p>
                            <input placeholder="" value={personalInfo.nid} onChange={e => setPersonalInfo({ ...personalInfo, nid: e.target.value })} className="border border-gray-400 rounded px-2 py-1 w-full" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-sm font-medium text-gray-600 mb-1">Email</p>
                            <input type="email" value={personalInfo.email} onChange={e => setPersonalInfo({ ...personalInfo, email: e.target.value })} className="border border-gray-400 rounded px-2 py-1 w-full" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-sm font-medium text-gray-600 mb-1">Student Type</p>
                            {/* STUDENT TYPE DROPDOWN */}
                            <select
                                value={personalInfo.studentType}
                                onChange={e => setPersonalInfo({ ...personalInfo, studentType: e.target.value })}
                                className="border border-gray-400 rounded px-2 py-1 w-full "
                            >
                                <option value="Running_Student">Running Student</option>
                                <option value="Running_Intern">Running Intern</option>
                                <option value="Running_Employee">Running Employee</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* COURSE DETAILS & PURPOSE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div></div>

                    {/* Centered Header */}
                    <div className="col-span-1 md:col-span-2 text-left">
                        <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-3 text-blue-800">
                            COURSE DETAILS
                        </h2>
                    </div>

                    <div className="flex flex-col">
                        <p className="text-sm font-medium text-gray-600 mb-1">Email</p>
                        <input type="email" value={personalInfo.email} onChange={e => setPersonalInfo({ ...personalInfo, email: e.target.value })} className="border border-gray-400 rounded px-2 py-1 w-full" />
                    </div>

                    <div className="flex flex-col">
                        <p className="text-sm font-medium text-gray-600 mb-1">Session</p>
                        <input value={courseDetails.session} onChange={e => setCourseDetails({ ...courseDetails, session: e.target.value })} className="border border-gray-400 rounded px-2 py-1 w-full" />
                    </div>

                    <div className="flex flex-col">
                        <p className="text-sm font-medium text-gray-600 mb-1">Duration</p>
                        <input value={courseDetails.time} onChange={e => setCourseDetails({ ...courseDetails, time: e.target.value })} className="border border-gray-400 rounded px-2 py-1 w-full" />
                    </div>

                    <div className="flex flex-col">
                        <p className="text-sm font-medium text-gray-600 mb-1">Program</p>
                        <input value={courseDetails.program} onChange={e => setCourseDetails({ ...courseDetails, program: e.target.value })} className="border border-gray-400 rounded px-2 py-1 w-full" />
                    </div>

                    {/* PURPOSE */}
                    <div>
                        <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-3 text-blue-800">PURPOSE</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {Object.keys(purpose).map((key) => (
                                <label key={key} className="flex items-center">
                                    <input type="checkbox" className="mr-2" checked={purpose[key]} onChange={e => setPurpose({ ...purpose, [key]: e.target.checked })} />
                                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>


                {/* EDUCATION, JOB & BUSINESS TABLES */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Fundamental Education */}
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
                                        <td className="border p-1"><input className="w-full border border-gray-400 rounded px-1 py-1" placeholder='Education' value={row.degree} onChange={e => handleEduChange(idx, 'degree', e.target.value, 'education')} /></td>
                                        <td className="border p-1"><input className="w-full border border-gray-400 rounded px-1 py-1" placeholder='Subject' value={row.subject} onChange={e => handleEduChange(idx, 'subject', e.target.value, 'education')} /></td>
                                        <td className="border p-1"><input className="w-full border border-gray-400 rounded px-1 py-1" placeholder='Year' value={row.year} onChange={e => handleEduChange(idx, 'year', e.target.value, 'education')} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button type="button" onClick={() => addRow('education')} className="text-blue-600 mt-2 text-sm no-print">+ Add Row</button>
                    </div>

                    {/* Extra Courses */}
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
                                        <td className="border p-1"><input className="w-full border border-gray-400 rounded px-1 py-1" placeholder='Education' value={row.degree} onChange={e => handleEduChange(idx, 'degree', e.target.value, 'extra')} /></td>
                                        <td className="border p-1"><input className="w-full border border-gray-400 rounded px-1 py-1" placeholder='Subject' value={row.subject} onChange={e => handleEduChange(idx, 'subject', e.target.value, 'extra')} /></td>
                                        <td className="border p-1"><input className="w-full border border-gray-400 rounded px-1 py-1" placeholder='Year' value={row.year} onChange={e => handleEduChange(idx, 'year', e.target.value, 'extra')} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button type="button" onClick={() => addRow('extra')} className="text-blue-600 mt-2 text-sm no-print">+ Add Row</button>
                    </div>
                </div>

                {/* JOB EXPERIENCE AND BUSINESS INFO */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {/* Job Experience */}
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-2">Job Experience</h3>
                        <table className="w-full table-auto border text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border  p-2">Company Name</th>
                                    <th className="border p-2">Position</th>
                                    <th className="border p-2">Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobExperience.map((row, idx) => (
                                    <tr key={idx}>
                                        <td className="border p-1"><input placeholder='company Name' value={row.company} onChange={e => handleTableChange(idx, 'company', e.target.value, 'job')} className="w-full border border-gray-400 rounded px-1 py-1" /></td>
                                        <td className="border p-1"><input placeholder='position' value={row.position} onChange={e => handleTableChange(idx, 'position', e.target.value, 'job')} className="w-full border border-gray-400 rounded px-1 py-1" /></td>
                                        <td className="border p-1"><input placeholder='year' value={row.year} onChange={e => handleTableChange(idx, 'year', e.target.value, 'job')} className="w-full border border-gray-400 rounded px-1 py-1" /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button onClick={() => addRows('job')} className="text-blue-600 mt-2 text-sm no-print">+ Add Row</button>
                    </div>

                    {/* Business Info */}
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
                                        <td className="border p-1"><input placeholder='name' value={row.name} onChange={e => handleTableChange(idx, 'name', e.target.value, 'business')} className="w-full border border-gray-400 rounded px-1 py-1" /></td>
                                        <td className="border p-1"><input placeholder='service' value={row.service} onChange={e => handleTableChange(idx, 'service', e.target.value, 'business')} className="w-full border border-gray-400 rounded px-1 py-1" /></td>
                                        <td className="border p-1"><input placeholder='year' value={row.year} onChange={e => handleTableChange(idx, 'year', e.target.value, 'business')} className="w-full border border-gray-400 rounded px-1 py-1" /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button onClick={() => addRows('business')} className="text-blue-600 mt-2 text-sm no-print">+ Add Row</button>
                    </div>
                </div>

                {/* SIGNATURE */}
                <div className="flex items-center gap-6 mt-6">
                    <div>
                        <p className="mb-1">Upload Signature:</p>
                        <div className="w-40 h-20 border border-gray-400 overflow-hidden">
                            {uploadingSignature ? <p className="text-center mt-6 text-sm text-gray-500">Uploading...</p> :
                                signature ? <img src={signature} alt="Signature" className="w-full h-full object-cover" /> : null}
                        </div>
                        <input type="file" accept="image/*" onChange={handleSignatureUpload} className="mt-2 w-full text-sm no-print" />
                    </div>
                </div>

                {/* DECLARATION */}
                <div className="mt-6">
                    <label className="inline-flex items-center no-print">
                        <input type="checkbox" className="mr-2 " checked={declaration} onChange={e => setDeclaration(e.target.checked)}/>
                        I hereby declare that the information provided above is correct.
                    </label>
                </div>

                <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 mt-4 no-print">Submit</button>

                {/* Print & Download Buttons */}
                {studentId && (
                    <div className="flex gap-4 mt-6">
                        <button type="button" onClick={handlePrint} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 no-print">Print</button>
                        <button type="button" onClick={handleDownload} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 no-print">Download PDF</button>
                    </div>
                )}
            </form>
            <AdminFooter />
        </>
    )
}
