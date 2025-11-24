import { useState, useEffect, useMemo, useRef } from 'react';
import { Badge, Drawer, Input, Alert, Avatar } from 'components/ui';
import { apiGetCountryMaster, apiGetStateMaster } from 'services/MasterService';
import { Button, Card } from 'components/ui';
import {
  HiOutlinePencil,
  HiOutlinePlusCircle,
  HiPlusCircle,
} from 'react-icons/hi';
import StateEdit from './StateEdit';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import DisplayTable from 'views/Controls/DisplayTable';
import HeaderExtra from 'views/Controls/HeaderExtra';
import DrawerFooter from 'views/Controls/DrawerFooter';
import InputwithVoice from 'components/ui/Input/InputwithVoice';
import Loader from 'views/Controls/Loader';
import { useSelector } from 'react-redux';

/* CONSTANTS */
const STATUS_COLOR = {
  1: 'bg-emerald-500',
  0: 'bg-red-500',
};

/* COMPONENTS */
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
          onClick={openDrawer}
        >
          Add State
        </Button>
      </span>
    </span>
  );
};

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 1500,
  ...props
}) => {
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
};

const Statemaster = () => {
  /* STATES */
  const [isOpen, setIsOpen] = useState(false);
  const [editData, seteditData] = useState(['']);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [data, setdata] = useState(['']);
  const [Country, setCountry] = useState([]);
  const [log, setlog] = useState('');
  const [loader, setLoader] = useState(false);
  const token = useSelector((state) => state.auth.session.token);

  /* HOOKS */
  const formikRef = useRef();
  const [message, setMessage] = useTimeOutMessage();
  const columns = useMemo(
    () => [
      {
        header: 'State',
        accessorKey: 'StateName',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              <Badge className={STATUS_COLOR[row.IsActive]} />
              <span className="ml-2 rtl:mr-2 ">{row.StateName}</span>
            </div>
          );
        },
      },
      {
        header: 'Short Name',
        accessorKey: 'StateShortName',
      },
      {
        header: 'State TinNo',
        accessorKey: 'StateTinNo',
      },
    ],
    [],
  );

  /* USE EFFECTS */
  useEffect(() => {
    (async (values) => {
      setLoader(true);
      const resp = await apiGetStateMaster(values);
      setdata(resp.data);

      const Country = await apiGetCountryMaster(values);
      const formattedOptions = Country.data.map((option) => ({
        value: option.CountryCode,
        label: option.CountryName,
      }));
      setCountry(formattedOptions);
      setLoader(false);
    })();
    (async (values) => {})();
  }, []);

  /* EVENT HANDLERS */
  const openDrawer = () => {
    setIsOpen(true);
  };

  const onDrawerClose = async (e, values) => {
    setIsOpen(false);
    const resp = await apiGetStateMaster(values);
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
        header={<HeaderExtra Component={'State Master'} />}
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
          //sorting={sorting}
          globalFilter={globalFilter}
          //setSorting={setSorting}
          setGlobalFilter={setGlobalFilter}
          seteditData={seteditData}
          openDrawer={openDrawer}
          ExportName={'StateMaster'}
        />
      </Card>

      <Drawer
        title={
          editData.StateName ? (
            <p className="text-xl font-medium text-black flex items-center">
              <Avatar
                size="sm"
                className="dark:bg-teal-800"
                icon={<HiOutlinePencil />}
              />
              &nbsp;&nbsp;State Master
            </p>
          ) : (
            <p className="text-xl font-medium text-black flex items-center">
              <Avatar
                size="sm"
                className="dark:bg-teal-800"
                icon={<HiOutlinePlusCircle />}
              />
              &nbsp;&nbsp;State Master
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
          <DrawerFooter
            onCancel={onDrawerClose}
            onSaveClick={() => formikRef.current?.submitForm()}
            BtnSaveTxt={editData[0] === '' ? 'Save' : 'Update'}
          />
        }
      >
        <StateEdit
          ref={formikRef}
          onDrawerClose={onDrawerClose}
          editData={editData}
          setMessage={setMessage}
          setlog={setlog}
          Country={Country}
          setLoader={setLoader}
          token={token}
        />
      </Drawer>
      <Loader showLoader={loader} />
    </>
  );
};

export default Statemaster;
