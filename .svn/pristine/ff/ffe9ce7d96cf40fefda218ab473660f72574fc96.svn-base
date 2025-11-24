import { useState } from 'react';
import { CgImport } from 'react-icons/cg';
import {
  Button,
  Tooltip,
  Upload,
  toast,
  Notification,
  Card,
} from 'components/ui';
import * as XLSX from 'xlsx';
import DisplayTable from 'views/Controls/DisplayTable';
import appConfig from 'configs/app.config';
import { useSelector } from 'react-redux';
import Loader from 'views/Controls/Loader';

const MAX_UPLOAD_LIMIT = 1;

function BarcImport() {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState({ columns: [], data: [] });
  const [sorting, setSorting] = useState([]);

  const token = useSelector((state) => state.auth.session.token);

  const handleFileUpload = async (files, fileList) => {
    try {
      setLoading(true);
      const allowedFileType = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ];
      const invalidFileTypeMessage = 'Please upload an XLSX file!';
      if (fileList.length >= MAX_UPLOAD_LIMIT) {
        return `You can only upload ${MAX_UPLOAD_LIMIT} file(s)`;
      }
      const selectedFile = files[0];

      if (!allowedFileType.includes(selectedFile.type)) {
        return invalidFileTypeMessage;
      }

      const file = selectedFile;
      const reader = new FileReader();
      reader.onload = async (event) => {
        const arrayBuffer = event.target.result;
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const parsedData = jsonData.slice(1).map((row) =>
          jsonData[0].reduce((obj, col, index) => {
            obj[col] = row[index];
            return obj;
          }, {}),
        );

        const columns = [];
        Object.keys(parsedData[0])
          .slice(0, 5)
          .forEach((curColumn) => {
            const column = { header: curColumn, accessorKey: curColumn };
            columns.push(column);
          });
        const tableData = { columns: columns, data: parsedData };
        setTableData(tableData);

        // Generating blob to upload file
        const bodyContent = new FormData();
        const blob = new Blob([arrayBuffer], { type: file.type });
        bodyContent.append('file', blob, file.name);

        // API call to upload file
        let response = await fetch(appConfig.apiPrefix + '/barc/upload/', {
          method: 'POST',
          body: bodyContent,
          headers: {
            Accept: '*/*',
            Authorization: `Bearer ${token}`,
          },
        });
        response = await response.json();
        if (response) {
          toast.push(
            <Notification closable type="success" duration={2000}>
              File uploaded successfully.
            </Notification>,
          );
        } else {
          toast.push(
            <Notification closable type="error" duration={2000}>
              Some error occurred while uploading file.
            </Notification>,
          );
        }
        setLoading(false);
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h4>BARC Import</h4>
        <Tooltip title="Import File">
          <Upload
            onChange={handleFileUpload}
            uploadLimit={MAX_UPLOAD_LIMIT}
            showList={false}
            accept=".xlsx"
          >
            <Button
              style={{ marginBottom: '10px' }}
              variant="solid"
              icon={<CgImport />}
            >
              Import
            </Button>
          </Upload>
        </Tooltip>
      </div>
      {loading === false && (
        <>
          {tableData.data.length > 0 && tableData.columns.length > 0 ? (
            <Card bordered={false} bodyClass="pt-3">
              <h5 className="mb-4">BARC Data</h5>
              <div className="h-[80vh]">
                <DisplayTable
                  data={tableData.data}
                  columns={tableData.columns}
                  sorting={sorting}
                  setSorting={setSorting}
                  ExportName={'BARC'}
                />
              </div>
            </Card>
          ) : (
            <Card
              bordered={false}
              className="h-full"
              bodyClass="h-full flex justify-center items-center"
            >
              <p>Import file to view BARC data</p>
            </Card>
          )}
        </>
      )}

      <Loader showLoader={loading} />
    </>
  );
}

export default BarcImport;
