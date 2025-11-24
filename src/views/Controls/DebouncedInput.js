import React, { useState, useEffect } from 'react';
import { Badge, Dialog, Input, Tooltip } from 'components/ui';

const DebouncedInput = ({
  value: initialValue = '',
  onChange,
  debounce = 500,
  showSearchLabel = true,
  marginBottom = 'mb-4',
  ...props
}) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="flex justify-end">
      <div className={`flex items-center ${marginBottom}`}>
        {/* {showSearchLabel ?  : <></> */}
        <Input
          suffix
          {...props}
          value={value}
          onChange={(e) => {
            if (/^[0-9a-zA-Z\s]*$/.test(e.target.value)) {
              setValue(e.target.value);
            }
          }}
        />
      </div>
    </div>
  );
};

export default DebouncedInput;
