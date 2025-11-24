import React, { useEffect, useState } from 'react';
import { Alert, Card, Tabs } from 'components/ui';
import Channelsettinghead from './components/Channelsettinghead';
import RateCard from './components/RateCard';
import SettingDetails from './components/SettingDetails';
import VideoCard from './components/VideoCard';
import { useSelector } from 'react-redux';
import { apiGetchannelsettingdetailsbyid } from 'services/MasterService';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import HeaderExtra from 'views/Controls/HeaderExtra';
const { TabNav, TabList, TabContent } = Tabs;
const ChannelsettingEdit = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [channelsetting, setChannelsetting] = useState({});
  const [Setting, setSetting] = useState({});
  const [Settings, setSettings] = useState([]);
  const { Content } = useSelector((state) => state.base.common);

  const [message, setMessage] = useTimeOutMessage();
  // useEffect(() => {
  //   setChannelsetting(Content);
  // }, [Content]);

  useEffect(() => {
    if (Content.ChannelSettingCode) {
      (async (values) => {
        const resp = await apiGetchannelsettingdetailsbyid(
          Content.ChannelSettingCode,
        );
        const resultArray = resp.data.map((item, index) => ({
          id: index + 1, // Use a unique identifier based on your requirements
          LocationCode: item.locations.LocationCode,
          ChannelCode: item.Channel.ChannelCode,
          ChannelTimeDescription: item.ChannelTimeDescription,
          StartTime: item.StartTime,
          EndTime: item.EndTime,
          LocationName: item.locations.LocationName,
          ChannelName: item.Channel.ChannelName,
          EffectiveFrom: item.EffectiveFrom.substring(0, 10), // Extract date part only
          IsActive: item.IsActive,
        }));
        setSettings(resultArray);
      })();
    }
  }, []);
  return (
    <Card header={<HeaderExtra />}>
      {message && (
        <Alert className="mb-4" type="danger" showIcon>
          {message}
        </Alert>
      )}
      <Tabs value={activeIndex} onChange={(val) => { }}>
        <TabList>
          <TabNav value={0}>Channel Setting</TabNav>
          <TabNav value={1}>Rules</TabNav>
          <TabNav value={2}>Time Details</TabNav>
          <TabNav value={3}>Video Path</TabNav>
        </TabList>
        <div className="p-4">
          <TabContent value={0}>
            <Card>
              <Channelsettinghead
                channelsetting={channelsetting}
                Content={Content}
                setChannelsetting={setChannelsetting}
                setActiveIndex={setActiveIndex}
              />
            </Card>
          </TabContent>
          <TabContent value={1}>
            <RateCard
              channelsetting={channelsetting}
              setChannelsetting={setChannelsetting}
              setActiveIndex={setActiveIndex}
              Content={Content}
            />
          </TabContent>
          <TabContent value={2}>
            <SettingDetails
              channelsetting={channelsetting}
              setChannelsetting={setChannelsetting}
              setActiveIndex={setActiveIndex}
              setSetting={setSetting}
              setSettings={setSettings}
              Setting={Setting}
              Settings={Settings}
            />
          </TabContent>
          <TabContent value={3}>
            <VideoCard
              channelsetting={channelsetting}
              setChannelsetting={setChannelsetting}
              setActiveIndex={setActiveIndex}
              Settings={Settings}
              Content={Content}
              setMessage={setMessage}
            />
          </TabContent>
        </div>
      </Tabs>
    </Card>
  );
};

export default ChannelsettingEdit;
