import { Accordion, AccordionTab } from 'primereact/accordion';
import React, { useContext, useEffect } from 'react';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import MainTable from '../MainTable/MainTable';
import './groupedTable.css';
import ReportsTableContext from '../../context/ReportsTableContext';

function GroupedTable({
  managedColumns,
  setManagedColumns,
  setSelectedRows,
  paginationState,
  setPaginationState,
  rowSelection,
  setRowSelection,
}) {
  /* CONTEXTS */
  const {
    groupedTableData,
    originalTableColumns,
    toolbarOptions,
    setToolbarOptions,
    setIsGroupedTableAccordionTabOpen,
  } = useContext(ReportsTableContext);

  /* USE EFFECTS */
  useEffect(() => {
    try {
      setToolbarOptions({ ...toolbarOptions, groupBy: false });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const renderGroupedTable = (groupedTableData) => {
    try {
      if (groupedTableData.type === 'group') {
        return (
          <Accordion
            onTabOpen={() => setIsGroupedTableAccordionTabOpen(true)}
            onTabClose={() => setIsGroupedTableAccordionTabOpen(false)}
            activeIndex={0}
          >
            {groupedTableData.data.map((curGroup, index) => {
              return (
                <AccordionTab
                  header={`${curGroup.name} (${curGroup.data.data.length})`}
                  key={`${curGroup.name}-${index}`}
                  className="dark:!bg-[#1f2639] !bg-[#fff]"

                >
                  {curGroup.data.type === 'group' ? (
                    renderGroupedTable(curGroup.data)
                  ) : (
                    <div
                      style={{
                        minHeight: '20rem',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <MainTable
                        tableData={curGroup.data.data}
                        originalColumns={originalTableColumns}
                        managedColumns={managedColumns}
                        setManagedColumns={setManagedColumns}
                        exportFileName={curGroup.name}
                        setSelectedRows={setSelectedRows}
                        paginationState={paginationState}
                        setPaginationState={setPaginationState}
                        rowSelection={rowSelection}
                        setRowSelection={setRowSelection}
                      />
                    </div>
                  )}
                </AccordionTab>
              );
            })}
          </Accordion>
        );
      } else {
        throw `Invalid groupedTableData.type - The type should be of "group" but got ${groupedTableData.type}.`;
      }
    } catch (error) {
      openNotification('danger', 'Something went wrong');
      console.error(error);
    }
  };

  return (
    <>
      {groupedTableData.type === 'group' ? (
        renderGroupedTable(groupedTableData)
      ) : (
        <div className="h-full justify-center items-center">
          Something went wrong. Unable to show grouped table.
        </div>
      )}
    </>
  );
}

export default GroupedTable;
