'use client';
import React from 'react';
import Navbar from '../componenets/Navbar/Navbar';
import Footer from '../componenets/Footer/Footer';
import Image from 'next/image';
import HelmetHead from '@/app/HelmetHead/HelmetHead';
import Link from 'next/link';

export default function LanguageClub() {

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




  return (
    <>

      <HelmetHead
        title="Best Education Tech Website"
        description="We Here to Build Career of Young Generation."
        keywords="Career,Graphics,Motion Graphics,web Development"
        author="Developer"
      >

      </HelmetHead>

      <Navbar />

      <div className='container mx-auto mt-28'>
        <div className="max-w-4xl mx-auto my-10">

          <div className="relative overflow-hidden pt-[56.25%]">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/gVk1aeD38s0"
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-10">


          <h1 className="text-3xl font-bold text-center mb-8"> Language Learning Club</h1>


          <h3 className="text-xl font-bold text-gray-800 mt-10 mb-4"> IELTS Band Score Breakdown & Key Strategy</h3>
          <div className="overflow-x-auto mb-12">
            <table className="min-w-full bg-white border border-gray-200 text-sm md:text-base">
              <thead>
                <tr className="bg-green-100 text-left">
                  <th className="py-2 px-4 border-b">Band Score</th>
                  <th className="py-2 px-4 border-b">Skill Level</th>
                  <th className="py-2 px-4 border-b">Description</th>
                  <th className="py-2 px-4 border-b">Tips to Achieve</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr>
                  <td className="py-2 px-4 border-b font-semibold">9</td>
                  <td className="py-2 px-4 border-b">Expert</td>
                  <td className="py-2 px-4 border-b">Fully operational command of the language. Accurate and fluent.</td>
                  <td className="py-2 px-4 border-b">Daily full-length practice tests, record and review your speaking answers.</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-2 px-4 border-b font-semibold">8</td>
                  <td className="py-2 px-4 border-b">Very Good</td>
                  <td className="py-2 px-4 border-b">Occasional unsystematic errors. Handles complex language well.</td>
                  <td className="py-2 px-4 border-b">Focus on idioms, linking words, advanced reading sources like The Economist.</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b font-semibold">7</td>
                  <td className="py-2 px-4 border-b">Good</td>
                  <td className="py-2 px-4 border-b">Operational command with occasional inaccuracies and misunderstandings.</td>
                  <td className="py-2 px-4 border-b">Improve grammar, use templates for writing tasks, practice time-bound speaking.</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-2 px-4 border-b font-semibold">6</td>
                  <td className="py-2 px-4 border-b">Competent</td>
                  <td className="py-2 px-4 border-b">Generally effective command but with frequent errors and misinterpretation.</td>
                  <td className="py-2 px-4 border-b">Focus on accuracy over fluency, improve cohesion in writing.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Additional IELTS Tips */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-12 rounded shadow">
            <h4 className="text-lg font-semibold mb-2 text-blue-700"> Expert IELTS Success Tips:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-800">
              <li><strong>Use Time Smartly:</strong> In Reading, don’t dwell too long on one question.</li>
              <li><strong>Voice Clarity:</strong> In Speaking, clarity and confidence matter more than accent.</li>
              <li><strong>Task Response:</strong> For Writing Task 2, directly address every part of the prompt.</li>
              <li><strong>Grammar Accuracy:</strong> Focus on tenses, articles, and sentence structure in both Writing and Speaking.</li>
              <li><strong>Practice Under Exam Conditions:</strong> Simulate test environments to boost timing and reduce anxiety.</li>
              <li><strong>Review Mistakes:</strong> Keep an error log and revisit weak areas weekly.</li>
            </ul>
          </div>


          {/* IELTS / English Learning Process */}
          <section className="mb-12   gap-5">

            <h2 className="text-2xl font-semibold mb-4 text-blue-700">🇬🇧 How to Prepare for IELTS (English)</h2>
            <ol className="list-decimal list-inside space-y-4 text-gray-700">
              <li>
                <strong>Understand the Test Format:</strong> Learn the four sections – Listening, Reading, Writing, and Speaking.
              </li>
              <li>
                <strong>Take a Diagnostic Test:</strong> Identify your current level and weakest skills.
              </li>
              <li>
                <strong>Build Vocabulary:</strong> Use apps like Quizlet or books like "Vocabulary for IELTS".
              </li>
              <li>
                <strong>Practice Listening:</strong> Watch English news, TED Talks, or IELTS podcasts.
              </li>
              <li>
                <strong>Improve Reading:</strong> Read newspapers, academic journals, and IELTS passages daily.
              </li>
              <li>
                <strong>Master Writing:</strong> Practice Task 1 (charts, graphs) and Task 2 (essays). Get feedback.
              </li>
              <li>
                <strong>Boost Speaking:</strong> Practice mock interviews, join English speaking clubs or online partners.
              </li>
              <li>
                <strong>Take Mock Tests:</strong> Simulate the real test environment and analyze performance.
              </li>
              <li>
                <strong>Register for the Exam:</strong> Book your test once you're consistently scoring well in practice tests.
              </li>
            </ol>
            <Image
              src="https://i.postimg.cc/qRMDBKnn/dry.avif"
              width={1000}
              height={1000}
              className="w-full md:w-12/12 lg:w-12/12 mt-12"
              alt="cover image of language club"
              onDrag={(e) => e.preventDefault()}

            />


            {/* IELTS Test Structure Overview */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-purple-700 mt-10"> IELTS Test Structure Overview</h2>
              <p className="text-gray-700 mb-4">
                The IELTS test is divided into four sections. Here's a breakdown of each:
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-800">
                <li><strong>Listening (30 minutes):</strong> 4 sections, 40 questions. Audio clips played once. Includes conversations and monologues.</li>
                <li><strong>Reading (60 minutes):</strong> 3 passages, 40 questions. Different for Academic and General Training modules.</li>
                <li><strong>Writing (60 minutes):</strong> Task 1: Describe a graph/process (Academic) or write a letter (General). Task 2: Essay on a given topic.</li>
                <li><strong>Speaking (11–14 minutes):</strong> Face-to-face interview including introduction, a long turn, and two-way discussion.</li>
              </ul>
            </section>

            {/* Common Mistakes to Avoid in IELTS */}
            <section className="mb-12 bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded shadow">
              <h3 className="text-xl font-bold text-yellow-700 mb-2"> Common Mistakes to Avoid in IELTS</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800">
                <li>Not managing time effectively during Reading and Writing sections.</li>
                <li>Using informal or overly complex vocabulary incorrectly.</li>
                <li>Repeating ideas without adding depth in essays.</li>
                <li>Giving very short answers in the Speaking section.</li>
                <li>Ignoring grammar accuracy and punctuation in Writing tasks.</li>
                <li>Skipping instructions – always read the question carefully!</li>
              </ul>
            </section>




          </section>

          {/* GRE */}
          {/* SAT & GRE Preparation Guide */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mt-10 mb-6 text-indigo-700 text-center"> SAT & GRE Preparation Guide</h2>

            {/* SAT Preparation */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-indigo-600 mb-4"> How to Prepare for the SAT</h3>
              <ul className="list-disc list-inside space-y-3 text-gray-800">
                <li><strong>Understand the Structure:</strong> The SAT includes Reading, Writing & Language, Math (with and without calculator), and an optional Essay (phasing out).</li>
                <li><strong>Diagnostic Test:</strong> Start with a full-length mock test to identify weak areas.</li>
                <li><strong>Math Practice:</strong> Focus on algebra, geometry, and word problems. Use Khan Academy (free SAT partner).</li>
                <li><strong>Reading/Writing Practice:</strong> Read non-fiction articles daily (e.g. The Atlantic), practice grammar rules, and sentence corrections.</li>
                <li><strong>Take Timed Tests:</strong> Practice under real test conditions to improve pacing.</li>
                <li><strong>Use Official Resources:</strong> Download SAT practice tests from College Board website.</li>
                <li><strong>Set a Target Score:</strong> Research your target college's requirements and build a plan around it.</li>
              </ul>
            </div>

            {/* GRE Preparation */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-green-700 mb-4"> How to Prepare for the GRE</h3>
              <ul className="list-disc list-inside space-y-3 text-gray-800">
                <li><strong>GRE Sections:</strong> Verbal Reasoning, Quantitative Reasoning, Analytical Writing, and an Unscored Experimental Section.</li>
                <li><strong>Vocabulary Building:</strong> Use apps like Magoosh, Barron’s 1100 Words, or Anki decks for daily revision.</li>
                <li><strong>Quantitative Section:</strong> Revise high school math: algebra, geometry, data interpretation. Practice with ETS GRE Quant guides.</li>
                <li><strong>Verbal Practice:</strong> Focus on reading comprehension, text completion, and sentence equivalence.</li>
                <li><strong>Writing Practice:</strong> Practice essays (Issue & Argument tasks), analyze sample high-scoring essays from ETS.</li>
                <li><strong>Take Full-Length Mocks:</strong> Simulate the 4-hour test to build stamina and confidence.</li>
                <li><strong>Track Progress:</strong> Review errors, maintain a log, and revise tough concepts weekly.</li>
                <li><strong>Use Trusted Resources:</strong> ETS Official Guide, Magoosh, Manhattan Prep, Kaplan.</li>
              </ul>




                {/* ✅ 3-column grid layout */}
              <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-10">
                {ieltsCourses.map((course, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition duration-300"
                  >
                    {/* Image */}
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {course.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-1">
                        <span className="font-medium">Batch:</span> {course.batch}
                      </p>

                      <p className="text-gray-600 text-sm mb-1 flex items-center gap-2">
                        <span className="material-icons text-gray-500 text-sm">group</span>
                        {course.seats} Seats
                      </p>

                      <p className="text-gray-600 text-sm mb-3 flex items-center gap-2">
                        <span className="material-icons text-gray-500 text-sm">schedule</span>
                        {course.date}
                      </p>

                      {/* ✅ View Button */}
                      <div className="flex justify-center mt-4">
                        <Link href={`/language-club/IELTS/${course.slug}`} className='w-full'>
                          <button className="bg-[#17549A] text-white   w-full rounded-md hover:bg-blue-700 transition py-2">
                            View
                          </button>
                        </Link>



                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bonus Tips */}
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded shadow">
              <h4 className="text-lg font-semibold mb-2 text-indigo-700"> Bonus Tips for Both Tests:</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-800">
                <li>Stick to a schedule: Study 1–2 hours daily over several months rather than cramming.</li>
                <li>Take breaks: Use the Pomodoro method (25 min focus + 5 min break).</li>
                <li>Stay healthy: Sleep, hydration, and exercise boost memory and focus.</li>
                <li>Join a study group or online forum like Reddit’s r/SAT or r/GRE.</li>
              </ul>
            </div>
          </section>

          {/* SAT Scoring System */}
          <div className="mt-6 mb-10 bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded shadow">
            <h4 className="text-lg font-semibold text-yellow-700 mb-2"> SAT Score Breakdown</h4>
            <ul className="list-disc list-inside text-gray-800 space-y-2 text-sm md:text-base">
              <li><strong>Total Score Range:</strong> 400–1600</li>
              <li><strong>Evidence-Based Reading & Writing (EBRW):</strong> 200–800 points</li>
              <li><strong>Math Section:</strong> 200–800 points (split between No Calculator and Calculator portions)</li>
              <li><strong>Essay (Optional):</strong> 6–24 points (graded in 3 areas: Reading, Analysis, Writing – 2 to 8 each)</li>
              <li><strong>Score Percentiles:</strong> 75th percentile ≈ 1210 | 90th percentile ≈ 1350+</li>
              <li><strong>Guessing Penalty:</strong> None (no negative marking)</li>
              <li><strong>Time:</strong> About 3 hours (plus 50 minutes for Essay, if taken)</li>
            </ul>
          </div>
          {/* GRE Scoring System */}
          <div className="mt-6 mb-10 bg-green-50 border-l-4 border-green-500 p-5 rounded shadow">
            <h4 className="text-lg font-semibold text-green-700 mb-2"> GRE Score Breakdown</h4>
            <ul className="list-disc list-inside text-gray-800 space-y-2 text-sm md:text-base">
              <li><strong>Total Score Range:</strong> 260–340 (excluding writing)</li>
              <li><strong>Verbal Reasoning:</strong> 130–170 (1-point increments)</li>
              <li><strong>Quantitative Reasoning:</strong> 130–170 (1-point increments)</li>
              <li><strong>Analytical Writing:</strong> 0.0–6.0 (0.5-point increments, 2 essays scored by humans + AI)</li>
              <li><strong>Experimental Section:</strong> Unscored but required; used by ETS to test new questions.</li>
              <li><strong>Percentiles:</strong> Verbal 160 ≈ 86th percentile | Quant 165 ≈ 89th percentile</li>
              <li><strong>Score Validity:</strong> 5 years</li>
              <li><strong>Guessing Penalty:</strong> No penalty (guessing is encouraged!)</li>
            </ul>
          </div>






          {/* Japanese Learning Process */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-red-600">🇯🇵 How to Learn Japanese</h2>
            <ol className="list-decimal list-inside space-y-4 text-gray-700">
              <li>
                <strong>Start with Hiragana and Katakana:</strong> Learn the two basic Japanese scripts first using apps like LingoDeer or Tofugu.
              </li>
              <li>
                <strong>Begin Grammar and Vocabulary:</strong> Use books like “Genki” or “Minna no Nihongo” to build sentence structure and vocab.
              </li>
              <li>
                <strong>Learn Kanji Gradually:</strong> Aim for 5–10 kanji per day. Use WaniKani, Anki decks, or apps for spaced repetition.
              </li>
              <li>
                <strong>Practice Listening:</strong> Watch anime, dramas, and Japanese YouTube with subtitles.
              </li>
              <li>
                <strong>Start Speaking:</strong> Join language exchanges, speak to yourself, or use platforms like HelloTalk.
              </li>
              <li>
                <strong>Read Simple Materials:</strong> Try children’s books, manga, and graded readers for beginners.
              </li>
              <li>
                <strong>Join JLPT Prep (optional):</strong> Study for JLPT levels N5 → N1 if you're looking for certification.
              </li>
              <li>
                <strong>Be Consistent:</strong> 30–60 minutes of daily learning is more effective than sporadic study.
              </li>
            </ol>
          </section>
          <div className='flex justify-center items-center'>
            <Image
              src="https://i.postimg.cc/VkCm8JPD/defgoij.webp"
              width={1000}
              height={1000}
              className="w-full "
              alt="cover image of language club"
              onDrag={(e) => e.preventDefault()}

            />

          </div>


          {/* Japanese Language Strategy Table */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-red-600 flex items-center gap-2">
              🇯🇵 JLPT Score Strategy Table (Japanese Language)
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 text-sm md:text-base">
                <thead>
                  <tr className="bg-red-100 text-left">
                    <th className="py-2 px-4 border-b">JLPT Level</th>
                    <th className="py-2 px-4 border-b">Proficiency</th>
                    <th className="py-2 px-4 border-b">Description</th>
                    <th className="py-2 px-4 border-b">Study Tips</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr>
                    <td className="py-2 px-4 border-b font-semibold">N1</td>
                    <td className="py-2 px-4 border-b">Advanced</td>
                    <td className="py-2 px-4 border-b">Understand complex topics in newspapers, TV, and debates.</td>
                    <td className="py-2 px-4 border-b">Practice reading advanced materials, JLPT mock tests, shadowing native audio.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-2 px-4 border-b font-semibold">N2</td>
                    <td className="py-2 px-4 border-b">Upper-Intermediate</td>
                    <td className="py-2 px-4 border-b">Understand business-level conversations and articles.</td>
                    <td className="py-2 px-4 border-b">Use textbooks like TRY! N2, focus on Kanji, news listening practice.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b font-semibold">N3</td>
                    <td className="py-2 px-4 border-b">Intermediate</td>
                    <td className="py-2 px-4 border-b">Read and listen to everyday topics and TV dialogues.</td>
                    <td className="py-2 px-4 border-b">Use “Nihongo Sou Matome N3”, watch anime/dramas with subtitles.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-2 px-4 border-b font-semibold">N4</td>
                    <td className="py-2 px-4 border-b">Beginner+</td>
                    <td className="py-2 px-4 border-b">Understand basic Japanese conversations and readings.</td>
                    <td className="py-2 px-4 border-b">Study Genki II, learn 300+ Kanji, listen to children’s podcasts.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b font-semibold">N5</td>
                    <td className="py-2 px-4 border-b">Beginner</td>
                    <td className="py-2 px-4 border-b">Grasp basic greetings, instructions, and Hiragana/Katakana.</td>
                    <td className="py-2 px-4 border-b">Start with Genki I, daily practice of Hiragana/Katakana, flashcards.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <section className="mt-10 mb-16">
              <h2 className="text-2xl font-semibold mb-6 text-center text-red-600">
                🇯🇵 Popular Japanese Language Courses
              </h2>

              {/* ✅ 3-column grid layout */}
              <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                {japaneseCourses.map((course, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition duration-300"
                  >
                    {/* Image */}
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {course.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-1">
                        <span className="font-medium">Batch:</span> {course.batch}
                      </p>

                      <p className="text-gray-600 text-sm mb-1 flex items-center gap-2">
                        <span className="material-icons text-gray-500 text-sm">group</span>
                        {course.seats} Seats
                      </p>

                      <p className="text-gray-600 text-sm mb-3 flex items-center gap-2">
                        <span className="material-icons text-gray-500 text-sm">schedule</span>
                        {course.date}
                      </p>

                      {/* ✅ View Button */}
                      <div className="flex justify-center mt-4">
                        <Link href={`/language-club/japana/${course.slug}`} className='w-full'>
                          <button className="bg-[#17549A] text-white   w-full rounded-md hover:bg-blue-700 transition py-2">
                            View
                          </button>
                        </Link>



                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </section>

          <div className='flex justify-center items-center'>
            <Image
              src="https://i.postimg.cc/7PdSj1bc/ytdft.webp"
              width={1000}
              height={1000}
              className="w-full "
              alt="cover image of language club"
              onDrag={(e) => e.preventDefault()}

            />

          </div>

          {/* Portuguese Language Learning Strategy Table */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-green-700 flex items-center gap-2">
              🇵🇹 Portuguese Language Learning Strategy Table
            </h2>
            <p className="text-gray-700 mb-4">
              Portuguese is spoken by over 250 million people worldwide, with major dialects including European Portuguese (Portugal) and Brazilian Portuguese (Brazil). Though mutually intelligible, they differ in pronunciation, grammar, and vocabulary. Choose the dialect based on your study/work goals.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 text-sm md:text-base">
                <thead>
                  <tr className="bg-green-100 text-left">
                    <th className="py-2 px-4 border-b">Level</th>
                    <th className="py-2 px-4 border-b">CEFR</th>
                    <th className="py-2 px-4 border-b">What You Can Do</th>
                    <th className="py-2 px-4 border-b">Study Methods & Tips</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr>
                    <td className="py-2 px-4 border-b font-semibold">Beginner</td>
                    <td className="py-2 px-4 border-b">A1–A2</td>
                    <td className="py-2 px-4 border-b">
                      Use greetings, introduce yourself, ask and answer simple questions about familiar topics.
                    </td>
                    <td className="py-2 px-4 border-b">
                      Start with <strong>Duolingo</strong> or <strong>LingQ</strong>. Focus on basic verbs (ser, estar, ter), learn common phrases, and practice pronunciation via <strong>Forvo</strong> or YouTube.
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-2 px-4 border-b font-semibold">Intermediate</td>
                    <td className="py-2 px-4 border-b">B1–B2</td>
                    <td className="py-2 px-4 border-b">
                      Handle day-to-day conversations, understand TV news, read short stories and blogs.
                    </td>
                    <td className="py-2 px-4 border-b">
                      Watch <strong>Portuguese/Brazilian dramas</strong> with subtitles (e.g., "3%"), write journal entries, use <strong>Clozemaster</strong> or <strong>Memrise</strong> for vocabulary, and do grammar practice (subjunctive, prepositions).
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b font-semibold">Advanced</td>
                    <td className="py-2 px-4 border-b">C1–C2</td>
                    <td className="py-2 px-4 border-b">
                      Participate in academic/professional discussions, read newspapers like <em>Folha de São Paulo</em>, write essays and reports.
                    </td>
                    <td className="py-2 px-4 border-b">
                      Listen to podcasts like <strong>“Café Brasil”</strong> or <strong>“PortuguesePod101”</strong>. Read books by authors like Paulo Coelho. Practice shadowing advanced audio and participate in conversation meetups or online exchanges (e.g., <strong>HelloTalk</strong>, <strong>Tandem</strong>).
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Optional: Dialect Comparison Note */}
            <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <h4 className="text-md font-semibold text-blue-700 mb-2">🇧🇷 Brazilian vs 🇵🇹 European Portuguese Tips:</h4>
              <ul className="list-disc list-inside text-gray-800 space-y-1 text-sm md:text-base">
                <li><strong>Pronunciation:</strong> Brazilian Portuguese is generally slower and clearer for beginners.</li>
                <li><strong>Vocabulary:</strong> "Bus" in Brazil is <em>ônibus</em>, in Portugal it’s <em>autocarro</em>.</li>
                <li><strong>Grammar:</strong> In Portugal, formal grammar is used more often; in Brazil, it's more relaxed in daily speech.</li>
                <li><strong>Tip:</strong> Stick to one dialect at first to avoid confusion.</li>
              </ul>
            </div>


              {/* ✅ 3-column grid layout */}
              <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-10">
                {portugueseCourses.map((course, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition duration-300"
                  >
                    {/* Image */}
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {course.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-1">
                        <span className="font-medium">Batch:</span> {course.batch}
                      </p>

                      <p className="text-gray-600 text-sm mb-1 flex items-center gap-2">
                        <span className="material-icons text-gray-500 text-sm">group</span>
                        {course.seats} Seats
                      </p>

                      <p className="text-gray-600 text-sm mb-3 flex items-center gap-2">
                        <span className="material-icons text-gray-500 text-sm">schedule</span>
                        {course.date}
                      </p>

                      {/* ✅ View Button */}
                      <div className="flex justify-center mt-4">
                        <Link href={`/language-club/Portuguese-Language-Club/${course.slug}`} className='w-full'>
                          <button className="bg-[#17549A] text-white   w-full rounded-md hover:bg-blue-700 transition py-2">
                            View
                          </button>
                        </Link>



                      </div>
                    </div>
                  </div>
                ))}
              </div>




          </section>

          <div className='flex justify-center items-center'>
            <Image
              src="https://i.postimg.cc/02q78Y1B/dfgh.jpg"
              width={1000}
              height={1000}
              className="w-full "
              alt="cover image of language club"
              onDrag={(e) => e.preventDefault()}

            />

          </div>

          {/* German Language Learning Strategy Table */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-yellow-600 flex items-center gap-2">
              🇩🇪 German Language Learning Strategy Table
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 text-sm md:text-base">
                <thead>
                  <tr className="bg-yellow-100 text-left">
                    <th className="py-2 px-4 border-b">Level</th>
                    <th className="py-2 px-4 border-b">CEFR</th>
                    <th className="py-2 px-4 border-b">Description</th>
                    <th className="py-2 px-4 border-b">Learning Tips</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr>
                    <td className="py-2 px-4 border-b font-semibold">Beginner</td>
                    <td className="py-2 px-4 border-b">A1–A2</td>
                    <td className="py-2 px-4 border-b">Understand basic words, introduce yourself, ask & answer simple questions.</td>
                    <td className="py-2 px-4 border-b">Use Duolingo or DW Deutsch Lernen, memorize gendered nouns, learn greetings.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-2 px-4 border-b font-semibold">Intermediate</td>
                    <td className="py-2 px-4 border-b">B1–B2</td>
                    <td className="py-2 px-4 border-b">Hold conversations, understand main ideas in TV/radio, write simple essays.</td>
                    <td className="py-2 px-4 border-b">Watch Deutsche Welle, learn sentence structure rules, practice modal verbs.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b font-semibold">Advanced</td>
                    <td className="py-2 px-4 border-b">C1–C2</td>
                    <td className="py-2 px-4 border-b">Understand complex texts, express ideas fluently, write professionally.</td>
                    <td className="py-2 px-4 border-b">Read German news sites (e.g. Spiegel), write essays, practice speaking with natives.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            
              {/* ✅ 3-column grid layout */}
              <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-10">
                {germanCourses.map((course, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition duration-300"
                  >
                    {/* Image */}
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {course.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-1">
                        <span className="font-medium">Batch:</span> {course.batch}
                      </p>

                      <p className="text-gray-600 text-sm mb-1 flex items-center gap-2">
                        <span className="material-icons text-gray-500 text-sm">group</span>
                        {course.seats} Seats
                      </p>

                      <p className="text-gray-600 text-sm mb-3 flex items-center gap-2">
                        <span className="material-icons text-gray-500 text-sm">schedule</span>
                        {course.date}
                      </p>

                      {/* ✅ View Button */}
                      <div className="flex justify-center mt-4">
                        <Link href={`/language-club/German-Language-CLub/${course.slug}`} className='w-full'>
                          <button className="bg-[#17549A] text-white   w-full rounded-md hover:bg-blue-700 transition py-2">
                            View
                          </button>
                        </Link>



                      </div>
                    </div>
                  </div>
                ))}
              </div>




          </section>

          {/* German Language Learning Guide */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-yellow-700">🇩🇪 How to Learn German: Step-by-Step Guide</h2>
            <ol className="list-decimal list-inside space-y-4 text-gray-800">
              <li>
                <strong>Start with the Alphabet & Pronunciation:</strong> German letters are mostly like English, but learn how to pronounce umlauts (ä, ö, ü) and ß (Eszett).
              </li>
              <li>
                <strong>Learn Basic Phrases & Greetings:</strong> Start with simple greetings like “Hallo!”, “Guten Morgen!”, “Wie geht’s?”. Use apps like <em>Duolingo</em>, <em>Babbel</em>, or <em>LingQ</em>.
              </li>
              <li>
                <strong>Master Basic Grammar:</strong> Focus on articles (der/die/das), noun genders, verb conjugation, and sentence structure (Verb-second rule).
              </li>
              <li>
                <strong>Build Vocabulary Daily:</strong> Use flashcards (Anki), spaced repetition, and categorize words (food, travel, emotions, etc.).
              </li>
              <li>
                <strong>Practice Listening:</strong> Watch <em>DW Deutsch Lernen</em>, YouTube channels like “Learn German with Anja”, and listen to podcasts like “Slow German”.
              </li>
              <li>
                <strong>Practice Speaking:</strong> Use language exchange apps like <em>HelloTalk</em> or <em>Tandem</em>. Talk to yourself in German or join conversation groups.
              </li>
              <li>
                <strong>Reading & Writing:</strong> Start with children’s books (e.g. “Max und Moritz”), online news (e.g. <em>Deutsche Welle</em>), and write short journal entries in German.
              </li>
              <li>
                <strong>Enroll in Online Courses:</strong> Use platforms like <em>Goethe Institut</em>, <em>Busuu</em>, or <em>GermanPod101</em> for structured learning.
              </li>
              <li>
                <strong>Prepare for Certification:</strong> If you want to study or work in Germany, aim for exams like <strong>Goethe-Zertifikat</strong> or <strong>TestDaF</strong>.
              </li>
              <li>
                <strong>Be Consistent:</strong> Learning German takes time. Aim for 30–60 minutes daily and track your progress every week.
              </li>
            </ol>
          </section>



        </div>




        {/* advertisements */}

      </div>

      <Footer />
    </>
  );
}
