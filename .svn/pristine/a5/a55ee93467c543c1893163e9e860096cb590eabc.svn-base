import classNames from 'classnames';
import { Tooltip } from 'components/ui';
import React from 'react';
import {
  rowDataTypesEnum,
  tableTypesEnum,
} from 'views/Scheduling/Scheduler/enum';
import NTCGroupConsumptionIndicator from './NTCGroupConsumptionIndicator';
import GroupwiseNtcConsumption from './GroupwiseNtcConsumption/GroupwiseNtcConsumption';
import { useSelector } from 'react-redux';
import { CLIENT } from 'views/Controls/clientListEnum';

function EventNameCell({ row, isRowCT, column, tableData, tableType }) {
  /* REDUX */
  const channel = useSelector((state) => state.locale.selectedChannel);

  /* CONSTANTS */
  const IS_ROW_NTC = row.F_C_S_P === rowDataTypesEnum.NTC;
  const IS_ROW_LIVE = row.F_C_S_P === rowDataTypesEnum.LIVE;
  const IS_CHANNEL_ANI_PLUS = channel.label === CLIENT.ANI_PLUS;
  const IS_CHANNEL_ASIANET = channel.label === CLIENT.ASIANET;
  const IS_CHANNEL_KINA_U = channel.label === CLIENT.KINA_U;

  const renderSchTableEventName = () => {
    return (
      <div className="py-0.5 px-2.5 w-full h-full flex items-center">
        <span
          className={classNames(
            'bg-gray-800 rounded-full h-[22px] w-[26px] mr-2 text-white flex justify-center items-center font-light',
            IS_ROW_NTC ? 'text-[9px] bg-orange-500' : 'text-[11px]',
            IS_ROW_LIVE ? 'bg-green-500 text-black !font-semibold' : '',
          )}
        >
          {IS_ROW_NTC ? row.NtcTypeName : row.F_C_S_P}
        </span>
        <span
          className={`w-full overflow-hidden whitespace-nowrap text-ellipsis text-[12px] ${isRowCT && 'mb-1'
            }`}
        >
          <span className={`${isRowCT && 'mr-2'}`}>
            {row[column.accessorKey]}
          </span>
          {isRowCT && (
            <span>
              [{row.FPC_Time} - {row.FPC_TimeTo}]
            </span>
          )}
        </span>
        {IS_ROW_NTC && (
          <NTCGroupConsumptionIndicator tableData={tableData} row={row} />
        )}
        {!IS_ROW_NTC &&
          tableData[row.rowIndex + 1]?.F_C_S_P === rowDataTypesEnum.NTC && (
            <GroupwiseNtcConsumption
              tableData={tableData}
              row={tableData[row.rowIndex + 1]}
            />
          )}
      </div>
    );
  };

  const renderSecTableEventName = () => {
    return row.F_C_S_P !== rowDataTypesEnum.CONTENT_TERMINATION && !IS_CHANNEL_ANI_PLUS && !IS_CHANNEL_ASIANET && !IS_CHANNEL_KINA_U ? (
      <Tooltip
        wrapperClass="py-0.5 px-2.5 w-full h-full flex items-center"
        placement="left"
        title={
          <div className="flex gap-4 justify-between items-center w-40 text-[0.7rem]">
            <span>Duration: {row.Duration}</span>
            <span>House ID: {row.HouseID ? row.HouseID : row.House_ID}</span>
          </div>
        }
      >
        {IS_ROW_NTC && (
          <span
            className={classNames(
              'rounded-full h-[22px] w-[26px] mr-2 text-white flex justify-center items-center font-light text-[9px] bg-orange-500',
            )}
          >
            {row.NtcTypeName}
          </span>
        )}
        <span className="w-full overflow-hidden whitespace-nowrap text-ellipsis text-[12px]">
          {row[column.accessorKey]}
        </span>
      </Tooltip>
    ) : (
      <div className="py-1 px-2.5 overflow-hidden text-ellipsis whitespace-nowrap text-[12px] w-full">
        {row[column.accessorKey]}
      </div>
    );
  };

  return (
    <>
      {tableType === tableTypesEnum.SCHEDULING
        ? renderSchTableEventName()
        : tableType === tableTypesEnum.SECONDARY && renderSecTableEventName()}
    </>
  );
}

export default EventNameCell;
