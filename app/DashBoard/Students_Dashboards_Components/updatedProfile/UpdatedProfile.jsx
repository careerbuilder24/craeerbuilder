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
import Link from 'next/link';
import React from 'react';

export default function UpdatedProfile({ image, formData, matchedStudent }) {


  return (
    <div className="bg-gray-200 p-6 rounded shadow-md">
      {/* <h3 className="text-xl font-bold mb-4">Submitted Data</h3> */}

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

          </>

        ) : <p>No matched student found.</p>
      }
    </div>
  );
}
