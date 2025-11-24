import { Card, Notification, toast as toa } from 'components/ui';
import React, { useEffect, useRef, useState } from 'react';
import {
  apiGetvideoformatMaster,
  UpdateVideoFormat,
  AddVideoFormat,
} from 'services/ProgrammingService';
import HeaderExtra from 'views/Controls/HeaderExtra';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { ConfirmDialog } from 'primereact/confirmdialog';
import DisplaytablewithEdit, {
  headerExtra,
} from 'views/Controls/DisplaytablewithEdit';

const VideoFormatMaster = () => {
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
  const [VideoFormatTypeName, setVideoFormatTypeName] = useState('');
  const [addnew, setaddnew] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');

  const [visible, setVisible] = useState(false);
  const [yup, setyup] = useState();
  const toast = useRef(null);

  const accept = () => {
    toggleSwitch(yup);
  };
  const [VideoFormat, setVideoFormat] = useState();

  useEffect(() => {
    count.current = count.current + 1;

    if (count.current == 1) {
      (async (values) => {
        const respVideoFormat = await apiGetvideoformatMaster();
        const reversedVideoFormatWithNumbers = [...respVideoFormat.data]
          .reverse()
          .map((category, index) => ({
            ...category,
            serialNumber: index + 1,
          }));

        setVideoFormat(reversedVideoFormatWithNumbers);
        // console.log('SongGenre',newData)
      })();
    }
  }, []);

  const onRowEditComplete = (e) => {
    let _VideoFormat = [...VideoFormat];
    let { newData, index } = e;
    console.log(newData);
    _VideoFormat[index].VideoFormatTypeName = newData.VideoFormatTypeName;
    _VideoFormat[index].IsActive = newData.IsActive;
    if (!newData.VideoFormatTypeName) {
      return;
    }

    console.log('_VideoFormat', _VideoFormat);

    UpdateVideoFormat(newData, token)
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

        _VideoFormat[index] = data;
        _VideoFormat[index].serialNumber = newData.serialNumber;
        _VideoFormat[index].VideoFormatTypeName = newData.VideoFormatTypeName;
        _VideoFormat[index].IsActive = newData.IsActive;
        setVideoFormat(_VideoFormat);
        closeAfter2000ms('Data Updated Succesfully', 'success');
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const addNewRecord = () => {
    if (VideoFormatTypeName) {
      const newRecord = {
        VideoFormatTypeName: `.${VideoFormatTypeName}`,
        IsActive: 1,
      };

      AddVideoFormat(newRecord, token)
        .then((response) => {
          if (response.status == 204) {
            closeAfter2000ms('Data Already Exists.', 'warning');
          }
          if (response.status == 200) {
            newRecord.serialNumber = VideoFormat.length + 1;
            setVideoFormat((prevVideoFormat) => [
              ...prevVideoFormat,
              newRecord,
            ]);
            // show('Data Added Successfully')
            closeAfter2000ms('Data Added Succesfully', 'success');
          }
          setVideoFormatTypeName('');
          setaddnew(false);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    } else {
      closeAfter2000ms('Kindly Enter Video Format Name', 'danger');
    }
  };

  const toggleSwitch = (index) => {
    console.log('VideoFormat', VideoFormat);
    const updatedVideoFormat = [...VideoFormat];
    let row = updatedVideoFormat[index];
    row.IsActive = row.IsActive == 1 ? 0 : 1;
    UpdateVideoFormat(row, token)
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
        data.VideoFormatTypeName = '.' + row.VideoFormatTypeName;

        updatedVideoFormat[index] = data;
        setVideoFormat(updatedVideoFormat);
        closeAfter2000ms('Data Updated Succesfully', 'success');
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };
  const columns = [
    { field: 'serialNumber', header: 'Sr.', width: '0.5%' },
    {
      field: 'VideoFormatTypeName',
      header: 'VideoFormatTypeName',
      width: '20%',
    },
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
                  Component={'Video Format'}
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
          VideoFormatTypeName,
          setVideoFormatTypeName,
          'Video Format',
          VideoFormat,
          columns,
        )}
        bodyClass="text-center"
      >
        <DisplaytablewithEdit
          data={VideoFormat}
          onRowEditComplete={onRowEditComplete}
          globalFilter={globalFilter}
          dataKey="VideoFormatCode"
          columns={columns}
          setyup={setyup}
          scrollHeight="70vh"
          setVisible={setVisible}
        />
      </Card>
    </>
  );
};

export default VideoFormatMaster;
