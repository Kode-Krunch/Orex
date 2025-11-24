import { Button, Select, Tooltip } from 'components/ui';
import React, { useContext, useEffect } from 'react';
import { FiLayers } from 'react-icons/fi';
import { reportsTableEnum } from '../enums/ReportsTableEnums';
import { RiTableLine } from 'react-icons/ri';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import ReportsTableContext from '../context/ReportsTableContext';

function Toolbar() {
  /* CONTEXTS */
  const {
    formattedTableData,
    groupByOptions,
    selectedGroups,
    setSelectedGroups,
    setGroupedTableData,
    curView,
    setCurView,
    resetGroupedTableData,
  } = useContext(ReportsTableContext);

  /* USE EFFECTS */
  useEffect(() => {
    try {
      if (selectedGroups.length === 0) {
        setCurView(reportsTableEnum.currentView.ORIGINAL);
        resetGroupedTableData();
      } else {
        setCurView(reportsTableEnum.currentView.GROUPED);
        updateGroupedTableData(selectedGroups, formattedTableData);
      }
    } catch (error) {
      console.error(error);
    }
  }, [selectedGroups, formattedTableData]);

  /* EVENT HANDLERS */
  const handleGroupbySelection = (selectedGroups) => {
    try {
      setSelectedGroups(selectedGroups);
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewChange = () => {
    try {
      setCurView((prev) =>
        prev === reportsTableEnum.currentView.ORIGINAL
          ? reportsTableEnum.currentView.GROUPED
          : reportsTableEnum.currentView.ORIGINAL,
      );
    } catch (error) {
      openNotification('danger', 'Unable to change view');
      console.error(error);
    }
  };

  /* HELPER FUNCTIONS */
  const getGroupedTableData = (columnName, formattedTableData) => {
    /* This function takes table data and groups them into group of sub-tables ,
       where each group contains a table with common data for given column name. */
    try {
      let groupList = [];
      const groupedTables = [];

      formattedTableData.forEach((row) => {
        const currentGroup = row[columnName];

        if (!groupList.includes(currentGroup)) {
          // if table not created for current group
          const newGroup = {
            name: currentGroup,
            column: columnName,
            data: {
              type: 'table',
              data: [row],
            },
          };

          groupedTables.push(newGroup);
          groupList.push(currentGroup);
        } else {
          // search table for current group and add row to the table.
          groupedTables.forEach((group) => {
            if (group.name === currentGroup) {
              group.data.data.push(row);
            }
          });
        }
      });

      return groupedTables;
    } catch (error) {
      console.error(error);
    }
  };

  const getNestedGroupedTableData = (columnName, group) => {
    try {
      if (group.data.type === 'table') {
        // If given group contains table, update table data with sub-grouped tables
        const groupbyTableData = getGroupedTableData(
          columnName,
          group.data.data,
        );
        group.data.type = 'group';
        group.data.data = groupbyTableData;
      } else {
        // Go one level nesting until group that contains table is found.
        group.data.data.forEach((group) => {
          getNestedGroupedTableData(columnName, group);
        });
      }
      // return updated nestedGroupedTableData;
      return group;
    } catch (error) {
      console.error(error);
    }
  };

  const updateGroupedTableData = (selectedGroups, formattedTableData) => {
    try {
      let groupedTables = [];

      // If any grouping is selected
      selectedGroups.forEach((group, index) => {
        const columnName = group.value;
        if (index === 0) {
          // Grouped tables not created
          groupedTables = getGroupedTableData(columnName, formattedTableData);
        } else {
          // Create grouped tables for sub-grouped tables
          groupedTables.forEach((curGroup, index) => {
            const subGroupedTable = getNestedGroupedTableData(
              columnName,
              curGroup,
            );
            groupedTables[index] = subGroupedTable;
          });
        }
      });

      // Update grouped tables in state
      setGroupedTableData((oldState) => {
        const newState = Object.assign({}, oldState);
        newState.data = groupedTables;
        return newState;
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <Select
        isMulti
        placeholder="Group By"
        size="sm"
        className="col-span-3 min-w-[25%] max-w-[30%]"
        options={groupByOptions}
        onChange={handleGroupbySelection}
        value={selectedGroups}
      />
      {curView === reportsTableEnum.currentView.ORIGINAL ? (
        <Tooltip title="View Grouped Table">
          <Button
            disabled={selectedGroups.length === 0}
            icon={<FiLayers />}
            onClick={handleViewChange}
            size="sm"
          >
            Grouped Table
          </Button>
        </Tooltip>
      ) : (
        <Tooltip title="View Original Table">
          <Button icon={<RiTableLine />} onClick={handleViewChange} size="sm">
            Original Table
          </Button>
        </Tooltip>
      )}
    </div>
  );
}

export default Toolbar;
