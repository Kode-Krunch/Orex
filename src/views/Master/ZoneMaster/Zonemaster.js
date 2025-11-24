import { Card, Notification, toast as toa } from 'components/ui';
import React, { useEffect, useRef, useState } from 'react';
import { apiGetZonemaster, Postzone, Putzone } from 'services/MasterService';
import HeaderExtra from 'views/Controls/HeaderExtra';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { ConfirmDialog } from 'primereact/confirmdialog';
import DisplaytablewithEdit, {
  headerExtra,
} from 'views/Controls/DisplaytablewithEdit';

const ZoneMaster = () => {
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
  const [ZoneName, setZoneName] = useState('');
  const [ShortName, setShortName] = useState('');
  const [addnew, setaddnew] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');

  const [visible, setVisible] = useState(false);
  const [yup, setyup] = useState();
  const toast = useRef(null);

  const accept = () => {
    toggleSwitch(yup);
  };
  const [Zone, setZone] = useState();

  useEffect(() => {
    count.current = count.current + 1;

    if (count.current == 1) {
      (async (values) => {
        const respZone = await apiGetZonemaster();
        const reversedZoneWithNumbers = [...respZone.data]
          .reverse()
          .map((category, index) => ({
            ...category,
            serialNumber: index + 1,
          }));

        setZone(reversedZoneWithNumbers);
        // console.log('SongZone',newData)
      })();
    }
  }, []);

  const onRowEditComplete = (e) => {
    let _Zone = [...Zone];
    let { newData, index } = e;
    console.log(newData);
    _Zone[index].ZoneName = newData.ZoneName;
    _Zone[index].ShortName = newData.ShortName;
    _Zone[index].IsActive = newData.IsActive;
    if (!newData.ZoneName) {
      return;
    }

    console.log('_Zone', _Zone);

    Putzone(newData, token)
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
        _Zone[index] = data;
        _Zone[index].serialNumber = newData.serialNumber;
        _Zone[index].ZoneName = newData.ZoneName;
        _Zone[index].ShortName = newData.ShortName;
        _Zone[index].IsActive = newData.IsActive;
        setZone(_Zone);
        closeAfter2000ms('Data Updated Succesfully', 'success');
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const addNewRecord = () => {
    if (ZoneName) {
      const newRecord = {
        ZoneName: ZoneName,
        ShortName: ZoneName.substring(0, 2),
        IsActive: 1,
      };

      Postzone(newRecord, token)
        .then((response) => {
          if (response.status == 204) {
            closeAfter2000ms('Data Already Exists.', 'warning');
          }
          if (response.status == 200) {
            newRecord.serialNumber = Zone.length + 1;
            setZone((prevZone) => [...prevZone, newRecord]);
            // show('Data Added Successfully')
            closeAfter2000ms('Data Added Succesfully', 'success');
          }
          setZoneName('');
          setShortName('');
          setaddnew(false);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    } else {
      closeAfter2000ms('Kindly Enter Zone Name', 'danger');
    }
  };

  const toggleSwitch = (index) => {
    console.log('Zone', Zone);
    const updatedZone = [...Zone];
    let row = updatedZone[index];
    row.IsActive = row.IsActive == 1 ? 0 : 1;
    Putzone(row, token)
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
        data.ZoneName = row.ZoneName;
        data.ShortName = row.ShortName;

        updatedZone[index] = data;
        setZone(updatedZone);
        closeAfter2000ms('Data Updated Succesfully', 'success');
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };
  const columns = [
    { field: 'serialNumber', header: 'Sr.', width: '0.5%' },
    { field: 'ZoneName', header: 'ZoneName', width: '20%' },
    { field: 'ShortName', header: 'ShortName', width: '20%' },
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
                <HeaderExtra ModuleText="Programming" Component={'Zone'} />
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
          ZoneName,
          setZoneName,
          ShortName,
          setShortName,
          'Zone',
          Zone,
          columns,
        )}
        bodyClass="text-center"
      >
        <DisplaytablewithEdit
          data={Zone}
          onRowEditComplete={onRowEditComplete}
          globalFilter={globalFilter}
          dataKey="ZoneCode"
          columns={columns}
          setyup={setyup}
          scrollHeight="70vh"
          setVisible={setVisible}
        />
      </Card>
    </>
  );
};

export default ZoneMaster;
