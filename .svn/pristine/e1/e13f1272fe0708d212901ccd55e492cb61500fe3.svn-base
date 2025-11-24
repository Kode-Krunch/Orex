import React, { useMemo } from 'react';
import {
  getGroupedRows,
  getPercentage,
  timeToSeconds,
} from 'views/Controls/GLOBALFUNACTION';
import { addTimes } from '../../../../Summary/utils';
import { Tooltip } from 'components/ui';
import {
  getNTCParentRow,
  getRowWithNTC,
} from 'views/Scheduling/Scheduler/context/utils';
import GroupGraph from './Group';
import { BsInfoLg } from 'react-icons/bs';

function GroupwiseNtcConsumption({ tableData, row }) {
  /* HELPER FUNCTIONS */
  const getConsumptionInformation = () => {
    const ntcParentRow = getNTCParentRow(row.rowIndex + 1, tableData);
    const ntcParentNTCRows = getRowWithNTC([ntcParentRow], tableData, false);
    const groupedNTCs = getGroupedRows(ntcParentNTCRows, 'NTCGroupCode');
    let parentDuration = ntcParentRow.Duration;
    let groupwiseNtcConsumption = {};
    Object.keys(groupedNTCs).forEach((groupCode) => {
      const curGroupNTCs = groupedNTCs[groupCode];
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
      groupwiseNtcConsumption[groupCode] = {
        consumedDuration,
        consumedPercentage,
      };
    });
    return {
      parentDuration,
      groupwiseNtcConsumption,
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
            <span>NTC Groupwise Consumption</span>
          </div>
          <GroupGraph
            group="P"
            consumedDuration={consumptionInformation.parentDuration}
            consumedPercentage={100}
            graphColor="bg-gradient-to-r from-blue-900/10 via-[30%] to-blue-800"
          />
          {Object.keys(consumptionInformation.groupwiseNtcConsumption).map(
            (groupCode) => {
              const curGroupConsumptionInfo =
                consumptionInformation.groupwiseNtcConsumption[groupCode];
              return (
                <GroupGraph
                  group={groupCode}
                  consumedDuration={curGroupConsumptionInfo.consumedDuration}
                  consumedPercentage={
                    curGroupConsumptionInfo.consumedPercentage
                  }
                  graphColor={
                    curGroupConsumptionInfo.consumedPercentage > 100
                      ? 'bg-gradient-to-r from-transparent via-[40%] to-red-600'
                      : 'bg-gradient-to-r from-transparent via-[40%] to-green-600'
                  }
                />
              );
            },
          )}
        </div>
      }
    >
      <div className="bg-gray-800 bg-opacity-80 rounded-full p-1">
        <BsInfoLg className="text-gray-200" />
      </div>
    </Tooltip>
  );
}

export default GroupwiseNtcConsumption;
