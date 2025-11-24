// DataTableComponent.js
import React from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Button, Switcher, Tooltip, Input } from 'components/ui';
import { HiPlusCircle } from 'react-icons/hi';
import { FaFileExport } from 'react-icons/fa';
import { ExportxlswithColor } from './ExportxlswithColor';
import { useSelector } from 'react-redux';
import './Displaytable.css';
/* COMPONENTS */
export const headerExtra = (
  globalFilter,
  setGlobalFilter,
  setAddNew,
  addNew,
  addNewRecord,
  DataName,
  setDataName,
  name,
  data,
  columns,
) => {
  return (
    <span className="flex items-center">
      {!addNew && (
        <>
          <span className="mr-1 mt-5 font-semibold"> &nbsp;</span>
          <Input
            type="text"
            size="sm"
            value={globalFilter}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[0-9a-zA-Z:.+/\s]*$/.test(value) || value === '') {
                setGlobalFilter(value);
              }
            }}
            placeholder={`Search..`}
            className="p-inputtext-sm"
          />
          &nbsp;
        </>
      )}
      <Tooltip title="Export">
        <Button
          size="sm"
          onClick={() =>
            ExportxlswithColor(
              false,
              false,
              0,
              0,
              true,
              data,
              name,
              columns,
              false,
            )
          }
        >
          <FaFileExport />
        </Button>
      </Tooltip>
      &nbsp;
      <span className="mr-1 font-semibold">
        <Button
          block
          variant="solid"
          size="sm"
          icon={<HiPlusCircle />}
          onClick={() => setAddNew(true)}
        >
          New {name}
        </Button>
      </span>
      {addNew && (
        <>
          <br />
          <span className="p-input-icon-right">
            <i className="pi pi-check" onClick={addNewRecord} />
            <Input
              size="sm"
              maxLength="20"
              value={DataName}
              placeholder={`Add ${name}`}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[0-9a-zA-Z:.+/\s]*$/.test(value) || value === '') {
                  setDataName(value);
                }
              }}
              type="text"
              className="p-inputtext-sm"
            />
          </span>
        </>
      )}
    </span>
  );
};

const SwitchButton = ({ checked, onToggle }) => (
  <div>
    <Switcher checked={checked} onChange={onToggle} />
  </div>
);

const textEditor = (options) => (
  <Input
    type="text"
    size="sm"
    maxLength="20"
    value={options.value}
    onChange={(e) => {
      const value = e.target.value;
      if (/^[0-9a-zA-Z:.+/\s]*$/.test(value) || value === '') {
        options.editorCallback(value);
      }
    }}
  />
);

const DisplaytablewithEdit = ({
  data,
  onRowEditComplete,
  globalFilter,
  dataKey,
  columns,
  setyup,
  scrollHeight,
  setVisible,
}) => {
  const mode = useSelector((state) => state.theme.mode);
  return (
    <DataTable
      paginator
      rows={10}
      value={data || []}
      editMode="row"
      size="small"
      dataKey={dataKey}
      onRowEditComplete={onRowEditComplete}
      tableStyle={{ minWidth: '50rem' }}
      globalFilter={globalFilter || ''}
      emptyMessage="No records found."
      scrollable
      scrollHeight={scrollHeight}
      className={mode == 'dark' ? '' : 'custom-paginator'}
    >
      {columns.map((column, index) => (
        <Column
          key={index}
          field={column.field}
          header={column.header}
          editor={textEditor}
          headerStyle={{
            textAlign: 'center',
            width: column.width,
            paddingInline: '0.5rem',
            paddingBlock: '0.75rem',
          }}
          bodyStyle={
            mode == 'dark'
              ? { border: '1px solid #6a6a6a' }
              : {
                  border: '1px solid #e5e7eb',
                  color: 'black',
                }
          }
        />
      ))}
      <Column
        header="Active"
        bodyStyle={
          mode == 'dark'
            ? { border: '1px solid #6a6a6a' }
            : {
                border: '1px solid #e5e7eb',
                color: 'black',
              }
        }
        body={(rowData) => (
          <SwitchButton
            checked={rowData.IsActive === 1}
            onToggle={() => {
              setVisible(true);
              setyup(data.indexOf(rowData));
            }}
          />
        )}
        headerStyle={{ textAlign: 'center', width: '0.1%' }}
      />
      <Column
        header="Action"
        rowEditor
        bodyStyle={
          mode == 'dark'
            ? { color: 'red !important', border: '1px solid #6a6a6a' }
            : {
                border: '1px solid #e5e7eb',
                color: 'white !important',
                // background: '#e9ecef',
              }
        }
        headerStyle={{ textAlign: 'center', width: '0.1%' }}
      />
    </DataTable>
  );
};

export default DisplaytablewithEdit;
