import { useState, useEffect, useMemo, useRef } from 'react';
import { Badge, Drawer, Input, Alert } from 'components/ui';
import { apiGetCurrencymaster } from 'services/MasterService';
import { Button, Card } from 'components/ui';
import { HiOutlinePencil, HiPlusCircle } from 'react-icons/hi';
import CurrencyEdit from './CurrencyEdit';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import DisplayTable from 'views/Controls/DisplayTable';
import HeaderExtra from 'views/Controls/HeaderExtra';
import DrawerFooter from 'views/Controls/DrawerFooter';
import InputwithVoice from 'components/ui/Input/InputwithVoice';

const headerExtraContent = (openDrawer, globalFilter, setGlobalFilter) => {
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
          Add Currency
        </Button>
      </span>
    </span>
  );
};

const Currencymaster = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editData, seteditData] = useState(['']);
  const [globalFilter, setGlobalFilter] = useState('');
  const [data, setdata] = useState(['']);
  const [currency, setCurrency] = useState([]);
  const [message, setMessage] = useTimeOutMessage();
  const [log, setlog] = useState('');
  const formikRef = useRef();
  const formSubmit = () => {
    formikRef.current?.submitForm();
  };

  const columns = useMemo(
    () => [
      {
        header: 'Currency',
        accessorKey: 'CurrencyName',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              {/* <Badge className={statusColor[row.IsActive]} /> */}
              <img
                src={row.Currency_image}
                style={{
                  height: '20px',
                  width: '20px',
                }}
              ></img>
              &nbsp;
              {/* <Badge className={statusColor[row.IsActive]} /> */}
              <span className="ml-1 rtl:mr-2 capitalize">
                {row.CurrencyName}
              </span>
            </div>
          );
        },
      },

      {
        header: 'Symbol',
        accessorKey: 'CurrencySymbol',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="w-[50px]">
              {/* <Badge className={statusColor[row.IsActive]} /> */}
              <span className="ml-1 rtl:mr-2 capitalize">
                {row.CurrencySymbol}
              </span>
            </div>
          );
        },
      },
      {
        header: 'Short Name',
        accessorKey: 'ShortName',
      },
    ],
    [],
  );
  useEffect(() => {
    (async (values) => {
      const resp = await apiGetCurrencymaster(values);
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
  }, []);
  const openDrawer = () => {
    setIsOpen(true);
  };

  const onDrawerClose = async (e, values) => {
    setIsOpen(false);
    const resp = await apiGetCurrencymaster(values);
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
        header={<HeaderExtra Component={'Currency Master'} />}
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
          ExportName={'CurrencyMaster'}
        />
      </Card>

      <Drawer
        title={
          editData.CurrencyName ? (
            <p className="text-xl font-medium   flex ">
              <center>
                <Button
                  size="xs"
                  variant="twoTone"
                  icon={<HiOutlinePencil />}
                ></Button>
              </center>
              &nbsp;&nbsp; Currency Master
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
              &nbsp;&nbsp;Currency Master
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
          currency={currency}
        />
      </Drawer>
    </>
  );
};

export default Currencymaster;
