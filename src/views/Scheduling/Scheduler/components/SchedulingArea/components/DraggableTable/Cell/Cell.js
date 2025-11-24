import React, { lazy, Suspense, useContext, useState } from 'react';
import { getBgColor, getBorderColor, getFontColor } from '../utils';
import { ROW_ID_KEY } from 'views/Scheduling/Scheduler/constants';
import DraggableTableContext from '../context/DraggableTableContext';
import {
  rowDataTypesEnum,
  tableTypesEnum,
} from 'views/Scheduling/Scheduler/enum';
import SchedulerContext from 'views/Scheduling/Scheduler/context/SchedulerContext';
import Loader from 'views/Controls/Loader';

/* CODE SPLITTING */
const ChangeProgramDialog = lazy(() =>
  import(
    '../../ChangeProgram/components/ChangeProgramDialog/ChangeProgramDialog'
  ),
);
const CTConsumptionIndicator = lazy(() =>
  import('./components/CTConsumptionIndicator'),
);
const FPCTimeCell = lazy(() => import('./components/FPCTimeCell'));
const EventNameCell = lazy(() => import('./components/EventNameCell'));

function Cell({ row, selectedRows, setSelectedRows }) {
  /* CONTEXT */
  const { tableType, tableData, columns } = useContext(DraggableTableContext);
  const { leftClickedSchTableRow, leftClickedSecTableRow } =
    useContext(SchedulerContext);

  /* STATES */
  const [isChangeProgramDialogOpen, setIsChangeProgramDialogOpen] =
    useState(false);
  const [clickedProgram, setClickedProgram] = useState(null);

  /* CONSTANTS */
  const IS_ROW_CT = row.F_C_S_P === rowDataTypesEnum.CONTENT_TERMINATION;

  return (
    <Suspense fallback={<Loader showLoader={true} />}>
      {columns.map((column) => (
        <div
          className="border-b border-r flex-none flex flex-col justify-start transition-all relative group-hover:!opacity-80"
          style={{
            width: `${column.style.width}%`,
            textAlign: column.accessorKey !== 'Event_Name' && 'center',
            backgroundColor: getBgColor(
              tableType,
              leftClickedSchTableRow,
              leftClickedSecTableRow,
              selectedRows,
              row,
              column,
            ),
            color: getFontColor(
              tableType,
              leftClickedSchTableRow,
              leftClickedSecTableRow,
              selectedRows,
              row,
              column,
            ),
            borderColor: getBorderColor(selectedRows, row),
          }}
          key={`${row[ROW_ID_KEY]}-${column.accessorKey}`}
        >
          {column.accessorKey === 'FPC_Time' ? (
            <FPCTimeCell
              row={row}
              column={column}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              setIsChangeProgramDialogOpen={setIsChangeProgramDialogOpen}
              setClickedProgram={setClickedProgram}
              tableType={tableType}
            />
          ) : column.accessorKey === 'Event_Name' ? (
            <EventNameCell
              row={row}
              isRowCT={IS_ROW_CT}
              column={column}
              tableData={tableData}
              tableType={tableType}
            />
          ) : (
            <div className="py-1 px-2.5 overflow-hidden text-ellipsis whitespace-nowrap text-[12px] w-full">
              {row[column.accessorKey]}
            </div>
          )}
          {tableType === tableTypesEnum.SCHEDULING &&
            column.accessorKey === 'Event_Name' && (
              <>
                {IS_ROW_CT && (
                  <CTConsumptionIndicator tableData={tableData} row={row} />
                )}
              </>
            )}
        </div>
      ))}
      {isChangeProgramDialogOpen && (
        <ChangeProgramDialog
          isOpen={isChangeProgramDialogOpen}
          setIsOpen={setIsChangeProgramDialogOpen}
          clickedProgram={clickedProgram}
          setClickedProgram={setClickedProgram}
        />
      )}
    </Suspense>
  );
}

export default Cell;
