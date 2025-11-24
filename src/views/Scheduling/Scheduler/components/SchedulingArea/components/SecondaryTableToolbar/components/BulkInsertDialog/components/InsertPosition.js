import { Radio } from 'components/ui';
import React from 'react';
import { bulkInsertPositionEnum } from 'views/Scheduling/Scheduler/enum';

function InsertPosition({ insertPosition, setInsertPosition }) {
  return (
    <div>
      <p className="text-sm mb-1">Insert At</p>
      <Radio.Group
        value={insertPosition}
        onChange={(value) => setInsertPosition(value)}
      >
        <Radio
          value={bulkInsertPositionEnum.START}
          className="mr-6 text-gray-300"
        >
          Start
        </Radio>
        <Radio value={bulkInsertPositionEnum.END} className="text-gray-300">
          End
        </Radio>
      </Radio.Group>
    </div>
  );
}

export default InsertPosition;
