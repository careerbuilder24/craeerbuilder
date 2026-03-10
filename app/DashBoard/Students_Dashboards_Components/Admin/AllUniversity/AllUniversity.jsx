
'use client';

import React, { useState, useEffect } from "react";
import useAdminUniversityBio from "@/hooks/useUniversityBioAdded";
import axios from "axios";
import Swal from "sweetalert2";

export default function AllUniversity() {
  const [openActionId, setOpenActionId] = useState(null);
  const [editingUniversity, setEditingUniversity] = useState(null);
  const [universities, setUniversities] = useState([]);
  const [readMoreText, setReadMoreText] = useState("");
  const [isReadMoreModalOpen, setIsReadMoreModalOpen] = useState(false);
  const [logoPreview, setLogoPreview] = useState("");

  const { data, loading, error } = useAdminUniversityBio();

  // Normalize data when fetched
  useEffect(() => {
    if (data?.data) {
      const normalized = data.data.map(u => ({
        ...u,
        university_logo: u.University_logo || u.university_logo || "",
        university_name: u.university_name || u.University_name || "",
      }));
      setUniversities(normalized);
    }
  }, [data]);

  // Loading state
  if (loading || !data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-28 w-28 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are You Sure?",
      text: "This university will be permanently deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete("/api/adminUniversityBio", { data: { id } });
        if (response.data.success) {
          setUniversities(prev => prev.filter(u => u.id !== id));
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "University has been deleted",
            timer: 1500,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({ icon: "error", title: "Failed", text: "Could not delete university" });
        }
      } catch (err) {
        console.error(err);
        Swal.fire({ icon: "error", title: "Error", text: "Something went wrong" });
      }
    }
  };

  const getPreviewText = (text) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length <= 10 ? text : words.slice(0, 10).join(" ") + "...";
  };

  const renderReadMore = (text) => (
    <>
      {getPreviewText(text)}{" "}
      {text.split(" ").length > 10 && (
        <button
          className="text-blue-500 underline ml-1"
          onClick={() => {
            setReadMoreText(text);
            setIsReadMoreModalOpen(true);
          }}
        >
          Read More
        </button>
      )}
    </>
  );

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);

      const payload = {
        id: editingUniversity.id,
        university_name: formData.get("university_name"),
        undergraduate_course: formData.get("undergraduate_course"),
        undergraduate_credits: formData.get("undergraduate_credits"),
        postgraduate_course: formData.get("postgraduate_course"),
        postgraduate_credits: formData.get("postgraduate_credits"),
        diploma_course_name: formData.get("diploma_course_name"),
        diploma_course_cost: formData.get("diploma_course_cost")?.trim() || "",
        university_cost: formData.get("university_cost")?.trim() || "",
        university_link: formData.get("university_link"),
        university_logo: editingUniversity.university_logo || "",
      };

      // Upload new logo if selected
      const logoFile = formData.get("university_logo");
      if (logoFile && logoFile.size > 0) {
        const imgbbApiKey = "3d64b0e9dee39ca593b9da32467663ee";
        const imgbbForm = new FormData();
        imgbbForm.append("image", logoFile);

        const uploadRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          imgbbForm
        );

        if (uploadRes.data?.data?.url) {
          payload.university_logo = uploadRes.data.data.url;
        }
      }

      const response = await axios.put("/api/adminUniversityBio", payload);

      if (response.data.success) {
        Swal.fire("Updated", "University has been updated", "success");
        setUniversities(prev => prev.map(u => u.id === payload.id ? { ...u, ...payload } : u));
        setEditingUniversity(null);
        setLogoPreview("");
      } else {
        Swal.fire("Error", response.data.message || "Failed to update university", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", error.response?.data?.message || "Something went wrong!", "error");
    }
  };

  // === Edit Form ===
  if (editingUniversity) {
    return (
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit University</h2>
        <form
          onSubmit={handleUpdate}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 sm:p-6 md:p-10 w-full max-w-4xl mx-auto"
        >
          {/* University Name */}
          <div>
            <label className="block text-base font-bold mb-1">University Name</label>
            <input
              type="text"
              name="university_name"
              defaultValue={editingUniversity.university_name}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {/* University Logo */}
          <div className="md:col-span-2">
            <label className="block text-base font-bold mb-1">University Logo</label>
            {(logoPreview || editingUniversity.university_logo) && (
              <div className="mb-3">
                <img
                  src={logoPreview || editingUniversity.university_logo}
                  alt={editingUniversity.university_name}
                  className="h-24 object-contain border p-2 rounded"
                />
                <p className="text-sm text-gray-500 mt-1">{logoPreview ? "Preview" : "Current Logo"}</p>
              </div>
            )}
            <input
              type="file"
              name="university_logo"
              className="w-full border rounded px-3 py-2"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => setLogoPreview(reader.result);
                  reader.readAsDataURL(file);
                }
              }}
            />
            <p className="text-xs text-gray-400 mt-1">
              Upload a new file only if you want to change the logo
            </p>
          </div>

          {/* Other Fields */}
          {[
            { name: "undergraduate_course", label: "Undergraduate Course" },
            { name: "undergraduate_credits", label: "Undergraduate Credits" },
            { name: "postgraduate_course", label: "Postgraduate Course" },
            { name: "postgraduate_credits", label: "Postgraduate Credits" },
            { name: "university_cost", label: "University Cost" },
            { name: "diploma_course_name", label: "Diploma Course Name" },
            { name: "diploma_course_cost", label: "Diploma Course Cost" },
          ].map(field => (
            <div className="md:col-span-2" key={field.name}>
              <label className="block text-base font-bold mb-1">{field.label}</label>
              <textarea
                name={field.name}
                className="w-full border rounded px-3 py-2"
                rows={field.name.includes("credits") || field.name.includes("cost") ? 2 : 3}
                defaultValue={editingUniversity[field.name]}
              />
            </div>
          ))}

          {/* University Link */}
          <div className="md:col-span-2">
            <label className="block text-base font-bold mb-1">University Link</label>
            <input
              type="url"
              name="university_link"
              defaultValue={editingUniversity.university_link}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex flex-col sm:flex-row sm:justify-center gap-4">
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => setEditingUniversity(null)}
              className="w-full sm:w-auto bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  // === Table View ===
  return (
    <div className="container w-full lg:w-9/12 mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Added Universities</h2>
      <div className="overflow-x-auto w-full ">
        <table className="min-w-full   border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              {["Logo", "University Name", "UG Course", "UG Credits", "PG Course", "PG Credits", "Diploma Name", "Diploma Cost", "Total Cost", "University Link", "Actions"].map(th => (
                <th key={th} className="border px-4 py-2">{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {universities.length > 0 ? (
              universities.map((uni) => (
                <tr key={uni.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">
                    {uni.university_logo ? (
                      <img
                        src={uni.university_logo}
                        alt={uni.university_name}
                        className="w-full  h-auto object-contain"
                        onError={(e) => { e.currentTarget.src = "/fallback-logo.png"; }}
                      />
                    ) : (
                      <span className="text-gray-400">No Logo</span>
                    )}
                  </td>
                  <td className="border px-4 py-2">{uni.university_name}</td>
                  <td className="border px-4 py-2">{renderReadMore(uni.undergraduate_course)}</td>
                  <td className="border px-4 py-2">{renderReadMore(uni.undergraduate_credits)}</td>
                  <td className="border px-4 py-2">{renderReadMore(uni.postgraduate_course)}</td>
                  <td className="border px-4 py-2">{renderReadMore(uni.postgraduate_credits)}</td>
                  <td className="border px-4 py-2">{renderReadMore(uni.diploma_course_name)}</td>
                  <td className="border px-4 py-2">{renderReadMore(uni.diploma_course_cost)}</td>
                  <td className="border px-4 py-2">{renderReadMore(uni.university_cost)}</td>
                  <td className="border px-4 py-2">
                    <a href={uni.university_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      Visit Link
                    </a>
                  </td>
                  {/* <td className="border px-4 py-2">{new Date(uni.created_at).toLocaleDateString()}</td> */}
                  <td className="border px-2 py-1 relative overflow-visible">
                    <div className=" inline-block text-left">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setOpenActionId(prev => (prev === uni.id ? null : uni.id)); }}
                        className="inline-flex w-fit h-fit justify-center rounded-md border border-gray-300 shadow-sm px-3 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                      >
                        Action
                        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openActionId === uni.id && (
                        <div className="relative left-0 top-full mt-1 w-fit h-fit rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                          <div className="py-1">
                            <button
                              onClick={() => { setEditingUniversity(uni); setOpenActionId(null); }}
                              className="text-blue-500 text-left px-4 py-2 hover:bg-gray-100 w-full"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(uni.id)}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={12} className="text-center py-4 text-gray-500">
                  No universities added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Read More Modal */}
      {isReadMoreModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full relative">
            <h2 className="text-xl font-bold mb-4">Full Text</h2>
            <p className="mb-4">{readMoreText}</p>
            <button
              onClick={() => setIsReadMoreModalOpen(false)}
              className="bg-gray-500 text-white py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
