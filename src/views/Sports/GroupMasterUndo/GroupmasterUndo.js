import { useState, useEffect, useMemo, useRef } from 'react';
import { Badge, Drawer, Input, Alert } from 'components/ui';
import { apiGetGroupNamemaster } from 'services/EventPlannerService';
import { apiGeTeammaster } from 'services/EventPlannerService';
import { Button, Card } from 'components/ui';
import { HiOutlinePencil, HiPlusCircle } from 'react-icons/hi';
import GroupEdit from './GroupEdit';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import DisplayTable from 'views/Controls/DisplayTable';
import HeaderExtra from 'views/Controls/HeaderExtra';
import DrawerFooter from 'views/Controls/DrawerFooter';
import InputwithVoice from 'components/ui/Input/InputwithVoice';

const headerExtraContent = (
  openDrawer,
  DebouncedInput,
  globalFilter,
  setGlobalFilter,
) => {
  return (
    <span className="flex items-center">
      <span className="mr-1 mt-4  font-semibold">
        <DebouncedInput
          value={globalFilter ?? ''}
          className=" solid"
          placeholder="Search all columns..."
          size="sm"
          onChange={(value) => {
            if (/^[0-9a-zA-Z\s]*$/.test(value)) {
              setGlobalFilter(value);
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
          Create Group
        </Button>
      </span>
    </span>
  );
};

const Groupmaster = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editData, seteditData] = useState(['']);
  const [globalFilter, setGlobalFilter] = useState('');

  const [data, setdata] = useState(['']);

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
        header: 'Group Name',
        accessorKey: 'GroupName',
      },
    ],
    [],
  );
  const [TeamList, setTeamList] = useState(false);
  const [selectedteams, setselectedteams] = useState(null);

  useEffect(() => {
    (async (values) => {
      const resp = await apiGetGroupNamemaster(values);
      console.log('resp', resp.data);
      setdata(resp.data);
    })();
    (async (values) => {
      const resp = await apiGeTeammaster(values);
      const teams = resp.data
        .filter((team) => team.IsActive === 1)
        .map((team) => {
          let res = {};
          res.name = team.TeamName;
          res.code = team.TeamCode;
          return res;
        });
      // //console.log(channels);
      setTeamList(teams);
    })();
  }, []);

  const openDrawer = () => {
    setIsOpen(true);
  };

  const onDrawerClose = async (e, values) => {
    //  console.log(values);
    setIsOpen(false);
    const resp = await apiGetGroupNamemaster(values);
    const result = resp.data.map((item) => ({
      GroupName: item.GroupName,
      IsActive: item.IsActive,
    }));
    setdata(resp.data);
    seteditData(['']);
  };
  function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 1500,
    ...props
  }) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
      const timeout = setTimeout(() => {
        onChange(value);
      }, debounce);

      return () => clearTimeout(timeout);
    }, [value]);
    return (
      <div className="flex justify-end">
        <div className="flex items-center mb-4">
          <InputwithVoice
            {...props}
            value={value}
            onChange={(e) => {
              if (/^[0-9a-zA-Z\s]*$/.test(e.target.value)) {
                setValue(e.target.value);
              }
            }}
          />
        </div>
      </div>
    );
  }
  console.log(editData);
  // console.log(log)
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
        header={<HeaderExtra Component={'Group Master'} />}
        headerExtra={headerExtraContent(
          openDrawer,
          DebouncedInput,
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
          ExportName={'GroupMaster'}
        />
      </Card>

      <Drawer
        title={
          editData.GroupName ? (
            <p className="text-xl font-medium   flex ">
              <center>
                <Button
                  size="xs"
                  variant="twoTone"
                  icon={<HiOutlinePencil />}
                ></Button>
              </center>
              &nbsp;&nbsp; Group Master
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
              &nbsp;&nbsp;Group Master
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
        <GroupEdit
          ref={formikRef}
          onDrawerClose={onDrawerClose}
          editData={editData}
          setMessage={setMessage}
          setlog={setlog}
          TeamList={TeamList}
          selectedteams={selectedteams}
          setselectedteams={setselectedteams}
        />
      </Drawer>
    </>
  );
};

export default Groupmaster;
