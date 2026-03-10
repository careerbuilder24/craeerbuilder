'use client';
import useStudentAllAdmin from '@/hooks/useStudentAllAdmin';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function RunningStudentAdmin() {
    const { StudentAddedDataAdminData, updateStudentData } = useStudentAllAdmin();
    const [expandedRow, setExpandedRow] = useState(null);
    const [editRow, setEditRow] = useState(null);
    const [editData, setEditData] = useState({});
    const [search, setSearch] = useState("");

    if (!StudentAddedDataAdminData?.students)
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-28 w-28 border-t-4 border-blue-500 border-solid"></div>
            </div>
        );

    const runningStudents = StudentAddedDataAdminData.students.filter(
        stu => stu.status === 'Running_Student'
    );

    const filteredStudents = runningStudents.filter(stu => {
        const query = search.toLowerCase();
        return (
            stu.student_name?.toLowerCase().includes(query) ||
            stu.email?.toLowerCase().includes(query) ||
            stu.contact1?.toLowerCase().includes(query) ||
            stu.contact2?.toLowerCase().includes(query) ||
            stu.batch?.toLowerCase().includes(query)
        );
    });

    const toggleRow = (id, stu) => {
        if (expandedRow === id) {
            setExpandedRow(null);
            setEditRow(null);
        } else {
            setExpandedRow(id);
            setEditRow(null);
            setEditData(prev => ({
                ...prev,
                [id]: { ...stu, dob: new Date(stu.dob).toISOString().split('T')[0] }
            }));
        }
    };

    const handleChange = (id, field, value) => {
        setEditData(prev => ({
            ...prev,
            [id]: { ...prev[id], [field]: value }
        }));
    };

    const handleListChange = (id, field, index, key, value) => {
        const list = [...(editData[id][field] || [])];
        list[index][key] = value;
        handleChange(id, field, list);
    };

    const toggleEdit = (id) => setEditRow(prev => (prev === id ? null : id));

    const uploadImageToImgbb = async (file) => {
        const apiKey = '3d64b0e9dee39ca593b9da32467663ee';
        const formData = new FormData();
        formData.append('image', file);
        try {
            const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data?.data?.url) return data.data.url;
            return '';
        } catch (err) {
            console.error('ImgBB upload error:', err);
            return '';
        }
    };

    const saveEdit = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to save the changes?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        });

        if (!result.isConfirmed) return;

        try {
            const res = await fetch('/api/StudentAddedDataAdmin', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    studentId: id,
                    topInfo: {
                        formNo: editData[id].form_no,
                        branch: editData[id].branch,
                        batch: editData[id].batch,
                        date: editData[id].date,
                    },
                    personalInfo: {
                        studentName: editData[id].student_name,
                        fatherName: editData[id].father_name,
                        motherName: editData[id].mother_name,
                        presentAddress: editData[id].present_address,
                        permanentAddress: editData[id].permanent_address,
                        contact1: editData[id].contact1,
                        contact2: editData[id].contact2,
                        dob: editData[id].dob,
                        nid: editData[id].nid,
                        email: editData[id].email,
                        status: editData[id].status,
                    },
                    courseDetails: {
                        subject: editData[id].course_subject,
                        session: editData[id].course_session,
                        time: editData[id].course_time,
                        program: editData[id].program,
                    },
                    purpose: editData[id].purpose,
                    educationRows: editData[id].education,
                    extraCourses: editData[id].extra_courses,
                    jobExperience: editData[id].job_experience,
                    businessInfo: editData[id].business_info,
                    declaration: editData[id].declaration,
                    student_image: editData[id].student_image,
                    signature_image: editData[id].signature_image,
                }),
            });

            const data = await res.json();
            if (data.success) {
                Swal.fire({ icon: 'success', title: 'Student updated successfully!', timer: 2000, showConfirmButton: false });
                updateStudentData(id, editData[id]);
                setEditRow(null);
                setExpandedRow(id);
            } else {
                Swal.fire({ icon: 'error', title: 'Update failed', text: data.message });
            }
        } catch (err) {
            console.error("Error updating student:", err);
            Swal.fire({ icon: 'error', title: 'Error', text: 'Error updating student' });
        }
    };

    return (
        <div className="p-4">
            <div className="w-full max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Running Students</h2>
                    <input
                        type="text"
                        placeholder="Search Running Students"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="border rounded px-3 py-1 text-sm w-80"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 text-center table-auto">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border px-2 py-1">Image</th>
                                <th className="border px-2 py-1">Name</th>
                                <th className="border px-2 py-1">Email</th>
                                <th className="border px-2 py-1">Contact</th>
                                <th className="border px-2 py-1">Status</th>
                                <th className="border px-2 py-1">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.length > 0 ? filteredStudents.map(stu => (
                                <React.Fragment key={stu.id}>
                                    <tr className="text-sm cursor-pointer hover:bg-gray-100" onClick={() => toggleRow(stu.id, stu)}>
                                        <td className="border px-2 py-1">
                                            <img src={stu.student_image} alt="student" className="w-16 h-16 object-cover mx-auto" />
                                        </td>
                                        <td className="border px-2 py-1">{stu.student_name}</td>
                                        <td className="border px-2 py-1">{stu.email}</td>
                                        <td className="border px-2 py-1">{stu.contact1}, {stu.contact2}</td>
                                        <td className="border px-2 py-1">{stu.status}</td>
                                        <td className="border px-2 py-1">
                                            <button
                                                className="px-3 py-1 bg-red-500 text-white rounded"
                                                onClick={async (e) => {
                                                    e.stopPropagation();
                                                    const result = await Swal.fire({
                                                        title: 'Are you sure?',
                                                        text: "This will permanently delete the student!",
                                                        icon: 'warning',
                                                        showCancelButton: true,
                                                        confirmButtonText: 'Yes, delete',
                                                        cancelButtonText: 'Cancel',
                                                        reverseButtons: true,
                                                    });
                                                    if (result.isConfirmed) {
                                                        try {
                                                            const res = await fetch(`/api/StudentAddedDataAdmin?id=${stu.id}`, { method: 'DELETE' });
                                                            const data = await res.json();
                                                            if (data.success) {
                                                                Swal.fire({ icon: 'success', title: 'Deleted!', text: data.message, timer: 1500, showConfirmButton: false });
                                                                updateStudentData(stu.id, null, true);
                                                            } else Swal.fire({ icon: 'error', title: 'Failed', text: data.message });
                                                        } catch (err) {
                                                            console.error(err);
                                                            Swal.fire({ icon: 'error', title: 'Error', text: 'Could not delete student' });
                                                        }
                                                    }
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>

                                    {expandedRow === stu.id && (
                                        <tr>
                                            <td colSpan={6} className="border px-4 py-2 text-left bg-gray-50">
                                                {editRow === stu.id ? (
                                                    <div className="space-y-2">
                                                        <div className="grid grid-cols-2 gap-2">
                                                            {['student_name', 'email', 'batch', 'form_no', 'father_name', 'mother_name', 'dob', 'present_address', 'permanent_address', 'course_subject', 'course_time', 'program'].map(field => (
                                                                <div key={field}>
                                                                    <label className="font-semibold">{field.replace(/_/g, ' ')}:</label>
                                                                    <input
                                                                        type={field === 'dob' ? 'date' : 'text'}
                                                                        value={editData[stu.id][field]}
                                                                        onChange={e => handleChange(stu.id, field, e.target.value)}
                                                                        className="border rounded px-2 py-1 w-full"
                                                                    />
                                                                </div>
                                                            ))}
                                                        </div>

                                                        {/* Education / Extra / Job / Business */}
                                                        {['education', 'extra_courses', 'job_experience', 'business_info'].map(listField => (
                                                            <div key={listField}>
                                                                <label className="font-semibold">{listField.replace(/_/g, ' ')}:</label>
                                                                {(editData[stu.id][listField] || []).map((item, idx) => (
                                                                    <div key={idx} className="flex gap-2 mb-1">
                                                                        {Object.keys(item).map(key => (
                                                                            <input
                                                                                key={key}
                                                                                type="text"
                                                                                value={item[key]}
                                                                                onChange={e => handleListChange(stu.id, listField, idx, key, e.target.value)}
                                                                                className="border rounded px-2 py-1"
                                                                                placeholder={key}
                                                                            />
                                                                        ))}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ))}

                                                        {/* Purpose */}
                                                        <div>
                                                            <label className="font-semibold">Purpose:</label>
                                                            {['businessDevelopment', 'freelancing', 'fullTimeJob', 'other'].map(purposeKey => (
                                                                <div key={purposeKey}>
                                                                    <label>
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={editData[stu.id].purpose?.[purposeKey] || false}
                                                                            onChange={e => handleChange(stu.id, 'purpose', {
                                                                                ...editData[stu.id].purpose,
                                                                                [purposeKey]: e.target.checked
                                                                            })}
                                                                        /> {purposeKey}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        {/* Image / Signature */}
                                                        <div>
                                                            <label className="font-semibold">Student Image:</label>
                                                            <input type="file" accept="image/*" onChange={async e => {
                                                                const file = e.target.files[0];
                                                                if (!file) return;
                                                                const url = await uploadImageToImgbb(file);
                                                                handleChange(stu.id, 'student_image', url);
                                                            }} className="border rounded px-2 py-1 w-full" />
                                                            {editData[stu.id]?.student_image && <img src={editData[stu.id].student_image} className="w-24 h-24 object-cover mt-2" />}
                                                        </div>
                                                        <div>
                                                            <label className="font-semibold">Signature:</label>
                                                            <input type="file" accept="image/*" onChange={async e => {
                                                                const file = e.target.files[0];
                                                                if (!file) return;
                                                                const url = await uploadImageToImgbb(file);
                                                                handleChange(stu.id, 'signature_image', url);
                                                            }} className="border rounded px-2 py-1 w-full" />
                                                            {editData[stu.id]?.signature_image && <img src={editData[stu.id].signature_image} className="w-24 h-16 object-contain mt-2" />}
                                                        </div>

                                                        <div className="mt-2 flex gap-2">
                                                            <button className="px-3 py-1 bg-green-500 text-white rounded" onClick={() => saveEdit(stu.id)}>Save</button>
                                                            <button className="px-3 py-1 bg-gray-400 text-white rounded" onClick={() => setEditRow(null)}>Cancel</button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-1 text-sm">
                                                        <div><strong>Batch:</strong> {stu.batch}</div>
                                                        <div><strong>Form No:</strong> {stu.form_no}</div>
                                                        <div><strong>Father:</strong> {stu.father_name}</div>
                                                        <div><strong>Mother:</strong> {stu.mother_name}</div>
                                                        <div><strong>DOB:</strong> {new Date(stu.dob).toLocaleDateString()}</div>
                                                        <div><strong>Addresses:</strong> Present: {stu.present_address}, Permanent: {stu.permanent_address}</div>
                                                        <div><strong>Course:</strong> {stu.course_subject} ({stu.course_time}, {stu.program})</div>
                                                        <div>
                                                            <strong>Education:</strong> {stu.education?.map((e, i) => <div key={i}>{e.degree} - {e.subject} ({e.year})</div>)}
                                                        </div>
                                                        <div>
                                                            <strong>Extra Courses:</strong> {stu.extra_courses?.map((c, i) => <div key={i}>{c.degree} - {c.subject} ({c.year})</div>)}
                                                        </div>
                                                        <div>
                                                            <strong>Job Experience:</strong> {stu.job_experience?.map((j, i) => <div key={i}>{j.company} - {j.position} ({j.year})</div>)}
                                                        </div>
                                                        <div>
                                                            <strong>Business Info:</strong> {stu.business_info?.map((b, i) => <div key={i}>{b.name} ({b.service}, {b.year})</div>)}
                                                        </div>
                                                        <div>
                                                            <strong>Purpose:</strong>
                                                            <div>Business: {stu.purpose?.businessDevelopment ? 'Yes' : 'No'}</div>
                                                            <div>Freelancing: {stu.purpose?.freelancing ? 'Yes' : 'No'}</div>
                                                            <div>Full-Time: {stu.purpose?.fullTimeJob ? 'Yes' : 'No'}</div>
                                                            <div>Other: {stu.purpose?.other ? 'Yes' : 'No'}</div>
                                                        </div>
                                                        <div>
                                                            <strong>Signature:</strong><br />
                                                            {stu.signature_image && <img src={stu.signature_image} className="w-24 h-16 object-contain mt-1" />}
                                                        </div>
                                                        <button className="px-3 py-1 bg-blue-500 text-white rounded mt-2" onClick={e => { e.stopPropagation(); toggleEdit(stu.id); }}>Edit</button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="py-4 text-gray-500">No running students found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
