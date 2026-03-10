'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/app/(with-navbar)/componenets/Navbar/Navbar';
import Footer from '@/app/(with-navbar)/componenets/Footer/Footer';
import Image from 'next/image';
import Link from 'next/link';

export default function CourseDetails() {
    const { slug } = useParams();
    const germanCourses = [
        {
            title: "German Beginner Essentials",
            slug: "german-beginner-essentials",
            batch: "Batch 2012345",
            seats: "30",
            date: "2025-05-15T09:00",
            duration: "6 weeks",
            level: "Beginner",
            instructor: "Anna Müller",
            image: "https://i.postimg.cc/fLZDhxfy/wefjokij.png",
            description:
                "Start learning German with foundational vocabulary, pronunciation, and basic conversation skills for everyday situations.",
            syllabus: [
                "Introduction to German alphabet and sounds",
                "Basic greetings and self-introduction",
                "Numbers, dates, and telling time",
                "Simple sentence structure",
                "Basic conversational phrases"
            ],
            objectives: [
                "Communicate confidently in basic German",
                "Understand essential grammar and sentence formation",
                "Engage in simple conversations"
            ],
            benefits: [
                "Interactive exercises with native instructors",
                "Audio and video practice materials",
                "Weekly live conversation sessions"
            ],
            schedule: [
                "Week 1: German alphabet and pronunciation",
                "Week 2: Greetings and self-introduction",
                "Week 3: Numbers, dates, and time",
                "Week 4: Basic grammar essentials",
                "Week 5: Everyday conversation practice",
                "Week 6: Final review and assessment"
            ],
            career: [
                "Prepare for travel and cultural immersion",
                "Foundation for German language exams",
                "Useful for students and tourists"
            ],
            certification:
                "Students receive a 'German Beginner Certificate' upon completion.",
            reviews: [
                {
                    name: "Lukas Schmidt",
                    text: "Anna made learning German easy and fun. Highly recommend for beginners!"
                },
                {
                    name: "Sophie Fischer",
                    text: "I gained confidence to speak German in daily situations after this course."
                }
            ]
        },
        {
            title: "German Intermediate Conversation",
            slug: "german-intermediate-conversation",
            batch: "Batch 2023456",
            seats: "25",
            date: "2025-06-05T11:00",
            duration: "8 weeks",
            level: "Intermediate",
            instructor: "Maximilian Bauer",
            image: "https://i.postimg.cc/fLZDhxfy/wefjokij.png",
            description:
                "Enhance your German speaking skills, improve vocabulary, and express ideas fluently in different real-life situations.",
            syllabus: [
                "Intermediate grammar and sentence structures",
                "Daily conversation practice",
                "Listening comprehension exercises",
                "Idiomatic expressions and cultural notes",
                "Role-playing and situational dialogues"
            ],
            objectives: [
                "Speak German fluently in a variety of contexts",
                "Improve listening comprehension and response accuracy",
                "Learn idioms and cultural expressions"
            ],
            benefits: [
                "Weekly live practice with native speakers",
                "Personalized feedback on speaking",
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
                "Useful for professional and academic settings",
                "Preparation for intermediate German exams",
                "Helps in cultural immersion and travel"
            ],
            certification:
                "Students receive a 'German Intermediate Certificate' upon completion.",
            reviews: [
                {
                    name: "Clara Weber",
                    text: "Maximilian’s course helped me speak confidently with native speakers."
                },
                {
                    name: "Jonas Meier",
                    text: "My conversation skills improved significantly; very practical course!"
                }
            ]
        },
        {
            title: "German Advanced Writing & Reading",
            slug: "german-advanced-writing-reading",
            batch: "Batch 2034567",
            seats: "20",
            date: "2025-07-12T10:00",
            duration: "5 weeks",
            level: "Advanced",
            instructor: "Sabine Hoffmann",
            image: "https://i.postimg.cc/fLZDhxfy/wefjokij.png",
            description:
                "Focus on advanced German writing and reading, essay structuring, comprehension, and formal communication skills.",
            syllabus: [
                "Advanced grammar and syntax",
                "Essay and report writing",
                "Reading comprehension strategies",
                "Formal communication and emails",
                "Timed exercises and assessments"
            ],
            objectives: [
                "Write well-structured essays and formal texts",
                "Understand complex German texts",
                "Develop advanced reading and writing proficiency"
            ],
            benefits: [
                "Personalized essay feedback",
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
                "Prepares for advanced German exams",
                "Strengthens skills for work or study in Germany or German-speaking countries"
            ],
            certification:
                "Students receive an 'Advanced German Writing & Reading Certificate' upon completion.",
            reviews: [
                {
                    name: "Tobias Krüger",
                    text: "Sabine’s course gave me confidence to write essays and read complex texts in German."
                },
                {
                    name: "Laura Becker",
                    text: "I feel ready for professional and academic German after this course."
                }
            ]
        }
    ];


    const course = germanCourses.find((c) => c.slug === slug);

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
