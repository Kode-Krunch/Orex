import { Card, Notification, toast as toa } from 'components/ui';
import React, { useEffect, useRef, useState } from 'react';
import {
  apiGetBussinessTypemaster,
  PostBusinesstype,
  PutBusinesstype,
} from 'services/MasterService';
import HeaderExtra from 'views/Controls/HeaderExtra';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { ConfirmDialog } from 'primereact/confirmdialog';
import DisplaytablewithEdit, {
  headerExtra,
} from 'views/Controls/DisplaytablewithEdit';

const BusinessTypeMaster = () => {
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
  const [BusinessTypeName, setBusinessTypeName] = useState('');
  const [addnew, setaddnew] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');

  const [visible, setVisible] = useState(false);
  const [yup, setyup] = useState();
  const toast = useRef(null);

  const accept = () => {
    toggleSwitch(yup);
  };
  const [BusinessType, setBusinessType] = useState();

  useEffect(() => {
    count.current = count.current + 1;

    if (count.current == 1) {
      (async (values) => {
        const respBusinessType = await apiGetBussinessTypemaster();
        const reversedBusinessTypeWithNumbers = [...respBusinessType.data]
          .reverse()
          .map((category, index) => ({
            ...category,
            serialNumber: index + 1,
          }));

        setBusinessType(reversedBusinessTypeWithNumbers);
        // console.log('SongBusinessType',newData)
      })();
    }
  }, []);

  const onRowEditComplete = (e) => {
    let _BusinessType = [...BusinessType];
    let { newData, index } = e;
    console.log(newData);
    _BusinessType[index].BusinessTypeName = newData.BusinessTypeName;
    _BusinessType[index].IsActive = newData.IsActive;
    if (!newData.BusinessTypeName) {
      return;
    }

    console.log('_BusinessType', _BusinessType);

    PutBusinesstype(newData, token)
      .then((response) => {
        if (response.status == 204) {
          console.log(response);
          closeAfter2000ms('Data Already Exists.', 'warning');
          return null;
        }
        if (response.status == 200) {
          closeAfter2000ms('Data Updated Succesfully', 'success');
        }
        return response.json();
      })
      .then((data) => {
        // handle successful response
        console.log(data);
        console.log(newData.serialNumber);
        _BusinessType[index] = data;
        _BusinessType[index].serialNumber = newData.serialNumber;
        _BusinessType[index].BusinessTypeName = newData.BusinessTypeName;
        _BusinessType[index].IsActive = newData.IsActive;
        setBusinessType(_BusinessType);
        closeAfter2000ms('Data Updated Succesfully', 'success');
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const addNewRecord = () => {
    if (BusinessTypeName) {
      const newRecord = {
        BusinessTypeName: BusinessTypeName,
        IsActive: 1,
      };

      PostBusinesstype(newRecord, token)
        .then((response) => {
          if (response.status == 204) {
            closeAfter2000ms('Data Already Exists.', 'warning');
          }
          if (response.status == 200) {
            newRecord.serialNumber = BusinessType.length + 1;
            setBusinessType((prevBusinessType) => [
              ...prevBusinessType,
              newRecord,
            ]);
            // show('Data Added Successfully')
            closeAfter2000ms('Data Added Succesfully', 'success');
          }
          setBusinessTypeName('');
          setaddnew(false);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    } else {
      closeAfter2000ms('Kindly Enter BusinessType Name', 'danger');
    }
  };

  const toggleSwitch = (index) => {
    console.log('BusinessType', BusinessType);
    const updatedBusinessType = [...BusinessType];
    let row = updatedBusinessType[index];
    row.IsActive = row.IsActive == 1 ? 0 : 1;
    PutBusinesstype(row, token)
      .then((response) => {
        if (response.status == 204) {
          console.log(response);
          closeAfter2000ms('Data Already Exists.', 'warning');
          return null;
        }
        if (response.status == 200) {
          closeAfter2000ms('Data Updated Succesfully', 'success');
        }
        return response.json();
      })
      .then((data) => {
        // handle successful response
        data.serialNumber = row.serialNumber;
        data.IsActive = row.IsActive;
        data.BusinessTypeName = row.BusinessTypeName;

        updatedBusinessType[index] = data;
        setBusinessType(updatedBusinessType);
        closeAfter2000ms('Data Updated Succesfully', 'success');
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };
  const columns = [
    { field: 'serialNumber', header: 'Sr.', width: '0.5%' },
    { field: 'BusinessTypeName', header: 'BusinessTypeName', width: '20%' },
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
                  ModuleText="Programming"
                  Component={'BusinessType'}
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
          BusinessTypeName,
          setBusinessTypeName,
          'Business Type',
          BusinessType,
          columns,
        )}
        bodyClass="text-center"
      >
        <DisplaytablewithEdit
          data={BusinessType}
          onRowEditComplete={onRowEditComplete}
          globalFilter={globalFilter}
          dataKey="BusinessTypeCode"
          columns={columns}
          setyup={setyup}
          scrollHeight="70vh"
          setVisible={setVisible}
        />
      </Card>
    </>
  );
};

export default BusinessTypeMaster;
