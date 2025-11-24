import React, { useContext, useEffect, useState } from 'react';
import ReportsContext from '../context/ReportsContext';
import DatePickerRange from 'components/ui/DatePicker/DatePickerRange';
import Input from './Input';
import { Checkbox, DatePicker, Select } from 'components/ui';
import { apiCallstoreprocedure } from 'services/CommonService';
import {
  isJSONArrayEqual,
  openNotification,
} from 'views/Controls/GLOBALFUNACTION';
import { useSelector } from 'react-redux';
import { convertDateToYMD } from 'components/validators';
import { reportsJSON } from '../reportsJSON';
import { reportsEnum } from '../enums/ReportsEnums';

function InputsContainer() {
  /* REDUX */
  const channel = useSelector((state) => state.locale.selectedChannel);
  const loginId = useSelector((state) => state.auth.session.LoginId);

  /* CONTEXTS */
  const {
    pathEndpoint,
    reportsStructure,
    formState,
    setFormState,
    setReportsTableData,
    setShowLoader,
  } = useContext(ReportsContext);

  /* STATES */
  const [selectorOptions, setSelectorOptions] = useState({});

  /* USE EFFECTS */
  useEffect(() => {
    try {
      // Initialize selectorOptions with empty arrays for all select inputs
      const selectorOptions = {};
      if (
        reportsJSON &&
        pathEndpoint.length > 0 &&
        reportsJSON[pathEndpoint].inputs
      ) {
        reportsJSON[pathEndpoint].inputs.forEach((input) => {
          if (
            input.type === reportsEnum.inputType.select ||
            input.type === reportsEnum.inputType.multiSelect
          ) {
            selectorOptions[input.stateKey] = [];
          }
        });
      }
      setSelectorOptions(selectorOptions);
    } catch (error) {
      console.error(error);
    }
  }, [pathEndpoint, reportsJSON]);

  useEffect(() => {
    (async () => {
      try {
        if (reportsStructure?.inputs) {
          if (reportsStructure?.inputs[0]?.type === reportsEnum.inputType.select) {
            setShowLoader(true);
            await setSelectorOptionsDynamically();
            setShowLoader(false);
          }
        }
      } catch (error) {
        console.error(error);
        setShowLoader(false);
      }
    })();
  }, [reportsStructure]);

  useEffect(() => {
    (async () => {
      try {
        if (reportsStructure) {
          if (Object.keys(formState).length === 0) {
            setDefaultCheckboxValuesInState();
          } else {
            setShowLoader(true);
            // Set Selector Options with their respective options
            await setSelectorOptionsDynamically();
            // if all values are present, then fetch reports table data
            if (isAllValuesPresent()) {
              await fetchReportsTableData();
            } else {
              setReportsTableData([]);
            }
            setShowLoader(false);
          }
        }
      } catch (error) {
        setShowLoader(false);
        console.error(error);
      }
    })();
  }, [formState, reportsStructure]);

  useEffect(() => {
    try {
      // Set default value for select inputs if present
      if (reportsStructure && Object.keys(selectorOptions).length > 0) {
        Object.keys(selectorOptions).forEach((key) => {
          if (selectorOptions[key].length > 0) {
            reportsStructure.inputs.forEach((input) => {
              if (
                input.stateKey === key &&
                (input.options.defaultValue !== null ||
                  input.options.defaultValue !== undefined)
              ) {
                if (input.type === reportsEnum.inputType.select) {
                  if (
                    selectorOptions[key].filter(
                      (option) => option.value === input.options.defaultValue,
                    ).length > 0
                  ) {
                    setFormState((prevState) => ({
                      ...prevState,
                      [key]: selectorOptions[key].filter(
                        (option) => option.value === input.options.defaultValue,
                      )[0],
                    }));
                  }
                } else if (input.type === reportsEnum.inputType.multiSelect) {
                  let values = [];
                  input.options.defaultValue.forEach((value) => {
                    if (
                      selectorOptions[key].filter(
                        (option) => option.value === value,
                      ).length > 0
                    ) {
                      values.push(
                        selectorOptions[key].filter(
                          (option) => option.value === value,
                        )[0],
                      );
                    }
                  });
                  setFormState((prevState) => ({
                    ...prevState,
                    [key]: values,
                  }));
                }
              }
            });
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [selectorOptions, reportsStructure]);

  /* EVENT HANDLERS */
  const handleDateChange = (stateKey, value, index) => {
    try {
      const newFormState = resetNextInputs(
        {
          ...formState,
          [stateKey]: value,
        },
        index,
      );
      setFormState(newFormState);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDateRangeChange = (stateKey, value, index) => {
    try {
      const newFormState = resetNextInputs(
        {
          ...formState,
          [stateKey]: value,
        },
        index,
      );
      setFormState(newFormState);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectChange = (stateKey, value, index) => {
    try {
      const newFormState = resetNextInputs(
        {
          ...formState,
          [stateKey]: value,
        },
        index,
      );
      setFormState(newFormState);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMultiSelectChange = (stateKey, value, index) => {
    try {
      if (value.length > 0) {
        const newFormState = resetNextInputs(
          {
            ...formState,
            [stateKey]: value,
          },
          index,
        );
        setFormState(newFormState);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckboxChange = (stateKey, value, index) => {
    try {
      const newFormState = resetNextInputs(
        {
          ...formState,
          [stateKey]: value,
        },
        index,
      );
      setFormState(newFormState);
    } catch (error) {
      console.error(error);
    }
  };

  /* HELPER FUNCTIONS */
  const setSelectorOptionsDynamically = async () => {
    try {
      for (let index = 0; index < reportsStructure?.inputs?.length; index++) {
        const input = reportsStructure.inputs[index];
        if (
          input.type === reportsEnum.inputType.select ||
          input.type === reportsEnum.inputType.multiSelect
        ) {
          const options = {};
          if (!Array.isArray(input.options)) {
            // if options is not defined in reportsJSON, then fetch options
            options[input.stateKey] = await fetchOptions(index, input.options);
          } else {
            // else set options from reportsJSON
            options[input.stateKey] = input.options;
          }
          if (options[input.stateKey]?.length > 0) {
            // append additional options to the fetched options
            if (input.options.additionalOptions) {
              options[input.stateKey] = [
                ...input.options.additionalOptions,
                ...options[input.stateKey],
              ];
            }
            // update selectorOptions only if the fetched options are different from the existing options
            if (
              options[input.stateKey]?.length !==
              selectorOptions[input.stateKey]?.length
            ) {
              setSelectorOptions((prevState) => ({
                ...prevState,
                ...options,
              }));
            }
          }
        }
      }
    } catch (error) {
      throw error;
    }
  };

  const setDefaultCheckboxValuesInState = () => {
    try {
      for (let index = 0; index < reportsStructure.inputs.length; index++) {
        const input = reportsStructure.inputs[index];
        if (input.type === reportsEnum.inputType.checkbox) {
          setFormState((prevState) => ({
            ...prevState,
            [input.stateKey]: input.defaultValue ? input.defaultValue : 0,
          }));
        }
      }
    } catch (error) {
      throw error;
    }
  };

  const fetchOptions = async (index, options) => {
    try {
      let fetchedOptions = [];
      if (isPrevValuesPresent(index)) {
        if (options.fetchType === reportsEnum.fetchType.sp) {
          const params = generateParams(options.params);
          const response = await apiCallstoreprocedure(
            options.fetchUrl,
            params,
          );
          if (response.status === 200) {
            fetchedOptions = response.data.map((option) => ({
              label: option[options.labelKey],
              value: option[options.valueKey],
            }));
          } else if (response.status !== 204) {
            openNotification(
              'danger',
              `Unable to get options for ${reportsStructure.inputs[index].label}`,
            );
          }
        }
      }
      return fetchedOptions;
    } catch (error) {
      throw error;
    }
  };

  const generateParams = (parameters) => {
    try {
      const params = {};
      parameters.forEach((param) => {
        if (param.type === 'default') {
          if (param.param.toLowerCase() === 'locationcode') {
            params[param.param] = channel.LocationCode;
          } else if (param.param.toLowerCase() === 'channelcode') {
            params[param.param] = channel.ChannelCode;
          }
          else if (param.param.toLowerCase() === 'loginid') {
            params[param.param] = loginId;
          }
        } else if (param.type === 'state' && param.stateKey in formState) {
          if (param.inputType === reportsEnum.inputType.date) {
            params[param.param] = convertDateToYMD(formState[param.stateKey]);
          } else if (
            param.inputType === reportsEnum.inputType.dateRange &&
            formState[param.stateKey][0] &&
            formState[param.stateKey][1]
          ) {
            params[param.param] = convertDateToYMD(
              formState[param.stateKey][param.index],
            );
          } else if (param.inputType === reportsEnum.inputType.select) {
            params[param.param] = formState[param.stateKey].value;
          } else if (param.inputType === reportsEnum.inputType.multiSelect) {
            let values = '';
            formState[param.stateKey].forEach((value, index) => {
              if (index !== formState[param.stateKey].length - 1) {
                values += value.value + ',';
              } else {
                values += value.value;
              }
            });
            params[param.param] = values;
          } else if (param.inputType === reportsEnum.inputType.checkbox) {
            params[param.param] = formState[param.stateKey];
          }
        } else if (param.type === 'static') {
          params[param.param] = param.value;
        }
      });
      return params;
    } catch (error) {
      throw error;
    }
  };

  const isPrevValuesPresent = (inputIndex) => {
    try {
      let isPresent = true;
      if (inputIndex > 0) {
        for (let index = 0; index < inputIndex; index++) {
          const input = reportsStructure.inputs[index];
          if (input.type === reportsEnum.inputType.dateRange) {
            const dateRange = formState[input.stateKey];
            if (dateRange && (!dateRange[0] || !dateRange[1])) {
              isPresent = false;
              break;
            }
          } else if (
            formState[input.stateKey] === undefined ||
            formState[input.stateKey] === null
          ) {
            isPresent = false;
            break;
          }
        }
      }
      return isPresent;
    } catch (error) {
      throw error;
    }
  };

  const isAllValuesPresent = () => {
    try {
      let isPresent = true;
      for (let index = 0; index < reportsStructure.inputs.length; index++) {
        const input = reportsStructure.inputs[index];
        if (input.type === reportsEnum.inputType.dateRange) {
          const dateRange = formState[input.stateKey];
          if (dateRange && (!dateRange[0] || !dateRange[1])) {
            isPresent = false;
            break;
          }
        } else if (
          formState[input.stateKey] === undefined ||
          formState[input.stateKey] === null ||
          formState[input.stateKey] === '' ||
          (Array.isArray(formState) && formState[input.stateKey].length === 0)
        ) {
          isPresent = false;
          break;
        }
      }
      return isPresent;
    } catch (error) {
      throw error;
    }
  };

  const fetchReportsTableData = async () => {
    try {
      if (reportsStructure.report.fetchType === reportsEnum.fetchType.sp) {
        const params = generateParams(reportsStructure.report.params);
        const response = await apiCallstoreprocedure(
          reportsStructure.report.fetchUrl,
          params,
        );
        if (response.status === 200) {
          if (response.data.length === 0) {
            openNotification(
              'info',
              `No reports found for the selected filters`,
            );
            setReportsTableData([]);
          } else {
            setReportsTableData(response.data);
          }
        } else if (response.status === 204) {
          openNotification('info', `No reports found for the selected filters`);
          setReportsTableData([]);
        } else {
          openNotification(
            'danger',
            `Something went wrong while fetching reports. Server responded with status code ${response.status}`,
          );
          setReportsTableData([]);
        }
      }
    } catch (error) {
      openNotification('danger', `Something went wrong while fetching reports`);
      setReportsTableData([]);
      throw error;
    }
  };

  const isDisableInput = (inputIndex) => {
    try {
      let isDisable = false;
      if (inputIndex > 0) {
        for (let index = 0; index < inputIndex; index++) {
          const input = reportsStructure.inputs[index];
          if (input.type === reportsEnum.inputType.dateRange) {
            const dateRange = formState[input.stateKey];
            if (!dateRange || !dateRange[0] || !dateRange[1]) {
              isDisable = true;
              break;
            }
          } else if (input.required && !formState[input.stateKey]) {
            isDisable = true;
            break;
          }
        }
      }
      return isDisable;
    } catch (error) {
      throw error;
    }
  };

  const resetNextInputs = (formState, inputIndex) => {
    try {
      const newFormState = { ...formState };
      reportsStructure.inputs.forEach((input, index) => {
        if (index > inputIndex) {
          delete newFormState[input.stateKey];
        }
      });
      return newFormState;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {reportsStructure ? (
        <div className="grid grid-cols-5 gap-3">

          {reportsStructure.inputs.map((input, index) => {
            switch (input.type) {
              case reportsEnum.inputType.date:
                return (
                  <Input
                    label={input.label}
                    required={input.required}
                    InputComponent={
                      <DatePicker
                        placeholder="Select"
                        clearable={false}
                        size={input.size}
                        disabled={isDisableInput(index)}
                        onChange={(event) => {
                          handleDateChange(input.stateKey, event, index);
                        }}
                        value={
                          formState[input.stateKey]
                            ? formState[input.stateKey]
                            : null
                        }
                      />
                    }
                  />
                );
              case reportsEnum.inputType.dateRange:
                return (
                  <Input
                    label={input.label}
                    required={input.required}
                    InputComponent={
                      <DatePickerRange
                        placeholder="Select"
                        clearable={false}
                        size={input.size}
                        disabled={isDisableInput(index)}
                        onChange={(event) => {
                          handleDateRangeChange(input.stateKey, event, index);
                        }}
                        value={
                          formState[input.stateKey]
                            ? formState[input.stateKey]
                            : ''
                        }
                      />
                    }
                  />
                );
              case reportsEnum.inputType.select:
                return (
                  <Input
                    label={input.label}
                    required={input.required}
                    InputComponent={
                      <Select
                        placeholder="Select"
                        size={input.size}
                        isDisabled={isDisableInput(index)}
                        onChange={(event) => {
                          handleSelectChange(input.stateKey, event, index);
                        }}
                        options={
                          selectorOptions[input.stateKey]
                            ? selectorOptions[input.stateKey]
                            : []
                        }
                        value={
                          formState[input.stateKey]
                            ? formState[input.stateKey]
                            : []
                        }
                      />
                    }
                  />
                );
              case reportsEnum.inputType.multiSelect:
                return (
                  <Input
                    label={input.label}
                    required={input.required}
                    InputComponent={
                      <Select
                        placeholder="Select"
                        size={input.size}
                        isDisabled={isDisableInput(index)}
                        onChange={(event) => {
                          handleMultiSelectChange(input.stateKey, event, index);
                        }}
                        options={
                          selectorOptions[input.stateKey]
                            ? selectorOptions[input.stateKey]
                            : []
                        }
                        value={
                          formState[input.stateKey]
                            ? formState[input.stateKey]
                            : []
                        }
                        isClearable={false}
                        isMulti
                      />
                    }
                  />
                );
              case reportsEnum.inputType.checkbox:
                return (
                  <Input
                    label={input.label}
                    required={input.required}
                    InputComponent={
                      <Checkbox
                        size={input.size}
                        disabled={isDisableInput(index)}
                        defaultChecked={
                          formState[input.stateKey] === 1 ? true : false
                        }
                        onChange={(value) => {
                          handleCheckboxChange(input.stateKey, value, index);
                        }}
                      ></Checkbox>
                    }
                  />
                );
              default:
                return <></>;
            }
          })}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default InputsContainer;
