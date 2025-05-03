import AdminFooter from '@/app/(with-navbar)/componenets/Admin Footer/AdminFooter';
import React, { useState } from 'react';

const AboutUsAdded = () => {
  const [visionMission, setVisionMission] = useState([{ title: '', description: '' }]);
  const [middleSections, setMiddleSections] = useState([{ title: '', image: null, description: '' }]);
  const [teamMembers, setTeamMembers] = useState([{ name: '', designation: '', image: null }]);
  const [submittedData, setSubmittedData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingData, setEditingData] = useState(null);



  const handleVisionMissionChange = (index, field, value) => {
    const updated = [...visionMission];
    updated[index][field] = value;
    setVisionMission(updated);
  };

  const addVisionMission = () => {
    setVisionMission([...visionMission, { title: '', description: '' }]);
  };

  const handleMiddleSectionChange = (index, field, value) => {
    const updated = [...middleSections];
    if (field === 'image' && value) {
      updated[index][field] = value;
    } else {
      updated[index][field] = value;
    }
    setMiddleSections(updated);
  };

  const addMiddleSection = () => {
    setMiddleSections([...middleSections, { title: '', image: null, description: '' }]);
  };

  const handleTeamMemberChange = (index, field, value) => {
    const updated = [...teamMembers];
    updated[index][field] = value;
    setTeamMembers(updated);
  };

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { name: '', designation: '', image: null }]);
  };

  const handleSubmit = () => {
    const formData = [
      ...visionMission.map((item) => ({
        type: 'Vision and Mission',
        title: item.title,
        description: item.description,
      })),
      ...middleSections.map((section) => ({
        type: 'Middle Section',
        title: section.title,
        image: section.image ? URL.createObjectURL(section.image) : null,
        description: section.description,
      })),
      ...teamMembers.map((member) => ({
        type: 'Team Member',
        name: member.name,
        designation: member.designation,
        image: member.image ? URL.createObjectURL(member.image) : null,
      })),
    ];
    setSubmittedData([...submittedData, ...formData]);
    console.log('Submitted Data:', formData);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    const dataToEdit = { ...submittedData[index] };
    setEditingData(dataToEdit);
  };

  const handleUpdate = () => {
    const updatedData = [...submittedData];
    updatedData[editingIndex] = editingData;
    setSubmittedData(updatedData);
    setEditingIndex(null);
    setEditingData(null);
  };

  const handleInputChange = (field, value) => {
    if (editingData.type === 'Team Member' && field === 'name') {
      setEditingData((prevData) => ({
        ...prevData,
        name: value,
      }));
    } else if (editingData.type === 'Team Member' && field === 'designation') {
      setEditingData((prevData) => ({
        ...prevData,
        designation: value,
      }));
    } else {
      setEditingData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    }
  };

  const handleImageChange = (field, file) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setEditingData((prevData) => ({
        ...prevData,
        [field]: reader.result,  // Store the base64 image data
      }));
    };

    if (file) {
      reader.readAsDataURL(file);  // Read the image file as data URL
    }
  };

  return (
    <>
      <div className="container max-w-3xl mx-auto p-6 bg-gray-50 rounded shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">About Us - Admin Panel</h1>
        {/* Vision and Mission */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Vision and Mission</h2>
          {visionMission.map((item, index) => (
            <div key={index} className="mb-4">
              <input
                className="w-full p-2 mb-2 border border-gray-300 rounded"
                type="text"
                placeholder="Title"
                value={item.title}
                onChange={(e) => handleVisionMissionChange(index, 'title', e.target.value)}
              />
              <textarea
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Description"
                value={item.description}
                onChange={(e) => handleVisionMissionChange(index, 'description', e.target.value)}
              />
            </div>
          ))}
          <button
            className="px-4 py-2 bg-[#17549A] text-white hover:bg-blue-500 rounded"
            onClick={addVisionMission}
          >
            Add Section
          </button>
        </section>



        {/* Middle Sections */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Middle Sections</h2>
          {middleSections.map((section, index) => (
            <div key={index} className="mb-4">
              <input
                className="w-full p-2 mb-2 border border-gray-300 rounded"
                type="text"
                placeholder="Section Title"
                value={section.title}
                onChange={(e) => handleMiddleSectionChange(index, 'title', e.target.value)}
              />


              <textarea
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Description"
                value={section.description}
                onChange={(e) => handleMiddleSectionChange(index, 'description', e.target.value)}
              />


              {/* Display Image if Exists */}
              {section.image && (
                <div>
                  <img src={URL.createObjectURL(section.image)} alt="Middle Section" className="w-20 h-20 mb-2" />
                </div>
              )}

              <input
                className="w-full p-2 mb-2 border border-gray-300 rounded"
                type="file"
                onChange={(e) => handleMiddleSectionChange(index, 'image', e.target.files[0])}
              />
            </div>
          ))}
          <button
            className="px-4 py-2 bg-[#17549A] text-white hover:bg-blue-500 rounded"
            onClick={addMiddleSection}
          >
            Add Middle Section
          </button>
        </section>


        {/* Team Members */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Team Members</h2>
          {teamMembers.map((member, index) => (
            <div key={index} className="mb-4">
              {member.image && (
                <div>
                  <img src={URL.createObjectURL(member.image)} alt="Team Member" className="w-20 h-20 mb-2" />
                </div>
              )}
              <input
                className="w-full p-2 mb-2 border border-gray-300 rounded"
                type="text"
                placeholder="Name"
                value={member.name}
                onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
              />
              <input
                className="w-full p-2 mb-2 border border-gray-300 rounded"
                type="text"
                placeholder="Designation"
                value={member.designation}
                onChange={(e) => handleTeamMemberChange(index, 'designation', e.target.value)}
              />
              <input
                className="w-full p-2 mb-2 border border-gray-300 rounded"
                type="file"
                onChange={(e) => handleTeamMemberChange(index, 'image', e.target.files[0])}
              />
            </div>
          ))}

          <button
            className="px-4 py-2 bg-[#17549A]  text-white hover:bg-blue-500 rounded"
            onClick={addTeamMember}
          >
            Add Team Member
          </button>
        </section>

        {/* Submit Button */}
        <button
          className="w-full px-4 py-2 bg-[#17549A]  text-white hover:bg-blue-500  rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>


        {/* Submitted Data */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Submitted Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {submittedData.map((item, index) => (
              <div key={index} className="border p-4 mb-4 rounded shadow ">
                <h3 className="font-bold text-lg">{item.type}</h3>
                {item.type === 'Vision and Mission' && (
                  <div>
                    <h4 className="text-md font-semibold">{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                )}
                {item.type === 'Middle Section' && (
                  <div>
                    <h4 className="text-md font-semibold">{item.title}</h4>
                    {item.image && <img src={item.image} alt="Middle Section" className="w-20 h-20 mb-2" />}
                    <p>{item.description}</p>
                  </div>
                )}
                {item.type === 'Team Member' && (
                  <div>
                    <h4 className="text-md font-semibold">{item.name}</h4>
                    <p>{item.designation}</p>
                    {item.image && <img src={item.image} alt="Team Member" className="w-20 h-20 mb-2" />}
                  </div>
                )}
                <button
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>


        {/* Editing Form */}
        {editingIndex !== null && editingData && (
          <div className="mt-8 p-6 bg-gray-100 rounded shadow-md">
            <h3 className="text-xl font-semibold mb-4">Edit {editingData.type}</h3>

            <div className="mb-4">
              {editingData.type === 'Team Member' ? (
                <>
                  {editingData.image && (
                    <div className="mb-4">
                      <img src={editingData.image} alt="Team Member" className="w-20 h-20 mb-2" />
                    </div>
                  )}

                  <input
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                    type="text"
                    placeholder="Name"
                    value={editingData.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                  <input
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                    type="text"
                    placeholder="Designation"
                    value={editingData.designation || ''}
                    onChange={(e) => handleInputChange('designation', e.target.value)}
                  />
                  <input
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange('image', e.target.files[0])}
                  />
                </>
              ) : editingData.type === 'Middle Section' ? (
                <>
                  {editingData.image && (
                    <div className="mb-4">
                      <img src={editingData.image} alt="Middle Section" className="w-20 h-20 mb-2" />
                    </div>
                  )}
                  <input
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                    type="text"
                    placeholder="Title"
                    value={editingData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                  <textarea
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                    placeholder="Description"
                    value={editingData.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                  <input
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange('image', e.target.files[0])}
                  />
                </>
              ) : (
                // Don't display the image input field for Vision and Mission
                <>
                  <input
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                    type="text"
                    placeholder="Title"
                    value={editingData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                  <textarea
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                    placeholder="Description"
                    value={editingData.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                </>
              )}
            </div>

            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        )}

      </div>
      <AdminFooter />
    </>
  );
};

export default AboutUsAdded;
