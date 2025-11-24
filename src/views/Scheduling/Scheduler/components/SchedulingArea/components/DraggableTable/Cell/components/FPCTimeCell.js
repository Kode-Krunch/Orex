import React, { useContext } from 'react';
import SchedulerContext from 'views/Scheduling/Scheduler/context/SchedulerContext';
import {
  featuresEnum,
  rowDataTypesEnum,
  tableTypesEnum,
} from 'views/Scheduling/Scheduler/enum';
import Action from './Action';
import { Tooltip } from 'components/ui';
import { TbStatusChange } from 'react-icons/tb';
import { ROW_ACTIONS } from 'views/Scheduling/Scheduler/constants';

function FPCTimeCell({
  row,
  column,
  selectedRows,
  setSelectedRows,
  setIsChangeProgramDialogOpen,
  setClickedProgram,
  tableType,
}) {
  /* CONTEXT */
  const { activeFeatures, isScheduleAllowedToEdit } =
    useContext(SchedulerContext);

  return (
    <>
      {tableType === tableTypesEnum.SCHEDULING &&
      !activeFeatures[featuresEnum.ROTATION_INFO] &&
      !activeFeatures[featuresEnum.ROTATION_INFO_WITH_MANAGE_COLUMNS] &&
      isScheduleAllowedToEdit ? (
        <>
          {!activeFeatures[featuresEnum.CHANGE_PROGRAM] &&
            !activeFeatures[featuresEnum.MANAGE_SEGMENT] && (
              <>
                {row.actions ? (
                  <div
                    className={`group-hover:flex w-full h-full flex items-center gap-[1%] justify-${
                      column.accessorKey !== 'Event_Name' && 'center'
                    } ${
                      selectedRows.length > 0 &&
                      selectedRows.map((row) => row.rowId).includes(row.rowId)
                        ? `flex`
                        : 'hidden'
                    }`}
                  >
                    {row.actions.map((action) => (
                      <Action
                        action={action}
                        row={row}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        key={action.id}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="py-1 px-2.5 overflow-hidden text-ellipsis whitespace-nowrap text-[12px] w-full">
                    {row[column.accessorKey]}
                  </div>
                )}
              </>
            )}
          {activeFeatures[featuresEnum.CHANGE_PROGRAM] &&
            row.F_C_S_P === rowDataTypesEnum.CONTENT_TERMINATION && (
              <div
                className="py-1 px-2.5 overflow-hidden text-ellipsis whitespace-nowrap text-[12px] w-full flex items-center justify-center gap-[0.2rem]"
                onClick={(event) => {
                  event.stopPropagation();
                  setIsChangeProgramDialogOpen(true);
                  setClickedProgram(row);
                }}
              >
                {row[column.accessorKey]}
                <Tooltip
                  title="Replace Program"
                  wrapperClass="hover:cursor-pointer"
                >
                  <div className="bg-gray-800 bg-opacity-80 rounded-full p-1 flex items-center justify-center">
                    <TbStatusChange className="text-gray-200 text-[1rem] -scale-x-100" />
                  </div>
                </Tooltip>
              </div>
            )}
          {activeFeatures[featuresEnum.MANAGE_SEGMENT] && (
            <div className="py-1 px-2.5 overflow-hidden text-ellipsis whitespace-nowrap text-[12px] w-full flex items-center justify-center gap-[0.2rem]">
              {row.F_C_S_P === rowDataTypesEnum.SEGMENT && (
                <Action
                  action={ROW_ACTIONS.REMOVE_ROWS}
                  row={row}
                  selectedRows={selectedRows}
                  setSelectedRows={setSelectedRows}
                  key={ROW_ACTIONS.REMOVE_ROWS.id}
                />
              )}
              {row.F_C_S_P === rowDataTypesEnum.CONTENT_TERMINATION && (
                <>
                  {row[column.accessorKey]}
                  {row.rowIndex !== 1 && (
                    <Action
                      action={ROW_ACTIONS.REMOVE_ROWS}
                      row={row}
                      selectedRows={selectedRows}
                      setSelectedRows={setSelectedRows}
                      key={ROW_ACTIONS.REMOVE_ROWS}
                    />
                  )}
                </>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="py-1 px-2.5 overflow-hidden text-ellipsis whitespace-nowrap text-[12px] w-full">
          {row[column.accessorKey]}
        </div>
      )}
    </>
  );
}

export default FPCTimeCell;
