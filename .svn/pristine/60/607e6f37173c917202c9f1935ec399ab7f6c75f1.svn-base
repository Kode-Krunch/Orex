import { Card, Notification, toast as toa } from 'components/ui';
import React, { useEffect, useRef, useState } from 'react';
import {
  apiGetTXVersionmaster,
  Posttxversion,
  Puttxversion,
} from 'services/ProgrammingService';
import HeaderExtra from 'views/Controls/HeaderExtra';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { ConfirmDialog } from 'primereact/confirmdialog';
import DisplaytablewithEdit, {
  headerExtra,
} from 'views/Controls/DisplaytablewithEdit';

const TXVersionMaster = () => {
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
  const [TXVersionName, setTXVersionName] = useState('');
  const [addnew, setaddnew] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');

  const [visible, setVisible] = useState(false);
  const [yup, setyup] = useState();
  const toast = useRef(null);

  const accept = () => {
    toggleSwitch(yup);
  };
  const [TXVersion, setTXVersion] = useState();

  useEffect(() => {
    count.current = count.current + 1;

    if (count.current == 1) {
      (async (values) => {
        const respTXVersion = await apiGetTXVersionmaster();
        const reversedTXVersionWithNumbers = [...respTXVersion.data]
          .reverse()
          .map((category, index) => ({
            ...category,
            serialNumber: index + 1,
          }));

        setTXVersion(reversedTXVersionWithNumbers);
        // console.log('SongGenre',newData)
      })();
    }
  }, []);

  const onRowEditComplete = (e) => {
    let _TXVersion = [...TXVersion];
    let { newData, index } = e;
    console.log(newData.TXVersionName);
    if (!newData.TXVersionName) {
      return;
    }
    _TXVersion[index].TXVersionName = newData.TXVersionName;
    _TXVersion[index].IsActive = newData.IsActive;

    console.log('_TXVersion', _TXVersion);
    _TXVersion[index] = newData;
    Puttxversion(newData, token)
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

        _TXVersion[index] = data;
        _TXVersion[index].serialNumber = newData.serialNumber;
        _TXVersion[index].TXVersionName = newData.TXVersionName;
        _TXVersion[index].IsActive = newData.IsActive;
        setTXVersion(_TXVersion);
        closeAfter2000ms('Data Updated Succesfully', 'success');
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const addNewRecord = () => {
    if (TXVersionName) {
      const newRecord = {
        TXVersionName: TXVersionName,
        IsActive: 1,
      };

      Posttxversion(newRecord, token)
        .then((response) => {
          if (response.status == 204) {
            closeAfter2000ms('Data Already Exists.', 'warning');
          }
          if (response.status == 200) {
            newRecord.serialNumber = TXVersion.length + 1;
            setTXVersion((prevTXVersion) => [...prevTXVersion, newRecord]);
            // show('Data Added Successfully')
            closeAfter2000ms('Data Added Succesfully', 'success');
          }
          setTXVersionName('');
          setaddnew(false);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    } else {
      closeAfter2000ms('Kindly Enter TXVersion Name', 'danger');
    }
  };

  const toggleSwitch = (index) => {
    console.log('TXVersion', TXVersion);
    const updatedTXVersion = [...TXVersion];
    let row = updatedTXVersion[index];
    row.IsActive = row.IsActive == 1 ? 0 : 1;
    Puttxversion(row, token)
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
        data.TXVersionName = row.TXVersionName;

        updatedTXVersion[index] = data;
        setTXVersion(updatedTXVersion);
        closeAfter2000ms('Data Updated Succesfully', 'success');
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };
  const columns = [
    { field: 'serialNumber', header: 'Sr.', width: '0.5%' },
    { field: 'TXVersionName', header: 'TXVersionName', width: '20%' },
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
                  Component={'TX Version'}
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
          TXVersionName,
          setTXVersionName,
          'TX Version',
          TXVersion,
          columns,
        )}
        bodyClass="text-center"
      >
        <DisplaytablewithEdit
          data={TXVersion}
          onRowEditComplete={onRowEditComplete}
          globalFilter={globalFilter}
          dataKey="TXVersionCode"
          columns={columns}
          setyup={setyup}
          scrollHeight="70vh"
          setVisible={setVisible}
        />
      </Card>
    </>
  );
};

export default TXVersionMaster;
