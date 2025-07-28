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
        title="Best IT Service and Support Company"
        description="We Here to Build Career of Young Generation."
        keywords="Career,Graphics,Motion Graphics,web Development"
        author="Developer"
      >
        {/* <meta name="google-site-verification" content="JIbZKrPfCJNylwsne6R8FT4toE9p_jP3CnyaWJ-Fu1s" /> */}
      </HelmetHead>

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
