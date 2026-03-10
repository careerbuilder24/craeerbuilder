// export default CourseAdded;
'use client';

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Image from 'next/image';
import AdminFooter from '@/app/(with-navbar)/componenets/Admin Footer/AdminFooter';
// import useDetailsCourses from '@/hooks/useDetailsCourses';

const CourseAdded = () => {
  const [loading, setLoading] = useState(false);
  const [benefits, setBenefits] = useState(['']);
  const [projects, setProjects] = useState(['']);
  const [courseOutlines, setCourseOutlines] = useState([{ title: '', desc: '' }]);
  const [classSchedule, setClassSchedule] = useState([]);
  const [numberOfClasses, setNumberOfClasses] = useState('');
  const [startDate, setStartDate] = useState('');
// const {DetailsCourses} = useDetailsCourses()
  const [formData, setFormData] = useState({
    courseTitle: '',
    batchNumber: '',
    seatsLeft: '',
    timeLeft: '',
    starRating: '',
    courseCost: '',
    tutorVideo: '',
    bannerImage: '',
    instructorImage: '',
    gifFile: '',
  });


  //  Upload to ImgBB
  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const imgBBApiKey = '3d64b0e9dee39ca593b9da32467663ee';

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgBBApiKey}`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    if (result.success) return result.data.url;
    else throw new Error('Upload failed');
  };


  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    // Files to upload to ImgBB
    if (name === 'instructorImage' || name === 'gifFile' || name === 'bannerImage') {
      const file = files?.[0];
      if (file) {
        try {
          setLoading(true);
          const uploadedUrl = await uploadToImgBB(file);
          setFormData((prev) => ({ ...prev, [name]: uploadedUrl }));
        } catch (error) {
          Swal.fire('Error', `Couldn't upload ${name} to ImgBB.`, 'error');
        } finally {
          setLoading(false);
        }
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  //  Dynamic sections (benefits, projects, outlines)
  const addBenefitField = () => setBenefits([...benefits, '']);
  const addProjectField = () => setProjects([...projects, '']);
  const addOutlineField = () => setCourseOutlines([...courseOutlines, { title: '', desc: '' }]);

  const handleBenefitChange = (i, value) => {
    const updated = [...benefits];
    updated[i] = value;
    setBenefits(updated);
  };

  const handleProjectChange = (i, value) => {
    const updated = [...projects];
    updated[i] = value;
    setProjects(updated);
  };

  const handleOutlineChange = (i, field, value) => {
    const updated = [...courseOutlines];
    updated[i][field] = value;
    setCourseOutlines(updated);
  };

  const removeOutlineField = (index) => {
    const updated = courseOutlines.filter((_, i) => i !== index);
    setCourseOutlines(updated);
  };

  //  Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const payload = { ...formData, benefits, projects, courseOutlines };
    const payload = {
      ...formData,
      benefits,
      projects,
      courseOutlines,
      startDate,
      numberOfClasses,
      classSchedule
    };

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to add this course?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Add Course!',
    });

    if (!result.isConfirmed) {
      Swal.fire('Cancelled', 'Course addition cancelled.', 'info');
      return;
    }

    try {
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) Swal.fire('Success', 'Course added successfully!', 'success');
      else Swal.fire('Error', data.error || 'Something went wrong', 'error');
    } catch (err) {
      Swal.fire('Error', 'Submission failed. Try again.', 'error');
    }
  };
// console.log(DetailsCourses)
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10 space-y-8"
      >
        <h1 className="text-3xl font-bold text-center mb-8">Add Course Details</h1>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: 'Course Title', name: 'courseTitle', type: 'text' },
            { label: 'Batch Number', name: 'batchNumber', type: 'text' },
            { label: 'Seats Left', name: 'seatsLeft', type: 'number' },
            { label: 'Time Left', name: 'timeLeft', type: 'datetime-local' },
            { label: 'Star Rating', name: 'starRating', type: 'number' },
            { label: 'Course Cost', name: 'courseCost', type: 'number' },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="font-semibold mb-2 block">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
                placeholder={`Enter ${label.toLowerCase()}`}
              />
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Class Schedule</h2>

          <div className="mb-4">
            <label className="font-semibold block mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="font-semibold block mb-1">Number of Classes/Sessions</label>
            <input
              type="number"
              value={numberOfClasses}
              onChange={(e) => setNumberOfClasses(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {classSchedule.map((cls, index) => (
            <div key={index} className="flex gap-2 mb-2 items-center">
              <input
                type="text"
                placeholder="Day (e.g., Sunday)"
                value={cls.day}
                onChange={(e) => {
                  const updated = [...classSchedule];
                  updated[index].day = e.target.value;
                  setClassSchedule(updated);
                }}
                className="p-2 border rounded-lg w-1/3"
              />
              <input
                type="time"
                placeholder="Start Time"
                value={cls.startTime}
                onChange={(e) => {
                  const updated = [...classSchedule];
                  updated[index].startTime = e.target.value;
                  setClassSchedule(updated);
                }}
                className="p-2 border rounded-lg w-1/3"
              />
              <input
                type="time"
                placeholder="End Time"
                value={cls.endTime}
                onChange={(e) => {
                  const updated = [...classSchedule];
                  updated[index].endTime = e.target.value;
                  setClassSchedule(updated);
                }}
                className="p-2 border rounded-lg w-1/3"
              />
              <button
                type="button"
                onClick={() => setClassSchedule(classSchedule.filter((_, i) => i !== index))}
                className="text-red-500 font-bold"
              >
                X
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              setClassSchedule([...classSchedule, { day: '', startTime: '', endTime: '' }])
            }
            className="bg-blue-500 text-white px-3 py-1 rounded-lg mt-2"
          >
            + Add Schedule
          </button>
        </div>


        {/* Course Outlines Section */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Course Outlines</h2>
          {courseOutlines.map((outline, i) => (
            <div key={i} className="border p-4 rounded-xl mb-4 bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-700">Outline {i + 1}</span>
                {courseOutlines.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeOutlineField(i)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
              <input
                type="text"
                value={outline.title}
                onChange={(e) => handleOutlineChange(i, 'title', e.target.value)}
                placeholder="Outline title"
                className="w-full p-2 border rounded-lg mb-2"
              />
              <textarea
                value={outline.desc}
                onChange={(e) => handleOutlineChange(i, 'desc', e.target.value)}
                placeholder="Outline description"
                className="w-full p-2 border rounded-lg"
                rows={3}
              ></textarea>
            </div>
          ))}
          <button
            type="button"
            onClick={addOutlineField}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
          >
            + Add More Outline
          </button>
        </div>

        {/* Media Upload */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {/* banner image  */}
            <label className="font-semibold mb-2 block">Banner Image</label>
            <input
              type="file"
              name="bannerImage"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
            {formData.bannerImage && (
              <Image
                src={formData.bannerImage}
                alt="Banner"
                width={200}
                height={100}
                className="rounded-xl mt-2 border"
              />
            )}
          </div>

          <div>
            <label className="font-semibold mb-2 block">Tutor Video</label>
            <input
              type="file"
              name="tutorVideo"
              accept="video/*"
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="font-semibold mb-2 block">Instructor Image</label>
            <input
              type="file"
              name="instructorImage"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
            {formData.instructorImage && (
              <Image
                src={formData.instructorImage}
                alt="Instructor"
                width={100}
                height={100}
                className="rounded-xl mt-2 border"
              />
            )}
          </div>

          <div>
            <label className="font-semibold mb-2 block">GIF File</label>
            <input
              type="file"
              name="gifFile"
              accept="image/gif"
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
            {formData.gifFile && (
              <Image
                src={formData.gifFile}
                alt="Course GIF"
                width={100}
                height={100}
                className="rounded-xl mt-2 border"
              />
            )}
          </div>
        </div>

        {/* Benefits */}
        <div>
          <label className="font-semibold mb-2 block">Course Benefits</label>
          {benefits.map((b, i) => (
            <input
              key={i}
              value={b}
              onChange={(e) => handleBenefitChange(i, e.target.value)}
              placeholder={`Benefit ${i + 1}`}
              className="w-full p-3 border rounded-lg mb-2"
            />
          ))}
          <button
            type="button"
            onClick={addBenefitField}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
          >
            + Add Benefit
          </button>
        </div>

        {/* Projects */}
        <div>
          <label className="font-semibold mb-2 block">Course Projects</label>
          {projects.map((p, i) => (
            <input
              key={i}
              value={p}
              onChange={(e) => handleProjectChange(i, e.target.value)}
              placeholder={`Project ${i + 1}`}
              className="w-full p-3 border rounded-lg mb-2"
            />
          ))}
          <button
            type="button"
            onClick={addProjectField}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
          >
            + Add Project
          </button>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 transition"
          >
            {loading ? 'Uploading...' : 'Submit'}
          </button>
        </div>
      </form>

      <AdminFooter />
    </>
  );
};

export default CourseAdded;
