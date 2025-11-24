import { Button, Dialog } from 'components/ui';
import React, { useContext, useEffect, useState } from 'react';
import ProgramSummary from './ProgramSummary';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import SchedulerContext from 'views/Scheduling/Scheduler/context/SchedulerContext';
import {
  operationTypesEnum,
  rowDataTypesEnum,
} from 'views/Scheduling/Scheduler/enum';
import { getProgramSchedule } from '../../../../utils/utils';

function ChangeProgramDialog({
  isOpen,
  setIsOpen,
  clickedProgram,
  setClickedProgram,
}) {
  /* CONTEXT */
  const { schedulingTableData, secondaryTableData, executeOperation } =
    useContext(SchedulerContext);

  /* STATES */
  const [clickedProgramSchedule, setClickedProgramSchedule] = useState([]);
  const [newProgramSchedule, setNewProgramSchedule] = useState([]);

  /* USE EFFECTS */
  useEffect(() => {
    try {
      if (
        isOpen &&
        clickedProgram &&
        schedulingTableData &&
        secondaryTableData
      ) {
        setClickedProgramSchedule(
          getProgramSchedule(schedulingTableData, clickedProgram),
        );
        setNewProgramSchedule(
          getProgramSchedule(
            secondaryTableData,
            secondaryTableData.filter(
              (row) =>
                row.F_C_S_P === rowDataTypesEnum.CONTENT_TERMINATION &&
                row.FPC_Time === clickedProgram.FPC_Time,
            )[0],
          ),
        );
      }
    } catch (error) {
      openNotification(
        'danger',
        'Something went wrong while fetching program info',
      );
    }
  }, [isOpen, clickedProgram, schedulingTableData, secondaryTableData]);

  /* EVENT HANDLERS */
  const handleReplace = () => {
    try {
      executeOperation({
        operation: operationTypesEnum.REPLACE_PROGRAM,
        clickedProgram,
        clickedProgramSchedule,
        newProgramSchedule,
      });
      handleClose();
      openNotification('success', 'Programs replaced successfully');
    } catch (error) {
      openNotification(
        'danger',
        'Something went wrong while replacing the program',
      );
      console.error(error);
    }
  };

  const handleClose = () => {
    setClickedProgram(null);
    setIsOpen(false);
  };

  return (
    <Dialog
      isOpen={isOpen}
      width={'60%'}
      onClose={handleClose}
      onRequestClose={handleClose}
      contentClassName="!my-8"
    >
      <div className="flex flex-col h-full justify-between">
        <h5 className="mb-4 pb-2 border-b border-b-gray-700">
          Replace Program
        </h5>
        <div className="flex">
          <div className="w-1/2 border-r border-r-gray-700 pr-3">
            <ProgramSummary
              programData={clickedProgramSchedule}
              type="existingProgram"
            />
          </div>
          <div className="w-1/2 pl-3 h-full">
            <ProgramSummary
              programData={newProgramSchedule}
              type="newProgram"
            />
          </div>
        </div>
        <div className="text-right mt-6">
          <Button
            variant="solid"
            onClick={handleReplace}
            disabled={
              clickedProgramSchedule.length === 0 ||
              newProgramSchedule.length === 0
            }
          >
            Replace
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default ChangeProgramDialog;
