import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React from 'react';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import { telecastStatus } from './enums';

function ManualMatchTable({
  manualMatchedData,
  setManualMatchedData,
  originalShowData,
  columns,
}) {
  /* HOOKS */
  const dataTableRef = React.useRef(null);

  /* EVENT HANDLERS */
  const onRowEditInit = (event) => {
    try {
      let { index } = event;
      let newMatchData = JSON.parse(JSON.stringify(manualMatchedData));
      newMatchData[index].isEditing = true;
      setManualMatchedData(newMatchData);
      if (dataTableRef.current) {
        dataTableRef.current.getElement().children[0].scrollTo({
          left: dataTableRef.current.getElement().scrollWidth,
          behavior: 'smooth',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onRowEditCancel = (event) => {
    try {
      let { index } = event;
      let newMatchData = JSON.parse(JSON.stringify(manualMatchedData));
      delete newMatchData[index].isEditing;
      setManualMatchedData(newMatchData);
    } catch (error) {
      console.error(error);
    }
  };

  const onRowEditComplete = (event) => {
    try {
      let newManualMatchedData = JSON.parse(JSON.stringify(manualMatchedData));
      let { newData, index } = event;
      if (newData.Remark === telecastStatus.TELECASTED) {
        newData.AsRunTime = formatTimeToHHMMSSFF(newData.AsRunTime);
        newData.AsRunDuration = formatTimeToHHMMSSFF(newData.AsRunDuration);
        newData.Flag = isRowEdited(newData, index);
        delete newData.isEditing;
        newManualMatchedData[index] = newData;
        setManualMatchedData(newManualMatchedData);
      } else {
        newData.AsRunTime = null;
        newData.AsRunDuration = '00:00:00:00';
        newData.Flag = isRowEdited(newData, index);
        delete newData.isEditing;
        newManualMatchedData[index] = newData;
        setManualMatchedData(newManualMatchedData);
      }
    } catch (error) {
      openNotification('danger', 'Something went wrong while updating data');
      console.error(error);
    }
  };

  /* HELPER FUNCTIONS */
  const renderSrNoColumn = () => {
    return (
      <Column
        body={(rowData, { rowIndex }) => rowIndex + 1}
        header="Sr"
        headerStyle={{
          width: '10%',
          minWidth: '5rem',
          textWrap: 'nowrap',
          paddingBlock: '0.7rem',
        }}
        bodyClassName={getColumnBodyClassNames}
        bodyStyle={{ overflow: 'visible', textAlign: 'center' }}
        alignHeader="center"
      ></Column>
    );
  };

  const renderTableColumns = () => {
    const dataTableColumns = columns.map((column) => {
      return (
        <Column
          field={column.field}
          header={column.header}
          headerStyle={{
            textWrap: 'nowrap',
            paddingBlock: '0.7rem',
          }}
          bodyClassName={getColumnBodyClassNames}
          bodyStyle={{
            overflow: 'visible',
            background:
              column.Remark === telecastStatus.TELECASTED && !column.isEditing
                ? ' green'
                : 'red',
          }}
          editor={column.editable ? column.editor : false}
        ></Column>
      );
    });
    return dataTableColumns;
  };

  const renderEditColumn = () => {
    return (
      <Column
        rowEditor
        header="Action"
        headerStyle={{
          width: '10%',
          minWidth: '5rem',
          paddingBlock: '0.7rem',
        }}
        bodyStyle={{
          padding: 0,
          overflow: 'visible',
        }}
        bodyClassName="dark!bg-gray-800 !bg-gray-800 !border !border-[0.5px] !border-gray-700 !text-center !right-[-1px]"
        frozen
        alignFrozen="right"
        alignHeader="center"
        body={(rowData, options) => {
          return (
            <>
              {!options.rowEditor.editing ? (
                <div
                  className={`flex justify-center items-center ${
                    rowData.Flag === 1 && 'border-r-[6px] border-r-amber-500/80'
                  } px-2 py-1`}
                >
                  <Button
                    icon="pi pi-pencil"
                    rounded
                    text
                    size="small"
                    onClick={options.rowEditor.onInitClick}
                    style={{
                      color: '#fff',
                      height: 0,
                      width: 0,
                      padding: '1rem',
                    }}
                  />
                </div>
              ) : (
                <div className="px-2">
                  <Button
                    icon="pi pi-check"
                    rounded
                    text
                    size="small"
                    onClick={options.rowEditor.onSaveClick}
                    style={{
                      color: '#fff',
                      height: 0,
                      width: 0,
                      padding: '1rem',
                    }}
                  />
                  <Button
                    icon="pi pi-times"
                    rounded
                    text
                    size="small"
                    onClick={options.rowEditor.onCancelClick}
                    style={{
                      color: '#fff',
                      height: 0,
                      width: 0,
                      padding: '1rem',
                    }}
                  />
                </div>
              )}
            </>
          );
        }}
      ></Column>
    );
  };

  function formatTimeToHHMMSSFF(value) {
    try {
      const parts = value.split(':');
      const [hours, minutes = '00', seconds = '00', frames = '00'] = parts;
      const formattedHours = hours.padStart(2, '0');
      const formattedMinutes = minutes.padStart(2, '0');
      const formattedSeconds = seconds.padStart(2, '0');
      const formattedFrames = frames.padStart(2, '0');
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}:${formattedFrames}`;
    } catch (error) {
      throw error;
    }
  }

  const getColumnBodyClassNames = (data) => {
    try {
      return {
        'bg-green-700 !border !border-[0.5px] !border-gray-700 !w-max !max-w-max !px-2 !py-1':
          data.Remark === telecastStatus.TELECASTED && !data.isEditing,
        'bg-red-700 !border !border-[0.5px] !border-gray-700 !w-max !max-w-max !px-2 !py-1':
          data.Remark === telecastStatus.NOT_TELECASTED && !data.isEditing,
        '!border !border-[0.5px] !border-gray-700 !w-max !max-w-max !px-2 !py-1':
          data.isEditing,
      };
    } catch (error) {
      console.error(error);
    }
  };

  const rowEditValidator = (editedData) => {
    try {
      let isValid = true;
      if (editedData.Remark === telecastStatus.TELECASTED) {
        if (editedData.AsRunTime === '00:00:00:00') {
          openNotification(
            'danger',
            'Telecast Time should be greater than 00:00:00:00',
          );
          isValid = false;
          return isValid;
        }
        if (!editedData.AsRunTime) {
          openNotification('danger', 'Telecast Time cannot be empty');
          isValid = false;
          return isValid;
        }
        if (editedData.AsRunDuration === '00:00:00:00') {
          openNotification(
            'danger',
            'Telecast Duration should be greater than 00:00:00:00',
          );
          isValid = false;
          return isValid;
        }
        if (!editedData.AsRunDuration) {
          openNotification('danger', 'Telecast Duration cannot be empty');
          isValid = false;
          return isValid;
        }
      }
      return isValid;
    } catch (error) {
      console.error(error);
    }
  };

  const isRowEdited = (row, index) => {
    try {
      if (
        row.AsRunTime !== originalShowData[index].AsRunTime ||
        row.AsRunDuration !== originalShowData[index].AsRunDuration ||
        row.Remark !== originalShowData[index].Remark
      ) {
        return 1;
      } else {
        return 0;
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <DataTable
      value={manualMatchedData}
      editMode="row"
      dataKey="id"
      scrollable
      scrollHeight="flex"
      onRowEditInit={onRowEditInit}
      onRowEditCancel={onRowEditCancel}
      rowEditValidator={rowEditValidator}
      onRowEditComplete={onRowEditComplete}
      ref={dataTableRef}
    >
      {renderSrNoColumn()}
      {renderTableColumns()}
      {renderEditColumn()}
    </DataTable>
  );
}

export default ManualMatchTable;
