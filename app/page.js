import Image from "next/image";
import Navbar from "./components/Navbar/Navbar";
import Banner from "./components/Banner/Banner";
import FirstSection from "./components/FirstSection/FirstSection";
import WelcomeText from "./WelcomeText/WelcomeText";


export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <Banner></Banner>
      <WelcomeText></WelcomeText>
      <FirstSection></FirstSection>
    </>
  );
}
