import { TimeInput } from 'components/ui';
import React from 'react';

function StartEndTime({ time, setTime }) {
  return (
    <div className="flex justify-between gap-4">
      <div className="w-full">
        <p className="text-white text-sm mb-1">Start Time</p>
        <TimeInput
          size="sm"
          value={time.start}
          onChange={(date) => setTime({ ...time, start: date })}
        />
      </div>
      <div className="w-full">
        <p className="text-white text-sm mb-1">End Time</p>
        <TimeInput
          size="sm"
          value={time.end}
          onChange={(date) => setTime({ ...time, end: date })}
        />
      </div>
    </div>
  );
}

export default StartEndTime;
