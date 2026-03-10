// "use client";
// import React, { useState } from "react";
// import Image from "next/image";

// export default function StudentEnrollCourse() {
//   const [selectedCourse, setSelectedCourse] = useState(null);

//   const courses = [
//     {
//       title: "Business Development",
//       desc: "Start your learning journey with our expert-guided courses.",
//       img: "https://i.postimg.cc/tTZKn6PC/rfgo.png",
//     },
//     {
//       title: "Graphics Design",
//       desc: "Master Photoshop, Illustrator, and modern design trends.",
//       img: "https://i.postimg.cc/hhFVrkf7/sdjgn.png",
//     },
//     {
//       title: "SEO",
//       desc: "Learn search engine optimization to boost website rankings.",
//       img: "https://i.postimg.cc/rmVTdsjD/wfoi.png",
//     },
//     {
//       title: "Web Development",
//       desc: "Build websites with HTML, CSS, JavaScript, and React.",
//       img: "https://i.postimg.cc/RhF60Kdp/webd.png",
//     },
//     {
//       title: "3D & Motion",
//       desc: "Create 3D animations and motion graphics for media.",
//       img: "https://i.postimg.cc/yx3bWCMJ/ergiuh.png",
//     },
//     {
//       title: "Digital Marketing",
//       desc: "Promote businesses online with social media & ads.",
//       img: "https://i.postimg.cc/ZqKZn0VC/ewfgij.png",
//     },
//   ];

//   return (
//     <div className="max-w-6xl mx-auto px-4">
//       <div className="flex flex-wrap justify-center gap-6 p-20">
//         {courses.map((course, index) => (
//           <div
//             key={index}
//             className="flex-1 min-w-[280px] max-w-[350px] text-black shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition flex flex-col"
//           >
//             {/* Full width responsive image */}
//             <div className="relative w-full h-fit">
//               <Image
//                 src={course.img}
//                 alt={course.title}
//                 objectFit="cover"
//                 height={800}
//                 width={800}
//                 className="rounded-t-2xl"
//               />
//             </div>

//             {/* Card Content */}
//             <div className="p-5 flex flex-col flex-1">
//               <h3 className="text-lg font-semibold">{course.title}</h3>
//               <p className="text-sm mt-2">{course.desc}</p>

//               {/* Button aligned bottom-right */}
//               <div className="mt-auto flex justify-end">
//                 <button
//                   onClick={() => setSelectedCourse(course)} // open modal
//                   className="bg-[#3385e2] text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-[#56D3FD] transition"
//                 >
//                   Enroll
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal for Payment Form */}
//       {selectedCourse && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white p-8 rounded-2xl shadow-xl w-[400px] relative">
//             <button
//               className="absolute top-2 right-2 text-gray-500 hover:text-black"
//               onClick={() => setSelectedCourse(null)}
//             >
//               ✕
//             </button>
//             <h2 className="text-xl font-bold mb-4">
//               Enroll in {selectedCourse.title}
//             </h2>
//             <form
//               onSubmit={async (e) => {
//                 e.preventDefault();
//                 const formData = new FormData(e.target);
//                 const data = Object.fromEntries(formData.entries());

//                 const res = await fetch("/api/sslcommerz", {
//                   method: "POST",
//                   headers: { "Content-Type": "application/json" },
//                   body: JSON.stringify(data),
//                 });

//                 const result = await res.json();
//                 if (result.GatewayPageURL) {
//                   // redirect browser to SSLCommerz payment page
//                   window.location.href = result.GatewayPageURL;
//                 } else {
//                   alert("Payment initialization failed");
//                   console.error(result);
//                 }
//               }}
//             >
//               <input
//                 type="hidden"
//                 name="course"
//                 value={selectedCourse.title}
//               />

//               <div className="mb-3">
//                 <label className="block text-sm font-medium">
//                   Your Name
//                 </label>
//                 <input
//                   type="text"
//                   name="customer_name"
//                   required
//                   className="w-full border rounded-lg p-2"
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="block text-sm font-medium">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   name="customer_email"
//                   required
//                   className="w-full border rounded-lg p-2"
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="block text-sm font-medium">
//                   Phone
//                 </label>
//                 <input
//                   type="text"
//                   name="customer_phone"
//                   required
//                   className="w-full border rounded-lg p-2"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="bg-[#3385e2] w-full text-white py-2 rounded-lg mt-4 hover:bg-[#17549A]"
//               >
//                 Pay with SSLCommerz
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaGraduationCap, FaTimes, FaMoneyBillWave } from "react-icons/fa"; // Added icons

export default function StudentEnrollCourse() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Define the primary color palette for consistency
  const primaryColor = 'bg-blue-600';
  const primaryHoverColor = 'hover:bg-blue-700';

  const courses = [
    {
      title: "Business Development",
      desc: "Start your learning journey with our expert-guided courses to scale your business.",
      img: "https://i.postimg.cc/tTZKn6PC/rfgo.png",
      price: 49.99, // Added a mock price for the form context
    },
    {
      title: "Graphics Design",
      desc: "Master Photoshop, Illustrator, and modern design trends for stunning visuals.",
      img: "https://i.postimg.cc/hhFVrkf7/sdjgn.png",
      price: 59.99,
    },
    {
      title: "SEO",
      desc: "Learn search engine optimization strategies to boost website rankings and traffic.",
      img: "https://i.postimg.cc/rmVTdsjD/wfoi.png",
      price: 39.99,
    },
    {
      title: "Web Development",
      desc: "Build professional websites with HTML, CSS, JavaScript, and modern frameworks like React.",
      img: "https://i.postimg.cc/RhF60Kdp/webd.png",
      price: 69.99,
    },
    {
      title: "3D & Motion",
      desc: "Create immersive 3D animations and motion graphics for film and digital media.",
      img: "https://i.postimg.cc/yx3bWCMJ/ergiuh.png",
      price: 79.99,
    },
    {
      title: "Digital Marketing",
      desc: "Promote businesses online with targeted social media campaigns and effective ad strategies.",
      img: "https://i.postimg.cc/ZqKZn0VC/ewfgij.png",
      price: 44.99,
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center">
                 Enroll in Our Top Courses
            </h1>
            <p className="text-xl text-gray-600 mt-2">Choose the path that leads to your success.</p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transform hover:scale-[1.01] hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              
              {/* Image */}
              <div className="relative w-full h-48">
                <Image
                  src={course.img}
                  alt={course.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-xl"
                />
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-base text-gray-600 mb-4 flex-1">{course.desc}</p>
                
                {/* Price and Button */}
                <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="text-xl font-extrabold text-green-600">${course.price}</span>
                    <button
                        onClick={() => setSelectedCourse(course)} // open modal
                        className={`text-white font-semibold px-6 py-2 rounded-lg shadow-md transition ${primaryColor} ${primaryHoverColor} focus:outline-none focus:ring-4 focus:ring-blue-300`}
                    >
                        Enroll Now
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Enrollment/Payment Form */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setSelectedCourse(null)}>
          <div 
            className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg relative transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 p-2 rounded-full transition"
              onClick={() => setSelectedCourse(null)}
              aria-label="Close"
            >
              <FaTimes className="w-5 h-5" />
            </button>
            
            <h2 className="text-2xl font-bold mb-2 text-gray-900 flex items-center">
                <FaMoneyBillWave className="text-green-600 mr-2" /> Complete Enrollment
            </h2>
            <p className="text-lg text-gray-700 mb-6 border-b pb-4">
                You are enrolling in: <span className="font-semibold text-blue-600">{selectedCourse.title}</span> (${selectedCourse.price})
            </p>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData.entries());
                
                // Add course details for the API call
                data.amount = selectedCourse.price; 
                data.product_name = selectedCourse.title;

                const res = await fetch("/api/sslcommerz", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(data),
                });

                const result = await res.json();
                if (result.GatewayPageURL) {
                  // Redirect browser to SSLCommerz payment page
                  window.location.href = result.GatewayPageURL;
                } else {
                  alert("Payment initialization failed. Please try again.");
                  console.error(result);
                }
              }}
            >
              <input type="hidden" name="course_title" value={selectedCourse.title} />
              <input type="hidden" name="amount" value={selectedCourse.price} /> 

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="customer_name"
                    name="customer_name"
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label htmlFor="customer_email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="customer_email"
                    name="customer_email"
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label htmlFor="customer_phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="customer_phone"
                    name="customer_phone"
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full text-white py-3 rounded-lg mt-6 font-bold transition shadow-lg ${primaryColor} ${primaryHoverColor} focus:outline-none focus:ring-4 focus:ring-blue-300`}
              >
                Proceed to Payment (${selectedCourse.price})
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}