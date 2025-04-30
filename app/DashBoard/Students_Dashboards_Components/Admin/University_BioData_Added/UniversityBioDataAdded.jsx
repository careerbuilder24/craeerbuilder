import AdminFooter from '@/app/(with-navbar)/componenets/Admin Footer/AdminFooter';
import useAdminUniversityBio from '@/hooks/useUniversityBioAdded';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';

const UniversityBioDataAdded = () => {


  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUniversity, setEditingUniversity] = useState(null);


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




  const { data, loading, error } = useAdminUniversityBio();

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


  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmResult = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to submit this university data?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit it!',
      cancelButtonText: 'Cancel',
    });

    if (!confirmResult.isConfirmed) return;

    try {
      let logoUrl = "";
      if (formData.universityLogo) {
        const logoForm = new FormData();
        logoForm.append("image", formData.universityLogo);

        const imgbbRes = await fetch("https://api.imgbb.com/1/upload?key=", {
          method: "POST",
          body: logoForm,
        });

        const imgbbData = await imgbbRes.json();
        if (imgbbData?.data?.url) {
          logoUrl = imgbbData.data.url;
        } else {
          console.error("ImgBB upload failed", imgbbData);
          Swal.fire("Error", "Failed to upload image!", "error");
          return;
        }
      }

      const payload = {
        university_name: formData.universityName,
        university_logo: logoUrl,
        undergraduate_course: formData.undergraduateCourse,
        undergraduate_credits: formData.undergraduateCredits,
        postgraduate_course: formData.postgraduateCourse,
        postgraduate_credits: formData.postgraduateCredits,
        university_cost: formData.universityCost,
        diploma_course_name: formData.diplomaCourseName,
        diploma_course_cost: formData.diplomaCourseCost,
        university_link: formData.universityLink,
        created_at: new Date().toISOString(),
      };

      const response = await fetch('/api/adminUniversityBio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        await Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: result.message || 'University Bio Added Successfully!',
          confirmButtonColor: '#3085d6'
        });
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Submission Failed',
          text: result.message || 'Unknown error occurred',
        });
      }
    } catch (error) {
      console.error("Submission Error:", error);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };




  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are You Sure!",
      text: 'This image will be deleted permanently deleted',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'yes, delete it!',
      cancelButtonText: 'Cancel',
    });


    if (result.isConfirmed) {
      try {
        const response = await axios.delete('/api/adminUniversityBio', {
          data: { id },
        });
        if (response.data.success) {
          Swal.fire('Deleted', 'Image has been deleted', 'success');
          // window.location.reload();
        } else {
          Swal.fire('Error', 'Failed to deleted image.', 'error');
        }
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Something went wrong!', 'error');
      }
    }
  }



  // edit function

  const handleEdit = (university) => {
    setEditingUniversity(university);
    setIsEditModalOpen(true);
  };


  // const handleEditSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const logoUrl = editingUniversity.university_logo || ''; // Ensure the logo URL is passed correctly

  //     const payload = {
  //       id: editingUniversity.id,  // Ensure the university ID is passed to identify the record
  //       university_name: editingUniversity.university_name,
  //       university_logo: logoUrl, // Ensure the logo URL is handled correctly
  //       undergraduate_course: editingUniversity.undergraduate_course,
  //       undergraduate_credits: editingUniversity.undergraduate_credits,
  //       postgraduate_course: editingUniversity.postgraduate_course,
  //       postgraduate_credits: editingUniversity.postgraduate_credits,
  //       university_cost: editingUniversity.university_cost,
  //       diploma_course_name: editingUniversity.diploma_course_name,
  //       diploma_course_cost: editingUniversity.diploma_course_cost,
  //       university_link: editingUniversity.university_link,
  //     };

  //     console.log('Payload to be sent:', payload);  // Log the payload to check its structure

  //     const response = await fetch('/api/adminUniversityBio', {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json', // Ensure content-type is set
  //       },
  //       body: JSON.stringify(payload), // Ensure the payload is properly stringified
  //     });

  //     const data = await response.json();
  //     console.log('API Response:', data);  // Log the response data

  //     if (response.ok) {
  //       Swal.fire('Updated!', 'University data has been updated.', 'success');
  //       setIsEditModalOpen(false);
  //       // window.location.reload(); // Optional: reload the page to reflect changes
  //     } else {
  //       Swal.fire('Error', data.message || 'Failed to update university.', 'error');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     Swal.fire('Error', 'Something went wrong!', 'error');
  //   }
  // };

  const handleEditChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setEditingUniversity((prev) => ({
        ...prev,
        [name]: files[0], // Correctly store the file
      }));
    } else {
      setEditingUniversity((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  const handleEditSubmit = async (e) => {
    e.preventDefault();
  
    try {
      let logoUrl = editingUniversity.university_logo || '';
  
      // Check if new file selected
      if (editingUniversity.universityLogo instanceof File) {
        const logoForm = new FormData();
        logoForm.append('image', editingUniversity.universityLogo);
  
        const imgbbRes = await fetch("https://api.imgbb.com/1/upload?key=3d64b0e9dee39ca593b9da32467663ee", {
          method: "POST",
          body: logoForm,
        });
  
        const imgbbData = await imgbbRes.json();
        if (imgbbData?.data?.url) {
          logoUrl = imgbbData.data.url;
        } else {
          console.error("ImgBB upload failed", imgbbData);
          Swal.fire("Error", "Failed to upload image!", "error");
          return;
        }
      }
  
      const payload = {
        id: editingUniversity.id,
        university_name: editingUniversity.university_name,
        university_logo: logoUrl,
        undergraduate_course: editingUniversity.undergraduate_course,
        undergraduate_credits: editingUniversity.undergraduate_credits,
        postgraduate_course: editingUniversity.postgraduate_course,
        postgraduate_credits: editingUniversity.postgraduate_credits,
        university_cost: editingUniversity.university_cost,
        diploma_course_name: editingUniversity.diploma_course_name,
        diploma_course_cost: editingUniversity.diploma_course_cost,
        university_link: editingUniversity.university_link,
      };
  
      const response = await fetch('/api/adminUniversityBio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        Swal.fire('Updated!', 'University data has been updated.', 'success');
        setIsEditModalOpen(false);
      } else {
        Swal.fire('Error', data.message || 'Failed to update university.', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Something went wrong!', 'error');
    }
  };
  








  return (
    <>
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

        <div className="max-w-6xl mx-auto mt-10">
          <h2 className="text-2xl font-bold mb-6 text-center">Added University Bios</h2>

          {loading && <p className="text-center text-gray-500">Loading data...</p>}
          {error && <p className="text-center text-red-500">Failed to load data</p>}


          {/* modal */}

          {isEditModalOpen && editingUniversity && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

              <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg relative">
                <h2 className="text-2xl font-bold mb-4">Edit University</h2>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
                >
                  ×
                </button>

                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="university_name"
                    value={editingUniversity.university_name}
                    onChange={handleEditChange}
                    placeholder="University Name"
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                  <input
                    type="text"
                    name="undergraduate_course"
                    value={editingUniversity.undergraduate_course}
                    onChange={handleEditChange}
                    placeholder="Undergraduate Course"
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                  <input
                    type="number"
                    name="undergraduate_credits"
                    value={editingUniversity.undergraduate_credits}
                    onChange={handleEditChange}
                    placeholder="Undergraduate Credits"
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                  <input
                    type="text"
                    name="postgraduate_course"
                    value={editingUniversity.postgraduate_course}
                    onChange={handleEditChange}
                    placeholder="Postgraduate Course"
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                  <input
                    type="number"
                    name="postgraduate_credits"
                    value={editingUniversity.postgraduate_credits}
                    onChange={handleEditChange}
                    placeholder="Postgraduate Credits"
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                  <input
                    type="number"
                    name="university_cost"
                    value={editingUniversity.university_cost}
                    onChange={handleEditChange}
                    placeholder="University Cost"
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                  <input
                    type="text"
                    name="diploma_course_name"
                    value={editingUniversity.diploma_course_name}
                    onChange={handleEditChange}
                    placeholder="Diploma Course Name"
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                  <input
                    type="number"
                    name="diploma_course_cost"
                    value={editingUniversity.diploma_course_cost}
                    onChange={handleEditChange}
                    placeholder="Diploma Course Cost"
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                  <input
                    type="url"
                    name="university_link"
                    value={editingUniversity.university_link}
                    onChange={handleEditChange}
                    placeholder="University Link"
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                  {/* University Logo (File Upload) in Edit Modal */}
                  <div className="md:col-span-2">
                    <label className="block text-base font-bold mb-1">Change University Logo</label>
                    <input
                      type="file"
                      name="universityLogo"
                      onChange={handleEditChange}
                      className="w-full border rounded px-3 py-2"
                      accept="image/*"
                    />
                    {editingUniversity?.university_logo && typeof editingUniversity.university_logo === 'string' && (
                      <div className="mt-4">
                        <p>Current Logo:</p>
                        <img
                          src={editingUniversity.university_logo}
                          alt="University Logo"
                          className="mt-2 w-24 h-24 object-cover"
                        />
                      </div>
                    )}
                  </div>


                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                      className="bg-gray-500 text-white py-2 px-4 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white py-2 px-4 rounded"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>

              </div>
            </div>
          )}



          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.data?.map((uni) => (
              <div key={uni.id} className="bg-white shadow-lg rounded-xl p-4 border hover:shadow-2xl transition-all">
                <img
                  src={uni.University_logo}
                  alt={`${uni.university_name} logo`}
                  className="w-full h-40 object-contain mb-4"
                />
                <h3 className="text-xl font-bold mb-1">{uni.university_name}</h3>
                <a
                  href={uni.university_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm mb-2 inline-block"
                >
                  Visit Website
                </a>
                <p><strong>UG Course:</strong> {uni.undergraduate_course} ({uni.undergraduate_credits} credits)</p>
                <p><strong>PG Course:</strong> {uni.postgraduate_course} ({uni.postgraduate_credits} credits)</p>
                <p><strong>Diploma:</strong> {uni.diploma_course_name} – {uni.diploma_course_cost}৳</p>
                <p><strong>Total Cost:</strong>{uni.university_cost}৳</p>
                <p className="text-xs text-gray-500 mt-2">Added: {new Date(uni.created_at).toLocaleDateString()}</p>
                <div className="flex justify-end mt-4 gap-2">
                  <div>
                    <button
                      onClick={() => handleEdit(uni)}
                      className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  </div>
                  <button
                    onClick={() => handleDelete(uni.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AdminFooter />
    </>
  );
};

export default UniversityBioDataAdded;
