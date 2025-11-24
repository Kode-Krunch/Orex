import { useState, useEffect, useMemo } from 'react';
import { Badge, Input, Alert } from 'components/ui';
import { Button, Card } from 'components/ui';
import { HiPlusCircle } from 'react-icons/hi';
import PromoShuffleTemplatesAdd from './PromoShuffleTemplatesAdd';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import DisplayTable from 'views/Controls/DisplayTable';
import HeaderExtra from 'views/Controls/HeaderExtra';
import {
  apiautoshufflepromo,
  apiautoshufflepromoId,
} from 'services/LibraryService';
import InputwithVoice from 'components/ui/Input/InputwithVoice';
import { useSelector } from 'react-redux';

const headerExtraContent = (
  globalFilter,
  setGlobalFilter,
  addnew,
  setaddnew,
  setTemplateName,
  TemplateName,
  setaddnew2,
) => {
  return (
    <span className="flex items-center">
      <span className="mr-1   font-semibold">
        {!addnew && (
          <InputwithVoice
            value={globalFilter ?? ''}
            className="solid"
            placeholder="Search all columns..."
            size="sm"
            onChange={(e) => {
              if (/^[0-9a-zA-Z\s]*$/.test(e.target.value)) {
                setGlobalFilter(e.target.value);
              }
            }}
          />
        )}
      </span>
      {/* {addnew && ( */}

      <span className="mr-1 font-semibold">
        {TemplateName != 'Edit' && (
          <Button
            block
            variant="solid"
            size="sm"
            icon={<HiPlusCircle />}
            onClick={() => setaddnew(true)}
          >
            {TemplateName ? 'Edit' : 'Add'} Promo Shuffle Templates
          </Button>
        )}
      </span>
      {/* )} */}
      {addnew && (
        <>
          <span className="p-input-icon-right">
            <i
              className="pi pi-check"
              onClick={() => {
                setaddnew2(true);
                setaddnew(false);
              }}
            />
            <Input
              size="sm"
              maxLength="50"
              type="text"
              //   disabled={TemplateName}
              className="p-inputtext-sm"
              value={TemplateName}
              placeholder={`Add Template`}
              onChange={(e) => {
                if (/^[0-9a-zA-Z\s]*$/.test(e.target.value)) {
                  setTemplateName(e.target.value);
                }
              }}
            />
          </span>
        </>
      )}
    </span>
  );
};

const PromoShuffleTemplates = () => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [data, setdata] = useState(['']);
  const [selectedpromaster, setSelectedpromaster] = useState([]);
  const [addnew, setaddnew] = useState(false);
  const [addnew2, setaddnew2] = useState(false);
  const [TemplateName, setTemplateName] = useState('');
  const [message, setMessage] = useTimeOutMessage();
  const [log, setlog] = useState('');
  const Channel = useSelector((state) => state.locale.selectedChannel);
  const columns = useMemo(
    () => [
      {
        header: 'Template Name',
        accessorKey: 'TemplateNo',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              {/* <Badge className={statusColor[row.IsActive]} /> */}
              <span className="ml-2 rtl:mr-2 ">{row.TemplateNo}</span>
            </div>
          );
        },
      },
    ],
    [],
  );

  const getdata = async () => {
    (async (values) => {
      let param = {
        LocationCode: Channel.LocationCode,
        ChannelCode: Channel.ChannelCode,
      };

      const resp = await apiautoshufflepromo(param);
      setdata(resp.data);
    })();
  };
  useEffect(() => {
    getdata();
  }, []);
  useEffect(() => {
    getdata();
  }, [Channel]);

  const [editData, seteditData] = useState([]);

  const openDrawer = async (TemplateNo) => {
    const resp = await apiautoshufflepromoId(TemplateNo.TemplateNo);
    console.log(resp.data);
    setaddnew2(true);
    setTemplateName(TemplateNo.TemplateNo);
    console.log(resp.data);
    const mergedData2 = resp.data.map((item) => ({
      value: item.Channel.ChannelCode,
      LocationCode: item.locations.LocationCode,
    }));
    seteditData(mergedData2);
    const mergedData = resp.data.map((item) => ({
      PromoCode: item.PromoMaster.PromoCode,
      PromoCaption: item.PromoMaster.PromoCaption,
      PromoDuration: item.PromoMaster.PromoDuration,
      VideoID: item.PromoMaster.VideoID,
    }));
    setSelectedpromaster(mergedData);
  };

  return (
    <>
      {message && (
        <Alert className="mb-4" type={log} showIcon>
          {message}
        </Alert>
      )}

      <Card
        header={
          <HeaderExtra
            ModuleText="Scheduling"
            Component={'Promo Shuffle Templates'}
          />
        }
        headerExtra={headerExtraContent(
          globalFilter,
          setGlobalFilter,
          addnew,
          setaddnew,
          setTemplateName,
          TemplateName,
          setaddnew2,
        )}
        className="flex flex-col h-[87vh]"
        bodyClass="grow"
      >
        {addnew2 ? (
          <PromoShuffleTemplatesAdd
            TemplateName={TemplateName}
            setaddnew2={setaddnew}
            selectedpromaster={selectedpromaster}
            setSelectedpromaster={setSelectedpromaster}
            editData={editData}
            setdata={setdata}
            setMessage={setMessage}
            setaddnew={setaddnew2}
            setTemplateName={setTemplateName}
          />
        ) : (
          <DisplayTable
            data={data}
            columns={columns}
            //sorting={sorting}
            openDrawer={openDrawer}
            globalFilter={globalFilter}
            //setSorting={setSorting}
            seteditData={seteditData}
            setGlobalFilter={setGlobalFilter}
            ExportName={'PromoShuffleTemplates'}
          />
        )}
      </Card>
    </>
  );
};

export default PromoShuffleTemplates;
