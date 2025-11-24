import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Notification, toast as toa } from 'components/ui';
import { Toast } from 'primereact/toast';
import { ConfirmDialog } from 'primereact/confirmdialog';
import DisplaytablewithEdit, {
  headerExtra,
} from 'views/Controls/DisplaytablewithEdit';
import HeaderExtra from 'views/Controls/HeaderExtra';
import DisplaytablewithEditImage from './DisplaytablewithEditImage';

const ImageSmallMaster = ({
  title,
  moduleText,
  apiGet,
  apiPost,
  apiPut,
  columns,
  defaultValues,
  MainFieldName,
  dataKey,
}) => {
  const token = useSelector((state) => state.auth.session.token);
  const count = useRef(0);
  const [data, setData] = useState([]);
  const [addNew, setAddNew] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
  const [visible, setVisible] = useState(false);
  const [yup, setYup] = useState();
  const [formData, setFormData] = useState(defaultValues);
  const [avatarImg, setAvatarImg] = useState('');
  const toast = useRef(null);

  const closeAfter2000ms = (message, type) => {
    toa.push(
      <Notification
        closable
        type={type}
        duration={2000}
        title={type.charAt(0).toUpperCase() + type.slice(1)}
      >
        {message}
      </Notification>,
    );
  };

  useEffect(() => {
    count.current += 1;

    if (count.current === 1) {
      (async () => {
        const response = await apiGet();
        const reversedDataWithNumbers = [...response.data]
          .reverse()
          .map((item, index) => ({
            ...item,
            serialNumber: index + 1,
          }));

        setData(reversedDataWithNumbers);
      })();
    }
  }, [apiGet]);

  const onRowEditComplete = async (e) => {
    const { newData, index } = e;
    const updatedData = [...data];
    updatedData[index] = { ...newData, Team_Image: avatarImg };

    try {
      const response = await apiPut(newData, token, avatarImg);
      if (response.status === 204) {
        closeAfter2000ms('Data Already Exists.', 'warning');
      } else if (response.status === 200) {
        closeAfter2000ms('Data Updated Successfully', 'success');
        setData(updatedData);
      }
      setAvatarImg('');
    } catch (error) {
      console.error(error);
      setAvatarImg();
    }
  };

  const addNewRecord = async () => {
    if (formData) {
      const newRecord = {
        ...formData,
        serialNumber: 1,
        IsActive: 1,
        ShortName: formData[MainFieldName].substring(0, 2),
      };

      try {
        const response = await apiPost(newRecord, token);
        if (response.status === 204) {
          closeAfter2000ms('Data Already Exists.', 'warning');
        } else if (response.status === 200) {
          setData((prevData) => [
            newRecord,
            ...prevData.map((item, index) => ({
              ...item,
              serialNumber: index + 2,
            })),
          ]);
          closeAfter2000ms('Data Added Successfully', 'success');
          setFormData(defaultValues);
          setAddNew(false);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      closeAfter2000ms('Kindly Enter Department Name', 'danger');
    }
  };

  const accept = () => {
    toggleSwitch(yup);
  };

  const toggleSwitch = async (index) => {
    const updatedData = [...data];
    const row = updatedData[index];
    row.IsActive = row.IsActive === 1 ? 0 : 1;

    try {
      const response = await apiPut(row, token);
      if (response.status === 204) {
        closeAfter2000ms('Data Already Exists.', 'warning');
      } else if (response.status === 200) {
        closeAfter2000ms('Data Updated Successfully', 'success');
        setData(updatedData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleSwitch = (index) => {
    setYup(index);
    setVisible(true);
  };

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
                <HeaderExtra ModuleText={moduleText} Component={title} />
              </span>
            </div>
          </div>
        }
        headerExtra={headerExtra(
          globalFilter,
          setGlobalFilter,
          setAddNew,
          addNew,
          addNewRecord,
          formData[MainFieldName],
          (value) => setFormData({ ...formData, [MainFieldName]: value }),
          formData.ShortName,
          (value) => setFormData({ ...formData, ShortName: value }),
          title,
          data,
          columns,
        )}
        bodyClass="text-center"
      >
        <DisplaytablewithEditImage
          data={data}
          onRowEditComplete={onRowEditComplete}
          globalFilter={globalFilter}
          dataKey={dataKey}
          columns={columns}
          setyup={handleToggleSwitch}
          scrollHeight="70vh"
          setVisible={setVisible}
          title={title}
          setAvatarImg={setAvatarImg}
          avatarImg={avatarImg}
          img={'Team_Image'}
        />
      </Card>
    </>
  );
};

export default ImageSmallMaster;
