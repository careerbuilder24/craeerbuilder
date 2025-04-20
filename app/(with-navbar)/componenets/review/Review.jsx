import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const reviews = [
  {
    name: "Alice Johnson",
    role: "Frontend Developer",
    comment: "This platform has changed the way I learn. The content is excellent and well-structured!",
    image: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    name: "Mark Smith",
    role: "Software Engineer",
    comment: "Amazing experience! Highly recommended for developers at any level.",
    image: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    name: "Sarah Lee",
    role: "UI/UX Designer",
    comment: "Beautiful design and very user-friendly interface. Loved it!",
    image: "https://randomuser.me/api/portraits/women/3.jpg"
  },
  {
    name: "David Kim",
    role: "Fullstack Developer",
    comment: "Great service and reliable content. It helped me land my dream job!",
    image: "https://randomuser.me/api/portraits/men/4.jpg"
  }
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
  return (
    <section className="py-12 my-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
      

        <Carousel
          infiniteLoop
          autoPlay
          interval={3000}
          showThumbs={false}
          showStatus={false}
          transitionTime={800}
          centerMode
          centerSlidePercentage={window.innerWidth < 768 ? 100 : 60} // Responsive width
          showArrows={true}
        >
          {reviews.map((review, index) => (
            <div key={index} className="flex justify-center">
              <div className="w-full max-w-sm md:max-w-md bg-white p-6 md:p-8 rounded-2xl shadow-lg flex flex-col items-center text-center my-10">
                <div className='w-24 md:w-32 border-4 border-[#32C4F0] shadow-lg rounded-full overflow-hidden mb-4'>
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <StarRating />
                <h4 className="text-lg md:text-xl font-semibold mb-1">{review.name}</h4>
                <p className="text-sm text-gray-500 mb-3">{review.role}</p>
                <p className="text-sm text-gray-700 text-justify px-1">
                  "{review.comment}"
                </p>
              </div>
            </div>
          ))}
        </Carousel>

        <h2 className="text-3xl text-[#17549A] md:text-4xl font-bold  text-center mb-10">
          Our Student and Intern Reviews
        </h2>
      </div>
    </section>
  );
}
