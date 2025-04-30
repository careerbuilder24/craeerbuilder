import useDetailsCourse from '@/hooks/useDetailsCourse';
import React from 'react'
import Link from 'next/link';

export default function CourseDuration() {
    const course = useDetailsCourse();
    return (
        <>
            {/*Course  */}
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border text-sm border-gray-200">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="border border-gray-200 p-2 text-center">Start Date</th>
                            <th className="border border-gray-200 p-2 text-center">End Date</th>
                            <th className="border border-gray-200 p-2 text-center">Title</th>
                            <th className="border border-gray-200 p-2 text-center">Duration</th>
                            <th className="border border-gray-200 p-2 text-center">Details</th>
                            <th className="border border-gray-200 p-2 text-center">Certificate</th>

                        </tr>
                    </thead>
                    <tbody>
                        {course?.map((courses) => (
                            <tr key={courses.id}>
                                <td className="border bg-[#3082df]  text-white border-gray-200 p-2 text-center">{courses.startDate}</td>
                                <td className="border bg-[#3082df] text-white border-gray-200 p-2 text-center">{courses.endDate}</td>
                                <td className="border bg-[#3082df] text-white border-gray-200 p-2 text-center">{courses.title}</td>
                                <td className="border bg-[#3082df] text-white border-gray-200 p-2 text-center">{courses.duration}</td>
                                <td className="border bg-[#79b0ee]  text-white border-gray-200 p-2 text-center">{courses.details}</td>
                                <td className="border bg-[#79b0ee] text-white border-gray-200 p-2 text-center"><Link href={'/Cer_tificate'} className='hover:underline'>Show</Link></td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
