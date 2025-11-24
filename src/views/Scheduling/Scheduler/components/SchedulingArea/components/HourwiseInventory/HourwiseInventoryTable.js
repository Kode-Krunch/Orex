import React, { useContext } from 'react';
import { getPercentage } from 'views/Controls/GLOBALFUNACTION';
import SchedulerContext from 'views/Scheduling/Scheduler/context/SchedulerContext';

function HourwiseInventoryTable({ tableData, maxDuration }) {
  /* CONTEXT */
  const { schedulingTableRef } = useContext(SchedulerContext);

  /* HELPER FUNCTIONS */
  const getGradientForPercentage = (percentage) => {
    try {
      return percentage < 40
        ? 'from-green-700 to-green-800'
        : percentage >= 40 && percentage < 71
        ? 'from-amber-600 to-yellow-900'
        : 'from-red-700 to-red-900';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* TABLE HEADER */}
      <div className="flex font-semibold text-white text-[12px] sticky top-0 z-20">
        <div className="py-1 px-2 flex flex-none items-center justify-center w-[17%] border-gray-500 border-y border-x bg-gray-600">
          Hour
        </div>
        <div className="py-1 px-2 flex flex-none items-center justify-center w-[20%] border-gray-500 border-y border-r bg-gray-600">
          Available
        </div>
        <div className="py-1 px-2 flex flex-none items-center justify-center w-[23%] border-gray-500 border-y border-r bg-gray-600">
          Commercial
        </div>
        <div className="py-1 px-2 flex flex-none items-center justify-center w-[20%] border-gray-500 border-y border-r bg-gray-600">
          Promo
        </div>
        <div className="py-1 px-2 flex flex-none items-center justify-center w-[20%] border-gray-500 border-y border-r bg-gray-600">
          Song
        </div>
        <div className="py-1 px-2 flex flex-none items-center justify-center w-[20%] border-gray-500 border-y border-r bg-gray-600">
          Total
        </div>
      </div>
      {/* Table Body */}
      <div>
        {tableData.map((row) => (
          <div
            className="flex text-white text-[12px] hover:cursor-pointer hover:opacity-80"
            onClick={() =>
              schedulingTableRef.current?.scrollToItem(row.hourIndex, 'center')
            }
          >
            <div className="relative py-1 px-2 flex flex-none items-center justify-center w-[17%] border-gray-600 border-b border-x bg-gray-600 bg-opacity-20">
              <div className="z-10">{row.hour}</div>
              <div
                className={`h-full absolute left-0 top-0 bg-gradient-to-r ${getGradientForPercentage(
                  getPercentage(row.commDuration, maxDuration),
                )}`}
                style={{
                  width: `${getPercentage(row.commDuration, maxDuration)}%`,
                }}
              ></div>
            </div>
            <div className="py-1 px-2 flex flex-none items-center justify-center w-[20%] border-gray-600 border-b border-r bg-gray-600 bg-opacity-20">
              {row.availableDuration}
            </div>
            <div
              className={`py-1 px-2 flex flex-none items-center justify-center w-[23%] border-gray-600 border-b border-r bg-gradient-to-r ${getGradientForPercentage(
                getPercentage(row.commDuration, maxDuration),
              )}`}
            >
              {row.commDuration}
            </div>
            <div
              className={`py-1 px-2 flex flex-none items-center justify-center w-[20%] border-gray-600 border-b border-r bg-gradient-to-r bg-gray-600 bg-opacity-20`}
            >
              {row.promoDuration}
            </div>
            <div
              className={`py-1 px-2 flex flex-none items-center justify-center w-[20%] border-gray-600 border-b border-r bg-gradient-to-r bg-gray-600 bg-opacity-20`}
            >
              {row.songDuration}
            </div>
            <div
              className={`py-1 px-2 flex flex-none items-center justify-center w-[20%] border-gray-600 border-b border-r bg-gradient-to-r bg-gray-600 bg-opacity-20`}
            >
              {row.commDuration + row.promoDuration + row.songDuration}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default HourwiseInventoryTable;
