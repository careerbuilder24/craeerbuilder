import { FaBold, FaItalic, FaAlignLeft, FaAlignCenter, FaAlignRight, FaLink } from 'react-icons/fa';
import { Textarea } from 'flowbite-react';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import useUserMatching from '@/hooks/useUserMatching';

export default function Page() {
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const [category, setCategory] = useState('');
    const [featuredImage, setFeaturedImage] = useState(null);
    const [imageAlt, setImageAlt] = useState('');
    const [imageCaption, setImageCaption] = useState('');
    const [imageDescription, setImageDescription] = useState('');
    const [alignment, setAlignment] = useState('left');
    const [fontSize, setFontSize] = useState('16');
    const [linkUrl, setLinkUrl] = useState('');
    const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
    const [blogContent, setBlogContent] = useState('');
    const [savedRange, setSavedRange] = useState(null);

    const { matchedStudent } = useUserMatching();
    const editorRef = useRef(null);

    // Generate keywords for SEO
    const getBlogKeywords = () => {
        const raw = (title + " " + note + " " + category).toLowerCase().replace(/[^\w\s]/g, "");
        const words = raw.split(/\s+/).filter(word => word.length >= 3);
        return Array.from(new Set(words));
    };

    const getImageSeoMatchPercent = () => {
        const keywords = getBlogKeywords();
        if (keywords.length === 0) return 0;
        const seoText = [imageAlt, imageCaption, imageDescription].join(" ").toLowerCase();
        const matchedKeywords = keywords.filter(word => seoText.includes(word));
        return Math.round((matchedKeywords.length / keywords.length) * 100);
    };

    const getContentSeoMatchPercent = () => {
        const keywords = getBlogKeywords();
        if (keywords.length === 0) return 0;
        const contentText = [title, note, editorRef.current?.innerText || ''].join(" ").toLowerCase();
        const matchedKeywords = keywords.filter(word => contentText.includes(word));
        return Math.round((matchedKeywords.length / keywords.length) * 100);
    };

    const [imageSeoMatchPercent, setImageSeoMatchPercent] = useState(0);
    const [contentSeoMatchPercent, setContentSeoMatchPercent] = useState(0);

    useEffect(() => {
        setImageSeoMatchPercent(getImageSeoMatchPercent());
        setContentSeoMatchPercent(getContentSeoMatchPercent());
    }, [title, note, category, imageAlt, imageCaption, imageDescription, blogContent]);

    // Load draft
    useEffect(() => {
        const savedDraft = localStorage.getItem('blog_draft');
        if (savedDraft) {
            const draft = JSON.parse(savedDraft);
            setTitle(draft.title || '');
            setNote(draft.note || '');
            setCategory(draft.category || '');
            setFeaturedImage(draft.featuredImage || null);
            setImageAlt(draft.imageAlt || '');
            setImageCaption(draft.imageCaption || '');
            setImageDescription(draft.imageDescription || '');
            if (editorRef.current && draft.blogContent) {
                editorRef.current.innerHTML = draft.blogContent;
            }
        }
    }, []);

    // Image upload
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await fetch(`https://api.imgbb.com/1/upload?key=3d64b0e9dee39ca593b9da32467663ee`, {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (data.success) {
                setFeaturedImage(data.data.url);
                Swal.fire('Uploaded!', 'Image successfully uploaded to ImgBB.', 'success');
            } else throw new Error('ImgBB upload failed');
        } catch (error) {
            console.error('Upload error:', error);
            Swal.fire('Error', 'Failed to upload image.', 'error');
        }
    };

    const handleCancelImage = () => {
        setFeaturedImage(null);
        setImageAlt('');
        setImageCaption('');
        setImageDescription('');
    };

    // Text formatting
    const toggleBold = () => document.execCommand('bold');
    const toggleItalic = () => document.execCommand('italic');
    const handleAlign = (alignType) => {
        setAlignment(alignType);
        document.execCommand('justify' + alignType.charAt(0).toUpperCase() + alignType.slice(1));
    };
    const handleFontSizeChange = (e) => {
        const size = e.target.value;
        setFontSize(size);
        if (editorRef.current) editorRef.current.style.fontSize = `${size}pt`;
    };

    // Links
    const handleOpenLinkDialog = () => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) setSavedRange(selection.getRangeAt(0).cloneRange());
        setIsLinkDialogOpen(true);
    };
    const handleInsertLink = () => {
        if (linkUrl && savedRange) {
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(savedRange);
            const linkNode = document.createElement('a');
            linkNode.href = linkUrl;
            linkNode.target = '_blank';
            linkNode.style.color = 'blue';
            linkNode.appendChild(savedRange.extractContents());
            savedRange.insertNode(linkNode);

            setSavedRange(null);
            setLinkUrl('');
            setIsLinkDialogOpen(false);
        }
    };

    // Save draft
    const handleSaveDraft = () => {
        if (editorRef.current) {
            const draft = {
                title,
                note,
                category,
                featuredImage,
                imageAlt,
                imageCaption,
                imageDescription,
                blogContent: editorRef.current.innerHTML,
                dateSaved: new Date().toISOString()
            };
            localStorage.setItem('blog_draft', JSON.stringify(draft));
            Swal.fire('Saved!', 'Draft saved successfully.', 'success');
        }
    };

    // Publish
    const handlePublishBlog = async () => {
        if (!editorRef.current) return;

        if (!matchedStudent?.email) {
            Swal.fire({
                title: 'Warning!',
                text: 'Please Fill Up your profile Edit.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return;
        }

        Swal.fire({
            title: 'Publish Blog?',
            text: "Do you want to publish this blog?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Publish',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const blogData = {
                    title,
                    note,
                    category,
                    featuredImage,
                    imageAlt,
                    imageCaption,
                    imageDescription,
                    email: matchedStudent?.email,
                    blogContent: editorRef.current.innerHTML
                };

                try {
                    const res = await fetch('/api/StudentBlog', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(blogData)
                    });

                    if (res.ok) {
                        Swal.fire('Published!', 'Your blog has been published.', 'success');
                        localStorage.removeItem('blog_draft');
                    } else {
                        Swal.fire('Failed!', 'Blog could not be published.', 'error');
                    }
                } catch (err) {
                    Swal.fire('Error!', 'Something went wrong while publishing.', 'error');
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'Blog publishing was cancelled.', 'info');
            }
        });
    };

    const getBarColor = (percent) => percent >= 80 ? '#4caf50' : '#ff9800';

    // Live preview (opens new tab)
    const handlePreview = () => {
        if (!editorRef.current) return;

        const content = editorRef.current.innerHTML;
        const previewWindow = window.open('', '_blank', 'width=900,height=700,scrollbars=yes');

        const html = `
          <html>
            <head>
              <title>Live Preview - ${title}</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
                h1 { color: #17549A; }
                img { max-width: 100%; height: auto; border-radius: 8px; margin-bottom: 20px; }
                p { margin-bottom: 10px; }
              </style>
            </head>
            <body>
              <h1>${title}</h1>
              <p><em>${note}</em></p>
              ${featuredImage ? `<img src="${featuredImage}" alt="${imageAlt}" />` : ''}
              <div>${content}</div>
              <hr/>
              <small>Category: ${category}</small>
            </body>
          </html>
        `;

        previewWindow.document.write(html);
        previewWindow.document.close();
    };

    return (
        <div className="flex flex-wrap gap-5 p-5 max-w-[1200px] mx-auto">
            <div className="flex-[3] min-w-[300px] space-y-4">
                <div>
                    <label className="font-bold">Title:</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter title" className="border w-full p-2 rounded" />
                </div>
                <div>
                    <label className="font-bold">Short Note:</label>
                    <Textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Enter a short note" className="border w-full p-2 rounded h-24" />
                </div>

                {/* Editor */}
                <div className="border p-2 mt-10 bg-white">
                    <div className="mb-5 text-center">
                        <label className="font-bold">Blog Section</label>
                    </div>
                    <div className="flex space-x-3 mb-2 items-center">
                        <button onClick={toggleBold}><FaBold /></button>
                        <button onClick={toggleItalic}><FaItalic /></button>
                        <button onClick={() => handleAlign('left')} className={alignment === 'left' ? 'text-blue-500' : ''}><FaAlignLeft /></button>
                        <button onClick={() => handleAlign('center')} className={alignment === 'center' ? 'text-blue-500' : ''}><FaAlignCenter /></button>
                        <button onClick={() => handleAlign('right')} className={alignment === 'right' ? 'text-blue-500' : ''}><FaAlignRight /></button>
                        <select value={fontSize} onChange={handleFontSizeChange}>
                            {[10, 12, 14, 16, 18].map(size => <option key={size} value={size}>{size} pt</option>)}
                        </select>
                        <button onClick={handleOpenLinkDialog}><FaLink /></button>
                    </div>

                    {isLinkDialogOpen && (
                        <div>
                            <label>Enter URL:</label>
                            <input type="text" value={linkUrl} onChange={e => setLinkUrl(e.target.value)} placeholder="https://example.com" className="border w-full p-2 rounded my-2" />
                            <div className="flex gap-2">
                                <button onClick={handleInsertLink} className="p-2 bg-blue-600 text-white rounded">Insert Link</button>
                                <button onClick={() => setIsLinkDialogOpen(false)} className="p-2 bg-gray-400 text-white rounded">Cancel</button>
                            </div>
                        </div>
                    )}

                    <div ref={editorRef} contentEditable suppressContentEditableWarning className="border rounded p-3 min-h-[200px]" style={{ textAlign: alignment, fontSize: `${fontSize}pt` }}></div>
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="flex-[1] min-w-[300px] sticky top-28 self-start flex flex-col gap-5">
                {/* Image SEO */}
                <div className="p-3 border rounded bg-white">
                    <h3 className="font-bold mb-2">Image SEO</h3>
                    <div className="w-full h-4 bg-gray-300 rounded">
                        <div className="h-4 rounded transition-all" style={{ width: `${imageSeoMatchPercent}%`, backgroundColor: getBarColor(imageSeoMatchPercent) }} />
                    </div>
                    <p className={`mt-1 font-bold ${imageSeoMatchPercent >= 80 ? 'text-green-600' : 'text-orange-600'}`}>
                        {imageSeoMatchPercent >= 80 ? 'Image SEO Perfect' : 'Keep optimizing image SEO!'}
                    </p>
                </div>

                {/* Content SEO */}
                <div className="p-3 border rounded bg-white">
                    <h3 className="font-bold mb-2">Content SEO</h3>
                    <div className="w-full h-4 bg-gray-300 rounded">
                        <div className="h-4 rounded transition-all" style={{ width: `${contentSeoMatchPercent}%`, backgroundColor: getBarColor(contentSeoMatchPercent) }} />
                    </div>
                    <p className={`mt-1 font-bold ${contentSeoMatchPercent >= 80 ? 'text-green-600' : 'text-orange-600'}`}>
                        {contentSeoMatchPercent >= 80 ? 'Content SEO Perfect' : 'Keep optimizing content!'}
                    </p>
                </div>

                {/* Actions */}
                <div className="border p-3 rounded bg-white">
                    <h3 className="font-bold mb-2">Actions</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <button onClick={handleSaveDraft} className="p-2 bg-blue-700 text-white rounded">Save Draft</button>
                        <button onClick={handlePreview} className="p-2 bg-blue-700 text-white rounded">Preview</button>
                    </div>
                    <button onClick={handlePublishBlog} className="mt-3 w-full p-2 bg-blue-700 text-white rounded">Publish</button>
                </div>

                {/* Category */}
                <div className="border p-3 rounded bg-white">
                    <h3 className="font-bold mb-2">Category</h3>
                    <select value={category} onChange={e => setCategory(e.target.value)} className="border w-full p-2 rounded">
                        <option value="">Select a category</option>
                        <option value="technology">Technology</option>
                        <option value="health">Health</option>
                        <option value="education">Education</option>
                        <option value="entertainment">Entertainment</option>
                    </select>
                </div>

                {/* Featured Image + SEO fields */}
                <div className="border p-3 rounded bg-white">
                    <h3 className="font-bold mb-2">Featured Image</h3>
                    <input type="file" onChange={handleImageUpload} className="border w-full p-2 rounded" />
                    {featuredImage && (
                        <div className="mt-3 space-y-2">
                            <Image width={200} height={200} src={featuredImage} alt={imageAlt || 'Featured image'} className="w-full rounded" />
                            <input type="text" value={imageAlt} onChange={e => setImageAlt(e.target.value)} placeholder="Alt text (SEO)" className="border w-full p-2 rounded" />
                            <input type="text" value={imageCaption} onChange={e => setImageCaption(e.target.value)} placeholder="Caption" className="border w-full p-2 rounded" />
                            <Textarea value={imageDescription} onChange={e => setImageDescription(e.target.value)} placeholder="Description" className="border w-full p-2 rounded h-20" />
                            <button onClick={handleCancelImage} className="mt-2 p-2 bg-gray-400 text-white rounded">Remove Image</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

