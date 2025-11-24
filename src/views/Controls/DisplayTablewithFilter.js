import { useState, useEffect } from 'react';
import {
  Table,
} from 'components/ui';

import './Displaytable.css';
import { ExportxlswithColor } from 'views/Controls/ExportxlswithColor';
import FilterColumn from 'views/Scheduling/FilterColumn';
import { useDispatch } from 'react-redux';
import { setDealData, setDealDataDetails } from 'store/auth/userSlice';
import {
  apiGetdealdetailId,
  apidealmasterBYID,
} from 'services/DealServices';

const { Tr, Th, Td, THead, TBody } = Table;

const DisplayTablewithFilter = ({
  data,
  BookingStatus,
  setData,
  dataCopy,
  setDataCopy,
  visiablecolumns,
  myid,
  showSpotdata,
}) => {
  const dispatch = useDispatch();
  const [selectedRow, setSelectedRow] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(false);

  const totalData = data.length;

  const filterOptions = [
    { value: 'starts_with', label: 'Starts With' },
    { value: 'contains', label: 'Contains' },
    { value: 'not_contains', label: 'Not Contains' },
    { value: 'ends_with', label: 'Ends With' },
    { value: 'equals', label: 'Equals' },
    { value: 'not_equals', label: 'Not Equals' },
  ];
  const [columnFilters, setColumnFilters] = useState([
    {
      columnName: '',
      filterValue: '',
      filterOption: 'contains',
    },
  ]);

  const handleExportToExcel = () => {
    ExportxlswithColor(
      false,
      false,
      0,
      0,
      true,
      data,
      'Export_Data',
      visiablecolumns,
      false,
    );
  };

  const handleRowClick = (index) => {
    setSelectedRow([index]);
  };

  const handleRowDoubleClick = async (rowData, index) => {
    try {
      const dealmaster = await apidealmasterBYID(rowData.DealNumber);
      dispatch(setDealData(dealmaster.data));
    } catch (error) {
      console.error('Error fetching deal master:', error);
    }
    try {
      const dealdetail = await apiGetdealdetailId(rowData.DealNumber);
      dispatch(setDealDataDetails(dealdetail.data));
    } catch (error) {
      console.error('Error fetching deal detail:', error);
    }
  };

  useEffect(() => {
    setSelectedRowData(data[selectedRow]);
  }, [selectedRow]);

  return (
    <div style={{ overflow: 'auto', whiteSpace: 'nowrap', height: '400px' }}>
      <div className="grid grid-cols-1 gap-2 table-container" id="div1">
        <Table className="resizable-table">
          <THead className="theade">
            <Tr className="tre">
              {visiablecolumns.map((col, index) => (
                <FilterColumn
                  key={index}
                  columnName={col.header}
                  data={data}
                  setTable2Data={setData}
                  table2DataCopy={dataCopy}
                  filterOptions={filterOptions}
                  columnFilters={columnFilters}
                  setColumnFilters={setColumnFilters}
                  IsSortingAllow={false}
                  selectedCities={visiablecolumns}
                  ColIndex={index}
                  ColumnInfo={col}
                  DisplayFilter={true}
                />
              ))}
            </Tr>
          </THead>
          <TBody>
            {(BookingStatus.value
              ? data.filter(
                (item) =>
                  item.BookingStatus === BookingStatus.value &&
                  (myid ? item.DealLineItemNo === myid : true),
              )
              : data.filter((item) =>
                myid ? item.DealLineItemNo === myid : true,
              )
            ).map((rowData, index) => (
              <Tr
                key={index}
                onDoubleClick={() => handleRowDoubleClick(rowData, index + 1)}
                onClick={() => handleRowClick(index)}
                className={selectedRow.includes(index) ? 'selectedrow' : ''}
              >
                {visiablecolumns.map((columnName) => (
                  <Td className="border_class" key={columnName.code}>
                    {rowData[columnName.code]}
                  </Td>
                ))}
              </Tr>
            ))}
          </TBody>
        </Table>
      </div>
    </div>
  );
};

export default DisplayTablewithFilter;
