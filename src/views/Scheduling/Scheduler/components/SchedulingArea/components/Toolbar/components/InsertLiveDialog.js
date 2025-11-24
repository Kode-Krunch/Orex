import { Button, Dialog, Input } from 'components/ui';
import React, { useContext, useState } from 'react';
import {
  autoCompleteTime,
  getFormattedTime,
} from 'views/Controls/GLOBALFUNACTION';
import SelectXs from 'views/Controls/SelectXs/SelectXs';
import { LIVE_EVENT_OPTIONS } from 'views/Scheduling/Scheduler/constants';
import SchedulerContext from 'views/Scheduling/Scheduler/context/SchedulerContext';
import { operationTypesEnum } from 'views/Scheduling/Scheduler/enum';

/* CONSTANTS */
const dummyLiveRow = {
  SequenceNo: 1,
  Id: 0,
  FPC_ID: 1,
  CS_ID: 0,
  FPC_Time: null,
  FPC_TimeTo: null,
  Tel_Time: '00:00:00:00',
  ContentCode: '7161',
  TapeID: null,
  SeasonNo: '1',
  PartNumber: '0',
  EpisodeNo: '1',
  TC_IN: '00:00:00:00',
  TC_Out: '00:00:00:00',
  Seg: '',
  RODP_Category: '',
  Agency: '',
  Client: '',
  Brand: '',
  Product: '',
  BookingNumber: null,
  BookingDetailCode: null,
  BookingSeqNo: null,
  RowNo: '2',
  DealNo: null,
  DealLineItemNo: null,
  CommercialCode: '',
  BreakNumber: '0',
  F_C_S_P: 'L',
  EventDefaultFrontColor: '#000000',
  EventDefaultBackColor: '#86efac',
  TimeBandCode: null,
  KillDate: null,
  TxLogCode: '159709',
  TxTimeinSec: '0',
  SpotRate: 0,
  PrimaryID: 2,
  BookingDetailID: null,
  SpotStartTime: '',
  SpotEndTime: '',
  isFiltered: true,
  DefaultGAP: '00:00:00:00',
  Start_Time: '00:00:00:00',
  isHidden: false,
};

function InsertLiveDialog({ isOpen, setIsOpen }) {
  /* CONTEXT */
  const { leftClickedSchTableRow, executeOperation } =
    useContext(SchedulerContext);

  /* STATES */
  const [selectedLiveEvent, setSelectedLiveEvent] = useState(
    LIVE_EVENT_OPTIONS[0],
  );
  const [duration, setDuration] = useState('');

  /* EVENT HANDLERS */
  const onDialogClose = () => setIsOpen(false);

  const handleInsert = async () => {
    let liveRow = {
      ...dummyLiveRow,
      Event_Name: selectedLiveEvent.label,
      House_ID: selectedLiveEvent.label,
      Video_ID: selectedLiveEvent.label,
      Duration: duration,
    };
    await executeOperation({
      operation: operationTypesEnum.INSERT_LIVE_EVENT,
      liveRow,
    });
    onDialogClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <h5 className="mb-4">Insert Live</h5>
      <div className="mb-4">
        <p className="mb-1 text-white">Target Event</p>
        <Input
          value={leftClickedSchTableRow?.Event_Name}
          disabled={true}
          size="sm"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="mb-1 text-white">
            Live Event <span className="text-red-500">*</span>
          </p>
          <SelectXs
            placeholder="Live Event"
            value={selectedLiveEvent}
            options={LIVE_EVENT_OPTIONS}
            onChange={setSelectedLiveEvent}
          />
        </div>
        <div>
          <p className="mb-1 text-white">
            Duration <span className="text-red-500">*</span>
          </p>
          <Input
            size="sm"
            value={duration}
            onChange={(event) => setDuration(getFormattedTime(event, duration))}
            onBlur={() => setDuration(autoCompleteTime(duration))}
            placeholder="HH:MM:SS:FF"
          />
          {duration.length > 0 && duration.length < 11 && (
            <p className="text-xs font-semibold mt-1">HH:MM:SS:FF</p>
          )}
        </div>
      </div>
      <div className="text-right mt-6">
        <Button
          variant="solid"
          onClick={handleInsert}
          disabled={duration.length < 11}
        >
          Insert
        </Button>
      </div>
    </Dialog>
  );
}

export default InsertLiveDialog;
