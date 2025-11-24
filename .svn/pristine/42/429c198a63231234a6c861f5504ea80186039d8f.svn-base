import { Dialog } from 'components/ui';
import React, { useEffect, useState } from 'react';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import Summary from './Summary';
import Tables from './Tables';

function FileSummaryDialog({ fileArray, setFileArray, isOpen, setIsOpen }) {
  /* STATES */
  const [arrayCounts, setArrayCounts] = useState([]);
  const [typewiseSummary, setTypewiseSummary] = useState({});
  const [showTables, setShowTables] = useState(false);

  /* USE EFFECTS */
  useEffect(() => {
    try {
      const { arrayCounts, typewiseSummary } =
        getArrayCountsAndTypewiseSummary();
      setArrayCounts(arrayCounts);
      setTypewiseSummary(typewiseSummary);
    } catch (error) {
      console.error(error);
      openNotification(
        'danger',
        'Something went wrong while generating file summary',
      );
    }
  }, [fileArray]);

  /* EVENT HANDLERS */
  const handleClose = () => {
    setIsOpen(false);
    setFileArray(null);
  };

  /* HELPER FUNCTIONS */
  const getArrayCountsAndTypewiseSummary = () => {
    try {
      let arrayCounts = [{ key: 'Total Promos', value: fileArray }];
      let typewiseSummary = {},
        success = [],
        failed = [];
      fileArray.forEach((item) => {
        !(item.PromoType in typewiseSummary)
          ? (typewiseSummary[item.PromoType] = [item])
          : typewiseSummary[item.PromoType].push(item);
        item.Statuscode === 0 ? failed.push(item) : success.push(item);
      });
      arrayCounts.push({
        key: 'Success',
        value: success,
      });
      arrayCounts.push({
        key: 'Failed',
        value: failed,
      });
      return { arrayCounts, typewiseSummary };
    } catch (error) {
      throw error;
    }
  };

  const getArrayOfKeyType = (key) =>
    arrayCounts.filter((item) => item.key === key)[0]?.value;

  /* CONSTANTS */
  const successArray = getArrayOfKeyType('Success');
  const failedArray = getArrayOfKeyType('Failed');

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      onRequestClose={handleClose}
      width="60%"
      contentClassName="mt-8"
    >
      {showTables ? (
        <Tables
          fileArray={fileArray}
          successArray={successArray}
          failedArray={failedArray}
          setShowTables={setShowTables}
        />
      ) : (
        <Summary
          arrayCounts={arrayCounts}
          typewiseSummary={typewiseSummary}
          setShowTables={setShowTables}
        />
      )}
    </Dialog>
  );
}

export default FileSummaryDialog;
