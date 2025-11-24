import { Card, Notification, toast as toa } from 'components/ui';
import React, { useEffect, useRef, useState } from 'react';
import {
  apiGettapetypeMaster,
  UpdateTapeType,
  AddTapeType,
} from 'services/ProgrammingService';
import HeaderExtra from 'views/Controls/HeaderExtra';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { ConfirmDialog } from 'primereact/confirmdialog';
import DisplaytablewithEdit, {
  headerExtra,
} from 'views/Controls/DisplaytablewithEdit';

const TapeTypeMaster = () => {
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
  const [TapeTypeName, setTypeTypeName] = useState('');
  const [addnew, setaddnew] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');

  const [visible, setVisible] = useState(false);
  const [yup, setyup] = useState();
  const toast = useRef(null);

  const accept = () => {
    toggleSwitch(yup);
  };
  const [TapeType, setTapeType] = useState();

  useEffect(() => {
    count.current = count.current + 1;

    if (count.current == 1) {
      (async (values) => {
        const respTapeType = await apiGettapetypeMaster();
        const reversedTapeTypeWithNumbers = [...respTapeType.data]
          .reverse()
          .map((category, index) => ({
            ...category,
            serialNumber: index + 1,
          }));

        setTapeType(reversedTapeTypeWithNumbers);
        // console.log('SongGenre',newData)
      })();
    }
  }, []);

  const onRowEditComplete = (e) => {
    let _TapeType = [...TapeType];
    let { newData, index } = e;
    console.log(newData);
    _TapeType[index].TapeTypeName = newData.TapeTypeName;
    _TapeType[index].IsActive = newData.IsActive;
    if (!newData.TapeTypeName) {
      return;
    }

    console.log('_TapeType', _TapeType);

    UpdateTapeType(newData, token)
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

        _TapeType[index] = data;
        _TapeType[index].serialNumber = newData.serialNumber;
        _TapeType[index].TypeTypeName = newData.TypeTypeName;
        _TapeType[index].TapeTypeShortName = ' ';
        _TapeType[index].IsActive = newData.IsActive;
        setTapeType(_TapeType);
        closeAfter2000ms('Data Updated Succesfully', 'success');
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const addNewRecord = () => {
    if (TapeTypeName) {
      const newRecord = {
        TapeTypeName: TapeTypeName,
        IsActive: 1,
      };

      AddTapeType(newRecord, token)
        .then((response) => {
          if (response.status == 204) {
            closeAfter2000ms('Data Already Exists.', 'warning');
          }
          if (response.status == 200) {
            newRecord.serialNumber = TapeType.length + 1;
            setTapeType((prevTapeType) => [...prevTapeType, newRecord]);
            // show('Data Added Successfully')
            closeAfter2000ms('Data Added Succesfully', 'success');
          }
          setTypeTypeName('');
          setaddnew(false);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    } else {
      closeAfter2000ms('Kindly Enter Tape Type Name', 'danger');
    }
  };

  const toggleSwitch = (index) => {
    console.log('TapeType', TapeType);
    const updatedTapeType = [...TapeType];
    let row = updatedTapeType[index];
    row.IsActive = row.IsActive == 1 ? 0 : 1;
    UpdateTapeType(row, token)
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
        data.TypeTypeName = row.TypeTypeName;

        updatedTapeType[index] = data;
        setTapeType(updatedTapeType);
        closeAfter2000ms('Data Updated Succesfully', 'success');
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };
  const columns = [
    { field: 'serialNumber', header: 'Sr.', width: '0.5%' },
    { field: 'TapeTypeName', header: 'TapeTypeName', width: '20%' },
    // { field: 'TapeTypeShortName', header: 'TapeTypeShortName', width: '20%' },
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
                <HeaderExtra ModuleText="Programming" Component={'Tape Type'} />
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
          TapeTypeName,
          setTypeTypeName,
          'Tape Type',
          TapeType,
          columns,
        )}
        bodyClass="text-center"
      >
        <DisplaytablewithEdit
          data={TapeType}
          onRowEditComplete={onRowEditComplete}
          globalFilter={globalFilter}
          dataKey="TapeTypeCode"
          columns={columns}
          setyup={setyup}
          scrollHeight="70vh"
          setVisible={setVisible}
        />
      </Card>
    </>
  );
};

export default TapeTypeMaster;
