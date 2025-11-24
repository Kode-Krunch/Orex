import React from 'react';
import ChannelContentDetailCard from './ChannelContentDetailCard';

function Content({ channelWiseContents, selectedTime, date }) {
  return (
    <div className="grid grid-cols-1 gap-8">
      {channelWiseContents.map((curChannelContents) => (
        <ChannelContentDetailCard
          {...curChannelContents}
          selectedTime={selectedTime}
          date={date}
        />
      ))}
    </div>
  );
}

export default Content;
