'use client'
import React from 'react'
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import img from '../../../assets/img3.jpg'
import Image from 'next/image';

export default function Banner() {
    return (
        <>
  <AwesomeSlider animation="cubeAnimation">
   <div>
    <Image src={img}></Image>
   </div>
   <div>
    <Image src={img}></Image>
   </div>
   <div>
    <Image src={img}></Image>
   </div>
  </AwesomeSlider>
        </>

    )
}
