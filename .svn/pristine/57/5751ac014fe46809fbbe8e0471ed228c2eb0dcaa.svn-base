import { useState, useEffect, useMemo, useRef } from 'react';
import { Badge, Drawer, Input, Alert } from 'components/ui';
import {
  apiGetproductmaster,
  apiGetsubproductmasterDrop,
} from 'services/ProgrammingService';
import { Button, Card } from 'components/ui';
import {
  HiOutlinePencil,
  HiOutlinePlusCircle,
  HiOutlineUserGroup,
  HiPlusCircle,
} from 'react-icons/hi';
import ProductEdit from './ProductEdit';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import DisplayTable from 'views/Controls/DisplayTable';
import HeaderExtra from 'views/Controls/HeaderExtra';
import DrawerFooter from 'views/Controls/DrawerFooter';
import InputwithVoice from 'components/ui/Input/InputwithVoice';
import StatisticCard from 'views/Controls/StatisticCard';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { TbShoppingCartCopy, TbShoppingCartExclamation, TbShoppingCartX } from 'react-icons/tb';

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();

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
          Add Product
        </Button>
      </span>
    </span>
  );
};

const ProductMaster = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editData, seteditData] = useState(['']);
  const [globalFilter, setGlobalFilter] = useState('');

  const [data, setdata] = useState(['']);
  const [dataFilter, setdataFilter] = useState(['']);
  console.log(
    data
  );

  const [SubProduct, setSubProduct] = useState([]);
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
        header: 'Product Name',
        accessorKey: 'ProductName',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              <Badge className={statusColor[row.IsActive]} />
              <span className="ml-2 rtl:mr-2 ">{row.ProductName}</span>
            </div>
          );
        },
      },
      {
        header: 'Sub Product',
        accessorKey: 'SubProductMaster.SubProductName',
      },
    ],
    [],
  );
  useEffect(() => {

    (async (values) => {
      try {
        const resp = await apiGetproductmaster(values);

        if (resp.status === 200) {
          // Update data and filtered data if response is successful
          setdata(resp.data);
          setdataFilter(resp.data);
        } else {
          // Handle non-200 status codes
          setdata([]);
          setdataFilter([]);
        }
      } catch (error) {
        // Handle errors from the API call
        console.error("Error fetching agency master data:", error);
        setdata([]);
        setdataFilter([]);
      }
    })();
    (async (values) => {
      try {
        const resp = await apiGetsubproductmasterDrop(values);

        if (resp.status === 200) {
          const formattedOptions = resp.data.map((option) => ({
            value: option.SubProductCode,
            label: option.SubProductName,
          }));
          setSubProduct(formattedOptions);
        } else {
          // Handle non-200 status codes
          setSubProduct([]);
        }
      } catch (error) {
        // Handle errors from the API call
        console.error("Error fetching agency master data:", error);
        setSubProduct([]);
      }
    })();

  }, []);
  const openDrawer = () => {
    setIsOpen(true);
  };

  const onDrawerClose = async (e, values) => {
    setIsOpen(false);
    try {
      const resp = await apiGetproductmaster(values);

      if (resp.status === 200) {
        // Update data and filtered data if response is successful
        setdata(resp.data);
        setdataFilter(resp.data);
      } else {
        // Handle non-200 status codes
        setdata([]);
        setdataFilter([]);
      }
    } catch (error) {
      // Handle errors from the API call
      console.error("Error fetching agency master data:", error);
      setdata([]);
      setdataFilter([]);
    }
    seteditData(['']);

  };
  const FilterTableData_On_Card = (label) => {
    switch (label) {
      case 'All Product':
        setdataFilter(data);
        break;
      case 'Active Product':
        setdataFilter(data.filter(
          (item) =>
            parseInt(item.IsActive) === 1
        ));
        break;
      case 'Inactive Product':
        setdataFilter(data.filter(
          (item) =>
            parseInt(item.IsActive) === 0
        ));
        break;
      case 'Product Added This Month':
        setdataFilter(data.filter((Product) => {
          const addedOnDate = new Date(Product.AddedOn);
          return (
            addedOnDate.getFullYear() === currentYear &&
            addedOnDate.getMonth() === currentMonth
          );
        }));
        break;
      default:
        break;
    }
  };
  // //console.log(log)
  return (
    <>
      {message && (
        <Alert className="mb-4" type={log} showIcon>
          {message}
        </Alert>
      )}

      <Card
        header={<HeaderExtra Component={'Product Master'} />}
        headerExtra={headerExtraContent(
          openDrawer,
          globalFilter,
          setGlobalFilter,
        )}
        className="flex flex-col h-[87vh]"
        bodyClass="grow"
        style={{ overflow: 'scroll' }}
      >
        <div className="grid grid-cols-4 gap-3 mb-4">
          <StatisticCard
            icon={<TbShoppingCartCopy />}
            avatarClass="!bg-indigo-600"
            label="All Product"
            value={
              data.length
            }
            Function={FilterTableData_On_Card}
            IsFunction={true}
          />
          <StatisticCard
            icon={<TbShoppingCartCopy />}
            avatarClass="!bg-emerald-600"
            label="Active Product"
            value={
              data.filter(
                (item) =>
                  parseInt(item.IsActive) === 1
              ).length
            }
            Function={FilterTableData_On_Card}
            IsFunction={true}
          />
          <StatisticCard
            icon={<TbShoppingCartX />}
            avatarClass="!bg-red-600"
            label="Inactive Product"
            value={
              data.filter(
                (item) =>
                  parseInt(item.IsActive) === 0
              ).length
            }
            Function={FilterTableData_On_Card}
            IsFunction={true}
          />
          <StatisticCard
            icon={<TbShoppingCartExclamation />}
            avatarClass="!bg-orange-600"
            label="Product Added This Month"
            value={data.filter((Product) => {
              const addedOnDate = new Date(Product.AddedOn);
              return (
                addedOnDate.getFullYear() === currentYear &&
                addedOnDate.getMonth() === currentMonth
              );
            }).length}
            Function={FilterTableData_On_Card}
            IsFunction={true}
          />
        </div>
        <DisplayTable
          data={dataFilter}
          columns={columns}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          seteditData={seteditData}
          openDrawer={openDrawer}
          ExportName={'ProductMaster'}
        />
      </Card>

      <Drawer
        title={
          editData.PromoTypeName ? (
            <p className="text-xl font-medium   flex ">
              <center>
                <Button
                  size="xs"
                  variant="twoTone"
                  icon={<HiOutlinePencil />}
                ></Button>
              </center>
              Product Master
            </p>
          ) : (
            <p className="text-xl font-medium  flex ">
              <center>
                <Button
                  size="xs"
                  variant="twoTone"
                  icon={<HiOutlinePlusCircle />}
                ></Button>
              </center>
              Product Master
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
        <ProductEdit
          ref={formikRef}
          onDrawerClose={onDrawerClose}
          editData={editData}
          setMessage={setMessage}
          setlog={setlog}
          SubProduct={SubProduct}
        />
      </Drawer>
    </>
  );
};

export default ProductMaster;
