'use client';

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
        console.log('Fetched data:', result);

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



  console.log(courses)
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




      {/* courses added card  */}
      <div className='container mx-auto w-10/12 md:w-10/12 lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:mt-10 custom-grid-layout'>
        {
          courses?.map(course => (
            <div key={course.id} className="relative cursor-pointer shadow-lg mb-3 overflow-hidden rounded-xl border  border-[#DDDD] group hover:border-[#56D3FD] transition-all duration-300 group">

              {/* Image Section instructor */}
              <div className="relative">
                <Image
                  src={course?.instructor_image}
                  alt="Card Image"
                  className="rounded-t-xl mb-4 object-cover w-full transition-transform duration-300 hover:scale-110"
                  onDragStart={(e) => e.preventDefault()}
                  // or "responsive" depending on how you want the image's sizing to behave
                  layout="responsive"
                  width={500}
                  height={300} // Adjust this to match the aspect ratio you want
                />
                {/* 
                <Image
                  src="https://i.ibb.co/1Y2DkF9w/Whats-App-Image-2025-04-07-at-14-22-59-e557ea7b.jpg"
                  alt="Card Image"
                  className="rounded-t-xl mb-4 object-cover w-full transition-transform duration-300 hover:scale-110"
                  layout="responsive"
                  width={500}
                  height={300}
                  onDragStart={(e) => e.preventDefault()}
                /> */}





                {/* Heart Icon */}
                <div className="absolute top-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <RiHeart3Fill size={24} className='text-red-500' />
                </div>

                {/* Info Section (Batch, Seats, Time Left) */}
                <div className="flex flex-row gap-1 justify-center items-center text-xs">
                  <div className="w-16 h-5 bg-gray-300 rounded-md flex justify-center items-center">
                    <p>Batch No{course.batch_number}</p>

                  </div>
                  <div className="flex flex-row justify-center items-center w-28 h-5 bg-gray-300 rounded-md">
                    <MdPeopleAlt />
                    <p>Seat Left {course.seats_left}</p>
                  </div>
                  <div className="flex flex-row items-center w-24 h-5 bg-gray-300 rounded-md">
                    <MdAccessTime />
                    <p>Time Left{course.time_left}</p>
                  </div>
                </div>
              </div>

              {/* Course Info Section */}
              <div className='ml-3 mt-2 text-sm'>
                <h2 className="text-base font-bold">{course.course_title}</h2>
                {/* <p className="text-sm text-black">{courses.title}</p> */}

                <div className='gap-1 flex items-center my-1'>
                  {/* <div className='flex flex-row items-center gap-1'>
                    <SlCalender className='text-xs' />
                    <p className="text-gray-700 mr-3">{course.Date}</p>
                  </div> */}
                  <LuClock9 className='text-xs' />
                  {/* <p className="text-gray-700">Duration {course.total_hours}h</p> */}
                </div>

                {/* Ratings */}
                {/* <StarRatings
                  rating={course.star_rating}
                  starDimension="15px"
                  starSpacing="2px"
                  starRatedColor="gold"
                  numberOfStars={5}
                  name='rating'
                /> */}

                {/* Enrollment Date */}
                {/* <p className="text-gray-700">{course.enrollment_date}</p> */}
              </div>

              {/* Button Section */}
              {/* <div className="mt-4 px-2 mb-3">
                <Link href={`/details/${courses.id}`} passHref>
                  <button className="bg-[#b3dfee] text-white py-2 px-8 rounded hover:bg-[#56d3fd] transition w-full duration-300 font-bold">
                    View Details
                  </button>
                </Link>
              </div> */}
            </div>
          ))
        }
      </div>
    </>
  );
};

export default CourseAdded;
