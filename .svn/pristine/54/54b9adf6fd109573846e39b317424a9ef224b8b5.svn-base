import { addTimeDurations } from 'views/Controls/GLOBALFUNACTION';
import { useState, useEffect, useRef } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import { Button, Dialog, Input } from 'components/ui';

const formatTime11 = (time) => {
  const parts = time.split(':');
  return parts
    .map((part) => part.padStart(2, '0'))
    .join(':')
    .substring(0, 11);
};
export function UpdatePrimaryID(data) {
  let lastPrimaryID = 0;
  const newData = [];

  data.forEach((item) => {
    if (item.F_C_S_P !== 'NTC') {
      lastPrimaryID++;
    }
    // Create a new object with the updated primary ID
    const newItem = { ...item, PrimaryID: lastPrimaryID };
    newData.push(newItem);
  });

  return newData;
}
export function updateStartTimes(
  table1Data,
  isProgrambase,
  isComBrk,
  EventSkipType = 'CM',
  defaultStartTime,
  firstLoad,
  frames,
) {
  let previousDuration = '00:00:00:00';
  let Start_Time = defaultStartTime ? defaultStartTime : '00:00:00:00';
  return table1Data.map((row, index) => {
    if (firstLoad && row.F_C_S_P === 'NTC' && row.NtcTypeName === 'DTM')
      return row;
    if (row.F_C_S_P === 'NTC' || row.F_C_S_P === 'BR') {
      if (row.OffsetStartTime) {
        return {
          ...row,
          Start_Time: row.OffsetStartTime,
          Tel_Time: row.OffsetStartTime,
        };
      } else {
        return {
          ...row,
          Start_Time: '00:00:00:00',
          Tel_Time: '00:00:00:00',
          OffsetStartTime: '00:00:00:00',
        };
      }
    }
    let newStartTime = Start_Time;

    if (isProgrambase) {
      if (row.F_C_S_P !== 'CT') {
        if (
          (row.F_C_S_P === EventSkipType && isComBrk) ||
          row.F_C_S_P === 'NTC' ||
          row.F_C_S_P === 'BR'
        ) {
          Start_Time = formatTime11(Start_Time);
          return { ...row, Start_Time, Tel_Time: Start_Time };
        }

        newStartTime = addTimesForTelTime(Start_Time, previousDuration, frames);
        previousDuration = row.Duration;
        newStartTime = formatTime11(newStartTime);
        Start_Time = formatTime11(newStartTime);
        return { ...row, Start_Time: newStartTime, Tel_Time: newStartTime };
      } else {
        Start_Time = row.FPC_Time + ':00:00';
        previousDuration = row.Duration;
        newStartTime = formatTime11(newStartTime);
        Start_Time = formatTime11(Start_Time);
        return { ...row, Start_Time, Tel_Time: Start_Time };
      }
    } else {
      if (index === 0) {
        Start_Time = defaultStartTime ? defaultStartTime : row.Start_Time;
        previousDuration = row.Duration;
      } else {
        newStartTime = addTimesForTelTime(Start_Time, previousDuration, frames);
        newStartTime = formatTime11(newStartTime);
        Start_Time = formatTime11(newStartTime);
        if ((row.F_C_S_P === 'NTC' && isComBrk) || row.F_C_S_P === 'BR') {
          return { ...row, Start_Time, Tel_Time: Start_Time };
        }
        previousDuration = row.Duration;
        newStartTime = formatTime11(newStartTime);
        Start_Time = formatTime11(newStartTime);
      }
      return { ...row, Start_Time: newStartTime, Tel_Time: newStartTime };
    }
  });
}

const addTimesForTelTime = (time1, time2, frames = 24) => {
  try {
    const maxSeconds = 60;
    const maxMinutes = 60;
    const maxHours = 24; // Reset after 24 hours

    const [h1, m1, s1, f1] = time1.split(':').map(Number);
    const [h2, m2, s2, f2] = time2.split(':').map(Number);

    // Add frames and calculate carry-over seconds
    let totalFrames = f1 + f2;
    let extraSeconds = Math.floor(totalFrames / frames);
    totalFrames = totalFrames % frames;

    // Add seconds and calculate carry-over minutes
    let totalSeconds = s1 + s2 + extraSeconds;
    let extraMinutes = Math.floor(totalSeconds / maxSeconds);
    totalSeconds = totalSeconds % maxSeconds;

    // Add minutes and calculate carry-over hours
    let totalMinutes = m1 + m2 + extraMinutes;
    let extraHours = Math.floor(totalMinutes / maxMinutes);
    totalMinutes = totalMinutes % maxMinutes;

    // Add hours and wrap around after 24 hours
    let totalHours = h1 + h2 + extraHours;
    totalHours = totalHours % maxHours;

    // Format the result as HH:MM:SS:FF
    const formattedTime =
      String(totalHours).padStart(2, '0') +
      ':' +
      String(totalMinutes).padStart(2, '0') +
      ':' +
      String(totalSeconds).padStart(2, '0') +
      ':' +
      String(totalFrames).padStart(2, '0');

    return formattedTime;
  } catch (error) {
    throw error;
  }
};
// export function updateStartTimes(table1Data, isProgrambase = true, isComBrk = true) {

// function calculateNewStartTime(startTime, previousDuration) {
//     // Parse time strings into components for accurate calculation
//     const startTimeComponents = startTime.split(':')
//     const previousDurationComponents = previousDuration.split(':')

//     // Add durations component-wise, handling overflow
//     let hours =
//         (parseInt(startTimeComponents[0]) +
//             parseInt(previousDurationComponents[0])) %
//         24
//     let minutes =
//         (parseInt(startTimeComponents[1]) +
//             parseInt(previousDurationComponents[1])) %
//         60
//     let seconds =
//         (parseInt(startTimeComponents[2]) +
//             parseInt(previousDurationComponents[2])) %
//         60
//     let frames =
//         (parseInt(startTimeComponents[3]) +
//             parseInt(previousDurationComponents[3])) %
//         100

//     if (
//         parseInt(startTimeComponents[2]) +
//             parseInt(previousDurationComponents[2]) >=
//         60
//     ) {
//         minutes = minutes + 1
//     }
//     if (
//         parseInt(startTimeComponents[1]) +
//             parseInt(previousDurationComponents[1]) >=
//         60
//     ) {
//         hours = hours + 1
//     }

//     // Format the new start time with leading zeros
//     return `${hours.toString().padStart(2, '0')}:${minutes
//         .toString()
//         .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${frames
//         .toString()
//         .padStart(2, '0')}`
// }
export function sumCommercialDuration(data) {
  let totalDuration = 0;

  data.forEach((item) => {
    // Extract hours, minutes, seconds, and milliseconds from CommercialDuration
    const [hours, minutes, seconds, frames] = item.CommercialDuration.split(
      ':',
    ).map((part) => parseInt(part));

    // Convert hours, minutes, and seconds to milliseconds and add to totalDuration
    totalDuration += hours * 3600 + minutes * 60 + seconds + frames / 30;
  });

  return totalDuration;
}
export function hideStackedSideNav() {
  const stackedSideNav = document.getElementsByClassName('stacked-side-nav')[0];
  stackedSideNav.classList.add('hidden');
  const footer = document.getElementsByClassName('footer')[0];
  footer.classList.add('hidden');
}

export function hideStackedSideNav_secondary() {
  const stackedSideNav = document.getElementsByClassName(
    'stacked-side-nav-secondary',
  )[0];
  if (stackedSideNav != undefined) {
    stackedSideNav?.classList.add('hidden');
  }
  // Hide HiOutlineArrowRight when hiding side nav
  document.getElementById('rightIndicator')?.classList.remove('hidden');
  // Show HiOutlineArrowLeft
  document.getElementById('leftIndicator')?.classList.add('hidden');
}

export function hideStackedSideNav_secondaryShow() {
  const stackedSideNav = document.getElementsByClassName(
    'stacked-side-nav-secondary',
  )[0];
  if (stackedSideNav != undefined) {
    stackedSideNav?.classList.remove('hidden');
  }
  document.getElementById('leftIndicator')?.classList.remove('hidden');
  // Show HiOutlineArrowRight
  document.getElementById('rightIndicator')?.classList.add('hidden');
}

export const FilldraggedRow = (draggedRows, referencerow) => {
  let clonedRows = draggedRows.map((row) => {
    let clonedRow = { ...row };
    if (clonedRow.F_C_S_P === 'S' || clonedRow.F_C_S_P === 'CT') {
    }
    if (clonedRow.F_C_S_P === 'NTC') {
      clonedRow.PrimaryID = referencerow.PrimaryID;
      clonedRow.SeasonNo = referencerow.SeasonNo;
      clonedRow.Ep_No = referencerow.Ep_No;
      clonedRow.ContentCode = referencerow.ContentCode;
      clonedRow.BreakNumber = referencerow.BreakNumber;
      clonedRow.SeasonNo = referencerow.SeasonNo;
      clonedRow.FPC_ID = referencerow.FPC_ID;
    } else if (clonedRow.F_C_S_P === 'CM') {
      clonedRow.PrimaryID = referencerow.PrimaryID;
      clonedRow.SeasonNo = referencerow.SeasonNo;
      clonedRow.Ep_No = referencerow.Ep_No;
      clonedRow.ContentCode = referencerow.ContentCode;
      clonedRow.BreakNumber = referencerow.BreakNumber;
      clonedRow.SeasonNo = referencerow.SeasonNo;
      clonedRow.FPC_ID = referencerow.FPC_ID;
      clonedRow.ScheduleTime = referencerow.ScheduleTime;
    } else {
      clonedRow.SeasonNo = referencerow.SeasonNo;
      clonedRow.Ep_No = referencerow.Ep_No;
      clonedRow.ContentCode = referencerow.ContentCode;
      clonedRow.BreakNumber = referencerow.BreakNumber;
      clonedRow.SeasonNo = referencerow.SeasonNo;
      clonedRow.FPC_ID = referencerow.FPC_ID;
    }

    clonedRow.SequenceNo = referencerow.SequenceNo;
    clonedRow.Start_Time = '00:00:00:00';

    return clonedRow;
  });

  return clonedRows;
};
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secondsRemainder = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(
    secondsRemainder,
  ).padStart(2, '0')}`;
};

export function transformData(data) {
  return data.map((item, index) => ({
    id: String(index), // Convert index to string for "id"
    title: `Total Scheduled ${item.TotalScheduled}`,
    start: item.TelecastDate.split('T')[0], // Extract date part
    eventColor: 'yellow',
  }));
}

export const Clock = ({ Progress, PromoSchdulingSave, openNotification }) => {
  const [percent, setPercent] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [initialRemainingTime, setInitialRemainingTime] = useState(0); // Added line
  const [isRunning, setIsRunning] = useState(false);
  const initialRender = useRef(true);
  const [dialogIsOpen, setIsOpen] = useState(false);
  const [first, setfirst] = useState('');
  const openDialog = () => {
    setIsOpen(true);
  };
  const handlePause = () => {
    setIsRunning(!isRunning);
  };
  const CircleCustomInfo = ({ percent }) => {
    return (
      <div>
        <p onClick={() => openDialog()} style={{ cursor: 'pointer' }}>
          <p
            style={{
              marginTop: '5px',
              fontSize: '12px',
              color: 'white',
            }}
          >
            {formatTime(remainingTime)}
          </p>
        </p>
        <p
          style={{
            cursor: 'pointer',
            color: 'white',
            marginLeft: '10px',
          }}
          onClick={() => handlePause()}
        >
          {isRunning ? <FaPause /> : <FaPlay />}
        </p>
      </div>
    );
  };
  useEffect(() => {
    handleSetTime(10);
  }, []);

  useEffect(() => {
    let interval;

    if (isRunning && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => Math.max(prevTime - 1, 0));
        setPercent((prevPercent) => {
          const newPercent =
            100 - (remainingTime / (initialRemainingTime || 1)) * 100;
          return Math.min(newPercent, 100);
        });
      }, 1000);
    } else if (remainingTime === 0 && isRunning) {
      PromoSchdulingSave();
      openNotification('info');
      setRemainingTime(initialRemainingTime);
    }

    return () => clearInterval(interval);
  }, [isRunning, remainingTime, initialRemainingTime]); // Added initialRemainingTime

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
  }, [remainingTime]);

  const handleSetTime = (inputTime) => {
    const newTimeInMinutes = parseInt(inputTime, 10);
    if (!isNaN(newTimeInMinutes) && newTimeInMinutes > 0) {
      const newTimeInSeconds = newTimeInMinutes * 60;
      setRemainingTime(newTimeInSeconds);
      setInitialRemainingTime(newTimeInSeconds); // Added line
      setPercent(0);
      setIsRunning(true);
    }
  };

  const onDialogClose = (e) => {
    console.log('onDialogClose', e);
    setIsOpen(false);
  };

  return (
    <div className="flex">
      <Dialog
        isOpen={dialogIsOpen}
        width={300}
        height={200}
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
      >
        <div className="flex flex-col h-full justify-between">
          <h5 className="mb-4">Set Timer</h5>
          <div className="flex align-center">
            <Input
              maxLength="2"
              value={first}
              onChange={(e) => {
                const input = e.target.value;
                if (/^\d{0,2}$/.test(input) || input === '') {
                  setfirst(input);
                }
              }}
            />
          </div>
          <div className="text-right mt-6">
            <Button
              className="ltr:mr-2 rtl:ml-2"
              variant="solid"
              onClick={() => {
                handleSetTime(first);
                onDialogClose();
              }}
            >
              Set
            </Button>
            <Button
              className="ltr:mr-2 rtl:ml-2"
              variant="solid"
              onClick={onDialogClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Dialog>
      <div className="flex" style={{ width: '120px' }}>
        <Progress
          variant="circle"
          className="mx-6"
          size="sm"
          width={50}
          percent={percent}
          customInfo={<CircleCustomInfo percent={percent} />}
        />
      </div>
    </div>
  );
};
