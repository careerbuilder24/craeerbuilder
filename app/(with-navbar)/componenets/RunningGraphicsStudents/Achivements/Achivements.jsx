import useGallery from '@/hooks/useGallery';
import Image from 'next/image';
import React from 'react'

export default function Achivements() {
    const achivements = useGallery();
    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 p-4 h-[1000px] overflow-auto w-full mt-3'>
                {achivements?.map((achivement) => (
                    <div key={achivement.id}>
                        <div className='relative gap-4 overflow-hidden cursor-pointer'>
                            <div className='lg:w-full'>
                                <img
                                    width={600}
                                    height={400}
                                    src={achivement.image}
                                    alt='achivements Image'
                                    className='w-full h-full rounded-md'
                                />
                            </div>
                            <div className='relative bottom-11 rounded-md flex-col bg-black opacity-75'>
                                <div className='ml-3'>
                                    <time  className='text-white text-sm'>{achivement.date}</time>
                                    <h3 className='text-white text-base'>{achivement.description}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </>
    )
}
