import { Button, DatePicker, Dialog } from 'components/ui';
import { convertDateToDMY, convertDateToYMD } from 'components/validators';
import React, { useContext, useState } from 'react';
import { HiOutlineCalendar } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { apiCallstoreprocedure } from 'services/CommonService';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import WarningDialog from 'views/Controls/WarningDialog';
import SchedulerContext from 'views/Scheduling/Scheduler/context/SchedulerContext';
import { operationTypesEnum } from 'views/Scheduling/Scheduler/enum';

function ImportSequenceDialog({ isOpen, setIsOpen }) {
  /* REDUX */
  const channel = useSelector((state) => state.locale.selectedChannel);
  const dateForm = useSelector((state) => state.locale.dateForm);

  /* CONTEXT */
  const { executeOperation, setShowLoader, date } =
    useContext(SchedulerContext);

  /* STATES */
  const [selectedDate, setSelectedDate] = useState(null);
  const [isWarningDialogOpen, setIsWarningDialogOpen] = useState(false);

  /* EVENT HANDLERS */
  const handleImportDateSequence = async () => {
    try {
      setShowLoader(true);
      const resp = await apiCallstoreprocedure('Spot_Replicate', {
        ChannelCode: channel.ChannelCode,
        scheduledate_From: convertDateToYMD(selectedDate),
        scheduledate_To: convertDateToYMD(new Date(dateForm[0])),
      });
      if (resp.status == 200) {
        try {
          await executeOperation({
            operation: operationTypesEnum.INITIALIZE_SCHEDULER,
            isFirstLoad: true,
          });
          openNotification('success', 'Sequence imported successfully.');
        } catch (error) {
          openNotification(
            'danger',
            'Sequence imported successfully but something went wrong while initializing scheduler',
          );
        }
      }
    } catch (error) {
      openNotification(
        'danger',
        'Something went wrong while importing sequence',
      );
    } finally {
      setSelectedDate(null);
      setIsWarningDialogOpen(false);
      setIsOpen(false);
      setShowLoader(false);
    }
  };

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Dialog
        isOpen={isOpen}
        onClose={handleClose}
        onRequestClose={handleClose}
      >
        <h5 className="mb-4">Import Sequence</h5>
        <div>
          <p className="mb-1 text-white">
            Date <span className="text-red-500">*</span>
          </p>
          <DatePicker
            inputPrefix={<HiOutlineCalendar className="text-lg" />}
            inputSuffix={null}
            size="sm"
            placeholder="Select"
            maxDate={new Date(new Date(date).setDate(date.getDate() - 1))}
            onChange={(date) => setSelectedDate(date)}
          />
        </div>
        <div className="text-right mt-6">
          <Button
            variant="solid"
            disabled={!selectedDate}
            onClick={() => setIsWarningDialogOpen(true)}
          >
            Import
          </Button>
        </div>
      </Dialog>
      <WarningDialog
        isDialogOpen={isWarningDialogOpen}
        title="Import Sequence"
        description={
          <>
            Are you sure you want to import sequence for{' '}
            <strong className="text-gray-200">
              {convertDateToDMY(selectedDate)}
            </strong>
            ?
          </>
        }
        submitButtonTitle="Import"
        handleDialogSubmit={handleImportDateSequence}
        handleDialogClose={() => setIsWarningDialogOpen(false)}
      />
    </>
  );
}

export default ImportSequenceDialog;
