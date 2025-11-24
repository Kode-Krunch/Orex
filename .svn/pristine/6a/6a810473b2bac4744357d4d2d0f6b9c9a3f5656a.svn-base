import { useState, useEffect, useMemo } from 'react';
import { Badge, Input } from 'components/ui';
import { apiGetNTCmaster } from 'services/NTCService';
import { Button, Card } from 'components/ui';
import { HiPlusCircle } from 'react-icons/hi';
import DisplayTable from 'views/Controls/DisplayTable';
import HeaderExtra from 'views/Controls/HeaderExtra';
import { Link } from 'react-router-dom';
import DisplayTableContent from 'views/Controls/DisplayTableContent';
import { useDispatch, useSelector } from 'react-redux';
import { setContent } from 'store/base/commonSlice';
import InputwithVoice from 'components/ui/Input/InputwithVoice';
import { COLOR_3, COLOR_4, COLOR_5, COLOR_8 } from 'constants/chart.constant';
import StatisticCardwithfigure from 'components/common/StatisticCardwithfigure';
import { FaRegTimesCircle } from 'react-icons/fa';
import { MdAccessTime, MdAccessTimeFilled, MdOutlineMoreTime } from 'react-icons/md';

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();

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
            if (/^[0-9a-zA-Z\s-]*$/.test(e.target.value)) {
              setGlobalFilter(e.target.value);
            }
          }}
        />
      </span>
      <span className="mr-1 font-semibold">
        <Link to={'/NTCMasterEdit'}>
          <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
            Add NTC
          </Button>
        </Link>
      </span>
    </span>
  );
};

const NTCMaster = () => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [data, setdata] = useState(['']);
  const [tableDataFilter, setTableDataFilter] = useState(['']);
  const Channel = useSelector((state) => state.locale.selectedChannel);

  const statusColor = {
    1: 'bg-emerald-500',
    0: 'bg-red-500',
  };

  const columns = useMemo(
    () => [
      {
        header: 'NTC Name',
        accessorKey: 'NTCCaption',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              <Badge className={statusColor[row.IsActive]} />
              <span className="ml-2 rtl:mr-2 ">{row.NTCCaption}</span>
            </div>
          );
        },
      },
    ],
    [],
  );
  const dispatch = useDispatch();

  useEffect(() => {
    GetNTCs();
  }, []);

  useEffect(() => {
    GetNTCs();
  }, [Channel]);

  const GetNTCs = () => {
    dispatch(setContent([]));
    (async (values) => {
      let Parameters = {
        LocationCode: Channel.LocationCode,
        ChannelCode: Channel.ChannelCode,
      };
      const resp = await apiGetNTCmaster(Parameters);
      if (resp.data) {
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
        setTableDataFilter(convertIntegersToStrings)

      } else {
        setdata([]);
        setTableDataFilter([])
      }
    })();
  };
  const FilterTableData_On_Card = (CardName) => {
    switch (CardName) {
      case 'Total NTC':
        setTableDataFilter(data);
        break;
      case 'Active NTC':
        setTableDataFilter(data.filter((item) => item.IsActive == 1));
        break;
      case 'InActive NTC':
        setTableDataFilter(data.filter((item) => item.IsActive == 0));
        break;
      case 'Added This Month':
        setTableDataFilter(data.filter((Song) => {
          const addedOnDate = new Date(Song.AddedOn);
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
      <Card
        header={<HeaderExtra Component={'NTC Master'} ModuleText="NTC" />}
        headerExtra={headerExtraContent(globalFilter, setGlobalFilter)}
        className="flex flex-col h-[87vh]"
        bodyClass="grow" style={{ overflow: 'scroll' }}
      >
        <div
          className={`grid grid-cols-1 gap-4 mb-4 mt-2 lg:grid-cols-4 xl:grid-cols-4`}
        >
          <StatisticCardwithfigure
            CardHeight={180}
            AnimateColorClass="order3"
            Icon={<MdAccessTime style={{ fontSize: 35, color: COLOR_3 }} />}
            CardName={'Total NTC'}
            CardNote="Song are short advertisements aired during breaks in programming."
            CardFigure={data.length}
            COLOR="bg-emerald-500"
            Function={FilterTableData_On_Card}
            IsFunction={true}
            cursor={true}

          ></StatisticCardwithfigure>

          <StatisticCardwithfigure
            CardHeight={180}
            AnimateColorClass="order2"
            Icon={<MdAccessTimeFilled style={{ fontSize: 35, color: COLOR_4 }} />}
            CardName={'Active NTC'}
            CardNote=" refers to an advertisement currently scheduled for broadcast."
            CardFigure={data.filter((item) => item.IsActive == 1).length}
            COLOR="bg-amber-500"
            Function={FilterTableData_On_Card}
            IsFunction={true} cursor={true}
          ></StatisticCardwithfigure>

          <StatisticCardwithfigure
            CardHeight={180}
            AnimateColorClass="order1"
            Icon={
              <FaRegTimesCircle
                style={{ fontSize: 35, color: COLOR_5 }}
              />
            }
            CardName={'InActive NTC'}
            CardNote=" refers to an advertisement that is not currently running."
            CardFigure={data.filter((item) => item.IsActive == 0).length}
            COLOR="bg-red-500"
            Function={FilterTableData_On_Card}
            IsFunction={true} cursor={true}
          ></StatisticCardwithfigure>

          <StatisticCardwithfigure
            CardHeight={180}
            AnimateColorClass="order8"
            Icon={<MdOutlineMoreTime style={{ fontSize: 35, color: COLOR_8 }} />}
            CardName="Added This Month"
            CardNote="refers to advertisements that were added for broadcast in the current month."
            CardFigure={data.filter((Song) => {
              const addedOnDate = new Date(Song.AddedOn);
              return (
                addedOnDate.getFullYear() === currentYear &&
                addedOnDate.getMonth() === currentMonth
              );
            }).length}
            COLOR="bg-yellow-500"
            Function={FilterTableData_On_Card}
            IsFunction={true} cursor={true}
          ></StatisticCardwithfigure>
        </div>
        <DisplayTableContent
          data={tableDataFilter}
          columns={columns}
          sorting={sorting}
          globalFilter={globalFilter}
          setSorting={setSorting}
          setGlobalFilter={setGlobalFilter}
          ExportName={'NTCMaster'}
        />
      </Card>
    </>
  );
};

export default NTCMaster;
