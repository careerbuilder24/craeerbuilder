// 'use client';
// import React, { useState, useEffect } from 'react';

// export default function Create_Page() {
//   const [title, setTitle] = useState('');
//   const [slug, setSlug] = useState('');
//   const [content, setContent] = useState('');
//   const [category, setCategory] = useState('');
//   const [pageType, setPageType] = useState('blog');
//   const [status, setStatus] = useState('draft');
//   const [successMessage, setSuccessMessage] = useState('');

//   // Generate slug when title changes
//   useEffect(() => {
//     const generatedSlug = title
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, '-')
//       .replace(/(^-|-$)+/g, '');
//     setSlug(generatedSlug);
//   }, [title]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newPage = {
//       title,
//       slug,
//       content,
//       category,
//       pageType,
//       status,
//     };

//     console.log('Saving Page:', newPage);
//     // TODO: Send to backend via fetch/axios

//     setSuccessMessage(' Page created successfully!');
//     setTimeout(() => setSuccessMessage(''), 3000);
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
//       <h1 className="text-3xl font-bold mb-6 text-center text-blue-700"> Create New Page</h1>

//       {successMessage && (
//         <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 text-center">
//           {successMessage}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-5">
//         <div>
//           <label className="block font-medium">Title</label>
//           <input
//             type="text"
//             className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Enter your page title"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Slug</label>
//           <input
//             type="text"
//             className="w-full border px-4 py-2 rounded bg-gray-100"
//             value={slug}
//             readOnly
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Category</label>
//           <input
//             type="text"
//             className="w-full border px-4 py-2 rounded"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             placeholder="e.g., Tech, Education"
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Page Type</label>
//           <select
//             className="w-full border px-4 py-2 rounded"
//             value={pageType}
//             onChange={(e) => setPageType(e.target.value)}
//           >
//             <option value="blog">Blog</option>
//             <option value="static">Static Page</option>
//             <option value="faq">FAQ</option>
//           </select>
//         </div>

//         <div>
//           <label className="block font-medium">Content</label>
//           <textarea
//             className="w-full border px-4 py-2 rounded h-32"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             placeholder="Write your content here..."
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Status</label>
//           <div className="flex gap-6 mt-1">
//             <label>
//               <input
//                 type="radio"
//                 name="status"
//                 value="published"
//                 checked={status === 'published'}
//                 onChange={() => setStatus('published')}
//               />{' '}
//               Publish
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="status"
//                 value="draft"
//                 checked={status === 'draft'}
//                 onChange={() => setStatus('draft')}
//               />{' '}
//               Save as Draft
//             </label>
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
//         >
//           Save Page
//         </button>
//       </form>

//       {/* Live Preview */}
//       <div className="mt-10 border-t pt-6">
//         <h2 className="text-xl font-bold mb-2 text-gray-700"> Live Preview</h2>
//         <div className="bg-gray-50 p-4 rounded border">
//           <h3 className="text-xl font-semibold">{title || 'Page Title Preview'}</h3>
//           <p className="text-gray-600 mt-2 whitespace-pre-wrap">{content || 'Your content will appear here.'}</p>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState } from 'react';

export default function CreatePage() {
  const [activeSection, setActiveSection] = useState('banner');

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Homepage Edit Panel</h1>

      <div className="flex gap-4 mb-6">
        {['banner', 'sponsor', 'reviews', 'footer'].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-4 py-2 rounded ${activeSection === section ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)} Edit
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded shadow">
        {activeSection === 'banner' && <BannerEditor />}
        {activeSection === 'sponsor' && <SponsorUploader />}
        {activeSection === 'reviews' && <ReviewsEditor />}
        {activeSection === 'footer' && <FooterEditor />}
      </div>
    </div>
  );
}



function BannerEditor() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [image, setImage] = useState(null);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Edit Banner</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-2 border p-2"
      />
      <input
        type="text"
        placeholder="Subtitle"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
        className="w-full mb-2 border p-2"
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="mb-2"
      />
      <button className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
    </div>
  );
}

function SponsorUploader() {
  const [image, setImage] = useState(null);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Upload Sponsor Image</h2>
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="mb-2"
      />
      <button className="bg-green-500 text-white px-4 py-2 rounded">Upload</button>
    </div>
  );
}

function ReviewsEditor() {
  const [reviews, setReviews] = useState([{ name: '', review: '' }]);

  const handleChange = (i, field, value) => {
    const newReviews = [...reviews];
    newReviews[i][field] = value;
    setReviews(newReviews);
  };

  const addReview = () => setReviews([...reviews, { name: '', review: '' }]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Edit Reviews</h2>
      {reviews.map((r, i) => (
        <div key={i} className="mb-4">
          <input
            type="text"
            placeholder="Name"
            value={r.name}
            onChange={(e) => handleChange(i, 'name', e.target.value)}
            className="w-full mb-2 border p-2"
          />
          <textarea
            placeholder="Review"
            value={r.review}
            onChange={(e) => handleChange(i, 'review', e.target.value)}
            className="w-full mb-2 border p-2"
          />
        </div>
      ))}
      <button
        onClick={addReview}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Review
      </button>
      <button className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
    </div>
  );
}

function FooterEditor() {
  const [footerText, setFooterText] = useState('');

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Edit Footer</h2>
      <textarea
        placeholder="Footer content"
        value={footerText}
        onChange={(e) => setFooterText(e.target.value)}
        className="w-full mb-2 border p-2"
      />
      <button className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
    </div>
  );
}
