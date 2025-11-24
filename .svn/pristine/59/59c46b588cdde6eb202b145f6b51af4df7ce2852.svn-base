// DataTableComponent.js
import React, { useState } from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import {
  Button,
  Switcher,
  Tooltip,
  Input,
  Upload,
  Avatar,
} from 'components/ui';
import { HiOutlinePlus, HiPlusCircle } from 'react-icons/hi';
import { FaFileExport } from 'react-icons/fa';
import { ExportxlswithColor } from './ExportxlswithColor';
import { useSelector } from 'react-redux';

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
  <div className="p-field-switch">
    <Switcher checked={checked} onChange={onToggle} />
  </div>
);

const DisplaytablewithEditImage = ({
  data,
  onRowEditComplete,
  globalFilter,
  dataKey,
  columns,
  setyup,
  scrollHeight,
  setVisible,
  title,
  setAvatarImg,
  avatarImg,
  img,
}) => {
  const mode = useSelector((state) => state.theme.mode);
  const beforeUpload = (file, fileList) => {
    let valid = true;

    const allowedFileType = ['image/jpeg', 'image/png'];
    const MAX_FILE_SIZE = 500000;

    if (file) {
      for (const f of file) {
        if (!allowedFileType.includes(f.type)) {
          valid = 'Please upload a .jpeg or .png file!';
        }

        if (f.size >= MAX_FILE_SIZE) {
          valid = 'Upload image cannot more then 500kb!';
        }
      }
    }

    return valid;
  };
  const textEditor = (options) => (
    <div className="flex items-center">
      {(title == 'Team' || title == 'SubGenre') && (
        <Upload
          className="cursor-pointer mr-2"
          showList={false}
          uploadLimit={1}
          beforeUpload={beforeUpload}
          onChange={(files) => {
            const reader = new FileReader();
            const file = files[0];
            if (file && file.size > 0) {
              reader.readAsDataURL(file);
              reader.onloadend = () => {
                setAvatarImg(reader.result);
              };
            }
          }}
        >
          <Avatar size={30} src={avatarImg} icon={<HiOutlinePlus />} />
        </Upload>
      )}
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
    </div>
  );
  return (
    <DataTable
      paginator
      rows={10}
      value={data || []}
      editMode="row"
      size="small"
      dataKey={dataKey}
      onRowEditComplete={onRowEditComplete}
      onRowEditInit={(e) => setAvatarImg(e?.data[img])}
      tableStyle={{ minWidth: '50rem' }}
      globalFilter={globalFilter || ''}
      emptyMessage="No records found."
      scrollable
      scrollHeight={scrollHeight}
    >
      {columns.map((column, index) => (
        <Column
          key={index}
          field={column.field}
          header={column.header}
          bodyStyle={
            mode == 'dark'
              ? { border: '1px solid #6a6a6a' }
              : {
                  border: '1px solid #e5e7eb',
                  color: 'black',
                }
          }
          body={(rowData) => (
            <div className="flex items-center">
              {column.field != 'serialNumber' && (
                <img
                  src={rowData[img] ? rowData[img] : '/img/27002.jpg'}
                  // alt="Team"
                  style={{
                    height: '30px',
                    width: '30px',
                  }}
                  className="hover:opacity-80 cursor-pointer  rounded-full mr-2"
                />
              )}
              {rowData[column.field]}
            </div>
          )}
          editor={
            column.field == 'TeamName' || column.field == 'SubGenreName'
              ? textEditor
              : null
          }
          headerStyle={{
            textAlign: 'center',
            width: column.width,
            paddingInline: '0.5rem',
            paddingBlock: '0.75rem',
          }}
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
            ? { border: '1px solid #6a6a6a' }
            : {
                border: '1px solid #e5e7eb',
                color: 'black',
              }
        }
        headerStyle={{ textAlign: 'center', width: '0.1%' }}
      />
    </DataTable>
  );
};

export default DisplaytablewithEditImage;
