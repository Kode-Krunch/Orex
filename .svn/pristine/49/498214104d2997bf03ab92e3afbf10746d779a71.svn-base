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
import {
  apiGetcontentsuppliermap,
  apiGetcontenttxversion,
} from 'services/ProgrammingService';
import { ExportxlswithColor } from './ExportxlswithColor';
import { rankItem } from '@tanstack/match-sorter-utils';
import Loader from './Loader';

/* CONSTANTS */
const { Tr, Th, Td, THead, TBody, Sorter } = Table;
const pageSizeOption = [
  { value: 10, label: '10 / page' },
  { value: 20, label: '20 / page' },
  { value: 30, label: '30 / page' },
  { value: 40, label: '40 / page' },
  { value: 50, label: '50 / page' },
];

const DisplayTableContent = ({
  data,
  columns,
  sorting,
  globalFilter,
  setSorting,
  setGlobalFilter,
  ExportName,
  setReloadPageCounter,
}) => {
  /* REDUX */
  const { themeColor } = useSelector((state) => state.theme);
  const mode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  /* STATES */
  const [isLoading, setIsLoading] = useState(true);
  const [columnFilters, setColumnFilters] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

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
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
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
  function fuzzyFilter(row, columnId, value, addMeta) {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({
      itemRank,
    });
    return itemRank.passed;
  }

  /* EVENT HANDLERS */
  const onPaginationChange = (page) => {
    table.setPageIndex(page - 1);
  };

  const onSelectChange = (value) => {
    table.setPageSize(Number(value));
  };

  const openDialog = async (name, data) => {
    setShowLoader(true);
    try {
      // Initialize formatted data
      let formattedTXVersion = [];
      let formattedSupplier = [];

      // Fetch TXVersion
      try {
        const TXVersion = await apiGetcontenttxversion(data.ContentCode);
        if (TXVersion.status === 200) {
          formattedTXVersion = TXVersion.data.map((option) => ({
            value: option.TXVersion.TXVersionCode,
            label: option.TXVersion.TXVersionName,
          }));
        }
      } catch (error) {
        console.error('Error fetching TXVersion:', error);
      }

      // Fetch Supplier
      try {
        const Supplier = await apiGetcontentsuppliermap(data.ContentCode);
        if (Supplier.status === 200) {
          formattedSupplier = Supplier.data.map((option) => ({
            value: option.SupplierMasterTable.SupplierCode,
            label: option.SupplierMasterTable.SupplierName,
          }));
        }
      } catch (error) {
        console.error('Error fetching Supplier:', error);
      }
      dispatch(
        setTXCode({
          Supplier: formattedSupplier, // Blank array if Supplier API fails
          TXVersion: formattedTXVersion, // Blank array if TXVersion API fails
        }),
      );

      // Set content and dialog state
      dispatch(setContent(data));
      setShowLoader(false);
      dispatch(setDialogboxName(name));
      dispatch(setDialogbox(true));
    } catch (error) {
      // Handle unexpected errors
      console.error('Unexpected error:', error);
      setShowLoader(false);
      // Ensure dialog state is updated even in case of errors
      dispatch(setContent(data));
      dispatch(setDialogboxName(name));
      dispatch(setDialogbox(true));
    }
    setShowLoader(false);
  };

  const handleExportToExcel = () => {
    //ExportXls(data,ExportName)
    const mapping = {};
    columns.forEach((item) => {
      if (item.accessorKey) {
        mapping[item.accessorKey] = item.header;
      }
    });
    const news = [
      ...columns,
      {
        header: 'IsActive',
        accessorKey: 'IsActive',
      },
    ];
    ExportxlswithColor(false, false, 0, 0, true, data, ExportName, news, false);
    return;
  };

  return (
    <div className="root-container">
      <Loader showLoader={showLoader} />
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
                translate="no"
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
                    style={index === 0 ? { width: '28%' } : {}}
                    translate="no"
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
              <Th className="actions" translate="no">
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
          <TBody className="tbody" translate="no">
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
                        style={index === 0 ? { width: '28%' } : {}}
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
                      case 'ContentMaster':
                        return (
                          <ButtonShow
                            row={row}
                            openDialog={openDialog}
                            setReloadPageCounter={setReloadPageCounter}
                            setShowLoader={setShowLoader}
                          />
                        );
                      case 'ContentSegmentMaster':
                        return <ButtonShowSeg row={row} />;
                      case 'ChannelsettingMaster':
                        return <ButtonShowseeting row={row} />;
                      case 'PatternMaster':
                        return <ButtonShowPatternMaster row={row} />;
                      case 'PromoMaster':
                        return <ButtonShowPromoMaster row={row} />;
                      case 'SongMaster':
                        return <ButtonShowSongMaster row={row} />;
                      case 'NTCMaster':
                        return <ButtonShowNTCMaster row={row} />;
                      case 'ContentContractMaster':
                        return <ButtonShowContentContract row={row} />;
                      case 'CommercialMaster':
                        return <ButtonShowCommercialMaster row={row} />;
                      case 'DealMaster':
                        return <ButtonShowDealMasterAdd row={row} />;
                      case 'AgencyPaymentMaster':
                        return <ButtonShowAgencyPaymentMaster row={row} />;
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
        <div className="flex  justify-start mt-2">
          <h1 className="text-xs  font-light">Records : {data?.length}</h1>
        </div>
      </div>
    </div>
  );
};

export default DisplayTableContent;
