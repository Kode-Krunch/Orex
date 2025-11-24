import React from 'react';

function GroupGraph({
  group,
  consumedDuration,
  consumedPercentage,
  graphColor,
}) {
  return (
    <div className="grid grid-cols-12 items-center w-52 mb-1" key={group}>
      <span className="w-2">{group}</span>
      <div className="col-span-8 relative h-6">
        <div className="absolute h-full w-full border border-gray-600 rounded-md"></div>
        <div className="absolute h-full w-full p-0.5">
          <div
            className={`h-full rounded ${graphColor}`}
            style={{
              width: `${consumedPercentage}%`,
            }}
          ></div>
        </div>
        <div className="absolute h-full w-full flex justify-center items-center text-xs text-gray-100">
          {consumedDuration}
        </div>
      </div>
      <span className="col-span-3 text-xs text-right">
        {consumedPercentage}%
      </span>
    </div>
  );
}

export default GroupGraph;
