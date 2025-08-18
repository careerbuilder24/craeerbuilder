"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function StudentEnrollCourse() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
    {
      title: "Business Development",
      desc: "Start your learning journey with our expert-guided courses.",
      img: "https://i.postimg.cc/tTZKn6PC/rfgo.png",
    },
    {
      title: "Graphics Design",
      desc: "Master Photoshop, Illustrator, and modern design trends.",
      img: "https://i.postimg.cc/hhFVrkf7/sdjgn.png",
    },
    {
      title: "SEO",
      desc: "Learn search engine optimization to boost website rankings.",
      img: "https://i.postimg.cc/rmVTdsjD/wfoi.png",
    },
    {
      title: "Web Development",
      desc: "Build websites with HTML, CSS, JavaScript, and React.",
      img: "https://i.postimg.cc/RhF60Kdp/webd.png",
    },
    {
      title: "3D & Motion",
      desc: "Create 3D animations and motion graphics for media.",
      img: "https://i.postimg.cc/yx3bWCMJ/ergiuh.png",
    },
    {
      title: "Digital Marketing",
      desc: "Promote businesses online with social media & ads.",
      img: "https://i.postimg.cc/ZqKZn0VC/ewfgij.png",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex flex-wrap justify-center gap-6 p-20">
        {courses.map((course, index) => (
          <div
            key={index}
            className="flex-1 min-w-[280px] max-w-[350px] text-black shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition flex flex-col"
          >
            {/* Full width responsive image */}
            <div className="relative w-full h-fit">
              <Image
                src={course.img}
                alt={course.title}
                objectFit="cover"
                height={800}
                width={800}
                className="rounded-t-2xl"
              />
            </div>

            {/* Card Content */}
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <p className="text-sm mt-2">{course.desc}</p>

              {/* Button aligned bottom-right */}
              <div className="mt-auto flex justify-end">
                <button
                  onClick={() => setSelectedCourse(course)} // open modal
                  className="bg-[#3385e2] text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-[#56D3FD] transition"
                >
                  Enroll
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Payment Form */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-[400px] relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setSelectedCourse(null)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">
              Enroll in {selectedCourse.title}
            </h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData.entries());

                const res = await fetch("/api/sslcommerz", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(data),
                });

                const result = await res.json();
                if (result.GatewayPageURL) {
                  // redirect browser to SSLCommerz payment page
                  window.location.href = result.GatewayPageURL;
                } else {
                  alert("Payment initialization failed");
                  console.error(result);
                }
              }}
            >
              <input
                type="hidden"
                name="course"
                value={selectedCourse.title}
              />

              <div className="mb-3">
                <label className="block text-sm font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  name="customer_name"
                  required
                  className="w-full border rounded-lg p-2"
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  name="customer_email"
                  required
                  className="w-full border rounded-lg p-2"
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium">
                  Phone
                </label>
                <input
                  type="text"
                  name="customer_phone"
                  required
                  className="w-full border rounded-lg p-2"
                />
              </div>

              <button
                type="submit"
                className="bg-[#3385e2] w-full text-white py-2 rounded-lg mt-4 hover:bg-[#17549A]"
              >
                Pay with SSLCommerz
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
