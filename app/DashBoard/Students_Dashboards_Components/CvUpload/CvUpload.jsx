import React, { useState } from "react";
import { jsPDF } from "jspdf";
import Image from "next/image";

export default function Page() {
  const [cvData, setCvData] = useState({
    name: "",
    maritalStatus: "",
    contact: { email: "", address: "", permanentAddress: "", phone: "" },
    socialMedia: { facebook: "", linkedin: "", youtube: "" },
    objective: "",
    education: "",
    extraCurriculum: "",
    careerSummary: "",
    workExperience: "",
    coreSkills: "",
    additionalSections: [{ title: "", details: "" }],
    profileImage: null,
  });

  const handleInputChange = (e, section, subfield) => {
    const value = e.target.value;
    if (subfield) {
      setCvData((prev) => ({
        ...prev,
        [section]: { ...prev[section], [subfield]: value },
      }));
    } else {
      setCvData((prev) => ({
        ...prev,
        [section]: value,
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCvData((prev) => ({
        ...prev,
        profileImage: URL.createObjectURL(file),
      }));
    }
  };

  const downloadCv = () => {
    const doc = new jsPDF("portrait", "px", "a4");
  
    // Draw background color
    doc.setFillColor("#f4f4f4");
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, "F");
  
    // Side panel (reduced width slightly to allow more space for content)
    const sidePanelWidth = 140; // Adjust this width as needed
    doc.setFillColor("#44B5E6");
    doc.rect(0, 0, sidePanelWidth, doc.internal.pageSize.height, "F");
  
    // Add profile image in the side panel
    if (cvData.profileImage) {
      doc.addImage(cvData.profileImage, "JPEG", 20, 20, 110, 110); // Keeping the same image size
    }
  
    doc.setTextColor("#ffffff");
    doc.setFontSize(12);
    doc.text(cvData.name || "Name not provided", 20, 150);
  
    // Add fields above Core Skills
    let y = 180;
    const contactDetails = [
      `Email: ${cvData.contact.email || "Not provided"}`,
      `Address: ${cvData.contact.address || "Not provided"}`,
      `Permanent Address: ${cvData.contact.permanentAddress || "Not provided"}`,
      `Marital Status: ${cvData.maritalStatus || "Not provided"}`,
      `Facebook: ${cvData.socialMedia.facebook || "Not provided"}`,
      `LinkedIn: ${cvData.socialMedia.linkedin || "Not provided"}`,
    ];
    contactDetails.forEach((detail) => {
      doc.text(detail, 20, y, { maxWidth: 110 });
      y += 20;
    });
  
    // Add Core Skills section
    y += 20;
    doc.setFont("times", "bold");
    doc.setFontSize(14);
    doc.text("Core Skills", 20, y);
    y += 20;
  
    doc.setFont("times", "normal");
    doc.setFontSize(12);
    doc.text(cvData.coreSkills || "Not provided", 20, y, { maxWidth: 110 });
  
    // Main content positioning
    doc.setTextColor("#000000");
    let mainY = 50;  // Set this to a lower value to reduce space from top (was 80)
    const sections = [
      { title: "Objective", content: cvData.objective },
      { title: "Education", content: cvData.education },
      { title: "Work Experience", content: cvData.workExperience },
      { title: "Extra Curriculum", content: cvData.extraCurriculum },
      { title: "Career Summary", content: cvData.careerSummary },
    ];
  
    sections.forEach((section) => {
      mainY += 30; // Reduced space above each section title
  
      doc.setFontSize(14);
      doc.setFont("times", "bold");
      doc.text(section.title, sidePanelWidth + 20, mainY); // Increased X position to give more space
  
      mainY += 20; // Reduced spacing between title and content
  
      doc.setFontSize(12);
      doc.setFont("times", "normal");
      doc.text(section.content || "Not provided", sidePanelWidth + 20, mainY, { maxWidth: 330 }); // Increased maxWidth for content
  
      mainY += 40; // Standard spacing after content for more height
    });
  
    // Save the PDF
    doc.save("generated_cv.pdf");
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Your CV</h1>

      <div className="grid grid-cols-3 gap-4">
        {/* Side Panel */}
        <div className="col-span-1 bg-[#44B5E6] text-white p-4 rounded-lg">
          <div className="text-center mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-2"
            />
            {cvData.profileImage && (
              <Image
                src={cvData.profileImage}
                alt="Profile"
                width={400}
                height={400}
                className="w-full  h-full  mx-auto"
              />
            )}
          </div>
          <p className="font-bold text-lg">{cvData.name}</p>
          <p>{cvData.contact.email}</p>
          <p>{cvData.contact.phone}</p>
          <p>{cvData.contact.address}</p>
          <p>{cvData.contact.permanentAddress}</p>

          <div className="mt-4">
            <h3 className="font-semibold text-lg">Core Skills</h3>
            <p>{cvData.coreSkills}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-2 bg-gray-100 p-4 rounded-lg">
          <div className="mb-4">
            <label className="font-bold mb-2">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={cvData.name}
              onChange={(e) => handleInputChange(e, "name")}
            />
          </div>

          <div className="mb-4">
            <label className="font-bold mb-2">Marital Status</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={cvData.maritalStatus}
              onChange={(e) => handleInputChange(e, "maritalStatus")}
            />
          </div>

          <div className="mb-4">
            <label className="font-bold mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              value={cvData.contact.email}
              onChange={(e) => handleInputChange(e, "contact", "email")}
            />
          </div>

          <div className="mb-4">
            <label className="font-bold mb-2">Phone</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={cvData.contact.phone}
              onChange={(e) => handleInputChange(e, "contact", "phone")}
            />
          </div>

          <div className="mb-4">
            <label className="font-bold mb-2">Address</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={cvData.contact.address}
              onChange={(e) => handleInputChange(e, "contact", "address")}
            />
          </div>

          <div className="mb-4">
            <label className="font-bold mb-2">Permanent Address</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={cvData.contact.permanentAddress}
              onChange={(e) => handleInputChange(e, "contact", "permanentAddress")}
            />
          </div>

          <div className="mb-4">
            <label className="font-bold mb-2">Facebook</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={cvData.socialMedia.facebook}
              onChange={(e) => handleInputChange(e, "socialMedia", "facebook")}
            />
          </div>

          <div className="mb-4">
            <label className="font-bold mb-2">LinkedIn</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={cvData.socialMedia.linkedin}
              onChange={(e) => handleInputChange(e, "socialMedia", "linkedin")}
            />
          </div>

          <div className="mb-4">
            <label className="font-bold mb-2">Objective</label>
            <textarea
              className="w-full p-2 border rounded"
              value={cvData.objective}
              onChange={(e) => handleInputChange(e, "objective")}
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="font-bold mb-2">Education</label>
            <textarea
              className="w-full p-2 border rounded"
              value={cvData.education}
              onChange={(e) => handleInputChange(e, "education")}
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="font-bold mb-2">Work Experience</label>
            <textarea
              className="w-full p-2 border rounded"
              value={cvData.workExperience}
              onChange={(e) => handleInputChange(e, "workExperience")}
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="font-bold mb-2">Core Skills</label>
            <textarea
              className="w-full p-2 border rounded"
              value={cvData.coreSkills}
              onChange={(e) => handleInputChange(e, "coreSkills")}
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="font-bold mb-2">Extra Curriculum</label>
            <textarea
              className="w-full p-2 border rounded"
              value={cvData.extraCurriculum}
              onChange={(e) => handleInputChange(e, "extraCurriculum")}
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="font-bold mb-2">Career Summary</label>
            <textarea
              className="w-full p-2 border rounded"
              value={cvData.careerSummary}
              onChange={(e) => handleInputChange(e, "careerSummary")}
            ></textarea>
          </div>
        </div>
      </div>

      <button
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        onClick={downloadCv}
      >
        Download CV
      </button>
    </div>
  );
}
