import React, { useState } from "react";

// Mock Data for Blogs
const mockBlogs = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  title: `Blog Title ${index + 1}`,
  category: `Category ${index + 1}`,
  uvTv: index % 2 === 0 ? "UV" : "TV",
  status: index % 2 === 0 ? "Approved" : "Denied",
  type: index % 3 === 0 ? "Published" : "Draft",
}));

export default function AllBlogs() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchText, setSearchText] = useState("");
  const entriesPerPage = 10;

  // Filter and Paginate Data
  const filteredBlogs = mockBlogs.filter((blog) => {
    const matchesFilter =
      selectedFilter === "All" || blog.type === selectedFilter;
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
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  return (
    <div className="container mx-auto p-4">
      {/* Buttons and Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-3xl font-bold mb-2 md:mb-0">All Blogs</h1>
        <div className="space-x-2 flex flex-wrap">
          <button
            className={`px-4 py-2 rounded ${
              selectedFilter === "All"
                ? "bg-[#17549A] text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => handleFilterChange("All")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded ${
              selectedFilter === "Published"
                ? "bg-[#17549A] text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => handleFilterChange("Published")}
          >
            Published
          </button>
          <button
            className={`px-4 py-2 rounded ${
              selectedFilter === "Draft"
                ? "bg-[#17549A] text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => handleFilterChange("Draft")}
          >
            Draft
          </button>
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
        <table className="w-full border-collapse border border-gray-300 text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">UV / TV</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBlogs.map((blog) => (
              <tr key={blog.id}>
                <td className="border border-gray-300 px-4 py-2 align-middle">
                  {blog.title}
                </td>
                <td className="border border-gray-300 px-4 py-2 align-middle">
                  {blog.category}
                </td>
                <td className="border border-gray-300 px-4 py-2 align-middle">
                  {blog.uvTv}
                </td>
                <td className="border border-gray-300 px-4 py-2 align-middle">
                  {blog.status === "Approved" ? (
                    <span className="text-green-500">{blog.status}</span>
                  ) : (
                    <span className="text-red-500">{blog.status}</span>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2 align-middle">
                  <button className="p-2">...</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span>
          Showing{" "}
          {Math.min(
            (currentPage - 1) * entriesPerPage + 1,
            totalEntries
          )}{" "}
          to {Math.min(currentPage * entriesPerPage, totalEntries)} of{" "}
          {totalEntries} entries
        </span>
        <div className="flex items-center space-x-2">
          <button
            className={`px-3 py-1 border rounded ${
              currentPage === 1 ? "text-gray-400" : "text-black"
            }`}
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <span>{currentPage}</span>
          <button
            className={`px-3 py-1 border rounded ${
              currentPage === Math.ceil(totalEntries / entriesPerPage)
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
