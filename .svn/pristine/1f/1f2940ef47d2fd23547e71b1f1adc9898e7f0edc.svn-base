import { Card, Notification, toast as toa } from 'components/ui';
import React, { useEffect, useRef, useState } from 'react';
import {
  apiGetCancelRemarkMaster,
  UpdateCancelremark,
  AddCancelremark,
} from 'services/SalesAdminService';
import HeaderExtra from 'views/Controls/HeaderExtra';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { ConfirmDialog } from 'primereact/confirmdialog';
import DisplaytablewithEdit, {
  headerExtra,
} from 'views/Controls/DisplaytablewithEdit';

const CancelRemarkMaster = () => {
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
  const [CancelRemarkName, setCancelRemarkName] = useState('');
  const [addnew, setaddnew] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');

  const [visible, setVisible] = useState(false);
  const [yup, setyup] = useState();
  const toast = useRef(null);

  const accept = () => {
    toggleSwitch(yup);
  };
  const [CancelRemark, setCancelRemark] = useState();

  useEffect(() => {
    count.current = count.current + 1;

    if (count.current == 1) {
      (async (values) => {
        const respCancelRemark = await apiGetCancelRemarkMaster();
        const reversedCancelRemarkWithNumbers = [...respCancelRemark.data]
          .reverse()
          .map((category, index) => ({
            ...category,
            serialNumber: index + 1,
          }));

        setCancelRemark(reversedCancelRemarkWithNumbers);
        // console.log('SongGenre',newData)
      })();
    }
  }, []);

  const onRowEditComplete = (e) => {
    let _CancelRemark = [...CancelRemark];
    let { newData, index } = e;
    console.log(newData);
    _CancelRemark[index].CancelRemarkName = newData.CancelRemarkName;
    _CancelRemark[index].IsActive = newData.IsActive;
    if (!newData.CancelRemarkName) {
      return;
    }

    console.log('_CancelRemark', _CancelRemark);

    UpdateCancelremark(newData, token)
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
        console.log(data);

        _CancelRemark[index] = data;
        _CancelRemark[index].serialNumber = newData.serialNumber;
        _CancelRemark[index].CancelRemarkName = newData.CancelRemarkName;
        _CancelRemark[index].IsActive = newData.IsActive;
        setCancelRemark(_CancelRemark);
        closeAfter2000ms('Data Updated Succesfully', 'success');
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const addNewRecord = () => {
    if (CancelRemarkName) {
      const newRecord = {
        CancelRemarkName: CancelRemarkName,
        IsActive: 1,
      };

      AddCancelremark(newRecord, token)
        .then((response) => {
          if (response.status == 204) {
            closeAfter2000ms('Data Already Exists.', 'warning');
          }
          if (response.status == 200) {
            newRecord.serialNumber = CancelRemark.length + 1;
            setCancelRemark((prevCancelRemark) => [
              ...prevCancelRemark,
              newRecord,
            ]);
            // show('Data Added Successfully')
            closeAfter2000ms('Data Added Succesfully', 'success');
          }
          setCancelRemarkName('');
          setaddnew(false);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    } else {
      closeAfter2000ms('Kindly Enter Video Type Name', 'danger');
    }
  };

  const toggleSwitch = (index) => {
    console.log('CancelRemark', CancelRemark);
    const updatedCancelRemark = [...CancelRemark];
    let row = updatedCancelRemark[index];
    row.IsActive = row.IsActive == 1 ? 0 : 1;
    UpdateCancelremark(row, token)
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
        data.serialNumber = row.serialNumber;
        data.IsActive = row.IsActive;
        data.CancelRemarkName = row.CancelRemarkName;

        updatedCancelRemark[index] = data;
        setCancelRemark(updatedCancelRemark);
        closeAfter2000ms('Data Updated Succesfully', 'success');
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };
  const columns = [
    { field: 'serialNumber', header: 'Sr.', width: '0.5%' },
    { field: 'CancelRemarkName', header: 'CancelRemarkName', width: '20%' },
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
                  Component={'Cancel Remark'}
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
          CancelRemarkName,
          setCancelRemarkName,
          'Cancel Remark',
          CancelRemark,
          columns,
        )}
        bodyClass="text-center"
      >
        <DisplaytablewithEdit
          data={CancelRemark}
          onRowEditComplete={onRowEditComplete}
          globalFilter={globalFilter}
          dataKey="CancelRemarkCode"
          columns={columns}
          setyup={setyup}
          scrollHeight="70vh"
          setVisible={setVisible}
        />
      </Card>
    </>
  );
};

export default CancelRemarkMaster;
