import { Input, InputGroup } from 'components/ui';
import React from 'react';
import SelectXs from 'views/Controls/SelectXs/SelectXs';
import { runTypeOptions } from '../../../../constants';
import { handleNumberInputChange } from 'views/Controls/GLOBALFUNACTION';

function NextRunWithin({
  className,
  label,
  inputPlaceholder,
  typeValue,
  typeOnChange,
  typeMenuPlacement,
  runWithinValue,
  runWithinOnChange,
  disabled,
}) {
  return (
    <div className={className}>
      <p className="text-gray-200 mb-1">{label}</p>
      <InputGroup className="flex">
        <Input
          placeholder={inputPlaceholder}
          size="sm"
          className="h-full"
          value={runWithinValue}
          onChange={(event) =>
            handleNumberInputChange(event, runWithinOnChange)
          }
          disabled={disabled}
        />
        <SelectXs
          placeholder="Type"
          options={runTypeOptions}
          className="w-full"
          value={typeValue}
          onChange={typeOnChange}
          menuPlacement={typeMenuPlacement}
          blurInputOnSelect={true}
          styles={{
            valueContainer: (baseStyles) => ({
              ...baseStyles,
              paddingRight: 0,
            }),
          }}
          isDisabled={disabled}
        />
      </InputGroup>
    </div>
  );
}

export default NextRunWithin;
