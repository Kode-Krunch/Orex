import { Card, Notification, toast as toa } from 'components/ui';
import React, { useEffect, useRef, useState } from 'react';
import {
  apiGetDealtypemaster,
  Postdealtype,
  PutDealtype,
} from 'services/CreditcontrolService';
import HeaderExtra from 'views/Controls/HeaderExtra';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { ConfirmDialog } from 'primereact/confirmdialog';
import DisplaytablewithEdit, {
  headerExtra,
} from 'views/Controls/DisplaytablewithEdit';

const DealTypeMaster = () => {
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
  const [DealTypeName, setDealTypeName] = useState('');
  const [addnew, setaddnew] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');

  const [visible, setVisible] = useState(false);
  const [yup, setyup] = useState();
  const toast = useRef(null);

  const accept = () => {
    toggleSwitch(yup);
  };
  const [DealType, setDealType] = useState();

  useEffect(() => {
    count.current = count.current + 1;

    if (count.current == 1) {
      (async () => {
        const respDealType = await apiGetDealtypemaster();
        const reversedDealTypeWithNumbers = [...respDealType.data]
          .reverse()
          .map((category, index) => ({
            ...category,
            serialNumber: index + 1,
          }));

        setDealType(reversedDealTypeWithNumbers);
      })();
    }
  }, []);

  const onRowEditComplete = (e) => {
    let _DealType = [...DealType];
    let { newData, index } = e;
    if (!newData.DealTypeName) {
      return;
    }

    _DealType[index].DealTypeName = newData.DealTypeName;
    _DealType[index].IsActive = newData.IsActive;

    PutDealtype(newData, token)
      .then((response) => {
        if (response.status == 204) {
          closeAfter2000ms('Data Already Exists.', 'warning');
        }
        if (response.status == 200) {
          closeAfter2000ms('Data Updated Succesfully', 'success');
        }

        return response.json();
      })
      .then((data) => {
        // handle successful response
        _DealType[index] = data;
        _DealType[index].serialNumber = newData.serialNumber;
        _DealType[index].DealTypeName = newData.DealTypeName;
        _DealType[index].IsActive = newData.IsActive;
        setDealType(_DealType);
      })
      .catch((error) => {
        // handle error

        if (error.response.status == 500) {
          closeAfter2000ms('Server Error.', 'danger');
        }
      });
  };

  const addNewRecord = () => {
    if (DealTypeName) {
      const newRecord = {
        DealTypeName: DealTypeName,
        IsActive: 1,
      };

      Postdealtype(newRecord, token)
        .then((response) => {
          if (response.status == 204) {
            closeAfter2000ms('Data Already Exists.', 'warning');
          }
          if (response.status == 200) {
            closeAfter2000ms('Data Added Succesfully', 'success');
            newRecord.serialNumber = DealType.length + 1;
            setDealType((prevDealType) => [...prevDealType, newRecord]);
          }
          setDealTypeName('');
          setaddnew(false);
        })
        .catch((error) => {
          // handle error

          if (error.response.status == 500) {
            closeAfter2000ms('Server Error.', 'danger');
          }
        });
    } else {
      closeAfter2000ms('Kindly Enter Deal Type Name', 'danger');
    }
  };

  const toggleSwitch = (index) => {
    const updatedDealType = [...DealType];
    let row = updatedDealType[index];
    row.IsActive = row.IsActive == 1 ? 0 : 1;
    PutDealtype(row, token)
      .then((response) => {
        if (response.status == 204) {
          closeAfter2000ms('Data Already Exists.', 'warning');
        }

        return response.json();
      })
      .then((data) => {
        // handle successful response
        data.serialNumber = row.serialNumber;
        data.IsActive = row.IsActive;
        data.DealTypeName = row.DealTypeName;

        updatedDealType[index] = data;
        setDealType(updatedDealType);
        closeAfter2000ms('Data Updated Succesfully', 'success');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const columns = [
    { field: 'serialNumber', header: 'Sr.', width: '0.5%' },
    { field: 'DealTypeName', header: 'DealTypeName', width: '20%' },
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
                <HeaderExtra ModuleText="Programming" Component={'Deal Type'} />
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
          DealTypeName,
          setDealTypeName,
          'Deal Type',
          DealType,
          columns,
        )}
        bodyClass="text-center"
      >
        <DisplaytablewithEdit
          data={DealType}
          onRowEditComplete={onRowEditComplete}
          globalFilter={globalFilter}
          dataKey="DealTypeCode"
          columns={columns}
          setyup={setyup}
          scrollHeight="70vh"
          setVisible={setVisible}
        />
      </Card>
    </>
  );
};

export default DealTypeMaster;
