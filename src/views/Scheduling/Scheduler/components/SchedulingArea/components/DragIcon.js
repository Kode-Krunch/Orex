import React from 'react';

function DragIcon({ orientation }) {
  return (
    <div className={`flex gap-1 ${orientation === 'vertical' && 'flex-col'}`}>
      <div className="w-[3px] h-[3px] rounded-full bg-gray-500"></div>
      <div className="w-[3px] h-[3px] rounded-full bg-gray-500"></div>
      <div className="w-[3px] h-[3px] rounded-full bg-gray-500"></div>
      <div className="w-[3px] h-[3px] rounded-full bg-gray-500"></div>
      <div className="w-[3px] h-[3px] rounded-full bg-gray-500"></div>
      <div className="w-[3px] h-[3px] rounded-full bg-gray-500"></div>
      <div className="w-[3px] h-[3px] rounded-full bg-gray-500"></div>
      <div className="w-[3px] h-[3px] rounded-full bg-gray-500"></div>
    </div>
  );
}

export default DragIcon;
