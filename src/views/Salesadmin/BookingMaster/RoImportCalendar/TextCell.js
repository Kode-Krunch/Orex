import React from 'react';
import { CELL_HEIGHT } from './constants';

function TextCell({ value }) {
  return (
    <div
      className="flex items-center justify-center text-xs text-white"
      style={{ height: CELL_HEIGHT }}
    >
      {value}
    </div>
  );
}

export default TextCell;
