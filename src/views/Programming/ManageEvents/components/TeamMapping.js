import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  DatePicker,
  Dialog,
  Input,
  InputGroup,
  Select,
  Tooltip,
} from 'components/ui';
import {
  EMERALD_500_50,
  GRAY_300,
} from 'views/Controls/Dashboard/constants/tw_colors';
import {
  getEllipsedText,
  getUniqueObjects,
  isJSONArrayEqual,
  openNotification,
} from 'views/Controls/GLOBALFUNACTION';
import {
  apiTeamMappingCreate,
  apiTeamMappingDelete,
  apigeneventcontent,
} from 'services/SchedulingService';
import { MdOutlineEdit } from 'react-icons/md';
import WarningDialog from 'views/Controls/WarningDialog';
import { apiCallstoreprocedure } from 'services/CommonService';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable';
import { apiGetEventMasterDetails } from 'services/ProgrammingService';
import { IoMdTrash } from 'react-icons/io';
import {
  AiOutlinePlusCircle,
  AiOutlineSave,
  AiOutlineTrophy,
} from 'react-icons/ai';
import { VscWand } from 'react-icons/vsc';
import cloneDeep from 'lodash/cloneDeep';
import './styles.css';
import HeaderExtra from 'views/Controls/HeaderExtra';
import { FiTrash2 } from 'react-icons/fi';
import { format } from 'date-fns';
import { convertDateToYMD } from 'components/validators';
import SelectXs from 'views/Controls/SelectXs/SelectXs';
import AddEditMatchDialog from './AddEditMatchDialog';

/* CONSTANT */
const TOOLBAR_OPTIONS = { groupBy: true, manageColumns: false };

function TeamMapping({
  channel,
  resetPage,
  eventDetails,
  setShowLoader,
  isHeaderVisible = true,
}) {
  /* STATES */
  const [originalTeamMappings, setOriginalTeamMappings] = useState([]);
  const [teamMappings, setTeamMappings] = useState([]);
  const [enableToEdit, setEnableToEdit] = useState(false);
  const [eventGroupOptions, setEventGroupOptions] = useState([]);
  const [team1SelectorOptions, setTeam1SelectorOptions] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [managedColumns, setManagedColumns] = useState([]);
  const [isAddNewMatchClicked, setIsAddNewMatchClicked] = useState(false);
  const [isAddEditMatchDialogOpen, setIsAddEditMatchDialogOpen] =
    useState(false);
  const [isDeleteMatchDialogOpen, setIsDeleteMatchDialogOpen] = useState(false);
  const [isResetChangesDialogOpen, setIsResetChangesDialogOpen] =
    useState(false);
  const [isGenerateMatchesDialogOpen, setIsGenerateMatchesDialogOpen] =
    useState(false);
  const [stickyFooterBtnState, setStickyFooterState] = useState({
    save: false,
    reset: false,
    generateProgram: false,
  });
  const [isDiscardDialogOpen, setIsDiscardDialogOpen] = useState(false);

  /* TABLE COLUMNS */
  const TABLE_COLUMNS = [
    {
      header: 'Group',
      accessorKey: 'GroupName',
    },
    {
      header: 'Match',
      accessorKey: 'TeamName1',
      cell: ({ row }) => (
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <img
              src={row.original.Team_Image1}
              style={{ height: '25px', width: 'auto' }}
            ></img>
            {getEllipsedText(row?.original?.TeamName1, 10)}
          </div>
          VS
          <div className="flex items-center gap-2">
            <img
              src={row.original.Team_Image2}
              style={{ height: '25px', width: 'auto' }}
            ></img>
            {getEllipsedText(row?.original?.TeamName2, 10)}
          </div>
        </div>
      ),
      options: {
        header: {
          style: { width: '30%' },
        },
      },
    },
    {
      header: 'Schedule Date',
      id: 'ScheduleDate',
      accessorKey: 'ScheduleDate',
      cell: ({ row, table }) => (
        <DatePicker
          placeholder="Pick a date"
          size="sm"
          dayClassName="!text-[0.8rem]"
          value={row.original.ScheduleDate}
          disabled={enableToEdit} // Disable when enableToEdit is true
          onChange={async (date) => {
            let formattedOptions = [];
            if (date) {
              const response = await apiCallstoreprocedure(
                'USP_GetFPCContent',
                {
                  Channelcode: channel.ChannelCode,
                  Locationcode: channel.LocationCode,
                  TelecastDate: convertDateToYMD(date),
                  ContentCode: eventDetails?.ContentMaster?.ContentCode,
                },
              );
              if (Array.isArray(response.data)) {
                const usedTimes = table
                  .getRowModel()
                  .rows.map((r) => r.original)
                  .filter(
                    (item, index) =>
                      index !== row.index &&
                      item.ScheduleDate &&
                      convertDateToYMD(item.ScheduleDate) ===
                        convertDateToYMD(date),
                  )
                  .map((item) => item.ScheduleTime?.value)
                  .filter(Boolean);
                formattedOptions = response.data
                  .map((option) => ({
                    value: option.DisplayType,
                    label: option.DisplayType,
                  }))
                  .filter((option) => !usedTimes.includes(option.value));
                if (formattedOptions.length === 0) {
                  openNotification(
                    'danger',
                    'No time slot available for selected date',
                  );
                  return;
                }
              }
            }
            setTeamMappings((prev) => {
              let newTeamMappings = [...prev];
              newTeamMappings[row.index] = {
                ...newTeamMappings[row.index],
                ScheduleDate: date,
                schTimeOptions: formattedOptions,
                ScheduleTime:
                  formattedOptions.length === 1 ? formattedOptions[0] : null,
              };
              return newTeamMappings;
            });
          }}
          className={`${
            row.original.ScheduleTime && !row.original.ScheduleDate
              ? '!border-2 !border-red-500 !rounded-lg'
              : ''
          }`}
        />
      ),
      options: {
        header: { filter: false, style: { width: '15%' } },
        cell: { style: { paddingBlock: 0 } },
      },
    },
    {
      header: 'Schedule Time',
      id: 'ScheduleTime',
      accessorKey: 'ScheduleTime',
      cell: ({ row, table }) => (
        <SelectXs
          placeholder="Please Select"
          size="xs"
          isClearable={true}
          options={row.original.schTimeOptions || []}
          value={row.original.ScheduleTime || null}
          disabled={enableToEdit} // Disable when enableToEdit is true
          onChange={(selectedOption) => {
            if (selectedOption) {
              const isTimeUsed = table
                .getRowModel()
                .rows.map((r) => r.original)
                .some(
                  (item, index) =>
                    index !== row.index &&
                    item.ScheduleDate &&
                    row.original.ScheduleDate &&
                    convertDateToYMD(item.ScheduleDate) ===
                      convertDateToYMD(row.original.ScheduleDate) &&
                    item.ScheduleTime?.value === selectedOption.value,
                );
              if (isTimeUsed) {
                openNotification(
                  'danger',
                  `The time ${selectedOption.label} is already used for this date. Please select a different time.`,
                );
                return;
              }
            }
            setTeamMappings((prev) => {
              let newTeamMappings = [...prev];
              newTeamMappings[row.index].ScheduleTime = selectedOption;
              return newTeamMappings;
            });
          }}
          className={`!text-[0.8rem] ${
            row.original.ScheduleDate && !row.original.ScheduleTime
              ? '!border-2 !border-red-500 !rounded-lg'
              : ''
          }`}
        />
      ),
      options: {
        header: { filter: false, style: { width: '15%' } },
        cell: { style: { paddingBlock: 0 } },
      },
    },
    {
      header: 'Action',
      accessorKey: 'action',
      actions: [
        {
          action: (rowIndex, rowData) => (
            <Tooltip title="Edit Match" key={rowIndex} wrapperClass="my-1">
              <Button
                size="xs"
                icon={<MdOutlineEdit color={GRAY_300} />}
                onClick={() => handleRowEditClick(rowIndex, rowData)}
              />
            </Tooltip>
          ),
        },
        {
          action: (rowIndex, rowData) => (
            <Tooltip title="Remove Match" key={rowIndex} wrapperClass="my-1">
              <Button
                size="xs"
                icon={<IoMdTrash color={GRAY_300} />}
                onClick={() => handleRowDeleteClick(rowIndex, rowData)}
              />
            </Tooltip>
          ),
        },
      ],
    },
  ];

  /* USE EFFECTS */
  useEffect(() => {
    (async () => {
      if (eventDetails) {
        setGroupSelectorFromAPI();
        setTeamMappingsFromSP();
      }
    })();
  }, [eventDetails]);

  useEffect(() => {
    if (isJSONArrayEqual(teamMappings, originalTeamMappings)) {
      setStickyFooterState((oldState) => ({
        ...oldState,
        save: false,
        reset: false,
        generateProgram: true,
      }));
    } else {
      setStickyFooterState((oldState) => ({
        ...oldState,
        save: true,
        reset: true,
        generateProgram: false,
      }));
    }
  }, [teamMappings, originalTeamMappings]);

  // Debug useEffect to ensure enableToEdit updates trigger re-render
  useEffect(() => {
    if (enableToEdit) {
      openNotification(
        'warning',
        'Fields are disabled. Please generate program to enable editing.',
      );
    }
  }, [enableToEdit]);

  /* EVENT HANDLERS */

  const handleRowEditClick = (rowIndex, rowData) => {
    try {
      setSelectedRowIndex(rowIndex);
      setSelectedRowData(rowData);
      setIsAddEditMatchDialogOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRowDeleteClick = (rowIndex, rowData) => {
    try {
      setIsDeleteMatchDialogOpen(true);
      setSelectedRowIndex(rowIndex);
      setSelectedRowData(rowData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      setShowLoader(true);
      const updatedTeamMappings = [...teamMappings];
      const deletedRow = updatedTeamMappings.splice(selectedRowIndex, 1)[0];
      const params = {
        EventCode: eventDetails.EventCode,
        GroupCode: deletedRow.GroupCode,
        LocationCode: channel.LocationCode,
        ChannelCode: channel.ChannelCode,
      };
      const response = await apiTeamMappingDelete(params);
      if (response.status === 200) {
        setTeamMappings(updatedTeamMappings);
      } else {
        throw new Error('Deletion failed');
      }
    } catch (error) {
      openNotification('danger', 'Something went wrong while deleting match');
      console.error(error);
    } finally {
      setShowLoader(false);
      handleCloseDeleteDialog();
    }
  };

  const handleCloseDeleteDialog = () => {
    try {
      setSelectedRowIndex(null);
      setSelectedRowData(null);
      setIsDeleteMatchDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveTeamMapping = async () => {
    try {
      if (!isTeamsMappingValid()) {
        openNotification(
          'danger',
          'Some matches have inconsistent date and time. Please make sure to put date and time correctly',
        );
        return;
      }
      setShowLoader(true);
      const data = teamMappings.map((item) => ({
        TeamMappingId: item.TeamMappingId,
        EventCode: eventDetails.EventCode,
        GroupCode: item.GroupCode,
        Team_1: item.Team1 || item.team1,
        Team_2: item.Team2 || item.team2,
        ScheduleDate:
          item.ScheduleDate instanceof Date
            ? format(item.ScheduleDate, 'yyyy-MM-dd')
            : null,
        ScheduleTime: item.ScheduleTime?.label
          ? `${item.ScheduleTime.label}:00:00`
          : null,
        LocationCode: channel.LocationCode,
        ChannelCode: channel.ChannelCode,
        ContentCode:
          item.ScheduleDate instanceof Date && item.ScheduleTime?.label
            ? eventDetails?.ContentMaster?.ContentCode
            : null,
      }));
      const response = await apiTeamMappingCreate(data);
      if (response.status === 200) {
        openNotification('success', 'Data Saved Successfully.');
        resetPage();
      } else {
        openNotification('danger', 'Something went wrong while saving matches');
      }
    } catch (error) {
      openNotification('danger', 'Something went wrong while saving matches');
      setShowLoader(false);
    } finally {
      setShowLoader(false);
    }
  };

  const handleGenerateProgram = async () => {
    try {
      setShowLoader(true);
      const data = teamMappings.map((item) => ({
        ContentCode: eventDetails.ContentMaster.ContentCode,
        ContentName: `${item.TeamName1} vs ${item.TeamName2} ${item.matchType}`,
        EventCode: eventDetails.EventCode,
        IsActive: 1,
        LocationCode: channel.LocationCode,
        ChannelCode: channel.ChannelCode,
      }));
      const resp = await apigeneventcontent(data);
      if (resp.status === 200) {
        openNotification('success', 'Program generated successfully');

        setEnableToEdit(false); // Ensure enableToEdit is false after generating program
        resetPage();
      } else {
        openNotification(
          'danger',
          `Something went wrong while generating program. Server responded with status code ${resp.status}`,
        );
      }
    } catch (error) {
      openNotification(
        'danger',
        'Something went wrong while generating program',
      );
      setShowLoader(false);
    } finally {
      setShowLoader(false);
    }
  };

  const handleResetChanges = () => {
    try {
      setTeamMappings(cloneDeep(originalTeamMappings));
      setIsResetChangesDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  /* HELPER FUNCTIONS */
  const setGroupSelectorFromAPI = async () => {
    try {
      setShowLoader(true);
      const response = await apiGetEventMasterDetails(eventDetails.EventCode);
      if (response.status === 200) {
        const groupOptions = getUniqueObjects(
          response.data.EventDetails,
          'GroupCode',
        ).map((group) => ({
          label: group.GroupName,
          value: group.GroupCode,
        }));
        setEventGroupOptions(groupOptions);
      } else if (response.status === 204) {
        setEventGroupOptions([]);
      } else {
        openNotification(
          'danger',
          `Unable to fetch available groups. Server responded with status code ${response.status}`,
        );
      }
    } catch (error) {
      setShowLoader(false);
      throw error;
    } finally {
      setShowLoader(false);
    }
  };

  const setTeamMappingsFromSP = async () => {
    try {
      setShowLoader(true);
      const response = await apiCallstoreprocedure('USP_Get_ViewMatches', {
        eventcode: eventDetails.EventCode,
        ContentCode: eventDetails.ContentMaster.ContentCode,
      });
      if (response.status === 200) {
        if (response.data.length > 0) {
          const translatedRespData = await translateTeamMappingsRespForFrontend(
            response.data,
          );
          setTeamMappings(cloneDeep(translatedRespData));
          setOriginalTeamMappings(cloneDeep(translatedRespData));
          const team1SelectorOptions =
            getTeam1SelectorOptions(translatedRespData);
          setTeam1SelectorOptions(team1SelectorOptions);
          setEnableToEdit(false); // Ensure fields are editable if matches exist
        } else {
          setTeamMappingsFromGenerateEventMatchesSP();
        }
      } else if (response.status === 204) {
        setTeamMappingsFromGenerateEventMatchesSP();
      } else {
        openNotification(
          'danger',
          `Unable to fetch matches. Server responded with status code ${response.status}`,
        );
      }
    } catch (error) {
      setShowLoader(false);
      throw error;
    } finally {
      setShowLoader(false);
    }
  };

  const getTeam1SelectorOptions = (teamMappings) => {
    try {
      const team1SelectorOptions = new Map();
      teamMappings.forEach((match) => {
        team1SelectorOptions.set(match.Team1, {
          value: match.Team1,
          label: match.TeamName1,
          teamImage: match.Team_Image1,
        });
        team1SelectorOptions.set(match.Team2, {
          value: match.Team2,
          label: match.TeamName2,
          teamImage: match.Team_Image2,
        });
      });
      return Array.from(team1SelectorOptions.values());
    } catch (error) {
      console.error(error);
    }
  };

  const setTeamMappingsFromGenerateEventMatchesSP = async () => {
    try {
      setShowLoader(true);
      const response = await apiCallstoreprocedure('GenrateEventMatches', {
        eventcode: eventDetails.EventCode,
      });
      if (response.status === 200) {
        const translatedRespData = await translateTeamMappingsRespForFrontend(
          response.data,
        );
        setTeamMappings(cloneDeep(translatedRespData));
        setOriginalTeamMappings(cloneDeep(translatedRespData));
        const team1SelectorOptions =
          getTeam1SelectorOptions(translatedRespData);
        setTeam1SelectorOptions(team1SelectorOptions);
        // Set enableToEdit based on TeamMappingId
        setEnableToEdit(response.data[0]?.TeamMappingId == 0);
      } else if (response.status === 204) {
        setTeamMappings([]);
        setOriginalTeamMappings([]);
        setEnableToEdit(true); // No matches, so disable editing
      } else {
        openNotification(
          'danger',
          `Unable to generate matches. Server responded with status code ${response.status}`,
        );
        setEnableToEdit(true);
      }
    } catch (error) {
      setShowLoader(false);
      openNotification('danger', 'Error generating matches: ' + error.message);
      throw error;
    } finally {
      setShowLoader(false);
    }
  };

  const translateTeamMappingsRespForFrontend = async (responseData) => {
    const usedDateTimePairs = new Set();
    return Promise.all(
      responseData.map(async (item, index) => {
        const schDate = item.ScheduleDate ? new Date(item.ScheduleDate) : null;
        let schTime = item.ScheduleTime;
        let schTimeOptions = [];

        if (schDate) {
          const response = await apiCallstoreprocedure('USP_GetFPCContent', {
            Channelcode: channel.ChannelCode,
            Locationcode: channel.LocationCode,
            TelecastDate: convertDateToYMD(schDate),
            ContentCode: eventDetails?.ContentMaster?.ContentCode,
          });
          const usedTimes = responseData
            .filter((_, i) => i < index)
            .filter(
              (prevItem) =>
                prevItem.ScheduleDate &&
                convertDateToYMD(new Date(prevItem.ScheduleDate)) ===
                  convertDateToYMD(schDate),
            )
            .map((prevItem) => prevItem.ScheduleTime)
            .filter(Boolean);
          schTimeOptions = response.data
            .map((option) => ({
              value: option.DisplayType,
              label: option.DisplayType,
            }))
            .filter((option) => !usedTimes.includes(option.value));
        }

        if (schTime) {
          const [hours, mins] = schTime.split(':');
          schTime = {
            value: `${hours}:${mins}`,
            label: `${hours}:${mins}`,
          };
          const dateTimeKey = `${convertDateToYMD(schDate)}_${schTime.value}`;
          if (schDate && !usedDateTimePairs.has(dateTimeKey)) {
            usedDateTimePairs.add(dateTimeKey);
          } else if (schDate) {
            schTime = null;
            openNotification(
              'warning',
              `The time ${schTime.label} for date ${convertDateToYMD(
                schDate,
              )} is already used. Please select a different time.`,
            );
          }
        }

        return {
          ...item,
          ScheduleDate: schDate,
          ScheduleTime:
            schTimeOptions.length === 1 ? schTimeOptions[0] : schTime,
          schTimeOptions,
        };
      }),
    );
  };

  const isTeamsMappingValid = () =>
    teamMappings.every(
      (item) =>
        (item.ScheduleDate && item.ScheduleTime) ||
        (!item.ScheduleDate && !item.ScheduleTime),
    );

  return (
    <Card
      header={
        isHeaderVisible ? (
          <HeaderExtra Component={'Event Management'} />
        ) : (
          <div className="p-2"></div>
        )
      }
      headerExtra={
        <span className="flex items-center gap-2">
          <Button
            block
            variant="twoTone"
            size="sm"
            icon={<FiTrash2 />}
            onClick={() => setIsDiscardDialogOpen(true)}
            className="w-max"
          >
            Discard
          </Button>
          <div className="flex justify-end gap-2">
            {stickyFooterBtnState.generateProgram && (
              <>
                {enableToEdit && (
                  <Button
                    size="sm"
                    variant="solid"
                    onClick={handleGenerateProgram}
                    icon={<VscWand />}
                  >
                    Generate Programs
                  </Button>
                )}
              </>
            )}
            {stickyFooterBtnState.reset && (
              <Button
                size="sm"
                onClick={() => setIsResetChangesDialogOpen(true)}
              >
                Reset
              </Button>
            )}
            {stickyFooterBtnState.save && (
              <>
                {enableToEdit ? (
                  <Tooltip title="Please Generate Program">
                    <Button
                      size="sm"
                      variant="solid"
                      disabled={enableToEdit}
                      onClick={handleSaveTeamMapping}
                      icon={<AiOutlineSave />}
                    >
                      Save
                    </Button>
                  </Tooltip>
                ) : (
                  <Button
                    size="sm"
                    variant="solid"
                    disabled={enableToEdit}
                    onClick={handleSaveTeamMapping}
                    icon={<AiOutlineSave />}
                  >
                    Save
                  </Button>
                )}
              </>
            )}
          </div>
        </span>
      }
      className="flex flex-col min-h-[87vh]"
      bodyClass="grow p-5 pt-4 flex flex-col"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-full h-10 w-10 border-[1.5px] border-gray-600 p-1 flex items-center justify-center bg-gray-700">
            <AiOutlineTrophy size={20} className="text-gray-400" />
          </div>
          <div className="flex flex-col">
            <p className="text-base font-semibold text-gray-300 flex items-center">
              {eventDetails.EventName}
            </p>
            <p>{teamMappings.length} Matches</p>
          </div>
        </div>
        <Button
          size="sm"
          variant="solid"
          icon={<AiOutlinePlusCircle />}
          onClick={() => {
            setIsAddNewMatchClicked(true);
            setIsAddEditMatchDialogOpen(true);
          }}
        >
          Add New Matches
        </Button>
      </div>
      {Array.isArray(teamMappings) && teamMappings.length > 0 ? (
        <ReportsTable
          tableData={teamMappings}
          tableName={'teamMappings'}
          originalColumns={TABLE_COLUMNS}
          managedColumns={managedColumns}
          setManagedColumns={setManagedColumns}
          toolbarOptions={TOOLBAR_OPTIONS}
          exportFileName={`${eventDetails.EventName} - Matches`}
          key={enableToEdit} // Force re-render when enableToEdit changes
        />
      ) : (
        <div className="min-h-full flex justify-center items-center">
          No matches to show
        </div>
      )}
      {isAddEditMatchDialogOpen && (
        <AddEditMatchDialog
          isOpen={isAddEditMatchDialogOpen}
          setIsOpen={setIsAddEditMatchDialogOpen}
          isAddNewMatchClicked={isAddNewMatchClicked}
          setIsAddNewMatchClicked={setIsAddNewMatchClicked}
          selectedRowData={selectedRowData}
          setSelectedRowData={setSelectedRowData}
          selectedRowIndex={selectedRowIndex}
          setSelectedRowIndex={setSelectedRowIndex}
          eventGroupOptions={eventGroupOptions}
          team1SelectorOptions={team1SelectorOptions}
          teamMappings={teamMappings}
          setTeamMappings={setTeamMappings}
        />
      )}
      <WarningDialog
        isDialogOpen={isDiscardDialogOpen}
        title="Discard"
        description={`Are you sure you want to discard?`}
        submitButtonTitle="Discard"
        handleDialogSubmit={resetPage}
        handleDialogClose={() => setIsDiscardDialogOpen(false)}
      />
      <WarningDialog
        isDialogOpen={isDeleteMatchDialogOpen}
        title="Delete Match"
        description={`Are you sure you want to delete this match?`}
        submitButtonTitle="Delete"
        handleDialogSubmit={handleDelete}
        handleDialogClose={handleCloseDeleteDialog}
      />
      <WarningDialog
        isDialogOpen={isResetChangesDialogOpen}
        title="Reset Changes"
        description={`Are you sure you want to reset all changes?`}
        submitButtonTitle="Reset"
        handleDialogSubmit={handleResetChanges}
        handleDialogClose={() => setIsResetChangesDialogOpen(false)}
      />

      {/* <WarningDialog
        isDialogOpen={isGenerateMatchesDialogOpen}
        title="Generate Program"
        description={`Do you wish to generate program for all matches?`}
        submitButtonTitle="Generate"
        handleDialogSubmit={handleGenerateProgram}
        handleDialogClose={() => {
          setIsGenerateMatchesDialogOpen(false);
          resetPage();
        }}
      /> */}
    </Card>
  );
}

export default TeamMapping;
