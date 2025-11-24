import classNames from 'classnames';
import React from 'react';

function PaymentGatewayBtn({
  imgSrc,
  imgAlt,
  imgHeight = 25,
  active,
  onClick,
  containerClassNames,
}) {
  return (
    <div
      className={classNames(
        'rounded-full px-4 py-2 flex items-center justify-center hover:opacity-80 hover:cursor-pointer',
        active
          ? 'bg-gray-100 shadow-[0_0_10px_0_rgba(13,148,136,1)] border-[2px] border-teal-600'
          : 'bg-gray-100 opacity-70',
        containerClassNames,
      )}
      onClick={onClick}
    >
      <img src={imgSrc} alt={imgAlt} style={{ height: imgHeight }} />
    </div>
  );
}

export default PaymentGatewayBtn;
