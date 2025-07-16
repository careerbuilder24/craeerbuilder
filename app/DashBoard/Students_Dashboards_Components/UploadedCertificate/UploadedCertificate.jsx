import React, { useState } from 'react';
import useCertificateUploaded from '@/hooks/useCertificateUploaded';
import useMatchingUploadedCertificate from '@/hooks/useMatchingUploadedCertificate';

export default function UploadedCertificate() {
    const { CertificateUploaded, loading, error } = useCertificateUploaded();
    const [modalImage, setModalImage] = useState(null);
    const { matchedStudentCertificate, matchedStudentCertificateEmail } = useMatchingUploadedCertificate();


    console.log(matchedStudentCertificate);
    // console.log(matchedStudentCertificateEmail);

    if (loading) {
        return <div className='text-center mt-10'>Loading...</div>;
    }

    if (error) {
        return <div className='text-center text-red-500 mt-10'>Error: {error}</div>;
    }

    // const certificates = matchedStudentCertificate?.data || [];

    return (
        <div className='p-4 sm:p-6 max-w-7xl mx-auto mt-5'>
            <div className='p-4 sm:p-6 max-w-7xl mx-auto mt-5'>
                {matchedStudentCertificate.length === 0 ? (
                    <p className='text-gray-500 text-center'>No certificates uploaded yet.</p>
                ) : (
                    <div className='flex flex-wrap justify-center gap-6'>
                        {matchedStudentCertificate.map((matchedStudentCertificates, index) => (
                            <div
                                key={index}
                                className='bg-white rounded-xl shadow-md overflow-hidden border flex flex-col 
                    w-full sm:w-[260px] md:w-[280px] lg:w-[300px]'
                            >
                                <div
                                    className='relative h-56 cursor-zoom-in'
                                    onClick={() => setModalImage(matchedStudentCertificates?.imageUrl)}
                                >
                                    <img
                                        alt='Certificate Image'
                                        src={matchedStudentCertificates?.imageUrl}
                                        className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                                        style={{ cursor: 'zoom-in' }}
                                    />
                                </div>
                                <div className='p-4 text-center flex-1 flex flex-col justify-between'>
                                    <div>
                                        <h3 className='text-base font-semibold mb-2 truncate'>
                                            {matchedStudentCertificates?.title || 'No Title'}
                                        </h3>
                                        <p className='text-sm text-gray-500 mb-2 whitespace-nowrap'>
                                            {new Date(matchedStudentCertificates?.date).toLocaleDateString()}
                                        </p>
                                        {matchedStudentCertificates?.email && (
                                            <p className='text-sm text-gray-700 truncate'>Uploaded By: {matchedStudentCertificates.email}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            {modalImage && (
                <div
                    className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50'
                    onClick={() => setModalImage(null)}
                >
                    <div
                        className='bg-white p-4 rounded-lg max-w-3xl w-full mx-4'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={modalImage}
                            alt='Modal Image'
                            className='w-full h-auto rounded'
                        />
                        <button
                            onClick={() => setModalImage(null)}
                            className='mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600'
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>

    );
}
