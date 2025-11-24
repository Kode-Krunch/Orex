import React from 'react';
import { CELL_HEIGHT } from './constants';

function SelectorCell({ options, value, onChange, name }) {
  return (
    <div styles={{ height: CELL_HEIGHT }}>
      <select
        name={name}
        value={value ?? ''}
        onChange={onChange}
        className="w-full h-full bg-transparent border border-gray-600 rounded-md px-1 py-1.5 focus:border-teal-500 focus:border-2 text-sm text-white"
      >
        <option value={''} disabled selected hidden>
          Select
        </option>
        {options.length === 0 ? (
          <option
            disabled={true}
            className="bg-gray-700 border-gray-600 hover:!bg-gray-600 text-sm text-white"
          >
            No options to select
          </option>
        ) : (
          options.map((option) => (
            <option
              value={option.value}
              key={option.value}
              className="bg-gray-700 border-gray-600 hover:!bg-gray-600 text-sm text-white"
            >
              {option.label}
            </option>
          ))
        )}
      </select>
    </div>
  );
}

export default SelectorCell;
