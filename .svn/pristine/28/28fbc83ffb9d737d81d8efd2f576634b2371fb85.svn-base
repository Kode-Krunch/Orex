import { useState, useEffect, useMemo, useRef } from 'react';
import { Badge, Drawer, Input, Alert } from 'components/ui';
import { apiGetCurrencymaster } from 'services/MasterService';
import { apiGetContentTypemaster } from 'services/ProgrammingService';
import { Button, Card } from 'components/ui';
import {
  HiOutlinePencil,
  HiOutlinePlusCircle,
  HiPlusCircle,
} from 'react-icons/hi';
import CurrencyEdit from './ContentTypeEdit';
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
          Add Content Type
        </Button>
      </span>
    </span>
  );
};

const ContentTypemaster = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editData, seteditData] = useState(['']);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [data, setdata] = useState(['']);
  // const [currency, setCurrency] = useState([])
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
  //console.log(data)

  const columns = useMemo(
    () => [
      {
        header: 'ContentType Name',
        accessorKey: 'ContentTypeName',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              <Badge className={statusColor[row.IsActive]} />
              <span className="ml-2 rtl:mr-2 ">{row.ContentTypeName}</span>
            </div>
          );
        },
      },

      {
        header: 'MultiPart',
        // accessorKey: 'MultiPart',
        cell: (props) => {
          const row = props.row.original;
          //console.log(row)
          return (
            <div className="flex items-center">
              {/* <Badge className={statusColor[row.MultiPart]} /> */}
              <span className="ml-2 rtl:mr-2 ">
                {row.MultiPart == 1 ? 'Y' : 'N'}
              </span>
            </div>
          );
        },
      },
      {
        header: 'EpisodeSpecific',

        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              <span className="ml-2 rtl:mr-2 ">
                {row.EpisodeSpecific == 1 ? 'Y' : 'N'}
              </span>
            </div>
          );
        },
      },
      {
        header: 'LiveEvent',

        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              <span className="ml-2 rtl:mr-2 ">
                {row.LiveEvent == 1 ? 'Y' : 'N'}
              </span>
            </div>
          );
        },
      },
      {
        header: 'SportEvent',

        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              <span className="ml-2 rtl:mr-2 ">
                {row.SportEvent == 1 ? 'Y' : 'N'}
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
      const resp = await apiGetContentTypemaster(values);
      setdata(resp.data);
    })();
    // ;(async (values) => {
    //     const Currency = await apiGetContentTypemaster(values)
    //     const formattedOptions = Currency.data.map((option) => ({
    //         value: option.ContentTypeCode,
    //         label: option.ContentTypeName,
    //     }))
    //     setCurrency(formattedOptions)
    // })()
  }, []);
  const openDrawer = () => {
    setIsOpen(true);
  };

  const onDrawerClose = async (e, values) => {
    setIsOpen(false);
    const resp = await apiGetContentTypemaster(values);
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
        header={<HeaderExtra Component={'ContentType Master'} />}
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
          ExportName={'ContentTypeMaster'}
        />
      </Card>

      <Drawer
        title={
          editData.ContentTypeName ? (
            <p className="text-xl font-medium   flex ">
              <center>
                <Button
                  size="xs"
                  variant="twoTone"
                  icon={<HiOutlinePencil />}
                ></Button>
              </center>
              ContentType Master
            </p>
          ) : (
            <p className="text-xl font-medium   flex ">
              <center>
                <Button
                  size="xs"
                  variant="twoTone"
                  icon={<HiOutlinePlusCircle />}
                ></Button>
              </center>
              ContentType Master
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
        <CurrencyEdit
          ref={formikRef}
          onDrawerClose={onDrawerClose}
          editData={editData}
          setMessage={setMessage}
          setlog={setlog}
          // currency={currency}
        />
      </Drawer>
    </>
  );
};

export default ContentTypemaster;
