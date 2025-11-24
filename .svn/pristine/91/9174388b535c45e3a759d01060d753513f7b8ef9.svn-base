import { Progress, Tooltip } from 'components/ui';
import React, { useEffect, useRef, useState } from 'react';
import { MdOutlinePause, MdPlayArrow } from 'react-icons/md';
import EditMaxDurationDialog from './components/EditMaxCountDialog';

function AutoExecuteFunctionCounter({
  width,
  strokeWidth,
  color,
  maxDurationInSec: maxDurationInSecProp,
  dependencies,
  executeFunction,
}) {
  /* STATE */
  const [counterInSec, setCounterInSec] = useState(maxDurationInSecProp);
  const [maxDurationInSec, setMaxDurationInSec] =
    useState(maxDurationInSecProp);
  const [isCounterRunning, setIsCounterRunning] = useState(false);
  const [isEditMaxDurationDialogOpen, setIsEditMaxDurationDialogOpen] =
    useState(false);

  /* HOOKS */
  const isExecutingRef = useRef(false);
  const lastMouseMoveTimeRef = useRef(Date.now());

  /* VARIABLES */
  let interval,
    time = `${
      parseInt(counterInSec / 60) < 10
        ? `0${parseInt(counterInSec / 60)}`
        : parseInt(counterInSec / 60)
    }:${counterInSec % 60 < 10 ? `0${counterInSec % 60}` : counterInSec % 60}`;

  /* USE EFFECTS */
  useEffect(() => {
    try {
      if (isCounterRunning)
        interval = setInterval(async () => {
          if (counterInSec === 0) {
            if (typeof executeFunction === 'function') {
              if (isExecutingRef.current) return;
              isExecutingRef.current = true;
              await executeFunction();
              isExecutingRef.current = false;
            }
            setCounterInSec(maxDurationInSec);
          } else {
            setCounterInSec((prevCounter) => prevCounter - 1);
          }
        }, 1000);
      else clearInterval(interval);
      return () => clearInterval(interval);
    } catch (error) {
      console.error(error);
    }
  }, [isCounterRunning, counterInSec, ...dependencies]);

  useEffect(() => {
    try {
      setCounterInSec(maxDurationInSec);
      const checkInactivity = setInterval(() => {
        if (
          Date.now() - lastMouseMoveTimeRef.current >
          2 * maxDurationInSec * 1000
        ) {
          setIsCounterRunning(false);
        }
      }, 1000);
      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        clearInterval(checkInactivity);
      };
    } catch (error) {
      console.error(error);
    }
  }, [maxDurationInSec]);

  /* EVENT HANDLERS */
  const handleMouseMove = () => {
    lastMouseMoveTimeRef.current = Date.now();
  };

  return (
    <>
      <Progress
        variant="circle"
        percent={(counterInSec / maxDurationInSec) * 100}
        width={width}
        customInfo={
          <p className="flex flex-col items-center justify-center mt-2.5">
            <Tooltip
              title={`${
                isCounterRunning
                  ? `Auto saving in ${time}`
                  : `Auto save paused at ${time}`
              }. Click to edit.`}
              placement="top-end"
              wrapperClass="hover:cursor-pointer"
            >
              <span
                className="text-xs font-semibold"
                onClick={() => setIsEditMaxDurationDialogOpen(true)}
              >
                {time}
              </span>
            </Tooltip>
            <div onClick={() => setIsCounterRunning(!isCounterRunning)}>
              <Tooltip
                title={isCounterRunning ? 'Pause Auto Save' : 'Play Auto Save'}
                wrapperClass="transition-all"
              >
                {isCounterRunning ? (
                  <MdOutlinePause
                    className={`text-sm hover:cursor-pointer hover:text-${color} transition-all`}
                  />
                ) : (
                  <MdPlayArrow
                    className={`text-sm hover:cursor-pointer hover:text-${color} transition-all`}
                  />
                )}
              </Tooltip>
            </div>
          </p>
        }
        strokeWidth={strokeWidth}
        color={color}
        className="!w-max"
      />
      <EditMaxDurationDialog
        isOpen={isEditMaxDurationDialogOpen}
        setIsOpen={setIsEditMaxDurationDialogOpen}
        maxDurationInSec={maxDurationInSec}
        setMaxDurationInSec={setMaxDurationInSec}
      />
    </>
  );
}

export default AutoExecuteFunctionCounter;
