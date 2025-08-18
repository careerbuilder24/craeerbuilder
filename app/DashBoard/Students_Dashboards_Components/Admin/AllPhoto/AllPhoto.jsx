import useAdminGalleryAdded from '@/hooks/useAdminGalleryAdded';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Image from 'next/image';
import useOrientation from '../../../../../hooks/useOrientation';
import useAdminCertificationImage from '@/hooks/useAdminCertificationImage';
import usePohelaboishakImage from '@/hooks/usePohelaboishakImage';
import useEidulfitreImages from '@/hooks/useEidulfitreImages';
import useEidUlAdha from '@/hooks/useEidUlAdha';
import useNewsEvent from '@/hooks/useNewsEvent';
import useCharity from '@/hooks/useCharity';
import useAwardGiving from '@/hooks/useAwardgiving';


export default function AllPhoto() {
    // const [userAdminGalleryAdded] = useAdminGalleryAdded();
    const { images } = useOrientation();
    const { Certification } = useAdminCertificationImage();
    const { pohelaBoishakh } = usePohelaboishakImage();
    const { EidulfitreImages } = useEidulfitreImages();
    const { EidUlAdha } = useEidUlAdha();
    const { NewsEventImages } = useNewsEvent();
    const { charity } = useCharity();
    const { AwardGiving } = useAwardGiving();

    console.log(AwardGiving)

    // Local loading states
    const [loadingOrientation, setLoadingOrientation] = useState(true);
    const [loadingCertification, setLoadingCertification] = useState(true);

    // Modal state
    const [modalData, setModalData] = useState(null); // { image_url, title, time }

    // When images update, set loadingOrientation to false only if images is array
    useEffect(() => {
        if (Array.isArray(images)) {
            setLoadingOrientation(false);
        }
    }, [images]);

    // When Certification updates, set loadingCertification to false only if Certification is array
    useEffect(() => {
        if (Array.isArray(Certification)) {
            setLoadingCertification(false);
        }
    }, [Certification]);

    // Close modal if click outside modal content
    const handleModalOutsideClick = (e) => {
        if (e.target.id === 'modalOverlay') {
            setModalData(null);
        }
    };

    return (
        <>
            <div className="container mx-auto">
                <h2 className="mb-4 md:ml-36 lg:ml-40 text-3xl font-bold my-16">
                    Orientation
                </h2>

                {loadingOrientation ? (
                    <p className="text-center text-gray-500">Loading orientation images...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:px-44">
                        {images?.map((items, index) => (
                            <div
                                key={index}
                                className="border rounded-lg shadow-sm overflow-hidden relative group"
                            >
                                <Image
                                    width={800}
                                    height={800}
                                    src={items.image_url}
                                    alt={`Gallery ${index}`}
                                    className="w-full h-40 object-cover cursor-pointer"
                                    onClick={() =>
                                        setModalData({
                                            image_url: items.image_url,
                                            title: items.title,
                                            time: items.uploaded_at,
                                        })
                                    }
                                />
                                <p className="p-2 text-sm bg-gray-100">{items.title}</p>
                                <p className="p-2 text-sm bg-gray-100">{items.uploaded_at}</p>

                            </div>
                        ))}
                    </div>
                )}

                <h2 className="mb-4 md:ml-36 lg:ml-40 text-3xl font-bold my-16">
                    Certification
                </h2>

                {loadingCertification ? (
                    <p className="text-center text-gray-500">Loading certification images...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:px-44">
                        {Certification?.map((Certifications, index) => (
                            <div
                                key={index}
                                className="border rounded-lg shadow-sm overflow-hidden relative group"
                            >
                                <Image
                                    width={800}
                                    height={800}
                                    src={Certifications.image_url}
                                    alt={`Gallery ${index}`}
                                    className="w-full h-40 object-cover cursor-pointer"
                                    onClick={() =>
                                        setModalData({
                                            image_url: Certifications.image_url,
                                            title: Certifications.title,
                                            time: Certifications.created_at,
                                        })
                                    }
                                />
                                <p className="p-2 text-sm bg-gray-100">{Certifications.title}</p>
                                <p className="p-2 text-sm bg-gray-100">{Certifications.created_at}</p>

                            </div>
                        ))}
                    </div>
                )}
                <h2 className="mb-4 md:ml-36 lg:ml-40 text-3xl font-bold my-16">
                    Award Giving
                </h2>

                {loadingCertification ? (
                    <p className="text-center text-gray-500">Loading certification images...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:px-44">
                        {AwardGiving?.map((AwardGivings, index) => (
                            <div
                                key={index}
                                className="border rounded-lg shadow-sm overflow-hidden relative group"
                            >
                                <Image
                                    width={800}
                                    height={800}
                                    src={AwardGivings.image_url}
                                    alt={`Gallery ${index}`}
                                    className="w-full h-40 object-cover cursor-pointer"
                                    onClick={() =>
                                        setModalData({
                                            image_url: AwardGivings.image_url,
                                            title: AwardGivings.title,
                                            time: AwardGivings.created_at,
                                        })
                                    }
                                />
                                <p className="p-2 text-sm bg-gray-100">{AwardGivings.title}</p>
                                <p className="p-2 text-sm bg-gray-100">{AwardGivings.created_at}</p>

                            </div>
                        ))}
                    </div>
                )}
                {/* pohela boishak images */}

                <h2 className="mb-4 md:ml-36 lg:ml-40 text-3xl font-bold my-16">
                    Pohela-Boishakh
                </h2>

                {loadingCertification ? (
                    <p className="text-center text-gray-500">Loading certification images...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:px-44">
                        {pohelaBoishakh?.map((pohelaBoishakhs, index) => (
                            <div
                                key={index}
                                className="border rounded-lg shadow-sm overflow-hidden relative group"
                            >
                                <Image
                                    width={800}
                                    height={800}
                                    src={pohelaBoishakhs.image_url}
                                    alt={`Gallery ${index}`}
                                    className="w-full h-40 object-cover cursor-pointer"
                                    onClick={() =>
                                        setModalData({
                                            image_url: pohelaBoishakhs.image_url,
                                            title: pohelaBoishakhs.title,
                                            time: pohelaBoishakhs.created_at,
                                        })
                                    }
                                />
                                <p className="p-2 text-sm bg-gray-100">{pohelaBoishakhs.title}</p>
                                <p className="p-2 text-sm bg-gray-100">{pohelaBoishakhs.created_at}</p>


                            </div>
                        ))}
                    </div>
                )}
                {/* Eid-ul-Fitre images */}

                <h2 className="mb-4 md:ml-36 lg:ml-40 text-3xl font-bold my-16">
                    Eid-ul-Fitre
                </h2>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:px-44">
                    {EidulfitreImages?.map((EidulfitreImage, index) => (
                        <div
                            key={index}
                            className="border rounded-lg shadow-sm overflow-hidden relative group"
                        >
                            <Image
                                width={800}
                                height={800}
                                src={EidulfitreImage.image_url}
                                alt={`Gallery ${index}`}
                                className="w-full h-40 object-cover cursor-pointer"
                                onClick={() =>
                                    setModalData({
                                        image_url: EidulfitreImage.image_url,
                                        title: EidulfitreImage.title,
                                        time: EidulfitreImage.created_at,
                                    })
                                }
                            />
                            <p className="p-2 text-sm bg-gray-100">{EidulfitreImage.title}</p>
                            <p className="p-2 text-sm bg-gray-100">{EidulfitreImage.created_at}</p>


                        </div>
                    ))}
                </div>
                {/* Eid-ul-Adha images */}

                <h2 className="mb-4 md:ml-36 lg:ml-40 text-3xl font-bold my-16">
                    Eid-ul-Adha
                </h2>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:px-44">
                    {EidUlAdha?.map((EidUlAdhaImages, index) => (
                        <div
                            key={index}
                            className="border rounded-lg shadow-sm overflow-hidden relative group"
                        >
                            <Image
                                width={800}
                                height={800}
                                src={EidUlAdhaImages.image_url}
                                alt={`Gallery ${index}`}
                                className="w-full h-40 object-cover cursor-pointer"
                                onClick={() =>
                                    setModalData({
                                        image_url: EidUlAdhaImages.image_url,
                                        title: EidUlAdhaImages.title,
                                        time: EidUlAdhaImages.created_at,
                                    })
                                }
                            />
                            <p className="p-2 text-sm bg-gray-100">{EidUlAdhaImages.title}</p>
                            <p className="p-2 text-sm bg-gray-100">{EidUlAdhaImages.created_at}</p>


                        </div>
                    ))}
                </div>
                {/* News Event images */}

                <h2 className="mb-4 md:ml-36 lg:ml-40 text-3xl font-bold my-16">
                    News Event images
                </h2>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:px-44">
                    {NewsEventImages?.map((NewsEventImage, index) => (
                        <div
                            key={index}
                            className="border rounded-lg shadow-sm overflow-hidden relative group"
                        >
                            <Image
                                width={800}
                                height={800}
                                src={NewsEventImage.image_url}
                                alt={`Gallery ${index}`}
                                className="w-full h-40 object-cover cursor-pointer"
                                onClick={() =>
                                    setModalData({
                                        image_url: NewsEventImage.image_url,
                                        title: NewsEventImage.title,
                                        time: NewsEventImage.created_at,
                                    })
                                }
                            />
                            <p className="p-2 text-sm bg-gray-100">{NewsEventImage.title}</p>
                            <p className="p-2 text-sm bg-gray-100">{NewsEventImage.created_at}</p>


                        </div>
                    ))}
                </div>
                {/* Charity images */}

                <h2 className="mb-4 md:ml-36 lg:ml-40 text-3xl font-bold my-16">
                    Charity images
                </h2>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:px-44">
                    {charity?.map((charityImage, index) => (
                        <div
                            key={index}
                            className="border rounded-lg shadow-sm overflow-hidden relative group"
                        >
                            <Image
                                width={800}
                                height={800}
                                src={charityImage.image_url}
                                alt={`Gallery ${index}`}
                                className="w-full h-40 object-cover cursor-pointer"
                                onClick={() =>
                                    setModalData({
                                        image_url: charityImage.image_url,
                                        title: charityImage.title,
                                        time: charityImage.created_at,
                                    })
                                }
                            />
                            <p className="p-2 text-sm bg-gray-100">{charityImage.title}</p>
                            <p className="p-2 text-sm bg-gray-100">{charityImage.created_at}</p>


                        </div>
                    ))}
                </div>

            </div>

            {/* Modal */}
            {modalData && (
                <div
                    id="modalOverlay"
                    onClick={handleModalOutsideClick}
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                >
                    <div
                        className="bg-white rounded-lg shadow-lg max-w-lg w-full p-4 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setModalData(null)}
                            className="absolute top-2 right-2 text-gray-700 hover:text-red-600 text-2xl font-bold"
                            aria-label="Close modal"
                        >
                            &times;
                        </button>
                        <img
                            src={modalData.image_url}
                            alt={modalData.title}
                            className="w-full max-h-[400px] object-contain rounded mb-4"
                        />
                        <h3 className="text-xl font-semibold mb-2">{modalData.title}</h3>
                        <p className="text-gray-600 text-sm">Uploaded at: {modalData.time}</p>
                    </div>
                </div>
            )}
        </>
    );
}
