const SPOTS_TABLE_COLUMNS = [
  {
    header: 'Commercial',
    accessorKey: 'Commercial',
  },
  {
    header: 'Schedule Date',
    accessorKey: 'ScheduleDate',
  },
  {
    header: 'Schedule Time',
    accessorKey: 'ScheduleTime',
  },
  {
    header: 'Content',
    accessorKey: 'ContentName',
  },
  {
    header: 'Break',
    accessorKey: 'BreakNumber',
  },
  {
    header: 'Position',
    accessorKey: 'PositionNumber',
  },
  {
    header: 'Spot',
    accessorKey: 'SpotPosition',
  },
  {
    header: 'Time Band',
    accessorKey: 'TimeBand',
  },
  {
    header: 'Spot Type',
    accessorKey: 'SpotType',
  },
  {
    header: 'Commercial',
    accessorKey: 'Commercial',
  },
  {
    header: 'Video ID',
    accessorKey: 'VideoID',
  },
  {
    header: 'Duration',
    accessorKey: 'Duration',
  },
  {
    header: 'Spot Rate',
    accessorKey: 'SpotRate',
    cell: (props) => {
      const row = props.row.original;
      return (
        <div className="flex items-center">
          <span className="ml-2 rtl:mr-2 flex items-center">
            {row.SpotRate.toLocaleString('en-IN')}
          </span>
        </div>
      );
    },
  },
  {
    header: 'Spot Amount',
    accessorKey: 'SpotAmount',
    cell: (props) => {
      const row = props.row.original;
      return (
        <div className="flex items-center">
          <span className="ml-2 rtl:mr-2 flex items-center">
            {row.SpotAmount.toLocaleString('en-IN')}
          </span>
        </div>
      );
    },
  },
  {
    header: 'Status',
    accessorKey: 'BookingStatus',
  },
  {
    header: 'Spot Status',
    accessorKey: 'SpotStatus',
  },
];

export { SPOTS_TABLE_COLUMNS };
