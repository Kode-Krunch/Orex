import { useState, useEffect, useMemo, useRef } from 'react';
import { Badge, Drawer, Input, Alert } from 'components/ui';
import {
  apiGetEventColorMasterByLogin,
  apiGetCountrymaster,
} from 'services/MasterService';
import { Button, Card } from 'components/ui';
import { HiOutlinePencil, HiPlusCircle } from 'react-icons/hi';
import EventColorByLoginEdit from './EventColorByLoginEdit';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import DisplayTable from 'views/Controls/DisplayTable';
import HeaderExtra from 'views/Controls/HeaderExtra';
import DrawerFooter from 'views/Controls/DrawerFooter';
import InputwithVoice from 'components/ui/Input/InputwithVoice';

const headerExtraContent = (openDrawer, globalFilter, setGlobalFilter) => {
  return (
    <span className="flex items-center">
      <span className="mr-1 mt-4  font-semibold">
        <span className="mr-1 font-semibold flex items-center">
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
      </span>
      <span className="mr-1 font-semibold">
        {/* <Button
                    block
                    variant="solid"
                    size="sm"
                    icon={<HiPlusCircle />}
                    onClick={() => openDrawer()}
                >
                    Add Eventcolor
                </Button> */}
      </span>
    </span>
  );
};

const EventColorMasterByLogin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editData, seteditData] = useState(['']);
  const [globalFilter, setGlobalFilter] = useState('');

  const [data, setdata] = useState(['']);
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
        header: 'Event Color Name',
        accessorKey: 'EventName',
      },
      {
        header: 'Event Type',
        accessorKey: 'EventType',
      },
      {
        header: 'Event Front Color',
        accessorKey: 'EventDefaultFrontColor',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              <span className="ml-2 rtl:mr-2 ">
                <div
                  style={{
                    height: 20,
                    width: 50,
                    backgroundColor: '' + row.EventDefaultFrontColor + '',
                  }}
                ></div>
              </span>
            </div>
          );
        },
      },
      {
        header: 'Event Back Color',
        accessorKey: 'EventDefaultBackColor',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              <span className="ml-2 rtl:mr-2 ">
                <div
                  style={{
                    height: 20,
                    width: 50,
                    backgroundColor: '' + row.EventDefaultBackColor + '',
                  }}
                ></div>
              </span>
            </div>
          );
        },
      },
    ],
    [],
  );
  useEffect(() => {
    (async (values) => {
      const resp = await apiGetEventColorMasterByLogin(values);
      setdata(resp.data);
    })();
  }, []);
  const openDrawer = () => {
    setIsOpen(true);
  };

  const onDrawerClose = async (e, values) => {
    setIsOpen(false);
    const resp = await apiGetEventColorMasterByLogin(values);
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
        header={<HeaderExtra Component={'Event Color Master By Login'} />}
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
          ExportName={'EventColorMasterByLogin'}
        />
      </Card>

      <Drawer
        title={
          <p className="text-xl font-medium  flex ">
            <center>
              <Button
                size="xs"
                variant="twoTone"
                icon={<HiOutlinePencil />}
              ></Button>
            </center>
            &nbsp;&nbsp; Event Color Master By Login
          </p>
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
        <EventColorByLoginEdit
          ref={formikRef}
          onDrawerClose={onDrawerClose}
          editData={editData}
          setMessage={setMessage}
          setlog={setlog}
        />
      </Drawer>
    </>
  );
};

export default EventColorMasterByLogin;
