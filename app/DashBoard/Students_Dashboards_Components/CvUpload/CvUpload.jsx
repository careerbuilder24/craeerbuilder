import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import Image from "next/image";
import Head from "next/head";

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

  useEffect(() => {
    // Update the title dynamically based on the state or page context
    document.title = cvData.name ? `${cvData.name} - Professional CV` : "Create Your Professional CV";
  }, [cvData.name]); // Dependency array: update title when 'name' changes

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

    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    const sidePanelWidth = 140; // Right panel width for name, address, email, core skills

    // Function to draw the right column background color
    const drawRightPanel = () => {
      doc.setFillColor("#44B5E6");
      doc.rect(pageWidth - sidePanelWidth, 0, sidePanelWidth, pageHeight, "F");
    };

    // Function to add a horizontal line
    const addHorizontalLine = (y) => {
      const startX = pageWidth - sidePanelWidth + 10; // Start slightly inside the panel
      const endX = pageWidth - 10; // End slightly inside the panel
      doc.setDrawColor(255, 255, 255); // White color for the line
      doc.setLineWidth(0.5); // Thin line
      doc.line(startX, y, endX, y);
    };

    // Function to add profile details (only on the first page)
    const addProfileDetails = () => {
      const imageX = pageWidth - sidePanelWidth + 15; // Position X for image
      const imageY = 20; // Position Y for image
      const imageWidth = 110; // Image width
      const imageHeight = 160; // Image height

      // Add a white border around the image
      doc.setDrawColor(255, 255, 255);
      doc.setLineWidth(3);
      doc.rect(imageX - 3, imageY - 3, imageWidth + 6, imageHeight + 6);

      // Add Profile Image
      if (cvData.profileImage) {
        doc.addImage(cvData.profileImage, "JPEG", imageX, imageY, imageWidth, imageHeight);
      }

      // Set starting position for text after the image
      let y = 200;

      // Add Name (center-aligned, even larger font size)
      doc.setTextColor("#ffffff");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20); // Larger font size for the name
      const nameWidth = doc.getTextWidth(cvData.name || "Name not provided");
      doc.text(cvData.name || "Name not provided", pageWidth - sidePanelWidth + (sidePanelWidth - nameWidth) / 2, y);
      y += 40; // Move down for Contact Details

      // Add "Contact Details" header
      doc.setFontSize(14); // Slightly smaller font size for the header
      const contactDetailsHeaderY = y; // Save Y position for the line
      doc.text("Contact Details", pageWidth - sidePanelWidth + (sidePanelWidth - doc.getTextWidth("Contact Details")) / 2, y);
      y += 20;

      // Add horizontal line under "Contact Details"
      addHorizontalLine(contactDetailsHeaderY + 5);

      // Contact details - left-aligned
      const contactDetails = [
        `Email: ${cvData.contact.email || "Not provided"}`,
        `Phone: ${cvData.contact.phone || "Not provided"}`,
        `Address: ${cvData.contact.address || "Not provided"}`,
        `Permanent Address: ${cvData.contact.permanentAddress || "Not provided"}`,
      ];

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12); // Standard font size for contact details
      const leftMargin = 4;
      const maxWidth = sidePanelWidth - 10;

      contactDetails.forEach((detail) => {
        const wrappedText = doc.splitTextToSize(detail, maxWidth);
        wrappedText.forEach((line) => {
          doc.text(line, pageWidth - sidePanelWidth + leftMargin, y);
          y += 12;
        });
      });

      // Core Skills Title
      y += 20;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14); // Larger font size for Core Skills title
      const coreSkillsTitle = "Core Skills";
      const coreSkillsTitleWidth = doc.getTextWidth(coreSkillsTitle);
      doc.text(coreSkillsTitle, pageWidth - sidePanelWidth + (sidePanelWidth - coreSkillsTitleWidth) / 2, y);

      // Add horizontal line under "Core Skills"
      addHorizontalLine(y + 5);

      y += 20;

      // Core Skills List
      const sortedSkills = (cvData.coreSkills || "Not provided").split(',').map(skill => skill.trim()).sort();
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12); // Standard font size for skills

      sortedSkills.forEach((skill) => {
        const wrappedSkill = doc.splitTextToSize(skill, maxWidth);
        wrappedSkill.forEach((line) => {
          doc.text(line, pageWidth - sidePanelWidth + leftMargin, y);
          y += 12;
        });
      });
    };

    // Function to justify text
    const justifyText = (text, x, y, width) => {
      const lines = doc.splitTextToSize(text, width);
      lines.forEach((line) => {
        doc.text(line, x, y);
        y += 12;
      });
      return y;
    };

    // Draw the right panel and add profile details
    drawRightPanel();
    addProfileDetails();

    // Main Content (Left Panel)
    doc.setTextColor("#000000");
    let mainY = 20;
    const contentWidth = pageWidth - sidePanelWidth - 30;
    const contentX = 20;

    const sections = [
      { title: "Objective", content: cvData.objective },
      { title: "Education", content: cvData.education },
      { title: "Career Summary", content: cvData.careerSummary },
      { title: "Extra Curriculum", content: cvData.extraCurriculum },
    ];

    const addSection = (title, content) => {
      // Set title color
      doc.setTextColor("#F87171");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);

      const titleWidth = doc.getTextWidth(title);
      doc.text(title, contentX + (contentWidth - titleWidth) / 2, mainY);
      mainY += 20;

      // Add section content
      doc.setTextColor("#000000");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      mainY = justifyText(content || "Not provided", contentX, mainY, contentWidth);
      mainY += 20;
    };

    sections.forEach((section) => {
      if (mainY > pageHeight - 50) {
        doc.addPage();
        drawRightPanel();
        mainY = 20;
      }
      addSection(section.title, section.content);
    });

    // Save the PDF
    doc.save("generated_cv.pdf");
  };



  return (

    <>
   <Head>
  <title>Create Your Professional CV - Build and Download Your Resume</title>
  <meta
    name="description"
    content="Create and download your professional CV with a modern layout. Customize your contact details, skills, work experience, and more. Build your resume now."
  />
  <meta
    name="keywords"
    content="CV, Resume, Professional CV, Download Resume, Create CV, Build CV"
  />
  <meta name="author" content="Your Name or Your Company" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  {/* Open Graph Meta Tags for Social Sharing */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Create Your Professional CV - Build and Download Your Resume" />
  <meta
    property="og:description"
    content="Create and download your professional CV with a modern layout. Customize your contact details, skills, work experience, and more. Build your resume now."
  />
  <meta property="og:image" content="/path/to/your/og-image.jpg" />
  <meta property="og:url" content="https://yourwebsite.com/create-cv" />

  {/* Twitter Card Meta Tags */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Create Your Professional CV - Build and Download Your Resume" />
  <meta
    name="twitter:description"
    content="Create and download your professional CV with a modern layout. Customize your contact details, skills, work experience, and more. Build your resume now."
  />
  <meta name="twitter:image" content="/path/to/your/twitter-image.jpg" />

  {/* Structured Data for Search Engines */}
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Create Your Professional CV - Build and Download Your Resume",
        "description": "Create and download your professional CV with a modern layout. Customize your contact details, skills, work experience, and more.",
        "url": "https://yourwebsite.com/create-cv",
        "image": "/path/to/your/og-image.jpg",
        "publisher": {
          "@type": "Organization",
          "name": "Your Website Name",
        },
      }),
    }}
  />
</Head>

      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Create Your CV</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">





          {/* Side Panel */}
          <div className="col-span-1 bg-[#44B5E6] text-white p-4 rounded-lg">
            <div className="text-center mb-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mb-2 lg:w-full "
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
    </>

  );
}
