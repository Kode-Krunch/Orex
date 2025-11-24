const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const RO_IMPORT_FILE_ROW_SKIP_THRESHOLD = 5;

const ALLOWED_EXCEL_FILE_TYPES = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
  'application/xlsx',
  'application/xls',
];

const ALLOWED_PDF_FILE_TYPES = ['application/pdf'];

const ALLOWED_FILE_TYPES = [
  ...ALLOWED_EXCEL_FILE_TYPES,
  ...ALLOWED_PDF_FILE_TYPES,
];

const RO_CALENDAR_TO_EXCEL_COLUMN_SEQUENCE = [
  'VIDEOID',
  'RODP',
  'SPOTTYPE',
  'PROG',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
  'DEAL ORD',
  'BrandName',
];

export {
  daysOfWeek,
  RO_IMPORT_FILE_ROW_SKIP_THRESHOLD,
  ALLOWED_EXCEL_FILE_TYPES,
  ALLOWED_PDF_FILE_TYPES,
  ALLOWED_FILE_TYPES,
  RO_CALENDAR_TO_EXCEL_COLUMN_SEQUENCE,
};
