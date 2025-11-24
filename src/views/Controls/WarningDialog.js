import { Button, Dialog } from 'components/ui';
import React from 'react';

function WarningDialog({
  isDialogOpen,
  title,
  description,
  descClassName,
  submitButtonTitle,
  submitButtonColor,
  submitButtonSize,
  handleDialogSubmit,
  handleDialogClose,
  overlayClassName,
  secondaryDescription,
}) {
  return (
    <Dialog
      isOpen={isDialogOpen}
      onClose={handleDialogClose}
      onRequestClose={handleDialogClose}
      overlayClassName={overlayClassName}
    >
      <h5 className="mb-4">{title}</h5>
      <p className={descClassName}>{description}</p>
      <div className="flex justify-between items-center mt-6">
        <p>{secondaryDescription}</p>
        <Button
          variant="solid"
          size={submitButtonSize}
          color={submitButtonColor}
          onMouseDown={handleDialogSubmit}
        >
          {submitButtonTitle}
        </Button>
      </div>
    </Dialog>
  );
}

export default WarningDialog;
