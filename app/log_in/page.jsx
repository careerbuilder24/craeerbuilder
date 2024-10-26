'use client'
import React, { useEffect, useState } from 'react';
import { FaCheckSquare } from 'react-icons/fa';
import Navbar from '../(with-navbar)/componenets/Navbar/Navbar';
import { SiGmail } from "react-icons/si";

import Link from 'next/link';
import ReCAPTCHA from 'react-google-recaptcha';
import Footer from '../(with-navbar)/componenets/Footer/Footer';



export default function login() {

  const [show, setShow] = useState(false);


  const [captchaValue, setCaptchaValue] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Captcha value:', captchaValue);
    // Handle form submission and captcha verification
  };

  const onChange = (value) => {
    setCaptchaValue(value);
  };




  return (

    <main>
      <Navbar></Navbar>
      <div className='lg:mt-52  h-full mb-10 container mx-auto bg-white '>

        <div className='flex justify-center items-center'>

          <center className='gap-3 flex flex-col justify-center items-center w-3/12 h-[450px] mt-10 shadow-lg  bg-[#00adea]  border-gray-500 rounded-xl    '>
            <h1 className='text-3xl font-bold font-serif text-white'>Login</h1>



            <div className='w-full px-4'>
              <input
                type="text"
                placeholder='Email..'
                className='mb-2 lg:w-10/12 p-2 border border-gray-300 rounded'
              />

            </div>


            {/* passowrd filed */}

            <div className='flex flex-col items-center  w-full px-4'>
              <input
                type={show ? 'text' : 'password'}
                placeholder="Enter your password"
                className='mb-2 p-2 lg:w-10/12 border border-gray-300 rounded'
              />
              <label className='flex items-center cursor-pointer mt-2'>
                <input
                  type='checkbox'
                  checked={show}
                  onChange={() => setShow(!show)}
                  className='mr-2 cursor-pointer'
                />
                <small className='mr-44 text-white'>{show ? 'Hide Password' : 'Show Password'}</small>
              </label>
            </div>



            <div className="form-control ">


              <ReCAPTCHA
                sitekey="6LftpWwqAAAAAP64cCjeY0hQ927AQu0OgA0LJxSo"    //{process.env.GOOGLE_RECAPTCHA_SITE_KEY}
                onChange={onChange}

              />
            </div>


            <button className='bg-blue-500 w-9/12 h-10 rounded-md text-white hover:bg-[#17549A]  ease-in-out duration-300'>Login</button>





            <p className='text-sm  text-white '>If you dont't have an account, Please register <Link className='text-blue-700 hover:underline font-bold' href={'/re_gister'}>here</Link>.</p>

            <div className='flex justify-center items-center gap-5'>
              <div
                style={{ borderRadius: '50px' }}
                className='bg-[#8fbff7] w-16 h-16 text-center flex items-center justify-center cursor-pointer gem-box'
              >
                <h2 className='mt-2'>
                  <SiGmail className='text-2xl' />
                </h2>
              </div>
            
            </div>

          </center>


        </div>


      </div>
      

      <Footer></Footer>
    </main>
  )
}
