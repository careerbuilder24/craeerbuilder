

'use client';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function AddLanguageCourse() {
  const [form, setForm] = useState({
    language: '',
    title: '',
    slug: '',
    batch: '',
    seats: '',
    date: '',
    duration: '',
    level: '',
    instructor: '',
    description: '',
    certification: '',
    country: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [syllabus, setSyllabus] = useState(['']);
  const [objectives, setObjectives] = useState(['']);
  const [benefits, setBenefits] = useState(['']);
  const [schedule, setSchedule] = useState(['']);
  const [career, setCareer] = useState(['']);
  const [reviews, setReviews] = useState([{ name: '', text: '' }]);

  // Generic input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleListChange = (index, value, list, setList) => {
    const updated = [...list];
    updated[index] = value;
    setList(updated);
  };

  const addToList = (list, setList) => {
    setList([...list, '']);
  };

  const handleReviewChange = (index, field, value) => {
    const updated = [...reviews];
    updated[index][field] = value;
    setReviews(updated);
  };

  const addReview = () => {
    setReviews([...reviews, { name: '', text: '' }]);
  };

  // Handle submit with imgbb upload
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //  Show loading indicator while processing
      Swal.fire({
        title: 'Uploading...',
        text: 'Please wait while we upload your course image and save data.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      let imageUrl = '';

      //  Upload to ImgBB
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          { method: 'POST', body: formData }
        );
        const data = await res.json();

        if (data.success) {
          imageUrl = data.data.url;
        } else {
          Swal.close();
          return Swal.fire({
            icon: 'error',
            title: 'Image Upload Failed',
            text: 'Please try uploading a valid image.',
          });
        }
      } else {
        Swal.close();
        return Swal.fire({
          icon: 'warning',
          title: 'No Image Selected',
          text: 'Please upload an image before submitting.',
        });
      }

      //  Prepare full course data
      const newCourse = {
        ...form,
        image: imageUrl,
        syllabus,
        objectives,
        benefits,
        schedule,
        career,
        reviews,
      };

      // 📤 Send to your Next.js API
      const response = await fetch('/api/abroadCourses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCourse),
      });

      const result = await response.json();
      Swal.close();

      if (response.ok) {
        //  Success alert
        await Swal.fire({
          icon: 'success',
          title: 'Course Added Successfully!',
          text: `The course "${form.title}" has been saved.`,
          timer: 2000,
          showConfirmButton: false,
        });

        //  Reset form
        setForm({
          language: '',
          title: '',
          slug: '',
          batch: '',
          seats: '',
          date: '',
          duration: '',
          level: '',
          instructor: '',
          description: '',
          certification: '',
          country: '',
        });
        setImageFile(null);
        setSyllabus(['']);
        setObjectives(['']);
        setBenefits(['']);
        setSchedule(['']);
        setCareer(['']);
        setReviews([{ name: '', text: '' }]);
      } else {
        //  Server-side error
        Swal.fire({
          icon: 'error',
          title: 'Error Saving Course',
          text: result.error || 'Something went wrong while saving your course.',
        });
      }
    } catch (err) {
      console.error(err);
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'Failed to connect to the server. Please check your internet connection.',
      });
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">
        Add New Language Course
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4">
          <input name="language" placeholder="Language" value={form.language} onChange={handleChange} className="border p-2 rounded" />
          <input name="country" placeholder="Country Name" value={form.country} onChange={handleChange} className="border p-2 rounded" />
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="border p-2 rounded" />
          <input name="slug" placeholder="Slug" value={form.slug} onChange={handleChange} className="border p-2 rounded" />
          <input name="batch" placeholder="Batch" value={form.batch} onChange={handleChange} className="border p-2 rounded" />
          <input name="seats" placeholder="Seats" value={form.seats} onChange={handleChange} className="border p-2 rounded" />
          <input name="date" type="datetime-local" value={form.date} onChange={handleChange} className="border p-2 rounded" />
          <input name="duration" placeholder="Duration" value={form.duration} onChange={handleChange} className="border p-2 rounded" />
          <input name="level" placeholder="Level" value={form.level} onChange={handleChange} className="border p-2 rounded" />
          <input name="instructor" placeholder="Instructor" value={form.instructor} onChange={handleChange} className="border p-2 rounded" />

          {/* Image Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="border p-2 rounded"
          />
        </div>

        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border p-2 rounded w-full" />

        {/* Dynamic Sections */}
        {[
          { label: 'Syllabus', state: syllabus, set: setSyllabus },
          { label: 'Objectives', state: objectives, set: setObjectives },
          { label: 'Benefits', state: benefits, set: setBenefits },
          { label: 'Schedule', state: schedule, set: setSchedule },
          { label: 'Career Opportunities', state: career, set: setCareer },
        ].map(({ label, state, set }) => (
          <div key={label}>
            <h3 className="font-semibold text-lg mt-4">{label}</h3>
            {state.map((item, i) => (
              <input
                key={i}
                value={item}
                onChange={(e) => handleListChange(i, e.target.value, state, set)}
                placeholder={`${label} item ${i + 1}`}
                className="border p-2 rounded w-full mt-2"
              />
            ))}
            <button type="button" onClick={() => addToList(state, set)} className="text-sm text-blue-600 mt-2">
              + Add More
            </button>
          </div>
        ))}

        {/* Reviews */}
        <div>
          <h3 className="font-semibold text-lg mt-4">Reviews</h3>
          {reviews.map((review, i) => (
            <div key={i} className="grid grid-cols-2 gap-2 mt-2">
              <input
                placeholder="Reviewer Name"
                value={review.name}
                onChange={(e) => handleReviewChange(i, 'name', e.target.value)}
                className="border p-2 rounded"
              />
              <input
                placeholder="Review Text"
                value={review.text}
                onChange={(e) => handleReviewChange(i, 'text', e.target.value)}
                className="border p-2 rounded"
              />
            </div>
          ))}
          <button type="button" onClick={addReview} className="text-sm text-blue-600 mt-2">
            + Add Another Review
          </button>
        </div>

        <textarea
          name="certification"
          placeholder="Certification Details"
          value={form.certification}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Submit Course
        </button>
      </form>
    </div>
  );
}
