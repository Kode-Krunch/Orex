import { Slider } from '@mui/material';
import React from 'react';
import { getHexColorWithOpacity } from './GLOBALFUNACTION';

function MuiRangeInput({
  color,
  trackHeight = '5px',
  thumbDiameter = '15px',
  ...rest
}) {
  return (
    <Slider
      sx={{
        color: color, // Hex color for the slider
        '& .MuiSlider-thumb': {
          backgroundColor: color, // Thumb color
          height: thumbDiameter,
          width: thumbDiameter,
        },
        '& .MuiSlider-rail': {
          backgroundColor: '#CCCCCC', // Rail color
          height: trackHeight,
        },
        '& .MuiSlider-track': {
          backgroundColor: color, // Track color
          height: trackHeight,
        },
        '& .MuiSlider-thumb:hover, & .MuiSlider-thumb.Mui-focusVisible': {
          boxShadow: `0px 0px 0px 8px ${getHexColorWithOpacity(color, 0.2)}`, // Focus/hover effect
        },
      }}
      {...rest}
    />
  );
}

export default MuiRangeInput;
