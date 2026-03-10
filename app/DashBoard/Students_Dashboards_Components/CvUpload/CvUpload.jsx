import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import Image from "next/image";
import Head from "next/head";
import axios from "axios";
import Swal from "sweetalert2";
import useMatchedUserByEmail from "@/hooks/useMatchedUserByEmail";

// import useMatchedUserByEmail from "../../../../hooks/useMatchedUserByEmail"

export default function Page() {



  const { matchedUsers } = useMatchedUserByEmail()

  console.log(matchedUsers?.email)



  const [cvData, setCvData] = useState({
    name: "",
    fatherName: "",
    motherName: "",
    maritalStatus: "",
    languagePreference: "",
    contact: { email: "", address: "", permanentAddress: "", phone: "" },
    socialMedia: { facebook: "", linkedin: "", youtube: "" },
    objective: "",
    education: [
      { level: "Masters", institute: "", year: "", result: "", major: "" },
      { level: "Honours", institute: "", year: "", result: "", major: "" },
      { level: "HSC", institute: "", year: "", result: "", major: "" },
      { level: "SSC", institute: "", year: "", result: "", major: "" },
    ],
    coreSkills: "",
    softSkills: "",
    extraCurriculum: "",
    careerSummary: "",
    workExperience: "",
    coreSkills: "",
    additionalSections: [{ title: "", details: "" }],
    profileImage: null,
    reference: "",
    certificates: [{ name: "", link: "", description: "" }],
    projects: [{ title: "", link: "", description: "" }],



  });


  // education: [
  //   { level: "SSC", institute: "", year: "", result: "", major: "" },
  //   { level: "HSC", institute: "", year: "", result: "", major: "" },
  //   { level: "Honours", institute: "", year: "", result: "", major: "" },
  //   { level: "Masters", institute: "", year: "", result: "", major: "" },
  // ],



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



  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Immediate preview
    const previewUrl = URL.createObjectURL(file);
    setCvData((prev) => ({
      ...prev,
      profileImage: previewUrl,
    }));

    // Upload to ImgBB
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=3d64b0e9dee39ca593b9da32467663ee`,
        formData
      );

      const imageUrl = res.data.data.url; // ImgBB hosted URL
      setCvData((prev) => ({
        ...prev,
        profileImage: imageUrl,
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };






  // Set default email from matchedUsers when component mounts or matchedUsers changes
  useEffect(() => {
    if (!matchedUsers) return; // early exit if no data yet
    console.log("Setting matchedUser email:", matchedUsers.email);
    setCvData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        email: matchedUsers.email || "",
      },
    }));
  }, [matchedUsers]);




  const downloadCv = () => {
    const doc = new jsPDF("portrait", "px", "a4");
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const sidePanelWidth = 160;

    const drawLeftPanel = () => {
      doc.setFillColor("#E0F2FE");
      doc.rect(0, 0, sidePanelWidth, pageHeight, "F");
    };

    const addHorizontalLine = (y) => {
      doc.setDrawColor(255, 255, 255);
      doc.setLineWidth(0.5);
      doc.line(10, y, sidePanelWidth - 10, y);
    };

    const justifyText = (text, x, y, width) => {
      if (!text) text = "Not provided";
      if (typeof text !== "string") text = String(text);

      const lineHeight = 12;
      const lines = doc.splitTextToSize(text, width);

      lines.forEach((line) => {
        if (y > pageHeight - 50) {
          doc.addPage();
          drawLeftPanel();
          y = 20;
        }
        doc.text(line, x, y);
        y += lineHeight;
      });

      return y;
    };

    const addProfileDetails = () => {
      const imageX = 15;
      const imageY = 20;
      const imageWidth = 110;
      const imageHeight = 130;

      doc.setDrawColor(255, 255, 255);
      doc.setLineWidth(3);
      doc.rect(imageX - 3, imageY - 3, imageWidth + 6, imageHeight + 6);

      if (cvData.profileImage) {
        doc.addImage(cvData.profileImage, "JPEG", imageX, imageY, imageWidth, imageHeight);
      }

      let y = 200;
      const leftMargin = 4;
      const maxWidth = sidePanelWidth - 10;

      // Name
      doc.setTextColor("#000000");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.text(
        cvData.name || "Name not provided",
        sidePanelWidth / 2 - doc.getTextWidth(cvData.name || "Name not provided") / 2,
        y
      );
      y += 30;

      // Personal Details
      const personalDetails = [
        `Father's Name: ${cvData.fatherName || "Not provided"}`,
        `Mother's Name: ${cvData.motherName || "Not provided"}`,
        `Marital Status: ${cvData.maritalStatus || "Not provided"}`,
        `Language: ${cvData.languagePreference || "Not provided"}`
      ];
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      personalDetails.forEach((line) => {
        doc.text(line, 10, y);
        y += 14;
      });
      y += 10;

      // Contact Details
      const contactDetails = [
        `Email: ${cvData.contact.email || "Not provided"}`,
        `Phone: ${cvData.contact.phone || "Not provided"}`,
        `Address: ${cvData.contact.address || "Not provided"}`,
        `Permanent Address: ${cvData.contact.permanentAddress || "Not provided"}`
      ];
      contactDetails.forEach((line) => {
        const wrappedText = doc.splitTextToSize(line, maxWidth);
        wrappedText.forEach((l) => {
          doc.text(l, leftMargin, y);
          y += 12;
        });
      });
      y += 10;

      // Social Media
      if (cvData.socialMedia.facebook) {
        doc.textWithLink("Facebook", leftMargin, y, { url: cvData.socialMedia.facebook });
        y += 14;
      }
      if (cvData.socialMedia.linkedin) {
        doc.textWithLink("LinkedIn", leftMargin, y, { url: cvData.socialMedia.linkedin });
        y += 14;
      }

      // Core Skills
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("Core Skills", sidePanelWidth / 2 - doc.getTextWidth("Core Skills") / 2, y);
      addHorizontalLine(y + 5);
      y += 20;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      const skills = (cvData.coreSkills || "Not provided").split(",").map((s) => s.trim()).sort();
      skills.forEach((skill) => {
        const wrappedSkill = doc.splitTextToSize(skill, maxWidth);
        wrappedSkill.forEach((l) => {
          doc.text(l, leftMargin, y);
          y += 12;
        });
      });
      y += 20;

      // Soft Skills
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("Soft Skills", sidePanelWidth / 2 - doc.getTextWidth("Soft Skills") / 2, y);
      addHorizontalLine(y + 5);
      y += 20;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      const softSkills = (cvData.softSkills || "Not provided").split(",").map((s) => s.trim());
      softSkills.forEach((skill) => {
        const wrappedSkill = doc.splitTextToSize(skill, maxWidth);
        wrappedSkill.forEach((l) => {
          doc.text(l, leftMargin, y);
          y += 12;
        });
      });
      y += 20;




      // Save hobbies to render later on Extra Curriculum page
      window.hobbiesToRenderLater = cvData.hobbies ? cvData.hobbies.split(",").map(h => h.trim()) : [];
    };

    // Start generating PDF
    drawLeftPanel();
    addProfileDetails();
    doc.setTextColor("#000000");

    // --- Main content (right side) ---
    let mainY = 20;
    const contentX = sidePanelWidth + 20;
    const contentWidth = pageWidth - sidePanelWidth - 30;

    const sections = [
      { title: "Objective", content: cvData.objective },
      {
        title: "Education",
        content: (() => {
          const filledEducation = cvData.education.filter(
            (edu) =>
              edu.institute ||
              edu.year ||
              edu.result ||
              edu.major ||
              edu.subject ||
              edu.board ||
              edu.extra
          );
          if (filledEducation.length === 0) return "";
          return filledEducation
            .map((edu) => {
              let eduText = "";
              if (edu.level || edu.year) eduText += `${edu.level || ""} ${edu.year || ""}\n`;
              if (edu.institute) eduText += `${edu.institute}\n`;
              if (edu.major) eduText += `Subject: ${edu.major}\n`;
              if (edu.subject) eduText += `Subject: ${edu.subject}\n`;
              if (edu.board) eduText += `Board: ${edu.board}\n`;
              if (edu.result) eduText += `Result: ${edu.result}\n`;
              if (edu.extra) eduText += `${edu.extra}\n`;
              return eduText;
            })
            .join("\n");
        })(),
      },
      { title: "Certificates", content: "" },
      { title: "Projects", content: "" },
      { title: "Work Experience", content: cvData.workExperience },
      { title: "Career Summary", content: cvData.careerSummary },
      // { title: "Hobbies", content: cvData.hobbies },
      { title: "Extra Curriculum", content: cvData.extraCurriculum },
      { title: "Reference", content: cvData.reference },
    ];

    const addSection = (title, content) => {
      // Allow Certificates & Projects to bypass the empty-content check
      if (!content && title !== "Certificates" && title !== "Projects") return;

      if (mainY > pageHeight - 50) {
        doc.addPage();
        drawLeftPanel();
        mainY = 20;
      }

      doc.setTextColor("#F87171");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text(title, contentX + (contentWidth - doc.getTextWidth(title)) / 2, mainY);
      mainY += 20;

      doc.setTextColor("#000000");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);

      // Only justify text if there’s real content
      if (content) {
        mainY = justifyText(content, contentX, mainY, contentWidth);
        mainY += 20;
      }

      // 🔥 Custom render logic for certificates & projects
      if (title === "Certificates") {
        cvData.certificates.forEach((cert, idx) => {
          const certText = `${idx + 1}. ${cert.name || "Not provided"}`;
          doc.text(certText, contentX, mainY);

          if (cert.link) {
            const linkX = contentX + doc.getTextWidth(certText) + 10;
            doc.setFont("helvetica", "bold");
            doc.textWithLink("Link", linkX, mainY, { url: cert.link });
            doc.setFont("helvetica", "normal");
          }

          mainY += 14;

          if (cert.description) {
            const wrappedDesc = doc.splitTextToSize(cert.description, contentWidth);
            wrappedDesc.forEach((line) => {
              doc.text(line, contentX, mainY);
              mainY += 12;
            });
            mainY += 6;
          }
        });
      }

      if (title === "Projects") {
        cvData.projects.forEach((proj, idx) => {
          const titleText = `${idx + 1}. ${proj.title || "Not provided"}`;
          doc.text(titleText, contentX, mainY);

          if (proj.link) {
            const linkX = contentX + doc.getTextWidth(titleText) + 10;
            doc.setFont("helvetica", "bold");
            doc.textWithLink("Link", linkX, mainY, { url: proj.link });
            doc.setFont("helvetica", "normal");
          }

          mainY += 14;

          if (proj.description) {
            const wrappedDesc = doc.splitTextToSize(proj.description, contentWidth);
            wrappedDesc.forEach((line) => {
              doc.text(line, contentX, mainY);
              mainY += 12;
            });
            mainY += 6;
          }
        });
      }
    };

    sections.forEach((section) => {
      addSection(section.title, section.content);
    });

    doc.save(`cv_of_${cvData.name || "Name"}.pdf`);
  };



  const handleEducationChange = (e, index, field) => {
    const value = e.target.value;
    setCvData((prev) => {
      const newEducation = [...prev.education];
      newEducation[index][field] = value;
      return { ...prev, education: newEducation };
    });
  };


  const handleSubmit = async () => {
    // Required field validation
    if (
      !cvData.name ||
      !cvData.fatherName ||
      !cvData.motherName ||
      !cvData.maritalStatus ||
      !cvData.languagePreference ||
      !cvData.contact.email ||
      !cvData.contact.phone ||
      !cvData.contact.address ||
      !cvData.contact.permanentAddress ||
      !cvData.objective ||
      !cvData.workExperience ||
      !cvData.coreSkills ||
      !cvData.extraCurriculum ||
      !cvData.careerSummary ||
      !cvData.reference ||
      !cvData.profileImage ||
      cvData.education.length === 0 ||
      cvData.education.every(
        (edu) => !edu.institute && !edu.year && !edu.result && !edu.major
      )

    ) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: "Please fill in all required fields before uploading your CV.",
        confirmButtonColor: "#d33",
      });
      return;
    }

    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to submit your CV?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, submit!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!confirmation.isConfirmed) return;

    try {
      // Merge matchedUser email
      const cvDataWithEmail = {
        ...cvData,
        matchedUserEmail: matchedUsers?.email || cvData.contact.email || null,
      };

      const res = await fetch("/api/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cvDataWithEmail),
      });

      const result = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Submitted!",
          text: "CV saved successfully!",
          confirmButtonColor: "#3085d6",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: result.message || "Something went wrong!",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error("Error submitting CV:", error);
      Swal.fire({
        icon: "warning",
        title: "Error!",
        text: "You already uploaded a CV. Please go to Edit CV to update.",
        confirmButtonColor: "#d33",
      });
    }
  };





  return (

    <>



      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Create Your CV</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Side Panel */}
          <div className="col-span-1 bg-[#E0F2FE] text-black p-4 rounded-lg">
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
                placeholder="own name"
                className="w-full p-2 border rounded"
                value={cvData.name}
                onChange={(e) => handleInputChange(e, "name")}
              />
            </div>

            {/* Father's Name */}
            <div className="mb-4">
              <label className="font-bold mb-2">Father's Name</label>
              <input
                type="text"
                placeholder="name"
                className="w-full p-2 border rounded"
                value={cvData.fatherName}
                onChange={(e) => handleInputChange(e, "fatherName")}
              />
            </div>

            {/* Mother's Name */}
            <div className="mb-4">
              <label className="font-bold mb-2">Mother's Name</label>
              <input
                type="text"
                placeholder="name"
                className="w-full p-2 border rounded"
                value={cvData.motherName}
                onChange={(e) => handleInputChange(e, "motherName")}
              />
            </div>

            <div className="mb-4">
              <label className="font-bold mb-2">Marital Status</label>
              <input
                type="text"
                placeholder="Status"
                className="w-full p-2 border rounded"
                value={cvData.maritalStatus}
                onChange={(e) => handleInputChange(e, "maritalStatus")}
              />
            </div>

            {/* Language Preference */}
            <div className="mb-4">
              <label className="font-bold mb-2">Language Preference</label>
              <input
                type="text"
                placeholder="English/Bangla"
                className="w-full p-2 border rounded"
                value={cvData.languagePreference}
                onChange={(e) => handleInputChange(e, "languagePreference")}
              />
            </div>

            <div className="mb-4">
              <label className="font-bold mb-2">Email</label>
              <input
                type="email"
                placeholder="Status"
                className="w-full p-2 border rounded  cursor-not-allowed text-black"
                value={cvData.contact.email}
                readOnly
              />
            </div>



            <div className="mb-4">
              <label className="font-bold mb-2">Phone</label>
              <input
                type="text"
                placeholder="+880"
                className="w-full p-2 border rounded"
                value={cvData.contact.phone}
                onChange={(e) => handleInputChange(e, "contact", "phone")}
              />
            </div>

            <div className="mb-4">
              <label className="font-bold mb-2">Address</label>
              <input
                type="text"
                placeholder="Address"
                className="w-full p-2 border rounded"
                value={cvData.contact.address}
                onChange={(e) => handleInputChange(e, "contact", "address")}
              />
            </div>

            <div className="mb-4">
              <label className="font-bold mb-2">Permanent Address</label>
              <input
                type="text"
                placeholder="Permanent Address"
                className="w-full p-2 border rounded"
                value={cvData.contact.permanentAddress}
                onChange={(e) => handleInputChange(e, "contact", "permanentAddress")}
              />
            </div>

            <div className="mb-4">
              <label className="font-bold mb-2">Facebook</label>
              <input
                type="text"
                placeholder="Facebook Link"
                className="w-full p-2 border rounded"
                value={cvData.socialMedia.facebook}
                onChange={(e) => handleInputChange(e, "socialMedia", "facebook")}
              />
            </div>

            <div className="mb-4">
              <label className="font-bold mb-2">LinkedIn</label>
              <input
                type="text"
                placeholder="LinkedIn Link"
                className="w-full p-2 border rounded"
                value={cvData.socialMedia.linkedin}
                onChange={(e) => handleInputChange(e, "socialMedia", "linkedin")}
              />
            </div>

            <div className="mb-4">
              <label className="font-bold mb-2">YouTube</label>
              <input
                type="text"
                placeholder="YouTube Channel / Video Link"
                className="w-full p-2 border rounded"
                value={cvData.socialMedia.youtube}
                onChange={(e) => handleInputChange(e, "socialMedia", "youtube")}
              />
            </div>


            <div className="mb-4">
              <label className="font-bold mb-2">Objective</label>
              <textarea
                className="w-full p-2 border rounded"
                placeholder="Write Objective here"
                value={cvData.objective}
                onChange={(e) => handleInputChange(e, "objective")}
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="font-bold mb-2">Education</label>
              {cvData.education.map((edu, index) => (
                <div key={index} className="mb-3 border p-2 rounded">
                  <p className="font-semibold">{edu.level}</p>
                  <input
                    type="text"
                    placeholder="Institute"
                    className="w-full p-2 border rounded mb-1"
                    value={edu.institute}
                    onChange={(e) => handleEducationChange(e, index, "institute")}
                  />
                  <input
                    type="text"
                    placeholder="Year"
                    className="w-full p-2 border rounded mb-1"
                    value={edu.year}
                    onChange={(e) => handleEducationChange(e, index, "year")}
                  />
                  <input
                    type="text"
                    placeholder="Result"
                    className="w-full p-2 border rounded mb-1"
                    value={edu.result}
                    onChange={(e) => handleEducationChange(e, index, "result")}
                  />
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full p-2 border rounded"
                    value={edu.major}
                    onChange={(e) => handleEducationChange(e, index, "major")}
                  />
                </div>
              ))}
            </div>


            <div className="mb-4">
              <label className="font-bold mb-2">Work Experience</label>
              <textarea
                className="w-full p-2 border rounded"
                placeholder="Write Experience"
                value={cvData.workExperience}
                onChange={(e) => handleInputChange(e, "workExperience")}
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="font-bold mb-2">Core Skills</label>
              <textarea
                className="w-full p-2 border rounded"
                placeholder="Write Skills"
                value={cvData.coreSkills}
                onChange={(e) => handleInputChange(e, "coreSkills")}
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="font-bold mb-2">Certificates</label>
              {cvData.certificates.map((cert, index) => (
                <div key={index} className="mb-2 border p-2 rounded flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Certificate Name"
                    className="w-full p-2 border rounded"
                    value={cert.name}
                    onChange={(e) => {
                      const newCerts = [...cvData.certificates];
                      newCerts[index].name = e.target.value;
                      setCvData(prev => ({ ...prev, certificates: newCerts }));
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Link (e.g., Google Drive)"
                    className="w-full p-2 border rounded"
                    value={cert.link}
                    onChange={(e) => {
                      const newCerts = [...cvData.certificates];
                      newCerts[index].link = e.target.value;
                      setCvData(prev => ({ ...prev, certificates: newCerts }));
                    }}
                  />
                  <textarea
                    placeholder="Description"
                    className="w-full p-2 border rounded"
                    value={cert.description}
                    onChange={(e) => {
                      const newCerts = [...cvData.certificates];
                      newCerts[index].description = e.target.value;
                      setCvData(prev => ({ ...prev, certificates: newCerts }));
                    }}
                  />
                  <button
                    type="button"
                    className="bg-red-500 text-white px-2 rounded"
                    onClick={() => {
                      const newCerts = cvData.certificates.filter((_, i) => i !== index);
                      setCvData(prev => ({ ...prev, certificates: newCerts }));
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                onClick={() =>
                  setCvData(prev => ({
                    ...prev,
                    certificates: [...prev.certificates, { name: "", link: "" }],
                  }))
                }
              >
                Add Certificate
              </button>
            </div>


            <div className="mb-4">
              <label className="font-bold mb-2">Projects</label>
              {cvData.projects.map((proj, index) => (
                <div key={index} className="mb-2 border p-2 rounded flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Project Title"
                    className="w-full p-2 border rounded"
                    value={proj.title}
                    onChange={(e) => {
                      const newProjects = [...cvData.projects];
                      newProjects[index].title = e.target.value;
                      setCvData(prev => ({ ...prev, projects: newProjects }));
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Link"
                    className="w-full p-2 border rounded"
                    value={proj.link}
                    onChange={(e) => {
                      const newProjects = [...cvData.projects];
                      newProjects[index].link = e.target.value;
                      setCvData(prev => ({ ...prev, projects: newProjects }));
                    }}
                  />
                  <textarea
                    placeholder="Description"
                    className="w-full p-2 border rounded"
                    value={proj.description}
                    onChange={(e) => {
                      const newProjects = [...cvData.projects];
                      newProjects[index].description = e.target.value;
                      setCvData(prev => ({ ...prev, projects: newProjects }));
                    }}
                  />
                  <button
                    type="button"
                    className="bg-red-500 text-white px-2 rounded"
                    onClick={() => {
                      const newProjects = cvData.projects.filter((_, i) => i !== index);
                      setCvData(prev => ({ ...prev, projects: newProjects }));
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                onClick={() =>
                  setCvData(prev => ({
                    ...prev,
                    projects: [...prev.projects, { title: "", link: "" }],
                  }))
                }
              >
                Add Project
              </button>
            </div>


            

            {/* Soft Skills */}
            <div className="mb-4">
              <label className="font-bold mb-2">Soft Skills</label>
              <textarea
                className="w-full p-2 border rounded"
                placeholder="Write Soft skill here"
                value={cvData.softSkills}
                onChange={(e) => handleInputChange(e, "softSkills")}
              ></textarea>
            </div>




            <div className="mb-4">
              <label className="font-bold mb-2">Extra Curriculum</label>
              <textarea
                className="w-full p-2 border rounded"
                placeholder="Write Extra Curriculum here"
                value={cvData.extraCurriculum}
                onChange={(e) => handleInputChange(e, "extraCurriculum")}
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="font-bold mb-2">Career Summary</label>
              <textarea
                className="w-full p-2 border rounded"
                placeholder="Write Career Summery here"
                value={cvData.careerSummary}
                onChange={(e) => handleInputChange(e, "careerSummary")}
              ></textarea>
            </div>

            {/* Reference section on the right side */}

            <div className="mb-4">
              <label className="font-bold mb-2">Reference</label>
              <textarea
                className="w-full p-2 border rounded"
                placeholder="Write Reference here"
                value={cvData.reference}
                onChange={(e) => handleInputChange(e, "reference")}
              ></textarea>
            </div>

          </div>


        </div>

        <div className="flex justify-between">
          <div className="inline-block group">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mt-4 relative overflow-hidden"
              onClick={downloadCv}
            >
              {/* Default text */}
              <span className="transition-all duration-500 ease-in-out group-hover:translate-y-[-120%] block">
                Download CV
              </span>
              {/* Hover text */}
              <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                Go →
              </span>
            </button>
          </div>


          <button
            className="bg-[#17549A] hover:bg-[#44B5E6] duration-300 ease-in-out  text-white px-4 py-2 rounded mt-4"
            onClick={handleSubmit}
          >
            Upload CV
          </button>
        </div>
      </div>




    </>

  );
}
