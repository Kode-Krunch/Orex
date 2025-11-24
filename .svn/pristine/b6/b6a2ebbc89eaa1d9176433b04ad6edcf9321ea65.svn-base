import { useState, useEffect, useMemo } from 'react';
import { Badge, Alert } from 'components/ui';
import { apiGetPatternmaster } from 'services/ProgrammingService';
import { Button, Card } from 'components/ui';
import {
  HiPlusCircle,
} from 'react-icons/hi';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import HeaderExtra from 'views/Controls/HeaderExtra';
import { Link } from 'react-router-dom';
import DisplayTableContent from 'views/Controls/DisplayTableContent';
import { setContent } from 'store/base/commonSlice';
import { useDispatch } from 'react-redux';
import InputwithVoice from 'components/ui/Input/InputwithVoice';

const headerExtraContent = (
  openDrawer,

  globalFilter,
  setGlobalFilter,
  onDrawerClose,
  editData,
  setMessage,
  setlog,
) => {
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
        <Link
          to={'/patternEdit'}
          state={{
            editData: editData,
          }}
          size="xs"
          variant="twoTone"
        >
          <Button
            block
            variant="solid"
            size="sm"
            icon={<HiPlusCircle />}
          // onClick={() => openDrawer()}
          >
            Add Pattern
          </Button>
        </Link>
      </span>
    </span>
  );
};

const Patternmaster = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [editData, seteditData] = useState(['']);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [data, setdata] = useState(['']);
  const [currency, setCurrency] = useState([]);
  const [message, setMessage] = useTimeOutMessage();
  const [log, setlog] = useState('');
  const statusColor = {
    1: 'bg-emerald-500',
    0: 'bg-red-500',
  };

  const columns = useMemo(
    () => [
      {
        header: 'Pattern Name',
        accessorKey: 'PatternName',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              <Badge className={statusColor[row.IsActive]} />
              <span className="ml-2 rtl:mr-2 ">{row.PatternName}</span>
            </div>
          );
        },
      },
    ],
    [],
  );
  useEffect(() => {
    dispatch(setContent(''));
    (async (values) => {
      const resp = await apiGetPatternmaster(values);
      if (resp?.data && resp.data.length > 0) {
        const convertIntegersToStrings = resp.data.map((item) => {
          const newItem = { ...item };
          Object.keys(newItem).forEach((key) => {
            if (typeof newItem[key] === 'number') {
              newItem[key] = newItem[key].toString();
            }
          });
          return newItem;
        });

        setdata(convertIntegersToStrings);
      } else {
        setdata([]);
      }
    })();
  }, []);
  const openDrawer = () => {
    setIsOpen(true);
  };

  const onDrawerClose = async (e, values) => {
    setIsOpen(false);
    const resp = await apiGetPatternmaster(values);
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
        header={<HeaderExtra Component={'Pattern Master'} />}
        headerExtra={headerExtraContent(
          openDrawer,

          globalFilter,
          setGlobalFilter,
          onDrawerClose,
          editData,
          setMessage,
          setlog,
        )}
        className="flex flex-col h-[87vh]"
        bodyClass="grow"
      >
        <DisplayTableContent
          data={data}
          columns={columns}
          sorting={sorting}
          globalFilter={globalFilter}
          setSorting={setSorting}
          setGlobalFilter={setGlobalFilter}
          seteditData={seteditData}
          openDrawer={openDrawer}
          ExportName={'PatternMaster'}
        />
      </Card>
    </>
  );
};

export default Patternmaster;
