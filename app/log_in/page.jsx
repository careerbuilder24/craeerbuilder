'use client';
import React, { useState } from 'react';
import Navbar from '../(with-navbar)/componenets/Navbar/Navbar';
import { SiGmail } from "react-icons/si";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ReCAPTCHA from 'react-google-recaptcha';
import Footer from '../(with-navbar)/componenets/Footer/Footer';
import { UserAuth } from "../context/AuthContext";
import Loader from '../(with-navbar)/componenets/Loader/Loader';
 // Import the loader component

export default function Login() {
  const { googleSignIn, signInUser } = UserAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [loading, setLoading] = useState(false);  // Track loading state

  const handleGoogleSignIn = async () => {
    setLoading(true); // Start loading when Google SignIn begins
    try {
      await googleSignIn();
      toast.success("Successfully logged in!");
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false); // Stop loading when sign-in is complete
    }
  };

  const handleManualSignIn = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading when manual sign-in begins
    try {
      await signInUser(email, password);
      toast.success("Successfully logged in!");
      router.push('/'); // Redirect to home
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false); // Stop loading when sign-in is complete
    }
  };

  const onChange = (value) => {
    setCaptchaValue(value);
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
            <h1 className='text-3xl font-bold font-serif text-black text-center'>Login</h1>
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
            <div className='flex flex-col items-center w-full mb-4'>
              <input
                type={show ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full p-2 border border-gray-300 rounded'
                required
              />
              <label className='flex items-center cursor-pointer mt-2 lg:mr-64 '>
                <input
                  type='checkbox'
                  checked={show}
                  onChange={() => setShow(!show)}
                  className='mr-2 cursor-pointer'
                />
                <small className='text-black'>{show ? 'Hide Password' : 'Show Password'}</small>
              </label>
            </div>
            <div className="form-control mb-4 w-full lg:ml-20">
              <ReCAPTCHA
                sitekey="6LftpWwqAAAAAP64cCjeY0hQ927AQu0OgA0LJxSo"
                onChange={onChange}
                className='w-full max-w-xs'
              />
            </div>
            <button
              type="submit"
              className={`bg-[#17549A] w-full h-10 rounded-md text-white hover:bg-[#17549A] ease-in-out duration-300 ${!captchaValue ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!captchaValue}
            >
              Login
            </button>
            <p className='text-sm text-black text-center mt-4'>
              If you don't have an account, please register <Link className='text-blue-700 hover:underline font-bold' href={'/re_gister'}>here</Link>.
            </p>
            <div onClick={handleGoogleSignIn} className='flex justify-center items-center gap-5 mt-4 cursor-pointer'>
              <div style={{ borderRadius: '50px' }} className='bg-[#8fbff7] w-16 h-16 text-center flex items-center justify-center cursor-pointer gem-box'>
                <h2 className='mt-2'>
                  <SiGmail className='text-2xl' />
                </h2>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
      <ToastContainer />
      {loading && <Loader />} {/* Show loader when loading is true */}
    </main>
  );
}
