import { Input } from 'components/ui';
import React from 'react';
import {
  autoCompleteTime,
  getFormattedTime,
} from 'views/Controls/GLOBALFUNACTION';

function OffsetStartTime({ offsetStartTime, setOffsetStartTime }) {
  return (
    <div>
      <p className="text-sm mb-1">Offset Time</p>
      <Input
        placeholder="HH:MM:SS:FF"
        size="sm"
        className="mt-1"
        value={offsetStartTime}
        onChange={(event) =>
          setOffsetStartTime(getFormattedTime(event, offsetStartTime))
        }
        onBlur={() => setOffsetStartTime(autoCompleteTime(offsetStartTime))}
      />
    </div>
  );
}

export default OffsetStartTime;
