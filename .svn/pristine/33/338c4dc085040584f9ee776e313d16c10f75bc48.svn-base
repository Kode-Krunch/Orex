import React from 'react';

function ConsumptionCard({ title, total, consumed, balance }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-semibold text-gray-200 border-b border-b-gray-700 pb-0.5 mb-1">
        {title}
      </span>
      <div className="flex gap-3 items-center text-gray-300">
        <div className="flex flex-col items-center">
          <span>Total</span>
          <span className="font-semibold text-teal-500">{total}</span>
        </div>
        <div className="flex h-full items-center justify-center text-gray-400 text-base">
          -
        </div>
        <div className="flex flex-col items-center">
          <span>Consumed</span>
          <span className="font-semibold text-teal-500">{consumed}</span>
        </div>
        <div className="flex h-full items-center justify-center text-gray-400 text-base">
          =
        </div>
        <div className="flex flex-col items-center">
          <span>Balance</span>
          <span className="font-semibold text-teal-500">{balance}</span>
        </div>
      </div>
    </div>
  );
}

export default ConsumptionCard;
