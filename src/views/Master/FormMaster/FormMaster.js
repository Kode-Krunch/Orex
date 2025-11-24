import { useState, useEffect, useMemo, useRef } from 'react';
import { Badge, Drawer, Input, Alert } from 'components/ui';
import {
  apiGetFormmaster,
  apiGetModulemaster,
  apiGetSubModulemaster,
  dropmodulewise,
} from 'services/MasterService';
import { Button, Card } from 'components/ui';
import { HiOutlinePencil, HiPlusCircle } from 'react-icons/hi';
import FormEdit from './FormEdit';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import DisplayTable from 'views/Controls/DisplayTable';
import HeaderExtra from 'views/Controls/HeaderExtra';
import DrawerFooter from 'views/Controls/DrawerFooter';
import InputwithVoice from 'components/ui/Input/InputwithVoice';

const headerExtraContent = (
  openDrawer,

  globalFilter,
  setGlobalFilter,
) => {
  return (
    <span className="flex items-center">
      <span className="mr-1 flex items-center font-semibold">
        <InputwithVoice
          value={globalFilter ?? ''}
          className=" solid"
          size="sm"
          placeholder="Search all columns..."
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
          Add Screens
        </Button>
      </span>
    </span>
  );
};

const Formmaster = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editData, seteditData] = useState(['']);
  const [globalFilter, setGlobalFilter] = useState('');

  const [data, setdata] = useState(['']);
  const [Module, setModule] = useState([]);
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
        header: 'Screens',
        accessorKey: 'FormName',

        cell: (props) => {
          const row = props.row.original;
          // console.log(row)
          return (
            <div className="flex items-center">
              <Badge className={statusColor[row.IsActive]} />
              <span className="ml-2 rtl:mr-2 ">{row.FormName}</span>
            </div>
          );
        },
      },
      {
        header: 'Modules',
        accessorKey: 'module',
        cell: (props) => {
          const row = props.row.original;

          return (
            <div className="flex items-center">
              <span className="ml-2 rtl:mr-2 ">{row.module}</span>
            </div>
          );
        },
      },
      {
        header: 'SubModules',
        accessorKey: 'SubModule',
        cell: (props) => {
          const row = props.row.original;
          ////console.log(row)
          return (
            <div className="flex items-center">
              <span className="ml-2 rtl:mr-2 ">{row.SubModule}</span>
            </div>
          );
        },
      },
    ],
    [],
  );
  useEffect(() => {
    (async (values) => {
      const resp = await apiGetFormmaster(values);

      const result = resp.data.map((item) => ({
        FormCode: item.FormCode,
        FormName: item.FormName,
        IsActive: item.IsActive,
        SubModule: item.SubModule.SubModuleName,
        module: item.module.ModuleName,
        SubModuleCode: item.SubModule.SubModuleCode,
        ModuleCode: item.module.ModuleCode,
        IndexNum: item.IndexNum,
        WinFormName: item.WinFormName,
        FormImage: item.FormImage,
        IS_MO: item.IS_MO,
      }));
      setdata(result);
    })();
    try {
      (async (values) => {
        const Module = await apiGetModulemaster(values);
        const formattedOptions = Module.data.map((option) => ({
          value: option.ModuleCode,
          label: option.ModuleName,
        }));
        setModule(formattedOptions);
      })();
      //const SubModule = await apiGetSubModulemaster(values)
    } catch (error) {}
  }, []);
  const openDrawer = () => {
    setIsOpen(true);
  };

  const onDrawerClose = async (e, values) => {
    setIsOpen(false);
    const resp = await apiGetFormmaster(values);
    const result = resp.data.map((item) => ({
      FormCode: item.FormCode,
      FormName: item.FormName,
      IsActive: item.IsActive,
      SubModule: item.SubModule.SubModuleName,
      module: item.module.ModuleName,
      SubModuleCode: item.SubModule.SubModuleCode,
      ModuleCode: item.module.ModuleCode,
      IndexNum: item.IndexNum,
      WinFormName: item.WinFormName,
      FormImage: item.FormImage,
      IS_MO: item.IS_MO,
    }));
    setdata(result);

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
        header={<HeaderExtra Component={'Screen Master'} />}
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
          ExportName={'ScreensMaster'}
        />
      </Card>

      <Drawer
        title={
          editData.FormName ? (
            <p className="text-xl font-medium   flex ">
              <center>
                <Button
                  size="xs"
                  variant="twoTone"
                  icon={<HiOutlinePencil />}
                ></Button>
              </center>
              &nbsp;&nbsp; Screen Master
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
              &nbsp;&nbsp;Screen Master
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
        <FormEdit
          ref={formikRef}
          onDrawerClose={onDrawerClose}
          editData={editData}
          setMessage={setMessage}
          setlog={setlog}
          Module={Module}
        />
      </Drawer>
    </>
  );
};

export default Formmaster;
