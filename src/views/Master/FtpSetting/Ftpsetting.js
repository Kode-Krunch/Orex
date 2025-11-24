import { useState, useEffect, useMemo, useRef } from 'react';
import { Badge, Drawer, Input, Alert } from 'components/ui';
import { apiGetftpsetting } from 'services/MasterService';
import { Button, Card } from 'components/ui';
import { HiOutlinePencil, HiPlusCircle } from 'react-icons/hi';
import FtpSettingEdit from './FtpSettingEdit';
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
      <span className="mr-1   font-semibold">
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
          Add FTPSetting
        </Button>
      </span>
    </span>
  );
};

const Ftpsetting = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editData, seteditData] = useState(['']);
  const [globalFilter, setGlobalFilter] = useState('');

  const [data, setdata] = useState(['']);
  const [message, setMessage] = useTimeOutMessage();
  const [log, setlog] = useState('');

  const statusColor = {
    1: 'bg-emerald-500',
    0: 'bg-red-500',
  };
  const formikRef = useRef();
  const formSubmit = () => {
    formikRef.current?.submitForm();
  };
  const columns = useMemo(
    () => [
      {
        header: 'Setting Name',
        accessorKey: 'SettingDesc',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              <Badge className={statusColor[row.IsActive]} />
              <span className="ml-2 rtl:mr-2 ">{row.SettingDesc}</span>
            </div>
          );
        },
      },
      {
        header: 'Location',
        accessorKey: 'FTPLocation',
      },
      {
        header: 'Port',
        accessorKey: 'FTP_Port',
      },
    ],
    [],
  );

  useEffect(() => {
    (async (values) => {
      const resp = await apiGetftpsetting(values);
      console.log(resp.data);
      if (resp.status == 204) {
        setdata([]);
        return;
      }
      const convertIntegersToStrings = () => {
        return resp.data.map((item) => {
          const newItem = { ...item };
          Object.keys(newItem).forEach((key) => {
            if (typeof newItem[key] === 'number') {
              newItem[key] = newItem[key].toString();
            }
          });
          return newItem;
        });
      };
      setdata(convertIntegersToStrings);
    })();
  }, []);
  const openDrawer = () => {
    setIsOpen(true);
  };

  const onDrawerClose = async (e, values) => {
    setIsOpen(false);
    const resp = await apiGetftpsetting(values);
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
        header={<HeaderExtra Component={'FTPSetting Master'} />}
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
          ExportName={'FTpMaster'}
        />
      </Card>

      <Drawer
        title={
          editData.SettingDesc ? (
            <p className="text-xl font-medium   flex ">
              <center>
                <Button
                  size="xs"
                  variant="twoTone"
                  icon={<HiOutlinePencil />}
                ></Button>
              </center>
              &nbsp;&nbsp; FTPSetting Master
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
              &nbsp;&nbsp;FTPSetting Master
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
        <FtpSettingEdit
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

export default Ftpsetting;
