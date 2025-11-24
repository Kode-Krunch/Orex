import { Button, Dialog } from 'components/ui';
import React, { useContext } from 'react';
import SchedulerContext from 'views/Scheduling/Scheduler/context/SchedulerContext';
import { useDispatch, useSelector } from 'react-redux';
import { handleSaveSchedule } from '../utils/utils';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import { apiCallstoreprocedure } from 'services/CommonService';
import { convertDateToYMD } from 'components/validators';
import { operationTypesEnum } from 'views/Scheduling/Scheduler/enum';

function RefreshDurationDialog({ isOpen, setIsOpen }) {
  /* REDUX */
  const channel = useSelector((state) => state.locale.selectedChannel);
  const token = useSelector((state) => state.auth.session.token);
  const unsavedWork = useSelector((state) => state.auth.scheduling.unsavedWork);
  const dispatch = useDispatch();

  /* CONTEXT */
  const { date, setShowLoader, page, schedulingTableData, executeOperation } =
    useContext(SchedulerContext);

  /* EVENT HANDLERS */
  const handleRefresh = async () => {
    try {
      setShowLoader(true);
      const saveResult = await handleSaveSchedule({
        setShowLoader,
        page,
        schedulingTableData,
        channel,
        date,
        token,
        unsavedWork,
        dispatch,
        isAutoSave: true,
      });
      if (!saveResult) return;
      await apiCallstoreprocedure('USP_Sch_RefreshDuration', {
        LocationCode: channel.LocationCode,
        ChannelCode: channel.ChannelCode,
        TelecastDate: convertDateToYMD(date),
      });
      await executeOperation({
        operation: operationTypesEnum.INITIALIZE_SCHEDULER,
      });
      handleClose();
      openNotification('success', 'Durations refreshed successfully');
      setShowLoader(false);
    } catch (error) {
      openNotification(
        'danger',
        'Something went wrong while refreshing duration',
      );
    }
  };

  const handleClose = () => setIsOpen(false);

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} onRequestClose={handleClose}>
      <h5 className="mb-4">Refresh Duration</h5>
      <p className="text-gray-300">
        Your data is being saved. Log will reload with updated durations.
      </p>
      <div className="flex justify-between items-center mt-8">
        <p className="text-gray-300">
          Are you sure you want to refresh duration?
        </p>
        <Button variant="solid" onClick={handleRefresh}>
          Refresh
        </Button>
      </div>
    </Dialog>
  );
}

export default RefreshDurationDialog;
