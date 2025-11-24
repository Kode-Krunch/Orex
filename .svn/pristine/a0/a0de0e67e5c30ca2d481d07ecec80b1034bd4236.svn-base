import { Input, Select } from 'components/ui';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import { telecastStatus } from './enums';

/* CONSTANTS */
const STATUS_OPTIONS = [
  { label: telecastStatus.TELECASTED, value: 1 },
  { label: telecastStatus.NOT_TELECASTED, value: 0 },
];

const TelecastTimeEditor = (options) => {
  return (
    <Input
      className="w-32 max-w-full py-1 px-2"
      size="sm"
      placeholder="HH:MM:SS:FF"
      type="tel"
      value={options.value}
      onChange={(event) => {
        handleTelecastTimeChange(event, options);
      }}
    />
  );
};

const TelecastDurationEditor = (options) => {
  return (
    <Input
      className="w-32 max-w-full py-1 px-2"
      size="sm"
      placeholder="HH:MM:SS:FF"
      type="tel"
      value={options.value}
      onChange={(event) => {
        handleTelecastDurationChange(event, options);
      }}
    />
  );
};

const StatusEditor = (options) => {
  return (
    <div>
      <Select
        options={STATUS_OPTIONS}
        placeholder="Select"
        className="w-36 max-w-full"
        value={
          options.value === telecastStatus.TELECASTED
            ? STATUS_OPTIONS[0]
            : STATUS_OPTIONS[1]
        }
        size="sm"
        onChange={(selectedOption) => {
          handleStatusChange(selectedOption, options);
        }}
        styles={{
          valueContainer: (provided) => ({
            ...provided,
            paddingRight: 0,
          }),
        }}
      />
    </div>
  );
};

/* EVENT HANDLERS */
const handleTelecastTimeChange = (event, options) => {
  try {
    let value = event.target.value.replace(/\D/g, '');
    const formattedTime = formatTime(value);
    options.editorCallback(formattedTime);
  } catch (error) {
    console.error(error);
  }
};

const handleTelecastDurationChange = (event, options) => {
  try {
    let value = event.target.value.replace(/\D/g, '');
    const formattedTime = formatTime(value);
    if (formattedTime <= options.rowData.CommercialDuration) {
      options.editorCallback(formattedTime);
    } else {
      openNotification(
        'danger',
        'Telecast Duration cannot be greater than Commercial Duration',
      );
    }
  } catch (error) {
    console.error(error);
  }
};

const handleStatusChange = (selectedOption, options) => {
  try {
    options.editorCallback(selectedOption.label);
  } catch (error) {
    console.error(error);
  }
};

/* HELPER FUNCTIONS */
const formatTime = (value) => {
  try {
    let time = value;
    if (time.length > 8) {
      time = value.slice(0, 8);
    }
    let formattedTime = '';
    if (time.length > 0) formattedTime += time.slice(0, 2);
    if (time.length > 2) formattedTime += ':' + time.slice(2, 4);
    if (time.length > 4) formattedTime += ':' + time.slice(4, 6);
    if (time.length > 6) formattedTime += ':' + time.slice(6, 8);
    return formattedTime;
  } catch (error) {
    throw error;
  }
};

export { TelecastDurationEditor, TelecastTimeEditor, StatusEditor };
