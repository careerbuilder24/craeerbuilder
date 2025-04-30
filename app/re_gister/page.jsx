'use client';

import Navbar from '../(with-navbar)/componenets/Navbar/Navbar';
import { SiGmail } from 'react-icons/si';
import gmailimg from '../../assets/gml.PNG'
import gmailwrite from '../../assets/googleWrite.png'
import Link from 'next/link';
import './re_gister.css';
import Footer from '../(with-navbar)/componenets/Footer/Footer';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useState } from 'react';
import { AuthContext, UserAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Loader from '../(with-navbar)/componenets/Loader/Loader';
import Image from 'next/image';
// import { useRouter } from 'next/router';

export default function Login() {

  const { googleSignIn } = UserAuth();


  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);  // Track loading state
  const router = useRouter();



  // const handleGoogleSignIn = async () => {
  //   setLoading(true); // Start loading when Google SignIn begins
  //   try {
  //     await googleSignIn();
  //     toast.success("Successfully logged in!");
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Login failed. Please check your credentials.");
  //   } finally {
  //     setLoading(false); // Stop loading when sign-in is complete
  //   }
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  // onsubmit funtions
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Successfully Registered!");
        setTimeout(() => router.replace('/'), 2000);
      } else {
        toast.error(result.message || "Sign up failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  // yeah why 

  return (
    <main>
      <Navbar />
      <div className='lg:mt-56 md:mt-56 mb-16 h-full container mx-auto bg-white'>
        <div className='flex justify-center items-center'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='gap-6 flex flex-col justify-center items-center w-full max-w-md shadow-lg  border-gray-500 rounded-xl p-6'
          >
            <h1 className='text-3xl font-bold font-serif text-[#17549A]'>Register</h1>

            {/* Name field */}
            <div className='w-full '>
              <input
                type="text"
                placeholder='Name'
                className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                {...register("name", { required: "Name is required" })}
              />
              <div className="h-5">
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
              </div>
            </div>

            {/* Email field */}
            <div className='w-full '>
              <input
                type="email"
                placeholder='Email'
                className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                {...register("email", { required: "Email is required" })}
              />
              <div className="h-5">
                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
              </div>
            </div>

            {/* Address field */}
            <div className='w-full '>
              <input
                type="text"
                placeholder='Address'
                className={`w-full p-2 border rounded ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                {...register("address", { required: "Address is required" })}
              />
              <div className="h-5">
                {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
              </div>
            </div>

            {/* City field */}
            <div className='w-full '>
              <input
                type="text"
                placeholder='City'
                className={`w-full p-2 border rounded ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                {...register("city", { required: "City name is required" })}
              />
              <div className="h-5">
                {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
              </div>
            </div>

            {/* Password field */}
            <div className='w-full '>
              <input
                type="password"
                placeholder='Password'
                className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                  pattern: {
                    value: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-])/,
                    message: "Password must have one uppercase, lowercase & symbol",
                  },
                })}
              />
              <div className="h-5">
                {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
              </div>
            </div>


            {/* Terms and Conditions Scrollable Area */}
            <div className=" text-sm text-gray-600 ">
              <div className=" p-2 border border-gray-300 rounded-md max-h-16 overflow-y-auto text-xs text-gray-600 text-justify">
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

            <button type="submit" className='bg-blue-500 w-full h-10 rounded-md  hover:bg-[#17549A] ease-in-out duration-300 text-white'>Sign Up</button>

            <div className='flex gap-3 text-sm  mt-4'>
              <p>Already have an account?</p>
              <Link href={'/log_in'} className='text-blue-700 font-bold'>Login</Link>
            </div>

            {/* <div
              onClick={handleGoogleSignIn}
              className="cursor-pointer"
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
            </div> */}


          </form>
        </div>
      </div>
      <Footer />

      <ToastContainer />
      {loading && <Loader />}
    </main>
  );
}
