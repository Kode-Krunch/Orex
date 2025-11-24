import { useState, useEffect, useRef } from 'react';
import { Badge, Alert } from 'components/ui';
import { apiGetagencymaster } from 'services/CreditcontrolService';
import { Button, Card } from 'components/ui';
import { HiPlusCircle } from 'react-icons/hi';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import DisplayTable from 'views/Controls/DisplayTable';
import HeaderExtra from 'views/Controls/HeaderExtra';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setContent } from 'store/base/commonSlice';
import InputwithVoice from 'components/ui/Input/InputwithVoice';
import StatisticCard from 'views/Controls/StatisticCard';
import {
  FaBuildingCircleCheck,
  FaBuildingCircleXmark,
  FaBuildingLock,
  FaBuildingUser,
} from 'react-icons/fa6';

const headerExtraContent = (globalFilter, setGlobalFilter) => {
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
        <Link to={'/AddAgency'}>
          <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
            Add Agency
          </Button>
        </Link>
      </span>
    </span>
  );
};

const Agencymaster = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editData, seteditData] = useState(['']);
  const [globalFilter, setGlobalFilter] = useState('');

  const [data, setdata] = useState(['']);
  const [dataFilter, setdataFilter] = useState(['']);

  const [message, setMessage] = useTimeOutMessage();
  const [log, setlog] = useState('');

  const statusColor = {
    1: 'bg-emerald-500',
    0: 'bg-red-500',
  };
  const columns = [
    {
      header: 'Agency Name',
      accessorKey: 'AgencyName',
      cell: (props) => {
        const row = props.row.original;
        return (
          <div className="flex items-center">
            <Badge className={statusColor[row.IsActive]} />
            <span className="ml-2 rtl:mr-2">
              {row != '' &&
                (row.AgencyName && row.AgencyName.length <= 47
                  ? row.AgencyName
                  : `${row.AgencyName.substring(0, 44)}...`)}
            </span>
          </div>
        );
      },
      headStyle: {
        width: '35%',
      },
      cellStyle: {
        width: '35%',
      },
    },
    {
      header: 'Contact Person ',
      accessorKey: 'ContactPerson',
      cell: (props) => {
        const row = props.row.original;
        return (
          <div className="flex items-center justify-between gap-2">
            <span style={{ color: 'rgb(197 205 218)' }}>
              {row.ContactPerson}
            </span>
            {row.Mobile && (
              <span className="py-1 px-4 rounded-full font-semibold bg-cyan-900 text-gray-300">
                {row.Mobile}
              </span>
            )}
          </div>
        );
      },
      headStyle: {
        width: '25%',
      },
      cellStyle: {
        width: '25%',
      },
    },
    {
      header: 'Email',
      accessorKey: 'Email',
      cell: (props) => {
        return (
          <span style={{ color: 'rgb(197 205 218)' }}>
            {props.row.original.Email}
          </span>
        );
      },
      headStyle: {
        width: '25%',
      },
      cellStyle: {
        width: '25%',
      },
    },
  ];
  useEffect(() => {
    (async (values) => {
      try {
        const resp = await apiGetagencymaster(values);

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
        console.error('Error fetching agency master data:', error);
        setdata([]);
        setdataFilter([]);
      }
    })();

    dispatch(setContent([]));
  }, []);

  const openDrawer = async (d) => {
    dispatch(setContent(d));
    navigate('/AddAgency', {
      state: { agencyDetails: d },
    });
  };
  const FilterTableData_On_Card = (label) => {
    switch (label) {
      case 'All Agencies':
        setdataFilter(data);
        break;
      case 'Active Agencies':
        setdataFilter(
          data.filter(
            (item) =>
              parseInt(item.IsActive) === 1 && parseInt(item.OnHold) === 0,
          ),
        );
        break;
      case 'Inactive Agencies':
        setdataFilter(
          data.filter(
            (item) =>
              parseInt(item.IsActive) === 0 && parseInt(item.OnHold) === 0,
          ),
        );
        break;
      case 'Agencies on hold':
        setdataFilter(data.filter((item) => parseInt(item.OnHold) === 1));
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
        header={<HeaderExtra Component={'Agency Master'} />}
        headerExtra={headerExtraContent(globalFilter, setGlobalFilter)}
        className="flex flex-col h-[87vh]"
        bodyClass="grow"
        style={{ overflow: 'scroll' }}
      >
        <div className="grid grid-cols-4 gap-3 mb-4">
          <StatisticCard
            icon={<FaBuildingUser />}
            avatarClass="!bg-indigo-600"
            label="All Agencies"
            value={data.length}
            Function={FilterTableData_On_Card}
            IsFunction={true}
          />
          <StatisticCard
            icon={<FaBuildingCircleCheck />}
            avatarClass="!bg-emerald-600"
            label="Active Agencies"
            value={
              data.filter(
                (item) =>
                  parseInt(item.IsActive) === 1 && parseInt(item.OnHold) === 0,
              ).length
            }
            Function={FilterTableData_On_Card}
            IsFunction={true}
          />
          <StatisticCard
            icon={<FaBuildingCircleXmark />}
            avatarClass="!bg-red-600"
            label="Inactive Agencies"
            value={
              data.filter(
                (item) =>
                  parseInt(item.IsActive) === 0 && parseInt(item.OnHold) === 0,
              ).length
            }
            Function={FilterTableData_On_Card}
            IsFunction={true}
          />
          <StatisticCard
            icon={<FaBuildingLock />}
            avatarClass="!bg-orange-600"
            label="Agencies on hold"
            value={data.filter((item) => parseInt(item.OnHold) === 1).length}
            Function={FilterTableData_On_Card}
            IsFunction={true}
          />
        </div>
        <div className="flex flex-col h-[60vh]">
          <DisplayTable
            data={dataFilter}
            columns={columns}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            seteditData={seteditData}
            openDrawer={openDrawer}
            ExportName={'AgencyMaster'}
          />
        </div>
      </Card>
    </>
  );
};

export default Agencymaster;
