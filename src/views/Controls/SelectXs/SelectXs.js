import { Select } from 'components/ui';
import React from 'react';
import './style.css';

const SelectXs = React.memo(
  React.forwardRef((props, ref) => {
    /* CONSTANTS */
    const { styles, size, placeholder, ...rest } = props;

    return (
      <Select
        size="sm"
        {...rest}
        styles={{
          valueContainer: (baseStyles) => ({
            ...baseStyles,
            padding: '2px 5px',
          }),
          input: (baseStyles) => ({
            ...baseStyles,
            color: 'white',
          }),
          control: (baseStyles) => ({
            ...baseStyles,
            minHeight: '30px',
          }),
          ...styles,
        }}
        ref={ref}
        placeholder={placeholder ? placeholder : 'Select'}
      ></Select>
    );
  }),
);

export default SelectXs;
