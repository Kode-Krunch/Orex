import React, { useEffect, useState } from 'react';
import { Container, CalendarView } from 'components/shared';
import { Button, Card, Dialog, Notification, toast } from 'components/ui';
import { } from 'services/MasterService';
import { useDispatch, useSelector } from 'react-redux';
import {
  apiGetSongSchedulingData,
} from 'services/SchedulingService';
import {
  convertDateToDMSTRIY,
  convertDateToYMD,
  isArrayEqual,
  transformData,
} from 'components/validators';
import SongSchedulingPage from './SongSchedulingPage';
import { updateStartTimes } from '../general';
import { apiGetDailyFPCStatus } from 'services/SchedulingService';
import { apiautoshufflepromo } from 'services/LibraryService';
import SelectChannelDialog from 'views/Controls/SelectChannelDialog';
import {
  isChannelSelected,
  openNotification,
} from 'views/Controls/GLOBALFUNACTION';
import {
  setIsSelectChannelDialogOpen,
  setdateForm,
} from 'store/locale/localeSlice';
import DefaultColumns from '../DefaultColumns';
import { apiGETColumnSetting } from 'services/ControlsService';

/* CONSTANTS */

const abx2 = [
  {
    header: 'FPC_ID',
    name: 'FPC_ID',
    code: 'FPC_ID',
    width: 'auto',
    ScreenType: 'Song',
    Sequence: 1,
    isvisible: true,
  },
  {
    header: 'FPC_Time',
    name: 'FPC_Time',
    code: 'FPC_Time',
    width: 'auto',
    ScreenType: 'Song',
    Sequence: 1,
    isvisible: true,
  },
  {
    header: 'Event_Name',
    name: 'Event_Name',
    code: 'Event_Name',
    width: 'auto',
    ScreenType: 'Song',
    Sequence: 1,
    isvisible: true,
  },
  {
    header: 'Duration',
    name: 'Duration',
    code: 'Duration',
    width: 'auto',
    ScreenType: 'Song',
    Sequence: 1,
    isvisible: true,
  },
];

const SongScheduling = () => {
  /* REDUX */
  const Channel = useSelector((state) => state.locale.selectedChannel);
  const DatainPromo = useSelector((state) => state.auth.scheduling.DatainS);
  const timestore = useSelector((state) => state.auth.scheduling.timestoreS);
  const datestore = useSelector((state) => state.auth.scheduling.datestoreS);
  const dispatch = useDispatch();

  /* STATES */
  const [value, setValue] = useState(null);
  const [table1Data, setTable1Data] = useState([]);
  const [cities, setcities] = useState([]);
  const [dta, setdta] = useState([]);
  const [Columnright, setColumnright] = useState([]);
  const [Columnleft, setColumnleft] = useState([]);
  const [table2Data, setTable2Data] = useState([]);
  const [table3Data, setTable3Data] = useState([]);
  const [fpcTimes, setFpcTimes] = useState({});
  const [events, setevents] = useState(null);
  const [breaknumbers, setbreaknumbers] = useState([]);
  const [currentDate, setCurrentDate] = useState(convertDateToYMD(new Date()));
  const [dialogIsOpen, setIsOpen] = useState(false);
  const [evendata, setevendata] = useState('');
  const [headername, setheadername] = useState('');

  /* USE EFFECTS */
  useEffect(() => {
    (async (values) => {
      const resp = await apiautoshufflepromo();
      const mergedData = resp.data.map((option) => ({
        value: option.TemplateNo,
        label: option.TemplateNo,
      }));
      setdta(mergedData);
    })();
  }, []);

  useEffect(() => {
    const gboxElement = document.getElementsByClassName('Gbox2')[0];
    const gboxElementchild =
      document.getElementsByClassName('Gbox2')[0].children[1];
    // dispatch(setheadername('Song Scheduling'));
    dispatch(setdateForm([currentDate, 'Song Scheduling']));
    if (gboxElement) {
      gboxElement.style.display = 'block';
      gboxElementchild.style.display = 'none';
    } // Optionally, you might want to revert the change when the component unmounts
    return () => {
      if (gboxElement) {
        gboxElement.style.display = 'none';
        gboxElementchild.style.display = 'none';
      }
    };
  }, []);

  useEffect(() => {
    let data = {};
    setevents(null);
    data.LocationCode = Channel.LocationCode;
    data.ChannelCode = Channel.ChannelCode;
    data.Screen = 'SONG';
    let TelecastDate = currentDate;
    apiGetDailyFPCStatus(data, TelecastDate)
      .then((response) => {
        setevents(transformData(response.data, 'songScheduling'));
      })
      .catch((error) => {
        if (error.response.status) {
          setevents(null);
        }
      });
  }, [currentDate, Channel, value]);

  /* EVENT HANDLERS */
  const onCellSelect = (event, Condition) => {
    setIsOpen(false);
    if (Channel != null) {
      apiGetSongSchedulingData(Channel, convertDateToYMD(event.start))
        .then((response) => response.data)
        .then((data) => {
          if (data.length == 0) {
            toast.push(
              <Notification title="Error" type="danger">
                Daily FPC Not Ready
              </Notification>,
            );
            return;
          }
          // setTable2Data(data)
          let resdt = updateStartTimes(data, true, false);

          if (Condition) {
            if (DatainPromo.length > 0) {
              setTable1Data(DatainPromo);
            }
          } else {
            setTable1Data(resdt);
          }
          setValue(event.start);
          const extractedFpcTimes = data.reduce((result, item) => {
            const key = item.FPC_Time
              ? item.Id //item.FPC_Time.substring(0, 5).replace(/:/g, '')
              : ''; // Extract first 5 characters
            if (key !== '') {
              result[key] = item.FPC_Time;
            }
            return result;
          }, {});
          setFpcTimes(extractedFpcTimes);
          let res = Object.keys(data[0]);
          let columns = res.map((row) => {
            let column = {};
            column.name = row;
            column.code = row;
            column.width = 100;
            column.header = row;
            return column;
          });

          setcities(columns);
          (async (values) => {
            try {
              const resp = await apiGETColumnSetting('Song');
              if (resp.status == 204) {
                const mergedData = DefaultColumns.map((item, index) => ({
                  header: item.header,
                  name: item.name,
                  code: item.code,
                  width: 'auto',
                  ScreenType: item.ScreenType,
                  Sequence: item.Sequence,
                  isvisible: true,
                }));
                setColumnright(mergedData);
              }
              const mergedData = resp.data.map((item, index) => ({
                header: item.Header,
                name: item.ColumnName,
                code: item.ColumnName,
                width: 'auto',
                ScreenType: item.ScreenName,
                Sequence: item.SequenceNo,
                isvisible: true,
              }));
              if (resp.status == 200) {
                setColumnright(mergedData);
              }
            } catch (error) { }
          })();
          (async (values) => {
            try {
              const resp = await apiGETColumnSetting('SongLeft');
              if (resp.status == 204) {
                const mergedData = abx2.map((item, index) => ({
                  header: item.header,
                  name: item.name,
                  code: item.code,
                  width: 'auto',
                  ScreenType: item.ScreenType,
                  Sequence: item.Sequence,
                  isvisible: true,
                }));
                setColumnleft(mergedData);
              }
              const mergedData = resp.data.map((item, index) => ({
                header: item.Header,
                name: item.ColumnName,
                code: item.ColumnName,
                width: 'auto',
                ScreenType: item.ScreenName,
                Sequence: item.SequenceNo,
                isvisible: true,
              }));

              if (resp.status == 200) {
                setColumnleft(mergedData);
              }
            } catch (error) { }
          })();
        });
    } else {
      toast.push(
        <Notification title="Error" type="danger">
          Kindly Select Channel
        </Notification>,
      );
    }
  };

  const openDialog = (event) => {
    const conf = isArrayEqual(
      convertDateToDMSTRIY(convertDateToYMD(event.start)),
      convertDateToDMSTRIY(datestore),
    );
    if (conf) {
      setevendata(event);
      setIsOpen(true);
    } else {
      onCellSelect(event, false);
    }
  };

  const onDialogClose = (e) => {
    setIsOpen(false);
  };

  return (
    <>
      <Card>
        <Dialog
          isOpen={dialogIsOpen}
          onClose={onDialogClose}
          onRequestClose={onDialogClose}
        >
          <h5 className="mb-4">
            Unsaved work has been detected. Do you want to load it now?
          </h5>
          <div
            style={{
              marginTop: '10px',
              display: 'flex',
            }}
          >
            <div className="flex">
              <h1 style={{ color: 'rgb(20 184 166)' }}>
                {convertDateToDMSTRIY(datestore)[0].day}
              </h1>
              <h6 style={{ color: 'rgb(20 184 166)', fontSize: '13px' }}>
                {convertDateToDMSTRIY(datestore)[0].month}
                <br />
                <h6
                  style={{
                    color: 'rgb(20 184 166)',
                    fontSize: '12px',
                    marginTop: '-10px',
                  }}
                >
                  {convertDateToDMSTRIY(datestore)[0].year}
                </h6>
              </h6>
            </div>
            <span
              style={{
                fontSize: '15px',
                color: 'white',
                marginTop: '10px',
                marginLeft: '10px',
              }}
              onClick={() => {
                let res = [...table1Data];

                let res2 = res.filter((row) => row.F_C_S_P != 'PR');
                setTable1Data(res2);
              }}
            >
              {Channel.label}
            </span>
          </div>
          <p>
            <p>{timestore}</p>
          </p>
          <div className="text-right mt-6">
            <Button
              className="ltr:mr-2 rtl:ml-2"
              variant="plain"
              onClick={() => onCellSelect(evendata, false)}
            >
              No
            </Button>
            <Button
              variant="solid"
              onClick={() => onCellSelect(evendata, true)}
            >
              Yes
            </Button>
          </div>
        </Dialog>
        {value != null ? (
          <SongSchedulingPage
            table1Data={table1Data}
            setTable1Data={setTable1Data}
            cities={cities}
            setcities={setcities}
            Columnright={Columnright}
            setColumnright={setColumnright}
            table2Data={table2Data}
            setTable2Data={setTable2Data}
            table3Data={table3Data}
            setTable3Data={setTable3Data}
            fpcTimes={fpcTimes}
            value={value}
            value2={Channel}
            setValue={setValue}
            breaknumbers={breaknumbers}
            setbreaknumbers={setbreaknumbers}
            Columnleft={Columnleft}
            setColumnleft={setColumnleft}
            onCellSelect={onCellSelect}
            evendata={evendata}
            setheadername={setheadername}
          />
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-1"></div>
            <div className="col-span-3">
              <Container style={{ height: 550 }}>
                <CalendarView
                  events={events}
                  select={(event) => {
                    if (isChannelSelected(Channel)) {
                      const isPresent = events.some(
                        (row) => row.start === event.startStr,
                      );
                      if (isPresent) {
                        openDialog(event);
                      } else {
                        openNotification(
                          'info',
                          'Daily FPC not available for selected date',
                        );
                      }
                    } else {
                      dispatch(setIsSelectChannelDialogOpen(true));
                    }
                  }}
                  datesSet={(dateInfo) => {
                    setCurrentDate(
                      convertDateToYMD(dateInfo.view.currentStart),
                    );
                  }}
                  selectable
                />
              </Container>
            </div>
          </div>
        )}
      </Card>
      <SelectChannelDialog />
    </>
  );
};

export default SongScheduling;
