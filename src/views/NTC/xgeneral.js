import { addTimeDurations } from 'views/Controls/GLOBALFUNACTION';
import { useState, useEffect, useRef } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import { Button, Dialog, Input } from 'components/ui';

export function updateStartTimes(table1Data, isProgrambase = true, isComBrk = true, EventSkipType = "C") {

  let previousDuration = null;
  let Start_Time = null;
  console.log('isProgrambase', isProgrambase)

  if (isProgrambase) {
    console.log('isProgrambase1', isProgrambase)
    return table1Data.map((row) => {
      if (row.F_C_S_P !== 'CT') {
        if (row.F_C_S_P === EventSkipType && isComBrk == false) {
          return { ...row, Start_Time: Start_Time };
        }

        const newStartTime = addTimeDurations(Start_Time, previousDuration);
        previousDuration = row.Duration;
        Start_Time = newStartTime;
        return { ...row, Start_Time: newStartTime }; // Update Start_Time
      } else {

        Start_Time = row.FPC_Time + ':00:00';
        previousDuration = row.Duration;

        return { ...row, Start_Time: Start_Time };
      }
    });

  } else {
    console.log('isProgrambase2', isProgrambase)
    return table1Data.map((row, index) => {

      if (index === 0) {
        Start_Time = row.Start_Time;
        previousDuration = row.Duration;

      }
      const newStartTime = addTimeDurations(Start_Time, previousDuration);
      previousDuration = row.Duration;
      Start_Time = newStartTime;
      return { ...row, Start_Time: newStartTime };
    });
  }

}

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
export function hideStackedSideNav() {
  const stackedSideNav = document.getElementsByClassName('stacked-side-nav')[0];
  stackedSideNav.classList.add('hidden');
  const footer = document.getElementsByClassName('footer')[0];
  footer.classList.add('hidden');
}

export const FilldraggedRow = (draggedRows, referencerow) => {
  let clonedRows = draggedRows.map((row) => {
    let clonedRow = { ...row };

    clonedRow.SeasonNo = referencerow.SeasonNo;
    clonedRow.Ep_No = referencerow.Ep_No;
    clonedRow.ContentCode = referencerow.ContentCode;
    clonedRow.BreakNumber = referencerow.BreakNumber;
    clonedRow.Ep_No = referencerow.Ep_No;
    clonedRow.SeasonNo = referencerow.SeasonNo;
    clonedRow.FPC_ID = referencerow.FPC_ID;
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
    start: item.TelecastDate.split("T")[0], // Extract date part
    eventColor: "yellow"
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
                const input = e.target.value
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
