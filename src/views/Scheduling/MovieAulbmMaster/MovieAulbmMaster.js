import {
  Card,
  Notification,
  toast as toa,
  Button,
  Input,
  Switcher,
} from 'components/ui';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useRef, useState } from 'react';
import { UpdateMovieAlbum, AddMovieAlbum } from 'services/SchedulingService';

import HeaderExtra from 'views/Controls/HeaderExtra';
import { Toast } from 'primereact/toast';
import { HiPlusCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { apiGetMoviealbummaster } from 'services/MasterService';
import { ConfirmDialog } from 'primereact/confirmdialog';
import DisplaytablewithEdit, {
  headerExtra,
} from 'views/Controls/DisplaytablewithEdit';

const MovieAulbmMaster = () => {
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
  const [MovieAlbumName, setMovieAlbumName] = useState('');
  const [addnew, setaddnew] = useState(false);

  const [visible, setVisible] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
  const [yup, setyup] = useState();
  const toast = useRef(null);

  const accept = () => {
    toggleSwitch(yup);
  };
  const [MovieAlbum, setMovieAlbum] = useState();

  useEffect(() => {
    count.current = count.current + 1;

    if (count.current == 1) {
      (async (values) => {
        const respGener = await apiGetMoviealbummaster();

        const reversedSongCategoriesWithNumbers = [...respGener.data]
          .reverse()
          .map((category, index) => ({
            ...category,
            serialNumber: index + 1,
          }));

        setMovieAlbum(reversedSongCategoriesWithNumbers);
        // console.log('MovieAlbum',newData)
      })();
    }
  }, []);

  const onRowEditComplete = (e) => {
    console.log('MovieAlbum', MovieAlbum);
    let _MovieAlbum = [...MovieAlbum];
    let { newData, index } = e;

    _MovieAlbum[index] = newData;
    if (!newData.MovieAlbumName) {
      return;
    }
    UpdateMovieAlbum(newData, token)
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

        _MovieAlbum[index] = data;
        _MovieAlbum[index].serialNumber = newData.serialNumber;
        setMovieAlbum(_MovieAlbum);

        closeAfter2000ms('Data Updated Succesfully', 'success');
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const addNewRecord = () => {
    if (MovieAlbumName) {
      const newRecord = {
        MovieAlbumName: MovieAlbumName,
        IsActive: 1,
      };

      AddMovieAlbum(newRecord, token)
        .then((response) => {
          if (response.status == 204) {
            console.log(response);
            closeAfter2000ms('Data Already Exists.', 'warning');
            return null;
          }

          return response.json();
        })
        .then((data) => {
          newRecord.serialNumber = MovieAlbum.length + 1;
          newRecord.MovieAlbumCode = data.MovieAlbumCode;
          setMovieAlbum((prevMovieAlbum) => [...prevMovieAlbum, newRecord]);
          closeAfter2000ms('Data Added Succesfully', 'success');
          setMovieAlbumName('');
          setaddnew(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      closeAfter2000ms('Kindly Enter Movie Album Name', 'danger');
    }
  };

  const toggleSwitch = (index) => {
    console.log('toggleSwitch', index);
    const updatedMovieAlbum = [...MovieAlbum];
    let row = updatedMovieAlbum[index];
    console.log('row1', row);
    row.IsActive = row.IsActive == 1 ? 0 : 1;
    console.log('row2', row);
    UpdateMovieAlbum(row, token)
      .then((response) => {
        if (response.status == 204) {
          closeAfter2000ms('Data Already Exists.', 'warning');
          return null;
        }

        return response.json();
      })
      .then((data) => {
        data.serialNumber = row.serialNumber;
        updatedMovieAlbum[index] = data;
        setMovieAlbum(updatedMovieAlbum);

        closeAfter2000ms('Status Updated Succesfully', 'success');
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };
  const columns = [
    { field: 'serialNumber', header: 'Sr.', width: '0.5%' },
    { field: 'MovieAlbumName', header: 'MovieAlbumName', width: '20%' },
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
                <HeaderExtra
                  ModuleText="Scheduling"
                  Component={'Movie Album'}
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
          MovieAlbumName,
          setMovieAlbumName,
          'Movie Album',
          MovieAlbum,
        )}
        bodyClass="text-center"
      >
        <DisplaytablewithEdit
          data={MovieAlbum}
          onRowEditComplete={onRowEditComplete}
          globalFilter={globalFilter}
          dataKey="MovieAlbumCode"
          columns={columns}
          setyup={setyup}
          scrollHeight="70vh"
          setVisible={setVisible}
        />
      </Card>
    </>
  );
};

export default MovieAulbmMaster;
