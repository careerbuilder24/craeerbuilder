'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/app/(with-navbar)/componenets/Navbar/Navbar';
import Footer from '@/app/(with-navbar)/componenets/Footer/Footer';
import Image from 'next/image';
import Link from 'next/link';

export default function CourseDetails() {
    const { slug } = useParams();

    const japaneseCourses = [
        {
            title: "Basic Hiragana & Katakana",
            slug: "basic-hiragana-katakana",
            batch: "Batch 345243428798",
            seats: "25",
            date: "2025-05-02T10:36",
            duration: "8 weeks",
            level: "Beginner",
            instructor: "Ms. Aiko Tanaka",
            image: "https://i.postimg.cc/KjbZppPx/jp.png",
            description:
                "Learn to read and write the two fundamental Japanese scripts — Hiragana and Katakana. This course is ideal for absolute beginners who want to start their Japanese learning journey from scratch.",
            syllabus: [
                "Introduction to Japanese sounds and writing",
                "Mastering Hiragana characters",
                "Learning Katakana for foreign words",
                "Basic pronunciation practice",
                "Simple vocabulary and sentence structure",
            ],
            objectives: [
                "Be able to read and write all Hiragana and Katakana characters confidently",
                "Understand the basic sentence structure of Japanese",
                "Gain familiarity with essential daily vocabulary",
            ],
            benefits: [
                "Perfect foundation before learning Kanji or grammar",
                "Access to printable worksheets and online quizzes",
                "Weekly live pronunciation sessions",
            ],
            schedule: [
                "Week 1: Introduction to Japanese phonetics and characters",
                "Week 2: Hiragana group A–K",
                "Week 3: Hiragana group S–T",
                "Week 4: Katakana basics and usage",
                "Week 5: Vocabulary and pronunciation practice",
                "Week 6: Short reading exercises",
                "Week 7: Speaking and writing activities",
                "Week 8: Final review and certification quiz",
            ],
            career: [
                "Provides the foundation for JLPT N5/N4 preparation",
                "Helps with communication for tourists and international students",
                "Useful for anime fans and culture enthusiasts starting their journey",
            ],
            certification:
                "Upon completion, students receive a 'Basic Japanese Literacy Certificate' endorsed by the Language Learning Club.",
            reviews: [
                {
                    name: "Rina Kobayashi",
                    text: "This course gave me confidence to start learning Japanese seriously. Aiko-sensei’s teaching style is amazing!",
                },
                {
                    name: "Mark Stevens",
                    text: "The live pronunciation sessions helped me improve my accent. Perfect for beginners!",
                },
            ],
        },
        {
            title: "JLPT N4 Preparation",
            slug: "jlpt-n4-preparation",
            batch: "Batch 934826493624",
            seats: "20",
            date: "2025-07-05T09:30",
            duration: "12 weeks",
            level: "Pre-Intermediate",
            instructor: "Prof. Kenji Nakamura",
            image: "https://i.postimg.cc/KjbZppPx/jp.png",
            description:
                "Prepare for the JLPT N4 exam with intensive lessons on grammar, reading, listening, and vocabulary. Ideal for students aiming to move from N5 to N4 proficiency.",
            syllabus: [
                "JLPT N4 grammar patterns",
                "Reading comprehension strategies",
                "Listening skill enhancement",
                "Kanji and vocabulary expansion",
                "Mock tests and performance feedback",
            ],
            objectives: [
                "Develop advanced sentence structures and grammar",
                "Strengthen comprehension and analytical listening skills",
                "Score confidently in the JLPT N4 exam",
            ],
            benefits: [
                "Personalized feedback from JLPT-certified teachers",
                "Access to mock exams and vocabulary drills",
                "Comprehensive test strategy and time management tips",
            ],
            schedule: [
                "Week 1–2: N4 grammar foundations",
                "Week 3–4: Reading comprehension and translation practice",
                "Week 5–6: Listening drills and vocabulary sets",
                "Week 7–8: Kanji memorization and usage",
                "Week 9–10: Mock tests and corrections",
                "Week 11–12: Final exam and review session",
            ],
            career: [
                "Essential for students pursuing Japanese university admission or work visas",
                "Improves employability for Japanese-speaking roles",
                "Prepares learners for JLPT N3 advanced certification",
            ],
            certification:
                "Students receive an official 'JLPT N4 Preparation Certificate' after completing all modules and mock exams.",
            reviews: [
                {
                    name: "Akira Matsumoto",
                    text: "Great structured lessons. The mock tests really helped me get used to the real exam format.",
                },
                {
                    name: "Sarah Lin",
                    text: "I passed JLPT N4 thanks to this course! The grammar explanations were clear and concise.",
                },
            ],
        },
        {
            title: "Kanji Mastery 101",
            slug: "kanji-mastery-101",
            batch: "Batch 134245424423",
            seats: "28",
            date: "2025-08-02T11:00",
            duration: "6 weeks",
            level: "All Levels",
            instructor: "Mr. Daichi Mori",
            image: "https://i.postimg.cc/9027PpzB/dsjofg.png",
            description:
                "Learn the logic behind Japanese Kanji characters with stroke order practice, radicals, and mnemonic techniques to remember complex symbols easily.",
            syllabus: [
                "Understanding Kanji origins",
                "Stroke order and radicals",
                "Top 100 common Kanji characters",
                "Daily writing and reading practice",
                "Kanji memory tips and quizzes",
            ],
            objectives: [
                "Recognize and write 100+ foundational Kanji",
                "Understand meaning and radical structure",
                "Apply Kanji knowledge in reading and writing tasks",
            ],
            benefits: [
                "Custom Kanji flashcards and interactive quizzes",
                "Lifetime access to stroke-order animations",
                "Live Kanji drawing workshops every week",
            ],
            schedule: [
                "Week 1: Kanji origins and radicals",
                "Week 2: Top 50 Kanji practice",
                "Week 3: Stroke order perfection sessions",
                "Week 4: Reading Kanji in short texts",
                "Week 5: Vocabulary expansion using Kanji",
                "Week 6: Final Kanji test and certification",
            ],
            career: [
                "Boosts reading comprehension for JLPT N5–N3 levels",
                "Helpful for translators, manga readers, and calligraphy enthusiasts",
                "Valuable skill for Japanese business professionals",
            ],
            certification:
                "Graduates earn a 'Kanji Proficiency Certificate' verifying their mastery of 100 essential characters.",
            reviews: [
                {
                    name: "Taro Yamada",
                    text: "Daichi-sensei made Kanji fun! The mnemonics and quizzes were so helpful.",
                },
                {
                    name: "Lina Ghosh",
                    text: "Before this course, Kanji scared me. Now I can actually read short texts confidently!",
                },
            ],
        },
    ];


    const course = japaneseCourses.find((c) => c.slug === slug);

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
