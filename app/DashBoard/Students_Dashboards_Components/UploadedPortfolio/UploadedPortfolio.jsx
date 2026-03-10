// 'use client'
// import React, { useState } from 'react'
// import useMatchingUploadedPortfolio from '@/hooks/useMatchingUploadedPortfolio'

// export default function UploadedPortfolio() {
//   const { matchedStudentPortfolio } = useMatchingUploadedPortfolio()
//   const [selectedDescription, setSelectedDescription] = useState(null)

//   // Function to truncate description to 30 words
//   const truncateText = (text, wordLimit = 30) => {
//     const words = text?.split(' ') || []
//     if (words.length <= wordLimit) return text
//     return words.slice(0, wordLimit).join(' ') + '...'
//   }

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6 text-center my-12">
//         Uploaded Portfolios
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center ">
//         {matchedStudentPortfolio?.map((item) => (
//           <div
//             key={item.id}
//             className="bg-white rounded-xl shadow-md overflow-hidden w-full  transition hover:shadow-lg"
//           >
//             <img
//               src={item.file}
//               alt={item.portfolioTitle}
//               className="w-full h-auto object-cover"
//             />
//             <div className="p-4">
//               <h2 className="text-xl font-semibold">{item.portfolioTitle}</h2>

//               {/* Show truncated description */}
//               <p className="text-gray-600">
//                 {truncateText(item.description)}{' '}
//                 {item.description?.split(' ').length > 30 && (
//                   <button
//                     onClick={() => setSelectedDescription(item.description)}
//                     className="text-blue-500 underline ml-1"
//                   >
//                     Read More
//                   </button>
//                 )}
//               </p>

//               <p className="text-sm text-gray-500 mt-2">
//                 <strong>Category:</strong> {item.category}
//               </p>
//               <p className="text-sm text-gray-500 break-all">
//                 <strong>Link:</strong>{' '}
//                 <a
//                   href={item.webPortfolioLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 underline"
//                 >
//                   {item.webPortfolioLink}
//                 </a>
//               </p>
//               <p className="text-sm text-gray-400 mt-2">
//                 <strong>Date:</strong>{' '}
//                 {new Date(item.date).toLocaleDateString()}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal */}
//       {selectedDescription && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//           onClick={() => setSelectedDescription(null)} // Close when clicking outside
//         >
//           <div
//             className="bg-white max-w-lg w-full p-6 rounded-lg shadow-lg relative"
//             onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
//           >
//             <button
//               onClick={() => setSelectedDescription(null)}
//               className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
//             >
//               ✖
//             </button>
//             <h2 className="text-lg font-semibold mb-4">Full Description</h2>
//             <p className="text-gray-700">{selectedDescription}</p>
//           </div>
//         </div>
//       )}

//     </div>
//   )
// }
'use client'
import React, { useState } from 'react'
import useMatchingUploadedPortfolio from '@/hooks/useMatchingUploadedPortfolio'
import { FaExternalLinkAlt, FaCalendarAlt, FaTag, FaTimes } from 'react-icons/fa' // Added icons for clarity
import Image from 'next/image' // Using Next.js Image component

export default function UploadedPortfolio() {
  const { matchedStudentPortfolio, loading, error } = useMatchingUploadedPortfolio()
  const [selectedDescription, setSelectedDescription] = useState(null)
  const [modalTitle, setModalTitle] = useState('')

  // Function to truncate description to 20 words for a cleaner card view
  const truncateText = (text, wordLimit = 20) => {
    const words = text?.split(/\s+/) || [] // Split by any whitespace
    if (words.length <= wordLimit) return text
    return words.slice(0, wordLimit).join(' ') + '...'
  }
  
  // Use a softer background color for the overall page
  const pageBg = 'bg-gray-50';

  if (loading) return <div className={`flex justify-center items-center h-96 ${pageBg}`}><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div><p className="ml-4 text-lg text-gray-600">Loading Portfolios...</p></div>;
  if (error) return <p className="text-center p-6 text-xl font-medium text-red-600">❌ Error: Failed to load portfolios.</p>;


  // Function to open modal
  const openModal = (title, description) => {
    setModalTitle(title);
    setSelectedDescription(description);
  }

  // Function to close modal
  const closeModal = () => {
    setSelectedDescription(null);
    setModalTitle('');
  }

  return (
    <div className={`p-6 ${pageBg} min-h-screen`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 pt-4 border-b pb-4">
          <h1 className="text-3xl font-extrabold text-gray-800">Student Portfolios</h1>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {matchedStudentPortfolio?.length > 0 ? (
            matchedStudentPortfolio.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transform hover:scale-[1.02] hover:shadow-2xl transition-all duration-300"
              >
                {/* Image/File Preview */}
                <div className="relative w-full h-48 bg-gray-200">
                    <Image
                        src={item.file || '/placeholder-image.png'} // Use a placeholder if 'file' is missing
                        alt={item.portfolioTitle}
                        layout="fill"
                        objectFit="cover"
                        className="transition duration-300 ease-in-out group-hover:opacity-90"
                    />
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2">
                    {item.portfolioTitle || 'Untitled Project'}
                  </h2>

                  {/* Metadata Pills */}
                  <div className="flex flex-wrap gap-2 text-xs mb-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-medium bg-blue-100 text-blue-800">
                          <FaTag className="w-3 h-3 mr-1" /> {item.category || 'N/A'}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-medium bg-gray-100 text-gray-600">
                          <FaCalendarAlt className="w-3 h-3 mr-1" /> {item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}
                      </span>
                  </div>

                  {/* Description Snippet */}
                  <p className="text-gray-600 text-sm mb-3">
                    {truncateText(item.description)}{' '}
                    {item.description?.split(/\s+/).length > 20 && (
                      <button
                        onClick={() => openModal(item.portfolioTitle, item.description)}
                        className="text-blue-600 hover:text-blue-800 font-medium ml-1 text-xs"
                      >
                        Read More
                      </button>
                    )}
                  </p>

                  {/* Link Button */}
                  {item.webPortfolioLink && (
                    <a
                      href={item.webPortfolioLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-[#17549A] hover:bg-[#14539b] transition duration-150 shadow-md"
                    >
                      <FaExternalLinkAlt className="w-4 h-4 mr-2" />
                      View Portfolio
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center p-12 bg-white rounded-xl shadow-lg">
                <p className="text-xl text-gray-500">No portfolios have been uploaded yet.</p>
            </div>
          )}
        </div>

        {/* --- */}
        
        {/* Full Description Modal */}
        {selectedDescription && (
          <div
            className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={closeModal} 
          >
            <div
              className="bg-white max-w-lg w-full p-6 rounded-xl shadow-2xl relative max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100"
              onClick={(e) => e.stopPropagation()} 
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-600 p-2 rounded-full transition"
              >
                <FaTimes className="w-5 h-5" />
              </button>
              
              <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">{modalTitle || "Full Description"}</h2>
              <p className="text-base text-gray-700 whitespace-pre-wrap">{selectedDescription}</p>
              
              <button
                onClick={closeModal}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition duration-200 shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}