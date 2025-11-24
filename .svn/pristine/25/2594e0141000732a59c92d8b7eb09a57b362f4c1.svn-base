import { Button, Dropdown } from 'components/ui';
import React, { useMemo, useState } from 'react';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import WarningDialog from 'views/Controls/WarningDialog';
import SelectXs from 'views/Controls/SelectXs/SelectXs';

function AdvancedFilters({
  renderTitle,
  tableData,
  selectedSeason,
  selectedEpisode,
  handleApply,
}) {
  /* STATES */
  const [isResetWarningDialogOpen, setIsResetWarningDialogOpen] =
    useState(false);
  const [episodeOptions, setEpisodeOptions] = useState([]);
  const [season, setSeason] = useState(selectedSeason);
  const [episode, setEpisode] = useState(selectedEpisode);

  /* HOOKS - MEMOS */
  const seasonOptions = useMemo(() => {
    const options = [];
    tableData.forEach((row) => {
      if (row.SeasonNo && !options.includes(row.SeasonNo))
        options.push(row.SeasonNo);
    });
    setEpisodeOptions([]);
    return options.map((option) => ({ label: option, value: option }));
  }, [tableData]);

  /* EVENT HANDLERS */
  const handleSeasonChange = (option) => {
    setSeason(option);
    setEpisodeOptions(
      tableData
        .filter((row) => row.SeasonNo === option.value)
        .map((row) => ({ label: row.EpisodeNo, value: row.EpisodeNo })),
    );
  };

  const handleApplyFilter = async () => {
    try {
      handleApply(season, episode);
    } catch (error) {
      openNotification('danger', 'Something went wrong while applying filters');
      console.error(error);
    }
  };

  const handleResetFilters = async () => {
    try {
      handleApply(null, null);
      setIsResetWarningDialogOpen(false);
    } catch (error) {
      openNotification(
        'danger',
        'Something went wrong while resetting filters',
      );
      console.error(error);
    }
  };

  return (
    <>
      <Dropdown
        renderTitle={renderTitle || <></>}
        placement="bottom-end"
        className="h-full"
        toggleClassName="hover:cursor-pointer h-full"
        menuClass="p-3 pt-2 min-w-[256px] border-2 border-gray-600"
        onOpen={() => {
          setSeason(selectedSeason);
          setEpisode(selectedEpisode);
        }}
      >
        <h6 className="pb-1 border-b border-b-gray-600 mb-3 text-gray-200">
          Filters
        </h6>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div>
            <p className="text-gray-200 mb-1">Season</p>
            <SelectXs
              options={seasonOptions}
              onChange={handleSeasonChange}
              value={season}
            />
          </div>
          <div>
            <p className="text-gray-200 mb-1">Episode</p>
            <SelectXs
              options={episodeOptions}
              onChange={setEpisode}
              value={episode}
            />
          </div>
        </div>
        <div className="flex justify-between itmes-center w-full">
          <Button
            className="w-max font-normal !border !border-gray-500"
            size="sm"
            style={{
              fontSize: '0.8rem',
              lineHeight: '1rem',
            }}
            onClick={() => setIsResetWarningDialogOpen(true)}
          >
            Reset
          </Button>
          <Dropdown.Item onClick={handleApplyFilter} className="p-0 w-max">
            <Button
              size="sm"
              className="w-max font-normal"
              variant="twoTone"
              style={{ fontSize: '0.8rem', lineHeight: '1rem' }}
            >
              Apply
            </Button>
          </Dropdown.Item>
        </div>
      </Dropdown>
      {isResetWarningDialogOpen && (
        <WarningDialog
          isDialogOpen={isResetWarningDialogOpen}
          title="Reset Filters"
          description={`Do you wish to reset all the filters?`}
          submitButtonTitle="Reset"
          handleDialogSubmit={handleResetFilters}
          handleDialogClose={() => setIsResetWarningDialogOpen(false)}
        />
      )}
    </>
  );
}

export default AdvancedFilters;
