import { CgTimer } from 'react-icons/cg';
import { IoIosMusicalNotes } from 'react-icons/io';
import {
  RiAdvertisementLine,
  RiBox3Line,
  RiLayoutBottom2Line,
  RiMovie2Line,
} from 'react-icons/ri';
import { pagesEnum, rowDataTypesEnum } from 'views/Scheduling/Scheduler/enum';

const getSummary = (tableData, key, eventType, title) => {
  try {
    let total = 0;
    tableData.forEach((row) => {
      if (row[key] === eventType) {
        total += 1;
      }
    });
    return { total, title };
  } catch (error) {
    throw error;
  }
};

// const addTimes = (time1, time2) => {
//   try {
//     /* FUNCTION FROM CHAT-GPT */
//     const maxFrames = 24;
//     const [h1, m1, s1, f1] = time1.split(':').map(Number);
//     const [h2, m2, s2, f2] = time2.split(':').map(Number);
//     let totalFrames = f1 + f2;
//     let extraSeconds = Math.floor(totalFrames / maxFrames);
//     totalFrames = totalFrames % maxFrames;
//     let totalSeconds = s1 + s2 + extraSeconds;
//     let extraMinutes = Math.floor(totalSeconds / 60);
//     totalSeconds = totalSeconds % 60;
//     let totalMinutes = m1 + m2 + extraMinutes;
//     let extraHours = Math.floor(totalMinutes / 60);
//     totalMinutes = totalMinutes % 60;
//     let totalHours = h1 + h2 + extraHours;
//     const formattedTime =
//       String(totalHours).padStart(2, '0') +
//       ':' +
//       String(totalMinutes).padStart(2, '0') +
//       ':' +
//       String(totalSeconds).padStart(2, '0') +
//       ':' +
//       String(totalFrames).padStart(2, '0');
//     return formattedTime;
//   } catch (error) {
//     throw error;
//   }
// };
const addTimes = (...times) => {
  /* FUNCTION FROM CHAT-GPT */
  const maxFrames = 24;
  let totalHours = 0,
    totalMinutes = 0,
    totalSeconds = 0,
    totalFrames = 0;
  times.filter((time) => time).forEach((time) => {
    const [h, m, s, f] = time.split(':').map(Number);
    totalHours += h;
    totalMinutes += m;
    totalSeconds += s;
    totalFrames += f;
  });
  let extraSeconds = Math.floor(totalFrames / maxFrames);
  totalFrames = totalFrames % maxFrames;
  totalSeconds += extraSeconds;
  let extraMinutes = Math.floor(totalSeconds / 60);
  totalSeconds = totalSeconds % 60;
  totalMinutes += extraMinutes;
  let extraHours = Math.floor(totalMinutes / 60);
  totalMinutes = totalMinutes % 60;
  totalHours += extraHours;
  return (
    String(totalHours).padStart(2, '0') +
    ':' +
    String(totalMinutes).padStart(2, '0') +
    ':' +
    String(totalSeconds).padStart(2, '0') +
    ':' +
    String(totalFrames).padStart(2, '0')
  );
};

const timeToSeconds = (time) => {
  try {
    /* FUNCTION FROM CHAT-GPT */
    const maxFrames = 24;
    const [hours, minutes, seconds, frames] = time.split(':').map(Number);
    const totalSeconds =
      hours * 3600 + minutes * 60 + seconds + frames / maxFrames;
    return totalSeconds;
  } catch (error) {
    throw error;
  }
};

const getTimeTotalInSec = (tableData, key, rowDataType) => {
  try {
    let total = '00:00:00:00';
    const tableDataWithoutDummyRow = [...tableData].slice(1);
    tableDataWithoutDummyRow.forEach((row) => {
      if (row.F_C_S_P === rowDataType) {
        total = addTimes(total, row[key]);
      }
    });
    return timeToSeconds(total);
  } catch (error) {
    throw error;
  }
};

const getProgramsSummary = (tableData) => {
  try {
    let programs = getSummary(
      tableData,
      'F_C_S_P',
      rowDataTypesEnum.CONTENT_TERMINATION,
      'Programs',
    );
    return {
      ...programs,
      icon: <RiMovie2Line className="text-xl" />,
    };
  } catch (error) {
    throw error;
  }
};

const getTotalDroppedSpots = (dropBucket) => {
  return {
    total: dropBucket.length > 0 ? dropBucket.length - 1 : 0,
    title: 'Dropped Spots',
    icon: <RiBox3Line className="text-xl" />,
  };
};

const getTotalLastMinuteSpots = (lastMinuteSpots) => {
  return {
    total: lastMinuteSpots.length > 0 ? lastMinuteSpots.length - 1 : 0,
    title: 'Last Minute Spots',
    icon: <CgTimer className="text-xl" />,
  };
};

const getSummaryListForPromoSch = (tableData, eventType) => {
  try {
    const programs = getProgramsSummary(tableData);
    const promos = {
      ...getSummary(tableData, 'F_C_S_P', eventType, 'Promos'),
      icon: <RiAdvertisementLine className="text-xl" />,
    };
    const duration = {
      total: getTimeTotalInSec(tableData, 'Duration', eventType),
      title: 'Total Duration',
      icon: <CgTimer className="text-xl" />,
    };
    return [programs, promos, duration];
  } catch (error) {
    throw error;
  }
};

const getSummaryListForSongSch = (tableData, eventType) => {
  try {
    const programs = getProgramsSummary(tableData);
    const songs = {
      ...getSummary(tableData, 'F_C_S_P', eventType, 'Songs'),
      icon: <IoIosMusicalNotes className="text-xl" />,
    };
    const duration = {
      total: getTimeTotalInSec(tableData, 'Duration', eventType),
      title: 'Total Duration',
      icon: <CgTimer className="text-xl" />,
    };
    return [programs, songs, duration];
  } catch (error) {
    throw error;
  }
};

const getSummaryListForCommercialSch = (
  tableData,
  dropBucket,
  lastMinuteSpots,
) => {
  try {
    /* EVENT COUNTS */
    const programs = getProgramsSummary(tableData);
    const commercials = {
      ...getSummary(
        tableData,
        'F_C_S_P',
        rowDataTypesEnum.COMMERCIAL,
        'Commercials',
      ),
      icon: <RiAdvertisementLine className="text-xl" />,
    };
    /* EVENT DURATIONS */
    const commercialsDuration = {
      total: getTimeTotalInSec(
        tableData,
        'Duration',
        rowDataTypesEnum.COMMERCIAL,
      ),
      title: 'Total Commercials Duration',
      icon: <CgTimer className="text-xl" />,
    };

    /* SUMMARY LIST */
    return [
      programs,
      commercials,
      commercialsDuration,
      getTotalDroppedSpots(dropBucket),
      getTotalLastMinuteSpots(lastMinuteSpots),
    ];
  } catch (error) {
    throw error;
  }
};

const getSummaryListForNTCSch = (tableData) => {
  try {
    /* EVENT COUNTS */
    const programs = getProgramsSummary(tableData);
    const ntcs = {
      ...getSummary(tableData, 'F_C_S_P', rowDataTypesEnum.NTC, 'NTCs'),
      icon: <RiLayoutBottom2Line className="text-xl" />,
    };
    /* EVENT DURATIONS */
    const ntcDuration = {
      total: getTimeTotalInSec(tableData, 'Duration', rowDataTypesEnum.NTC),
      title: 'Total NTC Duration',
      icon: <CgTimer className="text-xl" />,
    };
    /* SUMMARY LIST */
    return [programs, ntcs, ntcDuration];
  } catch (error) {
    throw error;
  }
};

const getSummaryListForFinalLogSch = (
  tableData,
  dropBucket,
  lastMinuteSpots,
) => {
  try {
    /* EVENT COUNTS */
    const programs = getProgramsSummary(tableData);
    const promos = {
      ...getSummary(tableData, 'F_C_S_P', rowDataTypesEnum.PROMO, 'Promos'),
      icon: <RiAdvertisementLine className="text-xl" />,
    };
    const commercials = {
      ...getSummary(
        tableData,
        'F_C_S_P',
        rowDataTypesEnum.COMMERCIAL,
        'Commercials',
      ),
      icon: <RiAdvertisementLine className="text-xl" />,
    };
    const ntcs = {
      ...getSummary(tableData, 'F_C_S_P', rowDataTypesEnum.NTC, 'NTC'),
      icon: <RiLayoutBottom2Line className="text-xl" />,
    };
    const songs = {
      ...getSummary(tableData, 'F_C_S_P', rowDataTypesEnum.SONG, 'Songs'),
      icon: <IoIosMusicalNotes className="text-xl" />,
    };
    /* EVENT DURATIONS */
    const promosDuration = {
      total: getTimeTotalInSec(tableData, 'Duration', rowDataTypesEnum.PROMO),
      title: 'Total Promos Duration',
      icon: <CgTimer className="text-xl" />,
    };
    const commercialsDuration = {
      total: getTimeTotalInSec(
        tableData,
        'Duration',
        rowDataTypesEnum.COMMERCIAL,
      ),
      title: 'Total Commercials Duration',
      icon: <CgTimer className="text-xl" />,
    };
    const songsDuration = {
      total: getTimeTotalInSec(tableData, 'Duration', rowDataTypesEnum.SONG),
      title: 'Total Songs Duration',
      icon: <CgTimer className="text-xl" />,
    };
    /* SUMMARY LIST */
    const summaryList = [programs];
    if (promos.total > 0) summaryList.push(promos);
    if (commercials.total > 0) summaryList.push(commercials);
    if (ntcs.total > 0) summaryList.push(ntcs);
    if (songs.total > 0) summaryList.push(songs);
    if (promosDuration.total > 0) summaryList.push(promosDuration);
    if (commercialsDuration.total > 0) summaryList.push(commercialsDuration);
    if (songsDuration.total > 0) summaryList.push(songsDuration);
    summaryList.push(getTotalDroppedSpots(dropBucket));
    summaryList.push(getTotalLastMinuteSpots(lastMinuteSpots));
    return summaryList;
  } catch (error) {
    throw error;
  }
};

const getSummaryList = (page, tableData, dropBucket, lastMinuteSpots) => {
  try {
    let summaryList = [];
    if (page === pagesEnum.PROMO) {
      summaryList = getSummaryListForPromoSch(
        tableData,
        rowDataTypesEnum.PROMO,
      );
    } else if (page === pagesEnum.SONG) {
      summaryList = getSummaryListForSongSch(tableData, rowDataTypesEnum.SONG);
    } else if (page === pagesEnum.COMMERCIAL) {
      summaryList = getSummaryListForCommercialSch(
        tableData,
        dropBucket,
        lastMinuteSpots,
      );
    } else if (page === pagesEnum.NTC) {
      summaryList = getSummaryListForNTCSch(tableData);
    } else if (page === pagesEnum.FINAL_LOG) {
      summaryList = getSummaryListForFinalLogSch(
        tableData,
        dropBucket,
        lastMinuteSpots,
      );
    }
    return summaryList;
  } catch (error) {
    throw error;
  }
};

export { getSummaryList, addTimes };
