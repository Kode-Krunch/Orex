import React, { useState } from 'react';
import ActivityLogContext from './ActivityLogContext';

const ActivityLogContextProvider = ({ children }) => {
  /* STATES */
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const [searchType, setSearchType] = useState(null);
  const [formState, setFormState] = useState({ client: null, booking: null });
  const [searchResult, setSearchResult] = useState(null);
  const [staticInfo, setStaticInfo] = useState({});
  const [datewiseActivities, setDatewiseActivities] = useState([]);
  const [activityInfoData, setActivityInfoData] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  /* HELPER FUNCTIONS */
  const resetPage = () => {
    try {
      setIsSearchDialogOpen(false);
      setSearchType(null);
      setFormState({ client: null, booking: null });
      setSearchResult(null);
      setStaticInfo({});
      setDatewiseActivities([]);
      setActivityInfoData(null);
      setShowLoader(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ActivityLogContext.Provider
      value={{
        isSearchDialogOpen,
        searchType,
        formState,
        searchResult,
        staticInfo,
        datewiseActivities,
        activityInfoData,
        showLoader,
        setIsSearchDialogOpen,
        setSearchType,
        setFormState,
        setSearchResult,
        setStaticInfo,
        setDatewiseActivities,
        setActivityInfoData,
        setShowLoader,
        resetPage,
      }}
    >
      {children}
    </ActivityLogContext.Provider>
  );
};

export default ActivityLogContextProvider;
