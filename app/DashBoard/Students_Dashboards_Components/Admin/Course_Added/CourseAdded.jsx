'use client'
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

const CourseAdded = () => {

  const [benefits, setBenefits] = useState(['']);
  const [projects, setProjects] = useState(['']);

  const addBenefitField = () => setBenefits([...benefits, '']);
  const addProjectField = () => setProjects([...projects, '']);

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
  return (
    <>
      <Helmet>
        <title>Add Course Details - Career Builder</title>
        <meta name="description" content="Add course details such as title, batch number, seats available, cost, outline, and more to your course listing." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Add Course Details - Your Website Name" />
        <meta property="og:description" content="Add course details such as title, batch number, seats available, cost, outline, and more to your course listing." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
        <header>
          <h1 style={{ textAlign: 'center', marginBottom: '40px' }} className='font-bold lg:text-3xl  mt-10 '>Add Course Details</h1>
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
              <label htmlFor="courseTitle" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Course Title:</label>
              <input type="text" id="courseTitle" name="courseTitle" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="Enter course title" />
            </div>

            {/* Batch Number Section */}
            <div style={{ flex: '1 1 calc(50% - 20px)', minWidth: '300px' }}>
              <label htmlFor="batchNumber" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Batch Number:</label>
              <input type="text" id="batchNumber" name="batchNumber" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="Enter batch number" />
            </div>

            {/* Seats Left Section */}
            <div style={{ flex: '1 1 calc(50% - 20px)', minWidth: '300px' }}>
              <label htmlFor="seatsLeft" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Seats Left:</label>
              <input type="number" id="seatsLeft" name="seatsLeft" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="Enter seats left" />
            </div>

            {/* Time Left Section */}
            <div style={{ flex: '1 1 calc(50% - 20px)', minWidth: '300px' }}>
              <label htmlFor="timeLeft" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Time Left:</label>
              <input type="datetime-local" id="timeLeft" name="timeLeft" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>

            {/* Star Rating */}
            <div style={{ flex: '1 1 calc(50% - 20px)', minWidth: '300px' }}>
              <label htmlFor="starRating" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Star Rating:</label>
              <input type="number" id="starRating" name="starRating" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="Enter star rating (e.g., 4.5)" />
            </div>

            {/* Course Cost */}
            <div style={{ flex: '1 1 calc(50% - 20px)', minWidth: '300px' }}>
              <label htmlFor="courseCost" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Course Cost:</label>
              <input type="number" id="courseCost" name="courseCost" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="Enter course cost" />
            </div>

            {/* Course Outline */}
            <div style={{ flex: '1 1 100%' }}>
              <label htmlFor="courseOutlineTitle" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Course Outline Title:</label>
              <input type="text" id="courseOutlineTitle" name="courseOutlineTitle" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="Enter outline title" />

              <label htmlFor="courseOutlineDesc" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', marginTop: '10px' }}>Course Outline Description:</label>
              <textarea id="courseOutlineDesc" name="courseOutlineDesc" style={{ width: '100%', padding: '10px', height: '100px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="Enter outline description"></textarea>
            </div>

            {/* Video Upload */}
            <div style={{ flex: '1 1 calc(50% - 20px)', minWidth: '300px' }}>
              <label htmlFor="tutorVideo" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Upload Tutor's Video:</label>
              <input type="file" id="tutorVideo" name="tutorVideo" style={{ width: '100%', border: '1px solid #ccc', borderRadius: '4px' }} accept="video/*" />
            </div>

            {/* Instructor Image */}
            <div style={{ flex: '1 1 calc(50% - 20px)', minWidth: '300px' }}>
              <label htmlFor="instructorImage" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Instructor Image:</label>
              <input type="file" id="instructorImage" name="instructorImage" style={{ width: '100%', border: '1px solid #ccc', borderRadius: '4px' }} accept="image/*" alt="Instructor's Image" />
            </div>

            {/* GIF File */}
            <div style={{ flex: '1 1 calc(50% - 20px)', minWidth: '300px' }}>
              <label htmlFor="gifFile" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Upload GIF:</label>
              <input type="file" id="gifFile" name="gifFile" style={{ width: '100%', border: '1px solid #ccc', borderRadius: '4px' }} accept="image/gif" />
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
                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '5px' }}
                    placeholder={`Benefit ${index + 1}`}
                  />
                </div>
              ))}
              <button
                onClick={addBenefitField}
                style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
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
                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '5px' }}
                    placeholder={`Project ${index + 1}`}
                  />
                </div>
              ))}
              <button
                onClick={addProjectField}
                style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
              >
                Add Project
              </button>
            </div>
          </div>
        </section>

        <footer style={{ textAlign: 'center', marginTop: '20px' }}>
          <button style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Submit</button>
        </footer>
      </div>
    </>
  );
};

export default CourseAdded;
