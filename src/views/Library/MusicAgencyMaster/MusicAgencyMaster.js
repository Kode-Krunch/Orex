import { useState, useEffect, useMemo, useRef } from 'react';
import { Badge, Drawer, Input, Alert } from 'components/ui';
import { apiGetCountrymaster } from 'services/MasterService';

import { Button, Card } from 'components/ui';
import { HiOutlinePencil, HiPlusCircle } from 'react-icons/hi';
import MusicAgencyEdit from './MusicAgencyEdit';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import DisplayTable from 'views/Controls/DisplayTable';
import HeaderExtra from 'views/Controls/HeaderExtra';
import DrawerFooter from 'views/Controls/DrawerFooter';
import { apiGetmusicagencymst } from 'services/LibraryService';

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
            setGlobalFilter(value);
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
          Add Music Agency
        </Button>
      </span>
    </span>
  );
};

const MusicAgencyMaster = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editData, seteditData] = useState(['']);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [data, setdata] = useState(['']);
  const [currency, setCurrency] = useState([]);
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
        header: 'MusicAgency Name',
        accessorKey: 'MusicAgencyName',
      },
      {
        header: 'Address',
        accessorKey: 'MusicAgency_Addr1',
      },
    ],
    [],
  );
  useEffect(() => {
    (async (values) => {
      const resp = await apiGetmusicagencymst(values);
      setdata(resp.data);
    })();
  }, []);
  const openDrawer = () => {
    setIsOpen(true);
  };

  const onDrawerClose = async (e, values) => {
    setIsOpen(false);
    const resp = await apiGetmusicagencymst(values);
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
            onChange={(e) => setValue(e.target.value)}
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
        header={
          <HeaderExtra ModuleText="Library" Component={'Music Agency Master'} />
        }
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
          //sorting={sorting}
          globalFilter={globalFilter}
          //setSorting={setSorting}
          setGlobalFilter={setGlobalFilter}
          seteditData={seteditData}
          openDrawer={openDrawer}
          ExportName={'MusicAgencyMaster'}
        />
      </Card>

      <Drawer
        title={
          editData.MusicAgencyName ? (
            <p className="text-xl font-medium text-black flex ">
              <center>
                <Button
                  size="xs"
                  variant="twoTone"
                  icon={<HiOutlinePencil />}
                ></Button>
              </center>
              &nbsp;&nbsp; Music Agency Master
            </p>
          ) : (
            <p className="text-xl font-medium text-black flex ">
              <center>
                <Button
                  size="xs"
                  variant="twoTone"
                  icon={<HiPlusCircle />}
                ></Button>
              </center>
              &nbsp;&nbsp;Music Agency Master
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
        <MusicAgencyEdit
          ref={formikRef}
          onDrawerClose={onDrawerClose}
          editData={editData}
          setMessage={setMessage}
          setlog={setlog}
          currency={currency}
        />
      </Drawer>
    </>
  );
};

export default MusicAgencyMaster;
