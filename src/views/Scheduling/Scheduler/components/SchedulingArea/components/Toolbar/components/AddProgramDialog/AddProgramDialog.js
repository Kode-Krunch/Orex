import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button, Dialog, TimeInput } from 'components/ui';
import SelectXs from 'views/Controls/SelectXs/SelectXs';
import AsyncSelect from 'react-select/async';
import {
  getSelectorOptionsFromApiFunction,
  hideCursorLoader,
  openNotification,
  showCursorLoader,
} from 'views/Controls/GLOBALFUNACTION';
import { useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import CustomField from 'views/Controls/CustomField';
import Segments from './Segments';
import SchedulerContext from 'views/Scheduling/Scheduler/context/SchedulerContext';
import { apiCallstoreprocedure } from 'services/CommonService';
import { convertDateToYMD } from 'components/validators';
import { MdOutlineAddCircle } from 'react-icons/md';
import { format } from 'date-fns';
import { operationTypesEnum } from 'views/Scheduling/Scheduler/enum';
import { useDebounce } from 'use-debounce';

function AddProgramDialog({ isOpen, setIsOpen }) {
  /* REDUX */
  const channel = useSelector((state) => state.locale.selectedChannel);
  const loginId = useSelector((state) => state.auth.session.LoginId);

  /* CONTEXT */
  const { date, schedulingTableData, executeOperation } =
    useContext(SchedulerContext);

  /* STATES */
  const [startTime, setStartTime] = useState('');
  const [program, setProgram] = useState(null);
  const [season, setSeason] = useState(null);
  const [episode, setEpisode] = useState(null);
  const [seasonOptions, setSeasonOptions] = useState([]);
  const [episodeOptions, setEpisodeOptions] = useState({});
  const [segments, setSegments] = useState([]);
  const [isFpcStartTimePresent, setIsFpcStartTimePresent] = useState(false);

  /* HOOKS */
  const [debouncedStartTime] = useDebounce(startTime, 300);
  const debouncedLoadProgOptions = useCallback(
    debounce((inputValue, callback) => {
      getSelectorOptionsFromApiFunction(
        () =>
          apiCallstoreprocedure('usp_pg_fpc_get_content', {
            ContentTypeCode: 0,
            LocationCode: channel.LocationCode,
            ChannelCode: channel.ChannelCode,
            FPCDate: convertDateToYMD(date),
            ContentName: `%${inputValue}%`,
          }),
        'ContentName',
        'ContentCode',
        'No programs found',
        'Something went wrong while fetching programs',
      ).then((value) =>
        value[0].value === 0
          ? callback([])
          : callback(
              Array.from(
                new Map(value.map((option) => [option.value, option])).values(),
              ),
            ),
      );
    }, 300),
    [channel],
  );

  /* CONSTANTS */
  const formattedStartTime = startTime ? format(startTime, 'HH:mm') : '';

  /* USE EFFECTS */
  useEffect(() => {
    if (!startTime) return;
    const formattedStartTime = format(startTime, 'HH:mm');
    const fpcHavingStartTime = schedulingTableData.filter(
      (row) => formattedStartTime && row.FPC_Time === formattedStartTime,
    );
    if (fpcHavingStartTime.length > 0) setIsFpcStartTimePresent(true);
    else setIsFpcStartTimePresent(false);
  }, [debouncedStartTime]);

  /* EVENT HANDLERS */
  const handleClose = () => setIsOpen(false);

  const handleProgChange = async (option) => {
    let seasonOptions = [];
    let episodeOptions = {};
    try {
      setProgram(option);
      showCursorLoader();
      const response = await apiCallstoreprocedure('usp_pg_fpc_get_content', {
        ContentTypeCode: 0,
        LocationCode: channel.LocationCode,
        ChannelCode: channel.ChannelCode,
        FPCDate: convertDateToYMD(date),
        ContentName: `%${option.label}%`,
      });
      if (response.status === 200) {
        seasonOptions = [
          ...new Set(response.data.map((item) => item.SeasonNo)),
        ].map((option) => ({ value: option, label: option }));
        seasonOptions.forEach((option) => {
          let episodeOptForCurSeason = [];
          response.data.forEach((item) => {
            if (item.SeasonNo === option.value)
              episodeOptForCurSeason.push({
                value: item.EpisodeNo,
                label: item.EpisodeNo,
              });
          });
          episodeOptions[option.value] = episodeOptForCurSeason;
        });
      } else if (response.status === 200) {
        openNotification('info', 'No seasons found for selected program');
      } else throw new Error(response);
    } catch (error) {
      console.error(error);
      openNotification('danger', 'Something went wrong while fetching seasons');
    } finally {
      setSeasonOptions(seasonOptions);
      setEpisodeOptions(episodeOptions);
      setSeason(null);
      setEpisode(null);
      hideCursorLoader();
    }
  };

  const handleSeasonChange = (option) => {
    setSeason(option);
    setEpisode(null);
  };

  const handleEpisodeChange = async (option) => {
    let segments = [];
    try {
      showCursorLoader();
      setEpisode(option);
      const response = await apiCallstoreprocedure('USP_Program_Add_FinalLog', {
        par_LocationCode: channel.LocationCode,
        par_ChannelCode: channel.ChannelCode,
        par_TelecastDate: convertDateToYMD(date),
        par_StartTime: formattedStartTime,
        par_ContentCode: program.value,
        par_Season: Number(season.value),
        par_Episode: Number(option.value),
        par_LoginCode: loginId,
      });
      if (response.status === 200) {
        segments = response.data;
      } else if (response.status === 204) {
        openNotification('info', 'No segments found for selected program');
      } else throw new Error(response);
    } catch (error) {
      console.error(error);
      openNotification(
        'danger',
        'Something went wrong while fetching segments',
      );
    } finally {
      setSegments(segments);
      hideCursorLoader();
    }
  };

  const handleAddProgram = () => {
    try {
      executeOperation({
        operation: operationTypesEnum.ADD_PROGRAM,
        progWithSeg: segments,
        addProgStartTime: formattedStartTime,
      });
      handleClose();
      openNotification('success', 'Program added successfully');
    } catch (error) {
      console.error(error);
      openNotification('danger', 'Something went wrong while adding program');
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      contentClassName="mt-8"
      width="40vw"
    >
      <h5 className="mb-4">Add Program</h5>
      <div className="grid grid-cols-3 gap-x-4 gap-y-6">
        <CustomField
          label="FPC Start Time"
          field={
            <TimeInput size="sm" value={startTime} onChange={setStartTime} />
          }
          errorMsg={
            !startTime
              ? 'Required'
              : isFpcStartTimePresent
              ? 'Start time already exist'
              : undefined
          }
        />
        <CustomField
          containerClassNames="col-span-2"
          label="Program Name"
          field={
            <SelectXs
              cacheOptions
              loadOptions={debouncedLoadProgOptions}
              defaultOptions
              componentAs={AsyncSelect}
              onChange={handleProgChange}
              isDisabled={!startTime}
            />
          }
        />
        <CustomField
          label="Season"
          field={
            <SelectXs
              options={seasonOptions}
              isDisabled={!program}
              value={season}
              onChange={handleSeasonChange}
            />
          }
        />
        <CustomField
          label="Episode"
          field={
            <SelectXs
              options={
                season?.value && episodeOptions[season.value]
                  ? episodeOptions[season.value]
                  : []
              }
              isDisabled={!season}
              value={episode}
              onChange={handleEpisodeChange}
            />
          }
        />
        <div className="flex items-end w-full">
          <Button
            variant="solid"
            size="sm"
            className="w-full"
            icon={<MdOutlineAddCircle />}
            disabled={
              !startTime || segments.length === 0 || isFpcStartTimePresent
            }
            onClick={handleAddProgram}
          >
            Add Program
          </Button>
        </div>
      </div>
      {segments.length > 0 && (
        <div>
          <h6 className="mt-8 mb-2">Segments</h6>
          <Segments segments={segments.slice(1)} />
        </div>
      )}
    </Dialog>
  );
}

export default AddProgramDialog;
