import Image from "next/image";
import Navbar from "./(with-navbar)/componenets/Navbar/Navbar";
import Banner from "./(with-navbar)/componenets/Banner/Banner";
import WelcomeText from "./WelcomeText/WelcomeText";
import Footer from "./(with-navbar)/componenets/Footer/Footer";
import FirstSection from "./(with-navbar)/componenets/FirstSection/FirstSection";



export default function Home() {
  return (
    <>
      
      <Navbar></Navbar>
      <Banner></Banner>
      <WelcomeText></WelcomeText>
      <FirstSection></FirstSection>
      <Footer></Footer>
    </>
  );
}
