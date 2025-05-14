import React, { useState } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import useCertificates from '@/hooks/useCertificates';
import Image from 'next/image';

export default function Certifactes() {

    const certificate = useCertificates();
    const [activeTabIndex2, setActiveTabIndex2] = useState(0);
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);



    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%', // Use a percentage for responsiveness
        maxWidth: 600, // Set a max width for larger screens
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        p: 1,
        borderRadius: '8px', // Optional: Add rounded corners for aesthetics
    };





    const handleOpen = (index) => {
        const selectedImage = filteredCertificates[index];  // Get the image from the filtered list
        setSelectedImage(selectedImage); // Set the selected image from filteredCertificates
        setOpen(true); // Open the modal
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedImage(null); // Clear selected image on close
    };

    // filter those events
    const filterEvents = () => {
        const category = [
            'All',           // Add an 'All' category for the "All Certificates" tab
            'University',
            'Professional',
            'Diploma',
        ];

        // If "All Certificates" (index 0) is selected, return all certificates
        if (activeTabIndex2 === 0) return certificate;

        const selectedCategory = category[activeTabIndex2];

        // Ensure the comparison works correctly and accounts for case sensitivity
        return certificate.filter(event => event.certificateTitle === selectedCategory);
    };

    const filteredCertificates = filterEvents();

    console.log(filteredCertificates);


    return (
        <>
            {/* certifications */}

            <div className=' '>

                <h1 className='text-3xl font-bold text-white  text-center'>Certifications</h1>


                <div className='flex items-center text-white bg-blue-500 h-10 lg:w-7/12 lg:ml-16 font-bold gap-2'>
                    <p className='lg:ml-4'> Academic Certifications</p>
                    <p>/ Diploma | Certificates</p>
                </div>


                {/* Modal Part */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Box sx={style}>
                        {selectedImage && (
                            <div className="relative">
                                <Image
                                    src={selectedImage.image}  // Show the selected image
                                    className="w-full h-auto rounded-md"
                                    alt={selectedImage.certificateName}
                                    width={500}  
                                    height={500}
                                />
                                <div className="absolute bottom-10 left-0 w-full p-4 bg-black opacity-75 rounded-md">
                                    <time dateTime={selectedImage.date} className="text-white text-sm">{selectedImage.date}</time>
                                    <h3 className="text-white text-base">{selectedImage.description}</h3>
                                </div>
                            </div>
                        )}
                    </Box>
                </Modal>

               <Tabs selectedIndex={activeTabIndex2} onSelect={index => setActiveTabIndex2(index)}>

                    <TabList className="flex flex-col md:flex-row lg:flex-row justify-center items-center lg:space-x-4 text-center">
                        <Tab className="cursor-pointer p-2 border-2 transition-all duration-200 hover:border-blue-500 focus:outline-blue-600 bg-[#11569C] text-white  hover:bg-[#2EA9E1] hover:text-white selected:bg-blue-200  mt-5 lg:w-28 w-full ">
                            All
                        </Tab>

                        <Tab className="cursor-pointer p-2 border-2 transition-all duration-200 hover:border-blue-500 focus:outline-blue-600 bg-[#11569C] text-white  hover:bg-[#2EA9E1] hover:text-white selected:bg-blue-200  mt-5 lg:w-28 w-full">
                            University
                        </Tab>
                        <Tab className="cursor-pointer p-2 border-2 transition-all duration-200 hover:border-blue-500 focus:outline-blue-600 bg-[#11569C] text-white  hover:bg-[#2EA9E1] hover:text-white selected:bg-blue-200 mt-5 lg:w-28 w-full">
                            Professional
                        </Tab>
                        <Tab className="cursor-pointer p-2 border-2 transition-all duration-200 hover:border-blue-500 focus:outline-blue-600 bg-[#11569C] text-white  hover:bg-[#2EA9E1] hover:text-white selected:bg-blue-200 mt-5 lg:w-28 w-full">
                            Diploma
                        </Tab>
                    </TabList>

                    {/* Tab Panels */}
                    <TabPanel>
                        {/* panel 1 */}




                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 p-10 shadow-lg'>
                            {certificate?.map((certificates, index) => (
                                <div
                                    key={certificates?.id}
                                    className="bg-base-100 cursor-pointer p-10 my-10 py-20 transition-shadow duration-300 shadow-2xl relative"
                                >
                                    {/* Small folded image at top right */}
                                    {/* <Image
                        src={pageFold}
                        height={20}  
                        width={50}   
                        className="absolute right-0 top-0 z-10"
                        alt="Folded corner"
                        onDragStart={(e) => e.preventDefault()}
                    /> */}

                                    {/* Main image */}
                                    <div className="relative w-full h-full overflow-hidden">
                                        <Image
                                            className="w-full h-full cursor-zoom-in object-cover transform hover:scale-105 transition-transform duration-300"
                                            src={certificates?.image}
                                            alt={certificates?.certificateName}
                                            onClick={() => handleOpen(index)}
                                            height={500} // Adjust height for better clarity
                                            width={500}  // Adjust width for better clarity
                                        />
                                    </div>

                                    {/* Certificate Name */}
                                    <figcaption className="text-center mt-4 font-semibold text-xs text-gray-800">
                                        {certificates?.certificateName}
                                    </figcaption>
                                    <button className='w-full h-8 rounded-2xl shadow-xl text-sm font-bold hover:bg-blue-200 transition ease-in-out duration-300 mt-2'>watch list</button>
                                </div>
                            ))}
                        </div>





                    </TabPanel>
                    <TabPanel>
                        {/* panel 2 */}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 p-10 shadow-lg">
                            {filteredCertificates.map((filteredCertificatess, index) => (
                                <div
                                    key={filteredCertificatess?.id}
                                    className="bg-base-100 cursor-pointer p-10 my-10 py-20 transition-shadow duration-300 shadow-2xl relative"
                                >
                                    <div className="relative w-full h-full overflow-hidden">
                                        <Image
                                            className="w-full h-full cursor-zoom-in object-cover transform hover:scale-105 transition-transform duration-300"
                                            src={filteredCertificatess?.image}
                                            alt={filteredCertificatess?.certificateName}
                                            onClick={() => handleOpen(index)} // Pass the correct index to handleOpen
                                            height={700}
                                            width={700}
                                        />
                                    </div>
                                    <figcaption className="text-center mt-4 font-semibold text-xs text-gray-800">
                                        {filteredCertificatess?.certificateName}
                                    </figcaption>
                                    <button className="w-full h-8 rounded-2xl shadow-xl text-sm font-bold hover:bg-blue-200 transition ease-in-out duration-300 mt-2">watch list</button>
                                </div>
                            ))}
                        </div>

                    </TabPanel>
                    <TabPanel>
                        {/* panel 3 */}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 p-10 shadow-lg">
                            {filteredCertificates.map((filteredCertificatess, index) => (
                                <div
                                    key={filteredCertificatess?.id}
                                    className="bg-base-100 cursor-pointer p-10 my-10 py-20 transition-shadow duration-300 shadow-2xl relative"
                                >
                                    <div className="relative w-full h-full overflow-hidden">
                                        <Image
                                            className="w-full h-full cursor-zoom-in object-cover transform hover:scale-105 transition-transform duration-300"
                                            src={filteredCertificatess?.image}
                                            alt={filteredCertificatess?.certificateName}
                                            onClick={() => handleOpen(index)} // Pass the correct index to handleOpen
                                            height={500}
                                            width={500}
                                        />
                                    </div>
                                    <figcaption className="text-center mt-4 font-semibold text-xs text-gray-800">
                                        {filteredCertificatess?.certificateName}
                                    </figcaption>
                                    <button className="w-full h-8 rounded-2xl shadow-xl text-sm font-bold hover:bg-blue-200 transition ease-in-out duration-300 mt-2">watch list</button>
                                </div>
                            ))}
                        </div>

                    </TabPanel>
                    <TabPanel>
                        {/* panel 4 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 p-10 shadow-lg">
                            {filteredCertificates.map((filteredCertificatess, index) => (
                                <div
                                    key={filteredCertificatess?.id}
                                    className="bg-base-100 cursor-pointer p-10 my-10 py-20 transition-shadow duration-300 shadow-2xl relative"
                                >
                                    <div className="relative w-full h-full overflow-hidden">
                                        <Image
                                            className="w-full h-full cursor-zoom-in object-cover transform hover:scale-105 transition-transform duration-300"
                                            src={filteredCertificatess?.image}
                                            alt={filteredCertificatess?.certificateName}
                                            onClick={() => handleOpen(index)} // Pass the correct index to handleOpen
                                            height={500}
                                            width={500}
                                        />
                                    </div>
                                    <figcaption className="text-center mt-4 font-semibold text-xs text-gray-800">
                                        {filteredCertificatess?.certificateName}
                                    </figcaption>
                                    <button className="w-full h-8 rounded-2xl shadow-xl text-sm font-bold hover:bg-blue-200 transition ease-in-out duration-300 mt-2">watch list</button>
                                </div>
                            ))}
                        </div>

                    </TabPanel>
                </Tabs>
            </div>
        </>
    )
}