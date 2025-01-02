import { FaBold, FaItalic, FaAlignLeft, FaAlignCenter, FaAlignRight, FaLink } from 'react-icons/fa';
import { Textarea } from 'flowbite-react';
import Image from 'next/image';
import React, { useState } from 'react';

export default function Page() {
    const [note, setNote] = useState('');
    const [category, setCategory] = useState('');
    const [featuredImage, setFeaturedImage] = useState(null);
    const [alignment, setAlignment] = useState('left');
    const [fontSize, setFontSize] = useState('16'); // Default font size in pt
    const [linkUrl, setLinkUrl] = useState('');
    const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
    const editorRef = React.useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFeaturedImage(URL.createObjectURL(file));
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
        if (editorRef.current) {
            editorRef.current.style.fontSize = `${selectedSize}pt`;
        }
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

    return (
        <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', padding: '20px', maxWidth: '1200px', margin: '0 auto', flexWrap: 'wrap' }}>
            {/* Left Side */}
            <div style={{ flex: 2, minWidth: '300px' }}>
                <div>
                    <label><strong>Title:</strong></label>
                    <input
                        type="text"
                        placeholder="Enter title"
                        style={{ width: '100%', padding: '8px', margin: '8px 0', borderRadius: '5px' }}
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
                <div style={{ backgroundColor: '#ffffffff' }} className="border p-2 mt-10">
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
                        <button onClick={() => setIsLinkDialogOpen(true)}><FaLink /></button>
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
                            <button onClick={handleInsertLink} style={{ padding: '8px', backgroundColor: '#17549A', color: 'white', borderRadius: '5px', marginBottom: '10px' }}>Insert Link</button>
                            <button onClick={() => setIsLinkDialogOpen(false)} style={{ padding: '8px', backgroundColor: '#ccc', color: 'white', borderRadius: '5px' }}>Cancel</button>
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
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr', gap: '20px', minWidth: '300px' }}>
                <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', backgroundColor: '#ffffffff' }}>
                    <h3 className='font-bold'>Actions</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <button style={{ padding: '10px', backgroundColor: '#17549A', color: 'white', borderRadius: '5px' }}>Save Draft</button>
                        <button style={{ padding: '10px', backgroundColor: '#17549A', color: 'white', borderRadius: '5px' }}>Preview</button>
                    </div>
                    <button style={{ padding: '10px', backgroundColor: '#17549A', color: 'white', borderRadius: '5px', marginTop: '10px' }} className='w-full' >Publish</button>
                </div>
                <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', backgroundColor: '#ffffffff' }}>
                    <h3 className='font-bold'>Category</h3>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '5px' }} className='border'>
                        <option value="">Select a category</option>
                        <option value="technology">Technology</option>
                        <option value="health">Health</option>
                        <option value="education">Education</option>
                        <option value="entertainment">Entertainment</option>
                    </select>
                </div>
                <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', backgroundColor: '#ffffffff' }}>
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
