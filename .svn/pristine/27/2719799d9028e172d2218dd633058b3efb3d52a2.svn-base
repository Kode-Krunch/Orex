import { Card, Notification, toast as toa } from 'components/ui';
import React, { useEffect, useRef, useState } from 'react';
import {
  apiGetSpotPreferencemaster,
  PostSpotPreference,
  PutSpotPreference,
} from 'services/CreditcontrolService';
import HeaderExtra from 'views/Controls/HeaderExtra';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { ConfirmDialog } from 'primereact/confirmdialog';
import DisplaytablewithEdit, {
  headerExtra,
} from 'views/Controls/DisplaytablewithEdit';

const SpotPreferenceMaster = () => {
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
  const [SpotPreferenceName, setSpotPreferenceName] = useState('');
  const [addnew, setaddnew] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');

  const [visible, setVisible] = useState(false);
  const [yup, setyup] = useState();
  const toast = useRef(null);

  const accept = () => {
    toggleSwitch(yup);
  };
  const [SpotPreference, setSpotPreference] = useState();

  useEffect(() => {
    count.current = count.current + 1;

    if (count.current == 1) {
      (async (values) => {
        const respSpotPreference = await apiGetSpotPreferencemaster();
        const reversedSpotPreferenceWithNumbers = [...respSpotPreference.data]
          .reverse()
          .map((category, index) => ({
            ...category,
            serialNumber: index + 1,
          }));

        setSpotPreference(reversedSpotPreferenceWithNumbers);
        // console.log('SongGenre',newData)
      })();
    }
  }, []);

  const onRowEditComplete = (e) => {
    let _SpotPreference = [...SpotPreference];
    let { newData, index } = e;
    if (!newData.SpotPreferenceName) {
      return;
    }
    console.log(newData);
    _SpotPreference[index].SpotPreferenceName = newData.SpotPreferenceName;
    _SpotPreference[index].IsActive = newData.IsActive;

    console.log('_SpotPreference', _SpotPreference);

    PutSpotPreference(newData, token)
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

        SpotPreference[index] = data;
        SpotPreference[index].serialNumber = newData.serialNumber;
        SpotPreference[index].SpotPreferenceName = newData.SpotPreferenceName;
        SpotPreference[index].IsActive = newData.IsActive;
        setSpotPreference(SpotPreference);
      })
      .catch((error) => {
        // handle error

        console.log(error);
      });
  };

  const addNewRecord = () => {
    if (SpotPreferenceName) {
      const newRecord = {
        SpotPreferenceName: SpotPreferenceName,
        IsActive: 1,
      };

      PostSpotPreference(newRecord, token)
        .then((response) => {
          if (response.status == 204) {
            closeAfter2000ms('Data Already Exists.', 'warning');
            return;
          }
          if (response.status == 200) {
            newRecord.serialNumber = SpotPreference.length + 1;
            setSpotPreference((prevSpotPreference) => [
              ...prevSpotPreference,
              newRecord,
            ]);
            // show('Data Added Successfully')
            closeAfter2000ms('Data Added Succesfully', 'success');
          }
          setSpotPreferenceName('');
          setaddnew(false);
        })
        .catch((error) => {
          // handle error

          if (error.response.status == 500) {
            closeAfter2000ms('Server Error.', 'danger');
          }
          console.log(error);
        });
    } else {
      closeAfter2000ms('Kindly Enter SpotPreference Name', 'danger');
    }
  };

  const toggleSwitch = (index) => {
    console.log('SpotPreference', SpotPreference);
    const updatedSpotPreference = [...SpotPreference];
    let row = updatedSpotPreference[index];
    row.IsActive = row.IsActive == 1 ? 0 : 1;
    PutSpotPreference(row, token)
      .then((response) => {
        if (response.status == 204) {
          closeAfter2000ms('Data Already Exists.', 'warning');
          return;
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
        data.SpotPreferenceName = row.SpotPreferenceName;

        updatedSpotPreference[index] = data;
        setSpotPreference(updatedSpotPreference);
        closeAfter2000ms('Data Updated Succesfully', 'success');
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };
  const columns = [
    { field: 'serialNumber', header: 'Sr.', width: '0.5%' },
    { field: 'SpotPreferenceName', header: 'SpotPreferenceName', width: '20%' },
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
                  Component={'SpotPreference'}
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
          SpotPreferenceName,
          setSpotPreferenceName,
          'SpotPreference',
          SpotPreference,
          columns,
        )}
        bodyClass="text-center"
      >
        <DisplaytablewithEdit
          data={SpotPreference}
          onRowEditComplete={onRowEditComplete}
          globalFilter={globalFilter}
          dataKey="SpotPreferenceCode"
          columns={columns}
          setyup={setyup}
          scrollHeight="70vh"
          setVisible={setVisible}
        />
      </Card>
    </>
  );
};

export default SpotPreferenceMaster;
