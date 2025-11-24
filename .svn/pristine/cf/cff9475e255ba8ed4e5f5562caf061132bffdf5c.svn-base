const { useSelector } = require('react-redux');

const useChannelSetting = () => {
  const channel = useSelector((state) => state.locale.selectedChannel);
  const channelSettings = useSelector(
    (state) => state.auth.session.ChannelSetting,
  );
  return channelSettings?.filter(
    (item) =>
      item.Channel.ChannelCode === channel.ChannelCode &&
      item.locations.LocationCode === channel.LocationCode,
  )[0];
};

export { useChannelSetting };
