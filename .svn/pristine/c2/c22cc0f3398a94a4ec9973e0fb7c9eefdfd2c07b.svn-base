import React from 'react';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { openNotification } from './GLOBALFUNACTION';

export const ExportxlswithColor = (
  boldHeaders,
  borders,
  emptyColumnsAtStart,
  emptyRowsAtStart,
  defaultFormatting,
  data,
  exportName,
  visibleColumns,
  WithColor,
) => {
  if (data.length === 0) {
    openNotification('info', 'No data to export');
    return; // Exit if there's no data to export
  }

  const updatedData = data.map((item) => ({ ...item })); // Clone data to avoid mutations

  const mapping = {};
  visibleColumns.forEach((item) => {
    if (item.accessorKey) {
      console.log(item.accessorKey);
      console.log(mapping[item.accessorKey]);
      mapping[item.accessorKey] = item.header;
    }
  });

  // Update keys in the data array based on the mapping
  const updatedArray = updatedData.map((item) => {
    const updatedItem = {};
    Object.keys(item).forEach((key) => {
      if (mapping[key]) {
        updatedItem[mapping[key]] = item[key];
      } else {
        updatedItem[key] = item[key];
      }
    });
    return updatedItem;
  });

  const columnKeys =
    Object.keys(mapping).length > 0
      ? Object.keys(mapping).map((key) => mapping[key])
      : [];

  // Generating dynamic columns based on keys
  const dynamicColumns = columnKeys.map((key) => ({
    header: key,
    key: key,
  }));

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(exportName);

  // Add empty rows at the start
  for (let i = 0; i < emptyRowsAtStart; i++) {
    worksheet.addRow([]); // Add an empty row
  }

  // Generate headers with empty columns
  const headers = [];
  for (let i = 0; i < emptyColumnsAtStart; i++) {
    headers.push(''); // Add empty columns at the start
  }
  headers.push(...columnKeys); // Add actual column headers
  worksheet.addRow(headers);

  // Apply bold headers
  if (boldHeaders) {
    const headerRow = worksheet.getRow(emptyRowsAtStart + 1); // Adjust for empty rows
    headerRow.font = { bold: true, size: 10 };
  }
  // Apply default formatting to headers
  if (defaultFormatting) {
    const headerRow = worksheet.getRow(emptyRowsAtStart + 1); // Adjust for empty rows
    headerRow.font = { bold: true, size: 12 };
    headerRow.eachCell((cell) => {
      cell.border = {
        top: { style: 'medium' },
        left: { style: 'medium' },
        bottom: { style: 'medium' },
        right: { style: 'medium' },
      };
      if (!WithColor) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '009dff' },
        };
      }
    });
  }

  // Add data rows with empty columns at the start
  updatedArray.forEach((row) => {
    const rowData = [];
    for (let i = 0; i < emptyColumnsAtStart; i++) {
      rowData.push(''); // Add empty columns at the start of each row
    }
    columnKeys.forEach((key) => {
      rowData.push(row[key] || ''); // Add actual data
    });

    const dataRow = worksheet.addRow(rowData);
    dataRow.font = { size: 10 };

    // Set cell formatting for rows
    dataRow.eachCell((cell, colNumber) => {
      if (cell.value instanceof Date) {
        cell.value = new Date(
          Date.UTC(
            cell.value.getFullYear(),
            cell.value.getMonth(),
            cell.value.getDate(),
          ),
        );
      }
      if (WithColor && row.EventDefaultBackColor) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: {
            argb: row.EventDefaultBackColor.substring(1),
          },
        };
      }
      if (WithColor && row.EventDefaultFrontColor) {
        cell.font = {
          color: {
            argb: row.EventDefaultFrontColor.substring(1),
          },
        };
      }
      if (defaultFormatting) {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      }
    });
  });

  // Adjust column widths
  worksheet.columns.forEach((column) => {
    let maxLength = 10; // Minimum column width
    column.eachCell((cell) => {
      const cellLength = (cell.value || '').toString().length;
      maxLength = Math.max(maxLength, cellLength);
    });
    column.width = Math.min(30, maxLength + 2); // Set a reasonable max width
  });

  // Freeze header row and empty rows
  worksheet.views = [
    {
      state: 'frozen',
      xSplit: emptyColumnsAtStart,
      ySplit: emptyRowsAtStart + 1, // Account for headers
      topLeftCell: `A${emptyRowsAtStart + 2}`,
    },
  ];

  if (borders) {
    /* ADD BLACK BORDERS TO EVERY CELL */
    const totalRows = data.length + emptyRowsAtStart + 100;
    const totalColumns =
      visibleColumns.length > 0 ? visibleColumns.length + 100 : 100;
    for (let rowIndex = 1; rowIndex <= totalRows; rowIndex++) {
      const row = worksheet.getRow(rowIndex);
      for (let colIndex = 1; colIndex <= totalColumns; colIndex++) {
        const cell = row.getCell(colIndex);
        cell.value = cell.value || '';
        cell.border = {
          top: { style: 'thin', color: { argb: '000000' } },
          left: { style: 'thin', color: { argb: '000000' } },
          bottom: { style: 'thin', color: { argb: '000000' } },
          right: { style: 'thin', color: { argb: '000000' } },
        };
      }
    }
  }

  // Generate a blob from the workbook
  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(new Blob([buffer]), `${exportName}.xlsx`);
  });
};
