// Page properties
const PAGE_SIZE = 'A4';
const PAGE_WIDTH = 595.28; // A4 size width in points
const PAGE_MARGINS = 10;
// Content properties
const EMPTY_LINE = { text: '\n', style: { lineHeight: 0.3 } };
const QR_CODE_SIZE = 216;
const STYLES = {
  // Text Styles
  header: { fontSize: 12, bold: true },
  primaryText: { fontSize: 10 },
  primaryTextBold: { fontSize: 10, bold: true },
  secondaryText: { fontSize: 8 },
  secondaryTextBold: { fontSize: 8, bold: true },
  // Row Styles
  row1: { margin: [0, 5, 0, 0], fontSize: 10 },
  row2: { margin: [0, 5, 0, 0], fontSize: 10 },
  row3: { margin: [0, 5, 0, 0], fontSize: 10 },
  // Table Styles
  tableKey: { fontSize: 9, bold: true },
  telecastTableKey: { fontSize: 8, bold: true },
  noTopBottomBorder: { border: '1px solid red' },
  tableValue: { fontSize: 9 },
  telecastTableCell: { fontSize: 8 },
  tableKeyLarge: { fontSize: 14, bold: true },
};

export {
  PAGE_SIZE,
  PAGE_WIDTH,
  PAGE_MARGINS,
  EMPTY_LINE,
  QR_CODE_SIZE,
  STYLES,
};
