// 'use client';

// import useApplicantApplied from '@/hooks/useApplicantApplied';
// import useRegistered from '@/hooks/useRegistered';
// import useStudentEditProfile from '@/hooks/useStudentEditProfile';
// import React from 'react';

// export default function JobApplicant() {
//     const { AllApplicant, loading, error } = useApplicantApplied();

//      const [studentEditProfile] = useStudentEditProfile();
//        const [register] = useRegistered();

//       console.log(register)
//       console.log(studentEditProfile)
//       console.log(AllApplicant)


//     if (loading || !AllApplicant) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <div className="animate-spin rounded-full h-28 w-28 border-t-4 border-blue-500 border-solid"></div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="flex justify-center items-center h-screen text-red-500 font-bold">
//                 Failed to load applicants
//             </div>
//         );
//     }

//     return (
//         <div className="p-6">
//             <h1 className="text-3xl font-bold mb-6 text-center">Job Applicants</h1>
//             <div className="flex flex-col container mx-auto gap-5">
//                 {AllApplicant.map((applicant, index) => (
//                     <div
//                         key={index}
//                         className="bg-white shadow-md rounded-xl p-5 border hover:shadow-lg transition duration-200 flex justify-between"
//                     >
//                         {/* Applicant Profile Picture */}
//                         {/* <div className="flex justify-center mb-4">
//                             <img
//                                 src={applicant.image || 'https://via.placeholder.com/100'}
//                                 alt={applicant.name}
//                                 className="w-24 h-24 rounded-full border object-cover"
//                             />
//                         </div> */}

//                         {/* Applicant Info */}
//                         <div className="text-left">
//                             <h2 className="text-xl font-semibold">{applicant.name}</h2>
//                             <p className="text-gray-600">{applicant.email}</p>
//                             <p className="text-gray-500 mt-1">{applicant.phone}</p>
//                         </div>

//                         {/* Extra Details */}
//                         <div className="mt-4 text-sm text-gray-700">
//                             <p><span className="font-bold">Position:</span> {applicant.position || 'N/A'}</p>
//                             <p><span className="font-bold">Applied On:</span> {applicant.appliedDate || 'N/A'}</p>
//                         </div>

//                         <a href={applicant.cv_path} target="_blank" rel="noopener noreferrer">
//                             View CV
//                         </a>


//                         {/* Actions */}
//                         {/* <div className="mt-5 flex justify-center gap-3">
//                             <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
//                                 View
//                             </button>
//                             <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
//                                 Approve
//                             </button>
//                             <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
//                                 Reject
//                             </button>
//                         </div> */}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }
'use client';

import useApplicantApplied from '@/hooks/useApplicantApplied';
import useRegistered from '@/hooks/useRegistered';
import useStudentEditProfile from '@/hooks/useStudentEditProfile';
import React, { useState } from 'react';

export default function JobApplicant() {
    const { AllApplicant, loading, error } = useApplicantApplied();
    const [studentEditProfile] = useStudentEditProfile();
    const [register] = useRegistered();
    const [searchQuery, setSearchQuery] = useState('');

    console.log(register);
    console.log(studentEditProfile);
    console.log(AllApplicant);

    if (loading || !AllApplicant) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-28 w-28 border-t-4 border-blue-500 border-solid"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-red-500 font-bold">
                Failed to load applicants
            </div>
        );
    }

    // Filter applicants based on search query (name or email)
    const filteredApplicants = AllApplicant.filter(applicant =>
        applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        applicant.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Job Applicants</h1>

            {/* Search Input */}
            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full max-w-md p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-600"
                />
            </div>

            <div className="flex flex-col items-center gap-5">
                {filteredApplicants.length > 0 ? (
                    filteredApplicants.map((applicant, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-md rounded-xl p-5 border hover:shadow-lg transition duration-200 w-full sm:max-w-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                        >
                            {/* Left Side: Name & Email */}
                            <div className="flex flex-col text-left sm:text-left w-full sm:w-1/2">
                                <h2 className="text-lg sm:text-xl font-semibold">{applicant.name}</h2>
                                <p className="text-gray-600 break-words">{applicant.email}</p>
                            </div>

                            {/* Right Side: Details + Buttons */}
                            <div className="flex flex-col items-start sm:items-end text-left sm:text-right w-full sm:w-1/2 gap-2">
                                <p className="text-gray-500">{applicant.phone}</p>
                                <p className="text-sm text-gray-700">
                                    <span className="font-bold">Position:</span> {applicant.position || 'N/A'}
                                </p>
                                <p className="text-sm text-gray-700">
                                    <span className="font-bold">Applied On:</span> {applicant.appliedDate || 'N/A'}
                                </p>
                                <a
                                    href={applicant.cv_path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    View CV
                                </a>

                                {/* Action Buttons */}
                                <div className="mt-2 flex flex-wrap gap-2 sm:justify-end">
                                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                                        Approve
                                    </button>
                                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                                        Reject
                                    </button>
                                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                        View
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 mt-4">No applicants found.</p>
                )}
            </div>
        </div>
    );
}
