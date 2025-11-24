import React, { useState, useRef } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import {
  Table,
  Card,
  Button as ButtonE,
  Input,
  Select,
  Tooltip,
  ScrollBar,
  FormItem,
  FormContainer,
} from 'components/ui';
import { OverlayPanel } from 'primereact/overlaypanel';
import './style.css';
import { Menubar } from 'primereact/menubar';
import { Menu } from 'primereact/menu';
import { HiOutlineCog } from 'react-icons/hi';

const { Tr, Th, Td, THead, TBody } = Table;

const FilterColumn = ({
  columnName,
  table2Data,
  setTable2Data,
  table2DataCopy,
  filterOptions,
  columnFilters,
  setColumnFilters,
  IsSortingAllow,
  selectedCities, // columns for resize
  setSelectedCities, // set columns for resize
  ColIndex,
  ColumnInfo,
}) => {
  // console.log('table2Data', table2Data);
  const filterPanelRef = React.useRef(null);
  const [filterValue, setFilterValue] = useState('');
  const [filterOption, setFilterOption] = useState('contains');

  console.log('filterValue', filterValue);
  // sort login start
  const [sortOrder, setSortOrder] = useState('down');

  const applySorting = (data, column, order) => {
    const sortedData = [...data].sort((a, b) => {
      const valueA = a[column].toLowerCase();
      const valueB = b[column].toLowerCase();

      if (order === 'down') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });

    return sortedData;
  };

  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === 'down' ? 'up' : 'down'));

    setTable2Data((prevTable2Data) => {
      console.log('prevTable2Data', prevTable2Data);
      const sortedData = applySorting(prevTable2Data, columnName, sortOrder);
      console.log('sortedData', sortedData);
      return sortedData;
    });
  };

  // sort login end

  const handleMouseDown = (e, index) => {
    console.log('handleMouseDown', index);
    let startX = e.pageX;
    const startWidth = selectedCities[index].width;

    const handleMouseMove = (e) => {
      const newWidth = startWidth + (e.pageX - startX);
      if (newWidth > 50) {
        // Minimum width constraint
        const newColumns = [...selectedCities];
        newColumns[index].width = newWidth;
        setSelectedCities(newColumns);
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const op = useRef(null);
  let items = [
    { label: 'Add Columns', icon: 'pi pi-plus' },
    { label: 'Remove Columns', icon: 'pi pi-search' },
  ];
  return (
    <>
      <Th
        className="the"
        key={ColumnInfo.header}
        style={{ width: ColumnInfo.width }}
      >
        <div className="flex justify-center">
          <span className="mr-2">
            <span style={{ display: 'none' }}>{ColumnInfo.name}</span>
            {ColumnInfo.header}
          </span>

          <i
            onClick={(e) => filterPanelRef.current.toggle(e)}
            className={
              filterValue !== ''
                ? 'pi pi-filter-fill mr-2'
                : 'pi pi-filter mr-2'
            }
          ></i>
          {IsSortingAllow && (
            <span
              onClick={handleSort}
              className={`pi pi-sort-alpha-${sortOrder} mr-2`}
              style={{ cursor: 'pointer' }}
            ></span>
          )}

          <div className="flex justify-center">
            <span className="hide resizer">
              &nbsp;&nbsp;
              <span
                className="hide resizer"
                onMouseDown={(e) => handleMouseDown(e, ColIndex)}
              >
                ||
              </span>
            </span>
          </div>
        </div>
      </Th>
      <OverlayPanel
        ref={filterPanelRef}
        className="custom-overlay"
        style={{
          width: '350px',
          backgroundColor: 'rgb(31 41 55/var(--tw-bg-opacity))',
          color: 'white',
        }}
      >
        <div className="grid grid-cols-12 md:grid-cols-12 gap-1">
          <div className="col-span-6">
            <label>Condition</label>
            <Select
              placeholder="Please Select"
              options={filterOptions}
              defaultValue={filterOptions[1]}
              onChange={(value) => {
                setFilterOption(value.value);
              }}
            ></Select>
          </div>
          <div className="col-span-6">
            <label>Search</label>
            <Input
              id={columnName}
              value={filterValue}
              onChange={(e) => {
                setFilterValue(e.target.value);

                setColumnFilters((prevFilters) => {
                  const filterIndex = prevFilters.findIndex(
                    (filter) => filter.columnName === columnName,
                  );

                  const columnwisedata =
                    filterIndex !== -1
                      ? prevFilters.map((filter, index) =>
                          index === filterIndex
                            ? {
                                ...filter,
                                filterValue: e.target.value,
                                filterOption: filterOption,
                                columnName: columnName,
                              }
                            : filter,
                        )
                      : [
                          ...prevFilters,
                          {
                            columnName,
                            filterValue: e.target.value,
                            filterOption,
                            columnName,
                          },
                        ];

                  setTable2Data((prevTable2Data) => {
                    return table2DataCopy.filter((row) => {
                      return columnwisedata.every((filter) => {
                        const { columnName, filterValue, filterOption } =
                          filter;
                        const cellValue = (row[columnName] || '').toLowerCase();

                        switch (filterOption) {
                          case 'starts_with':
                            return cellValue.startsWith(
                              filterValue.toLowerCase(),
                            );
                          case 'contains':
                            return cellValue.includes(
                              filterValue.toLowerCase(),
                            );
                          case 'not_contains':
                            return !cellValue.includes(
                              filterValue.toLowerCase(),
                            );
                          case 'ends_with':
                            return cellValue.endsWith(
                              filterValue.toLowerCase(),
                            );
                          case 'equals':
                            return cellValue === filterValue.toLowerCase();
                          case 'not_equals':
                            return cellValue !== filterValue.toLowerCase();
                          default:
                            return true;
                        }
                      });
                    });
                  });

                  return columnwisedata;
                });
              }}
            />
          </div>
        </div>
      </OverlayPanel>
    </>
  );
};
export default FilterColumn;
