import React from 'react';

function TypeCounts({ name, value }) {
  return (
    <p className="text-gray-300 text-[15px] flex justify-between">
      {name}
      <span className="font-semibold text-white">{value}</span>
    </p>
  );
}

export default TypeCounts;
