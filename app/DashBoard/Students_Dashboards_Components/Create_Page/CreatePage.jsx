'use client';
import React, { useState, useEffect } from 'react';

export default function Create_Page() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [pageType, setPageType] = useState('blog');
  const [status, setStatus] = useState('draft');
  const [successMessage, setSuccessMessage] = useState('');

  // Generate slug when title changes
  useEffect(() => {
    const generatedSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setSlug(generatedSlug);
  }, [title]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPage = {
      title,
      slug,
      content,
      category,
      pageType,
      status,
    };

    console.log('Saving Page:', newPage);
    // TODO: Send to backend via fetch/axios

    setSuccessMessage(' Page created successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700"> Create New Page</h1>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 text-center">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your page title"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Slug</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded bg-gray-100"
            value={slug}
            readOnly
          />
        </div>

        <div>
          <label className="block font-medium">Category</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., Tech, Education"
          />
        </div>

        <div>
          <label className="block font-medium">Page Type</label>
          <select
            className="w-full border px-4 py-2 rounded"
            value={pageType}
            onChange={(e) => setPageType(e.target.value)}
          >
            <option value="blog">Blog</option>
            <option value="static">Static Page</option>
            <option value="faq">FAQ</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Content</label>
          <textarea
            className="w-full border px-4 py-2 rounded h-32"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your content here..."
            required
          />
        </div>

        <div>
          <label className="block font-medium">Status</label>
          <div className="flex gap-6 mt-1">
            <label>
              <input
                type="radio"
                name="status"
                value="published"
                checked={status === 'published'}
                onChange={() => setStatus('published')}
              />{' '}
              Publish
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="draft"
                checked={status === 'draft'}
                onChange={() => setStatus('draft')}
              />{' '}
              Save as Draft
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Save Page
        </button>
      </form>

      {/* Live Preview */}
      <div className="mt-10 border-t pt-6">
        <h2 className="text-xl font-bold mb-2 text-gray-700"> Live Preview</h2>
        <div className="bg-gray-50 p-4 rounded border">
          <h3 className="text-xl font-semibold">{title || 'Page Title Preview'}</h3>
          <p className="text-gray-600 mt-2 whitespace-pre-wrap">{content || 'Your content will appear here.'}</p>
        </div>
      </div>
    </div>
  );
}
