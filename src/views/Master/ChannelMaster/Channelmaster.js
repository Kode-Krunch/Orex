import { useState, useEffect, useMemo, useRef } from 'react';
import { Badge, Drawer, Input, Alert, Avatar } from 'components/ui';
import {
  apiGetChannelmaster,
  apiGetStateMaster,
  apiGetGenremaster,
} from 'services/MasterService';
import { Button, Card } from 'components/ui';
import { HiOutlinePencil, HiPlusCircle } from 'react-icons/hi';
import ChannelEdit from './ChannelEdit';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import DisplayTable from 'views/Controls/DisplayTable';
import HeaderExtra from 'views/Controls/HeaderExtra';
import DrawerFooter from 'views/Controls/DrawerFooter';
import { apiGetvideotypdrop } from 'services/ProgrammingService';
import { useSelector } from 'react-redux';
import InputwithVoice from 'components/ui/Input/InputwithVoice';
import { isCharAndNumforOTTNAME } from 'components/validators';

const headerExtraContent = (openDrawer, globalFilter, setGlobalFilter) => {
  return (
    <span className="flex items-center">
      <span className="mr-1    font-semibold">
        <InputwithVoice
          value={globalFilter ?? ''}
          className=" solid"
          placeholder="Search all columns..."
          size="sm"
          onChange={(e) => {
            if (isCharAndNumforOTTNAME(e.target.value)) {
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
          Add Channel
        </Button>
      </span>
    </span>
  );
};

const Channelmaster = () => {
  const { currentRouteKey } = useSelector((state) => state.base.common);
  console.log(currentRouteKey);
  const [isOpen, setIsOpen] = useState(false);
  const [editData, seteditData] = useState(['']);
  const [globalFilter, setGlobalFilter] = useState('');

  const [data, setdata] = useState(['']);
  const [state, setstate] = useState(['']);
  const [Genre, setgenre] = useState(['']);
  const [VideoTypes, setVideoTypes] = useState(['']);
  const formikRef = useRef();
  const formSubmit = () => {
    formikRef.current?.submitForm();
  };
  console.log(data);
  const [message, setMessage] = useTimeOutMessage();
  const [log, setlog] = useState('');

  const statusColor = {
    1: 'bg-emerald-500',
    0: 'bg-red-500',
  };

  const columns = useMemo(
    () => [
      {
        header: 'Channel',
        accessorKey: 'ChannelName',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              <img
                src={row.Channel_Image}
                style={{
                  height: '20px',
                  width: '20px',
                }}
              ></img>
              &nbsp;
              {/* <Badge className={statusColor[row.IsActive]} /> */}
              <span className="ml-1 rtl:mr-2 capitalize">
                {row.ChannelName}
              </span>
            </div>
          );
        },
      },
      {
        header: 'Genre',
        accessorKey: 'GenreMaster',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              <span className="ml-2 rtl:mr-2 ">
                {row.GenreMaster?.GenreName}
              </span>
            </div>
          );
        },
      },

      {
        header: 'Content Type',
        accessorKey: 'VideoType.VideoTypeName',
      },
      {
        header: 'Short Name',
        accessorKey: 'ShortName',
      },
      {
        header: 'Genre',
        accessorKey: 'GenreMaster',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              <span className="ml-2 rtl:mr-2 ">
                {row.GenreMaster?.GenreName}
              </span>
            </div>
          );
        },
      },
    ],
    [],
  );
  useEffect(() => {
    (async (values) => {
      const resp = await apiGetChannelmaster(values);

      setdata(resp.data);
    })();
    (async (values) => {
      const vt = await apiGetvideotypdrop(values);
      const formattedOptions = vt.data.map((option) => ({
        value: option.VideoTypeCode,
        label: option.VideoTypeName,
      }));

      setVideoTypes(formattedOptions);
    })();

    (async (values) => {
      const State = await apiGetStateMaster(values);

      const formattedOptions = State.data.map((option) => ({
        value: option.StateCode,
        label: option.StateName,
      }));
      setstate(formattedOptions);
    })();
    (async (values) => {
      const Genre = await apiGetGenremaster(values);

      const formattedOptions = Genre.data.map((option) => ({
        value: option.GenreCode,
        label: option.GenreName,
      }));
      setgenre(formattedOptions);
    })();
  }, []);

  const openDrawer = () => {
    setIsOpen(true);
  };

  const onDrawerClose = async (e, values) => {
    const resp = await apiGetChannelmaster(values);
    seteditData(['']);
    setdata(resp.data);
    setIsOpen(false);
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
        header={<HeaderExtra Component={'Channel Master'} />}
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
          ExportName={'ChannelMaster'}
        />
      </Card>

      <Drawer
        title={
          editData.ChannelName ? (
            <p className="text-xl font-medium   flex ">
              <center>
                <Avatar
                  size="sm"
                  className="dark:bg-teal-800"
                  icon={<HiOutlinePencil />}
                />
              </center>
              &nbsp;&nbsp; Channel Master
            </p>
          ) : (
            <p className="text-xl font-medium   flex ">
              <center>
                <Avatar
                  size="sm"
                  className="dark:bg-teal-800"
                  icon={<HiPlusCircle />}
                />
              </center>
              &nbsp;&nbsp;Channel Master
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
        <ChannelEdit
          ref={formikRef}
          onDrawerClose={onDrawerClose}
          editData={editData}
          setMessage={setMessage}
          setlog={setlog}
          State={state}
          Genre={Genre}
          VideoTypesMaster={VideoTypes}
        />
      </Drawer>
    </>
  );
};

export default Channelmaster;
