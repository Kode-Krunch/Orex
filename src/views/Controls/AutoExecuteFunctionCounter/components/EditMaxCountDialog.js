import { Button, Dialog } from 'components/ui';
import React, { useState } from 'react';
import { FiMinus } from 'react-icons/fi';
import { IoMdAdd } from 'react-icons/io';

function EditMaxDurationDialog({
  isOpen,
  setIsOpen,
  maxDurationInSec,
  setMaxDurationInSec,
}) {
  /* STATES */
  const [durationInputInMin, setDurationInputInMin] = useState(
    parseInt(maxDurationInSec / 60),
  );

  /* EVENT HANDLERS */
  const handleClose = () => {
    try {
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} onRequestClose={handleClose}>
      <h5 className="mb-4 pb-2 border-b border-b-gray-700">Edit Duration</h5>
      <div className="flex justify-between items-center">
        <p className="text-white">Duration</p>
        <div className="mt-1 flex items-center gap-3 text-white">
          <Button
            icon={<FiMinus className="text-white" />}
            size="xs"
            onClick={() => {
              if (durationInputInMin > 1)
                setDurationInputInMin(durationInputInMin - 1);
            }}
            disabled={durationInputInMin === 1}
          />
          <>
            {durationInputInMin < 10
              ? `0${durationInputInMin}`
              : durationInputInMin}{' '}
            Min
          </>
          <Button
            icon={<IoMdAdd className="text-white" />}
            size="xs"
            onClick={() => {
              if (durationInputInMin < 61)
                setDurationInputInMin(durationInputInMin + 1);
            }}
            disabled={durationInputInMin === 59}
          />
        </div>
      </div>
      <div className="text-right mt-4 pt-4 border-t border-t-gray-700">
        <Button
          variant="solid"
          onClick={() => {
            setMaxDurationInSec(durationInputInMin * 60);
            handleClose();
          }}
        >
          Save
        </Button>
      </div>
    </Dialog>
  );
}

export default EditMaxDurationDialog;
