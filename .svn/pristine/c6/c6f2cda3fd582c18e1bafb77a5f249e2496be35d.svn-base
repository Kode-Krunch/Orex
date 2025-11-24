import { Input, Radio } from 'components/ui';
import React from 'react';
import {
  autoCompleteTime,
  getFormattedTime,
} from 'views/Controls/GLOBALFUNACTION';
import { ntcDurationTypesEnum } from 'views/Scheduling/Scheduler/enum';

function Duration({ durationType, setDurationType, duration, setDuration }) {
  return (
    <div>
      <p className="text-sm mb-1">Duration</p>
      <Radio.Group
        value={durationType}
        onChange={(value) => setDurationType(value)}
      >
        <Radio value={ntcDurationTypesEnum.ORIGINAL} className="text-gray-300">
          Original
        </Radio>
        <Radio value={ntcDurationTypesEnum.PARENT} className="text-gray-300">
          Parent
        </Radio>
        <Radio value={ntcDurationTypesEnum.CUSTOM} className="text-gray-300">
          Custom
        </Radio>
      </Radio.Group>
      {durationType === ntcDurationTypesEnum.CUSTOM && (
        <Input
          placeholder="HH:MM:SS:FF"
          size="sm"
          className="mt-1"
          value={duration}
          autoFocus={true}
          onChange={(event) => setDuration(getFormattedTime(event, duration))}
          onBlur={() => setDuration(autoCompleteTime(duration))}
        />
      )}
    </div>
  );
}

export default Duration;
