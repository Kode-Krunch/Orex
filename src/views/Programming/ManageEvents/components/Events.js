import { Button, Card, Tooltip } from 'components/ui';
import React, { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { IoIosList } from 'react-icons/io';
import { MdOutlineClose } from 'react-icons/md';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import { entityTypeCodeEnum } from '../enum';
import WarningDialog from 'views/Controls/WarningDialog';

function Events({
  groupWiseSelectedEntities,
  setGroupWiseSelectedEntities,
  selectedEntityType,
  entityTypeCode,
  setIsSelectEntityDialogOpen,
  setSelectedEventGroup,
  gridCols = 4,
}) {
  /* STATES */
  const [deletingGroupName, setDeletingGroupName] = useState('');
  const [isDeleteGroupDialogOpen, setIsDeleteGroupDialogOpen] = useState(false);

  /* EVENT HANDLERS */
  const handleDeleteGroupClick = (eventGroup) => {
    try {
      setDeletingGroupName(eventGroup);
      setIsDeleteGroupDialogOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveEntity = (eventGroup, index) => {
    try {
      const newGroupWiseSelectedEntities = { ...groupWiseSelectedEntities };
      newGroupWiseSelectedEntities[eventGroup].splice(index, 1);
      if (newGroupWiseSelectedEntities[eventGroup].length === 0) {
        delete newGroupWiseSelectedEntities[eventGroup];
      }
      setGroupWiseSelectedEntities(newGroupWiseSelectedEntities);
    } catch (error) {
      openNotification(
        'danger',
        `Something went wrong. Unable to remove ${selectedEntityType}`,
      );
    }
  };

  /* HELPER FUNCTIONS */
  const deleteGroup = (eventGroup) => {
    try {
      let newGroupWiseSelectedEntities = { ...groupWiseSelectedEntities };
      delete newGroupWiseSelectedEntities[eventGroup];
      setGroupWiseSelectedEntities(newGroupWiseSelectedEntities);
      setDeletingGroupName('');
      setIsDeleteGroupDialogOpen(false);
    } catch (error) {
      openNotification(
        'danger',
        'Something went wrong. Unable to delete group',
      );
    }
  };

  return (
    <>
      {Object.keys(groupWiseSelectedEntities).length === 0 ? (
        <Card
          className="h-full"
          bodyClass="h-full flex justify-center items-center"
        >
          No {selectedEntityType} to show
        </Card>
      ) : (
        <div className={`grid grid-cols-${gridCols} gap-4`}>
          {Object.keys(groupWiseSelectedEntities).map((eventGroup) => (
            <>
              <Card
                key={eventGroup}
                className="h-[40vh]"
                bodyClass="h-full p-3 flex flex-col"
              >
                <div className="flex justify-between items-center">
                  <p className="text-slate-200 text-base font-semibold">
                    {eventGroup}
                  </p>
                  <div className="flex gap-2">
                    <Tooltip title="Delete Group">
                      <Button
                        size="sm"
                        icon={<FiTrash2 className="opacity-85" />}
                        onClick={() => handleDeleteGroupClick(eventGroup)}
                      />
                    </Tooltip>
                    <Button
                      variant="twoTone"
                      size="sm"
                      icon={<IoIosList />}
                      onClick={() => {
                        setIsSelectEntityDialogOpen(true);
                        setSelectedEventGroup(eventGroup);
                      }}
                    >
                      Action
                    </Button>
                  </div>
                </div>
                <div className="my-3 grow overflow-auto">
                  {groupWiseSelectedEntities[eventGroup].map(
                    (entity, index) => (
                      <div
                        className={`py-0.5 px-1.5 flex justify-between items-center border-b-[0.5px] border-b-gray-700 ${
                          index === 0
                            ? 'border-t-[0.5px] border-t-gray-700'
                            : ''
                        }`}
                        key={index}
                      >
                        <div className="flex items-center gap-2">
                          <img
                            alt="Team Logo"
                            src={entity.Team_Image}
                            style={{
                              height: '25px',
                              width: '25px',
                              borderRadius: '50%',
                            }}
                          />
                          <div>
                            {entityTypeCode === entityTypeCodeEnum.CONTENT
                              ? entity.ContentName
                              : entity.TeamName}
                          </div>
                        </div>
                        <Tooltip title="Remove">
                          <Button
                            variant="plain"
                            shape="circle"
                            size="sm"
                            icon={<MdOutlineClose />}
                            onClick={() =>
                              handleRemoveEntity(eventGroup, index)
                            }
                          ></Button>
                        </Tooltip>
                      </div>
                    ),
                  )}
                </div>
              </Card>
            </>
          ))}
        </div>
      )}
      <WarningDialog
        isDialogOpen={isDeleteGroupDialogOpen}
        title="Delete Group"
        description={`Are you sure you want delete ${
          deletingGroupName ? deletingGroupName : 'this group'
        }?`}
        submitButtonTitle="Delete"
        handleDialogSubmit={() => deleteGroup(deletingGroupName)}
        handleDialogClose={() => setIsDeleteGroupDialogOpen(false)}
      />
    </>
  );
}

export default Events;
