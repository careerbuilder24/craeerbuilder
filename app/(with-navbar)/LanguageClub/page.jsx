'use client';
import React from 'react';
import Navbar from '../componenets/Navbar/Navbar';
import Footer from '../componenets/Footer/Footer';
import Image from 'next/image';

export default function LanguageClub() {
  return (
    <>
      <Navbar />

      <div className='container mx-auto mt-28'>
        <div className="max-w-4xl mx-auto my-10">
          <h2 className="text-2xl font-semibold mb-4 text-green-700 text-center">
            Study Abroad Motivational Speech
          </h2>
          <div className="relative overflow-hidden pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
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

          <h3 className="text-xl font-bold text-gray-800 mt-10 mb-10"> IELTS Section-wise Strategy Table</h3>
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
              width={600}
              height={600}
              className="w-full md:w-12/12 lg:w-12/12 mt-12"
              alt="cover image of language club"

            />



          </section>







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
              src="https://i.postimg.cc/gkRfwYCS/photo-1571260899304-425eee4c7efc.avif"
              width={600}
              height={600}
              className="w-full "
              alt="cover image of language club"

            />

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
