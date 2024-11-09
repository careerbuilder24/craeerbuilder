import React, { useState } from 'react';
import Image from 'next/image';
import img1 from '../../../../../assets/blogimg3.PNG';

import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function StudentsBlogs() {
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
    const shareUrl = "https://your-blog-post-url.com";
    return (
        <>
            <div className="flex flex-col md:flex-row lg:flex-row md:space-x-4">

                {/* First part */}
                <div className="flex flex-col w-full md:w-8/12 mt-5 mx-3">
                    <div className="mt-3">
                        <Image src={img1} alt="Blog Image" width={500} height={500} onDragStart={(e) => e.preventDefault()} className="w-full rounded-lg" />
                        <h2 className="my-4 font-bold">Modern Web Development</h2>
                        <p className="text-sm">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis ad, qui ut dolore voluptas
                            modi, sit quod sequi consequatur praesentium unde maxime nisi itaque soluta hic autem pariatur
                            dolor vitae.
                        </p>

                        {/* Share Buttons */}
                        <div className="flex space-x-4 mt-5 text-sm">
                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                            >
                                <FaFacebook size={20} />
                                <span>Share on Facebook</span>
                            </a>

                            <a
                                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800"
                            >
                                <FaLinkedin size={20} />
                                <span>Share on LinkedIn</span>
                            </a>

                            <a
                                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 bg-blue-400 text-white py-2 px-4 rounded-lg hover:bg-blue-500"
                            >
                                <FaTwitter size={20} />
                                <span>Share on Twitter</span>
                            </a>
                        </div>

                        {/* Comment Section */}
                        <div className="mt-10 mx-3">
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




                {/* Third part */}
                <div className="flex flex-col w-full md:w-5/12 mt-5 mx-3">
                    <div className="mt-3">

                        <h2 className="my-4 font-bold text-xl">Work & Life</h2>
                        <hr className="border-t-2 border-gray-800 shadow-lg my-4" />
                        <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis ad, qui ut dolore voluptas modi.</p>
                    </div>
                    <div className="mt-5">

                        <h2 className="my-4 font-bold text-xl">Related Content</h2>

                        <hr className="border-t-2 border-gray-800 shadow-lg my-4" />


                        <div className='grid grid-cols-2 gap-3'>
                            <p className="text-sm mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. .</p>
                            <Image onDragStart={(e) => e.preventDefault()} src={img1} width={100} height={100} className='w-full rounded-lg'></Image>
                        </div>

                        <div className='grid grid-cols-2 gap-3 mt-10'>
                            <p className="text-sm mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. .</p>
                            <Image onDragStart={(e) => e.preventDefault()} src={img1} width={100} height={100} className='w-full rounded-lg'></Image>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}
