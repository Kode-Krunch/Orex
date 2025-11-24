import React from 'react';

const QR_CODE_CONTAINER_CLASSNAMES =
  'border-dashed border-gray-500 border-2 rounded-lg p-3';

function QRCodeContainer({ children, size = 200 }) {
  return (
    <div
      className={`w-[${size}px] h-[${size}px] flex items-center justify-center ${QR_CODE_CONTAINER_CLASSNAMES} relative`}
    >
      {children}
    </div>
  );
}

export default QRCodeContainer;
