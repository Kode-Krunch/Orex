import React from 'react';
import Table from 'components/ui/Table';
import { Button, Card, Tooltip } from 'components/ui';
import { IoMdAdd } from 'react-icons/io';
import { BiGitCompare } from 'react-icons/bi';
import { MdCompare } from 'react-icons/md';
import { convertDateFormatyyyyMMdd } from 'views/Controls/GLOBALFUNACTION';
import { Link } from 'react-router-dom';
import { HiPlusCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const { Tr, Th, Td, THead, TBody } = Table;

function ExtraTeleastedSpotsTable({ EXTRA_TELECASTED_SPOTS }) {
  // Function to format time from "HH:mm:ss:ff" to "HH:mm:ss"
  const navigate = useNavigate();
  const formatTime = (timeString) => {
    return timeString.split(':').slice(0, 3).join(':');
  };

  // Function to format column headers (convert camelCase to Title Case)
  const formatHeader = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .replace('Id', 'ID');
  };

  // Get column keys from the first item, excluding some fields
  const getColumns = () => {
    if (!EXTRA_TELECASTED_SPOTS || EXTRA_TELECASTED_SPOTS.length === 0)
      return [];

    const firstItem = EXTRA_TELECASTED_SPOTS[0];
    return Object.keys(firstItem)
      .filter((key) => key !== 'disableSelection') // Exclude this field
      .map((key) => ({
        key,
        header: formatHeader(key),
      }));
  };

  const columns = getColumns();

  return (
    <>
      {EXTRA_TELECASTED_SPOTS && EXTRA_TELECASTED_SPOTS.length > 0 ? (
        <Card bodyClass="p-3">
          <Table borderlessRow={false}>
            <THead>
              <Tr>
                <Th className="h-[30px] border border-gray-600">
                  <div className="flex items-center justify-center">
                    Actions
                  </div>
                </Th>
                {columns.map((column) => (
                  <Th
                    key={column.key}
                    className="h-[30px] border-y border-r border-gray-600"
                  >
                    {column.header}
                  </Th>
                ))}
              </Tr>
            </THead>
            <TBody>
              {EXTRA_TELECASTED_SPOTS.map((row, index) => (
                <Tr key={`${row.HouseID}-${index}`}>
                  <Td className="min-h-[30px] border-b border-x border-gray-700">
                    <div className="py-0.5 flex items-center justify-center gap-1">
                      <Tooltip title="Add to Commercials">
                        <Button
                          shape="circle"
                          size="xs"
                          icon={<IoMdAdd />}
                          /* onClick={async () => {
                             // console.log("row", row)
                             // dispatch(setContent(row));
                             // dispatch(setQueryParams({ copy: false }));
                             navigate('/CommercialMasterEdit'
                             );
                           }}*/
                          onClick={() => {
                            window.open('/#/CommercialMasterEdit', '_blank');
                          }}
                        />
                      </Tooltip>
                      {/* <Tooltip title="Map with Deal">
                        <Button
                          shape="circle"
                          size="xs"
                          icon={<BiGitCompare />}
                        />
                      </Tooltip> */}
                      <Tooltip title="Map with Booking">
                        <Button shape="circle" size="xs" icon={<MdCompare />} />
                      </Tooltip>
                    </div>
                  </Td>
                  {columns.map((column) => {
                    let cellValue = row[column.key];

                    // Format specific fields
                    if (column.key === 'Date' && cellValue) {
                      cellValue = convertDateFormatyyyyMMdd(cellValue);
                    } else if (column.key === 'TransmissionTime' && cellValue) {
                      cellValue = formatTime(cellValue);
                    } else if (column.key === 'EventDuration' && cellValue) {
                      cellValue = formatTime(cellValue);
                    }

                    return (
                      <Td
                        key={`${row.HouseID}-${column.key}`}
                        className="min-h-[30px] border-b border-r border-gray-700"
                      >
                        {cellValue}
                      </Td>
                    );
                  })}
                </Tr>
              ))}
            </TBody>
          </Table>
        </Card>
      ) : (
        <Card
          className="h-[200px]"
          bodyClass="h-full flex justify-center items-center"
        >
          No extra telecasted spots to show
        </Card>
      )}
    </>
  );
}

export default ExtraTeleastedSpotsTable;
