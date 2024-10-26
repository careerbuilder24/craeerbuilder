import React from 'react'
import Navbar from '../(with-navbar)/componenets/Navbar/Navbar'
import { FaFacebook } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";


import Link from 'next/link'

import './re_gister.css'
import Footer from '../(with-navbar)/componenets/Footer/Footer';

export default function login() {


  return (

    <main>
      <Navbar></Navbar>
      <div className='lg:mt-56 mb-16 h-full container mx-auto bg-white '>

        <div className='flex justify-center items-center'>

          <center className='gap-5 flex flex-col justify-center items-center w-3/12 h-[600px]  shadow-lg bg-[#00adea] border-gray-500 rounded-xl   '>
            <h1 className='text-3xl font-bold font-serif text-white '>Register</h1>
            <input type="text" placeholder='Name' className=' lg:w-10/12 p-2 border border-gray-300 rounded' />
            <input type="text" placeholder='Email' className=' lg:w-10/12 p-2 border border-gray-300 rounded' />
            <input type="text" placeholder='Address' className=' lg:w-10/12 p-2 border border-gray-300 rounded' />
            <input type="text" placeholder='City' className=' lg:w-10/12 p-2 border border-gray-300 rounded' />
            <input type="text" placeholder='Passowrd' className=' lg:w-10/12 p-2 border border-gray-300 rounded' />
            {/* <input type="text" placeholder='Re-type Passowrd' className=' lg:w-10/12 p-2 border border-gray-300 rounded' /> */}

            <div className="flex mr-16  items-center">
              <input type="checkbox" className='cursor-pointer' required />
              <label className="ml-2  flex gap-3">
                <p className='text-gray-800 text-sm '>I agree to the</p>
                <Link href="/ter_ms" className="text-white underline text-sm ">Terms and Conditions</Link>
              </label>
            </div>




            <button className='bg-blue-500 w-10/12 h-10 rounded-md text-white hover:bg-[#17549A]  ease-in-out duration-300'>Sign Up</button>

            <div className='flex gap-3 text-sm text-white'>
              <p>Already have an account?</p>
              <Link href={'/log_in'} className='text-blue-700 font-bold'>Login</Link>
            </div>


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
