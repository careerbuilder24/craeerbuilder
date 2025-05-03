import React from 'react'
import 'react-tabs/style/react-tabs.css';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import usePortfolio from '@/hooks/usePortfolio';
import Image from 'next/image';


export default function PortFolio() {
    const portfolio = usePortfolio();
    return (
        <>
            <div className='shadow-xl'>
                <Tabs className="">
                    <TabList className="flex justify-center items-center space-x-4 ">
                        <Tab className="cursor-pointer p-2 border-2 transition-all duration-200 hover:border-blue-500 focus:outline-blue-500 hover:bg-blue-100 selected:bg-blue-200 mt-5">
                            All Works
                        </Tab>
                        <Tab className="cursor-pointer p-2 border-2 transition-all duration-200 hover:border-blue-500 focus:outline-blue-500 hover:bg-blue-100 selected:bg-blue-200 mt-5">
                            Html and CSS Work
                        </Tab>
                        <Tab className="cursor-pointer p-2 border-2 transition-all duration-200 hover:border-blue-500 focus:outline-blue-600 hover:bg-blue-100 selected:bg-blue-200 mt-5">
                            Figma to React Work
                        </Tab>
                    </TabList>

                    {/* Tab Panels */}
                    <TabPanel>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 p-10'>
                            {portfolio?.map((portfolios) => (
                                <div key={portfolios?.id} className="  bg-base-100 shadow-xl cursor-pointer rounded-xl p-4 my-5">

                                    {/* Image with scrolling effect on hover */}
                                    <Image
                                        className="w-full rounded-xl  object-cover transform hover:scale-105 transition-transform duration-300 "
                                        src={portfolios?.image}
                                        alt="Portfolio"
                                        width={100}
                                        height={100}
                                    />

                                    <div className="card-body ">
                                        <h2 className="card-title"> {portfolios?.title} </h2>
                                        <p>Price: ${portfolios?.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 p-10'>
                            {portfolio?.map((portfolios) => (
                                <div key={portfolios?.id} className="  bg-base-100 shadow-xl cursor-pointer rounded-xl p-4 my-5">

                                    {/* Image with scrolling effect on hover */}
                                    <Image
                                        className="w-full rounded-xl object-cover transform hover:scale-105 transition-transform duration-300"
                                        src={portfolios?.image2}
                                        alt="Portfolio"
                                        width={100}
                                        height={100}
                                    />

                                    <div className="card-body ">
                                        <h2 className="card-title"> {portfolios?.title} </h2>
                                        <p>Price: ${portfolios?.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 p-10'>
                            {portfolio?.map((portfolios) => (
                                <div key={portfolios?.id} className="  bg-base-100 shadow-xl cursor-pointer rounded-xl p-4 my-5">

                                    {/* Image with scrolling effect on hover */}
                                    <Image
                                        className="w-full rounded-xl object-cover transform hover:scale-105 transition-transform duration-300 "
                                        src={portfolios?.image3}
                                        alt="Portfolio"
                                        width={100}
                                        height={100}
                                    />

                                    <div className="card-body ">
                                        <h2 className="card-title"> {portfolios?.title} </h2>
                                        <p>Price: ${portfolios?.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabPanel>

                </Tabs>

            </div>
        </>
    )
}
