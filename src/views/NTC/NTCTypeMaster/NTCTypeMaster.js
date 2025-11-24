import { useState, useEffect, useMemo, useRef } from 'react';
import { Badge, Drawer, Alert } from 'components/ui';

import { Button, Card } from 'components/ui';
import { HiOutlinePencil, HiPlusCircle } from 'react-icons/hi';
import NTCTypeEdit from './NTCTypeEdit';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import DisplayTable from 'views/Controls/DisplayTable';
import HeaderExtra from 'views/Controls/HeaderExtra';
import DrawerFooter from 'views/Controls/DrawerFooter';
import InputwithVoice from 'components/ui/Input/InputwithVoice';
import { apiNTCGroupMaster, apiNTCtypeMaster } from 'services/NTCService';

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
          Add NTC Type
        </Button>
      </span>
    </span>
  );
};

const NTCTypeMaster = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editData, seteditData] = useState(['']);
  const [globalFilter, setGlobalFilter] = useState('');
  const [data, setdata] = useState(['']);
  const [NTCGroup, setNTCGroup] = useState([]);
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
        header: 'NTCType',
        accessorKey: 'NTCTypeName',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              <Badge className={statusColor[row.IsActive]} />
              <span className="ml-2 rtl:mr-2 ">{row.NTCTypeName}</span>
            </div>
          );
        },
      },
      {
        header: 'NTCTypeShortName',
        accessorKey: 'NtcTypeShortName',
      },
      {
        header: 'DefaultGAP',
        accessorKey: 'DefaultGAP',
      }

    ],
    [],
  );
  useEffect(() => {
    (async (values) => {
      const resp = await apiNTCtypeMaster(values);

      setdata(resp.data);
    })();
    (async (values) => {
      const NTCGroup = await apiNTCGroupMaster(values);
      const formattedOptions = NTCGroup.data.map((option) => ({
        value: option.NTCGroupCode,
        label: option.NTCGroupName,
      }));
      setNTCGroup(formattedOptions);
    })();

  }, []);
  const openDrawer = () => {
    setIsOpen(true);
  };

  const onDrawerClose = async (e, values) => {
    setIsOpen(false);
    const resp = await apiNTCtypeMaster(values);
    setdata(resp.data);
    seteditData(['']);
  };

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
        header={<HeaderExtra Component={'NTC Type Master'} />}
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
          ExportName={'NTC TypeMaster'}
        />
      </Card>

      <Drawer
        title={
          editData.NTCTypeName ? (
            <p className="text-xl font-medium flex ">
              <center>
                <Button
                  size="xs"
                  variant="twoTone"
                  icon={<HiOutlinePencil />}
                ></Button>
              </center>
              &nbsp;&nbsp; NTC Type Master
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
              &nbsp;&nbsp;NTC Type Master
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
        <NTCTypeEdit
          ref={formikRef}
          onDrawerClose={onDrawerClose}
          editData={editData}
          setMessage={setMessage}
          setlog={setlog}
          NTCGroup={NTCGroup}
        />
      </Drawer>
    </>
  );
};

export default NTCTypeMaster;
