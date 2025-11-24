import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { numberToINRFormat } from 'views/Controls/GLOBALFUNACTION';

pdfMake.vfs = pdfFonts.default.vfs;

const { STYLES, PAGE_SIZE, PAGE_MARGINS, PAGE_WIDTH, EMPTY_LINE } = require("./constants");

const generateDeal = async (Content, dataRows = [], totalRow = {}, imgPath
) => {
    try {
        // Left Table
        const tableBodyLeft = [
            [{ text: 'Executive :', style: 'tableKey' }, { text: Content.Emp_FirstName, style: 'tableValue' }],
            [{ text: 'Agency & City :', style: 'tableKey' }, { text: `${Content.AgencyName} / ${Content.AgencyPlaceName}`, style: 'tableValue' }],
            [{ text: 'Client & City :', style: 'tableKey' }, { text: `${Content.ClientName} / ${Content.ClientPlaceName}`, style: 'tableValue' }],
            [{ text: 'Pay Route :', style: 'tableKey' }, { text: Content.PayRouteName, style: 'tableValue' }],
            [{ text: 'Currency Name :', style: 'tableKey' }, { text: Content.CurrencyName, style: 'tableValue' }],
        ];

        // Right Table
        const tableBodyRight = [
            [{ text: 'Deal Number :', style: 'tableKey' }, { text: Content.DealCode, style: 'tableValue' }],
            [{ text: 'Deal Date :', style: 'tableKey' }, { text: Content.DealCreatedDate, style: 'tableValue' }],
            [{ text: 'Deal Ref Number :', style: 'tableKey' }, { text: Content.DealReferenceNumber, style: 'tableValue' }],
            [{ text: 'Deal Type :', style: 'tableKey' }, { text: Content.DealTypeName, style: 'tableValue' }],
            [{ text: 'Deal Period :', style: 'tableKey' }, { text: `${Content.DealPeriodFromDate} to ${Content.DealPeriodToDate}`, style: 'tableValue' }],
        ];

        // Spot Details Table
        const createHeaderRow = () => [
            { text: 'S.No', style: 'telecastTableKey', alignment: 'center' },
            { text: 'RODP Wise', style: 'telecastTableKey', alignment: 'center' },
            { text: 'Type', style: 'telecastTableKey', alignment: 'center' },
            { text: 'Spot Type', style: 'telecastTableKey', alignment: 'center' },
            { text: 'No of Spots', style: 'telecastTableKey', alignment: 'center' },
            { text: 'Rate', style: 'telecastTableKey', alignment: 'center' },
            { text: 'Amount', style: 'telecastTableKey', alignment: 'center' },
        ];

        const createBodyRow = (row, index) => [
            { text: index + 1, style: 'tableValue', alignment: 'center' },
            { text: row.TimeBandCode?.label, style: 'telecastTableCell', alignment: 'center' },
            { text: row.DealLineItemType?.label, style: 'telecastTableCell', alignment: 'center' },
            { text: row.SpotTypeCode?.label, style: 'telecastTableCell', alignment: 'center' },
            {
                text:
                    row.DealLineItemType?.label === 'NTC'
                        ? row.NTCTotalSpots
                        : row.DealLineItemType?.label === 'RODP Wise'
                            ? row.Second
                            : row.TotalSpots,
                style: 'telecastTableCell',
                alignment: 'center',
            },
            { text: numberToINRFormat(row.Rate), style: 'tableValue', alignment: 'center' },
            { text: numberToINRFormat(row.Amount), style: 'tableValue', alignment: 'center' },
        ];

        const createTotalRow = (totalRow) => [
            { text: '', style: 'tableValue' },
            { text: '', style: 'tableValue', alignment: 'right' },
            { text: '', style: 'tableValue', alignment: 'center' },
            { text: 'Total', style: 'tableValue', alignment: 'center' },
            { text: totalRow.count.toString(), style: 'tableValue', alignment: 'center' },
            { text: numberToINRFormat(totalRow.Rate), style: 'tableValue', alignment: 'center' },
            { text: numberToINRFormat(totalRow.Amount), style: 'tableKey', alignment: 'center' },
        ];

        const tableBody = [
            createHeaderRow(),
            ...dataRows.map((row, idx) => createBodyRow(row, idx)),
            createTotalRow(totalRow),
        ];

        const spotDetailsTable = {
            table: {
                headerRows: 1,
                widths: ['6%', '25%', '15%', '14%', '12%', '12%', '16%'],
                body: tableBody,
            },
            layout: {
                hLineColor: 'black',
                vLineColor: 'black',
            },
            margin: [0, 30, 0, 0],
        };

        const content = [
            {
                columns: [
                    {
                        width: '*',
                        alignment: 'left',
                        margin: [0, 0, 0, 0],
                        text: [
                            { text: `Deal Details\n`, style: 'tableKeyLarge' },
                            { ...EMPTY_LINE },
                            { text: `${Content.AgencyName}\n`, style: 'tableKeyMedium' },
                            { ...EMPTY_LINE },
                            { text: `${Content.AgencyPlaceName}\n`, style: 'secondaryTextBold' },
                            { ...EMPTY_LINE },
                            { ...EMPTY_LINE },
                        ],
                    },

                    {
                        width: (PAGE_WIDTH * 20) / 100,
                        height: (PAGE_WIDTH * 8) / 100,
                        image: imgPath,
                        alignment: 'center',
                        margin: [0, 0, 0, 0],
                    },
                ],
            },
            {
                columns: [
                    {
                        width: '50%',
                        table: {
                            widths: ['28%', '70%'],
                            body: tableBodyLeft,
                        },
                        margin: [0, 20, 10, 0],
                    },
                    {
                        width: '50%',
                        table: {
                            widths: ['40%', '50%'],
                            body: tableBodyRight,
                        },
                        margin: [10, 20, 0, 0],
                    },
                ],
            },
            spotDetailsTable,
        ];

        const pdfDefinition = {
            pageSize: PAGE_SIZE,
            pageMargins: PAGE_MARGINS,
            content,
            styles: STYLES,
        };

        return pdfMake.createPdf(pdfDefinition);

    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
};

export { generateDeal };
