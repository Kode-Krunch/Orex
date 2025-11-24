import { Card, Notification, toast as toa } from 'components/ui';
import React, { useEffect, useRef, useState } from 'react';
import { apiGetUnitMaster, PostUnit, PutUnit } from 'services/MasterService';
import HeaderExtra from 'views/Controls/HeaderExtra';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { ConfirmDialog } from 'primereact/confirmdialog';
import DisplaytablewithEdit, {
  headerExtra,
} from 'views/Controls/DisplaytablewithEdit';

const UnitMaster = () => {
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
  const [UnitNumber, setUnitNumber] = useState('');
  const [addnew, setaddnew] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');

  const [visible, setVisible] = useState(false);
  const [yup, setyup] = useState();
  const toast = useRef(null);

  const accept = () => {
    toggleSwitch(yup);
  };
  const [Unit, setUnit] = useState();

  useEffect(() => {
    count.current = count.current + 1;

    if (count.current == 1) {
      (async (values) => {
        const respUnit = await apiGetUnitMaster();
        const reversedUnitWithNumbers = [...respUnit.data]
          .reverse()
          .map((category, index) => ({
            ...category,
            serialNumber: index + 1,
          }));

        setUnit(reversedUnitWithNumbers);
        // console.log('SongUnit',newData)
      })();
    }
  }, []);

  const onRowEditComplete = (e) => {
    let _Unit = [...Unit];
    let { newData, index } = e;
    _Unit[index].UnitNumber = newData.UnitNumber;
    _Unit[index].IsActive = newData.IsActive;
    if (!newData.UnitNumber) {
      return;
    }

    PutUnit(newData, token)
      .then((response) => {
        if (response.status == 204) {
          closeAfter2000ms('Data Already Exists.', 'warning');
          return null;
        }
        if (response.status == 200) {
          closeAfter2000ms('Data Updated Succesfully', 'success');
        }
        return response.json();
      })
      .then((data) => {
        _Unit[index] = data;
        _Unit[index].serialNumber = newData.serialNumber;
        _Unit[index].UnitNumber = newData.UnitNumber;
        _Unit[index].IsActive = newData.IsActive;
        setUnit(_Unit);
        closeAfter2000ms('Data Updated Succesfully', 'success');
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const addNewRecord = () => {
    if (UnitNumber) {
      const newRecord = {
        UnitNumber: UnitNumber,
        ShortName: UnitNumber.substring(0, 2),
        IsActive: 1,
      };

      PostUnit(newRecord, token)
        .then((response) => {
          if (response.status == 204) {
            closeAfter2000ms('Data Already Exists.', 'warning');
          }
          if (response.status == 200) {
            newRecord.serialNumber = Unit.length + 1;
            setUnit((prevUnit) => [...prevUnit, newRecord]);
            // show('Data Added Successfully')
            closeAfter2000ms('Data Added Succesfully', 'success');
          }
          setUnitNumber('');
          setaddnew(false);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    } else {
      closeAfter2000ms('Kindly Enter Unit In Sec', 'danger');
    }
  };

  const toggleSwitch = (index) => {
    console.log('Unit', Unit);
    const updatedUnit = [...Unit];
    let row = updatedUnit[index];
    row.IsActive = row.IsActive == 1 ? 0 : 1;
    PutUnit(row, token)
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
        data.UnitNumber = row.UnitNumber;
        data.ShortName = row.ShortName;

        updatedUnit[index] = data;
        setUnit(updatedUnit);
        closeAfter2000ms('Data Updated Succesfully', 'success');
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };
  const columns = [
    { field: 'serialNumber', header: 'Sr.', width: '0.5%' },
    { field: 'UnitNumber', header: 'UnitNumber', width: '20%' },
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
                <HeaderExtra ModuleText="Programming" Component={'Unit'} />
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
          UnitNumber,
          setUnitNumber,
          'Unit',
          Unit,
          columns,
        )}
        bodyClass="text-center"
      >
        <DisplaytablewithEdit
          data={Unit}
          onRowEditComplete={onRowEditComplete}
          globalFilter={globalFilter}
          dataKey="UnitID"
          columns={columns}
          setyup={setyup}
          scrollHeight="70vh"
          setVisible={setVisible}
        />
      </Card>
    </>
  );
};

export default UnitMaster;
