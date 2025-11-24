import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { forwardRef, useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

const ChannelSelecttion = ({ List, selectedList, setSelectedList }) => {
  const [updateList, setUpdateList] = useState([]);
  const mode = useSelector((state) => state.theme.mode);
  useEffect(() => {
    const updatedList = List.map((channel) => ({
      ...channel,
      value: `${channel.LocationCode}-${channel.ChannelCode}`,
      label: `${channel.LocationName}-${channel.ChannelName}`,
    }));
    setUpdateList(updatedList);
  }, []);

  useEffect(() => {
    const updatedList = List.map((channel) => ({
      ...channel,
      value: `${channel.LocationCode}-${channel.ChannelCode}`,
      label: `${channel.LocationName}-${channel.ChannelName}`,
    }));
    setUpdateList(updatedList);
  }, [List]);

  useEffect(() => {
    const updatedList = selectedList.map((channel) => ({
      ...channel,
      value: `${channel.LocationCode}-${channel.ChannelCode}`,
    }));
    setSelectedList(updatedList);
  }, []);

  return (
    <div>
      <DataTable
        scrollable
        scrollHeight="400px"
        virtualScrollerOptions={{ itemSize: 46 }}
        size={'small'}
        value={updateList}
        selectionMode={'checkbox'}
        selection={selectedList}
        onSelectionChange={(e) => setSelectedList(e.value)}
        dataKey="value"
        // tableStyle={{ minWidth: '50rem' }}
      >
        <Column
          selectionMode="multiple"
          style={{
            height: 50,
            border: '1px solid transparent',
            borderBottom: '2px solid #374151',
            borderStyle: 'dashed',
          }}
          // style={{ color: 'black', backgroundColor: 'white' }}
        ></Column>
        <Column
          field="label"
          header="Select Channel"
          style={{
            height: 50,
            border: '1px solid transparent',
            borderBottom: '2px solid #374151',
            borderStyle: 'dashed',
          }}
          bodyStyle={
            mode == 'dark'
              ? {}
              : {
                  border: '1px solid #e5e7eb',
                  color: 'black',
                }
          }
        ></Column>
      </DataTable>
    </div>
  );
};

export default ChannelSelecttion;
