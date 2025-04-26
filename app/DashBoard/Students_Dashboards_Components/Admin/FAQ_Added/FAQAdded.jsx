import AdminFooter from '@/app/(with-navbar)/componenets/Admin Footer/AdminFooter';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';

import userFaqAdd from '@/hooks/useFaqAdded'
import Faq from '@/hooks/useFaqAdded';

const FAQAdded = () => {

  // modal statements 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFaq, setCurrentFaq] = useState({
    id: null,
    title: '',
    sub_title: '',
    description: '',
  });


  const [faqData, setFaqData] = useState({
    sections: [
      {
        title: '',
        sub_title: '',
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


  // modal open 
  const openEditModal = (faq) => {
    setCurrentFaq({
      id: faq.id,
      title: faq.title,
      sub_title: faq.sub_title,
      description: faq.description,
    });
    setIsModalOpen(true);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to post these FAQ sections?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, post it!',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) {
      return; // User cancelled
    }

    try {
      const responses = await Promise.all(
        faqData.sections.map(async (section) => {
          const res = await fetch("/api/FAQ_Added", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: section.mainTitle,
              sub_title: section.sub_title,
              description: section.description,
            }),
          });
          return res.json();
        })
      );

      const hasError = responses.find((res) => !res.success);

      if (hasError) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Some sections failed to submit.',
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'All FAQ sections submitted successfully!',
        });

        setFaqData({
          sections: [{ mainTitle: "", subTitle: "", description: "" }],
        });
      }
    } catch (err) {
      console.error("Submit Error:", err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong while submitting!',
      });
    }
  };

  const [userFaqAdd] = Faq();

  // console.log(userFaqAdd)


  // delete function
  const handleDeleteFaq = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This FAQ will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/FAQ_Added?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.success) {
        Swal.fire('Deleted!', 'FAQ has been deleted.', 'success');

      } else {
        Swal.fire('Error!', data.message || 'Failed to delete FAQ.', 'error');
      }
    } catch (error) {
      console.error('Delete error:', error);
      Swal.fire('Error!', 'Something went wrong.', 'error');
    }
  };


  // edit function
  const handleUpdateFaq = async () => {
    try {
      const res = await fetch("/api/FAQ_Added", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: currentFaq.id,
          title: currentFaq.title,
          sub_title: currentFaq.sub_title,
          description: currentFaq.description,
        }),
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire('Updated!', 'FAQ updated successfully.', 'success');
        setIsModalOpen(false);
      } else {
        Swal.fire('Error!', data.message || 'Failed to update FAQ.', 'error');
      }
    } catch (error) {
      console.error('Update error:', error);
      Swal.fire('Error!', 'Something went wrong.', 'error');
    }
  };




  return (
    <>
      <div className="max-w-7xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
        <Helmet>
          <title>Add FAQ Sections</title>
          <meta name="description" content={'Add FAQs to your website for better user understanding.'} />
          <meta name="keywords" content={'FAQ, questions, answers, help'} />
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



      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit FAQ</h2>

            <input
              type="text"
              className="w-full border p-2 mb-3 rounded"
              placeholder="Title"
              value={currentFaq.title}
              onChange={(e) => setCurrentFaq({ ...currentFaq, title: e.target.value })}
            />
            <input
              type="text"
              className="w-full border p-2 mb-3 rounded"
              placeholder="SubTitle"
              value={currentFaq.sub_title}
              onChange={(e) => setCurrentFaq({ ...currentFaq, sub_title: e.target.value })}
            />
            <textarea
              className="w-full border p-2 mb-3 rounded"
              placeholder="Description"
              value={currentFaq.description}
              onChange={(e) => setCurrentFaq({ ...currentFaq, description: e.target.value })}
            />

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateFaq}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Render Existing FAQ Cards */}
      <div className="max-w-7xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md my-10">
        <h2 className="text-xl font-bold mb-6 text-center">Submitted FAQ Sections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {userFaqAdd?.map((faq, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-sm bg-gray-100 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-blue-600 mb-2">{faq.title}</h3>
              <h4 className="text-md font-medium text-gray-700 mb-1">{faq.sub_title}</h4>
              <p className="text-sm text-gray-600">{faq.description}</p>

              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => openEditModal(faq)}
                  className="text-yellow-600 hover:underline"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteFaq(faq.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>
      <AdminFooter />


    </>
  );
};

export default FAQAdded;
