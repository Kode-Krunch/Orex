import { useState, useEffect, useMemo, useRef } from 'react';
import { Badge, Drawer, Alert } from 'components/ui';
import {
  apiGetPlacemaster,
  apiGetorganisation,
  apiGetStateMaster,
} from 'services/MasterService';
import { Button, Card } from 'components/ui';
import { HiOutlinePencil, HiPlusCircle } from 'react-icons/hi';
import OrganisationEdit from './OrganisationEdit';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import DisplayTable from 'views/Controls/DisplayTable';
import HeaderExtra from 'views/Controls/HeaderExtra';
import DrawerFooter from 'views/Controls/DrawerFooter';
import InputwithVoice from 'components/ui/Input/InputwithVoice';

const headerExtraContent = (openDrawer, globalFilter, setGlobalFilter) => {
  return (
    <span className="flex items-center">
      <span className="mr-1  font-semibold">
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
          Add Organisation
        </Button>
      </span>
    </span>
  );
};

const Organisationmaster = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editData, seteditData] = useState(['']);
  const [globalFilter, setGlobalFilter] = useState('');
  const [data, setdata] = useState(['']);
  const [State, setState] = useState([]);
  const [Place, setPlace] = useState(['']);
  const formikRef = useRef();
  const formSubmit = () => {
    formikRef.current?.submitForm();
  };

  const [message, setMessage] = useTimeOutMessage();
  const [log, setlog] = useState('');

  const statusColor = {
    1: 'bg-emerald-500',
    0: 'bg-red-500',
  };

  const columns = useMemo(
    () => [
      {
        header: 'Organisation',
        accessorKey: 'OrganisationName',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              <Badge className={statusColor[row.IsActive]} />
              <span className="ml-2 rtl:mr-2 c">{row.OrganisationName}</span>
            </div>
          );
        },
      },
      {
        header: 'Place',
        accessorKey: 'PlaceCode',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              <span className="ml-2 rtl:mr-2 ">{row.Place?.PlaceName}</span>
            </div>
          );
        },
      },
      {
        header: 'State',
        accessorKey: 'StateCode',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              <span className="ml-2 rtl:mr-2 ">{row.State?.StateName}</span>
            </div>
          );
        },
      },
    ],
    [],
  );
  useEffect(() => {
    (async (values) => {
      const resp = await apiGetorganisation(values);
      // //console.log(resp.data)
      setdata(resp.data);
    })();
    (async (values) => {
      const Place = await apiGetPlacemaster(values);

      const formattedOptions = Place.data.map((option) => ({
        value: option.PlaceCode,
        label: option.PlaceName,
      }));
      setPlace(formattedOptions);
    })();
    (async (values) => {
      const State = await apiGetStateMaster(values);
      const formattedOptions = State.data.map((option) => ({
        value: option.StateCode,
        label: option.StateName,
      }));
      setState(formattedOptions);
    })();
  }, []);

  const openDrawer = () => {
    setIsOpen(true);
  };

  const onDrawerClose = async (e, values) => {
    const resp = await apiGetorganisation(values);
    seteditData(['']);
    setdata(resp.data);
    setIsOpen(false);
  };
  return (
    <>
      {message && (
        <Alert className="mb-4" type={log} showIcon>
          {message}
        </Alert>
      )}

      <Card
        header={<HeaderExtra Component={'Organisation Master'} />}
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
          ExportName={'OrganisationMaster'}
        />
      </Card>

      <Drawer
        title={
          editData.OrganisationName ? (
            <p className="text-xl font-medium   flex ">
              <center>
                <Button
                  size="xs"
                  variant="twoTone"
                  icon={<HiOutlinePencil />}
                ></Button>
              </center>
              &nbsp;&nbsp; Organisation Master
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
              &nbsp;&nbsp;Organisation Master
            </p>
          )
        }
        isOpen={isOpen}
        onClose={onDrawerClose}
        onRequestClose={onDrawerClose}
        width={
          window.screen.width > 400
            ? window.screen.width / 2.7
            : window.screen.width / 1.5
        }
        footer={
          <DrawerFooter onCancel={onDrawerClose} onSaveClick={formSubmit} />
        }
      >
        <OrganisationEdit
          ref={formikRef}
          onDrawerClose={onDrawerClose}
          editData={editData}
          setMessage={setMessage}
          setlog={setlog}
          Place={Place}
          State={State}
        />
      </Drawer>
    </>
  );
};

export default Organisationmaster;
