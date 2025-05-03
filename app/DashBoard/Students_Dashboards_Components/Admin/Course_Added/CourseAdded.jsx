'use client';

import AdminFooter from '@/app/(with-navbar)/componenets/Admin Footer/AdminFooter';
import Image from 'next/image';
// import UseAdminCourseAdded from '@/hooks/UseAdminCourseAdded';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { LuClock9 } from 'react-icons/lu';
import { MdAccessTime, MdPeopleAlt } from 'react-icons/md';
import { RiHeart3Fill } from 'react-icons/ri';
import StarRatings from 'react-star-ratings';
import Swal from 'sweetalert2';



const CourseAdded = () => {

  // state managements
  const [courses, setCourses] = useState([]);
  const [benefits, setBenefits] = useState(['']);
  const [projects, setProjects] = useState(['']);
  const [formData, setFormData] = useState({
    courseTitle: '',
    batchNumber: '',
    seatsLeft: '',
    timeLeft: '',
    starRating: '',
    courseCost: '',
    courseOutlineTitle: '',
    courseOutlineDesc: '',
    tutorVideo: '',
    instructorImage: '',
    gifFile: '',
  });

  const addBenefitField = () => setBenefits([...benefits, '']);
  const addProjectField = () => setProjects([...projects, '']);





  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/courses');
        const result = await response.json();

        // console.log('Fetched data:', result);

        if (result.success && result.course) {
          setCourses((prevCourses) => {
            const isDataDifferent = prevCourses.length !== result.course.length ||
              !prevCourses.every((course, index) => course.id === result.course[index].id);
            if (isDataDifferent) {
              return result.course;
            }
            return prevCourses;
          });
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses(); // Initial fetch
    const interval = setInterval(fetchCourses, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);




  const handleBenefitChange = (index, value) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index] = value;
    setBenefits(updatedBenefits);
  };

  const handleProjectChange = (index, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = value;
    setProjects(updatedProjects);



  };
  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    const imgBBApiKey = '3d64b0e9dee39ca593b9da32467663ee'; // Replace with your real API key

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgBBApiKey}`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    if (result.success) {
      return result.data.url;
    } else {
      throw new Error('Failed to upload to ImgBB');
    }
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === 'instructorImage' || name === 'gifFile') {
      const file = files[0];
      if (file) {
        try {
          const uploadedUrl = await uploadToImgBB(file);
          setFormData((prev) => ({
            ...prev,
            [name]: uploadedUrl,
          }));
        } catch (error) {
          console.error('ImgBB upload failed:', error);
          Swal.fire({
            icon: 'error',
            title: 'Image Upload Failed',
            text: `Couldn't upload ${name} to ImgBB.`,
          });
        }
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...formData, benefits, projects };

    // Show confirmation dialog first
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to add this course?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Add Course!',
      cancelButtonText: 'Cancel',
    });

    // If user confirms the action
    if (result.isConfirmed) {
      try {
        const response = await fetch('/api/courses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (response.ok) {
          // SweetAlert success message
          Swal.fire({
            icon: 'success',
            title: 'Course Added',
            text: 'Course added successfully!',
          });
        } else {
          // SweetAlert error message
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error: ' + data.error,
          });
        }
      } catch (error) {
        console.error('Error submitting form:', error);

        // SweetAlert error message for catch block
        Swal.fire({
          icon: 'error',
          title: 'Submission Failed',
          text: 'Something went wrong while submitting the form. Please try again later.',
        });
      }
    } else {
      // If the user cancels the action
      Swal.fire({
        icon: 'info',
        title: 'Action Cancelled',
        text: 'The course addition was cancelled.',
      });
    }
  };

  const handleDeleteCourseCard = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch('/api/courses', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });

        if (response.ok) {
          Swal.fire('Deleted!', 'The post has been deleted.', 'success');
          // setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
        } else {
          Swal.fire('Error!', 'Failed to delete the course.', 'error');
        }
      } catch (error) {
        Swal.fire('Error!', 'An error occurred while deleting.', 'error');
      }
    }
  };


  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleEditClick = (course) => {
    setSelectedCourse(course);
    setEditModalOpen(true);
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setSelectedCourse({ ...selectedCourse, [name]: value });
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedCourse((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();

    const payload = {
      id: selectedCourse.id,
      courseTitle: selectedCourse.course_title,
      batchNumber: selectedCourse.batch_number,
      seatsLeft: selectedCourse.seats_left,
      timeLeft: selectedCourse.time_left,
      starRating: selectedCourse.star_rating,
      courseCost: selectedCourse.course_cost,
      courseOutlineTitle: selectedCourse.course_outline_title,
      courseOutlineDesc: selectedCourse.course_outline_description,
      tutorVideo: selectedCourse.uploaded_video,
      instructorImage: selectedCourse.instructor_image,
      gifFile: selectedCourse.uploaded_gif,
      benefits: JSON.parse(selectedCourse.Course_Benifits || '[]'),
      projects: JSON.parse(selectedCourse.Course_Projects || '[]'),
    };

    try {
      const response = await fetch('/api/courses', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Course updated successfully!');
        setEditModalOpen(false);
        // Refresh list if needed
      } else {
        console.error('Update failed:', data.message);
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error updating course:', error);
      alert('Something went wrong while updating the course.');
    }
  };

  // console.log(courses)
  // const encodedImageUrl = encodeURIComponent(courses.instructor_image);
  return (
    <>
      <form onSubmit={handleSubmit}>


        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
          <header>
            <h1 style={{ textAlign: 'center', marginBottom: '40px' }} className="font-bold lg:text-3xl mt-10 ">
              Add Course Details
            </h1>
          </header>

          <section>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
              }}
            >
              {/* Title Section */}
              <div style={{ flex: '1 1 calc(50% - 20px)', minWidth: '300px' }}>
                <label htmlFor="courseTitle" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
                  Course Title:
                </label>
                <input
                  type="text"
                  id="courseTitle"
                  name="courseTitle"
                  value={formData.courseTitle}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                  placeholder="Enter course title"
                />
              </div>

              {/* Batch Number Section */}
              <div style={{ flex: '1 1 calc(50% - 20px)', minWidth: '300px' }}>
                <label htmlFor="batchNumber" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
                  Batch Number:
                </label>
                <input
                  type="text"
                  id="batchNumber"
                  name="batchNumber"
                  value={formData.batchNumber}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                  placeholder="Enter batch number"
                />
              </div>

              {/* Seats Left Section */}
              <div style={{ flex: '1 1 calc(50% - 20px)', minWidth: '300px' }}>
                <label htmlFor="seatsLeft" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
                  Seats Left:
                </label>
                <input
                  type="number"
                  id="seatsLeft"
                  name="seatsLeft"
                  value={formData.seatsLeft}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                  placeholder="Enter seats left"
                />
              </div>

              {/* Time Left Section */}
              <div style={{ flex: '1 1 calc(50% - 20px)', minWidth: '300px' }}>
                <label htmlFor="timeLeft" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
                  Time Left:
                </label>
                <input
                  type="datetime-local"
                  id="timeLeft"
                  name="timeLeft"
                  value={formData.timeLeft}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
              </div>

              {/* Star Rating */}
              <div style={{ flex: '1 1 calc(50% - 20px)', minWidth: '300px' }}>
                <label htmlFor="starRating" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
                  Star Rating:
                </label>
                <input
                  type="number"
                  id="starRating"
                  name="starRating"
                  value={formData.starRating}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                  placeholder="Enter star rating (e.g., 4.5)"
                />
              </div>

              {/* Course Cost */}
              <div style={{ flex: '1 1 calc(50% - 20px)', minWidth: '300px' }}>
                <label htmlFor="courseCost" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
                  Course Cost:
                </label>
                <input
                  type="number"
                  id="courseCost"
                  name="courseCost"
                  value={formData.courseCost}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                  placeholder="Enter course cost"
                />
              </div>

              {/* Course Outline */}
              <div style={{ flex: '1 1 100%' }}>
                <label htmlFor="courseOutlineTitle" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
                  Course Outline Title:
                </label>
                <input
                  type="text"
                  id="courseOutlineTitle"
                  name="courseOutlineTitle"
                  value={formData.courseOutlineTitle}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                  placeholder="Enter outline title"
                />

                <label
                  htmlFor="courseOutlineDesc"
                  style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', marginTop: '10px' }}
                >
                  Course Outline Description:
                </label>
                <textarea
                  id="courseOutlineDesc"
                  name="courseOutlineDesc"
                  value={formData.courseOutlineDesc}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    height: '100px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                  placeholder="Enter outline description"
                ></textarea>
              </div>

              {/* Video Upload */}
              <div style={{ flex: '1 1 calc(50% - 20px)', minWidth: '300px' }}>
                <label htmlFor="tutorVideo" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
                  Upload Tutor's Video:
                </label>
                <input
                  type="file"
                  id="tutorVideo"
                  name="tutorVideo"
                  style={{ width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                  accept="video/*"
                  onChange={handleChange}
                />
              </div>

              {/* Instructor Image */}
              <div style={{ flex: '1 1 calc(50% - 20px)', minWidth: '300px' }}>
                <label htmlFor="instructorImage" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
                  Instructor Image:
                </label>
                <input
                  type="file"
                  id="instructorImage"
                  name="instructorImage"
                  style={{ width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>

              {/* GIF File */}
              <div style={{ flex: '1 1 calc(50% - 20px)', minWidth: '300px' }}>
                <label htmlFor="gifFile" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
                  Upload GIF:
                </label>
                <input
                  type="file"
                  id="gifFile"
                  name="gifFile"
                  style={{ width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                  accept="image/gif"
                  onChange={handleChange}
                />
              </div>

              {/* Course Benefits */}
              <div style={{ flex: '1 1 100%' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Course Benefits:</label>
                {benefits.map((benefit, index) => (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => handleBenefitChange(index, e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        marginBottom: '5px',
                      }}
                      placeholder={`Benefit ${index + 1}`}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addBenefitField}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Add Benefit
                </button>
              </div>

              {/* Course Projects */}
              <div style={{ flex: '1 1 100%' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Course Projects:</label>
                {projects.map((project, index) => (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    <input
                      type="text"
                      value={project}
                      onChange={(e) => handleProjectChange(index, e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        marginBottom: '5px',
                      }}
                      placeholder={`Project ${index + 1}`}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addProjectField}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Add Project
                </button>
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <footer style={{ textAlign: 'center', marginTop: '20px' }}>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#007BFF',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Submit
            </button>
          </footer>
        </div>
      </form>


      {/* modal */}
      {editModalOpen && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded relative w-full max-w-lg">
            {/* Cross Button */}
            <button
              onClick={() => setEditModalOpen(false)}
              className="absolute top-2 right-3 text-2xl text-gray-500 hover:text-red-600"
              aria-label="Close Modal"
            >
              &times;
            </button>

            <h2 className="text-2xl mb-4">Edit Course</h2>
            <form onSubmit={handleUpdateCourse} className="space-y-4">
              <input
                type="text"
                name="course_title"
                value={selectedCourse.course_title}
                onChange={handleInputChange}
                placeholder="Course Title"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="batch_number"
                value={selectedCourse.batch_number}
                onChange={handleInputChange}
                placeholder="Batch Number"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="course_cost"
                value={selectedCourse.course_cost}
                onChange={handleInputChange}
                placeholder="Course Cost"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="course_cost"
                value={selectedCourse.seats_left}
                onChange={handleInputChange}
                placeholder="Course Cost"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="course_cost"
                value={selectedCourse.time_left}
                onChange={handleInputChange}
                placeholder="Course Cost"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="course_cost"
                value={selectedCourse.star_rating}
                onChange={handleInputChange}
                placeholder="Course Cost"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="course_cost"
                value={selectedCourse.course_outline_title}
                onChange={handleInputChange}
                placeholder="Course Cost"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="course_cost"
                value={selectedCourse.course_outline_description}
                onChange={handleInputChange}
                placeholder="Course Cost"
                className="w-full border px-3 py-2 rounded"
              />

              {/* Add other fields here as needed */}
              <div className="flex justify-end space-x-3">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      <div className='container mx-auto w-11/12 xl:w-8/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:mt-10'>
        {
          courses?.map(course => (
            <div key={course.id} className="flex flex-col justify-between shadow-md border border-gray-200 hover:border-[#56D3FD] transition-all duration-300 rounded-xl overflow-hidden h-full bg-white">

              {/* Image */}
              <div className="relative">
                <Image
                  src={course?.instructor_image}
                  alt="Card Image"
                  className="object-cover w-full transition-transform duration-300 hover:scale-105"
                  onDragStart={(e) => e.preventDefault()}
                  layout="responsive"
                  width={500}
                  height={300}
                />



                {/* Course Info Badges */}
                <div className="   text-xs">
                  <h2 className="text-base font-bold mb-2 ml-2 mt-2">{course.course_title}</h2>
                  <div className="px-2 py-1  text-gray-700">Batch {course.batch_number}</div>
                  <div className="px-2 py-1  text-gray-700 flex items-center gap-1"><MdPeopleAlt /> {course.seats_left} Seats</div>
                  <div className="px-2 py-1  text-gray-700 flex items-center gap-1"><MdAccessTime /> {course.time_left}</div>

                </div>
              </div>

              {/* Text Content */}
              <div className="p-4 flex flex-col flex-grow">
                {/* Action Buttons */}
                <div className="mt-auto">

                  <div className='flex justify-between gap-2'>
                    <button
                      onClick={() => handleEditClick(course)}
                      className="flex-1 bg-[#007BFF] hover:bg-blue-700 text-white py-2 rounded transition mt-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCourseCard(course.id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1 rounded transition text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>


      <AdminFooter />
    </>
  );
};

export default CourseAdded;
