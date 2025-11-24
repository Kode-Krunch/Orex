import React, { useContext, useEffect, useState } from 'react';
import SelectableTable from 'views/Controls/SelectableTable';
import { getAllProgramsInTable } from 'views/Scheduling/Scheduler/components/SchedulingArea/utils/utils';
import SchedulerContext from 'views/Scheduling/Scheduler/context/SchedulerContext';

/* CONSTANTS */
const columns = [
  { header: 'FPC Time', accessorKey: 'FPC_Time' },
  { header: 'Program', accessorKey: 'Event_Name' },
];

function ChoosePrograms({ setSelProgramsFpcId }) {
  /* CONTEXT */
  const { schedulingTableData } = useContext(SchedulerContext);

  /* STATES */
  const [rowSelection, setRowSelection] = useState(
    schedulingTableData.slice(1).map((row, index) => ({ [index]: true })),
  );

  /* CONSTANTS */
  const PROGRAMS = getAllProgramsInTable(schedulingTableData);

  /* USE EFFECTS */
  useEffect(() => {
    const selRowIndexes = Object.keys(rowSelection);
    setSelProgramsFpcId(
      PROGRAMS.filter((program, index) =>
        selRowIndexes.includes(`${index}`),
      ).map((program) => program.FPC_ID),
    );
  }, [rowSelection]);

  return (
    <div className="min-h-[60vh] max-h-[65vh] w-1/2 flex flex-col pr-2 border-r border-r-gray-700">
      <p className="text-sm mb-1 text-white">
        Choose Programs ({PROGRAMS.length})
      </p>
      <div className="grow overflow-y-scroll bg-gray-700 bg-opacity-40">
        <SelectableTable
          tableData={PROGRAMS}
          columns={columns}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
        />
      </div>
    </div>
  );
}

export default ChoosePrograms;
