import { Button } from 'components/ui';
import React, { useEffect, useState } from 'react';
import {
  getUniqueObjects,
  openNotification,
} from 'views/Controls/GLOBALFUNACTION';

function FpcTime({ tableRef, tableData }) {
  /* STATES */
  const [fpcTimes, setFpcTimes] = useState([]);

  /* USE EFFECTS */
  // useEffect(() => {
  //   try {
  //     if (Array.isArray(tableData)) {
  //       let times = [];
  //       let uniqueFpcTimeRows = getUniqueObjects(tableData, 'FPC_Time');
  //       uniqueFpcTimeRows = uniqueFpcTimeRows.filter((row) => row.FPC_Time);
  //       uniqueFpcTimeRows.forEach((row, index) => {
  //         let time = { time: row.FPC_Time, isOverRun: false };
  //         if (index !== 0) {
  //           if (row.FPC_Time < row.Start_Time) {
  //             times[index - 1].isOverRun = true;
  //           }
  //         }
  //         times.push(time);
  //       });
  //       setFpcTimes(times);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [tableData]);

  /* EVENT HANDLERS*/
  // const handleTimeClick = (time) => {
  //   try {
  //     const scrollIndex = [...tableData]
  //       .splice(1)
  //       .findIndex((row) => row.FPC_Time >= time.time);
  //     if (scrollIndex !== -1) {
  //       if (scrollIndex === 1) {
  //         tableRef.current.scrollToItem(0, 'center');
  //       } else {
  //         tableRef.current.scrollToItem(scrollIndex, 'center');
  //       }
  //     } else {
  //       openNotification('info', 'No data available for this FPC Time');
  //       return;
  //     }
  //   } catch (error) {
  //     openNotification('danger', 'Something went wrong');
  //     console.error(error);
  //   }
  // };

  return (
    <div className="h-full w-full flex flex-col gap-0.5 overflow-y-scroll no-scrollbar">
      {fpcTimes.map((time) => (
        <Button
          size="sm"
          className={`transition-all ${
            time.isOverRun
              ? '!bg-red-700 hover:!bg-red-800'
              : '!bg-teal-700 hover:!bg-teal-800'
          }`}
          // onClick={() => handleTimeClick(time)}
          key={time.time}
        >
          {time.time}
        </Button>
      ))}
    </div>
  );
}

export default FpcTime;
