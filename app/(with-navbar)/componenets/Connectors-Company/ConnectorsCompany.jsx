import React from 'react'
import Image from 'next/image'
import './ConnectorsCompany.css'

export default function ConnectorsCompany() {
  return (
    <>
      <p className='text-[#17549A] text-3xl md:text-4xl font-bold text-center mt-16'>Connected by these Companies</p>
      <div className="relative w-full h-52 flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute animate-scroll flex gap-10 items-center">
          <Image
            src="https://i.postimg.cc/BvH72Q76/sources.png"
            alt="Sponsored Logo 1"
            width={200}
            height={200}
            onDragStart={(e) => e.preventDefault()}
          />
          <Image
            src="https://i.postimg.cc/vHB7jPkr/cheaphost.png"
            alt="Sponsored Logo 2"
            width={200}
            height={200}
            onDragStart={(e) => e.preventDefault()}
          />
          <Image
            src="https://i.postimg.cc/qR4yGQ2C/barzak.png"
            alt="Sponsored Logo 3"
            width={200}
            height={200}
            onDragStart={(e) => e.preventDefault()}
          />
          <Image
            src="https://i.postimg.cc/rw5DYxVG/venture-capital.png"
            alt="Sponsored Logo 4"
            width={200}
            height={200}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>

        {/* <style jsx>{`
        .animate-scroll {
          animation: scroll-left 15s linear infinite;
          display: flex;
          align-items: center;
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style> */}
      </div>
    </>

  )
}
