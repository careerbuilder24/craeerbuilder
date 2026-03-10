"use client"; // Must be first line

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation"; 
import Image from "next/image";

export default function ScrollModal() {
  const [showModal, setShowModal] = useState(false);
  const [hasClosed, setHasClosed] = useState(false);
  const router = useRouter(); 
  const modalRef = useRef(null); // reference to modal content

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300 && !showModal && !hasClosed) {
        setShowModal(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showModal, hasClosed]);

  if (!showModal) return null;

  const handleClose = () => {
    setShowModal(false);
    setHasClosed(true); 
  };

  const handleGrabOffer = () => {
    setShowModal(false);
    router.push("/Courses"); 
  };

  // Close modal if click outside content
  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      onClick={handleOverlayClick} // handle clicks on overlay
    >
      <div
        ref={modalRef} // modal content reference
        className="bg-white rounded-2xl p-6 max-w-md w-full relative shadow-lg"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl"
        >
          ✕
        </button>

        {/* Image */}
        <div className="flex justify-center">
          <Image
            src="https://i.postimg.cc/pLWsC0TN/swdfisdg.png"
            alt="Discount Offer"
            width={200}
            height={200}
          />
        </div>

        {/* Text */}
        <h2 className="text-center text-2xl font-bold mt-4 text-red-600">Get 50% OFF!</h2>
        <p className="text-center text-gray-700 mt-2">
          Limited-time offer on all our courses. Don’t miss out!
        </p>

        {/* CTA */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleGrabOffer} 
            className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Grab Offer
          </button>
        </div>
      </div>
    </div>
  );
}
