import React from 'react';
import Counter from '../NumberCounter/Counter';
import { PiStudentFill } from "react-icons/pi";
import { IoIosPeople } from "react-icons/io";
import { ImOffice } from "react-icons/im";

export default function CountingPage() {
    return (
        <main>
            <div className='container mx-auto flex flex-col  lg:flex-row gap-6 text-center my-16 text-white'>
                <div className='flex flex-col ml-10 items-center w-72 h-44 bg-[#2CAAE1] rounded-md justify-center'>
                    <PiStudentFill className='text-5xl mb-1' />
                    <p className='text-xl font-bold'>Running Students</p>
                    <Counter target={200} />

                </div>

                <div className='flex flex-col ml-10 items-center w-72 h-44 bg-[#2CAAE1] rounded-md justify-center'>
                    <IoIosPeople className='text-5xl mb-1' />
                    <p className='text-xl font-bold'>Interns</p>
                    <Counter target={150} />

                </div>

                <div className='flex flex-col ml-10 items-center w-72 h-44 bg-[#2CAAE1] rounded-md justify-center'>
                    <ImOffice className='text-5xl mb-1' />
                    <p className='text-xl font-bold'>Employees</p>
                    <Counter target={100} />

                </div>

                <div className='flex flex-col ml-10 items-center w-72 h-44 bg-[#2CAAE1] rounded-md justify-center'>
                    <ImOffice className='text-5xl mb-1' />
                    <p className='text-xl font-bold'>Upcoming Batch</p>
                    <Counter target={80} />

                </div>

                <div className='flex flex-col ml-10 items-center w-72 h-44 bg-[#2CAAE1] rounded-md justify-center'>
                    <ImOffice className='text-5xl mb-1' />
                    <p className='text-xl font-bold'>Upcoming Batch</p>
                    <Counter target={80} />

                </div>
            </div>
        </main>
    );
}
