import {
  Card,
  Notification,
  toast as toa,
  Button,
  Input,
  Switcher,
} from 'components/ui';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useRef, useState } from 'react';
import {
  apiGetSongcategoryMaster,
  AddSongcategory,
  UpdateSongcategory,
} from 'services/SchedulingService';

import HeaderExtra from 'views/Controls/HeaderExtra';
import { Toast } from 'primereact/toast';
import { HiPlusCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { ConfirmDialog } from 'primereact/confirmdialog';
import DisplaytablewithEdit, {
  headerExtra,
} from 'views/Controls/DisplaytablewithEdit';

const SongCategoryMaster = () => {
  const token = useSelector((state) => state.auth.session.token);

  const count = useRef(0);

  function closeAfter2000ms(mes, ty) {
    toa.push(
      <Notification
        closable
        type={ty}
        duration={1000}
        title={ty.charAt(0).toUpperCase() + ty.slice(1)}
      >
        {mes}
      </Notification>,
    );
  }

  const [SongCategoryName, setSongCategoryName] = useState('');
  const [addnew, setaddnew] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');

  const [visible, setVisible] = useState(false);
  const [yup, setyup] = useState();
  const toast = useRef(null);

  const accept = () => {
    toggleSwitch(yup);
  };
  const [SongCategory, setSongCategory] = useState();

  useEffect(() => {
    count.current = count.current + 1;

    if (count.current == 1) {
      (async (values) => {
        const respGener = await apiGetSongcategoryMaster();
        const reversedSongCategoriesWithNumbers = [...respGener.data]
          .reverse()
          .map((category, index) => ({
            ...category,
            serialNumber: index + 1,
          }));

        setSongCategory(reversedSongCategoriesWithNumbers);

        // console.log('SongCategory',newData)
      })();
    }
  }, []);

  const onRowEditComplete = (e) => {
    console.log('SongCategory', SongCategory);
    let _SongCategory = [...SongCategory];
    let { newData, index } = e;

    _SongCategory[index] = newData;
    if (!newData.SongCategoryName) {
      return;
    }
    UpdateSongcategory(newData, token)
      .then((response) => {
        if (response.status == 204) {
          console.log(response);
          closeAfter2000ms('Data Already Exists.', 'warning');
          return null;
        }

        return response.json();
      })
      .then((data) => {
        // handle successful response

        _SongCategory[index] = data;
        _SongCategory[index].serialNumber = newData.serialNumber;
        setSongCategory(_SongCategory);

        closeAfter2000ms('Data Updated Succesfully', 'success');
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const textEditor = (options) => {
    return (
      <Input
        type="text"
        size="sm"
        maxLength="50"
        value={options.value}
        onChange={(e) => {
          if (/^[0-9a-zA-Z\s]*$/.test(e.target.value)) {
            options.editorCallback(e.target.value);
          }
        }}
      />
    );
  };

  const addNewRecord = () => {
    if (SongCategoryName) {
      const newRecord = {
        SongCategoryName: SongCategoryName,
        IsActive: 1,
      };

      AddSongcategory(newRecord, token)
        .then((response) => {
          if (response.status == 204) {
            console.log(response);
            closeAfter2000ms('Data Already Exists.', 'warning');
            return null;
          }

          return response.json();
        })
        .then((data) => {
          console.log('data', data);
          newRecord.serialNumber = SongCategory.length + 1;
          newRecord.SongCategoryCode = data.SongCategoryCode;
          setSongCategory((prevSongCategory) => [
            ...prevSongCategory,
            newRecord,
          ]);
          closeAfter2000ms('Data Added Succesfully', 'success');
          setSongCategoryName('');
          setaddnew(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      closeAfter2000ms('Kindly Enter Movie Album Name', 'danger');
    }
  };

  const SwitchButton = ({ checked, onToggle }) => {
    return (
      <div className="p-field-switch">
        <Switcher checked={checked} onChange={onToggle} />
      </div>
    );
  };
  const toggleSwitch = (index) => {
    const updatedSongCategory = [...SongCategory];
    let row = updatedSongCategory[index];

    row.IsActive = row.IsActive === 1 ? 0 : 1;
    UpdateSongcategory(row, token)
      .then((response) => {
        if (response.status == 204) {
          closeAfter2000ms('Data Already Exists.', 'warning');
          return null;
        }

        return response.json();
      })
      .then((data) => {
        // Assuming data.serialNumber is present in the response, otherwise, modify accordingly

        data.serialNumber = row.serialNumber;
        data.IsActive = row.IsActive;
        data.SongCategoryCode = row.SongCategoryCode;

        updatedSongCategory[index] = data;

        setSongCategory(updatedSongCategory);
        closeAfter2000ms('Data Updated Succesfully', 'success');
      })
      .catch((error) => {
        console.error('UpdateSongcategory Error:', error);
      });
  };
  const columns = [
    { field: 'serialNumber', header: 'Sr.', width: '0.5%' },
    { field: 'SongCategoryName', header: 'SongCategoryName', width: 'auto' },
    // Add more columns as needed
  ];
  return (
    <>
      <Toast ref={toast} />

      <ConfirmDialog
        group="declarative"
        visible={visible}
        onHide={() => setVisible(false)}
        message="Are you sure you want to proceed?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={accept}
      />
      <Card
        header={
          <div className="flex justify-between">
            <div>
              <span className="flex items-center">
                <HeaderExtra
                  ModuleText="Scheduling"
                  Component={'Song Category'}
                />
              </span>
            </div>
            <div
              className="flex flex-col items-center"
              style={{ marginLeft: '-20%' }}
            ></div>

            <div></div>
          </div>
        }
        headerExtra={headerExtra(
          globalFilter,
          setGlobalFilter,
          setaddnew,
          addnew,
          addNewRecord,
          SongCategoryName,
          setSongCategoryName,
          'Song Category',
          SongCategory,
          columns,
        )}
        bodyClass="text-center"
      >
        <DisplaytablewithEdit
          data={SongCategory}
          onRowEditComplete={onRowEditComplete}
          globalFilter={globalFilter}
          dataKey="SongCategoryCode"
          columns={columns}
          setyup={setyup}
          scrollHeight="70vh"
          setVisible={setVisible}
        />
      </Card>
    </>
  );
};

export default SongCategoryMaster;
