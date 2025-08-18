import { FaBold, FaItalic, FaAlignLeft, FaAlignCenter, FaAlignRight, FaLink } from 'react-icons/fa';
import { Textarea } from 'flowbite-react';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import AdminFooter from '@/app/(with-navbar)/componenets/Admin Footer/AdminFooter';
import Swal from 'sweetalert2';
import ButtonTopMaker from '@/app/buttonTopMaker/ButtonTopMaker';


export default function Page() {
    const [blogTitle, setBlogTitle] = useState('');
    const [note, setNote] = useState('');
    const [category, setCategory] = useState('');
    const [featuredImage, setFeaturedImage] = useState(null);
    const [alignment, setAlignment] = useState('left');
    const [fontSize, setFontSize] = useState('16'); // Default font size in pt
    const [linkUrl, setLinkUrl] = useState('');
    const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
    const [facebook, setFacebook] = useState('');
    const [twitter, setTwitter] = useState('');
    const [instagram, setInstagram] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [imageAlt, setImageAlt] = useState('');
    const [imageTitle, setImageTitle] = useState('');
    const [imageCaption, setImageCaption] = useState('');
    const [imageDescription, setImageDescription] = useState('');
    const [imageUrl, setImageUrl] = useState(''); // For external file URL input

    const editorRef = useRef(null);

    // Load draft from localStorage on mount
    useEffect(() => {
        const savedDraft = localStorage.getItem('blogDraft');
        if (savedDraft) {
            const draft = JSON.parse(savedDraft);
            setBlogTitle(draft.blogTitle || '');
            setNote(draft.note || '');
            setCategory(draft.category || '');
            setImageAlt(draft.imageAlt || '');
            setImageTitle(draft.imageTitle || '');
            setImageCaption(draft.imageCaption || '');
            setImageDescription(draft.imageDescription || '');
            setImageUrl(draft.imageUrl || '');
            setFacebook(draft.facebook || '');
            setTwitter(draft.twitter || '');
            setInstagram(draft.instagram || '');
            setLinkedin(draft.linkedin || '');

            if (editorRef.current && draft.content) {
                editorRef.current.innerHTML = draft.content;
            }

            if (draft.featuredImage) {
                setFeaturedImage(draft.featuredImage);
            }
        }
    }, []);

    // Generate meaningful keywords from blog title (words longer than 3 chars)
    const getBlogKeywords = () => {
        return blogTitle
            .toLowerCase()
            .split(/\s+/)
            .filter((word) => word.length > 3);
    };

    // Check if a text contains any blog keywords
    const containsBlogKeywords = (text) => {
        if (!text) return false;
        const keywords = getBlogKeywords();
        const lowerText = text.toLowerCase();
        return keywords.some((word) => lowerText.includes(word));
    };

    // Calculate how many SEO fields matched
    const seoFields = [
        { key: 'Alt Text', value: imageAlt },
        { key: 'Caption', value: imageCaption },
        { key: 'Description', value: imageDescription },
    ];

    // Count how many fields contain keywords
    const matchedFieldsCount = seoFields.reduce(
        (count, field) => count + (containsBlogKeywords(field.value) ? 1 : 0),
        0
    );

    // Percent matched
    const seoMatchPercent = Math.round((matchedFieldsCount / seoFields.length) * 100);

    // Autofill Alt, Title and Description when blogTitle changes if empty
    useEffect(() => {
        if (blogTitle.trim() !== '') {
            if (imageAlt.trim() === '') {
                setImageAlt(`Image related to ${blogTitle.trim()}`);
            }
            if (imageTitle.trim() === '') {
                setImageTitle(`${blogTitle.trim()} - Image`);
            }
            if (imageDescription.trim() === '') {
                setImageDescription(`This image depicts something related to ${blogTitle.trim()}.`);
            }
        }
    }, [blogTitle]);

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFeaturedImage(file);
            setImageAlt('');
            setImageTitle('');
            setImageCaption('');
            setImageDescription('');
            setImageUrl('');
        }
    };

    const handleCancelImage = () => {
        setFeaturedImage(null);
    };

    const toggleBold = () => {
        document.execCommand('bold');
    };

    const toggleItalic = () => {
        document.execCommand('italic');
    };

    const handleAlign = (alignType) => {
        setAlignment(alignType);
        document.execCommand('justify' + alignType.charAt(0).toUpperCase() + alignType.slice(1));
    };

    const handleFontSizeChange = (e) => {
        const selectedSize = e.target.value;
        setFontSize(selectedSize);

        const sizeMap = {
            '10': '1',
            '12': '2',
            '14': '3',
            '16': '4',
            '18': '5',
            '24': '6',
            '32': '7',
        };

        const execSize = sizeMap[selectedSize] || '3';

        document.execCommand('fontSize', false, execSize);
    };

    const handleInsertLink = () => {
        if (linkUrl) {
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const linkNode = document.createElement('a');
                linkNode.href = linkUrl;
                linkNode.target = '_blank';
                linkNode.style.color = 'blue';
                linkNode.appendChild(range.extractContents());
                range.insertNode(linkNode);
            }
            setLinkUrl('');
            setIsLinkDialogOpen(false);
        }
    };

    const handlePublish = async () => {
        const content = editorRef.current?.innerHTML || '';

        if (!blogTitle || !note || !category || !content || !featuredImage) {
            Swal.fire({
                icon: 'warning',
                title: 'All fields required!',
                text: 'Please fill in all the input fields before publishing.',
                confirmButtonColor: '#17549A',
            });
            return;
        }

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to publish this post?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#17549A',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, publish it!',
            cancelButtonText: 'Cancel',
        });

        if (!result.isConfirmed) {
            Swal.fire('Cancelled', 'Your post was not published.', 'info');
            return;
        }

        let imageUploadUrl = null;

        if (featuredImage && typeof featuredImage !== 'string') {
            const file = document.querySelector('input[type="file"]').files[0];
            const formData = new FormData();
            formData.append('image', file);

            try {
                const imgbbRes = await fetch(
                    `https://api.imgbb.com/1/upload?key=3d64b0e9dee39ca593b9da32467663ee`,
                    {
                        method: 'POST',
                        body: formData,
                    }
                );

                const imgBBData = await imgbbRes.json();

                if (imgBBData.success) {
                    imageUploadUrl = imgBBData.data.url;
                } else {
                    Swal.fire('Error', 'Image upload to ImgBB failed.', 'error');
                    return;
                }
            } catch (error) {
                console.error('ImgBB upload error:', error);
                Swal.fire('Error', 'Error uploading image', 'error');
                return;
            }
        }


        const postData = {
            title: blogTitle,
            note,
            category,
            content,
            featuredImage: imageUploadUrl || featuredImage,
            imageAlt,
            imageTitle,
            imageCaption,
            imageDescription,
            socialLinks: { facebook, twitter, instagram, linkedin },
        };

        try {
            const res = await fetch('/api/career_guide_Blog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            const result = await res.json();
            if (result.success) {
                Swal.fire('Success!', 'Post published successfully!', 'success');
            } else {
                Swal.fire('Oops!', 'Failed to publish post', 'error');
            }
        } catch (err) {
            console.error('Error publishing post:', err);
            Swal.fire('Error', 'Something went wrong while publishing.', 'error');
        }
    };

    // Save draft to localStorage
    const handleSaveDraft = () => {
        const content = editorRef.current?.innerHTML || '';
        const draft = {
            blogTitle,
            note,
            category,
            content,
            featuredImage: typeof featuredImage === 'string' ? featuredImage : null,
            imageAlt,
            imageTitle,
            imageCaption,
            imageDescription,
            imageUrl,
            facebook,
            twitter,
            instagram,
            linkedin,
        };

        localStorage.setItem('blogDraft', JSON.stringify(draft));
        Swal.fire({
            icon: 'success',
            title: 'Draft saved!',
            timer: 1500,
            showConfirmButton: false,
        });
    };

    // Open live preview in a new window/tab
    const handleLivePreview = () => {
        const content = editorRef.current?.innerHTML || '';
        const previewWindow = window.open('', '_blank', 'width=900,height=700,scrollbars=yes');

        const previewHTML = `
      <html>
      <head>
        <title>Live Preview - ${blogTitle}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
          h1 { color: #17549A; }
          img { max-width: 100%; height: auto; border-radius: 8px; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <h1>${blogTitle}</h1>
        <p><em>${note}</em></p>
        ${featuredImage
                ? `<img src="${typeof featuredImage === 'string' ? featuredImage : URL.createObjectURL(featuredImage)
                }" alt="${imageAlt}" />`
                : ''
            }
        <div>${content}</div>
        <hr/>
        <small>Category: ${category}</small>
      </body>
      </html>
    `;

        previewWindow.document.write(previewHTML);
        previewWindow.document.close();
    };



    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '20px',
                    padding: '20px',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    flexWrap: 'wrap',
                }}
            >
                {/* Left Side */}
                <div style={{ flex: 2, minWidth: '300px' }}>
                    <div>
                        <label>
                            <strong>Title:</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter title"
                            value={blogTitle}
                            onChange={(e) => setBlogTitle(e.target.value)}
                            style={{ width: '100%', padding: '8px', margin: '8px 0', borderRadius: '5px' }}
                            className="border"
                        />
                    </div>
                    <div>
                        <label>
                            <strong>Short Note:</strong>
                        </label>
                        <Textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Enter a short note"
                            style={{ width: '100%', padding: '8px', margin: '8px 0', height: '100px', borderRadius: '5px' }}
                        />
                    </div>

                    {/* Blog Sections */}
                    <div style={{ backgroundColor: '#ffffffff' }} className="border p-2 mt-10 hover:bg-gray-200 cursor-">
                        <div className="mb-5 text-center">
                            <label>
                                <strong>Blog Section</strong>
                            </label>
                        </div>
                        <div className="flex space-x-3 mb-2 items-center">
                            <button onClick={toggleBold}>
                                <FaBold />
                            </button>
                            <button onClick={toggleItalic}>
                                <FaItalic />
                            </button>
                            <button onClick={() => handleAlign('left')} className={alignment === 'left' ? 'text-blue-500' : ''}>
                                <FaAlignLeft />
                            </button>
                            <button onClick={() => handleAlign('center')} className={alignment === 'center' ? 'text-blue-500' : ''}>
                                <FaAlignCenter />
                            </button>
                            <button onClick={() => handleAlign('right')} className={alignment === 'right' ? 'text-blue-500' : ''}>
                                <FaAlignRight />
                            </button>
                            <select value={fontSize} onChange={handleFontSizeChange}>
                                <option value="10">10 pt</option>
                                <option value="12">12 pt</option>
                                <option value="14">14 pt</option>
                                <option value="16">16 pt</option>
                                <option value="18">18 pt</option>
                            </select>
                            <button onClick={() => setIsLinkDialogOpen(true)}>
                                <FaLink />
                            </button>
                        </div>
                        {isLinkDialogOpen && (
                            <div>
                                <label>Enter URL:</label>
                                <input
                                    type="text"
                                    value={linkUrl}
                                    onChange={(e) => setLinkUrl(e.target.value)}
                                    placeholder="https://careerbuilder.com"
                                    style={{
                                        padding: '8px',
                                        margin: '8px 0',
                                        borderRadius: '5px',
                                    }}
                                />
                                <button
                                    onClick={handleInsertLink}
                                    style={{ padding: '8px', backgroundColor: '#17549A', color: 'white', borderRadius: '5px', marginBottom: '10px' }}
                                >
                                    Insert Link
                                </button>
                                <button onClick={() => setIsLinkDialogOpen(false)} style={{ padding: '8px', backgroundColor: '#ccc', color: 'white', borderRadius: '5px' }}>
                                    Cancel
                                </button>
                            </div>
                        )}
                        <div
                            ref={editorRef}
                            contentEditable
                            style={{
                                width: '100%',
                                padding: '10px',
                                minHeight: '200px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                textAlign: alignment,
                                fontSize: `${fontSize}pt`,
                            }}
                            placeholder="Start typing your blog content..."
                        ></div>


                    </div>
                </div>

                {/* Right Side */}
                <div
                    style={{
                        flex: 1,
                        minWidth: '300px',
                        maxHeight: '100vh',
                        overflowY: 'auto',
                        position: 'sticky',
                        alignSelf: 'flex-start',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                    }}
                    className="top-28 overflow-y-hidden"
                >

                    {/* SEO Progress Bar and Match Text */}
                    <div style={{ marginTop: '15px' }}>
                        {/* <label>
                                <strong>Image SEO Match: {seoMatchPercent}%</strong>
                            </label> */}
                        <div
                            style={{
                                backgroundColor: '#e0e0e0',
                                borderRadius: '5px',
                                height: '15px',
                                width: '100%',
                                overflow: 'hidden',
                            }}
                        >
                            <div
                                style={{
                                    height: '100%',
                                    width: `${seoMatchPercent}%`,
                                    backgroundColor: seoMatchPercent === 100 ? '#4caf50' : '#ff9800',
                                    transition: 'width 0.3s ease-in-out',
                                }}
                            />
                        </div>
                        {seoMatchPercent === 100 ? (
                            <p style={{ color: 'green', fontWeight: 'bold', marginTop: '5px' }}> SEO Perfect</p>
                        ) : (
                            <p style={{ color: 'orange', fontWeight: 'bold', marginTop: '5px' }}>Keep optimizing SEO fields!.</p>
                        )}
                    </div>

                    {/* action buttons for inputs */}
                    <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', backgroundColor: '#ffffffff' }}>
                        <h3 className="font-bold">Actions</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <button
                                style={{ padding: '10px', backgroundColor: '#17549A', color: 'white', borderRadius: '5px' }}
                                onClick={handleSaveDraft}
                            >
                                Save Draft
                            </button>
                            <button
                                style={{ padding: '10px', backgroundColor: '#17549A', color: 'white', borderRadius: '5px' }}
                                onClick={handleLivePreview}
                            >
                                Preview
                            </button>
                        </div>
                        <button
                            onClick={handlePublish}
                            style={{ padding: '10px', backgroundColor: '#17549A', color: 'white', borderRadius: '5px', marginTop: '10px' }}
                            className="w-full"
                        >
                            Publish
                        </button>
                    </div>
                    <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', backgroundColor: '#ffffffff' }}>
                        <h3 className="font-bold">Category</h3>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '5px' }}
                            className="border"
                        >
                            <option value="">Select a category</option>
                            <option value="technology">Technology</option>
                            <option value="health">Health</option>
                            <option value="education">Education</option>
                            <option value="career">Career</option>
                        </select>
                    </div>
                    <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', backgroundColor: '#ffffffff' }}>
                        <h3 className="font-bold">Featured Image</h3>
                        <input
                            type="file"
                            onChange={handleImageUpload}
                            accept="image/*"
                            className="w-full border rounded p-1"
                        />
                        {featuredImage && (
                            <div style={{ marginTop: '10px', textAlign: 'center' }}>
                                {typeof featuredImage === 'string' ? (
                                    <Image src={featuredImage} alt={imageAlt} width={200} height={150} />
                                ) : (
                                    <Image src={URL.createObjectURL(featuredImage)} alt={imageAlt} width={200} height={150} />
                                )}
                                <button
                                    onClick={handleCancelImage}
                                    style={{ marginTop: '5px', padding: '5px', backgroundColor: '#d33', color: 'white', borderRadius: '5px' }}
                                >
                                    Cancel Image
                                </button>
                            </div>
                        )}
                    </div>
                    <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', backgroundColor: '#ffffffff' }}>
                        <h3 className="font-bold">Image SEO Details</h3>
                        <label>Alt Text</label>
                        <input
                            type="text"
                            value={imageAlt}
                            onChange={(e) => setImageAlt(e.target.value)}
                            placeholder="Alt text"
                            className="w-full border rounded p-1 mb-2"
                        />
                        <label>Title</label>
                        <input
                            type="text"
                            value={imageTitle}
                            onChange={(e) => setImageTitle(e.target.value)}
                            placeholder="Image title"
                            className="w-full border rounded p-1 mb-2"
                        />
                        <label>Caption</label>
                        <input
                            type="text"
                            value={imageCaption}
                            onChange={(e) => setImageCaption(e.target.value)}
                            placeholder="Image caption"
                            className="w-full border rounded p-1 mb-2"
                        />
                        <label>Description</label>
                        <textarea
                            value={imageDescription}
                            onChange={(e) => setImageDescription(e.target.value)}
                            placeholder="Image description"
                            rows={3}
                            className="w-full border rounded p-1"
                        />
                    </div>
                    <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', backgroundColor: '#ffffffff' }}>
                        <h3 className="font-bold">Social Links</h3>
                        <input
                            type="text"
                            placeholder="Facebook URL"
                            value={facebook}
                            onChange={(e) => setFacebook(e.target.value)}
                            className="w-full border rounded p-1 mb-2"
                        />
                        <input
                            type="text"
                            placeholder="Twitter URL"
                            value={twitter}
                            onChange={(e) => setTwitter(e.target.value)}
                            className="w-full border rounded p-1 mb-2"
                        />
                        <input
                            type="text"
                            placeholder="Instagram URL"
                            value={instagram}
                            onChange={(e) => setInstagram(e.target.value)}
                            className="w-full border rounded p-1 mb-2"
                        />
                        <input
                            type="text"
                            placeholder="LinkedIn URL"
                            value={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                            className="w-full border rounded p-1"
                        />
                    </div>
                </div>
            </div>
            <AdminFooter />
            <ButtonTopMaker />
        </>
    );
}
