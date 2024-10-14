import Image from "next/image";
import Navbar from "./components/Navbar/Navbar";
import Banner from "./components/Banner/Banner";


export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <Banner></Banner>
    </>
  );
}
