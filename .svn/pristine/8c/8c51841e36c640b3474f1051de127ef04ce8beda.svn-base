import { useState, useEffect, useMemo, useRef } from 'react';
import { Badge, Drawer, Input, Alert } from 'components/ui';
import { apiGetRateCardmaster } from 'services/CreditcontrolService';
import { Button, Card } from 'components/ui';
import { HiOutlinePencil, HiPlusCircle } from 'react-icons/hi';
import RateCardEdit from './RateCardEdit';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import DisplayTable from 'views/Controls/DisplayTable';
import HeaderExtra from 'views/Controls/HeaderExtra';
import DrawerFooter from 'views/Controls/DrawerFooter';
import {
  apiGetChannelmaster,
  apiGetChannelmasterdrop,
  apiGetCurrencymaster,
} from 'services/MasterService';
import { useSelector } from 'react-redux';
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
          Add RateCard
        </Button>
      </span>
    </span>
  );
};

const RateCardmaster = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editData, seteditData] = useState(['']);
  const [globalFilter, setGlobalFilter] = useState('');

  const [data, setdata] = useState(['']);
  const [currency, setCurrency] = useState([]);
  const [message, setMessage] = useTimeOutMessage();
  //const [Channel, setChannel] = useState([])
  const [log, setlog] = useState('');
  const formikRef = useRef();
  const formSubmit = () => {
    formikRef.current?.submitForm();
  };
  const Channel = useSelector((state) => state.locale.selectedChannel);
  const statusColor = {
    1: 'bg-emerald-500',
    0: 'bg-red-500',
  };
  const LoginId = useSelector((state) => state.auth.session.LoginId);

  const columns = useMemo(
    () => [
      {
        header: 'RateCard Name',
        accessorKey: 'RateCardName',
      },
      {
        header: 'Rate per 10sec',
        accessorKey: 'Rateper10sec',
      },
      {
        header: 'Rate per spot',
        accessorKey: 'Rateperspot',
      },
      {
        header: 'Channel Name',
        accessorKey: 'Channel.ChannelName',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              <span className="ml-2 rtl:mr-2 ">{row.Channel?.ChannelName}</span>
            </div>
          );
        },
      },
    ],
    [],
  );
  const [channel, setChannel] = useState({
    value: '',
    label: '',
  });
  useEffect(() => {
    (async (values) => {
      let Parameters = {
        LocationCode: Channel.LocationCode,
        ChannelCode: Channel.ChannelCode,

      };
      const resp = await apiGetRateCardmaster(Parameters);
      console.log(resp.data);
      setdata(resp.data);
    })();

    (async (values) => {
      const Currency = await apiGetCurrencymaster(values);
      const formattedOptions = Currency.data.map((option) => ({
        value: option.CurrencyCode,
        label: option.CurrencyName,
      }));
      setCurrency(formattedOptions);
    })();
    (async (values) => {
      const Channel = await apiGetChannelmasterdrop(LoginId);
      const formattedOptions = Channel.data.map((option) => ({
        value: option.ChannelCode,
        label: option.ChannelName,
        LocationCode: option.LocationCode,
      }));
      setChannel(formattedOptions);
    })();
  }, []);
  const openDrawer = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    (async (values) => {
      let Parameters = {
        LocationCode: Channel.LocationCode,
        ChannelCode: Channel.ChannelCode,

      };
      const resp = await apiGetRateCardmaster(Parameters);
      console.log(resp.data);
      setdata(resp.data);
    })();
  }, [Channel]);

  const onDrawerClose = async (e, values) => {
    setIsOpen(false);
    let Parameters = {
      LocationCode: Channel.LocationCode,
      ChannelCode: Channel.ChannelCode,

    };
    const resp = await apiGetRateCardmaster(Parameters);
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
        header={<HeaderExtra Component={'RateCard Master'} />}
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
          ExportName={'RateCardMaster'}
        />
      </Card>

      <Drawer
        title={
          editData.RateCardName ? (
            <p className="text-xl font-medium   flex ">
              <center>
                <Button
                  size="xs"
                  variant="twoTone"
                  icon={<HiOutlinePencil />}
                ></Button>
              </center>
              &nbsp;&nbsp; RateCard Master
            </p>
          ) : (
            <p className="text-xl font-medium  flex ">
              <center>
                <Button
                  size="xs"
                  variant="twoTone"
                  icon={<HiPlusCircle />}
                ></Button>
              </center>
              &nbsp;&nbsp;RateCard Master
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
        <RateCardEdit
          ref={formikRef}
          onDrawerClose={onDrawerClose}
          editData={editData}
          setMessage={setMessage}
          setlog={setlog}
          currency={currency}
          channel={channel}
        />
      </Drawer>
    </>
  );
};

export default RateCardmaster;
