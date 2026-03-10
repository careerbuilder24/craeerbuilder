'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/app/(with-navbar)/componenets/Navbar/Navbar';
import Footer from '@/app/(with-navbar)/componenets/Footer/Footer';
import Image from 'next/image';
import Link from 'next/link';

export default function CourseDetails() {
    const { slug } = useParams();

  const portugueseCourses = [
  {
    title: "Portuguese Beginner Essentials",
    slug: "portuguese-beginner-essentials",
    batch: "Batch 1012345",
    seats: "30",
    date: "2025-05-12T09:00",
    duration: "6 weeks",
    level: "Beginner",
    instructor: "Maria Silva",
    image: "https://i.postimg.cc/59n7gxhG/sdfogi.png",
    description:
      "Start your Portuguese learning journey with foundational vocabulary, pronunciation, and basic conversation skills.",
    syllabus: [
      "Introduction to Portuguese alphabet and sounds",
      "Basic greetings and self-introduction",
      "Common phrases for daily life",
      "Numbers, dates, and time",
      "Simple conversation practice"
    ],
    objectives: [
      "Develop confidence in basic spoken Portuguese",
      "Understand essential grammar and sentence structure",
      "Engage in everyday conversations"
    ],
    benefits: [
      "Interactive exercises with native instructors",
      "Audio and video practice materials",
      "Weekly live conversational sessions"
    ],
    schedule: [
      "Week 1: Portuguese sounds and alphabet",
      "Week 2: Greetings and self-introduction",
      "Week 3: Numbers, dates, and time",
      "Week 4: Basic grammar essentials",
      "Week 5: Everyday conversation practice",
      "Week 6: Final review and assessment"
    ],
    career: [
      "Prepare for travel and cultural immersion",
      "Foundation for Portuguese language exams",
      "Useful for international students and tourists"
    ],
    certification:
      "Students receive a 'Portuguese Beginner Certificate' upon course completion.",
    reviews: [
      {
        name: "Lucas Pereira",
        text: "Maria made learning Portuguese easy and fun. Great for beginners!"
      },
      {
        name: "Sofia Costa",
        text: "I gained confidence to speak in daily situations after this course."
      }
    ]
  },
  {
    title: "Portuguese Intermediate Conversation",
    slug: "portuguese-intermediate-conversation",
    batch: "Batch 1023456",
    seats: "25",
    date: "2025-06-01T11:00",
    duration: "8 weeks",
    level: "Intermediate",
    instructor: "João Almeida",
    image: "https://i.postimg.cc/jSr7JfMm/rghk.png",
    description:
      "Enhance your Portuguese conversation skills, expand vocabulary, and learn to express ideas fluently in different situations.",
    syllabus: [
      "Intermediate grammar and sentence structures",
      "Daily conversation practice",
      "Listening comprehension exercises",
      "Cultural expressions and idioms",
      "Role-playing and real-life scenarios"
    ],
    objectives: [
      "Speak Portuguese fluently in a variety of contexts",
      "Improve listening comprehension and response accuracy",
      "Learn common idioms and cultural expressions"
    ],
    benefits: [
      "Weekly live practice with native speakers",
      "Personalized feedback on spoken Portuguese",
      "Access to multimedia exercises and practice tests"
    ],
    schedule: [
      "Week 1–2: Intermediate grammar review",
      "Week 3–4: Conversational topics practice",
      "Week 5–6: Listening comprehension sessions",
      "Week 7: Role-playing exercises",
      "Week 8: Final conversational assessment"
    ],
    career: [
      "Helps in academic or professional Portuguese settings",
      "Prepares for higher-level language exams",
      "Useful for cultural immersion and travel"
    ],
    certification:
      "Students receive a 'Portuguese Intermediate Certificate' after completing all modules.",
    reviews: [
      {
        name: "Mariana Santos",
        text: "João’s teaching helped me speak confidently with native speakers."
      },
      {
        name: "Pedro Fernandes",
        text: "I improved my conversation skills a lot and feel ready for real-life situations."
      }
    ]
  },
  {
    title: "Portuguese Advanced Writing & Reading",
    slug: "portuguese-advanced-writing-reading",
    batch: "Batch 1034567",
    seats: "20",
    date: "2025-07-10T10:00",
    duration: "5 weeks",
    level: "Advanced",
    instructor: "Ana Ribeiro",
    image: "https://i.postimg.cc/jSr7JfMm/rghk.png",
    description:
      "Focus on advanced Portuguese writing and reading skills, essay structuring, comprehension, and formal communication.",
    syllabus: [
      "Advanced grammar and syntax",
      "Essay and report writing",
      "Reading comprehension strategies",
      "Formal communication and emails",
      "Timed exercises and assessments"
    ],
    objectives: [
      "Write well-structured essays and formal texts",
      "Improve comprehension of complex Portuguese texts",
      "Develop advanced reading and writing proficiency"
    ],
    benefits: [
      "Personalized essay feedback from instructors",
      "Sample essays and reading exercises",
      "Weekly live writing workshops"
    ],
    schedule: [
      "Week 1: Advanced grammar and writing techniques",
      "Week 2: Reading comprehension exercises",
      "Week 3: Essay writing practice",
      "Week 4: Formal communication & reports",
      "Week 5: Final assessment and feedback"
    ],
    career: [
      "Useful for academic and professional communication",
      "Prepares for advanced Portuguese exams",
      "Strengthens skills for work or study in Portuguese-speaking countries"
    ],
    certification:
      "Students receive an 'Advanced Portuguese Writing & Reading Certificate' upon completion.",
    reviews: [
      {
        name: "Ricardo Lima",
        text: "Ana’s course gave me confidence to write essays and understand advanced texts."
      },
      {
        name: "Clara Mendes",
        text: "I feel ready for professional and academic Portuguese after this course."
      }
    ]
  }
];


    const course = portugueseCourses.find((c) => c.slug === slug);

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
