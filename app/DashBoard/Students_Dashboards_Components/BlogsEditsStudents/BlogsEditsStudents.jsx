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
    const [alignment, setAlignment] = useState('left');
    const [fontSize, setFontSize] = useState('16');
    const [linkUrl, setLinkUrl] = useState('');
    const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [blogContent, setBlogContent] = useState('');
    const [savedRange, setSavedRange] = useState(null);

      const {  matchedStudent } = useUserMatching();
    //    console.log(matchedStudent?.email)

    const editorRef = useRef(null);

    useEffect(() => {
        const savedDraft = localStorage.getItem('blog_draft');
        if (savedDraft) {
            const draft = JSON.parse(savedDraft);
            setTitle(draft.title || '');
            setNote(draft.note || '');
            setCategory(draft.category || '');
            setFeaturedImage(draft.featuredImage || null);
            if (editorRef.current && draft.blogContent) {
                editorRef.current.innerHTML = draft.blogContent;
            }
        }
    }, []);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFeaturedImage(URL.createObjectURL(file));
        }
    };

    const handleCancelImage = () => {
        setFeaturedImage(null);
    };

    const toggleBold = () => document.execCommand('bold');
    const toggleItalic = () => document.execCommand('italic');

    const handleAlign = (alignType) => {
        setAlignment(alignType);
        document.execCommand('justify' + alignType.charAt(0).toUpperCase() + alignType.slice(1));
    };

    const handleFontSizeChange = (e) => {
        const selectedSize = e.target.value;
        setFontSize(selectedSize);
        if (editorRef.current) {
            editorRef.current.style.fontSize = `${selectedSize}pt`;
        }
    };

    const handleOpenLinkDialog = () => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            setSavedRange(selection.getRangeAt(0).cloneRange());
        }
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

    const handlePreview = () => {
        if (editorRef.current) {
            setBlogContent(editorRef.current.innerHTML);
            setShowPreview(true);
        }
    };

    const handleSaveDraft = () => {
        if (editorRef.current) {
            Swal.fire({
                title: 'Save as Draft?',
                text: "Do you want to save this blog as a draft?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#17549A',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Save Draft',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    const draft = {
                        title,
                        note,
                        category,
                        featuredImage,
                        blogContent: editorRef.current.innerHTML,
                        dateSaved: new Date().toISOString()
                    };
                    localStorage.setItem('blog_draft', JSON.stringify(draft));

                    Swal.fire({
                        icon: 'success',
                        title: 'Draft Saved!',
                        text: 'Your blog draft has been successfully saved.',
                        confirmButtonColor: '#17549A'
                    });
                }
            });
        }
    };

    const handlePublishBlog = async () => {
        if (editorRef.current) {
            Swal.fire({
                title: 'Publish Blog?',
                text: 'Are you sure you want to publish this blog?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#17549A',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Publish',
                cancelButtonText: 'Cancel'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const blogData = {
                        title,
                        note,
                        category,
                        featuredImage,
                        email: matchedStudent?.email,
                        blogContent: editorRef.current.innerHTML
                    };

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
                } else {
                    Swal.fire('Cancelled', 'Your blog was not published.', 'info');
                }
            });
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', padding: '20px', maxWidth: '1200px', margin: '0 auto', flexWrap: 'wrap' }}>
            <div style={{ flex: 2, minWidth: '300px' }}>
                <div>
                    <label><strong>Title:</strong></label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter title"
                        style={{ width: '100%', padding: '8px', margin: '8px 0', borderRadius: '5px' }}
                        className='border'
                    />
                </div>
                <div>
                    <label><strong>Short Note:</strong></label>
                    <Textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Enter a short note"
                        style={{ width: '100%', padding: '8px', margin: '8px 0', height: '100px', borderRadius: '5px' }}
                    />
                </div>
                <div style={{ backgroundColor: '#fff' }} className="border p-2 mt-10">
                    <div className="mb-5 text-center">
                        <label><strong>Blog Section</strong></label>
                    </div>
                    <div className="flex space-x-3 mb-2 items-center">
                        <button onClick={toggleBold}><FaBold /></button>
                        <button onClick={toggleItalic}><FaItalic /></button>
                        <button onClick={() => handleAlign('left')} className={alignment === 'left' ? 'text-blue-500' : ''}><FaAlignLeft /></button>
                        <button onClick={() => handleAlign('center')} className={alignment === 'center' ? 'text-blue-500' : ''}><FaAlignCenter /></button>
                        <button onClick={() => handleAlign('right')} className={alignment === 'right' ? 'text-blue-500' : ''}><FaAlignRight /></button>
                        <select value={fontSize} onChange={handleFontSizeChange}>
                            <option value="10">10 pt</option>
                            <option value="12">12 pt</option>
                            <option value="14">14 pt</option>
                            <option value="16">16 pt</option>
                            <option value="18">18 pt</option>
                        </select>
                        <button onClick={handleOpenLinkDialog}><FaLink /></button>
                    </div>

                    {isLinkDialogOpen && (
                        <div>
                            <label>Enter URL:</label>
                            <input
                                type="text"
                                value={linkUrl}
                                onChange={(e) => setLinkUrl(e.target.value)}
                                placeholder="https://example.com"
                                style={{
                                    padding: '8px',
                                    margin: '8px 0',
                                    borderRadius: '5px',
                                }}
                            />
                            <button
                                onClick={handleInsertLink}
                                style={{
                                    padding: '8px',
                                    backgroundColor: '#17549A',
                                    color: 'white',
                                    borderRadius: '5px',
                                    marginBottom: '10px',
                                }}
                            >
                                Insert Link
                            </button>
                            <button
                                onClick={() => setIsLinkDialogOpen(false)}
                                style={{
                                    padding: '8px',
                                    backgroundColor: '#ccc',
                                    color: 'white',
                                    borderRadius: '5px',
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    )}

                    <div
                        ref={editorRef}
                        contentEditable
                        data-gramm="false"
                        data-gramm_editor="false"
                        suppressContentEditableWarning={true}
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

                    {showPreview && (
                        <div style={{ marginTop: '20px', border: '1px solid #ccc', borderRadius: '5px', padding: '15px', backgroundColor: '#f9f9f9' }}>
                            <h3 className='font-bold'>Live Preview</h3>
                            <div
                                dangerouslySetInnerHTML={{ __html: blogContent }}
                                style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
                            />
                            <button
                                onClick={() => setShowPreview(false)}
                                style={{ marginTop: '10px', padding: '8px', backgroundColor: '#ccc', borderRadius: '5px' }}
                            >
                                Close Preview
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr', gap: '20px', minWidth: '300px' }}>
                <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', backgroundColor: '#fff' }}>
                    <h3 className='font-bold'>Actions</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <button
                            onClick={handleSaveDraft}
                            style={{ padding: '10px', backgroundColor: '#17549A', color: 'white', borderRadius: '5px' }}
                        >
                            Save Draft
                        </button>
                        <button
                            onClick={handlePreview}
                            style={{ padding: '10px', backgroundColor: '#17549A', color: 'white', borderRadius: '5px' }}
                        >
                            Preview
                        </button>
                    </div>
                    <button
                        onClick={handlePublishBlog}
                        style={{
                            padding: '10px',
                            backgroundColor: '#17549A',
                            color: 'white',
                            borderRadius: '5px',
                            marginTop: '10px'
                        }}
                        className='w-full'
                    >
                        Publish
                    </button>
                </div>

                <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', backgroundColor: '#fff' }}>
                    <h3 className='font-bold'>Category</h3>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '5px' }} className='border'>
                        <option value="">Select a category</option>
                        <option value="technology">Technology</option>
                        <option value="health">Health</option>
                        <option value="education">Education</option>
                        <option value="entertainment">Entertainment</option>
                    </select>
                </div>

                <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', backgroundColor: '#fff' }}>
                    <h3 className='font-bold'>Featured Image</h3>
                    <input type="file" onChange={handleImageUpload} style={{ width: '100%', padding: '8px', borderRadius: '5px' }} />
                    {featuredImage && (
                        <div style={{ marginTop: '10px' }}>
                            <Image width={200} height={200} src={featuredImage} alt="Featured Preview" style={{ width: '100%', borderRadius: '5px' }} />
                            <button onClick={handleCancelImage} style={{ padding: '8px', marginTop: '10px', backgroundColor: '#ccc', borderRadius: '5px' }}>Remove Image</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
