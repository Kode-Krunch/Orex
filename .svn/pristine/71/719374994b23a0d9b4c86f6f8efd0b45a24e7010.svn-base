import { Button, Dialog, Input } from 'components/ui';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  apiGetStarCastTypemaster,
  Poststarcasttype,
} from 'services/ProgrammingService';
import {
  hideCursorLoader,
  openNotification,
  showCursorLoader,
} from 'views/Controls/GLOBALFUNACTION';

function AddStarCastTypeDialog({ isOpen, setIsOpen, setStarCastTypeList }) {
  /* REDUX */
  const token = useSelector((state) => state.auth.session.token);

  /* STATES */
  const [starCastType, setStarCastType] = useState('');

  /* EVENT HANDLERS */
  const onDialogClose = () => setIsOpen(false);

  const handleAdd = async () => {
    try {
      showCursorLoader();
      const response = await Poststarcasttype(
        {
          StarCastTypeName: starCastType,
          IsActive: 1,
        },
        token,
      );
      if (response.status === 200) {
        const starCastTypeListResponse = await apiGetStarCastTypemaster();
        const formattedOptions = starCastTypeListResponse.data.map(
          (option) => ({
            value: option.StarCastTypeCode,
            label: option.StarCastTypeName,
          }),
        );
        setStarCastTypeList(formattedOptions);
        openNotification('success', 'Star Cast Type added successfully');
      } else if (response.status === 204)
        openNotification('info', 'Data Already Exists');
      else throw new Error();
    } catch (error) {
      console.error(error);
      openNotification(
        'danger',
        'Something went wrong while adding star cast type',
      );
    } finally {
      onDialogClose();
      hideCursorLoader();
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <h5 className="mb-4">Add Star Cast Type</h5>
      <div className="mb-1">
        Star Cast Type <span className="text-red-500">*</span>
      </div>
      <Input
        onChange={(event) => setStarCastType(event.target.value)}
        size="sm"
        placeholder="Type"
      />
      <div className="text-right mt-6">
        <Button variant="solid" disabled={!starCastType} onClick={handleAdd}>
          Add
        </Button>
      </div>
    </Dialog>
  );
}

export default AddStarCastTypeDialog;
