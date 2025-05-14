import React, { useState } from 'react';
import Image from 'next/image';
import img1 from '../../../../../assets/blogimg3.PNG';
import img2 from '../../../../../assets/blogimg2.PNG';
import img3 from '../../../../../assets/blogimg3.PNG';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function StudentsBlogs() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2; // Number of items per page

    // Example related content (replace with actual content)
    const relatedContent = [
        { img: img1, text: "Lorem ipsum dolor sit amet consectetur adipisicing elit sit amet consectetur adipisicing elit.", title: "Web Development 101" },
        { img: img1, text: "Lorem ipsum dolor sit amet consectetur adipisicing elit sit amet consectetur adipisicing elit.", title: "Advanced React Techniques" },
        { img: img2, text: "Lorem ipsum dolor sit amet consectetur adipisicing elit sit amet consectetur adipisicing elit.", title: "JavaScript Best Practices" },
        { img: img3, text: "Lorem ipsum dolor sit amet consectetur adipisicing elit sit amet consectetur adipisicing elit.", title: "Node.js for Beginners" },
        { img: img1, text: "Lorem ipsum dolor sit amet consectetur adipisicing elit sit amet consectetur adipisicing elit.", title: "CSS Grid and Flexbox" },
    ];

    // Selected content state
    const [selectedContent, setSelectedContent] = useState(relatedContent[0]);

    // Calculate the number of pages
    const totalPages = Math.ceil(relatedContent.length / itemsPerPage);

    // Get current items to display based on the page
    const currentItems = relatedContent.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const [comments, setComments] = useState([
        { id: 1, user: 'Sushmita Shen', text: 'Great article, really informative!' },
        { id: 2, user: 'Robert Jr', text: 'I learned a lot, thanks for sharing!' },
    ]);

    const [newComment, setNewComment] = useState('');

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim() !== '') {
            setComments([...comments, { id: comments.length + 1, user: 'Anonymous', text: newComment }]);
            setNewComment('');
        }
    };

    const shareUrl = "https://blog-post-url.com";

    // Function to handle click on related content
    const handleRelatedContentClick = (content) => {
        setSelectedContent(content);
    };

    return (
        <>
            <div className="flex flex-col md:flex-row lg:flex-row md:space-x-4">
                {/* First part - Blog content */}
                <div className="flex flex-col w-full md:w-9/12 mt-5 mx-3">
                    <div className="mt-3">
                        {/* Blog Content */}
                        <div>
                            <Image
                                src={selectedContent.img}
                                alt="Blog Image"
                                width={500}
                                height={500}
                                onDragStart={(e) => e.preventDefault()}
                                className="w-full rounded-lg"
                            />
                            <h2 className="my-4 font-bold">{selectedContent.title}</h2>
                            <p className="text-sm">{selectedContent.text}</p>
                        </div>

                        
                        {/* Share Buttons */}
                        <div className="flex flex-col gap-4 mt-5 text-sm sm:flex-row sm:space-x-4 sm:mt-6 w-6/12 lg:w-full sm:text-base">
                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
                            >
                                <FaFacebook size={20} />
                                <span className=" sm:inline">Share on Facebook</span>
                            </a>

                            <a
                                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 w-full sm:w-auto"
                            >
                                <FaLinkedin size={20} />
                                <span className=" sm:inline">Share on LinkedIn</span>
                            </a>

                            <a
                                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 bg-blue-400 text-white py-2 px-4 rounded-lg hover:bg-blue-500 w-full sm:w-auto"
                            >
                                <FaTwitter size={20} />
                                <span className=" sm:inline">Share on Twitter</span>
                            </a>
                        </div>


                        {/* Comment Section */}
                        <div className="mt-10 mx-3  mr-9">
                            <h3 className="text-xl font-bold">Comments</h3>
                            {/* Existing Comments */}
                            <div className="mt-4">
                                {comments.map((comment) => (
                                    <div key={comment.id} className="border-b pb-4 mb-4">
                                        <p className="font-semibold">{comment.user} says:</p>
                                        <p className="text-sm">{comment.text}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Comment Form */}
                            <form onSubmit={handleCommentSubmit} className="mt-5">
                                <textarea
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    rows="4"
                                    placeholder="Write your comment..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                ></textarea>
                                <button
                                    type="submit"
                                    className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Submit Comment
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Second part - Related Content */}
                <div className="flex flex-col w-full md:w-4/12 mt-5 mx-3">
                    <div className="mt-3">
                        <div className="mt-3">
                            <h2 className="my-4 font-bold text-xl">Work & Life</h2>
                            <hr className="border-t-2 border-gray-800 shadow-lg my-4" />
                            <p className="text-sm">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis ad, qui ut dolore voluptas
                                modi sit amet consectetur adipisicing elit. Perferendis ad, qui ut dolore voluptas modi sit amet
                                consectetur adipisicing elit. Perferendis ad, qui ut dolore voluptas modi.
                            </p>
                        </div>
                        <h2 className="my-4 font-bold text-xl">Related Content</h2>
                        <hr className="border-t-2 border-gray-800 shadow-lg my-4" />
                        <div className="grid grid-cols-1 gap-3">
                            {currentItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex flex-row gap-4 cursor-pointer"
                                    onClick={() => handleRelatedContentClick(item)} // Update the selected content when clicked
                                >
                                    <Image
                                        onDragStart={(e) => e.preventDefault()}
                                        src={item.img}
                                        width={100}
                                        height={100}
                                        className="w-full rounded-lg"
                                        alt='blog sub Image'
                                    />
                                    <p className="text-sm mt-4">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center mt-4">
                        <nav className="inline-flex items-center space-x-2">
                            {/* Left Arrow */}
                            <button
                                className="px-4 py-2 bg-[#0054A5] text-white hover:bg-[#2CAAE1] border rounded-md cursor-pointer"
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                &laquo; {/* Left arrow */}
                            </button>

                            {/* Page Numbers */}
                            {[...Array(totalPages).keys()].map((pageIndex) => (
                                <button
                                    key={pageIndex + 1}
                                    className={`px-4 py-2 bg-[#0054A5] text-white rounded-md hover:bg-[#2CAAE1] ${currentPage === pageIndex + 1 ? 'bg-blue-500 text-white' : ''}`}
                                    onClick={() => handlePageChange(pageIndex + 1)}
                                >
                                    {pageIndex + 1}
                                </button>
                            ))}

                            {/* Right Arrow */}
                            <button
                                className="px-4 py-2 bg-[#0054A5] text-white hover:bg-[#2CAAE1] border rounded-md cursor-pointer"
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                &raquo; {/* Right arrow */}
                            </button>
                        </nav>
                    </div>


                </div>
            </div>
        </>
    );
}
