'use client';
import React, { useState } from 'react';
import { RiWechatFill } from 'react-icons/ri'; // Importing the icon

const Chatbot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [userQuestion, setUserQuestion] = useState('');
  const [chatResponse, setChatResponse] = useState('Hi! How can I help you today?');

  // Predefined answers related to your company and courses, and new ones for "hi" and "hello"
  const answers = {
    'hi': 'Hello! How can I assist you today?',
    'hello': 'Hi there! How can I help you today?',
    'join': 'You should join here to gain valuable skills in web development, digital marketing, and graphic design that will help you succeed in the competitive job market.',
    'benefit': 'By learning with us, you will acquire practical skills, industry-standard knowledge, and a certification that can significantly boost your career.',
    'job': 'Yes, our training programs are designed to help you build a career in web development, digital marketing, and graphic design. We also offer job placement assistance.',
    'freelance': 'Absolutely! Our programs help you develop the skills necessary to succeed as a freelancer. We also provide guidance on how to find clients and grow your freelance career.',
    'goal': 'Our company aims to empower individuals with the skills required for the modern job market, focusing on web development, digital marketing, and graphic design.',
    'courses': 'Our courses are hands-on and project-based, providing real-world applications and a deeper understanding of the skills that employers are looking for.',
    'duration': 'Course durations vary, but most can be completed within 3-6 months, depending on the level of commitment and pace you choose.',
    'placement': 'We offer career services, including resume building, mock interviews, and job placement assistance to help you land a job after completing the course.',
    'pace': 'Yes, our courses are designed to be flexible, allowing you to learn at your own pace while receiving support from instructors and peers.',
    'admission fee': 'The admission fee for our courses varies based on the program you choose. Please visit our website for more details or contact us directly.',
    'months': 'Our courses typically last 3-6 months, depending on your pace and the course you select.',
    'earn': 'You can earn by applying the skills you acquire during the course in full-time jobs, freelance projects, or starting your own business in web development, digital marketing, or graphic design.',
    'basic skills web development': 'To start with web development, you should learn HTML, CSS, JavaScript, and basic knowledge of frameworks like React or Angular.',
    'basic skills graphic design': 'For graphic design, it’s essential to learn tools like Adobe Photoshop, Illustrator, and InDesign. A good understanding of design principles is also important.',
    'basic skills digital marketing': 'To get started in digital marketing, you should understand SEO, content marketing, social media marketing, email marketing, and Google Analytics.',
    'web development': 'Web development involves building websites and web applications. It typically includes both front-end (UI/UX) and back-end development.',
    'frontend development': 'Frontend development is the part of web development that focuses on building the user interface and experience of websites using HTML, CSS, JavaScript, and frameworks like React or Angular.',
    'backend development': 'Backend development involves server-side scripting and databases. It focuses on building the logic, database management, and APIs for web applications using languages like Python, Node.js, or PHP.',
    'ui design': 'UI design (User Interface) focuses on the layout, design, and interactivity of a website or app, ensuring a good user experience.',
    'ux design': 'UX design (User Experience) focuses on the usability and experience of a product. UX designers work to ensure the product is easy and enjoyable to use.',
    'adobe illustrator': 'Adobe Illustrator is a vector graphics editor used for creating illustrations, logos, and artwork. It’s a powerful tool for graphic design professionals.',
    'figma': 'Figma is a collaborative web-based design tool that allows UI/UX designers to create, prototype, and collaborate on user interface designs in real-time.',
    'content writing': 'Content writing involves creating written content for websites, blogs, social media, and other platforms to engage audiences, improve SEO, and communicate brand messages.',
    'course fee': 'The course fee depends on the program you choose. Please visit our website or contact us directly for detailed information about our pricing.',
    'how much fee for course': 'The fee for our courses varies based on the type of program. For more information, please check our website or reach out to us directly.',
    'how much cost for enrollment in course': 'The cost for enrollment in our courses depends on the program you select. Please contact us directly or visit our website for the most accurate details.',
    'ai': 'AI (Artificial Intelligence) refers to the simulation of human intelligence in machines that are programmed to think and learn like humans. It includes technologies like machine learning, natural language processing, and robotics, and is used in a variety of industries to enhance automation and decision-making processes.',
    'next batch': 'Our next batch is starting soon. Please contact us for more details or check our website for the exact start date and registration process.',
  };
  

  // Function to toggle chat window
  const toggleChat = () => {
    setChatOpen(!chatOpen);
    if (!chatOpen) {
      setChatResponse('Hi! How can I help you today?');
    }
  };

  // Function to handle user input and provide answers
  const handleQuestionSubmit = () => {
    const lowerCaseQuestion = userQuestion.toLowerCase();

    // Default response if no matching keyword found
    let response = 'I am unable to answer that right now. Please chat with us on WhatsApp for further assistance.';

    // Check for answers based on matching keywords or similar questions
    Object.keys(answers).forEach((keyword) => {
      if (lowerCaseQuestion.includes(keyword)) {
        response = answers[keyword];
      }
    });

    setChatResponse(response);
    setUserQuestion(''); // Clear the input field after the question is submitted
  };

  // Function to handle WhatsApp redirect
  const handleWhatsAppRedirect = () => {
    window.open('https://wa.me/01742540234', '_blank'); // Replace with your WhatsApp number
  };

  return (
    <div>
      {/* Floating button with the WeChat icon */}
      <div
        className="fixed bottom-5 right-5 bg-[#2DA9E1] text-white p-3 rounded-full cursor-pointer shadow-lg"
        onClick={toggleChat}
      >
        <RiWechatFill className="text-3xl" /> {/* WeChat Icon from react-icons */}
      </div>

      {/* Chat window */}
      {chatOpen && (
        <div className="fixed bottom-20 right-5 bg-[#1f1f1f] shadow-lg rounded-lg w-80 p-4 border border-gray-300">
          <div className="text-sm text-white mb-2">
            <strong>{chatResponse}</strong> {/* Bold answer text */}
          </div>

          {/* User input field */}
          <input
            type="text"
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Ask a question..."
          />

          {/* Button to submit the question */}
          <button
            className="w-full bg-[#17549A] text-white p-2 rounded"
            onClick={handleQuestionSubmit}
          >
            Ask
          </button>

          {/* WhatsApp redirect */}
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
