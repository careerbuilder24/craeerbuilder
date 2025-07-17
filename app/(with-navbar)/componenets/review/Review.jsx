'use client';

import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const reviews = [
  { name: "Promiti", role: "Frontend Developer", comment: "This platform has changed the way I learn. The content is excellent and well-structured!", image: "https://i.postimg.cc/TPnWy7RN/wefk.png" },
  { name: "Alma", role: "Software Engineer", comment: "Amazing experience! Highly recommended for developers at any level.", image: "https://i.postimg.cc/yN3yLy70/rtegk.png" },
  { name: "Sadia", role: "UI/UX Designer", comment: "Beautiful design and very user-friendly interface. Loved it!", image: "https://i.postimg.cc/yYS6YJ6v/rthk.png" },
  { name: "Rifat Rahamn", role: "Fullstack Developer", comment: "Great service and reliable content. It helped me land my dream job!", image: "https://i.postimg.cc/fy9ZYKbD/intern-1.jpg" }
];

const StarRating = () => (
  <div className="flex justify-center mb-3">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.232 3.774a1 1 0 00.95.69h3.978c.969 0 1.371 1.24.588 1.81l-3.22 2.34a1 1 0 00-.364 1.118l1.232 3.774c.3.921-.755 1.688-1.538 1.118l-3.22-2.34a1 1 0 00-1.175 0l-3.22 2.34c-.783.57-1.838-.197-1.538-1.118l1.232-3.774a1 1 0 00-.364-1.118L2.28 9.201c-.783-.57-.38-1.81.588-1.81h3.978a1 1 0 00.95-.69l1.232-3.774z" />
      </svg>
    ))}
  </div>
);

export default function Review() {
  const [slidePercentage, setSlidePercentage] = useState(60);

  useEffect(() => {
    const updateSlide = () => {
      setSlidePercentage(window.innerWidth < 768 ? 100 : 60);
    };
    updateSlide();
    window.addEventListener('resize', updateSlide);
    return () => window.removeEventListener('resize', updateSlide);
  }, []);

  return (
    <section className="py-12 my-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-[#17549A] text-center mb-8">
          Our Student and Intern Reviews
        </h2>

        <Carousel
          infiniteLoop
          autoPlay
          interval={3000}
          showThumbs={false}
          showStatus={false}
          transitionTime={800}
          centerMode
          centerSlidePercentage={slidePercentage}
          showArrows={true}
        >
          {reviews.map((review, index) => (
            <div key={index} className="flex justify-center">
              <div className="w-[280px] sm:w-[300px] md:w-[350px] bg-white p-4 md:p-6 rounded-2xl shadow-lg flex flex-col items-center text-center my-6">
                <div className="w-20 md:w-24 border-4 border-[#32C4F0] shadow-lg rounded-full overflow-hidden mb-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <StarRating />
                <h4 className="text-base md:text-lg font-semibold mb-1">{review.name}</h4>
                <p className="text-xs text-gray-500 mb-2">{review.role}</p>
                <p className="text-sm text-gray-700 text-center px-1">
                  "{review.comment}"
                </p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
