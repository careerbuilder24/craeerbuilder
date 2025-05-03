'use client'; // Only needed for Next.js App Router

import React, { useState } from 'react';
import { RiWechatFill } from 'react-icons/ri'; // Importing the WeChat icon

const Chatbot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [userQuestion, setUserQuestion] = useState('');
  const [chatResponse, setChatResponse] = useState('Hi! How can I help you today?');

  // Predefined answers related to company and courses
  const answers = {
    'hi': 'Hello! How can I assist you today?',
    'hello': 'Hi there! How can I help you today?',
    'join': 'You should join here to gain valuable skills in web development, digital marketing, and graphic design.',
    'benefit': 'By learning with us, you will acquire practical skills, industry-standard knowledge, and certification.',
    'job': 'Yes, our training programs help you build a career in web development, digital marketing, and graphic design.',
    'freelance': 'Absolutely! Our programs help you develop the skills to succeed as a freelancer.',
    'goal': 'Our company aims to empower individuals with essential job market skills.',
    'courses': 'Our courses are hands-on and project-based, covering web development, digital marketing, and graphic design.',
    'duration': 'Courses typically last 3-6 months, depending on your pace.',
    'placement': 'We offer job placement assistance, resume building, and mock interviews.',
    'pace': 'Yes, our courses are flexible and allow self-paced learning.',
    'admission fee': 'Course fees vary. Visit our website or contact us for details.',
    'ai': 'AI (Artificial Intelligence) involves machine learning, automation, and data-driven decision-making.',
    'next batch': 'Our next batch starts soon. Visit our website for details.',
  };

  // Toggle chat window
  const toggleChat = () => {
    setChatOpen(!chatOpen);
    if (!chatOpen) {
      setChatResponse('Hi! How can I help you today?');
    }
  };

  // Handle user input and response
  const handleQuestionSubmit = () => {
    const lowerCaseQuestion = userQuestion.toLowerCase();
    let response = 'I am unable to answer that right now. Please chat with us on WhatsApp for further assistance.';

    Object.keys(answers).forEach((keyword) => {
      if (lowerCaseQuestion.includes(keyword)) {
        response = answers[keyword];
      }
    });

    setChatResponse(response);
    setUserQuestion(''); // Clear input field
  };

  // Handle WhatsApp redirect
  const handleWhatsAppRedirect = () => {
    console.log('WhatsApp button clicked'); // Debugging
    window.open('https://wa.me/8801533993851', '_blank'); // Ensure correct country code
  };

  return (
    <div>
      {/* Floating button */}
      <div
        className="fixed bottom-5 right-5 bg-[#2DA9E1] text-white p-3 rounded-full cursor-pointer shadow-lg"
        onClick={toggleChat}
      >
        <RiWechatFill className="text-3xl" /> {/* WeChat Icon */}
      </div>

      {/* Chat window */}
      {chatOpen && (
        <div className="fixed bottom-20 right-5 bg-[#1f1f1f] shadow-lg rounded-lg w-80 p-4 border border-gray-300">
          <div className="text-sm text-white mb-2">
            <strong>{chatResponse}</strong>
          </div>

          {/* Input field */}
          <input
            type="text"
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Ask a question..."
          />

          {/* Ask button */}
          <button
            className="w-full bg-[#17549A] text-white p-2 rounded"
            onClick={handleQuestionSubmit}
          >
            Ask
          </button>

          {/* WhatsApp button */}
          <button
            className="w-full bg-green-500 text-white p-2 rounded mt-4"
            onClick={handleWhatsAppRedirect}
          >
            Chat with us on WhatsApp
          </button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
