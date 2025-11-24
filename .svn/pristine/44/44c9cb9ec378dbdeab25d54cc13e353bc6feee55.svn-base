import React, { lazy, Suspense, useContext, useState } from 'react';
import SchedulerContext from 'views/Scheduling/Scheduler/context/SchedulerContext';
import { Tooltip } from 'components/ui';
import { rowDataTypesEnum } from 'views/Scheduling/Scheduler/enum';
import { EDIT_ROW_INFO } from 'views/Scheduling/Scheduler/constants';
import Loader from 'views/Controls/Loader';
import EditNTCDialog from './EditRowDialogs/EditNTCDialog';
import EditLiveDialog from './EditRowDialogs/EditLiveDialog';

/* CODE SPLITTING */
const RemoveRowsDialog = lazy(() => import('./RemoveRowsDialog'));

function Action({ action, row, selectedRows, setSelectedRows }) {
  /* CONTEXT */
  const {
    executeOperation,
    activeFeatures,
    setActiveFeatures,
    schedulingTableData,
    setSchedulingTableSelectedRows,
    maintainScrolledOffsetOfTables,
    secondaryAreaZindexRef,
  } = useContext(SchedulerContext);

  /* STATES */
  const [isRemoveRowsDialogOpen, setIsRemoveRowsDialogOpen] = useState(false);
  const [isEditRowDialogOpen, setIsEditRowDialogOpen] = useState(false);

  return (
    <Suspense fallback={<Loader showLoader={true} />}>
      <Tooltip title={action.tooltip} wrapperClass="hover:cursor-pointer">
        <div
          className="bg-gray-800 bg-opacity-80 rounded-full p-1"
          onClick={(event) => {
            event.stopPropagation();
            if (event.ctrlKey || event.metaKey) return;
            action.actionHandler({
              rows:
                action.id === 'rotationInfo' || selectedRows.length === 0
                  ? [row]
                  : selectedRows,
              executeOperation,
              activeFeatures,
              setActiveFeatures,
              setIsRemoveRowsDialogOpen,
              setSchedulingTableSelectedRows,
              maintainScrolledOffsetOfTables,
              setIsEditingRowDialogOpen: setIsEditRowDialogOpen,
              tableData: schedulingTableData,
              secondaryAreaZindexRef,
            });
          }}
        >
          {action.icon}
        </div>
      </Tooltip>
      {isRemoveRowsDialogOpen && (
        <RemoveRowsDialog
          isDialogOpen={isRemoveRowsDialogOpen}
          setIsDialogOpen={setIsRemoveRowsDialogOpen}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
        />
      )}
      {isEditRowDialogOpen && (
        <>
          {row.F_C_S_P === rowDataTypesEnum.NTC && (
            <EditNTCDialog
              isDialogOpen={isEditRowDialogOpen}
              setIsDialogOpen={setIsEditRowDialogOpen}
              row={row}
              editRowInfo={EDIT_ROW_INFO[row.F_C_S_P]}
            />
          )}
          {row.F_C_S_P === rowDataTypesEnum.LIVE && (
            <EditLiveDialog
              isDialogOpen={isEditRowDialogOpen}
              setIsDialogOpen={setIsEditRowDialogOpen}
              row={row}
            />
          )}
        </>
      )}
    </Suspense>
  );
}

export default Action;
