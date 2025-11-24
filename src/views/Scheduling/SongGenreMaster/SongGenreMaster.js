import { Card, Notification, toast as toa } from 'components/ui';
import React, { useEffect, useRef, useState } from 'react';
import {
  apiGetSongGenreMaster,
  UpdateSongGenre,
  AddSongGenre,
} from 'services/SchedulingService';
import HeaderExtra from 'views/Controls/HeaderExtra';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { ConfirmDialog } from 'primereact/confirmdialog';
import DisplaytablewithEdit, {
  headerExtra,
} from 'views/Controls/DisplaytablewithEdit';

const SongGenreMaster = () => {
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
  const [SongGenreName, setSongGenreName] = useState('');
  const [addnew, setaddnew] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');

  const [visible, setVisible] = useState(false);
  const [yup, setyup] = useState();
  const toast = useRef(null);

  const accept = () => {
    toggleSwitch(yup);
  };
  const [SongGenre, setSongGenre] = useState();

  useEffect(() => {
    count.current = count.current + 1;

    if (count.current == 1) {
      (async (values) => {
        const respGener = await apiGetSongGenreMaster();
        const reversedSongCategoriesWithNumbers = [...respGener.data]
          .reverse()
          .map((category, index) => ({
            ...category,
            serialNumber: index + 1,
          }));

        setSongGenre(reversedSongCategoriesWithNumbers);
        // console.log('SongGenre',newData)
      })();
    }
  }, []);

  const onRowEditComplete = (e) => {
    let _SongGenre = [...SongGenre];
    let { newData, index } = e;
    console.log(newData);
    _SongGenre[index] = newData;
    if (!newData.SongGenreName) {
      return;
    }
    UpdateSongGenre(newData, token)
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

        _SongGenre[index] = data;
        _SongGenre[index].serialNumber = newData.serialNumber;
        setSongGenre(_SongGenre);
        closeAfter2000ms('Data Updated Succesfully', 'success');
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const addNewRecord = () => {
    if (SongGenreName) {
      const newRecord = {
        SongGenreName: SongGenreName,
        IsActive: 1,
      };

      AddSongGenre(newRecord, token)
        .then((response) => {
          if (response.status == 204) {
            closeAfter2000ms('Data Already Exists.', 'warning');
          }
          if (response.status == 200) {
            newRecord.serialNumber = SongGenre.length + 1;
            setSongGenre((prevSongGenre) => [...prevSongGenre, newRecord]);
            // show('Data Added Successfully')
            closeAfter2000ms('Data Added Succesfully', 'success');
          }
          setSongGenreName('');
          setaddnew(false);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    } else {
      closeAfter2000ms('Kindly Enter Song Genre Name', 'danger');
    }
  };

  const toggleSwitch = (index) => {
    const updatedSongGenre = [...SongGenre];
    let row = updatedSongGenre[index];
    row.IsActive = row.IsActive == 1 ? 0 : 1;
    UpdateSongGenre(row, token)
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
        data.serialNumber = row.serialNumber;
        updatedSongGenre[index] = data;
        setSongGenre(updatedSongGenre);
        closeAfter2000ms('Data Updated Succesfully', 'success');
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };
  const columns = [
    { field: 'serialNumber', header: 'Sr.', width: '0.5%' },
    { field: 'SongGenreName', header: 'SongGenreName', width: '20%' },
    // Add more columns as needed
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
                <HeaderExtra ModuleText="Scheduling" Component={'Song Genre'} />
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
          SongGenreName,
          setSongGenreName,
          'Song Genre',
          SongGenre,
          columns,
        )}
        bodyClass="text-center"
      >
        <DisplaytablewithEdit
          data={SongGenre}
          onRowEditComplete={onRowEditComplete}
          globalFilter={globalFilter}
          dataKey="SongGenreCode"
          columns={columns}
          setyup={setyup}
          scrollHeight="70vh"
          setVisible={setVisible}
        />
      </Card>
    </>
  );
};

export default SongGenreMaster;
