import { runTypeOptions } from './constants';
import { convertDateToYMD } from 'components/validators';
import { format } from 'date-fns';

const handleSelectorOptionsResponse = (
  response,
  setOptions,
  valueKey,
  labelKey,
) => {
  let options = [];
  if (response.status === 200) {
    options = response.data.map((option) => ({
      ...option,
      value: option[valueKey],
      label: option[labelKey],
    }));
    setOptions(options);
  } else if (response.status === 204) setOptions(options);
  else throw new Error();
  return options;
};

const getDataToSave = (
  selectedSupplier,
  contractName,
  authorisedPerson,
  agreementDate,
  budgetYear,
  selectedCountry,
  selectedState,
  selectedCity,
  selectedCurrency,
  licensedContents,
  isPageEdit,
  contractMasterDetailsForEdit,
) => {
  const masterDetails = {
    SupplierCode: selectedSupplier.value,
    ContractName: contractName,
    AuthorisedPerson: authorisedPerson,
    AgreementDate: convertDateToYMD(agreementDate),
    BudgetYear: budgetYear,
    CountryCode: selectedCountry.value,
    StateCode: selectedState.value,
    PlaceCode: selectedCity.value,
    CurrencyCode: selectedCurrency.value,
    Remarks: '',
    IsActive: 1,
    ...(isPageEdit && {
      ContractNo: contractMasterDetailsForEdit.ContractNo,
      ContractCode: contractMasterDetailsForEdit.ContractCode,
    }),
  };
  const data = {
    contract: masterDetails,
    details: [],
  };
  // do necessary translation for API
  licensedContents.forEach((content) => {
    const newContent = {
      ...content,
      ContractStartDate: convertDateToYMD(content.ContractStartDate),
      ContractEndDate: convertDateToYMD(content.ContractEndDate),
      AmortisationTypeCode: content.AmortisationTypeCode.value,
      Geocountruy: content.Geocountruy.map((country) => ({
        CountryCode: country.value,
      })),
      BroadcastStartTime:
        content.BroadcastStartTime instanceof Date
          ? format(content.BroadcastStartTime, 'HH:mm')
          : content.BroadcastStartTime,
      BroadcastEndTime:
        content.BroadcastEndTime instanceof Date
          ? format(content.BroadcastEndTime, 'HH:mm')
          : content.BroadcastEndTime,
      PDuration: `${content.PDuration ? content.PDuration : 0}`,
      SUN: content.SUN ? 1 : 0,
      MON: content.MON ? 1 : 0,
      TUE: content.TUE ? 1 : 0,
      WED: content.WED ? 1 : 0,
      THU: content.THU ? 1 : 0,
      FRI: content.FRI ? 1 : 0,
      SAT: content.SAT ? 1 : 0,
      UnlimitedRuns: content.UnlimitedRuns ? 1 : 0,
      Season: content.Season ? content.Season.value : null,
      StartEpisode: content.StartEpisode ? content.StartEpisode.value : null,
      EndEpisode: content.EndEpisode ? content.EndEpisode.value : null,
      OrignalRunWithIn24: content.OrignalRunWithIn24
        ? content.OrignalRunWithIn24
        : 0,
      NextOrignalRun: content.NextOrignalRun ? content.NextOrignalRun : 0,
      NextOrignalRunType: content.NextOrignalRunType.value,
      RepeatPlayRun: content.RepeatPlayRun ? content.RepeatPlayRun : 0,
      TotalRepeatRun: content.TotalRepeatRun ? content.TotalRepeatRun : 0,
      RepeatRunWithIn24: content.RepeatRunWithIn24
        ? content.RepeatRunWithIn24
        : 0,
      NextRepeatRun: content.NextRepeatRun ? content.NextRepeatRun : 0,
      NextRepeatRunType: content.NextRepeatRunType.value,
      IsActive: content.IsActive ? 1 : 0,
    };
    data.details.push(newContent);
  });
  return data;
};

const setDataForContentsTab = (
  contents,
  setNewContents,
  setLicensedContents,
  isPageEdit,
  amortisationTypeOptions,
  contractMasterDetails,
) => {
  const newContents = [];
  const licensedContents = [];
  contents.forEach((content) => {
    if (isPageEdit) {
      if (content.ContentContractDetailID)
        licensedContents.push(
          convertAPIDataToLicensedContData(content, amortisationTypeOptions),
        );
      else
        newContents.push({
          ...content,
          ContractCode: contractMasterDetails.ContractCode,
        });
    } else {
      newContents.push(content);
    }
  });
  setNewContents(newContents);
  setLicensedContents(licensedContents);
};

const convertAPIDataToLicensedContData = (content, amortisationTypeOptions) => {
  let licensedContData = {
    ...content,
    ContractStartDate: new Date(content.ContractStartDate),
    ContractEndDate: new Date(content.ContractEndDate),
    AmortisationTypeCode: getSelectedOption(
      amortisationTypeOptions,
      content.AmortisationTypeCode,
    ),
    Geocountruy: [{ value: 78, label: 'India ' }], // Hardcoded country value
    BroadcastStartTime: getDateFromTime(content.BroadcastStartTime),
    BroadcastEndTime: getDateFromTime(content.BroadcastEndTime),
    PDuration: content.PDuration > '0' ? Number(content.PDuration) : null,
    SUN: content.SUN === 1 ? true : false,
    MON: content.MON === 1 ? true : false,
    TUE: content.TUE === 1 ? true : false,
    WED: content.WED === 1 ? true : false,
    THU: content.THU === 1 ? true : false,
    FRI: content.FRI === 1 ? true : false,
    SAT: content.SAT === 1 ? true : false,
    UnlimitedRuns: content.UnlimitedRuns === 1 ? true : false,
    IsActive: content.IsActive === 1 ? true : false,
    Season: { value: content.Season, label: content.Season },
    StartEpisode: { value: content.StartEpisode, label: content.StartEpisode },
    EndEpisode: { value: content.EndEpisode, label: content.EndEpisode },
    OrignalRunWithIn24: content.OrignalRunWithIn24
      ? content.OrignalRunWithIn24
      : null,
    NextOrignalRun: content.NextOrignalRun ? content.NextOrignalRun : null,
    NextOrignalRunType: getSelectedOption(
      runTypeOptions,
      content.NextOrignalRunType,
    ),
    RepeatPlayRun: content.RepeatPlayRun ? content.RepeatPlayRun : null,
    TotalRepeatRun: content.TotalRepeatRun ? content.TotalRepeatRun : null,
    RepeatRunWithIn24: content.RepeatRunWithIn24
      ? content.RepeatRunWithIn24
      : null,
    NextRepeatRun: content.NextRepeatRun ? content.NextRepeatRun : null,
    NextRepeatRunType: getSelectedOption(
      runTypeOptions,
      content.NextRepeatRunType,
    ),
  };
  return licensedContData;
};

const getSelectedOption = (options, value) => {
  const selectedOption = options.filter((option) => option.value === value)[0];
  return selectedOption ? selectedOption : null;
};

const getDateFromTime = (time) =>
  time
    ? new Date(
        new Date().setHours(time.split(':')[0], time.split(':')[1], 0, 0),
      )
    : null;

export { handleSelectorOptionsResponse, getDataToSave, setDataForContentsTab };
