import { Button, Dialog } from 'components/ui';
import React, { useState } from 'react';
import { IoLogoTableau } from 'react-icons/io5';
import SelectableTable from './SelectableTable';

function EInvoiceDialog({
  isOpen,
  setIsOpen,
  tableData,
  columns,
  setShowLoader,
  currencySymbol,
  bills,
}) {
  /* STATES */
  const [globalFilter, setGlobalFilter] = useState('');

  /* EVENT HANDLERS */
  const onDialogClose = () => setIsOpen(false);
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      width={'85vw'}
      height={'90vh'}
      className="-mt-8 max-w-[85vw]"
      contentClassName="pt-3 h-full flex flex-col"
    >
      <h5 className="mb-4">E-Invoice</h5>
      <div className="grow">
        <SelectableTable
          tableColumns={columns}
          data={tableData}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          type="eInvoice"
          setShowLoader={setShowLoader}
          additionalData={{
            bills: bills,
          }}
          currencySymbol={currencySymbol}
        />
      </div>
      <div className="text-right mt-6">
        <Button variant="solid" icon={<IoLogoTableau />}>
          Generate
        </Button>
      </div>
    </Dialog>
  );
}

export default EInvoiceDialog;
