import React, { useMemo } from 'react';
import { getPercentage, timeToSeconds } from 'views/Controls/GLOBALFUNACTION';
import { addTimes } from '../../../Summary/utils';
import { Tooltip } from 'components/ui';
import {
  getNTCParentRow,
  getRowWithNTC,
} from 'views/Scheduling/Scheduler/context/utils';
import GroupGraph from './GroupwiseNtcConsumption/Group';
import { BsInfoLg } from 'react-icons/bs';

function NTCGroupConsumptionIndicator({ tableData, row }) {
  /* HELPER FUNCTIONS */
  const getConsumptionInformation = () => {
    const ntcParentRow = getNTCParentRow(row.rowIndex, tableData);
    const ntcParentNTCRows = getRowWithNTC([ntcParentRow], tableData, false);
    const curGroupNTCs = ntcParentNTCRows.filter(
      (ntcRow) => ntcRow.NTCGroupCode === row.NTCGroupCode,
    );
    let parentDuration = ntcParentRow.Duration;
    let consumedDuration = '00:00:00:00';
    let consumedPercentage = '-';
    curGroupNTCs.forEach((ntc, index) => {
      if (curGroupNTCs.length > 1 && index !== curGroupNTCs.length - 1)
        consumedDuration = addTimes(
          consumedDuration,
          ntc.Duration,
          ntc.DefaultGAP,
        );
      else consumedDuration = addTimes(consumedDuration, ntc.Duration);
    });
    consumedPercentage = getPercentage(
      timeToSeconds(consumedDuration),
      timeToSeconds(parentDuration),
      true,
    ).toFixed(2);
    return {
      parentDuration,
      consumedDuration,
      consumedPercentage,
    };
  };

  /* HOOKS */
  const consumptionInformation = useMemo(getConsumptionInformation, [
    row,
    tableData,
  ]);

  return (
    <Tooltip
      title={
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center w-52">
            <span>Group {row.NTCGroupCode} Consumption</span>
          </div>
          <GroupGraph
            group="P"
            consumedDuration={consumptionInformation.parentDuration}
            consumedPercentage={100}
            graphColor="bg-gradient-to-r from-blue-900/10 via-[30%] to-blue-800"
          />
          <GroupGraph
            group={row.NTCGroupCode}
            consumedDuration={consumptionInformation.consumedDuration}
            consumedPercentage={consumptionInformation.consumedPercentage}
            graphColor={
              consumptionInformation.consumedPercentage > 100
                ? 'bg-gradient-to-r from-transparent via-[40%] to-red-600'
                : 'bg-gradient-to-r from-transparent via-[40%] to-green-600'
            }
          />
        </div>
      }
    >
      <div className="bg-gray-800 bg-opacity-80 rounded-full p-1">
        <BsInfoLg className="text-gray-200" />
      </div>
    </Tooltip>
  );
}

export default NTCGroupConsumptionIndicator;
