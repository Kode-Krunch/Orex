import {
  Card,
  FormContainer,
  FormItem,
  Input,
  Select,
  Button,
} from 'components/ui';
import React, { useEffect, useState } from 'react';
import {
  apiGetMammaster,
  apiGetPlayoutmaster,
  apiGetProvidermaster,
} from 'services/MasterService';
import { validate } from 'components/validators';
import { useNavigate } from 'react-router-dom';
import ChannelMasterDrop from 'views/Controls/ChannelMasterDrop';
import {
  formatOnHHMMSSBlur,
  handleChangeWithFrameSingleWithoutff,
  openNotification,
  parseDuration,
} from 'views/Controls/GLOBALFUNACTION';
import {
  IoIosCheckmarkCircle,
  IoIosCheckmarkCircleOutline,
} from 'react-icons/io';
import { useSelector } from 'react-redux';

const FramePerSecD = [
  { value: '24', label: '24' },
  { value: '25', label: '25' },
  { value: '30', label: '30' },
];

const Channelsettinghead = ({
  channelsetting,
  Content,
  setChannelsetting,
  setActiveIndex,
}) => {
  const navigate = useNavigate();
  const Channel = useSelector((state) => state.locale.selectedChannel);
  // Consolidate the channel and location settings into one object
  const initialSelectedChannel = {
    ChannelCode:
      channelsetting.ChannelCode ||
      Content.Channel?.ChannelCode ||
      Channel.ChannelCode,
    LocationCode:
      channelsetting.LocationCode ||
      Content.locations?.LocationCode ||
      Channel.LocationCode,
    value: `${
      channelsetting.LocationCode ||
      Content.locations?.LocationCode ||
      Channel.LocationCode
    }-${
      channelsetting.ChannelCode ||
      Content.Channel?.ChannelCode ||
      Channel.ChannelCode
    }`,
    label: '',
  };

  const [selectedChannel, setSelectedChannel] = useState(
    initialSelectedChannel,
  );

  const [LocationCode, setLocationCode] = useState(
    initialSelectedChannel.LocationCode,
  );
  const [ChannelCode, setChannelCode] = useState(
    initialSelectedChannel.ChannelCode,
  );
  const [StartTime, setStartTime] = useState(
    channelsetting.StartTime || Content.StartTime || '',
  );
  const [EndTime, setEndTime] = useState('23:59:59:23');
  const [FramePerSec, setFramePerSec] = useState(
    channelsetting.FramePerSec || Content.FramePerSec || '',
  );
  const [PlayoutCode, setPlayoutCode] = useState(
    channelsetting.PlayoutCode || Content.Playout?.PlayoutCode || '',
  );
  const [MamCode, setMamCode] = useState(
    channelsetting.MamCode || Number(Content.MamCode) || '',
  );
  const [ProviderCode, setProviderCode] = useState(
    channelsetting.ProviderCode || Number(Content.ProviderCode) || '',
  );
  const [SapWebService, setSapWebService] = useState(
    channelsetting.SapWebService || Content.SapWebService || '',
  );
  const [TallyIntegrationPath, setTallyIntegrationPath] = useState(
    channelsetting.TallyIntegrationPath || Content.TallyIntegrationPath || '',
  );

  const [playout, setPlayout] = useState([]);
  const [Mam, setMam] = useState([]);
  const [Provider, setProvider] = useState([]);

  useEffect(() => {
    if (validate(selectedChannel)) {
      setLocationCode(selectedChannel.LocationCode);
      setChannelCode(selectedChannel.ChannelCode);
    }
  }, [selectedChannel]);

  useEffect(() => {
    const fetchData = async () => {
      const playoutResp = await apiGetPlayoutmaster();
      const mamResp = await apiGetMammaster();
      const providerResp = await apiGetProvidermaster();

      setPlayout(
        playoutResp.data.map((option) => ({
          value: option.PlayoutCode,
          label: option.PlayoutName,
        })),
      );

      setMam(
        mamResp.data.map((option) => ({
          value: option.MamCode,
          label: option.MamName,
        })),
      );

      setProvider(
        providerResp.data.map((option) => ({
          value: option.ProviderCode,
          label: option.ProviderName,
        })),
      );
    };

    fetchData();
  }, []);

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const formattedValue = formatOnHHMMSSBlur(value);

    if (name === 'StartTime') {
      setStartTime(formattedValue);
    } else if (name === 'EndTime') {
      setEndTime(formattedValue);
    }
  };

  useEffect(() => {
    if (parseDuration(EndTime) < parseDuration(StartTime)) {
      setEndTime('');
      setStartTime('');
    }
  }, [StartTime, EndTime]);

  const maychangeapi = (id) => {
    if (
      !LocationCode ||
      !ChannelCode ||
      !FramePerSec ||
      !StartTime ||
      !EndTime ||
      !PlayoutCode
    ) {
      openNotification('danger', 'All Fields Are Required');
      return;
    }

    if (StartTime.length !== 8) {
      openNotification('danger', 'Enter StartTime Properly');
      return;
    }

    const updatedSettings = {
      ...channelsetting,
      LocationCode: selectedChannel.LocationCode,
      ChannelCode: selectedChannel.ChannelCode,
      LocationName: selectedChannel.LocationName,
      ChannelName: selectedChannel.ChannelName,
      FramePerSec,
      StartTime,
      EndTime,
      PlayoutCode,
      ProviderCode,
      SapWebService,
      TallyIntegrationPath,
      MamCode,
    };

    setChannelsetting(updatedSettings);
    setActiveIndex(id);
  };

  return (
    <>
      <div className="col-span-4 mb-1">
        <h4>Channel Settings</h4>
        <br />
      </div>
      <FormContainer>
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1">
            <FormItem label="Channel" asterisk>
              <ChannelMasterDrop
                selected={selectedChannel}
                setSelected={setSelectedChannel}
                Isdisabled={true}
              />
            </FormItem>
          </div>
          <div className="col-span-1">
            <FormItem label="FramePerSec" asterisk>
              <Select
                asterisk
                placeholder="Please Select"
                options={FramePerSecD}
                name="FramePerSec"
                value={FramePerSecD.find(
                  (option) => option.value === FramePerSec,
                )}
                onChange={(e) => setFramePerSec(e.value)}
              />
            </FormItem>
          </div>
          <div className="col-span-1">
            <FormItem label="Start Time" asterisk>
              <Input
                asterisk
                size="sm"
                type="text"
                value={StartTime}
                placeholder="HH:MM:SS"
                name="StartTime"
                onChange={(e) =>
                  handleChangeWithFrameSingleWithoutff(e, setStartTime)
                }
                onBlur={handleBlur}
              />
            </FormItem>
          </div>
          {/* <div className="col-span-1">
            <FormItem label="End Time" asterisk>
              <Input
                asterisk
                size="sm"
                type="text"
                value={EndTime}
                placeholder="HH:MM:SS"
                name="EndTime"
                onChange={(e) =>
                  handleChangeWithFrameSingleWithoutff(e, setEndTime)
                }
                onBlur={handleBlur}
              />
            </FormItem>
          </div> */}
        </div>
      </FormContainer>
      <br />
      <Card>
        <FormContainer>
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1">
              <FormItem label="Playout Integration" asterisk>
                <Select
                  asterisk
                  placeholder="Please Select Playout"
                  options={playout}
                  name="PlayoutCode"
                  value={playout.find((option) => option.value === PlayoutCode)}
                  onChange={(e) => setPlayoutCode(e.value)}
                />
              </FormItem>
            </div>
            <div className="col-span-1">
              <FormItem label="EPG Integration">
                <Select
                  placeholder="Please Select EPG"
                  options={Provider}
                  name="ProviderCode"
                  value={Provider.find(
                    (option) => option.value === ProviderCode,
                  )}
                  onChange={(e) => setProviderCode(e.value)}
                />
              </FormItem>
            </div>
            <div className="col-span-1">
              <FormItem label="MAM Integration">
                <Select
                  placeholder="Please Select MAM"
                  options={Mam}
                  name="MamCode"
                  value={Mam.find((option) => option.value === MamCode)}
                  onChange={(e) => setMamCode(e.value)}
                />
              </FormItem>
            </div>
          </div>
        </FormContainer>
        <FormContainer>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-3">
            <div className="col-span-1">
              <FormItem label="SAP Web Service Path">
                <div className="flex items-center">
                  <Input
                    asterisk
                    name="SapWebService"
                    className="w-[400px]"
                    value={SapWebService}
                    onChange={(e) => setSapWebService(e.target.value)}
                    size="sm"
                    maxLength="10"
                    placeholder="SAP Service"
                  />

                  <Button
                    size="xs"
                    className="ml-2"
                    variant="solid"
                    type="button"
                    icon={<IoIosCheckmarkCircle />}
                  >
                    Verify
                  </Button>
                </div>
              </FormItem>
            </div>
            <div className="col-span-1">
              <FormItem label="Tally Integration Path">
                <div className="flex items-center">
                  <Input
                    asterisk
                    name="TallyIntegrationPath"
                    value={TallyIntegrationPath}
                    className="w-[400px]"
                    onChange={(e) => setTallyIntegrationPath(e.target.value)}
                    size="sm"
                    maxLength="10"
                    placeholder="Tally Integration Path"
                  />
                  <Button
                    size="xs"
                    className="ml-2"
                    variant="solid"
                    type="button"
                    icon={<IoIosCheckmarkCircle />}
                  >
                    Verify
                  </Button>
                </div>
              </FormItem>
            </div>
          </div>
        </FormContainer>
      </Card>
      <div className="mt-3 text-right">
        {/* <Button variant="solid" type="button" onClick={() => maychangeapi(gg)}>
          Submit & Proceed
        </Button> */}
        <Button size="sm" onClick={() => navigate('/ChannelSettingMaster')}>
          Discard
        </Button>
        &nbsp;
        <Button
          size="sm"
          variant="solid"
          onClick={() => {
            maychangeapi(1);
          }}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default Channelsettinghead;
