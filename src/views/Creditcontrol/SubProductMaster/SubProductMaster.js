import { useState, useEffect, useMemo, useRef } from 'react';
import { Badge, Drawer, Alert } from 'components/ui';
import {
  apiGetproductmaster,
  apiGetsubproductmaster,
} from 'services/CreditcontrolService';
import { Button, Card } from 'components/ui';
import {
  HiOutlinePencil,
  HiOutlinePlusCircle,
  HiPlusCircle,
} from 'react-icons/hi';
import SubProductEdit from './SubProductEdit';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import DisplayTable from 'views/Controls/DisplayTable';
import HeaderExtra from 'views/Controls/HeaderExtra';
import DrawerFooter from 'views/Controls/DrawerFooter';
import InputwithVoice from 'components/ui/Input/InputwithVoice';

const statusColor = {
  1: 'bg-emerald-500',
  0: 'bg-red-500',
};

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
          Add Product Category
        </Button>
      </span>
    </span>
  );
};

const SubProductMaster = () => {
  /* STATES */
  const [isOpen, setIsOpen] = useState(false);
  const [editData, seteditData] = useState(['']);
  const [globalFilter, setGlobalFilter] = useState('');

  const [data, setdata] = useState(['']);
  const [log, setlog] = useState('');
  const [ProductList, setProduct] = useState({
    value: '',
    label: '',
  });

  /* HOOKS */
  const [message, setMessage] = useTimeOutMessage();
  const formikRef = useRef();
  const columns = useMemo(
    () => [
      {
        header: 'Product Category',
        accessorKey: 'SubProductName',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              <Badge className={statusColor[row.IsActive]} />
              <span className="ml-2 rtl:mr-2 ">{row.SubProductName}</span>
            </div>
          );
        },
      },
    ],
    [],
  );

  useEffect(() => {
    (async (values) => {
      const resp = await apiGetsubproductmaster(values);
      setdata(resp.data);
    })();
    (async (values) => {
      const resp = await apiGetproductmaster(values);
      const formattedOptions = resp.data.map((option) => ({
        value: option.ProductCode,
        label: option.ProductName,
      }));
      setProduct(formattedOptions);
    })();
  }, []);

  /* FUNCTIONS */
  const formSubmit = () => {
    formikRef.current?.submitForm();
  };

  const openDrawer = () => {
    setIsOpen(true);
  };

  const onDrawerClose = async (e, values) => {
    setIsOpen(false);
    const resp = await apiGetsubproductmaster(values);
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

  return (
    <>
      {message && (
        <Alert className="mb-4" type={log} showIcon>
          {message}
        </Alert>
      )}
      <Card
        header={<HeaderExtra Component={'Product Category'} />}
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
          ExportName={'SubProductMaster'}
        />
      </Card>
      <Drawer
        title={
          editData.SubProductName ? (
            <p className="text-xl font-medium flex gap-2">
              <Button
                size="xs"
                variant="twoTone"
                icon={<HiOutlinePencil />}
              ></Button>
              Product Category
            </p>
          ) : (
            <p className="text-xl font-medium flex gap-2">
              <Button
                size="xs"
                variant="twoTone"
                icon={<HiOutlinePlusCircle />}
              ></Button>
              Product Category
            </p>
          )
        }
        isOpen={isOpen}
        onClose={onDrawerClose}
        onRequestClose={onDrawerClose}
        width={600}
        footer={
          <DrawerFooter onCancel={onDrawerClose} onSaveClick={formSubmit} />
        }
      >
        <SubProductEdit
          ref={formikRef}
          onDrawerClose={onDrawerClose}
          editData={editData}
          setMessage={setMessage}
          setlog={setlog}
          ProductList={ProductList}
        />
      </Drawer>
    </>
  );
};

export default SubProductMaster;
