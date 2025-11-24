import React from 'react';
import {
  getPercentage,
  subtractTimes,
  timeToSeconds,
} from 'views/Controls/GLOBALFUNACTION';
import { rowDataTypesEnum } from 'views/Scheduling/Scheduler/enum';
import { addTimes } from '../../../Summary/utils';
import { Tooltip } from 'components/ui';

function CTConsumptionIndicator({ tableData, row }) {
  /* HELPER FUNCTIONS */
  const getConsumedData = () => {
    let totalDuration = subtractTimes(
      `${row.FPC_TimeTo === '00:00' ? '24:00' : row.FPC_TimeTo}:00:00`,
      `${row.FPC_Time}:00:00`,
    );
    let consumedDuration = '00:00:00:00';
    let consumedPercentage = 0;
    for (let index = row.rowIndex + 1; index <= tableData.length; index++) {
      let curRow = tableData[index];
      if (!curRow || curRow.F_C_S_P === rowDataTypesEnum.CONTENT_TERMINATION)
        break;
      if (curRow.F_C_S_P !== rowDataTypesEnum.NTC) {
        consumedDuration = addTimes(consumedDuration, curRow.Duration);
      }
    }
    consumedPercentage = getPercentage(
      timeToSeconds(consumedDuration),
      timeToSeconds(totalDuration),
      true,
    );
    return { totalDuration, consumedDuration, consumedPercentage };
  };

  return (
    <>
      <div
        className={`absolute bottom-0 border-b-[6px] ${
          getConsumedData().consumedPercentage < 100
            ? 'border-b-green-800'
            : 'border-b-red-600'
        }`}
        style={{
          width: `${
            getConsumedData().consumedPercentage < 101
              ? getConsumedData().consumedPercentage
              : 100
          }%`,
        }}
      ></div>
      <Tooltip
        wrapperClass="absolute h-full w-full"
        title={
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center w-52">
              <span>Duration:</span>
              <span>{getConsumedData().totalDuration}</span>
            </div>
            <div className="flex justify-between items-center w-52">
              <span>Consumed:</span>
              <span>{getConsumedData().consumedDuration}</span>
            </div>
            <div className="flex justify-between items-center w-52">
              <span>Consumed (%):</span>
              <span>{getConsumedData().consumedPercentage.toFixed(2)}%</span>
            </div>
          </div>
        }
      />
    </>
  );
}

export default CTConsumptionIndicator;
