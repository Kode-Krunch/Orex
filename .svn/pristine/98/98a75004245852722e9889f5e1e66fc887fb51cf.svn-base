import { Select } from 'components/ui';
import React from 'react';
import { HiCheck } from 'react-icons/hi';
import { components } from 'react-select';

function ChannelSelector({ location, channel, channelList, onChange }) {
  /* HELPER COMPONENTS */
  const { Control } = components;
  console.log('channelList', channelList);

  const CustomSelectOption = ({ innerProps, label, data, isSelected }) => {
    return (
      <div
        className={`flex items-center justify-between p-2 ${
          isSelected
            ? 'bg-gray-100 dark:bg-gray-500'
            : 'hover:bg-gray-50 dark:hover:bg-gray-600'
        }`}
        {...innerProps}
      >
        <div className="flex items-center">
          <img
            src={data.imgPath}
            style={{
              height: '20px',
              width: '20px',
              borderRadius: 20,
            }}
          />
          <span className="ml-2 rtl:mr-2">{label}</span>
        </div>
        {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
      </div>
    );
  };

  const CustomControl = ({ children, ...props }) => {
    const selected = props.getValue()[0];
    return (
      <Control {...props}>
        &nbsp;&nbsp;
        {selected && (
          <img
            src={selected.imgPath}
            style={{
              height: '20px',
              width: '20px',
              borderRadius: 20,
            }}
          />
        )}
        {children}
      </Control>
    );
  };

  return (
    <Select
      options={channelList}
      components={{
        Option: CustomSelectOption,
        Control: CustomControl,
      }}
      value={channelList.filter(
        (option) =>
          option.ChannelCode === channel && option.LocationCode == location,
      )}
      onChange={onChange}
      placeholder="Select"
      className="caret-white"
      defaultMenuIsOpen
      blurInputOnSelect
      autoFocus
      styles={{
        menuList: (provided) => ({
          ...provided,
          '&:hover': {
            cursor: 'pointer',
          },
        }),
        control: (provided) => ({
          ...provided,
          '&:hover': {
            cursor: 'pointer',
          },
        }),
        input: (provided) => ({
          ...provided,
          color: 'white',
        }),
      }}
    />
  );
}

export default ChannelSelector;
