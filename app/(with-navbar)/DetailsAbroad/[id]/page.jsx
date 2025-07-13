// 'use client';
// import Image from 'next/image';
// import Navbar from '../../componenets/Navbar/Navbar';
// import { useParams } from 'next/navigation';
// import useAbroadStudy from '@/hooks/useAbroadStudy';
// import Footer from '../../componenets/Footer/Footer';
// import ButtonTopMaker from '@/app/buttonTopMaker/ButtonTopMaker';
// import Loader from '../../componenets/Loader/Loader';

// export default function UniversityDetailPage() {
//     const params = useParams();
//     const { id } = params;
//     const { data } = useAbroadStudy();

//     const allUniversities = Object.values(data || {}).flat();
//     const university = allUniversities.find((u) => u.id === parseInt(id));

//     if (!university) {
//         return <>
//             <Loader></Loader>
//         </>;
//     }

//     return (
//         <>
//             <Navbar />

//             {/* Back Button */}
//             <div className='container mx-auto mt-28 lg:mt-2 px-4 lg:fixed  lg:z-10'>
//                 <button
//                     onClick={() => history.back()}
//                     className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition lg:ml-16'
//                 >
//                     Back
//                 </button>
//             </div>

//             {/* Main image */}
//             <div className='container mx-auto mt-10 lg:mt-28 flex justify-center px-4'>
//                 <Image
//                     src={university.imageOne}
//                     width={900}
//                     height={900}
//                     className='w-full sm:w-10/12 lg:w-9/12 h-auto rounded-lg shadow-md'
//                     alt='university main image'
//                 />
//             </div>

//             {/* Description One */}
//             <div className='flex justify-center mt-10 px-4'>
//                 <p className='w-full sm:w-10/12 md:w-8/12 lg:w-6/12 text-justify font-semibold text-lg sm:text-xl'>
//                     {university.descriptionOne}
//                 </p>
//             </div>

//             {/* Description Two */}
//             <div className='flex flex-col-reverse lg:flex-row justify-center items-center mt-16 gap-8 px-4'>
//                 <p className='w-full lg:w-5/12 text-justify font-semibold text-lg'>
//                     {university.descriptionTwo}
//                 </p>
//                 <Image
//                     src={university.imageTwo}
//                     width={900}
//                     height={900}
//                     className='w-full sm:w-8/12 md:w-6/12 lg:w-3/12 h-auto rounded-md shadow'
//                     alt='university second image'
//                 />
//             </div>

//             {/* Description Three */}
//             <div className='flex flex-col lg:flex-row justify-center items-center mt-16 gap-8 px-4'>
//                 <Image
//                     src={university.imageThree}
//                     width={900}
//                     height={900}
//                     className='w-full sm:w-8/12 md:w-6/12 lg:w-3/12 h-auto rounded-md shadow'
//                     alt='university third image'
//                 />
//                 <p className='w-full lg:w-5/12 text-justify font-semibold text-lg'>
//                     {university.descriptionThree}
//                 </p>
//             </div>

//             {/* Description Four */}
//             <div className='flex flex-col-reverse lg:flex-row justify-center items-center mt-16 mb-10 gap-8 px-4'>
//                 <p className='w-full lg:w-5/12 text-justify font-semibold text-lg'>
//                     {university.descriptionFour}
//                 </p>
//                 <Image
//                     src={university.imageFour}
//                     width={900}
//                     height={900}
//                     className='w-full sm:w-8/12 md:w-6/12 lg:w-3/12 h-auto rounded-md shadow'
//                     alt='university fourth image'
//                 />
//             </div>
//             <ButtonTopMaker />
//             <Footer />
//         </>
//     );
// }
