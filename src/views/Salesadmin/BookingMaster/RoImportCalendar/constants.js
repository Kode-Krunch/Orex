import { Button, Tooltip } from 'components/ui';
import SelectorCell from './SelectorCell';
import TextCell from './TextCell';
import { getCellId, getSpotsTotal, getTotalDuration } from './utils';
import { MdDelete } from 'react-icons/md';

const DEAL_LINE_NO_OPTIONS_KEY = 'dealLineNoOptions';
const SEL_DEAL_LINE_NO_KEY = 'selDealLineNo';
const COMM_OPTIONS_KEY = 'commOptions';
const SEL_COMM_KEY = 'selComm';
const DURATION_COLUMN_KEY = 'duration';
const DEAL_LINE_TITLE_COLUMNS_IN_IMPORTED_FILE = ['Program/Time'];
const DEAL_LINE_TYPE_COLUMNS_IN_IMPORTED_FILE = ['Pmt\nType'];
const COMM_TITLE_COLUMNS_IN_IMPORTED_FILE = ['Title'];
const DUR_COLUMNS_IN_IMPORTED_FILE = ['Spot\nDur'];
const RATE_COLUMNS_IN_IMPORTED_FILE = ['Net Spot\nRate Per\n10 sec'];
const CELL_HEIGHT = 30;
const PINNED_COLUMNS = [
  'delete',
  SEL_DEAL_LINE_NO_KEY,
  SEL_COMM_KEY,
  DURATION_COLUMN_KEY,
  'spots',
  'totalDur',
];
const PINNED_COLUMNS_DEF = [
  {
    accessorKey: 'delete',
    id: 'delete',
    cell: ({ row, table }) => (
      <Tooltip title="Delete Row">
        <Button
          icon={<MdDelete />}
          size="xs"
          shape="circle"
          onClick={() => {
            table.options.meta?.updateTable(
              table.options.data?.filter(
                (curRow, index) => index !== row.index,
              ),
            );
          }}
        />
      </Tooltip>
    ),
    header: 'Actions',
    size: 70,
  },
  {
    accessorKey: SEL_DEAL_LINE_NO_KEY,
    id: SEL_DEAL_LINE_NO_KEY,
    cell: ({ row, column: { id }, table }) => {
      const rowData = row.original;
      const options = rowData[DEAL_LINE_NO_OPTIONS_KEY];
      return (
        <SelectorCell
          options={options}
          value={rowData[id]?.value ?? ''}
          onChange={(event) => {
            table.options.meta?.updateCell(
              row.index,
              id,
              options.filter(
                (option) => option.value === Number(event.target.value),
              )[0],
            );
          }}
          name={getCellId(row.index, id)}
        />
      );
    },
    header: 'Deal Line No',
    size: 180,
  },
  {
    accessorKey: SEL_COMM_KEY,
    id: SEL_COMM_KEY,
    cell: ({ row, column: { id }, table }) => {
      const rowData = row.original;
      const options = rowData[COMM_OPTIONS_KEY];
      return (
        <SelectorCell
          options={options}
          value={rowData[id]?.value ?? ''}
          onChange={(event) => {
            let newValue = options.filter(
              (option) => option.value === Number(event.target.value),
            )[0];
            table.options.meta?.updateCell(row.index, id, newValue, {
              [DURATION_COLUMN_KEY]: newValue.DurInSec,
            });
          }}
          name={getCellId(row.index, id)}
        />
      );
    },
    header: 'Commercial',
    size: 180,
  },
  {
    accessorKey: DURATION_COLUMN_KEY,
    id: DURATION_COLUMN_KEY,
    cell: (props) => (
      <TextCell value={props.row.original[DURATION_COLUMN_KEY]} />
    ),
    header: 'Dur',
    size: 70,
  },
  {
    accessorKey: 'spots',
    id: 'spots',
    cell: (props) => <TextCell value={getSpotsTotal(props.row.original)} />,
    header: 'Spots',
    size: 70,
  },
  {
    accessorKey: 'totalDur',
    id: 'totalDur',
    cell: (props) => <TextCell value={getTotalDuration(props.row.original)} />,
    header: 'Total Dur',
    size: 70,
  },
];

export {
  DEAL_LINE_NO_OPTIONS_KEY,
  SEL_DEAL_LINE_NO_KEY,
  COMM_OPTIONS_KEY,
  SEL_COMM_KEY,
  DURATION_COLUMN_KEY,
  DEAL_LINE_TITLE_COLUMNS_IN_IMPORTED_FILE,
  DEAL_LINE_TYPE_COLUMNS_IN_IMPORTED_FILE,
  COMM_TITLE_COLUMNS_IN_IMPORTED_FILE,
  DUR_COLUMNS_IN_IMPORTED_FILE,
  RATE_COLUMNS_IN_IMPORTED_FILE,
  CELL_HEIGHT,
  PINNED_COLUMNS,
  PINNED_COLUMNS_DEF,
};
