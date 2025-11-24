import * as XLSX from 'xlsx'

export const ExportXls = (data, exportName) => {
    if (data.length === 0) {
        console.error('Data array is empty. Cannot export to Excel.')
        return
    }

    //const ws = XLSX.utils.json_to_sheet(data, { skipHeader: true })
    const ws = XLSX.utils.json_to_sheet(data, { skipHeader: false })


    const fixedColumnWidth = 10;
    const wscols = Object.keys(data[0]).map(() => ({ wch: fixedColumnWidth }));
    ws['!cols'] = wscols;

    // Auto-fit content within fixed-width columns
    const colWidths = data.reduce((acc, row) => {
        Object.keys(row).forEach((key) => {
            const cellLength = String(row[key]).length;
            acc[key] = Math.max(acc[key] || 0, cellLength);
        });
        return acc;
    }, {});

    const wscolsAutoFit = Object.keys(colWidths).map((key) => ({ wch: Math.max(fixedColumnWidth, colWidths[key]) }));
    ws['!cols'] = wscolsAutoFit;

    // const redCellStyle = { fill: { fgColor: { rgb: '#FF0000' } } };
    //  data[0].forEach((cell, index) => {
    //     const cellAddress = XLSX.utils.encode_cell({ r: 0, c: index });
    //     ws[cellAddress].s = redCellStyle;
    // });

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, exportName)
    XLSX.writeFile(wb, `${exportName}.xlsx`)
}

