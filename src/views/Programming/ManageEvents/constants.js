let EXPORT_FILE_NAME = 'Event Master';
const EVENT_MASTER_COLUMNS = [
  {
    header: 'Event Name',
    accessorKey: 'EventName',
  },
  {
    header: 'Total Teams',
    accessorKey: 'TotalTeams',
  },
];
const SELECT_CHANNEL_COLUMNS = [
  {
    header: 'Channel Name',
    accessorKey: 'channelNameWithLocation',
  },
];
const TOOLBAR_OPTIONS = { groupBy: false, manageColumns: false };

export {
  EXPORT_FILE_NAME,
  EVENT_MASTER_COLUMNS,
  SELECT_CHANNEL_COLUMNS,
  TOOLBAR_OPTIONS,
};
