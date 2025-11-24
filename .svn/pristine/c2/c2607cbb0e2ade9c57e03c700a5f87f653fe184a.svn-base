import { useState, useEffect, useMemo, useRef } from 'react';
import { Badge, Drawer, Input, Alert, Avatar } from 'components/ui';
import { apiGetPlayoutmaster } from 'services/MasterService';

import { Button, Card } from 'components/ui';
import { HiOutlinePencil, HiPlusCircle } from 'react-icons/hi';
import PlayoutEdit from './PlayoutEdit';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import DisplayTable from 'views/Controls/DisplayTable';
import HeaderExtra from 'views/Controls/HeaderExtra';
import DrawerFooter from 'views/Controls/DrawerFooter';
import InputwithVoice from 'components/ui/Input/InputwithVoice';
import Loader from 'views/Controls/Loader';

const headerExtraContent = (
  openDrawer,

  globalFilter,
  setGlobalFilter,
) => {
  return (
    <span className="flex items-center">
      <span className="mr-1 font-semibold">
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
          Add Playout
        </Button>
      </span>
    </span>
  );
};

const PlayoutMaster = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editData, seteditData] = useState(['']);
  const [globalFilter, setGlobalFilter] = useState('');

  const [data, setdata] = useState(['']);
  const [currency, setCurrency] = useState([]);
  const [message, setMessage] = useTimeOutMessage();
  const [log, setlog] = useState('');
  const formikRef = useRef();
  const formSubmit = () => {
    formikRef.current?.submitForm();
  };
  const [loader, setLoader] = useState(false);

  const statusColor = {
    1: 'bg-emerald-500',
    0: 'bg-red-500',
  };

  const columns = useMemo(
    () => [
      {
        header: 'Playout Name',
        accessorKey: 'PlayoutName',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              <Badge className={statusColor[row.IsActive]} />
              <span className="ml-2 rtl:mr-2">{row.PlayoutName}</span>
            </div>
          );
        },
      },
      {
        header: 'Play List File Format',
        accessorKey: 'PlaylistFileFormat',
      },
      {
        header: 'Asrun File Format',
        accessorKey: 'AsrunFileFormat',
      },
    ],
    [],
  );

  useEffect(() => {
    (async (values) => {
      setLoader(true);
      const resp = await apiGetPlayoutmaster(values);
      setdata(resp.data);
      setLoader(false);
    })();
  }, []);

  const openDrawer = () => {
    setIsOpen(true);
  };

  const onDrawerClose = async (e, values) => {
    setIsOpen(false);
    const resp = await apiGetPlayoutmaster(values);
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
        header={<HeaderExtra ModuleText="Admin" Component={'Playout Master'} />}
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
          ExportName={'PlayoutMaster'}
        />
      </Card>

      <Drawer
        title={
          editData.PlayoutName ? (
            <p className="text-xl font-medium text-black flex items-center">
              <Avatar
                size="sm"
                className="dark:bg-teal-800"
                icon={<HiOutlinePencil />}
              />
              &nbsp;&nbsp; Playout Master
            </p>
          ) : (
            <p className="text-xl font-medium text-black flex items-center">
              <Avatar
                size="sm"
                className="dark:bg-teal-800"
                icon={<HiPlusCircle />}
              />
              &nbsp;&nbsp;Playout Master
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
          <DrawerFooter
            onCancel={onDrawerClose}
            onSaveClick={formSubmit}
            BtnSaveTxt={editData[0] === '' ? 'Save' : 'Update'}
          />
        }
      >
        <PlayoutEdit
          ref={formikRef}
          onDrawerClose={onDrawerClose}
          editData={editData}
          setMessage={setMessage}
          setlog={setlog}
          currency={currency}
          setLoader={setLoader}
        />
      </Drawer>
      <Loader showLoader={loader} />
    </>
  );
};

export default PlayoutMaster;
