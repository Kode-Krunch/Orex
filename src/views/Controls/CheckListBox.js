import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { forwardRef, useState, useEffect } from 'react';

export const CheckListBox = (props) => {
  const [selectedItem, setselectedItem] = useState(null);
  const [rowClick, setRowClick] = useState(true);
  //console.log('props.data:', props.data)
  //console.log('props.checkedcode:', props.checkedList)
  const matchedArray = props.checkedList.map((code) =>
    props.data.find((item) => item.code === code),
  );
  //console.log('matchedArray', matchedArray)

  const OnSelectionChange = (e) => {
    //console.log('OnSelectionChange', e.value)
    setselectedItem(e.value);
    if (props.onSelectionChange) {
      // If a callback function is provided, invoke it with the selected items
      props.onSelectionChange(e.value);
    }
  };

  useEffect(() => {
    const matchedArray = props.checkedList.map((code) =>
      props.data.find((item) => item.code === code),
    );
    //console.log('matchedArray', matchedArray)
    setselectedItem(matchedArray);
  }, [props.checkedList, props.data]);

  return (
    <DataTable
      scrollable
      scrollHeight="400px"
      value={props.data}
      size="small"
      selectionMode={rowClick ? null : 'checkbox'}
      selection={selectedItem}
      onSelectionChange={OnSelectionChange}
      // dataKey="code"
    >
      <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
      <Column
        field="name"
        filter
        filterPlaceholder="Search.."
        headerStyle={{ fontSize: 20 }}
        header={props.hdr}
      ></Column>
    </DataTable>
  );
};
