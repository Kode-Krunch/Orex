import {
  calculatePercentageValue,
  formatDateToDDMMMYYYY,
  getDateFromDateTime,
  getTableWithTotal,
  numberToINRFormat,
  numberToWordsINRFormat,
} from 'views/Controls/GLOBALFUNACTION';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { getTaxPercentage, getTelecastDate } from './helperFunctions';
import getHeaderDefinitionForTCPage from './HeaderDefinitions/headerDefinitionForTCPage';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

/* CONSTANTS */
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
  tableValue: { fontSize: 9 },
  tableKeyLarge: { fontSize: 14, bold: true },
};

/* HELPER DEFINITIONS */
const getHeaderDefinition = (invoice) => {
  try {
    return {
      columns: [
        {
          width: (PAGE_WIDTH * 15) / 100,
          text: '',
        },
        {
          width: '*',
          alignment: 'center',
          margin: [0, 15, 0, 0],
          text: [
            {
              text: `${invoice.ParentCompany}\n`,
              style: 'header',
            },
            { ...EMPTY_LINE },
            ...getAddressDefinition(invoice.ParentRegdAddress1),
          ],
        },
        {
          width: (PAGE_WIDTH * 15) / 100,
          image: invoice.Channel_Image,
          alignment: 'center',
          margin: [0, 0, 10, 0],
        },
      ],
    };
  } catch (error) {
    throw error;
  }
};

const getAddressDefinition = (address) => {
  try {
    const addressArr = address.split(',').map((part) => part.trim());
    const addressDefinition = [];
    for (let i = 0; i < addressArr.length; i += 3) {
      const addressLine = addressArr.slice(i, i + 3).join(', ') + '\n';
      addressDefinition.push({ text: addressLine, style: 'secondaryTextBold' });
    }
    return addressDefinition;
  } catch (error) {
    throw error;
  }
};

const getTaxesDefinition = (
  cgst,
  sgst,
  igst,
  cgstAmount,
  sgstAmount,
  igstAmount,
) => {
  try {
    let taxesDefinition = [];
    if (cgst) {
      taxesDefinition.push([
        {
          text: 'Add:',
          style: 'tableKeyLarge',
        },
        { text: 'CGST', style: 'tableValue' },
        { text: `${cgst.TaxPercent}%`, style: 'tableValue' },
        {
          text: numberToINRFormat(cgstAmount),
          style: 'tableValue',
          alignment: 'right',
        },
      ]);
    }
    if (sgst) {
      taxesDefinition.push([
        {
          text: 'Add:',
          style: 'tableKeyLarge',
        },
        { text: 'SGST', style: 'tableValue' },
        { text: `${sgst.TaxPercent}%`, style: 'tableValue' },
        {
          text: numberToINRFormat(sgstAmount),
          style: 'tableValue',
          alignment: 'right',
        },
      ]);
    }
    if (igst) {
      taxesDefinition.push([
        {
          text: 'Add:',
          style: 'tableKeyLarge',
        },
        { text: 'IGST', style: 'tableValue' },
        { text: `${igst.TaxPercent}%`, style: 'tableValue' },
        {
          text: numberToINRFormat(igstAmount),
          style: 'tableValue',
          alignment: 'right',
        },
      ]);
    }
    return taxesDefinition;
  } catch (error) {
    throw error;
  }
};

const getBillDefinition = (invoice, taxes) => {
  try {
    /* DO ALL PRE-PROCESSING HERE */
    // Calculate all amounts
    const grossAmount = invoice.GrossAmount;
    const agencyShare = invoice.AgencyShare;
    const netAmount = grossAmount - agencyShare;
    const cgst = getTaxPercentage(taxes, invoice, 'CGST');
    const sgst = getTaxPercentage(taxes, invoice, 'SGST');
    const igst = getTaxPercentage(taxes, invoice, 'IGST');
    let cgstAmount,
      sgstAmount,
      igstAmount,
      totalAmountIncTaxes = netAmount;
    if (cgst) {
      cgstAmount = calculatePercentageValue(cgst.TaxPercent, netAmount);
      totalAmountIncTaxes = totalAmountIncTaxes + cgstAmount;
    }
    if (sgst) {
      sgstAmount = calculatePercentageValue(sgst.TaxPercent, netAmount);
      totalAmountIncTaxes = totalAmountIncTaxes + sgstAmount;
    }
    if (igst) {
      igstAmount = calculatePercentageValue(igst.TaxPercent, netAmount);
      totalAmountIncTaxes = totalAmountIncTaxes + igstAmount;
    }
    totalAmountIncTaxes = Math.round(totalAmountIncTaxes);

    const definition = [
      // Invoice Header
      getHeaderDefinition(invoice),
      {
        margin: [0, 5, 0, 0],
        columns: [
          {
            width: (PAGE_WIDTH * 15) / 100,
            text: '',
            alignment: 'left',
          },
          {
            width: '*',
            alignment: 'center',
            text: 'TAX INVOICE',
            style: 'header',
          },
          {
            width: (PAGE_WIDTH * 15) / 100,
            text: '',
            alignment: 'right',
            style: 'secondaryTextBold',
          },
        ],
      },
      // First Row Table
      {
        columnGap: 5,
        columns: [
          {
            width: '*',
            style: 'row1',
            table: {
              widths: ['*', '*'],
              body: [
                [
                  {
                    text: 'State of Service Provider :',
                    style: 'tableKey',
                  },
                  { text: invoice.ChannelStateName, style: 'tableValue' },
                ],
                [
                  {
                    text: 'State Code of Service Provider:',
                    style: 'tableKey',
                  },
                  { text: invoice.ChannelStateTinNo, style: 'tableValue' },
                ],
                [
                  { text: 'GSTIN of Service Provider :', style: 'tableKey' },
                  { text: invoice.ChannelGSTN_ID, style: 'tableValue' },
                ],
                [
                  { text: 'PAN of Service Provider :', style: 'tableKey' },
                  { text: '', style: 'tableValue' },
                ],
                [
                  {
                    text: 'Address of Service Provider :',
                    style: 'tableKey',
                  },
                  {
                    text: invoice.ParentRegdAddress1,
                    style: 'tableValue',
                  },
                ],
              ],
            },
          },
          {
            width: '*',
            style: 'row1',
            table: {
              widths: ['40%', '*'],
              body: [
                [
                  { text: 'Invoice Number :', style: 'tableKey' },
                  { text: invoice.INVOICENO, style: 'tableValue' },
                ],
                [
                  { text: 'Invoice Date :', style: 'tableKey' },
                  {
                    text: getDateFromDateTime(invoice.InvoiceDate),
                    style: 'tableValue',
                  },
                ],
                [
                  { text: 'Telecast Period :', style: 'tableKey' },
                  {
                    text: getTelecastDate(invoice.FromDate, invoice.UptoDate),
                    style: 'tableValue',
                  },
                ],
                [
                  { text: 'RO No. & Date :', style: 'tableKey' },
                  {
                    text: `${invoice.BookingCode} & ${formatDateToDDMMMYYYY(
                      invoice.BookingDate,
                    )}`,
                    style: 'tableValue',
                  },
                ],
                [
                  { text: 'Client RO Ref No. :', style: 'tableKey' },
                  {
                    text: invoice.BookingReferenceNumber,
                    style: 'tableValue',
                  },
                ],
              ],
            },
          },
        ],
      },
      // Second Row Table
      {
        columnGap: 5,
        columns: [
          {
            width: '*',
            style: 'row2',
            table: {
              widths: ['35%', '*'],
              body: [
                [
                  { text: 'Agency/Client:', style: 'tableKey' },
                  { text: invoice.AgencyName, style: 'tableValue' },
                ],
                [
                  { text: 'Address:', style: 'tableKey' },
                  {
                    text: invoice.agencyAddress1,
                    style: 'tableValue',
                  },
                ],
                [
                  { text: 'City :', style: 'tableKey' },
                  {
                    text: `${invoice.AgencyStateName} - ${invoice.AgencyPin}`,
                    style: 'tableValue',
                  },
                ],
                [
                  { text: 'STATE :', style: 'tableKey' },
                  { text: invoice.AgencyStateName, style: 'tableValue' },
                ],
                [
                  { text: 'State Code :', style: 'tableKey' },
                  { text: invoice.AgencyStateTinNo, style: 'tableValue' },
                ],
              ],
            },
          },
          {
            width: '*',
            style: 'row2',
            table: {
              widths: ['auto', '*'],
              body: [
                [
                  { text: 'PAN of Client/Agency :', style: 'tableKey' },
                  { text: '', style: 'tableValue' },
                ],
                [
                  { text: 'SAC Code :', style: 'tableKey' },
                  { text: invoice.ChannelSACCode, style: 'tableValue' },
                ],
                [
                  { text: 'Agency/Client GST :', style: 'tableKey' },
                  { text: invoice.AgencyGSTN_ID, style: 'tableValue' },
                ],
              ],
            },
          },
        ],
      },
      // QR code, Client/Product details and Gross Total
      {
        columnGap: 5,
        columns: [
          {
            width: QR_CODE_SIZE,
            // TODO: Remove text and add QR code here
            text: '',
            // qr: 'https://google.com',
            // fit: QR_CODE_SIZE,
          },
          {
            width: '*',
            stack: [
              {
                style: 'row3',
                table: {
                  widths: ['auto', '*'],
                  body: [
                    [
                      { text: 'Client', style: 'tableKey' },
                      { text: invoice.ClientName, style: 'tableValue' },
                    ],
                    [
                      { text: 'Product', style: 'tableKey' },
                      {
                        text: invoice.BrandName,
                        style: 'tableValue',
                      },
                    ],
                  ],
                },
              },
              {
                style: 'row3',
                table: {
                  widths: ['*', '*', '*', '*'],
                  body: [
                    [
                      {
                        text: 'Gross Total',
                        style: 'tableKeyLarge',
                        colSpan: 3,
                      },
                      {},
                      {},
                      {
                        text: numberToINRFormat(grossAmount),
                        style: 'tableValue',
                        alignment: 'right',
                      },
                    ],
                    [
                      {
                        text: 'Less:',
                        style: 'tableKeyLarge',
                      },
                      {
                        text: `AD Booking Discount - ${(agencyShare / grossAmount) * 100
                          }%`,
                        colSpan: 2,
                        style: 'tableValue',
                      },
                      {},
                      {
                        text: numberToINRFormat(agencyShare),
                        style: 'tableValue',
                        alignment: 'right',
                      },
                    ],
                    [
                      {
                        text: 'Net Amount',
                        style: 'tableKeyLarge',
                        colSpan: 3,
                      },
                      {},
                      {},
                      {
                        text: numberToINRFormat(netAmount),
                        style: 'tableValue',
                        alignment: 'right',
                      },
                    ],
                    ...getTaxesDefinition(
                      cgst,
                      sgst,
                      igst,
                      cgstAmount,
                      sgstAmount,
                      igstAmount,
                    ),
                    [
                      {
                        text: 'Total Amount (Inc. Taxes)',
                        style: 'tableKeyLarge',
                        colSpan: 3,
                      },
                      {},
                      {},
                      {
                        text: numberToINRFormat(totalAmountIncTaxes),
                        style: 'tableValue',
                        alignment: 'right',
                      },
                    ],
                    [
                      {
                        text: `Amount in words : ${numberToWordsINRFormat(
                          totalAmountIncTaxes,
                        )} Only`,
                        style: 'secondaryTextBold',
                        colSpan: 4,
                      },
                      {},
                      {},
                      {},
                    ],
                    [
                      {
                        text: 'IRN No.: ',
                        style: 'secondaryTextBold',
                        colSpan: 4,
                      },
                      {},
                      {},
                      {},
                    ],
                  ],
                },
              },
            ],
          },
        ],
      },
      //Terms and Conditions
      {
        margin: [0, 10, 0, 0],
        stack: [
          {
            text: 'Terms and Condition:',
            style: 'secondaryTextBold',
          },
          { ...EMPTY_LINE },
          { text: '\n', style: { lineHeight: 0.3 } },
          {
            columns: [
              {
                width: 'auto',
                text: 'i). Payment of the bill, if not paid in advance, may be made on or before DUE DATE',
                style: 'secondaryText',
                margin: [0, 0, 10, 0],
              },
            ],
          },
          { ...EMPTY_LINE },
          {
            text: 'ii). Interest at 14.5% per annum will be charged on all amounts which are not paid within the specified period in terms of Contract / Agreement.',
            style: 'secondaryText',
          },
          { ...EMPTY_LINE },
          {
            text: 'iii). For further instruction please refer to the terms & condition laid down in the contract/agreement executed by the Advertisers/Agency.',
            style: 'secondaryText',
          },
        ],
      },
      // GST declaration and Digital Signature
      {
        columnGap: 5,
        columns: [
          {
            width: '70%',
            margin: [0, 15, 0, 0],
            stack: [
              {
                text: 'GST Declaration:',
                style: 'primaryTextBold',
              },
              { text: '\n', style: { lineHeight: 0.4 } },
              {
                text: 'Certified that the particular given above are true and correct',
                style: 'primaryText',
              },
            ],
          },
          {
            // TODO: Add Digital Signature in this block
            // width: (PAGE_WIDTH * 15) / 100,
          },
        ],
      },
    ];

    return definition;
  } catch (error) {
    throw error;
  }
};

const getTelecastReportTableDefinition = (telecastReport) => {
  try {
    return {
      table: {
        widths: [(PAGE_WIDTH * 4) / 100, (PAGE_WIDTH * 10) / 100, (PAGE_WIDTH * 34) / 100, (PAGE_WIDTH * 25) / 100, (PAGE_WIDTH * 8) / 100, (PAGE_WIDTH * 6) / 100],
        body: [
          [
            { text: 'S.No.', style: 'tableKey' },
            { text: 'Telecast Period', style: 'tableKey' },
            { text: 'Caption', style: 'tableKey' },
            { text: 'Programme', style: 'tableKey' },
            { text: 'Spot Type', style: 'tableKey' },
            { text: 'Rate', style: 'tableKey' },
          ],
          ...getTableWithTotal(telecastReport, [
            'DurInSec',
            'BillSpotAmount',
          ]).map((row, index) => {
            if (index !== telecastReport.length) {
              return [
                { text: index + 1, style: 'tableValue' },
                {
                  text: getDateFromDateTime(row.TelecastDate),
                  style: 'tableValue',
                },
                { text: row.CommercialCaption, style: 'tableValue' },
                { text: row.ContentName, style: 'tableValue', },
                { text: row.SpotType, style: 'tableValue', },
                {
                  text: numberToINRFormat(row.BookingSpotRate),
                  style: 'tableValue',
                },
              ];
            } else {
              return [
                { text: '', style: 'tableValue' },
                { text: row.TelecastDate, style: 'tableValue' },
                { text: row.ContentName, style: 'tableValue', },
                { text: row.SpotType, style: 'tableValue', },
                {
                  text: 'Total',
                  style: 'tableKey',
                },
                {
                  text: row.BookingSpotRate,
                  style: 'tableValue',
                },
              ];
            }
          }),
        ],
      },
    };
  } catch (error) {
    throw error;
  }
};

/* PDF GENERATOR FUNCTIONS */
const generateBill = async (invoice, taxes) => {
  try {
    const pdfDefination = {
      pageSize: PAGE_SIZE,
      pageMargins: PAGE_MARGINS,
      content: getBillDefinition(invoice, taxes),
      styles: STYLES,
    };
    return pdfMake.createPdf(pdfDefination);
  } catch (error) {
    throw error;
  }
};

const generateBillWithTC = async (invoice, taxes, telecastReport) => {
  try {
    const pdfDefination = {
      pageSize: PAGE_SIZE,
      pageMargins: PAGE_MARGINS,
      content: getBillDefinition(invoice, taxes),
      styles: STYLES,
    };
    // Added Telecast Report
    pdfDefination.content.push({
      pageBreak: 'before',
      stack: [
        {
          columns: [
            {
              width: '*',
              text: [
                {
                  text: `${invoice.ChannelName}\n`,
                  style: 'header',
                },
                {
                  text: `Invoice Number: ${invoice.INVOICENO}`,
                  style: 'tableValue',
                },
              ],
              alignment: 'left',
            },
            {
              width: '*',
              alignment: 'center',
              text: [{ text: 'Telecast Report', style: 'header' }],
              margin: [0, 10, 0, 0],
            },
            {
              width: '*',
              text: [
                {
                  text: `Invoice Date: ${getDateFromDateTime(
                    invoice.InvoiceDate,
                  )}\n`,
                  style: 'tableValue',
                },
                {
                  text: `Invoice Period: ${getTelecastDate(
                    invoice.FromDate,
                    invoice.UptoDate,
                  )}`,
                  style: 'tableValue',
                },
              ],
              alignment: 'right',
            },
          ],
          margin: [0, 5, 0, 15],
        },
        getTelecastReportTableDefinition(telecastReport),
      ],
    });
    return pdfMake.createPdf(pdfDefination);
  } catch (error) {
    throw error;
  }
};

const generateTelecastReport = async (invoice, telecastReport) => {
  try {
    const pdfDefination = {
      pageSize: PAGE_SIZE,
      pageMargins: PAGE_MARGINS,
      content: [
        // HEADER
        getHeaderDefinition(invoice),
        {
          columns: [
            {
              width: '*',
              text: [
                {
                  text: `\nInvoice Number: ${invoice.INVOICENO}`,
                  style: 'tableValue',
                },
              ],
              alignment: 'left',
            },
            {
              width: '*',
              alignment: 'center',
              text: [{ text: 'TELECAST REPORT', style: 'header' }],
              margin: [0, 10, 0, 0],
            },
            {
              width: '*',
              text: [
                {
                  text: `Invoice Date: ${getDateFromDateTime(
                    invoice.InvoiceDate,
                  )}\n`,
                  style: 'tableValue',
                },
                {
                  text: `Invoice Period: ${getTelecastDate(
                    invoice.FromDate,
                    invoice.UptoDate,
                  )}`,
                  style: 'tableValue',
                },
              ],
              alignment: 'right',
            },
          ],
          margin: [0, 5, 0, 15],
        },
        getTelecastReportTableDefinition(telecastReport),
      ],
      styles: STYLES,
    };
    return pdfMake.createPdf(pdfDefination);
  } catch (error) {
    throw error;
  }
};

const generateTelecastCertificateForTCPage = async (
  tableData,
  headerDetails,
) => {
  const pdfDefination = {
    pageSize: PAGE_SIZE,
    pageMargins: PAGE_MARGINS,
    content: [
      getHeaderDefinitionForTCPage(headerDetails),
      {
        columns: [
          {
            width: '*',
            text: [
              {
                text: `\n\n\nAgency : `,
                style: 'tableKey',
              },
              {
                text: headerDetails.agencyName,
                style: 'tableValue',
              },
              {
                text: `\nAddress : `,
                style: 'tableKey',
              },
              {
                text: headerDetails.agencyAddress,
                style: 'tableValue',
              },
            ],
          },
          {
            width: '*',
            alignment: 'center',
            text: [{ text: 'TELECAST REPORT', style: 'header' }],
            margin: [0, 10, 0, 0],
          },
          {
            width: '*',
            text: [
              {
                text: `\n\n\nPeriod : `,
                style: 'tableKey',
              },
              {
                text: `${getTelecastDate(
                  headerDetails.fromDate,
                  headerDetails.toDate,
                )}`,
                style: 'tableValue',
              },
              {
                text: `\nClient : `,
                style: 'tableKey',
              },
              {
                text: headerDetails.clientName,
                style: 'tableValue',
              },
            ],
            alignment: 'right',
          },
        ],
        margin: [0, 5, 0, 15],
      },
      getTelecastReportTableDefinition(tableData),
    ],
    styles: STYLES,
  };
  return pdfMake.createPdf(pdfDefination);
};

export {
  generateBill,
  generateBillWithTC,
  generateTelecastReport,
  generateTelecastCertificateForTCPage,
};
