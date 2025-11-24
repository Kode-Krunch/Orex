import { useEffect, useState } from 'react';

import { apiGetEntityMappingDrop } from 'services/MasterService';
import { Badge, Dropdown, Tag } from 'components/ui';

function MapChannelpop2({ ticketData, setTicketData }) {
  const [data, setData] = useState([]);
  const [channelList, setChannelList] = useState([]);
  const colorClasses = [
    'bg-rose-500',
    'bg-indigo-500',
    'bg-blue-500',
    'bg-amber-400',
  ];

  useEffect(() => {
    myAsyncFunction();
  }, []);

  async function myAsyncFunction() {
    try {

      const resp2 = await apiGetEntityMappingDrop();
      setData(resp2.data);
      const channelsBYID = resp2.data.map((channel, index) => ({
        Channel: {
          ChannelCode: channel.ChannelCode,
          ChannelName: channel.LocationName + '-' + channel.channelName,
        },
        locations: {
          LocationCode: channel.locationCode,
          LocationName: channel.LocationName,
        },
        ColorClass: colorClasses[index % colorClasses.length],
      }));

      setChannelList(channelsBYID);

    } catch (error) {
      // Handle errors that might occur during asynchronous operations
      console.error(error);
    }
  }

  const onRemoveChannel = (labelToRemove) => {

    // Use filter to create a new array that excludes the label to be removed
    const addLabels = data.filter(
      (label) => label.ChannelCode == labelToRemove,
    );
    const res = addLabels.map((channel, index) => ({
      Channel: {
        ChannelCode: channel.ChannelCode,
        ChannelName: channel.LocationName + '-' + channel.channelName,
      },
      locations: {
        LocationCode: channel.locationCode,
        LocationName: channel.LocationName,
      },
      ColorClass: colorClasses[index % colorClasses.length],
    }));

    setChannelList([...channelList, ...res]);

    const updatedLabels = ticketData.filter(
      (label) => label.Channel.ChannelCode !== labelToRemove,
    );

    // Update the state with the new labels array
    setTicketData(updatedLabels);
  };

  const onAddLabelClick = (label) => {
    setTicketData([...ticketData, label]);

    let res = channelList.filter(
      (row) =>
        row.Channel.ChannelCode != label.Channel.ChannelCode &&
        row.locations.LocationCode != label.locations.LocationCode,
    );
    setChannelList(res);
  };
  return (
    <div className="py-4 px-6">
      <div className="mt-4">
        <div>
          {ticketData.length > 0
            ? ticketData.map((label, index) => {
              return (
                <Tag
                  key={index}
                  className="mr-2 rtl:ml-2 mb-2"
                  prefix
                  prefixClass={colorClasses[index]}
                  onClose={() => {
                    onRemoveChannel(label.Channel.ChannelCode);
                  }}
                >
                  {label.Channel.ChannelName}
                </Tag>
              );
            })
            : null}
          <Dropdown
            renderTitle={
              <Tag
                showCloseButton={false}
                className="border-dashed cursor-pointer mr-2 rtl:ml-2"
              >
                Map Channel
              </Tag>
            }
            placement="bottom-end"
          >
            {channelList.map((label, index) => (
              <Dropdown.Item
                onSelect={() => onAddLabelClick(label)}
                eventKey={index}
                key={index}
              >
                <div className="flex items-center">
                  <Badge innerClass={label.ColorClass} />
                  <span className="ml-2 rtl:mr-2">
                    {label.Channel.ChannelName}
                  </span>
                </div>
              </Dropdown.Item>
            ))}
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
export default MapChannelpop2;
