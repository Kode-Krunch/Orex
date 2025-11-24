import { Loading, MediaSkeleton } from 'components/shared';
import { Avatar, Card } from 'components/ui';
import React from 'react';
import NumberFormat from 'react-number-format';

function StatisticCard(props) {
  const { icon, avatarClass, label, value, loading, Function, IsFunction } = props;

  const avatarSize = 55;

  return (
    <Card bordered
      className='cursor-pointer'
      onClick={() => {
        if (IsFunction) {
          Function(label);
        } else {
        }
      }}
    >
      <Loading
        loading={loading}
        customLoader={
          <MediaSkeleton
            avatarProps={{
              className: 'rounded',
              width: avatarSize,
              height: avatarSize,
            }}
          />
        }
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Avatar className={avatarClass} size={avatarSize} icon={icon} />
            <div>
              <span>{label}</span>
              <h3>
                <NumberFormat
                  displayType="text"
                  value={value}
                  thousandSeparator
                />
              </h3>
            </div>
          </div>
        </div>
      </Loading>
    </Card>
  );
}

export default StatisticCard;
