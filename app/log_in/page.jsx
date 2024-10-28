'use client'
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

export default function Login() {
  const { googleSignIn, signInUser } = UserAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      toast.success("Successfully logged in!");
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const handleManualSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInUser(email, password);
      toast.success("Successfully logged in!");
      router.push('/'); // Redirect to home
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const onChange = (value) => {
    setCaptchaValue(value);
  };

  return (
    <main>
      <Navbar />
      <div className='lg:mt-52 mt-28 md:mt-32 h-full mb-10 container mx-auto bg-white px-4 sm:px-6 md:px-8'>
        <div className='flex justify-center items-center'>
          <form
            onSubmit={handleManualSignIn}
            className='gap-3 flex flex-col justify-center items-center w-full max-w-md h-auto mt-10 shadow-lg bg-[#00adea] border-gray-500 rounded-xl p-6'
          >
            <h1 className='text-3xl font-bold font-serif text-white text-center'>Login</h1>
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
                <small className='text-white'>{show ? 'Hide Password' : 'Show Password'}</small>
              </label>
            </div>
            <div className="form-control mb-4 w-full">
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
            <p className='text-sm text-white text-center mt-4'>
              If you don't have an account, please register <Link className='text-blue-700 hover:underline font-bold' href={'/re_gister'}>here</Link>.
            </p>
            <div onClick={handleGoogleSignIn} className='flex justify-center items-center gap-5 mt-4 cursor-pointer'>
              <div className='bg-[#8fbff7] w-16 h-16 text-center flex items-center justify-center rounded-full'>
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
    </main>
  );
}
