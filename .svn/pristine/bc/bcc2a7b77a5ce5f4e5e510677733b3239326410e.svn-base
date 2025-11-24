import { Card, Notification, toast as toa } from 'components/ui';
import React, { useEffect, useRef, useState } from 'react';
import {
  apiGetSubGenremaster,
  Postsubgenre,
  Putsubgenre,
} from 'services/ProgrammingService';
import HeaderExtra from 'views/Controls/HeaderExtra';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { ConfirmDialog } from 'primereact/confirmdialog';
import {
  headerExtra,
} from 'views/Controls/DisplaytablewithEdit';
import DisplaytablewithEditImage from 'views/Controls/DisplaytablewithEditImage';

const SubGenreMaster = () => {
  const token = useSelector((state) => state.auth.session.token);
  const channel = useSelector((state) => state.locale.selectedChannel);
  const [avatarImg, setAvatarImg] = useState('');
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
  const [SubGenreName, setSubGenreName] = useState('');
  const [addnew, setaddnew] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
  const [visible, setVisible] = useState(false);
  const [yup, setyup] = useState();
  const toast = useRef(null);

  const accept = () => {
    toggleSwitch(yup);
  };
  const [SubGenre, setSubGenre] = useState();

  useEffect(() => {
    count.current = count.current + 1;

    if (count.current == 1) {
      (async (values) => {
        const respSubGenre = await apiGetSubGenremaster(channel.LocationCode, channel.ChannelCode);
        const reversedSubGenreWithNumbers = [...respSubGenre.data]
          .reverse()
          .map((category, index) => ({
            ...category,
            serialNumber: index + 1,
          }));

        setSubGenre(reversedSubGenreWithNumbers);
        // console.log('SongSubGenre',newData)
      })();
    }
  }, []);

  const onRowEditComplete = (e) => {
    let _SubGenre = [...SubGenre];
    let { newData, index } = e;
    console.log(newData);
    _SubGenre[index].SubGenreName = newData.SubGenreName;
    _SubGenre[index].IsActive = newData.IsActive;
    _SubGenre[index].Genre_Image = avatarImg;
    _SubGenre[index].LocationCode = channel.LocationCode;
    _SubGenre[index].ChannelCode = channel.ChannelCode;
    if (!newData.SubGenreName) {
      return;
    }

    console.log('_SubGenre', _SubGenre);

    Putsubgenre(newData, token, avatarImg)
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
        _SubGenre[index] = data;
        _SubGenre[index].serialNumber = newData.serialNumber;
        _SubGenre[index].SubGenreName = newData.SubGenreName;
        _SubGenre[index].IsActive = newData.IsActive;
        _SubGenre[index].LocationCode = channel.LocationCode;
        _SubGenre[index].ChannelCode = channel.ChannelCode;
        setSubGenre(_SubGenre);
        closeAfter2000ms('Data Updated Succesfully', 'success');
        setAvatarImg('');
      })
      .catch((error) => {
        // handle error
        setAvatarImg('');
        console.log(error);
      });
  };

  const addNewRecord = () => {
    if (SubGenreName) {
      const newRecord = {
        SubGenreName: SubGenreName,
        IsActive: 1,
        LocationCode: channel.LocationCode,
        ChannelCode: channel.ChannelCode,
      };

      Postsubgenre(newRecord, token)
        .then((response) => {
          if (response.status == 204) {
            closeAfter2000ms('Data Already Exists.', 'warning');
          }
          if (response.status == 200) {
            newRecord.serialNumber = SubGenre.length + 1;
            setSubGenre((prevSubGenre) => [...prevSubGenre, newRecord]);
            // show('Data Added Successfully')
            closeAfter2000ms('Data Added Succesfully', 'success');
          }
          setSubGenreName('');
          setaddnew(false);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    } else {
      closeAfter2000ms('Kindly Enter SubGenre Name', 'danger');
    }
  };

  const toggleSwitch = (index) => {
    console.log('SubGenre', SubGenre);
    const updatedSubGenre = [...SubGenre];
    let row = updatedSubGenre[index];
    row.IsActive = row.IsActive == 1 ? 0 : 1;
    Putsubgenre(row, token)
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
        data.SubGenreName = row.SubGenreName;

        updatedSubGenre[index] = data;
        setSubGenre(updatedSubGenre);
        closeAfter2000ms('Data Updated Succesfully', 'success');
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };
  const columns = [
    { field: 'serialNumber', header: 'Sr.', width: '0.5%' },
    { field: 'SubGenreName', header: 'SubGenreName', width: '20%' },
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
                <HeaderExtra ModuleText="Programming" Component={'SubGenre'} />
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
          SubGenreName,
          setSubGenreName,
          'Sub Genre',
          SubGenre,
          columns,
        )}
        bodyClass="text-center"
      >
        <DisplaytablewithEditImage
          data={SubGenre}
          onRowEditComplete={onRowEditComplete}
          globalFilter={globalFilter}
          dataKey="SubGenreCode"
          columns={columns}
          setyup={setyup}
          scrollHeight="70vh"
          setVisible={setVisible}
          title={'SubGenre'}
          setAvatarImg={setAvatarImg}
          avatarImg={avatarImg}
          img={'Genre_Image'}
        />
      </Card>
    </>
  );
};

export default SubGenreMaster;
