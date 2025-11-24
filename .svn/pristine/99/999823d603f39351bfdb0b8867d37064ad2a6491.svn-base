import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function CustomDataTable(props) {
  return (
    <DataTable value={props.tableData} scrollable>
      {Object.keys(props.tableData[0]).map((column, index) => {
        return (
          <Column
            field={column}
            header={column}
            key={`${column}-${index}`}
          ></Column>
        );
      })}
    </DataTable>
  );
}

export default CustomDataTable;
