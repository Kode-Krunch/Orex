import { Button, Tooltip } from 'components/ui';
import React from 'react';
import { MdOutlineLibraryAddCheck } from 'react-icons/md';

function SelectAllButton({ isAllRowsSelected, handleSelectAll }) {
  return (
    <Tooltip title={isAllRowsSelected ? 'Un-select all' : 'Select All'}>
      <Button
        className={`hover:!bg-teal-700 transition-all !h-8 !w-8 ${
          isAllRowsSelected && '!bg-teal-700'
        }`}
        variant="plain"
        size="sm"
        icon={<MdOutlineLibraryAddCheck className="text-[1.2rem]" />}
        onClick={handleSelectAll}
      />
    </Tooltip>
  );
}

export default SelectAllButton;
