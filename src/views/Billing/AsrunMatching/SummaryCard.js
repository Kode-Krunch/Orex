import React from 'react';
import { Card, Avatar } from 'components/ui';
import NumberFormat from 'react-number-format';
import './index.css';

function SummaryCard({
  id,
  className,
  label,
  value,
  icon,
  avatar,
  active,
  setActiveSummary,
}) {
  return (
    <Card
      clickable
      onClick={() => {
        setActiveSummary(id);
      }}
      className={`${className} dark:hover:!bg-gray-700 hover:!bg-gray-300 transition ${
        active ? ' dark:!bg-gray-700 !bg-[#fff]' : '!bg-transparent'
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {icon && (
            <Avatar
              className={avatar.className}
              size="md"
              icon={icon}
              shape={avatar.shape}
            />
          )}
          <div>
            <span>{label}</span>
            <h3>
              {typeof value === 'number' ? (
                <NumberFormat
                  displayType="text"
                  value={value}
                  thousandSeparator
                />
              ) : (
                <>{value}</>
              )}
            </h3>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default SummaryCard;
