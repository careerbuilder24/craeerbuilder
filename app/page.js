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
import Navbar from "./(with-navbar)/componenets/Navbar/Navbar";
import Banner from "./(with-navbar)/componenets/Banner/Banner";
import WelcomeText from "./WelcomeText/WelcomeText";
import Footer from "./(with-navbar)/componenets/Footer/Footer";
import FirstSection from "./(with-navbar)/componenets/FirstSection/FirstSection";
import ButtonTopMaker from "./buttonTopMaker/ButtonTopMaker";
import Chatbot from "./(with-navbar)/componenets/chatBot/Chatbot";
import Review from "./(with-navbar)/componenets/review/Review";
// import ConnectorsCompany from "./(with-navbar)/componenets/Connectors-Company/ConnectorsCompany";
import BlogPost from "./(with-navbar)/componenets/BlogPost/BlogPost";
import ConnectorsCompany from "./(with-navbar)/componenets/Connectors-Company/ConnectorsCompany";


export const metadata = {
  title: "Best IT Service and Support Company",
  description: "We Here to Build Career of Young Generation.",
  keywords: "Career, Graphics, Motion Graphics, Web Development",
  authors: [{ name: "Developer" }],
  metadataBase: new URL("https://craeerbuilder.vercel.app"),
  openGraph: {
    title: "Career Builder",
    description: "We Here to Build Career of Young Generation.",
    url: "https://craeerbuilder.vercel.app",
    siteName: "Career Builder",
    images: [
      {
        url: "/og-image.jpg", // Make sure this image exists in public/
        width: 1200,
        height: 630,
        alt: "Career Builder OG image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Career Builder",
    description: "We Here to Build Career of Young Generation.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://craeerbuilder.vercel.app",
  },
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
    </>
  );
}
