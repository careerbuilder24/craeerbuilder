'use client';
import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import img from '../../../../assets/img1.jpg';
import Image from 'next/image';

export default function Banner() {
    return (
        <>
            <div className='mt-32 lg:mt-0 relative h-6/12 w-full'>
                <AwesomeSlider   animation="cubeAnimation"
                    play>
                    <div className='relative h-full w-full'>
                        <Image src={img} layout="fill" objectFit="cover" alt="Slide 1" onDragStart={(e) => e.preventDefault()} />
                    </div>
                    <div className='relative h-full w-full'>
                        <Image src={img} layout="fill" objectFit="cover" alt="Slide 2"  onDragStart={(e) => e.preventDefault()} />
                    </div>
                    <div className='relative h-full w-full'>
                        <Image src={img} layout="fill" objectFit="cover" alt="Slide 3"  onDragStart={(e) => e.preventDefault()}/>
                    </div>
                </AwesomeSlider>
            </div>
        </>
    );
}
