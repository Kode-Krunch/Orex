import { Button, Checkbox, Dialog, Input, Radio } from 'components/ui';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CLIENT } from 'views/Controls/clientListEnum';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import SchedulerContext from 'views/Scheduling/Scheduler/context/SchedulerContext';
import {
  bulkInsertPositionEnum,
  ntcDescriptionTypesEnum,
  ntcDurationTypesEnum,
  operationTypesEnum,
  rowDataTypesEnum,
  secondaryTableTypesEnum,
} from 'views/Scheduling/Scheduler/enum';
import Description from './components/Description';
import InsertPosition from './components/InsertPosition';
import StartEndTime from './components/StartEndTime';
import Breaks from './components/Breaks';
import Events from './components/Events';
import { getBreaks } from '../../utils';
import Duration from './components/Duration';
import OffsetStartTime from './components/OffsetStartTime';
import appConfig from 'configs/app.config';
import ChoosePrograms from './components/ChoosePrograms';

function BulkInsertDialog({ isDialogOpen, setIsDialogOpen, insertType }) {
  /* REDUX */
  const channel = useSelector((state) => state.locale.selectedChannel);

  /* CONTEXT */
  const {
    schedulingTableData,
    secondaryTableSelectedRows,
    secondaryTableType,
    executeOperation,
    setShowLoader,
  } = useContext(SchedulerContext);

  /* STATES */
  const [bulkInsertType, setBulkInsertType] = useState('advanced');
  const [exactMatchString, setExactMatchString] = useState('');
  const [selProgramsFpcId, setSelProgramsFpcId] = useState([]);
  const [selectedBreaks, setSelectedBreaks] = useState([]);
  const [isSkipLastBreak, setIsSkipLastBreak] = useState(false);
  const [isOnlyLastBreak, setIsOnlyLastBreak] = useState(false);
  const [time, setTime] = useState({
    start: new Date(new Date().setHours(0, 0, 0, 0)),
    end: new Date(new Date().setHours(23, 59, 0, 0)),
  });
  const [insertPosition, setInsertPosition] = useState(
    bulkInsertPositionEnum.START,
  );
  const [isRandomizeIns, setIsRandomizeIns] = useState(false);
  const [isRepeatRandomIns, setIsRepeatRandomIns] = useState(true);
  const [insCountPerSeg, setInsCountPerSeg] = useState(
    secondaryTableSelectedRows.length,
  );
  const [isSkipInsInSameProg, setIsSkipInsInSameProg] = useState(false);
  const [descriptionType, setDescriptionType] = useState(
    ntcDescriptionTypesEnum.ORIGINAL,
  );
  const [description, setDescription] = useState('');
  const [durationType, setDurationType] = useState(
    ntcDurationTypesEnum.ORIGINAL,
  );
  const [duration, setDuration] = useState('');
  const [bulkNTCInsOffsetTime, setBulkNTCInsOffsetTime] =
    useState('00:00:00:00');

  /* USE EFFECTS */
  useEffect(() => {
    if (isDialogOpen) {
      if (channel && channel.label === CLIENT.USA_Forbes)
        setSelectedBreaks(
          getBreaks(schedulingTableData).map((breakNum) => breakNum.value),
        );
      if (
        secondaryTableSelectedRows.length > 0 &&
        insertType === rowDataTypesEnum.NTC
      ) {
        setBulkNTCInsOffsetTime(secondaryTableSelectedRows[0].OffsetStartTime);
      }
    }
  }, [channel, isDialogOpen, secondaryTableSelectedRows]);

  /* EVENT HANDLERS */
  const handleClose = () => {
    try {
      setSelectedBreaks([]);
      setTime({ start: null, end: null });
      setInsertPosition(bulkInsertPositionEnum.START);
      setDescriptionType(ntcDescriptionTypesEnum.ORIGINAL);
      setDescription('');
      setDurationType(ntcDurationTypesEnum.ORIGINAL);
      setDuration('');
      setBulkNTCInsOffsetTime('00:00:00:00');
      setIsDialogOpen(false);
    } catch (error) {
      openNotification('danger', 'Something went wrong');
      console.error(error);
    }
  };

  const handleBulkInsert = async () => {
    try {
      setShowLoader(true);
      let result;
      if (bulkInsertType === 'belowExactMatch')
        result = await executeOperation({
          operation: operationTypesEnum.BULK_INSERT_BELOW_EXACT_MATCH,
          time,
          bulkInsertExactMatchString: exactMatchString,
          selProgramsFpcId,
        });
      else
        executeOperation({
          operation: operationTypesEnum.BULK_INSERT_ROW,
          insertPosition,
          time,
          selectedBreaks,
          isSkipLastBreak,
          isOnlyLastBreak,
          isRandomizeIns,
          isRepeatRandomIns,
          insCountPerSeg,
          isSkipInsInSameProg,
          descriptionType,
          bulkNTCInsDesc: description,
          durationType,
          bulkNTCInsDuration: duration,
          bulkNTCInsOffsetTime,
          selProgramsFpcId,
        });
      if (result) openNotification('success', 'Events inserted successfully');
      handleClose();
    } catch (error) {
      openNotification('danger', 'Something went wrong while inserting events');
      console.error(error);
    } finally {
      setShowLoader(false);
    }
  };

  const isInsertBtnDisabled = () => {
    if (bulkInsertType === 'belowExactMatch') {
      return !time.start || !time.end || !exactMatchString;
    } else {
      return (
        (selectedBreaks.length === 0 && !isOnlyLastBreak) ||
        !time.start ||
        !time.end ||
        !insertPosition ||
        (durationType === ntcDurationTypesEnum.CUSTOM &&
          duration.length !== 11) ||
        bulkNTCInsOffsetTime.length !== 11
      );
    }
  };

  /* CONSTANTS */
  const isChannelForbes = channel.label === CLIENT.USA_Forbes;

  return (
    <Dialog
      isOpen={isDialogOpen}
      onClose={handleClose}
      width={'70%'}
      contentClassName={'mt-8'}
    >
      <div className="flex flex-col h-full">
        <h4 className="border-b border-b-gray-700 pb-2 mb-3">Bulk Insert</h4>
        <div className="flex">
          <ChoosePrograms setSelProgramsFpcId={setSelProgramsFpcId} />
          <div className="w-1/2 min-h-[60vh] max-h-[65vh] overflow-y-auto flex flex-col gap-6 pr-2 text-white pl-2">
            {secondaryTableType === secondaryTableTypesEnum.NTC && (
              <div>
                <p className="text-sm mb-2">Insert Type</p>
                <Radio.Group
                  value={bulkInsertType}
                  onChange={setBulkInsertType}
                >
                  <Radio value={'advanced'} className="text-gray-300">
                    Advanced
                  </Radio>
                  <Radio value={'belowExactMatch'} className="text-gray-300">
                    Below Exact Match
                  </Radio>
                </Radio.Group>
              </div>
            )}
            {bulkInsertType === 'belowExactMatch' ? (
              <>
                <Events />
                <StartEndTime time={time} setTime={setTime} />
                <div className="w-full">
                  <p className="text-white text-sm mb-1">Exact Match</p>
                  <Input
                    size="sm"
                    placeholder="Enter exact match"
                    value={exactMatchString}
                    onChange={(event) =>
                      setExactMatchString(event.target.value)
                    }
                  />
                </div>
              </>
            ) : (
              <>
                <Events />
                {!isChannelForbes && (
                  <Breaks
                    selectedBreaks={selectedBreaks}
                    setSelectedBreaks={setSelectedBreaks}
                    isSkipLastBreak={isSkipLastBreak}
                    setIsSkipLastBreak={setIsSkipLastBreak}
                    isOnlyLastBreak={isOnlyLastBreak}
                    setIsOnlyLastBreak={setIsOnlyLastBreak}
                  />
                )}
                <StartEndTime time={time} setTime={setTime} />
                {secondaryTableSelectedRows.length > 0 && (
                  <>
                    {insertType === rowDataTypesEnum.NTC && (
                      <>
                        <Description
                          descriptionType={descriptionType}
                          setDescriptionType={setDescriptionType}
                          description={description}
                          setDescription={setDescription}
                        />
                        <Duration
                          durationType={durationType}
                          setDurationType={setDurationType}
                          duration={duration}
                          setDuration={setDuration}
                        />
                        <OffsetStartTime
                          offsetStartTime={bulkNTCInsOffsetTime}
                          setOffsetStartTime={setBulkNTCInsOffsetTime}
                        />
                      </>
                    )}
                  </>
                )}
                {!isChannelForbes && (
                  <div
                    className={`grid ${
                      isRandomizeIns ? 'grid-cols-3' : 'grid-cols-2'
                    } gap-4 items-center`}
                  >
                    <InsertPosition
                      insertPosition={insertPosition}
                      setInsertPosition={setInsertPosition}
                    />
                    {(secondaryTableType === secondaryTableTypesEnum.PROMO ||
                      secondaryTableType === secondaryTableTypesEnum.SONG) && (
                      <>
                        <Checkbox
                          checked={isRandomizeIns}
                          onChange={(value) => {
                            setIsRandomizeIns(value);
                            setInsCountPerSeg(
                              secondaryTableSelectedRows.length,
                            );
                          }}
                          className="text-gray-300"
                        >
                          Randomize Insert
                        </Checkbox>
                        {isRandomizeIns && (
                          <>
                            <Checkbox
                              checked={isRepeatRandomIns}
                              onChange={setIsRepeatRandomIns}
                              className="text-gray-300"
                            >
                              Repeat Insert
                            </Checkbox>
                            {!isRepeatRandomIns && (
                              <div className="w-full">
                                <p className="text-white text-sm mb-1">
                                  Insert Count
                                </p>
                                <Input
                                  size="sm"
                                  value={insCountPerSeg}
                                  onChange={(event) =>
                                    appConfig.validation.numericRegex.test(
                                      event.target.value,
                                    ) &&
                                    Number(event.target.value) <=
                                      secondaryTableSelectedRows.length &&
                                    setInsCountPerSeg(
                                      Number(event.target.value),
                                    )
                                  }
                                />
                              </div>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                )}
                <Checkbox
                  checked={isSkipInsInSameProg}
                  onChange={setIsSkipInsInSameProg}
                  className="text-gray-300"
                >
                  Skip insert in same program
                </Checkbox>
              </>
            )}
          </div>
        </div>
        <div className="text-right mt-6">
          <Button
            variant="solid"
            disabled={isInsertBtnDisabled()}
            onClick={handleBulkInsert}
          >
            Insert
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default BulkInsertDialog;
