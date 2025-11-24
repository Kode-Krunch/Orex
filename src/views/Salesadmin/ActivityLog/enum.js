const searchTypeEnum = {
  client: 'client',
  booking: 'booking',
};

const activityTypesEnum = {
  scheduled: 'SCHEDULE',
  replaced: 'REPLACE',
  rescheduled: 'RESCHEDULE',
  bulkDropped: 'BULKDROP',
  dropRescheduled: 'DROPRESCHEDULE',
  makeGood: 'MAKEGOOD',
  makeGoodReschedule: 'MAKEGOODRESCHEDULE',
  cancelled: 'CANCEL',
  finalLogCreated: 'FINALLOGCREATE',
  dropped: 'DROP',
  billed: 'BILL',
};

export { searchTypeEnum, activityTypesEnum };
