import { useState, useEffect, useMemo, useRef } from 'react';
import { Badge, Drawer, Tooltip } from 'components/ui';
import {
  apiGetbrandmaster,
  apiGetproductmaster,
} from 'services/ProgrammingService';
import { Button, Card } from 'components/ui';
import {
  HiOutlinePencil,
  HiOutlinePlusCircle,
  HiPlusCircle,
} from 'react-icons/hi';
import BrandEdit from './BrandEdit';
import HeaderExtra from 'views/Controls/HeaderExtra';
import DrawerFooter from 'views/Controls/DrawerFooter';
import { apiGetClientmaster } from 'services/MasterService';
import InputwithVoice from 'components/ui/Input/InputwithVoice';
import { TbSpeakerphone } from 'react-icons/tb';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable';
import Td from 'components/ui/Table/Td';
import { useSelector } from 'react-redux';
import StatisticCard from 'views/Controls/StatisticCard';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { FiAlertOctagon } from 'react-icons/fi';

const statusColor = {
  1: 'bg-emerald-500',
  0: 'bg-red-500',
};
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();


const headerExtraContent = (openDrawer, globalFilter, setGlobalFilter) => {
  return (
    <span className="flex items-center">
      <span className="mr-1   font-semibold">
        {/*  */}
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
          Add Brand
        </Button>
      </span>
    </span>
  );
};

const Brandmaster = () => {
  const { themeColor, primaryColorLevel } = useSelector((state) => state.theme);

  /* STATES */
  const [isOpen, setIsOpen] = useState(false);
  const [editData, seteditData] = useState(['']);
  const [globalFilter, setGlobalFilter] = useState('');

  const [data, setdata] = useState(['']);
  const [tableDataFilter, setTableDataFilter] = useState(['']);
  const [managedColumns, setManagedColumns] = useState([]);
  const [ClientList, setClientList] = useState(false);
  const [Product, setProduct] = useState({
    value: '',
    label: '',
  });
  const [selectedclients, setselectedclients] = useState(null);

  /* HOOKS */
  const formikRef = useRef();
  const columns = useMemo(
    () => [
      {
        header: 'Brand Name',
        accessorKey: 'BrandName',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              <Badge className={statusColor[row.IsActive]} />
              <span className="ml-2 rtl:mr-2 ">{row.BrandName}</span>
            </div>
          );
        },
      },
      {
        header: 'Product ',
        accessorKey: 'ProductName',
      },
      {
        header: 'Action',
        accessorKey: 'action',
        actions: [
          {
            action: (rowindex, rowData) => (
              <Td className="text-xs   font-medium ">
                <center>
                  <Tooltip title="Edit">
                    <span
                      className={`cursor-pointer pl-3 text-base hover:text-${themeColor}-${primaryColorLevel}`}
                      onClick={async () => {
                        setIsOpen(true);
                        seteditData(rowData);
                      }}
                    >
                      <HiOutlinePencil />
                    </span>
                  </Tooltip>
                </center>
              </Td>
            ),
          },
        ],
      },
    ],
    [],
  );

  useEffect(() => {

    (async (values) => {
      try {
        const resp = await apiGetbrandmaster(values);

        if (resp.status === 200) {
          // Update data and filtered data if response is successful
          setdata(resp.data);
          setTableDataFilter(resp.data);
        } else {
          // Handle non-200 status codes
          setdata([]);
          setTableDataFilter([]);
        }
      } catch (error) {
        // Handle errors from the API call
        console.error("Error fetching agency master data:", error);
        setdata([]);
        setTableDataFilter([]);
      }
    })();
    (async (values) => {
      try {
        const resp = await apiGetproductmaster(values);
        if (resp.status === 200) {
          // Update data and filtered data if response is successful
          const formattedOptions = resp.data.map((option) => ({
            value: option.ProductCode,
            label: option.ProductName,
          }));
          setProduct(formattedOptions);
        } else {
          // Handle non-200 status codes
          setProduct([]);
        }
      } catch (error) {
        // Handle errors from the API call
        console.error("Error fetching agency master data:", error);
        setProduct([]);
      }

    })();
    (async (values) => {
      try {
        const resp = await apiGetClientmaster(values);
        if (resp.status === 200) {
          // Update data and filtered data if response is successful
          const clients = resp.data
            .filter((client) => client.IsActive === 1)
            .map((client) => {
              let res = {};
              res.name = client.ClientName;
              res.code = client.ClientCode;
              // Below fields (label and value) is required by Elstar's <Select/> component
              res.label = client.ClientName;
              res.value = client.ClientCode;
              return res;
            });
          setClientList(clients);
        } else {
          // Handle non-200 status codes
          setClientList([]);
        }
      } catch (error) {
        // Handle errors from the API call
        console.error("Error fetching agency master data:", error);
        setClientList([]);
      }

    })();

  }, []);

  /* FUNCTIONS */
  const openDrawer = () => {
    setIsOpen(true);
  };

  const formSubmit = () => {
    formikRef.current?.submitForm();
  };

  const onDrawerClose = async (e, values) => {
    setIsOpen(false);
    try {
      const resp = await apiGetbrandmaster(values);

      if (resp.status === 200) {
        // Update data and filtered data if response is successful
        setdata(resp.data);
        setTableDataFilter(resp.data);
      } else {
        // Handle non-200 status codes
        setdata([]);
        setTableDataFilter([]);
      }
    } catch (error) {
      // Handle errors from the API call
      console.error("Error fetching agency master data:", error);
      setdata([]);
      setTableDataFilter([]);
    }
    seteditData(['']);
  };
  const FilterTableData_On_Card = (CardName) => {
    switch (CardName) {
      case 'Total Brand':
        setTableDataFilter(data);
        break;
      case 'Active Brands':
        setTableDataFilter(data.filter((item) => item.IsActive == 1));
        break;
      case 'InActive Brands':
        setTableDataFilter(data.filter((item) => item.IsActive == 0));
        break;
      case 'Brands Added This Month':
        setTableDataFilter(data.filter((Brands) => {
          const addedOnDate = new Date(Brands.AddedOn);
          return (
            addedOnDate.getFullYear() === currentYear &&
            addedOnDate.getMonth() === currentMonth
          );
        }));
      default:
        break;
    }
  };
  return (
    <>
      <Card
        header={<HeaderExtra Component={'Brand Master'} />}
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
            icon={<TbSpeakerphone />}
            avatarClass="!bg-indigo-600"
            label="Total Brand"
            value={
              data.length
            }
            Function={FilterTableData_On_Card}
            IsFunction={true}
          />
          <StatisticCard
            icon={<IoMdCheckmarkCircleOutline />}
            avatarClass="!bg-emerald-600"
            label="Active Brands"
            value={
              data.filter((item) => item.IsActive == 1).length
            }
            Function={FilterTableData_On_Card}
            IsFunction={true}
          />
          <StatisticCard
            icon={<FiAlertOctagon />}
            avatarClass="!bg-red-600"
            label="InActive Brands"
            value={
              data.filter((item) => item.IsActive == 0).length
            }
            Function={FilterTableData_On_Card}
            IsFunction={true}
          />
          <StatisticCard
            icon={<TbSpeakerphone />}
            avatarClass="!bg-orange-600"
            label="Brands Added This Month"
            value={data.filter((Brands) => {
              const addedOnDate = new Date(Brands.AddedOn);
              return (
                addedOnDate.getFullYear() === currentYear &&
                addedOnDate.getMonth() === currentMonth
              );
            }).length}
            Function={FilterTableData_On_Card}
            IsFunction={true}
          />
        </div>

        <ReportsTable
          tableData={tableDataFilter}
          tableName={`Brand Master`}
          originalColumns={columns}
          externalGlobalFilter={globalFilter}
          managedColumns={managedColumns}
          setManagedColumns={setManagedColumns}
          exportFileName={`Brand Master`}
          columnsToFormatInINR={[]}
        />
      </Card>
      <Drawer
        title={
          editData.BrandName ? (
            <p className="text-xl font-medium flex gap-2">
              <Button
                size="xs"
                variant="twoTone"
                icon={<HiOutlinePencil />}
              ></Button>
              Brand Master
            </p>
          ) : (
            <p className="text-xl font-medium flex gap-2">
              <Button
                size="xs"
                variant="twoTone"
                icon={<HiOutlinePlusCircle />}
              ></Button>
              Brand Master
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
        <BrandEdit
          ref={formikRef}
          onDrawerClose={onDrawerClose}
          editData={editData}
          Product={Product}
          ClientList={ClientList}
          selectedclients={selectedclients}
          setselectedclients={setselectedclients}
        />
      </Drawer>
    </>
  );
};

export default Brandmaster;
