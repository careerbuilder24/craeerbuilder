"use client"
// components/TextReveal.js
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const TextReveal = ({ text }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const chars = text.split('');
    textRef.current.innerHTML = chars.map(char => `<span>${char}</span>`).join('');

    const spans = textRef.current.querySelectorAll('span');

    gsap.from(spans, {
      duration: 2,
      y: 50,
      opacity: 0,
      stagger: 0.1,
      ease: "back.out(1.7)",
    });
  }, [text]);

  return <h1 ref={textRef} className="text-reveal">{text}</h1>;
};

export default TextReveal;
