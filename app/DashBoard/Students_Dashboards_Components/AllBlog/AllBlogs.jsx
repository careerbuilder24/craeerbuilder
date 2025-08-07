import useMatchingUploadedBlog from "@/hooks/useMatchingUploadedBlog";
import usePublishedBlogs from "@/hooks/usePublishedBlogs";
import Image from "next/image";
import React, { useState } from "react";

export default function AllBlogs() {
  const { publishedBlogs, loading, error } = usePublishedBlogs();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchText, setSearchText] = useState("");
  const { matchedStudentUploadedBlogs } = useMatchingUploadedBlog();

  console.log(matchedStudentUploadedBlogs)
  const entriesPerPage = 13;

  if (loading) return <p className="text-center p-4">Loading Blogs...</p>;
  if (error) return <p className="text-center p-4 text-red-500">Error: {error}</p>;

  // Filter and Paginate Data
  const filteredBlogs = publishedBlogs.filter((blog) => {
    const matchesFilter =
      selectedFilter === "All" || blog.status === selectedFilter;
    const matchesSearch =
      blog.title.toLowerCase().includes(searchText.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const totalEntries = filteredBlogs.length;

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalEntries / entriesPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Filter & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-3xl font-bold mb-2 md:mb-0">All Blogs</h1>

        <div className="space-x-2 flex flex-wrap">
          {["All", "Approved", "Denied"].map((filter) => (
            <button
              key={filter}
              className={`px-4 py-2 rounded ${selectedFilter === filter
                ? "bg-[#17549A] text-white"
                : "bg-gray-200 text-black"
                }`}
              onClick={() => handleFilterChange(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mt-2 md:mt-0">
          <label className="mr-2">Search</label>
          <input
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            className="border py-2 px-3 rounded w-full md:w-auto"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-center text-sm">
          <thead className="bg-gray-100">
            <tr>
              {/* <th className="border border-gray-300 px-4 py-2">ID</th> */}
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">Note</th>
              <th className="border border-gray-300 px-4 py-2">Date Published</th>
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2 min-w-[250px]">
                Blog Content
              </th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {matchedStudentUploadedBlogs?.map((blog) => (
              <tr key={blog.id}>
                {/* <td className="border border-gray-300 px-2 py-2">{blog.id}</td> */}
                <td className="border border-gray-300 px-2 py-2">{blog.title}</td>
                <td className="border border-gray-300 px-2 py-2">{blog.category}</td>
                <td className="border border-gray-300 px-2 py-2 text-justify">{blog.note}</td>
                <td className="border border-gray-300 px-2 py-2">
                  {new Date(blog.datePublished).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <Image
                    width={400}
                    height={400}
                    src={blog.featuredImage}
                    alt="Blog Image"
                    className="w-16 h-16 object-cover mx-auto rounded"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-2 whitespace-pre-wrap max-w-xs overflow-x-auto text-left text-xs">
                  <div
                    dangerouslySetInnerHTML={{ __html: blog.blogContent }}
                  ></div>
                </td>
                {/* <td className="border border-gray-300 px-2 py-2 flex flex-col ">
                  <span className="text-green-500">Published</span>
                

                </td> */}
                <td className="border-2 border-gray-300 whitespace-pre-wrap max-w-xs overflow-x-auto text-center text-base font-bold px-2 py-2 ">
                  <span className="text-green-500">Published</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span>
          Showing {Math.min((currentPage - 1) * entriesPerPage + 1, totalEntries)} to{" "}
          {Math.min(currentPage * entriesPerPage, totalEntries)} of {totalEntries} entries
        </span>
        <div className="flex items-center space-x-2">
          <button
            className={`px-3 py-1 border rounded ${currentPage === 1 ? "text-gray-400" : "text-black"
              }`}
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <span>{currentPage}</span>
          <button
            className={`px-3 py-1 border rounded ${currentPage === Math.ceil(totalEntries / entriesPerPage)
              ? "text-gray-400"
              : "text-black"
              }`}
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(totalEntries / entriesPerPage)}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
