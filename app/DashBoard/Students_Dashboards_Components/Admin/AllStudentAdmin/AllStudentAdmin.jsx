'use client';
import useStudentAllAdmin from '@/hooks/useStudentAllAdmin';
import { ClassNames } from '@emotion/react';
import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function RunningStudentAdmin() {
  const { StudentAddedDataAdminData, updateStudentData } = useStudentAllAdmin();
  // const [expandedRow, setExpandedRow] = useState(null);
  const [editRow, setEditRow] = useState(null);
  const [editData, setEditData] = useState({});
  const [search, setSearch] = useState("");

  // const [dropdownRow, setDropdownRow] = useState(null);

  const [topInfo, setTopInfo] = useState({
    formNo: '',
    branch: '',
    batch: '',
    date: '',
  });

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
    studentType: 'Running_Student',
    status: '',
  });

  // Initialize state correctly
  const [courseDetails, setCourseDetails] = useState({
    course_subject: "",
    course_session: "",
    course_time: "",
    program: ""
  });

  const [purpose, setPurpose] = useState({
    Admission: false,
    Transfer: false,
    Scholarship: false,
  });

  const [educationRows, setEducationRows] = useState([]);
  const [extraCourses, setExtraCourses] = useState([]);
  const [jobExperience, setJobExperience] = useState([]);
  const [businessInfo, setBusinessInfo] = useState([]);
  const [declaration, setDeclaration] = useState(false);
  const [image, setImage] = useState(null);
  const [signature, setSignature] = useState(null);
  const [openActionId, setOpenActionId] = useState(null);
  const [viewStudent, setViewStudent] = useState(null);
  const [uploading, setUploading] = useState(false);


  console.log(viewStudent)

  // const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingSignature, setUploadingSignature] = useState(false);

  if (!StudentAddedDataAdminData?.students) return <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-28 w-28 border-t-4 border-blue-500 border-solid"></div>
  </div>;

  const students = StudentAddedDataAdminData.students;



  // Filter students
  const filteredStudents = students.filter(stu => {
    const query = search.toLowerCase();
    return (
      stu.student_name?.toLowerCase().includes(query) ||
      stu.email?.toLowerCase().includes(query) ||
      stu.contact1?.toLowerCase().includes(query) ||
      stu.contact2?.toLowerCase().includes(query) ||
      stu.batch?.toLowerCase().includes(query)
    );
  });

  const handleEditClick = (stu) => {
    if (!stu) return; // safety check

    setEditRow(stu.id);

    setTopInfo({
      formNo: stu.form_no || "",
      branch: stu.branch || "",
      batch: stu.batch || "",
      date: stu.date || "",
    });

    setPersonalInfo({
      studentName: stu.student_name || "",
      fatherName: stu.father_name || "",
      motherName: stu.mother_name || "",
      presentAddress: stu.present_address || "",
      permanentAddress: stu.permanent_address || "",
      contact1: stu.contact1 || "",
      contact2: stu.contact2 || "",
      dob: stu.dob || "",
      nid: stu.nid || "",
      email: stu.email || "",
      studentType: stu.student_type || stu.status || "Running_Student",
      status: stu.status || "Running_Student",
    });

    setCourseDetails({
      subject: stu.course_subject || "",
      session: stu.course_session || "",
      time: stu.course_time || "",
      program: stu.program || "",
    });

    setPurpose(stu.purpose || { Admission: false, Transfer: false, Scholarship: false });
    setEducationRows(stu.education || []);
    setExtraCourses(stu.extra_courses || []);
    setJobExperience(stu.job_experience || []);
    setBusinessInfo(stu.business_info || []);
    setDeclaration(stu.declaration || false);
    setImage(stu.student_image || null);
    setSignature(stu.signature_image || null);
  };


  const handleSignatureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingSignature(true);

    // ImgBB upload
    const apiKey = '3d64b0e9dee39ca593b9da32467663ee';
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data?.data?.url) {
        setSignature(data.data.url); // save uploaded image URL to state
      } else {
        Swal.fire({ icon: 'error', title: 'Upload failed' });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: 'error', title: 'Upload error' });
    } finally {
      setUploadingSignature(false);
    }
  };

  // --- Education & Extra Courses Change Handler ---
  const handleEduChange = (index, field, value, type) => {
    if (type === 'education') {
      const updated = [...educationRows];
      updated[index][field] = value;
      setEducationRows(updated);
    } else if (type === 'extra') {
      const updated = [...extraCourses];
      updated[index][field] = value;
      setExtraCourses(updated);
    }
  };

 
  const handleStudentUpdate = async (e) => {
    e.preventDefault();

    try {
      let studentImageUrl = image; // default to existing image URL

      // If the image is a local file (File object), upload to imgbb
      if (image && image instanceof File) {
        const formData = new FormData();
        formData.append("image", image);

        const imgbbApiKey = "YOUR_IMGBB_API_KEY"; // <-- Replace with your key
        const uploadRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();

        if (uploadData.success) {
          studentImageUrl = uploadData.data.url; // get imgbb link
        } else {
          Swal.fire("Error", "Failed to upload student image", "error");
          return; // stop submission if upload failed
        }
      }

      const payload = {
        studentId: editRow,
        topInfo,
        personalInfo,
        courseDetails,
        purpose,
        educationRows,
        extraCourses,
        jobExperience,
        businessInfo,
        declaration,
        student_image: studentImageUrl, // send imgbb URL
        signature_image: signature,
      };

      const res = await fetch("/api/StudentAddedDataAdmin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire("Updated", "Student info updated successfully", "success");
        setEditRow(null);
      } else {
        Swal.fire("Error", data.message || "Failed to update student", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };


  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const imgbbApiKey = "3d64b0e9dee39ca593b9da32467663ee"; // <-- Replace with your key
      const res = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, formData);
      const imageUrl = res.data.data.url; // This is the public imgbb URL
      setImage(imageUrl);
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };


  // --- Add Row Handlers ---
  const addRow = (type) => {
    if (type === 'education') {
      setEducationRows([...educationRows, { degree: '', subject: '', year: '' }]);
    } else if (type === 'extra') {
      setExtraCourses([...extraCourses, { degree: '', subject: '', year: '' }]);
    }
  };

  // delete function 

  const handleDeleteStudent = async (stu) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the student!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axios.delete("/api/StudentAddedDataAdmin", {
        data: { id: stu.id },
      });

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Student has been deleted",
          timer: 1500,
          showConfirmButton: false,
        });

        // Remove from frontend instantly
        updateStudentData(stu.id, null); // <-- we will modify hook to handle null
      } else {
        Swal.fire({ icon: "error", title: "Failed", text: "Could not delete student" });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: "error", title: "Error", text: "Something went wrong" });
    }
  };


  // Utility: format date string for <input type="date">
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    if (isNaN(d)) return ""; // invalid date
    return d.toISOString().split("T")[0]; // "YYYY-MM-DD"
  };





  console.log(StudentAddedDataAdminData)
  return (
    <div className="p-4">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">All Students</h2>
          <input
            type="text"
            placeholder="Search Students"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border rounded px-3 py-1 text-sm w-80"
          />
        </div>

        <div className="relative w-full max-w-full">
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
                  {editRow === stu.id ? (
                    <tr>
                      <td colSpan={6} className="p-4 bg-gray-50">
                        {/* Inline Admission Form */}
                        <form onSubmit={handleStudentUpdate} className="max-w-6xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-md space-y-6">
                          <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-700">ADMISSION FORM</h1>

                          {/* PHOTO UPLOAD */}
                          <div className="flex justify-between items-center gap-6 flex-row">
                            <div>
                              <img
                                src={stu.university_logo || "https://i.postimg.cc/SsD9pWZ2/logo.jpg"}
                                alt="Logo"
                                className="w-56 h-auto rounded-lg flex-shrink-0"
                              />
                            </div>
                            <div>
                              <div className="w-32 h-32 border border-gray-400 overflow-hidden">
                                {image ? (
                                  <img src={image} alt="Student" className="w-full h-full object-cover" />
                                ) : (
                                  <p className="text-center mt-12 text-sm text-gray-500">No Image</p>
                                )}
                              </div>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="mt-2 w-full text-sm"
                              />
                              {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
                            </div>
                          </div>

                          {/* TOP INFO */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {["formNo", "branch", "batch", "date"].map((key, idx) => (
                              <div key={idx} className="flex flex-col">
                                <p className="text-sm font-medium text-gray-600 mb-1">{key === "formNo" ? "Form No." : key.charAt(0).toUpperCase() + key.slice(1)}</p>

                                <input
                                  type={key === "date" ? "date" : "text"}
                                  value={key === "date" ? formatDate(topInfo[key]) : topInfo[key]}
                                  onChange={e => setTopInfo({ ...topInfo, [key]: e.target.value })}
                                  className="border border-gray-400 rounded px-2 py-1 w-full"
                                />
                              </div>
                            ))}
                          </div>

                          {/* PERSONAL INFORMATION */}
                          <div>
                            <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-3 text-blue-800">PERSONAL INFORMATION</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {Object.keys(personalInfo).map((key, idx) => {
                                if (key === "status") return null; // skip status here
                                if (key === "studentType") {
                                  return (
                                    <div key={idx} className="flex flex-col">
                                      <p className="text-sm font-medium text-gray-600 mb-1">Student Type</p>
                                      <select
                                        value={personalInfo.studentType}
                                        onChange={e => setPersonalInfo({ ...personalInfo, studentType: e.target.value })}
                                        className="border border-gray-400 rounded px-2 py-1 w-full"
                                      >
                                        <option value="Running_Student">Running Student</option>
                                        <option value="Running_Intern">Running Intern</option>
                                        <option value="Running_Employee">Running Employee</option>
                                      </select>
                                    </div>
                                  );
                                }
                                return (
                                  <div key={idx} className="flex flex-col">
                                    <p className="text-sm font-medium text-gray-600 mb-1">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</p>

                                    <input
                                      type={key === "dob" ? "date" : key === "email" ? "email" : "text"}
                                      value={key === "dob" ? formatDate(personalInfo[key]) : personalInfo[key]}
                                      onChange={e => setPersonalInfo({ ...personalInfo, [key]: e.target.value })}
                                      className="border border-gray-400 rounded px-2 py-1 w-full"
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* COURSE DETAILS */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <h2 className="col-span-2 text-xl font-bold border-b border-gray-300 pb-1 mb-3 text-blue-800">COURSE DETAILS</h2>
                            {Object.entries(courseDetails).map(([key, value]) => (
                              <div key={key} className="flex flex-col">
                                <p className="text-sm font-medium text-gray-600 mb-1">
                                  {key.replace("course_", "").charAt(0).toUpperCase() + key.replace("course_", "").slice(1)}
                                </p>
                                <input
                                  type="text"
                                  value={value}
                                  onChange={e => setCourseDetails({ ...courseDetails, [key]: e.target.value })}
                                  className="border border-gray-400 rounded px-2 py-1 w-full"
                                />
                              </div>
                            ))}
                          </div>

                          {/* PURPOSE */}
                          <div>
                            <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-3 text-blue-800">PURPOSE</h2>
                            <div className="grid grid-cols-2 gap-4">
                              {Object.keys(purpose).map((key) => (
                                <label key={key} className="flex items-center">
                                  <input type="checkbox" className="mr-2" checked={purpose[key]} onChange={e => setPurpose({ ...purpose, [key]: e.target.checked })} />
                                  {key}
                                </label>
                              ))}
                            </div>
                          </div>

                          {/* EDUCATION & EXTRA COURSES */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Education */}
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
                                      {["degree", "subject", "year"].map(col => (
                                        <td key={col} className="border p-1">
                                          <input
                                            className="w-full border border-gray-400 rounded px-1 py-1"
                                            value={row[col]}
                                            onChange={e => handleEduChange(idx, col, e.target.value, "education")}
                                          />
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              <button type="button" onClick={() => addRow("education")} className="text-blue-600 mt-2 text-sm">+ Add Row</button>
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
                                      {["degree", "subject", "year"].map(col => (
                                        <td key={col} className="border p-1">
                                          <input
                                            className="w-full border border-gray-400 rounded px-1 py-1"
                                            value={row[col]}
                                            onChange={e => handleEduChange(idx, col, e.target.value, "extra")}
                                          />
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              <button type="button" onClick={() => addRow("extra")} className="text-blue-600 mt-2 text-sm">+ Add Row</button>
                            </div>
                          </div>

                          {/* IMAGE & SIGNATURE */}
                          <div className="flex gap-6 mt-4">
                            <div>
                              <p>Signature</p>
                              <div className="w-40 h-20 border overflow-hidden">
                                {signature ? <img src={signature} alt="Signature" className="w-full h-full object-cover" /> : <p className="text-center mt-6 text-gray-500">No Signature</p>}
                              </div>
                              <input type="file" onChange={handleSignatureUpload} className="mt-2 w-full text-sm" />
                            </div>
                          </div>

                          {/* DECLARATION */}
                          {/* <div>
                            <label className="inline-flex items-center">
                              <input type="checkbox" checked={declaration} onChange={e => setDeclaration(e.target.checked)} className="mr-2" />
                              I hereby declare that the information provided above is correct.
                            </label>
                          </div> */}

                          {/* <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">Update</button> */}
                          <div className="flex justify-center items-center gap-2 mt-4">
                            <button
                              type="submit"
                              className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
                            >
                              Update
                            </button>
                            <button
                              type="button"
                              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                              onClick={() => setEditRow(null)} // close edit form
                            >
                              Cancel
                            </button>
                          </div>

                        </form>

                      </td>
                    </tr>
                  ) : (
                    <tr className="text-sm hover:bg-gray-100">
                      <td className="border px-2 py-1"><img src={stu.student_image} alt="student" className="w-16 h-16 object-cover mx-auto" /></td>
                      <td className="border px-2 py-1">{stu.student_name}</td>
                      <td className="border px-2 py-1">{stu.email}</td>
                      <td className="border px-2 py-1">{stu.contact1}, {stu.contact2}</td>
                      <td className="border px-2 py-1" onClick={e => e.stopPropagation()}>
                        <select
                          value={editData[stu.id]?.status || stu.status || 'Running_Student'}
                          onChange={async (e) => {
                            const newStatus = e.target.value;


                            setEditData(prev => ({
                              ...prev,
                              [stu.id]: { ...(prev[stu.id] || stu), status: newStatus },
                            }));

                            // Confirmation dialog
                            const result = await Swal.fire({
                              title: 'Are you sure?',
                              text: `Change status to "${newStatus}"?`,
                              icon: 'question',
                              showCancelButton: true,
                              confirmButtonText: 'Yes, update',
                              cancelButtonText: 'Cancel',
                              reverseButtons: true,
                            });

                            if (!result.isConfirmed) {
                              // revert if cancelled
                              setEditData(prev => ({
                                ...prev,
                                [stu.id]: { ...(prev[stu.id] || stu), status: stu.status },
                              }));
                              return;
                            }

                            try {
                              // Send full editData to API, not just stu
                              const bodyData = {
                                studentId: stu.id,
                                topInfo: {
                                  formNo: editData[stu.id]?.form_no || stu.form_no,
                                  branch: editData[stu.id]?.branch || stu.branch,
                                  batch: editData[stu.id]?.batch || stu.batch,
                                  date: editData[stu.id]?.date || stu.date,
                                },
                                personalInfo: {
                                  studentName: editData[stu.id]?.student_name || stu.student_name,
                                  fatherName: editData[stu.id]?.father_name || stu.father_name,
                                  motherName: editData[stu.id]?.mother_name || stu.mother_name,
                                  presentAddress: editData[stu.id]?.present_address || stu.present_address,
                                  permanentAddress: editData[stu.id]?.permanent_address || stu.permanent_address,
                                  contact1: editData[stu.id]?.contact1 || stu.contact1,
                                  contact2: editData[stu.id]?.contact2 || stu.contact2,
                                  dob: editData[stu.id]?.dob || stu.dob,
                                  nid: editData[stu.id]?.nid || stu.nid,
                                  email: editData[stu.id]?.email || stu.email,
                                  status: newStatus,
                                },
                                courseDetails: {
                                  subject: editData[stu.id]?.course_subject || stu.course_subject,
                                  session: editData[stu.id]?.course_session || stu.course_session,
                                  time: editData[stu.id]?.course_time || stu.course_time,
                                  program: editData[stu.id]?.program || stu.program,
                                },
                                purpose: editData[stu.id]?.purpose || stu.purpose,
                                educationRows: editData[stu.id]?.education || stu.education,
                                extraCourses: editData[stu.id]?.extra_courses || stu.extra_courses,
                                jobExperience: editData[stu.id]?.job_experience || stu.job_experience,
                                businessInfo: editData[stu.id]?.business_info || stu.business_info,
                                declaration: editData[stu.id]?.declaration || stu.declaration,
                                student_image: editData[stu.id]?.student_image || stu.student_image,
                                signature_image: editData[stu.id]?.signature_image || stu.signature_image,
                              };

                              const res = await fetch('/api/StudentAddedDataAdmin', {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(bodyData),
                              });

                              const data = await res.json();

                              if (data.success) {
                                // Merge updated status into editData to keep other fields intact
                                setEditData(prev => ({
                                  ...prev,
                                  [stu.id]: { ...(prev[stu.id] || stu), status: newStatus },
                                }));
                                updateStudentData(stu.id, { ...(editData[stu.id] || stu), status: newStatus });

                                Swal.fire({
                                  icon: 'success',
                                  title: 'Status updated!',
                                  timer: 1500,
                                  showConfirmButton: false
                                });
                              } else {
                                Swal.fire({ icon: 'error', title: 'Failed', text: data.message });
                                setEditData(prev => ({
                                  ...prev,
                                  [stu.id]: { ...(prev[stu.id] || stu), status: stu.status },
                                }));
                              }
                            } catch (err) {
                              console.error(err);
                              Swal.fire({ icon: 'error', title: 'Error', text: 'Could not update status' });
                              setEditData(prev => ({
                                ...prev,
                                [stu.id]: { ...(prev[stu.id] || stu), status: stu.status },
                              }));
                            }
                          }}
                          className={`border rounded px-2 py-1 text-white ${(editData[stu.id]?.status || stu.status) === 'Running_Student'
                            ? 'bg-green-500'
                            : (editData[stu.id]?.status || stu.status) === 'Running_Intern'
                              ? 'bg-red-500'
                              : (editData[stu.id]?.status || stu.status) === 'Running_Employee'
                                ? 'bg-blue-500'
                                : 'bg-gray-200'
                            }`}
                        >
                          <option value="Running_Student">Running Student</option>
                          <option value="Running_Intern">Running Intern</option>
                          <option value="Running_Employee">Running Employee</option>
                        </select>
                      </td>
                      <td
                        className="border px-2 py-1 relative"
                        onClick={(e) => e.stopPropagation()} // prevent row clicks from closing
                      >
                        <div className="relative">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenActionId((prev) => (prev === stu.id ? null : stu.id));

                            }}
                            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-3 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                          >
                            Action
                            <svg
                              className="-mr-1 ml-2 h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>

                          {openActionId === stu.id && (
                            <div className="absolute left-0 top-full mt-1 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                              <div className="py-1">
                                <button
                                  onClick={() => {
                                    handleEditClick(stu);
                                    setOpenActionId(null); // close dropdown
                                  }}
                                  className="text-blue-500 text-left px-4 py-2 hover:bg-gray-100 w-full"
                                >
                                  Edit
                                </button>

                                <button
                                  className="text-green-600 text-left px-4 py-2 hover:bg-gray-100 w-full"
                                  onClick={() => {
                                    setViewStudent(stu);
                                    setOpenActionId(null); // close dropdown
                                  }}
                                >
                                  View
                                </button>

                                <button
                                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                  onClick={() => handleDeleteStudent(stu)}
                                >
                                  Delete
                                </button>

                              </div>
                            </div>
                          )}

                        </div>



                        {/* Print Styles */}
                     {/* <style jsx>{`
  @media print {
    body * {
      visibility: hidden; 
    }

    #printableStudentForm {
      visibility: visible; 
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      margin: 0;
      padding: 0;
    }

    #printableStudentForm * {
      visibility: visible;
    }

    .no-print {
      display: none !important;
    }

    img {
      max-width: 100%;
      height: auto;
    }

    table, tr, td, th {
      page-break-inside: avoid; 
    }

    #printableStudentForm {
      overflow: hidden;
      height: 100vh; 
    }

    @page {
      size: A4; 
      margin: 10mm;
    }
  }
`}</style> */}

                        {/* view  */}
                        {viewStudent && (
                          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-10 z-50">
                            <div className="bg-white w-full max-w-6xl p-6 rounded shadow-lg overflow-auto max-h-[90vh]">
                              <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold text-blue-700">Student Preview</h2>
                                <button
                                  className="text-red-500 font-bold text-lg"
                                  onClick={() => setViewStudent(null)}
                                >
                                  X
                                </button>
                              </div>

                              <div id="printableStudentForm" className="space-y-6">
                                <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-700 mb-6">ADMISSION FORM</h1>

                                {/* PHOTO & LOGO */}
                                <div className="flex justify-between items-center gap-6 flex-row mb-6">
                                  <div>
                                    <img
                                      src={viewStudent.university_logo || "https://i.postimg.cc/SsD9pWZ2/logo.jpg"}
                                      alt="Logo"
                                      className="w-56 h-auto rounded-lg flex-shrink-0"
                                    />
                                  </div>
                                  <div>
                                    <div className="w-32 h-32 border border-gray-400 overflow-hidden">
                                      {viewStudent.student_image ? (
                                        <img
                                          src={viewStudent.student_image}
                                          alt="Student"
                                          className="w-full h-full object-cover"
                                        />
                                      ) : (
                                        <p className="text-center mt-12 text-sm text-gray-500">No Image</p>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                {/* TOP INFO */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                                  <div className="flex flex-col">
                                    <p className="text-sm font-medium text-gray-600 mb-1">Form No.</p>
                                    <p className="border border-gray-400 rounded px-2 py-1 w-full">{viewStudent.form_no}</p>
                                  </div>
                                  <div className="flex flex-col">
                                    <p className="text-sm font-medium text-gray-600 mb-1">Branch</p>
                                    <p className="border border-gray-400 rounded px-2 py-1 w-full">{viewStudent.branch}</p>
                                  </div>
                                  <div className="flex flex-col">
                                    <p className="text-sm font-medium text-gray-600 mb-1">Batch</p>
                                    <p className="border border-gray-400 rounded px-2 py-1 w-full">{viewStudent.batch}</p>
                                  </div>
                                  <div className="flex flex-col">
                                    <p className="text-sm font-medium text-gray-600 mb-1">Date</p>
                                    <p className="border border-gray-400 rounded px-2 py-1 w-full">{viewStudent.date}</p>
                                  </div>
                                </div>

                                {/* PERSONAL INFORMATION */}
                                <div>
                                  <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-3 text-left text-blue-800">PERSONAL INFORMATION</h2>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div className="flex flex-col">
                                      <p className="text-sm font-medium text-gray-600 mb-1 text-left">Student Name</p>
                                      <p className="border border-gray-400 rounded px-2 py-1 text-left">{viewStudent.student_name}</p>
                                    </div>
                                    <div className="flex flex-col">
                                      <p className="text-sm font-medium text-gray-600 mb-1 text-left">Father</p>
                                      <p className="border border-gray-400 rounded px-2 py-1 text-left">{viewStudent.father_name}</p>
                                    </div>
                                    <div className="flex flex-col">
                                      <p className="text-sm font-medium text-gray-600 mb-1 text-left">Mother</p>
                                      <p className="border border-gray-400 rounded px-2 py-1 text-left">{viewStudent.mother_name}</p>
                                    </div>
                                    <div className="flex flex-col">
                                      <p className="text-sm font-medium text-gray-600 mb-1 text-left">Present Address</p>
                                      <p className="border border-gray-400 rounded px-2 py-1 text-left">{viewStudent.present_address}</p>
                                    </div>
                                    <div className="flex flex-col">
                                      <p className="text-sm font-medium text-gray-600 mb-1 text-left">Permanent Address</p>
                                      <p className="border border-gray-400 rounded px-2 py-1 text-left">{viewStudent.permanent_address}</p>
                                    </div>
                                    <div className="flex flex-col">
                                      <p className="text-sm font-medium text-gray-600 mb-1 text-left">Contact</p>
                                      <p className="border border-gray-400 rounded px-2 py-1 text-left">
                                        {viewStudent.contact1}{viewStudent.contact2 ? `, ${viewStudent.contact2}` : ""}
                                      </p>
                                    </div>
                                    <div className="flex flex-col">
                                      <p className="text-sm font-medium text-gray-600 mb-1 text-left">Email</p>
                                      <p className="border border-gray-400 rounded px-2 py-1 text-left">{viewStudent.email}</p>
                                    </div>
                                    <div className="flex flex-col">
                                      <p className="text-sm font-medium text-gray-600 mb-1 text-left">Student Type</p>
                                      <p className="border border-gray-400 rounded px-2 py-1 text-left">{viewStudent.student_type || viewStudent.status}</p>
                                    </div>
                                  </div>
                                </div>

                                {/* COURSE DETAILS */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <h2 className="col-span-2 text-xl font-bold border-b border-gray-300 pb-1 mb-3 text-left text-blue-800">COURSE DETAILS</h2>
                                  <div className="flex flex-col">
                                    <p className="text-sm font-medium text-gray-600 mb-1 text-left">Subject</p>
                                    <p className="border border-gray-400 rounded px-2 py-1 text-left">{viewStudent.course_subject}</p>
                                  </div>
                                  <div className="flex flex-col">
                                    <p className="text-sm font-medium text-gray-600 mb-1 text-left">Session</p>
                                    <p className="border border-gray-400 rounded px-2 py-1 text-left">{viewStudent.course_session}</p>
                                  </div>
                                  <div className="flex flex-col">
                                    <p className="text-sm font-medium text-gray-600 mb-1 text-left">Time</p>
                                    <p className="border border-gray-400 rounded px-2 py-1 text-left">{viewStudent.course_time}</p>
                                  </div>
                                  <div className="flex flex-col">
                                    <p className="text-sm font-medium text-gray-600 mb-1 text-left">Program</p>
                                    <p className="border border-gray-400 rounded px-2 py-1 text-left">{viewStudent.program}</p>
                                  </div>
                                </div>

                                {/* PURPOSE */}
                                {viewStudent.purpose && (
                                  <div>
                                    <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-3 text-left text-blue-800">PURPOSE</h2>
                                    <div className="grid grid-cols-2 gap-4">
                                      {Object.keys(viewStudent.purpose).map((key) => (
                                        <p key={key} className="border border-gray-400 rounded px-2 py-1 text-left">{key}: {viewStudent.purpose[key] ? "Yes" : "No"}</p>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* EDUCATION */}
                                {viewStudent.education?.length > 0 && (
                                  <div>
                                    <h3 className="font-semibold text-gray-700 mb-2 text-left">Fundamental Education</h3>
                                    <table className="w-full table-auto border text-sm">
                                      <thead className="bg-gray-100">
                                        <tr>
                                          <th className="border p-2 text-left">Degree</th>
                                          <th className="border p-2 text-left">Subject</th>
                                          <th className="border p-2 text-left">Year</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {viewStudent.education.map((row, idx) => (
                                          <tr key={idx}>
                                            <td className="border p-1 text-left">{row.degree}</td>
                                            <td className="border p-1 text-left">{row.subject}</td>
                                            <td className="border p-1 text-left">{row.year}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                )}

                                {/* EXTRA COURSES */}
                                {viewStudent.extra_courses?.length > 0 && (
                                  <div>
                                    <h3 className="font-semibold text-gray-700 mb-2 text-left">Extra Courses</h3>
                                    <table className="w-full table-auto border text-sm">
                                      <thead className="bg-gray-100">
                                        <tr>
                                          <th className="border p-2 text-left">Degree</th>
                                          <th className="border p-2 text-left">Subject</th>
                                          <th className="border p-2 text-left">Year</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {viewStudent.extra_courses.map((row, idx) => (
                                          <tr key={idx}>
                                            <td className="border p-1 text-left">{row.degree}</td>
                                            <td className="border p-1 text-left">{row.subject}</td>
                                            <td className="border p-1 text-left">{row.year}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                )}

                                {/* SIGNATURE */}
                                <div className="flex gap-6 mt-4 mb-4">
                                  <div>
                                    <p>Signature</p>
                                    <div className="w-40 h-20 border overflow-hidden">
                                      {viewStudent.signature_image ? (
                                        <img src={viewStudent.signature_image} alt="Signature" className="w-full h-full object-cover" />
                                      ) : (
                                        <p className="text-center mt-6 text-gray-500">No Signature</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Print & Close Buttons */}
                              <div className="flex justify-end gap-2 mt-4 no-print">
                                {/* <button
                                  onClick={() => window.print()}
                                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                >
                                  Print
                                </button> */}
                                <button
                                  onClick={() => setViewStudent(null)}
                                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        )}


                      </td>

                    </tr>


                  )}
                </React.Fragment>
              )) : (
                <tr>
                  <td colSpan={6} className="py-4 text-gray-500">No matching students found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>


      </div>
    </div>
  );
}
