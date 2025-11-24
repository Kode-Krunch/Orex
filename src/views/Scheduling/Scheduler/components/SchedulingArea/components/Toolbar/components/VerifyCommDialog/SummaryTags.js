import React from 'react';

function SummaryTags({ label, value, badgeColor }) {
  return (
    <div className="w-max  flex gap-1 items-center rounded-full bg-gray-700 px-3 py-1">
      <div className={`h-2 w-2 rounded-full ${badgeColor}`}></div>
      <p className="text-xs font-semibold flex gap-2 items-center text-gray-300">
        <span>{label}:</span>
        <span className="text-sm ">{value}</span>
      </p>
    </div>
  );
}

export default SummaryTags;
