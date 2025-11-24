import { Button, Dialog, Select } from 'components/ui';
import { convertDateToYMD } from 'components/validators';
import { format } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  apiGetRestoreCommercialScheduling,
  apiGetRestoreDropDown,
  apiGetRestoreScheduling,
  apiGetgetauditfinallogschedulingCom,
} from 'services/SchedulingService';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import SchedulerContext from 'views/Scheduling/Scheduler/context/SchedulerContext';
import { operationTypesEnum, pagesEnum } from 'views/Scheduling/Scheduler/enum';

const RestoreSavedWorkDialog = ({ isOpen, setIsOpen }) => {
  /* CONTEXT */
  const { page, date, setShowLoader, executeOperation } =
    useContext(SchedulerContext);

  /* REDUX */
  const channel = useSelector((state) => state.locale.selectedChannel);

  /* STATES */
  const [restoreSavedList, setRestoreSavedList] = useState([]);
  const [restoreSavedValue, setRestoreSavedValue] = useState({
    value: '',
    label: '',
  });

  /* USE EFFECTS */
  useEffect(() => {
    if (isOpen) loadVersionList(convertDateToYMD(date));
  }, [channel, isOpen]);

  /* HELPER FUNCTIONS */
  const getFormName = () => {
    try {
      if (page)
        return page === pagesEnum.PROMO
          ? 'PromoScheduling'
          : page === pagesEnum.SONG
          ? 'SongScheduling'
          : page === pagesEnum.NTC
          ? 'NTCScheduling'
          : 'TransmissionLog';
    } catch (error) {
      throw error;
    }
  };

  const loadVersionList = async (telecastDate) => {
    try {
      setShowLoader(true);
      let response;
      if (page === pagesEnum.COMMERCIAL) {
        response = await apiGetgetauditfinallogschedulingCom(
          channel,
          telecastDate,
        );
      } else {
        response = await apiGetRestoreDropDown({
          LocationCode: channel.LocationCode,
          ChannelCode: channel.ChannelCode,
          FormName: getFormName(),
          TelecastDate: telecastDate,
        });
      }
      if (response.status === 200) {
        const formattedOptions = response.data?.map((option) => ({
          value: option.D_date.substr(0, 23),
          label: format(new Date(option.D_date), 'dd-MMM-yyyy - HH:mm:ss'),
        }));
        setRestoreSavedList([...formattedOptions]);
      } else if (response.status === 204) {
        openNotification('info', 'Previous version not found.');
        setRestoreSavedList([]);
      }
      setShowLoader(false);
    } catch (errors) {
      openNotification(
        'danger',
        `Something went wrong while fetching previous versions`,
      );
      setShowLoader(false);
    }
  };

  /* EVENT HANDLERS */
  const handleRestoreClick = async () => {
    try {
      setShowLoader(true);
      let response;
      if (page === pagesEnum.COMMERCIAL) {
        response = await apiGetRestoreCommercialScheduling({
          LocationCode: channel.LocationCode,
          ChannelCode: channel.ChannelCode,
          ScheduleDate: convertDateToYMD(date),
          D_date: restoreSavedValue.value,
        });
      } else {
        response = await apiGetRestoreScheduling({
          LocationCode: channel.LocationCode,
          ChannelCode: channel.ChannelCode,
          FormName: getFormName(),
          TelecastDate: convertDateToYMD(date),
          D_date: restoreSavedValue.value,
        });
      }
      if (response.status === 200) {
        await executeOperation({
          operation: operationTypesEnum.INITIALIZE_SCHEDULER,
          isGenerateLog: false,
          mode: 'Edit',
        });
        openNotification('success', 'Restored previous version successfully.');
      } else if (response.status !== 204) {
        openNotification(
          'danger',
          `Something went wrong while restoring previous version. Server responded with status code ${response.status}`,
        );
      }
      handleClose();
      setShowLoader(false);
    } catch (errors) {
      openNotification(
        'danger',
        'Something went wrong while restoring previous version',
      );
      setShowLoader(false);
    }
  };

  const handleClose = () => {
    try {
      setRestoreSavedValue({
        value: '',
        label: '',
      });
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} onRequestClose={handleClose}>
      <h5 className="mb-4">Restore Previous Version</h5>
      <p className="text-white mb-1">
        Versions <span className="text-red-500">*</span>
      </p>
      <Select
        placeholder="Select"
        options={restoreSavedList}
        onChange={(e) => setRestoreSavedValue(e)}
        size="sm"
      ></Select>
      <div className="text-right mt-6">
        <Button
          variant="solid"
          disabled={!restoreSavedValue.value}
          onClick={handleRestoreClick}
        >
          Restore
        </Button>
      </div>
    </Dialog>
  );
};

export default RestoreSavedWorkDialog;
