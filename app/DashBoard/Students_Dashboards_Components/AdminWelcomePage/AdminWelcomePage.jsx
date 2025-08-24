import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lottie from 'lottie-react';

export default function AdminWelcomePage() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Show toast
    toast.success("Welcome Admin!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });

    // Load Lottie JSON from public folder
    fetch('/animationData/lottie/welcome.json')
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error("Failed to load Lottie:", err));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
     
      
      {animationData && (
        <div className="w-72 h-72">
          <Lottie animationData={animationData} loop={true} />
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
