import React from 'react';

function TotalField({ label, value, className }) {
  return (
    <div className={`flex flex-col h-full ${className}`}>
      <p className="text-gray-200 mb-1">{label}</p>
      <h4 className="grow flex items-center border-b border-b-teal-500 px-2 mb-1">
        {value}
      </h4>
    </div>
  );
}

export default TotalField;
