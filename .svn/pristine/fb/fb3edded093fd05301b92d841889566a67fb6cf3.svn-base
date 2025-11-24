import {
  Dialog,
  FormItemcompact,
  Input,
  Select,
  Switcher,
} from 'components/ui';
import React from 'react';
import { PiLinkBreakBold, PiLinkBreakThin } from 'react-icons/pi';

function EditContentDialog({
  isDialogOpen,
  setIsDialogOpen,
  setSelectedContentToSearch,
  SelContent,
  setSelContent,
  SelSeason,
  setSelSeason,
  SelEpisode,
  setSelEpisode,
  Slotduration,
  setSlotduration,
  BreakPattSelect,
  setBreakPattSelect,
  checked,
  onSwitcherToggle,
  withIcon,
  SelectedRow,
  setSelectedRow,
  data10,
  SeasonList,
  EpisodeList,
  Pattern,
  FooterContent,
}) {
  return (
    <Dialog
      isOpen={isDialogOpen}
      className="z-50"
      onClose={() => {
        setIsDialogOpen(false);
        setSelectedContentToSearch({});
        setSelContent({ value: null, label: 'Please Select Content' });
        setSelSeason(null);
        setSelEpisode(null);
        setSlotduration('');
        setBreakPattSelect(null);
        setSelectedRow(null);
      }}
      width={600}
    >
      <div className="flex  justify-between items-center mb-5">
        <h3 className="dark:text-blue-400">{SelContent.ContentName}</h3>
        <div className="text-end">
          <h6 className="ml-2  dark:text-orange-400">
            Dur: {SelContent.SlotDuration} Min
          </h6>
          <p className="flex items-center">
            Show Break Pattern
            <Switcher
              checked={checked}
              onChange={onSwitcherToggle}
              className="ml-2"
              unCheckedContent={withIcon(<PiLinkBreakThin />)}
              checkedContent={withIcon(<PiLinkBreakBold />)}
            />
          </p>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-2">
        <div className="col-span-6">
          <div className="flex mb-2">
            <h6>
              Insert Start Time -{' '}
              {SelectedRow == null
                ? data10[Number(data10.length) - 1]?.StartTime
                : SelectedRow?.StartTime}
            </h6>
          </div>
        </div>
        {EpisodeList.length == 1 ? null : (
          <div className="col-span-1">
            <FormItemcompact
              asterisk
              label="Season"
              style={{
                width: '250px',
              }}
            >
              <Select
                options={SeasonList}
                isDisabled={EpisodeList.length == 1}
                value={SeasonList.find((option) => option.value === SelSeason)}
                defaultValue={SelSeason}
                onChange={(value) => {
                  setSelSeason(value);
                  // handlesetSeason(SelContent, value);
                }}
              />
            </FormItemcompact>
          </div>
        )}
        {EpisodeList.length == 1 ? null : (
          <div className="col-span-1">
            <FormItemcompact
              asterisk
              label="Episode"
              style={{
                width: '250px',
              }}
            >
              <Select
                options={EpisodeList}
                isDisabled={EpisodeList.length == 1}
                value={EpisodeList.find(
                  (option) => option.value === SelEpisode,
                )}
                defaultValue={SelEpisode}
                onChange={(value) => setSelEpisode(value)}
              />
            </FormItemcompact>
          </div>
        )}
        <div className="col-span-1">
          <FormItemcompact
            asterisk
            label="Slot(Min)"
            style={{
              width: '250px',
            }}
          >
            <Input
              value={Slotduration}
              size="sm"
              onChange={(event) => {
                const regex = /^[0-9]*$/;
                const input = event.target.value;

                if (
                  regex.test(input) &&
                  (input === '' || Number(input) <= 400)
                ) {
                  setSlotduration(input); // Set the state as string to handle empty input
                }
              }}
            />
          </FormItemcompact>
        </div>
        {checked && (
          <div className="col-span-3">
            <FormItemcompact
              label="Break Pattern"
              style={{
                width: '250px',
              }}
            >
              <Select
                placeholder="Select a Pattern"
                options={Pattern}
                value={Pattern.find(
                  (option) => option.value === BreakPattSelect.value,
                )}
                onChange={(value) => setBreakPattSelect(value)}
              />
            </FormItemcompact>
          </div>
        )}
      </div>
      <FooterContent />
    </Dialog>
  );
}

export default EditContentDialog;
