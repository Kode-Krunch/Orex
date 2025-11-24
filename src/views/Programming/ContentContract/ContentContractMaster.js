import { useState, useEffect, useMemo } from 'react';
import { Badge } from 'components/ui';
import {
  apiGetcontentcontractmaster,
  apiGetcontentcontractmastercontractstatus,
} from 'services/ProgrammingService';
import { Button, Card } from 'components/ui';
import {
  HiOutlineUserAdd,
  HiOutlineUserGroup,
  HiOutlineUsers,
  HiPlusCircle,
} from 'react-icons/hi';
import HeaderExtra from 'views/Controls/HeaderExtra';
import { Link } from 'react-router-dom';
import { setContent } from 'store/base/commonSlice';
import { useDispatch } from 'react-redux';
import InputwithVoice from 'components/ui/Input/InputwithVoice';
import { hideStackedSideNav_secondary } from 'views/Scheduling/general';
import StatisticCard from 'views/Controls/StatisticCard';
import { FORMATDATE_FOR_EVERY } from 'views/Controls/GLOBALFUNACTION';
import ContentContractCard from './ContentContractCard';
const headerExtraContent = (globalFilter, setGlobalFilter, dispatch) => {
  return (
    <span className="flex items-center">
      <span className="mr-1   font-semibold">
        <InputwithVoice
          value={globalFilter ?? ''}
          className=" solid"
          placeholder="Search all contracts"
          size="sm"
          onChange={(e) => {
            setGlobalFilter(e.target.value);
          }}
        />
      </span>
      <span className="mr-1 font-semibold">
        <Link to={'/ContentContractAdd'}>
          <Button
            block
            variant="solid"
            size="sm"
            icon={<HiPlusCircle />}
            onClick={() => dispatch(setContent(''))}
          >
            Add Content Contract
          </Button>
        </Link>
      </span>
    </span>
  );
};

const ContentContractMaster = () => {
  const dispatch = useDispatch();
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [data, setdata] = useState(['']);
  const [tableDataFilter, setTableDataFilter] = useState(['']);

  const [data2, setdata2] = useState(['']);
  const statusColor = {
    1: 'bg-emerald-500',
    0: 'bg-red-500',
  };

  const columns = useMemo(
    () => [
      {
        header: 'Contract No',
        accessorKey: 'ContractNo',
      },
      {
        header: 'Content',
        accessorKey: 'ContractName',
        cell: (props) => {
          const row = props.row.original;
          console.log(row);
          return (
            <div className="flex items-center">
              <Badge
                style={{ minWidth: '9px' }}
                className={statusColor[row.IsActive]}
              />
              <span
                className="ml-2 rtl:mr-2 capitalize"
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '200px',
                }}
              >
                {row.ContractName}
              </span>
            </div>
          );
        },
      },
      {
        header: 'AuthorisedPerson',
        accessorKey: 'AuthorisedPerson',
      },
      {
        header: 'Agreement Date',
        accessorKey: 'AgreementDate',
        cell: (props) => {
          const row = props.row.original;
          console.log(row);
          return (
            <span
              className="ml-2 rtl:mr-2 capitalize"
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '200px',
              }}
            >
              {FORMATDATE_FOR_EVERY(row.AgreementDate)}
            </span>
          );
        },
      },
      {
        header: 'Budget Year',
        accessorKey: 'BudgetYear',
      },
    ],
    [],
  );

  useEffect(() => {
    hideStackedSideNav_secondary();

    (async (values) => {
      const resp = await apiGetcontentcontractmaster(values);

      if (resp.data && resp.data.length > 0) {
        const convertIntegersToStrings = () => {
          return resp.data.map((item) => {
            const newItem = {
              ...item,
              AgreementDate: new Date(item.AgreementDate).toLocaleDateString(
                'en-GB',
                {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                },
              ),
            };
            Object.keys(newItem).forEach((key) => {
              if (typeof newItem[key] === 'number') {
                newItem[key] = newItem[key].toString();
              }
            });
            return newItem;
          });
        };
        setdata(convertIntegersToStrings());
        setTableDataFilter(convertIntegersToStrings());
      } else {
        setdata([]);
        setTableDataFilter([]);
        console.log('No records found');
      }
    })();

    (async (values) => {
      const resp = await apiGetcontentcontractmastercontractstatus(values);
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
      console.log(convertIntegersToStrings);

      setdata2(convertIntegersToStrings);
    })();
  }, []);
  const FilterTableData_On_Card = (CardName) => {
    switch (CardName) {
      case 'Total Contracts':
        setTableDataFilter(data);
        break;
      case 'Active Contracts':
        setTableDataFilter(data.filter((item) => item.IsActive == 1));
        break;
      case 'Expired Contracts':
        setTableDataFilter(data.filter((item) => item.IsActive == 0));
        break;

      default:
        break;
    }
  };
  return (
    <>
      <Card
        header={<HeaderExtra />}
        headerExtra={headerExtraContent(
          globalFilter,
          setGlobalFilter,
          dispatch,
        )}
        className="flex flex-col h-[85vh]"
        bodyClass="grow"
        style={{ overflow: 'scroll' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
          <StatisticCard
            icon={<HiOutlineUserGroup />}
            avatarClass="!bg-indigo-600"
            label="Total Contracts"
            Function={FilterTableData_On_Card}
            value={data2[0].TotalContractCount}
            IsFunction={true}
          />
          <StatisticCard
            icon={<HiOutlineUsers />}
            avatarClass="!bg-blue-500"
            label="Active Contracts"
            Function={FilterTableData_On_Card}
            value={data2[0].ActiceContractCount}
            IsFunction={true}
          />
          <StatisticCard
            icon={<HiOutlineUserAdd />}
            avatarClass="!bg-red-500"
            label="Expired Contracts"
            Function={FilterTableData_On_Card}
            value={data2[0].ExpiredContractCount}
            IsFunction={true}
          />
        </div>

        <div className="h-[50vh]">
          <div className="grid grid-cols-4 gap-4 mt-6">
            <ContentContractCard
              data={tableDataFilter}
              globalFilter={globalFilter}
            />
          </div>
        </div>
      </Card>
    </>
  );
};

export default ContentContractMaster;
