// import React, { useState } from 'react';
// import useCertificateUploaded from '@/hooks/useCertificateUploaded';
// import useMatchingUploadedCertificate from '@/hooks/useMatchingUploadedCertificate';

// export default function UploadedCertificate() {
//     const { CertificateUploaded, loading, error } = useCertificateUploaded();
//     const [modalImage, setModalImage] = useState(null);
//     const { matchedStudentCertificate, matchedStudentCertificateEmail } = useMatchingUploadedCertificate();


//     console.log(matchedStudentCertificate);
//     // console.log(matchedStudentCertificateEmail);

//     if (loading) {
//         return <div className='text-center mt-10'>Loading...</div>;
//     }

//     if (error) {
//         return <div className='text-center text-red-500 mt-10'>Error: {error}</div>;
//     }

//     // const certificates = matchedStudentCertificate?.data || [];

//     return (
//         <div className='p-4 sm:p-6 max-w-7xl mx-auto mt-5'>
//             <div className='p-4 sm:p-6 max-w-7xl mx-auto mt-5'>
//                 {matchedStudentCertificate.length === 0 ? (
//                     <p className='text-gray-500 text-center'>No certificates uploaded yet.</p>
//                 ) : (
//                     <div className='flex flex-wrap justify-center gap-6'>
//                         {matchedStudentCertificate.map((matchedStudentCertificates, index) => (
//                             <div
//                                 key={index}
//                                 className='bg-white rounded-xl shadow-md overflow-hidden border flex flex-col 
//                     w-full sm:w-[260px] md:w-[280px] lg:w-[300px]'
//                             >
//                                 <div
//                                     className='relative h-56 cursor-zoom-in'
//                                     onClick={() => setModalImage(matchedStudentCertificates?.imageUrl)}
//                                 >
//                                     <img
//                                         alt='Certificate Image'
//                                         src={matchedStudentCertificates?.imageUrl}
//                                         className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
//                                         style={{ cursor: 'zoom-in' }}
//                                     />
//                                 </div>
//                                 <div className='p-4  flex-1 flex flex-col justify-between'>
//                                     <div>
//                                         <div className='flex justify-between'>
//                                             <h3 className='text-base font-semibold mb-2 truncate'>
//                                                 {matchedStudentCertificates?.title || 'No Title'}
//                                             </h3>
//                                             <p className='text-sm text-gray-500 mb-2 whitespace-nowrap'>
//                                                 {new Date(matchedStudentCertificates?.date).toLocaleDateString()}
//                                             </p>
//                                         </div>
//                                         {matchedStudentCertificates?.email && (
//                                             <p className='text-sm text-gray-700 truncate'>Uploaded By: {matchedStudentCertificates.email}</p>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>

//             {/* Modal */}
//             {modalImage && (
//                 <div
//                     className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50'
//                     onClick={() => setModalImage(null)}
//                 >
//                     <div
//                         className='bg-white p-4 rounded-lg max-w-3xl w-full mx-4'
//                         onClick={(e) => e.stopPropagation()}
//                     >
//                         <img
//                             src={modalImage}
//                             alt='Modal Image'
//                             className='w-full h-auto rounded'
//                         />
//                         <button
//                             onClick={() => setModalImage(null)}
//                             className='mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600'
//                         >
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>

//     );
// }
import React, { useState } from 'react';
import useCertificateUploaded from '@/hooks/useCertificateUploaded';
import useMatchingUploadedCertificate from '@/hooks/useMatchingUploadedCertificate';

export default function UploadedCertificate() {
    const { CertificateUploaded, loading, error } = useCertificateUploaded();
    const [modalImage, setModalImage] = useState(null);
    const { matchedStudentCertificate, matchedStudentCertificateEmail } = useMatchingUploadedCertificate();

    // Use a clean array for iteration, handling null/undefined
    const certificatesToDisplay = matchedStudentCertificate || [];

    if (loading) {
        return <div className='text-center mt-10'>Loading...</div>;
    }

    if (error) {
        return <div className='text-center text-red-500 mt-10'>Error: {error}</div>;
    }

    const openModal = (imageUrl) => {
        setModalImage(imageUrl);
    };

    return (
        <div className='p-4 sm:p-6 max-w-7xl mx-auto mt-5'>
            <h2 className='text-2xl font-bold mb-4 text-gray-800'>Uploaded Certificates</h2>
            
            {certificatesToDisplay.length === 0 ? (
                <p className='text-gray-500 text-center py-10'>No certificates uploaded yet.</p>
            ) : (
                <div className='overflow-x-auto shadow-lg rounded-lg border border-gray-200'>
                    <table className='min-w-full divide-y divide-gray-200'>
                        <thead className='bg-gray-50'>
                            <tr>
                                <th
                                    scope='col'
                                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                >
                                    Image
                                </th>
                                <th
                                    scope='col'
                                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                >
                                    Title
                                </th>
                                <th
                                    scope='col'
                                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                >
                                    Profession
                                </th>
                                <th
                                    scope='col'
                                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                >
                                    Date Issued
                                </th>
                                <th
                                    scope='col'
                                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                >
                                    Uploaded By (Email)
                                </th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                            {certificatesToDisplay.map((certificate, index) => (
                                <tr key={index} className='hover:bg-gray-50'>
                                    {/* Image Column - Now with a clickable thumbnail */}
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        {certificate?.imageUrl ? (
                                            <img
                                                src={certificate.imageUrl}
                                                alt={`Certificate ${certificate.title || 'Image'}`}
                                                className='h-16 w-16 object-cover rounded-md cursor-pointer ring-1 ring-gray-200 hover:ring-indigo-500 transition-all duration-200'
                                                onClick={() => openModal(certificate.imageUrl)}
                                            />
                                        ) : (
                                            <span className='text-gray-400 text-sm'>No Image</span>
                                        )}
                                    </td>
                                    {/* Title Column */}
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='text-sm font-medium text-gray-900'>
                                            {certificate?.title || 'N/A'}
                                        </div>
                                    </td>
                                    {/* Profession Column */}
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='text-sm text-gray-500'>
                                            {certificate?.profession || 'N/A'}
                                        </div>
                                    </td>
                                    {/* Date Column */}
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='text-sm text-gray-500'>
                                            {certificate?.date ? new Date(certificate.date).toLocaleDateString() : 'N/A'}
                                        </div>
                                    </td>
                                    {/* Email Column */}
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='text-sm text-gray-500 truncate max-w-[200px]'>
                                            {certificate?.email || 'N/A'}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal - Remains the same for viewing the certificate image */}
            {modalImage && (
                <div
                    className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4' // Added p-4 for better mobile spacing
                    onClick={() => setModalImage(null)}
                >
                    <div
                        className='bg-white p-4 rounded-lg max-w-3xl w-full mx-auto relative' // Added relative for close button positioning if needed
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={modalImage}
                            alt='Modal Image'
                            className='w-full h-auto rounded max-h-[80vh] object-contain' // Adjusted for better fit
                        />
                        <button
                            onClick={() => setModalImage(null)}
                            className='mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors'
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}