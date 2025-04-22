import AdminFooter from '@/app/(with-navbar)/componenets/Admin Footer/AdminFooter';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

const FAQAdded = () => {
  const [faqData, setFaqData] = useState({
    sections: [
      {
        mainTitle: '',
        subTitle: '',
        description: '',
      },
    ],
  });

  const handleSectionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSections = [...faqData.sections];
    updatedSections[index][name] = value;
    setFaqData((prev) => ({
      ...prev,
      sections: updatedSections,
    }));
  };

  const addSection = () => {
    setFaqData((prev) => ({
      ...prev,
      sections: [...prev.sections, { mainTitle: '', subTitle: '', description: '' }],
    }));
  };

  const removeSection = (index) => {
    const updatedSections = faqData.sections.filter((_, i) => i !== index);
    setFaqData((prev) => ({
      ...prev,
      sections: updatedSections,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted FAQ Data:', faqData);
    // Submit the data to your backend or database
  };

  // Generate dynamic meta description and keywords
  const metaDescription = faqData.sections
    .map((section) => `${section.mainTitle}: ${section.subTitle}`)
    .join(' | ');

  const metaKeywords = faqData.sections
    .map((section) => section.mainTitle)
    .join(', ');

  return (
    <>
      <div className="max-w-7xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
        <Helmet>
          <title>Add FAQ Sections</title>
          <meta name="description" content={metaDescription || 'Add FAQs to your website for better user understanding.'} />
          <meta name="keywords" content={metaKeywords || 'FAQ, questions, answers, help'} />
          <meta name="author" content="Your Name or Organization" />
        </Helmet>

        <h2 className="text-xl font-bold mb-6 text-center">Add FAQ Sections</h2>
        <form onSubmit={handleSubmit}>
          {/* Sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {faqData.sections.map((section, index) => (
              <div key={index} className="border p-4 rounded-md bg-gray-50">
                <h3 className="font-semibold mb-3">Section {index + 1}</h3>

                {/* Main Title */}
                <div className="mb-4">
                  <label className="block text-base font-bold mb-1">Main Title</label>
                  <input
                    type="text"
                    name="mainTitle"
                    value={section.mainTitle}
                    onChange={(e) => handleSectionChange(index, e)}
                    className="w-full border rounded px-3 py-2"
                    placeholder="Enter Main Title"
                    required
                  />
                </div>

                {/* Sub Title */}
                <div className="mb-4">
                  <label className="block text-base font-bold mb-1">Sub Title</label>
                  <input
                    type="text"
                    name="subTitle"
                    value={section.subTitle}
                    onChange={(e) => handleSectionChange(index, e)}
                    className="w-full border rounded px-3 py-2"
                    placeholder="Enter Sub Title"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-base font-bold mb-1">Description</label>
                  <textarea
                    name="description"
                    value={section.description}
                    onChange={(e) => handleSectionChange(index, e)}
                    className="w-full border rounded px-3 py-2"
                    placeholder="Enter Description"
                    required
                  />
                </div>

                <button
                  type="button"
                  onClick={() => removeSection(index)}
                  className="mt-4 text-red-500 underline"
                >
                  Remove Section
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={addSection}
              className="mr-4 bg-[#2CAAE1] text-white py-2 px-6 rounded-md hover:bg-[#8bdcff] transition"
            >
              Add Another Section
            </button>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition"
            >
              Submit FAQ
            </button>
          </div>
        </form>
      </div>
      <AdminFooter />
    </>
  );
};

export default FAQAdded;
