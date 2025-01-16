import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

const UniversityBioDataAdded = () => {
  const [formData, setFormData] = useState({
    universityName: '',
    universityImage: '',
    undergraduateCourse: '',
    undergraduateCredits: '',
    postgraduateCourse: '',
    postgraduateCredits: '',
    universityCost: '',
    diplomaCourseName: '',
    diplomaCourseCost: '',
    universityLink: '',
    universityLogo: null,  // New field for logo upload
  });

  useEffect(() => {
    // Ensuring formData is always initialized with the proper structure
    if (!formData) {
      setFormData({
        universityName: '',
        universityLogo: null,
        undergraduateCourse: '',
        undergraduateCredits: '',
        postgraduateCourse: '',
        postgraduateCredits: '',
        universityCost: '',
        diplomaCourseName: '',
        diplomaCourseCost: '',
        universityLink: '',
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    // Here you can implement the submission to your backend API
  };

  return (
    <div>
      <Helmet>
        <title>Add University Bio Data</title>
        <meta name="description" content="Form to add university bio data including courses, cost, and logo" />
        <meta name="keywords" content="university, bio data, courses, logo, university cost" />
        <meta name="author" content="Your Name or Organization" />
      </Helmet>

      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
        <h2 className="text-xl font-bold mb-6 text-center">Add University Bio Data</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* University Name */}
          <div>
            <label className="block text-base font-bold mb-1">University Name</label>
            <input
              type="text"
              name="universityName"
              value={formData.universityName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter University Name"
              required
            />
          </div>

          {/* University Logo (File Upload) */}
          <div className="md:col-span-2">
            <label className="block text-base font-bold mb-1">University Logo</label>
            <input
              type="file"
              name="universityLogo"
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              accept="image/*"
            />
            {formData.universityLogo && (
              <div className="mt-4">
                <p>Logo Preview:</p>
                <img
                  src={URL.createObjectURL(formData.universityLogo)}
                  alt="University Logo"
                  className="mt-2 w-24 h-24 object-cover"
                />
              </div>
            )}
          </div>

          {/* Undergraduate Course */}
          <div>
            <label className="block text-base font-bold mb-1">Undergraduate Course</label>
            <input
              type="text"
              name="undergraduateCourse"
              value={formData.undergraduateCourse}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter Undergraduate Course Name"
              required
            />
          </div>

          {/* Undergraduate Credits */}
          <div>
            <label className="block text-base font-bold mb-1">Undergraduate Credits</label>
            <input
              type="number"
              name="undergraduateCredits"
              value={formData.undergraduateCredits}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter Credits"
              required
            />
          </div>

          {/* Postgraduate Course */}
          <div>
            <label className="block text-base font-bold mb-1">Postgraduate Course</label>
            <input
              type="text"
              name="postgraduateCourse"
              value={formData.postgraduateCourse}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter Postgraduate Course Name"
              required
            />
          </div>

          {/* Postgraduate Credits */}
          <div>
            <label className="block text-base font-bold mb-1">Postgraduate Credits</label>
            <input
              type="number"
              name="postgraduateCredits"
              value={formData.postgraduateCredits}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter Credits"
              required
            />
          </div>

          {/* University Cost */}
          <div>
            <label className="block text-base font-bold mb-1">University Cost</label>
            <input
              type="number"
              name="universityCost"
              value={formData.universityCost}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter University Cost"
              required
            />
          </div>

          {/* Diploma Course Name */}
          <div>
            <label className="block text-base font-bold mb-1">Diploma Course Name</label>
            <input
              type="text"
              name="diplomaCourseName"
              value={formData.diplomaCourseName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter Diploma Course Name"
              required
            />
          </div>

          {/* Diploma Course Cost */}
          <div>
            <label className="block text-base font-bold mb-1">Diploma Course Cost</label>
            <input
              type="number"
              name="diplomaCourseCost"
              value={formData.diplomaCourseCost}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter Diploma Course Cost"
              required
            />
          </div>

          {/* University Link */}
          <div className="md:col-span-2">
            <label className="block text-base font-bold mb-1">University Link</label>
            <input
              type="url"
              name="universityLink"
              value={formData.universityLink}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter University Website Link"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="w-full md:w-auto bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UniversityBioDataAdded;
