// import useMatchingUploadedBlog from "@/hooks/useMatchingUploadedBlog";
// import usePublishedBlogs from "@/hooks/usePublishedBlogs";
// import Image from "next/image";
// import React, { useState } from "react";

// export default function AllBlogs() {
//   const { publishedBlogs, loading, error } = usePublishedBlogs();
//   const { matchedStudentUploadedBlogs } = useMatchingUploadedBlog();

//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedFilter, setSelectedFilter] = useState("All");
//   const [searchText, setSearchText] = useState("");

//   // Modal state
//   const [modalContent, setModalContent] = useState(null);
//   const [modalTitle, setModalTitle] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   const entriesPerPage = 13;

//   if (loading) return <p className="text-center p-4">Loading Blogs...</p>;
//   if (error) return <p className="text-center p-4 text-red-500">Error: {error}</p>;

//   // Filter + paginate
//   const filteredBlogs = publishedBlogs.filter((blog) => {
//     const matchesFilter =
//       selectedFilter === "All" || blog.status === selectedFilter;
//     const matchesSearch = blog.title
//       .toLowerCase()
//       .includes(searchText.toLowerCase());
//     return matchesFilter && matchesSearch;
//   });

//   const paginatedBlogs = filteredBlogs.slice(
//     (currentPage - 1) * entriesPerPage,
//     currentPage * entriesPerPage
//   );

//   const totalEntries = filteredBlogs.length;

//   const handleNextPage = () => {
//     if (currentPage < Math.ceil(totalEntries / entriesPerPage)) {
//       setCurrentPage((prev) => prev + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage((prev) => prev - 1);
//     }
//   };

//   const openModal = (title, content) => {
//     setModalTitle(title);
//     setModalContent(content);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setModalTitle("");
//     setModalContent(null);
//   };

//   const truncateText = (text, wordLimit = 20) => {
//     const words = text.split(" ");
//     return words.length > wordLimit
//       ? words.slice(0, wordLimit).join(" ") + "..."
//       : text;
//   };

//   return (
//     <div className="flex justify-center items-center w-full p-4">
//       <div className="w-full max-w-6xl">
//         {/* Filter & Search */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-4">
//           <h1 className="text-3xl font-bold mb-2 md:mb-0">All Blogs</h1>

//           <div className="space-x-2 flex flex-wrap justify-center">
//             {["All", "Approved", "Denied"].map((filter) => (
//               <button
//                 key={filter}
//                 className={`px-4 py-2 rounded ${selectedFilter === filter
//                     ? "bg-[#17549A] text-white"
//                     : "bg-gray-200 text-black"
//                   }`}
//                 onClick={() => setSelectedFilter(filter)}
//               >
//                 {filter}
//               </button>
//             ))}
//           </div>

//           <div className="mt-2 md:mt-0">
//             <label className="mr-2">Search</label>
//             <input
//               type="text"
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//               className="border py-2 px-3 rounded w-full md:w-auto"
//             />
//           </div>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="mx-auto border-collapse border border-gray-300 text-center text-sm">
//             <thead className="bg-[#17549A] text-white">
//               <tr>
//                 <th className="border border-gray-300 px-4 py-2 text-center">Image</th>
//                 <th className="border border-gray-300 px-4 py-2 text-center">Category</th>
//                 <th className="border border-gray-300 px-4 py-2 text-center">Note</th>
//                 <th className="border border-gray-300 px-4 py-2 min-w-[250px] text-center">
//                   Blog Content
//                 </th>
//                 <th className="border border-gray-300 px-4 py-2">Status</th>
//                 <th className="border border-gray-300 px-4 py-2">Date Published</th>
//               </tr>
//             </thead>
//             <tbody>
//               {matchedStudentUploadedBlogs?.map((blog) => (
//                 <tr key={blog.id}>
//                   {/* Image */}
//                   <td className="border border-gray-300 px-2 py-2">
//                     <Image
//                       width={400}
//                       height={400}
//                       src={blog.featuredImage}
//                       alt="Blog Image"
//                       className="w-16 h-16 object-cover mx-auto rounded"
//                     />
//                   </td>

//                   {/* Category */}
//                   <td className="border border-gray-300 px-2 py-2">
//                     {blog.category}
//                   </td>

//                   {/* Note */}
//                   <td className="border border-gray-300 px-2 py-2 text-justify">
//                     {truncateText(blog.note, 20)}{" "}
//                     {blog.note.split(" ").length > 20 && (
//                       <button
//                         className="text-blue-500 underline text-xs"
//                         onClick={() => openModal("Full Note", blog.note)}
//                       >
//                         Read More
//                       </button>
//                     )}
//                   </td>

//                   {/* Blog Content */}
//                   <td className="border border-gray-300 px-2 py-2 whitespace-pre-wrap max-w-xs text-left text-xs">
//                     <div
//                       dangerouslySetInnerHTML={{
//                         __html: truncateText(
//                           blog.blogContent.replace(/<[^>]+>/g, ""),
//                           20
//                         ),
//                       }}
//                     />
//                     {blog.blogContent.split(" ").length > 20 && (
//                       <button
//                         className="text-blue-500 underline text-xs"
//                         onClick={() =>
//                           openModal("Full Blog Content", blog.blogContent)
//                         }
//                       >
//                         Read More
//                       </button>
//                     )}
//                   </td>

//                   {/* Status */}
//                   <td className="border-2 border-gray-300 text-center text-base font-bold px-2 py-2">
//                     <span className="text-green-500">Published</span>
//                   </td>

//                   {/* Date */}
//                   <td className="border border-gray-300 px-2 py-2">
//                     {new Date(blog.datePublished).toLocaleDateString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-between items-center mt-4">
//           <span>
//             Showing{" "}
//             {Math.min((currentPage - 1) * entriesPerPage + 1, totalEntries)} to{" "}
//             {Math.min(currentPage * entriesPerPage, totalEntries)} of{" "}
//             {totalEntries} entries
//           </span>
//           <div className="flex items-center space-x-2">
//             <button
//               className={`px-3 py-1 border rounded ${currentPage === 1 ? "text-gray-400" : "text-black"
//                 }`}
//               onClick={handlePreviousPage}
//               disabled={currentPage === 1}
//             >
//               &lt;
//             </button>
//             <span>{currentPage}</span>
//             <button
//               className={`px-3 py-1 border rounded ${currentPage === Math.ceil(totalEntries / entriesPerPage)
//                   ? "text-gray-400"
//                   : "text-black"
//                 }`}
//               onClick={handleNextPage}
//               disabled={
//                 currentPage === Math.ceil(totalEntries / entriesPerPage)
//               }
//             >
//               &gt;
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//           onClick={closeModal}
//         >
//           <div
//             className="bg-white rounded-lg p-6 w-11/12 sm:w-3/4 md:w-2/5 lg:w-1/3 xl:w-1/4 max-h-[80vh] overflow-y-auto"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h2 className="text-xl font-bold mb-4">{modalTitle}</h2>
//             <div
//               className="text-sm"
//               dangerouslySetInnerHTML={{ __html: modalContent }}
//             />
//             <button
//               className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
//               onClick={closeModal}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import useMatchingUploadedBlog from "@/hooks/useMatchingUploadedBlog";
import usePublishedBlogs from "@/hooks/usePublishedBlogs";
import Image from "next/image";
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa"; // Added icons for pagination and search

export default function AllBlogs() {
  const { publishedBlogs, loading, error } = usePublishedBlogs();
  const { matchedStudentUploadedBlogs } = useMatchingUploadedBlog(); // Assuming this is the data source for the table

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchText, setSearchText] = useState("");

  // Modal state
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [showModal, setShowModal] = useState(false);

  const entriesPerPage = 10; // Changed to 10 for standard table view

  if (loading) return <div className="flex justify-center items-center h-48"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div><p className="ml-4 text-lg text-gray-600">Loading Blogs...</p></div>;
  if (error) return <p className="text-center p-6 text-xl font-medium text-red-600">❌ Error: {error}</p>;

  // Filter + paginate (using a placeholder array for demonstration if publishedBlogs is empty)
  const allBlogs = matchedStudentUploadedBlogs || []; // Use the matched blogs data
  
  const filteredBlogs = allBlogs.filter((blog) => {
    // Note: I'm assuming 'status' and 'title' properties exist on your blog objects
    const blogStatus = blog.status || 'Unknown'; // Fallback for status
    const blogTitle = blog.title || ''; // Fallback for title for search
    
    const matchesFilter =
      selectedFilter === "All" || blogStatus.toLowerCase() === selectedFilter.toLowerCase();
    
    // Search now checks note and category as well, for better UX
    const matchesSearch = blogTitle.toLowerCase().includes(searchText.toLowerCase()) || 
                          blog.category.toLowerCase().includes(searchText.toLowerCase()) ||
                          blog.note.toLowerCase().includes(searchText.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const totalEntries = filteredBlogs.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const openModal = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalTitle("");
    setModalContent(null);
  };

  const truncateText = (text, wordLimit = 10) => { // Reduced word limit for cleaner cells
    // Safely convert potential HTML content to plain text before truncation
    const plainText = text ? text.replace(/<[^>]+>/g, "") : '';
    const words = plainText.split(/\s+/); // Split by one or more whitespace
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : plainText;
  };
  
  // Helper to determine status color and text
  const getStatusDisplay = (status) => {
    switch (status?.toLowerCase()) {
      case "published":
      case "approved":
        return { text: "Approved", color: "text-green-600", bg: "bg-green-100" };
      case "denied":
        return { text: "Denied", color: "text-red-600", bg: "bg-red-100" };
      case "pending":
      default:
        return { text: "Pending", color: "text-yellow-600", bg: "bg-yellow-100" };
    }
  };


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="w-full max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        
        {/* Header, Filters & Search */}
        <div className="mb-6 border-b pb-4">
          <h1 className="text-3xl font-extrabold text-gray-800"> Blog Management Dashboard</h1>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center mb-6 space-y-4 lg:space-y-0">
          
          {/* Filter Buttons */}
          <div className="flex space-x-2 p-1 bg-gray-100 rounded-lg shadow-inner">
            {["All", "Approved", "Denied"].map((filter) => (
              <button
                key={filter}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition duration-200 ease-in-out ${
                  selectedFilter === filter
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-white"
                }`}
                onClick={() => {
                  setSelectedFilter(filter);
                  setCurrentPage(1); // Reset page on filter change
                }}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <input
              type="text"
              placeholder="Search by Title, Category, or Note..."
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setCurrentPage(1); // Reset page on search
              }}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Image</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[150px]">Note</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[250px]">Content Snippet</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[120px]">Date Published</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedBlogs.length > 0 ? (
                paginatedBlogs.map((blog) => {
                  const statusDisplay = getStatusDisplay(blog.status);
                  return (
                    <tr key={blog.id} className="hover:bg-blue-50 transition duration-150">
                      {/* Image */}
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-start">
                          <Image
                            width={64}
                            height={64}
                            src={blog.featuredImage || '/placeholder-image.png'} // Added fallback image
                            alt="Blog Thumbnail"
                            className="w-16 h-16 object-cover rounded-md shadow-sm border border-gray-100"
                          />
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-3 text-sm text-gray-700">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                            {blog.category}
                        </span>
                      </td>

                      {/* Note */}
                      <td className="px-4 py-3 text-sm text-gray-600 max-w-xs">
                        <p className="line-clamp-2">{truncateText(blog.note, 10)}</p>
                        {blog.note && blog.note.split(" ").length > 10 && (
                          <button
                            className="text-blue-600 hover:text-blue-800 text-xs font-medium mt-1"
                            onClick={() => openModal("Full Note", blog.note)}
                          >
                            Read More
                          </button>
                        )}
                      </td>

                      {/* Blog Content Snippet */}
                      <td className="px-4 py-3 text-xs text-gray-600 max-w-xs">
                        <p className="line-clamp-2">{truncateText(blog.blogContent, 15)}</p>
                        {blog.blogContent && blog.blogContent.replace(/<[^>]+>/g, "").split(" ").length > 15 && (
                          <button
                            className="text-blue-600 hover:text-blue-800 text-xs font-medium mt-1"
                            onClick={() => openModal("Full Blog Content", blog.blogContent)}
                          >
                            View Content
                          </button>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold leading-5 rounded-full ${statusDisplay.bg} ${statusDisplay.color}`}>
                          {statusDisplay.text}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                        {blog.datePublished ? new Date(blog.datePublished).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                    <td colSpan="6" className="px-4 py-8 text-center text-lg text-gray-500">
                        No blogs match the current filters or search criteria.
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination & Summary */}
        <div className="flex justify-between items-center mt-6 py-3 border-t border-gray-200">
          <span className="text-sm text-gray-600">
            Showing <span className="font-semibold">{Math.min((currentPage - 1) * entriesPerPage + 1, totalEntries)}</span> to{" "}
            <span className="font-semibold">{Math.min(currentPage * entriesPerPage, totalEntries)}</span> of{" "}
            <span className="font-semibold">{totalEntries}</span> total entries
          </span>
          <div className="flex items-center space-x-2">
            <button
              className={`p-2 border border-gray-300 rounded-lg transition duration-150 ${currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-100"}`}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              aria-label="Previous Page"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={`p-2 border border-gray-300 rounded-lg transition duration-150 ${currentPage === totalPages || totalPages === 0 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-100"}`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              aria-label="Next Page"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">{modalTitle}</h2>
            <div
              className="text-base text-gray-700 leading-relaxed space-y-3"
              dangerouslySetInnerHTML={{ __html: modalContent }}
            />
            <button
              className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition duration-200 shadow-md"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}