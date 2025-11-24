import { Card, Notification, toast as toa } from 'components/ui';
import React, { useEffect, useRef, useState } from 'react';
import {
  apiGetAspectratiomaster,
  AddAspectRatio,
  PutUpdateAspectRatio,
} from 'services/ProgrammingService';
import HeaderExtra from 'views/Controls/HeaderExtra';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { ConfirmDialog } from 'primereact/confirmdialog';
import DisplaytablewithEdit, {
  headerExtra,
} from 'views/Controls/DisplaytablewithEdit';

const AspectRatioMaster = () => {
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
  const [AspectRatioName, setAspectRatioName] = useState('');
  const [addnew, setaddnew] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');

  const [visible, setVisible] = useState(false);
  const [yup, setyup] = useState();
  const toast = useRef(null);

  const accept = () => {
    toggleSwitch(yup);
  };
  const [AspectRatio, setAspectRatio] = useState();

  useEffect(() => {
    count.current = count.current + 1;

    if (count.current == 1) {
      (async (values) => {
        const respAspectRatio = await apiGetAspectratiomaster();
        const reversedAspectRatioWithNumbers = [...respAspectRatio.data]
          .reverse()
          .map((category, index) => ({
            ...category,
            serialNumber: index + 1,
          }));
        console.log(reversedAspectRatioWithNumbers);
        setAspectRatio(reversedAspectRatioWithNumbers);
        // console.log('SongGenre',newData)
      })();
    }
  }, []);

  const onRowEditComplete = (e) => {
    let _AspectRatio = [...AspectRatio];
    let { newData, index } = e;
    console.log(newData);
    _AspectRatio[index].AspectRatio = newData.AspectRatio;
    _AspectRatio[index].IsActive = newData.IsActive;
    console.log(newData.AspectRatio);
    if (!newData.AspectRatio) {
      return;
    }

    console.log('_AspectRatio', _AspectRatio);

    PutUpdateAspectRatio(newData, token)
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
        console.log(newData.serialNumber);
        _AspectRatio[index] = data;
        _AspectRatio[index].serialNumber = newData.serialNumber;
        _AspectRatio[index].AspectRatioName = newData.AspectRatio;
        _AspectRatio[index].IsActive = newData.IsActive;
        setAspectRatio(_AspectRatio);
        closeAfter2000ms('Data Updated Succesfully', 'success');
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const addNewRecord = () => {
    if (AspectRatioName) {
      const newRecord = {
        AspectRatioName: AspectRatioName,
        IsActive: 1,
      };

      AddAspectRatio(newRecord, token)
        .then((response) => {
          if (response.status == 204) {
            closeAfter2000ms('Data Already Exists.', 'warning');
          }
          if (response.status == 200) {
            newRecord.serialNumber = AspectRatio.length + 1;
            setAspectRatio((prevAspectRatio) => [
              ...prevAspectRatio,
              newRecord,
            ]);
            // show('Data Added Successfully')
            closeAfter2000ms('Data Added Succesfully', 'success');
          }
          setAspectRatioName('');
          setaddnew(false);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    } else {
      closeAfter2000ms('Kindly Enter Aspect Ratio', 'danger');
    }
  };

  const toggleSwitch = (index) => {
    console.log('AspectRatio', AspectRatio);
    const updatedAspectRatio = [...AspectRatio];
    let row = updatedAspectRatio[index];
    row.IsActive = row.IsActive == 1 ? 0 : 1;
    PutUpdateAspectRatio(row, token)
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
        data.AspectRatioName = row.AspectRatioName || row.AspectRatio;
        data.AspectRatio = row.AspectRatioName || row.AspectRatio;

        updatedAspectRatio[index] = data;
        setAspectRatio(updatedAspectRatio);
        closeAfter2000ms('Data Updated Succesfully', 'success');
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };
  const columns = [
    { field: 'serialNumber', header: 'Sr.', width: '0.5%' },
    { field: 'AspectRatio', header: 'AspectRatio', width: '20%' },
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
                  Component={'AspectRatio Master'}
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
          AspectRatioName,
          setAspectRatioName,
          'Aspect Ratio',
          AspectRatio,
          columns,
        )}
        bodyClass="text-center"
      >
        <DisplaytablewithEdit
          data={AspectRatio}
          onRowEditComplete={onRowEditComplete}
          globalFilter={globalFilter}
          dataKey="AspectRatioCode"
          columns={columns}
          setyup={setyup}
          scrollHeight="70vh"
          setVisible={setVisible}
        />
      </Card>
    </>
  );
};

export default AspectRatioMaster;
