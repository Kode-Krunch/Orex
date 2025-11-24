import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Notification, toast as toa } from 'components/ui';
import { Toast } from 'primereact/toast';
import { ConfirmDialog } from 'primereact/confirmdialog';
import DisplaytablewithEdit, {
  headerExtra,
} from 'views/Controls/DisplaytablewithEdit';
import HeaderExtra from 'views/Controls/HeaderExtra';

const SmallMaster = ({
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

  const closeAfter2000ms = (mes, ty) => {
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
  };

  const [data, setData] = useState([]);
  const [addNew, setAddNew] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
  const [visible, setVisible] = useState(false);
  const [yup, setyup] = useState();
  const [formData, setFormData] = useState(defaultValues);
  const toast = useRef(null);

  useEffect(() => {
    count.current = count.current + 1;
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
    let _data = [...data];
    let { newData, index } = e;

    _data[index] = { ...newData };
    try {
      const response = await apiPut(newData, token);
      if (response.status === 204) {
        closeAfter2000ms('Data Already Exists.', 'warning');
        return;
      }

      if (response.status === 200) {
        closeAfter2000ms('Data Updated Successfully', 'success');
        setData(_data);
        return;
      }
    } catch (error) {
      console.error(error);
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
        }
        if (response.status === 200) {
          setData((prevData) => {
            const updatedData = prevData.map((item, index) => ({
              ...item,
              serialNumber: index + 2,
            }));
            return [newRecord, ...updatedData];
          });

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
    let row = updatedData[index];
    row.IsActive = row.IsActive === 1 ? 0 : 1;

    try {
      const response = await apiPut(row, token);
      if (response.status === 204) {
        closeAfter2000ms('Data Already Exists.', 'warning');
        return;
      }

      if (response.status === 200) {
        closeAfter2000ms('Data Updated Successfully', 'success');
        setData(updatedData);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleSwitch = (index) => {
    console.log(index);
    setyup(index);
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
            <div
              className="flex flex-col items-center"
              style={{ marginLeft: '-20%' }}
            ></div>
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
          (value) => setFormData({ ...formData, [MainFieldName]: value }),
          title,
          data,
          columns,
        )}
        bodyClass="text-center"
      >
        <DisplaytablewithEdit
          data={data}
          onRowEditComplete={onRowEditComplete}
          globalFilter={globalFilter}
          dataKey={dataKey}
          columns={columns}
          setyup={handleToggleSwitch}
          scrollHeight="70vh"
          setVisible={setVisible}
        />
      </Card>
    </>
  );
};

export default SmallMaster;
