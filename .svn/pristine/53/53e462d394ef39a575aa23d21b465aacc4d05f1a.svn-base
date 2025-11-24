import { useState, useEffect, useMemo, useRef } from 'react';
import { Badge, Drawer, Input, Alert } from 'components/ui';
import {
  apiGetChannelmaster,
  apiGetChannelmasterdrop,
  apiGetFormmaster,
  apiGethouseid,
  apiGetvideoidformatDrop,
} from 'services/MasterService';
import { Button, Card } from 'components/ui';
import { HiOutlinePencil, HiPlusCircle } from 'react-icons/hi';
import HouseIdEdit from './HouseIdEdit';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import DisplayTable from 'views/Controls/DisplayTable';
import HeaderExtra from 'views/Controls/HeaderExtra';
import DrawerFooter from 'views/Controls/DrawerFooter';
import { TOKEN_TYPE } from 'constants/api.constant';
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
          Create HouseID
        </Button>
      </span>
    </span>
  );
};

const HouseIdConfiguration = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editData, seteditData] = useState(['']);
  const [globalFilter, setGlobalFilter] = useState('');

  const [data, setdata] = useState(['']);
  const token = useSelector((state) => state.auth.session.token);
  const [message, setMessage] = useTimeOutMessage();
  const [log, setlog] = useState('');
  const formikRef = useRef();
  const formSubmit = () => {
    formikRef.current?.submitForm();
  };
  const LoginId = useSelector((state) => state.auth.session.LoginId);
  const statusColor = {
    1: 'bg-emerald-500',
    0: 'bg-red-500',
  };
  const [channel, setchannel] = useState([]);
  const [Event, setEvent] = useState([]);
  const [Formname, setform] = useState([]);

  useEffect(() => {
    (async (values) => {
      const resp = await apiGetChannelmasterdrop(LoginId);
      const formattedOptions = resp.data.map((option) => ({
        value: option.LocationCode + '-' + option.ChannelCode,
        label: option.LocationName + '-' + option.ChannelName,
        LocationCode: option.LocationCode,
        ChannelCode: option.ChannelCode,
      }));
      setchannel(formattedOptions);
    })();
    (async (values) => {
      const resp = await apiGetFormmaster(values);

      const filteredOptions = resp.data.filter(
        (option) =>
          option.FormName === 'Content Segment' ||
          option.FormName === 'Promo Master' ||
          option.FormName === 'Commercial Master' ||
          option.FormName === 'Song Master' ||
          option.FormName === 'NTC Master',
      );

      const formattedOptions = filteredOptions.map((option) => ({
        value: option.FormName,
        label: option.FormName,
      }));
      console.log('formattedOptions', formattedOptions);

      setform(formattedOptions);
    })();
  }, []);
  ////console.log(currency)

  const getEventTypeCode = async (values) => {
    if (values == 'Commercial Master') {
      values = 851;
    }
    if (values == 'Promo Master') {
      values = 972;
    }
    if (values == 'Content Segment') {
      values = 864;
    }

    if (values == 'Song Master') {
      values = 1020;
    }

    if (values == 'NTC Master') {
      values = 1106;
    }

    const resp = await apiGetvideoidformatDrop(values, token);
    const formattedOptions = resp.data.map((option) => ({
      value: option.value,
      label: option.text,
    }));
    setEvent(formattedOptions);
  };

  const columns = useMemo(
    () => [
      {
        header: 'Channel',
        accessorKey: 'Channel.ChannelName',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div>
              <div className="flex items-center">
                <Badge className={statusColor[row.IsActive]} />
                <span className="ml-2 rtl:mr-2 ">
                  {row.locations?.LocationName}-{row.Channel?.ChannelName}
                </span>
              </div>
            </div>
          );
        },
      },
      {
        header: 'Screen',
        accessorKey: 'FormName',
      },


      // {
      //     header: 'No Of Digit',
      //     accessorKey: 'NoOfDigit',
      // },
      {
        header: 'Current Count',
        accessorKey: 'CurrentCount',
      },
      {
        header: 'Format',
        accessorKey: 'Format',
      },
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
      const resp = await apiGethouseid(values);

      const convertIntegersToStrings = () => {
        return resp.data.map((item) => {
          const newItem = { ...item };
          Object.keys(newItem).forEach((key) => {
            if (typeof newItem[key] === 'number') {
              newItem[key] = newItem[key].toString();
            }
          });
          console.log('newItem', newItem);
          return newItem;
        });
      };

      const convertedData = convertIntegersToStrings(); // Call the function to get the converted data

      convertedData.forEach((obj) => {
        const paddedCount = obj.CurrentCount.toString().padStart(
          obj.NoOfDigit,
          '0',
        );
        obj['Format'] = obj.Initial + obj.Seperator + paddedCount;
      });

      console.log('resp.data', convertedData);
      setdata(convertedData);
    })();
  }, []);
  const openDrawer = () => {
    setIsOpen(true);
  };

  const onDrawerClose = async (e, values) => {
    setIsOpen(false);
    const resp = await apiGethouseid(values);

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

    const convertedData = convertIntegersToStrings(); // Call the function to get the converted data

    convertedData.forEach((obj) => {
      const paddedCount = obj.CurrentCount.toString().padStart(
        obj.NoOfDigit,
        '0',
      );
      obj['Format'] = obj.Initial + obj.Seperator + paddedCount;
    });

    console.log('resp.data', convertedData);
    setdata(convertedData);

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
        header={<HeaderExtra Component={'HouseID Configuration'} />}
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
          ExportName={'HouseID Configuration'}
        />
      </Card>

      <Drawer
        title={
          editData.DesignationName ? (
            <p className="text-xl font-medium   flex ">
              <center>
                <Button
                  size="xs"
                  variant="twoTone"
                  icon={<HiOutlinePencil />}
                ></Button>
              </center>
              &nbsp;&nbsp; HouseID Configuration
            </p>
          ) : (
            <p className="text-xl font-medium  flex ">
              <center>
                <Button
                  size="xs"
                  variant="
                                    ."
                  icon={<HiPlusCircle />}
                ></Button>
              </center>
              &nbsp;&nbsp;HouseID Configuration
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
        <HouseIdEdit
          ref={formikRef}
          onDrawerClose={onDrawerClose}
          editData={editData}
          setMessage={setMessage}
          setlog={setlog}
          Event={Event}
          channel={channel}
          Formname={Formname}
          getEventTypeCode={getEventTypeCode}
          setform={setform}
        />
      </Drawer>
    </>
  );
};

export default HouseIdConfiguration;
