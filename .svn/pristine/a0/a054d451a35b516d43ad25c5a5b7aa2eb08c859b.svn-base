import { Button, Card, Input } from 'components/ui';
import React, { useEffect, useState } from 'react';
import { HiPlusCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import HeaderExtra from 'views/Controls/HeaderExtra';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import { FilterMatchMode } from 'primereact/api';
import Loader from 'views/Controls/Loader';

import AddLocalEventDialog from './Components/AddLocalEventDialog';
import LocalEventTable from './Components/LocalEventTable';
import { apiGetLocalEventMaster } from 'services/EventServices';
import { apiGetSubGenremasterDrop } from 'services/ProgrammingService';

export const headerExtra = (
  setShowDialog,
  filters,
  setFilters,
  globalFilterValue,
  setGlobalFilterValue,
  isEditModeOn,
) => {
  const onGlobalFilterChange = (e) => {
    try {
      if (/^[0-9a-zA-Z\s]*$/.test(e.target.value)) {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex gap-3 items-center">
      <Input
        type="text"
        size="sm"
        value={globalFilterValue}
        onChange={onGlobalFilterChange}
        className="p-inputtext-sm"
        placeholder={`Search`}
        disabled={isEditModeOn}
      />
      <Button
        block
        variant="solid"
        size="sm"
        icon={<HiPlusCircle />}
        onClick={() => setShowDialog(true)}
        disabled={isEditModeOn}
      >
        New Local Event
      </Button>
    </div>
  );
};

function LocalEvent() {
  const Channel = useSelector((state) => state.locale.selectedChannel);
  const { LocationCode, ChannelCode } = Channel || {};
  const token = useSelector((state) => state.auth.session.token);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [subGenreOptions, setSubGenreOptions] = useState([]);
  const [localEventList, setLocalEventList] = useState([]);
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  /* Fetch SubGenres */
  const getSubGenreOptions = async () => {
    try {
      const response = await apiGetSubGenremasterDrop(LocationCode, ChannelCode);
      if (response.status === 200 && response.data?.length > 0) {
        const options = response.data.map((item) => ({
          value: item.SubGenreCode,
          label: item.SubGenreName,
        }));
        setSubGenreOptions(options);
      } else {
        setSubGenreOptions([]);
      }
    } catch (error) {
      console.error(error);
      openNotification('danger', 'Failed to load Sub Genre list');
    }
  };

  /* Fetch Local Event List */
  const getLocalEventList = async () => {
    setLocalEventList([]);
    try {
      setShowLoader(true);
      const response = await apiGetLocalEventMaster();
      if (response.status === 200) {
        setLocalEventList(response.data);
      } else if (response.status === 204) {
        setLocalEventList([]);
      } else {
        openNotification('danger', 'Failed to fetch Local Event list');
      }
    } catch (error) {
      console.error(error);
      openNotification('danger', 'Error while loading data');
    } finally {
      setShowLoader(false);
    }
  };

  /* On component mount */
  useEffect(() => {
    (async () => {
      try {
        setShowLoader(true);
        await getSubGenreOptions();
        await getLocalEventList();
        setShowLoader(false);
      } catch (error) {
        console.error(error);
        setShowLoader(false);
      }
    })();
  }, [LocationCode, ChannelCode]);

  return (
    <>
      <Card
        header={
          <div className="flex justify-between">
            <div>
              <span className="flex items-center">
                <HeaderExtra />
              </span>
            </div>
          </div>
        }
        headerExtra={headerExtra(
          setShowDialog,
          filters,
          setFilters,
          globalFilterValue,
          setGlobalFilterValue,
          isEditModeOn
        )}
        className="h-full flex flex-col"
        bodyClass="text-center grow"
      >
        {localEventList.length > 0 ? (
          <LocalEventTable
            filters={filters}
            globalFilterFields={['LocalEventName', 'SubGenreCode']}
            localEventList={localEventList}
            setLocalEventList={setLocalEventList}
            subGenreOptions={subGenreOptions}
            validateMaxNoLength={(v, len) => /^\d{0,6}$/.test(v)}
            isEditModeOn={isEditModeOn}
            setIsEditModeOn={setIsEditModeOn}
            setShowLoader={setShowLoader}
          />
        ) : (
          <div className="h-full flex justify-center items-center">
            No Local Events to show
          </div>
        )}
      </Card>

      {/* Dialog */}
      <AddLocalEventDialog
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        subGenreOptions={subGenreOptions}
        LocationCode={LocationCode}
        ChannelCode={ChannelCode}
        token={token}
        setShowLoader={setShowLoader}
        refreshLocalEventList={getLocalEventList} // 🔹 Critical: pass parent function
      />

      <Loader showLoader={showLoader} />
    </>
  );
}

export default LocalEvent;
