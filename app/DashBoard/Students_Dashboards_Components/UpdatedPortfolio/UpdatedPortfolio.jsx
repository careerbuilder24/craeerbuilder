import React from "react";

export default function UpdatedPortfolio() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-3 bg-white shadow-lg rounded-2xl w-full max-w-5xl overflow-hidden">
        {/* Left Side */}
        <div className="col-span-2 p-6">
          {/* Objective */}
          <section className="mb-6">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Objective</h2>
            <p className="text-gray-700 text-justify">
              Dynamic and results-oriented professional with a proven track record in [your industry/field]. Possessing strong skills in [specific skills or technologies], I excel in driving projects to completion and delivering innovative solutions. With [number] years of experience in [specific roles or sectors], I am adept at [mention key responsibilities or achievements]. Committed to continuous learning and professional development, I thrive in fast-paced environments and collaborate effectively with diverse teams to achieve organizational goals.
            </p>
          </section>

          {/* Education */}
          <section className="mb-6">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Education</h2>
            <p className="text-gray-800 font-semibold">9 GCSEs including English | London Bridge Comprehensive School | Sep 2021 - May 2023</p>
            <p className="text-gray-700 mb-2">Predicted Grades (8). Mathematics (7), Science (8), Art (6).</p>
            <h3 className="font-semibold text-gray-800">Extracurricular Activities:</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Talented musician, achieving Grade 7 Piano and Grade 5 flute.</li>
              <li>Captain of the school netball team for 4 seasons connecting 2 age groups (11-13 & 14-16).</li>
              <li>Acted as mentor for years 1 and 2.</li>
              <li>Maintained school cleanliness and environment standards.</li>
            </ul>
            <h3 className="font-semibold text-gray-800 mt-2">Memberships:</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Member of the school club attending national competitions as a piano player for the school choir.</li>
            </ul>
          </section>

          {/* Career Summary */}
          <section className="mb-6">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Career Summary</h2>
            <p className="font-semibold text-gray-800">May 2022 - Aug 2022 | Action Aid Cancer Charity, London | Voluntary Fundraiser</p>
            <p className="text-gray-700">Supported the Action Aid Cancer Charity Shop to fundraise by going door to door, raising over $800 in 12 weeks.</p>
          </section>

          {/* Additional */}
          <section>
            <h2 className="text-2xl font-bold text-red-600 mb-2">Additional</h2>
            <h3 className="font-semibold text-gray-800">Awards</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Winner of the London Bridge Comprehensive School Geography Award 2022</li>
              <li>Participated in the UK Young Competition 2022 and took 1st place.</li>
            </ul>
            <h3 className="font-semibold text-gray-800 mt-2">Software</h3>
            <p className="text-gray-700">MS Word, MS Excel, MS PowerPoint</p>
            <h3 className="font-semibold text-gray-800 mt-2">Language</h3>
            <p className="text-gray-700">English (native), Spanish (conversational)</p>
          </section>
        </div>

        {/* Right Side */}
        <div className="col-span-1 bg-sky-100 p-6 flex flex-col items-center">
          {/* Image */}
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg" // Demo image URL
              alt="Profile Picture"
              width={128}
              height={128}
              className="object-cover"
            />
          </div>

          <h2 className="text-xl font-bold text-gray-800">Sushmita Shen</h2>
          <p className="text-gray-600 mb-6">Student</p>

          {/* Contact Details */}
          <div className="mb-6 w-full">
            <h3 className="font-bold text-gray-800 mb-2">Contact Details</h3>
            <p className="text-gray-700">📞 +880175535366</p>
            <p className="text-gray-700">✉️ abula@gmail.com</p>
            <p className="text-gray-700">📍 London</p>
          </div>

          {/* Core Skills */}
          <div className="w-full">
            <h3 className="font-bold text-gray-800 mb-2">Core Skills</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Communication and delegation</li>
              <li>Fundraising experience</li>
              <li>Captain of the school netball team</li>
              <li>Member of the school piano club</li>
              <li>School coding national competitor</li>
              <li>IT skills - predicted 6 at GCSE</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
