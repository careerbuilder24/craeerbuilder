// app/not-found.jsx
import Link from "next/link";
import Navbar from "./(with-navbar)/componenets/Navbar/Navbar";
import Footer from "./(with-navbar)/componenets/Footer/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center my-36 text-center ">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
        <p className="mt-2 text-gray-600">
          Sorry, the page you are looking for doesn’t exist.
        </p>
        <Link
          href="/"
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Go Home
        </Link>
      </div>
      <Footer />
    </>
  );
}
