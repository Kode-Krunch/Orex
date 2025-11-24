import { useState, useEffect, useMemo, useRef } from 'react';
import { Badge, Drawer, Input, Alert } from 'components/ui';
import {
  apiGetPlacemaster,
  apiGetStateMaster,
  apiGetZonemaster,
  apiGetCountryMaster,
} from 'services/MasterService';
import { Button, Card } from 'components/ui';
import { HiOutlinePencil, HiPlusCircle } from 'react-icons/hi';
import PlaceEdit from './PlaceEdit';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import DisplayTable from 'views/Controls/DisplayTable';
import HeaderExtra from 'views/Controls/HeaderExtra';
import DrawerFooter from 'views/Controls/DrawerFooter';
import InputwithVoice from 'components/ui/Input/InputwithVoice';

const headerExtraContent = (
  openDrawer,

  globalFilter,
  setGlobalFilter,
) => {
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
          Add Place
        </Button>
      </span>
    </span>
  );
};

const Placemaster = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editData, seteditData] = useState(['']);
  const [globalFilter, setGlobalFilter] = useState('');

  const [data, setdata] = useState(['']);
  const [state, setstate] = useState(['']);
  const [Zone, setZone] = useState([]);
  const [Country, setCountry] = useState([]);
  const [message, setMessage] = useTimeOutMessage();
  const [log, setlog] = useState('');
  const formikRef = useRef();
  const formSubmit = () => {
    formikRef.current?.submitForm();
  };
  const statusColor = {
    1: 'bg-emerald-500',
    0: 'bg-red-500',
  };

  const columns = useMemo(
    () => [
      {
        header: 'Place',
        accessorKey: 'PlaceName',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              <Badge className={statusColor[row.IsActive]} />
              <span className="ml-2 rtl:mr-2 ">{row.PlaceName}</span>
            </div>
          );
        },
      },
      // {
      //     header: 'Zone Name',
      //     accessorKey: 'Zone',
      //     cell: (props) => {
      //         const { Zone } = props.row.original
      //         return (
      //             <div className="flex items-center">
      //                 <span className="ml-2 rtl:mr-2 ">
      //                     {Zone?.ZoneName}
      //                 </span>
      //             </div>
      //         )
      //     },
      // },
      {
        header: 'State',
        accessorKey: 'State',
        cell: (props) => {
          const { State } = props.row.original;
          return (
            <div className="flex items-center">
              <span className="ml-2 rtl:mr-2 ">{State?.StateName}</span>
            </div>
          );
        },
      },
      {
        header: 'Country',
        accessorKey: 'Country',
        cell: (props) => {
          const { Country } = props.row.original;
          return (
            <div className="flex items-center">
              <span className="ml-2 rtl:mr-2 ">{Country?.CountryName}</span>
            </div>
          );
        },
      },
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
      const resp = await apiGetPlacemaster(values);
      //console.log(resp.data)
      setdata(resp.data);
    })();
    (async (values) => {
      const State = await apiGetStateMaster(values);

      const formattedOptions = State.data.map((option) => ({
        value: option.StateCode,
        label: option.StateName,
      }));
      setstate(formattedOptions);
    })();
    (async (values) => {
      const Zone = await apiGetZonemaster(values);
      const formattedOptions = Zone.data.map((option) => ({
        value: option.ZoneCode,
        label: option.ZoneName,
      }));
      setZone(formattedOptions);
    })();
    (async (values) => {
      const Country = await apiGetCountryMaster(values);
      const formattedOptions = Country.data.map((option) => ({
        value: option.CountryCode,
        label: option.CountryName,
      }));
      setCountry(formattedOptions);
    })();
  }, []);

  const openDrawer = () => {
    setIsOpen(true);
  };

  const onDrawerClose = async (e, values) => {
    const resp = await apiGetPlacemaster(values);
    seteditData(['']);
    setdata(resp.data);
    setIsOpen(false);
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
        header={<HeaderExtra Component={'Place Master'} />}
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
          ExportName={'PlaceMaster'}
        />
      </Card>

      <Drawer
        title={
          editData.PlaceName ? (
            <p className="text-xl font-medium   flex ">
              <center>
                <Button
                  size="xs"
                  variant="twoTone"
                  icon={<HiOutlinePencil />}
                ></Button>
              </center>
              &nbsp;&nbsp; Place Master
            </p>
          ) : (
            <p className="text-xl font-medium   flex ">
              <center>
                <Button
                  size="xs"
                  variant="twoTone"
                  icon={<HiPlusCircle />}
                ></Button>
              </center>
              &nbsp;&nbsp;Place Master
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
        <PlaceEdit
          ref={formikRef}
          onDrawerClose={onDrawerClose}
          editData={editData}
          setMessage={setMessage}
          setlog={setlog}
          State={state}
          Zone={Zone}
          Country={Country}
        />
      </Drawer>
    </>
  );
};

export default Placemaster;
