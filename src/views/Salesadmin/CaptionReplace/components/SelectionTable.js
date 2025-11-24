import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React from 'react';

export const SelectionTable = ({
  data,
  columns,
  selectedItem,
  setselectedItem,
}) => {
  const OnSelectionChange = (e) => {
    console.log(e.value);
    setselectedItem(e.value);
  };

  return (
    <DataTable
      scrollable
      scrollHeight="400px"
      paginator
      rows={10}
      // rowsPerPageOptions={[10, 20, 30, 40]}
      value={data}
      size="small"
      tableStyle={{ minWidth: '50rem' }}
      selectionMode="checkbox"
      selection={selectedItem}
      onSelectionChange={OnSelectionChange}
      dataKey="Id"
    >
      <Column field="srno" header="SrNo"></Column>
      <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
      {columns.map((item) => (
        <Column
          field={item.accessorKey}
          filter
          // sortable
          filterPlaceholder="Search.."
          header={item.header}
        ></Column>
      ))}
    </DataTable>
  );
};
