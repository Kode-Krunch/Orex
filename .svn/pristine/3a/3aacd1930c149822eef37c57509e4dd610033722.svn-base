import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { Button, Card, Tooltip } from 'components/ui';
import React, { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { MdOutlineClose } from 'react-icons/md';
import { RiDraggable } from 'react-icons/ri';
import { TbArrowAutofitWidth } from 'react-icons/tb';
import { GRAY_500 } from 'views/Controls/Dashboard/constants/tw_colors';
import {
  getClassNamesForHeaderButtons,
  getColumns,
  handleAddColumn,
  handleApply,
  handleHeaderChange,
  handleKeyDown,
  handleRemoveColumn,
  handleReset,
  onDragEnd,
} from './utils';
import { useSelector } from 'react-redux';
import ColumnWidthControl from './components/ColumnWidthControl';

function ManageColumns({
  dropdownRef,
  position,
  tableName,
  managedColumns,
  setManagedColumns,
  setActiveFeatures,
  maintainScrolledOffsetOfTablesFn,
}) {
  /* REDUX */
  const token = useSelector((state) => state.auth.session.token);

  /* STATES */
  const [columnsState, setColumnsState] = useState({
    draggableColumns: getColumns('draggable', managedColumns),
    removedColumns: getColumns('removed', managedColumns),
  });
  const [showColumnWidthControl, setShowColumnWidthControl] = useState(false);
  const [showAddColumnsDropDown, setShowAddColumnsDropDown] = useState(false);

  return (
    <Card
      className={`!bg-gray-700 text-white mt-2 absolute ${
        position ? position : 'left-1/2'
      } top-full z-[100]`}
      bodyClass="p-3 pt-1"
      style={{ boxShadow: '#000000cc 0px 0px 10px', minWidth: '14rem' }}
      ref={dropdownRef}
    >
      <div className="mb-1.5 border-b border-b-gray-600 pb-1.5 flex justify-between items-center">
        <p className="text-sm font-semibold">Columns</p>
        <div className="flex gap-1">
          <Tooltip
            title={
              showColumnWidthControl ? 'Close column resize' : 'Resize column'
            }
          >
            <Button
              icon={<TbArrowAutofitWidth className="text-lg" />}
              size="xs"
              color="gray-600"
              className={` transition-all ${getClassNamesForHeaderButtons(
                showColumnWidthControl,
              )}`}
              onClick={() => setShowColumnWidthControl(!showColumnWidthControl)}
            />
          </Tooltip>
          <Tooltip title="Add column">
            <Button
              icon={<IoMdAdd className="text-lg" />}
              className={`transition-all ${getClassNamesForHeaderButtons(
                showAddColumnsDropDown,
              )}`}
              size="xs"
              onClick={() => setShowAddColumnsDropDown(true)}
            />
          </Tooltip>
        </div>
      </div>
      <div className="h-[30vh] overflow-y-auto overflow-x-hidden">
        <DragDropContext
          onDragEnd={(result) =>
            onDragEnd(result, columnsState, setColumnsState)
          }
        >
          <Droppable droppableId="manage-columns-droppable-area">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {columnsState.draggableColumns.map((column, index) => (
                  <Draggable
                    key={column.id}
                    draggableId={column.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="border-b border-b-gray-600 py-1 flex items-center justify-between gap-6 text-gray-300"
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
                                handleHeaderChange(
                                  event,
                                  column,
                                  columnsState,
                                  setColumnsState,
                                )
                              }
                              onKeyDown={handleKeyDown}
                              suppressContentEditableWarning={true}
                            >
                              {column.header}
                            </span>
                            <div
                              className="absolute top-3/4 left-1/2 transform -translate-x-1/3 mt-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg z-[50]"
                              style={{ textWrap: 'nowrap' }}
                            >
                              Click to edit header
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {showColumnWidthControl && (
                            <ColumnWidthControl
                              column={column}
                              columnsState={columnsState}
                              setColumnsState={setColumnsState}
                              setManagedColumns={setManagedColumns}
                              maintainScrolledOffsetOfTablesFn={
                                maintainScrolledOffsetOfTablesFn
                              }
                            />
                          )}
                          <Button
                            icon={<MdOutlineClose />}
                            shape="circle"
                            size="xs"
                            onClick={() =>
                              handleRemoveColumn(
                                column,
                                columnsState,
                                setColumnsState,
                              )
                            }
                          />
                        </div>
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
          onClick={() => handleReset(managedColumns, setColumnsState)}
        >
          Reset
        </Button>
        <Button
          className="w-max font-normal"
          size="sm"
          variant="twoTone"
          style={{ fontSize: '0.8rem', lineHeight: '1rem' }}
          onClick={async () => {
            await handleApply(
              tableName,
              columnsState,
              managedColumns,
              setManagedColumns,
              setActiveFeatures,
              token,
              true,
            );
          }}
        >
          Apply
        </Button>
      </div>
      {/* Add Columns DropDown */}
      {showAddColumnsDropDown && (
        <Card
          bordered={false}
          className="!bg-gray-700 text-white ml-2 absolute left-full top-0 z-[1]"
          bodyClass="p-3 pt-1"
          style={{ boxShadow: '#000000cc 0px 0px 10px', minWidth: '14rem' }}
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
          <div className="h-[30vh] overflow-y-auto overflow-x-hidden">
            {columnsState.removedColumns.map((column) => (
              <div
                key={column.id}
                className="border-b border-b-gray-600 py-1 flex items-center justify-between gap-2 text-gray-300"
              >
                <div className="flex gap-1 items-center text-sm">
                  <RiDraggable />
                  {column.header}
                </div>
                <Button
                  icon={<IoMdAdd />}
                  shape="circle"
                  size="xs"
                  onClick={() =>
                    handleAddColumn(column, columnsState, setColumnsState)
                  }
                />
              </div>
            ))}
          </div>
        </Card>
      )}
    </Card>
  );
}

export default ManageColumns;
