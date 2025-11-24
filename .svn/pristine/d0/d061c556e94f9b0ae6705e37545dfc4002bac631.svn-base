import { Avatar, Select } from 'components/ui';
import { Dropdown } from 'primereact/dropdown';
import React, { useEffect, useState } from 'react';
import { HiCheck } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { apiGetChannelmasterdrop } from 'services/MasterService';
import { components } from 'react-select';

const { MultiValueLabel, Control } = components;

const colorClasses = [
  'bg-rose-500',
  'bg-indigo-500',
  'bg-blue-500',
  'bg-amber-400',
];

const CustomSelectOption = ({ innerProps, label, data, isSelected }) => {
  return (
    <div
      className={`flex items-center justify-between p-2 ${isSelected
        ? 'bg-gray-100 dark:bg-gray-500'
        : 'hover:bg-gray-50 dark:hover:bg-gray-600'
        }`}
      {...innerProps}
    >
      <div className="flex items-center">
        <Avatar shape="circle" size={20} src={`${data.imgPath}`} />

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
      {selected && (
        <Avatar
          className="ltr:ml-4 rtl:mr-4"
          shape="circle"
          size={18}
          src={`${selected.imgPath}`}
        />
      )}

      {children}
    </Control>
  );
};
const ChannelMasterDrop = ({ selected, setSelected, List, Isdisabled = false }) => {
  // console.log(selected);
  const ContentDemo = [{ value: '', label: 'Data Not Found' }];
  const LoginId = useSelector((state) => state.auth.session.LoginId);
  const [ChannelListOption, setChannelList] = useState([]);
  useEffect(() => {
    (async (values) => {
      const resp = await apiGetChannelmasterdrop(LoginId);

      // console.log(resp.data);
      const channelsBYID = resp.data.map((channel, index) => ({
        ChannelName: channel.ChannelName,
        ChannelCode: channel.ChannelCode,
        ColorClass: colorClasses[index % colorClasses.length],
        LocationCode: channel.LocationCode,
        LocationName: channel.LocationName,
        value: channel.LocationCode + '-' + channel.ChannelCode,
        label: channel.LocationName + '-' + channel.ChannelName,
        imgPath: channel.Channel_Image,
      }));

      setChannelList(channelsBYID);
    })();
  }, []);
  console.log(selected?.value);
  return (
    <div className="card flex flex-column align-items-center  h-9">
      <Select
        size="sm"
        className="mb-4 w-full"
        placeholder="Please Select"
        options={ChannelListOption}

        // components={{
        //     Option: CustomSelectOption,
        //     Control: CustomControl,
        // }}
        components={{
          Option: CustomSelectOption,

          Control: CustomControl,
        }}
        value={
          ChannelListOption !== null
            ? ChannelListOption.filter(
              (option) => option.value === selected?.value,
            )
            : ContentDemo.filter((option) => option.value)
        }
        onChange={(selectedOption) => {
          console.log(selectedOption);
          setSelected(selectedOption); // Call the callback with the selected option
        }}
        isDisabled={Isdisabled}
      ></Select>
    </div>
  );
};

export default ChannelMasterDrop;
