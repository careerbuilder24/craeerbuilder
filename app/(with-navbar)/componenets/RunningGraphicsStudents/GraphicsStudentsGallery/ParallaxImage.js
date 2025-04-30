// components/ParallaxImage.js
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

// Custom hook for parallax effect
function useParallax(value, distance) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function ImageComponent({ id }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });

  // Applying parallax effect for vertical position
  const y = useParallax(scrollYProgress, 400);

  // Map scrollYProgress to scale image (e.g., from 0.5 to 1.5)
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.5]);  // Adjust the range as needed
  
  return (
    <section>
      <div ref={ref} className="w-4/12 container mx-auto  bg-red-500">
        {/* Image with dynamic scale */}
        <motion.img 
        className="w-7/12 container mx-auto"
          src="/image.PNG"  // Path to image in the public folder
          alt={`A specific image`} 
          style={{ scale }}  // Apply scale transformation
        />
      </div>
      
    </section>
  );
}

export default function ParallaxApp() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Render the images with dynamic scaling on scroll */}
      {[1, 2, 3, 4, 5].map((image) => (
        <ImageComponent key={image} id={image}  />
      ))}
      <motion.div className="progress" style={{ scaleX }}  />
    </>
  );
}
