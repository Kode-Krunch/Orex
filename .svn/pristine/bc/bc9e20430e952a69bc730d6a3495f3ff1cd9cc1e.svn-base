import React, { useEffect, useState } from 'react';
import { Container, CalendarView } from 'components/shared';
import { Button, Card, Dialog, Notification, toast } from 'components/ui';
import { useDispatch, useSelector } from 'react-redux';
import {
  apiGettransmissionlog,
} from 'services/SchedulingService';
import {
  Finalog,
  convertDateToDMSTRIY,
  convertDateToYMD,
  isArrayEqual,
} from 'components/validators';
import FinalLogPage from './FinalLogPage';
import { UpdatePrimaryID, updateStartTimes } from '../general';
import { apiGetDailyFPCStatus } from 'services/SchedulingService';
import {
  isChannelSelected,
  openNotification,
} from 'views/Controls/GLOBALFUNACTION';
import { abx2, abx } from './Cols';
import SelectChannelDialog from 'views/Controls/SelectChannelDialog';
import {
  setIsSelectChannelDialogOpen,
  setdateForm,
} from 'store/locale/localeSlice';
import {
  setBackCondition,
  setColumnleft,
  setColumnright,
  setColumnValidation,
  setFpcTimes,
  setheadername,
  setMainTable,
  setValue,
} from 'store/Scheduling/SchedulingSlice';
import { apiGETColumnSetting } from 'services/ControlsService';

const FinalLog = () => {
  const dispatch = useDispatch();

  /* REDUX */
  const Channel = useSelector((state) => state.locale.selectedChannel);
  const { DatainF } = useSelector((state) => state.auth.scheduling);
  console.log('DatainPromo', DatainF);
  const timestore = useSelector((state) => state.auth.scheduling.timestoreF);
  const datestore = useSelector((state) => state.auth.scheduling.datestoreF);
  const MainTable = useSelector((state) => state.Scheduling.MainTable);
  const value = useSelector((state) => state.Scheduling.value);
  const SecondTable = useSelector((state) => state.Scheduling.SecondTable);
  const Columnright = useSelector((state) => state.Scheduling.Columnright);
  const Columnleft = useSelector((state) => state.Scheduling.Columnleft);
  const headername = useSelector((state) => state.Scheduling.headername);
  const fpcTimes = useSelector((state) => state.Scheduling.fpcTimes);
  const ColumnValidation = useSelector(
    (state) => state.Scheduling.ColumnValidation,
  );

  /* STATES */

  const [events, setevents] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dialogIsOpen, setIsOpen] = useState(false);
  const [evendata, setevendata] = useState('');

  /* USE EFFECTS */
  useEffect(() => {
    const gboxElement = document.getElementsByClassName('Gbox2')[0];
    const gboxElementchild =
      document.getElementsByClassName('Gbox2')[0].children[1];
    dispatch(setheadername('Final Log'));
    dispatch(setdateForm([convertDateToYMD(currentDate), 'Final Log']));
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
    data.Screen = 'FINAL';

    apiGetDailyFPCStatus(data, convertDateToYMD(currentDate))
      .then((response) => {
        setevents(Finalog(response.data));
      })
      .catch((error) => {
        if (error) {
          setevents(null);
        }
      });
  }, [currentDate, Channel]);

  /* EVENT HANDLER */
  const onCellSelect = (event, Condition, con) => {
    setIsOpen(false);

    if (!Channel) {
      toast.push(
        <Notification title="Error" type="danger">
          Kindly Select Channel
        </Notification>,
      );
      return;
    }

    apiGettransmissionlog(
      Channel,
      convertDateToYMD(event.start),
      con ? 'Add' : 'Edit',
    )
      .then((response) => {
        const data = response.data;

        if (data.length === 0) {
          openNotification('danger', 'Daily FPC Not Ready');
          return;
        }
        let res = Object.keys(data[0]);
        let columns = res.map((row) => {
          let column = {};
          column.name = row;
          column.code = row;
          column.width = 100;
          column.header = row;
          return column;
        });
        dispatch(setColumnValidation(columns));

        // Update main table based on Condition
        let prm = UpdatePrimaryID(data);
        dispatch(
          setMainTable(
            Condition ? DatainF : updateStartTimes(prm, true, false),
          ),
        );
        dispatch(setValue(event.start));

        // Extract FPC Times
        const extractedFpcTimes = data.reduce((result, item) => {
          if (item.FPC_Time) {
            result[item.Id] = item.FPC_Time;
          }
          return result;
        }, {});
        dispatch(setFpcTimes(extractedFpcTimes));

        // Dispatch column validations and settings
        Promise.all([
          apiGETColumnSetting('FinalLog'),
          apiGETColumnSetting('FinalLogLeft'),
        ])
          .then(([respRight, respLeft]) => {
            console.log('data', data);
            const mapToColumnData = (data) =>
              data?.map((item) => ({
                header: item.Header,
                name: item.ColumnName,
                code: item.ColumnName,
                width: 'auto',
                ScreenType: item.ScreenName,
                Sequence: item.SequenceNo,
                isvisible: true,
              }));

            if (respRight.status == 204) {
              let res = Object.keys(data[0]);
              let columns = res.map((row) => {
                let column = {};
                column.name = row;
                column.code = row;
                column.width = 100;
                column.header = row;
                return column;
              });
              console.log(columns);
              console.log('columns', columns);
              const mergedData = columns.map((item, index) => ({
                header: item.header,
                name: item.name,
                code: item.code,
                width: 'auto',
                ScreenType: item.ScreenType,
                Sequence: item.Sequence,
                isvisible: true,
              }));
              dispatch(setColumnright(mergedData));
            }
            if (respLeft.status == 204) {
              const mergedData = abx2.map((item, index) => ({
                header: item.header,
                name: item.name,
                code: item.code,
                width: 'auto',
                ScreenType: item.ScreenType,
                Sequence: item.Sequence,
                isvisible: true,
              }));

              dispatch(setColumnleft(mergedData));
            }
            console.log('respRight.data', respRight.data);
            dispatch(setColumnright(mapToColumnData(respRight.data)));
            dispatch(setColumnleft(mapToColumnData(respLeft.data)));
            dispatch(setColumnleft(mapToColumnData(respLeft.data)));
            //dispatch(setColumnValidation(mapToColumnData(respRight.data)));
            dispatch(setBackCondition('FINALCALL'));
          })
          .catch((error) => {
            // Handle API call errors for column settings
            console.error('Error fetching column settings:', error);
            // Fallback to default column settings

            dispatch(
              setColumnleft(
                abx2.map((item) => ({
                  ...item,
                  width: 'auto',
                  isvisible: true,
                })),
              ),
            );
          });
      })
      .catch((error) => {
        // Handle API call errors for transmission log
        console.error('Error fetching transmission log:', error);
        // Optionally notify user about the error
      });
  };

  const openDialog = (event, con) => {
    const conf = isArrayEqual(
      convertDateToDMSTRIY(convertDateToYMD(event.start)),
      convertDateToDMSTRIY(datestore),
    );
    if (conf) {
      setevendata(event);
      setIsOpen(true);
    } else {
      onCellSelect(event, false, con);
    }
  };

  const onDialogClose = (e) => {
    setIsOpen(false);
  };

  return (
    <>
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
              let res = [...MainTable];
              let res2 = res.filter((row) => row.F_C_S_P != 'PR');
              dispatch(setMainTable(updateStartTimes(res2, false, false)));
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
            onClick={() => onCellSelect(evendata, false, false)}
          >
            No
          </Button>
          <Button
            variant="solid"
            onClick={() => onCellSelect(evendata, true, false)}
          >
            Yes
          </Button>
        </div>
      </Dialog>

      {value != null ? (
        <FinalLogPage onCellSelect={onCellSelect} evendata={evendata} />
      ) : (
        <Card>
          {/* <h3
            style={{
              fontSize: '1.50rem',
              textAlign: 'center',
              fontWeight: '600',
              lineHeight: '2.75rem',
              color: 'white',
              marginTop: '-15px',
            }}
          >
            {headername}
          </h3> */}
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-3">
              <Container style={{ height: 550 }}>
                <CalendarView
                  events={events}
                  select={(event) => {
                    if (isChannelSelected(Channel)) {
                      const isPresent = events.some(
                        (row) => row.start === event.startStr,
                      );
                      const isPresent2 = events.filter(
                        (row) => row.start === event.startStr,
                      );
                      console.log(events);
                      if (isPresent) {
                        openDialog(
                          event,
                          isPresent2[0].title === 'Commercial- 0',
                        );
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
                  selectable
                  datesSet={(dateInfo) => {
                    // console.log('dateInfo', dateInfo);
                    setCurrentDate(dateInfo.view.currentStart);
                  }}
                />
              </Container>
            </div>
          </div>
        </Card>
      )}

      <SelectChannelDialog />
    </>
  );
};

export default FinalLog;
