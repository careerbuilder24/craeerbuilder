'use client';
import React, { useState } from 'react';
import Navbar from '../(with-navbar)/componenets/Navbar/Navbar';
import { SiGmail } from "react-icons/si";
import gmailimg from '../../assets/gml.PNG'
import gmailwrite from '../../assets/googleWrite.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ReCAPTCHA from 'react-google-recaptcha';
import Footer from '../(with-navbar)/componenets/Footer/Footer';
import { UserAuth } from "../context/AuthContext";
import Loader from '../(with-navbar)/componenets/Loader/Loader';
import Image from 'next/image';

export default function Login() {
  const { googleSignIn, signInUser } = UserAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await googleSignIn();
      toast.success("Successfully logged in!");
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleManualSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInUser(email, password);
      toast.success("Successfully logged in!");
      router.push('/');
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
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
            <div className=' w-full mb-4'>
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
            <div className="mt-4 text-sm text-gray-600">
              <div className="mt-2 p-4 border border-gray-300 rounded-md max-h-16 overflow-y-auto text-xs text-gray-600">
                <p><strong className='text-blue-600'>Terms and Conditions</strong></p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum varius, urna eu consequat tincidunt, odio enim dapibus ligula, et luctus orci mi non urna. Sed at nisi nec odio accumsan efficitur. Etiam interdum, purus ut fermentum volutpat, justo urna condimentum turpis, nec tristique erat ipsum non urna. Donec sed ligula ex. Vivamus aliquet sapien eu erat dapibus suscipit. Donec vestibulum fringilla sapien. Integer at fringilla lorem. Etiam posuere egestas interdum.</p>
                <p>...</p> {/* You can continue with the rest of the terms here */}
              </div>

              <label htmlFor="terms" className="flex items-center mt-5">
                <input type="checkbox" id="terms" className="mr-2" />
                I agree to the
                <Link href="/terms-and-conditions" className="text-blue-600 hover:underline ml-1">Terms and Conditions</Link>
              </label>
            </div>

            <div className="form-control mb-4 w-full ">
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

            <div
              onClick={handleGoogleSignIn}
              className="cursor-pointer mt-4"
            >
              <div
                className="mt-2 flex flex-row justify-center items-center gap-4 px-5 py-1 shadow-md rounded-md hover:shadow-xl transition-shadow duration-300 bg-white"
              >
                <Image
                  width={100}
                  height={100}
                  src={gmailimg}
                  alt="Gmail Icon"
                  className="w-12 h-12 rounded-full "
                />
                <Image
                  width={100}
                  height={100}
                  src={gmailwrite}
                  alt="Gmail Write Icon"
                  className="w-28 h-12 "
                />
              </div>
            </div>

          </form>
        </div>
      </div>
      <Footer />
      <ToastContainer />
      {loading && <Loader />}
    </main>
  );
}
