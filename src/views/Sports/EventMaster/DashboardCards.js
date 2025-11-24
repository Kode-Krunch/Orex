import { Avatar, Card } from 'components/ui';
import React from 'react';

function DashboardCards({
  title,
  desc,
  value,
  icon,
  iconColor,
  borderColor,
  bgColor,
  onClick,
}) {
  return (
    <Card
      className={`${borderColor} ${bgColor}`}
      bodyClass="py-3 px-4 h-full flex items-center gap-4"
      onClick={typeof onClick === 'function' ? onClick : undefined}
    >
      <Avatar size={48} className={`text-white ${iconColor}`} icon={icon} />
      <div className="w-full">
        <div className="flex gap-1.5 items-end justify-between mb-2">
          <p className="font-semibold text-[1.1rem] text-gray-300">{title}</p>
          <h2 className="font-bold leading-none text-white">{value}</h2>
        </div>
        <p className="text-gray-400">{desc}</p>
      </div>
    </Card>
  );
}

export default DashboardCards;
