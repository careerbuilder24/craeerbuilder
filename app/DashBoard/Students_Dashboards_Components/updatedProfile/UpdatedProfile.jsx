// import Image from 'next/image';
// import React from 'react';

// export default function UpdatedProfile({ image, formData, matchedStudent }) {
//   const fields = [
//     { name: 'name', label: 'Name' },
//     { name: 'maritalStatus', label: 'Marital Status' },
//     { name: 'email', label: 'Email' },
//     { name: 'phone', label: 'Phone' },
//     { name: 'address', label: 'Address' },
//     { name: 'permanentAddress', label: 'Permanent Address' },
//     { name: 'facebook', label: 'Facebook' },
//     { name: 'linkedin', label: 'LinkedIn' }
//   ];

//   const textAreas = [
//     { name: 'aboutMyself', label: 'About Myself', placeholder: 'Type Here' }
//   ];

//   return (
//     <div className="bg-gray-200 p-6 rounded shadow-md">
//       <h3 className="text-xl font-bold mb-4">Submitted Data</h3>

//       {/* Image */}
//       {/* {image && (
//         <div className="mb-4">
//           <img src={image} alt="Uploaded Profile" className="w-24 h-24 object-cover rounded-full" />
//         </div>
//       )} */}

//       {/* Displaying form data */}
//       <ul className="space-y-2">
//         {fields.map(({ name, label }) => (
//           <li key={name}>
//             <strong>{label}:</strong> {formData[name] || "N/A"}
//           </li>
//         ))}
//         {textAreas.map(({ name, label }) => (
//           <li key={name}>
//             <strong>{label}:</strong> {formData[name] || "N/A"}
//           </li>
//         ))}
//       </ul>

//       {/* Displaying matched student data */}
//       <div className="mt-4">
//         <h4 className="text-lg font-semibold">Matched Student Details:</h4>
//         {matchedStudent && matchedStudent.length > 0 ? (
//           <>

//               {/* <div className="mb-4">
//                 <Image width={300} height={300}  src={matchedStudents?.uploadedImage} alt="Uploaded Profile" className="w-24 h-24 object-cover rounded-full" />
//               </div> */}

//             <ul className="space-y-2 mt-2">
//               {matchedStudent.map((student, idx) => (
//                 student ? (
//                   <li key={idx} className="border p-2 rounded">
//                     <p><strong>Name:</strong> {student.name}</p>
//                     <p><strong>Email:</strong> {student.email}</p>
//                     <p><strong>Phone:</strong> {student.phone}</p>
//                     <p><strong>Address:</strong> {student.address}</p>
//                     <p><strong>Facebook:</strong> {student.facebook}</p>
//                     <p><strong>LinkedIn:</strong> {student.linkedin}</p>
//                   </li>
//                 ) : (
//                   <p key={idx} className="text-red-500">Student data not available.</p>
//                 )
//               ))}
//             </ul>
//           </>

//         ) : (
//           <p>No matched students found.</p>
//         )}
//       </div>
//     </div>
//   );
// }
// import Image from 'next/image';



// import Link from 'next/link';
// import React from 'react';

// export default function UpdatedProfile({ image, formData, matchedStudent }) {


//   return (
//     <div className="bg-gray-200 p-6 rounded shadow-md">
//       {/* <h3 className="text-xl font-bold mb-4">Submitted Data</h3> */}

//       <img src={matchedStudent.uploadedImage} alt='user image' width={200} height={200} />

//       {
//         matchedStudent ? (
//           <>
//             <h4 className="text-lg font-semibold">Matched Student Details:</h4>
//             <div className="mt-4"></div>
//             <p><strong>Name:</strong> {matchedStudent.name}</p>
//             <p>
//               <strong>Email:</strong>
//               <a href={`mailto:${matchedStudent.email}`} className='text-blue-500'>
//                 {matchedStudent.email}
//               </a>
//             </p>

//             <p><strong>Phone:</strong> {matchedStudent.phone}</p>
//             <p><strong>Address:</strong> {matchedStudent.address}</p>
//             <p><strong>Facebook:</strong> <Link className='text-blue-500' href={matchedStudent.facebook}>{matchedStudent.facebook}</Link></p>
//             <p><strong>LinkedIn:</strong> <Link className='text-blue-500' href={matchedStudent.linkedin}>{matchedStudent.linkedin}</Link></p>

//           </>

//         ) : <p>No matched student found.</p>
//       }
//     </div>
//   );
// }


'use client';

import Link from 'next/link';
import React, { useState } from 'react';

export default function UpdatedProfile({ image, formData, matchedStudent }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedData, setEditedData] = useState({ ...matchedStudent });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSave = async () => {
  try {
    const response = await fetch('/api/students_Edit_Profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...editedData }), // this works if editedData contains `id`

    });

    const result = await response.json();

    if (result.success) {
      alert("Profile updated successfully!");
      setIsModalOpen(false);
      // Optionally refresh page or re-fetch updated data
    } else {
      alert(`Update failed: ${result.message}`);
    }
  } catch (error) {
    console.error("Update error:", error);
    alert("Something went wrong while updating the profile.");
  }
};


  return (
    <div className="bg-gray-200 p-6 rounded shadow-md">
      <img src={matchedStudent.uploadedImage} alt='user image' width={200} height={200} />

      {
        matchedStudent ? (
          <>
            <h4 className="text-lg font-semibold">Matched Student Details:</h4>
            <div className="mt-4"></div>
            <p><strong>Name:</strong> {matchedStudent.name}</p>
            <p>
              <strong>Email:</strong>
              <a href={`mailto:${matchedStudent.email}`} className='text-blue-500'>
                {matchedStudent.email}
              </a>
            </p>
            <p><strong>Phone:</strong> {matchedStudent.phone}</p>
            <p><strong>Address:</strong> {matchedStudent.address}</p>
            <p><strong>Facebook:</strong> <Link className='text-blue-500' href={matchedStudent.facebook}>{matchedStudent.facebook}</Link></p>
            <p><strong>LinkedIn:</strong> <Link className='text-blue-500' href={matchedStudent.linkedin}>{matchedStudent.linkedin}</Link></p>

            {/* Edit Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Edit
            </button>

            {/* Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                  <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

                  <input
                    type="text"
                    name="name"
                    value={editedData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border mb-2 rounded"
                    placeholder="Name"
                  />
                  <input
                    type="email"
                    name="email"
                    value={editedData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border mb-2 rounded"
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    name="phone"
                    value={editedData.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border mb-2 rounded"
                    placeholder="Phone"
                  />
                  <input
                    type="text"
                    name="address"
                    value={editedData.address}
                    onChange={handleInputChange}
                    className="w-full p-2 border mb-2 rounded"
                    placeholder="Address"
                  />
                  <input
                    type="text"
                    name="facebook"
                    value={editedData.facebook}
                    onChange={handleInputChange}
                    className="w-full p-2 border mb-2 rounded"
                    placeholder="Facebook URL"
                  />
                  <input
                    type="text"
                    name="linkedin"
                    value={editedData.linkedin}
                    onChange={handleInputChange}
                    className="w-full p-2 border mb-4 rounded"
                    placeholder="LinkedIn URL"
                  />

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="bg-gray-400 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : <p>No matched student found.</p>
      }
    </div>
  );
}
