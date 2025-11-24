import { setMainTable, setSecondTable } from 'store/Scheduling/SchedulingSlice';
import { parseDuration } from 'views/Controls/GLOBALFUNACTION';

export const abx = [
  {
    header: 'FPC Time',
    name: 'FPC_Time',
    code: 'FPC_Time',
    width: 'auto',
    ScreenType: 'FinalLog',
    Sequence: 1,
    isvisible: true,
  },
  {
    header: 'Event Name',
    name: 'Event_Name',
    code: 'Event_Name',
    width: 'auto',
    ScreenType: 'FinalLog',
    Sequence: 1,
    isvisible: true,
  },
  {
    header: 'FPC_ID',
    name: 'FPC_ID',
    code: 'FPC_ID',
    width: 'auto',
    ScreenType: 'FinalLog',
    Sequence: 1,
    isvisible: true,
  },

  {
    header: 'Tel_Time',
    name: 'Tel_Time',
    code: 'Tel_Time',
    width: 'auto',
    ScreenType: 'FinalLog',
    Sequence: 1,
    isvisible: true,
  },

  {
    header: 'SeasonNo',
    name: 'SeasonNo',
    code: 'SeasonNo',
    width: 'auto',
    ScreenType: 'FinalLog',
    Sequence: 1,
    isvisible: true,
  },
  {
    header: 'EpisodeNo',
    name: 'EpisodeNo',
    code: 'EpisodeNo',
    width: 'auto',
    ScreenType: 'FinalLog',
    Sequence: 1,
    isvisible: true,
  },
  {
    header: 'Duration',
    name: 'Duration',
    code: 'Duration',
    width: 'auto',
    ScreenType: 'FinalLog',
    Sequence: 1,
    isvisible: true,
  },
];
export const abx2 = [
  {
    header: 'FPC_ID',
    name: 'FPC_ID',
    code: 'FPC_ID',
    width: 'auto',
    ScreenType: 'FinalLog',
    Sequence: 1,
    isvisible: true,
  },
  {
    header: 'FPC_Time',
    name: 'FPC_Time',
    code: 'FPC_Time',
    width: 'auto',
    ScreenType: 'FinalLog',
    Sequence: 1,
    isvisible: true,
  },
  {
    header: 'Event_Name',
    name: 'Event_Name',
    code: 'Event_Name',
    width: 'auto',
    ScreenType: 'FinalLog',
    Sequence: 1,
    isvisible: true,
  },
  {
    header: 'Duration',
    name: 'Duration',
    code: 'Duration',
    width: 'auto',
    ScreenType: 'FinalLog',
    Sequence: 1,
    isvisible: true,
  },
];
export const EventOptions = [
  { value: 1, label: 'Promos', shortcode: 'PR' },
  { value: 2, label: 'Songs', shortcode: 'SG' },
  { value: 3, label: 'NTCs', shortcode: 'NTC' },
  { value: 4, label: 'Last Min Spot', shortcode: 'N' },
  { value: 6, label: 'Drop Spot', shortcode: 'C' },
  { value: 7, label: 'Programs', shortcode: 'S' },
];
export function GetStartEndtimeArray(dtst, setStartTimeArray) {
  console.log('StartTimeArray*', dtst);
  var StartTimeArray = [];
  var index_st = 0;
  var st = '';
  var FPC_TimeTo = '';
  var ed = '';
  let cnint = 0;
  StartTimeArray = [];
  for (let i = 0; i < dtst.length; i++) {
    if (dtst[i].F_C_S_P === 'CT') {
      st = dtst[i].FPC_Time;
      FPC_TimeTo = dtst[i].FPC_TimeTo;
      index_st = i;

      // var endrow = dtst
      //     .slice(i + 1, dtst.length)
      //     .find((row) => row.F_C_S_P === 'CT');
      var endrow = dtst
        .slice(i + 1, dtst.length)
        .find((row) => row.F_C_S_P === 'CT');

      if (endrow === null || endrow === undefined) {
        endrow = dtst[dtst.length - 2];
      }

      if (endrow) {
        ed = dtst.indexOf(endrow);
        if (ed != undefined) {
          StartTimeArray.push({
            StartTime: st,
            EndTime: FPC_TimeTo,
            PlayTime: dtst[ed + 1]?.Start_Time,
            Diffrance:
              parseDuration(dtst[ed + 1]?.Start_Time) -
              parseDuration(FPC_TimeTo + ':00:00'),
            columnIndex: cnint + 1,
          });
          cnint = cnint + 1;
        }
      } else {
      }
    }
  }

  setStartTimeArray(StartTimeArray);
}

export const GetDataCount = (table1Data, setCountData) => {
  const filteredNTC = table1Data.filter((obj) => obj.F_C_S_P === 'S');
  const filteredPR = table1Data.filter((obj) => obj.F_C_S_P === 'PR');
  const filteredSG = table1Data.filter((obj) => obj.F_C_S_P === 'SG');
  const filteredC = table1Data.filter((obj) => obj.F_C_S_P === 'C');
  const filteredP = table1Data.filter((obj) => obj.F_C_S_P === 'CT');
  const filteredCm = table1Data.filter((obj) => obj.F_C_S_P === 'CM');
  setCountData({
    NTC: [],
    Promos: [],
    Songs: [],
    Commercial: [],
    Programs: [],
  });

  setCountData((prevState) => ({
    ...prevState,
    NTC: [...prevState.NTC, ...filteredNTC],
    Promos: [...prevState.Promos, ...filteredPR],
    Songs: [...prevState.Songs, ...filteredSG],
    Commercial: [...prevState.Commercial, ...filteredC],
    Commercial2: [...prevState.Commercial, ...filteredCm],
    Programs: [...prevState.Programs, ...filteredP],
  }));
};

export function GetBreakwiseDuration(
  table1data,
  setBreakwiseData,
  setStartTimeArray,
  fpcTimes,
) {
  console.log('table1data', table1data);
  GetStartEndtimeArray(table1data, setStartTimeArray);
  const groupedData = table1data.reduce((result, item) => {
    const {
      FPC_Time,
      Event_Name,
      FPC_ID,
      BreakNumber,
      Duration,
      F_C_S_P,
      ...rest
    } = item;

    const existingFPC = result.find((group) => group.FPC_ID === FPC_ID);

    if (existingFPC) {
      const existingBreakNumber = existingFPC.data.find(
        (subgroup) => subgroup.BreakNumber === BreakNumber,
      );

      if (existingBreakNumber) {
        //    existingBreakNumber.data.push({ ...rest });
        if (F_C_S_P === 'PR') {
          if (existingBreakNumber.totalDuration === undefined) {
            existingBreakNumber.totalDuration = 0;
          }
          existingBreakNumber.totalDuration += 1;
        } else if (F_C_S_P === 'NTC') {
          if (existingBreakNumber.totalNTCCount === undefined) {
            existingBreakNumber.totalNTCCount = 0;
          }
          existingBreakNumber.totalNTCCount += 1;
        } else if (F_C_S_P === 'CM') {
          if (existingBreakNumber.totalCMCount === undefined) {
            existingBreakNumber.totalCMCount = 0;
          }
          existingBreakNumber.totalCMCount += 1;
        } else if (F_C_S_P === 'SG') {
          if (existingBreakNumber.totalSGDuration === undefined) {
            existingBreakNumber.totalSGDuration = 0;
          }
          // existingBreakNumber.totalSGDuration += parseDuration(Duration);
          existingBreakNumber.totalSGDuration += 1;
        } else {
          existingBreakNumber.totalDuration += 0;
          existingBreakNumber.totalSGDuration += 0;
          existingBreakNumber.totalNTCCount += 0;
          existingBreakNumber.totalCMCount += 0;
        }
      } else {
        existingFPC.data.push({
          BreakNumber,
          totalDuration: 0,
          totalNTCCount: 0,
          totalSGDuration: 0,
          totalCMCount: 0,
        });
      }
    } else {
      result.push({
        FPC_Time,
        FPC_ID,
        Event_Name,
        data: [
          {
            BreakNumber,
            totalDuration: F_C_S_P === 'PR' ? parseDuration(Duration) : 0,

            totalNTCCount: F_C_S_P === 'NTC' ? parseDuration(Duration) : 0,
            totalCMCount: F_C_S_P === 'CM' ? parseDuration(Duration) : 0,
            totalSGDuration: F_C_S_P === 'SG' ? parseDuration(Duration) : 0,
          },
        ],
      });
    }

    return result;
  }, []);
  console.log('groupedData', groupedData);
  let lets = groupedData;

  const FPCTimewithDuration = [];

  lets.forEach((item, key) => {
    const totalDuration = item.data.reduce(
      (acc, breakItem) => acc + breakItem.totalDuration,
      0,
    );
    const totalSGDuration = item.data.reduce(
      (acc, breakItem) => acc + breakItem.totalSGDuration,
      0,
    );
    const totalCMCount = item.data.reduce(
      (acc, breakItem) => acc + breakItem.totalCMCount,
      0,
    );
    FPCTimewithDuration.push({
      FPC_Time: item.FPC_Time,
      totalDuration: Math.round(totalDuration),
      totalSGDuration: Math.round(totalSGDuration),
      totalCMCount: Math.round(totalCMCount),
    });
  });
  const transformedData = lets.map((item) => {
    const children = item.data.map((breakItem) => ({
      key: `${item.FPC_ID}-${breakItem.BreakNumber}`,
      label: 'BreakNumber',
      icon: 'pi pi-fw pi-file',
      data: {
        BreakNumber: breakItem.BreakNumber,
        totalDuration: breakItem.totalDuration,
        totalSGDuration: breakItem.totalSGDuration,
        totalCMCount: breakItem.totalCMCount,
      },
    }));
    const totalDurationSum = children.reduce(
      (sum, child) => sum + child.data.totalDuration,
      0,
    );
    const totalSongDurationSum = children.reduce(
      (sum, child) => sum + child.data.totalSGDuration,
      0,
    );

    const totalCMDurationSum = children.reduce(
      (sum, child) => sum + child.data.totalCMCount,
      0,
    );
    return {
      key: `${item.FPC_ID}`,
      label: 'Event_Name',
      icon: 'pi pi-fw pi-cog',
      data: {
        Event_Name: '[' + item.FPC_Time + '] ' + item.Event_Name,
        BreakNumber: children.length,
        totalDuration: totalDurationSum,
        totalSGDuration: totalSongDurationSum,
        totalCMCount: totalCMDurationSum,
        FPC_Time: item.FPC_Time,
      },
      children,
    };
  });
  console.log('transformedData', transformedData);
  setBreakwiseData(transformedData);
}

export const changeProgram = (
  tableData,
  table1Data,
  setMismatchedItems,
  setcount,
  dispatch,
  setMismatchedItems2,
) => {
  // Filter out mismatched items from table1Data
  const mismatched = table1Data.filter((item1) => {
    if (item1.F_C_S_P == 'CT' || item1.F_C_S_P == 'S') {
      const matchingItem = tableData.find((item2) => {
        return (
          item1.Event_Name == item2.Event_Name &&
          item1.FPC_Time == item2.FPC_Time
        );
      });
      return !matchingItem;
    }
    return false; // Make sure to return false if no mismatch is found
  });

  // Filter out mismatched items from tableData
  const mismatched2 = tableData.filter((item1) => {
    if (item1.F_C_S_P === 'CT') {
      const matchingItem = table1Data.find((item2) => {
        return (
          item1.Event_Name == item2.Event_Name &&
          item1.FPC_Time == item2.FPC_Time
        );
      });
      return !matchingItem;
    }
    return false; // Make sure to return false if no mismatch is found
  });

  // Update matchingObjects with EventDefaultBackColor property for mismatched items
  const matchingObjects = table1Data.map((item1) => {
    const matchingItem = mismatched.find(
      (item2) => item1.PrimaryID == item2.PrimaryID && item1.F_C_S_P == 'CT',
    );
    if (matchingItem) {
      return { ...item1, EventDefaultBackColor: 'red' };
    }
    return item1;
  });

  // Update matchingObjects2 with EventDefaultBackColor property for mismatched items
  const matchingObjects2 = tableData.map((item1) => {
    const matchingItem = mismatched2.find(
      (item2) => item1.FPC_ID == item2.FPC_ID,
    );
    if (matchingItem) {
      return { ...item1, EventDefaultBackColor: 'red' };
    }
    return item1;
  });

  // Filter out mismatched items between table1Data and mismatched
  // const mismatched2x = table1Data.filter((item1) =>
  //   mismatched.find(
  //     (item2) =>
  //       item1.FPC_ID === item2.FPC_ID &&
  //       item1.F_C_S_P === 'CT' &&
  //       item2.F_C_S_P === 'CT',
  //   ),
  // );

  const mismatched2x = table1Data.filter((item1) =>
    mismatched.find((item2) => item1.FPC_ID === item2.FPC_ID),
  );
  console.log('mismatched2x', mismatched2x);

  // Filter out mismatched items between tableData and mismatched2
  const mismatched3x = tableData.filter((item1) =>
    mismatched2.find((item2) => item1.FPC_ID == item2.FPC_ID),
  );

  // Update state variables
  setMismatchedItems(mismatched2x);
  const count = mismatched2x.filter((item) => item.F_C_S_P == 'CT');
  setcount(count);

  dispatch(setSecondTable(matchingObjects2));
  dispatch(setMainTable(matchingObjects));
  setMismatchedItems2(mismatched3x);
};
