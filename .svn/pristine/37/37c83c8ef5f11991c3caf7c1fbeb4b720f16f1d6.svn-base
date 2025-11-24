import { useState, useEffect, useMemo, useRef } from 'react';
import { Badge, Drawer, Input, Alert } from 'components/ui';
import {
  apiGetLocationmaster,
  apiGetCurrencymaster,
  apiGetTimeZonemaster,
} from 'services/MasterService';
import { Button, Card } from 'components/ui';
import { HiOutlinePencil, HiPlusCircle } from 'react-icons/hi';
import LocationEdit from './LocationEdit';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import DisplayTable from 'views/Controls/DisplayTable';
import HeaderExtra from 'views/Controls/HeaderExtra';
import DrawerFooter from 'views/Controls/DrawerFooter';
import InputwithVoice from 'components/ui/Input/InputwithVoice';

const headerExtraContent = (openDrawer, globalFilter, setGlobalFilter) => {
  return (
    <span className="flex items-center">
      <span className="mr-1  font-semibold">
        <InputwithVoice
          value={globalFilter ?? ''}
          className=" solid"
          placeholder="Search all columns..."
          size="sm"
          onChange={(e) => {
            if (/^[0-9a-zA-Z\s]*$/.test(e.target.value)) {
              setGlobalFilter(e.target.value);
            }
          }}
        />
      </span>
      <span className="mr-1 font-semibold">
        <Button
          block
          variant="solid"
          size="sm"
          icon={<HiPlusCircle />}
          onClick={() => openDrawer()}
        >
          Add Location
        </Button>
      </span>
    </span>
  );
};

const Locationmaster = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editData, seteditData] = useState(['']);
  const [globalFilter, setGlobalFilter] = useState('');

  const [data, setdata] = useState(['']);
  const [currency, setCurrency] = useState([]);
  const [TimeZone, setTimeZone] = useState([]);
  const [message, setMessage] = useTimeOutMessage();
  const [log, setlog] = useState('');
  const formikRef = useRef();
  const formSubmit = () => {
    formikRef.current?.submitForm();
  };
  console.log(data);

  const statusColor = {
    1: 'bg-emerald-500',
    0: 'bg-red-500',
  };

  const columns = useMemo(
    () => [
      {
        header: 'Location',
        accessorKey: 'LocationName',
        cell: (props) => {
          const row = props.row.original;
          console.log(row);
          return (
            <div className="flex items-center">
              <Badge className={statusColor[row.IsActive]} />
              <span className="ml-2 rtl:mr-2 ">{row.LocationName}</span>
            </div>
          );
        },
      },
      {
        header: 'Short Name',
        accessorKey: 'ShortName',
      },
      //{
      //header: 'TimeZone Code',
      //  accessorKey: 'TimeZoneCode',
      //},
      // {
      //     header: 'Status',
      //     id: 'action',
      //     cell: (props) => {
      //         const row = props.row.original
      //         return (
      //             <div className="flex items-center">
      //                 <Badge className={statusColor[row.IsActive]} />
      //                 <span className="ml-2 rtl:mr-2 ">
      //                     {row.IsActive == 1 ? 'Active' : 'InActive'}
      //                 </span>
      //             </div>
      //         )
      //     },
      // },
    ],
    [],
  );
  useEffect(() => {
    (async (values) => {
      const resp = await apiGetLocationmaster(values);

      setdata(resp.data);
    })();
    (async (values) => {
      const Currency = await apiGetCurrencymaster(values);
      const formattedOptions = Currency.data.map((option) => ({
        value: option.CurrencyCode,
        label: option.CurrencyName,
      }));
      setCurrency(formattedOptions);
    })();
    (async (values) => {
      const TimeZone = await apiGetTimeZonemaster(values);
      const formattedOptions = TimeZone.data.map((option) => ({
        value: option.TimeZoneCode,
        label: option.TimeZoneName,
      }));
      setTimeZone(formattedOptions);
    })();
  }, []);
  const openDrawer = () => {
    setIsOpen(true);
  };

  const onDrawerClose = async (e, values) => {
    setIsOpen(false);
    const resp = await apiGetLocationmaster(values);
    setdata(resp.data);
    seteditData(['']);
  };

  // //console.log(log)
  return (
    <>
      {message && (
        <Alert className="mb-4" type={log} showIcon>
          {message}
        </Alert>
      )}
      {/* {log && (
                <Alert className="mb-4" type="success" showIcon>
                    {log}
                </Alert>
            )} */}
      <Card
        header={<HeaderExtra Component={'Location Master'} />}
        headerExtra={headerExtraContent(
          openDrawer,
          globalFilter,
          setGlobalFilter,
        )}
        className="flex flex-col h-[87vh]"
        bodyClass="grow"
      >
        <DisplayTable
          data={data}
          columns={columns}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          seteditData={seteditData}
          openDrawer={openDrawer}
          ExportName={'LocationMaster'}
        />
      </Card>

      <Drawer
        title={
          editData.LocationName ? (
            <p className="text-xl font-medium flex ">
              <center>
                <Button
                  size="xs"
                  variant="twoTone"
                  icon={<HiOutlinePencil />}
                ></Button>
              </center>
              &nbsp;&nbsp; Location Master
            </p>
          ) : (
            <p className="text-xl font-medium flex ">
              <center>
                <Button
                  size="xs"
                  variant="twoTone"
                  icon={<HiPlusCircle />}
                ></Button>
              </center>
              &nbsp;&nbsp;Location Master
            </p>
          )
        }
        isOpen={isOpen}
        onClose={onDrawerClose}
        onRequestClose={onDrawerClose}
        width={
          window.screen.width > 400
            ? window.screen.width / 3
            : window.screen.width / 1.5
        }
        footer={
          <DrawerFooter onCancel={onDrawerClose} onSaveClick={formSubmit} />
        }
      >
        <LocationEdit
          ref={formikRef}
          onDrawerClose={onDrawerClose}
          editData={editData}
          setMessage={setMessage}
          setlog={setlog}
          currency={currency}
          TimeZone={TimeZone}
        />
      </Drawer>
    </>
  );
};

export default Locationmaster;
