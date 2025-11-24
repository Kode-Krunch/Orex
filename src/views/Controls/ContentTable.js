import React, { useMemo, Fragment } from 'react';
import { Table } from 'components/ui';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import NumberFormat from 'react-number-format';
import isLastChild from 'utils/isLastChild';

const { Tr, Th, Td, THead, TBody, TFoot } = Table;

const TFootRows = ({ label, value, DealData }) => {
  return (
    <Tr>
      <Td className="!border-t-0" colSpan="11"></Td>
      <Td
        className="font-semibold !border-t-0"
        style={{ borderBottom: '1px solid #fffafa40', height: '40px' }}
      >
        <p
          style={{
            fontSize: 14,
            fontWeight: 900,
            color: 'white',
          }}
        >
          {label}
        </p>
      </Td>
      <Td
        className="!py-5 !border-t-0"
        style={{ borderBottom: '1px solid #fffafa40', height: '40px' }}
      >
        <h6 className="flex">
          {label == 'Total Seconds' || label == 'Total Spots' ? null : (
            <h6 className="flex mr-1"> {DealData.CurrencySymbol}</h6>
          )}
          {label == 'Total Seconds' || label == 'Total Spots' ? (
            value
          ) : (
            <PriceAmount amount={value} />
          )}
        </h6>
      </Td>
    </Tr>
  );
};

const PriceAmount = ({ amount }) => {
  return (
    <NumberFormat
      displayType="text"
      style={{ fontSize: 16, color: 'white' }}
      value={amount}
      thousandSeparator={true}
    />
  );
};

const ContentTable = ({ DealDataDetails = [], DealData = {} }) => {
  const columns = useMemo(
    () => [
      {
        header: 'Deal',
        accessorKey: 'DealLineItemTypeName',
      },
      {
        header: 'Content',
        accessorKey: 'ContentName',
        cell: (props) => {
          const row = props.row.original;
          return <>{row.ContentName ? row.ContentName : 'NA'}</>;
        },
      },
      {
        header: 'TimeBand',
        accessorKey: 'TimeBandName',
        cell: (props) => {
          const row = props.row.original;
          return <>{row.TimeBandName ? row.TimeBandName : 'NA'}</>;
        },
      },
      {
        header: 'Spot Type',
        accessorKey: 'SpotTypeName',
        cell: (props) => {
          const row = props.row.original;
          return <>{row.SpotTypeName ? row.SpotTypeName : 'NA'}</>;
        },
      },
      {
        header: 'NTC Type',
        accessorKey: 'NTCTypeName',
        cell: (props) => {
          const row = props.row.original;
          return <>{row.NTCTypeName ? row.NTCTypeName : 'NA'}</>;
        },
      },

      {
        header: 'Weekdays',
        accessorKey: 'WeekdaysName',
      },

      {
        header: 'Start',
        accessorKey: 'StartTime',
      },
      {
        header: 'End',
        accessorKey: 'EndTime',
      },
      {
        header: 'Rate',
        accessorKey: 'Rate',
        cell: (props) => {
          const row = props.row.original;
          return (
            <>
              <h6 className="flex">
                <h6 className="flex mr-1"> {DealData.CurrencySymbol}</h6>
                <PriceAmount amount={row.Rate} />
              </h6>
            </>
          );
        },
      },

      {
        header: 'Spots',
        accessorKey: 'TotalSpots',
        cell: (props) => {
          const row = props.row.original;
          return <>{row.TotalSpots ? row.TotalSpots : '0'}</>;
        },
      },
      {
        header: 'NTC Spots',
        accessorKey: 'NTCTotalSpots',
        cell: (props) => {
          const row = props.row.original;
          return <>{row.NTCTotalSpots ? row.NTCTotalSpots : '0'}</>;
        },
      },
      {
        header: 'Seconds',
        accessorKey: 'Seconds',
        cell: (props) => {
          const row = props.row.original;
          return <>{row.Seconds ? row.Seconds : '0'}</>;
        },
      },

      {
        header: 'Amount',
        accessorKey: 'Amount',
        cell: (props) => {
          const row = props.row.original;
          console.log(row);
          return (
            <>
              <h6 className="flex">
                <h6 className="flex mr-1"> {DealData.CurrencySymbol}</h6>
                <PriceAmount amount={row.Amount} />
              </h6>
            </>
          );
        },
      },
    ],
    [],
  );

  const table = useReactTable({
    data: DealDataDetails,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <THead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <Th key={header.id} colSpan={header.colSpan}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </Th>
              );
            })}
          </Tr>
        ))}
      </THead>
      <TBody>
        {table.getRowModel().rows.map((row) => {
          return (
            <Tr
              key={row.id}
              style={{ height: '50px', borderBottom: '1px solid #fffafa40' }}
            >
              {row.getVisibleCells().map((cell) => {
                return (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                );
              })}
            </Tr>
          );
        })}
      </TBody>
      <TFoot>
        <TFootRows
          label="Total Seconds"
          value={DealData.TotalSeconds}
          DealData={DealData}
        />

        <TFootRows
          label="Total Spots"
          value={
            DealData.NTCTotalSpots
              ? DealData.NTCTotalSpots
              : 0 + DealData.TotalSpots
              ? DealData.TotalSpots
              : 0
          }
          DealData={DealData}
        />

        <Tr>
          <Td className="!border-t-0" colSpan="11"></Td>
          <Td style={{ borderBottom: '1px solid #fffafa40', height: '40px' }}>
            <p
              style={{
                fontSize: 14,
                fontWeight: 900,
                color: 'white',
              }}
            >
              Grand Amount
            </p>
          </Td>
          <Td style={{ borderBottom: '1px solid #fffafa40', height: '40px' }}>
            <h6 className="flex">
              <h6 className="flex mr-1"> {DealData.CurrencySymbol}</h6>
              <PriceAmount amount={DealData.TotalAmount} />
            </h6>
          </Td>
        </Tr>
      </TFoot>
    </Table>
  );
};

export default ContentTable;
