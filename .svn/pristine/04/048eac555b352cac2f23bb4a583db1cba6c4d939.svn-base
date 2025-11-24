import { useState, useEffect, useMemo } from 'react';
import { Alert, Avatar } from 'components/ui';
import { apiGetchannelsettingmaster } from 'services/MasterService';
import { Button, Card } from 'components/ui';
import { HiPlusCircle } from 'react-icons/hi';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import HeaderExtra from 'views/Controls/HeaderExtra';
import { useNavigate } from 'react-router-dom';
import DisplayTableContent from 'views/Controls/DisplayTableContent';
import { setContent } from 'store/base/commonSlice';
import { useDispatch } from 'react-redux';
import InputwithVoice from 'components/ui/Input/InputwithVoice';

const headerExtraContent = (
  openDrawer,

  globalFilter,
  setGlobalFilter,
  navigate,
  editData,
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
          //onClick={() => openDrawer()}
          onClick={() =>
            navigate('/ChannelSettingEdit', {
              state: {
                editData,
              },
            })
          }
        >
          Channel Settings
        </Button>
      </span>
    </span>
  );
};

const ChannelsettingMaster = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [editData, seteditData] = useState(['']);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [data, setdata] = useState(['']);
  const [message, setMessage] = useTimeOutMessage();
  const [log, setlog] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setContent({}));
    (async (values) => {
      const resp = await apiGetchannelsettingmaster(values);
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
  const columns = useMemo(
    () => [
      {
        header: 'Channel Name',
        accessorKey: 'Channel.ChannelName ',
        cell: (props) => {
          const row = props.row.original;

          return (
            <div className="flex items-center">
              <Avatar
                shape="circle"
                size={20}
                src={`${row.Channel?.Channel_Image}`}
                className="mr-2"
              />
              {row.locations?.LocationName}-{row.Channel?.ChannelName}
            </div>
          );
        },
      },
      {
        header: 'Start Time',
        accessorKey: 'StartTime',
      },
      {
        header: 'End Time',
        accessorKey: 'EndTime',
      },
      {
        header: 'Playout',
        accessorKey: 'Playout.PlayoutName',
      },
      ,
    ],
    [],
  );

  const openDrawer = () => {
    setIsOpen(true);
  };

  return (
    <>
      {message && (
        <Alert className="mb-4" type={log} showIcon>
          {message}
        </Alert>
      )}
      <Card
        header={<HeaderExtra />}
        headerExtra={headerExtraContent(
          openDrawer,

          globalFilter,
          setGlobalFilter,
          navigate,
          editData,
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
          ExportName={'ChannelsettingMaster'}
        />
      </Card>
    </>
  );
};

export default ChannelsettingMaster;
