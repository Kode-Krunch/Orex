import { Card, Notification, toast as toa } from 'components/ui';
import React, { useEffect, useRef, useState } from 'react';
import {
  apiGetSponsortypemaster,
  PostSponsortype,
  PutSponsortype,
} from 'services/CreditcontrolService';
import HeaderExtra from 'views/Controls/HeaderExtra';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { ConfirmDialog } from 'primereact/confirmdialog';
import DisplaytablewithEdit, {
  headerExtra,
} from 'views/Controls/DisplaytablewithEdit';

const SponsorTypeMaster = () => {
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
  const [SponsorTypeName, setSponsorTypeName] = useState('');
  const [addnew, setaddnew] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');

  const [visible, setVisible] = useState(false);
  const [yup, setyup] = useState();
  const toast = useRef(null);

  const accept = () => {
    toggleSwitch(yup);
  };
  const [SponsorType, setSponsorType] = useState();

  useEffect(() => {
    count.current = count.current + 1;

    if (count.current == 1) {
      (async (values) => {
        const respSponsorType = await apiGetSponsortypemaster();
        const reversedSponsorTypeWithNumbers = [...respSponsorType.data]
          .reverse()
          .map((category, index) => ({
            ...category,
            serialNumber: index + 1,
          }));

        setSponsorType(reversedSponsorTypeWithNumbers);
        // console.log('SongSponsorType',newData)
      })();
    }
  }, []);

  const onRowEditComplete = (e) => {
    let _SponsorType = [...SponsorType];
    let { newData, index } = e;
    console.log(newData);
    _SponsorType[index].SponsorTypeName = newData.SponsorTypeName;
    _SponsorType[index].IsActive = newData.IsActive;
    if (!newData.SponsorTypeName) {
      return;
    }

    console.log('_SponsorType', _SponsorType);

    PutSponsortype(newData, token)
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
        _SponsorType[index] = data;
        _SponsorType[index].serialNumber = newData.serialNumber;
        _SponsorType[index].SponsorTypeName = newData.SponsorTypeName;
        _SponsorType[index].IsActive = newData.IsActive;
        setSponsorType(_SponsorType);
        closeAfter2000ms('Data Updated Succesfully', 'success');
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const addNewRecord = () => {
    if (SponsorTypeName) {
      const newRecord = {
        SponsorTypeName: SponsorTypeName,
        IsActive: 1,
      };

      PostSponsortype(newRecord, token)
        .then((response) => {
          if (response.status == 204) {
            closeAfter2000ms('Data Already Exists.', 'warning');
          }
          if (response.status == 200) {
            newRecord.serialNumber = SponsorType.length + 1;
            setSponsorType((prevSponsorType) => [
              ...prevSponsorType,
              newRecord,
            ]);
            // show('Data Added Successfully')
            closeAfter2000ms('Data Added Succesfully', 'success');
          }
          setSponsorTypeName('');
          setaddnew(false);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    } else {
      closeAfter2000ms('Kindly Enter SponsorType Name', 'danger');
    }
  };

  const toggleSwitch = (index) => {
    console.log('SponsorType', SponsorType);
    const updatedSponsorType = [...SponsorType];
    let row = updatedSponsorType[index];
    row.IsActive = row.IsActive == 1 ? 0 : 1;
    PutSponsortype(row, token)
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
        data.SponsorTypeName = row.SponsorTypeName;

        updatedSponsorType[index] = data;
        setSponsorType(updatedSponsorType);
        closeAfter2000ms('Data Updated Succesfully', 'success');
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };
  const columns = [
    { field: 'serialNumber', header: 'Sr.', width: '0.5%' },
    { field: 'SponsorTypeName', header: 'SponsorTypeName', width: '20%' },
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
                  Component={'SponsorType'}
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
          SponsorTypeName,
          setSponsorTypeName,
          'Sponsor Type',
          SponsorType,
          columns,
        )}
        bodyClass="text-center"
      >
        <DisplaytablewithEdit
          data={SponsorType}
          onRowEditComplete={onRowEditComplete}
          globalFilter={globalFilter}
          dataKey="SponsorTypeCode"
          columns={columns}
          setyup={setyup}
          scrollHeight="70vh"
          setVisible={setVisible}
        />
      </Card>
    </>
  );
};

export default SponsorTypeMaster;
