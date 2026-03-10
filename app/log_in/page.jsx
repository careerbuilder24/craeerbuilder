'use client';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Navbar from '../(with-navbar)/componenets/Navbar/Navbar';
import { SiGmail } from "react-icons/si";
import gmailimg from '../../assets/gml.PNG'
import gmailwrite from '../../assets/googleWrite.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// import ReCAPTCHA from 'react-google-recaptcha';
import Footer from '../(with-navbar)/componenets/Footer/Footer';
import { UserAuth } from "../context/AuthContext";
import Loader from '../(with-navbar)/componenets/Loader/Loader';
import Image from 'next/image';

export default function Login() {
  const { googleSignIn, signInUser, loginUserManual } = UserAuth();
  const router = useRouter();


  // state managements
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);



  const handleManualSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed. Please check your credentials.");
      }

      //  Store user info in cookies
      Cookies.set('user_name', result.user.name, { expires: 7 });  // expires in 7 days
      Cookies.set('user_email', result.user.email, { expires: 7 });

      toast.success(result.message);
      loginUserManual(result.user);
      router.push("/");

    } catch (error) {
      console.error("Error during login:", error);
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const userCredential = await googleSignIn();
      const user = userCredential.user;

      // Call API to sync user with DB
      const res = await fetch("/api/googleLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        }),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || "Google login failed.");
      }

      if (!result.user) {
        throw new Error("User data missing from API response");
      }

      // Store in cookies safely
      Cookies.set("user_name", result.user.name || "Unknown", { expires: 7 });
      Cookies.set("user_email", result.user.email || "", { expires: 7 });

      loginUserManual(result.user); // Optional: if you use context

      toast.success("Successfully logged in with Google!");
      router.push("/");

    } catch (error) {
      console.error("Google login error:", error);
      toast.error(error.message || "Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };




  return (
    <main>
      <Navbar />
      <div className='lg:mt-52 mt-28 md:mt-32 h-full mb-10 container mx-auto bg-white px-4 sm:px-6 md:px-8 text-black'>
        <div className='flex justify-center items-center'>
          <form
            onSubmit={handleManualSignIn}
            className='gap-3 flex flex-col justify-center items-center w-full max-w-md h-auto mt-10 shadow-lg  border-gray-500 rounded-xl p-6'
          >
            <h1 className='text-3xl font-bold font-serif text-[#17549A] text-center'>Login</h1>
            <div className='w-full mb-4'>
              <input
                type="text"
                placeholder='Email..'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full p-2 border border-gray-300 rounded'
                required
              />
            </div>
            <div className=' w-full '>
              <input
                type={show ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full p-2 border border-gray-300 rounded '
                required
              />
              <label className='cursor-pointer mt-2  '>
                <input
                  type='checkbox'
                  checked={show}
                  onChange={() => setShow(!show)}
                  className='mr-2 cursor-pointer mt-5'
                />
                <small className='text-black'>{show ? 'Hide Password' : 'Show Password'}</small>
              </label>
            </div>

            {/* Terms and Conditions Scrollable Area */}
            <div className=" text-sm text-gray-600 ">
              <div className=" p-2 border border-gray-300 rounded-md max-h-16 overflow-y-auto text-xs text-gray-600 text-justify">

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum varius, urna eu consequat tincidunt, odio enim dapibus ligula, et luctus orci mi non urna. Sed at nisi nec odio accumsan efficitur. Etiam interdum, purus ut fermentum volutpat, justo urna condimentum turpis, nec tristique erat ipsum non urna. Donec sed ligula ex. Vivamus aliquet sapien eu erat dapibus suscipit. Donec vestibulum fringilla sapien. Integer at fringilla lorem. Etiam posuere egestas interdum.</p>
                <p>...</p>
              </div>

              <label htmlFor="terms" className="flex items-center mt-5">
                <input
                  type="checkbox"
                  id="terms"
                  className="mr-2"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                I agree to the
                <Link href="/ter_ms" className="text-blue-600 hover:underline ml-1">Terms and Conditions</Link>
              </label>
            </div>


            <button
              type="submit"
              className={`bg-[#17549A] w-full h-10 rounded-md text-white  ease-in-out duration-300 ${agreed
                ? "bg-[#17549A] hover:bg-[#0e3e76] cursor-pointer"
                : "bg-[#4995eb] cursor-not-allowed"
                }`}
       
            >
              Login
            </button>

            <div
              onClick={handleGoogleSignIn}
              className="cursor-pointer mt-4"
            >
              <div className="mt-2 flex flex-row justify-center items-center gap-4 px-5 py-1 shadow-md rounded-md hover:shadow-xl transition-shadow duration-300 bg-white">
                <Image
                  width={48}
                  height={48}
                  src={gmailimg}
                  alt="Gmail Icon"
                  className="rounded-full"
                />
                <Image
                  width={112}
                  height={48}
                  src={gmailwrite}
                  alt="Gmail Write Icon"
                />
              </div>
            </div>


            <p className='text-sm text-black text-center mt-4'>
              If you don't have an account, please register <Link className='text-blue-700 hover:underline font-bold' href={'/re_gister'}>here</Link>.
            </p>

          </form>
        </div>
      </div>
      <Footer />
      <ToastContainer />
      {loading && <Loader />}
    </main>
  );
}
