'use client';
import React, { useState } from 'react';

export default function CreatePage() {
  const [blocks, setBlocks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const [tempHeading, setTempHeading] = useState('');
  const [tempParagraph, setTempParagraph] = useState('');
  const [tempImage, setTempImage] = useState(null);
  const [imageWidth, setImageWidth] = useState(100); // default 100%
  const [imageHeight, setImageHeight] = useState(100); // default 100%

  const handleAddBlock = () => {
    const newBlock = { heading: 'New Heading', paragraph: 'New paragraph...', image: null, width: 100, height: 100 };
    setBlocks([...blocks, newBlock]);
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setTempHeading(blocks[index].heading);
    setTempParagraph(blocks[index].paragraph);
    setTempImage(blocks[index].image);
    setImageWidth(blocks[index].width || 100);
    setImageHeight(blocks[index].height || 100);
    setShowSidebar(true);
  };

  const handleSave = () => {
    const updatedBlocks = [...blocks];
    updatedBlocks[editingIndex] = {
      heading: tempHeading,
      paragraph: tempParagraph,
      image: tempImage,
      width: imageWidth,
      height: imageHeight,
    };
    setBlocks(updatedBlocks);
    setShowSidebar(false);
    setEditingIndex(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setTempImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex relative min-h-screen ">
      {/* Main Content */}
      <div className="flex-1  lg:px-28 container mx-auto">
        <div className="flex justify-between">
          <div></div>
          <button
            onClick={handleAddBlock}
            className="bg-[#17549A] text-white px-4 py-2 rounded mb-4"
          >
            Add Section
          </button>
        </div>

        {blocks.map((block, index) => (
          <div key={index} className="mb-6 relative overflow-hidden ">
            {block.image && (
              <img
                src={block.image}
                alt=""
                style={{ width: `${block.width}%`, height: `${block.height}%`, objectFit: 'cover' }}
              />
            )}
            <div className="p-2">
              {block.heading && <h2 className="text-xl font-bold">{block.heading}</h2>}
              {block.paragraph && <p className="mt-2 text-justify">{block.paragraph}</p>}
            </div>
            <button
              onClick={() => handleEditClick(index)}
              className="absolute top-2 right-2 bg-[#00ADEF] text-white px-2 py-1 rounded text-sm"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {/* Right Sidebar */}
      {showSidebar && (
        <div className="w-96 bg-gray-100 p-6 border-l border-gray-300 fixed right-0 top-0 h-full overflow-y-auto shadow-lg">
          <h2 className="text-xl font-bold mb-4">Edit Block</h2>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Heading</label>
            <input
              type="text"
              value={tempHeading}
              onChange={(e) => setTempHeading(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Paragraph</label>
            <textarea
              value={tempParagraph}
              onChange={(e) => setTempParagraph(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Image</label>
            <input type="file" onChange={handleImageUpload} />
            {tempImage && (
              <>
                <img
                  src={tempImage}
                  alt=""
                  className="mt-2"
                  style={{
                    width: `${imageWidth}%`,
                    maxWidth: '100%',
                    height: `${imageHeight}px`, // use px instead of %
                    objectFit: 'cover'
                  }}
                />

                <div className="mt-2">
                  <label className="block">Width: {imageWidth}%</label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={imageWidth}
                    onChange={(e) => setImageWidth(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="mt-2">
                  <label className="block">Height: {imageHeight}%</label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={imageHeight}
                    onChange={(e) => setImageHeight(e.target.value)}
                    className="w-full"
                  />
                </div>
              </>
            )}
          </div>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={() => setShowSidebar(false)}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
