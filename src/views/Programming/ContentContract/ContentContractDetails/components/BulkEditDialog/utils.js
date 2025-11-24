import { apiGetcepsmapping } from 'services/MasterService';
import {
  defaultContentsFormState,
  defaultMoviesFormState,
  defaultSongsFormState,
} from '../../constants';
import { bulkEditDialogFieldsEnum, eventTypesEnum } from '../../enum';

const getEventTypewiseContents = (selectedRowIds, contents) => {
  const eventTypeWiseContents = {};
  const selectedRows = Object.keys(selectedRowIds).map(
    (selectedRowIndex) => contents[selectedRowIndex],
  );
  selectedRows.forEach((row) => {
    if (!eventTypeWiseContents[row.EventType]) {
      eventTypeWiseContents[row.EventType] = [];
    }
    eventTypeWiseContents[row.EventType].push(row);
  });
  return eventTypeWiseContents;
};

const getBulkEditDialogSaveBtnStatus = (
  eventTypeWiseContents,
  moviesFormState,
  contentsFormState,
  songsFormState,
) => {
  let isAllMandMovieFieldsFilled = true;
  let isAllMandContFieldsFilled = true;
  let isAllMandSongFieldsFilled = true;
  if (eventTypeWiseContents?.Movie?.length > 0)
    isAllMandMovieFieldsFilled = isMandatoryFieldsFilled(moviesFormState);
  if (eventTypeWiseContents?.Content?.length > 0)
    isAllMandContFieldsFilled = isMandatoryFieldsFilled(
      contentsFormState,
      eventTypesEnum.CONTENT,
    );
  if (eventTypeWiseContents?.Song?.length > 0)
    isAllMandSongFieldsFilled = isMandatoryFieldsFilled(songsFormState);
  if (!isAllMandMovieFieldsFilled)
    return 'Please fill mandatory fields for movies';
  else if (!isAllMandContFieldsFilled)
    return 'Please fill mandatory fields for contents';
  else if (!isAllMandSongFieldsFilled)
    return 'Please fill mandatory fields for songs';
  else return true;
};

const isMandatoryFieldsFilled = (formState, eventType) => {
  let isMandatoryFiledsFilled =
    formState.dateRange[0] &&
    formState.dateRange[1] &&
    formState.costPerPlay > 0 &&
    formState.amortisationType &&
    formState.countries.length > 0;
  if (eventType === eventTypesEnum.CONTENT) {
    isMandatoryFiledsFilled =
      isMandatoryFiledsFilled &&
      (formState[bulkEditDialogFieldsEnum.IS_UNLIMITED_RUNS] ||
        formState[bulkEditDialogFieldsEnum.PERMISSIBLE_DURATION] > 0)
        ? true
        : formState.seasons && formState.startEpisode && formState.endEpisode;
  }
  return isMandatoryFiledsFilled;
};

const convertFormStateToLicensedContData = (formState) => {
  let licensedContData = {
    ContractStartDate: formState[bulkEditDialogFieldsEnum.DATE_RANGE][0],
    ContractEndDate: formState[bulkEditDialogFieldsEnum.DATE_RANGE][1],
    AmortisationTypeCode: formState[bulkEditDialogFieldsEnum.AMORTISATION_TYPE],
    Geocountruy: formState[bulkEditDialogFieldsEnum.COUNTRIES],
    CostPerEp: formState[bulkEditDialogFieldsEnum.COST_PER_PLAY],
    BroadcastStartTime:
      formState[bulkEditDialogFieldsEnum.BROADCAST_START_TIME],
    BroadcastEndTime: formState[bulkEditDialogFieldsEnum.BROADCAST_END_TIME],
    PDuration: formState[bulkEditDialogFieldsEnum.PERMISSIBLE_DURATION],
    SUN: formState[bulkEditDialogFieldsEnum.DAYS].includes(0),
    MON: formState[bulkEditDialogFieldsEnum.DAYS].includes(1),
    TUE: formState[bulkEditDialogFieldsEnum.DAYS].includes(2),
    WED: formState[bulkEditDialogFieldsEnum.DAYS].includes(3),
    THU: formState[bulkEditDialogFieldsEnum.DAYS].includes(4),
    FRI: formState[bulkEditDialogFieldsEnum.DAYS].includes(5),
    SAT: formState[bulkEditDialogFieldsEnum.DAYS].includes(6),
    UnlimitedRuns: formState[bulkEditDialogFieldsEnum.IS_UNLIMITED_RUNS],
    IsActive: formState[bulkEditDialogFieldsEnum.IS_ACTIVE],
    ProgCost: formState[bulkEditDialogFieldsEnum.TOTAL_COST],
    ContractRemarks: formState[bulkEditDialogFieldsEnum.REMARKS],
    Season: formState[bulkEditDialogFieldsEnum.SEASONS],
    StartEpisode: formState[bulkEditDialogFieldsEnum.START_EPISODE],
    EndEpisode: formState[bulkEditDialogFieldsEnum.END_EPISODE],
    TotalEpisode: formState[bulkEditDialogFieldsEnum.TOTAL_EPISODES],
    OrignalPlayRun: formState[bulkEditDialogFieldsEnum.ORIGINAL_PLAY_RUN],
    TotalOrignalRun: formState[bulkEditDialogFieldsEnum.TOTAL_ORIGINAL_RUN],
    OrignalRunWithIn24:
      formState[bulkEditDialogFieldsEnum.ORIGINAL_RUN_WITHIN_24HR],
    NextOrignalRun:
      formState[bulkEditDialogFieldsEnum.NEXT_ORIGINAL_RUN_WITHIN],
    NextOrignalRunType:
      formState[bulkEditDialogFieldsEnum.NEXT_ORIGINAL_RUN_TYPE],
    RepeatPlayRun: formState[bulkEditDialogFieldsEnum.REPEAT_PLAY_RUN],
    TotalRepeatRun: formState[bulkEditDialogFieldsEnum.TOTAL_REPEAT_RUN],
    RepeatRunWithIn24:
      formState[bulkEditDialogFieldsEnum.REPEAT_RUN_WITHIN_24HR],
    NextRepeatRun: formState[bulkEditDialogFieldsEnum.NEXT_REPEAT_RUN_WITHIN],
    NextRepeatRunType: formState[bulkEditDialogFieldsEnum.NEXT_REPEAT_RUN_TYPE],
  };
  return licensedContData;
};

const convertLicensedContDataToFormState = (content) => {
  return {
    [bulkEditDialogFieldsEnum.DATE_RANGE]: [
      content.ContractStartDate,
      content.ContractEndDate,
    ],
    [bulkEditDialogFieldsEnum.AMORTISATION_TYPE]: content.AmortisationTypeCode,
    [bulkEditDialogFieldsEnum.TOTAL_COST]: content.ProgCost,
    [bulkEditDialogFieldsEnum.COST_PER_PLAY]: content.CostPerEp,
    [bulkEditDialogFieldsEnum.COUNTRIES]: content.Geocountruy,
    [bulkEditDialogFieldsEnum.IS_UNLIMITED_RUNS]: content.UnlimitedRuns,
    [bulkEditDialogFieldsEnum.PERMISSIBLE_DURATION]: content.PDuration,
    [bulkEditDialogFieldsEnum.BROADCAST_START_TIME]: content.BroadcastStartTime,
    [bulkEditDialogFieldsEnum.BROADCAST_END_TIME]: content.BroadcastEndTime,
    [bulkEditDialogFieldsEnum.DAYS]: getCheckedDays(
      content.SUN,
      content.MON,
      content.TUE,
      content.WED,
      content.THU,
      content.FRI,
      content.SAT,
    ),
    [bulkEditDialogFieldsEnum.IS_ACTIVE]: content.IsActive,
    [bulkEditDialogFieldsEnum.REMARKS]: content.ContractRemarks,
    [bulkEditDialogFieldsEnum.SEASONS]: content.Season,
    [bulkEditDialogFieldsEnum.START_EPISODE]: content.StartEpisode,
    [bulkEditDialogFieldsEnum.END_EPISODE]: content.EndEpisode,
    [bulkEditDialogFieldsEnum.TOTAL_EPISODES]: content.TotalEpisode,
    [bulkEditDialogFieldsEnum.ORIGINAL_PLAY_RUN]: content.OrignalPlayRun,
    [bulkEditDialogFieldsEnum.REPEAT_PLAY_RUN]: content.RepeatPlayRun,
    [bulkEditDialogFieldsEnum.TOTAL_ORIGINAL_RUN]: content.TotalOrignalRun,
    [bulkEditDialogFieldsEnum.TOTAL_REPEAT_RUN]: content.TotalRepeatRun,
    [bulkEditDialogFieldsEnum.ORIGINAL_RUN_WITHIN_24HR]:
      content.OrignalRunWithIn24,
    [bulkEditDialogFieldsEnum.REPEAT_RUN_WITHIN_24HR]:
      content.RepeatRunWithIn24,
    [bulkEditDialogFieldsEnum.NEXT_ORIGINAL_RUN_WITHIN]: content.NextOrignalRun,
    [bulkEditDialogFieldsEnum.NEXT_REPEAT_RUN_WITHIN]: content.NextRepeatRun,
    [bulkEditDialogFieldsEnum.NEXT_ORIGINAL_RUN_TYPE]:
      content.NextOrignalRunType,
    [bulkEditDialogFieldsEnum.NEXT_REPEAT_RUN_TYPE]: content.NextRepeatRunType,
  };
};

const getCheckedDays = (sun, mon, tue, wed, thu, fri, sat) => {
  const days = [];
  if (sun) days.push(0);
  if (mon) days.push(1);
  if (tue) days.push(2);
  if (wed) days.push(3);
  if (thu) days.push(4);
  if (fri) days.push(5);
  if (sat) days.push(6);
  return days;
};

const handleFieldChange = ({
  field,
  value,
  formState,
  setFormState,
  eventType,
}) => {
  const defaultFormState =
    eventType === eventTypesEnum.MOVIE
      ? defaultMoviesFormState
      : eventType === eventTypesEnum.CONTENT
      ? defaultContentsFormState
      : defaultSongsFormState;
  if (field === bulkEditDialogFieldsEnum.COST_PER_PLAY) {
    setFormState((prev) => ({
      ...prev,
      [field]: !value ? null : value,
      [bulkEditDialogFieldsEnum.TOTAL_COST]: !value
        ? null
        : value * prev[bulkEditDialogFieldsEnum.TOTAL_ORIGINAL_RUN],
    }));
  } else if (field === bulkEditDialogFieldsEnum.IS_UNLIMITED_RUNS && value) {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
      [bulkEditDialogFieldsEnum.SEASONS]:
        defaultFormState[bulkEditDialogFieldsEnum.SEASONS],
      [bulkEditDialogFieldsEnum.START_EPISODE]:
        defaultFormState[bulkEditDialogFieldsEnum.START_EPISODE],
      [bulkEditDialogFieldsEnum.END_EPISODE]:
        defaultFormState[bulkEditDialogFieldsEnum.END_EPISODE],
      [bulkEditDialogFieldsEnum.TOTAL_EPISODES]:
        defaultFormState[bulkEditDialogFieldsEnum.TOTAL_EPISODES],
      [bulkEditDialogFieldsEnum.ORIGINAL_PLAY_RUN]:
        defaultFormState[bulkEditDialogFieldsEnum.ORIGINAL_PLAY_RUN],
      [bulkEditDialogFieldsEnum.TOTAL_ORIGINAL_RUN]:
        defaultFormState[bulkEditDialogFieldsEnum.TOTAL_ORIGINAL_RUN],
      [bulkEditDialogFieldsEnum.ORIGINAL_RUN_WITHIN_24HR]:
        defaultFormState[bulkEditDialogFieldsEnum.ORIGINAL_RUN_WITHIN_24HR],
      [bulkEditDialogFieldsEnum.NEXT_ORIGINAL_RUN_WITHIN]:
        defaultFormState[bulkEditDialogFieldsEnum.NEXT_ORIGINAL_RUN_WITHIN],
      [bulkEditDialogFieldsEnum.NEXT_ORIGINAL_RUN_TYPE]:
        defaultFormState[bulkEditDialogFieldsEnum.NEXT_ORIGINAL_RUN_TYPE],
      [bulkEditDialogFieldsEnum.REPEAT_PLAY_RUN]:
        defaultFormState[bulkEditDialogFieldsEnum.REPEAT_PLAY_RUN],
      [bulkEditDialogFieldsEnum.TOTAL_REPEAT_RUN]:
        defaultFormState[bulkEditDialogFieldsEnum.TOTAL_REPEAT_RUN],
      [bulkEditDialogFieldsEnum.REPEAT_RUN_WITHIN_24HR]:
        defaultFormState[bulkEditDialogFieldsEnum.REPEAT_RUN_WITHIN_24HR],
      [bulkEditDialogFieldsEnum.NEXT_REPEAT_RUN_WITHIN]:
        defaultFormState[bulkEditDialogFieldsEnum.NEXT_REPEAT_RUN_WITHIN],
      [bulkEditDialogFieldsEnum.NEXT_REPEAT_RUN_TYPE]:
        defaultFormState[bulkEditDialogFieldsEnum.NEXT_REPEAT_RUN_TYPE],
    }));
  } else if (field === bulkEditDialogFieldsEnum.PERMISSIBLE_DURATION && value) {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
      [bulkEditDialogFieldsEnum.NEXT_ORIGINAL_RUN_WITHIN]:
        defaultFormState[bulkEditDialogFieldsEnum.NEXT_ORIGINAL_RUN_WITHIN],
      [bulkEditDialogFieldsEnum.NEXT_ORIGINAL_RUN_TYPE]:
        defaultFormState[bulkEditDialogFieldsEnum.NEXT_ORIGINAL_RUN_TYPE],
      [bulkEditDialogFieldsEnum.NEXT_REPEAT_RUN_WITHIN]:
        defaultFormState[bulkEditDialogFieldsEnum.NEXT_REPEAT_RUN_WITHIN],
      [bulkEditDialogFieldsEnum.NEXT_REPEAT_RUN_TYPE]:
        defaultFormState[bulkEditDialogFieldsEnum.NEXT_REPEAT_RUN_TYPE],
    }));
  } else if (field === bulkEditDialogFieldsEnum.SEASONS) {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
      [bulkEditDialogFieldsEnum.START_EPISODE]:
        defaultFormState[bulkEditDialogFieldsEnum.START_EPISODE],
      [bulkEditDialogFieldsEnum.END_EPISODE]:
        defaultFormState[bulkEditDialogFieldsEnum.END_EPISODE],
      [bulkEditDialogFieldsEnum.TOTAL_EPISODES]:
        defaultFormState[bulkEditDialogFieldsEnum.TOTAL_EPISODES],
      [bulkEditDialogFieldsEnum.TOTAL_ORIGINAL_RUN]:
        defaultFormState[bulkEditDialogFieldsEnum.TOTAL_ORIGINAL_RUN],
      [bulkEditDialogFieldsEnum.REPEAT_PLAY_RUN]:
        defaultFormState[bulkEditDialogFieldsEnum.REPEAT_PLAY_RUN],
      [bulkEditDialogFieldsEnum.TOTAL_REPEAT_RUN]:
        defaultFormState[bulkEditDialogFieldsEnum.TOTAL_REPEAT_RUN],
    }));
  } else if (
    field === bulkEditDialogFieldsEnum.END_EPISODE ||
    (field === bulkEditDialogFieldsEnum.START_EPISODE &&
      formState[bulkEditDialogFieldsEnum.END_EPISODE])
  ) {
    let newFormState = { ...formState, [field]: value };
    // set total episodes
    newFormState[bulkEditDialogFieldsEnum.TOTAL_EPISODES] =
      newFormState[bulkEditDialogFieldsEnum.END_EPISODE].value -
      newFormState[bulkEditDialogFieldsEnum.START_EPISODE].value +
      1;
    // set total original run
    newFormState[bulkEditDialogFieldsEnum.TOTAL_ORIGINAL_RUN] =
      newFormState[bulkEditDialogFieldsEnum.ORIGINAL_PLAY_RUN] *
      newFormState[bulkEditDialogFieldsEnum.TOTAL_EPISODES];
    // set total repeat run
    newFormState[bulkEditDialogFieldsEnum.TOTAL_REPEAT_RUN] = newFormState[
      bulkEditDialogFieldsEnum.REPEAT_PLAY_RUN
    ]
      ? newFormState[bulkEditDialogFieldsEnum.REPEAT_PLAY_RUN] *
        newFormState[bulkEditDialogFieldsEnum.TOTAL_EPISODES]
      : newFormState[bulkEditDialogFieldsEnum.REPEAT_PLAY_RUN];
    // set total cost
    newFormState[bulkEditDialogFieldsEnum.TOTAL_COST] =
      typeof newFormState[bulkEditDialogFieldsEnum.COST_PER_PLAY] === 'number'
        ? newFormState[bulkEditDialogFieldsEnum.COST_PER_PLAY] *
          newFormState[bulkEditDialogFieldsEnum.TOTAL_ORIGINAL_RUN]
        : newFormState[bulkEditDialogFieldsEnum.COST_PER_PLAY];
    setFormState(newFormState);
  } else if (field === bulkEditDialogFieldsEnum.REPEAT_PLAY_RUN) {
    if (
      eventType === eventTypesEnum.MOVIE ||
      eventType === eventTypesEnum.SONG
    ) {
      setFormState((prev) => ({
        ...prev,
        [field]: value,
        [bulkEditDialogFieldsEnum.TOTAL_REPEAT_RUN]: value
          ? value * formState[bulkEditDialogFieldsEnum.ORIGINAL_PLAY_RUN]
          : value,
      }));
    } else {
      setFormState((prev) => ({
        ...prev,
        [field]: value,
        [bulkEditDialogFieldsEnum.TOTAL_REPEAT_RUN]: value
          ? value * formState[bulkEditDialogFieldsEnum.TOTAL_EPISODES]
          : value,
      }));
    }
  } else
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
};

const getSeasonWithEpOptions = async (contentcode) => {
  const response = await apiGetcepsmapping(contentcode);
  let seasonOptions = [];
  if (response.status === 200) {
    response.data.forEach((season) => {
      const option = {
        value: season.SeasonNo,
        label: season.SeasonNo,
        episodeOptions: [],
      };
      for (
        let index = season.StartEpisode;
        index <= season.EndEpisodes;
        index++
      ) {
        option.episodeOptions.push({ value: index, label: index });
      }
      seasonOptions.push(option);
    });
  } else if (response.status === 204) seasonOptions = [];
  else throw new Error();
  return seasonOptions;
};

const isFieldDisabled = (field, formState) => {
  if (formState[bulkEditDialogFieldsEnum.IS_UNLIMITED_RUNS]) return true;
  else if (field === bulkEditDialogFieldsEnum.START_EPISODE)
    return formState[bulkEditDialogFieldsEnum.SEASONS] ? false : true;
  else if (field === bulkEditDialogFieldsEnum.END_EPISODE)
    return formState[bulkEditDialogFieldsEnum.SEASONS] &&
      formState[bulkEditDialogFieldsEnum.START_EPISODE]
      ? false
      : true;
  else if (
    field === bulkEditDialogFieldsEnum.NEXT_ORIGINAL_RUN_WITHIN ||
    field === bulkEditDialogFieldsEnum.NEXT_ORIGINAL_RUN_TYPE ||
    field === bulkEditDialogFieldsEnum.NEXT_REPEAT_RUN_WITHIN ||
    field === bulkEditDialogFieldsEnum.NEXT_REPEAT_RUN_TYPE
  )
    return (
      formState[bulkEditDialogFieldsEnum.IS_UNLIMITED_RUNS] ||
      formState[bulkEditDialogFieldsEnum.PERMISSIBLE_DURATION] > 0
    );
  else if (field === bulkEditDialogFieldsEnum.REPEAT_PLAY_RUN)
    return formState[bulkEditDialogFieldsEnum.TOTAL_EPISODES] ? false : true;
  else return false;
};

export {
  getEventTypewiseContents,
  getBulkEditDialogSaveBtnStatus,
  isMandatoryFieldsFilled,
  convertFormStateToLicensedContData,
  convertLicensedContDataToFormState,
  getCheckedDays,
  handleFieldChange,
  getSeasonWithEpOptions,
  isFieldDisabled,
};
