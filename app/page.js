'use client';

import Image from "next/image";
import Navbar from "./(with-navbar)/componenets/Navbar/Navbar";
import Banner from "./(with-navbar)/componenets/Banner/Banner";
import WelcomeText from "./WelcomeText/WelcomeText";
import Footer from "./(with-navbar)/componenets/Footer/Footer";
import FirstSection from "./(with-navbar)/componenets/FirstSection/FirstSection";
import ButtonTopMaker from "./buttonTopMaker/ButtonTopMaker";
import HelmetHead from "./HelmetHead/HelmetHead";
import Chatbot from "./(with-navbar)/componenets/chatBot/Chatbot";
import Review from "./(with-navbar)/componenets/review/Review";
import ConnectorsCompany from "./(with-navbar)/componenets/Connectors-Company/ConnectorsCompany";
import BlogPost from "./(with-navbar)/componenets/BlogPost/BlogPost";

export default function Home() {
  return (
    <>
      <HelmetHead
        title="Career Builder | Best IT Training, Internship & Career Support Platform"
        description="Join Career Builder to master graphics design, motion graphics, web development, and more. Build your skills, get internships, and boost your career with expert guidance."
        keywords="Career Builder, IT Training Bangladesh, Graphics Design Course, Motion Graphics Course, Web Development, Internship Opportunities, Career Support"
        author="Career Builder Team"
      />
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
    </>
  );
}
