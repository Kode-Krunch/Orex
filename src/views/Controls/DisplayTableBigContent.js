import React, { useEffect, useState } from 'react';
import { Pagination, Select, Table } from 'components/ui';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
} from '@tanstack/react-table';
import { Button } from 'components/ui';
import { HiDownload } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import './Displaytable.css';
import TableRowSkeleton from 'components/shared/loaders/TableRowSkeleton';
import {
  setContent,
  setDialogbox,
  setDialogboxName,
  setTXCode,
} from 'store/base/commonSlice';
import {
  ButtonShow,
  ButtonShowCommercialMaster,
  ButtonShowContentContract,
  ButtonShowDealMasterAdd,
  ButtonShowNTCMaster,
  ButtonShowPatternMaster,
  ButtonShowPromoMaster,
  ButtonShowSeg,
  ButtonShowSongMaster,
  ButtonShowseeting,
  ButtonShowAgencyPaymentMaster,
} from './ButtonShow';
import { apiGetcontenttxversion } from 'services/ProgrammingService';
import { ExportxlswithColor } from './ExportxlswithColor';
import { rankItem } from '@tanstack/match-sorter-utils';

/* CONSTANTS */
const { Tr, Th, Td, THead, TBody, Sorter } = Table;
const pageSizeOption = [
  { value: 10, label: '10 / page' },
  { value: 20, label: '20 / page' },
  { value: 30, label: '30 / page' },
  { value: 40, label: '40 / page' },
  { value: 50, label: '50 / page' },
];

const DisplayTableBigContent = ({
  data,
  columns,
  sorting,
  globalFilter,
  setSorting,
  setGlobalFilter,
  ExportName,
}) => {
  /* REDUX */
  const { themeColor } = useSelector((state) => state.theme);
  const mode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  /* STATES */
  const [isLoading, setIsLoading] = useState(true);
  const [columnFilters, setColumnFilters] = useState([]);
  /* USE EFFECTS */
  useEffect(() => {
    if (data.length > 0) {
      setIsLoading(false);
    }
  }, []);

  /* TABLE PROPERTIES */
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onColumnFiltersChange: setColumnFilters,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugHeaders: true,
    debugColumns: false,
    debugTable: true,
  });
  const totalData = data.length;

  /* HELPER FUNCTIONS */


  /* EVENT HANDLERS */
  const onPaginationChange = (page) => {
    table.setPageIndex(page - 1);
  };

  const onSelectChange = (value) => {
    table.setPageSize(Number(value));
  };

  const openDialog = async (name, data) => {
    try {
      const TXVersion = await apiGetcontenttxversion(data.ContentCode);
      if (TXVersion.status == 200) {
        const formattedOptions = TXVersion.data.map((option) => ({
          value: option.TXVersion.TXVersionCode,
          label: option.TXVersion.TXVersionName,
        }));
        dispatch(setTXCode(formattedOptions));
      }
      if (TXVersion.status == 204) {
        dispatch(setTXCode([]));
      }
      dispatch(setContent(data));
      dispatch(setDialogboxName(name));
      // After all asynchronous operations are completed, setDialogbox to true
      dispatch(setDialogbox(true));
    } catch (error) {
      if (error.response.status === 404) {
        // Handle 404 error (optional)
        dispatch(setContent(data));
        dispatch(setDialogboxName(name));
        dispatch(setDialogbox(true));
      }
      // Dispatch setDialogbox(true) regardless of the error
    }
  };

  const handleExportToExcel = () => {
    //ExportXls(data,ExportName)
    const mapping = {};
    columns.forEach((item) => {
      if (item.accessorKey) {
        mapping[item.accessorKey] = item.header;
      }
    });
    // Update keys in the data array based on the mapping
    const updatedArray = table.getRowModel().rows.map((item) => {
      const updatedItem = {};
      Object.keys(item.original).forEach((key) => {
        if (mapping[key]) {
          updatedItem[mapping[key]] = item.original[key];
        } else {
          updatedItem[key] = item.original[key];
        }
      });
      return updatedItem;
    });
    const news = [
      ...columns,
      {
        header: 'IsActive',
        accessorKey: 'IsActive',
      },
    ];
    ExportxlswithColor(
      false,
      false,
      0,
      0,
      true,
      updatedArray,
      ExportName,
      news,
      false,
    );
    return;
  };

  return (
    <div className="root-container mb-4">
      <Table className="table">
        <THead
          className="border-b-1 "
          style={{
            borderColor: themeColor,
            height: '4%',
          }}
          variant="solid"
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id} className="tr3">
              <Th
                className={mode == 'dark' ? 'srno th' : 'srno th Light'}
                style={{ textAlign: 'Center' }}
              >
                <h6
                  className={
                    mode == 'dark'
                      ? 'capitalize text-xs'
                      : 'capitalize text-xs Light'
                  }
                >
                  Sr.
                </h6>
              </Th>
              {headerGroup.headers.map((header, index) => {
                return (
                  <Th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={index === 0 ? { width: '40%' } : {}}
                  >
                    <p className="text-xs capitalize">
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {
                            <>
                              <Sorter sort={header.column.getIsSorted()} />
                              <div
                                className={`cursor-all-scroll ${header.column.getIsResizing()
                                  ? 'isResizing'
                                  : ''
                                  }`}
                                onMouseDown={header.getResizeHandler()}
                                onTouchStart={header.getResizeHandler()}
                              ></div>
                            </>
                          }
                        </div>
                      )}
                    </p>
                  </Th>
                );
              })}
              <Th className="actions">
                <center className="text-xs capitalize font-bold ">
                  Actions
                </center>
              </Th>
            </Tr>
          ))}
        </THead>
        {isLoading ? (
          <TableRowSkeleton columns={3} rows={5} />
        ) : (
          <TBody className="tbody">
            {/* {JSON.stringify(data)} */}
            {table.getRowModel().rows.map((row, index) => {
              const currentPage = table.getState().pagination.pageIndex;
              const pageSize = table.getState().pagination.pageSize;
              const serialNumber = currentPage * pageSize + index + 1;

              return (
                <Tr key={row.id} className="tr">
                  <Td
                    className={
                      mode == 'dark'
                        ? 'text-xs text-center srno td'
                        : 'text-xs text-center srno tdLight'
                    }
                  >
                    {serialNumber}
                  </Td>
                  {row.getVisibleCells().map((cell, index) => {
                    return (
                      <Td
                        key={cell.id}
                        className={
                          mode == 'dark'
                            ? 'text-xs font-medium  td'
                            : 'text-xs font-medium  tdLight'
                        }
                        style={index === 0 ? { width: '40%' } : {}}
                      >
                        <p className="text-xs">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </p>
                      </Td>
                    );
                  })}
                  {(() => {
                    switch (ExportName) {
                      case 'PromoMaster':
                        return <ButtonShowPromoMaster row={row} />;
                      case 'StoryMaster':
                        return <ButtonShowPromoMaster row={row} />;
                      case 'SongMaster':
                        return <ButtonShowSongMaster row={row} />;
                      default:
                        return null;
                    }
                  })()}
                </Tr>
              );
            })}
          </TBody>
        )}
      </Table>
      <div className="bottom-actions-container">
        <div className="flex items-center justify-between mt-1">
          <Pagination
            pageSize={table.getState().pagination.pageSize}
            currentPage={table.getState().pagination.pageIndex + 1}
            total={totalData}
            onChange={onPaginationChange}
          />
          <div className="flex items-center justify-end mt-1">
            <Button
              variant="solid"
              className="mr-2"
              onClick={handleExportToExcel}
              style={{ width: 130 }}
              block
              size="sm"
              icon={<HiDownload />}
            >
              Export
            </Button>
            {data.length > 10 ? (
              <div style={{ minWidth: 130 }}>
                <Select
                  size="sm"
                  isSearchable={false}
                  value={pageSizeOption.filter(
                    (option) =>
                      option.value === table.getState().pagination.pageSize,
                  )}
                  options={pageSizeOption}
                  onChange={(option) => onSelectChange(option.value)}
                />
              </div>
            ) : null}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DisplayTableBigContent;
