import { useState, useEffect, useMemo, useRef } from 'react';
import { Badge, Drawer, Input, Alert } from 'components/ui';
import { apiGetTimeBandmaster } from 'services/CreditcontrolService';
import { Button, Card } from 'components/ui';
import { HiOutlinePencil, HiPlusCircle } from 'react-icons/hi';
import TimebandEdit from './TimebandEdit';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import DisplayTable from 'views/Controls/DisplayTable';
import HeaderExtra from 'views/Controls/HeaderExtra';
import DrawerFooter from 'views/Controls/DrawerFooter';
import InputwithVoice from 'components/ui/Input/InputwithVoice';
import StatisticCard from 'views/Controls/StatisticCard';
import { RiMapPinTimeFill } from 'react-icons/ri';
import { FaRegTimesCircle } from 'react-icons/fa';
import { TbCalendarTime } from 'react-icons/tb';

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();


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
            if (/^[0-9a-zA-Z\s:]*$/.test(e.target.value)) {
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
          Add TimeBand
        </Button>
      </span>
    </span>
  );
};

const Timebandmaster = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editData, seteditData] = useState(['']);
  const [globalFilter, setGlobalFilter] = useState('');

  const [data, setdata] = useState(['']);
  const [dataFilter, setdataFilter] = useState(['']);
  console.log(data);

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
        header: 'TimeBand Name',
        accessorKey: 'TimeBandName',
      },
      {
        header: 'Start Time',
        accessorKey: 'StartTime',
      },
      {
        header: 'EndTime',
        accessorKey: 'EndTime',
      },
    ],
    [],
  );

  useEffect(() => {
    (async (values) => {
      try {
        const resp = await apiGetTimeBandmaster(values);

        if (resp.status === 200) {
          // Update data and filtered data if response is successful
          setdata(resp.data);
          setdataFilter(resp.data);
        } else {
          // Handle non-200 status codes
          setdata([]);
          setdataFilter([]);
        }
      } catch (error) {
        // Handle errors from the API call
        console.error("Error fetching agency master data:", error);
        setdata([]);
        setdataFilter([]);
      }
    })();
  }, []);

  const openDrawer = () => {
    setIsOpen(true);
  };

  const onDrawerClose = async (e, values) => {
    //  console.log(values);
    setIsOpen(false);

    try {
      const resp = await apiGetTimeBandmaster(values);

      if (resp.status === 200) {
        // Update data and filtered data if response is successful
        setdata(resp.data);
        setdataFilter(resp.data);
      } else {
        // Handle non-200 status codes
        setdata([]);
        setdataFilter([]);
      }
    } catch (error) {
      // Handle errors from the API call
      console.error("Error fetching agency master data:", error);
      setdata([]);
      setdataFilter([]);
    }
    seteditData(['']);
  };

  const FilterTableData_On_Card = (label) => {
    switch (label) {
      case 'All TimeBand':
        setdataFilter(data);
        break;
      case 'Active TimeBand':
        setdataFilter(data.filter(
          (item) =>
            parseInt(item.IsActive) === 1
        ));
        break;
      case 'Inactive TimeBand':
        setdataFilter(data.filter(
          (item) =>
            parseInt(item.IsActive) === 0
        ));
        break;
      case 'TimeBand Added This Month':
        setdataFilter(data.filter((TimeBand) => {
          const addedOnDate = new Date(TimeBand.AddedOn);
          return (
            addedOnDate.getFullYear() === currentYear &&
            addedOnDate.getMonth() === currentMonth
          );
        }));
        break;
      default:
        break;
    }
  };
  return (
    <>
      {message && (
        <Alert className="mb-4" type={log} showIcon>
          {message}
        </Alert>
      )}

      <Card
        header={<HeaderExtra Component={'TimeBand Master'} />}
        headerExtra={headerExtraContent(
          openDrawer,

          globalFilter,
          setGlobalFilter,
        )}
        className="flex flex-col h-[87vh]"
        bodyClass="grow"
        style={{ overflow: 'scroll' }}
      >
        <div className="grid grid-cols-4 gap-3 mb-4">
          <StatisticCard
            icon={<RiMapPinTimeFill />}
            avatarClass="!bg-indigo-600"
            label="All TimeBand"
            value={
              data.length
            }
            Function={FilterTableData_On_Card}
            IsFunction={true}
          />
          <StatisticCard
            icon={<RiMapPinTimeFill />}
            avatarClass="!bg-emerald-600"
            label="Active TimeBand"
            value={
              data.filter(
                (item) =>
                  parseInt(item.IsActive) === 1
              ).length
            }
            Function={FilterTableData_On_Card}
            IsFunction={true}
          />
          <StatisticCard
            icon={<FaRegTimesCircle />}
            avatarClass="!bg-red-600"
            label="Inactive TimeBand"
            value={
              data.filter(
                (item) =>
                  parseInt(item.IsActive) === 0
              ).length
            }
            Function={FilterTableData_On_Card}
            IsFunction={true}
          />
          <StatisticCard
            icon={<TbCalendarTime />}
            avatarClass="!bg-orange-600"
            label="TimeBand Added This Month"
            value={data.filter((TimeBand) => {
              const addedOnDate = new Date(TimeBand.AddedOn);
              return (
                addedOnDate.getFullYear() === currentYear &&
                addedOnDate.getMonth() === currentMonth
              );
            }).length}
            Function={FilterTableData_On_Card}
            IsFunction={true}
          />
        </div>
        <DisplayTable
          data={dataFilter}
          columns={columns}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          seteditData={seteditData}
          openDrawer={openDrawer}
          ExportName={'TimeBandMaster'}
        />
      </Card>

      <Drawer
        title={
          editData.TimeBandName ? (
            <p className="text-xl font-medium   flex ">
              <center>
                <Button
                  size="xs"
                  variant="twoTone"
                  icon={<HiOutlinePencil />}
                ></Button>
              </center>
              &nbsp;&nbsp; TimeBand Master
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
              &nbsp;&nbsp;TimeBand Master
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
        <TimebandEdit
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

export default Timebandmaster;
