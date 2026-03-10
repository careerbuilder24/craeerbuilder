// 'use client';
// import React, { useMemo, useState, useEffect } from 'react';
// import useCertificateUploaded from '@/hooks/useCertificateUploaded';
// import Image from 'next/image';
// import useStudentEditProfile from '@/hooks/useStudentEditProfile';

// export default function Certificates({ student }) {
//     const { CertificateUploaded, loading, error } = useCertificateUploaded();
//     const [watchList, setWatchList] = useState([]);
//     const [modalImage, setModalImage] = useState(null);
//      const [studentEditProfile] = useStudentEditProfile();

//     // Load watch list from sessionStorage
//     useEffect(() => {
//         const storedList = sessionStorage.getItem('certificateWatchList');
//         if (storedList) {
//             setWatchList(JSON.parse(storedList));
//         }
//     }, []);

//     // Save to sessionStorage whenever watchList changes
//     useEffect(() => {
//         sessionStorage.setItem('certificateWatchList', JSON.stringify(watchList));
//     }, [watchList]);

//     const studentCertificates = useMemo(() => {
//         if (!Array.isArray(CertificateUploaded?.data)) return [];
//         if (CertificateUploaded.data.some(cert => cert.email)) {
//             return CertificateUploaded.data.filter(
//                 (cert) => cert?.email === student?.email
//             );
//         }
//         return CertificateUploaded.data;
//     }, [CertificateUploaded, student]);

//     const toggleWatchList = (cert) => {
//         setWatchList(prev => {
//             const exists = prev.find(item => item.id === cert.id);
//             if (exists) return prev.filter(item => item.id !== cert.id);
//             return [...prev, cert];
//         });
//     };

//     if (loading) return <p className="text-center">Loading certificates...</p>;
//     if (error) return <p className="text-center text-red-500">Error loading certificates.</p>;

//     return (
//         <>
//             <h1 className="text-3xl font-bold text-white text-center">Certifications</h1>

//             <div className="flex items-center text-white bg-[#17549A] h-10 lg:w-7/12 lg:ml-16 font-bold gap-2">
//                 <p className="lg:ml-4">Academic Certifications</p>
//                 <p>/ Diploma | Certificates</p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-10 shadow-lg">
//                 {studentCertificates.length > 0 ? (
//                     studentCertificates.map((cert) => {
//                         const isWatched = watchList.some(item => item.id === cert.id);
//                         return (
//                             <div
//                                 key={cert.id}
//                                 className="bg-base-100 p-5 transition-shadow duration-300 shadow-2xl relative"
//                             >
//                                 <div
//                                     className="relative w-full h-64 overflow-hidden cursor-zoom-in"
//                                     onClick={() => setModalImage(cert.image || cert.imageUrl)}
//                                 >
//                                     <Image
//                                         className="w-full h-full object-cover rounded-md transform hover:scale-105 transition-transform duration-300"
//                                         src={cert.image || cert.imageUrl}
//                                         alt={cert.certificateName || cert.title}
//                                         height={500}
//                                         width={500}
//                                     />
//                                 </div>
//                                 <figcaption className="text-center mt-4 font-semibold text-sm text-gray-800">
//                                     {cert.certificateName || cert.title}
//                                 </figcaption>
//                                 <button
//                                     onClick={() => toggleWatchList(cert)}
//                                     className={`mt-2 w-full h-8 rounded-2xl shadow-xl text-sm font-bold transition-colors duration-300
//                                         ${isWatched ? 'bg-green-500 text-white' : 'bg-blue-200 text-blue-700 hover:bg-blue-400'}
//                                     `}
//                                 >
//                                     {isWatched ? 'Watched' : 'Watch'}
//                                 </button>
//                             </div>
//                         );
//                     })
//                 ) : (
//                     <p className="text-center text-gray-500 col-span-3">No certificates found.</p>
//                 )}
//             </div>

//             {/* Modal */}
//             {modalImage && (
//                 <div
//                     className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
//                     onClick={() => setModalImage(null)}
//                 >
//                     <div className="relative w-auto max-w-3xl mx-auto">
//                         <Image
//                             src={modalImage}
//                             alt="Certificate"
//                             width={1000}
//                             height={1000}
//                             className="object-contain max-h-screen rounded-md"
//                         />
//                         <button
//                             className="absolute top-2 right-2 text-white text-xl font-bold"
//                             onClick={() => setModalImage(null)}
//                         >
//                             &times;
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }
'use client';
import React, { useMemo, useState, useEffect } from 'react';
import useCertificateUploaded from '@/hooks/useCertificateUploaded';
import Image from 'next/image';
import useStudentEditProfile from '@/hooks/useStudentEditProfile';

export default function Certificates({ student }) {
    const { CertificateUploaded } = useCertificateUploaded();
    const [watchList, setWatchList] = useState([]);
    const [modalImage, setModalImage] = useState(null);
    const [studentEditProfile] = useStudentEditProfile();
          const [loading, setLoading] = useState(true);

    // Load watch list from sessionStorage
    useEffect(() => {
        const storedList = sessionStorage.getItem('certificateWatchList');
        if (storedList) setWatchList(JSON.parse(storedList));
    }, []);

    useEffect(() => {
        sessionStorage.setItem('certificateWatchList', JSON.stringify(watchList));
    }, [watchList]);

    // Find current student
    const studentData = useMemo(() => {
        if (!studentEditProfile?.data || !student) return null;
        return studentEditProfile.data.find(
            s =>
                s.id === student.id ||
                s.email?.trim()?.toLowerCase() === student.email?.trim()?.toLowerCase()
        );
    }, [studentEditProfile, student]);

    // Always call hooks first, then conditionally render
    const studentCertificates = useMemo(() => {
        if (!Array.isArray(CertificateUploaded?.data)) return [];
        return CertificateUploaded.data.filter(
            (cert) => cert?.email?.trim()?.toLowerCase() === student?.email?.trim()?.toLowerCase()
        );
    }, [CertificateUploaded, student]);

    const toggleWatchList = (cert) => {
        setWatchList(prev => {
            const exists = prev.find(item => item.id === cert.id);
            if (exists) return prev.filter(item => item.id !== cert.id);
            return [...prev, cert];
        });
    };
     // Simulate loading until studentData is ready
      useEffect(() => {
        if (studentData) {
          setLoading(false);
        }
      }, [studentData]);

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

    // Conditional UI for restricted access
    if (!studentData || studentData.status !== 'accepted') {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white shadow-md rounded-xl p-6 max-w-md text-center">
                    <Image
                        src="https://i.postimg.cc/NFcfNNkr/logo.jpg"
                        alt="Restricted"
                        width={300}
                        height={300}
                        className="mx-auto mb-4"
                    />
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Access Restricted
                    </h2>
                    <p className="text-gray-600 mt-2">
                        This student's certificates are only visible after admin approval.
                    </p>
                    <p className="text-gray-500 mt-1">
                        (Status: {studentData?.status || 'pending'})
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            <h1 className="text-3xl font-bold text-white text-center">Certifications</h1>
            <div className="flex items-center text-white bg-[#17549A] h-10 lg:w-7/12 lg:ml-16 font-bold gap-2">
                <p className="lg:ml-4">Academic Certifications</p>
                <p>/ Diploma | Certificates</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-10 shadow-lg">
                {studentCertificates.length > 0 ? (
                    studentCertificates.map((cert) => {
                        const isWatched = watchList.some(item => item.id === cert.id);
                        return (
                            <div
                                key={cert.id}
                                className="bg-base-100 p-5 transition-shadow duration-300 shadow-2xl relative"
                            >
                                <div
                                    className="relative w-full h-64 overflow-hidden cursor-zoom-in"
                                    onClick={() => setModalImage(cert.image || cert.imageUrl)}
                                >
                                    <Image
                                        className="w-full h-full object-cover rounded-md transform hover:scale-105 transition-transform duration-300"
                                        src={cert.image || cert.imageUrl}
                                        alt={cert.certificateName || cert.title}
                                        height={500}
                                        width={500}
                                    />
                                </div>
                                <figcaption className="text-center mt-4 font-semibold text-sm text-gray-800">
                                    {cert.certificateName || cert.title}
                                </figcaption>
                                <button
                                    onClick={() => toggleWatchList(cert)}
                                    className={`mt-2 w-full h-8 rounded-2xl shadow-xl text-sm font-bold transition-colors duration-300
                                        ${isWatched ? 'bg-green-500 text-white' : 'bg-blue-200 text-blue-700 hover:bg-blue-400'}
                                    `}
                                >
                                    {isWatched ? 'Watched' : 'Watch'}
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-center text-gray-500 col-span-3">
                        No certificates available for this student.
                    </p>
                )}
            </div>

            {/* Modal */}
            {modalImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                    onClick={() => setModalImage(null)}
                >
                    <div className="relative w-auto max-w-3xl mx-auto">
                        <Image
                            src={modalImage}
                            alt="Certificate"
                            width={1000}
                            height={1000}
                            className="object-contain max-h-screen rounded-md"
                        />
                        <button
                            className="absolute top-2 right-2 text-white text-xl font-bold"
                            onClick={() => setModalImage(null)}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
