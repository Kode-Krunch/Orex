import { Input, Radio } from 'components/ui';
import React from 'react';
import { ntcDescriptionTypesEnum } from 'views/Scheduling/Scheduler/enum';

function Description({
  descriptionType,
  setDescriptionType,
  description,
  setDescription,
}) {
  return (
    <div>
      <p className="text-sm mb-1">Description</p>
      <Radio.Group
        value={descriptionType}
        onChange={(value) => setDescriptionType(value)}
      >
        <Radio
          value={ntcDescriptionTypesEnum.ORIGINAL}
          className="text-gray-300"
        >
          Original
        </Radio>
        <Radio value={ntcDescriptionTypesEnum.PARENT} className="text-gray-300">
          Parent
        </Radio>
        <Radio value={ntcDescriptionTypesEnum.CUSTOM} className="text-gray-300">
          Custom
        </Radio>
      </Radio.Group>
      {descriptionType === ntcDescriptionTypesEnum.CUSTOM && (
        <Input
          placeholder="Description"
          size="sm"
          className="mt-1"
          value={description}
          autoFocus={true}
          onChange={(event) => setDescription(event.target.value)}
        />
      )}
    </div>
  );
}

export default Description;
