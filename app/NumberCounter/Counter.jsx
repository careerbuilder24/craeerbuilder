import { useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa6";
const Counter = ({ target = 200 }) => {
    const [count, setCount] = useState(0); // Start counting from 1

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prevCount => {
                if (prevCount < target) {
                    return prevCount + 1;
                } else {
                    clearInterval(interval);
                    return prevCount;
                }
            });
        }, 20); // Adjust speed of counting here

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [target]);

    return (
        <div  style={{  fontSize: '48px', fontWeight: 'normal', font: 'white' }}>
            <span className='flex flex-row items-center' ><FaPlus className='text-3xl font-extrabold' />{count}</span>
        </div>
    );
};

export default Counter;
