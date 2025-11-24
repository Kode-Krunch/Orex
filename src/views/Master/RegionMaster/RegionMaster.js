import { useState, useEffect, useMemo, useRef } from 'react';
import { Badge, Drawer, Input, Alert } from 'components/ui';
import { apiGetRegionmaster, apiGetZonemaster } from 'services/MasterService';
import { Button, Card } from 'components/ui';
import { HiOutlinePencil, HiPlusCircle } from 'react-icons/hi';
import RegionEdit from './RegionEdit';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import DisplayTable from 'views/Controls/DisplayTable';
import HeaderExtra from 'views/Controls/HeaderExtra';
import DrawerFooter from 'views/Controls/DrawerFooter';

const headerExtraContent = (
  openDrawer,
  DebouncedInput,
  globalFilter,
  setGlobalFilter,
) => {
  return (
    <span className="flex items-center">
      <span className="mr-1 mt-4  font-semibold">
        <DebouncedInput
          value={globalFilter ?? ''}
          className=" solid"
          placeholder="Search all columns..."
          size="sm"
          onChange={(value) => {
            if (/^[0-9a-zA-Z\s]*$/.test(value)) {
              setGlobalFilter(value);
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
          Add Region
        </Button>
      </span>
    </span>
  );
};

const Regionmaster = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editData, seteditData] = useState(['']);
  const [globalFilter, setGlobalFilter] = useState('');

  const [data, setdata] = useState(['']);
  const [Zone, setZone] = useState([]);
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
        header: 'Region',
        accessorKey: 'RegionName',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              <Badge className={statusColor[row.IsActive]} />
              <span className="ml-2 rtl:mr-2 ">{row.RegionName}</span>
            </div>
          );
        },
      },
      {
        header: 'Short Name',
        accessorKey: 'ShortName',
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
      //},
    ],
    [],
  );
  useEffect(() => {
    (async (values) => {
      const resp = await apiGetRegionmaster(values);

      setdata(resp.data);
    })();
    (async (values) => {
      const Zone = await apiGetZonemaster(values);
      const formattedOptions = Zone.data.map((option) => ({
        value: option.ZoneCode,
        label: option.ZoneName,
      }));
      setZone(formattedOptions);
    })();
  }, []);
  const openDrawer = () => {
    setIsOpen(true);
  };

  const onDrawerClose = async (e, values) => {
    setIsOpen(false);
    const resp = await apiGetRegionmaster(values);
    setdata(resp.data);
    seteditData(['']);
  };
  function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 1500,
    ...props
  }) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
      const timeout = setTimeout(() => {
        onChange(value);
      }, debounce);

      return () => clearTimeout(timeout);
    }, [value]);
    return (
      <div className="flex justify-end">
        <div className="flex items-center mb-4">
          <InputwithVoice
            {...props}
            value={value}
            onChange={(e) => {
              if (/^[0-9a-zA-Z\s]*$/.test(e.target.value)) {
                setValue(e.target.value);
              }
            }}
          />
        </div>
      </div>
    );
  }

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
        header={<HeaderExtra Component={'Region Master'} />}
        headerExtra={headerExtraContent(
          openDrawer,
          DebouncedInput,
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
          ExportName={'RegionMaster'}
        />
      </Card>

      <Drawer
        title={
          editData.RegionName ? (
            <p className="text-xl font-medium   flex ">
              <center>
                <Button
                  size="xs"
                  variant="twoTone"
                  icon={<HiOutlinePencil />}
                ></Button>
              </center>
              &nbsp;&nbsp; Region Master
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
              &nbsp;&nbsp;Region Master
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
        <RegionEdit
          ref={formikRef}
          onDrawerClose={onDrawerClose}
          editData={editData}
          setMessage={setMessage}
          setlog={setlog}
          Zone={Zone}
        />
      </Drawer>
    </>
  );
};

export default Regionmaster;
