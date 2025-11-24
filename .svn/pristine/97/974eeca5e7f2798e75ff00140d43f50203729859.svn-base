import React, { useState, useEffect, useCallback } from 'react';

const setTargetTime = (date, Name) => {
  const targetTime = Name === 'Admin' ? new Date() : new Date(date);

  if (Name === 'Admin') {
    targetTime.setHours(23, 59, 0, 0);
  } else {
    targetTime.setHours(23, 59, 0, 0);
  }

  return targetTime;
};

const CountdownTimer = ({ date, Name = '' }) => {
  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const targetTime = setTargetTime(date, Name);
    const difference = targetTime - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    } else {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  }, [date, Name]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const timeUnits = [
    { unit: 'Days', value: timeLeft.days },
    { unit: 'Hours', value: timeLeft.hours },
    { unit: 'Min', value: timeLeft.minutes },
    { unit: 'Sec', value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-between mb-2">
      {timeUnits.map(({ unit, value }) => (
        <div
          key={unit}
          className="text-center px-4 py-2 dark:bg-[#191F31] bg-[#191F31]` dark:text-[#307EF3] text-[#307EF3] min-w-[58px] mr-3"
        >
          <p className="text-sm font-extrabold">{value}</p>
          <span className="text-[0.7rem] font-semibold  text-slate-400 dark:text-slate-400">
            {unit}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
