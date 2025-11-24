import { Button, Card, Tooltip } from 'components/ui';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { TbGridDots } from 'react-icons/tb';
import { RiDraggable } from 'react-icons/ri';
import { MdOutlineClose } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';
import ReportsTableContext from 'views/Controls/ReportsTable/context/ReportsTableContext';
import {
  getMissingObjectsInSubJSONArray,
  isJSONArrayEqual,
  openNotification,
} from 'views/Controls/GLOBALFUNACTION';
import { apiPOSTColumnSetting } from 'services/ControlsService';
import { useSelector } from 'react-redux';

/* CONSTANTS */
const GRAY_500 = 'rgb(107 114 128)';

function ManageColumnsDropDown({ managedColumns, setManagedColumns }) {
  /* REDUX */
  const token = useSelector((state) => state.auth.session.token);

  /* CONTEXT */
  const { tableName, fetchedColumnSetting, originalTableColumns } =
    useContext(ReportsTableContext);

  /* STATES */
  const [draggableColumns, setDraggableColumns] = useState([]);
  const [ogDraggableColumns, setOgDraggableColumns] = useState([]);
  const [removedColumns, setRemovedColumns] = useState([]);
  const [ogRemovedColumns, setOgRemovedColumns] = useState([]);
  const [showManageColDropDown, setShowManageColDropDown] = useState(false);
  const [showAddColumnsDropDown, setShowAddColumnsDropDown] = useState(false);

  /* HOOKS */
  const dropdownRef = useRef(null);

  /* USE EFFECTS */
  useEffect(() => {
    try {
      if (fetchedColumnSetting.length === 0) {
        setManagedColumns(Object.assign([], originalTableColumns));
        const draggableColumns = getDraggableColumns(originalTableColumns);
        setDraggableColumns([...draggableColumns]);
        setOgDraggableColumns([...draggableColumns]);
      } else {
        const { visibleColumns, removedColumns } =
          getColumnsFromFetchedColumnSetting(fetchedColumnSetting);
        setManagedColumns(visibleColumns);
        const draggableColumns = getDraggableColumns(visibleColumns);
        setDraggableColumns([...draggableColumns]);
        setOgDraggableColumns([...draggableColumns]);
        const newRemovedColumns = getDraggableColumns(removedColumns);
        setRemovedColumns([...newRemovedColumns]);
        setOgRemovedColumns([...newRemovedColumns]);
      }
    } catch (error) {
      console.error(error);
    }
  }, [originalTableColumns, fetchedColumnSetting]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDraggableColumns([...ogDraggableColumns]);
        setRemovedColumns([...ogRemovedColumns]);
        setShowManageColDropDown(false);
        setShowAddColumnsDropDown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef, ogDraggableColumns, ogRemovedColumns]);

  /* EVENT HANDLERS */
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const newItems = reorderColumns(
      draggableColumns,
      result.source.index,
      result.destination.index,
    );
    setDraggableColumns(newItems);
  };

  const handleHeaderChange = (event, column) => {
    try {
      const newDraggableColumns = draggableColumns.map((col) => {
        if (col.id === column.id) {
          return {
            ...col,
            content: event.target.innerText,
          };
        }
        return col;
      });
      setDraggableColumns(newDraggableColumns);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.target.blur();
    }
  };

  const handleRemoveColumn = (column) => {
    try {
      const newColumns = draggableColumns.filter((col) => col.id !== column.id);
      setDraggableColumns(newColumns);
      setRemovedColumns((oldState) => {
        return [...oldState, column];
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleResetColumns = () => {
    try {
      setDraggableColumns(getDraggableColumns(originalTableColumns));
      setRemovedColumns([]);
      setShowAddColumnsDropDown(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleApplyColumns = () => {
    try {
      const managedColumns = draggableColumns.map((column) => {
        const translatedColumn = {
          accessorKey: column.id,
          header: column.content,
        };
        if (column.id === 'action') {
          translatedColumn.actions = column.actions;
        }
        return translatedColumn;
      });
      setManagedColumns(managedColumns);
      setShowManageColDropDown(false);
      setShowAddColumnsDropDown(false);
      persistColumnSettingInDB();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddColumn = (column) => {
    try {
      const newColumns = [...draggableColumns];
      newColumns.push(column);
      setDraggableColumns(newColumns);
      setRemovedColumns((oldState) => {
        return oldState.filter((col) => col.id !== column.id);
      });
    } catch (error) {
      console.error(error);
    }
  };

  /* HELPER FUNCTIONS */
  const getColumnsFromFetchedColumnSetting = (columnSetting) => {
    try {
      const sortedColumnSetting = columnSetting.sort(
        (a, b) => a.SequenceNo - b.SequenceNo,
      );
      const visibleColumns = [],
        removedColumns = [];
      sortedColumnSetting.forEach((columnSetting) => {
        // get visible and removed columns
        const visibleColumn = originalTableColumns.filter((originalColumn) => {
          if (
            typeof originalColumn.accessorKey === 'string' &&
            originalColumn.accessorKey !== ''
          ) {
            if (
              originalColumn.accessorKey === columnSetting.ColumnName &&
              columnSetting.IsVisible === 1
            ) {
              return true;
            }
          }
          return false;
        })[0];
        if (visibleColumn) {
          visibleColumns.push(visibleColumn);
        } else {
          const removedOgColumn = originalTableColumns.filter(
            (column) => column.accessorKey === columnSetting.ColumnName,
          )[0];
          removedColumns.push(removedOgColumn);
        }
      });
      return { visibleColumns, removedColumns };
    } catch (error) {
      throw error;
    }
  };

  function getDraggableColumns(originalTableColumns) {
    try {
      let initialColumns = [];
      originalTableColumns.forEach((column) => {
        if (column.header) {
          const initialColumn = {
            id: column.accessorKey,
            content: column.header,
          };
          if (column.accessorKey === 'action') {
            initialColumn.actions = column.actions;
          }
          initialColumns.push(initialColumn);
        }
      });
      return initialColumns;
    } catch (error) {
      throw error;
    }
  }

  const reorderColumns = (list, startIndex, endIndex) => {
    try {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const isColumnsManaged = () => {
    try {
      return isJSONArrayEqual(managedColumns, originalTableColumns)
        ? false
        : true;
    } catch (error) {
      console.error(error);
    }
  };

  const persistColumnSettingInDB = async () => {
    try {
      if (tableName === '') {
        console.error(
          `"tableName" prop in "ReportsTable" component cannot be empty.`,
        );
        return;
      }
      if (!tableName) {
        console.error(
          `"tableName" prop in "ReportsTable" component cannot be null or undefined.`,
        );
        return;
      }
      let data = draggableColumns.map((column, index) => {
        return {
          ScreenName: tableName,
          Header: column.content,
          ColumnName: column.id,
          ColumnWidht: 0,
          SequenceNo: index,
          IsVisible: 1,
        };
      });
      let index = draggableColumns.length;
      removedColumns.forEach((column) => {
        data.push({
          ScreenName: tableName,
          Header: column.content,
          ColumnName: column.id,
          ColumnWidht: 0,
          SequenceNo: index,
          IsVisible: 0,
        });
        index++;
      });
      try {
        const response = await apiPOSTColumnSetting(data);
        if (response.status !== 200) {
          openNotification(
            'danger',
            `Something went wrong while saving column settings. Server responded with status code ${response.status}`,
          );
        }
      } catch (error) {
        openNotification(
          'danger',
          'Something went wrong while saving column settings',
        );
        console.error(error);
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="relative">
      <Button
        size="sm"
        icon={<TbGridDots />}
        onClick={() => setShowManageColDropDown(true)}
        variant={isColumnsManaged() ? 'twoTone' : ''}
      >
        Manage Columns
      </Button>
      {showManageColDropDown && (
        <>
          <Card
            bordered={false}
            className="!bg-gray-700 text-white mt-2 absolute left-1/2 top-full z-[1]"
            bodyClass="p-3"
            style={{ boxShadow: '#000000cc 0px 0px 10px', minWidth: '14rem' }}
            ref={dropdownRef}
          >
            <div className="mb-2 border-b border-b-gray-600 pb-1 flex justify-between items-center">
              <p className="text-sm font-semibold">Columns</p>
              <Tooltip title="Add column">
                <Button
                  icon={<IoMdAdd />}
                  shape="circle"
                  size="xs"
                  onClick={() => setShowAddColumnsDropDown(true)}
                />
              </Tooltip>
            </div>
            <div className="h-[30vh] overflow-y-auto overflow-x-hidden">
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {draggableColumns.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="border-b border-b-gray-600 py-1 flex items-center justify-between text-gray-300"
                            >
                              <div className="flex gap-1 items-center text-sm">
                                <RiDraggable />
                                <div className="relative group">
                                  <span
                                    contentEditable="true"
                                    spellCheck="false"
                                    className="px-1.5 py-0.5 hover:cursor-pointer focus:outline focus:outline-teal-500 focus:outline-[1.5px] rounded"
                                    style={{ textWrap: 'nowrap' }}
                                    onBlur={(event) =>
                                      handleHeaderChange(event, item)
                                    }
                                    onKeyDown={handleKeyDown}
                                    suppressContentEditableWarning={true}
                                  >
                                    {item.content}
                                  </span>
                                  <div
                                    className="absolute top-3/4 left-1/2 transform -translate-x-1/3 mt-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg z-[50]"
                                    style={{ textWrap: 'nowrap' }}
                                  >
                                    Click to edit header
                                  </div>
                                </div>
                              </div>
                              <Button
                                icon={<MdOutlineClose />}
                                shape="circle"
                                size="xs"
                                onClick={() => handleRemoveColumn(item)}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
            <div className="mt-3 flex justify-between">
              <Button
                className="w-max font-normal"
                size="sm"
                style={{
                  borderColor: GRAY_500,
                  fontSize: '0.8rem',
                  lineHeight: '1rem',
                }}
                onClick={handleResetColumns}
              >
                Reset
              </Button>
              <Button
                className="w-max font-normal"
                size="sm"
                variant="twoTone"
                style={{ fontSize: '0.8rem', lineHeight: '1rem' }}
                onClick={handleApplyColumns}
              >
                Apply
              </Button>
            </div>
            {/* Add Columns DropDown */}
            {showAddColumnsDropDown && (
              <Card
                bordered={false}
                className="!bg-gray-700 text-white ml-2 absolute left-full top-0 z-[1] w-56"
                bodyClass="p-3"
              >
                <div className="mb-2 border-b border-b-gray-600 pb-1 flex justify-between items-center">
                  <p className="text-sm font-semibold">Add</p>
                  <Tooltip title="Close">
                    <Button
                      icon={<MdOutlineClose />}
                      shape="circle"
                      size="xs"
                      onClick={() => setShowAddColumnsDropDown(false)}
                    />
                  </Tooltip>
                </div>
                <div className="h-[30vh] overflow-auto">
                  {removedColumns.map((column) => (
                    <div className="border-b border-b-gray-600 py-1 flex items-center justify-between text-gray-300">
                      <div className="flex gap-1 items-center text-sm">
                        <RiDraggable />
                        {column.content}
                      </div>
                      <Button
                        icon={<IoMdAdd />}
                        shape="circle"
                        size="xs"
                        onClick={() => handleAddColumn(column)}
                      />
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </Card>
        </>
      )}
    </div>
  );
}

export default ManageColumnsDropDown;
