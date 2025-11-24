import { useState, useEffect, useMemo, useRef } from 'react';
import { Badge, Drawer, Input, Alert } from 'components/ui';
import { apiGetExchangeMaster } from 'services/CreditcontrolService';
import { Button, Card } from 'components/ui';
import { HiOutlinePencil, HiPlusCircle } from 'react-icons/hi';
import ExchangeEdit from './ExchangeEdit';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import DisplayTable from 'views/Controls/DisplayTable';
import HeaderExtra from 'views/Controls/HeaderExtra';
import DrawerFooter from 'views/Controls/DrawerFooter';
import { apiGetCurrencymaster } from 'services/MasterService';
import InputwithVoice from 'components/ui/Input/InputwithVoice';

const headerExtraContent = (
  openDrawer,

  globalFilter,
  setGlobalFilter,
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
            if (/^[0-9a-zA-Z\s.]*$/.test(e.target.value)) {
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
          onClick={() => openDrawer('add')}
        >
          Add Exchange
        </Button>
      </span>
    </span>
  );
};

const Exchangemaster = () => {
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
  const statusColor = {
    1: 'bg-emerald-500',
    0: 'bg-red-500',
  };

  const columns = useMemo(
    () => [
      {
        header: 'Currency',
        accessorKey: 'currency.CurrencyName',
        //   cell: (props) => {
        //     const row = props.row.original;
        //     return (
        //       <div className="flex items-center">
        //         <span className="ml-2 rtl:mr-2 ">
        //           {row.currency?.CurrencyName}
        //         </span>
        //       </div>
        //     );
        //   },
      },
      {
        header: 'Effective From',
        accessorKey: 'ExchangeFromDt',
      },
      {
        header: 'Conversion Rate',
        accessorKey: 'ConversionRate',
      },
    ],
    [],
  );

  useEffect(() => {
    (async (values) => {
      const resp = await apiGetExchangeMaster(values);
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

  const openDrawer = (df) => {
    setIsOpen(true);
    seteditData(['']);
  };

  const onDrawerClose = async (e, values) => {
    //  console.log(values);
    setIsOpen(false);
    const resp = await apiGetExchangeMaster(values);

    setdata(resp.data);
    seteditData(['']);
  };

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
        header={<HeaderExtra Component={'Exchange Master'} />}
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
          ExportName={'ExchangeMaster'}
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
              &nbsp;&nbsp; Exchange Master
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
              &nbsp;&nbsp;Exchange Master
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
        <ExchangeEdit
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

export default Exchangemaster;
