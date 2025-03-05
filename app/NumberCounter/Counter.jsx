import { useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa6";

const Counter = ({ target = 200, start }) => {
    const [count, setCount] = useState(0); // Start counting from 0

    useEffect(() => {
        if (!start) return; // Don't start counting until "start" is true

        const interval = setInterval(() => {
            setCount((prevCount) => {
                if (prevCount < target) {
                    return prevCount + 1;
                } else {
                    clearInterval(interval);
                    return prevCount;
                }
            });
        }, 20); // Adjust speed of counting here

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [start, target]); // Re-run when `start` or `target` changes

    return (
        <div style={{ fontSize: '24px', fontWeight: 'normal', font: 'white' }}>
            <span className="flex flex-row items-center">
                <FaPlus className="text-lg font-extrabold" />
                {count}
            </span>
        </div>
    );
};

export default Counter;
