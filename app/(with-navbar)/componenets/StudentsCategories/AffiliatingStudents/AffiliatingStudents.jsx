// AffiliatingStudents.js
import { useState, useEffect } from 'react';
import Loader from '../../Loader/Loader';
import Link from 'next/link';


const AffiliatingStudents = ({ affiliate, searchQuery, currentPage, handlePageChange }) => {
  const itemsPerPage = 12;

  // Function to apply search and pagination for affiliate students
  const applySearchAndPagination = (data) => {
    // Check if data is valid and an array
    if (!Array.isArray(data)) {
      return { currentData: [], totalPages: 0 }; // Return empty if data is invalid
    }

    // Filter based on search query
    const filteredData = data.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toString().includes(searchQuery)
    );

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return { currentData, totalPages };
  };

  // Apply search and pagination logic
  const { currentData, totalPages } = applySearchAndPagination(affiliate || []);

  return (
    <div>
      {/* Students grid */}
      <div className="container mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:mt-0">
        {affiliate.length === 0 ? (
          <div className="col-span-full flex justify-center items-center h-full">
            <Loader />
          </div>
        ) : (
          currentData.map((affiliateStudent) => (
            <div key={affiliateStudent.id}>
              <Link href={`/Students_Affiliating/${affiliateStudent.id}`} className="relative gap-4 overflow-hidden cursor-pointer">
                <div className="lg:w-full">
                  <img src={affiliateStudent.image} className="w-full rounded-lg" alt="Affiliate" />
                </div>
                <div className="absolute top-0 lg:w-12/12 w-full h-full left-0 rounded-md bg-gray-700 bg-opacity-70 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100">
                  <div className="mt-20 ml-2">
                    <p>Name: {affiliateStudent.name}</p>
                    <p>Batch: {affiliateStudent.batch}</p>
                    <p>Course ID: {affiliateStudent.courseId}</p>
                    <p>Course Name: {affiliateStudent.courseName}</p>
                    <p>Duration: {affiliateStudent.duration}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <nav className="inline-flex items-center space-x-2">
          <button
            className="px-4 py-2 bg-[#0054A5] text-white hover:bg-[#2CAAE1] border rounded-md cursor-pointer"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            &laquo;
          </button>

          {[...Array(totalPages).keys()].map((pageIndex) => (
            <button
              key={pageIndex + 1}
              className={`px-4 py-2 bg-[#0054A5] text-white rounded-md hover:bg-[#2CAAE1] ${currentPage === pageIndex + 1 ? 'bg-blue-500 text-white' : ''}`}
              onClick={() => handlePageChange(pageIndex + 1)}
            >
              {pageIndex + 1}
            </button>
          ))}

          <button
            className="px-4 py-2 bg-[#0054A5] text-white hover:bg-[#2CAAE1] border rounded-md"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            &raquo;
          </button>
        </nav>
      </div>
    </div>
  );
};

export default AffiliatingStudents;
