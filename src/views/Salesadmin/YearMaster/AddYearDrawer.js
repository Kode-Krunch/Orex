// This component is used in YearTaxDetails.js
import { Button, Drawer } from 'components/ui';
import React, { useRef } from 'react';
import { HiOutlinePencil, HiPlusCircle } from 'react-icons/hi';
import DrawerFooter from 'views/Controls/DrawerFooter';
import YearMasterEdit from './YearMasterEdit';

function AddYearDrawer({
  editData,
  setMessage,
  isOpen,
  setlog,
  onDrawerClose,
  submitCallback,
}) {
  /* STATES */
  const formikRef = useRef();

  const formSubmit = () => {
    formikRef.current?.submitForm();
  };
  return (
    <Drawer
      title={
        editData.Description ? (
          <p className="text-xl font-medium   flex ">
            <center>
              <Button
                size="xs"
                variant="twoTone"
                icon={<HiOutlinePencil />}
              ></Button>
            </center>
            &nbsp;&nbsp; Year Master
          </p>
        ) : (
          <p className="text-xl font-medium   flex ">
            <center>
              <Button
                size="xs"
                variant="twoTone"
                icon={<HiPlusCircle />}
              ></Button>
            </center>
            &nbsp;&nbsp;Year Master
          </p>
        )
      }
      isOpen={isOpen}
      onClose={onDrawerClose}
      onRequestClose={onDrawerClose}
      width={
        window.screen.width > 400
          ? window.screen.width / 3
          : window.screen.width / 1.5
      }
      footer={
        <DrawerFooter onCancel={onDrawerClose} onSaveClick={formSubmit} />
      }
    >
      <YearMasterEdit
        ref={formikRef}
        onDrawerClose={onDrawerClose}
        editData={editData}
        setMessage={setMessage}
        setlog={setlog}
        submitCallback={submitCallback}
      />
    </Drawer>
  );
}

export default AddYearDrawer;
