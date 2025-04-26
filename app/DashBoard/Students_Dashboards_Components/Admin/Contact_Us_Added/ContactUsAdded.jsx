import AdminFooter from '@/app/(with-navbar)/componenets/Admin Footer/AdminFooter';
import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const ContactUsAdded = () => {
  const [contactInfo, setContactInfo] = useState({
    email: '',
    address: '',
    contactNumber: '',
    socialLinks: [{ platform: '', url: '' }],
  });

  const [submittedData, setSubmittedData] = useState({ data: [] });
  const [editing, setEditing] = useState(false);

  const handleInputChange = (field, value) => {
    setContactInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSocialLinkChange = (index, field, value) => {
    const updatedLinks = [...contactInfo.socialLinks];
    updatedLinks[index][field] = value;
    setContactInfo((prev) => ({
      ...prev,
      socialLinks: updatedLinks,
    }));
  };

  const addSocialLink = () => {
    setContactInfo((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { platform: '', url: '' }],
    }));
  };

  const handleSubmit = () => {
    const formattedData = {
      email: contactInfo.email,
      address: contactInfo.address,
      contactNumber: contactInfo.contactNumber,
      socialLinks: contactInfo.socialLinks,
    };

    setSubmittedData((prevData) => ({
      data: [...prevData.data, formattedData],
    }));

    setEditing(false);
    console.log('Submitted Data:', formattedData);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  return (
  <>
      <div className="container max-w-3xl mx-auto p-6 bg-gray-50 rounded shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Contact Us - Admin Panel</h1>

      {submittedData.data.length > 0 && !editing ? (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Submitted Contact Information</h2>
            {submittedData.data.map((data, index) => (
              <div key={index}>
                <p><strong>Email:</strong> {data.email}</p>
                <p><strong>Address:</strong> {data.address}</p>
                <p><strong>Contact Number:</strong> {data.contactNumber}</p>
                <h3 className="text-lg font-semibold mt-4">Social Links:</h3>
                <ul>
                  {data.socialLinks.map((link, idx) => (
                    <li key={idx}>
                      <strong>{link.platform}:</strong> <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleEdit}
          >
            Edit
          </button>
        </>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              value={contactInfo.email}
              placeholder='email@gmail.com'
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              value={contactInfo.address}
              placeholder='Address Type Here..'
              onChange={(e) => handleInputChange('address', e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Contact Number</label>
            <PhoneInput
              international
              defaultCountry="BD"
              value={contactInfo.contactNumber}
              onChange={(value) => handleInputChange('contactNumber', value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter phone number"
              required
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Social Links</h3>
            {contactInfo.socialLinks.map((link, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-4 mb-2">
                <input
                  type="text"
                  placeholder="Platform"
                  className="flex-1 p-2 border border-gray-300 rounded"
                  value={link.platform}
                  onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                />
                <input
                  type="url"
                  placeholder="URL"
                  className="flex-1 p-2 border border-gray-300 rounded"
                  value={link.url}
                  onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                />
              </div>
            ))}
            <button
              type="button"
              className="px-4 py-2 bg-[#17549A] text-white rounded hover:bg-blue-500"
              onClick={addSocialLink}
            >
              Add Social Link
            </button>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#17549A] text-white rounded hover:bg-blue-500"
          >
            {editing ? 'Update' : 'Submit'}
          </button>
        </form>
      )}
    </div>
    <AdminFooter />
    
  </>
  );
};

export default ContactUsAdded;
