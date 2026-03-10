'use client';
import { UserAuth } from "@/app/context/AuthContext";
import useCVEdit from "@/hooks/useCVEdit";
import useRegistered from "@/hooks/useRegistered";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function CvEdit() {
  const { CvEdit } = useCVEdit();
  const { ManualUser } = UserAuth();
  const [register] = useRegistered();

  const [matchedCv, setMatchedCv] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // toggle state

  useEffect(() => {
    if (ManualUser?.email && register?.data?.length) {
      const isRegistered = register.data.some(
        (reg) => reg.email?.toLowerCase() === ManualUser.email?.toLowerCase()
      );
      if (isRegistered) {
        const foundCv = CvEdit?.find(
          (cv) => cv.email?.toLowerCase() === ManualUser.email?.toLowerCase()
        );
        setMatchedCv(foundCv || null);
      } else {
        setMatchedCv(null);
      }
    }
  }, [ManualUser, register, CvEdit]);

  // ---------------- Handlers ----------------
  const handleChange = (field, value) => {
    setMatchedCv((prev) => ({ ...prev, [field]: value }));
  };

  // const handleContactChange = (field, value) => {
  //   setMatchedCv((prev) => ({
  //     ...prev,
  //     contact: { ...prev.contact, [field]: value },
  //   }));
  // };

  const handleSocialChange = (field, value) => {
    setMatchedCv((prev) => ({
      ...prev,
      socialMedia: { ...prev.socialMedia, [field]: value },
    }));
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...matchedCv.education];
    newEducation[index][field] = value;
    setMatchedCv((prev) => ({ ...prev, education: newEducation }));
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        matchedUserEmail: matchedCv.matchedUserEmail,
        name: matchedCv.name,
        fatherName: matchedCv.fatherName,
        motherName: matchedCv.motherName,
        maritalStatus: matchedCv.maritalStatus,
        languagePreference: matchedCv.languagePreference,
        contact: {
          email: matchedCv.email,
          address: matchedCv.address,
          phone: matchedCv.phone,
        },
        socialMedia: {
          facebook: matchedCv.facebook,
          linkedin: matchedCv.linkedin,
          youtube: matchedCv.youtube,
        },
        objective: matchedCv.objective,
        careerSummary: matchedCv.careerSummary,
        workExperience: matchedCv.workExperience,
        coreSkills: matchedCv.coreSkills,
        extraCurriculum: matchedCv.extraCurriculum,
        reference: matchedCv.reference,
        profileImage: matchedCv.profileImage,
        education: matchedCv.education || [],
      };

      const res = await fetch("/api/cv", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (result.success) {
        alert("CV updated successfully!");
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while updating CV");
    }
  };

  // if (!matchedCv) return <p className="text-center mt-10">Loading CV data...</p>;
  if (!matchedCv) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-center text-xl font-bold text-red-600">
          Upload CV First
        </p>
      </div>
    );
  }

  console.log(matchedCv)

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="w-full max-w-6xl">

        {/* Toggle Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className="
      bg-blue-600
      text-white 
      px-4 py-2 
      rounded 
      font-bold
      shadow-lg
      animate-pulse
      transition-transform 
      hover:scale-105 
      hover:bg-blue-700
      focus:outline-none
      focus:ring-4 
      focus:ring-blue-300
    "
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>


        {isEditing ? (
          // ----------- Editable Form -----------
          <div className="flex justify-center items-start min-h-screen bg-gray-100 p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 bg-white shadow-lg rounded-2xl w-full max-w-6xl overflow-hidden">

              {/* Left Side */}
              <div className="bg-sky-100 p-4 sm:p-6 flex flex-col items-center md:items-start">
                <div className="mb-4 flex flex-col items-center w-full">
                  {/* Profile Image */}
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden mb-2 border-2 border-gray-300 shadow-md">
                    <img
                      src={matchedCv?.profileImage || "https://via.placeholder.com/150"}
                      alt="Profile"
                      className="object-cover w-full h-full rounded-full"
                    />
                  </div>

                  {/* Image URL Input */}
                  <input
                    type="text"
                    placeholder="Profile Image URL"
                    value={matchedCv.profileImage || ""}
                    onChange={(e) => handleChange("profileImage", e.target.value)}
                    className="border p-1 rounded w-full text-sm"
                  />
                </div>


                <input
                  type="text"
                  placeholder="Name"
                  value={matchedCv?.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="border p-1 rounded w-full mb-2 text-center md:text-left"
                />
                <input
                  type="text"
                  placeholder="Father Name"
                  value={matchedCv?.fatherName || ""}
                  onChange={(e) => handleChange("fatherName", e.target.value)}
                  className="border p-1 rounded w-full mb-2 text-center md:text-left"
                />
                <input
                  type="text"
                  placeholder="Mother Name"
                  value={matchedCv?.motherName || ""}
                  onChange={(e) => handleChange("motherName", e.target.value)}
                  className="border p-1 rounded w-full mb-2 text-center md:text-left"
                />
                <input
                  type="text"
                  placeholder="Marital Status"
                  value={matchedCv?.maritalStatus || ""}
                  onChange={(e) => handleChange("maritalStatus", e.target.value)}
                  className="border p-1 rounded w-full mb-2 text-center md:text-left"
                />

                <h2 className="text-lg font-bold text-gray-800 mt-4">Contact Details</h2>
                <input
                  type="text"
                  placeholder="Phone"
                  value={matchedCv?.phone || ""}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="border p-1 rounded w-full mb-1"
                />
                <input
                  type="text"
                  placeholder="Email"
                  value={matchedCv?.email || ""}
                  // onChange={(e) => handleChange("email", e.target.value)}
                  className="border p-1 rounded w-full mb-1"
                  readOnly
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={matchedCv?.address || ""}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className="border p-1 rounded w-full mb-2"
                />

                <h2 className="text-lg font-bold text-gray-800 mt-4">Social Media</h2>
                <input
                  type="text"
                  placeholder="Facebook"
                  value={matchedCv?.facebook || ""}
                  onChange={(e) => handleChange("facebook", e.target.value)}
                  className="border p-1 rounded w-full mb-1"
                />
                <input
                  type="text"
                  placeholder="LinkedIn"
                  value={matchedCv?.linkedin || ""}
                  onChange={(e) => handleChange("linkedin", e.target.value)}
                  className="border p-1 rounded w-full mb-1"
                />
                <input
                  type="text"
                  placeholder="YouTube"
                  value={matchedCv?.youtube || ""}
                  onChange={(e) => handleSocialChange("linkedin", e.target.value)}
                  className="border p-1 rounded w-full mb-2"
                />

                {/* Core Skills */}
                <div className="w-full mt-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">Core Skills</h2>
                  <textarea
                    value={matchedCv.coreSkills || ""}
                    onChange={(e) => handleChange("coreSkills", e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                </div>

                {/* Soft Skills */}
                <div className="w-full mt-4">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">Soft Skills</h2>
                  <textarea
                    value={matchedCv.SoftSKills || ""}
                    onChange={(e) => handleChange("softSkills", e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                </div>
              </div>

              {/* Right Side */}
              <div className="col-span-2 p-4 sm:p-6 space-y-4">

                {/* Objective */}
                <div>
                  <h2 className="text-xl font-bold text-red-600 mb-2">Objective</h2>
                  <textarea
                    value={matchedCv.objective || ""}
                    onChange={(e) => handleChange("objective", e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                </div>

                {/* Education */}
                <div>
                  <h2 className="text-xl font-bold text-red-600 mb-2">Education</h2>
                  {matchedCv.education?.map((edu, idx) => (
                    <div key={idx} className="mb-2 border p-2 rounded space-y-1">
                      <input
                        type="text"
                        value={edu.level}
                        onChange={(e) => handleEducationChange(idx, "level", e.target.value)}
                        placeholder="Level"
                        className="border p-1 rounded w-full"
                      />
                      <input
                        type="text"
                        value={edu.major}
                        onChange={(e) => handleEducationChange(idx, "major", e.target.value)}
                        placeholder="Major"
                        className="border p-1 rounded w-full"
                      />
                      <input
                        type="text"
                        value={edu.institute}
                        onChange={(e) => handleEducationChange(idx, "institute", e.target.value)}
                        placeholder="Institute"
                        className="border p-1 rounded w-full"
                      />
                      <input
                        type="text"
                        value={edu.year}
                        onChange={(e) => handleEducationChange(idx, "year", e.target.value)}
                        placeholder="Year"
                        className="border p-1 rounded w-full"
                      />
                      <input
                        type="text"
                        value={edu.result}
                        onChange={(e) => handleEducationChange(idx, "result", e.target.value)}
                        placeholder="Result"
                        className="border p-1 rounded w-full"
                      />
                    </div>
                  ))}
                </div>

                {/* Career Summary */}
                <div>
                  <h2 className="text-xl font-bold text-red-600 mb-2">Career Summary</h2>
                  <textarea
                    value={matchedCv.workExperience || ""}
                    onChange={(e) => handleChange("workExperience", e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                </div>

                {/* Projects */}
                <div>
                  <h2 className="text-xl font-bold text-red-600 mb-2">Projects</h2>
                  {matchedCv.projects?.map((proj, idx) => (
                    <div key={idx} className="mb-2 border p-2 rounded space-y-1">
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => handleProjectChange(idx, "title", e.target.value)}
                        placeholder="Title"
                        className="border p-1 rounded w-full"
                      />
                      <input
                        type="text"
                        value={proj.link}
                        onChange={(e) => handleProjectChange(idx, "link", e.target.value)}
                        placeholder="Link"
                        className="border p-1 rounded w-full"
                      />
                      <textarea
                        value={proj.description}
                        onChange={(e) => handleProjectChange(idx, "description", e.target.value)}
                        placeholder="Description"
                        className="border p-1 rounded w-full"
                      />
                    </div>
                  ))}
                </div>

                {/* Certificates */}
                <div>
                  <h2 className="text-xl font-bold text-red-600 mb-2">Certificates</h2>
                  {matchedCv.certificates?.map((cert, idx) => (
                    <div key={idx} className="mb-2 border p-2 rounded space-y-1">
                      <input
                        type="text"
                        value={cert.name}
                        onChange={(e) => handleCertificateChange(idx, "name", e.target.value)}
                        placeholder="Name"
                        className="border p-1 rounded w-full"
                      />
                      <input
                        type="text"
                        value={cert.link}
                        onChange={(e) => handleCertificateChange(idx, "link", e.target.value)}
                        placeholder="Link"
                        className="border p-1 rounded w-full"
                      />
                      <textarea
                        value={cert.description}
                        onChange={(e) => handleCertificateChange(idx, "description", e.target.value)}
                        placeholder="Description"
                        className="border p-1 rounded w-full"
                      />
                    </div>
                  ))}
                </div>

                {/* Extra Curriculum */}
                <div>
                  <h2 className="text-xl font-bold text-red-600 mb-2">Extra Curriculum</h2>
                  <textarea
                    value={matchedCv.extraCurriculum || ""}
                    onChange={(e) => handleChange("extraCurriculum", e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                </div>

                {/* Reference */}
                <div>
                  <h2 className="text-xl font-bold text-red-600 mb-2">Reference</h2>
                  <textarea
                    value={matchedCv.reference || ""}
                    onChange={(e) => handleChange("reference", e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                </div>

                {/* Languages */}

                <h2 className="text-xl font-bold text-red-600 mb-2">Languages</h2>
                <input
                  type="text"
                  value={matchedCv.languagePreference || ""}
                  onChange={(e) => handleChange("languagePreference", e.target.value)}
                  className="border p-1 rounded w-full"
                />


                {/* Save Button */}
                <div className="mt-4">
                  <button
                    onClick={handleUpdate}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // ----------- Read-Only View -----------
          <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 bg-white shadow-lg rounded-2xl w-full max-w-5xl overflow-hidden">

              {/* Left Side */}
              <div className="bg-sky-100 p-4 sm:p-6 flex flex-col">
                <div className="w-32 h-32 sm:w-40 sm:h-40 container mx-auto rounded-full overflow-hidden mb-4">
                  <img
                    src={
                      matchedCv?.profileImage

                    }
                    alt="Profile Picture"
                    className="object-cover w-full h-full "
                  />
                </div>


                <p className="text-lg sm:text-xl font-bold text-gray-800 text-center my-5 md:text-3xl  ">
                  {matchedCv?.name}
                </p>
                <p className="text-gray-600 mb-4 text-center md:text-left">
                  {matchedCv?.careerSummary}
                </p>

                {/* Contact Details */}
                <div className="mb-6 w-full">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 text-center md:text-left">Contact Details</h3>
                  <p className="text-gray-700 text-sm sm:text-base">
                    Phone No: {matchedCv?.phone}
                  </p>
                  <p className="text-gray-700 text-sm sm:text-base">
                    Email: {matchedCv?.email}
                  </p>
                  <p className="text-gray-700 text-sm sm:text-base">
                    Location: {matchedCv?.address}
                  </p>


                  <p className="text-gray-700 text-sm sm:text-base  text-center md:text-left">
                    {matchedCv?.fatherName}
                  </p>
                  <p className="text-gray-700 text-sm sm:text-base text-center md:text-left">
                    {matchedCv?.motherName}
                  </p>
                  <div className="text-gray-700 text-sm sm:text-base text-center md:text-left space-y-1">
                    {matchedCv?.linkedin && (
                      <p>
                        LinkedIn: <a href={matchedCv.linkedin} target="_blank" className="text-blue-600 underline">Link</a>
                      </p>
                    )}
                    {matchedCv?.facebook && (
                      <p>
                        Facebook: <a href={matchedCv.facebook} target="_blank" className="text-blue-600 underline">Link</a>
                      </p>
                    )}
                    {matchedCv?.youtube && (
                      <p>
                        YouTube: <a href={matchedCv.youtube} target="_blank" className="text-blue-600 underline">Link</a>
                      </p>
                    )}
                  </div>

                </div>

                <h2 className="text-lg sm:text-xl font-bold text-gray-800 text-center md:text-left">
                  Core Skills
                </h2>
                <p className="text-gray-600 mb-4 text-center md:text-left">
                  {matchedCv?.coreSkills}
                </p>

                <h2 className="text-lg sm:text-xl font-bold text-gray-800 text-center md:text-left">
                  Soft Skills
                </h2>
                <p className="text-gray-600 mb-4 text-center md:text-left">
                  {matchedCv?.softSkills}
                </p>



                <h2 className="text-lg sm:text-xl font-bold text-gray-800 text-center md:text-left">
                  Projects
                </h2>

                <p className="text-gray-600 mb-4 text-center md:text-left">
                  {matchedCv?.coreSkills}
                </p>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 text-center md:text-left">
                  Reference
                </h2>

                <p className="text-gray-600 mb-4 text-center md:text-left">
                  {matchedCv?.reference}
                </p>
              </div>

              {/* Right Side */}
              <div className="col-span-2 p-4 sm:p-6">
                {/* Objective */}
                <section className="mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-2">Objective</h2>
                  <p className="text-gray-700 text-justify text-sm sm:text-base">
                    {matchedCv?.objective}
                  </p>
                </section>

                {/* Education */}
                <section className="mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-2">Education</h2>
                  {matchedCv?.education?.length ? (
                    matchedCv.education.map((edu, index) => (
                      <div key={index} className="mb-2">
                        <p className="text-gray-800 font-semibold text-sm sm:text-base">
                          {edu.institute}
                        </p>
                        <p className="text-gray-700 text-sm sm:text-base">
                          {edu.major} {edu.year}
                        </p>

                        <p className="text-gray-700 text-sm sm:text-base">
                          Result: {edu.result}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-700 text-sm sm:text-base">No education data available.</p>
                  )}
                </section>

                {/* Projects */}
                <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-2">Projects</h2>

                {matchedCv?.projects?.length ? (
                  matchedCv.projects.map((proj, idx) => (
                    <div key={idx} className="mb-2">
                      <div className="flex gap-5">
                        <p className="font-semibold text-gray-800">{proj.title}</p>
                        {proj.link && (
                          <Link
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            Link
                          </Link>
                        )}
                      </div>
                      <p className="text-gray-700">{proj.description}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No projects available.</p>
                )}

                {/* Certificates */}
                <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-2">Certificates</h2>

                {matchedCv?.certificates?.length ? (
                  matchedCv.certificates.map((cer, idx) => (
                    <div key={idx} className="mb-2">
                      <div className="flex gap-5">
                        <p className="font-semibold text-gray-800">{cer.name}</p>
                        {cer.link && (
                          <Link
                            href={cer.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            Link
                          </Link>
                        )}
                      </div>
                      <p className="text-gray-700">{cer.description}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No Certificate available.</p>
                )}


                {/* Career Summary */}
                <section className="mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-2">Career Summary</h2>
                  <p className="text-gray-700 text-sm sm:text-base">
                    {matchedCv?.workExperience}
                  </p>
                </section>
                {/* Extra Curriculum */}
                <section className="mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-2"> Extra Curriculum </h2>
                  <p className="text-gray-700 text-sm sm:text-base">
                    {matchedCv?.extraCurriculum}
                  </p>
                </section>

                {/* Additional */}
                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-2">Additional</h2>
                  <h3 className="font-semibold text-gray-800">Languages</h3>
                  <p className="text-gray-700 text-sm sm:text-base">
                    {matchedCv?.languagePreference}
                  </p>
                </section>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
