// 'use client';

// import Image from "next/image";
// import Navbar from "./(with-navbar)/componenets/Navbar/Navbar";
// import Banner from "./(with-navbar)/componenets/Banner/Banner";
// import WelcomeText from "./WelcomeText/WelcomeText";
// import Footer from "./(with-navbar)/componenets/Footer/Footer";
// import FirstSection from "./(with-navbar)/componenets/FirstSection/FirstSection";
// import ButtonTopMaker from "./buttonTopMaker/ButtonTopMaker";
// import HelmetHead from "./HelmetHead/HelmetHead";
// import Chatbot from "./(with-navbar)/componenets/chatBot/Chatbot";
// import Review from "./(with-navbar)/componenets/review/Review";
// import ConnectorsCompany from "./(with-navbar)/componenets/Connectors-Company/ConnectorsCompany";
// import BlogPost from "./(with-navbar)/componenets/BlogPost/BlogPost";


// export default function Home() {


//   return (

//     <>
//       <HelmetHead
//         title="Best IT Service and Support Company"
//         description="We Here to Build Career of Young Generation."
//         keywords="Career,Graphics,Motion Graphics,web Development"
//         author="Developer"
//       >
//         {/* <meta name="google-site-verification" content="JIbZKrPfCJNylwsne6R8FT4toE9p_jP3CnyaWJ-Fu1s" /> */}
//       </HelmetHead>

//       <Navbar />
//       <ButtonTopMaker />
//       <main>
//         <Banner />
//         <WelcomeText />
//         <FirstSection />
//         <BlogPost />
//         <ConnectorsCompany />
//         <Review />
//       </main>
//       <Footer />
//       <Chatbot />
//     </>
//   );
// }
// import Navbar from "./(with-navbar)/componenets/Navbar/Navbar";
// import Banner from "./(with-navbar)/componenets/Banner/Banner";
// import WelcomeText from "./WelcomeText/WelcomeText";
// import Footer from "./(with-navbar)/componenets/Footer/Footer";
// import FirstSection from "./(with-navbar)/componenets/FirstSection/FirstSection";
// import ButtonTopMaker from "./buttonTopMaker/ButtonTopMaker";
// import Chatbot from "./(with-navbar)/componenets/chatBot/Chatbot";
// import Review from "./(with-navbar)/componenets/review/Review";
// import BlogPost from "./(with-navbar)/componenets/BlogPost/BlogPost";
// import ConnectorsCompany from "./(with-navbar)/componenets/Connectors-Company/ConnectorsCompany";

// const longTitle = `Career Builder: Master Graphics Design, Motion Design, SEO Expertise, and Web Development Skills for a Successful Digital Career Unlock your potential with expert-led courses in graphic and motion design, SEO strategies, and cutting-edge web development to build a thriving career in the digital world.`;

// const longDescription = `Career Builder is your ultimate platform to jumpstart a successful career in the digital world. Whether you're passionate about creating stunning visuals or driving traffic through smart SEO strategies, we have tailored courses to match your goals. Learn the fundamentals and advanced techniques of Graphics Design to craft eye-catching artwork, and dive into Motion Design to bring your creations to life with animation and dynamic effects. Our SEO Expert training equips you with proven methods to optimize websites, improve search rankings, and boost online visibility. Meanwhile, our Web Development program covers everything from front-end to back-end technologies, enabling you to build modern, responsive websites and applications. With expert instructors, hands-on projects, and up-to-date industry insights, Career Builder helps you gain the skills and confidence to excel in competitive digital careers. Start learning today and transform your passion into a rewarding profession!`;

// export const metadata = {
//   title: longTitle,
//   description: longDescription,
//   keywords: [
//     "Career Builder",
//     "Graphics Design",
//     "Motion Design",
//     "SEO Expertise",
//     "Web Development",
//     "Digital Career",
//   ],
//   metadataBase: new URL("https://craeerbuilder.vercel.app"),
//   openGraph: {
//     url: "https://craeerbuilder.vercel.app",
//     type: "website",
//     title: longTitle,
//     description: longDescription,
//     siteName: "Career Builder",
//     images: [
//       {
//         url: "/og-image.jpg", // Make sure this image exists in /public
//         width: 1200,
//         height: 630,
//         alt: "Career Builder OG image",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     domain: "craeerbuilder.vercel.app",
//     url: "https://craeerbuilder.vercel.app",
//     title: longTitle,
//     description: longDescription,
//     images: ["/og-image.jpg"],
//   },
//   alternates: {
//     canonical: "https://craeerbuilder.vercel.app",
//   },
// };

// export default function Home() {
//   return (
//     <>
//       <Navbar />
//       <ButtonTopMaker />
//       <main>
//         <Banner />
//         <WelcomeText />
//         <FirstSection />
//         <BlogPost />
//         <ConnectorsCompany />
//         <Review />
//       </main>
//       <Footer />
//       <Chatbot />
//     </>
//   );
// }


import Navbar from "./(with-navbar)/componenets/Navbar/Navbar";
import Banner from "./(with-navbar)/componenets/Banner/Banner";
import WelcomeText from "./WelcomeText/WelcomeText";
import Footer from "./(with-navbar)/componenets/Footer/Footer";
import FirstSection from "./(with-navbar)/componenets/FirstSection/FirstSection";
import ButtonTopMaker from "./buttonTopMaker/ButtonTopMaker";
import Chatbot from "./(with-navbar)/componenets/chatBot/Chatbot";
import Review from "./(with-navbar)/componenets/review/Review";
import BlogPost from "./(with-navbar)/componenets/BlogPost/BlogPost";
import ConnectorsCompany from "./(with-navbar)/componenets/Connectors-Company/ConnectorsCompany";
import ScrollModal from "./(with-navbar)/componenets/ScrollModal/ScrollModal";
// import ScrollModal from "./components/ScrollModal"; // <-- import modal

export const metadata = {
  title: "Career Builder - Learn Digital Skills",
  description: "Career Builder platform for Graphic Design, Motion Design, SEO, Web Dev",
  // ...rest of your metadata
};

export default function Home() {
  return (
    <>
      <Navbar />
      <ButtonTopMaker />
      <main>
        <Banner />
        <WelcomeText />
        <FirstSection />
        <BlogPost />
        <ConnectorsCompany />
        <Review />
      </main>
      <Footer />
      <Chatbot />
      <ScrollModal />
    </>
  );
}
