import React, { useState } from 'react';
import { Table, Input, Select } from 'components/ui';
import { OverlayPanel } from 'primereact/overlaypanel';
import './style.css';
import { setColumnright } from 'store/Scheduling/SchedulingSlice';
import ColumnFilterDropDown from 'views/Controls/ReportsTable/components/MainTable/components/DropDowns/ColumnFilterDropDown';

const { Th } = Table;
//05082024
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
  dispatch, // set columns for resize
  ColIndex,
  ColumnInfo,
  DisplayFilter,
}) => {
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
  };

  // sort login end

  const handleMouseDown = (e, index) => {
    let startX = e.pageX;
    const startWidth = selectedCities[index].width;

    const handleMouseMove = (e) => {
      const newWidth = startWidth + (e.pageX - startX);
      if (newWidth > 50) {
        // Minimum width constraint
        const newColumns = [...selectedCities];
        newColumns[index].width = newWidth;

        dispatch(setColumnright(newColumns));
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <>
      <Th
        className="rpg"
        key={ColumnInfo.header}
        style={{ width: ColumnInfo.width, textTransform: 'capitalize' }}
      >
        <div className="flex justify-center gap-2">
          <span>
            <span style={{ display: 'none' }}>{ColumnInfo.name}</span>
            {ColumnInfo.header}
          </span>
          {DisplayFilter ? (
            <i
              onClick={(e) => filterPanelRef.current.toggle(e)}
              className={
                filterValue !== ''
                  ? 'pi pi-filter-fill mr-1 mt-1 '
                  : 'pi pi-filter mr-1 mt-1  '
              }
              style={{ fontSize: 'smaller' }}
            ></i>
          ) : null}
          {IsSortingAllow && (
            <span
              onClick={handleSort}
              className={`pi pi-sort-${sortOrder} mr-1  mt-1`}
              style={{ cursor: 'pointer', fontSize: 'smaller' }}
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
                console.log('value.value', value.value);
                setFilterOption(value.value);
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
                                filterValue: value.value,
                                filterOption: filterOption,
                                columnName: columnName,
                              }
                            : filter,
                        )
                      : [
                          ...prevFilters,
                          {
                            columnName,
                            filterValue: value.value,
                            filterOption,
                            columnName,
                          },
                        ];

                  setTable2Data((prevTable2Data) => {
                    console.log('prevTable2Data', prevTable2Data);
                    return table2DataCopy.filter((row) => {
                      console.log('row', columnwisedata);
                      return columnwisedata.every((filter) => {
                        console.log('filter', filter);
                        const { columnName, filterValue, filterOption } =
                          filter;
                        console.log(columnName);
                        const cellValue = (row[columnName] || '')
                          .toString()
                          .toLowerCase();
                        //console.log(cellValue);
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
            ></Select>
          </div>
          <div className="col-span-6">
            <label>Search</label>
            <Input
              placeholder={'Search' + ' ' + columnName}
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
                    console.log('prevTable2Data', prevTable2Data);
                    return table2DataCopy.filter((row) => {
                      console.log('row', row);
                      return columnwisedata.every((filter) => {
                        //console.log('filter', filter)
                        const { columnName, filterValue, filterOption } =
                          filter;
                        // console.log(columnName);
                        const cellValue = (row[columnName] || '')
                          .toString()
                          .toLowerCase();
                        //console.log(cellValue);
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
