import React from 'react';

function Segments({ segments }) {
  return (
    <div className="rounded-lg border border-gray-700 flex-col">
      {segments.map((row) => (
        <div className="py-2 px-3 border-b border-gray-700 text-white">
          {row.Event_Name}
        </div>
      ))}
    </div>
  );
}

export default Segments;
