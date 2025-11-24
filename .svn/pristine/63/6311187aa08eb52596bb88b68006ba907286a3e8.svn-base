import { Card, Notification, toast as toa } from 'components/ui';
import React, { useEffect, useRef, useState } from 'react';
import {
  apiGetStarCastTypemaster,
  Poststarcasttype,
  Putstarcasttype,
} from 'services/ProgrammingService';
import HeaderExtra from 'views/Controls/HeaderExtra';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { ConfirmDialog } from 'primereact/confirmdialog';
import DisplaytablewithEdit, {
  headerExtra,
} from 'views/Controls/DisplaytablewithEdit';

const StarCastTypemaster = () => {
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
  const [StarCastTypeName, setStarCastTypeName] = useState('');
  const [addnew, setaddnew] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');

  const [visible, setVisible] = useState(false);
  const [yup, setyup] = useState();
  const toast = useRef(null);

  const accept = () => {
    toggleSwitch(yup);
  };
  const [StarCastType, setStarCastType] = useState();

  useEffect(() => {
    count.current = count.current + 1;

    if (count.current == 1) {
      (async (values) => {
        const respStarCastType = await apiGetStarCastTypemaster();
        const reversedStarCastTypeWithNumbers = [...respStarCastType.data]
          .reverse()
          .map((category, index) => ({
            ...category,
            serialNumber: index + 1,
          }));

        setStarCastType(reversedStarCastTypeWithNumbers);
        // console.log('SongStarCastType',newData)
      })();
    }
  }, []);

  const onRowEditComplete = (e) => {
    let _StarCastType = [...StarCastType];
    let { newData, index } = e;
    console.log(newData);
    _StarCastType[index].StarCastTypeName = newData.StarCastTypeName;
    _StarCastType[index].IsActive = newData.IsActive;
    if (!newData.StarCastTypeName) {
      return;
    }

    console.log('_StarCastType', _StarCastType);

    Putstarcasttype(newData, token)
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
        _StarCastType[index] = data;
        _StarCastType[index].serialNumber = newData.serialNumber;
        _StarCastType[index].StarCastTypeName = newData.StarCastTypeName;
        _StarCastType[index].IsActive = newData.IsActive;
        setStarCastType(_StarCastType);
        closeAfter2000ms('Data Updated Succesfully', 'success');
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const addNewRecord = () => {
    if (StarCastTypeName) {
      const newRecord = {
        StarCastTypeName: StarCastTypeName,
        IsActive: 1,
      };

      Poststarcasttype(newRecord, token)
        .then((response) => {
          if (response.status == 204) {
            closeAfter2000ms('Data Already Exists.', 'warning');
          }
          if (response.status == 200) {
            newRecord.serialNumber = StarCastType.length + 1;
            setStarCastType((prevStarCastType) => [
              ...prevStarCastType,
              newRecord,
            ]);
            // show('Data Added Successfully')
            closeAfter2000ms('Data Added Succesfully', 'success');
          }
          setStarCastTypeName('');
          setaddnew(false);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    } else {
      closeAfter2000ms('Kindly Enter StarCast Type', 'danger');
    }
  };

  const toggleSwitch = (index) => {
    console.log('StarCastType', StarCastType);
    const updatedStarCastType = [...StarCastType];
    let row = updatedStarCastType[index];
    row.IsActive = row.IsActive == 1 ? 0 : 1;
    Putstarcasttype(row, token)
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
        data.StarCastTypeName = row.StarCastTypeName;

        updatedStarCastType[index] = data;
        setStarCastType(updatedStarCastType);
        closeAfter2000ms('Data Updated Succesfully', 'success');
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };
  const columns = [
    { field: 'serialNumber', header: 'Sr.', width: '0.5%' },
    { field: 'StarCastTypeName', header: 'StarCastTypeName', width: '20%' },
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
                  Component={'StarCastType'}
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
          StarCastTypeName,
          setStarCastTypeName,
          'StarCast Type',
          StarCastType,
          columns,
        )}
        bodyClass="text-center"
      >
        <DisplaytablewithEdit
          data={StarCastType}
          onRowEditComplete={onRowEditComplete}
          globalFilter={globalFilter}
          dataKey="StarCastTypeCode"
          columns={columns}
          setyup={setyup}
          scrollHeight="70vh"
          setVisible={setVisible}
        />
      </Card>
    </>
  );
};

export default StarCastTypemaster;
