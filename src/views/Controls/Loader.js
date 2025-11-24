import { Spinner } from 'components/ui';
import React from 'react';

function Loader({ showLoader, animation }) {
  return (
    <>
      {showLoader ? (
        <div className="dialog-overlay flex justify-center items-center z-50">
          {animation ? animation : <Spinner size="3.25rem" />}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Loader;
