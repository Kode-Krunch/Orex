import { useState, useEffect, useMemo, useRef } from 'react';
import { Badge, Drawer, Input, Alert } from 'components/ui';
import { apiGetawardmaster } from 'services/ProgrammingService';
import { Button, Card } from 'components/ui';
import {
  HiOutlinePencil,
  HiOutlinePlusCircle,
  HiPlusCircle,
} from 'react-icons/hi';
import AwardEdit from './AwardEdit';
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
          className="solid"
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
          Add Award
        </Button>
      </span>
    </span>
  );
};

const Awardmaster = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editData, seteditData] = useState(['']);
  const [globalFilter, setGlobalFilter] = useState('');

  const [data, setdata] = useState(['']);
  //const [currency, setCurrency] = useState([])
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
        header: 'Award Name',
        accessorKey: 'AwardName',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              <Badge className={statusColor[row.IsActive]} />
              <span className="ml-2 rtl:mr-2 ">{row.AwardName}</span>
            </div>
          );
        },
      },
      {
        header: 'Award Date ',
        accessorKey: 'AwardDate',
      },
      // {
      //     header: 'IsActive',
      //     accessorKey: 'IsActive',
      // },
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
      const resp = await apiGetawardmaster(values);
      setdata(resp.data);
    })();
  }, []);
  const openDrawer = () => {
    setIsOpen(true);
  };

  const onDrawerClose = async (e, values) => {
    setIsOpen(false);
    const resp = await apiGetawardmaster(values);
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
        header={
          <HeaderExtra ModuleText="Programming" Component={'Award Master'} />
        }
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
          ExportName={'AwardMaster'}
        />
      </Card>

      <Drawer
        title={
          editData.AwardName ? (
            <p className="text-xl font-medium flex ">
              <center>
                <Button
                  size="xs"
                  variant="twoTone"
                  icon={<HiOutlinePencil />}
                ></Button>
              </center>
              Award Master
            </p>
          ) : (
            <p className="text-xl font-medium text-black flex ">
              <center>
                <Button
                  size="xs"
                  variant="twoTone"
                  icon={<HiOutlinePlusCircle />}
                ></Button>
              </center>
              Award Master
            </p>
          )
        }
        isOpen={isOpen}
        onClose={onDrawerClose}
        onRequestClose={onDrawerClose}
        width={600}
        footer={
          <DrawerFooter onCancel={onDrawerClose} onSaveClick={formSubmit} />
        }
      >
        <AwardEdit
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

export default Awardmaster;
