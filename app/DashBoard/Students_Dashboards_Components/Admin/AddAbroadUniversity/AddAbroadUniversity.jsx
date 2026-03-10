
'use client';
import React, { useState, useRef } from 'react';
import Swal from 'sweetalert2';

export default function AddAbroadUniversity() {
  const [form, setForm] = useState({
    name: '',
    country: '',
    tuition: '',
    review: '',
    category: '',
  });

  const [logo, setLogo] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [sections, setSections] = useState([{ image: null, description: '' }]);
  const [categories, setCategories] = useState([
    'America',
    'London',
    'Australia',
    'Germany',
    'Finland',
  ]);
  const [newCategory, setNewCategory] = useState('');

  //  File input refs
  const logoInputRef = useRef(null);
  const mainImageInputRef = useRef(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleLogoChange = (e) => setLogo(e.target.files[0]);
  const handleMainImageChange = (e) => setMainImage(e.target.files[0]);

  const handleSectionChange = (index, field, value) => {
    const newSections = [...sections];
    newSections[index][field] = value;
    setSections(newSections);
  };

  const addSection = () => {
    setSections([...sections, { image: null, description: '' }]);
  };

  const removeSection = (index) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const handleAddCategory = () => {
    const trimmed = newCategory.trim();
    if (!trimmed) {
      Swal.fire({
        icon: 'info',
        title: 'Please enter a category name',
        timer: 1200,
        showConfirmButton: false,
      });
      return;
    }
    if (categories.includes(trimmed)) {
      Swal.fire({
        icon: 'info',
        title: 'Category already exists!',
        timer: 1200,
        showConfirmButton: false,
      });
      return;
    }

    setCategories([...categories, trimmed]);
    setForm({ ...form, category: trimmed });
    setNewCategory('');
    Swal.fire({
      icon: 'success',
      title: 'New category added!',
      text: `"${trimmed}" added successfully.`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  //  Submit handler
  const IMGBB_API_KEY = "3d64b0e9dee39ca593b9da32467663ee"; // Your ImgBB key

  // Helper to upload file to ImgBB
  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.success) return data.data.url;
    throw new Error("Failed to upload image to ImgBB");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalCategory = form.category || newCategory.trim();
    if (!finalCategory) {
      Swal.fire({ icon: "error", title: "Missing Fields", text: "Please fill in a category." });
      return;
    }

    const requiredFields = ["name", "country", "tuition", "review"];
    const missing = requiredFields.filter((f) => !form[f]?.trim());
    if (missing.length > 0) {
      Swal.fire({ icon: "error", title: "Missing Fields", text: `Please fill in: ${missing.join(", ")}` });
      return;
    }

    if (!logo || !mainImage) {
      Swal.fire({ icon: "error", title: "Missing Images", text: "Please upload both logo and main image." });
      return;
    }

    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to post this university?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Post it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!confirmResult.isConfirmed) return;

    try {
      // 1️⃣ Upload main images
      const logoUrl = await uploadToImgBB(logo);
      const mainImageUrl = await uploadToImgBB(mainImage);

      // 2️⃣ Prepare sections payload
      const sectionsPayload = await Promise.all(
        sections.map(async (sec) => {
          let imageUrl = "";
          if (sec.image instanceof File) {
            imageUrl = await uploadToImgBB(sec.image);
          } else if (typeof sec.image === "string") {
            imageUrl = sec.image; // already a URL
          }
          return {
            image: imageUrl,
            description: sec.description?.trim() || "",
          };
        })
      );

      // 3️⃣ Prepare FormData for API
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === "category") formData.append("category", finalCategory);
        else formData.append(key, value.trim());
      });
      formData.append("logo", logoUrl);
      formData.append("mainImage", mainImageUrl);
      formData.append("sections", JSON.stringify(sectionsPayload));

      // 4️⃣ POST to API
      const res = await fetch("/api/AddAbroadUniversity", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        Swal.fire({ icon: "error", title: "Error", text: data.message || "Failed to add university." });
        return;
      }

      Swal.fire({ icon: "success", title: "Posted!", text: "University added successfully!", timer: 2000, showConfirmButton: false });

      // 5️⃣ Reset states
      setForm({ name: "", country: "", tuition: "", review: "", category: "" });
      setLogo(null);
      setMainImage(null);
      setSections([{ image: null, description: "" }]);
      setNewCategory("");
      if (logoInputRef.current) logoInputRef.current.value = "";
      if (mainImageInputRef.current) mainImageInputRef.current.value = "";

    } catch (err) {
      console.error("Submit error:", err);
      Swal.fire({ icon: "error", title: "Oops...", text: err.message || "Something went wrong while saving." });
    }
  };



  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Add New Abroad University
      </h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* University Name */}
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="University Name"
          className="w-full border p-2 rounded"
          required
        />

        {/* Country */}
        <input
          type="text"
          name="country"
          value={form.country}
          onChange={handleChange}
          placeholder="Country"
          className="w-full border p-2 rounded"
          required
        />

        {/* Tuition */}
        <input
          type="text"
          name="tuition"
          value={form.tuition}
          onChange={handleChange}
          placeholder="Tuition Cost (e.g., $50,000/year)"
          className="w-full border p-2 rounded"
          required
        />

        {/* Review */}
        <input
          type="number"
          step="0.1"
          max="5"
          min="0"
          name="review"
          value={form.review}
          onChange={handleChange}
          placeholder="Review Rating (0-5)"
          className="w-full border p-2 rounded"
          required
        />

        {/* Category Selector */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Country Category</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add new category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="border p-2 rounded w-1/2"
            />
            <button
              type="button"
              onClick={handleAddCategory}
              className="bg-[#17549A] text-white px-3 py-2 rounded hover:bg-[#3084e4]"
            >
              Add
            </button>
          </div>
        </div>

        {/* Logo */}
        <div>
          <label className="block mb-1 font-medium">University Logo</label>
          <input
            type="file"
            ref={logoInputRef}
            onChange={handleLogoChange}
            className="w-full"
            required
          />
        </div>

        {/* Main Image */}
        <div>
          <label className="block mb-1 font-medium">Main Image</label>
          <input
            type="file"
            ref={mainImageInputRef}
            onChange={handleMainImageChange}
            className="w-full"
            required
          />
        </div>

        {/* Sections */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Additional Sections</h2>
          {sections.map((section, index) => (
            <div key={index} className="border p-4 rounded-md bg-gray-50 space-y-2 relative">
              <label className="block text-sm font-medium">Section Image</label>
              <input
                type="file"
                ref={logoInputRef}
                onChange={(e) => handleSectionChange(index, 'image', e.target.files[0])}
                className="w-full"
              />
              <label className="block text-sm font-medium">Section Description</label>
              <textarea
                value={section.description}
                onChange={(e) => handleSectionChange(index, 'description', e.target.value)}
                placeholder="Write description for this section..."
                className="w-full border p-2 rounded h-24"
              />
              {sections.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSection(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addSection}
            className="bg-[#17549A] text-white px-4 py-2 rounded hover:bg-[#3c85d8]"
          >
            + Add Section
          </button>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Add University
          </button>
        </div>
      </form>
    </div>
  );
}

