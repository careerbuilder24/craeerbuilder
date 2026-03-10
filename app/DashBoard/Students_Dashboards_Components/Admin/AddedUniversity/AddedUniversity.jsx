"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function AddedUniversity() {
  const [formData, setFormData] = useState({
    universityName: "",
    universityLogo: null,
    undergraduateCourse: "",
    undergraduateCredits: "",
    postgraduateCourse: "",
    postgraduateCredits: "",
    universityCost: "",
    diplomaCourseName: "",
    diplomaCourseCost: "",
    universityLink: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
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
      title: "Are you sure?",
      text: "Do you want to submit this university data?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, submit it!",
      cancelButtonText: "Cancel",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      let logoUrl = "";
      if (formData.universityLogo) {
        const logoForm = new FormData();
        logoForm.append("image", formData.universityLogo);

        const imgbbRes = await fetch(
          "https://api.imgbb.com/1/upload?key=3d64b0e9dee39ca593b9da32467663ee",
          {
            method: "POST",
            body: logoForm,
          }
        );

        const imgbbData = await imgbbRes.json();
        if (imgbbData?.data?.url) {
          logoUrl = imgbbData.data.url;
        } else {
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

      const response = await fetch("/api/adminUniversityBio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire("Success!", result.message || "University Added!", "success");
        setFormData({
          universityName: "",
          universityLogo: null,
          undergraduateCourse: "",
          undergraduateCredits: "",
          postgraduateCourse: "",
          postgraduateCredits: "",
          universityCost: "",
          diplomaCourseName: "",
          diplomaCourseCost: "",
          universityLink: "",
        });
      } else {
        Swal.fire(
          "Error",
          result.message || "Failed to add university.",
          "error"
        );
      }
    } catch (error) {
      console.error("Submission Error:", error);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-6 text-center">Add University</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* University Name */}
        <div>
          <label className="block text-base font-bold mb-1">
            University Name
          </label>
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

        {/* University Logo */}
        <div className="md:col-span-2">
          <label className="block text-base font-bold mb-1">
            University Logo
          </label>
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
                alt="Preview"
                className="mt-2 w-24 h-24 object-cover"
              />
            </div>
          )}
        </div>

        {/* Undergraduate */}
        <div className="md:col-span-2">
          <label className="block text-base font-bold mb-1">
            Undergraduate Course
          </label>
          <textarea
            name="undergraduateCourse"
            value={formData.undergraduateCourse}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows="3"
            placeholder="Write Undergraduate Courses..."
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-base font-bold mb-1">
            Undergraduate Credits
          </label>
          <textarea
            name="undergraduateCredits"
            value={formData.undergraduateCredits}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows="2"
            placeholder="Write Undergraduate Credits..."
          />
        </div>

        {/* Postgraduate */}
        <div className="md:col-span-2">
          <label className="block text-base font-bold mb-1">
            Postgraduate Course
          </label>
          <textarea
            name="postgraduateCourse"
            value={formData.postgraduateCourse}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows="3"
            placeholder="Write Postgraduate Courses..."
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-base font-bold mb-1">
            Postgraduate Credits
          </label>
          <textarea
            name="postgraduateCredits"
            value={formData.postgraduateCredits}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows="2"
            placeholder="Write Postgraduate Credits..."
          />
        </div>

        {/* Cost */}
        <div className="md:col-span-2">
          <label className="block text-base font-bold mb-1">
            University Cost
          </label>
          <textarea
            name="universityCost"
            value={formData.universityCost}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows="2"
            placeholder="Write about University Cost..."
          />
        </div>

        {/* Diploma */}
        <div className="md:col-span-2">
          <label className="block text-base font-bold mb-1">
            Diploma Course Name
          </label>
          <textarea
            name="diplomaCourseName"
            value={formData.diplomaCourseName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows="2"
            placeholder="Write Diploma Courses..."
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-base font-bold mb-1">
            Diploma Course Cost
          </label>
          <textarea
            name="diplomaCourseCost"
            value={formData.diplomaCourseCost}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows="2"
            placeholder="Write about Diploma Cost..."
          />
        </div>

        {/* Link */}
        <div className="md:col-span-2">
          <label className="block text-base font-bold mb-1">
            University Link
          </label>
          <input
            type="url"
            name="universityLink"
            value={formData.universityLink}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Submit */}
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
  );
}
