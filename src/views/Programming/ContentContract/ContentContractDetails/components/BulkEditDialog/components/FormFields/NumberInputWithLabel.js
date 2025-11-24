import { Input } from 'components/ui';
import React from 'react';
import { handleNumberInputChange } from 'views/Controls/GLOBALFUNACTION';

function NumberInputWithLabel({
  className,
  label,
  value,
  onChange,
  placeholder,
  disabled,
  required,
  suffix,
}) {
  return (
    <div className={className}>
      <p className="text-gray-200 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </p>
      <Input
        placeholder={placeholder}
        size="sm"
        suffix={suffix}
        value={value}
        onChange={(event) => handleNumberInputChange(event, onChange)}
        disabled={disabled}
      />
    </div>
  );
}

export default NumberInputWithLabel;
