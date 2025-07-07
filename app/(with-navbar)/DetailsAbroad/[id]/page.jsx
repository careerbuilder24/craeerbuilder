'use client'
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../componenets/Navbar/Navbar';
import { useParams } from 'next/navigation';
import useAbroadStudy from '@/hooks/useAbroadStudy';
import Footer from '../../componenets/Footer/Footer';

export default function UniversityDetailPage() {
    const params = useParams();
    const { id } = params;
    const { data } = useAbroadStudy();

    // Flatten all universities into a single array
    const allUniversities = Object.values(data || {}).flat();

    // Find the university by ID
    const university = allUniversities.find((u) => u.id === parseInt(id));

    if (!university) {
        return <div className='text-center mt-40 text-xl text-red-500'>University not found!</div>;
    }


    return (
        <>
            <Navbar />
            <div className=' mx-auto lg:mt-36 container flex justify-center'>

                <Image
                    src={university.imageOne}
                    width={900}
                    height={900}
                    className='w-9/12 h-auto'
                    alt='university main image'

                />


            </div>

            <div className='flex justify-center mt-10'>
                <p className='w-6/12  text-justify font-semibold text-xl'>
                    {university.descriptionOne}
                </p>
            </div>

            {/* second part */}
            <div className='flex justify-center   mt-20 '>


                <p className='w-4/12  text-justify  font-semibold textarea-lg'>
                    {university.descriptionTwo}
                </p>

                <Image
                    src={university.imageTwo}
                    width={900}
                    height={900}
                    className='w-3/12 h-auto'
                    alt='university second image'

                />
            </div>
            {/* third part */}
            <div className='flex justify-center   mt-20 '>


                <Image
                    src={university.imageThree}
                    width={900}
                    height={900}
                    className='w-3/12 h-auto'
                    alt='university second image'

                />

                <p className='w-4/12  text-justify  font-semibold textarea-lg'>
                    {university.descriptionThree}
                </p>

            </div>
            {/* Fourth part */}
            <div className='flex justify-center   mt-20  mb-10'>
                <p className='w-4/12  text-justify  font-semibold textarea-lg'>
                    {university.descriptionFour}
                </p>

                <Image
                    src={university.imageFour}
                    width={900}
                    height={900}
                    className='w-3/12 h-auto'
                    alt='university second image'

                />



            </div>
            <Footer />



        </>

    );
}

