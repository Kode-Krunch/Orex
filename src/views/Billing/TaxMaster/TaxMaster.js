import { Card, Notification, toast as toa } from 'components/ui';
import React, { useEffect, useRef, useState } from 'react';
import { apiGetTaxMaster, UpdateTax, AddTax } from 'services/SalesAdminService';
import HeaderExtra from 'views/Controls/HeaderExtra';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { ConfirmDialog } from 'primereact/confirmdialog';
import DisplaytablewithEdit, {
  headerExtra,
} from 'views/Controls/DisplaytablewithEdit';

/* CONSTANTS */
const columns = [
  { field: 'serialNumber', header: 'Sr.', width: '0.5%' },
  { field: 'TaxName', header: 'TaxName', width: '20%' },
];

const TaxMaster = () => {
  /* REDUX */
  const token = useSelector((state) => state.auth.session.token);

  /*STATES */
  const [TaxName, setTaxName] = useState('');
  const [addnew, setaddnew] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
  const [visible, setVisible] = useState(false);
  const [yup, setyup] = useState();
  const [Tax, setTax] = useState();

  /* HOOKS */
  const toast = useRef(null);

  /* USE EFFECTS */
  useEffect(() => {
    (async () => {
      const respTax = await apiGetTaxMaster();
      const reversedTaxWithNumbers = [...respTax.data]
        .reverse()
        .map((category, index) => ({
          ...category,
          serialNumber: index + 1,
        }));
      setTax(reversedTaxWithNumbers);
    })();
  }, []);

  /* EVENT HANDLERS */
  const onRowEditComplete = (e) => {
    let _Tax = [...Tax];
    let { newData, index } = e;
    if (!newData.TaxName) {
      return;
    }
    _Tax[index] = newData;
    UpdateTax(newData, newData.TaxCode)
      .then((response) => {
        if (response.status === 200) {
          _Tax[index] = response.data;
          _Tax[index].serialNumber = newData.serialNumber;
          setTax(_Tax);
          closeAfter2000ms('Data Updated Succesfully', 'success');
        } else if (response.status == 204) {
          closeAfter2000ms('Data Already Exists.', 'warning');
          return null;
        } else {
          closeAfter2000ms('Something went wrong', 'danger');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addNewRecord = () => {
    if (TaxName) {
      const newRecord = {
        TaxName: TaxName,
        IsActive: 1,
      };
      AddTax(newRecord, token)
        .then((response) => {
          if (response.status == 204) {
            closeAfter2000ms('Data Already Exists.', 'warning');
            return null;
          }
          if (response.status == 200) {
            newRecord.serialNumber = Tax.length + 1;
            setTax((prevTax) => [...prevTax, newRecord]);
            // show('Data Added Successfully')
            closeAfter2000ms('Data Added Succesfully', 'success');
          }
          setTaxName('');
          setaddnew(false);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    } else {
      closeAfter2000ms('Kindly Enter Tax Name', 'danger');
    }
  };

  const accept = () => {
    toggleSwitch(yup);
  };

  const toggleSwitch = (index) => {
    const updatedTax = [...Tax];
    let row = updatedTax[index];
    row.IsActive = row.IsActive == 1 ? 0 : 1;
    UpdateTax(row, row.TaxCode)
      .then((response) => {
        if (response.status == 204) {
          closeAfter2000ms('Data Already Exists.', 'warning');
          return null;
        }
        return response.json();
      })
      .then((data) => {
        // handle successful response
        data.serialNumber = row.serialNumber;
        data.IsActive = row.IsActive;
        data.TaxName = row.TaxName;

        updatedTax[index] = data;
        setTax(updatedTax);
        closeAfter2000ms('Data Updated Succesfully', 'success');
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
                <HeaderExtra ModuleText="Programming" Component={'Tax'} />
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
          TaxName,
          setTaxName,
          'Tax',
          Tax,
          columns,
        )}
        bodyClass="text-center"
      >
        <DisplaytablewithEdit
          data={Tax}
          onRowEditComplete={onRowEditComplete}
          globalFilter={globalFilter}
          dataKey="TaxCode"
          columns={columns}
          setyup={setyup}
          scrollHeight="70vh"
          setVisible={setVisible}
        />
      </Card>
    </>
  );
};

export default TaxMaster;
