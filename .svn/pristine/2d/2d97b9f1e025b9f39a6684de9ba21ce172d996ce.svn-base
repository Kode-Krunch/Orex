import { useState, useEffect, useMemo } from 'react';
import { Badge, Alert } from 'components/ui';
import { apiGetYearMaster } from 'services/SalesAdminService';
import { Button, Card } from 'components/ui';
import { HiPlusCircle } from 'react-icons/hi';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import DisplayTable from 'views/Controls/DisplayTable';
import HeaderExtra from 'views/Controls/HeaderExtra';
import InputwithVoice from 'components/ui/Input/InputwithVoice';
import AddYearDrawer from './AddYearDrawer';
import { getDateFromDateTime } from 'views/Controls/GLOBALFUNACTION';

/* CONSTANTS */
const statusColor = {
  1: 'bg-emerald-500',
  0: 'bg-red-500',
};

const headerExtraContent = (openDrawer, globalFilter, setGlobalFilter) => {
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
          Add Year Description
        </Button>
      </span>
    </span>
  );
};

const YearMaster = () => {
  /* STATES */
  const [isOpen, setIsOpen] = useState(false);
  const [editData, seteditData] = useState(['']);
  const [globalFilter, setGlobalFilter] = useState('');
  const [data, setdata] = useState(['']);
  const [log, setlog] = useState('');

  /* HOOKS */
  const [message, setMessage] = useTimeOutMessage();
  const columns = useMemo(
    () => [
      {
        header: 'Year Description',
        accessorKey: 'Description',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              <Badge className={statusColor[row.IsActive]} />
              <span className="ml-2 rtl:mr-2 ">{row.Description}</span>
            </div>
          );
        },
      },
      {
        header: 'Start Date',
        accessorKey: 'StartDate',
      },
      {
        header: 'End Date',
        accessorKey: 'EndDate',
      },
    ],
    [],
  );

  /* USE EFFECTS */
  useEffect(() => {
    (async (values) => {
      const resp = await apiGetYearMaster(values);
      console.log(resp.data);
      setdata(resp.data);
    })();
  }, []);

  /* FUNCTIONS */
  const openDrawer = () => {
    setIsOpen(true);
  };

  const onDrawerClose = async (e, values) => {
    setIsOpen(false);
    const resp = await apiGetYearMaster(values);
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
      <Card
        header={<HeaderExtra Component={'Year Master'} />}
        headerExtra={headerExtraContent(
          openDrawer,
          globalFilter,
          setGlobalFilter,
        )}
        className="flex flex-col h-[87vh]"
        bodyClass="grow"
      >
        {Array.isArray(data) && data[0] !== '' && data.length > 0 && (
          <DisplayTable
            data={data.map((year) => {
              return {
                ...year,
                StartDate: getDateFromDateTime(year.StartDate),
                EndDate: getDateFromDateTime(year.EndDate),
              };
            })}
            columns={columns}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            seteditData={seteditData}
            openDrawer={openDrawer}
            ExportName={'YearMaster'}
          />
        )}
      </Card>
      <AddYearDrawer
        editData={editData}
        isOpen={isOpen}
        onDrawerClose={onDrawerClose}
        setMessage={setMessage}
        setlog={setlog}
      />
    </>
  );
};

export default YearMaster;
