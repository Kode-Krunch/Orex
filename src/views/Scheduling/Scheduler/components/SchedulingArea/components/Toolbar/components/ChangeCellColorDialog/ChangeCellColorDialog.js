import { Button, Dialog, Input, InputGroup, Select } from 'components/ui';
import React, { useContext, useEffect, useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import SchedulerContext from 'views/Scheduling/Scheduler/context/SchedulerContext';
import { operationTypesEnum } from 'views/Scheduling/Scheduler/enum';
import ResetCellColor from './ResetCellColor';

/* CONSTANTS */
const COLUMN_OPTIONS = [
  { value: 'Event_Name', label: 'Event_Name' },
  { value: 'Agency', label: 'Agency' },
  { value: 'Client', label: 'Client' },
  { value: 'Brand', label: 'Brand' },
  { value: 'Product', label: 'Product' },
];

function ChangeCellColorDialog({ isOpen, setIsOpen }) {
  /* CONTEXT */
  const { executeOperation, customCellColor } = useContext(SchedulerContext);

  /* STATES */
  const [selectedCellType, setSelectedCellType] = useState(null);
  const [cellWiseColor, setCellWiseColor] = useState({});
  const [filteredCellWiseColor, setFilteredCellWiseColor] = useState({});
  const [searchInputValue, setSearchInputValue] = useState('');
  const [isResetChangesDialogOpen, setIsResetChangesDialogOpen] =
    useState(false);

  /* USE EFFECTS */
  useEffect(() => {
    try {
      if (selectedCellType && selectedCellType.value) {
        const newCellWiseColor = { ...customCellColor[selectedCellType.value] };
        setCellWiseColor({ ...newCellWiseColor });
        setFilteredCellWiseColor({ ...newCellWiseColor });
      }
    } catch (error) {
      console.error(error);
    }
  }, [selectedCellType, customCellColor]);

  useEffect(() => {
    if (searchInputValue === '') {
      setFilteredCellWiseColor({ ...cellWiseColor });
    }
  }, [searchInputValue]);

  /* EVENT HANDLERS */
  const handleClose = () => {
    setSelectedCellType(null);
    setCellWiseColor({});
    setFilteredCellWiseColor({});
    setSearchInputValue('');
    setIsOpen(false);
  };

  const handleSearchByEnterKey = (event) => {
    if (event.key.toLowerCase() === 'enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    try {
      let newFilteredCellWiseColor = {};
      Object.keys(cellWiseColor).forEach((cell) => {
        if (cell.toLowerCase().includes(searchInputValue.toLowerCase())) {
          newFilteredCellWiseColor[cell] = cellWiseColor[cell];
        }
      });
      setFilteredCellWiseColor({ ...newFilteredCellWiseColor });
    } catch (error) {
      console.error(error);
      openNotification('danger', 'Something went wrong while searching');
    }
  };

  const handleApply = () => {
    try {
      executeOperation({
        operation: operationTypesEnum.CHANGE_CELL_COLOR,
        customCellColorParam: {
          ...customCellColor,
          [selectedCellType.value]: cellWiseColor,
        },
      });
      handleClose();
      openNotification('success', 'Changes applied successfully');
    } catch (error) {
      console.error(error);
      openNotification('danger', 'Something went wrong while applying changes');
    }
  };

  return (
    <>
      <Dialog
        isOpen={isOpen}
        onClose={handleClose}
        onRequestClose={handleClose}
        contentClassName="mt-8"
      >
        <div className="flex flex-col h-full justify-between">
          <h5 className="mb-4">Customize Cell Color</h5>
          <div className="mb-4">
            <p className="text-gray-200 mb-1">
              Cell Type <span className="text-red-500">*</span>
            </p>
            <InputGroup className="mb-3 flex">
              <Select
                placeholder="Type"
                className="w-[45%] h-[38px]"
                options={COLUMN_OPTIONS}
                value={selectedCellType}
                onChange={(event) => setSelectedCellType(event)}
                styles={{
                  valueContainer: (baseStyles) => ({
                    ...baseStyles,
                    paddingRight: 0,
                  }),
                }}
                defaultMenuIsOpen={true}
              />
              <Input
                placeholder="Search"
                size="sm"
                className="h-[38px]"
                onChange={(event) => setSearchInputValue(event.target.value)}
                value={searchInputValue}
                onKeyDown={handleSearchByEnterKey}
              />
              <Button
                icon={<IoMdSearch />}
                className="h-[40px] px-2"
                size="sm"
                onClick={handleSearch}
              />
            </InputGroup>
          </div>
          {Object.keys(filteredCellWiseColor).length > 0 && (
            <div
              className="max-h-[26rem] overflow-y-auto flex flex-col border border-gray-600 rounded-md px-3"
              style={{ backgroundColor: 'rgb(43 51 68 / 56%)' }}
            >
              {Object.keys(filteredCellWiseColor).map((cell, index) => (
                <div
                  className={`flex gap-3 justify-between items-center ${index !== Object.keys(filteredCellWiseColor).length - 1 &&
                    'border-b border-b-gray-600'
                    }`}
                  key={cell}
                >
                  <p className="text-gray-200 w-full py-3">{cell}</p>
                  <Input
                    size="sm"
                    type="color"
                    className="w-1/2 p-0 border-none !h-7 hover:cursor-pointer hover:opacity-80"
                    value={filteredCellWiseColor[cell]}
                    onChange={(event) => {
                      setCellWiseColor((prevState) => ({
                        ...prevState,
                        [cell]: event.target.value,
                      }));
                      setFilteredCellWiseColor((prevState) => ({
                        ...prevState,
                        [cell]: event.target.value,
                      }));
                    }}
                  />
                </div>
              ))}
            </div>
          )}
          <div className="text-right mt-6">
            <Button
              variant="plain"
              onClick={() => setIsResetChangesDialogOpen(true)}
              className="mr-4"
            >
              Reset
            </Button>
            <Button variant="solid" onClick={handleApply}>
              Apply
            </Button>
          </div>
        </div>
      </Dialog>
      <ResetCellColor
        closeParentDialog={handleClose}
        isOpen={isResetChangesDialogOpen}
        setIsOpen={setIsResetChangesDialogOpen}
      />
    </>
  );
}

export default ChangeCellColorDialog;
