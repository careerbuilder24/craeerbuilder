import Link from 'next/link';
import React from 'react';

const blogPosts = [
    {
        id: 1,
        title: 'Understanding React Hooks',
        date: 'April 20, 2025',
        image: 'https://i.postimg.cc/Z5N16mMn/blogimg5.webp',
        details: 'React Hooks let you use state and lifecycle features without writing a class component. Learn how to use useState, useEffect, and more.',
    },
    {
        id: 2,
        title: 'Getting Started with Next.js',
        date: 'April 18, 2025',
        image: 'https://i.postimg.cc/Z5N16mMn/blogimg5.webp',
        details: 'Next.js is a powerful React framework for building server-rendered and statically generated web applications. Let\'s explore the basics.',
    },
    {
        id: 3,
        title: 'Top 10 JavaScript Tips',
        date: 'April 15, 2025',
        image: 'https://i.postimg.cc/Z5N16mMn/blogimg5.webp',
        details: 'Boost your productivity with these 10 JavaScript tips and tricks. From ES6 syntax to performance enhancements.',
    },
];

export default function BlogPost() {
    return (

        <>
            <p className='text-[#17549A] text-3xl md:text-4xl font-bold text-center mt-16'>Our Blog Post</p>
            <div className="flex flex-wrap justify-center gap-6 p-6 mt-16">
                {blogPosts.map((post) => (
                    <div
                        key={post.id}
                        className="w-80 bg-white shadow-lg rounded-lg overflow-hidden"
                    >
                        <div className="overflow-hidden">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-48 object-cover transition duration-300 ease-in-out transform hover:scale-105 hover:brightness-90"
                            />
                        </div>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                            <p className="text-gray-500 text-sm mb-2">{post.date}</p>
                            <p className="text-gray-700 text-base">{post.details}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Link href={`/CareerGuide`} className="flex justify-center mt-2">
                <button
                    className="bg-[#56d3fd] my-10 hover:bg-[#32c4f0] text-white font-bold py-2 px-6 rounded transition duration-300"

                >
                    View More
                </button>
            </Link>
        </>





    );
}
