import React, { useState } from 'react';
import AddEditSalesTarget from './Screens/AddEditSalesTarget';
import Dashboard from './Screens/Dashboard';

function SalesTarget() {
  /* STATES */
  const [screen, setScreen] = useState('home');

  return (
    <>
      {screen === 'add' ? (
        <AddEditSalesTarget setScreen={setScreen} />
      ) : screen === 'edit' ? (
        <AddEditSalesTarget setScreen={setScreen} />
      ) : (
        <Dashboard setScreen={setScreen} />
      )}
    </>
  );
}

export default SalesTarget;
