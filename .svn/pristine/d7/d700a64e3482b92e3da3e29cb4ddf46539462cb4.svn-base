import { useState, useEffect } from 'react';
import {
  Table,
  Button as ButtonE,
  toast as toaste,
  Dialog as Dial,
  Checkbox,
} from 'components/ui';

import './Displaytable.css';
import { ExportxlswithColor } from 'views/Controls/ExportxlswithColor';
import FilterColumn from 'views/Scheduling/FilterColumn';
import { useDispatch } from 'react-redux';
import { setDealData, setDealDataDetails } from 'store/auth/userSlice';
import {
  apiGetdealdetailId,
  apiGetdealmaster,
  apidealmasterBYID,
} from 'services/DealServices';

const { Tr, Th, Td, THead, TBody } = Table;

const DisplayTablewithFilterCheckbox = ({
  data,
  setData,
  dataCopy,
  setDataCopy,
  visiablecolumns,
  setSelectedRowData,
  selectedRowData,
  showCheckbox,
  formState,
}) => {
  console.log('DisplayTablewithFilterCheckboxdata ', data);
  const dispatch = useDispatch();
  const [selectedRow, setSelectedRow] = useState([]);

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
  //console.log('visiablecolumns', visiablecolumns)

  // const xvisiablecolumns = Object.entries(visiablecolumns).map(([key, value]) => ({
  //     columnName: value,
  //     header: value,
  //     dataKey: value
  // }));

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
    return;
  };

  const handleRowClick = (index) => {
    //setSelectedRow([index]);
  };

  const handleRowDoubleClick = async (rowData, index) => {
    try {
      const dealmaster = await apidealmasterBYID(rowData.DealNumber);
      dispatch(setDealData(dealmaster.data));
    } catch (error) {}
    try {
      const dealdetail = await apiGetdealdetailId(rowData.DealNumber);
      dispatch(setDealDataDetails(dealdetail.data));
    } catch (error) {}
  };

  useEffect(() => {
    const selectedData = selectedRow.map((Id) =>
      data.find((item) => item.Id === Id),
    );
    const filteredData = selectedData.filter((item) => item !== undefined);

    // If filteredData is empty, set to an empty array
    setSelectedRowData(filteredData.length > 0 ? filteredData : []);
  }, [selectedRow, data]);

  const handleSelect = (Id) => {
    setSelectedRow((prevSelectedRows) => {
      if (prevSelectedRows.includes(Id)) {
        return prevSelectedRows.filter((row) => row !== Id);
      } else {
        return [...prevSelectedRows, Id];
      }
    });
  };
  useEffect(() => {
    setSelectedRow([]);
  }, [formState]);
  return (
    <>
      <div
        className="grid grid-cols-1 gap-2 table-container"
        style={{
          overflow: 'auto',
          maxHeight: '90%',
        }}
        id="div1"
      >
        <Table className="resizable-table">
          <THead className="theade">
            <Tr className="tre">
              {showCheckbox && <Th>select</Th>}
              {visiablecolumns.map((col, index) => (
                <>
                  <FilterColumn
                    columnName={col.header}
                    data={data}
                    setTable2Data={setData}
                    table2DataCopy={dataCopy}
                    filterOptions={filterOptions}
                    columnFilters={columnFilters}
                    setColumnFilters={setColumnFilters}
                    IsSortingAllow={false}
                    selectedCities={visiablecolumns}
                    //setSelectedCities={setColumnright}
                    ColIndex={index}
                    ColumnInfo={col}
                    DisplayFilter={true}
                  />
                </>
              ))}
            </Tr>
          </THead>
          <TBody className="tbodye">
            {data?.map((rowData, index) => (
              <tr
                key={index}
                // onDoubleClick={() => handleRowDoubleClick(rowData, index + 1)}
                // onClick={() => handleRowClick(rowData.id)}
                className={
                  selectedRow.includes(rowData.Id) ? 'selectedrow' : ''
                }
              >
                {showCheckbox && (
                  <Td>
                    <Checkbox
                      disabled={rowData.DisableSelection}
                      checked={selectedRow.includes(rowData.Id)}
                      onClick={() => handleSelect(rowData.Id)}
                    />
                  </Td>
                )}
                {visiablecolumns.map((columnName) => (
                  <Td className="border_class" key={columnName.code}>
                    {rowData[columnName.code]}
                  </Td>
                ))}
              </tr>
            ))}
          </TBody>
        </Table>
      </div>
    </>
  );
};

DisplayTablewithFilterCheckbox.defaultProps = {
  showCheckbox: true,
};

export default DisplayTablewithFilterCheckbox;
