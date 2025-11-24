// Page properties
const PAGE_SIZE = 'LETTER';
const PAGE_ORIENTATION = 'landscape';
const PAGE_WIDTH = 772; // LETTER page size width in points
const PAGE_MARGINS = 10;
const EMPTY_LINE = { text: '\n', style: { lineHeight: 0.3 } };
const STYLES = {
  // Text Styles
  headerPrimary: { fontSize: 12 },
  headerSecondary: { fontSize: 9 },
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
  PAGE_ORIENTATION,
  PAGE_WIDTH,
  PAGE_MARGINS,
  EMPTY_LINE,
  STYLES,
};
