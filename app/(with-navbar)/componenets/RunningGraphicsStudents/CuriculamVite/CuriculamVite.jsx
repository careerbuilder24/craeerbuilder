
'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useCVEdit from '@/hooks/useCVEdit';
import useStudentEditProfile from '@/hooks/useStudentEditProfile';

export default function CuriculamVite({ motion: student }) {


  const { CvEdit } = useCVEdit();
  const [studentEditProfile] = useStudentEditProfile();
  const [loading, setLoading] = useState(true);

  // Get student data
  const studentData = useMemo(() => {
    if (!studentEditProfile?.data || !student) return null;
    return studentEditProfile.data.find(
      (s) =>
        s.id === student.id ||
        s.email?.trim()?.toLowerCase() === student.email?.trim()?.toLowerCase()
    );
  }, [studentEditProfile, student]);

  // Get student CV
  const matchedCv = useMemo(() => {
    if (!student || !CvEdit) return null;
    return CvEdit.find(
      (cv) =>
        cv?.student_id === student.id ||
        cv?.email?.trim()?.toLowerCase() === student?.email?.trim()?.toLowerCase()
    );
  }, [CvEdit, student]);

  const workExp = useMemo(() => {
    if (!matchedCv?.workExperience) return [];
    return matchedCv.workExperience.split('\n\n').map((jobStr) => {
      const lines = jobStr.split('\n').filter(Boolean);
      return {
        position: lines[0] || 'N/A',
        company: lines[1] || 'N/A',
        duration: lines[2] || 'N/A',
        description: lines.slice(3).join('\n'),
      };
    });
  }, [matchedCv?.workExperience]);

  // Simulate loading until studentData is ready
  useEffect(() => {
    if (studentData) {
      setLoading(false);
    }
  }, [studentData]);

  // Show loader while waiting for data
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="loader mb-4 border-4 border-blue-500 border-dashed rounded-full w-12 h-12 animate-spin mx-auto"></div>
          <p className="text-gray-600 text-lg">Loading student CV...</p>
        </div>
      </div>
    );
  }

  // If pending or denied, show restricted message
  if (!studentData || studentData.status !== 'accepted') {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-xl p-6 max-w-md text-center">
          <Image
            src="https://i.postimg.cc/NFcfNNkr/logo.jpg"
            alt="Restricted"
            width={600}
            height={600}
            className="mx-auto mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-800">
            Access Restricted
          </h2>
          <p className="text-gray-600 mt-2"> This student's detailed information is only visible after admin approval.</p>
          <p className="text-gray-600 mt-2"> Contact This Number For Know Details: +880 1339-397906</p>
          <p className=" mt-1 text-xl text-red-500">
            (Status: {studentData?.status || 'pending'})
          </p>
        </div>
      </div>
    );
  }

  // If CV data is missing
  if (!matchedCv) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">
          No CV data found for this student.
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 bg-white shadow-lg rounded-2xl w-full max-w-5xl overflow-hidden">

        {/* Left Side */}
        <div className="bg-sky-100 p-4 sm:p-6 flex flex-col">
          <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-full overflow-hidden mb-4">
            <Image
              src={matchedCv?.profileImage || '/placeholder.png'}
              alt={matchedCv?.name}
              width={160}
              height={160}
              className="object-cover w-full h-full"
            />
          </div>

          <p className="text-lg sm:text-xl font-bold text-gray-800 text-center my-5 md:text-3xl">
            {matchedCv?.name}
          </p>

          <p className="text-gray-600 mb-4 text-center md:text-left">
            {matchedCv?.careerSummary || 'No career summary'}
          </p>

          <div className="mb-6 w-full">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 text-center md:text-left">
              Contact Details
            </h3>
            <p className="text-gray-700 text-sm sm:text-base">
              Phone No: {matchedCv?.phone}
            </p>
            <p className="text-gray-700 text-sm sm:text-base">
              Email: {matchedCv?.email}
            </p>
            <p className="text-gray-700 text-sm sm:text-base">
              Location: {matchedCv?.address}
            </p>
            <p className="text-gray-700 text-sm sm:text-base">
              {matchedCv?.fatherName}
            </p>
            <p className="text-gray-700 text-sm sm:text-base">
              {matchedCv?.motherName}
            </p>
            <div className="text-gray-700 text-sm sm:text-base text-center md:text-left space-y-1">
              {matchedCv?.linkedin && (
                <p>
                  LinkedIn:{' '}
                  <a
                    href={matchedCv.linkedin}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    Link
                  </a>
                </p>
              )}
              {matchedCv?.facebook && (
                <p>
                  Facebook:{' '}
                  <a
                    href={matchedCv.facebook}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    Link
                  </a>
                </p>
              )}
              {matchedCv?.youtube && (
                <p>
                  YouTube:{' '}
                  <a
                    href={matchedCv.youtube}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    Link
                  </a>
                </p>
              )}
            </div>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-gray-800 text-center md:text-left">
            Core Skills
          </h2>
          <p className="text-gray-600 mb-4 text-center md:text-left">
            {matchedCv?.coreSkills || 'No skills listed'}
          </p>

          <h2 className="text-lg sm:text-xl font-bold text-gray-800 text-center md:text-left">
            Soft Skills
          </h2>
          <p className="text-gray-600 mb-4 text-center md:text-left">
            {matchedCv?.softSkills || 'No soft skills listed'}
          </p>

          <h2 className="text-lg sm:text-xl font-bold text-gray-800 text-center md:text-left">
            Projects
          </h2>
          <p className="text-gray-600 mb-4 text-center md:text-left">
            {matchedCv?.projects?.length
              ? `${matchedCv.projects.length} projects`
              : 'No projects available'}
          </p>

          <h2 className="text-lg sm:text-xl font-bold text-gray-800 text-center md:text-left">
            Reference
          </h2>
          <p className="text-gray-600 mb-4 text-center md:text-left">
            {matchedCv?.references?.length
              ? `${matchedCv.references.length} reference(s)`
              : matchedCv?.reference || 'No references available'}
          </p>
        </div>

        {/* Right Side */}
        <div className="col-span-2 p-4 sm:p-6">
          {/* Objective */}
          <section className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-2">
              Objective
            </h2>
            <p className="text-gray-700 text-justify text-sm sm:text-base">
              {matchedCv?.objective || 'No objective added'}
            </p>
          </section>

          {/* Education */}
          <section className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-2">
              Education
            </h2>
            {matchedCv?.education?.length ? (
              matchedCv.education.map((edu, idx) => (
                <div key={idx} className="mb-2">
                  {edu.institute && (
                    <p className="text-gray-800 font-semibold text-sm sm:text-base">
                      {edu.institute}
                    </p>
                  )}
                  {(edu.major || edu.year) && (
                    <p className="text-gray-700 text-sm sm:text-base">
                      {edu.major ? edu.major : ''}
                      {edu.major && edu.year ? ' ' : ''}
                      {edu.year ? `(${edu.year})` : ''}
                    </p>
                  )}
                  {edu.result && (
                    <p className="text-gray-700 text-sm sm:text-base">
                      Result: {edu.result}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-700">No education data available.</p>
            )}
          </section>

          {/* Work Experience */}
          <section className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-2">
              Work Experience
            </h2>
            {workExp.length ? (
              workExp.map((job, idx) => (
                <div key={idx} className="mb-2">
                  <p className="font-semibold text-gray-800">{job.position}</p>
                  <p className="text-gray-700 text-sm">{job.duration}</p>
                  <p className="text-gray-700 whitespace-pre-line">
                    {job.description}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No work experience available.</p>
            )}
          </section>

          {/* Certificates */}
          <section className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-2">
              Certificates
            </h2>
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
                  <p className="text-gray-700 whitespace-pre-line">
                    {cer.description}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No certificates available.</p>
            )}
          </section>

          {/* Extra Curriculum */}
          <section className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-2">
              Extra Curriculum
            </h2>
            {matchedCv?.extraCurriculum ? (
              <p className="text-gray-700 whitespace-pre-line">
                {matchedCv.extraCurriculum}
              </p>
            ) : (
              <p className="text-gray-600">
                No extra curriculum activities available.
              </p>
            )}
          </section>

          {/* Additional */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-2">
              Additional
            </h2>
            <h3 className="font-semibold text-gray-800">Languages</h3>
            <p className="text-gray-700 text-sm sm:text-base">
              {matchedCv?.languagePreference || 'Not specified'}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
