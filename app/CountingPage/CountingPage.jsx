import React from 'react';
import Counter from '../NumberCounter/Counter';
import { PiStudentFill } from "react-icons/pi";
import { IoIosPeople } from "react-icons/io";
import { ImOffice } from "react-icons/im";

export default function CountingPage() {
    return (
        <main>
            <div className='container mx-auto flex flex-col  lg:flex-row lg:w-8/12 w-8/12 text-center my-16 gap-3 text-white '>
                <div className='flex flex-col  items-center w-full h-28  lg:ml-0 bg-[#2CAAE1] rounded-md justify-center'>
                    <PiStudentFill className='text-2xl mb-1' />
                    <p className='text-base font-bold'>Running Students</p>
                    <Counter target={200} />
                </div>

                <div className='flex flex-col  items-center w-full h-28 bg-[#2CAAE1] rounded-md justify-center'>
                    <IoIosPeople className='text-2xl mb-1' />
                    <p className='text-lg font-bold'>Running Interns</p>
                    <Counter target={150} />

                </div>

                <div className='flex flex-col  items-center w-full h-28 bg-[#2CAAE1] rounded-md justify-center'>
                    <ImOffice className='text-xl mb-1' />
                    <p className='text-base  font-bold'>Running Employee</p>
                    <Counter target={100} />

                </div>

                <div className='flex flex-col  items-center w-full h-28 bg-[#2CAAE1] rounded-md justify-center'>
                    <ImOffice className='text-xl mb-1' />
                    <p className='text-base  font-bold'>Running Batch</p>
                    <Counter target={80} />

                </div>

                <div className='flex flex-col  items-center w-full h-28 bg-[#2CAAE1] rounded-md justify-center'>
                    <ImOffice className='text-xl mb-1' />
                    <p className='text-base  font-bold'>Upcoming Batch</p>
                    <Counter target={80} />

                </div>

                <div className='flex flex-col  items-center w-full h-28 bg-[#2CAAE1] rounded-md justify-center'>
                    <ImOffice className='text-xl mb-1' />
                    <p className='text-base  font-bold'>Upcoming Webiner</p>
                    <Counter target={80} />

                </div>
            </div>
        </main>
    );
}
