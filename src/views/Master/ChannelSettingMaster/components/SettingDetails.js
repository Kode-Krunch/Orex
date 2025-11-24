import {
  Card,
  FormContainer,
  FormItem,
  Button,
  Input,
  DatePicker,
} from 'components/ui';

import React, { useEffect, useState } from 'react';
import { HiPlus } from 'react-icons/hi';
import SettingTable from './SettingTable';

import { validate, convertDateToYMD } from 'components/validators';
import {
  formatOnHHMMSSFFBlur,
  handleChangeWithFrameSingleValue,
  openNotification,
} from 'views/Controls/GLOBALFUNACTION';
import { useSelector } from 'react-redux';

const SettingDetails = ({
  channelsetting,
  setChannelsetting,
  setActiveIndex,
  Setting,
  setSetting,
  Settings,
  setSettings,
}) => {
  const channel = useSelector((state) => state.locale.selectedChannel);
  const ChannelSetting = useSelector(
    (state) => state.auth.session.ChannelSetting,
  );
  let ContinueSave =
    Object.keys(channelsetting).length === 0 ? 'Continue' : 'Save';
  // SETTING DETAILS
  const [ChannelTimeDescription, setChannelTimeDescription] = useState('');
  const [StartTime, setStartTime] = useState(null);
  const [EndTime, setEndTime] = useState(null);
  const [EffectiveFrom, setEffectiveFrom] = useState('');

  useEffect(() => {
    let res = {};
    console.log(channelsetting);
    let newID;
    while (true) {
      newID = Math.floor(Math.random() * 900) + 100;
      if (!Settings.some((row) => row.id === newID)) {
        break;
      }
    }
    res.id = newID;
    res.LocationName =
      channelsetting.LocationName || channelsetting.locations?.LocationName;
    res.ChannelName =
      channelsetting.ChannelName || channelsetting.Channel?.ChannelName;
    res.LocationCode =
      channelsetting.LocationCode || channelsetting.locations?.LocationCode;
    res.ChannelCode =
      channelsetting.ChannelCode || channelsetting.Channel?.ChannelCode;
    res.ChannelTimeDescription = ChannelTimeDescription;
    res.StartTime = StartTime;
    res.EndTime = EndTime;
    res.EffectiveFrom = validate(EffectiveFrom)
      ? convertDateToYMD(EffectiveFrom)
      : '';

    res.IsActive = 1;
    setSetting(res);
  }, [ChannelTimeDescription, StartTime, EndTime, EffectiveFrom]);

  const handleBlurStartTime = (event) => {
    const { name, value } = event.target;
    const formattedValue = formatOnHHMMSSFFBlur(value, Number(ChannelSetting[0]?.FramePerSec || 24));
    setStartTime(formattedValue);
  };
  const handleBlurEndTime = (event) => {
    const { name, value } = event.target;
    const formattedValue = formatOnHHMMSSFFBlur(value, Number(ChannelSetting[0]?.FramePerSec || 24));
    setEndTime(formattedValue);
  };

  return (
    <>
      <Card>
        {' '}
        <div className=" mb-1 flex justify-between">
          <h4>Setting Details</h4>

          <div className="col-span-1">
            <Button
              shape="circle"
              variant="solid"
              size="sm"
              icon={<HiPlus />}
              onClick={() => {
                // Log the ChannelTimeDescription for debugging
                console.log(ChannelTimeDescription);

                // Check if StartTime is greater than EndTime
                if (StartTime > EndTime) {
                  openNotification('danger', 'StartTime must be less than EndTime');
                  return;
                }

                // Ensure ChannelTimeDescription is not empty
                if (ChannelTimeDescription.length === 0) {
                  openNotification('danger', 'All fields are required');
                  return;
                }

                // Check if Setting is already in Settings array
                const isSettingExist = Settings.some((row) => row.id === Setting.id);

                if (!isSettingExist) {
                  // Add Setting and additional channel info to Settings
                  const updatedSettings = [
                    ...Settings,
                    {
                      ...Setting,
                      LocationCode: channel.LocationCode,
                      ChannelCode: channel.ChannelCode,
                      LocationName: channel.LocationName,
                      ChannelName: channel.ChannelName,
                    }
                  ];

                  // Update state with the new Settings array
                  setSettings(updatedSettings);
                } else {
                  openNotification('danger', 'This setting already exists in the list');
                }
              }}

            />
          </div>
        </div>
        <FormContainer>
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3">
              <FormItem label=" Channel Time Description" asterisk>
                <Input
                  onChange={(e) => setChannelTimeDescription(e.target.value)}
                  size="sm"
                  maxLength="100"
                  placeholder=""
                />
              </FormItem>
            </div>
          </div>
          <br></br>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
            <div className="col-span-1">
              <FormItem label="Start Time" asterisk>
                <Input
                  asterisk
                  size="sm"
                  type="text"
                  value={StartTime}
                  placeholder="HH:MM:SS:FF"
                  name="StartTime"
                  onChange={(e) =>
                    // handleChangeWithFrameNew(e, setStartTime)
                    handleChangeWithFrameSingleValue(e, setStartTime)
                  }
                  onBlur={handleBlurStartTime}
                />
              </FormItem>
            </div>
            <div className="col-span-1">
              <FormItem label="End Time" asterisk>
                <Input
                  asterisk
                  size="sm"
                  type="text"
                  value={EndTime}
                  placeholder="HH:MM:SS:FF"
                  name="EndTime"
                  onChange={(e) =>
                    handleChangeWithFrameSingleValue(e, setEndTime)
                  }
                  onBlur={handleBlurEndTime}
                />
              </FormItem>
            </div>
            <div className="col-span-1">
              <FormItem label="Effective From" asterisk>
                <DatePicker
                  size="sm"
                  inputFormat="DD-MMM-YYYY"
                  name="EffectiveFrom"
                  value={EffectiveFrom}
                  onChange={(val) => {
                    setEffectiveFrom(val);
                  }}
                />
              </FormItem>
            </div>
          </div>
        </FormContainer>
        <br></br>
        <SettingTable Settings={Settings} setSettings={setSettings} />
      </Card>
      <br />
      <div className="flex items-center">
        <Button
          onClick={() => {
            let res = { ...channelsetting };
            setChannelsetting(res);
            setActiveIndex(1);
          }}
          className="mr-2"
          size="sm"
        >
          Previous
        </Button>
        <Button
          size="sm"
          variant="solid"
          onClick={() => {
            if (Settings.length == 0) {
              openNotification('danger', `Kindly Enter at least one Detail`);
              return;
            }
            let res = { ...channelsetting };
            setChannelsetting(res);
            setActiveIndex(3);
          }}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default SettingDetails;
