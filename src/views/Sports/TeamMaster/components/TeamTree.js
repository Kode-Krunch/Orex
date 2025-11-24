import React, { useState } from 'react';
import TreeItem from './TreeItem';
import { Button } from 'components/ui';
import ColumnHeader from './ColumnHeader';
import {
  transitionAnimation,
} from './constants';
import AddItemDialog from './AddItemDialog';
import { cloneDeep } from 'lodash';
import { Transition } from '@headlessui/react';
import { apiCallstoreprocedure } from 'services/CommonService';
import { useSelector } from 'react-redux';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';

function TeamTree() {
  /* REDUX STATES */
  const channel = useSelector((state) => state.locale.selectedChannel);

  /* STATES */
  const [teamTree, setTeamTree] = useState([]);
  const [selCategory, setSelCategory] = useState(null);
  const [selCountry, setSelCountry] = useState(null);
  const [selSport, setSelSport] = useState(null);
  const [selEvent, setSelEvent] = useState(null);
  const [selTeam, setSelTeam] = useState(null);

  // Add Item Dialog state
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const [addItemDialogProps, setAddItemDialogProps] = useState({
    title: 'Add Items',
    id: '',
    options: [],
    selOptions: [],
  });

  /* EVENT HANDLERS */
  const onAddCategoriesClick = async () => {
    let categoryOptions = []
    const resp = await apiCallstoreprocedure('USP_SetTeamMaster', {
      par_CategoryCode: 0,
      par_CountrCode: 0,
      par_SubGenreCode: 0,
      par_EventCode: 0,
      par_TeamCode: 0,
      channel: channel.ChannelCode,
      LocationCode: channel.LocationCode
    });
    setIsAddItemDialogOpen(true);
    if (resp.status == 204) { openNotification('warning', 'Please Create New Category'); } else {
      categoryOptions = resp?.data.map((option) => ({
        name: option.CategoryName,
        id: option.CategoryCode,
        type: option.Type,
      }))
    }
    setAddItemDialogProps({
      title: 'Add Categories',
      id: 'addCategories',
      options: categoryOptions,
      selOptions: teamTree,
    });
  };

  const onAddCountriesClick = async () => {
    let countryOptions = []
    const resp = await apiCallstoreprocedure('USP_SetTeamMaster', {
      par_CategoryCode: selCategory.id,
      par_CountrCode: 0,
      par_SubGenreCode: 0,
      par_EventCode: 0,
      par_TeamCode: 0,
      channel: channel.ChannelCode,
      LocationCode: channel.LocationCode
    });
    setIsAddItemDialogOpen(true);
    if (resp.status == 204) { openNotification('warning', 'Please Create New Country'); } else {
      countryOptions = resp?.data?.map((option) => ({
        name: option.CountryName,
        id: option.CountryCode,
      }))
    }
    setAddItemDialogProps({
      title: 'Add Countries',
      id: 'addCountries',
      options: countryOptions,
      selOptions: getSelCategory()?.children,
    });
  };

  const onAddSportsClick = async () => {
    console.log(selCategory.type == 'international');

    let sportsOptions = []
    const resp = await apiCallstoreprocedure('USP_SetTeamMaster', {
      par_CategoryCode: selCategory.id,
      par_CountrCode: selCategory.type == 'international' ? 200 : selCountry.id,
      par_SubGenreCode: 0,
      par_EventCode: 0,
      par_TeamCode: 0,
      channel: channel.ChannelCode,
      LocationCode: channel.LocationCode
    });
    setIsAddItemDialogOpen(true);
    if (resp.status == 204) { openNotification('warning', 'Please Create New Sport'); } else {
      sportsOptions = resp?.data?.map((option) => ({
        name: option.SubGenreName,
        id: option.SubGenreCode,
      }))
    }
    setAddItemDialogProps({
      title: 'Add Sports',
      id: 'addSports',
      options: sportsOptions,
      selOptions: getSelSport()?.children,
    });
  };

  const onAddEventsClick = async () => {
    let eventOptions = []
    const resp = await apiCallstoreprocedure('USP_SetTeamMaster', {
      par_CategoryCode: selCategory.id,
      par_CountrCode: selCategory.type == 'international' ? 200 : selCountry.id,
      par_SubGenreCode: selSport.id,
      par_EventCode: 0,
      par_TeamCode: 0,
      channel: channel.ChannelCode,
      LocationCode: channel.LocationCode
    });
    setIsAddItemDialogOpen(true);
    if (resp.status == 204) { openNotification('warning', 'Please Create New Event'); } else {
      eventOptions = resp?.data?.map((option) => ({
        name: option.LocalEventName,
        id: option.LocalEventCode,
      }))
    }
    setAddItemDialogProps({
      title: 'Add Events',
      id: 'addEvents',
      options: eventOptions,
      selOptions: getSelEvent()?.children,
    });
  };

  const onAddTeamsClick = async () => {
    let teamOptions = []
    const resp = await apiCallstoreprocedure('USP_SetTeamMaster', {
      par_CategoryCode: selCategory.id,
      par_CountrCode: selCategory.type == 'international' ? 200 : selCountry.id,
      par_SubGenreCode: selSport.id,
      par_EventCode: selEvent.id,
      par_TeamCode: 0,
      channel: channel.ChannelCode,
      LocationCode: channel.LocationCode
    });
    setIsAddItemDialogOpen(true);
    if (resp.status == 204) { openNotification('warning', 'Please Create New Team'); }
    else {
      teamOptions = resp?.data?.map((option) => ({
        name: option.TeamName,
        id: option.TeamCode,
      }))
    }
    setAddItemDialogProps({
      title: 'Add Teams',
      id: 'addTeams',
      options: teamOptions,
      selOptions: getSelTeam()?.children,
    });
  };

  const handleAddCategories = (newCategories) => {
    const existingCategoryIds = getArrayValues(teamTree, 'id');
    let newTeamTree = mergeTreeItems(newCategories, existingCategoryIds);
    setTeamTree(newTeamTree);
    if (!getArrayValues(newTeamTree, 'id').includes(selCategory?.id))
      resetSelCategory();
  };

  const handleAddCountries = (newCountries) => {
    const existingCountryIds = getArrayValues(getSelCategory()?.children, 'id');
    let lNewCountries = mergeTreeItems(newCountries, existingCountryIds);
    let newTeamTree = updateChildren([selCategory.id], teamTree, lNewCountries);
    setTeamTree(newTeamTree);
    if (!getArrayValues(lNewCountries, 'id').includes(selCountry?.id))
      resetSelCountry();
  };

  const handleAddSports = (newSports) => {
    const existingSportIds = getArrayValues(getSelSport()?.children, 'id');
    let lNewSports = mergeTreeItems(newSports, existingSportIds);
    let newTeamTree = [];
    if (selCategory.type === 'international') {
      newTeamTree = updateChildren([selCategory.id], teamTree, lNewSports);
    } else {
      newTeamTree = updateChildren(
        [selCategory.id, selCountry.id],
        teamTree,
        lNewSports,
      );
    }
    setTeamTree(newTeamTree);
    if (!getArrayValues(lNewSports, 'id').includes(selSport?.id))
      resetSelSport();
  };

  const handleAddEvents = (newEvents) => {
    const existingEventIds = getArrayValues(getSelEvent()?.children, 'id');
    let lNewEvents = mergeTreeItems(newEvents, existingEventIds);
    let newTeamTree = [];
    if (selCategory.type === 'international') {
      newTeamTree = updateChildren(
        [selCategory.id, selSport.id],
        teamTree,
        lNewEvents,
      );
    } else {
      newTeamTree = updateChildren(
        [selCategory.id, selCountry.id, selSport.id],
        teamTree,
        lNewEvents,
      );
    }
    setTeamTree(newTeamTree);
    if (!getArrayValues(lNewEvents, 'id').includes(selEvent?.id))
      resetSelEvent();
  };

  const handleAddTeams = (newTeams) => {
    const existingTeamsIds = getArrayValues(getSelTeam()?.children, 'id');
    let lNewTeams = mergeTreeItems(newTeams, existingTeamsIds);
    let newTeamTree = [];
    if (selCategory.type === 'international') {
      newTeamTree = updateChildren(
        [selCategory.id, selSport.id, selEvent.id],
        teamTree,
        lNewTeams,
      );
    } else {
      newTeamTree = updateChildren(
        [selCategory.id, selCountry.id, selSport.id, selEvent.id],
        teamTree,
        lNewTeams,
      );
    }
    setTeamTree(newTeamTree);
    if (!getArrayValues(lNewTeams, 'id').includes(selTeam?.id)) resetSelTeam();
  };

  const handleCategoryClick = (category) => {
    setSelCategory(category);
    resetSelCountry();
  };

  const handleCountryClick = (country) => {
    setSelCountry(country);
    resetSelSport();
  };

  const handleSportClick = (sport) => {
    setSelSport(sport);
    resetSelEvent();
  };

  const handleEventClick = (event) => {
    setSelEvent(event);
    resetSelTeam();
  };

  /* HELPER FUNCTIONS */
  const mergeTreeItems = (newItems, existingIds) => {
    return newItems.map((item) => {
      if (existingIds.includes(item.id)) {
        return cloneDeep(item);
      }
      return { ...cloneDeep(item), children: [] };
    });
  };

  const getArrayValues = (array, key) => array.map((item) => item[key]);

  const getSelCategory = () =>
    teamTree.filter((item) => item.id === selCategory?.id)[0];

  const getSelCountry = () =>
    getSelCategory()?.children.filter((item) => item.id === selCountry?.id)[0];

  const getSelSport = () =>
    selCategory?.type === 'international' ? getSelCategory() : getSelCountry();

  const getSelEvent = () =>
    getSelSport()?.children.filter((item) => item.id === selSport?.id)[0];

  const getSelTeam = () =>
    getSelEvent()?.children.filter((item) => item.id === selEvent?.id)[0];

  const updateChildren = (path, tree, children) => {
    let newTree = [];
    tree.forEach((item) => {
      let newItem = cloneDeep(item);
      if (item.id === path[0])
        if (path.length === 1) {
          newItem.children = children;
        } else {
          newItem.children = updateChildren(
            path.slice(1, path.length),
            item.children,
            children,
          );
        }
      newTree.push(newItem);
    });
    return newTree;
  };

  const resetSelTeam = () => setSelTeam(null);

  const resetSelEvent = () => {
    setSelEvent(null);
    resetSelTeam();
  };

  const resetSelSport = () => {
    setSelSport(null);
    resetSelEvent();
  };

  const resetSelCountry = () => {
    setSelCountry(null);
    resetSelSport();
  };

  const resetSelCategory = () => {
    setSelCategory(null);
    resetSelCountry();
  };

  return (
    <>
      <div className="flex w-full h-full overflow-x-scroll no-scrollbar">
        <div className="w-[20%] shrink-0 flex flex-col gap-3 h-full border-r border-r-slate-600 px-2 overflow-scroll no-scrollbar">
          <ColumnHeader
            heading="CATEGORIES"
            action={
              <Button
                size="sm"
                variant="twoTone"
                onClick={onAddCategoriesClick}
              >
                Add
              </Button>
            }
          />
          {teamTree.map((item) => (
            <TreeItem
              key={item.id}
              item={{ name: item.name }}
              active={selCategory?.id === item.id}
              color="slate"
              icon={item.icon}
              onClick={() => handleCategoryClick(item)}
            />
          ))}

        </div>
        <Transition
          show={selCategory && selCategory.type !== 'international'}
          {...transitionAnimation}
        >
          <div className="w-[20%] shrink-0 flex flex-col gap-3 h-full border-r border-r-slate-600 px-2 overflow-scroll no-scrollbar">
            <ColumnHeader
              heading="COUNTRIES"
              action={
                <Button
                  size="sm"
                  variant="twoTone"
                  onClick={onAddCountriesClick}
                >
                  Add
                </Button>
              }
            />
            {getSelCategory()?.children.map((item) => (
              <TreeItem
                key={item.id}
                item={{ name: item.name }}
                active={selCountry?.id === item.id}
                color="slate"
                icon={item.icon}
                onClick={() => handleCountryClick(item)}
              />
            ))}
          </div>
        </Transition>
        <Transition
          show={
            selCategory?.type === 'international' ||
            (selCategory?.type !== 'international' && selCountry)
          }
          {...transitionAnimation}
        >
          <div className="w-[20%] shrink-0 flex flex-col gap-3 h-full border-r border-r-slate-600 px-2 overflow-scroll no-scrollbar">
            <ColumnHeader
              heading="SPORTS"
              action={
                <Button size="sm" variant="twoTone" onClick={onAddSportsClick}>
                  Add
                </Button>
              }
            />
            {getSelSport()?.children.map((item) => (
              <TreeItem
                key={item.id}
                item={{ name: item.name }}
                active={selSport?.id === item.id}
                color="slate"
                icon={item.icon}
                onClick={() => handleSportClick(item)}
              />
            ))}
          </div>
        </Transition>
        <Transition show={selSport} {...transitionAnimation}>
          <div className="w-[20%] shrink-0 flex flex-col gap-3 h-full border-r border-r-slate-600 px-2 overflow-scroll no-scrollbar">
            <ColumnHeader
              heading="EVENTS"
              action={
                <Button size="sm" variant="twoTone" onClick={onAddEventsClick}>
                  Add
                </Button>
              }
            />
            {getSelEvent()?.children.map((item) => (
              <TreeItem
                key={item.id}
                item={{ name: item.name }}
                active={selEvent?.id === item.id}
                color="slate"
                icon={item.icon}
                onClick={() => handleEventClick(item)}
              />
            ))}
          </div>
        </Transition>
        <Transition show={selEvent} {...transitionAnimation}>
          <div className="w-[20%] shrink-0 flex flex-col gap-3 h-full px-2 overflow-scroll no-scrollbar">
            <ColumnHeader
              heading="TEAMS"
              action={
                <Button size="sm" variant="twoTone" onClick={onAddTeamsClick}>
                  Add
                </Button>
              }
            />
            {getSelTeam()?.children.map((item) => (
              <TreeItem
                key={item.id}
                item={{ name: item.name }}
                active={selTeam?.id === item.id}
                color="slate"
                icon={item.icon}
                onClick={() => setSelTeam(item)}
              />
            ))}
          </div>
        </Transition>
      </div>
      {isAddItemDialogOpen && (
        <AddItemDialog
          isOpen={isAddItemDialogOpen}
          setIsOpen={setIsAddItemDialogOpen}
          dialogProps={addItemDialogProps}
          setDialogProps={setAddItemDialogProps}
          addFn={
            addItemDialogProps.id === 'addCategories'
              ? handleAddCategories
              : addItemDialogProps.id === 'addCountries'
                ? handleAddCountries
                : addItemDialogProps.id === 'addSports'
                  ? handleAddSports
                  : addItemDialogProps.id === 'addEvents'
                    ? handleAddEvents
                    : addItemDialogProps.id === 'addTeams'
                      ? handleAddTeams
                      : null
          }

          selCategory={selCategory}
          selCountry={selCountry}
          selSport={selSport}
          selEvent={selEvent}
        />
      )}
    </>
  );
}

export default TeamTree;
