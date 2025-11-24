import React from 'react';
import { convertMinsToHoursAndMins } from 'views/Controls/GLOBALFUNACTION';

function FpcConsumptionIndicator({ consumedMins, maxMins }) {
  /* CONSTANTS */
  let consumedPercentage = ((consumedMins / maxMins) * 100).toFixed(2);
  consumedPercentage =
    Number(consumedPercentage) <= 100 ? consumedPercentage : 100;

  return (
    <div className="flex flex-col gap-1 pr-4 border-r border-r-gray-700">
      <span className="font-semibold text-gray-200 border-b border-b-gray-700 pb-0.5 mb-1">
        FPC Consumed
      </span>
      <div className="grow h-0 flex gap-2 items-center w-64 mb-1">
        <div className="grow relative h-7">
          <div className="absolute h-full w-full border border-gray-600 rounded-md"></div>
          <div className="absolute h-full w-full p-0.5">
            <div
              className="h-full rounded bg-gradient-to-r from-green-700/10 via-[30%] to-green-600"
              style={{
                width: `${consumedPercentage}%`,
              }}
            ></div>
          </div>
          <div className="absolute h-full w-full flex justify-center items-center text-sm text-gray-200">
            {convertMinsToHoursAndMins(consumedMins)}
          </div>
        </div>
        <span className="text-gray-200">{consumedPercentage}%</span>
      </div>
    </div>
  );
}

export default FpcConsumptionIndicator;
