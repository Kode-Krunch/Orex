import { DURATION_COLUMN_KEY } from './constants';
import InputCell from './InputCell';

const { addDays } = require('date-fns');

const dateCell = ({ getValue, row: { index }, column: { id }, table }) => (
  <InputCell getValue={getValue} table={table} index={index} id={id} />
);

const getColumnsForDateRange = (dateRange) => {
  const columns = [];
  const [startDate, endDate] = dateRange;
  for (let index = startDate; index <= endDate; index = addDays(index, 1)) {
    const date = `${index.getDate()}`;
    columns.push({
      accessorKey: date,
      id: date,
      header: date,
      size: 50,
      cell: dateCell,
    });
  }
  return columns;
};

const getCommonPinningStyles = (column) => {
  const isPinned = column.getIsPinned();
  return {
    left: isPinned === 'left' ? `${column.getStart('left') - 5}px` : undefined,
    opacity: 1,
    position: isPinned ? 'sticky' : 'relative',
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
};

const getSpotsTotal = (row) => {
  let total = 0;
  for (let date = 1; date <= 31; date++) {
    const curDateValue = row[`${date}`] ? Number(row[`${date}`]) : 0;
    total = total + curDateValue;
  }
  return total;
};

const getTotalDuration = (row) => {
  let total = 0;
  for (let date = 1; date <= 31; date++) {
    const curDateValue = row[`${date}`] ? Number(row[`${date}`]) : 0;
    total =
      total +
      curDateValue *
        (row[DURATION_COLUMN_KEY] !== '-' && row[DURATION_COLUMN_KEY]
          ? row[DURATION_COLUMN_KEY]
          : 0);
  }
  return total;
};

const getCellId = (rowIndex, columnId) => `${rowIndex}-${columnId}`;

export {
  getColumnsForDateRange,
  getCommonPinningStyles,
  getSpotsTotal,
  getTotalDuration,
  getCellId,
};
