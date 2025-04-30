import { useState, useEffect } from 'react';
import useMotion from '@/hooks/useMotion';

const Time = () => {
  const motionsData = useMotion();  // Get the motion data (the array of student objects)

  // The array of students with their target dates
  const [countdowns, setCountdowns] = useState([]);

  useEffect(() => {
    if (motionsData && motionsData.length > 0) {

    
      const updatedCountdowns = motionsData.map((motion) => {
        const targetDate = new Date(motion.date); // Target date from each motion
        return {
          id: motion.id,
          name: motion.name,
          targetDate,
          timeLeft: {
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
        };
      });

      setCountdowns(updatedCountdowns);  // Initialize countdowns state

      // Update the countdown every second
      const interval = setInterval(() => {
        setCountdowns((prevCountdowns) => {
          return prevCountdowns.map((motion) => {
            const now = new Date();
            const difference = motion.targetDate - now;

            if (difference <= 0) {
              return { ...motion, timeLeft: { ...motion.timeLeft, finished: true } };
            }

            const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30)); // Approximate month length
            const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            return {
              ...motion,
              timeLeft: { months, days, hours, minutes, seconds },
            };
          });
        });
      }, 1000); // Update every second

      return () => clearInterval(interval); // Cleanup on component unmount
    }
  }, [motionsData]); // Recalculate countdowns whenever motion data changes

  return (
    <div className="countdown-timers">
      <h2>Student Countdown Timers</h2>
      {countdowns.map((motion) => (
        <div key={motion.id} className="countdown-timer text-sm">
          <h3>{motion.name} - {motion.courseName}</h3>
          <div className="time">
            {motion.timeLeft.finished ? (
              <span>Target Date Reached</span>
            ) : (
              <>
                <span>{motion.timeLeft.months} Months</span>:
                <span>{motion.timeLeft.days} Days</span>:
                <span>{motion.timeLeft.hours} Hours</span>:
                <span>{motion.timeLeft.minutes} Minutes</span>:
                <span>{motion.timeLeft.seconds} Seconds</span>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Time;
