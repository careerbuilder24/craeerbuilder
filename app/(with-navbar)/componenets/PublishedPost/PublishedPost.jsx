import usePublishedBlog from '@/hooks/usePublishedBlog';
import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import Swal from 'sweetalert2';

export default function PublishedPost() {
    const [modalContent, setModalContent] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { published, loading, error } = usePublishedBlog();
    const [posts, setPosts] = useState([]);

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);






    useEffect(() => {
        if (Array.isArray(published?.data)) {
            setPosts(published.data);
        }
    }, [published]);

    const getTruncatedText = (html, wordLimit = 10) => {
        const cleanHTML = DOMPurify.sanitize(html);
        const div = document.createElement('div');
        div.innerHTML = cleanHTML;
        const text = div.textContent || div.innerText || '';
        const words = text.split(/\s+/).slice(0, wordLimit).join(' ');
        return words + '...';
    };

    const getTruncatedHTML = (html, wordLimit = 5) => {
        const div = document.createElement('div');
        div.innerHTML = html;
        const text = div.textContent || div.innerText || '';
        const words = text.split(/\s+/).slice(0, wordLimit).join(' ');
        return words + '...';
    };

    const openModal = (content) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent('');
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch('/api/career_guide_Blog', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id }),
                });

                if (response.ok) {
                    Swal.fire('Deleted!', 'The post has been deleted.', 'success');
                    setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
                } else {
                    Swal.fire('Error!', 'Failed to delete the post.', 'error');
                }
            } catch (error) {
                Swal.fire('Error!', 'An error occurred while deleting.', 'error');
            }
        }
    };



    // edit modal trigger button
    const openEditModal = (post) => {
        setEditingPost(post);
        setEditModalOpen(true);
    };

    const openModalSocialLinks = (content, type = 'html') => {
        if (type === 'social') {
            const linksHtml = Object.entries(content)
                .map(([key, url]) => `<p><strong>${key}:</strong> <a href="${url}" target="_blank" class="text-blue-600 underline">${url}</a></p>`)
                .join('');
            setModalContent(linksHtml);
        } else {
            setModalContent(content);
        }
        setIsModalOpen(true);
    };


    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-28 w-28 border-t-4 border-blue-500 border-solid"></div>
            </div>
        );
    }


    // if (loading) return <p className='text-center'>Loading...</p>;
    if (error) return <p>Error loading posts: {error.message}</p>;

    return (
        <div className="flex justify-center items-center max-w-5xl container mx-auto">
            <div className="bg-white p-2 rounded-lg shadow-md w-full">
                <div className='text-center'>
                    <div className='flex justify-center items-center gap-5'>
                        <h2 className="text-xl font-semibold mb-1">Published All Posts</h2>
                        <span className='font-bold text-2xl text-[#f13030]'>{posts.length}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">All data of published posts</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-700">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2">Post Image</th>
                                <th className="px-4 py-2 text-center">Post Title</th>
                                <th className="px-4 py-2 text-center">Short Note</th>
                                <th className="px-4 py-2">Category</th>
                                <th className="px-4 py-2 text-center">Content</th>
                                <th className="px-4 py-2">Social Links</th>
                                <th className="px-4 py-2">Date Time</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        {/* Modal */}
                        {isModalOpen && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full relative">
                                    <button
                                        onClick={closeModal}
                                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
                                    >
                                        ×
                                    </button>
                                    <div className="text-gray-800 max-h-[60vh] overflow-y-auto">
                                        <div
                                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(modalContent) }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {editModalOpen && editingPost && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white p-6 rounded-lg w-full max-w-2xl relative">
                                    <button
                                        onClick={() => setEditModalOpen(false)}
                                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
                                    >
                                        ×
                                    </button>
                                    <h2 className="text-lg font-semibold mb-4">Edit Post</h2>
                                    <form
                                        onSubmit={async (e) => {
                                            e.preventDefault();
                                            try {
                                                const response = await fetch('/api/career_guide_Blog', {
                                                    method: 'PUT',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({
                                                        id: editingPost.id,
                                                        title: editingPost.title,
                                                        note: editingPost.note,
                                                        category: editingPost.category,
                                                        content: editingPost.content,
                                                        featuredImage: editingPost.featuredImage,
                                                        socialLinks: editingPost.socialLinks, // send as object
                                                    }),
                                                });

                                                const data = await response.json();

                                                if (data.success) {
                                                    Swal.fire('Updated!', 'Post has been updated.', 'success');
                                                    setPosts((prev) =>
                                                        prev.map((post) =>
                                                            post.id === editingPost.id ? editingPost : post
                                                        )
                                                    );
                                                    setEditModalOpen(false);
                                                } else {
                                                    Swal.fire('Error!', 'Failed to update post.', 'error');
                                                }
                                            } catch (error) {
                                                Swal.fire('Error!', 'Update failed.', 'error');
                                            }
                                        }}
                                    >
                                        <div className="mb-2">
                                            <label>Title:</label>
                                            <input
                                                className="w-full border px-2 py-1 rounded"
                                                value={editingPost.title}
                                                onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label>Note:</label>
                                            <textarea
                                                className="w-full border px-2 py-1 rounded"
                                                value={editingPost.note}
                                                onChange={(e) => setEditingPost({ ...editingPost, note: e.target.value })}
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label>Category:</label>
                                            <input
                                                className="w-full border px-2 py-1 rounded"
                                                value={editingPost.category}
                                                onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label>Content:</label>
                                            <textarea
                                                className="w-full border px-2 py-1 rounded"
                                                value={editingPost.content}
                                                onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label>Featured Image URL:</label>
                                            <input
                                                className="w-full border px-2 py-1 rounded"
                                                value={editingPost.featuredImage}
                                                onChange={(e) => setEditingPost({ ...editingPost, featuredImage: e.target.value })}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label>Social Links</label>
                                            <input
                                                className="w-full border px-2 py-1 rounded"
                                                value={JSON.stringify(editingPost.socialLinks)}
                                                onChange={(e) => {
                                                    try {
                                                        const parsedLinks = JSON.parse(e.target.value || '{}');
                                                        setEditingPost({ ...editingPost, socialLinks: parsedLinks });
                                                    } catch (error) {
                                                        console.log('error', error)
                                                        // Optional: Show error or ignore until correct format
                                                    }
                                                }}
                                            />
                                        </div>

                                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                                            Update
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}
                        <tbody>
                            {posts.map((post) => (
                                <tr key={post.id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-2">
                                        <img
                                            src={post.featuredImage}
                                            alt="Post"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    </td>
                                    <td className="px-4 py-2 border text-center">{post.title}</td>

                                    <td className="px-4 py-2 border">
                                        {getTruncatedText(post.note)}
                                        <button
                                            onClick={() => openModal(post.note)}
                                            className="text-blue-600 underline ml-2"
                                        >
                                            See more
                                        </button>
                                    </td>

                                    <td className="px-4 py-2 border">{post.category}</td>

                                    <td className="px-4 py-2 flex flex-row items-start gap-1">
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(getTruncatedHTML(post.content)),
                                            }}
                                        />
                                        <button
                                            onClick={() => openModal(post.content)}
                                            className="text-blue-600 underline"
                                        >
                                            See more
                                        </button>
                                    </td>

                                    <td className="px-4 py-2 border text-center">
                                        <button
                                            onClick={() => openModalSocialLinks(post.socialLinks, 'social')}
                                            className="text-blue-600 underline"
                                        >
                                            View
                                        </button>
                                    </td>

                                    <td className="px-4 py-2">{post.created_at}</td>

                                    <td className="px-4 py-2 border text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="mt-1 flex gap-2">
                                                <button
                                                    onClick={() => openEditModal(post)}
                                                    className="bg-[#17549A] text-white px-2 py-1 rounded text-xs hover:bg-[#388ff1]"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(post.id)}
                                                    className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* <div className="flex justify-end mt-4">
                    <button className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100">
                        View All Posts
                    </button>
                </div> */}
            </div>
        </div>
    );
}
