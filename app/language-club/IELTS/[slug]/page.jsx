'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/app/(with-navbar)/componenets/Navbar/Navbar';
import Footer from '@/app/(with-navbar)/componenets/Footer/Footer';
import Image from 'next/image';
import Link from 'next/link';

export default function CourseDetails() {
    const { slug } = useParams();

 const ieltsCourses = [
  {
    title: "IELTS Speaking Masterclass",
    slug: "ielts-speaking-masterclass",
    batch: "Batch 9988234",
    seats: "30",
    date: "2025-03-10T09:00",
    duration: "6 weeks",
    level: "Intermediate",
    instructor: "John Smith",
    image: "https://i.postimg.cc/ZqHKnBQ6/jbhhb.png",
    description:
      "Master the IELTS Speaking section with expert tips, live practice sessions, and mock interviews.",
    syllabus: [
      "Understanding IELTS Speaking format",
      "Fluency and coherence practice",
      "Pronunciation improvement",
      "Vocabulary and topic-specific phrases",
      "Mock interview sessions"
    ],
    objectives: [
      "Improve speaking fluency and confidence",
      "Learn strategies for Part 1, 2, and 3",
      "Handle common IELTS topics effectively"
    ],
    benefits: [
      "Personalized feedback from certified IELTS instructors",
      "Weekly live speaking sessions",
      "Access to recorded mock interviews"
    ],
    schedule: [
      "Week 1: IELTS Speaking overview and strategies",
      "Week 2: Part 1 – Introduction & general questions",
      "Week 3: Part 2 – Long turn practice",
      "Week 4: Part 3 – Two-way discussion and opinion questions",
      "Week 5: Mock speaking sessions",
      "Week 6: Final evaluation & feedback"
    ],
    career: [
      "Helps students aiming for higher IELTS bands",
      "Useful for university admission and work visas",
      "Builds confidence for academic and professional communication"
    ],
    certification:
      "Upon completion, students receive a 'IELTS Speaking Mastery Certificate' from the Language Learning Club.",
    reviews: [
      {
        name: "Alice Johnson",
        text: "The speaking sessions were very interactive and practical. Highly recommend!"
      },
      {
        name: "Michael Brown",
        text: "I improved my band score from 6.5 to 7.5 after this course."
      }
    ]
  },
  {
    title: "IELTS Writing Task 2 Intensive",
    slug: "ielts-writing-task2-intensive",
    batch: "Batch 83427342",
    seats: "25",
    date: "2025-04-01T11:00",
    duration: "8 weeks",
    level: "Advanced",
    instructor: "Emma Wilson",
    image: "https://i.postimg.cc/6Qbqz4ht/werpgytj.png",
    description:
      "Focus on IELTS Writing Task 2 with essay structures, argument development, and exam strategies.",
    syllabus: [
      "Understanding Task 2 question types",
      "Essay planning techniques",
      "Coherence and cohesion practice",
      "Grammar and vocabulary enhancement",
      "Timed essay writing practice"
    ],
    objectives: [
      "Write essays that meet IELTS Task 2 criteria",
      "Organize arguments coherently",
      "Improve vocabulary and grammar usage"
    ],
    benefits: [
      "Detailed feedback on essay writing",
      "Access to sample essays and templates",
      "Strategies for scoring higher in Writing Task 2"
    ],
    schedule: [
      "Week 1–2: Introduction to Task 2 and essay types",
      "Week 3–4: Structuring essays & developing ideas",
      "Week 5–6: Vocabulary and grammar for Task 2",
      "Week 7: Timed essay practice",
      "Week 8: Final assessment and feedback"
    ],
    career: [
      "Essential for students seeking high IELTS Writing bands",
      "Supports academic writing skills for university",
      "Improves professional communication in English"
    ],
    certification:
      "Students receive a 'IELTS Writing Excellence Certificate' after completing the course.",
    reviews: [
      {
        name: "David Lee",
        text: "The essay structure templates were extremely helpful. I finally got Band 8 in Writing!"
      },
      {
        name: "Sophia Martinez",
        text: "Clear explanations and practical exercises. This course boosted my writing confidence."
      }
    ]
  },
  {
    title: "IELTS Listening & Reading Bootcamp",
    slug: "ielts-listening-reading-bootcamp",
    batch: "Batch 5628391",
    seats: "35",
    date: "2025-06-05T10:00",
    duration: "5 weeks",
    level: "Intermediate",
    instructor: "Robert Green",
    image: "https://i.postimg.cc/x1bzXRG5/lk.png",
    description:
      "Improve your listening and reading skills for IELTS with targeted exercises, practice tests, and strategies to maximize your score.",
    syllabus: [
      "Listening comprehension strategies",
      "Identifying key information",
      "Reading skimming and scanning techniques",
      "Time management for Listening & Reading",
      "Practice tests with feedback"
    ],
    objectives: [
      "Enhance listening accuracy under exam conditions",
      "Improve reading speed and comprehension",
      "Develop strategies for tackling difficult questions"
    ],
    benefits: [
      "Weekly mock tests with detailed analysis",
      "Tips to avoid common mistakes",
      "Access to recorded listening sessions"
    ],
    schedule: [
      "Week 1: Introduction & Listening basics",
      "Week 2: Listening practice & techniques",
      "Week 3: Reading comprehension strategies",
      "Week 4: Combined Listening & Reading practice",
      "Week 5: Final mock test and review"
    ],
    career: [
      "Helps improve overall IELTS band score",
      "Useful for academic and professional English proficiency",
      "Prepares students for university admission exams"
    ],
    certification:
      "Upon completion, students receive a 'IELTS Listening & Reading Certificate' from the Language Learning Club.",
    reviews: [
      {
        name: "Emma Watson",
        text: "This bootcamp helped me get Band 8 in Listening and Reading. The practice tests were invaluable."
      },
      {
        name: "Liam Smith",
        text: "The tips and techniques made tricky questions much easier to handle."
      }
    ]
  }
];

    const course = ieltsCourses.find((c) => c.slug === slug);

    if (!course) {
        return (
            <div className="text-center py-40 text-2xl font-semibold">
                Course not found 
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto mt-28 px-4 py-10">
                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <Image
                        src={course.image}
                        alt={course.title}
                        width={1000}
                        height={600}
                        className="w-full h-80 object-cover"
                    />

                    <div className="p-6 space-y-8">
                        {/* Header Info */}
                        <div>
                            <h1 className="text-3xl font-bold mb-2 text-blue-800">{course.title}</h1>
                            <p className="text-gray-700 mb-4">{course.description}</p>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-gray-700">
                                <p><strong>Instructor:</strong> {course.instructor}</p>
                                <p><strong>Level:</strong> {course.level}</p>
                                <p><strong>Duration:</strong> {course.duration}</p>
                                <p><strong>Batch:</strong> {course.batch}</p>
                                <p><strong>Seats:</strong> {course.seats}</p>
                                <p><strong>Start Date:</strong> {new Date(course.date).toLocaleString()}</p>
                            </div>
                        </div>

                        {/* Learning Outcomes */}
                        <div>
                            <h2 className="text-2xl font-semibold mb-3 text-blue-700">🎯 Learning Outcomes</h2>
                            <ul className="list-disc ml-6 text-gray-700 space-y-1">
                                {course.outcomes?.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Syllabus */}
                        <div>
                            <h2 className="text-2xl font-semibold mb-3 text-blue-700">📘 Course Syllabus</h2>
                            <ul className="list-disc ml-6 text-gray-700 space-y-1">
                                {course.syllabus.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Schedule */}
                        <div>
                            <h2 className="text-2xl font-semibold mb-3 text-blue-700">🕒 Weekly Schedule</h2>
                            <ul className="list-decimal ml-6 text-gray-700 space-y-1">
                                {course.schedule?.map((week, i) => (
                                    <li key={i}>{week}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Career Opportunities */}
                        <div>
                            <h2 className="text-2xl font-semibold mb-3 text-blue-700">💼 Career Opportunities</h2>
                            <ul className="list-disc ml-6 text-gray-700 space-y-1">
                                {course.career?.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Certification */}
                        <div>
                            <h2 className="text-2xl font-semibold mb-3 text-blue-700">📜 Certification</h2>
                            <p className="text-gray-700">{course.certification}</p>
                        </div>

                        {/* Reviews */}
                        <div>
                            <h2 className="text-2xl font-semibold mb-3 text-blue-700">💬 Student Reviews</h2>
                            <div className="space-y-4">
                                {course.reviews?.map((review, i) => (
                                    <div key={i} className="border-l-4 border-blue-500 pl-4">
                                        <p className="italic text-gray-600">"{review.text}"</p>
                                        <p className="font-semibold text-gray-800 mt-1">— {review.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Back Button */}
                        <div className="text-center mt-8">
                            <Link href="/language-club">
                                <button className="bg-gray-300 px-6 py-2 rounded hover:bg-gray-400">
                                    ← Back to All Courses
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
