import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Drawer, Notification, Tooltip } from 'components/ui';
import { HiOutlinePencil, HiPlusCircle, HiRefresh } from 'react-icons/hi';
import PropTypes from 'prop-types';
import HeaderExtra from 'views/Controls/HeaderExtra';
import InputwithVoice from 'components/ui/Input/InputwithVoice';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable';
import TeamTree from './components/TeamTree';
import Loader from 'views/Controls/Loader';
import { apiGetCategoryMaster, apiGetLocalEventMaster, apiGetLocalEventMasterDrop, apiGetTeamMaster } from 'services/EventServices';
import { setContent } from 'store/base/commonSlice';
import DrawerFooter from 'views/Controls/DrawerFooter';
import TeamEdit from './components/TeamEdit';
import { apiGetSubGenremasterDrop } from 'services/ProgrammingService';
import { apiGetCountrymaster } from 'services/MasterService';
import { MdEdit } from 'react-icons/md';
import { logDOM } from '@testing-library/react';

const toolbarOptions = { groupBy: true, manageColumns: false };

const HeaderExtraContent = ({ globalFilter, setGlobalFilter, isTableView, toggleView, fetchTeams, setIsDrawerOpen, seteditData, setIsEditMode }) => (
  <span className="flex items-center">
    <span className="mr-1   font-semibold">
      <InputwithVoice
        value={globalFilter ?? ''}
        className="solid"
        placeholder="Search teams"
        size="sm"
        onChange={(e) => setGlobalFilter(e.target.value)}
        aria-label="Search teams"
      /></span>
    <span className="mr-1 font-semibold">
      <Button
        block
        variant="solid"
        size="sm"
        icon={<HiPlusCircle />}
        onClick={() => { setIsDrawerOpen(true); seteditData(['']); setIsEditMode(false); }}
        aria-label={isTableView ? 'Switch to Add Team' : 'Switch to Table View'}
      >
        {isTableView ? 'Add Team' : 'Table View'}
      </Button>
    </span>
  </span>
);

HeaderExtraContent.propTypes = {
  globalFilter: PropTypes.string,
  setGlobalFilter: PropTypes.func.isRequired,
  isTableView: PropTypes.bool.isRequired,
  toggleView: PropTypes.func.isRequired,
  fetchTeams: PropTypes.func.isRequired,
  setIsDrawerOpen: PropTypes.func.isRequired,
  seteditData: PropTypes.func.isRequired,
  setIsEditMode: PropTypes.func.isRequired,
};

const TeamMasterNew = () => {
  const dispatch = useDispatch();
  const formikRef = useRef();

  const { selectedChannel: channel } = useSelector((state) => state.locale);


  const [globalFilter, setGlobalFilter] = useState('');
  const [isTableView, setIsTableView] = useState(true);
  const [data, setData] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [error, setError] = useState(null);
  const [editData, seteditData] = useState(['']);
  const [subGenres, setSubGenres] = useState([]);
  const [country, setCountry] = useState([]);
  const [category, setCategory] = useState([]);

  const [isEditMode, setIsEditMode] = useState(false);

  console.log('isEditMode', isEditMode);

  const formSubmit = () => {
    if (formikRef.current) {
      formikRef.current.submitForm();
    }
  };
  const onDrawerClose = async () => {
    setIsDrawerOpen(false);
    fetchTeams();
    seteditData(['']);
    setIsEditMode(false);
  };

  const columns = useMemo(
    () => [
      {
        header: 'Action',
        accessorKey: 'action',
        actions: [
          {
            action: (rowIndex, rowData) => {
              return (
                <div className="text-xs font-medium !w-max">
                  <div className="flex gap-2 justify-center">
                    <Tooltip title={'Edit Date'}>
                      <Button
                        size="xs"
                        icon={<MdEdit />}
                        onClick={() => {
                          setIsDrawerOpen(true);
                          seteditData(rowData);
                          setIsEditMode(true);
                        }}
                      />
                    </Tooltip>
                  </div>
                </div>
              );
            },
          },
        ],
      },
      { header: 'Team Name', accessorKey: 'TeamName' },
      { header: 'Short Name', accessorKey: 'ShortName' },
      { header: 'Category', accessorKey: 'CategoryName' },
      { header: 'Country', accessorKey: 'CountryName' },
      { header: 'Sub Genre', accessorKey: 'SubGenerName' },
      // { header: 'Event', accessorKey: 'LocalEventName' },

    ],
    []
  );

  const filteredData = useMemo(
    () =>
      globalFilter
        ? data.filter((item) =>
          Object.values(item).some((val) =>
            String(val).toLowerCase().includes(globalFilter.toLowerCase())
          )
        )
        : data,
    [data, globalFilter]
  );

  const bifurcateData = useCallback((data) => {
    const result = { name: 'National', id: 1, type: 'national', children: [] };
    const countryMap = new Map();
    data.forEach((item) => {
      const countryKey = `${item.CountryCode}-${item.CountryName}`;
      if (!countryMap.has(countryKey)) {
        countryMap.set(countryKey, { name: item.CountryName, id: item.CountryCode, children: [] });
      }
    });

    const subGenreMap = new Map();
    data.forEach((item) => {
      const countryKey = `${item.CountryCode}-${item.CountryName}`;
      const subGenreKey = `${countryKey}-${item.SubGenreCode}-${item.SubGenreName}`;
      if (!subGenreMap.has(subGenreKey)) {
        subGenreMap.set(subGenreKey, { name: item.SubGenreName, id: item.SubGenreCode, children: [] });
        countryMap.get(countryKey).children.push(subGenreMap.get(subGenreKey));
      }
    });

    const eventMap = new Map();
    data.forEach((item) => {
      const countryKey = `${item.CountryCode}-${item.CountryName}`;
      const subGenreKey = `${countryKey}-${item.SubGenreCode}-${item.SubGenreName}`;
      const eventKey = `${subGenreKey}-${item.LocalEventCode}-${item.LocalEventName}`;
      if (!eventMap.has(eventKey)) {
        eventMap.set(eventKey, { name: item.LocalEventName, id: item.LocalEventCode, children: [] });
        subGenreMap.get(subGenreKey).children.push(eventMap.get(eventKey));
      }
    });

    data.forEach((item) => {
      const countryKey = `${item.CountryCode}-${item.CountryName}`;
      const subGenreKey = `${countryKey}-${item.SubGenreCode}-${item.SubGenreName}`;
      const eventKey = `${subGenreKey}-${item.LocalEventCode}-${item.LocalEventName}`;
      eventMap.get(eventKey).children.push({
        name: item.TeamName,
        id: item.TeamCode,
        children: [],
      });
    });

    result.children = Array.from(countryMap.values()).sort((a, b) => a.name.localeCompare(b.name));
    result.children.forEach((country) => {
      country.children.sort((a, b) => a.name.localeCompare(b.name));
      country.children.forEach((subGenre) => {
        subGenre.children.sort((a, b) => a.name.localeCompare(b.name));
        subGenre.children.forEach((event) => {
          event.children.sort((a, b) => a.name.localeCompare(b.name));
        });
      });
    });

    return result;
  }, []);

  const fetchTeams = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const resp = await apiGetTeamMaster();
      if (resp.status === 200) {
        setData(resp.data);
        setTreeData(bifurcateData(resp.data));
      } else if (resp.status === 204) {
        setData([]);
        setTreeData([]);
        Notification({ type: 'warning', message: 'No teams found' });
      }
    } catch (error) {
      console.error('Error fetching teams:', error.message || error);
      setError('Failed to load teams. Please try again.');
      Notification({ type: 'error', message: 'Error', description: 'Failed to load teams. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  }, [bifurcateData]);

  useEffect(() => {
    fetchTeams();
    (async () => {
      const SubGenre = await apiGetSubGenremasterDrop(channel.LocationCode, channel.ChannelCode);
      const formattedOptions = SubGenre.data.map((option) => ({
        value: option.SubGenreCode,
        label: option.SubGenreName,
      }));
      setSubGenres(formattedOptions);
    })();
    (async () => {
      const Country = await apiGetCountrymaster();
      const formattedOptions = Country.data.map((option) => ({
        value: option.CountryCode,
        label: option.CountryName,
      }));
      setCountry(formattedOptions);
    })();
    (async () => {
      const Category = await apiGetCategoryMaster();
      const formattedOptions = Category.data.map((option) => ({
        value: option.CategoryCode,
        label: option.CategoryName,
      }));
      setCategory(formattedOptions);
    })();


  }, [channel]);

  const handleToggleView = useCallback(() => {
    setIsTableView((prev) => !prev);
    dispatch(setContent({ isTableView: !isTableView }));
  }, [dispatch, isTableView]);

  return (
    <Card
      header={<HeaderExtra ModuleText="Programming" Component="Team Management" />}
      headerExtra={
        <HeaderExtraContent
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          isTableView={isTableView}
          toggleView={handleToggleView}
          fetchTeams={fetchTeams}
          setIsDrawerOpen={setIsDrawerOpen}
          seteditData={seteditData}
          setIsEditMode={setIsEditMode}
        />
      }
      className="flex flex-col h-[85vh]"
      bodyClass="grow"
      style={{ overflow: 'auto' }}
    >
      {error && (
        <div className="text-red-500 text-center p-4">
          {error}
          <Button
            size="sm"
            variant="twoTone"
            icon={<HiRefresh />}
            onClick={fetchTeams}
            aria-label="Retry fetching teams"
            className="ml-2"
          >
            Retry
          </Button>
        </div>
      )}
      {isTableView ? (
        <ReportsTable
          tableData={filteredData}
          originalColumns={columns}
          managedColumns={columns}
          setManagedColumns={() => { }}
          toolbarOptions={toolbarOptions}
          externalGlobalFilter={globalFilter}
          exportFileName="TeamMaster"
          columnsToFormatInINR={[]}
        />
      ) : (
        <TeamTree data={treeData} onTeamUpdate={fetchTeams} />
      )}
      <Drawer
        title={
          <p className="text-xl font-medium text-black flex">
            <center>
              <Button size="xs" variant="twoTone" icon={<HiOutlinePencil />} />
            </center>
            &nbsp;&nbsp; {isEditMode ? 'Edit Team Master' : 'Add Team Master'}
          </p>
        }
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onRequestClose={() => setIsDrawerOpen(false)}
        width={window.screen.width > 400 ? window.screen.width / 3 : window.screen.width / 1.5}
        footer={<DrawerFooter onCancel={() => setIsDrawerOpen(false)}
          onSaveClick={formSubmit}
        />}
      >
        <TeamEdit
          ref={formikRef}
          onDrawerClose={onDrawerClose}
          editData={editData} // Pass your editData prop
          subGenres={subGenres} // Pass your subGenres prop
          country={country}
          category={category}
        />
      </Drawer>
      <Loader showLoader={isLoading} />
    </Card>
  );
};

TeamMasterNew.propTypes = {};

export default TeamMasterNew;