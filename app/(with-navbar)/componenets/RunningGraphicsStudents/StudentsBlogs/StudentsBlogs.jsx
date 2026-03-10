// 'use client';
// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import ButtonTopMaker from '@/app/buttonTopMaker/ButtonTopMaker';
// import Chatbot from '../../chatBot/Chatbot';
// import { UserAuth } from '@/app/context/AuthContext';
// import useRegistered from '@/hooks/useRegistered';
// import usePublishedBlogs from '@/hooks/usePublishedBlogs';

// export default function StudentsBlogs({ student }) {
//     const { ManualUser } = UserAuth();
//     const [register] = useRegistered();
//     const [selectedBlog, setSelectedBlog] = useState(null);
//     const [comments, setComments] = useState([]);
//     const [newComment, setNewComment] = useState('');
//     const [loadingComments, setLoadingComments] = useState(false);

//     // For modal
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const { publishedBlogs, loading: loadingBlogs } = usePublishedBlogs();
//     const studentBlogs =
//         publishedBlogs?.filter((blog) => blog.email === student?.email) || [];

//     useEffect(() => {
//         if (!selectedBlog && studentBlogs.length > 0) {
//             setSelectedBlog(studentBlogs[0]);
//         }
//     }, [studentBlogs, selectedBlog]);

//     // Fetch comments
//     const fetchComments = async (blogId) => {
//         setLoadingComments(true);
//         try {
//             const { data } = await axios.get('/api/Students_Blog_comments');
//             if (data.success) {
//                 const validEmails = register?.data?.map((u) => u.email).filter(Boolean);
//                 const filtered = data.data.filter(
//                     (c) => Number(c.blogId) === Number(blogId) && validEmails.includes(c.email)
//                 );

//                 const commentMap = {};
//                 const rootComments = [];

//                 filtered.forEach((c) => {
//                     commentMap[c.id] = { ...c, replies: [] };
//                 });

//                 filtered.forEach((c) => {
//                     if (c.parentId && commentMap[c.parentId]) {
//                         commentMap[c.parentId].replies.push(commentMap[c.id]);
//                     } else if (!c.parentId) {
//                         rootComments.push(commentMap[c.id]);
//                     }
//                 });

//                 setComments(rootComments);
//             }
//         } catch (err) {
//             console.error('Error fetching comments:', err);
//         } finally {
//             setLoadingComments(false);
//         }
//     };

//     useEffect(() => {
//         if (selectedBlog?.id) {
//             fetchComments(selectedBlog.id);
//             setNewComment('');
//         }
//     }, [selectedBlog, register]);

//     // Comment submit
//     const handleCommentSubmit = async (e) => {
//         e.preventDefault();
//         if (!ManualUser) return Swal.fire('Login Required', 'You must log in to comment.', 'warning');
//         if (!newComment.trim()) return;

//         const userName = ManualUser.name || 'Anonymous';
//         const userEmail = ManualUser.email || 'anonymous@example.com';

//         try {
//             const { data } = await axios.post('/api/Students_Blog_comments', {
//                 user: userName,
//                 email: userEmail,
//                 text: newComment,
//                 blogId: selectedBlog.id,
//             });

//             if (data.success) {
//                 setComments((prev) => [
//                     ...prev,
//                     {
//                         id: data.insertId || prev.length + 1,
//                         user: userName,
//                         email: userEmail,
//                         text: newComment,
//                         blogId: selectedBlog.id,
//                         replies: [],
//                         created_at: new Date().toISOString(),
//                     },
//                 ]);
//                 setNewComment('');
//             } else {
//                 Swal.fire('Error', data.message, 'error');
//             }
//         } catch (err) {
//             console.error(err);
//             Swal.fire('Error', 'Something went wrong while posting comment.', 'error');
//         }
//     };

//     // Delete comment
//     const handleDeleteComment = async (id) => {
//         if (!ManualUser?.email) return;
//         try {
//             const { data } = await axios.delete(
//                 `/api/Students_Blog_comments?id=${id}&email=${ManualUser.email}`
//             );
//             if (data.success) {
//                 const deleteRecursive = (list) =>
//                     list.filter((c) => c.id !== id).map((c) => ({ ...c, replies: deleteRecursive(c.replies) }));
//                 setComments((prev) => deleteRecursive(prev));
//             } else Swal.fire('Error', data.message, 'error');
//         } catch (err) {
//             console.error(err);
//             Swal.fire('Error', 'Something went wrong while deleting.', 'error');
//         }
//     };

//     const Comment = ({ comment }) => {
//         const [replyText, setReplyText] = useState('');
//         const [showReplyBox, setShowReplyBox] = useState(false);

//         const handleReplySubmitLocal = async () => {
//             if (!ManualUser) return Swal.fire('Login Required', 'You must log in to reply.', 'warning');
//             if (!replyText.trim()) return;

//             const userName = ManualUser.name || 'Anonymous';
//             const userEmail = ManualUser.email || 'anonymous@example.com';
//             const tempId = `temp-${Date.now()}`;

//             try {
//                 const { data } = await axios.post('/api/Students_Blog_comments', {
//                     user: userName,
//                     email: userEmail,
//                     text: replyText,
//                     blogId: selectedBlog.id,
//                     parentId: comment.id,
//                 });

//                 if (data.success) {
//                     const addReply = (list) =>
//                         list.map((c) => {
//                             if (c.id === comment.id) {
//                                 return {
//                                     ...c,
//                                     replies: [
//                                         ...c.replies,
//                                         {
//                                             id: data.insertId || tempId,
//                                             user: userName,
//                                             email: userEmail,
//                                             text: replyText,
//                                             created_at: new Date().toISOString(),
//                                             replies: [],
//                                         },
//                                     ],
//                                 };
//                             }
//                             return { ...c, replies: addReply(c.replies) };
//                         });

//                     setComments((prev) => addReply(prev));
//                     setReplyText('');
//                     setShowReplyBox(true);
//                 }
//             } catch (err) {
//                 console.error(err);
//                 Swal.fire('Error', 'Something went wrong while posting reply.', 'error');
//             }
//         };

//         return (
//             <div className="border-b pb-4 mb-4">
//                 <div className="flex justify-between items-center">
//                     <p className="font-semibold">{comment.user}</p>
//                     {comment.email === ManualUser?.email && (
//                         <button
//                             onClick={() => handleDeleteComment(comment.id)}
//                             className="text-xs text-red-500 hover:underline"
//                         >
//                             Delete
//                         </button>
//                     )}
//                 </div>
//                 <p className="text-sm">{comment.text}</p>
//                 <p className="text-xs text-gray-500">
//                     {comment.created_at ? new Date(comment.created_at).toLocaleString() : ''}
//                 </p>
//             </div>
//         );
//     };

//     if (loadingBlogs) {
//         return (
//             <div className="flex justify-center items-center h-64">
//                 <p className="text-xl font-semibold">Loading...</p>
//             </div>
//         );
//     }

//     return (
//         <>
//             <ButtonTopMaker />
//             <div className="flex flex-col md:flex-row lg:flex-row md:space-x-4 shadow-2xl">
//                 {/* Blog content */}
//                 <div className="flex flex-col w-full md:w-9/12 mt-5 mx-3">
//                     {selectedBlog ? (
//                         <>
//                             {selectedBlog.featuredImage && (
//                                 <div>
//                                     <Image
//                                         src={selectedBlog.featuredImage}
//                                         alt="Blog Image"
//                                         width={500}
//                                         height={500}
//                                         className="w-full rounded-lg cursor-pointer"
//                                         onClick={() => setIsModalOpen(true)}
//                                     />
//                                 </div>
//                             )}

//                             <h2 className="my-4 font-bold text-2xl">{selectedBlog.title}</h2>
//                             <p className="text-xs text-gray-500 mb-2">
//                                 {selectedBlog.datePublished
//                                     ? new Date(selectedBlog.datePublished).toLocaleDateString()
//                                     : ''}{' '}
//                                 | {selectedBlog.category}
//                             </p>
//                             <div
//                                 className="text-sm prose max-w-none text-justify"
//                                 dangerouslySetInnerHTML={{ __html: selectedBlog.blogContent }}
//                             />

//                             <div className="mt-10 mx-3 mr-9">
//                                 <h3 className="text-xl font-bold">Comments</h3>
//                                 {loadingComments ? (
//                                     <p className="text-sm text-gray-500">Loading comments...</p>
//                                 ) : comments.length === 0 ? (
//                                     <p className="text-sm text-gray-500">No comments yet.</p>
//                                 ) : (
//                                     comments.map((comment) => <Comment key={comment.id} comment={comment} />)
//                                 )}

//                                 <form onSubmit={handleCommentSubmit} className="mt-5">
//                                     <textarea
//                                         className="w-full p-3 border border-gray-300 rounded-lg"
//                                         rows={4}
//                                         placeholder="Write your comment..."
//                                         value={newComment}
//                                         onChange={(e) => setNewComment(e.target.value)}
//                                     />
//                                     <button
//                                         type="submit"
//                                         className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//                                     >
//                                         Submit Comment
//                                     </button>
//                                 </form>
//                             </div>
//                         </>
//                     ) : (
//                         <p className="text-center text-gray-500">Select a blog to view</p>
//                     )}
//                 </div>

//                 {/* Sidebar */}
//                 <div className="flex flex-col w-full md:w-4/12 mt-5 mx-3">
//                     <h2 className="my-4 font-bold text-xl">Other Blogs</h2>
//                     <div className="grid grid-cols-1 gap-3">
//                         {studentBlogs.map((blog) => {
//                             const isSelected = selectedBlog?.id === blog.id;
//                             return (
//                                 <div
//                                     key={blog.id}
//                                     className={`flex flex-col gap-4 cursor-pointer p-2 rounded ${isSelected ? 'bg-blue-100' : ''
//                                         }`}
//                                     onClick={() => setSelectedBlog(blog)}
//                                 >
//                                     {blog.featuredImage && (
//                                         <Image
//                                             src={blog.featuredImage}
//                                             width={100}
//                                             height={100}
//                                             className="w-full lg:w-10/12 rounded-lg"
//                                             alt="blog sub Image"
//                                         />
//                                     )}
//                                     <div>
//                                         <p className="font-semibold">{blog.title}</p>
//                                         <p className="text-xs text-gray-500">{blog.category}</p>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>
//             </div>

//             {/* Modal for blog image */}
//             {/* Modal for blog image */}
//             {isModalOpen && (
//                 <div
//                     className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
//                     onClick={() => setIsModalOpen(false)} // close if background clicked
//                 >
//                     <div
//                         className="relative max-w-3xl w-full p-4"
//                         onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
//                     >
//                         <button
//                             onClick={() => setIsModalOpen(false)}
//                             className="absolute top-2 right-2 text-white text-2xl font-bold"
//                         >
//                             ✕
//                         </button>
//                         <Image
//                             src={selectedBlog.featuredImage}
//                             alt="Blog Modal Image"
//                             width={800}
//                             height={800}
//                             className="w-full max-h-[80vh] object-contain rounded-lg"
//                         />
//                     </div>
//                 </div>
//             )}


//             <Chatbot />
//         </>
//     );
// }
'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Swal from 'sweetalert2';
import ButtonTopMaker from '@/app/buttonTopMaker/ButtonTopMaker';
import Chatbot from '../../chatBot/Chatbot';
import { UserAuth } from '@/app/context/AuthContext';
import useRegistered from '@/hooks/useRegistered';
import usePublishedBlogs from '@/hooks/usePublishedBlogs';
import useStudentEditProfile from '@/hooks/useStudentEditProfile';

export default function StudentsBlogs({ student }) {
    const { ManualUser } = UserAuth();
    const [register] = useRegistered();
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loadingComments, setLoadingComments] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const { publishedBlogs, loading: loadingBlogs } = usePublishedBlogs();
    const [studentEditProfile] = useStudentEditProfile();

    // Find current student data
    const studentData = useMemo(() => {
        if (!studentEditProfile?.data || !student) return null;
        return studentEditProfile.data.find(
            s =>
                s.id === student.id ||
                s.email?.trim()?.toLowerCase() === student.email?.trim()?.toLowerCase()
        );
    }, [studentEditProfile, student]);

    // Determine if access is restricted
    const isRestricted = !studentData || studentData.status !== 'accepted';

    // Filter blogs for this student
    const studentBlogs = useMemo(() => {
        if (!publishedBlogs) return [];
        return publishedBlogs.filter((blog) => blog.email === student?.email);
    }, [publishedBlogs, student]);

    useEffect(() => {
        if (!selectedBlog && studentBlogs.length > 0) {
            setSelectedBlog(studentBlogs[0]);
        }
    }, [studentBlogs, selectedBlog]);

    // Fetch comments
    const fetchComments = async (blogId) => {
        setLoadingComments(true);
        try {
            const { data } = await axios.get('/api/Students_Blog_comments');
            if (data.success) {
                const validEmails = register?.data?.map((u) => u.email).filter(Boolean);
                const filtered = data.data.filter(
                    (c) => Number(c.blogId) === Number(blogId) && validEmails.includes(c.email)
                );

                const commentMap = {};
                const rootComments = [];

                filtered.forEach((c) => {
                    commentMap[c.id] = { ...c, replies: [] };
                });

                filtered.forEach((c) => {
                    if (c.parentId && commentMap[c.parentId]) {
                        commentMap[c.parentId].replies.push(commentMap[c.id]);
                    } else if (!c.parentId) {
                        rootComments.push(commentMap[c.id]);
                    }
                });

                setComments(rootComments);
            }
        } catch (err) {
            console.error('Error fetching comments:', err);
        } finally {
            setLoadingComments(false);
        }
    };

    useEffect(() => {
        if (selectedBlog?.id) {
            fetchComments(selectedBlog.id);
            setNewComment('');
        }
    }, [selectedBlog, register]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!ManualUser) return Swal.fire('Login Required', 'You must log in to comment.', 'warning');
        if (!newComment.trim()) return;

        const userName = ManualUser.name || 'Anonymous';
        const userEmail = ManualUser.email || 'anonymous@example.com';

        try {
            const { data } = await axios.post('/api/Students_Blog_comments', {
                user: userName,
                email: userEmail,
                text: newComment,
                blogId: selectedBlog.id,
            });

            if (data.success) {
                setComments((prev) => [
                    ...prev,
                    {
                        id: data.insertId || prev.length + 1,
                        user: userName,
                        email: userEmail,
                        text: newComment,
                        blogId: selectedBlog.id,
                        replies: [],
                        created_at: new Date().toISOString(),
                    },
                ]);
                setNewComment('');
            } else {
                Swal.fire('Error', data.message, 'error');
            }
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'Something went wrong while posting comment.', 'error');
        }
    };

    const handleDeleteComment = async (id) => {
        if (!ManualUser?.email) return;
        try {
            const { data } = await axios.delete(
                `/api/Students_Blog_comments?id=${id}&email=${ManualUser.email}`
            );
            if (data.success) {
                const deleteRecursive = (list) =>
                    list.filter((c) => c.id !== id).map((c) => ({ ...c, replies: deleteRecursive(c.replies) }));
                setComments((prev) => deleteRecursive(prev));
            } else Swal.fire('Error', data.message, 'error');
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'Something went wrong while deleting.', 'error');
        }
    };

    const Comment = ({ comment }) => {
        const [replyText, setReplyText] = useState('');
        const [showReplyBox, setShowReplyBox] = useState(false);

        const handleReplySubmitLocal = async () => {
            if (!ManualUser) return Swal.fire('Login Required', 'You must log in to reply.', 'warning');
            if (!replyText.trim()) return;

            const userName = ManualUser.name || 'Anonymous';
            const userEmail = ManualUser.email || 'anonymous@example.com';
            const tempId = `temp-${Date.now()}`;

            try {
                const { data } = await axios.post('/api/Students_Blog_comments', {
                    user: userName,
                    email: userEmail,
                    text: replyText,
                    blogId: selectedBlog.id,
                    parentId: comment.id,
                });

                if (data.success) {
                    const addReply = (list) =>
                        list.map((c) => {
                            if (c.id === comment.id) {
                                return {
                                    ...c,
                                    replies: [
                                        ...c.replies,
                                        {
                                            id: data.insertId || tempId,
                                            user: userName,
                                            email: userEmail,
                                            text: replyText,
                                            created_at: new Date().toISOString(),
                                            replies: [],
                                        },
                                    ],
                                };
                            }
                            return { ...c, replies: addReply(c.replies) };
                        });

                    setComments((prev) => addReply(prev));
                    setReplyText('');
                    setShowReplyBox(true);
                }
            } catch (err) {
                console.error(err);
                Swal.fire('Error', 'Something went wrong while posting reply.', 'error');
            }
        };

        return (
            <div className="border-b pb-4 mb-4">
                <div className="flex justify-between items-center">
                    <p className="font-semibold">{comment.user}</p>
                    {comment.email === ManualUser?.email && (
                        <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="text-xs text-red-500 hover:underline"
                        >
                            Delete
                        </button>
                    )}
                </div>
                <p className="text-sm">{comment.text}</p>
                <p className="text-xs text-gray-500">
                    {comment.created_at ? new Date(comment.created_at).toLocaleString() : ''}
                </p>
            </div>
        );
    };

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
    if (isRestricted) {
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
                    <h2 className="text-2xl font-semibold text-gray-800">Access Restricted</h2>
                    <p className="text-gray-600 mt-2">
                        This student's blogs are only visible after admin approval.
                    </p>
                    <p className="text-gray-500 mt-1">
                        (Status: {studentData?.status || 'pending'})
                    </p>
                </div>
            </div>
        );
    }

    // --- Main Blog Content ---
    return (
        <>
            <ButtonTopMaker />
            <div className="flex flex-col md:flex-row lg:flex-row md:space-x-4 shadow-2xl">
                {/* Blog content */}
                <div className="flex flex-col w-full md:w-9/12 mt-5 mx-3">
                    {selectedBlog ? (
                        <>
                            {selectedBlog.featuredImage && (
                                <div>
                                    <Image
                                        src={selectedBlog.featuredImage}
                                        alt="Blog Image"
                                        width={500}
                                        height={500}
                                        className="w-full rounded-lg cursor-pointer"
                                        onClick={() => setIsModalOpen(true)}
                                    />
                                </div>
                            )}

                            <h2 className="my-4 font-bold text-2xl">{selectedBlog.title}</h2>
                            <p className="text-xs text-gray-500 mb-2">
                                {selectedBlog.datePublished
                                    ? new Date(selectedBlog.datePublished).toLocaleDateString()
                                    : ''}{' '}
                                | {selectedBlog.category}
                            </p>
                            <div
                                className="text-sm prose max-w-none text-justify"
                                dangerouslySetInnerHTML={{ __html: selectedBlog.blogContent }}
                            />

                            <div className="mt-10 mx-3 mr-9">
                                <h3 className="text-xl font-bold">Comments</h3>
                                {loadingComments ? (
                                    <p className="text-sm text-gray-500">Loading comments...</p>
                                ) : comments.length === 0 ? (
                                    <p className="text-sm text-gray-500">No comments yet.</p>
                                ) : (
                                    comments.map((comment) => <Comment key={comment.id} comment={comment} />)
                                )}

                                <form onSubmit={handleCommentSubmit} className="mt-5">
                                    <textarea
                                        className="w-full p-3 border border-gray-300 rounded-lg"
                                        rows={4}
                                        placeholder="Write your comment..."
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                    />
                                    <button
                                        type="submit"
                                        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                    >
                                        Submit Comment
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-gray-500">Select a blog to view</p>
                    )}
                </div>

                {/* Sidebar */}
                <div className="flex flex-col w-full md:w-4/12 mt-5 mx-3">
                    <h2 className="my-4 font-bold text-xl">Other Blogs</h2>
                    <div className="grid grid-cols-1 gap-3">
                        {studentBlogs.map((blog) => {
                            const isSelected = selectedBlog?.id === blog.id;
                            return (
                                <div
                                    key={blog.id}
                                    className={`flex flex-col gap-4 cursor-pointer p-2 rounded ${isSelected ? 'bg-blue-100' : ''
                                        }`}
                                    onClick={() => setSelectedBlog(blog)}
                                >
                                    {blog.featuredImage && (
                                        <Image
                                            src={blog.featuredImage}
                                            width={100}
                                            height={100}
                                            className="w-full lg:w-10/12 rounded-lg"
                                            alt="blog sub Image"
                                        />
                                    )}
                                    <div>
                                        <p className="font-semibold">{blog.title}</p>
                                        <p className="text-xs text-gray-500">{blog.category}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Modal for blog image */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="relative max-w-3xl w-full p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-2 right-2 text-white text-2xl font-bold"
                        >
                            ✕
                        </button>
                        <Image
                            src={selectedBlog.featuredImage}
                            alt="Blog Modal Image"
                            width={800}
                            height={800}
                            className="w-full max-h-[80vh] object-contain rounded-lg"
                        />
                    </div>
                </div>
            )}

            <Chatbot />
        </>
    );
}
