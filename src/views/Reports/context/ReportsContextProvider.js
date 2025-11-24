import React, { useState } from 'react';
import ReportsContext from './ReportsContext';

const ReportsContextProvider = ({ children }) => {
  /* STATES */
  const [pathEndpoint, setPathEndpoint] = useState('');
  const [reportsStructure, setReportsStructure] = useState(null);
  const [formState, setFormState] = useState({});
  const [reportsTableData, setReportsTableData] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  const resetPage = () => {
    try {
      setFormState({});
      setReportsTableData([]);
      setShowLoader(false);
    } catch (error) {
      throw error;
    }
  };

  return (
    <ReportsContext.Provider
      value={{
        pathEndpoint,
        reportsStructure,
        formState,
        reportsTableData,
        showLoader,
        setPathEndpoint,
        setReportsStructure,
        setFormState,
        setReportsTableData,
        setShowLoader,
        resetPage,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
};

export default ReportsContextProvider;
