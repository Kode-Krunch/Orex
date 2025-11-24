import { Button, Dialog, Input, InputGroup, Select } from 'components/ui';
import React, { useEffect, useState } from 'react';
import { EMERALD_500_50 } from 'views/Controls/Dashboard/constants/tw_colors';
import WarningDialog from 'views/Controls/WarningDialog';

function AddEditMatchDialog({
  isOpen,
  setIsOpen,
  isAddNewMatchClicked,
  setIsAddNewMatchClicked,
  selectedRowData,
  setSelectedRowData,
  selectedRowIndex,
  setSelectedRowIndex,
  eventGroupOptions,
  team1SelectorOptions,
  teamMappings,
  setTeamMappings,
}) {
  /* STATES */
  const [selectedTeam1, setSelectedTeam1] = useState(null);
  const [selectedTeam2, setSelectedTeam2] = useState(null);
  const [selectedEventGroup, setSelectedEventGroup] = useState(null);
  const [team2SelectorOptions, setTeam2SelectorOptions] = useState([]);
  const [matchType, setMatchType] = useState(selectedRowData?.MatchType || '');
  const [isAddSameMatchDialogOpen, setIsAddSameMatchDialogOpen] =
    useState(false);

  /* USE EFFECTS */
  useEffect(() => {
    if (selectedRowData) {
      setSelectedTeam1({
        label: selectedRowData.TeamName1,
        value: selectedRowData.Team1,
        teamImage: selectedRowData.Team_Image1,
      });
      setSelectedTeam2({
        label: selectedRowData.TeamName2,
        value: selectedRowData.Team2,
        teamImage: selectedRowData.Team_Image2,
      });
    }
  }, [selectedRowData]);

  useEffect(() => {
    try {
      if (!selectedTeam1 || !team1SelectorOptions) return;
      const team2SelectorOptions = [];
      team1SelectorOptions.forEach((curTeam) => {
        if (curTeam.value !== selectedTeam1.value) {
          team2SelectorOptions.push(curTeam);
        }
      });
      setTeam2SelectorOptions(team2SelectorOptions);
      if (selectedTeam1.value === selectedTeam2?.value) {
        setSelectedTeam2(null);
      }
    } catch (error) {
      console.error(error);
    }
  }, [selectedTeam1, team1SelectorOptions]);

  /* EVENT HANDLERS */
  const addEditMatch = () => {
    if (isAddNewMatchClicked) {
      const updatedRow = {
        GroupCode: selectedEventGroup.value,
        GroupName: selectedEventGroup.label,
        Team1: selectedTeam1.value,
        TeamName1: selectedTeam1.label,
        Team_Image1: selectedTeam1.teamImage,
        Team2: selectedTeam2.value,
        TeamName2: selectedTeam2.label,
        Team_Image2: selectedTeam2.teamImage,
        bgColor: EMERALD_500_50,
        fontColor: 'white',
        ScheduleDate: null,
        ScheduleTime: null,
        schTimeOptions: [],
        MatchType: matchType,
      };
      setTeamMappings([updatedRow, ...teamMappings]);
    } else {
      setTeamMappings((oldState) => {
        const newState = [...oldState];
        if (selectedRowIndex !== undefined && selectedRowData) {
          const updatedRow = {
            ...selectedRowData,
            Team1: selectedTeam1.value,
            TeamName1: selectedTeam1.label,
            Team_Image1: selectedTeam1.teamImage,
            Team2: selectedTeam2.value,
            TeamName2: selectedTeam2.label,
            Team_Image2: selectedTeam2.teamImage,
            bgColor: EMERALD_500_50,
            fontColor: 'white',
            MatchType: matchType,
          };
          newState[selectedRowIndex] = updatedRow;
        }
        return newState;
      });
    }
    resetAddEditMatchDialogStates();
  };

  const onAddEditDialogSubmit = () => {
    if (
      isMatchAlreadyExists(
        teamMappings.filter((_, i) => i !== selectedRowIndex),
        isAddNewMatchClicked
          ? selectedEventGroup.value
          : selectedRowData.GroupCode,
        selectedTeam1.value,
        selectedTeam2.value,
      )
    ) {
      setIsAddSameMatchDialogOpen(true);
    } else {
      addEditMatch();
    }
  };

  /* HELPER FUNCTIONS */
  const isMatchAlreadyExists = (teamMappings, group, Team1, Team2) => {
    for (let index = 0; index < teamMappings.length; index++) {
      const match = teamMappings[index];
      if (
        (match.Team1 === Team1 &&
          match.Team2 === Team2 &&
          match.GroupCode === group) ||
        (match.Team1 === Team2 &&
          match.Team2 === Team1 &&
          match.GroupCode === group)
      ) {
        return true;
      }
    }
    return false;
  };

  const resetAddEditMatchDialogStates = () => {
    setSelectedEventGroup(null);
    setSelectedTeam1(null);
    setSelectedTeam2(null);
    setSelectedRowIndex(null);
    setSelectedRowData(null);
    setIsAddNewMatchClicked(false);
    setMatchType('');
    setIsOpen(false);
  };

  return (
    <>
      <Dialog
        isOpen={isOpen}
        onClose={resetAddEditMatchDialogStates}
        onRequestClose={resetAddEditMatchDialogStates}
      >
        <h5 className="mb-4">
          {isAddNewMatchClicked ? 'New Match' : 'Edit Match'}
        </h5>
        {isAddNewMatchClicked && (
          <div className="flex flex-col gap-1">
            <p className="text-slate-300">
              Event Group <span className="text-red-500">*</span>
            </p>
            <Select
              placeholder="Select"
              size="sm"
              options={eventGroupOptions}
              onChange={(selectedOption) => {
                setSelectedEventGroup(selectedOption);
              }}
            />
          </div>
        )}
        <div className="mt-6 flex flex-col gap-1">
          <p className="text-slate-300">
            Match <span className="text-red-500">*</span>
          </p>
          <InputGroup size="sm">
            <Select
              placeholder="Team 1"
              className="w-full"
              options={team1SelectorOptions}
              value={selectedTeam1 ? selectedTeam1 : ''}
              onChange={(selectedOption) => {
                setSelectedTeam1(selectedOption);
              }}
              isDisabled={isAddNewMatchClicked && !selectedEventGroup}
            />
            <span className="mx-2">vs</span>
            <Select
              placeholder="Team 2"
              className="w-full"
              options={team2SelectorOptions}
              value={selectedTeam2 ? selectedTeam2 : ''}
              onChange={(selectedOption) => {
                setSelectedTeam2(selectedOption);
              }}
              isDisabled={!selectedTeam1}
            />
          </InputGroup>
          <div className="mt-6 flex flex-col gap-1">
            <p className="text-slate-300">
              Match Type <span className="text-red-500">*</span>
            </p>
            <Input
              size="sm"
              placeholder="Match Type"
              value={matchType}
              onChange={(e) => setMatchType(e.target.value)}
            />
          </div>
        </div>
        <div className="text-right mt-8 flex items-center justify-end">
          <Button
            className="ltr:mr-2 rtl:ml-2"
            variant="plain"
            onClick={resetAddEditMatchDialogStates}
          >
            Cancel
          </Button>
          <Button
            variant="solid"
            onClick={onAddEditDialogSubmit}
            disabled={
              isAddNewMatchClicked
                ? !selectedEventGroup || !selectedTeam1 || !selectedTeam2
                : !selectedTeam1 || !selectedTeam2
            }
          >
            {isAddNewMatchClicked ? 'Add' : 'Update'}
          </Button>
        </div>
      </Dialog>
      <WarningDialog
        isDialogOpen={isAddSameMatchDialogOpen}
        title="Match Already Exists"
        description={`Are you sure you want to insert the same match?`}
        submitButtonTitle="Insert"
        handleDialogSubmit={() => {
          addEditMatch();
          setIsAddSameMatchDialogOpen(false);
        }}
        handleDialogClose={() => {
          resetAddEditMatchDialogStates();
          setIsAddSameMatchDialogOpen(false);
        }}
      />
    </>
  );
}

export default AddEditMatchDialog;
